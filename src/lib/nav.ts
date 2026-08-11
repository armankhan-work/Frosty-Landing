import type { MerchantFeature } from "./entitlements";
import type { MerchantPermission } from "./permissions";

export type NavItem = {
  href: string;
  label: string;
  icon: string;
  /** Any one of these unlocks the item. Omitted = visible to any active member. */
  permissions?: MerchantPermission[];
  /**
   * A plan feature the DESTINATION'S API ACTUALLY ENFORCES. See the long note below — this is
   * deliberately not the Master's menu→feature table, and the difference matters.
   */
  feature?: MerchantFeature;
  section: "primary" | "revenue" | "admin";
};

/**
 * The merchant nav, gated on what the DESTINATION SCREEN's first call really requires.
 *
 * Each `permissions` entry was read off the router's own `require_permission(...)` call, not off the
 * Master's prose and not off the parallel build's nav — theirs gates on `analytics:read`,
 * `channels:wa`, `meetings:config` and `quotes:config`, four codenames that exist in no row of
 * `tenant_admin.permissions`, so those four items would have been invisible to every role forever.
 * That is the D44c failure repeating in the other dashboard, and it is why this file is checked
 * against the router by a Python test rather than trusted.
 *
 * ⚠️ `feature` LOCKS THE ITEM; IT NEVER HIDES IT. The Master's §3 says "feature false → hide nav",
 * and we lock instead — deliberately, and the distinction is the whole reason this comment is long.
 *
 * Hiding teaches a merchant the feature does not exist. Locking teaches them it is purchasable,
 * which is what the Master's own fallback asks for two lines later: "Soft lock — 'Not on your plan.
 * Contact support / upgrade.' **Never silent fail**". D44c is the other half: hiding working
 * functionality is a real defect, not a safe default.
 *
 * ⚠️ AND THE LOCK IS NOT A SECURITY BOUNDARY, because on OUR API most of these flags are enforced
 * NOWHERE. Only `human_handoff` (`handoff/router.py`'s `require_entitlement`) and `channel_unified`
 * (`unified/service.py`) actually refuse; `meeting_scheduling`, `quotations`, `webhooks` and
 * `channel_whatsapp` are checked by nothing, so a free-plan merchant really can register an
 * outbound webhook today with `curl`. That is under-enforcement in the API, recorded in migration
 * 0039's footer, and it does not change what the UI should do: a merchant who has not paid for a
 * feature should not be handed it by our own dashboard.
 *
 * Every item with a `feature` here is also wrapped in an `EntitlementGate` on its own screen, and
 * the two must name the SAME key — otherwise the nav shows an unlocked door onto a locked room,
 * which is exactly what the browser caught the first time round.
 *
 * Two of the parallel build's screens are refused outright rather than ported; both refusals are
 * written on their own screen the way D44c requires:
 *   * **Automation** — their per-agent feature matrix (meetings/quotes/leads/handoff × ai/human/off
 *     plus approvals) writes `agent_versions.config.tools`, which our schema declares "empty in
 *     Wave 1" and our brain never reads. It would have saved, returned 200 and changed nothing.
 *     The parts we DO support live where the API keeps them: handoff mode and idle timeout on the
 *     agent, `autonomous_quote_sending` in Settings.
 *   * **Impersonate callback** — `resolve_impersonation` has no production caller (D44h). A screen
 *     that appears to enter a support session and does not is worse than none.
 */
export const MERCHANT_NAV: NavItem[] = [
  {
    href: "/home",
    label: "Home",
    icon: "dashboard",
    permissions: ["dashboard:view"],
    section: "primary",
  },

  {
    // NO `feature` key, on purpose. The screen is open to every plan; only the ADVANCED CHARTS
    // inside it are gated on `ai_insights`, with an upsell card in place of them. A `feature` here
    // would lock the whole door, which is not what Master 1921/1928 asks for ("upsell card shown
    // instead of broken charts") and is the D44c failure this file already documents.
    href: "/analytics",
    label: "Analytics",
    icon: "insights",
    permissions: ["dashboard:view"],
    section: "primary",
  },
  {
    href: "/agents",
    label: "Agents",
    icon: "smart_toy",
    permissions: ["agent:config"],
    section: "primary",
  },
  {
    href: "/knowledge",
    label: "Knowledge",
    icon: "menu_book",
    permissions: ["kb:view"],
    section: "primary",
  },
  {
    href: "/widget",
    label: "Widget",
    icon: "widgets",
    permissions: ["widget:config"],
    section: "primary",
  },
  {
    href: "/whatsapp",
    feature: "channel_whatsapp",
    label: "WhatsApp",
    icon: "chat",
    permissions: ["agent:config"],
    section: "primary",
  },
  {
    href: "/unified",
    feature: "channel_unified",
    label: "Unified",
    icon: "dynamic_feed",
    permissions: ["dashboard:view"],
    section: "primary",
  },
  {
    // The one whose gate mirrors a real `require_entitlement`: every route behind it returns
    // `feature_not_entitled` without `human_handoff`, so here the lock and the server agree.
    href: "/inbox",
    label: "Inbox",
    icon: "inbox",
    permissions: ["inbox:read"],
    feature: "human_handoff",
    section: "primary",
  },
  {
    href: "/leads",
    label: "Leads",
    icon: "person_search",
    permissions: ["leads:read"],
    section: "revenue",
  },
  {
    href: "/meetings",
    feature: "meeting_scheduling",
    label: "Meetings",
    icon: "event_available",
    permissions: ["meetings:view"],
    section: "revenue",
  },
  {
    href: "/quotes",
    feature: "quotations",
    label: "Quotes",
    icon: "request_quote",
    permissions: ["quotations:view"],
    section: "revenue",
  },
  {
    href: "/billing",
    label: "Billing",
    icon: "payments",
    permissions: ["billing:view"],
    section: "admin",
  },
  {
    href: "/team",
    label: "Team",
    icon: "group",
    permissions: ["team:manage"],
    section: "admin",
  },
  {
    href: "/webhooks",
    feature: "webhooks",
    label: "Webhooks",
    icon: "webhook",
    permissions: ["webhooks:manage"],
    section: "admin",
  },
  {
    // `/v1/audit` is gated on `team:manage`, NOT on a read code — so the Activity feed is the
    // owner's and the team manager's. Their build gated it on `analytics:read`, which would have
    // shown it to every viewer and then 403'd them.
    href: "/activity",
    label: "Activity",
    icon: "history",
    permissions: ["team:manage"],
    section: "admin",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: "settings",
    permissions: ["dashboard:view"],
    section: "admin",
  },
  {
    href: "/help",
    label: "Help Hub",
    icon: "help",
    permissions: ["dashboard:view"],
    section: "admin",
  },
];
