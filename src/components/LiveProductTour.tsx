"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS & TOKENS
   ═══════════════════════════════════════════════════════════════════ */
const TEAL = "#0396A6";
const DARK = "#0F172A";
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

/* ═══════════════════════════════════════════════════════════════════
   BEAT DEFINITIONS
   Each beat has an array of phase durations (ms).
   The master timer advances phase within a beat, then advances beat.
   ═══════════════════════════════════════════════════════════════════ */
interface BeatDef {
  id: string;
  label: string;
  heading: string;
  frameGroup: "browser" | "whatsapp" | "dashboard";
  phases: number[];
}

const BEATS: BeatDef[] = [
  { id: "website-opens", label: "WEBSITE AGENT", heading: "Your site, instantly intelligent", frameGroup: "browser", phases: [800, 1500, 500, 1700] },
  { id: "visitor-engages", label: "LIVE CHAT", heading: "Questions answered in real time", frameGroup: "browser", phases: [800, 600, 2000, 800, 800] },
  { id: "channel-switch", label: "CHANNEL SWITCH", heading: "Same thread, now on WhatsApp", frameGroup: "whatsapp", phases: [600, 1200, 1800, 1900] },
  { id: "human-handoff", label: "HUMAN HANDOFF", heading: "A real person steps in", frameGroup: "whatsapp", phases: [1200, 1200, 1600, 1500] },
  { id: "split-outcome", label: "OUTCOME", heading: "Booked & converted — simultaneously", frameGroup: "dashboard", phases: [1000, 1500, 1500, 1500] },
  { id: "crm-dashboard", label: "CRM", heading: "Every lead, one dashboard", frameGroup: "dashboard", phases: [800, 1700, 2000] },
  { id: "analytics", label: "ANALYTICS", heading: "Results that keep ticking up", frameGroup: "dashboard", phases: [800, 1200, 1500, 1500] },
];

const TOTAL_BEATS = BEATS.length;
const BEAT_DURATIONS = BEATS.map((b) => b.phases.reduce((a, c) => a + c, 0));

const TAGLINES = [
  "One agent. Every channel.",
  "Zero context lost.",
  "From chat to converted.",
  "See every lead. Act fast.",
];

/* Dashboard data — copied exactly from DashboardSection.tsx */
const DX_NAV = [["layers", "Overview"], ["plug", "Services"], ["doc", "Knowledge Base"], ["chart", "Analytics"], ["infinity", "Integrations"], ["bank", "Billing"], ["model", "Settings"]];
const DX_STATS: [string, string, string][] = [["CONVERSATIONS", "214", "sessions"], ["MESSAGES", "1,480", "exchanged"], ["LEADS", "96", "captured"], ["CONVERSION", "45%", "lead rate"], ["AVG/SESSION", "6.9", "messages"], ["PEAK HOUR", "7pm", "Tue busiest"]];
const DX_TOPICS: [string, number, string][] = [["Pricing", 11, TEAL], ["Delivery", 9, TEAL], ["Booking", 6, "#FFB09F"], ["Sizing", 6, "#2DD4BF"], ["Warranty", 5, "#5EEAD4"], ["Other", 3, "#99F6E4"]];
const DX_SESSIONS: [string, string, string, string][] = [["AM", "Arjun Mehta", "Bulk order — 50 units Sony WH-1000XM5", "03:42 PM"], ["4C", "Visitor #4c1a", "Do you deliver to Pune?", "02:59 PM"], ["9B", "Visitor #9be3", "What's in the package?", "01:06 PM"], ["2D", "Visitor #2dd8", "Can I speak to someone?", "11:30 AM"]];

/* ═══════════════════════════════════════════════════════════════════
   SIMULATED CURSOR
   ═══════════════════════════════════════════════════════════════════ */
function SimCursor({ x, y, clicking, visible }: { x: number; y: number; clicking: boolean; visible: boolean }) {
  return (
    <motion.div
      animate={{ left: `${x}%`, top: `${y}%`, opacity: visible ? 1 : 0 }}
      transition={{ left: { duration: 0.85, ease: EASE }, top: { duration: 0.85, ease: EASE }, opacity: { duration: 0.2 } }}
      style={{ position: "absolute", zIndex: 200, pointerEvents: "none", width: 24, height: 24, transform: "translate(-2px,-2px)" }}
    >
      <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none" animate={{ scale: clicking ? 0.76 : 1 }} transition={{ duration: 0.12 }}>
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.36a.5.5 0 0 0-.35.85z" fill={DARK} stroke="#FFF" strokeWidth="1.8" />
      </motion.svg>
      <AnimatePresence>
        {clicking && (
          <motion.div key="pulse" initial={{ scale: 0, opacity: 0.7 }} animate={{ scale: 3.2, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} style={{ position: "absolute", top: 2, left: 2, width: 14, height: 14, borderRadius: "50%", background: `${TEAL}70` }} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function getCursorState(beat: number, phase: number): { x: number; y: number; clicking: boolean; visible: boolean } {
  if (beat === 0) {
    if (phase <= 0) return { x: 50, y: 50, clicking: false, visible: false };
    if (phase === 1) return { x: 42, y: 5.5, clicking: true, visible: true };
    if (phase === 2) return { x: 42, y: 5.5, clicking: false, visible: true };
    return { x: 50, y: 50, clicking: false, visible: false };
  }
  if (beat === 1) {
    if (phase === 0) return { x: 93, y: 92, clicking: false, visible: true };
    if (phase === 1) return { x: 93, y: 92, clicking: true, visible: true };
    if (phase === 2) return { x: 76, y: 90, clicking: true, visible: true };
    if (phase === 3) return { x: 76, y: 85, clicking: false, visible: true };
    return { x: 76, y: 76, clicking: false, visible: true };
  }
  if (beat === 2 && phase === 0) return { x: 78, y: 76, clicking: true, visible: true };
  return { x: 50, y: 50, clicking: false, visible: false };
}

/* ═══════════════════════════════════════════════════════════════════
   SMALL REUSABLE COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */
function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 3.5, padding: "7px 12px" }}>
      {[0, 1, 2].map((i) => (
        <motion.div key={i} animate={{ y: [0, -3, 0] }} transition={{ duration: 0.45, repeat: Infinity, delay: i * 0.12 }} style={{ width: 5, height: 5, borderRadius: "50%", background: "#94A3B8" }} />
      ))}
    </div>
  );
}

function useTypingText(text: string, active: boolean, speed = 40): string {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (!active) { setTyped(""); return; }
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, speed + Math.random() * 15);
    return () => clearInterval(iv);
  }, [text, active, speed]);
  return typed;
}

function ChatBubble({ children, side, variant = "ai", delay = 0, style: s }: {
  children: React.ReactNode; side: "left" | "right"; variant?: "ai" | "human" | "user"; delay?: number; style?: React.CSSProperties;
}) {
  const isL = side === "left";
  const bg: Record<string, string> = { ai: "#F1F5F9", human: "#E0F2FE", user: TEAL };
  const fg: Record<string, string> = { ai: "#1E293B", human: "#0C4A6E", user: "#FFF" };
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95, y: 6 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.3, delay, ease: EASE }}
      style={{ alignSelf: isL ? "flex-start" : "flex-end", maxWidth: "85%", padding: "7px 11px", borderRadius: isL ? "11px 11px 11px 3px" : "11px 11px 3px 11px", background: bg[variant], color: fg[variant], fontSize: 9.5, lineHeight: 1.45, fontWeight: 500, position: "relative", border: variant === "human" ? "1px solid #BAE6FD" : "none", ...s }}>
      {variant === "human" && <span style={{ position: "absolute", top: -7, left: 8, fontSize: 7, fontWeight: 700, color: "#0284C7", background: "#E0F2FE", padding: "1px 5px", borderRadius: 3, border: "1px solid #BAE6FD" }}>Human</span>}
      {children}
    </motion.div>
  );
}

function CountUp({ target, suffix = "", durationMs = 800 }: { target: number; suffix?: string; durationMs?: number }) {
  const [value, setValue] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, durationMs]);
  return <>{value.toLocaleString()}{suffix}</>;
}

/* Dashboard Icon — copied from DashboardSection.tsx */
function DxIcon({ n }: { n: string }) {
  const p: Record<string, React.ReactNode> = {
    layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" />,
    plug: <path d="M9 3v6M15 3v6M7 9h10v3a5 5 0 01-10 0V9zM12 17v4" />,
    doc: <path d="M7 3h7l4 4v14H7V3zM14 3v4h4M9 12h7M9 16h7" />,
    chart: <path d="M4 20V4M4 20h16M8 16l3-4 3 2 4-6" />,
    infinity: <path d="M6 9a3 3 0 100 6c2 0 3-2 6-3s4-3 6-3a3 3 0 110 6c-2 0-3-2-6-3S8 9 6 9z" />,
    bank: <path d="M3.4 9.6L12 4.8l8.6 4.8M5.6 10.4v7.8M9.8 10.4v7.8M14.2 10.4v7.8M18.4 10.4v7.8M3 19.4h18" />,
    model: <path d="M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v10M7 12h10M8.5 8.5l7 7M15.5 8.5l-7 7" />,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p[n]}</svg>;
}

/* ═══════════════════════════════════════════════════════════════════
   CONTENT GROUP: BROWSER (Beats 0–1)
   Website opens → visitor engages chat → CTA appears
   ═══════════════════════════════════════════════════════════════════ */
function BrowserGroupContent({ beat, phase }: { beat: number; phase: number }) {
  const siteVisible = beat > 0 || phase >= 3;
  const chatOpen = beat >= 1 && phase >= 1;
  const urlText = useTypingText("yourwebsite.com", beat === 0 && phase >= 1);
  const questionText = useTypingText("Do you have these headphones in black?", beat === 1 && phase >= 2);
  const showTypingDots = beat === 1 && phase === 3;
  const showReply = beat === 1 && phase >= 4;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* ── Browser Chrome ── */}
      <div style={{ background: "#F1F3F5", borderBottom: "1px solid #E2E5E9", padding: "7px 14px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#27C93F" }} />
        </div>
        <div style={{ background: "#FFF", borderRadius: "7px 7px 0 0", padding: "3.5px 14px", fontSize: 9.5, fontWeight: 700, color: "#1E293B", display: "flex", alignItems: "center", gap: 6, border: "1px solid #E2E5E9", borderBottom: "1px solid #FFF", marginBottom: -1, zIndex: 1 }}>
          <span>{siteVisible ? "🌐" : "⏳"}</span>
          <span>{siteVisible ? "yourwebsite.com" : "New Tab"}</span>
        </div>
      </div>
      {/* Address bar */}
      <div style={{ background: "#FFF", borderBottom: "1px solid #E9ECEF", padding: "5.5px 14px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 5, opacity: 0.35 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.2"><path d="M15 18l-6-6 6-6" /></svg>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.2"><path d="M9 18l6-6-6-6" /></svg>
        </div>
        <div style={{ flex: 1, background: "#F4F4F6", borderRadius: 7, padding: "4px 12px", fontSize: 10, color: "#475569", display: "flex", alignItems: "center", gap: 6, border: beat === 0 && phase === 1 ? `1.5px solid ${TEAL}` : "1px solid #E2E5E9", transition: "border-color 0.2s" }}>
          {siteVisible && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
          <span style={{ fontWeight: 600, fontSize: 10 }}>{urlText || (siteVisible ? "yourwebsite.com" : "")}</span>
          {beat === 0 && phase === 1 && urlText.length < 15 && (
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.45, repeat: Infinity }} style={{ width: 1.5, height: 11, background: TEAL, marginLeft: 1 }} />
          )}
        </div>
      </div>

      {/* ── Viewport ── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#FAFAFA" }}>
        {/* Loading */}
        {!siteVisible && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, zIndex: 5 }}>
            {beat === 0 && phase >= 2 ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }} style={{ width: 18, height: 18, border: `2.5px solid ${TEAL}20`, borderTop: `2.5px solid ${TEAL}`, borderRadius: "50%" }} />
            ) : (
              <div style={{ fontSize: 26, opacity: 0.45 }}>🌐</div>
            )}
            <span style={{ fontSize: 9.5, color: "#94A3B8", fontWeight: 500 }}>Connecting…</span>
          </div>
        )}

        {/* Faux website */}
        {siteVisible && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", fontSize: 11 }}>
            {/* Site header */}
            <div style={{ background: DARK, color: "#FFF", padding: "6px 12px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: "#FF7A5E" }}>⚡</span> TechMart
              </div>
              <div style={{ flex: 1, background: "#FFF", borderRadius: 4, padding: "2.5px 7px", display: "flex", alignItems: "center", gap: 4, maxWidth: 190 }}>
                <span style={{ color: "#94A3B8", fontSize: 7.5 }}>🔍 Search electronics…</span>
              </div>
              <div style={{ fontSize: 7.5, color: "#E2E8F0" }}>Deals</div>
            </div>
            {/* Banner */}
            <div style={{ background: "linear-gradient(135deg, #FF7A5E, #0396A6)", color: "#FFF", padding: "5px 12px", flexShrink: 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 800 }}>Everything you need. One smarter store.</div>
              <div style={{ fontSize: 7, opacity: 0.9 }}>Flash Sale ⏳ · Free Express 24h Shipping</div>
            </div>
            {/* Product grid */}
            <div style={{ flex: 1, padding: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, overflow: "hidden" }}>
              {[{ n: "Sony WH-1000XM5", p: "₹24,990", e: "🎧", b: "-17% OFF" }, { n: "Galaxy Watch Ultra", p: "₹44,999", e: "⌚", b: "NEW" }, { n: "Marshall Speaker", p: "₹39,999", e: "🔊", b: "HOT" }, { n: "Canon EOS R6", p: "₹1,69,990", e: "📷", b: "PRO" }].map((prod) => (
                <div key={prod.n} style={{ background: "#FFF", borderRadius: 7, border: "1px solid #E2E8F0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <div style={{ height: 65, background: "linear-gradient(135deg, #F1F5F9, #E2E8F0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, position: "relative" }}>
                    {prod.e}
                    <span style={{ position: "absolute", top: 3, left: 3, background: "#DC2626", color: "#FFF", fontSize: 6, fontWeight: 800, padding: "1px 4px", borderRadius: 2 }}>{prod.b}</span>
                  </div>
                  <div style={{ padding: "4px 6px" }}>
                    <div style={{ fontSize: 8, fontWeight: 700, color: DARK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{prod.n}</div>
                    <div style={{ fontSize: 9, fontWeight: 800, color: TEAL }}>{prod.p}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Frosty widget button */}
        {siteVisible && !chatOpen && (
          <motion.div animate={{ boxShadow: [`0 4px 18px ${TEAL}35, 0 0 0 0px ${TEAL}20`, `0 4px 18px ${TEAL}35, 0 0 0 7px ${TEAL}06`, `0 4px 18px ${TEAL}35, 0 0 0 0px ${TEAL}20`] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", bottom: 12, right: 12, width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${TEAL}, #0284C7)`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 95 }}>
            <span style={{ fontSize: 16 }}>❄️</span>
          </motion.div>
        )}

        {/* Chat overlay */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div key="chat" initial={{ opacity: 0, scale: 0.75, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 15 }} transition={{ duration: 0.4, ease: EASE }}
              style={{ position: "absolute", bottom: 10, right: 10, width: 230, borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", zIndex: 90, background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", border: `1px solid ${TEAL}25`, boxShadow: `0 16px 48px ${TEAL}20, 0 4px 16px rgba(0,0,0,0.08)` }}>
              {/* Chat header */}
              <div style={{ background: `linear-gradient(135deg, ${TEAL}, #0284C7)`, color: "#FFF", padding: "7px 10px", display: "flex", alignItems: "center", gap: 6, fontSize: 9.5, fontWeight: 700, flexShrink: 0 }}>
                <span style={{ fontSize: 11 }}>❄️</span><span>Frosty Agent</span>
                <span style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "#34D399" }} />
              </div>
              {/* Chat body */}
              <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6, minHeight: 120, maxHeight: 210, overflowY: "auto" }}>
                <ChatBubble side="left" variant="ai">Hi! 👋 Ask me anything about our products!</ChatBubble>

                {questionText && (
                  <ChatBubble side="right" variant="user">{questionText}</ChatBubble>
                )}

                {showTypingDots && <TypingDots />}

                {showReply && (
                  <ChatBubble side="left" variant="ai" delay={0}>
                    <div>Yes! The Sony WH-1000XM5 is in stock in Matte Black — same-day delivery! ✅</div>
                    {/* The CTA button */}
                    <div style={{ marginTop: 6, background: "#25D366", color: "#FFF", padding: "5px 10px", borderRadius: 8, fontSize: 8.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 4, cursor: "pointer", width: "fit-content" }}>
                      💬 Continue on WhatsApp →
                    </div>
                  </ChatBubble>
                )}
              </div>
              {/* Input bar */}
              <div style={{ padding: "6px 10px", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <div style={{ flex: 1, background: "#F8FAFC", borderRadius: 6, padding: "5px 9px", fontSize: 9, color: "#94A3B8" }}>Ask Frosty…</div>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: TEAL, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTENT GROUP: WHATSAPP (Beats 2–3)
   Channel switch → Human handoff → Resolved
   ═══════════════════════════════════════════════════════════════════ */
function WhatsAppGroupContent({ beat, phase }: { beat: number; phase: number }) {
  /* Beat 2 phases: 0=CTA click, 1=browser shrinks+WA grows, 2=WA thread+badge, 3=new reply */
  /* Beat 3 phases: 0=complex Q, 1=handoff badge, 2=human reply, 3=resolved */
  const b2 = beat === 2;
  const b3 = beat === 3;
  const browserThumbShrunk = b2 ? phase >= 1 : true;
  const showWAThread = b2 ? phase >= 2 : true;
  const showContextBadge = b2 ? phase >= 2 : b3;
  const showNewReply = b2 && phase >= 3;
  const showComplexQ = b3 && phase >= 0;
  const showHandoff = b3 && phase >= 1;
  const showHumanReply = b3 && phase >= 2;
  const showResolved = b3 && phase >= 3;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* ── WhatsApp Chrome ── */}
      <div style={{ background: "#075E54", color: "#FFF", padding: "8px 14px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>❄️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700 }}>Frosty Agent</div>
          <div style={{ fontSize: 8, opacity: 0.85 }}>online</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
      </div>

      {/* ── Viewport ── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#ECE5DD" }}>
        {/* Browser thumbnail (shrinks to top-left corner) */}
        <motion.div
          animate={{ scale: browserThumbShrunk ? 0.28 : 0.9, x: browserThumbShrunk ? 0 : 0, y: browserThumbShrunk ? 0 : 0, opacity: browserThumbShrunk ? 0.75 : 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ position: "absolute", top: 8, left: 8, width: 200, background: "#FFF", borderRadius: 6, overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transformOrigin: "top left", zIndex: 20 }}>
          <div style={{ background: `linear-gradient(135deg, ${TEAL}, #0284C7)`, padding: "3px 6px", fontSize: 7, color: "#FFF", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 7 }}>❄️</span> Frosty · yourwebsite.com
          </div>
          <div style={{ padding: "4px 6px", display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ background: "#F1F5F9", borderRadius: 4, padding: "3px 6px", fontSize: 6.5, color: "#1E293B" }}>Do you have these in black?</div>
            <div style={{ background: "#F1F5F9", borderRadius: 4, padding: "3px 6px", fontSize: 6.5, color: "#1E293B" }}>Yes! Matte Black, same-day ✅</div>
          </div>
        </motion.div>

        {/* WhatsApp thread */}
        {showWAThread && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}
            style={{ padding: "12px 14px", paddingTop: browserThumbShrunk ? 75 : 12, display: "flex", flexDirection: "column", gap: 7 }}>

            {/* Context: message from website */}
            <div style={{ alignSelf: "flex-end", maxWidth: "80%" }}>
              <div style={{ fontSize: 6.5, color: "#8696A0", textAlign: "right", marginBottom: 2 }}>from website chat</div>
              <ChatBubble side="right" variant="user">Do you have these headphones in black?</ChatBubble>
            </div>

            <ChatBubble side="left" variant="ai" delay={0.1}>Yes! Sony WH-1000XM5 in Matte Black ✅</ChatBubble>

            {/* Context badge */}
            {showContextBadge && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}
                style={{ alignSelf: "center", background: `${TEAL}12`, border: `1px solid ${TEAL}30`, borderRadius: 999, padding: "4px 14px", fontSize: 8, fontWeight: 700, color: TEAL, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 10 }}>🔗</span> Same conversation · context carried
              </motion.div>
            )}

            {showNewReply && (
              <ChatBubble side="left" variant="ai" delay={0}>
                Want me to reserve one? I can also share payment options right here 💳
              </ChatBubble>
            )}

            {/* ── Beat 3: Human handoff ── */}
            {showComplexQ && (
              <ChatBubble side="right" variant="user" delay={0}>
                I want to negotiate a bulk order — 50 units. Can someone help with custom pricing?
              </ChatBubble>
            )}

            {showHandoff && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                style={{ alignSelf: "center", background: "#FFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "6px 14px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F6, #1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#FFF", fontWeight: 800 }}>P</div>
                <div>
                  <div style={{ fontSize: 8.5, fontWeight: 700, color: DARK }}>Handed to Priya · Sales</div>
                  <div style={{ fontSize: 7, color: "#64748B" }}>Human agent joined</div>
                </div>
              </motion.div>
            )}

            {showHumanReply && (
              <ChatBubble side="left" variant="human" delay={0}>
                Hi! I&apos;m Priya from Sales. For 50 units I can offer ₹21,500/unit — 14% off. Shall I send a quote?
              </ChatBubble>
            )}

            {showResolved && (
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 6 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.35 }}
                style={{ alignSelf: "center", background: "#DCFCE7", border: "1px solid #86EFAC", borderRadius: 999, padding: "4px 14px", fontSize: 8, fontWeight: 700, color: "#166534", display: "flex", alignItems: "center", gap: 5, boxShadow: "0 2px 8px rgba(22,101,52,0.1)" }}>
                ✅ Resolved · Handled by Priya
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTENT GROUP: DASHBOARD (Beats 4–6)
   Split-screen → CRM dashboard → Analytics dashboard
   ═══════════════════════════════════════════════════════════════════ */
function DashboardGroupContent({ beat, phase }: { beat: number; phase: number }) {
  return (
    <div style={{ height: "100%", position: "relative" }}>
      {/* Beat 4: Split-screen */}
      <motion.div
        animate={{ opacity: beat === 4 ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ position: "absolute", inset: 0, pointerEvents: beat === 4 ? "auto" : "none" }}
      >
        <SplitScreenBeat phase={beat === 4 ? phase : -1} />
      </motion.div>

      {/* Beat 5: CRM Dashboard */}
      <motion.div
        animate={{ opacity: beat === 5 ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ position: "absolute", inset: 0, pointerEvents: beat === 5 ? "auto" : "none" }}
      >
        <CRMDashboardBeat phase={beat === 5 ? phase : -1} />
      </motion.div>

      {/* Beat 6: Analytics Dashboard */}
      <motion.div
        animate={{ opacity: beat === 6 ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ position: "absolute", inset: 0, pointerEvents: beat === 6 ? "auto" : "none" }}
      >
        <AnalyticsDashboardBeat phase={beat === 6 ? phase : -1} />
      </motion.div>
    </div>
  );
}

/* ── Beat 4: Split-Screen (Meeting + CRM Lead Update) ── */
function SplitScreenBeat({ phase }: { phase: number }) {
  const slotsVisible = phase >= 1;
  const selected = phase >= 2;
  const confirmed = phase >= 3;
  const statusFlipped = phase >= 2;

  const slots = [{ d: "Today", t: "3:00 PM" }, { d: "Today", t: "5:30 PM" }, { d: "Tomorrow", t: "10:00 AM" }];

  return (
    <div style={{ height: "100%", display: "flex", background: "#F8FAFC" }}>
      {/* LEFT PANE: Meeting scheduling */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: EASE }}
        style={{ flex: 1, borderRight: "1px solid #E2E8F0", display: "flex", flexDirection: "column", padding: "14px", gap: 7, overflow: "hidden" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: TEAL, letterSpacing: "0.08em" }}>MEETING SCHEDULING</div>
        <ChatBubble side="left" variant="ai" style={{ fontSize: 8.5, padding: "6px 10px" }}>
          Great! Here are available slots for your call:
        </ChatBubble>

        {slotsVisible && (
          <div style={{ display: "flex", flexDirection: "column", gap: 5, padding: "2px 0" }}>
            {slots.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: selected && i === 1 ? 1.03 : 1, background: selected && i === 1 ? TEAL : "#FFF", color: selected && i === 1 ? "#FFF" : DARK }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                style={{ padding: "5px 10px", borderRadius: 999, border: selected && i === 1 ? `1.5px solid ${TEAL}` : "1px solid #E2E8F0", fontSize: 8.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 4, boxShadow: selected && i === 1 ? `0 2px 8px ${TEAL}30` : "none" }}>
                <span style={{ fontSize: 8 }}>🕐</span> {s.d} · {s.t}
                {selected && i === 1 && <span style={{ marginLeft: "auto" }}>✓</span>}
              </motion.div>
            ))}
          </div>
        )}

        {confirmed && (
          <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, ease: EASE }}
            style={{ background: "#FFF", borderRadius: 10, border: `1.5px solid ${TEAL}30`, padding: "10px 12px", boxShadow: `0 4px 16px ${TEAL}15` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <span style={{ fontSize: 12 }}>✅</span>
              <span style={{ fontSize: 9, fontWeight: 800, color: DARK }}>Meeting Confirmed</span>
            </div>
            <div style={{ fontSize: 8, color: "#475569", paddingLeft: 18 }}>
              <div><strong>Bulk Order Discussion</strong></div>
              <div>📅 Today · 5:30 PM — 6:00 PM</div>
              <div>👤 Priya (Sales) + Arjun Mehta</div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* CENTER sync indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 0.6 : 0 }} transition={{ delay: 0.5, duration: 0.3 }}
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 10, background: "#FFF", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", fontSize: 9, color: TEAL, fontWeight: 700 }}>
        ↔
      </motion.div>

      {/* RIGHT PANE: CRM Lead — reused from CRMLeadIntelligenceSection */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: EASE }}
        style={{ flex: 1, display: "flex", flexDirection: "column", padding: "14px", gap: 8, overflow: "hidden" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: TEAL, letterSpacing: "0.08em" }}>LEAD STATUS</div>

        {/* Lead card — structure from CRMLeadIntelligenceSection.tsx */}
        <div className="relative p-4 rounded-[16px] border bg-white shadow-sm" style={{ borderColor: "#E2E8F0" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-[34px] h-[34px] rounded-full bg-slate-200 border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center" style={{ fontSize: 14 }}>
              👤
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-900 text-[11px] font-bold truncate">Arjun Mehta</div>
              <div className="text-slate-500 text-[9px] truncate">Bulk order · 50 units</div>
            </div>
          </div>

          {/* Status pill — Hot → Converted (reused from CRM section styling) */}
          <motion.div
            animate={{
              background: statusFlipped ? "#DCFCE7" : "#FEF3C7",
              color: statusFlipped ? "#166534" : "#92400E",
              scale: statusFlipped ? [1, 1.25, 1] : 1,
            }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full w-fit text-[10px] font-bold"
          >
            {statusFlipped ? "✅ Converted" : "🔥 Hot Lead"}
          </motion.div>

          {/* Detail rows */}
          <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {[{ l: "Source", v: "Web → WhatsApp" }, { l: "Value", v: "₹10,75,000" }, { l: "Meeting", v: "Today 5:30 PM" }, { l: "Intent", v: "Bulk purchase" }].map((d) => (
              <div key={d.l}>
                <div style={{ fontSize: 7, color: "#94A3B8", fontWeight: 600, marginBottom: 1 }}>{d.l}</div>
                <div style={{ fontSize: 8, color: DARK, fontWeight: 600 }}>{d.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hot leads count — from CRMLeadIntelligenceSection's segregation cards */}
        <div className="relative p-3 rounded-[14px] border border-red-200 bg-red-50/80 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-[28px] h-[28px] rounded-full bg-white border border-red-200 flex items-center justify-center text-red-600 shadow-sm" style={{ fontSize: 14 }}>🔥</div>
              <div>
                <div className="text-slate-900 font-bold text-[11px]">Hot Leads</div>
                <div className="text-slate-500 text-[8px]">Ready to engage</div>
              </div>
            </div>
            <motion.div className="text-[22px] font-bold text-slate-900 leading-none" key={statusFlipped ? "13" : "12"} initial={{ scale: 1.3, color: "#DC2626" }} animate={{ scale: 1, color: DARK }}>
              {statusFlipped ? 13 : 12}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Beat 5: CRM Dashboard — Real fx-dashx structure ── */
function CRMDashboardBeat({ phase }: { phase: number }) {
  const contentVisible = phase >= 1;

  return (
    <div className="fx-dashx" style={{
      gridTemplateColumns: "140px 1fr",
      minHeight: "unset",
      height: "100%",
      borderRadius: 0,
      border: "none",
      boxShadow: "none",
    } as React.CSSProperties}>
      {/* Sidebar — exact structure from DashboardSection.tsx */}
      <aside className="fx-dx-side" style={{ borderRight: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="fx-dx-brand"><span className="fx-logo" aria-hidden="true" /> Frosty</div>
        <div className="fx-dx-ws">
          <div className="lb">WORKSPACE</div>
          <div className="nm">TechMart Store</div>
        </div>
        <div className="fx-dx-nav">
          {DX_NAV.map(([ic, label], i) => (
            <span key={label} className={i === 1 ? "on" : ""}><DxIcon n={ic} /> {label}</span>
          ))}
        </div>
        <div className="fx-dx-user"><i>YT</i><b>Your team</b></div>
      </aside>

      {/* Main — Conversations tab from DashboardSection.tsx */}
      <div className="fx-dx-main" style={{ position: "relative", overflow: "hidden" }}>
        {contentVisible && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div><div className="fx-dx-h">Website console</div><div className="fx-dx-sub">Every session, web and WhatsApp, in one place.</div></div>
              <div className="fx-dx-pills"><b className="on">Website</b><b>WhatsApp</b></div>
            </div>
            <div className="fx-dx-split" style={{ marginTop: 12 }}>
              <div>
                {DX_SESSIONS.map(([av, who, what, when], i) => (
                  <div className={"fx-dx-sess" + (i === 0 ? " on" : "")} key={who}>
                    <i>{av}</i>
                    <div className="w"><b>{who}</b><span>{what}</span></div>
                    <span style={{ marginLeft: "auto", fontSize: 9, color: "var(--d-mut)", flex: "none" }}>{when}</span>
                  </div>
                ))}
              </div>
              <div className="fx-dx-card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                  <span className="fx-dx-btn" style={{ background: "transparent", color: "var(--d-mut)", border: "1px solid var(--d-line)" }}>Lead</span>
                  <span className="fx-dx-btn" style={{ background: TEAL, borderColor: TEAL, color: "white" }}>Insights</span>
                  <span className="fx-dx-btn">AI mode</span>
                </div>
                <div className="fx-dx-bub u" style={{ background: "#1E293B" }}>I want to buy 50 units — bulk pricing?</div>
                <div className="fx-dx-bub b" style={{ background: TEAL }}>Absolutely! For 50 units, pricing is ₹21,500/unit. That&apos;s 14% off list.</div>
                <div className="fx-dx-bub u" style={{ background: "#1E293B" }}>Let&apos;s set up a call to finalize.</div>
                <div className="fx-dx-bub b" style={{ background: TEAL }}>Done! Meeting booked for today 5:30 PM with Priya (Sales).</div>
                <div className="fx-dx-input">Switch to human mode to reply manually…</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ── Beat 6: Analytics Dashboard — Real fx-dashx structure ── */
function AnalyticsDashboardBeat({ phase }: { phase: number }) {
  const statsVisible = phase >= 1;
  const chartsVisible = phase >= 2;

  const C = 2 * Math.PI * 32;
  const total = DX_TOPICS.reduce((s, t) => s + (t[1] as number), 0);
  let acc = 0;

  return (
    <div className="fx-dashx" style={{
      gridTemplateColumns: "140px 1fr",
      minHeight: "unset",
      height: "100%",
      borderRadius: 0,
      border: "none",
      boxShadow: "none",
    } as React.CSSProperties}>
      {/* Sidebar — same structure */}
      <aside className="fx-dx-side" style={{ borderRight: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="fx-dx-brand"><span className="fx-logo" aria-hidden="true" /> Frosty</div>
        <div className="fx-dx-ws">
          <div className="lb">WORKSPACE</div>
          <div className="nm">TechMart Store</div>
        </div>
        <div className="fx-dx-nav">
          {DX_NAV.map(([ic, label], i) => (
            <span key={label} className={i === 3 ? "on" : ""}><DxIcon n={ic} /> {label}</span>
          ))}
        </div>
        <div className="fx-dx-user"><i>YT</i><b>Your team</b></div>
      </aside>

      {/* Main — Analytics tab from DashboardSection.tsx */}
      <div className="fx-dx-main" style={{ position: "relative", overflow: "hidden" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
          <div className="fx-dx-h">Performance</div>
          <div className="fx-dx-sub">Insights and metrics for your workspace.</div>
          <div className="fx-dx-card" style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div className="fx-dx-pills"><b>7d</b><b>14d</b><b className="on">30d</b><b>90d</b></div>
            <div className="fx-dx-btn">Export</div>
          </div>

          {/* Stats grid — exact data from DX_STATS */}
          {statsVisible && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="fx-dx-stats" style={{ marginTop: 10 }}>
              {DX_STATS.map(([l, n, s]) => (
                <div className="fx-dx-stat" key={l}>
                  <div className="lb">{l}</div>
                  <div className="n">{n}</div>
                  <div className="su">{s}</div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Charts — conversations chart + donut from DashboardSection.tsx */}
          {chartsVisible && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="fx-dx-2col" style={{ marginTop: 10 }}>
              <div className="fx-dx-card">
                <div className="fx-dx-ct">Conversations &amp; messages</div>
                <svg viewBox="0 0 320 92" width="100%" height="92" preserveAspectRatio="none" aria-hidden="true">
                  {[18, 42, 66].map((y) => <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
                  <path d="M0,72 C42,44 72,24 112,31 C152,38 190,56 232,46 C262,39 292,25 320,20 L320,92 L0,92 Z" fill={`${TEAL}15`} />
                  <path d="M0,72 C42,44 72,24 112,31 C152,38 190,56 232,46 C262,39 292,25 320,20" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <path d="M0,84 C52,79 92,73 132,75 C182,77 222,69 262,65 C292,62 306,58 320,55" fill="none" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                </svg>
                <div className="fx-dx-legend">
                  <span><i style={{ background: TEAL }} />Messages</span>
                  <span><i style={{ background: "#F59E0B" }} />Conversations</span>
                </div>
              </div>
              <div className="fx-dx-card">
                <div className="fx-dx-ct">Top topics</div>
                <svg viewBox="0 0 100 100" width="100%" height="80" aria-hidden="true">
                  <g transform="rotate(-90 50 50)">
                    {DX_TOPICS.map(([label, v, col]) => {
                      const len = (C * (v as number)) / total;
                      const node = <circle key={label} cx="50" cy="50" r="32" fill="none" stroke={col as string} strokeWidth="13" strokeDasharray={`${len.toFixed(2)} ${(C - len).toFixed(2)}`} strokeDashoffset={-acc.toFixed(2)} />;
                      acc += len;
                      return node;
                    })}
                  </g>
                  <text x="50" y="48" textAnchor="middle" fontSize="15" fontFamily="Fraunces, serif" fill={DARK} fontWeight="600">{total}</text>
                  <text x="50" y="59" textAnchor="middle" fontSize="6.5" fontFamily="Outfit, sans-serif" fill="#94A3B8">mentions</text>
                </svg>
                <div className="fx-dx-legend">
                  {DX_TOPICS.slice(0, 4).map(([label, v, col]) => (
                    <span key={label}><i style={{ background: col as string }} />{label} {v}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FLOATING TAGLINE — snaps between dedicated anchor positions
   Each tagline gets a fixed, readable position so users can catch it.
   Positions cycle: top-center → bottom-right → bottom-left → top-left
   ═══════════════════════════════════════════════════════════════════ */
const TAGLINE_ANCHORS: { top?: string; bottom?: string; left?: string; right?: string; transform: string }[] = [
  { top: "14px", left: "50%", transform: "translateX(-50%)" },          // top-center
  { bottom: "16px", right: "16px", transform: "translateX(0)" },       // bottom-right
  { bottom: "16px", left: "16px", transform: "translateX(0)" },        // bottom-left
  { top: "14px", left: "16px", transform: "translateX(0)" },           // top-left
];

function FloatingTagline() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIndex((i) => (i + 1) % TAGLINES.length), 9000);
    return () => clearInterval(iv);
  }, []);

  const anchor = TAGLINE_ANCHORS[index % TAGLINE_ANCHORS.length];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.88, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          position: "absolute",
          zIndex: 100,
          pointerEvents: "none",
          top: anchor.top ?? "auto",
          bottom: anchor.bottom ?? "auto",
          left: anchor.left ?? "auto",
          right: anchor.right ?? "auto",
          transform: anchor.transform,
        }}
      >
        <div style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${TEAL}20`,
          borderRadius: 999,
          padding: "5px 16px",
          boxShadow: `0 4px 20px ${TEAL}12, 0 1px 3px rgba(0,0,0,0.04)`,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: TEAL, flexShrink: 0, opacity: 0.7 }} />
          <span style={{
            fontSize: 10.5,
            fontWeight: 700,
            color: TEAL,
            letterSpacing: "0.03em",
            fontStyle: "italic",
            whiteSpace: "nowrap",
          }}>
            {TAGLINES[index]}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function LiveProductTour() {
  const [beat, setBeat] = useState(0);
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const [looping, setLooping] = useState(false);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Detect reduced motion */
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  /* Clear all scheduled timers */
  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  /* ── Master timer ── */
  useEffect(() => {
    if (paused) return;
    clearTimers();

    const beatDef = BEATS[beat];
    let accumulated = 0;

    /* Schedule each phase advance */
    for (let i = 0; i < beatDef.phases.length - 1; i++) {
      accumulated += beatDef.phases[i];
      const nextPhase = i + 1;
      timersRef.current.push(setTimeout(() => setPhase(nextPhase), accumulated));
    }
    accumulated += beatDef.phases[beatDef.phases.length - 1];

    /* Advance to next beat after all phases complete */
    timersRef.current.push(
      setTimeout(() => {
        const next = (beat + 1) % TOTAL_BEATS;
        if (next === 0) {
          /* Loop point: soft fade, then restart */
          setLooping(true);
          timersRef.current.push(
            setTimeout(() => {
              setLooping(false);
              setBeat(0);
              setPhase(0);
            }, 600)
          );
        } else {
          setBeat(next);
          setPhase(0);
        }
      }, accumulated)
    );

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat, paused]);

  /* Cleanup on unmount */
  useEffect(() => () => { clearTimers(); if (resumeRef.current) clearTimeout(resumeRef.current); }, [clearTimers]);

  /* Hover/focus pause */
  const handleMouseEnter = useCallback(() => {
    setPaused(true);
    if (resumeRef.current) clearTimeout(resumeRef.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setPaused(false), 1500);
  }, []);

  /* Jump to beat via dot click */
  const jumpToBeat = useCallback((index: number) => {
    clearTimers();
    setBeat(index);
    setPhase(0);
    setPaused(false);
  }, [clearTimers]);

  /* Derived state */
  const sceneDef = BEATS[beat];
  const contentKey = beat <= 1 ? "browser" : beat <= 3 ? "whatsapp" : "dashboard";
  const cursor = reducedMotion ? { x: 50, y: 50, clicking: false, visible: false } : getCursorState(beat, phase);

  /* Transition config */
  const motionDur = reducedMotion ? 0 : 0.35;

  return (
    <motion.div
      animate={reducedMotion ? {} : { y: [0, -3.5, 0] }}
      transition={reducedMotion ? {} : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "relative", width: "100%", maxWidth: 670 }}
      className="mx-auto lg:mx-0"
    >
      {/* ── Eyebrow + heading ── */}
      <div style={{ marginBottom: 12, minHeight: 50 }}>
        <div aria-live="polite" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: TEAL, letterSpacing: "0.08em", background: `${TEAL}10`, border: `1px solid ${TEAL}25`, padding: "3px 10px", borderRadius: 999 }}>
            STEP {beat + 1} OF {TOTAL_BEATS} · {sceneDef.label}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={sceneDef.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}
            style={{ fontSize: "clamp(17px, 2.2vw, 22px)", fontWeight: 800, color: DARK, lineHeight: 1.2, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            {sceneDef.heading}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Main frame ── */}
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
        style={{
          borderRadius: 16,
          overflow: "hidden",
          background: "#FFFFFF",
          boxShadow: "0 32px 84px rgba(3,150,166,0.13), 0 12px 32px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.06)",
          position: "relative",
          height: 480,
        }}
        tabIndex={0}
        role="region"
        aria-label="Live product tour — interactive demo of Frosty Agent"
      >
        {/* Content layer — crossfades between groups */}
        <AnimatePresence initial={false}>
          <motion.div
            key={contentKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: motionDur, ease: EASE }}
            style={{ position: "absolute", inset: 0 }}
          >
            {contentKey === "browser" && <BrowserGroupContent beat={beat} phase={phase} />}
            {contentKey === "whatsapp" && <WhatsAppGroupContent beat={beat} phase={phase} />}
            {contentKey === "dashboard" && <DashboardGroupContent beat={beat} phase={phase} />}
          </motion.div>
        </AnimatePresence>

        {/* SimCursor */}
        {!reducedMotion && <SimCursor {...cursor} />}

        {/* Floating tagline */}
        <FloatingTagline />

        {/* Loop fade overlay */}
        <motion.div
          animate={{ opacity: looping ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${TEAL}40, #0284C740)`, zIndex: 300, pointerEvents: "none" }}
        />
      </motion.div>

      {/* ── Dot pagination ── */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14, alignItems: "center" }}>
        {BEATS.map((b, i) => {
          const isActive = i === beat;
          return (
            <button
              key={b.id}
              onClick={() => jumpToBeat(i)}
              aria-label={`Go to step ${i + 1} of ${TOTAL_BEATS}: ${b.heading}`}
              style={{ position: "relative", width: isActive ? 32 : 8, height: 8, borderRadius: 999, border: "none", padding: 0, cursor: "pointer", background: isActive ? `${TEAL}25` : "#CBD5E1", transition: "width 0.3s ease, background 0.3s ease", overflow: "hidden" }}
            >
              {isActive && !reducedMotion && !paused && (
                <motion.div
                  key={`${beat}-${phase === 0 ? "start" : "run"}`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: BEAT_DURATIONS[beat] / 1000, ease: "linear" }}
                  style={{ position: "absolute", top: 0, left: 0, height: "100%", borderRadius: 999, background: TEAL }}
                />
              )}
              {isActive && (reducedMotion || paused) && (
                <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "50%", borderRadius: 999, background: TEAL }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Atmospheric glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "120%", height: "120%", background: "radial-gradient(ellipse at center, rgba(3,150,166,0.08) 0%, transparent 65%)", pointerEvents: "none", zIndex: -1 }} />
    </motion.div>
  );
}
