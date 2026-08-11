"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Search } from "lucide-react";
import { WIDGET_REGISTRY, type WidgetDef } from "./widgetRegistry";

type Props = {
  activeWidgetIds: Set<string>;
  onAdd: (widgetId: string) => void;
};

const CATEGORY_LABELS: Record<string, string> = {
  conversations: "💬 Conversations",
  leads: "🎯 Leads",
  ai: "🧠 AI & Performance",
  billing: "💳 Billing",
  meetings: "📅 Meetings",
  knowledge: "📚 Knowledge",
};

const CATEGORY_ORDER = ["conversations", "leads", "ai", "knowledge", "billing", "meetings"];

export function AddWidgetPanel({ activeWidgetIds, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const available = useMemo(() => {
    return WIDGET_REGISTRY.filter((w) => {
      if (activeWidgetIds.has(w.id)) return false;
      if (search) {
        const q = search.toLowerCase();
        return w.label.toLowerCase().includes(q) || w.description.toLowerCase().includes(q) || w.category.includes(q);
      }
      return true;
    });
  }, [activeWidgetIds, search]);

  const grouped = useMemo(() => {
    const map: Record<string, WidgetDef[]> = {};
    for (const w of available) {
      if (!map[w.category]) map[w.category] = [];
      map[w.category]!.push(w);
    }
    return map;
  }, [available]);

  if (!open) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-all"
      >
        <Plus className="w-4 h-4" />
        Add Widget
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={() => setOpen(false)}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg max-h-[80vh] flex flex-col rounded-3xl border border-white/10 bg-background/95 backdrop-blur-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="text-lg font-semibold text-foreground">Add Widget</h2>
            <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="px-6 py-3 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search widgets..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* Widget List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {available.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground/60 text-sm">
                {search ? "No widgets match your search" : "All widgets are already on your dashboard!"}
              </div>
            ) : (
              CATEGORY_ORDER.map((cat) => {
                const items = grouped[cat];
                if (!items?.length) return null;
                return (
                  <div key={cat}>
                    <h3 className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-3">
                      {CATEGORY_LABELS[cat] || cat}
                    </h3>
                    <div className="space-y-2">
                      {items.map((w) => (
                        <button
                          key={w.id}
                          onClick={() => {
                            onAdd(w.id);
                            setOpen(false);
                          }}
                          className="w-full flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all group text-left"
                        >
                          <div className="shrink-0 p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                            <Plus className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-foreground">{w.label}</div>
                            <div className="text-xs text-muted-foreground/60 mt-0.5">{w.description}</div>
                          </div>
                          <div className="text-[10px] text-muted-foreground/40 font-mono">
                            {w.chartTypes.join(" · ")}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
