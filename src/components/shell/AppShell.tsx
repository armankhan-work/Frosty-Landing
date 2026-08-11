"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PageState } from "@/components/ui/PageState";
import { apiRequest } from "@/lib/api";
import { isPastDue, isSuspended } from "@/lib/entitlements";
import { MERCHANT_NAV, type NavItem } from "@/lib/nav";
import { can, roleLabel, type MerchantPermission } from "@/lib/permissions";
import type { AlertCounts } from "@/lib/types";
import { useWorkspace } from "@/lib/workspace";
import { ImpersonationBanner } from "./ImpersonationBanner";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CommandMenu } from "./CommandMenu";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  requires?: MerchantPermission | MerchantPermission[];
  onboardingMode?: boolean;
};

const UNREAD_POLL_MS = 90_000;

export function AppShell({ children, title, subtitle, actions, requires, onboardingMode }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const ws = useWorkspace();
  const { me, loading, needsMerchant, entitlements } = ws;
  const [unread, setUnread] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    if (!loading && !me) {
      window.location.href = "/login";
    }
  }, [loading, me]);

  useEffect(() => {
    if (!me || !can(me.permissions, "dashboard:view")) return;
    let cancelled = false;
    async function tick() {
      try {
        const out = await apiRequest<AlertCounts>("/v1/notifications/unread-count");
        if (!cancelled) setUnread(out.unread || 0);
      } catch {}
    }
    void tick();
    const id = window.setInterval(() => void tick(), UNREAD_POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [me]);

  if (loading || !me) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm font-medium">Loading Frosty…</p>
        </div>
      </div>
    );
  }

  if (needsMerchant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <PageState
          icon="storefront"
          title="You are not part of a workspace yet"
          description={
            "Create one to get started, or ask whoever invited you to send the link again — an " +
            "invitation has to be accepted while it is still valid."
          }
          primaryHref="/signup?step=company"
          primaryLabel="Create a workspace"
        />
      </div>
    );
  }

  const visible: (NavItem & { locked: boolean })[] = MERCHANT_NAV.filter(
    (item) => !item.permissions || can(me.permissions, item.permissions),
  ).map((item) => ({
    ...item,
    locked: Boolean(item.feature) && !loading && !ws.allowed(item.feature!),
  }));

  const primary = visible.filter((n) => n.section === "primary");
  const revenue = visible.filter((n) => n.section === "revenue");
  const admin = visible.filter((n) => n.section === "admin");

  const allowed = requires === undefined || can(me.permissions, requires);
  const planLabel = entitlements?.plan_name || (loading ? "…" : "Free");

  const banner = isSuspended(entitlements)
    ? { tone: "bg-red-500 text-white", text: "This workspace is suspended. Your agents have stopped answering and configuration is read-only. Contact support to restore it." }
    : isPastDue(entitlements)
      ? { tone: "bg-amber-500 text-white", text: "Payment is overdue. Your agents are still answering for now — settle the invoice to avoid suspension." }
      : null;

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/20">
      {!onboardingMode && (
        <Sidebar 
          primary={primary} 
          revenue={revenue} 
          admin={admin} 
          me={me} 
          planLabel={planLabel} 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
          onboardingMode={onboardingMode}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 relative">
        {me?.impersonation ? (
          <div className="sticky top-0 z-[100] w-full">
            <ImpersonationBanner session={me.impersonation} />
          </div>
        ) : null}

        <Topbar 
          me={me} 
          unread={unread} 
          openCommandPalette={() => setCommandOpen(true)} 
          onboardingMode={onboardingMode}
          title={title}
        />
        
        <CommandMenu open={commandOpen} setOpen={setCommandOpen} />

        {banner && (
          <div className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold shadow-sm ${banner.tone}`} role="status">
            <AlertTriangle className="w-4 h-4" />
            <span>{banner.text}</span>
          </div>
        )}

        <div className="px-6 sm:px-10 py-8 max-w-7xl mx-auto w-full">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
              {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>

          <AnimatePresence mode="wait">
            <motion.main 
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full relative"
            >
              {allowed ? (
                children
              ) : (
                <PageState
                  icon="lock"
                  tone="error"
                  title="You don't hold this permission"
                  description={
                    "This screen needs a permission your role does not carry. Ask an owner to grant " +
                    "it — permissions come from the database, so the change takes effect on your next " +
                    "request with no need to sign in again."
                  }
                  lockedReason={`Signed in as ${roleLabel(me.role, me.is_owner)}`}
                  secondaryHref="/home"
                  secondaryLabel="Back to home"
                />
              )}
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
