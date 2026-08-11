"use client";

import { SUPABASE_CONFIGURED } from "./constants";
import { supabase } from "./supabase";

/**
 * Merchant session — Supabase Auth, not a token we mint.
 *
 * `getToken()` is async and returns the CURRENT token because access tokens expire (one hour by
 * default) and the client refreshes them in the background. A synchronous read of the stored token
 * would keep handing the API a JWT that stopped verifying, and every screen would bounce to /login
 * mid-session.
 */
export async function getToken(): Promise<string | null> {
  if (typeof window === "undefined" || !SUPABASE_CONFIGURED) return null;
  const { data } = await supabase().auth.getSession();
  return data.session?.access_token ?? null;
}

export async function signIn(email: string, password: string): Promise<void> {
  const { error } = await supabase().auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
}

/**
 * Create the Supabase identity. Does NOT create the merchant — that is `POST /v1/iam/bootstrap`,
 * which the signup screen calls next with the company name.
 *
 * The two steps cannot be collapsed: `bootstrap` requires a VERIFIED Supabase token (it is
 * `require_supabase_principal`, and the merchant is keyed on the auth uid), so the identity has to
 * exist first. It is idempotent on that uid, which is what makes an interrupted signup resumable
 * rather than a duplicate merchant.
 *
 * Returns whether a session came back. With "confirm email" enabled on the Supabase project,
 * sign-up returns a user and NO session — so the caller must not try to bootstrap yet, and must
 * say so instead of failing silently.
 */
export async function signUp(email: string, password: string): Promise<{ session: boolean; accessToken: string | null }> {
  const { data, error } = await supabase().auth.signUp({ email, password });
  if (error) throw new Error(error.message);
  return { session: Boolean(data.session), accessToken: data.session?.access_token ?? null };
}

export async function signOut(): Promise<void> {
  if (!SUPABASE_CONFIGURED) return;
  await supabase().auth.signOut();
}
