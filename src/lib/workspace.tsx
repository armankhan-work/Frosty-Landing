"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest, ApiClientError } from "@/lib/api";
import { canFeature, type Entitlements, type MerchantFeature } from "@/lib/entitlements";
import { getToken, signOut } from "@/lib/session";
import { captureFromUrl } from "@/lib/impersonation";
import type { Me, MerchantMe } from "@/lib/types";

/**
 * The workspace context: who you are, which merchant you are in, and what that merchant has paid
 * for. Fetched ONCE per page load, above the shell, and shared by the shell and the screen.
 *
 * ⚠️ THIS EXISTS BECAUSE OF TWO BUGS ONLY A BROWSER FOUND. The first arrangement put an
 * `EntitlementsProvider` *inside* `AppShell` — but a screen RETURNS `<AppShell>`, so the screen's
 * own `useEntitlements()` call sits OUTSIDE that provider and silently received the fail-closed
 * default: `loading: true` forever, `entitlements: null`. `GET /v1/entitlements` was never issued at
 * all, so the plan chip read "Free" for a Growth merchant and the 80% quota banner could never
 * appear. `tsc` was perfectly happy; the network panel showed the call missing.
 *
 * The second was duplication: the shell, the switcher and the screen each fetched
 * `/v1/merchants/me`, so one page load made three identical requests. Hoisting the fetch here makes
 * it one.
 *
 * The lesson is the general one: a React context is only shared by components BELOW the provider,
 * and "below" means below in the rendered tree, not below in the file.
 */

export type Workspace = {
  me: Me | null;
  merchant: MerchantMe | null;
  entitlements: Entitlements | null;
  loading: boolean;
  error: string | null;
  /** Signed in but a member of no merchant — the Master's "user in 0 merchants" state. */
  needsMerchant: boolean;
  allowed: (feature: MerchantFeature) => boolean;
  isOverride: (feature: MerchantFeature) => boolean;
  reload: () => void;
};

const EMPTY: Workspace = {
  me: null,
  merchant: null,
  entitlements: null,
  loading: true,
  error: null,
  needsMerchant: false,
  // FAIL CLOSED while loading. Consumers must check `loading` first — see `EntitlementGate`, which
  // renders a neutral state rather than the children, because flashing an unentitled screen for one
  // paint is how a merchant learns a feature exists and then loses it.
  allowed: () => false,
  isOverride: () => false,
  reload: () => {},
};

const WorkspaceContext = createContext<Workspace>(EMPTY);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [me, setMe] = useState<Me | null>(null);
  const [merchant, setMerchant] = useState<MerchantMe | null>(null);
  const [entitlements, setEntitlements] = useState<Entitlements | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    captureFromUrl();
    (async () => {
      try {
        const token = await getToken();
        if (cancelled || !token) {
          if (!cancelled) setMe(null);
          return;
        }
        const identity = await apiRequest<Me>("/v1/me");
        if (cancelled) return;
        setMe(identity);
        if (!identity.active_merchant_id) return;

        const [m, ent] = await Promise.all([
          apiRequest<MerchantMe>("/v1/merchants/me"),
          apiRequest<Entitlements>("/v1/entitlements"),
        ]);
        if (cancelled) return;
        setMerchant(m);
        setEntitlements(ent);
        setError(null);
      } catch (err) {
        if (err instanceof ApiClientError && err.status === 401) {
          void signOut();
        }
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load your account");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [nonce]);

  const value = useMemo<Workspace>(
    () => ({
      me,
      merchant,
      entitlements,
      loading,
      error,
      needsMerchant: Boolean(me) && me?.active_merchant_id === null,
      allowed: (feature) => canFeature(entitlements, feature),
      isOverride: (feature) => Boolean(entitlements?.overridden?.includes(feature)),
      reload,
    }),
    [me, merchant, entitlements, loading, error, reload],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace(): Workspace {
  return useContext(WorkspaceContext);
}
