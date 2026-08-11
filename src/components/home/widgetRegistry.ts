"use client";

/**
 * Chart Registry — defines all customizable charts available for the analytics grid.
 */

import type { AnalyticsOverview, AnalyticsQuality, AnalyticsUsage, Wallet } from "@/lib/types";

export type WidgetSize = { w: number; h: number };
export type WidgetMinSize = { minW: number; minH: number };
export type ChartType = "area" | "bar" | "line" | "pie" | "donut" | "progress";

export type WidgetDef = {
  id: string;
  label: string;
  description: string;
  category: "conversations" | "leads" | "ai" | "billing" | "knowledge";
  defaultSize: WidgetSize;
  minSize: WidgetMinSize;
  chartTypes: ChartType[];
  defaultChartType: ChartType;
};

export const WIDGET_REGISTRY: WidgetDef[] = [
  {
    id: "conversations_volume",
    label: "Conversation Volume",
    description: "Daily conversation trend over the last 30 days",
    category: "conversations",
    defaultSize: { w: 2, h: 2 },
    minSize: { minW: 1, minH: 2 },
    chartTypes: ["area", "bar", "line"],
    defaultChartType: "area",
  },
  {
    id: "leads_temperature",
    label: "Lead Intent & Temperature",
    description: "Breakdown of Cold, Warm, and Hot leads",
    category: "leads",
    defaultSize: { w: 1, h: 2 },
    minSize: { minW: 1, minH: 2 },
    chartTypes: ["bar", "pie", "donut"],
    defaultChartType: "bar",
  },
  {
    id: "open_by_channel",
    label: "Open Conversations by Channel",
    description: "Active conversations split across Website and WhatsApp",
    category: "conversations",
    defaultSize: { w: 1, h: 2 },
    minSize: { minW: 1, minH: 2 },
    chartTypes: ["donut", "pie", "bar"],
    defaultChartType: "donut",
  },
  {
    id: "ai_grounding",
    label: "AI Knowledge Base Accuracy",
    description: "Rate of AI responses grounded in your knowledge base",
    category: "ai",
    defaultSize: { w: 1, h: 2 },
    minSize: { minW: 1, minH: 2 },
    chartTypes: ["donut", "pie"],
    defaultChartType: "donut",
  },
  {
    id: "ai_model_usage",
    label: "Token Consumption by Model",
    description: "Prompt and completion token usage per LLM model",
    category: "ai",
    defaultSize: { w: 2, h: 2 },
    minSize: { minW: 1, minH: 2 },
    chartTypes: ["bar", "pie"],
    defaultChartType: "bar",
  },
  {
    id: "credits_usage",
    label: "Billing Period Credit Usage",
    description: "Consumption of plan quota in current billing period",
    category: "billing",
    defaultSize: { w: 1, h: 2 },
    minSize: { minW: 1, minH: 2 },
    chartTypes: ["donut", "pie"],
    defaultChartType: "donut",
  },
  {
    id: "kb_gap_rate",
    label: "Knowledge Gap Frequency",
    description: "Percentage of queries hitting ungrounded knowledge gaps",
    category: "knowledge",
    defaultSize: { w: 1, h: 2 },
    minSize: { minW: 1, minH: 2 },
    chartTypes: ["donut", "pie"],
    defaultChartType: "donut",
  },
  {
    id: "kpi_conversations_7d",
    label: "Conversations (7d)",
    description: "Total conversations in the last 7 days and active count",
    category: "conversations",
    defaultSize: { w: 1, h: 1 },
    minSize: { minW: 1, minH: 1 },
    chartTypes: ["area", "bar", "line", "donut"],
    defaultChartType: "area",
  },
  {
    id: "kpi_hot_leads",
    label: "Hot Leads Metric",
    description: "Count of hot leads and total pipeline in 30 days",
    category: "leads",
    defaultSize: { w: 1, h: 1 },
    minSize: { minW: 1, minH: 1 },
    chartTypes: ["area", "bar", "line", "donut"],
    defaultChartType: "area",
  },
  {
    id: "kpi_meetings_upcoming",
    label: "Meetings Upcoming Metric",
    description: "Total upcoming meetings and confirmation status",
    category: "knowledge",
    defaultSize: { w: 1, h: 1 },
    minSize: { minW: 1, minH: 1 },
    chartTypes: ["area", "bar", "line", "donut"],
    defaultChartType: "area",
  },
  {
    id: "kpi_credits_balance",
    label: "Credits Balance Metric",
    description: "Available credit balance and period consumption",
    category: "billing",
    defaultSize: { w: 1, h: 1 },
    minSize: { minW: 1, minH: 1 },
    chartTypes: ["area", "bar", "line", "donut"],
    defaultChartType: "area",
  },
  {
    id: "kpi_kb_gaps_open",
    label: "KB Gaps Open Metric",
    description: "Open knowledge gap count against total AI runs",
    category: "knowledge",
    defaultSize: { w: 1, h: 1 },
    minSize: { minW: 1, minH: 1 },
    chartTypes: ["area", "bar", "line", "donut"],
    defaultChartType: "area",
  },
  {
    id: "kpi_agents_active",
    label: "Agents Active Metric",
    description: "Active AI agents count and queued handoffs",
    category: "ai",
    defaultSize: { w: 1, h: 1 },
    minSize: { minW: 1, minH: 1 },
    chartTypes: ["area", "bar", "line", "donut"],
    defaultChartType: "area",
  },
];

export function getWidgetDef(id: string): WidgetDef | undefined {
  return WIDGET_REGISTRY.find((w) => w.id === id);
}

export type WidgetInstance = {
  id: string;
  chartType: ChartType;
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
  showGrid?: boolean;
  smooth?: boolean;
  timeframe?: "day" | "week" | "month";
};

// Default layout structured across 3 columns
export const DEFAULT_LAYOUT: WidgetInstance[] = [
  { id: "conversations_volume", chartType: "area",     x: 0, y: 0, w: 2, h: 2, color: "emerald" },
  { id: "leads_temperature",    chartType: "bar",      x: 2, y: 0, w: 1, h: 2, color: "indigo" },
  { id: "ai_model_usage",       chartType: "bar",      x: 0, y: 2, w: 2, h: 2, color: "indigo" },
  { id: "open_by_channel",      chartType: "donut",    x: 2, y: 2, w: 1, h: 2, color: "cyan" },
  { id: "ai_grounding",         chartType: "donut",    x: 0, y: 4, w: 1, h: 2, color: "emerald" },
  { id: "credits_usage",        chartType: "donut",    x: 1, y: 4, w: 1, h: 2, color: "purple" },
  { id: "kb_gap_rate",          chartType: "donut",    x: 2, y: 4, w: 1, h: 2, color: "amber" },
];

/**
 * Clean Auto-Format packing that preserves item dimensions and sorts by visual (Y, X) position.
 */
export function autoFormatLayout(widgets: WidgetInstance[], maxCols: number = 3): WidgetInstance[] {
  const sorted = [...widgets].sort((a, b) => a.y - b.y || a.x - b.x);

  let curX = 0;
  let curY = 0;
  let curRowMaxH = 0;

  return sorted.map((w) => {
    const width = Math.min(w.w, maxCols);

    if (curX + width > maxCols) {
      curY += curRowMaxH || 2;
      curX = 0;
      curRowMaxH = 0;
    }

    const formatted: WidgetInstance = {
      ...w,
      x: curX,
      y: curY,
      w: width,
    };

    curX += width;
    curRowMaxH = Math.max(curRowMaxH, w.h);

    if (curX >= maxCols) {
      curY += curRowMaxH;
      curX = 0;
      curRowMaxH = 0;
    }

    return formatted;
  });
}

const STORAGE_KEY = "frosty_charts_layout";

export function loadLayout(): WidgetInstance[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveLayout(layout: WidgetInstance[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  } catch {
    // fail silently
  }
}
