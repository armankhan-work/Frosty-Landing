"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
  Area, AreaChart, Bar, BarChart, Line, LineChart,
  Pie, PieChart, Cell, ResponsiveContainer, Tooltip,
  CartesianGrid, XAxis, YAxis
} from "recharts";
import {
  Activity, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon,
  X, GripVertical, SlidersHorizontal, Check, Eye, Palette, ArrowLeft, ArrowRight, Trash2
} from "lucide-react";
import type { ChartType, WidgetDef, WidgetInstance } from "./widgetRegistry";
import type { AnalyticsOverview, AnalyticsQuality, AnalyticsUsage, Wallet } from "@/lib/types";

export type WidgetData = {
  overview: AnalyticsOverview | null;
  quality: AnalyticsQuality | null;
  usage: AnalyticsUsage | null;
  wallet: Wallet | null;
  quotaBase: number | null;
  usedPct: number;
  usedThisPeriod: number;
  recentConversationsWeek?: number;
  recentConversationsToday?: number;
};

type Props = {
  widgetDef: WidgetDef;
  widgetInstance: WidgetInstance;
  data: WidgetData;
  isEditMode: boolean;
  onRemove: () => void;
  onUpdateWidget: (updates: Partial<WidgetInstance>) => void;
  onResizeWidget?: (dw: number, dh: number) => void;
};

export const COLOR_PALETTES: Record<string, { hex: string; name: string; bg: string }> = {
  emerald: { hex: "#673EBE", name: "Violet", bg: "bg-teal-500" },
  indigo:  { hex: "#0396A6", name: "Indigo",  bg: "bg-slate-500" },
  amber:   { hex: "#f59e0b", name: "Amber",   bg: "bg-amber-500" },
  rose:    { hex: "#f43f5e", name: "Rose",    bg: "bg-rose-500" },
  cyan:    { hex: "#06b6d4", name: "Cyan",    bg: "bg-cyan-500" },
  purple:  { hex: "#0396A6", name: "Purple",  bg: "bg-teal-500" },
};

// ⚠️ MOCK DATA FALLBACK TOGGLE — Set to false to remove mock data in future
const ENABLE_MOCK_FALLBACK = true;

const MOCK_CONVERSATIONS_SERIES = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return {
    day: d.toISOString().split("T")[0] || "",
    conversations: Math.floor(12 + Math.sin(i * 0.4) * 8 + (i % 6) * 4 + 5),
  };
});

const MOCK_LEADS_TEMP = { cold: 42, warm: 28, hot: 18 };
const MOCK_CHANNEL_OPEN = { website: 34, whatsapp: 22 };
const MOCK_MODEL_USAGE = [
  { model: "openai/gpt-4o", calls: 120, prompt_tokens: 124000, completion_tokens: 45000 },
  { model: "anthropic/claude-3.5-sonnet", calls: 85, prompt_tokens: 88000, completion_tokens: 32000 },
  { model: "google/gemini-1.5-pro", calls: 60, prompt_tokens: 65000, completion_tokens: 21000 },
];

const PIE_COLORS = {
  hot: "#e8805e",
  warm: "#e8b76a",
  cold: "#63b6d0",
  website: "#818cf8",
  whatsapp: "#9B7FD4",
};

const TOOLTIP_STYLE = {
  backgroundColor: "rgba(10, 10, 10, 0.9)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(103,62,190,0.15)",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
};

function formatXAxis(isoStr: string) {
  const d = new Date(`${isoStr}T12:00:00Z`);
  return d.toLocaleDateString(undefined, { weekday: "short" });
}

type PieDataItem = {
  name: string;
  value: number;
  fill: string;
};

function AwwwardsPieChart({ data, centerTitle = "Total", valueUnit = "" }: { data: PieDataItem[]; centerTitle?: string; valueUnit?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const totalValue = useMemo(() => data.reduce((acc, curr) => acc + curr.value, 0), [data]);
  
  const activeItem = hoveredIndex !== null ? data[hoveredIndex] : null;
  const displayVal = activeItem ? activeItem.value : totalValue;
  const displayLabel = activeItem ? activeItem.name : centerTitle;
  const displayPct = activeItem 
    ? `${totalValue > 0 ? ((activeItem.value / totalValue) * 100).toFixed(1) : 0}%` 
    : "100%";

  return (
    <div className="flex items-center justify-between w-full h-full p-1 gap-3">
      {/* Left side: Interactive Donut Chart with Center Text */}
      <div className="relative flex-1 h-full min-h-[150px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="88%"
              paddingAngle={4}
              dataKey="value"
              animationDuration={800}
              stroke="none"
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.35}
                  style={{
                    filter: hoveredIndex === index ? `drop-shadow(0 0 8px ${entry.fill}a0)` : "none",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Hover Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-2">
          <motion.span
            key={displayLabel}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wider truncate max-w-[100px]"
          >
            {displayLabel}
          </motion.span>
          <motion.span
            key={displayVal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="text-2xl font-bold text-foreground tracking-tight my-0.5"
          >
            {displayVal}{valueUnit}
          </motion.span>
          <motion.span
            key={displayPct}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="text-[10px] font-mono text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20"
          >
            {displayPct}
          </motion.span>
        </div>
      </div>

      {/* Right side: Legend & stats breakdown */}
      <div className="flex flex-col justify-center gap-2 min-w-[130px] shrink-0">
        {data.map((item, idx) => {
          const isSelected = hoveredIndex === idx;
          const pct = totalValue > 0 ? Math.round((item.value / totalValue) * 100) : 0;
          return (
            <div
              key={item.name}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? "bg-white/10 border-white/20 shadow-md scale-[1.03]"
                  : "bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm transition-transform"
                  style={{ backgroundColor: item.fill, transform: isSelected ? "scale(1.25)" : "scale(1)" }}
                />
                <span className="text-xs font-medium text-foreground/90 truncate">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-1 pl-2 shrink-0">
                <span className="text-xs font-bold text-foreground font-mono">
                  {item.value}
                </span>
                <span className="text-[10px] text-muted-foreground/60 font-mono">
                  ({pct}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KpiSparklineCard({
  val,
  hint,
  seriesData,
  chartType,
  accentColor,
  id
}: {
  val: number;
  hint: string;
  seriesData: { day: string; val: number }[];
  chartType: string;
  accentColor: string;
  id: string;
}) {
  return (
    <div className="flex items-center justify-between h-full w-full p-1 gap-3">
      {/* Left side: Big number & hint */}
      <div className="flex flex-col justify-center shrink-0 min-w-[100px]">
        <span className="text-3xl font-bold text-foreground tracking-tight">
          <CountUp end={val} duration={1.5} />
        </span>
        <span className="text-xs text-muted-foreground/70 font-medium mt-1 truncate max-w-[120px]">
          {hint}
        </span>
      </div>

      {/* Right side: Sparkline graph */}
      <div className="flex-1 h-full min-h-[55px] max-h-[70px] relative">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={seriesData} margin={{ top: 5, right: 2, left: 2, bottom: 0 }}>
              <Bar dataKey="val" fill={accentColor} radius={[3, 3, 0, 0]} animationDuration={800} />
            </BarChart>
          ) : chartType === "line" ? (
            <LineChart data={seriesData} margin={{ top: 5, right: 2, left: 2, bottom: 0 }}>
              <Line type="monotone" dataKey="val" stroke={accentColor} strokeWidth={2} dot={false} animationDuration={800} />
            </LineChart>
          ) : chartType === "donut" ? (
            <PieChart>
              <Pie
                data={seriesData}
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="80%"
                dataKey="val"
                stroke="none"
              >
                {seriesData.map((e, idx) => (
                  <Cell key={idx} fill={idx % 2 === 0 ? accentColor : "rgba(103,62,190,0.1)"} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <AreaChart data={seriesData} margin={{ top: 5, right: 2, left: 2, bottom: 0 }}>
              <defs>
                <linearGradient id={`kpi-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accentColor} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={accentColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="val"
                stroke={accentColor}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#kpi-grad-${id})`}
                animationDuration={800}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function WidgetCard({ widgetDef, widgetInstance, data, isEditMode, onRemove, onUpdateWidget, onResizeWidget }: Props) {
  const { overview, quality, usage, usedPct, usedThisPeriod, quotaBase, recentConversationsWeek, recentConversationsToday } = data;
  const [showSettings, setShowSettings] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    if (showSettings) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSettings]);

  useEffect(() => {
    if (!showSettings) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSettings(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSettings]);

  const { id } = widgetDef;
  const chartType = widgetInstance.chartType || widgetDef.defaultChartType;
  const currentColorKey = widgetInstance.color || "emerald";
  const accentColor = COLOR_PALETTES[currentColorKey]?.hex || "#10b981";
  const showGrid = widgetInstance.showGrid ?? true;
  const smooth = widgetInstance.smooth ?? true;

  const content = useMemo(() => {
    switch (id) {
      case "conversations_volume": {
        let series = overview?.conversations_by_day || [];
        if ((!series.length || !series.some(s => s.conversations > 0)) && ENABLE_MOCK_FALLBACK) {
          series = MOCK_CONVERSATIONS_SERIES;
        }
        if (!series.length) return <EmptyState />;
        const curveType = smooth ? "monotone" : "linear";
        return (
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart data={series} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id={`cg-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={accentColor} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={accentColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(103,62,190,0.1)"/>}
                <XAxis dataKey="day" tickFormatter={formatXAxis} axisLine={false} tickLine={false} tick={{ fill: "#8A8D98", fontSize: 11 }} dy={8}/>
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8A8D98", fontSize: 11 }}/>
                <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: "#fff", fontWeight: 600 }} labelStyle={{ color: "#6B6970", fontSize: 12 }}/>
                <Area type={curveType} dataKey="conversations" stroke={accentColor} strokeWidth={2.5} fillOpacity={1} fill={`url(#cg-${id})`} animationDuration={800}/>
              </AreaChart>
            ) : chartType === "bar" ? (
              <BarChart data={series} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accentColor}/>
                    <stop offset="100%" stopColor={accentColor} stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(103,62,190,0.1)"/>}
                <XAxis dataKey="day" tickFormatter={formatXAxis} axisLine={false} tickLine={false} tick={{ fill: "#8A8D98", fontSize: 11 }} dy={8}/>
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8A8D98", fontSize: 11 }}/>
                <Tooltip cursor={{ fill: "rgba(103,62,190,0.05)" }} contentStyle={TOOLTIP_STYLE} itemStyle={{ color: "#fff", fontWeight: 600 }} labelStyle={{ color: "#6B6970", fontSize: 12 }}/>
                <Bar dataKey="conversations" fill={`url(#bg-${id})`} radius={[4, 4, 0, 0]} animationDuration={800}/>
              </BarChart>
            ) : (
              <LineChart data={series} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(103,62,190,0.1)"/>}
                <XAxis dataKey="day" tickFormatter={formatXAxis} axisLine={false} tickLine={false} tick={{ fill: "#8A8D98", fontSize: 11 }} dy={8}/>
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8A8D98", fontSize: 11 }}/>
                <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: "#fff", fontWeight: 600 }} labelStyle={{ color: "#6B6970", fontSize: 12 }}/>
                <Line type={curveType} dataKey="conversations" stroke={accentColor} strokeWidth={2.5} dot={{ fill: accentColor, r: 3, strokeWidth: 0 }} animationDuration={800}/>
              </LineChart>
            )}
          </ResponsiveContainer>
        );
      }

      case "leads_temperature": {
        let lt = overview?.leads_by_temperature;
        if ((!lt || (lt.cold + lt.warm + lt.hot === 0)) && ENABLE_MOCK_FALLBACK) {
          lt = MOCK_LEADS_TEMP;
        }
        const d = [
          { name: "Cold", value: lt?.cold ?? 0, fill: PIE_COLORS.cold },
          { name: "Warm", value: lt?.warm ?? 0, fill: PIE_COLORS.warm },
          { name: "Hot", value: lt?.hot ?? 0, fill: PIE_COLORS.hot },
        ];
        if (!d.some(x => x.value > 0)) return <EmptyState />;
        return chartType === "bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={d} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <XAxis type="number" hide/>
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B6970", fontSize: 12 }} width={45}/>
              <Tooltip cursor={{ fill: "rgba(103,62,190,0.05)" }} contentStyle={TOOLTIP_STYLE} itemStyle={{ color: "#fff", fontWeight: 600 }} formatter={(v: any) => [v, "Leads"]}/>
              <Bar dataKey="value" radius={[0, 6, 6, 0]} animationDuration={800}>{d.map((e, i) => <Cell key={i} fill={e.fill}/>)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <AwwwardsPieChart data={d} centerTitle="Total Leads" />
        );
      }

      case "open_by_channel": {
        let ch = overview?.open_by_channel;
        if ((!ch || (ch.website + ch.whatsapp === 0)) && ENABLE_MOCK_FALLBACK) {
          ch = MOCK_CHANNEL_OPEN;
        }
        const d = [
          { name: "Website", value: ch?.website ?? 0, fill: PIE_COLORS.website },
          { name: "WhatsApp", value: ch?.whatsapp ?? 0, fill: PIE_COLORS.whatsapp },
        ];
        if (!d.some(x => x.value > 0)) return <EmptyState />;
        return chartType === "bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={d} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <XAxis type="number" hide/>
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B6970", fontSize: 12 }} width={65}/>
              <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: "#fff", fontWeight: 600 }} formatter={(v: any) => [v, "Open"]}/>
              <Bar dataKey="value" radius={[0, 6, 6, 0]} animationDuration={800}>{d.map((e, i) => <Cell key={i} fill={e.fill}/>)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <AwwwardsPieChart data={d} centerTitle="Open Total" />
        );
      }

      case "ai_grounding": {
        let rate = quality ? Math.round(quality.grounded_rate * 100) : null;
        if ((rate === null || rate === 0) && ENABLE_MOCK_FALLBACK) {
          rate = 94;
        }
        if (rate === null) return <EmptyState />;
        const d = [
          { name: "Grounded", value: rate, fill: accentColor },
          { name: "Ungrounded", value: 100 - rate, fill: "rgba(103,62,190,0.1)" },
        ];
        return <AwwwardsPieChart data={d} centerTitle="Accuracy" valueUnit="%" />;
      }

      case "ai_model_usage": {
        let models = (usage?.by_model && usage.by_model.length > 0) ? usage.by_model : [];
        if ((!models.length || !models.some(m => m.prompt_tokens > 0)) && ENABLE_MOCK_FALLBACK) {
          models = MOCK_MODEL_USAGE;
        }
        if (!models.length) return <EmptyState />;
        const modelColors = ["#818cf8", "#9B7FD4", "#f59e0b", "#ef4444", "#673EBE"];
        const d = models.map((m, i) => ({
          name: m.model.split('/').pop() || m.model,
          value: m.prompt_tokens,
          fill: modelColors[i % modelColors.length] || "#818cf8"
        }));
        return chartType === "pie" ? (
          <AwwwardsPieChart data={d} centerTitle="Token Usage" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={d} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(103,62,190,0.1)"/>}
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#8A8D98", fontSize: 11 }}/>
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8A8D98", fontSize: 11 }}/>
              <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: "#fff", fontWeight: 600 }}/>
              <Bar dataKey="value" name="Prompt Tokens" fill={accentColor} radius={[4, 4, 0, 0]} animationDuration={800}/>
            </BarChart>
          </ResponsiveContainer>
        );
      }

      case "credits_usage": {
        const displayUsed = usedThisPeriod || (ENABLE_MOCK_FALLBACK ? 350 : 0);
        const displayQuota = quotaBase || (ENABLE_MOCK_FALLBACK ? 1000 : 1000);
        const displayPct = usedPct || (ENABLE_MOCK_FALLBACK ? 35 : 0);
        const remaining = Math.max(0, displayQuota - displayUsed);
        const d = [
          { name: "Credits Used", value: displayUsed, fill: displayPct > 80 ? "#ef4444" : accentColor },
          { name: "Remaining", value: remaining, fill: "rgba(103,62,190,0.1)" },
        ];
        return <AwwwardsPieChart data={d} centerTitle="Credit Usage" />;
      }

      case "kb_gap_rate": {
        let kbr = quality ? Math.round(quality.kb_gap_rate * 100) : 0;
        if ((!kbr || kbr === 0) && ENABLE_MOCK_FALLBACK) {
          kbr = 6;
        }
        const d = [
          { name: "Gap Rate", value: kbr, fill: kbr > 15 ? "#ef4444" : "#673EBE" },
          { name: "Grounded", value: 100 - kbr, fill: "rgba(103,62,190,0.1)" },
        ];
        return <AwwwardsPieChart data={d} centerTitle="Gap Rate" valueUnit="%" />;
      }

      case "kpi_conversations_7d": {
        const val = (recentConversationsWeek && recentConversationsWeek > 0) ? recentConversationsWeek : (ENABLE_MOCK_FALLBACK ? 142 : 0);
        const hint = (recentConversationsToday && recentConversationsToday > 0) ? `${recentConversationsToday} today · ${overview?.conversations_open ?? 0} open` : (ENABLE_MOCK_FALLBACK ? "18 today · 4 open" : "0 today · 0 open");
        const rawSeries = (overview?.conversations_by_day && overview.conversations_by_day.length > 0)
          ? overview.conversations_by_day.slice(-7)
          : MOCK_CONVERSATIONS_SERIES.slice(-7);
        const seriesData = rawSeries.map(s => ({ day: s.day, val: s.conversations }));

        return (
          <KpiSparklineCard
            val={val}
            hint={hint}
            seriesData={seriesData}
            chartType={chartType}
            accentColor={accentColor}
            id={id}
          />
        );
      }

      case "kpi_hot_leads": {
        const val = (overview?.leads_by_temperature?.hot && overview.leads_by_temperature.hot > 0) ? overview.leads_by_temperature.hot : (ENABLE_MOCK_FALLBACK ? 18 : 0);
        const hint = (overview?.leads && overview.leads > 0) ? `${overview.leads} in the last 30 days` : (ENABLE_MOCK_FALLBACK ? "88 in the last 30 days" : "0 in the last 30 days");
        const seriesData = [
          { day: "D1", val: 2 }, { day: "D2", val: 1 }, { day: "D3", val: 4 },
          { day: "D4", val: 3 }, { day: "D5", val: 5 }, { day: "D6", val: 2 }, { day: "D7", val: 6 }
        ];

        return (
          <KpiSparklineCard
            val={val}
            hint={hint}
            seriesData={seriesData}
            chartType={chartType}
            accentColor={accentColor}
            id={id}
          />
        );
      }

      case "kpi_meetings_upcoming": {
        const val = (overview?.meetings_upcoming && overview.meetings_upcoming > 0) ? overview.meetings_upcoming : (ENABLE_MOCK_FALLBACK ? 5 : 0);
        const hint = (overview?.meetings_pending_confirm && overview.meetings_pending_confirm > 0) ? `${overview.meetings_pending_confirm} awaiting confirm` : (ENABLE_MOCK_FALLBACK ? "2 awaiting confirm" : "0 awaiting confirm");
        const seriesData = [
          { day: "D1", val: 1 }, { day: "D2", val: 0 }, { day: "D3", val: 2 },
          { day: "D4", val: 1 }, { day: "D5", val: 3 }, { day: "D6", val: 2 }, { day: "D7", val: 4 }
        ];

        return (
          <KpiSparklineCard
            val={val}
            hint={hint}
            seriesData={seriesData}
            chartType={chartType}
            accentColor={accentColor}
            id={id}
          />
        );
      }

      case "kpi_credits_balance": {
        const val = (data.wallet && Number(data.wallet.unallocated_credits) > 0) ? Math.floor(Number(data.wallet.unallocated_credits)) : (ENABLE_MOCK_FALLBACK ? 650 : 0);
        const displayUsed = usedThisPeriod || (ENABLE_MOCK_FALLBACK ? 350 : 0);
        const hint = `${displayUsed} used this period`;
        const seriesData = [
          { day: "D1", val: 700 }, { day: "D2", val: 690 }, { day: "D3", val: 680 },
          { day: "D4", val: 670 }, { day: "D5", val: 665 }, { day: "D6", val: 655 }, { day: "D7", val: 650 }
        ];

        return (
          <KpiSparklineCard
            val={val}
            hint={hint}
            seriesData={seriesData}
            chartType={chartType}
            accentColor={accentColor}
            id={id}
          />
        );
      }

      case "kpi_kb_gaps_open": {
        const val = (overview?.kb_gaps && overview.kb_gaps > 0) ? overview.kb_gaps : (ENABLE_MOCK_FALLBACK ? 3 : 0);
        const hint = (overview?.ai_runs && overview.ai_runs > 0) ? `${overview.ai_runs} AI runs` : (ENABLE_MOCK_FALLBACK ? "142 AI runs" : "0 AI runs");
        const seriesData = [
          { day: "D1", val: 5 }, { day: "D2", val: 4 }, { day: "D3", val: 6 },
          { day: "D4", val: 3 }, { day: "D5", val: 4 }, { day: "D6", val: 2 }, { day: "D7", val: 3 }
        ];

        return (
          <KpiSparklineCard
            val={val}
            hint={hint}
            seriesData={seriesData}
            chartType={chartType}
            accentColor={accentColor}
            id={id}
          />
        );
      }

      case "kpi_agents_active": {
        const val = (overview?.agents_active && overview.agents_active > 0) ? overview.agents_active : (ENABLE_MOCK_FALLBACK ? 4 : 0);
        const hint = (overview?.handoffs && overview.handoffs > 0) ? `${overview.handoffs} handoffs queued` : (ENABLE_MOCK_FALLBACK ? "2 handoffs queued" : "0 handoffs queued");
        const seriesData = [
          { day: "D1", val: 2 }, { day: "D2", val: 3 }, { day: "D3", val: 3 },
          { day: "D4", val: 4 }, { day: "D5", val: 4 }, { day: "D6", val: 4 }, { day: "D7", val: 4 }
        ];

        return (
          <KpiSparklineCard
            val={val}
            hint={hint}
            seriesData={seriesData}
            chartType={chartType}
            accentColor={accentColor}
            id={id}
          />
        );
      }

      default:
        return <EmptyState />;
    }
  }, [id, chartType, overview, quality, usage, usedPct, usedThisPeriod, quotaBase, accentColor, showGrid, smooth, recentConversationsWeek, recentConversationsToday]);

  return (
    <div className="w-full h-full flex flex-col rounded-[28px] border border-[var(--line)] bg-card shadow-[0_12px_35px_rgba(18,38,30,0.06)] p-6 hover:shadow-[0_20px_50px_rgba(18,38,30,0.10)] transition-all duration-300 group/card relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {isEditMode && (
            <div className="drag-handle cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-foreground/60 p-0.5">
              <GripVertical className="w-4 h-4" />
            </div>
          )}
          <span className="text-sm font-semibold text-foreground truncate">{widgetDef.label}</span>
        </div>

        {/* Header Actions (Only rendered in Edit Mode) */}
        {isEditMode && (
          <div className="flex items-center gap-1.5 shrink-0 relative">
            {/* Customize Settings Button */}
            <button
              onClick={() => {
                setStep(1);
                setShowSettings(true);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all shadow-sm ${
                showSettings
                  ? "bg-primary/20 border-primary/40 text-primary"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10"
              }`}
              title="Customize Chart Settings"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>

            {/* Resize Toolbar */}
            {onResizeWidget && (
              <div className="flex items-center gap-0.5 bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-md">
                <button
                  onClick={() => onResizeWidget(1, 0)}
                  className="px-1.5 py-0.5 rounded-lg text-[10px] font-mono font-bold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
                  title="Expand Width (+1 Col)"
                >
                  +W
                </button>
                <button
                  onClick={() => onResizeWidget(-1, 0)}
                  className="px-1.5 py-0.5 rounded-lg text-[10px] font-mono font-bold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
                  title="Shrink Width (-1 Col)"
                >
                  -W
                </button>
                <div className="w-[1px] h-3 bg-white/10 mx-0.5" />
                <button
                  onClick={() => onResizeWidget(0, 1)}
                  className="px-1.5 py-0.5 rounded-lg text-[10px] font-mono font-bold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
                  title="Expand Height (+1 Row)"
                >
                  +H
                </button>
                <button
                  onClick={() => onResizeWidget(0, -1)}
                  className="px-1.5 py-0.5 rounded-lg text-[10px] font-mono font-bold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
                  title="Shrink Height (-1 Row)"
                >
                  -H
                </button>
              </div>
            )}

            {/* Remove Widget Button */}
            <button
              onClick={onRemove}
              className="p-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
              title="Remove widget from dashboard"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Chart Body */}
      <div className="flex-1 min-h-0 relative">
        {content}
      </div>

      {/* PORTAL MOUNTED MODAL (Top level z-index, body scroll lock, lenis isolated) */}
      {typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          {showSettings && (
            <div
              data-lenis-prevent
              className="fixed inset-0 z-[99999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Backdrop Click */}
              <div className="absolute inset-0" onClick={() => setShowSettings(false)} />

              <motion.div
                data-lenis-prevent
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.15 }}
                className="relative z-10 w-full max-w-xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl shadow-2xl outline-none flex flex-col text-left"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02] shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {widgetDef.label} Customization
                      </h3>
                      <p className="text-xs text-muted-foreground/70">
                        Select chart visualization style and display settings
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground">
                      ESC
                    </span>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Body Content (Scrollable Modal Inner) */}
                <div
                  data-lenis-prevent
                  className="p-5 space-y-6 overflow-y-auto flex-1 overscroll-contain scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                >
                  
                  {/* 1. SELECT CHART TYPE */}
                  <div>
                    <div className="px-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                      1. Select Chart Type
                    </div>
                    <div className="space-y-1.5">
                      {widgetDef.chartTypes.map((ct) => {
                        const isSelected = chartType === ct;
                        return (
                          <button
                            key={ct}
                            onClick={() => onUpdateWidget({ chartType: ct })}
                            className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                              isSelected
                                ? "bg-primary/10 border-primary/40 text-foreground shadow-sm"
                                : "bg-white/[0.02] border-white/5 text-muted-foreground hover:text-foreground hover:bg-white/[0.06] hover:border-white/10"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${isSelected ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>
                                {ct === "area" && <Activity className="w-4 h-4" />}
                                {ct === "bar" && <BarChart3 className="w-4 h-4" />}
                                {ct === "line" && <LineChartIcon className="w-4 h-4" />}
                                {ct === "pie" && <PieChartIcon className="w-4 h-4" />}
                                {ct === "donut" && <PieChartIcon className="w-4 h-4" />}
                                {ct === "progress" && <span className="text-xs font-bold font-mono">%</span>}
                              </div>
                              <div>
                                <div className="text-xs font-semibold capitalize text-foreground">{ct} Chart</div>
                                <div className="text-[11px] text-muted-foreground/60">
                                  {ct === "area" && "Filled gradient area line graph"}
                                  {ct === "bar" && "Vertical column bar comparison"}
                                  {ct === "line" && "Clean continuous trend line"}
                                  {ct === "pie" && "Circular proportion distribution"}
                                  {ct === "donut" && "Ring proportion distribution"}
                                  {ct === "progress" && "Gauge percentage meter"}
                                </div>
                              </div>
                            </div>

                            {isSelected && (
                              <span className="flex items-center gap-1 text-[11px] font-semibold text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                                <Check className="w-3 h-3" /> Active
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. DATA GROUPING */}
                  {(widgetDef.category === "conversations" || widgetDef.category === "leads" || widgetDef.category === "ai") && (
                    <div className="pt-2 border-t border-white/5">
                      <div className="px-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                        2. Data Grouping
                      </div>
                      <div className="grid grid-cols-3 gap-2 bg-white/[0.02] p-1.5 rounded-xl border border-white/5">
                        {["Day", "Week", "Month"].map((tf) => {
                          const isSelected = (widgetInstance.timeframe || "day") === tf.toLowerCase();
                          return (
                            <button
                              key={tf}
                              onClick={() => onUpdateWidget({ timeframe: tf.toLowerCase() as any })}
                              className={`py-2 text-xs font-medium rounded-lg transition-all text-center ${
                                isSelected
                                  ? "bg-primary/20 text-primary border border-primary/30 shadow-sm font-semibold"
                                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                              }`}
                            >
                              {tf}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 3. ACCENT COLOR PALETTE */}
                  <div className="pt-2 border-t border-white/5">
                    <div className="px-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center justify-between">
                      <span>3. Accent Color</span>
                      <span className="text-[11px] capitalize text-primary font-normal">
                        {COLOR_PALETTES[currentColorKey]?.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-white/[0.02] p-3 rounded-xl border border-white/5">
                      {Object.entries(COLOR_PALETTES).map(([key, pal]) => (
                        <button
                          key={key}
                          onClick={() => onUpdateWidget({ color: key })}
                          className={`w-8 h-8 rounded-full ${pal.bg} transition-all flex items-center justify-center ${
                            currentColorKey === key ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110 shadow-lg" : "opacity-60 hover:opacity-100"
                          }`}
                          title={pal.name}
                        >
                          {currentColorKey === key && <Check className="w-3.5 h-3.5 text-black font-bold" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. DISPLAY TOGGLES */}
                  {(chartType === "area" || chartType === "line" || chartType === "bar") && (
                    <div className="pt-2 border-t border-white/5 space-y-3">
                      <div className="px-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        4. Display Options
                      </div>
                      <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-foreground cursor-pointer hover:bg-white/[0.05] transition-colors">
                        <span>Show Gridlines</span>
                        <input
                          type="checkbox"
                          checked={showGrid}
                          onChange={(e) => onUpdateWidget({ showGrid: e.target.checked })}
                          className="rounded border-white/20 bg-white/5 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                        />
                      </label>
                      {(chartType === "area" || chartType === "line") && (
                        <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-foreground cursor-pointer hover:bg-white/[0.05] transition-colors">
                          <span>Smooth Curves</span>
                          <input
                            type="checkbox"
                            checked={smooth}
                            onChange={(e) => onUpdateWidget({ smooth: e.target.checked })}
                            className="rounded border-white/20 bg-white/5 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                          />
                        </label>
                      )}
                    </div>
                  )}

                </div>

                {/* Footer */}
                <div className="px-5 py-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-end shrink-0">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-6 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-md"
                  >
                    Done & Apply
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

function EmptyState() {
  return <div className="flex h-full items-center justify-center text-muted-foreground/40 text-xs">No real data available</div>;
}
