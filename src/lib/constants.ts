/** Environment constants. All three are read at build time by Next (NEXT_PUBLIC_*). */

/** Our API, not theirs: the parallel build ran on :8001, ours is :8000 (`.env.example`). */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Merchant sign-in goes through Supabase Auth, exactly as staff sign-in does.
 *
 * ⚠️ THIS IS THE ONE PLACE THE PORT COULD NOT FOLLOW THE PARALLEL BUILD AT ALL. Theirs posts an
 * email and password to its own `/v1/auth/login`, gets back an HS256 token **carrying
 * `merchant_id`**, and switches tenants with an `X-Merchant-Id` header. Ours refuses `merchant_id`
 * as a claim on purpose (`app/core/security.py`) and resolves the tenant from
 * `tenant_admin.memberships` on every request. So there is no login endpoint to call, no password
 * for this app to handle, and no header that selects a merchant — see `lib/nav.ts` on the switcher.
 */
export const SUPABASE_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Where the widget's embed snippet points. Only the widget screen reads it. */
export const WIDGET_HOST =
  process.env.NEXT_PUBLIC_WIDGET_HOST || "http://localhost:5173";
