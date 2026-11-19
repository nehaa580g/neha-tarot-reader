-- Idempotent setup script for Supabase Dashboard -> SQL Editor
-- Project: ngkftevfykpndkcnoicr
-- Safe to run multiple times; preserves all existing tables and data.

create table if not exists public.appointment_bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  service_id text not null,
  service_title text,
  package_id text,
  package_tier text,
  currency text default 'INR',
  preferred_date date not null,
  preferred_time text not null,
  birth_date text,
  birth_time text,
  birth_location text,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Ensure all expected columns exist if the table was created earlier (non-destructive)
alter table public.appointment_bookings add column if not exists service_title text;
alter table public.appointment_bookings add column if not exists package_id text;
alter table public.appointment_bookings add column if not exists package_tier text;
alter table public.appointment_bookings add column if not exists currency text default 'INR';
alter table public.appointment_bookings add column if not exists birth_date text;
alter table public.appointment_bookings add column if not exists birth_time text;
alter table public.appointment_bookings add column if not exists birth_location text;
alter table public.appointment_bookings add column if not exists message text;
alter table public.appointment_bookings add column if not exists status text not null default 'pending';
alter table public.appointment_bookings add column if not exists created_at timestamptz not null default now();

-- Two-slot Admin table: enforces at most TWO admin accounts in the entire database (id in (1, 2))
create table if not exists public.admin_users (
  id integer primary key check (id in (1, 2)),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

-- Safely upgrade an existing 1-slot admin_users table to 2 slots without deleting existing admin #1
do $$
declare
  c record;
begin
  for c in
    select conname
    from pg_constraint
    where conrelid = 'public.admin_users'::regclass
      and contype = 'c'
  loop
    execute format('alter table public.admin_users drop constraint if exists %I', c.conname);
  end loop;
end
$$;

alter table public.admin_users alter column id drop default;
alter table public.admin_users add constraint admin_users_id_check check (id in (1, 2));

-- Prevent duplicate admin registrations with the same email (case-insensitive)
create unique index if not exists admin_users_email_lower_idx
  on public.admin_users (lower(email));

-- Enable Row Level Security (idempotent)
alter table public.appointment_bookings enable row level security;
alter table public.admin_users enable row level security;

-- Explicit least-privilege table permissions (RLS still strictly enforces row access)
grant usage on schema public to anon, authenticated;
grant insert on public.appointment_bookings to anon, authenticated;
grant select, update, delete on public.appointment_bookings to authenticated;
grant select, insert on public.admin_users to authenticated;

-- Helper returning exact number of claimed admin slots (bypasses RLS safely)
create or replace function public.get_admin_slots_used()
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::integer from public.admin_users;
$$;

grant execute on function public.get_admin_slots_used() to anon, authenticated;

-- Helper returning slot availability for the Admin Portal UI
create or replace function public.get_admin_slot_status()
returns table (
  claimed_count integer,
  max_slots integer,
  next_slot integer
)
language sql
security definer
set search_path = public
as $$
  select
    (select count(*)::integer from public.admin_users) as claimed_count,
    2 as max_slots,
    case
      when not exists (select 1 from public.admin_users where id = 1) then 1
      when not exists (select 1 from public.admin_users where id = 2) then 2
      else null
    end as next_slot;
$$;

grant execute on function public.get_admin_slot_status() to anon, authenticated;

-- Returns true only when ALL 2 admin slots are claimed
create or replace function public.is_admin_registered()
returns boolean
language sql
security definer
set search_path = public
as $$
  select (select count(*) from public.admin_users) >= 2;
$$;

grant execute on function public.is_admin_registered() to anon, authenticated;

-- Atomic authorization & slot-claiming helper for authenticated users:
-- 1) Matches existing admin by auth.uid()
-- 2) Matches existing admin by verified email and syncs user_id if needed
-- 3) Claims next open slot (1 or 2) if fewer than 2 admins exist
-- 4) Denies access if both slots are already claimed by other accounts
create or replace function public.verify_or_claim_admin()
returns table (
  authorized boolean,
  slot_id integer,
  admin_email text,
  message text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_email text := lower(trim(coalesce(auth.jwt() ->> 'email', '')));
  v_row public.admin_users%rowtype;
  v_next_slot integer;
begin
  if v_uid is null then
    return query select false, null::integer, null::text, 'Authentication session is missing. Please sign in again.';
    return;
  end if;

  if v_email = '' then
    select lower(trim(coalesce(u.email, ''))) into v_email
    from auth.users u
    where u.id = v_uid;
  end if;

  -- Serialize slot checks/claims so concurrent requests cannot race
  lock table public.admin_users in share row exclusive mode;

  -- 1. Match by authenticated user_id
  select * into v_row
  from public.admin_users
  where user_id = v_uid
  limit 1;

  if found then
    if v_email <> '' and lower(v_row.email) <> v_email then
      update public.admin_users
      set email = v_email
      where id = v_row.id
      returning * into v_row;
    end if;

    return query select true, v_row.id, v_row.email, 'Authorized.';
    return;
  end if;

  -- 2. Match by authenticated email and sync user_id (no duplicate slot created)
  if v_email <> '' then
    select * into v_row
    from public.admin_users
    where lower(email) = v_email
    limit 1;

    if found then
      update public.admin_users
      set user_id = v_uid,
          email = v_email
      where id = v_row.id
      returning * into v_row;

      return query select true, v_row.id, v_row.email, 'Authorized and synced with registered admin email.';
      return;
    end if;
  end if;

  -- 3. Claim next available slot (1 or 2)
  if not exists (select 1 from public.admin_users where id = 1) then
    v_next_slot := 1;
  elsif not exists (select 1 from public.admin_users where id = 2) then
    v_next_slot := 2;
  else
    v_next_slot := null;
  end if;

  if v_next_slot is not null then
    insert into public.admin_users (id, user_id, email)
    values (v_next_slot, v_uid, coalesce(nullif(v_email, ''), v_uid::text))
    returning * into v_row;

    return query select true, v_row.id, v_row.email, format('Admin Slot #%s claimed.', v_row.id);
    return;
  end if;

  -- 4. Both slots claimed by other accounts
  return query select false, null::integer, null::text, 'Access denied. Both admin slots are already claimed by other accounts.';
end;
$$;

revoke all on function public.verify_or_claim_admin() from public;
grant execute on function public.verify_or_claim_admin() to authenticated;

-- Booking form inserts: public visitors can submit appointments
drop policy if exists "Allow public appointment booking inserts" on public.appointment_bookings;
create policy "Allow public appointment booking inserts"
  on public.appointment_bookings
  for insert
  to anon, authenticated
  with check (true);

-- Booking reads/updates/deletes: ONLY registered admins (slot 1 or slot 2) can view or manage bookings
drop policy if exists "Admin can view all bookings" on public.appointment_bookings;
create policy "Admin can view all bookings"
  on public.appointment_bookings
  for select
  to authenticated
  using (
    exists (
      select 1 from public.admin_users where user_id = auth.uid()
    )
  );

drop policy if exists "Admin can update bookings" on public.appointment_bookings;
create policy "Admin can update bookings"
  on public.appointment_bookings
  for update
  to authenticated
  using (
    exists (
      select 1 from public.admin_users where user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.admin_users where user_id = auth.uid()
    )
  );

drop policy if exists "Admin can delete bookings" on public.appointment_bookings;
create policy "Admin can delete bookings"
  on public.appointment_bookings
  for delete
  to authenticated
  using (
    exists (
      select 1 from public.admin_users where user_id = auth.uid()
    )
  );

-- Admin slot policies:
-- 1. Only a logged-in admin can read their own row
drop policy if exists "Admin can view own admin record" on public.admin_users;
create policy "Admin can view own admin record"
  on public.admin_users
  for select
  to authenticated
  using (auth.uid() = user_id);

-- 2. Only allow claiming slot 1 or slot 2 while fewer than 2 admins exist
drop policy if exists "Allow claiming single admin slot once" on public.admin_users;
drop policy if exists "Allow claiming up to two admin slots" on public.admin_users;
create policy "Allow claiming up to two admin slots"
  on public.admin_users
  for insert
  to authenticated
  with check (
    id in (1, 2)
    and auth.uid() = user_id
    and public.get_admin_slots_used() < 2
  );
