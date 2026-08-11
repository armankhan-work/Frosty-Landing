/**
 * The API as OUR server actually shapes it. Hand-written, on purpose.
 *
 * ⚠️ THIS FILE IS THE ONE D44a WARNED ABOUT. The parallel build's `types.ts` describes ITS backend
 * — bcrypt sessions carrying `merchant_id`, a `{data, error}` envelope, paged wrappers where ours
 * returns bare arrays, 153 endpoints on paths we do not serve. Copying it would have COMPILED
 * CLEANLY and rendered `undefined` in production, which is the worst available outcome: TypeScript
 * enforcing a description of a server that does not exist. Every type below was read off the
 * router, schema or repository that produces it.
 *
 * ⚠️ AND `tsc` CANNOT CHECK ANY OF IT. This file is a hand-written claim about the API and nothing
 * in the TypeScript toolchain verifies it. `apps/api/tests/test_merchant_dashboard_api_contract.py`
 * is what does — from the Python side, where the routes live.
 */

/* ---- envelope ---------------------------------------------------------------------------- */

export type ApiEnvelope<T> = {
  data?: T;
  error?: { code: string; message: string; details?: unknown };
  meta?: { request_id?: string; next_cursor?: string | null };
};

/* ---- identity (iam, tenancy) -------------------------------------------------------------- */

export type Membership = {
  merchant_id: string | null;
  role: string | null;
  is_owner: boolean;
};

export type Me = {
  user_id: string;
  email: string | null;
  display_name: string | null;
  memberships: Membership[];
  active_merchant_id: string | null;
  is_owner: boolean;
  role: string | null;
  /** Resolved per request from the caller's membership. Presentation only — the API re-checks. */
  permissions: string[];
  /**
   * Present ONLY inside a Frostrek support session (D74). Its absence is what makes an ordinary
   * session ordinary, so the banner is rendered on presence rather than on a boolean flag.
   */
  impersonation: Impersonation | null;
};

export type Impersonation = {
  session_id: string;
  merchant_id: string;
  merchant_name: string | null;
  staff_email: string | null;
  expires_at: string | null;
};

export type BootstrapResult = { merchant_id: string; created: boolean };

/** `GET /v1/merchants/me` — the shell's merchant context. `api_key` is deliberately absent. */
export type MerchantMe = {
  id: string;
  company_name: string | null;
  plan: string;
  status: string;
  industry: string | null;
  phone: string | null;
  gstin: string | null;
  connected_to_whatsapp: boolean | null;
  conversation_retention_days: number;
  created_at: string;
  membership_id: string;
  is_owner: boolean;
  role_name: string | null;
  timezone: string | null;
  locale: string | null;
  business_hours: Record<string, unknown> | null;
  notification_prefs: Record<string, unknown> | null;
};

/* ---- analytics -------------------------------------------------------------------------- */

export type AnalyticsOverview = {
  conversations: number;
  conversations_open: number;
  ai_runs: number;
  ai_runs_grounded: number;
  kb_gaps: number;
  leads: number;
  leads_hot: number;
  meetings: number;
  handoffs: number;
  handoffs_queued: number;
  agents_active: number;
  window_days: number;
  conversations_by_day: { day: string; conversations: number }[];
  /* Added for the merchant Home screen (Phase E) — the KPIs the Master's §C names. Grouped in the
     service from columns of ONE row, so the parts always sum to the whole. */
  leads_by_temperature: { hot: number; warm: number; cold: number };
  /** Open RIGHT NOW, not windowed — the question is "what needs attention". */
  open_by_channel: { website: number; whatsapp: number };
  /** Looks FORWARD, unlike every other counter here. Excludes cancelled. */
  meetings_upcoming: number;
  meetings_pending_confirm: number;
  quotes_sent: number;
};

/* ---- notifications ---------------------------------------------------------------------- */

export type AlertCounts = { unread: number; unresolved: number; total: number };

export type MerchantAlert = {
  id: number;
  alert_type: string;
  status: string;
  resolved: boolean;
  data: Record<string, unknown> | null;
  created_at: string;
  sent_at: string | null;
};

export type AlertPage = {
  items: MerchantAlert[];
  total: number;
  limit: number;
  offset: number;
};

/**
 * The only two values `PATCH /v1/notifications/{id}` accepts.
 *
 * ⚠️ NOT `"read"`. D50a: that value shipped in the server's own allow-list and the CHECK
 * constraint rejects it. And per the service docstring, a merchant may set `status` but never the
 * separate `resolved` boolean — that is whether the underlying CONDITION cleared, which only the
 * writer of the alert (or Frostrek) can know.
 */
export const ALERT_ACK_STATUSES = ["dismissed", "resolved"] as const;
export type AlertAckStatus = (typeof ALERT_ACK_STATUSES)[number];

/* ---- agents ----------------------------------------------------------------------------- */

export type AgentMode = "website" | "whatsapp" | "unified";
export type HandoffMode = "manual_claim" | "auto_least_load" | "auto_round_robin";

export type Agent = {
  id: string;
  merchant_id: string;
  slug: string;
  agent_name: string | null;
  mode: string;
  is_active: boolean;
  handoff_mode: string;
  current_version_id: string | null;
};

/**
 * `agent_versions.config`, as `agent/schemas.py: AgentConfig` defines it.
 *
 * ⚠️ THERE IS NO RAW PROMPT FIELD AND THERE MUST NOT BE (D7). The merchant fills structured
 * fields; `ai_runtime/prompt/assemble.py` composes the system prompt from them. `AgentConfig` is
 * `extra='forbid'`, so an invented field is a 422 — which is why the agent screen explains the
 * absence rather than offering an editor.
 *
 * `tools` is `{}` and the brain never reads it — see `nav.ts` on why Automation is not ported.
 */
export type AgentConfig = {
  persona: {
    agent_name: string;
    tone: "friendly" | "professional" | "concise" | "playful";
    business_info: string;
    dos: string[];
    donts: string[];
  };
  model: { model_id: string };
  generation: { temperature: number; max_output_tokens: number };
  rag: { tau: number; top_k: number; mode: "lenient" | "strict" };
  tools: Record<string, unknown>;
  handoff: { agent_idle_timeout_minutes: number; on_agent_idle: string };
  messages: {
    kb_miss_fallback: string;
    capacity_fallback: string;
    pace_fallback: string;
  };
};

export type AgentVersion = {
  id: string;
  agent_id: string;
  version_number: number;
  config: AgentConfig;
};

export type AgentChannel = {
  id: string;
  agent_id: string;
  channel: string;
  enabled: boolean;
  settings: Record<string, unknown>;
};

/* ---- knowledge base ---------------------------------------------------------------------- */

export type KbSource = {
  source_id: string;
  filename: string | null;
  status: string;
  progress: number | null;
  size_bytes: number | null;
  error: string | null;
};

/* ---- widget (channels_web) --------------------------------------------------------------- */

export type QuickLink = { label: string; url?: string | null };

export type WidgetAppearance = {
  title: string;
  greeting: string;
  color: string;
  logo_url: string;
  position: "bottom-right" | "bottom-left";
  launcher_label: string;
  consent_notice: string;
  quick_links: QuickLink[];
};

export type WidgetSettings = {
  appearance: WidgetAppearance;
  /** §G: "Website channel disabled → snippet page warns 'channel off'". Only the server knows. */
  channel_enabled: boolean;
  /** In FULL, and deliberately unlike `/v1/settings`, which masks it (D58/D59). */
  publishable_key: string | null;
  embed_snippet: string;
};

export type WidgetKeyRotation = {
  publishable_key: string;
  publishable_key_masked: string;
  widget_needs_update: boolean;
};

/* ---- WhatsApp ---------------------------------------------------------------------------- */

export type WaAccount = {
  id: number;
  merchant_id: string;
  phone_number_id: string;
  waba_id: string;
  phone_number: string | null;
  label: string | null;
  is_default: boolean;
  is_active: boolean;
  quality_rating: string | null;
  created_at: string;
};

export type WaTemplate = {
  id: number;
  wa_account_id: number;
  template_name: string;
  meta_template_id: string | null;
  status: string;
  category: string | null;
  language: string;
  last_synced_at: string | null;
};

export type WaDeliveryIssue = {
  source: string;
  from_number: string | null;
  to_number: string | null;
  message_id: string | null;
  detail: string | null;
  created_at: string;
};

/* ---- unified ----------------------------------------------------------------------------- */

export type UnifiedSettings = {
  enabled: boolean;
  cta_label: string;
  wa_number: string | null;
  /** Resolved server-side. `false` means the PATCH will refuse with `entitlement_required`. */
  entitled: boolean;
  redemption_wired: boolean;
};

/* ---- inbox (handoff) --------------------------------------------------------------------- */

export type QueueItem = {
  handoff_id: string;
  conversation_id: string;
  trigger_reason: string | null;
  channel: string;
  contact_label: string | null;
  waiting_since: string;
  last_message_at: string | null;
};

export type ActiveConversation = {
  conversation_id: string;
  channel: string;
  mode: string;
  contact_label: string | null;
  assigned_to_member_id: string | null;
  handoff_status: string | null;
  last_message_at: string | null;
  created_at: string;
};

export type InboxMessage = {
  id: number;
  sender_type: string;
  body: string | null;
  created_at: string;
};

export type ClaimResult = {
  conversation_id: string;
  claimed: boolean;
  idle_deadline_at: string | null;
};

export type ReplyResult = {
  conversation_id: string;
  sent: boolean;
  wamid: string | null;
  duplicate: boolean;
};

export type ResolveResult = {
  conversation_id: string;
  disposition: string;
  closed: boolean;
  already_closed: boolean;
};

export type HeartbeatResult = { online: boolean; changed: boolean };

/** One frame off `GET /v1/inbox/ws`. `kind: "ready"` is the handshake, not an event. */
export type InboxEvent = {
  id?: number;
  kind: string;
  conversation_id?: string | null;
  handoff_id?: string | null;
  actor_member_id?: string | null;
  created_at?: string;
  replayed?: boolean;
  generation?: number;
  membership_id?: string | null;
};

/* ---- conversations ---------------------------------------------------------------------- */

export type Conversation = {
  id: string;
  contact_id: string | null;
  agent_id: string | null;
  channel: string;
  mode: string;
  status: string;
  credit_settled: boolean;
  credits_charged: number;
  idle_expires_at: string | null;
  created_at: string;
};

export type ConversationMessage = {
  id: number;
  sender_type: string;
  text: string;
  created_at: string;
};

/* ---- leads ------------------------------------------------------------------------------ */

export const LEAD_TEMPERATURES = ["cold", "warm", "hot"] as const;
export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "lost",
] as const;

export type LeadTemperature = (typeof LEAD_TEMPERATURES)[number];
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: number;
  merchant_id: string;
  contact_id: string | null;
  conversation_id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  interest: string | null;
  budget: string | null;
  source: string | null;
  channel: string | null;
  score: number;
  temperature: string;
  status: string;
  follow_up_sent: boolean;
  created_at: string;
  updated_at: string;
};

/* ---- meetings + calendar ---------------------------------------------------------------- */

export const MEETING_STATUSES = [
  "scheduled",
  "confirmed",
  "cancelled",
  "completed",
  "no_show",
  "rescheduled",
] as const;
export type MeetingStatus = (typeof MEETING_STATUSES)[number];

export type Meeting = {
  id: string;
  merchant_id: string;
  title: string;
  description: string | null;
  status: string;
  scheduled_start: string;
  scheduled_end: string;
  timezone: string | null;
  attendee_name: string | null;
  attendee_email: string | null;
  attendee_phone: string | null;
  conversation_id: string | null;
  meet_link: string | null;
  google_event_id: string | null;
  calendly_event_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  /** Not a column: what the last calendar sync did, so "saved" and "on the calendar" differ. */
  calendar_sync: string | null;
};

export type CalendarConnection = {
  id: number;
  merchant_id: string;
  owner_membership_id: string | null;
  provider: string;
  email: string | null;
  token_expiry: string | null;
  scope: string | null;
  calendly_user_uri: string | null;
  connected: boolean;
  created_at: string;
  updated_at: string;
};

export type CalendarStatus = {
  connections: CalendarConnection[];
  connected_providers: string[];
  /** `false` = the Google credentials are absent, so the consent flow cannot complete (D53c). */
  oauth_configured: boolean;
};

/* ---- quotations + catalog --------------------------------------------------------------- */

export const QUOTE_STATUSES = [
  "draft",
  "sent",
  "viewed",
  "accepted",
  "rejected",
  "expired",
  "revised",
] as const;
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export type QuoteLineItem = {
  id: string;
  product_id: string | null;
  description: string | null;
  /** Money and quantities arrive as exact numeric strings. Never parse them into a float. */
  quantity: string;
  unit_price: string;
  line_total: string;
  sort_order: number;
};

export type Quotation = {
  id: string;
  merchant_id: string;
  title: string;
  content: string | null;
  status: string;
  currency: string;
  amount: string;
  gst_rate: string;
  gst_amount: string;
  total_with_gst: string;
  recipient_name: string | null;
  recipient_email: string | null;
  recipient_phone: string | null;
  conversation_id: string | null;
  lead_id: number | null;
  expires_at: string | null;
  pdf_file_object_id: string | null;
  created_at: string;
  updated_at: string;
  items: QuoteLineItem[];
};

export type QuoteSendResult = {
  delivery_id: string;
  status: string;
  channel: string;
  recipient: string | null;
  /** `false` for WhatsApp — it still needs an approved template (D53b). */
  transport_configured: boolean;
};

export type Product = {
  id: string;
  merchant_id: string;
  name: string;
  description: string | null;
  unit_price: string;
  currency: string;
  is_active: boolean;
  created_at: string;
};

/* ---- billing ---------------------------------------------------------------------------- */

export type Plan = {
  id: string;
  slug: string;
  name: string;
  price_monthly_inr: string;
  price_annual_inr: string;
  setup_fee_inr: string;
  included_conversations: number | null;
  allows_whatsapp: boolean;
  is_active: boolean;
};

export type Wallet = {
  merchant_id: string;
  unallocated_credits: string;
  total_credits_purchased: string;
  total_credits_spent: string;
  /** Spend inside the CURRENT billing period. The quota bar must use this, never the lifetime one. */
  credits_used_this_period: string;
  /** When the period figure resets. Null for a merchant with no subscription row yet. */
  period_end: string | null;
};

export type LedgerEntry = {
  id: number;
  transaction_type: string;
  credits: string;
  balance_after: string | null;
  amount_inr: string | null;
  conversation_id: string | null;
  agent_id: string | null;
  notes: string | null;
  created_at: string;
};

export type Subscription = {
  id: string;
  plan_id: string;
  plan_slug: string | null;
  status: string;
  billing_cycle: string;
  razorpay_subscription_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  setup_fee_paid: boolean;
  created_at: string;
};

export type SubscribeResult = {
  subscription_id: string;
  razorpay_subscription_id: string;
  short_url: string;
  status: string;
};

export type TopupResult = {
  payment_link_id: string;
  short_url: string;
  credits: number;
  amount_inr: string;
};

export type CancelResult = { status: string; cancel_at: string | null };

/* ---- settings --------------------------------------------------------------------------- */

export type MerchantSettings = {
  merchant_id: string;
  company_name: string;
  industry: string | null;
  phone: string | null;
  gstin: string | null;
  plan: string;
  status: string;
  timezone: string | null;
  locale: string | null;
  autonomous_quote_sending: boolean | null;
  business_hours: Record<string, unknown> | null;
  notification_prefs: Record<string, unknown> | null;
  /** The MASK. The full key comes only from the rotate call, or from `/v1/widget/settings`. */
  publishable_key_masked: string | null;
  updated_at: string | null;
};

export type ApiKeyRotation = {
  publishable_key: string;
  publishable_key_masked: string;
  widget_needs_update: boolean;
};

/* ---- team ------------------------------------------------------------------------------- */

export type TeamMember = {
  membership_id: string;
  user_id: string;
  email: string;
  display_name: string;
  role_name: string | null;
  is_owner: boolean;
  is_active: boolean;
  created_at: string;
  /** `false` = the user row exists but has no Supabase identity yet, so they cannot sign in. */
  can_sign_in: boolean;
};

export type PendingInvite = {
  invite_id: string;
  invited_email: string;
  role_name: string | null;
  expires_at: string;
  created_at: string;
};

export type Team = { members: TeamMember[]; pending_invites: PendingInvite[] };

/**
 * `invite_token` is returned ONCE and never stored — only its SHA-256 is.
 * `delivery: "not_sent"` because there is no email provider on this path: the merchant sends the
 * link themselves, and the UI has to say so rather than implying an email went out.
 */
export type InviteCreated = {
  invite_id: string;
  invited_email: string;
  role_name: string;
  expires_at: string;
  invite_token: string;
  delivery: string;
};

export type InvitePreview = {
  company_name: string;
  invited_email: string;
  expires_at: string;
};

export type InviteAccepted = {
  membership_id: string;
  merchant_id: string;
  accepted: boolean;
};

/** What `team.invite` accepts. Read off `MEMBER_ROLES` in `team/service.py`. */
export const INVITABLE_ROLES = ["manager", "agent", "viewer"] as const;
export type InvitableRole = (typeof INVITABLE_ROLES)[number];

/* ---- webhooks --------------------------------------------------------------------------- */

export type WebhookEndpoint = {
  id: string;
  merchant_id: string;
  event_type: string;
  target_url: string;
  /** The MASK. `signing_secret` on the create response is the only full disclosure. */
  secret: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type WebhookCreated = WebhookEndpoint & { signing_secret: string };

export type WebhookDelivery = {
  id: string;
  endpoint_id: string;
  merchant_id: string;
  event_type: string;
  status: string;
  attempt_count: number;
  response_code: number | null;
  response_body: string | null;
  next_retry_at: string | null;
  created_at: string;
};

/* ---- audit ------------------------------------------------------------------------------ */

export type AuditEvent = {
  id: number;
  action: string;
  actor_id: string | null;
  actor_type: string | null;
  resource_type: string | null;
  resource_id: string | null;
  status: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
};

export type AuditPage = {
  items: AuditEvent[];
  total: number;
  limit: number;
  offset: number;
};

/* ---- contacts --------------------------------------------------------------------------- */

export type TimelineEntry = Record<string, unknown> & {
  kind?: string;
  created_at?: string;
};

/** GET /v1/analytics/quality — Master §15's signals. Percentiles are NULL when there is no data:
 *  "no data" and "0 ms" are different facts and the screen must render them differently. */
export type AnalyticsQuality = {
  window_days: number;
  runs: number;
  /** The percentile denominator: runs that streamed a token AND recorded an end-to-end latency.
   *  Refusals are in `runs` and not here, which is why all four percentiles are comparable. */
  timed_runs: number;
  ttft_p50_ms: number | null;
  ttft_p95_ms: number | null;
  latency_p50_ms: number | null;
  latency_p95_ms: number | null;
  /** ⚠️ NOT `1 - grounding_fail_rate`. `grounding_ok` is three-valued and NULL means the gate never
   *  decided, so the complement counts every un-decided turn as a KB success. Render THIS. */
  grounded_rate: number;
  grounding_fail_rate: number;
  refuse_rate: number;
  kb_gap_rate: number;
  feedback_count: number;
  thumbs_down_rate: number;
  /** Present only when ?advanced=true AND the merchant has `ai_insights`. */
  by_day?: { day: string; runs: number; grounding_fails: number }[];
};

/** GET /v1/analytics/usage — credits at CONVERSATION grain, cost at MODEL CALL grain. */
export type AnalyticsUsage = {
  window_days: number;
  conversations: number;
  credits_charged: number;
  credits_balance: number;
  by_model: { model: string; calls: number; prompt_tokens: number; completion_tokens: number }[];
};
