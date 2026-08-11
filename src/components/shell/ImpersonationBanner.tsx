"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { clearSession } from "@/lib/impersonation";
import type { Impersonation } from "@/lib/types";
import { Eye, Loader2 } from "lucide-react";

export function ImpersonationBanner({ session }: { session: Impersonation }) {
  const [ending, setEnding] = useState(false);

  async function exit() {
    setEnding(true);
    try {
      await apiRequest(`/v1/platform/impersonation/${session.session_id}/end`, { method: "POST" });
    } catch {} finally {
      clearSession();
      window.location.href = "/";
    }
  }

  const expires = session.expires_at ? new Date(session.expires_at) : null;
  const expiryLabel =
    expires && !Number.isNaN(expires.getTime())
      ? expires.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-red-500 text-white font-medium text-sm shadow-md z-[100]" role="alert">
      <div className="flex items-center gap-3">
        <Eye className="w-5 h-5 shrink-0" />
        <span className="leading-snug">
          <strong className="font-bold">Frostrek support session.</strong>{" "}
          {session.staff_email ? `${session.staff_email} is` : "A support agent is"} signed in as{" "}
          <strong className="font-bold">{session.merchant_name || "this workspace"}</strong>. Every action is audited
          {expiryLabel ? `, and this session ends at ${expiryLabel}` : ""}.
        </span>
      </div>
      <button
        type="button"
        className="shrink-0 flex items-center justify-center h-8 px-4 bg-white/20 hover:bg-white/30 text-white rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50"
        onClick={exit}
        disabled={ending}
      >
        {ending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        {ending ? "Leaving…" : "Exit support session"}
      </button>
    </div>
  );
}
