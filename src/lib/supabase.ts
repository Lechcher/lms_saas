// This file configures and exports a Supabase client instance.
// It integrates with Clerk for authentication to provide an access token.

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Creates and returns a Supabase client instance.
 * The client is initialized with Supabase URL and anonymous key from environment variables.
 * It also provides an asynchronous accessToken function that retrieves the current user's token from Clerk.
 * @returns A Supabase client instance.
 */
export const createSupabaseClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      async accessToken() {
        return (await auth()).getToken();
      },
    }
  );
