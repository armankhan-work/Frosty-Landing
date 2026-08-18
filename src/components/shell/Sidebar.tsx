"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, LineChart, Bot, BookOpen, Blocks, MessageCircle, Layers, Inbox,
  UsersRound, CalendarCheck, FileText, CreditCard, Users, Webhook, History, Settings, Lock,
  ChevronLeft, ChevronRight, Store, Snowflake
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/nav";
import { roleLabel } from "@/lib/permissions";
import type { Me } from "@/lib/types";

const iconMap: Record<string, any> = {
  "dashboard": LayoutDashboard,
  "insights": LineChart,
  "smart_toy": Bot,
  "menu_book": BookOpen,
  "widgets": Blocks,
  "chat": MessageCircle,
  "dynamic_feed": Layers,
  "inbox": Inbox,
  "person_search": UsersRound,
  "event_available": CalendarCheck,
  "request_quote": FileText,
  "payments": CreditCard,
  "group": Users,
  "webhook": Webhook,
  "history": History,
  "settings": Settings,
};

type Props = {
  primary: (NavItem & { locked: boolean })[];
  revenue: (NavItem & { locked: boolean })[];
  admin: (NavItem & { locked: boolean })[];
  me: Me;
  planLabel: string;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  onboardingMode?: boolean;
};

export function Sidebar({ primary, revenue, admin, me, planLabel, isCollapsed, setIsCollapsed, onboardingMode }: Props) {
  const pathname = usePathname();
  const name = me.display_name || me.email || "You";

  function isActive(href: string) {
    if (onboardingMode) {
      return href === "/onboarding";
    }
    if (href === "/home" || href === "/") {
      return pathname === "/home" || pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const renderLinks = (items: typeof primary) => {
    return items.map((item) => {
      const active = isActive(item.href);
      const Icon = iconMap[item.icon] || Store;
      
      return (
        <Link
          key={item.href}
          href={item.href}
          aria-current={active ? "page" : undefined}
          title={isCollapsed ? item.label : undefined}
          className={cn(
            "relative flex items-center gap-2.5 px-3 py-2 my-0.5 rounded-xl text-[13px] font-medium transition-all duration-200 group shrink-0",
            active
              ? "bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-fg)] font-semibold shadow-sm"
              : "text-white/75 hover:text-white hover:bg-white/10"
          )}
        >
          <div className="relative z-10 flex items-center gap-2.5 w-full">
            <Icon className={cn("w-4 h-4 shrink-0", active ? "text-[var(--sidebar-active-fg)]" : "text-white/75 group-hover:text-white")} />
            {!isCollapsed && (
              <span className="flex-1 truncate">{item.label}</span>
            )}
          </div>
        </Link>
      );
    });
  };

  return (
    <motion.aside
      data-lenis-prevent
      animate={{ width: isCollapsed ? 68 : 260 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="sticky top-0 h-screen flex-shrink-0 flex flex-col bg-[var(--sidebar-bg)] border-r border-white/10 text-white z-40 shadow-xl select-none"
      aria-label="Merchant navigation"
    >
      <div className="flex items-center gap-3 p-3.5 mb-1 shrink-0">
        <div className="w-8 h-8 rounded-full bg-white/10 text-teal-200 border border-white/15 flex items-center justify-center font-bold shrink-0 shadow-md">
          <Snowflake className="w-4 h-4 text-teal-300" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <strong className="text-sm font-bold leading-tight tracking-tight text-white">Frosty</strong>
            <p className="text-[10px] font-medium text-teal-200/75 leading-tight">Merchant workspace</p>
          </div>
        )}
      </div>

      <nav 
        data-lenis-prevent
        className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-2.5 py-1 min-h-0 no-scrollbar"
      >
        <div className="flex flex-col gap-0.5 shrink-0">
          {renderLinks(primary)}
        </div>
        
        {revenue.length > 0 && (
          <>
            <div className="h-px bg-white/10 my-2 mx-2 shrink-0" />
            <div className="flex flex-col gap-0.5 shrink-0">
              {renderLinks(revenue)}
            </div>
          </>
        )}
        
        {admin.length > 0 && (
          <>
            <div className="h-px bg-white/10 my-2 mx-2 shrink-0" />
            <div className="flex flex-col gap-0.5 shrink-0">
              {renderLinks(admin)}
            </div>
          </>
        )}
      </nav>

      <div className="mt-auto p-3 border-t border-white/10 bg-black/20 shrink-0">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex flex-col overflow-hidden pr-2">
              <span className="text-[12px] font-semibold text-white truncate w-full" title={name}>{name}</span>
              <span className="text-[9px] font-medium text-teal-200/70 uppercase tracking-wider">{roleLabel(me.role, me.is_owner)}</span>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-teal-500/20 text-[#E1CEFA] border border-teal-500/30 uppercase tracking-wider shrink-0 shadow-sm">
              {planLabel}
            </span>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]" title={`Plan: ${planLabel}`} />
          </div>
        )}
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 -right-3 w-6 h-6 bg-[var(--sidebar-bg)] border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors shadow-md z-30"
      >
        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>
    </motion.aside>
  );
}
