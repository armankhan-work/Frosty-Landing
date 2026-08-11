import type { MerchantAlert } from "@/lib/types";

/**
 * Human copy for a `merchant_alerts` row, and where to go about it.
 *
 * ⚠️ THEIR ALERT TYPE CARRIES `title` AND `body` AS COLUMNS. Ours does not — `merchant_alerts` has
 * `alert_type` and a `data` jsonb, and the words are the reader's problem. So this file is the words.
 *
 * ⚠️ AND THERE ARE ONLY THREE TYPES ANYTHING ACTUALLY WRITES, which is worth stating because the
 * server's own docstring claims four. Grepped for `INSERT INTO tenant_admin.merchant_alerts` across
 * the whole API:
 *
 *   * `hot_lead_detected`  — `leads/repository.py:124`
 *   * `custom`             — `contacts/repository.py:29`, always with `data.kind`, today only
 *                            `handoff_requested`
 *   * `wa_send_failed`     — `channels_wa/repository.py:488` and `:514`, with `data.kind` telling a
 *                            dead token from an exhausted event
 *
 * `credit_warning_80` is named in `notifications/service.py`'s docstring and in two tests, and
 * **nothing raises it** — see DECISIONS. The Master's §C does ask for a quota alert, so the entry
 * below stays: the day a sweep raises it, this renders without another edit. An unknown type falls
 * back to its raw name rather than being hidden, because an alert nobody can read is still an alert
 * somebody should see.
 */
type AlertCopy = { title: string; body: string; href: string | null; icon: string };

export function alertCopy(alert: MerchantAlert): AlertCopy {
  const data = alert.data || {};
  const kind = String(data.kind || "");

  switch (alert.alert_type) {
    case "hot_lead_detected":
      return {
        title: "A hot lead came in",
        body:
          [data.name, data.email, data.phone].filter(Boolean).join(" · ") ||
          "The agent scored a conversation as a hot lead.",
        href: "/leads",
        icon: "local_fire_department",
      };

    case "wa_send_failed":
      return {
        title:
          kind === "token_dead"
            ? "WhatsApp is disconnected"
            : "A WhatsApp message could not be delivered",
        body:
          kind === "token_dead"
            ? "Meta rejected the access token for this number. Reconnect it to start answering again."
            : String(data.detail || data.error || "The send failed after every retry."),
        href: "/whatsapp",
        icon: "chat_error",
      };

    case "credit_warning_80":
    case "credit_warning_100":
      return {
        title:
          alert.alert_type === "credit_warning_100"
            ? "You are out of conversation credits"
            : "You have used 80% of your credits",
        body:
          alert.alert_type === "credit_warning_100"
            ? "The agent has stopped answering new conversations. Top up to resume."
            : "Top up before you run out, or the agent will stop answering new conversations.",
        href: "/billing",
        icon: "account_balance_wallet",
      };

    case "custom":
      if (kind === "handoff_requested") {
        // ⚠️ adj 12 IS A TWO-HALVES RULE AND THIS CARD READS BOTH — from the alert itself, not
        // from a live entitlements lookup. `persist` records WHY nobody could be queued at the
        // moment the customer asked, which is the state that matters: a plan changed since then
        // must not rewrite what happened.
        //
        // The two halves need OPPOSITE advice. `handoff/service.py`'s enqueue refuses on either
        // a missing entitlement OR no member with `accepts_handoff`, and pointing the second at
        // /billing would try to sell someone a feature they already bought — the same mistake the
        // upsell whitelist exists to prevent.
        const blocked = data.handoff_block_reason;
        if (blocked === "not_entitled") {
          return {
            title: "Someone asked for a human",
            body:
              "A visitor asked to speak to a person. Your plan doesn't include live handoff, " +
              "so nobody could pick it up — upgrade to route these to your inbox.",
            href: "/billing",
            icon: "support_agent",
          };
        }
        if (blocked === "no_taker") {
          return {
            title: "Someone asked for a human — nobody could take it",
            body:
              "A visitor asked to speak to a person. Your plan includes live handoff, but no " +
              "active team member accepts handoffs yet, so it was not queued.",
            href: "/team",
            icon: "support_agent",
          };
        }
        if (blocked === "disabled_by_staff") {
          // Frostrek turned this off for THIS merchant, overriding a plan that may well include
          // it. Never an upgrade prompt — they are already paying. Support is the honest route.
          return {
            title: "Someone asked for a human — handoff is switched off",
            body:
              "A visitor asked to speak to a person. Live handoff is currently disabled on your " +
              "account, so it was not queued. Contact support if that is unexpected.",
            href: "/settings",
            icon: "support_agent",
          };
        }
        // `unresolved` (our own probe failed) and any future reason fall through to the neutral
        // copy: we do not know that nobody came, so we must not say so.
        return {
          title: "Someone asked for a human",
          body: "A visitor asked to speak to a person. The conversation is waiting in the inbox.",
          href: "/inbox",
          icon: "support_agent",
        };
      }
      return {
        title: kind ? humanise(kind) : "Notification",
        body: describe(data),
        href: null,
        icon: "notifications",
      };

    default:
      return {
        title: humanise(alert.alert_type),
        body: describe(data),
        href: null,
        icon: "notifications",
      };
  }
}

/** `handoff_requested` -> "Handoff requested". Used only for types this file does not know. */
function humanise(raw: string): string {
  const words = raw.replace(/[_.]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * Last resort for an unknown alert's body: show its data rather than an empty card.
 *
 * Keys are listed, values are NOT interpolated blindly — `data` can hold a phone number or an email,
 * and an unknown alert type is exactly the case where we do not know whether it is safe to render.
 */
function describe(data: Record<string, unknown>): string {
  const keys = Object.keys(data).filter((k) => k !== "kind");
  if (!keys.length) return "No further detail.";
  return `Details: ${keys.join(", ")}.`;
}

/** Unread means the recipient has not acted: `pending` (raised) or `sent` (emailed, not acked). */
export function isUnread(alert: MerchantAlert): boolean {
  return alert.status === "pending" || alert.status === "sent";
}
