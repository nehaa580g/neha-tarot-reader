import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  LogOut,
  RefreshCw,
  Search,
  Calendar,
  Clock,
  Mail,
  Phone,
  MessageSquare,
  Trash2,
  Download,
  UserPlus,
  LogIn,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BookingRecord {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service_id: string;
  service_title: string | null;
  package_id: string | null;
  package_tier: string | null;
  currency: string | null;
  preferred_date: string;
  preferred_time: string;
  birth_date: string | null;
  birth_time: string | null;
  birth_location: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  confirmed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  completed: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
  cancelled: 'bg-rose-500/15 text-rose-300 border-rose-500/30'
};

interface AdminSlotStatus {
  claimed_count: number;
  max_slots: number;
  next_slot: number | null;
}

interface VerifyAdminResult {
  authorized: boolean;
  slot_id: number | null;
  admin_email: string | null;
  message: string | null;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [checkingState, setCheckingState] = useState(true);
  const [slotStatus, setSlotStatus] = useState<AdminSlotStatus | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [adminSlotId, setAdminSlotId] = useState<number | null>(null);

  // Auth form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  // Dashboard state
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoadingBookings(true);
    setDashboardError(null);
    try {
      const { data, error } = await supabase
        .from('appointment_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings((data as BookingRecord[]) || []);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err !== null && 'message' in err
            ? String((err as { message: unknown }).message)
            : 'Failed to load bookings.';
      setDashboardError(msg);
    } finally {
      setLoadingBookings(false);
    }
  }, []);

  const fetchSlotStatus = useCallback(async (): Promise<AdminSlotStatus> => {
    const { data, error } = await supabase.rpc('get_admin_slot_status');
    if (error) throw error;

    const row = Array.isArray(data) ? data[0] : data;
    if (!row || typeof row.claimed_count !== 'number') {
      throw new Error('Could not read admin slot status. Please run the updated supabase/schema.sql in Supabase.');
    }

    return {
      claimed_count: row.claimed_count,
      max_slots: row.max_slots ?? 2,
      next_slot: row.next_slot ?? null
    };
  }, []);

  const verifyOrClaimAdmin = useCallback(async (fallbackEmail?: string): Promise<VerifyAdminResult> => {
    const { data, error } = await supabase.rpc('verify_or_claim_admin');
    if (error) {
      throw new Error(
        error.message.includes('verify_or_claim_admin')
          ? 'Admin verification function missing in Supabase. Please run the updated supabase/schema.sql in your SQL Editor.'
          : error.message
      );
    }

    const row = Array.isArray(data) ? data[0] : data;
    if (!row || typeof row.authorized !== 'boolean') {
      throw new Error('Unexpected response from admin verification. Please re-run supabase/schema.sql.');
    }

    return {
      authorized: row.authorized,
      slot_id: row.slot_id ?? null,
      admin_email: row.admin_email ?? fallbackEmail?.trim().toLowerCase() ?? null,
      message: row.message ?? null
    };
  }, []);

  const initializeAdminState = useCallback(async () => {
    setCheckingState(true);
    setAuthError(null);

    try {
      // 1. Check active session first
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session?.user) {
        // Verify or claim an open slot atomically (matches by user_id or email)
        const result = await verifyOrClaimAdmin(session.user.email);
        if (result.authorized && result.admin_email) {
          setAdminEmail(result.admin_email);
          setAdminSlotId(result.slot_id);
          const refreshedStatus = await fetchSlotStatus().catch(() => null);
          if (refreshedStatus) setSlotStatus(refreshedStatus);
          await fetchBookings();
          return;
        } else {
          // Authenticated non-admin user: sign out cleanly and show reason
          await supabase.auth.signOut();
          setAdminEmail(null);
          setAdminSlotId(null);
          if (result.message) {
            setAuthError(result.message);
          }
        }
      } else {
        setAdminEmail(null);
        setAdminSlotId(null);
      }

      // 2. Check how many admin slots (out of 2) are claimed
      const status = await fetchSlotStatus();
      setSlotStatus(status);
      const hasOpenSlot = status.next_slot !== null && status.claimed_count < status.max_slots;
      setAuthMode(hasOpenSlot ? 'signup' : 'login');
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err !== null && 'message' in err
            ? String((err as { message: unknown }).message)
            : 'Could not verify admin setup. Ensure supabase/schema.sql has been executed.';
      setAuthError(msg);
      setSlotStatus(null);
    } finally {
      setCheckingState(false);
    }
  }, [fetchBookings, fetchSlotStatus, verifyOrClaimAdmin]);

  useEffect(() => {
    if (isOpen) {
      initializeAdminState();
    }
  }, [isOpen, initializeAdminState]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthNotice(null);
    setAuthLoading(true);

    try {
      // Re-verify live slot availability right before signup/login
      const statusNow = await fetchSlotStatus();
      setSlotStatus(statusNow);
      const allSlotsTaken = statusNow.next_slot === null || statusNow.claimed_count >= statusNow.max_slots;

      if (authMode === 'signup') {
        if (allSlotsTaken || statusNow.next_slot === null) {
          setAuthMode('login');
          throw new Error(`All ${statusNow.max_slots} admin slots have already been claimed. New sign-ups are closed.`);
        }

        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match.');
        }

        const normalizedEmail = email.trim().toLowerCase();
        const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
          email: normalizedEmail,
          password
        });

        if (signUpErr) throw signUpErr;

        if (!signUpData.user) {
          throw new Error('Unable to create admin account. Please try again.');
        }

        if (signUpData.session) {
          const result = await verifyOrClaimAdmin(normalizedEmail);
          if (!result.authorized || !result.admin_email) {
            await supabase.auth.signOut();
            throw new Error(result.message || 'Could not claim admin slot.');
          }

          const refreshedStatus = await fetchSlotStatus().catch(() => statusNow);
          setSlotStatus(refreshedStatus);
          setAdminEmail(result.admin_email);
          setAdminSlotId(result.slot_id);
          setPassword('');
          setConfirmPassword('');
          await fetchBookings();
        } else {
          // Email confirmation enabled on Supabase project
          setAuthMode('login');
          setAuthNotice(
            `Account created! Please check your email to confirm your address, then sign in here to lock Admin Slot #${statusNow.next_slot}.`
          );
          setPassword('');
          setConfirmPassword('');
        }
      } else {
        // Login flow
        const normalizedEmail = email.trim().toLowerCase();
        const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password
        });

        if (signInErr) throw signInErr;
        if (!signInData.user) throw new Error('Login failed.');

        // Atomically verify user_id/email against admin_users or claim an open slot
        const result = await verifyOrClaimAdmin(signInData.user.email || normalizedEmail);

        if (result.authorized && result.admin_email) {
          const refreshedStatus = await fetchSlotStatus().catch(() => statusNow);
          setSlotStatus(refreshedStatus);
          setAdminEmail(result.admin_email);
          setAdminSlotId(result.slot_id);
          setPassword('');
          await fetchBookings();
          return;
        }

        // Not authorized (e.g. both slots already held by other accounts)
        await supabase.auth.signOut();
        throw new Error(result.message || 'Access denied. This account does not hold a registered admin slot.');
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err !== null && 'message' in err
            ? String((err as { message: unknown }).message)
            : 'Authentication failed.';
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAdminEmail(null);
    setAdminSlotId(null);
    setBookings([]);
    setConfirmDeleteId(null);
    const refreshedStatus = await fetchSlotStatus().catch(() => null);
    if (refreshedStatus) {
      setSlotStatus(refreshedStatus);
      setAuthMode(refreshedStatus.next_slot !== null ? 'signup' : 'login');
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from('appointment_bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not update status.';
      setDashboardError(msg);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase.from('appointment_bookings').delete().eq('id', id);
      if (error) throw error;
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not delete booking.';
      setDashboardError(msg);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCsv = () => {
    if (bookings.length === 0) return;
    const headers = [
      'Created At',
      'Full Name',
      'Email',
      'Phone',
      'Service',
      'Package / Tier',
      'Currency',
      'Preferred Date',
      'Preferred Time',
      'Birth Date',
      'Birth Time',
      'Birth Location',
      'Message',
      'Status'
    ];

    const escapeCsv = (val: string | null | undefined) => {
      const str = (val ?? '').replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = bookings.map((b) =>
      [
        b.created_at,
        b.full_name,
        b.email,
        b.phone,
        b.service_title || b.service_id,
        b.package_tier || b.package_id || '',
        b.currency || 'INR',
        b.preferred_date,
        b.preferred_time,
        b.birth_date || '',
        b.birth_time || '',
        b.birth_location || '',
        b.message || '',
        b.status
      ]
        .map(escapeCsv)
        .join(',')
    );

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `unlock-future-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      b.full_name.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.phone.toLowerCase().includes(q) ||
      (b.service_title || b.service_id).toLowerCase().includes(q) ||
      (b.package_tier || '').toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-[#0c0918] border border-purple-500/35 rounded-3xl shadow-2xl shadow-purple-950/80 p-6 sm:p-8">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1a1333] border border-purple-800/40 text-slate-300 hover:text-white hover:bg-purple-900/50 transition-colors cursor-pointer"
          aria-label="Close Admin Panel"
        >
          <X className="w-5 h-5" />
        </button>

        {checkingState ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-300">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            <p className="text-xs tracking-wider uppercase font-semibold">Checking Admin Access...</p>
          </div>
        ) : !adminEmail ? (
          /* AUTH SCREEN (2-Slot Admin Sign-Up or Login) */
          <div className="max-w-md mx-auto py-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-950/90 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="font-syne text-2xl font-extrabold text-white tracking-tight">
                ADMIN PORTAL
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {slotStatus && slotStatus.next_slot !== null && slotStatus.claimed_count < slotStatus.max_slots
                  ? `Admin Slot #${slotStatus.next_slot} of ${slotStatus.max_slots} Available — Create an admin account below. Once all ${slotStatus.max_slots} slots are filled, sign-up will be permanently disabled.`
                  : 'All admin slots are locked. Sign in with a registered admin account to manage website bookings.'}
              </p>
            </div>

            {/* Slot Status Pill */}
            <div className="flex justify-center">
              {slotStatus && slotStatus.next_slot !== null && slotStatus.claimed_count < slotStatus.max_slots ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>
                    {slotStatus.claimed_count} / {slotStatus.max_slots} Admin Slots Used •{' '}
                    {slotStatus.max_slots - slotStatus.claimed_count}{' '}
                    {slotStatus.max_slots - slotStatus.claimed_count === 1 ? 'Slot' : 'Slots'} Open
                  </span>
                </span>
              ) : slotStatus ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-700/50 text-purple-300 text-[11px] font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>
                    {slotStatus.max_slots} / {slotStatus.max_slots} Admin Slots Claimed • Sign-Up Closed
                  </span>
                </span>
              ) : null}
            </div>

            {/* Only show Sign-Up tab while an admin slot remains open */}
            {slotStatus && slotStatus.next_slot !== null && slotStatus.claimed_count < slotStatus.max_slots && (
              <div className="grid grid-cols-2 p-1 rounded-xl bg-[#140f29] border border-purple-800/40 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthError(null);
                  }}
                  className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMode === 'signup'
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Create Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError(null);
                  }}
                  className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMode === 'login'
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </button>
              </div>
            )}

            {authNotice && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{authNotice}</span>
              </div>
            )}

            {authError && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs leading-relaxed">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Admin Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="unlockfuture111@gmail.com"
                  className="w-full bg-[#140f29] border border-purple-800/40 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#140f29] border border-purple-800/40 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              {authMode === 'signup' && slotStatus && slotStatus.next_slot !== null && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#140f29] border border-purple-800/40 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading || slotStatus === null}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white font-bold text-xs tracking-widest uppercase shadow-lg shadow-purple-950 hover:from-purple-600 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>PLEASE WAIT...</span>
                  </>
                ) : authMode === 'signup' && slotStatus && slotStatus.next_slot !== null ? (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>CLAIM ADMIN SLOT #{slotStatus.next_slot}</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>SIGN IN TO DASHBOARD</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* ADMIN DASHBOARD */
          <div className="space-y-6 pr-2">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pr-10 pb-5 border-b border-purple-900/40">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-emerald-400 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>
                    Signed in as {adminEmail}
                    {adminSlotId ? ` • Admin Slot #${adminSlotId}` : ''}
                  </span>
                </div>
                <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  APPOINTMENT BOOKINGS
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={fetchBookings}
                  disabled={loadingBookings}
                  className="px-4 py-2 rounded-full bg-[#17112e] border border-purple-700/40 text-slate-200 hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingBookings ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportCsv}
                  disabled={bookings.length === 0}
                  className="px-4 py-2 rounded-full bg-[#17112e] border border-purple-700/40 text-purple-200 hover:bg-purple-800/40 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-200 hover:bg-rose-900/60 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#140f29] border border-purple-800/35 rounded-2xl p-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Total Bookings</span>
                <p className="font-syne text-2xl font-extrabold text-white mt-1">{stats.total}</p>
              </div>
              <div className="bg-[#140f29] border border-amber-500/25 rounded-2xl p-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-300">Pending</span>
                <p className="font-syne text-2xl font-extrabold text-amber-200 mt-1">{stats.pending}</p>
              </div>
              <div className="bg-[#140f29] border border-emerald-500/25 rounded-2xl p-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-300">Confirmed</span>
                <p className="font-syne text-2xl font-extrabold text-emerald-200 mt-1">{stats.confirmed}</p>
              </div>
              <div className="bg-[#140f29] border border-purple-500/30 rounded-2xl p-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-purple-300">Completed</span>
                <p className="font-syne text-2xl font-extrabold text-purple-200 mt-1">{stats.completed}</p>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by client name, email, phone, service, or package..."
                  className="w-full bg-[#140f29] border border-purple-800/40 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#140f29] border border-purple-800/40 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {dashboardError && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{dashboardError}</span>
              </div>
            )}

            {/* Bookings List */}
            {loadingBookings && bookings.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
                <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                <span>Loading bookings...</span>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="py-14 text-center bg-[#120d24] border border-purple-900/30 rounded-2xl text-slate-400 text-xs">
                {bookings.length === 0
                  ? 'No appointment bookings submitted yet.'
                  : 'No bookings match your current search or filter.'}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-[#130e26] border border-purple-800/35 rounded-2xl p-5 space-y-4 hover:border-purple-600/50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      {/* Client & Service Info */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-syne text-base font-bold text-white">
                            {booking.full_name}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              STATUS_STYLES[booking.status] || STATUS_STYLES.pending
                            }`}
                          >
                            {booking.status}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Submitted {new Date(booking.created_at).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-300">
                          <a
                            href={`mailto:${booking.email}`}
                            className="inline-flex items-center gap-1.5 hover:text-purple-300"
                          >
                            <Mail className="w-3.5 h-3.5 text-purple-400" />
                            <span>{booking.email}</span>
                          </a>
                          <span className="inline-flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{booking.phone}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-purple-200 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-purple-400" />
                            <span>{booking.preferred_date}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-purple-200 font-medium">
                            <Clock className="w-3.5 h-3.5 text-purple-400" />
                            <span>{booking.preferred_time}</span>
                          </span>
                        </div>

                        {/* Service & Package Badges */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="px-3 py-1 rounded-full bg-purple-950/90 border border-purple-700/40 text-purple-200 text-[11px] font-semibold">
                            Service: {booking.service_title || booking.service_id}
                          </span>
                          {(booking.package_tier || booking.package_id) && (
                            <span className="px-3 py-1 rounded-full bg-indigo-950/90 border border-indigo-700/40 text-indigo-200 text-[11px] font-semibold">
                              Option: {booking.package_tier || booking.package_id} ({booking.currency || 'INR'})
                            </span>
                          )}
                        </div>

                        {/* Optional Birth Details */}
                        {(booking.birth_date || booking.birth_time || booking.birth_location) && (
                          <div className="text-[11px] text-slate-300 bg-[#1a1335] border border-purple-800/30 rounded-xl px-3 py-2 inline-block">
                            <strong className="text-purple-300">Birth Details:</strong>{' '}
                            {[booking.birth_date, booking.birth_time, booking.birth_location]
                              .filter(Boolean)
                              .join(' • ')}
                          </div>
                        )}

                        {/* Client Message */}
                        {booking.message && (
                          <div className="flex items-start gap-2 text-xs text-slate-300 bg-[#0d0a1a] border border-purple-900/40 rounded-xl p-3 mt-1">
                            <MessageSquare className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                            <p className="leading-relaxed">{booking.message}</p>
                          </div>
                        )}
                      </div>

                      {/* Admin Actions */}
                      <div className="flex flex-wrap sm:flex-nowrap lg:flex-col items-center lg:items-end gap-2 shrink-0">
                        <select
                          value={booking.status}
                          disabled={updatingId === booking.id}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className="bg-[#1a1335] border border-purple-700/50 rounded-xl px-3 py-2 text-white text-xs font-semibold focus:outline-none focus:border-purple-400 cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        {confirmDeleteId === booking.id ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled={updatingId === booking.id}
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold cursor-pointer"
                            >
                              Confirm Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-2.5 py-1.5 rounded-lg bg-[#1e1738] text-slate-300 text-[11px] cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(booking.id)}
                            className="inline-flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 px-2.5 py-1.5 rounded-lg hover:bg-rose-950/40 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
