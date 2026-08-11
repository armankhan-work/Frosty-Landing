"use client";

import { apiRequest } from "@/lib/api";
import type { Agent, AgentChannel, KbSource, WidgetSettings } from "@/lib/types";

/**
 * The go-live checklist, DERIVED from the API rather than stored.
 *
 * ⚠️ THERE IS NO `service_onboarding` TABLE, AND WE DID NOT ADD ONE. The Master's §B says "Progress
 * persisted (service_onboarding **or equivalent**)" and lists the resumption requirement as "user
 * closes mid-onboarding → resumes from last completed step". Both are satisfied by deriving each
 * step from the thing it produces:
 *
 *   * an agent exists            -> `GET /v1/agents`
 *   * knowledge exists           -> `GET /v1/kb/sources` (a `ready` source)
 *   * the widget is customised   -> `GET /v1/widget/settings` (an appearance the merchant touched)
 *   * a channel is enabled       -> `GET /v1/agents/{id}/channels`
 *
 * Derived beats stored here for a reason that is not laziness: a stored flag can say "knowledge
 * added" after the merchant deletes their last source, and then the checklist lies. A derived step
 * un-completes itself, which is the behaviour a checklist is for. The cost is that "skipped an
 * optional step" cannot be remembered — recorded rather than papered over.
 *
 * Every call is independently permission-gated, so a member who cannot see one surface simply gets
 * `false` for that step instead of an error. That is why each is caught separately.
 */
export type OnboardingStatus = {
  hasAgent: boolean;
  hasKnowledge: boolean;
  hasWidget: boolean;
  hasChannel: boolean;
  /** Kept under their name so their Home markup ports unedited. Maps to "a channel is live". */
  hasTested: boolean;
  allDone: boolean;
  agentId: string | null;
};

async function quiet<T>(path: string): Promise<T | null> {
  try {
    return await apiRequest<T>(path);
  } catch {
    // A 403 here means "your role does not reach this step", not "this step is incomplete" — but
    // for a checklist the two render the same, and the nav has already hidden what they cannot do.
    return null;
  }
}

export async function fetchOnboardingStatus(): Promise<OnboardingStatus> {
  const agents = (await quiet<Agent[]>("/v1/agents")) || [];
  const agent = agents[0] || null;

  const [sources, widget, channels] = await Promise.all([
    quiet<KbSource[]>("/v1/kb/sources"),
    quiet<WidgetSettings>("/v1/widget/settings"),
    agent ? quiet<AgentChannel[]>(`/v1/agents/${agent.id}/channels`) : Promise.resolve(null),
  ]);

  const hasAgent = agents.length > 0;
  const hasKnowledge = (sources || []).some((s) => s.status === "ready");
  // "Customised" means the merchant changed something, not that defaults exist — every field of
  // `WidgetAppearance` has one, so a merchant who never opened the screen still gets a whole
  // object back. A logo, a colour, a quick link or a consent notice is a human decision.
  const a = widget?.appearance;
  const hasWidget = Boolean(
    a && (a.color || a.logo_url || a.consent_notice || (a.quick_links?.length ?? 0) > 0),
  );
  const hasChannel = (channels || []).some((c) => c.enabled);

  return {
    hasAgent,
    hasKnowledge,
    hasWidget,
    hasChannel,
    hasTested: hasChannel,
    allDone: hasAgent && hasKnowledge && hasWidget && hasChannel,
    agentId: agent?.id ?? null,
  };
}

/** 0-based index of the first step not yet done, or 4 when everything is. */
export function firstIncompleteStep(s: OnboardingStatus): number {
  const steps = [s.hasAgent, s.hasKnowledge, s.hasChannel, s.hasWidget];
  const i = steps.indexOf(false);
  return i === -1 ? steps.length : i;
}
