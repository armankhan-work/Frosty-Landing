"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Lock,
  Sparkles,
  Video,
  Users,
  Bell,
  Zap,
  Globe,
  Flame,
  ArrowRight,
  Check,
  Search,
  Headphones,
  Watch,
  Volume2,
  Camera,
  Bot,
  CalendarCheck,
  CalendarDays,
  UserCheck,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Activity,
  User as UserIcon,
  MessageCircle,
  CreditCard,
  PhoneCall,
  Radio,
  FileSpreadsheet,
  ShoppingBag,
  LifeBuoy,
  Mail,
  Layers,
  Receipt,
  BarChart3,
  Filter
} from "lucide-react";
import FrostyIcon from "./FrostyIcon";

/* ═══════════════════════════════════════════════════════════════════
   BRAND SVG LOGOS
   ═══════════════════════════════════════════════════════════════════ */
function GoogleCalendarLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <rect x="3" y="4" width="18" height="17" rx="3.5" fill="#4285F4" />
      <path d="M3 8.5H21" stroke="#FFF" strokeWidth="1.6" />
      <rect x="7" y="2" width="2" height="3.5" rx="1" fill="#EA4335" />
      <rect x="15" y="2" width="2" height="3.5" rx="1" fill="#EA4335" />
      <circle cx="7.5" cy="12.5" r="1.2" fill="#FFF" />
      <circle cx="12" cy="12.5" r="1.2" fill="#FBBC04" />
      <circle cx="16.5" cy="12.5" r="1.2" fill="#34A853" />
      <circle cx="7.5" cy="16.5" r="1.2" fill="#FFF" />
      <circle cx="12" cy="16.5" r="1.2" fill="#FFF" />
      <circle cx="16.5" cy="16.5" r="1.2" fill="#FFF" />
    </svg>
  );
}

function OutlookLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <rect x="3" y="4" width="18" height="16" rx="3" fill="#0078D4" />
      <path d="M3 8L12 14L21 8" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.2" fill="#FFF" fillOpacity="0.25" />
    </svg>
  );
}

function GoogleMeetLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <rect x="2.5" y="5" width="13" height="14" rx="2.5" fill="#00AC47" />
      <path d="M15.5 9.5L21.5 5.5V18.5L15.5 14.5V9.5Z" fill="#00832D" />
      <circle cx="9" cy="12" r="2.2" fill="#FFF" />
    </svg>
  );
}

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
  frameGroup: "browser" | "whatsapp" | "meeting" | "transition" | "knowledge" | "dashboard" | "closing";
  phases: number[];
}

const BEATS: BeatDef[] = [
  /* Beat 0 */ { id: "website-opens", label: "WEBSITE AGENT", heading: "Your site, instantly intelligent", frameGroup: "browser", phases: [800, 1500, 500, 1700] },
  /* Beat 1 */ { id: "visitor-engages", label: "LIVE CHAT", heading: "Questions answered in real time", frameGroup: "browser", phases: [800, 600, 1800, 800, 1000, 600] },
  /* Beat 2 */ { id: "channel-switch", label: "CHANNEL SWITCH", heading: "Same thread, now on WhatsApp", frameGroup: "whatsapp", phases: [700, 1200, 1800, 1900] },
  /* Beat 3 */ { id: "human-handoff", label: "HUMAN HANDOFF", heading: "A real person steps in", frameGroup: "whatsapp", phases: [1000, 1100, 1400, 1800, 1400, 1100] },
  /* Beat 4 */ { id: "meeting-calendar", label: "CALENDAR ENGINE", heading: "Autonomous slot matching", frameGroup: "meeting", phases: [700, 1300, 1600, 1400] },
  /* Beat 5 */ { id: "whatsapp-booking", label: "SLOT SELECTION", heading: "Pick time directly in WhatsApp", frameGroup: "whatsapp", phases: [800, 1000, 600, 1400, 1100] },
  /* Beat 6 */ { id: "meeting-confirmed", label: "MEETING LOCKED", heading: "Instant Google Meet & CRM sync", frameGroup: "meeting", phases: [800, 1500, 1800, 1400] },
  /* Beat 7 */ { id: "merchant-chaos", label: "TOO MANY TOOLS", heading: "Fragmented tools vs. One unified AI", frameGroup: "transition", phases: [2000, 3200, 1800, 450] },
  /* Beat 8 */ { id: "shared-brain", label: "SHARED MEMORY", heading: "One brain across website & WhatsApp", frameGroup: "knowledge", phases: [1800, 2600, 2200] },
  /* Beat 9 */ { id: "crm-dashboard", label: "MERCHANT INBOX", heading: "Unified multi-channel command", frameGroup: "dashboard", phases: [1600, 1400, 1400, 1500, 3000, 2400] },
  /* Beat 10 */ { id: "enterprise-crm", label: "ENTERPRISE CRM", heading: "Autonomous lead segregation & deep pipeline", frameGroup: "dashboard", phases: [2400, 2600, 2600, 2400] },
  /* Beat 11 */ { id: "analytics", label: "ANALYTICS", heading: "Results that keep ticking up", frameGroup: "dashboard", phases: [2400, 2800, 2600, 2400] },
  /* Beat 12 */ { id: "closing-verdict", label: "THE CHOICE", heading: "Stay fragmented. Or scale with Frosty.", frameGroup: "closing", phases: [2400, 2600, 2600, 2400] },
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
   DYNAMIC SCHEDULING & LIVE CLOCK HELPER (11:00 AM – 7:00 PM Engine)
   ═══════════════════════════════════════════════════════════════════ */
export interface DynamicScheduleData {
  phoneClock: string;
  msgTime1: string;
  msgTime2: string;
  msgTime3: string;
  isTomorrow: boolean;
  targetDayLabel: string;
  dayTabs: { d: string; a: boolean }[];
  slots: {
    timeRange: string;
    sub: string;
    tag: string;
    isRecommended: boolean;
    shortLabel: string;
  }[];
  selectedSlot: {
    timeRange: string;
    shortLabel: string;
    meetLabel: string;
    userConfirmMsg: string;
    lockMsg: string;
    crmMeetingTag: string;
    crmSummary: string;
  };
}

function getDynamicSchedule(): DynamicScheduleData {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Format 12-hour clock for phone status bar e.g. "6:55"
  const clockH = hours % 12 || 12;
  const clockM = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const ampm = hours >= 12 ? "PM" : "AM";
  const phoneClock = `${clockH}:${clockM}`;
  const msgTime1 = `${clockH}:${clockM} ${ampm}`;

  // Sequential minutes for replies
  const m2 = (minutes + 1) % 60;
  const h2 = minutes + 1 >= 60 ? (hours + 1) % 24 : hours;
  const clockH2 = h2 % 12 || 12;
  const clockM2 = m2 < 10 ? `0${m2}` : `${m2}`;
  const ampm2 = h2 >= 12 ? "PM" : "AM";
  const msgTime2 = `${clockH2}:${clockM2} ${ampm2}`;

  const m3 = (minutes + 2) % 60;
  const h3 = minutes + 2 >= 60 ? (hours + 1) % 24 : hours;
  const clockH3 = h3 % 12 || 12;
  const clockM3 = m3 < 10 ? `0${m3}` : `${m3}`;
  const ampm3 = h3 >= 12 ? "PM" : "AM";
  const msgTime3 = `${clockH3}:${clockM3} ${ampm3}`;

  // Business hours logic: 11:00 AM - 7:00 PM IST
  // If current time is past 5:30 PM (17:30) or early morning before 10:00 AM, today's business slots are over.
  // Frosty intelligently offers Tomorrow's verified open slots!
  const isLate = hours > 17 || (hours === 17 && minutes >= 30) || hours < 10;
  const isTomorrow = isLate;
  const targetDayLabel = isTomorrow ? "Tomorrow" : "Today";

  // Day tabs computation matching the active day
  const prev = new Date(now);
  prev.setDate(now.getDate() - 1);
  const next = new Date(now);
  next.setDate(now.getDate() + 1);
  const next2 = new Date(now);
  next2.setDate(now.getDate() + 2);

  const fmtDay = (d: Date, label?: string) => {
    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = d.getDate();
    return label ? `${weekday} ${dayNum} (${label})` : `${weekday} ${dayNum}`;
  };

  const dayTabs = isTomorrow
    ? [
        { d: fmtDay(now, "Today"), a: false },
        { d: fmtDay(next, "Tomorrow"), a: true },
        { d: fmtDay(next2), a: false },
      ]
    : [
        { d: fmtDay(prev), a: false },
        { d: fmtDay(now, "Today"), a: true },
        { d: fmtDay(next), a: false },
      ];

  let slots;
  let selectedSlot;

  if (!isTomorrow) {
    // Current time is during business day (before 5:30 PM)
    slots = [
      {
        timeRange: "03:00 PM – 03:30 PM IST",
        sub: "Available · 30m Video Call",
        tag: "Open",
        isRecommended: false,
        shortLabel: "Today · 3:00 PM",
      },
      {
        timeRange: "05:30 PM – 06:00 PM IST",
        sub: "Optimal Time · 0 Calendar Conflicts",
        tag: "RECOMMENDED",
        isRecommended: true,
        shortLabel: "Today · 5:30 PM",
      },
      {
        timeRange: "Tomorrow · 11:00 AM IST",
        sub: "Available · 30m Video Call",
        tag: "Open",
        isRecommended: false,
        shortLabel: "Tomorrow · 11:00 AM",
      },
    ];

    selectedSlot = {
      timeRange: "05:30 PM – 06:00 PM IST",
      shortLabel: "Today · 5:30 PM",
      meetLabel: "Today · 5:30 PM – 6:00 PM IST",
      userConfirmMsg: "Today at 5:30 PM works perfectly.",
      lockMsg: "Locking today at 5:30 PM on the calendar right now!",
      crmMeetingTag: "📅 Today 5:30 PM · Google Meet 🔗",
      crmSummary: "Calculated 14% bulk tier. Google Meet scheduled for today 5:30 PM for final contract.",
    };
  } else {
    // Current time is late evening (e.g. 6:55 PM) or night -> Offer tomorrow's slots
    slots = [
      {
        timeRange: "11:30 AM – 12:00 PM IST",
        sub: "Available · 30m Video Call",
        tag: "Open",
        isRecommended: false,
        shortLabel: "Tomorrow · 11:30 AM",
      },
      {
        timeRange: "03:30 PM – 04:00 PM IST",
        sub: "Optimal Time · 0 Calendar Conflicts",
        tag: "RECOMMENDED",
        isRecommended: true,
        shortLabel: "Tomorrow · 3:30 PM",
      },
      {
        timeRange: "05:30 PM – 06:00 PM IST",
        sub: "Available · 30m Video Call",
        tag: "Open",
        isRecommended: false,
        shortLabel: "Tomorrow · 5:30 PM",
      },
    ];

    selectedSlot = {
      timeRange: "03:30 PM – 04:00 PM IST",
      shortLabel: "Tomorrow · 3:30 PM",
      meetLabel: "Tomorrow · 3:30 PM – 4:00 PM IST",
      userConfirmMsg: "Tomorrow at 3:30 PM works perfectly.",
      lockMsg: "Locking tomorrow at 3:30 PM on the calendar right now!",
      crmMeetingTag: "📅 Tomorrow 3:30 PM · Google Meet 🔗",
      crmSummary: "Calculated 14% bulk tier. Google Meet scheduled for tomorrow 3:30 PM for final contract.",
    };
  }

  return {
    phoneClock,
    msgTime1,
    msgTime2,
    msgTime3,
    isTomorrow,
    targetDayLabel,
    dayTabs,
    slots,
    selectedSlot,
  };
}

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
    if (phase === 1) return { x: 93, y: 92, clicking: true, visible: true }; // clicks Frosty agent widget
    if (phase === 2) return { x: 76, y: 92, clicking: true, visible: true }; // types user question
    if (phase === 3) return { x: 76, y: 80, clicking: false, visible: true }; // thinking
    if (phase === 4) return { x: 70, y: 67.5, clicking: false, visible: true }; // hovers right on green CTA button
    // Phase 5: Clicks the green CTA button before transitioning!
    return { x: 70, y: 67.5, clicking: true, visible: true };
  }
  // Beat 5: Selecting 5:30 PM slot in WhatsApp
  if (beat === 5) {
    if (phase === 0) return { x: 74, y: 73, clicking: false, visible: true };
    if (phase === 1) return { x: 74, y: 73, clicking: false, visible: true }; // Hover on 5:30 PM slot
    if (phase === 2) return { x: 74, y: 73, clicking: true, visible: true }; // Clicks 5:30 PM slot!
    return { x: 74, y: 73, clicking: false, visible: false };
  }
  // Beat 7: Shifting / dragging the scattered whiteboard canvas
  if (beat === 7) {
    if (phase === 1) return { x: 52, y: 56, clicking: true, visible: true }; // Dragging canvas to reveal right tools
    return { x: 50, y: 50, clicking: false, visible: false };
  }
  // Beats 9, 10, 11: Managed by local precision-synced cursor in respective beats
  if (beat >= 9) {
    return { x: 50, y: 50, clicking: false, visible: false };
  }
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

/* Dashboard Icon — copied from DashboardSection.tsx with strict inline dimensions */
function DxIcon({ n, size = 12 }: { n: string; size?: number }) {
  const p: Record<string, React.ReactNode> = {
    layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" />,
    plug: <path d="M9 3v6M15 3v6M7 9h10v3a5 5 0 01-10 0V9zM12 17v4" />,
    doc: <path d="M7 3h7l4 4v14H7V3zM14 3v4h4M9 12h7M9 16h7" />,
    chart: <path d="M4 20V4M4 20h16M8 16l3-4 3 2 4-6" />,
    infinity: <path d="M6 9a3 3 0 100 6c2 0 3-2 6-3s4-3 6-3a3 3 0 110 6c-2 0-3-2-6-3S8 9 6 9z" />,
    bank: <path d="M3.4 9.6L12 4.8l8.6 4.8M5.6 10.4v7.8M9.8 10.4v7.8M14.2 10.4v7.8M18.4 10.4v7.8M3 19.4h18" />,
    model: <path d="M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v10M7 12h10M8.5 8.5l7 7M15.5 8.5l-7 7" />,
  };
  return (
    <svg
      style={{ width: size, height: size, minWidth: size, minHeight: size, flexShrink: 0, display: "inline-block" }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {p[n]}
    </svg>
  );
}
/* ═══════════════════════════════════════════════════════════════════
   KINETIC TYPOGRAPHY SYSTEM
   Silky word-by-word masked de-blur with spring physics
   ═══════════════════════════════════════════════════════════════════ */
function KineticBadge({
  icon,
  text,
  variant = "success",
  delay = 0.05,
}: {
  icon?: React.ReactNode;
  text: string;
  variant?: "error" | "success" | "teal" | "cyan" | "amber";
  delay?: number;
}) {
  const styles: Record<string, { bg: string; color: string; border: string }> = {
    error: { bg: "rgba(254,226,226,0.7)", color: "#DC2626", border: "rgba(239,68,68,0.25)" },
    success: { bg: "rgba(220,252,231,0.7)", color: "#166534", border: "rgba(34,197,94,0.3)" },
    teal: { bg: "rgba(204,251,241,0.7)", color: "#0F766E", border: "rgba(20,184,166,0.3)" },
    cyan: { bg: "rgba(224,242,254,0.7)", color: "#0369A1", border: "rgba(14,165,233,0.3)" },
    amber: { bg: "rgba(254,243,199,0.7)", color: "#B45309", border: "rgba(245,158,11,0.3)" },
  };
  const theme = styles[variant] || styles.success;
  return (
    <motion.div
      initial={{ opacity: 0, x: -12, filter: "blur(6px)", scale: 0.94 }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.02em",
        color: theme.color,
        background: theme.bg,
        border: `1px solid ${theme.border}`,
        padding: "3px 10px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        width: "fit-content",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
      }}
    >
      {icon && <span style={{ fontSize: 11, fontWeight: 900 }}>{icon}</span>}
      <span>{text}</span>
    </motion.div>
  );
}

interface KineticWordItem {
  text: string;
  highlight?: boolean;
  number?: boolean;
  breakAfter?: boolean;
}

function KineticWordHeadline({
  words,
  highlightColor = TEAL,
  delay = 0.15,
  fontSize = "clamp(20px, 2.4vw, 26px)",
}: {
  words: (string | KineticWordItem)[];
  highlightColor?: string;
  delay?: number;
  fontSize?: string | number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.042,
            delayChildren: delay,
          },
        },
      }}
      style={{
        fontSize,
        fontWeight: 800,
        color: DARK,
        lineHeight: 1.16,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        display: "flex",
        flexWrap: "wrap",
        rowGap: 2,
        columnGap: 5.5,
        alignItems: "baseline",
      }}
    >
      {words.map((w, idx) => {
        const isObj = typeof w === "object";
        const text = isObj ? w.text : w;
        const isHigh = isObj && w.highlight;
        const isNum = isObj && w.number;
        const breakAfter = isObj && w.breakAfter;

        return (
          <React.Fragment key={idx}>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                paddingBottom: 2,
                verticalAlign: "bottom",
              }}
            >
              <motion.span
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 22,
                    filter: "blur(8px)",
                    scale: 0.94,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    scale: 1,
                    transition: {
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                style={{
                  display: "inline-block",
                  color: isHigh ? highlightColor : isNum ? TEAL : "inherit",
                  fontFamily: isNum ? "'Outfit', sans-serif" : undefined,
                  fontWeight: 800,
                }}
              >
                {text}
              </motion.span>
            </span>
            {breakAfter && <div style={{ width: "100%", height: 0, flexBasis: "100%" }} />}
          </React.Fragment>
        );
      })}
    </motion.div>
  );
}

function KineticDescription({
  text,
  delay = 0.32,
}: {
  text: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ fontSize: 10.5, color: "#64748B", lineHeight: 1.45 }}
    >
      {text}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTENT GROUP: BROWSER (Beats 0–1)
   Website opens → visitor engages chat → CTA appears
   ═══════════════════════════════════════════════════════════════════ */
function BrowserGroupContent({ beat, phase }: { beat: number; phase: number }) {
  const siteVisible = beat > 0 || phase >= 3;
  const chatOpen = beat >= 1 && phase >= 1;
  const urlText = useTypingText("yourwebsite.com", beat === 0 && phase >= 1);
  const questionText = useTypingText("Do you have these headphones in Platinum Silver?", beat === 1 && phase >= 2);
  const showTypingDots = beat === 1 && phase === 3;
  const showReply = beat === 1 && phase >= 4;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
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
        <div style={{ flex: 1, background: "#F4F4F6", borderRadius: 7, padding: "4px 12px", fontSize: 10, color: "#475569", display: "flex", alignItems: "center", gap: 6, border: beat === 0 && phase === 1 ? `1.5px solid ${TEAL}` : "1px solid #E2E8F0", transition: "border-color 0.2s" }}>
          {siteVisible && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
          <span style={{ fontWeight: 600, fontSize: 10 }}>{urlText || (siteVisible ? "yourwebsite.com" : "")}</span>
          {beat === 0 && phase === 1 && urlText.length < 15 && (
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.45, repeat: Infinity }} style={{ width: 1.5, height: 11, background: TEAL, marginLeft: 1 }} />
          )}
        </div>
      </div>

      {/* ── Viewport ── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#FAFAFA", display: "flex", flexDirection: "column" }}>
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
            {/* ── Dedicated Prominent Top Storytelling Space ── */}
            <div style={{
              background: "#FFFFFF",
              borderBottom: "1px solid #E2E8F0",
              padding: "10px 16px 9px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              minHeight: 62,
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              flexShrink: 0,
            }}>
              <KineticBadge
                text="67% of buyers bounce when product search is slow"
                variant="error"
                delay={0.12}
              />
              <KineticWordHeadline
                fontSize="clamp(18px, 2vw, 22px)"
                delay={0.22}
                words={[
                  { text: "Instant" },
                  { text: "24/7" },
                  { text: "AI" },
                  { text: "Concierge." },
                  { text: "Answers" },
                  { text: "in" },
                  { text: "1.1s", number: true },
                  { text: "with" },
                  { text: "live" },
                  { text: "stock." },
                ]}
              />
            </div>

            {/* Site sub-header */}
            <div style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: DARK, padding: "5px 14px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 10.5, display: "flex", alignItems: "center", gap: 5 }}>
                <Globe style={{ width: 12, height: 12, color: TEAL }} />
                <span>yourwebsite.com</span>
              </div>
              <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 5, padding: "2.5px 8px", display: "flex", alignItems: "center", gap: 5, maxWidth: 190 }}>
                <Search style={{ width: 10, height: 10, color: "#94A3B8" }} />
                <span style={{ color: "#94A3B8", fontSize: 7.5 }}>Search products…</span>
              </div>
              <div style={{ fontSize: 7.5, color: "#64748B", fontWeight: 600 }}>Flash Deals</div>
            </div>

            {/* Product grid with full-bleed realistic photography */}
            <div style={{ flex: 1, padding: "8px 10px 10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, overflow: "hidden", position: "relative" }}>
              {[
                {
                  n: "Sony WH-1000XM5",
                  p: "₹24,990",
                  img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
                  b: "-17% OFF",
                  bCol: "#DC2626",
                },
                {
                  n: "Galaxy Watch Ultra",
                  p: "₹44,999",
                  img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80",
                  b: "NEW",
                  bCol: "#0284C7",
                },
                {
                  n: "Marshall Speaker",
                  p: "₹39,999",
                  img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=80",
                  b: "HOT",
                  bCol: "#D97706",
                },
                {
                  n: "Canon EOS R6",
                  p: "₹1,69,990",
                  img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80",
                  b: "PRO",
                  bCol: "#4F46E5",
                },
              ].map((prod) => (
                <div
                  key={prod.n}
                  style={{
                    position: "relative",
                    borderRadius: 10,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: "#0F172A",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  {/* Full block photo */}
                  <img
                    src={prod.img}
                    alt={prod.n}
                    loading="eager"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "brightness(0.92)",
                    }}
                  />
                  {/* Glassmorphic Gradient Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.45) 45%, rgba(0,0,0,0.1) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: 6,
                      left: 6,
                      background: prod.bCol,
                      color: "#FFF",
                      fontSize: 7,
                      fontWeight: 800,
                      padding: "2px 6px",
                      borderRadius: 4,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                      zIndex: 2,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {prod.b}
                  </span>
                  {/* Title and Price Info */}
                  <div style={{ position: "relative", zIndex: 2, padding: "6px 8px" }}>
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#FFFFFF",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                      }}
                    >
                      {prod.n}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: "#38BDF8",
                        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                        marginTop: 1,
                      }}
                    >
                      {prod.p}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Frosty widget button */}
        {siteVisible && !chatOpen && (
          <motion.div animate={{ boxShadow: [`0 4px 18px ${TEAL}35, 0 0 0 0px ${TEAL}20`, `0 4px 18px ${TEAL}35, 0 0 0 7px ${TEAL}06`, `0 4px 18px ${TEAL}35, 0 0 0 0px ${TEAL}20`] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", bottom: 12, right: 12, width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${TEAL}, #0284C7)`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 95, color: "#FFF", boxShadow: `0 4px 18px ${TEAL}35` }}>
            <Bot style={{ width: 19, height: 19 }} />
          </motion.div>
        )}

        {/* Chat overlay */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div key="chat" initial={{ opacity: 0, scale: 0.75, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 15 }} transition={{ duration: 0.4, ease: EASE }}
              style={{
                position: "absolute",
                bottom: 12,
                right: 12,
                width: 285,
                height: 335,
                borderRadius: 14,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                zIndex: 90,
                background: "rgba(255,255,255,0.98)",
                backdropFilter: "blur(20px)",
                border: `1px solid ${TEAL}25`,
                boxShadow: `0 20px 50px ${TEAL}22, 0 6px 20px rgba(0,0,0,0.08)`,
              }}>
              {/* Chat header */}
              <div style={{ background: `linear-gradient(135deg, ${TEAL}, #0284C7)`, color: "#FFF", padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bot style={{ width: 13, height: 13 }} />
                </div>
                <span>Frosty Agent</span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, fontSize: 8, color: "#A7F3D0", fontWeight: 700 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34D399" }} /> Online
                </span>
              </div>
              {/* Chat body */}
              <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8, flex: 1, overflowY: "auto" }}>
                <ChatBubble side="left" variant="ai" style={{ fontSize: 10.5, padding: "8px 12px" }}>Hi! 👋 Ask me anything about our products!</ChatBubble>

                {questionText && (
                  <ChatBubble side="right" variant="user" style={{ fontSize: 10.5, padding: "8px 12px" }}>{questionText}</ChatBubble>
                )}

                {showTypingDots && <TypingDots />}

                {showReply && (
                  <ChatBubble side="left" variant="ai" delay={0} style={{ fontSize: 10.5, padding: "8px 12px" }}>
                    <div>Yes! The Sony WH-1000XM5 is in stock in Platinum Silver — same-day delivery! ✅</div>
                    {/* The CTA button */}
                    <div style={{ marginTop: 8, background: "linear-gradient(135deg, #25D366, #128C7E)", color: "#FFF", padding: "6.5px 13px", borderRadius: 8, fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", gap: 6, cursor: "pointer", width: "fit-content", boxShadow: "0 3px 10px rgba(37,211,102,0.35)" }}>
                      <MessageCircle style={{ width: 12, height: 12 }} />
                      <span>Continue on WhatsApp</span>
                      <ArrowRight style={{ width: 11, height: 11 }} />
                    </div>
                  </ChatBubble>
                )}
              </div>
              {/* Input bar */}
              <div style={{ padding: "9px 12px", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0, background: "#FAFAFA" }}>
                <div style={{ flex: 1, background: "#FFF", border: "1px solid #E2E8F0", borderRadius: 7, padding: "6px 10px", fontSize: 9.5, color: "#94A3B8" }}>Ask Frosty…</div>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: TEAL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
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
   CONTENT GROUP: WHATSAPP (Beats 2, 3, and 5)
   Hyper-realistic WhatsApp smartphone with authentic negotiation & slot picking
   ═══════════════════════════════════════════════════════════════════ */
function WhatsAppGroupContent({ beat, phase }: { beat: number; phase: number }) {
  const b2 = beat === 2;
  const b3 = beat === 3;
  const b5 = beat === 5;

  const sched = useMemo(() => getDynamicSchedule(), []);

  const showWAThread = true;
  const showNewReply = (b2 && phase >= 3) || b3 || b5;
  const showComplexQ = (b3 && phase >= 0) || b5;
  const showHandoff = (b3 && phase >= 1) || b5;
  const showHumanReply = (b3 && phase >= 2) || b5;
  const showUserCounterQ = (b3 && phase >= 3) || b5;
  const showPriyaCallReply = (b3 && phase >= 4) || b5;
  const showCalendarScan = (b3 && phase >= 5) || (b5 && phase === 0);

  // In Beat 5 (WhatsApp slot booking):
  const showSlotOptions = b5 && phase >= 0;
  const slotSelected = b5 && phase >= 2;
  const showUserConfirmedMsg = b5 && phase >= 2;
  const showPriyaLockingMsg = b5 && phase >= 3;

  /* Step-by-step kinetic reveal based on phase */
  const showB2Solution = b2 && phase >= 2;
  const showB3Solution = b3 && phase >= 1;
  const showB5Solution = b5 && phase >= 1;

  /* Auto-scroll container */
  const chatScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [phase, beat]);

  return (
    <div style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 24px",
      background: "#FFFFFF",
      gap: 24,
      overflow: "hidden"
    }}>
      {/* ── LEFT SIDE: Pure Kinetic Storytelling Typography ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, maxWidth: 290 }}>
        {/* Dynamic Problem & Solution Kinetic Text */}
        <AnimatePresence mode="wait">
          {b2 ? (
            <motion.div
              key="text-whatsapp-sync"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", gap: 9 }}
            >
              <KineticBadge
                text="84% of leads drop when switching apps"
                variant="error"
                delay={0.05}
              />
              <KineticWordHeadline
                delay={0.15}
                words={[
                  { text: "Zero" },
                  { text: "Context" },
                  { text: "Lost.", breakAfter: true },
                  { text: "Same", highlight: true },
                  { text: "conversation", highlight: true },
                  { text: "on", highlight: true },
                  { text: "WhatsApp.", highlight: true },
                ]}
              />
              <KineticDescription
                delay={0.32}
                text="Your customer switches from website to phone in 1 click. Full chat history and intent follow them automatically."
              />
            </motion.div>
          ) : b3 ? (
            <motion.div
              key="text-human-handoff"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", gap: 9 }}
            >
              <KineticBadge
                text="Complex B2B negotiations get stuck with dumb bots"
                variant="error"
                delay={0.05}
              />
              <KineticWordHeadline
                delay={0.15}
                words={[
                  { text: "Smart" },
                  { text: "Human" },
                  { text: "Handoff.", breakAfter: true },
                  { text: "Priya", highlight: true },
                  { text: "steps", highlight: true },
                  { text: "in", highlight: true },
                  { text: "&", highlight: true },
                  { text: "customizes", highlight: true },
                  { text: "terms.", highlight: true },
                ]}
              />
              <KineticDescription
                delay={0.32}
                text="When custom volume pricing is negotiated, Frosty loops in your sales executive with live calendar scheduling."
              />
            </motion.div>
          ) : (
            <motion.div
              key="text-whatsapp-slot"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", gap: 9 }}
            >
              <KineticBadge
                text="Scheduling delays kill high-intent buyers"
                variant="error"
                delay={0.05}
              />
              <KineticWordHeadline
                delay={0.15}
                words={[
                  { text: "1-Tap" },
                  { text: "WhatsApp" },
                  { text: "Booking.", breakAfter: true },
                  { text: "Locks", highlight: true },
                  { text: "executive", highlight: true },
                  { text: "slots", highlight: true },
                  { text: "without", highlight: true },
                  { text: "leaving", highlight: true },
                  { text: "chat.", highlight: true },
                ]}
              />
              <KineticDescription
                delay={0.32}
                text="Buyers pick their preferred meeting time directly in WhatsApp with zero friction."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── RIGHT SIDE: Hyper-Realistic WhatsApp Smartphone Device Frame ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          width: 320,
          height: 448,
          borderRadius: 38,
          border: "7px solid #0F172A",
          background: "#0F172A",
          boxShadow: "0 30px 90px -10px rgba(15,23,42,0.38), 0 14px 32px -4px rgba(15,23,42,0.18), 0 0 0 1px rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {/* Device Screen Glass Container */}
        <div style={{ flex: 1, borderRadius: 30, overflow: "hidden", display: "flex", flexDirection: "column", background: "#ECE5DD" }}>
          {/* Status Bar + Dynamic Island */}
          <div style={{ background: "#075E54", color: "#FFF", padding: "5px 16px 2px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 8.5, fontWeight: 700, flexShrink: 0 }}>
            <span style={{ fontSize: 8.5 }}>{sched.phoneClock}</span>
            {/* Dynamic Island Notch */}
            <div style={{ width: 68, height: 13, background: "#000", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#1E293B", border: "0.5px solid #334155" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 8 }}>
              <span>5G</span>
              <div style={{ width: 14, height: 7, border: "1px solid #FFF", borderRadius: 2, padding: 0.5, display: "flex" }}>
                <div style={{ width: "80%", height: "100%", background: "#34D399", borderRadius: 1 }} />
              </div>
            </div>
          </div>

          {/* WhatsApp Official App Header */}
          <div style={{ background: "#075E54", color: "#FFF", padding: "6px 12px 7px", display: "flex", alignItems: "center", gap: 7, flexShrink: 0, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${TEAL}, #0284C7)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>
              <Bot style={{ width: 15, height: 15 }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 3.5 }}>
                <span style={{ fontSize: 10.5, fontWeight: 800 }}>Frosty Agent</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#38BDF8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              </div>
              <div style={{ fontSize: 7.5, color: "#86EFAC", fontWeight: 600 }}>online</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, opacity: 0.9 }}>
              <Video style={{ width: 12, height: 12, color: "#FFF" }} />
              <PhoneCall style={{ width: 11, height: 11, color: "#FFF" }} />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2"><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
            </div>
          </div>

          {/* WhatsApp Chat Stream with Smooth Auto-Scroll */}
          <div ref={chatScrollRef} style={{ flex: 1, position: "relative", overflowY: "auto", background: "#ECE5DD", padding: "10px 10px", display: "flex", flexDirection: "column", gap: 7, scrollBehavior: "smooth" }}>
            {/* Timestamp date divider */}
            <div style={{ alignSelf: "center", background: "#FFFFFF", padding: "2px 8px", borderRadius: 6, fontSize: 7, fontWeight: 700, color: "#64748B", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", textTransform: "uppercase" }}>
              Today
            </div>

            {/* WhatsApp thread */}
            {showWAThread && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                style={{ display: "flex", flexDirection: "column", gap: 6 }}>

                {/* 1. Context message from website */}
                <div style={{ alignSelf: "flex-end", maxWidth: "86%" }}>
                  <div style={{ fontSize: 6.5, color: "#075E54", fontWeight: 700, textAlign: "right", marginBottom: 2, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3.5 }}>
                    <Globe style={{ width: 8, height: 8, color: "#075E54" }} />
                    <span>Synced from website chat</span>
                  </div>
                  <div style={{ background: "#D9FDD3", border: "1px solid #C2EAB3", borderRadius: "10px 10px 2px 10px", padding: "6px 10px", color: DARK, fontSize: 9.5, lineHeight: 1.35, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
                    Do you have these headphones in Platinum Silver?
                    <div style={{ fontSize: 6.5, color: "#166534", textAlign: "right", marginTop: 2, fontWeight: 600 }}>{sched.msgTime1} ✓✓</div>
                  </div>
                </div>

                {/* 2. Frosty answer */}
                <div style={{ alignSelf: "flex-start", maxWidth: "86%", background: "#FFFFFF", borderRadius: "10px 10px 10px 2px", padding: "6px 10px", color: DARK, fontSize: 9.5, lineHeight: 1.35, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
                  Yes! Sony WH-1000XM5 in Platinum Silver is in stock.
                  <div style={{ fontSize: 6.5, color: "#94A3B8", textAlign: "right", marginTop: 2 }}>{sched.msgTime1}</div>
                </div>

                {/* 3. Follow up */}
                {showNewReply && (
                  <div style={{ alignSelf: "flex-start", maxWidth: "86%", background: "#FFFFFF", borderRadius: "10px 10px 10px 2px", padding: "6px 10px", color: DARK, fontSize: 9.5, lineHeight: 1.35, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
                    Want me to reserve one? I can share the checkout link directly.
                    <div style={{ fontSize: 6.5, color: "#94A3B8", textAlign: "right", marginTop: 2 }}>{sched.msgTime1}</div>
                  </div>
                )}

                {/* 4. Beat 3: 50 units bulk inquiry */}
                {showComplexQ && (
                  <div style={{ alignSelf: "flex-end", maxWidth: "86%", background: "#D9FDD3", border: "1px solid #C2EAB3", borderRadius: "10px 10px 2px 10px", padding: "6px 10px", color: DARK, fontSize: 9.5, lineHeight: 1.35, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
                    I want to negotiate a bulk order — 50 units. Can someone help with custom pricing?
                    <div style={{ fontSize: 6.5, color: "#166534", textAlign: "right", marginTop: 2, fontWeight: 600 }}>{sched.msgTime2} ✓✓</div>
                  </div>
                )}

                {/* 5. Priya Handoff Card */}
                {showHandoff && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
                    style={{ alignSelf: "center", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 8, padding: "5px 12px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F6, #1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", boxShadow: "0 2px 6px rgba(59,130,246,0.3)" }}>
                      <UserCheck style={{ width: 13, height: 13 }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 8.5, fontWeight: 800, color: DARK }}>Handed to Priya · Sales Lead</div>
                      <div style={{ fontSize: 6.5, color: "#059669", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
                        <span style={{ width: 4.5, height: 4.5, borderRadius: "50%", background: "#10B981" }} /> Human Agent Connected
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 6. Priya: 14% offer */}
                {showHumanReply && (
                  <div style={{ alignSelf: "flex-start", maxWidth: "86%", background: "#FFFFFF", borderRadius: "10px 10px 10px 2px", padding: "7px 10px", color: "#0F172A", fontSize: 9.5, lineHeight: 1.35, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderLeft: "3px solid #3B82F6" }}>
                    <div style={{ fontSize: 7, fontWeight: 800, color: "#2563EB", marginBottom: 2, display: "flex", alignItems: "center", gap: 3 }}>
                      <UserCheck style={{ width: 9, height: 9 }} /> Priya (Sales Lead)
                    </div>
                    Hi! For 50 units I can offer ₹21,500/unit — 14% off. Shall I send a formal quote?
                    <div style={{ fontSize: 6.5, color: "#94A3B8", textAlign: "right", marginTop: 2 }}>{sched.msgTime2}</div>
                  </div>
                )}

                {/* 7. User counter: 20% discount request + quick call */}
                {showUserCounterQ && (
                  <div style={{ alignSelf: "flex-end", maxWidth: "86%", background: "#D9FDD3", border: "1px solid #C2EAB3", borderRadius: "10px 10px 2px 10px", padding: "6px 10px", color: DARK, fontSize: 9.5, lineHeight: 1.35, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
                    We&apos;re looking for 20% off (₹20,000/unit) for immediate procurement. Can we schedule a quick call today to finalize?
                    <div style={{ fontSize: 6.5, color: "#166534", textAlign: "right", marginTop: 2, fontWeight: 600 }}>{sched.msgTime3} ✓✓</div>
                  </div>
                )}

                {/* 8. Priya: Let me check VIP calendar */}
                {showPriyaCallReply && (
                  <div style={{ alignSelf: "flex-start", maxWidth: "86%", background: "#FFFFFF", borderRadius: "10px 10px 10px 2px", padding: "7px 10px", color: "#0F172A", fontSize: 9.5, lineHeight: 1.35, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderLeft: "3px solid #3B82F6" }}>
                    <div style={{ fontSize: 7, fontWeight: 800, color: "#2563EB", marginBottom: 2, display: "flex", alignItems: "center", gap: 3 }}>
                      <UserCheck style={{ width: 9, height: 9 }} /> Priya (Sales Lead)
                    </div>
                    Let me check our VIP sales calendar for an open slot with me {sched.isTomorrow ? "tomorrow" : "today"}…
                    <div style={{ fontSize: 6.5, color: "#94A3B8", textAlign: "right", marginTop: 2 }}>{sched.msgTime3}</div>
                  </div>
                )}

                {/* 9. Calendar scanning indicator with Google & Outlook badges */}
                {showCalendarScan && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ alignSelf: "center", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 999, padding: "3px 11px", fontSize: 7.5, fontWeight: 800, color: "#1D4ED8", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} style={{ display: "flex" }}>
                      <Sparkles style={{ width: 10, height: 10, color: "#2563EB" }} />
                    </motion.div>
                    <span>Scanning live calendar slots…</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <GoogleCalendarLogo size={11} />
                      <OutlookLogo size={11} />
                    </div>
                  </motion.div>
                )}

                {/* 10. (Beat 5) Available Slots Selector in WhatsApp with professional icons */}
                {showSlotOptions && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
                    style={{ alignSelf: "flex-start", maxWidth: "90%", background: "#FFFFFF", borderRadius: "10px 10px 10px 2px", padding: "8px 10px", color: "#0F172A", fontSize: 9.5, lineHeight: 1.35, boxShadow: "0 2px 6px rgba(0,0,0,0.08)", borderLeft: `3px solid ${TEAL}` }}>
                    <div style={{ fontSize: 7.5, fontWeight: 800, color: TEAL, marginBottom: 4, display: "flex", alignItems: "center", gap: 3.5 }}>
                      <Calendar style={{ width: 10, height: 10 }} />
                      <span>Available Slots {sched.targetDayLabel}</span>
                    </div>
                    <div style={{ fontSize: 8.5, color: "#475569", marginBottom: 6 }}>Pick a convenient time for our VIP negotiation call:</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "4.5px 8px", borderRadius: 6, fontSize: 8.5, fontWeight: 700, color: DARK, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Clock style={{ width: 10, height: 10, color: "#64748B" }} />
                          <span>{sched.slots[0].shortLabel}</span>
                        </span>
                        <span style={{ fontSize: 7, color: "#94A3B8" }}>30m</span>
                      </div>
                      <motion.div
                        animate={{
                          background: slotSelected ? TEAL : "linear-gradient(135deg, #ECFDF5, #F0FDF4)",
                          borderColor: slotSelected ? TEAL : "#86EFAC",
                          color: slotSelected ? "#FFF" : "#166534",
                          scale: slotSelected ? 1.02 : 1,
                        }}
                        transition={{ duration: 0.25 }}
                        style={{ border: "1.5px solid #86EFAC", padding: "5px 8px", borderRadius: 6, fontSize: 8.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 6px rgba(34,197,94,0.15)", cursor: "pointer" }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Sparkles style={{ width: 11, height: 11, color: slotSelected ? "#FFF" : "#059669" }} />
                          <span>{sched.slots[1].shortLabel} (Recommended)</span>
                        </span>
                        <span style={{ fontSize: 7, fontWeight: 800, display: "flex", alignItems: "center", gap: 2 }}>
                          {slotSelected ? <><Check style={{ width: 8, height: 8, strokeWidth: 3 }} /> SELECTED</> : <>SELECT <ArrowRight style={{ width: 8, height: 8 }} /></>}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* 11. User confirmed message */}
                {showUserConfirmedMsg && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                    style={{ alignSelf: "flex-end", maxWidth: "86%", background: "#D9FDD3", border: "1px solid #C2EAB3", borderRadius: "10px 10px 2px 10px", padding: "6px 10px", color: DARK, fontSize: 9.5, lineHeight: 1.35, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
                    {sched.selectedSlot.userConfirmMsg}
                    <div style={{ fontSize: 6.5, color: "#166534", textAlign: "right", marginTop: 2, fontWeight: 600 }}>{sched.msgTime3} ✓✓</div>
                  </motion.div>
                )}

                {/* 12. Priya locking confirmation */}
                {showPriyaLockingMsg && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                    style={{ alignSelf: "flex-start", maxWidth: "86%", background: "#FFFFFF", borderRadius: "10px 10px 10px 2px", padding: "7px 10px", color: "#0F172A", fontSize: 9.5, lineHeight: 1.35, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderLeft: "3px solid #3B82F6" }}>
                    <div style={{ fontSize: 7, fontWeight: 800, color: "#2563EB", marginBottom: 2, display: "flex", alignItems: "center", gap: 3 }}>
                      <UserCheck style={{ width: 9, height: 9 }} /> Priya (Sales Lead)
                    </div>
                    {sched.selectedSlot.lockMsg}
                    <div style={{ fontSize: 6.5, color: "#94A3B8", textAlign: "right", marginTop: 2 }}>{sched.msgTime3}</div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>

          {/* Authentic WhatsApp Input Dock */}
          <div style={{ background: "#F0F2F5", padding: "6px 9px", display: "flex", alignItems: "center", gap: 6, borderTop: "1px solid #E2E8F0", flexShrink: 0 }}>
            <span style={{ fontSize: 13, cursor: "pointer" }}>😊</span>
            <span style={{ fontSize: 12, cursor: "pointer", opacity: 0.7 }}>📎</span>
            <div style={{ flex: 1, background: "#FFF", borderRadius: 20, padding: "4.5px 10px", fontSize: 8.5, color: "#94A3B8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>Message</span>
              <Camera style={{ width: 11, height: 11, color: "#94A3B8" }} />
            </div>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(37,211,102,0.3)" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTENT GROUP: MEETING & CALENDAR (Beats 4 & 6)
   Left Side: Calendar & Slot Matching Engine
   Right Side: Kinetic Storytelling Typography
   ═══════════════════════════════════════════════════════════════════ */
function MeetingGroupContent({ beat, phase }: { beat: number; phase: number }) {
  const b4 = beat === 4;
  const b6 = beat === 6;

  const sched = useMemo(() => getDynamicSchedule(), []);

  // In Beat 4 (Scanning slots):
  const showSlotsFound = b4 ? phase >= 1 : true;
  const showSlotHighlight = b4 ? phase >= 2 : b6;

  // In Beat 6 (Meeting Confirmed & Locked):
  const showConfirmedCard = b6 && phase >= 1;
  const showCRMNotice = b6 && phase >= 2;

  return (
    <div style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 24px",
      background: "#FFFFFF",
      gap: 24,
      overflow: "hidden",
    }}>
      {/* ── LEFT SIDE: Interactive Executive Calendar & Slot Engine ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          width: 320,
          height: 448,
          borderRadius: 28,
          border: "1px solid #E2E8F0",
          background: "#FFFFFF",
          boxShadow: "0 24px 70px -10px rgba(15,23,42,0.14), 0 10px 20px -5px rgba(15,23,42,0.06)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {/* Calendar Header with Verified Host & Multi-Calendar Badges */}
        <div style={{ background: "linear-gradient(135deg, #0F172A, #1E293B)", color: "#FFF", padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            {/* Priya Host Avatar with Verified Badge */}
            <div style={{ position: "relative" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F6, #1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", boxShadow: "0 2px 8px rgba(59,130,246,0.35)" }}>
                <UserCheck style={{ width: 16, height: 16 }} />
              </div>
              <div style={{ position: "absolute", bottom: -2, right: -2, width: 12, height: 12, borderRadius: "50%", background: "#10B981", border: "2px solid #0F172A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check style={{ width: 7, height: 7, strokeWidth: 3, color: "#FFF" }} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 800, display: "flex", alignItems: "center", gap: 4 }}>
                <span>Priya Sharma</span>
                <span style={{ fontSize: 7, background: "rgba(59,130,246,0.25)", color: "#93C5FD", padding: "1px 5px", borderRadius: 4, fontWeight: 700 }}>Sales Lead</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <GoogleCalendarLogo size={10} />
                <OutlookLogo size={10} />
                <span style={{ fontSize: 7.5, color: "#94A3B8", fontWeight: 600 }}>Google &amp; Outlook 2-Way Sync</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", padding: "2px 7px", borderRadius: 999, fontSize: 7.5, fontWeight: 800, color: "#34D399" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34D399" }} />
            LIVE
          </div>
        </div>

        {/* Dynamic Day selector tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #F1F5F9", background: "#F8FAFC", padding: "6px 10px", gap: 6, flexShrink: 0 }}>
          {sched.dayTabs.map((day: { d: string; a: boolean }) => (
            <div
              key={day.d}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "4px 2px",
                borderRadius: 6,
                fontSize: 8,
                fontWeight: day.a ? 800 : 600,
                background: day.a ? TEAL : "transparent",
                color: day.a ? "#FFF" : "#64748B",
                boxShadow: day.a ? `0 2px 6px ${TEAL}30` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 3.5,
              }}
            >
              {day.a && <CalendarDays style={{ width: 9, height: 9 }} />}
              <span>{day.d}</span>
            </div>
          ))}
        </div>

        {/* Slot engine body */}
        <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 9, overflowY: "auto" }}>
          {/* Status line */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 8.5, fontWeight: 800, color: DARK, textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 4 }}>
              <Clock style={{ width: 10, height: 10, color: TEAL }} />
              <span>{b6 ? "Confirmed Executive Slot" : "Detected Open Slots"}</span>
            </span>
            <span style={{ fontSize: 7.5, color: TEAL, fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
              {b6 ? <><Lock style={{ width: 9, height: 9 }} /> Locked</> : <><Sparkles style={{ width: 9, height: 9 }} /> Auto-Matching</>}
            </span>
          </div>

          {/* Slots list with rich rounded icon badges */}
          {showSlotsFound && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {/* Slot 1 */}
              <div style={{ border: "1px solid #E2E8F0", borderRadius: 8, padding: "7px 10px", background: "#FFF", display: "flex", alignItems: "center", justifyContent: "space-between", opacity: b6 ? 0.45 : 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
                    <Clock style={{ width: 13, height: 13 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: DARK }}>{sched.slots[0].timeRange}</div>
                    <div style={{ fontSize: 7, color: "#94A3B8" }}>{sched.slots[0].sub}</div>
                  </div>
                </div>
                <span style={{ fontSize: 7.5, color: "#64748B", background: "#F1F5F9", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>{sched.slots[0].tag}</span>
              </div>

              {/* Slot 2 (Selected & Locked) */}
              <motion.div
                animate={{
                  background: b6 ? `linear-gradient(135deg, ${TEAL}, #0284C7)` : showSlotHighlight ? "#ECFDF5" : "#FFF",
                  borderColor: b6 ? TEAL : showSlotHighlight ? "#86EFAC" : "#E2E8F0",
                  scale: b6 ? 1.02 : 1,
                }}
                transition={{ duration: 0.35 }}
                style={{
                  border: "1.5px solid",
                  borderRadius: 8,
                  padding: "8px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: b6 ? `0 4px 14px ${TEAL}40` : showSlotHighlight ? "0 2px 8px rgba(34,197,94,0.15)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: b6 ? "rgba(255,255,255,0.2)" : "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", color: b6 ? "#FFF" : "#166534" }}>
                    {b6 ? <Lock style={{ width: 14, height: 14 }} /> : <Sparkles style={{ width: 14, height: 14 }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 9.5, fontWeight: 800, color: b6 ? "#FFF" : DARK }}>
                      {sched.slots[1].timeRange}
                    </div>
                    <div style={{ fontSize: 7, color: b6 ? "rgba(255,255,255,0.85)" : "#059669", fontWeight: 700 }}>
                      {b6 ? "Selected by Arjun via WhatsApp" : sched.slots[1].sub}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: 7.5, fontWeight: 800, color: b6 ? "#FFF" : "#047857", background: b6 ? "rgba(255,255,255,0.2)" : "#D1FAE5", padding: "2px 7px", borderRadius: 4, display: "flex", alignItems: "center", gap: 3 }}>
                  {b6 ? <><CheckCircle2 style={{ width: 9, height: 9 }} /> LOCKED</> : sched.slots[1].tag}
                </span>
              </motion.div>

              {/* Slot 3 */}
              <div style={{ border: "1px solid #E2E8F0", borderRadius: 8, padding: "7px 10px", background: "#FFF", display: "flex", alignItems: "center", justifyContent: "space-between", opacity: b6 ? 0.45 : 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
                    <Clock style={{ width: 13, height: 13 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: DARK }}>{sched.slots[2].timeRange}</div>
                    <div style={{ fontSize: 7, color: "#94A3B8" }}>{sched.slots[2].sub}</div>
                  </div>
                </div>
                <span style={{ fontSize: 7.5, color: "#64748B", background: "#F1F5F9", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>{sched.slots[2].tag}</span>
              </div>
            </div>
          )}

          {/* Meeting Confirmed Rich Card (Beat 6) */}
          <AnimatePresence>
            {showConfirmedCard && (
              <motion.div
                key="confirmed-card"
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: EASE }}
                style={{
                  background: "#FFFFFF",
                  border: `1.5px solid ${TEAL}`,
                  borderRadius: 12,
                  padding: "10px 12px",
                  boxShadow: `0 8px 24px ${TEAL}20`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #10B981, #059669)", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(16,185,129,0.35)" }}>
                    <CheckCircle2 style={{ width: 15, height: 15 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 9.5, fontWeight: 800, color: DARK }}>Meeting Confirmed</div>
                    <div style={{ fontSize: 7.5, color: "#64748B" }}>VIP Bulk Procurement (50 Units)</div>
                  </div>
                </div>
                <div style={{ background: "#F8FAFC", borderRadius: 8, padding: "7px 9px", fontSize: 7.5, color: "#334155", display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: "#EFF6FF", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Calendar style={{ width: 9, height: 9 }} />
                    </div>
                    <span><strong>{sched.selectedSlot.meetLabel}</strong></span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: "#F5F3FF", color: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Users style={{ width: 9, height: 9 }} />
                    </div>
                    <span><strong>Priya Sharma (Sales) &amp; Arjun Mehta</strong></span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#0284C7", fontWeight: 700 }}>
                    <GoogleMeetLogo size={14} />
                    <span>meet.google.com/xyz-frosty-bulk</span>
                    <ExternalLink style={{ width: 8, height: 8, marginLeft: "auto", opacity: 0.7 }} />
                  </div>
                </div>
                {showCRMNotice && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ fontSize: 7, color: "#166534", fontWeight: 700, background: "#DCFCE7", padding: "3px 7px", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}
                  >
                    <Bell style={{ width: 9, height: 9, color: "#166534" }} />
                    <span>Google Calendar invite dispatched · CRM deal updated</span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── RIGHT SIDE: Pure Kinetic Storytelling Typography ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, maxWidth: 290 }}>
        <AnimatePresence mode="wait">
          {b4 ? (
            <motion.div
              key="text-meeting-scanning"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", gap: 9 }}
            >
              <KineticBadge
                text="Back-and-forth scheduling loses 42% of warm leads"
                variant="error"
                delay={0.05}
              />
              <KineticWordHeadline
                delay={0.15}
                words={[
                  { text: "Autonomous" },
                  { text: "Scheduling.", breakAfter: true },
                  { text: "Real-time", highlight: true },
                  { text: "calendar", highlight: true },
                  { text: "sync", highlight: true },
                  { text: "&", highlight: true },
                  { text: "slot", highlight: true },
                  { text: "engine.", highlight: true },
                ]}
              />
              <KineticDescription
                delay={0.32}
                text="Frosty checks live executive calendars, proposes conflict-free slots directly inside chat, and books without human lag."
              />
            </motion.div>
          ) : (
            <motion.div
              key="text-meeting-locked"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", gap: 9 }}
            >
              <KineticBadge
                text="Zero scheduling friction · Lead secured"
                variant="success"
                delay={0.05}
              />
              <KineticWordHeadline
                delay={0.15}
                words={[
                  { text: "Instant" },
                  { text: "Lead" },
                  { text: "Conversion.", breakAfter: true },
                  { text: "From", highlight: true },
                  { text: "WhatsApp", highlight: true },
                  { text: "chat", highlight: true },
                  { text: "to", highlight: true },
                  { text: "confirmed", highlight: true },
                  { text: "calendar", highlight: true },
                  { text: "invite.", highlight: true },
                ]}
              />
              <KineticDescription
                delay={0.32}
                text="Meeting locked in 10 seconds. Automated Google Meet links generated, calendar invites dispatched, and CRM pipeline updated."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTENT GROUP: MERCHANT CHAOS & FROSTY CORE (Beat 7)
   Scattered Organic Cards Canvas → Interactive Drag Pan Shift → Frosty AI Core
   ═══════════════════════════════════════════════════════════════════ */
function MerchantChaosTransitionContent({ beat, phase }: { beat: number; phase: number }) {
  const isHook = phase === 0;
  const isChaos = phase === 1;
  const isCore = phase >= 2;
  const isZooming = phase === 3;

  const sched = useMemo(() => getDynamicSchedule(), []);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 18px 12px",
        background: "radial-gradient(ellipse at 50% 30%, #F0FDFA 0%, #F8FAFC 55%, #FFFFFF 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      {/* ── Top Storytelling Typography ── */}
      <motion.div
        animate={{
          scale: isZooming ? 1.25 : 1,
          opacity: isZooming ? 0 : 1,
          filter: isZooming ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ duration: 0.45, ease: [0.12, 0.8, 0.18, 1] }}
        style={{
          width: "100%",
          maxWidth: 540,
          textAlign: "center",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <AnimatePresence mode="wait">
          {isHook ? (
            <motion.div
              key="merchant-hook"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
            >
              <KineticBadge
                text="✦ BEHIND THE SCENES · BUSINESS OWNER VIEW"
                variant="success"
                delay={0.05}
              />
              <KineticWordHeadline
                fontSize="clamp(20px, 2.3vw, 25px)"
                delay={0.15}
                words={[
                  { text: "How" },
                  { text: "Do" },
                  { text: "You" },
                  { text: "Run" },
                  { text: "All", breakAfter: true },
                  { text: "These", highlight: true },
                  { text: "Moving", highlight: true },
                  { text: "Parts", highlight: true },
                  { text: "Seamlessly?", highlight: true },
                ]}
              />
              <KineticDescription
                delay={0.32}
                text="Lead segregation, quotations, CRM pipelines, team dispatch, and conversion analytics — all at once."
              />
            </motion.div>
          ) : isChaos ? (
            <motion.div
              key="merchant-chaos-title"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
            >
              <KineticBadge
                text="✕ 8 Disconnected Systems · 14 Open Tabs · 80% Manual Chaos"
                variant="error"
                delay={0.05}
              />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.2vw, 24px)"
                delay={0.15}
                words={[
                  { text: "Too" },
                  { text: "Many" },
                  { text: "Fragmented" },
                  { text: "Tools.", breakAfter: true },
                  { text: "Scattered", highlight: true },
                  { text: "Context.", highlight: true },
                  { text: "Lost", highlight: true },
                  { text: "Deals.", highlight: true },
                ]}
              />
              <KineticDescription
                delay={0.32}
                text="Data scattered across sheets, tabs, and apps while high-value buyers slip away."
              />
            </motion.div>
          ) : (
            <motion.div
              key="merchant-frosty-title"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
            >
              <KineticBadge
                text="✦ ONE SINGLE UNIFIED AI PLATFORM"
                variant="success"
                delay={0.05}
              />
              <KineticWordHeadline
                fontSize="clamp(21px, 2.5vw, 26px)"
                delay={0.15}
                words={[
                  { text: "Let" },
                  { text: "Frosty" },
                  { text: "Handle" },
                  { text: "It.", breakAfter: true },
                  { text: "One", highlight: true },
                  { text: "Intelligent", highlight: true },
                  { text: "Workspace.", highlight: true },
                ]}
              />
              <KineticDescription
                delay={0.32}
                text="Every lead scored, every quotation drafted, every calendar slot booked — handled autonomously in one dashboard."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Center Stage: Scattered Organic Board OR Radiant Frosty Core ── */}
      <div
        style={{
          flex: 1,
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 250,
        }}
      >
        {/* Phase 0 & 1: Scattered Organic Cards Canvas with Pan Shift */}
        <AnimatePresence>
          {!isCore && (
            <motion.div
              key="scattered-canvas-container"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.85,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Panning / Dragging Whiteboard Canvas with Squarish Rounded Cards */}
              <motion.div
                animate={{
                  x: isChaos ? -620 : 30,
                }}
                transition={{
                  duration: isChaos ? 2.8 : 0.8,
                  ease: [0.25, 1, 0.5, 1],
                }}
                style={{
                  position: "relative",
                  width: 1280,
                  height: 230,
                  flexShrink: 0,
                }}
              >
                {/* ── Card 1: Lead Intent & Scoring (Squarish, Tilted Left) ── */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    left: 20,
                    top: 15,
                    width: 145,
                    height: 135,
                    background: "#FFFFFF",
                    borderRadius: 16,
                    border: "1px solid #FED7AA",
                    padding: "10px 11px",
                    boxShadow: "0 14px 30px -6px rgba(234,88,12,0.18), 0 2px 6px rgba(0,0,0,0.04)",
                    transform: "rotate(-8deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "#FFEDD5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Flame style={{ width: 12, height: 12, color: "#EA580C" }} />
                    </div>
                    <span style={{ background: "#FFEDD5", color: "#C2410C", fontSize: 6.5, fontWeight: 800, padding: "1.5px 5px", borderRadius: 4 }}>124 LEADS</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 8.5, fontWeight: 800, color: DARK }}>Lead Scoring</div>
                    <div style={{ fontSize: 7, color: "#C2410C", fontWeight: 700, marginTop: 2 }}>🔥 85% Enterprise B2B</div>
                    <div style={{ width: "100%", height: 3.5, background: "#FED7AA", borderRadius: 2, marginTop: 3, overflow: "hidden" }}>
                      <div style={{ width: "85%", height: "100%", background: "#EA580C", borderRadius: 2 }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 6.5, color: "#64748B", fontWeight: 600, borderTop: "1px solid #FFF7ED", paddingTop: 3 }}>
                    ⚡ 32 Warm Retailers
                  </div>
                </motion.div>

                {/* ── Card 2: Automated Quotations (Squarish, Tilted Right) ── */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  style={{
                    position: "absolute",
                    left: 175,
                    top: 65,
                    width: 150,
                    height: 140,
                    background: "#FFFFFF",
                    borderRadius: 16,
                    border: "1px solid #DDD6FE",
                    padding: "10px 11px",
                    boxShadow: "0 14px 30px -6px rgba(124,58,237,0.18), 0 2px 6px rgba(0,0,0,0.04)",
                    transform: "rotate(7deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "#F5F3FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Receipt style={{ width: 12, height: 12, color: "#7C3AED" }} />
                    </div>
                    <span style={{ background: "#F5F3FF", color: "#6D28D9", fontSize: 6.5, fontWeight: 800, padding: "1.5px 5px", borderRadius: 4 }}>14% OFF</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 8.5, fontWeight: 800, color: DARK }}>Smart Quotes</div>
                    <div style={{ fontSize: 7, color: "#64748B", marginTop: 2 }}>50x Sony XM5</div>
                    <div style={{ fontSize: 9, fontWeight: 900, color: TEAL, marginTop: 1 }}>₹21,500/unit</div>
                  </div>
                  <div style={{ fontSize: 6.5, color: "#7C3AED", fontWeight: 700, background: "#F5F3FF", padding: "2px 4px", borderRadius: 3, textAlign: "center" }}>
                    Draft #Q-849 Auto-Generated
                  </div>
                </motion.div>

                {/* ── Card 3: Live Catalog & Stock (Squarish, Tilted Left) ── */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  style={{
                    position: "absolute",
                    left: 335,
                    top: 10,
                    width: 140,
                    height: 130,
                    background: "#FFFFFF",
                    borderRadius: 15,
                    border: "1px solid #D9F99D",
                    padding: "9px 10px",
                    boxShadow: "0 12px 26px -6px rgba(101,163,13,0.18)",
                    transform: "rotate(-5deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "#ECFCCB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ShoppingBag style={{ width: 12, height: 12, color: "#65A30D" }} />
                    </div>
                    <span style={{ background: "#ECFCCB", color: "#4D7C0F", fontSize: 6.5, fontWeight: 800, padding: "1.5px 5px", borderRadius: 4 }}>18 IN STOCK</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 8.5, fontWeight: 800, color: DARK }}>Catalog Sync</div>
                    <div style={{ fontSize: 7, color: "#334155", fontWeight: 600, marginTop: 2 }}>Sony WH-1000XM5</div>
                  </div>
                  <div style={{ fontSize: 6.5, color: "#4D7C0F", fontWeight: 700, borderTop: "1px solid #F7FEE7", paddingTop: 3 }}>
                    ✓ Real-Time Stock Matched
                  </div>
                </motion.div>

                {/* ── Card 4: Omnichannel CRM Pipeline (Squarish, Straight Hero Card) ── */}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                  style={{
                    position: "absolute",
                    left: 485,
                    top: 50,
                    width: 155,
                    height: 145,
                    background: "#FFFFFF",
                    borderRadius: 18,
                    border: `1.5px solid #BAE6FD`,
                    padding: "11px 12px",
                    boxShadow: "0 18px 36px -6px rgba(2,132,199,0.22), 0 2px 6px rgba(0,0,0,0.04)",
                    transform: "rotate(0deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    zIndex: 10,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ width: 24, height: 24, borderRadius: 7, background: "#E0F2FE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Layers style={{ width: 13, height: 13, color: "#0284C7" }} />
                    </div>
                    <span style={{ background: "#E0F2FE", color: "#0369A1", fontSize: 6.5, fontWeight: 800, padding: "1.5px 5px", borderRadius: 4 }}>₹48.5L ACTIVE</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 800, color: DARK }}>Omnichannel CRM</div>
                    <div style={{ fontSize: 7.5, color: "#0284C7", fontWeight: 700, marginTop: 2 }}>6 Deals Won Today</div>
                    <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                      <div style={{ flex: 1, height: 3.5, background: "#0284C7", borderRadius: 2 }} />
                      <div style={{ flex: 1, height: 3.5, background: "#0284C7", borderRadius: 2 }} />
                      <div style={{ flex: 1, height: 3.5, background: "#BAE6FD", borderRadius: 2 }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 6.5, color: "#64748B", fontWeight: 600, borderTop: "1px solid #F0F9FF", paddingTop: 3 }}>
                    Auto-Synced Across Channels
                  </div>
                </motion.div>

                {/* ── Card 5: Conversion Rate Analytics (Squarish, Tilted Right) ── */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  style={{
                    position: "absolute",
                    left: 650,
                    top: 15,
                    width: 145,
                    height: 135,
                    background: "#FFFFFF",
                    borderRadius: 16,
                    border: "1px solid #FBCFE8",
                    padding: "10px 11px",
                    boxShadow: "0 14px 30px -6px rgba(219,39,119,0.18)",
                    transform: "rotate(8deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "#FCE7F3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <BarChart3 style={{ width: 12, height: 12, color: "#DB2777" }} />
                    </div>
                    <span style={{ background: "#FCE7F3", color: "#BE185D", fontSize: 6.5, fontWeight: 800, padding: "1.5px 5px", borderRadius: 4 }}>+28% REV</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 8.5, fontWeight: 800, color: DARK }}>Conversion Radar</div>
                    <div style={{ fontSize: 10, fontWeight: 900, color: "#DB2777", marginTop: 1 }}>45% Lead Rate</div>
                  </div>
                  <div style={{ fontSize: 6.5, color: "#64748B", fontWeight: 600, borderTop: "1px solid #FDF2F8", paddingTop: 3 }}>
                    ⚡ 1.1s Avg AI Response Time
                  </div>
                </motion.div>

                {/* ── Card 6: Multi-Channel Inbox (Squarish, Tilted Left) ── */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  style={{
                    position: "absolute",
                    left: 805,
                    top: 65,
                    width: 145,
                    height: 135,
                    background: "#FFFFFF",
                    borderRadius: 16,
                    border: "1px solid #BBF7D0",
                    padding: "10px 11px",
                    boxShadow: "0 14px 30px -6px rgba(22,163,74,0.18)",
                    transform: "rotate(-6deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <MessageCircle style={{ width: 12, height: 12, color: "#16A34A" }} />
                    </div>
                    <span style={{ background: "#DCFCE7", color: "#15803D", fontSize: 6.5, fontWeight: 800, padding: "1.5px 5px", borderRadius: 4 }}>32 NEW</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 8.5, fontWeight: 800, color: DARK }}>Inbox Router</div>
                    <div style={{ fontSize: 7, color: "#15803D", fontWeight: 700, marginTop: 2 }}>WhatsApp · Web · Email</div>
                  </div>
                  <div style={{ fontSize: 6.5, color: "#16A34A", fontWeight: 700, background: "#F0FDF4", padding: "2px 4px", borderRadius: 3, textAlign: "center" }}>
                    Zero Context Lost
                  </div>
                </motion.div>

                {/* ── Card 7: Team Dispatch & Co-Pilot (Squarish, Tilted Right) ── */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  style={{
                    position: "absolute",
                    left: 960,
                    top: 15,
                    width: 145,
                    height: 135,
                    background: "#FFFFFF",
                    borderRadius: 16,
                    border: "1px solid #C7D2FE",
                    padding: "10px 11px",
                    boxShadow: "0 14px 30px -6px rgba(79,70,229,0.18)",
                    transform: "rotate(5deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Users style={{ width: 12, height: 12, color: "#4F46E5" }} />
                    </div>
                    <span style={{ background: "#EEF2FF", color: "#4338CA", fontSize: 6.5, fontWeight: 800, padding: "1.5px 5px", borderRadius: 4 }}>CO-PILOT</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 8.5, fontWeight: 800, color: DARK }}>Team Dispatch</div>
                    <div style={{ fontSize: 7, color: "#4F46E5", fontWeight: 700, marginTop: 2 }}>Assigned: Priya S.</div>
                  </div>
                  <div style={{ fontSize: 6.5, color: "#64748B", fontWeight: 600, borderTop: "1px solid #EEF2FF", paddingTop: 3 }}>
                    Full Chat Journey Synced
                  </div>
                </motion.div>

                {/* ── Card 8: Conflict-Free Slot Engine (Squarish, Tilted Left) ── */}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3.7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  style={{
                    position: "absolute",
                    left: 1115,
                    top: 60,
                    width: 140,
                    height: 130,
                    background: "#FFFFFF",
                    borderRadius: 16,
                    border: "1px solid #BFDBFE",
                    padding: "10px 11px",
                    boxShadow: "0 14px 30px -6px rgba(2,132,199,0.18)",
                    transform: "rotate(-3deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Calendar style={{ width: 12, height: 12, color: "#0284C7" }} />
                    </div>
                    <span style={{ background: "#EFF6FF", color: "#1D4ED8", fontSize: 6.5, fontWeight: 800, padding: "1.5px 5px", borderRadius: 4 }}>1-TAP</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 8.5, fontWeight: 800, color: DARK }}>Slot Engine</div>
                    <div style={{ fontSize: 7, color: "#0284C7", fontWeight: 700, marginTop: 2 }}>Google Meet &amp; Cal</div>
                  </div>
                  <div style={{ fontSize: 6.5, color: "#166534", fontWeight: 700, background: "#DCFCE7", padding: "2px 4px", borderRadius: 3, textAlign: "center" }}>
                    {sched.selectedSlot.shortLabel} Locked
                  </div>
                </motion.div>
              </motion.div>

              {/* Edge Gradient Scrims for seamless fade */}
              <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 35, background: "linear-gradient(to right, rgba(240,253,250,0.9) 0%, transparent 100%)", pointerEvents: "none", zIndex: 10 }} />
              <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 35, background: "linear-gradient(to left, rgba(255,255,255,0.9) 0%, transparent 100%)", pointerEvents: "none", zIndex: 10 }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 2 & 3: Radiant Glowing Frosty AI Core & Cinematic Camera Zoom Portal */}
        <AnimatePresence>
          {isCore && (
            <motion.div
              key="frosty-core-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isZooming ? 6.5 : [0.94, 1.04, 0.94],
                opacity: isZooming ? 0 : 1,
                filter: isZooming ? "blur(14px)" : "blur(0px)",
              }}
              transition={{
                scale: isZooming ? { duration: 0.45, ease: [0.12, 0.8, 0.18, 1] } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: isZooming ? 0.45 : 0.4 },
                filter: { duration: 0.45 },
              }}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 150,
                height: 150,
                zIndex: 40,
              }}
            >
              {/* Outer Radiant Concentric Aura Ring 1 */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.08, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: -28,
                  borderRadius: "50%",
                  border: `2px dashed ${TEAL}60`,
                  background: `radial-gradient(circle, ${TEAL}20 0%, transparent 70%)`,
                }}
              />

              {/* Aura Ring 2 */}
              <motion.div
                animate={{ rotate: -360, scale: [1.05, 0.95, 1.05] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: -14,
                  borderRadius: "50%",
                  border: `1.5px solid #22D3EE80`,
                  boxShadow: `0 0 40px ${TEAL}45`,
                }}
              />

              {/* Central Metallic Glowing Shield Emblem */}
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 26,
                  background: `linear-gradient(135deg, ${TEAL}, #0284C7, #0F172A)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFF",
                  boxShadow: `0 16px 45px ${TEAL}60, 0 0 0 3px rgba(255,255,255,0.45)`,
                  position: "relative",
                  zIndex: 20,
                }}
              >
                <motion.div
                  animate={{ scale: [0.92, 1.06, 0.92] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Bot style={{ width: 44, height: 44, color: "#FFF" }} />
                </motion.div>
                <div style={{ position: "absolute", top: 8, right: 8 }}>
                  <Sparkles style={{ width: 15, height: 15, color: "#67E8F9" }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Subtle Indicator */}
      <div style={{ fontSize: 8.5, color: "#94A3B8", fontWeight: 600, display: "flex", alignItems: "center", gap: 5, zIndex: 30 }}>
        <Sparkles style={{ width: 11, height: 11, color: TEAL }} />
        <span>Unified Merchant Intelligence</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTENT GROUP: ONE SHARED BRAIN & KNOWLEDGE BASE (Beat 8)
   Procedural Bioluminescent Neural Brain with Synaptic Pulses & Synced Agents
   ═══════════════════════════════════════════════════════════════════ */
function SharedBrainKnowledgeContent({ beat, phase }: { beat: number; phase: number }) {
  const isIntro = phase === 0;
  const isSync = phase === 1;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 18px 12px",
        background: "radial-gradient(ellipse at 50% 30%, #F0FDFA 0%, #F8FAFC 55%, #FFFFFF 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background glowing circles */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(99,102,241,0.12) 40%, transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {/* Background subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      {/* ── Top Storytelling Typography ── */}
      <div style={{ width: "100%", maxWidth: 540, textAlign: "center", zIndex: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
        <AnimatePresence mode="wait">
          {isIntro ? (
            <motion.div
              key="kb-intro"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
            >
              <KineticBadge
                text="✦ ONE SHARED KNOWLEDGE BASE · REAL-TIME SYNC"
                variant="success"
                delay={0.05}
              />
              <KineticWordHeadline
                fontSize="clamp(20px, 2.3vw, 25px)"
                delay={0.15}
                words={[
                  { text: "One" },
                  { text: "Shared" },
                  { text: "Brain.", breakAfter: true },
                  { text: "Instant", highlight: true },
                  { text: "Cross-Channel", highlight: true },
                  { text: "Memory.", highlight: true },
                ]}
              />
              <KineticDescription
                delay={0.32}
                text="Both Website and WhatsApp agents think from the exact same real-time memory matrix."
              />
            </motion.div>
          ) : isSync ? (
            <motion.div
              key="kb-sync"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
            >
              <KineticBadge
                text="✦ ZERO CONTEXT LOSS · 100% UNIFIED"
                variant="success"
                delay={0.05}
              />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.2vw, 24px)"
                delay={0.15}
                words={[
                  { text: "Never" },
                  { text: "Repeat" },
                  { text: "Information.", breakAfter: true },
                  { text: "Context", highlight: true },
                  { text: "Never", highlight: true },
                  { text: "Resets.", highlight: true },
                ]}
              />
              <KineticDescription
                delay={0.32}
                text="Customer intent, discounts, and inventory status remain synchronized at 0.0ms latency."
              />
            </motion.div>
          ) : (
            <motion.div
              key="kb-always"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
            >
              <KineticBadge
                text="✦ SELF-UPDATING NEURAL INTELLIGENCE"
                variant="success"
                delay={0.05}
              />
              <KineticWordHeadline
                fontSize="clamp(21px, 2.5vw, 26px)"
                delay={0.15}
                words={[
                  { text: "Update" },
                  { text: "Once.", breakAfter: true },
                  { text: "Learned", highlight: true },
                  { text: "Everywhere", highlight: true },
                  { text: "Instantly.", highlight: true },
                ]}
              />
              <KineticDescription
                delay={0.32}
                text="Update a price, policy, or stock count once — every agent reflects it immediately."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Center Stage: Animated Bioluminescent Neural Brain & Dual Connected Agents ── */}
      <div
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 680,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10px",
          minHeight: 250,
        }}
      >
        {/* ── Left Agent Card: Website Agent ── */}
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 142,
            background: "#FFFFFF",
            borderRadius: 14,
            border: "1.5px solid #BAE6FD",
            padding: "10px 11px",
            boxShadow: "0 16px 36px -6px rgba(2,132,199,0.2), 0 2px 8px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 7,
            zIndex: 20,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: "#E0F2FE", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Globe style={{ width: 13, height: 13, color: "#0284C7" }} />
            </div>
            <span style={{ background: "#DCFCE7", color: "#15803D", fontSize: 6.5, fontWeight: 800, padding: "1.5px 5px", borderRadius: 4, display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#22C55E", animation: "pulse 1.5s infinite" }} />
              LIVE
            </span>
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 800, color: DARK }}>Website Agent</div>
            <div style={{ fontSize: 7, color: "#64748B", marginTop: 1 }}>yourwebsite.com</div>
          </div>
          <div style={{ fontSize: 6.8, color: "#0369A1", background: "#F0F9FF", padding: "3px 6px", borderRadius: 5, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
            <Sparkles style={{ width: 9, height: 9, color: TEAL }} />
            <span>Catalog &amp; Live Price Synced</span>
          </div>
        </motion.div>

        {/* Defs Filter for Glowing Energy Particles */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id="tour-brain-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* ── Central Master-Crafted Large Neural Brain ── */}
        <div
          style={{
            position: "relative",
            width: 330,
            height: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 15,
          }}
        >
          {/* Central Pulsating Bioluminescent Radial Light Aura */}
          <motion.div
            animate={{
              scale: [0.92, 1.14, 0.95, 1.08, 0.92],
              opacity: [0.45, 0.85, 0.5, 0.75, 0.45],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
            style={{
              position: "absolute",
              width: 270,
              height: 270,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(6,182,212,0.38) 0%, rgba(139,92,246,0.22) 40%, rgba(245,158,11,0.15) 60%, transparent 75%)",
              filter: "blur(28px)",
              pointerEvents: "none",
            }}
          />

          {/* ── Left Bridge Line (Connecting Left Card into Brain Core) ── */}
          <div
            style={{
              position: "absolute",
              left: -75,
              width: 235,
              top: "50%",
              transform: "translateY(-50%)",
              height: 4,
              pointerEvents: "none",
              zIndex: 12,
            }}
          >
            <svg style={{ width: "100%", height: "100%", overflow: "visible" }} fill="none">
              <line x1="0" y1="2" x2="100%" y2="2" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3.5" strokeOpacity="0.85" />
              {/* Traveling Cyan Pulse Particle */}
              <circle r="4" fill="#0396A6" filter="url(#tour-brain-glow)">
                <animateMotion
                  dur="3.2s"
                  repeatCount="indefinite"
                  path="M 0 2 L 235 2"
                  keyTimes="0; 0.45; 1"
                  keyPoints="0; 1; 1"
                />
                <animate
                  attributeName="opacity"
                  values="0; 1; 1; 0; 0"
                  keyTimes="0; 0.05; 0.44; 0.48; 1"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Trailing Atom */}
              <circle r="2.8" fill="#38BDF8" filter="url(#tour-brain-glow)">
                <animateMotion
                  dur="3.2s"
                  repeatCount="indefinite"
                  path="M 0 2 L 235 2"
                  keyTimes="0; 0.52; 1"
                  keyPoints="0; 1; 1"
                />
                <animate
                  attributeName="opacity"
                  values="0; 0; 0.8; 0; 0"
                  keyTimes="0; 0.1; 0.51; 0.55; 1"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          {/* ── Right Bridge Line (Connecting Right Card into Brain Core) ── */}
          <div
            style={{
              position: "absolute",
              right: -75,
              width: 235,
              top: "50%",
              transform: "translateY(-50%)",
              height: 4,
              pointerEvents: "none",
              zIndex: 12,
            }}
          >
            <svg style={{ width: "100%", height: "100%", overflow: "visible" }} fill="none">
              <line x1="0" y1="2" x2="100%" y2="2" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3.5" strokeOpacity="0.85" />
              {/* Traveling Green Pulse Particle */}
              <circle r="4" fill="#10B981" filter="url(#tour-brain-glow)">
                <animateMotion
                  dur="3.2s"
                  repeatCount="indefinite"
                  path="M 235 2 L 0 2"
                  keyTimes="0; 0.45; 1"
                  keyPoints="0; 1; 1"
                />
                <animate
                  attributeName="opacity"
                  values="0; 1; 1; 0; 0"
                  keyTimes="0; 0.05; 0.44; 0.48; 1"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Trailing Atom */}
              <circle r="2.8" fill="#34D399" filter="url(#tour-brain-glow)">
                <animateMotion
                  dur="3.2s"
                  repeatCount="indefinite"
                  path="M 235 2 L 0 2"
                  keyTimes="0; 0.52; 1"
                  keyPoints="0; 1; 1"
                />
                <animate
                  attributeName="opacity"
                  values="0; 0; 0.8; 0; 0"
                  keyTimes="0; 0.1; 0.51; 0.55; 1"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          {/* ── Central Overlapping Shockwave Halo when streams meet in the core ── */}
          <svg
            style={{
              position: "absolute",
              width: 140,
              height: 140,
              pointerEvents: "none",
              overflow: "visible",
              zIndex: 14,
            }}
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="18" fill="none" stroke="#0396A6" filter="url(#tour-brain-glow)">
              <animate
                attributeName="r"
                values="12; 12; 12; 48; 62"
                keyTimes="0; 0.42; 0.48; 0.78; 1"
                dur="3.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0; 0; 0.95; 0.25; 0"
                keyTimes="0; 0.42; 0.48; 0.78; 1"
                dur="3.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                values="2; 2; 3; 1; 0"
                keyTimes="0; 0.42; 0.48; 0.78; 1"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* Beating Clean Neural Brain (Large Scale) */}
          <motion.div
            animate={{
              scale: [1, 1.045, 0.99, 1.035, 1],
              y: [0, -4, 0, -2, 0],
              filter: [
                "drop-shadow(0 12px 28px rgba(6,182,212,0.32))",
                "drop-shadow(0 18px 46px rgba(6,182,212,0.65)) drop-shadow(0 0 24px rgba(245,158,11,0.38))",
                "drop-shadow(0 10px 24px rgba(6,182,212,0.28))",
                "drop-shadow(0 16px 40px rgba(6,182,212,0.55)) drop-shadow(0 0 18px rgba(245,158,11,0.28))",
                "drop-shadow(0 12px 28px rgba(6,182,212,0.32))",
              ],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/clean-neural-brain.png"
              alt="Clean Silicon Valley Neural AI Brain"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* Floating Context Pill Above the Brain */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: -6,
              background: "#FFFFFF",
              borderRadius: 20,
              padding: "4px 11px",
              boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
              border: "1px solid #BAE6FD",
              fontSize: 7.2,
              fontWeight: 800,
              color: "#0369A1",
              display: "flex",
              alignItems: "center",
              gap: 4,
              zIndex: 30,
            }}
          >
            <Sparkles style={{ width: 9, height: 9, color: TEAL }} />
            <span>Shared Neural Memory Matrix</span>
          </motion.div>
        </div>

        {/* ── Right Agent Card: WhatsApp Agent ── */}
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 142,
            background: "#FFFFFF",
            borderRadius: 14,
            border: "1.5px solid #BBF7D0",
            padding: "10px 11px",
            boxShadow: "0 16px 36px -6px rgba(22,163,74,0.2), 0 2px 8px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 7,
            zIndex: 20,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MessageCircle style={{ width: 13, height: 13, color: "#16A34A" }} />
            </div>
            <span style={{ background: "#DCFCE7", color: "#15803D", fontSize: 6.5, fontWeight: 800, padding: "1.5px 5px", borderRadius: 4, display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#22C55E", animation: "pulse 1.5s infinite" }} />
              ACTIVE
            </span>
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 800, color: DARK }}>WhatsApp Agent</div>
            <div style={{ fontSize: 7, color: "#64748B", marginTop: 1 }}>+91 98765 43210</div>
          </div>
          <div style={{ fontSize: 6.8, color: "#15803D", background: "#F0FDF4", padding: "3px 6px", borderRadius: 5, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
            <Sparkles style={{ width: 9, height: 9, color: "#16A34A" }} />
            <span>Full History &amp; Deals Synced</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Subtle Indicator */}
      <div style={{ fontSize: 8.5, color: "#94A3B8", fontWeight: 600, display: "flex", alignItems: "center", gap: 5, zIndex: 30 }}>
        <Sparkles style={{ width: 11, height: 11, color: TEAL }} />
        <span>Unified Synaptic Matrix · Zero Context Loss</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTENT GROUP: DASHBOARD (Beats 9–10)
   CRM dashboard → Analytics dashboard
   ═══════════════════════════════════════════════════════════════════ */
function DashboardGroupContent({ beat, phase }: { beat: number; phase: number }) {
  return (
    <div style={{ height: "100%", position: "relative" }}>
      {/* Beat 9: Merchant Live Console */}
      <motion.div
        animate={{ opacity: beat === 9 ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ position: "absolute", inset: 0, pointerEvents: beat === 9 ? "auto" : "none" }}
      >
        <CRMDashboardBeat phase={beat === 9 ? phase : -1} />
      </motion.div>

      {/* Beat 10: Enterprise CRM Database (Deep Multi-Column Table) */}
      <motion.div
        animate={{ opacity: beat === 10 ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ position: "absolute", inset: 0, pointerEvents: beat === 10 ? "auto" : "none" }}
      >
        <EnterpriseCRMDatabaseBeat phase={beat === 10 ? phase : -1} />
      </motion.div>

      {/* Beat 11: Analytics Dashboard */}
      <motion.div
        animate={{ opacity: beat === 11 ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ position: "absolute", inset: 0, pointerEvents: beat === 11 ? "auto" : "none" }}
      >
        <AnalyticsDashboardBeat phase={beat === 11 ? phase : -1} />
      </motion.div>
    </div>
  );
}

/* ── Beat 9: Merchant Live Console & Co-Pilot Takeover (6-Phase Realistic Flow) ── */
function CRMDashboardBeat({ phase }: { phase: number }) {
  const [activeTab, setActiveTab] = useState<"whatsapp" | "website">("whatsapp");
  const [selectedVisitor, setSelectedVisitor] = useState(false);
  const [humanMode, setHumanMode] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [dealClosed, setDealClosed] = useState(false);

  // Local precision cursor inside the console container (percentage-based)
  const [cursor, setCursor] = useState<{ x: number; y: number; clicking: boolean; visible: boolean }>({
    x: 35,
    y: 24,
    clicking: false,
    visible: true,
  });

  useEffect(() => {
    if (phase === 0) {
      setActiveTab("whatsapp");
      setSelectedVisitor(false);
      setHumanMode(false);
      setMessageSent(false);
      setDealClosed(false);
      setCursor({ x: 35, y: 24, clicking: false, visible: true });
    } else if (phase === 1) {
      // Step 1: Cursor moves squarely onto [Website] toggle button
      setCursor({ x: 84.5, y: 6.5, clicking: false, visible: true });
      const t1 = setTimeout(() => {
        setCursor({ x: 84.5, y: 6.5, clicking: true, visible: true });
      }, 650);
      const t2 = setTimeout(() => {
        // AFTER tap: Tab switches to Website!
        setActiveTab("website");
        setCursor({ x: 84.5, y: 6.5, clicking: false, visible: true });
      }, 750);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else if (phase === 2) {
      // Step 2: Cursor moves squarely onto Visitor #4c1a card
      setActiveTab("website");
      setCursor({ x: 35, y: 24, clicking: false, visible: true });
      const t1 = setTimeout(() => {
        setCursor({ x: 35, y: 24, clicking: true, visible: true });
      }, 600);
      const t2 = setTimeout(() => {
        // AFTER tap: Visitor chat opens on the right!
        setSelectedVisitor(true);
        setCursor({ x: 35, y: 24, clicking: false, visible: true });
      }, 700);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else if (phase === 3) {
      // Step 3: Cursor moves squarely onto [AI Mode 🟢] pill in chat toolbar
      setActiveTab("website");
      setSelectedVisitor(true);
      setCursor({ x: 89.5, y: 19, clicking: false, visible: true });
      const t1 = setTimeout(() => {
        setCursor({ x: 89.5, y: 19, clicking: true, visible: true });
      }, 600);
      const t2 = setTimeout(() => {
        // AFTER tap: switches to Human Mode ⚡!
        setHumanMode(true);
        setCursor({ x: 89.5, y: 19, clicking: false, visible: true });
      }, 700);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else if (phase === 4) {
      // Step 4: Cursor moves to input box, types live, moves to Send and clicks!
      setActiveTab("website");
      setSelectedVisitor(true);
      setHumanMode(true);
      setCursor({ x: 65, y: 89, clicking: false, visible: true });
      const t1 = setTimeout(() => {
        // Move squarely onto [Send ➔] button
        setCursor({ x: 92.5, y: 89, clicking: false, visible: true });
      }, 1900);
      const t2 = setTimeout(() => {
        // Click [Send ➔] button
        setCursor({ x: 92.5, y: 89, clicking: true, visible: true });
      }, 2350);
      const t3 = setTimeout(() => {
        // AFTER tap: Message pops into the chat!
        setMessageSent(true);
        setCursor({ x: 92.5, y: 89, clicking: false, visible: true });
      }, 2450);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    } else if (phase === 5) {
      // Step 5: Customer response & deal closed
      setActiveTab("website");
      setSelectedVisitor(true);
      setHumanMode(true);
      setMessageSent(true);
      setCursor({ x: 92.5, y: 89, clicking: false, visible: false }); // cursor hides
      const t1 = setTimeout(() => {
        setDealClosed(true);
      }, 350);
      return () => clearTimeout(t1);
    }
  }, [phase]);

  const isWhatsApp = activeTab === "whatsapp";
  const isWebsite = activeTab === "website";
  const isSelectedVisitor = selectedVisitor;
  const isHumanMode = humanMode;
  const isMessageSent = messageSent;
  const isDealClosed = dealClosed;

  const typedMerchantReply = useTypingText("Hey! I can offer an extra 2% discount if you complete checkout now.", phase === 4, 22);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 490,
        padding: "16px 20px 14px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "radial-gradient(ellipse at 50% 10%, rgba(3, 150, 166, 0.05) 0%, #FFFFFF 70%)",
        position: "relative",
      }}
    >
      {/* ── 1. Signature Kinetic Typography Header (Matches all beats) ── */}
      <div style={{ textAlign: "center", marginBottom: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <AnimatePresence mode="wait">
          {phase === 0 ? (
            <motion.div
              key="crm-p0"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ MULTI-CHANNEL INBOX · REAL-TIME SESSIONS" variant="success" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "Every" },
                  { text: "WhatsApp" },
                  { text: "Lead.", breakAfter: true },
                  { text: "Live", highlight: true },
                  { text: "In", highlight: true },
                  { text: "One", highlight: true },
                  { text: "Stream.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Track live customer intent, order sizes, and autonomous AI handling on auto-pilot." />
            </motion.div>
          ) : phase === 1 ? (
            <motion.div
              key="crm-p1"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ 1-CLICK CHANNEL SWITCHING" variant="teal" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "Switch" },
                  { text: "Channels" },
                  { text: "Instantly.", breakAfter: true },
                  { text: "Zero", highlight: true },
                  { text: "Tab", highlight: true },
                  { text: "Juggling.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Toggle between WhatsApp and Website in one click — all chats flow in one place." />
            </motion.div>
          ) : phase === 2 ? (
            <motion.div
              key="crm-p2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ LIVE CONVERSATION CONSOLE" variant="cyan" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "Inspect" },
                  { text: "Live" },
                  { text: "Sessions.", breakAfter: true },
                  { text: "Real-Time", highlight: true },
                  { text: "Cart", highlight: true },
                  { text: "Value.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Click into any store visitor to see queries, cart status, and buyer readiness." />
            </motion.div>
          ) : phase === 3 ? (
            <motion.div
              key="crm-p3"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ INSTANT HUMAN TAKEOVER" variant="amber" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "Step" },
                  { text: "In" },
                  { text: "Anytime.", breakAfter: true },
                  { text: "Activate", highlight: true },
                  { text: "Human", highlight: true },
                  { text: "Mode.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Switch from AI autopilot to Human Mode with one click whenever you want full control." />
            </motion.div>
          ) : phase === 4 ? (
            <motion.div
              key="crm-p4"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ LIVE MERCHANT CO-PILOT" variant="amber" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "Send" },
                  { text: "Custom" },
                  { text: "Deals.", breakAfter: true },
                  { text: "Close", highlight: true },
                  { text: "High-Ticket", highlight: true },
                  { text: "Buyers.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Type and dispatch exclusive discount offers directly into the live visitor chat." />
            </motion.div>
          ) : (
            <motion.div
              key="crm-p5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ DEAL CLOSED · INSTANT CONVERSION" variant="success" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "Conversation" },
                  { text: "Converted.", breakAfter: true },
                  { text: "Revenue", highlight: true },
                  { text: "Locked", highlight: true },
                  { text: "In.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Customer accepts the offer, order is placed, and CRM updates autonomously." />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 2. Main Console Box (Houses local precision cursor) ── */}
      <div
        style={{
          flex: 1,
          background: "#FFFFFF",
          borderRadius: 14,
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          display: "grid",
          gridTemplateColumns: "115px 1fr",
          overflow: "hidden",
          minHeight: 285,
          position: "relative",
        }}
      >
        {/* Local Precision-Synced Cursor */}
        <SimCursor {...cursor} />

        {/* ── Left Console Sidebar ── */}
        <aside style={{ borderRight: "1px solid #F1F5F9", background: "#F8FAFC", padding: "10px 8px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: DARK, display: "flex", alignItems: "center", gap: 5 }}>
              <FrostyIcon size={14} glow={0.4} />
              <span>Frosty</span>
            </div>
            <div style={{ marginTop: 8, padding: "4px 6px", background: "#FFFFFF", borderRadius: 6, border: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: 6, fontWeight: 800, color: "#94A3B8", letterSpacing: "0.06em" }}>WORKSPACE</div>
              <div style={{ fontSize: 8, fontWeight: 700, color: DARK, marginTop: 1 }}>Your Store</div>
            </div>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 2 }}>
              {DX_NAV.slice(0, 5).map(([ic, label], i) => (
                <span
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 7.8,
                    fontWeight: i === 1 ? 800 : 500,
                    padding: "3.5px 5px",
                    borderRadius: 5,
                    color: i === 1 ? TEAL : "#64748B",
                    background: i === 1 ? "#F0FDFA" : "transparent",
                    border: i === 1 ? "1px solid #CCFBF1" : "1px solid transparent",
                  }}
                >
                  <DxIcon n={ic} size={11} />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "3.5px 5px", background: "#FFFFFF", borderRadius: 5, border: "1px solid #E2E8F0" }}>
            <i style={{ width: 13, height: 13, borderRadius: "50%", background: "#E2E8F0", fontSize: 6.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontStyle: "normal", flexShrink: 0 }}>YT</i>
            <b style={{ fontSize: 7, color: DARK }}>Your team</b>
          </div>
        </aside>

        {/* ── Main Workspace Body ── */}
        <div style={{ padding: "9px 11px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F8FAFC", overflow: "hidden" }}>
          {/* Channel Header Bar with Toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4.5px 8px", background: "#FFFFFF", borderRadius: 7, border: "1px solid #E2E8F0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 8.8, fontWeight: 800, color: DARK }}>
                {isWhatsApp ? "WhatsApp Console" : "Website Console"}
              </span>
              <span style={{ fontSize: 6.5, background: isWhatsApp ? "#DCFCE7" : "#E0F2FE", color: isWhatsApp ? "#15803D" : "#0369A1", padding: "1px 4px", borderRadius: 4, fontWeight: 700 }}>
                {isWhatsApp ? "4 LIVE" : "6 LIVE"}
              </span>
            </div>

            {/* Interactive Channel Toggle */}
            <div style={{ display: "flex", background: "#F1F5F9", padding: 2, borderRadius: 6, gap: 2 }}>
              <motion.span
                animate={{
                  background: isWebsite ? "#0284C7" : "transparent",
                  color: isWebsite ? "#FFFFFF" : "#64748B",
                  boxShadow: isWebsite ? "0 2px 5px rgba(2,132,199,0.25)" : "none",
                }}
                transition={{ duration: 0.25 }}
                style={{ fontSize: 7, fontWeight: 700, padding: "2px 6px", borderRadius: 4, display: "flex", alignItems: "center", gap: 3 }}
              >
                <Globe style={{ width: 8, height: 8 }} />
                Website
              </motion.span>
              <motion.span
                animate={{
                  background: isWhatsApp ? "#16A34A" : "transparent",
                  color: isWhatsApp ? "#FFFFFF" : "#64748B",
                  boxShadow: isWhatsApp ? "0 2px 5px rgba(22,163,74,0.25)" : "none",
                }}
                transition={{ duration: 0.25 }}
                style={{ fontSize: 7, fontWeight: 700, padding: "2px 6px", borderRadius: 4, display: "flex", alignItems: "center", gap: 3 }}
              >
                <MessageCircle style={{ width: 8, height: 8 }} />
                WhatsApp
              </motion.span>
            </div>
          </div>

          {/* Split Sessions List & Live Chat */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 8, marginTop: 6, flex: 1, minHeight: 180 }}>
            {/* Left Sessions Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, overflow: "hidden" }}>
              <AnimatePresence mode="wait">
                {isWhatsApp ? (
                  <motion.div
                    key="wp-sessions-list"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: "flex", flexDirection: "column", gap: 3.5 }}
                  >
                    {/* WhatsApp Thread: Arjun Mehta (Active) */}
                    <div style={{ background: "#FFFFFF", padding: "5px 7px", borderRadius: 7, border: "1.5px solid #BBF7D0", boxShadow: "0 2px 5px rgba(22,163,74,0.06)", display: "flex", gap: 5, alignItems: "center" }}>
                      <div style={{ width: 19, height: 19, borderRadius: "50%", background: "#DCFCE7", color: "#16A34A", fontSize: 7.2, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>AM</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 7.8, fontWeight: 800, color: DARK }}>Arjun Mehta</span>
                          <span style={{ fontSize: 6, color: "#94A3B8" }}>03:42 PM</span>
                        </div>
                        <div style={{ fontSize: 6.5, color: "#15803D", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          🔥 92% Intent · Bulk 50 units
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Thread: Rohan Verma */}
                    <div style={{ background: "#FFFFFF", padding: "5px 7px", borderRadius: 7, border: "1px solid #E2E8F0", display: "flex", gap: 5, alignItems: "center", opacity: 0.85 }}>
                      <div style={{ width: 19, height: 19, borderRadius: "50%", background: "#F1F5F9", color: "#64748B", fontSize: 7.2, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>RV</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 7.8, fontWeight: 700, color: DARK }}>Rohan Verma</span>
                          <span style={{ fontSize: 6, color: "#94A3B8" }}>02:15 PM</span>
                        </div>
                        <div style={{ fontSize: 6.5, color: "#64748B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Payment Link Sent · ₹14,999</div>
                      </div>
                    </div>

                    {/* WhatsApp Thread: Pooja Sharma */}
                    <div style={{ background: "#FFFFFF", padding: "5px 7px", borderRadius: 7, border: "1px solid #E2E8F0", display: "flex", gap: 5, alignItems: "center", opacity: 0.75 }}>
                      <div style={{ width: 19, height: 19, borderRadius: "50%", background: "#F1F5F9", color: "#64748B", fontSize: 7.2, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>PS</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 7.8, fontWeight: 700, color: DARK }}>Pooja Sharma</span>
                          <span style={{ fontSize: 6, color: "#94A3B8" }}>01:05 PM</span>
                        </div>
                        <div style={{ fontSize: 6.5, color: "#64748B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Catalog Shared · 3 items</div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="web-sessions-list"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: "flex", flexDirection: "column", gap: 3.5 }}
                  >
                    {/* Website Thread 1: Visitor #4c1a (Selected & Active) */}
                    <motion.div
                      animate={{
                        borderColor: isSelectedVisitor ? "#0284C7" : "#E2E8F0",
                        background: isSelectedVisitor ? "#F0F9FF" : "#FFFFFF",
                        boxShadow: isSelectedVisitor ? "0 2px 8px rgba(2,132,199,0.14)" : "none",
                      }}
                      style={{ padding: "5px 7px", borderRadius: 7, border: "1.5px solid", display: "flex", gap: 5, alignItems: "center" }}
                    >
                      <div style={{ width: 19, height: 19, borderRadius: "50%", background: isSelectedVisitor ? "#BAE6FD" : "#E0F2FE", color: "#0284C7", fontSize: 7.2, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>4C</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 7.8, fontWeight: 800, color: DARK }}>Visitor #4c1a</span>
                          <span style={{ fontSize: 6, color: "#0284C7", fontWeight: 700 }}>Active Now</span>
                        </div>
                        <div style={{ fontSize: 6.5, color: "#0369A1", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          🛒 Cart ₹34,900 · Checkout
                        </div>
                      </div>
                    </motion.div>

                    {/* Website Thread 2: Visitor #9be3 */}
                    <div style={{ background: "#FFFFFF", padding: "5px 7px", borderRadius: 7, border: "1px solid #E2E8F0", display: "flex", gap: 5, alignItems: "center", opacity: 0.85 }}>
                      <div style={{ width: 19, height: 19, borderRadius: "50%", background: "#F1F5F9", color: "#64748B", fontSize: 7.2, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>9B</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 7.8, fontWeight: 700, color: DARK }}>Visitor #9be3</span>
                          <span style={{ fontSize: 6, color: "#94A3B8" }}>03:10 PM</span>
                        </div>
                        <div style={{ fontSize: 6.5, color: "#64748B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Enterprise SLA Inquiry</div>
                      </div>
                    </div>

                    {/* Website Thread 3: Visitor #2dd8 */}
                    <div style={{ background: "#FFFFFF", padding: "5px 7px", borderRadius: 7, border: "1px solid #E2E8F0", display: "flex", gap: 5, alignItems: "center", opacity: 0.75 }}>
                      <div style={{ width: 19, height: 19, borderRadius: "50%", background: "#F1F5F9", color: "#64748B", fontSize: 7.2, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>2D</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 7.8, fontWeight: 700, color: DARK }}>Visitor #2dd8</span>
                          <span style={{ fontSize: 6, color: "#94A3B8" }}>02:40 PM</span>
                        </div>
                        <div style={{ fontSize: 6.5, color: "#64748B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Can I speak to someone?</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Live Chat & Co-Pilot Panel */}
            <div style={{ background: "#FFFFFF", borderRadius: 8, border: "1px solid #E2E8F0", padding: "6px 8px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {/* Top Toolbar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", paddingBottom: 4, marginBottom: 4 }}>
                <div style={{ display: "flex", gap: 3 }}>
                  <span style={{ fontSize: 6.2, fontWeight: 700, background: "#F1F5F9", color: "#475569", padding: "1.5px 4px", borderRadius: 3 }}>Lead</span>
                  <span style={{ fontSize: 6.2, fontWeight: 700, background: isWhatsApp || isSelectedVisitor ? "#F0FDFA" : "#F8FAFC", color: isWhatsApp || isSelectedVisitor ? TEAL : "#94A3B8", padding: "1.5px 4px", borderRadius: 3 }}>
                    {isWhatsApp ? "92% Intent" : isSelectedVisitor ? "Cart ₹34.9k" : "Select Session"}
                  </span>
                </div>

                {/* Mode Pill Toggle */}
                <motion.span
                  animate={{
                    background: isHumanMode ? "#FEF3C7" : isSelectedVisitor || isWhatsApp ? "#F0FDF4" : "#F8FAFC",
                    color: isHumanMode ? "#B45309" : isSelectedVisitor || isWhatsApp ? "#16A34A" : "#94A3B8",
                    borderColor: isHumanMode ? "#F59E0B" : isSelectedVisitor || isWhatsApp ? "#BBF7D0" : "#E2E8F0",
                  }}
                  style={{ fontSize: 6.5, fontWeight: 800, padding: "1.5px 5px", borderRadius: 10, border: "1px solid", display: "flex", alignItems: "center", gap: 3 }}
                >
                  <span style={{ width: 3.5, height: 3.5, borderRadius: "50%", background: isHumanMode ? "#F59E0B" : isSelectedVisitor || isWhatsApp ? "#22C55E" : "#CBD5E1" }} />
                  {isHumanMode ? "Human Takeover ⚡" : isSelectedVisitor || isWhatsApp ? "AI Mode 🟢" : "Standby ⚪"}
                </motion.span>
              </div>

              {/* Live Messages Feed */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3.5, overflow: "hidden", flex: 1 }}>
                {isWhatsApp ? (
                  /* WhatsApp Arjun Thread */
                  <>
                    <div style={{ alignSelf: "flex-end", maxWidth: "90%", background: "#1E293B", color: "#FFFFFF", fontSize: 7, padding: "3px 6px", borderRadius: "6px 6px 2px 6px" }}>
                      Need bulk quote for 50 units Sony WH-1000XM5 to Bangalore office
                    </div>
                    <div style={{ alignSelf: "flex-start", maxWidth: "90%", background: "#F0FDF4", color: "#166534", border: "1px solid #BBF7D0", fontSize: 7, padding: "3px 6px", borderRadius: "6px 6px 6px 2px" }}>
                      Calculated 14% tier: ₹21,500/unit (Total ₹10,75,000). Meeting link ready for finalizing delivery.
                    </div>
                    <div style={{ alignSelf: "flex-end", maxWidth: "90%", background: "#1E293B", color: "#FFFFFF", fontSize: 7, padding: "3px 6px", borderRadius: "6px 6px 2px 6px" }}>
                      Great, let&apos;s connect on today&apos;s call.
                    </div>
                  </>
                ) : !isSelectedVisitor ? (
                  /* Empty State: Session Not Selected Yet */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 5, color: "#94A3B8", textAlign: "center", padding: "12px 6px" }}
                  >
                    <div style={{ width: 26, height: 26, borderRadius: 7, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
                      <Globe style={{ width: 13, height: 13 }} />
                    </div>
                    <div style={{ fontSize: 7.5, fontWeight: 700, color: "#475569" }}>Select Visitor Session</div>
                    <div style={{ fontSize: 6.2, color: "#94A3B8", maxWidth: 140, lineHeight: 1.3 }}>Click any visitor on the left to inspect conversation & cart</div>
                  </motion.div>
                ) : (
                  /* Website Visitor #4c1a Thread (Opens on click!) */
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "flex", flexDirection: "column", gap: 3.5, flex: 1 }}
                  >
                    <div style={{ alignSelf: "flex-end", maxWidth: "90%", background: "#1E293B", color: "#FFFFFF", fontSize: 7, padding: "3px 6px", borderRadius: "6px 6px 2px 6px" }}>
                      Do you offer same-day delivery to Pune?
                    </div>
                    <div style={{ alignSelf: "flex-start", maxWidth: "90%", background: "#F0F9FF", color: "#0369A1", border: "1px solid #BAE6FD", fontSize: 7, padding: "3px 6px", borderRadius: "6px 6px 6px 2px" }}>
                      Yes! Orders placed before 4 PM ship same-day via Express courier.
                    </div>
                    <div style={{ alignSelf: "flex-end", maxWidth: "90%", background: "#1E293B", color: "#FFFFFF", fontSize: 7, padding: "3px 6px", borderRadius: "6px 6px 2px 6px" }}>
                      Awesome, will order 2 pairs if you have any discount code?
                    </div>

                    {/* Merchant Human Reply (Appears in Phase 4 & 5) */}
                    {isMessageSent && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          alignSelf: "flex-start",
                          maxWidth: "92%",
                          background: "#FEF3C7",
                          color: "#78350F",
                          border: "1px solid #FCD34D",
                          fontSize: 7,
                          padding: "3px 6px",
                          borderRadius: "6px 6px 6px 2px",
                        }}
                      >
                        <div style={{ fontSize: 5.5, fontWeight: 800, color: "#B45309", marginBottom: 1 }}>
                          👨‍💼 Sent by Merchant (Human)
                        </div>
                        <div>Hey! I can offer an extra 2% discount if you complete checkout now.</div>
                      </motion.div>
                    )}

                    {/* Customer Live Response (Appears in Phase 5) */}
                    {isDealClosed && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2 }}
                        style={{
                          alignSelf: "flex-end",
                          maxWidth: "90%",
                          background: "#16A34A",
                          color: "#FFFFFF",
                          fontSize: 7,
                          padding: "3px 6px",
                          borderRadius: "6px 6px 2px 6px",
                          boxShadow: "0 2px 6px rgba(22,163,74,0.25)",
                        }}
                      >
                        <div>Done! Placing order right now, thanks! 🎉</div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Bottom Reply Bar / Conversion Bar */}
              <div style={{ marginTop: 4, paddingTop: 3, borderTop: "1px solid #F1F5F9" }}>
                {isDealClosed ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ fontSize: 6.5, color: "#15803D", fontWeight: 800, background: "#DCFCE7", padding: "2px 5px", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}
                  >
                    <span>✓ Order #8491 Confirmed · ₹68,400</span>
                    <span style={{ fontSize: 5.8, color: "#166534" }}>Auto-Synced to CRM</span>
                  </motion.div>
                ) : isHumanMode ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 3, background: "#F8FAFC", padding: "2px 4px", borderRadius: 4, border: "1px solid #CBD5E1" }}>
                    <div style={{ flex: 1, fontSize: 6.5, color: DARK, fontWeight: 600, minHeight: 10 }}>
                      {typedMerchantReply || <span style={{ color: "#94A3B8" }}>Type reply as merchant...</span>}
                      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ borderRight: "1.5px solid #0284C7", marginLeft: 1 }} />
                    </div>
                    <span style={{ fontSize: 6.2, fontWeight: 800, background: TEAL, color: "#FFFFFF", padding: "1px 4.5px", borderRadius: 3 }}>
                      Send ➔
                    </span>
                  </div>
                ) : isSelectedVisitor || isWhatsApp ? (
                  <div style={{ fontSize: 6.2, color: "#94A3B8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span>Frosty AI handling session...</span>
                    <span style={{ fontSize: 6, color: TEAL, fontWeight: 700 }}>Switch to Human ➔</span>
                  </div>
                ) : (
                  <div style={{ fontSize: 6.2, color: "#94A3B8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span>No session selected</span>
                    <span style={{ fontSize: 6, color: "#94A3B8" }}>Select a chat ➔</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Beat 10: Autonomous Enterprise CRM Database & Multi-Column Deep Pipeline ── */
const CRM_DATABASE_ROWS = [
  {
    id: "lead-1",
    avatar: "AM",
    avatarBg: "#DCFCE7",
    avatarFg: "#16A34A",
    name: "Arjun Mehta",
    company: "VP Procurement · Apex Retail Corp",
    channel: "WhatsApp",
    channelType: "whatsapp",
    intent: "92%",
    intentLabel: "HOT",
    intentColor: "#DC2626",
    intentBg: "#FEF2F2",
    dealValue: "₹10,75,000",
    dealDetail: "50 units Sony WH-1000XM5",
    summary: "Calculated 14% bulk tier. Google Meet scheduled for final contract.",
    email: "arjun.mehta@apexretail.in",
    emailVerified: true,
    phone: "+91 98201 44819",
    meeting: "📅 Google Meet 🔗",
    stage: "Deal Won 🏆",
    stageColor: "#15803D",
    stageBg: "#DCFCE7",
    followup: "✓ Auto-Sent (WhatsApp)",
    lastActive: "Just now",
  },
  {
    id: "lead-2",
    avatar: "4C",
    avatarBg: "#E0F2FE",
    avatarFg: "#0284C7",
    name: "Visitor #4c1a (Neha Sharma)",
    company: "Studio Owner · Pune Design Labs",
    channel: "Website",
    channelType: "website",
    intent: "88%",
    intentLabel: "READY TO BUY",
    intentColor: "#0284C7",
    intentBg: "#F0F9FF",
    dealValue: "₹68,400",
    dealDetail: "2x Studio Pro Wireless",
    summary: "Inquired Pune express shipping. Offered 2% checkout incentive. Paid via Razorpay UPI.",
    email: "neha.sharma@punestudio.com",
    emailVerified: true,
    phone: "+91 98765 43210",
    meeting: "✓ Instant Razorpay Receipt",
    stage: "Deal Won 🏆",
    stageColor: "#15803D",
    stageBg: "#DCFCE7",
    followup: "✓ Receipt Synced",
    lastActive: "2m ago",
  },
  {
    id: "lead-3",
    avatar: "RV",
    avatarBg: "#FEF3C7",
    avatarFg: "#D97706",
    name: "Rohan Verma",
    company: "Founder · TechNova Labs",
    channel: "WhatsApp",
    channelType: "whatsapp",
    intent: "84%",
    intentLabel: "WARM",
    intentColor: "#D97706",
    intentBg: "#FEF3C7",
    dealValue: "₹14,999",
    dealDetail: "1x Quick Creator Kit",
    summary: "Confirmed warranty & delivery window. Payment link generated.",
    email: "rohan@technovalabs.io",
    emailVerified: false,
    phone: "+91 99887 76655",
    meeting: "💳 Payment Link Sent",
    stage: "In Negotiation 💬",
    stageColor: "#B45309",
    stageBg: "#FEF3C7",
    followup: "⏳ Scheduled 24h",
    lastActive: "14m ago",
  },
  {
    id: "lead-4",
    avatar: "VS",
    avatarBg: "#F3E8FF",
    avatarFg: "#7E22CE",
    name: "Vikram Singhal",
    company: "Director · Singhal Logistics",
    channel: "Website",
    channelType: "website",
    intent: "96%",
    intentLabel: "ENTERPRISE",
    intentColor: "#7E22CE",
    intentBg: "#F3E8FF",
    dealValue: "₹4,50,000",
    dealDetail: "Custom Fleet SLA (20 seats)",
    summary: "Requested enterprise SLA contract & GST invoice for fleet onboarding.",
    email: "v.singhal@singhallogistics.com",
    emailVerified: true,
    phone: "+91 98112 33445",
    meeting: "📅 Tomorrow 11:00 AM · Zoom 🔗",
    stage: "Contract Sent 📄",
    stageColor: "#0369A1",
    stageBg: "#E0F2FE",
    followup: "✓ Follow-Up Queued",
    lastActive: "1h ago",
  },
  {
    id: "lead-5",
    avatar: "PS",
    avatarBg: "#F1F5F9",
    avatarFg: "#64748B",
    name: "Pooja Sharma",
    company: "Founder · Luxe Crafts Studio",
    channel: "WhatsApp",
    channelType: "whatsapp",
    intent: "76%",
    intentLabel: "INQUIRY",
    intentColor: "#475569",
    intentBg: "#F1F5F9",
    dealValue: "₹28,500",
    dealDetail: "Wholesale Sample Pack (3 items)",
    summary: "Digital catalog shared. Selected 3 items for sample delivery evaluation.",
    email: "pooja@luxecrafts.in",
    emailVerified: false,
    phone: "+91 97654 11223",
    meeting: "📦 Sample Tracking Synced",
    stage: "Proposal Sent 📑",
    stageColor: "#64748B",
    stageBg: "#F1F5F9",
    followup: "✓ Auto-Delivered",
    lastActive: "3h ago",
  },
];

function EnterpriseCRMDatabaseBeat({ phase }: { phase: number }) {
  const tableRef = useRef<HTMLDivElement>(null);
  const sched = useMemo(() => getDynamicSchedule(), []);

  const dynamicCrmRows = useMemo(() => {
    return CRM_DATABASE_ROWS.map((r) => {
      if (r.id === "lead-1") {
        return {
          ...r,
          meeting: sched.selectedSlot.crmMeetingTag,
          summary: sched.selectedSlot.crmSummary,
        };
      }
      return r;
    });
  }, [sched]);

  // Smooth horizontal scroll position according to phase
  useEffect(() => {
    if (!tableRef.current) return;
    if (phase === 0) {
      tableRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else if (phase === 1) {
      tableRef.current.scrollTo({ left: 240, behavior: "smooth" });
    } else if (phase === 2) {
      tableRef.current.scrollTo({ left: 480, behavior: "smooth" });
    } else if (phase === 3) {
      tableRef.current.scrollTo({ left: 160, behavior: "smooth" });
    }
  }, [phase]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 490,
        padding: "16px 20px 14px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "radial-gradient(ellipse at 50% 10%, rgba(3, 150, 166, 0.05) 0%, #FFFFFF 70%)",
        position: "relative",
      }}
    >
      {/* ── 1. Signature Kinetic Typography Header ── */}
      <div style={{ textAlign: "center", marginBottom: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <AnimatePresence mode="wait">
          {phase === 0 ? (
            <motion.div
              key="ecrm-p0"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ 100% AUTONOMOUS CRM · REAL-TIME ENRICHMENT" variant="success" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "Every" },
                  { text: "Lead" },
                  { text: "Parameter.", breakAfter: true },
                  { text: "Captured", highlight: true },
                  { text: "Without", highlight: true },
                  { text: "Data", highlight: true },
                  { text: "Entry.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Frosty structures transcripts, contact info, buying intent, and deal sizes in real time." />
            </motion.div>
          ) : phase === 1 ? (
            <motion.div
              key="ecrm-p1"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ AI LEAD SCORING & INTENT SEGREGATION" variant="amber" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "High-Value" },
                  { text: "Buyers" },
                  { text: "Scored.", breakAfter: true },
                  { text: "Zero", highlight: true },
                  { text: "Pipeline", highlight: true },
                  { text: "Drop-Offs.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Hot B2B negotiations are automatically tagged, scored at 92%+, and prioritized for rapid close." />
            </motion.div>
          ) : phase === 2 ? (
            <motion.div
              key="ecrm-p2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ ACTIONABLE WORKFLOWS & AUTO FOLLOW-UPS" variant="teal" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "Google" },
                  { text: "Meet" },
                  { text: "Synced.", breakAfter: true },
                  { text: "Follow-Ups", highlight: true },
                  { text: "Sent", highlight: true },
                  { text: "Autonomously.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Meeting slots, payment links, and WhatsApp reminders are scheduled and tracked on auto-pilot." />
            </motion.div>
          ) : (
            <motion.div
              key="ecrm-p3"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ 2-WAY ECOSYSTEM AUTO-SYNC" variant="cyan" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "HubSpot," },
                  { text: "Shopify" },
                  { text: "&", highlight: true },
                  { text: "Salesforce.", highlight: true, breakAfter: true },
                  { text: "Live", highlight: true },
                  { text: "Synced", highlight: true },
                  { text: "In", highlight: true },
                  { text: "0.2s.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="100% structured data flows seamlessly across your tech stack with zero manual exports." />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 2. Enterprise CRM Big Data Console ── */}
      <div
        style={{
          flex: 1,
          background: "#FFFFFF",
          borderRadius: 12,
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minHeight: 285,
        }}
      >
        {/* Top Control Bar */}
        <div
          style={{
            padding: "8px 12px",
            borderBottom: "1px solid #F1F5F9",
            background: "#F8FAFC",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FrostyIcon size={14} glow={0.4} />
            <span style={{ fontSize: 9.5, fontWeight: 800, color: DARK }}>Enterprise CRM Database</span>
            <span style={{ fontSize: 6.8, fontWeight: 700, background: "#DCFCE7", color: "#15803D", padding: "1.5px 5px", borderRadius: 4 }}>
              🟢 96 LEADS AUTO-SYNCED
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 7, fontWeight: 700, background: "#0284C7", color: "#FFFFFF", padding: "2px 6px", borderRadius: 4 }}>
              All (96)
            </span>
            <span style={{ fontSize: 7, fontWeight: 600, background: "#FFFFFF", color: "#64748B", border: "1px solid #E2E8F0", padding: "2px 6px", borderRadius: 4 }}>
              🔥 Hot Leads (28)
            </span>
            <span style={{ fontSize: 7, fontWeight: 600, background: "#FFFFFF", color: "#64748B", border: "1px solid #E2E8F0", padding: "2px 6px", borderRadius: 4 }}>
              💬 WhatsApp (54)
            </span>
            <span style={{ fontSize: 7, fontWeight: 600, background: "#FFFFFF", color: "#64748B", border: "1px solid #E2E8F0", padding: "2px 6px", borderRadius: 4 }}>
              🌐 Web Store (42)
            </span>
            <span style={{ fontSize: 7, fontWeight: 700, background: "#F0FDFA", color: TEAL, border: "1px solid #CCFBF1", padding: "2px 6px", borderRadius: 4, display: "flex", alignItems: "center", gap: 3 }}>
              ⚡ Auto-Enrich ON
            </span>
          </div>
        </div>

        {/* Scrollable Horizontal Data Table */}
        <div
          ref={tableRef}
          style={{
            flex: 1,
            overflowX: "auto",
            overflowY: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ minWidth: 960, display: "flex", flexDirection: "column" }}>
            {/* Table Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "170px 85px 85px 95px 230px 140px 105px 125px 95px 100px 70px",
                background: "#F8FAFC",
                borderBottom: "1px solid #E2E8F0",
                padding: "5px 10px",
                fontSize: 6.8,
                fontWeight: 800,
                color: "#64748B",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              <div>Contact / Account</div>
              <div>Source</div>
              <div>Intent Score</div>
              <div>Deal Value</div>
              <div>AI Chat Summary</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Meeting / Action</div>
              <div>Stage</div>
              <div>Follow-Up</div>
              <div>Active</div>
            </div>

            {/* Table Rows */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {CRM_DATABASE_ROWS.map((row, idx) => {
                const isHighlightPhase = phase === 3;
                return (
                  <motion.div
                    key={row.id}
                    animate={{
                      background: isHighlightPhase && idx < 2 ? "rgba(240, 253, 244, 0.7)" : idx % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
                      borderColor: isHighlightPhase && idx < 2 ? "#86EFAC" : "#F1F5F9",
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "170px 85px 85px 95px 230px 140px 105px 125px 95px 100px 70px",
                      padding: "6px 10px",
                      borderBottom: "1px solid #F1F5F9",
                      alignItems: "center",
                      fontSize: 7.2,
                    }}
                  >
                    {/* Contact & Company */}
                    <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0, paddingRight: 6 }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: row.avatarBg,
                          color: row.avatarFg,
                          fontSize: 7.5,
                          fontWeight: 800,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {row.avatar}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 800, color: DARK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {row.name}
                        </div>
                        <div style={{ fontSize: 6, color: "#94A3B8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {row.company}
                        </div>
                      </div>
                    </div>

                    {/* Source */}
                    <div>
                      <span
                        style={{
                          fontSize: 6.2,
                          fontWeight: 700,
                          padding: "1.5px 4.5px",
                          borderRadius: 4,
                          background: row.channelType === "whatsapp" ? "#DCFCE7" : "#E0F2FE",
                          color: row.channelType === "whatsapp" ? "#15803D" : "#0284C7",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 2.5,
                        }}
                      >
                        {row.channelType === "whatsapp" ? "💬 WhatsApp" : "🌐 Website"}
                      </span>
                    </div>

                    {/* Intent Score */}
                    <div>
                      <span
                        style={{
                          fontSize: 6.2,
                          fontWeight: 800,
                          padding: "1.5px 5px",
                          borderRadius: 10,
                          background: row.intentBg,
                          color: row.intentColor,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        {row.intent} {row.intentLabel}
                      </span>
                    </div>

                    {/* Deal Value */}
                    <div>
                      <div style={{ fontWeight: 800, color: TEAL, fontSize: 7.6 }}>{row.dealValue}</div>
                      <div style={{ fontSize: 5.8, color: "#94A3B8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.dealDetail}</div>
                    </div>

                    {/* AI Chat Summary */}
                    <div style={{ paddingRight: 8 }}>
                      <div
                        style={{
                          fontSize: 6.5,
                          color: "#334155",
                          background: "#F8FAFC",
                          padding: "2.5px 5px",
                          borderRadius: 4,
                          border: "1px solid #E2E8F0",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={row.summary}
                      >
                        ✨ {row.summary}
                      </div>
                    </div>

                    {/* Email */}
                    <div style={{ fontSize: 6.5, color: "#475569", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "flex", alignItems: "center", gap: 3 }}>
                      <span>{row.email}</span>
                      {row.emailVerified && <span style={{ color: "#16A34A", fontSize: 6.5, fontWeight: 800 }}>✓</span>}
                    </div>

                    {/* Phone */}
                    <div style={{ fontSize: 6.5, color: "#64748B", fontFamily: "monospace" }}>
                      {row.phone}
                    </div>

                    {/* Meeting / Action */}
                    <div>
                      <span
                        style={{
                          fontSize: 6.2,
                          fontWeight: 700,
                          padding: "1.5px 4.5px",
                          borderRadius: 4,
                          background: "#F0FDF4",
                          color: "#166534",
                          border: "1px solid #BBF7D0",
                          display: "inline-block",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.meeting}
                      </span>
                    </div>

                    {/* Pipeline Stage */}
                    <div>
                      <span
                        style={{
                          fontSize: 6.2,
                          fontWeight: 800,
                          padding: "1.5px 5px",
                          borderRadius: 4,
                          background: row.stageBg,
                          color: row.stageColor,
                          display: "inline-block",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.stage}
                      </span>
                    </div>

                    {/* Auto Follow-Up */}
                    <div style={{ fontSize: 6.2, color: "#0369A1", fontWeight: 700, whiteSpace: "nowrap" }}>
                      {row.followup}
                    </div>

                    {/* Last Active */}
                    <div style={{ fontSize: 6, color: "#94A3B8" }}>
                      {row.lastActive}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Status Footer */}
        <div
          style={{
            padding: "5px 12px",
            borderTop: "1px solid #F1F5F9",
            background: "#FAFAFA",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 6.5,
            color: "#64748B",
          }}
        >
          <div>
            Showing 5 of 96 total leads · <b style={{ color: DARK }}>Auto-categorized by Frosty Neural Engine</b>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#22C55E" }} />
            <b style={{ color: TEAL }}>Live 2-Way Sync: HubSpot · Shopify · Salesforce · Notion · Stripe</b>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Beat 11: Real-Time Performance Analytics & ROI Radar (Fully Interactive) ── */
function AnalyticsDashboardBeat({ phase }: { phase: number }) {
  const [timeRange, setTimeRange] = useState<"30d" | "7d">("30d");
  const [hoveredPeak, setHoveredPeak] = useState(false);
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);

  // Local precision cursor inside analytics console
  const [cursor, setCursor] = useState<{ x: number; y: number; clicking: boolean; visible: boolean }>({
    x: 50,
    y: 50,
    clicking: false,
    visible: false,
  });

  const C = 2 * Math.PI * 32;
  const total = DX_TOPICS.reduce((s, t) => s + (t[1] as number), 0);
  let acc = 0;

  // Multi-phase state machine with cursor interaction
  useEffect(() => {
    if (phase === 0) {
      // Phase 0: Fresh load, 30d view, numbers surge in
      setTimeRange("30d");
      setHoveredPeak(false);
      setHoveredTopic(null);
      setCursor({ x: 50, y: 50, clicking: false, visible: false });
    } else if (phase === 1) {
      // Phase 1: Cursor glides to [7d] filter, clicks, then glides to [30d] and clicks!
      setCursor({ x: 74, y: 8, clicking: false, visible: true });
      const t1 = setTimeout(() => {
        setCursor({ x: 74, y: 8, clicking: true, visible: true }); // Click 7d
      }, 550);
      const t2 = setTimeout(() => {
        setTimeRange("7d");
        setCursor({ x: 74, y: 8, clicking: false, visible: true });
      }, 650);
      const t3 = setTimeout(() => {
        setCursor({ x: 84.5, y: 8, clicking: false, visible: true }); // Move to 30d
      }, 1400);
      const t4 = setTimeout(() => {
        setCursor({ x: 84.5, y: 8, clicking: true, visible: true }); // Click 30d
      }, 1950);
      const t5 = setTimeout(() => {
        setTimeRange("30d");
        setCursor({ x: 84.5, y: 8, clicking: false, visible: true });
      }, 2050);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    } else if (phase === 2) {
      // Phase 2: Cursor hovers directly on graph peak point (Tuesday 7 PM)
      setTimeRange("30d");
      setHoveredTopic(null);
      setCursor({ x: 56, y: 46, clicking: false, visible: true });
      const t1 = setTimeout(() => {
        setHoveredPeak(true); // Tooltip opens!
      }, 500);
      return () => clearTimeout(t1);
    } else if (phase === 3) {
      // Phase 3: Cursor hovers directly on the Donut Chart's Pricing segment
      setTimeRange("30d");
      setHoveredPeak(false);
      setCursor({ x: 82, y: 52, clicking: false, visible: true });
      const t1 = setTimeout(() => {
        setHoveredTopic("Pricing"); // Slice highlights & expands!
      }, 500);
      return () => clearTimeout(t1);
    }
  }, [phase]);

  // Current stats depending on active filter
  const currentStats = timeRange === "30d" ? DX_STATS : [
    ["CONVERSATIONS", "54", "sessions"],
    ["MESSAGES", "360", "exchanged"],
    ["LEADS", "24", "captured"],
    ["CONVERSION", "42%", "lead rate"],
    ["AVG/SESSION", "6.6", "messages"],
    ["PEAK HOUR", "7pm", "Tue busiest"],
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 490,
        padding: "16px 20px 14px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "radial-gradient(ellipse at 50% 10%, rgba(3, 150, 166, 0.05) 0%, #FFFFFF 70%)",
        position: "relative",
      }}
    >
      {/* ── 1. Signature Kinetic Typography Header ── */}
      <div style={{ textAlign: "center", marginBottom: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <AnimatePresence mode="wait">
          {phase === 0 ? (
            <motion.div
              key="ana-p0"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ REAL-TIME ROI & PERFORMANCE RADAR" variant="cyan" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "Every" },
                  { text: "Metric." },
                  { text: "Ticking", breakAfter: true, highlight: true },
                  { text: "Up", highlight: true },
                  { text: "On", highlight: true },
                  { text: "Auto-Pilot.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Live visibility into message velocity, top query topics, and lead conversion rates." />
            </motion.div>
          ) : phase === 1 ? (
            <motion.div
              key="ana-p1"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ 45% LEAD CONVERSION ACCELERATION" variant="success" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "214" },
                  { text: "Live" },
                  { text: "Sessions.", breakAfter: true },
                  { text: "1,480", highlight: true },
                  { text: "Chats", highlight: true },
                  { text: "Resolved.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Frosty autonomously qualifies 96 high-intent leads and converts browsers into buyers." />
            </motion.div>
          ) : phase === 2 ? (
            <motion.div
              key="ana-p2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ PREDICTIVE TOPIC DEMAND RADAR" variant="teal" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "Instant" },
                  { text: "Topic" },
                  { text: "Intelligence.", breakAfter: true },
                  { text: "Pricing,", highlight: true },
                  { text: "SLA", highlight: true },
                  { text: "&", highlight: true },
                  { text: "Delivery.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="AI categorizes customer intent in real-time, giving you predictive inventory signals." />
            </motion.div>
          ) : (
            <motion.div
              key="ana-p3"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ 24/7 CONTINUOUS INTELLIGENCE" variant="amber" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(19px, 2.3vw, 24px)"
                delay={0.12}
                words={[
                  { text: "Zero" },
                  { text: "Downtime." },
                  { text: "Scale", breakAfter: true, highlight: true },
                  { text: "To", highlight: true },
                  { text: "100k+", highlight: true },
                  { text: "Conversations.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Your autonomous sales team never sleeps — driving revenue around the clock." />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 2. Performance Analytics Console ── */}
      <div
        style={{
          flex: 1,
          background: "#FFFFFF",
          borderRadius: 12,
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          display: "grid",
          gridTemplateColumns: "115px 1fr",
          overflow: "hidden",
          minHeight: 285,
          position: "relative",
        }}
      >
        {/* Local Precision Cursor */}
        <SimCursor {...cursor} />

        {/* Left Sidebar */}
        <aside style={{ borderRight: "1px solid #F1F5F9", background: "#F8FAFC", padding: "10px 8px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: DARK, display: "flex", alignItems: "center", gap: 5 }}>
              <FrostyIcon size={14} glow={0.4} />
              <span>Frosty</span>
            </div>
            <div style={{ marginTop: 8, padding: "4px 6px", background: "#FFFFFF", borderRadius: 6, border: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: 6, fontWeight: 800, color: "#94A3B8", letterSpacing: "0.06em" }}>WORKSPACE</div>
              <div style={{ fontSize: 8, fontWeight: 700, color: DARK, marginTop: 1 }}>Your Website</div>
            </div>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 2 }}>
              {DX_NAV.map(([ic, label], i) => (
                <span
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 7.8,
                    fontWeight: i === 3 ? 800 : 500,
                    padding: "3.5px 5px",
                    borderRadius: 5,
                    color: i === 3 ? TEAL : "#64748B",
                    background: i === 3 ? "#F0FDFA" : "transparent",
                    border: i === 3 ? "1px solid #CCFBF1" : "1px solid transparent",
                  }}
                >
                  <DxIcon n={ic} size={11} />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 4px", borderRadius: 5, background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#E2E8F0", color: "#64748B", fontSize: 6.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>YT</div>
            <span style={{ fontSize: 7, fontWeight: 700, color: DARK }}>Your team</span>
          </div>
        </aside>

        {/* Main Analytics Workspace */}
        <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
          <div>
            {/* Top Toolbar with Interactive Filters */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: DARK }}>Performance</div>
                <div style={{ fontSize: 6.8, color: "#94A3B8" }}>Insights and metrics for your workspace.</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ display: "flex", background: "#F1F5F9", padding: "1.5px", borderRadius: 5, fontSize: 6.8, fontWeight: 700 }}>
                  <motion.span
                    animate={{
                      background: timeRange === "7d" ? TEAL : "transparent",
                      color: timeRange === "7d" ? "#FFFFFF" : "#64748B",
                    }}
                    style={{ padding: "1.5px 5.5px", borderRadius: 3.5 }}
                  >
                    7d
                  </motion.span>
                  <span style={{ padding: "1.5px 4.5px", color: "#64748B" }}>14d</span>
                  <motion.span
                    animate={{
                      background: timeRange === "30d" ? TEAL : "transparent",
                      color: timeRange === "30d" ? "#FFFFFF" : "#64748B",
                    }}
                    style={{ padding: "1.5px 5.5px", borderRadius: 3.5 }}
                  >
                    30d
                  </motion.span>
                  <span style={{ padding: "1.5px 4.5px", color: "#64748B" }}>90d</span>
                </div>
                <span style={{ fontSize: 6.8, fontWeight: 800, background: TEAL, color: "#FFFFFF", padding: "2.5px 6.5px", borderRadius: 4 }}>
                  Export
                </span>
              </div>
            </div>

            {/* Metrics Tickers Bar (Morphs on tab toggle) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4, marginBottom: 8 }}>
              {currentStats.map(([label, val, sub], i) => (
                <motion.div
                  key={label}
                  animate={{ scale: [0.96, 1], y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: i === 3 ? "#F0FDFA" : "#F8FAFC",
                    border: i === 3 ? "1px solid #CCFBF1" : "1px solid #F1F5F9",
                    padding: "4px 5px",
                    borderRadius: 6,
                  }}
                >
                  <div style={{ fontSize: 5.5, fontWeight: 800, color: "#94A3B8", letterSpacing: "0.04em" }}>{label}</div>
                  <motion.div
                    key={val}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: 11.5, fontWeight: 800, color: i === 3 ? TEAL : DARK, marginTop: 1 }}
                  >
                    {val}
                  </motion.div>
                  <div style={{ fontSize: 5.8, color: i === 3 ? "#0D9488" : "#64748B", fontWeight: 600 }}>{sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row (Two Columns) */}
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 8 }}>
              {/* Left Chart: Conversations & Messages Wave */}
              <div style={{ background: "#F8FAFC", borderRadius: 7, border: "1px solid #E2E8F0", padding: "6px 8px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 7.2, fontWeight: 800, color: DARK }}>Conversations & messages</span>
                  <span style={{ fontSize: 5.8, fontWeight: 700, background: "#DCFCE7", color: "#15803D", padding: "1px 4px", borderRadius: 3 }}>
                    {timeRange === "30d" ? "+38% vs last month" : "+12% this week"}
                  </span>
                </div>

                <div style={{ position: "relative", width: "100%", height: 68 }}>
                  {/* Floating Inspection Tooltip on Peak Hover */}
                  <AnimatePresence>
                    {hoveredPeak && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: "absolute",
                          right: 8,
                          top: 0,
                          background: "#0F172A",
                          color: "#FFFFFF",
                          padding: "4px 7px",
                          borderRadius: 6,
                          boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                          fontSize: 6.2,
                          zIndex: 20,
                          pointerEvents: "none",
                        }}
                      >
                        <div style={{ fontWeight: 800, color: "#38BDF8", marginBottom: 1 }}>📍 Tuesday 7:00 PM (Peak)</div>
                        <div style={{ color: "#E2E8F0" }}>💬 312 Messages · 48 Sessions</div>
                        <div style={{ color: "#4ADE80", fontWeight: 700, marginTop: 1 }}>⚡ 89% AI Auto-Resolved</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <svg viewBox="0 0 320 85" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                    <defs>
                      <linearGradient id="anaTealGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={TEAL} stopOpacity="0.28" />
                        <stop offset="100%" stopColor={TEAL} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="18" x2="320" y2="18" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                    <line x1="0" y1="42" x2="320" y2="42" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                    <line x1="0" y1="66" x2="320" y2="66" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />

                    {/* Gradient Area under Messages */}
                    <motion.path
                      key={`area-${timeRange}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      d={timeRange === "30d"
                        ? "M0,66 C42,42 72,22 112,28 C152,35 190,52 232,42 C262,35 292,20 320,16 L320,85 L0,85 Z"
                        : "M0,72 C42,55 72,40 112,48 C152,56 190,62 232,54 C262,48 292,38 320,32 L320,85 L0,85 Z"
                      }
                      fill="url(#anaTealGrad)"
                    />

                    {/* Messages Wave Line */}
                    <motion.path
                      key={`wave1-${timeRange}`}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.1, ease: "easeOut" }}
                      d={timeRange === "30d"
                        ? "M0,66 C42,42 72,22 112,28 C152,35 190,52 232,42 C262,35 292,20 320,16"
                        : "M0,72 C42,55 72,40 112,48 C152,56 190,62 232,54 C262,48 292,38 320,32"
                      }
                      fill="none"
                      stroke={TEAL}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />

                    {/* Conversations Wave Line */}
                    <motion.path
                      key={`wave2-${timeRange}`}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
                      d={timeRange === "30d"
                        ? "M0,78 C52,74 92,68 132,70 C182,72 222,64 262,60 C292,57 306,53 320,50"
                        : "M0,80 C52,76 92,72 132,74 C182,75 222,70 262,68 C292,65 306,62 320,58"
                      }
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* Peak Point Pulsing Dot */}
                    <motion.circle
                      animate={{ r: hoveredPeak ? [4, 6, 4] : [3, 4.5, 3], opacity: [0.9, 1, 0.9] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      cx="320"
                      cy={timeRange === "30d" ? 16 : 32}
                      fill={TEAL}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2, fontSize: 6, color: "#64748B", fontWeight: 700 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <i style={{ width: 5, height: 5, borderRadius: "50%", background: TEAL, display: "inline-block" }} />
                      Messages ({timeRange === "30d" ? "1,480" : "360"})
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <i style={{ width: 5, height: 5, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />
                      Conversations ({timeRange === "30d" ? "214" : "54"})
                    </span>
                  </div>
                  <span style={{ color: TEAL }}>Peak: 7 PM Tue</span>
                </div>
              </div>

              {/* Right Chart: Top Topics Radar Donut */}
              <div style={{ background: "#F8FAFC", borderRadius: 7, border: "1px solid #E2E8F0", padding: "6px 8px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ fontSize: 7.2, fontWeight: 800, color: DARK }}>Top topics</span>
                  {hoveredTopic && (
                    <span style={{ fontSize: 5.8, fontWeight: 800, background: "#CCFBF1", color: TEAL, padding: "1px 4px", borderRadius: 3 }}>
                      {hoveredTopic}: 11 queries (28%)
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 66, position: "relative" }}>
                  <svg viewBox="0 0 100 100" width="66" height="66">
                    <g transform="rotate(-90 50 50)">
                      {DX_TOPICS.map(([label, v, col]) => {
                        const len = (C * (v as number)) / total;
                        const isHovered = hoveredTopic === label;
                        const node = (
                          <motion.circle
                            key={label}
                            initial={{ strokeDasharray: `0 ${C}` }}
                            animate={{
                              strokeDasharray: `${len.toFixed(2)} ${(C - len).toFixed(2)}`,
                              strokeWidth: isHovered ? 15 : 12,
                            }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            cx="50"
                            cy="50"
                            r="32"
                            fill="none"
                            stroke={col as string}
                            strokeDashoffset={-acc.toFixed(2)}
                          />
                        );
                        acc += len;
                        return node;
                      })}
                    </g>
                    <text x="50" y="47" textAnchor="middle" fontSize="13" fontFamily="Outfit, sans-serif" fill={DARK} fontWeight="800">
                      {total}
                    </text>
                    <text x="50" y="58" textAnchor="middle" fontSize="5.5" fontFamily="Outfit, sans-serif" fill="#94A3B8" fontWeight="600">
                      mentions
                    </text>
                  </svg>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 4px", fontSize: 5.8, color: "#475569", fontWeight: 700 }}>
                  {DX_TOPICS.slice(0, 4).map(([label, v, col]) => (
                    <motion.span
                      key={label}
                      animate={{
                        scale: hoveredTopic === label ? 1.05 : 1,
                        color: hoveredTopic === label ? DARK : "#475569",
                        fontWeight: hoveredTopic === label ? 800 : 700,
                      }}
                      style={{ display: "flex", alignItems: "center", gap: 3 }}
                    >
                      <i style={{ width: 4.5, height: 4.5, borderRadius: "50%", background: col as string, display: "inline-block" }} />
                      {label} {v}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Conversion Pipeline Bar */}
          <div style={{ marginTop: 6, paddingTop: 4, borderTop: "1px solid #F1F5F9", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 6.5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#22C55E" }} />
              <b style={{ color: DARK }}>Auto-Pilot ROI Status: Active</b>
            </div>
            <motion.span
              animate={{
                color: phase === 3 ? "#16A34A" : TEAL,
                scale: phase === 3 ? [1, 1.03, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
              style={{ fontWeight: 800 }}
            >
              ⚡ ₹12,85,400 Pipeline Generated · 0.2s Auto-Synced
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Beat 12: The Grand Closing Verdict & Choice ── */
function ClosingVerdictContent({ beat, phase }: { beat: number; phase: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 490,
        padding: "26px 24px 18px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        background: "radial-gradient(ellipse at 50% 30%, rgba(3, 150, 166, 0.08) 0%, #FFFFFF 75%)",
        position: "relative",
        textAlign: "center",
      }}
    >
      {/* Top Floating Frosty Emblem */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], y: [0, -3, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 2 }}
      >
        <FrostyIcon size={26} glow={1.2} />
        <span style={{ fontSize: 12, fontWeight: 800, color: DARK, letterSpacing: "-0.02em" }}>Frosty AI</span>
      </motion.div>

      {/* Kinetic Typography Central Flow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, maxWidth: 540 }}>
        <AnimatePresence mode="wait">
          {phase === 0 ? (
            <motion.div
              key="close-p0"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ THE CROSSROADS · THE CHOICE IS YOURS" variant="error" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(21px, 2.5vw, 26px)"
                delay={0.12}
                words={[
                  { text: "Stay" },
                  { text: "Trapped" },
                  { text: "In", breakAfter: true },
                  { text: "Tool", highlight: true },
                  { text: "Chaos.", highlight: true, breakAfter: true },
                  { text: "Or" },
                  { text: "Scale", highlight: true },
                  { text: "With", highlight: true },
                  { text: "Frosty.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Lost 3 AM leads, manual copy-pasting, and disconnected tools — or one unified autonomous AI." />
            </motion.div>
          ) : phase === 1 ? (
            <motion.div
              key="close-p1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ THE OLD REALITY VS. THE FROSTY WAY" variant="amber" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(21px, 2.5vw, 26px)"
                delay={0.12}
                words={[
                  { text: "1" },
                  { text: "Unified" },
                  { text: "Brain.", breakAfter: true, highlight: true },
                  { text: "Zero", highlight: true },
                  { text: "Context", highlight: true },
                  { text: "Lost.", highlight: true, breakAfter: true },
                  { text: "24/7", highlight: true },
                  { text: "Revenue.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Your entire storefront, WhatsApp, calendar, and CRM connected in real-time." />
            </motion.div>
          ) : (
            <motion.div
              key="close-p2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <KineticBadge text="✦ ZERO EFFORT · INSTANT DEPLOYMENT" variant="teal" delay={0.05} />
              <KineticWordHeadline
                fontSize="clamp(21px, 2.5vw, 26px)"
                delay={0.12}
                words={[
                  { text: "Stop" },
                  { text: "Trading" },
                  { text: "Your", breakAfter: true },
                  { text: "Time", highlight: true },
                  { text: "For", highlight: true },
                  { text: "Manual", highlight: true },
                  { text: "Chats.", highlight: true },
                ]}
              />
              <KineticDescription delay={0.25} text="Deploy Frosty in 2 minutes and turn your store into an autonomous 24/7 conversion engine." />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Side-by-Side Reality Comparison Cards (Large, Highly Readable) */}
      <div style={{ width: "100%", maxWidth: 580, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 8 }}>
        {/* The Old Way */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: "#FFF7F7",
            border: "1.5px solid #FECACA",
            borderRadius: 12,
            padding: "14px 16px",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#DC2626", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 13 }}>❌</span> The Fragmented Way
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5.5, fontSize: 8.8, color: "#7F1D1D", lineHeight: 1.35 }}>
              <div>• 5+ Disconnected Apps &amp; Tabs</div>
              <div>• Manual chat copy-paste to CRM</div>
              <div>• 0 Replies while you sleep</div>
              <div>• High cart abandonment rate</div>
            </div>
          </div>
          <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px solid #FEE2E2", fontSize: 7.2, color: "#991B1B", fontWeight: 700 }}>
            ⚠️ High merchant burnout &amp; lost deals
          </div>
        </motion.div>

        {/* The Frosty Way */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            background: "#F0FDFA",
            border: "1.5px solid #5EEAD4",
            borderRadius: 12,
            padding: "14px 16px",
            textAlign: "left",
            boxShadow: "0 10px 30px rgba(3,150,166,0.16)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: TEAL, marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 13 }}>✨</span> The Frosty Way
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5.5, fontSize: 8.8, color: "#0F766E", fontWeight: 700, lineHeight: 1.35 }}>
              <div>• 1 Autonomous Shared Brain</div>
              <div>• Instant WhatsApp &amp; Calendar Sync</div>
              <div>• 24/7 Conversions on Auto-Pilot</div>
              <div>• 45% Verified Lead Conversion</div>
            </div>
          </div>
          <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px solid #CCFBF1", fontSize: 7.2, color: "#0D9488", fontWeight: 800 }}>
            ⚡ 100% Pipeline auto-generated in real time
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA Button (Large & Prominent) */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(135deg, #0396A6 0%, #0284C7 100%)",
          color: "#FFFFFF",
          padding: "9px 22px",
          borderRadius: 9,
          fontSize: 9.8,
          fontWeight: 800,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          boxShadow: "0 8px 24px rgba(3,150,166,0.35)",
          marginTop: 6,
          cursor: "pointer",
        }}
      >
        <Sparkles style={{ width: 13, height: 13 }} />
        <span>Deploy Your Frosty Agent Now ➔</span>
      </motion.div>
    </div>
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

    /* Advance to next beat or loop */
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
  const contentKey =
    beat <= 1
      ? "browser"
      : beat === 2 || beat === 3 || beat === 5
        ? "whatsapp"
        : beat === 4 || beat === 6
          ? "meeting"
          : beat === 7
            ? "transition"
            : beat === 8
              ? "knowledge"
              : beat <= 11
                ? "dashboard"
                : "closing";
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
      {/* ── Main Canvas Frame (Everything inside) ── */}
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
          height: 490,
          outline: "none",
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
            {contentKey === "meeting" && <MeetingGroupContent beat={beat} phase={phase} />}
            {contentKey === "transition" && <MerchantChaosTransitionContent beat={beat} phase={phase} />}
            {contentKey === "knowledge" && <SharedBrainKnowledgeContent beat={beat} phase={phase} />}
            {contentKey === "dashboard" && <DashboardGroupContent beat={beat} phase={phase} />}
            {contentKey === "closing" && <ClosingVerdictContent beat={beat} phase={phase} />}
          </motion.div>
        </AnimatePresence>

        {/* SimCursor */}
        {!reducedMotion && <SimCursor {...cursor} />}

        {/* Loop fade overlay (Soft Frosty sheen, zero blue flash) */}
        <motion.div
          animate={{ opacity: looping ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.75)", zIndex: 300, pointerEvents: "none" }}
        />
      </motion.div>

      {/* Atmospheric glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "120%", height: "120%", background: "radial-gradient(ellipse at center, rgba(3,150,166,0.08) 0%, transparent 65%)", pointerEvents: "none", zIndex: -1 }} />
    </motion.div>
  );
}
