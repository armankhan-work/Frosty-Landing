/**
 * Plan entitlements — what the merchant has PAID for, as distinct from what their role permits.
 *
 * The two are different refusals and the Master says so: `forbidden` is a role problem and gets
 * "ask your owner"; `feature_not_entitled` is a plan problem and gets the upgrade CTA ("Soft lock —
 * 'Not on your plan.' Never silent fail"). `app/core/authz.py` keeps them as two distinct error
 * codes for exactly this reason.
 *
 * ⚠️ THE KEYS ARE OUR DATABASE'S, NOT THE MASTER'S PROSE. The doc writes `channels.whatsapp` and
 * `features.meetings_calendar`; `tenant_admin.plan_feature_defaults` holds `channel_whatsapp` and
 * `meeting_scheduling`. The parallel build's nav gates on the doc's spelling, which resolves to
 * `undefined` against our API — falsy, so it would have hidden WhatsApp, Unified, Meetings, Quotes
 * and Webhooks from every merchant on every plan. Migration 0039 documents the mapping;
 * `test_merchant_dashboard_api_contract.py` asserts this list against the table.
 */

export const MERCHANT_FEATURES = [
  "ai_insights",
  "api_access",
  "channel_unified",
  "channel_web",
  "channel_whatsapp",
  "human_handoff",
  "knowledge_base",
  "lead_capture",
  "meeting_scheduling",
  "multi_calendar",
  "multi_whatsapp",
  "quotations",
  "raw_prompt",
  "sandbox_preview",
  "team_rbac",
  "webhooks",
] as const;

export type MerchantFeature = (typeof MERCHANT_FEATURES)[number];

export type Entitlements = {
  plan_slug: string | null;
  plan_name: string | null;
  subscription_status: string | null;
  setup_fee_paid: boolean | null;
  features: Record<string, boolean>;
  overridden: string[];
  limits: Record<string, number>;
  /** Per limit (D78) — `max_team_members` and `max_kb_mb` are applied by the API;
   *  `max_conversations_per_month` is bounded by the credit wallet instead. */
  limits_enforced: Record<string, boolean>;
};

/**
 * Is this feature on the merchant's plan?
 *
 * Absent is FALSE, deliberately and not by accident: `GET /v1/entitlements` returns a total map
 * over the catalogue, so a missing key means the client and the server disagree about the
 * vocabulary — and in that situation the safe answer is "no". `resolve_entitlement` fails closed
 * the same way.
 */
export function canFeature(
  ent: Entitlements | null | undefined,
  feature: MerchantFeature,
): boolean {
  return Boolean(ent?.features?.[feature]);
}

/** True when a plan exists and it is not a plan that stops the product working. */
export function isSuspended(ent: Entitlements | null | undefined): boolean {
  const s = ent?.subscription_status;
  return s === "suspended" || s === "cancelled";
}

export function isPastDue(ent: Entitlements | null | undefined): boolean {
  const s = ent?.subscription_status;
  return s === "past_due" || s === "grace";
}

/**
 * Human wording for a numeric limit. `-1` is the Master's "unlimited" sentinel
 * (`plans.entitlements` uses it for Enterprise).
 *
 * ⚠️ Callers must pair this with `limits_enforced[key]` — which is per LIMIT, not one flag. Two
 * of the three caps are applied by the API (D78); `max_conversations_per_month` is not, because
 * the credit wallet bounds it. A screen must not claim the server will stop at a cap it will not.
 */
export function limitLabel(value: number | undefined): string {
  if (value === undefined) return "—";
  return value < 0 ? "Unlimited" : String(value);
}
