"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { MessageSquare, Users, Calendar, Banknote, BookOpen, Bot } from "lucide-react";
import type { AnalyticsOverview } from "@/lib/types";

type Props = {
  overview: AnalyticsOverview | null;
  recentConversationsWeek: number;
  recentConversationsToday: number;
  balance: number | null;
  usedThisPeriod: number;
  usedPct: number;
  quotaBase: number | null;
};

// ⚠️ MOCK DATA FALLBACK TOGGLE — Set to false to remove mock data in future
const ENABLE_MOCK_FALLBACK = true;

const MotionDiv = motion.div;

export function KpiGrid({ overview, recentConversationsWeek, recentConversationsToday, balance, usedThisPeriod, usedPct, quotaBase }: Props) {
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const metrics = [
    {
      id: "conversations",
      label: "CONVERSATIONS",
      value: overview ? recentConversationsWeek : (ENABLE_MOCK_FALLBACK ? 142 : 0),
      hint: overview ? `${recentConversationsToday} today` : (ENABLE_MOCK_FALLBACK ? "18 today" : "0 today"),
      icon: <MessageSquare className="w-5 h-5" />,
      iconBg: "bg-teal-500/10 text-teal-700 dark:text-teal-300",
      accentBar: "bg-[#7A5AF8]"
    },
    {
      id: "messages",
      label: "MESSAGES",
      value: overview ? (overview.conversations_open * 4) : (ENABLE_MOCK_FALLBACK ? 384 : 0),
      hint: overview ? `${overview.conversations_open} active` : (ENABLE_MOCK_FALLBACK ? "42 today" : "0 today"),
      icon: <MessageSquare className="w-5 h-5" />,
      iconBg: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
      accentBar: "bg-[#e0a14a]"
    },
    {
      id: "leads",
      label: "LEADS CAPTURED",
      value: overview?.leads_by_temperature.hot ?? (ENABLE_MOCK_FALLBACK ? 18 : 0),
      hint: overview ? `${overview.leads} in last 30d` : (ENABLE_MOCK_FALLBACK ? "88 total" : "0 total"),
      icon: <Users className="w-5 h-5" />,
      iconBg: "bg-[#673EBE]/10 text-[#673EBE] dark:text-[#DBC2E9]",
      accentBar: "bg-[#673EBE]"
    },
    {
      id: "credits",
      label: "CREDITS LEFT",
      value: balance ?? (ENABLE_MOCK_FALLBACK ? 650 : 0),
      hint: `${usedThisPeriod || (ENABLE_MOCK_FALLBACK ? 350 : 0)} used`,
      icon: <Banknote className="w-5 h-5" />,
      iconBg: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
      accentBar: "bg-[#d2603a]",
      badge: "≈ ₹0.00",
      progress: quotaBase ? usedPct : (ENABLE_MOCK_FALLBACK ? 35 : null)
    }
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
    >
      {metrics.map((m) => (
        <MotionDiv
          key={m.id}
          variants={item}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="relative overflow-hidden p-6 rounded-[28px] border border-[var(--line)] bg-card shadow-[0_12px_35px_rgba(18,38,30,0.06)] hover:shadow-[0_20px_50px_rgba(18,38,30,0.10)] transition-all duration-300 flex flex-col justify-between min-h-[150px]"
        >
          {/* Top row: Icon on left, optional badge on right */}
          <div className="flex justify-between items-center mb-6">
            <div className={`p-2.5 rounded-xl ${m.iconBg}`}>
              {m.icon}
            </div>
            {m.badge && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 font-mono">
                {m.badge}
              </span>
            )}
          </div>
          
          {/* Middle row: Big metric number */}
          <div className="mb-4">
            <h3 className="text-4xl font-bold text-foreground tracking-tight font-sans">
              {overview || m.id === "credits" ? (
                <CountUp end={m.value} duration={2} separator="," />
              ) : (
                <span className="text-muted-foreground/30">0</span>
              )}
            </h3>
          </div>

          {/* Bottom row: Label and accent bar */}
          <div className="flex flex-col gap-2 mt-auto">
            <span className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase">
              {m.label}
            </span>
            <div className="w-12 h-1 rounded-full overflow-hidden bg-black/5 dark:bg-white/10">
              <div className={`w-full h-full ${m.accentBar}`} />
            </div>
          </div>
        </MotionDiv>
      ))}
    </motion.div>
  );
}
