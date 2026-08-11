/**
 * The client half of a Frostrek support session (D74).
 *
 * The Frostrek dashboard opens a session server-side and links here with `?impersonate=<id>`. This
 * module is the only place that id is read, held, and attached — `apiRequest` calls
 * `impersonationHeader()` and nothing else knows the mechanism.
 *
 * ⚠️ `sessionStorage`, not `localStorage`, and the difference matters. A support session is
 * short-lived and per-tab: `localStorage` is shared across every tab on this origin, so a staff
 * member with their own account open in another tab would find it silently impersonating too.
 * `sessionStorage` also dies with the tab, which is the behaviour anyone would expect from
 * "close the window to stop".
 *
 * The id is NOT a credential on its own. The server re-validates it on every request against the
 * session's owner, its `ended_at` and its `expires_at` (`resolve_impersonation`), so a stale value
 * here is a 403, not a way in.
 */

const KEY = "frosty.impersonation";
export const IMPERSONATION_PARAM = "impersonate";

/** Consume `?impersonate=<id>` if present, and strip it from the URL. */
export function captureFromUrl(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  const id = url.searchParams.get(IMPERSONATION_PARAM);
  if (!id) return;
  sessionStorage.setItem(KEY, id);
  // Removed from the address bar so the session id does not travel onward in a copied link,
  // a screenshot, or a `Referer` header.
  url.searchParams.delete(IMPERSONATION_PARAM);
  window.history.replaceState({}, "", url.toString());
}

export function currentSession(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(KEY);
}

export function clearSession(): void {
  if (typeof window !== "undefined") sessionStorage.removeItem(KEY);
}

export function impersonationHeader(): Record<string, string> {
  const id = currentSession();
  return id ? { "X-Impersonation-Session": id } : {};
}
