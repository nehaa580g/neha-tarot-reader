import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://ngkftevfykpndkcnoicr.supabase.co';

export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_bL4VcTywEy29M1sVkk2Rtg_0EBNZAwz';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
