import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
// Replace with your actual Supabase project credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
    USERS: 'users',
    TEAMS: 'teams',
    ANNOUNCEMENTS: 'announcements',
    PAYMENTS: 'payments'
} as const;
