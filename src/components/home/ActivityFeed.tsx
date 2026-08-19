"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bot, User, CheckCircle2, MessageSquare, Zap, FileText, AlertCircle, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { apiRequest } from "@/lib/api";
import type { AuditPage, AuditEvent, AlertPage, MerchantAlert } from "@/lib/types";

type UnifiedActivity = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  iconType: string;
};

function formatRelativeTime(isoStr: string) {
  try {
    const d = new Date(isoStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return isoStr;
  }
}

export function ActivityFeed() {
  const [items, setItems] = useState<UnifiedActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [auditRes, alertRes] = await Promise.all([
          apiRequest<AuditPage>("/v1/audit?limit=15").catch(() => null),
          apiRequest<AlertPage>("/v1/notifications/alerts?limit=15").catch(() => null),
        ]);

        if (cancelled) return;

        const combined: UnifiedActivity[] = [];

        if (auditRes?.items) {
          for (const ev of auditRes.items) {
            combined.push({
              id: `audit-${ev.id}`,
              title: ev.action.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
              subtitle: ev.resource_type ? `${ev.resource_type}` : ev.status || "system event",
              time: formatRelativeTime(ev.created_at),
              iconType: ev.resource_type || "system",
            });
          }
        }

        if (alertRes?.items) {
          for (const al of alertRes.items) {
            combined.push({
              id: `alert-${al.id}`,
              title: al.alert_type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
              subtitle: al.status,
              time: formatRelativeTime(al.created_at),
              iconType: "alert",
            });
          }
        }

        setItems(combined);
      } catch {
        // fail silently
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "conversation": return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case "lead": return <Zap className="w-4 h-4 text-orange-400" />;
      case "meeting": return <CheckCircle2 className="w-4 h-4 text-[#9B7FD4]" />;
      case "kb":
      case "knowledge": return <FileText className="w-4 h-4 text-teal-400" />;
      case "handoff": return <User className="w-4 h-4 text-red-400" />;
      case "alert": return <AlertCircle className="w-4 h-4 text-amber-400" />;
      default: return <Shield className="w-4 h-4 text-primary" />;
    }
  };

  const totalPages = Math.ceil(items.length / pageSize) || 1;
  const currentItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#673EBE] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#673EBE]"></span>
          </span>
          System Audit & Activity Feed
        </h3>
      </div>
      
      {loading ? (
        <div className="text-xs text-muted-foreground/50 py-4">Loading activity...</div>
      ) : items.length === 0 ? (
        <div className="text-xs text-muted-foreground/40 py-6 text-center border border-dashed border-white/5 rounded-2xl">
          No activity logs recorded yet
        </div>
      ) : (
        <>
          <div className="relative pl-3 border-l border-white/5 space-y-3 min-h-[190px]">
            {currentItems.map((event) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="absolute -left-[17px] top-1.5 h-2.5 w-2.5 rounded-full border border-background bg-border/50" />
                
                <div className="flex items-start gap-3 p-3 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] hover:border-white/10">
                  <div className="shrink-0 mt-0.5">
                    {getIcon(event.iconType)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-foreground truncate">{event.title}</p>
                    <p className="text-[11px] text-muted-foreground/60 mt-0.5 truncate">{event.subtitle}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground/40 font-mono shrink-0">{event.time}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Minimal Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40 text-[11px] text-muted-foreground">
              <span className="font-medium">Page {currentPage} of {totalPages}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded-lg border border-border/40 hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded-lg border border-border/40 hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
