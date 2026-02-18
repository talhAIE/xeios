import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase admin client.
 * Uses the SERVICE ROLE KEY — never expose this to the browser.
 * Only import this file in server-side code (API routes, Server Actions).
 */
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);
