
import { createClient } from '@supabase/supabase-js';

// Fallback to prevent crash if env vars are missing (e.g. in Vercel before configuration)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL) {
    console.warn('Supabase URL is missing. Analytics will not function correctly.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
