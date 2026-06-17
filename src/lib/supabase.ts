import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Browser-safe client (anon key, subject to RLS).
 * RLS is enabled on all tables — anon role has NO policies,
 * so this client cannot read or write any data directly.
 * Use only for public-facing, policy-gated operations if added later.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-only admin client (service_role key, bypasses RLS).
 * NEVER expose this to the browser.
 * Use in Server Components, API Routes, and Server Actions.
 */
export function createServerSupabase() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
