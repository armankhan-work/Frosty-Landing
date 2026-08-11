"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_CONFIGURED, SUPABASE_URL } from "./constants";

/**
 * One browser client for the whole app.
 *
 * Lazily constructed rather than created at module scope so that (a) a build with no Supabase env
 * still compiles and renders the login screen's configuration error instead of throwing during
 * hydration, and (b) `createClient` never runs on the server, where its localStorage-backed
 * session store has nothing to read.
 */
let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient {
  if (!SUPABASE_CONFIGURED) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
  if (client === null) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        // The defaults, stated explicitly because two of them are load-bearing here:
        // autoRefreshToken keeps `getToken()` from handing the API an expired JWT after an hour,
        // and persistSession is what survives a page reload (localStorage — same store the
        // parallel build used for its own token, so this is not a new exposure).
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}
