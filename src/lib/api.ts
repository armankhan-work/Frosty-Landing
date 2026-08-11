"use client";

import { API_URL } from "./constants";
import { getToken } from "./session";
import { impersonationHeader } from "@/lib/impersonation";
import type { ApiEnvelope } from "./types";

export class ApiClientError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

type RequestOpts = {
  method?: string;
  body?: unknown;
  /** Retries apply to TRANSPORT failures only — never to a response the server actually sent. */
  retries?: number;
  signal?: AbortSignal;
  /** Override the auto-resolved token (used by signup to pass the token obtained from signUp directly). */
  token?: string;
  /** Internal: keep the `{data, meta}` envelope instead of unwrapping. Use `apiPage`, not this. */
  _withMeta?: boolean;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithRetry(
  url: string,
  init: RequestInit,
  retries: number,
): Promise<Response> {
  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fetch(url, init);
    } catch (err) {
      // An aborted request is the caller changing its mind, not a flaky network. Retrying it
      // would resurrect a request whose component has already unmounted.
      if (err instanceof DOMException && err.name === "AbortError") throw err;
      lastErr = err;
      if (attempt < retries) {
        await sleep(350 * (attempt + 1));
        continue;
      }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("network_error");
}

/**
 * One call against the platform API.
 *
 * The token is fetched HERE rather than threaded in by every caller, because it is async now
 * (Supabase refreshes it) — see `session.ts`. Reading it per request also means a sign-out takes
 * effect on the very next call instead of on the next remount.
 *
 * Retries are GET/HEAD only. The parallel build retried mutations once, which for
 * `POST /credits/adjust` means a network blip could submit the same credit grant twice. Ours is
 * idempotency-keyed server-side, so a retry would be safe — but "safe because of a key the caller
 * happens to send" is not a property the transport layer should assume.
 *
 * ⚠️ RETURNS `data` AND DISCARDS `meta`, WHICH MAKES EVERY PAGINATED ENDPOINT UNPAGEABLE. That is
 * why `apiPage` exists below: the API puts `next_cursor` in `meta`, so a caller that only ever sees
 * `data` has no way to ask for page two. Billing's "Load more" button was dead for exactly this
 * reason — `setCursor` was never called anywhere in the file, so the button never rendered and the
 * credit history was permanently capped at 25 rows. `/v1/catalog/products`, `/v1/inbox/queue` and
 * `/v1/inbox/conversations` are the same shape.
 */
export async function apiRequest<T>(path: string, opts: RequestOpts = {}): Promise<T> {
  const method = (opts.method || "GET").toUpperCase();
  const idempotent = method === "GET" || method === "HEAD";
  const headers: Record<string, string> = { Accept: "application/json" };
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";

  const token = opts.token ?? await getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  // Attached HERE rather than at each call site, for the same reason the server reads it from a
  // context var rather than a parameter: one place to be right, and no screen that can forget.
  Object.assign(headers, impersonationHeader());

  let res: Response;
  try {
    res = await fetchWithRetry(
      `${API_URL}${path}`,
      {
        method,
        headers,
        body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
        signal: opts.signal,
      },
      opts.retries ?? (idempotent ? 2 : 0),
    );
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new ApiClientError(
      "network_error",
      `Cannot reach the API at ${API_URL}.`,
      0,
    );
  }
  return parseApiResponse<T>(res, opts._withMeta);
}

async function parseApiResponse<T>(res: Response, withMeta = false): Promise<T> {
  const raw = await res.text();
  let json: ApiEnvelope<T> | null = null;
  try {
    json = raw ? (JSON.parse(raw) as ApiEnvelope<T>) : null;
  } catch {
    throw new ApiClientError(
      "bad_response",
      raw.slice(0, 180).replace(/\s+/g, " ") || `Request failed (${res.status})`,
      res.status,
    );
  }

  // The API's error envelope is `{error: {code, message, details}, meta}` — no `data` key at all.
  // Check it before `res.ok` so a 200 that somehow carries an error is still treated as one.
  if (json && json.error) {
    throw new ApiClientError(json.error.code, json.error.message, res.status);
  }
  if (!res.ok) {
    throw new ApiClientError("http_error", res.statusText || "Request failed", res.status);
  }
  if (withMeta) {
    const env = json as ApiEnvelope<T>;
    return { data: env.data, meta: env.meta ?? {} } as unknown as T;
  }
  return (json as ApiEnvelope<T>).data as T;
}

/**
 * The same call, but keeping `meta` — for the endpoints that paginate.
 *
 * Deliberately a SECOND function rather than a wider return type on `apiRequest`: ~90 call sites use
 * the plain form and want the payload, not a wrapper. A caller that needs the cursor opts in, and
 * the type tells you which endpoints are paginated.
 */
export async function apiPage<T>(
  path: string,
  opts: RequestOpts = {},
): Promise<{ data: T; meta: { next_cursor?: string | null } }> {
  const envelope = await apiRequest<T>(path, { ...opts, _withMeta: true } as RequestOpts);
  return envelope as unknown as { data: T; meta: { next_cursor?: string | null } };
}

/** Build a query string, dropping empties so `?q=` never reaches a `min_length=1` validator. */
export function qs(params: Record<string, string | number | boolean | null | undefined>): string {
  const out = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === null || v === undefined || v === "") continue;
    out.set(k, String(v));
  }
  const s = out.toString();
  return s ? `?${s}` : "";
}
