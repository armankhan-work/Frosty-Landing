// @ts-nocheck
'use client';
// src/app/dashboard/knowledge/page.tsx

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useReducedMotion } from 'framer-motion';
import axios from 'axios';
import { Search, Zap, FileText, Globe, Layers, ChevronDown, CheckCircle, RefreshCcw, Link2, Trash2, Lock, Upload, Cloud, Brain, ZoomIn, ZoomOut, LocateFixed, BookOpen, RefreshCw, AlertCircle, CheckCircle2, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useAuth, DashboardShell, getToken, ConfirmModal } from '../../app/dashboard/_shared';

// ─── Types ────────────────────────────────────────────────────────────────────
type ScrapeStatus = 'queued' | 'running' | 'completed' | 'failed' | 'stopped';
interface ScraperWallet { allocated: number; remaining: number; spent: number; is_paused: boolean; }
interface ScrapeJob {
  job_id: string; url: string; status: ScrapeStatus; progress: number;
  pages_scraped: number; created_at: string; error_message?: string;
  credits?: { allocated: number; consumed: number; remaining: number; wallet_remaining: number; };
  credits_consumed?: number; stopped_reason?: string | null;
  pages_stopped_at?: number | null; wallet_paused?: boolean;
}
interface KnowledgeDoc { id: number; filename: string; category: string; upload_date: string; source_url?: string; page_type?: string; scrape_job_id?: string; }
interface GraphNode { id: string; kind: 'center' | 'url' | 'doc' | 'dot' | 'cloud'; label: string; x: number; y: number; scrapeDate: string; tokenSize: number; retrievalFrequency: number; }

// ─── Helpers ──────────────────────────────────────────────────────────────────
const API = process.env.NEXT_PUBLIC_API_URL;
function authHeaders() { return { Authorization: `Bearer ${getToken()}` }; }
function statusColor(s: ScrapeStatus) { return s === 'completed' ? 'var(--blue-accent)' : s === 'running' ? 'var(--blue-primary)' : s === 'queued' ? 'var(--text-muted)' : s === 'stopped' ? 'var(--lt-warning, #f97316)' : 'var(--lt-error, #ef4444)'; }
function statusBg(s: ScrapeStatus) { return s === 'completed' ? 'rgba(var(--blue-rgb), 0.1)' : s === 'running' ? 'rgba(var(--blue-rgb), 0.15)' : s === 'queued' ? 'rgba(var(--blue-rgb), 0.05)' : s === 'stopped' ? 'rgba(249,115,22,0.1)' : 'rgba(239,68,68,0.1)'; }
function safeDomain(url: string) { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; } }
function StatusIcon({ status }: { status: ScrapeStatus }) {
  if (status === 'completed') return <CheckCircle size={13} />;
  if (status === 'running') return <RefreshCcw size={13} />;
  if (status === 'queued') return <Clock size={13} />;
  return <AlertCircle size={13} />;
}
const getJobErrorMessage = (job: ScrapeJob) => {
  if (job.stopped_reason === 'credits_exhausted' || job.stopped_reason === 'insufficient_credits') return 'Crawl stopped — check your subscription on Billing.';
  if (job.status === 'failed') return 'Crawl failed. Please retry or contact support.';
  if (job.status === 'stopped') return `Crawl stopped after ${job.pages_stopped_at || 0} pages.`;
  return null;
};

// ─── Animated Counter Hook ────────────────────────────────────────────────────
function useAnimatedCounter(target: number, duration = 1.2) {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  useEffect(() => {
    if (prefersReducedMotion) { setCount(target); return; }
    if (target === 0) { setCount(0); return; }
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, prefersReducedMotion]);
  return count;
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ progress, status }: { progress: number; status: ScrapeStatus }) {
  return (
    <div style={{ width: '100%', height: 4, background: 'var(--input-bg)', borderRadius: 4, overflow: 'hidden', marginTop: 8 }}>
      <motion.div
        style={{ height: '100%', background: status === 'failed' ? 'var(--lt-error, #ef4444)' : 'linear-gradient(90deg, var(--blue-accent), var(--blue-primary), var(--blue-accent))', borderRadius: 4, boxShadow: status === 'running' ? '0 0 12px var(--blue-glow)' : 'none', position: 'relative', overflow: 'hidden' }}
        initial={{ width: '0%' }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {status === 'running' && (
          <motion.div
            style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
            animate={{ x: ['-100%', '300%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </motion.div>
    </div>
  );
}

// ─── Scraper Billing Note ─────────────────────────────────────────────────────
function ScraperCreditBar({ wallet }: { wallet: ScraperWallet | null }) {
  return (
    <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 14, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Outfit, sans-serif', lineHeight: 1.45 }}>
        Website scraping is included with an active Growth or Dominance subscription.
      </div>
      <a href="/dashboard/billing" style={{ fontSize: 12, color: 'var(--blue-accent)', fontFamily: 'Outfit, sans-serif', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>
        View Billing
      </a>
    </div>
  );
}

// ─── Scrape Job Card ───────────────────────────────────────────────────────────
function ScrapeJobCard({ job, onRescrape, onClear }: { job: ScrapeJob; onRescrape: (jobId: string) => void; onClear: (jobId: string, url: string) => void; }) {
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const domain = (() => { try { return new URL(job.url).hostname; } catch { return job.url; } })();
  const isStopped = job.status === 'stopped';
  const creditsStopped = isStopped && (job.stopped_reason === 'insufficient_credits' || job.stopped_reason === 'credits_exhausted');
  return (
    <motion.div
      className="glass-card"
      style={{ border: `1px solid ${job.status === 'running' ? 'var(--blue-accent)' : isStopped ? 'rgba(var(--lt-warning-rgb,249,115,22),0.4)' : 'var(--panel-border)'}`, background: job.status === 'running' ? 'var(--blue-glow)' : 'var(--panel-bg)', borderRadius: 16, marginBottom: 12, overflow: 'hidden', willChange: 'transform, opacity' }}
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8, scale: 0.98 }}
      whileHover={prefersReducedMotion ? {} : { y: -2, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {creditsStopped && (
        <div style={{ background: 'rgba(var(--lt-warning-rgb,249,115,22),0.08)', borderBottom: '1px solid rgba(var(--lt-warning-rgb,249,115,22),0.2)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--lt-warning)', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>Crawl stopped at page {job.pages_stopped_at ?? job.pages_scraped} — stopped early. {job.pages_scraped} pages indexed.</div>
          <a href="/dashboard/billing" className="magnetic-btn" style={{ fontSize: 11, fontWeight: 700, color: 'var(--lt-warning)', fontFamily: 'Outfit, sans-serif', textDecoration: 'none', whiteSpace: 'nowrap', background: 'rgba(var(--lt-warning-rgb,249,115,22),0.15)', border: '1px solid rgba(var(--lt-warning-rgb,249,115,22),0.3)', borderRadius: 8, padding: '4px 12px' }}>View Billing</a>
        </div>
      )}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-3.5 p-4 md:px-5">
        <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: statusBg(job.status), border: `1px solid ${statusColor(job.status)}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: statusColor(job.status) }}><Globe size={18} /></div>
        <div className="flex-1 min-w-0" style={{ flexBasis: 'calc(100% - 60px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 14, color: 'var(--foreground)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{domain}</span>
            <span style={{ fontSize: 10, fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: statusColor(job.status), background: statusBg(job.status), padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}><StatusIcon status={job.status} />{isStopped ? `Stopped · ${job.pages_stopped_at ?? job.pages_scraped}p` : job.status}</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Outfit, sans-serif' }}>
            {job.pages_scraped} pages crawled{job.status === 'running' && ` · ${job.progress}%`}{' · '}{new Date(job.created_at).toLocaleDateString()}
            
          </div>
          {(job.status === 'running' || job.status === 'queued') && <ProgressBar progress={job.progress} status={job.status} />}
          {job.status === 'running' && (
            <div style={{ marginTop: 6, fontSize: 11, color: '#94a3b8', fontFamily: 'Outfit, sans-serif' }}>
              Scraping included with your subscription
            </div>
          )}
          {getJobErrorMessage(job) && <div style={{ fontSize: 11, color: '#fca5a5', marginTop: 6, fontFamily: 'Outfit, sans-serif' }}>⚠ {getJobErrorMessage(job)}</div>}
        </div>
        <div className="flex w-full md:w-auto justify-end gap-2 shrink-0 mt-2 md:mt-0">
          {(job.status === 'completed' || job.status === 'stopped') && (
            <button className="magnetic-btn" onClick={() => onRescrape(job.job_id)} style={{ background: 'linear-gradient(135deg, var(--blue-primary), var(--blue-deep))', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontFamily: 'Outfit, sans-serif', fontWeight: 600, boxShadow: '0 2px 8px rgba(var(--blue-rgb),0.15)' }}><RefreshCcw size={12} /> Re-scrape</button>
          )}
          {job.status === 'failed' && (
            <button className="magnetic-btn" onClick={() => onRescrape(job.job_id)} style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'var(--lt-warning)', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontFamily: 'Outfit, sans-serif' }}><RefreshCcw size={12} /> Retry</button>
          )}
          <button className="magnetic-btn" onClick={() => onClear(job.job_id, job.url)} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'var(--lt-error, #ef4444)', display: 'flex', alignItems: 'center' }}><Trash2 size={12} /></button>
          <button className="magnetic-btn" onClick={() => setExpanded(x => !x)} style={{ background: 'var(--input-bg)', border: '1px solid var(--text-muted)', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={14} /></motion.div>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div style={{ overflow: 'hidden', borderTop: '1px solid var(--border-strong)' }} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ padding: '14px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Link2 size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--blue-accent)', fontFamily: 'Outfit, sans-serif', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.url}</a>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Outfit, sans-serif' }}>Job ID: {job.job_id}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Knowledge Graph Card ─────────────────────────────────────────────────────
function KnowledgeGraphCard({ docs, scrapeJobs, retrievalQuality, lastUpdatedText }: { docs: KnowledgeDoc[]; scrapeJobs: ScrapeJob[]; retrievalQuality: number; lastUpdatedText: string }) {
  const [zoom, setZoom] = useState(1);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [graphExpanded, setGraphExpanded] = useState(false);
  const [pulsingNodeId, setPulsingNodeId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const [showSpotlight, setShowSpotlight] = useState(false);

  const manualDocGroups = useMemo(() => {
    const groups: Record<string, { filename: string; count: number; uploadDate: string }> = {};
    docs.filter(d => !d.scrape_job_id).forEach(d => {
      const key = d.filename || `doc-${d.id}`;
      if (!groups[key]) groups[key] = { filename: key, count: 0, uploadDate: d.upload_date || '' };
      groups[key].count += 1;
      if ((d.upload_date || '') > groups[key].uploadDate) groups[key].uploadDate = d.upload_date || groups[key].uploadDate;
    });
    return Object.values(groups).slice(0, 5);
  }, [docs]);

  const completedWebsiteJobs = useMemo(() => {
    return scrapeJobs.filter(j => j.status === 'completed').slice(0, 5).map(j => {
      const chunks = docs.filter(d => d.scrape_job_id === j.job_id).length;
      const tokenSize = Math.max(900, chunks * 260 + (j.pages_scraped || 0) * 120);
      const retrievalFrequency = Math.max(1, Math.round(chunks / 2 + (j.pages_scraped || 0) / 20));
      return { id: `url-${j.job_id}`, label: safeDomain(j.url), scrapeDate: j.created_at, tokenSize, retrievalFrequency };
    });
  }, [scrapeJobs, docs]);

  const nodes = useMemo<GraphNode[]>(() => {
    const center: GraphNode = { id: 'ai-brain', kind: 'center', label: 'AI Brain', x: 50, y: 50, scrapeDate: new Date().toISOString(), tokenSize: docs.length * 240, retrievalFrequency: Math.max(1, Math.round(docs.length / 4)) };
    const LEFT = [{ x: 22, y: 35 }, { x: 18, y: 55 }, { x: 28, y: 75 }, { x: 15, y: 70 }, { x: 32, y: 82 }, { x: 28, y: 48 }, { x: 38, y: 15 }, { x: 28, y: 22 }];
    const RIGHT = [{ x: 72, y: 18 }, { x: 82, y: 35 }, { x: 88, y: 60 }, { x: 75, y: 82 }, { x: 60, y: 75 }, { x: 65, y: 50 }, { x: 92, y: 45 }, { x: 75, y: 30 }];
    const dataNodes: any[] = [];
    completedWebsiteJobs.forEach((w, idx) => { const p = LEFT[idx % LEFT.length]; dataNodes.push({ id: w.id, kind: 'url', label: w.label, x: p.x, y: p.y, scrapeDate: w.scrapeDate, tokenSize: w.tokenSize, retrievalFrequency: w.retrievalFrequency }); });
    manualDocGroups.forEach((d, idx) => { const p = RIGHT[idx % RIGHT.length]; dataNodes.push({ id: `doc-${d.filename}`, kind: 'doc', label: d.filename, x: p.x, y: p.y, scrapeDate: d.uploadDate, tokenSize: d.count * 320, retrievalFrequency: Math.max(1, Math.round(d.count / 2)) }); });
    return [center, ...dataNodes];
  }, [docs.length, completedWebsiteJobs, manualDocGroups]);

  useEffect(() => { setGraphExpanded(false); const t = setTimeout(() => setGraphExpanded(true), 30); return () => clearTimeout(t); }, [nodes]);

  useEffect(() => {
    if (prefersReducedMotion || nodes.length <= 1) return;
    const sat = nodes.filter(n => n.kind !== 'center' && n.kind !== 'dot');
    if (!sat.length) return;
    const interval = setInterval(() => { const r = sat[Math.floor(Math.random() * sat.length)]; setPulsingNodeId(r.id); setTimeout(() => setPulsingNodeId(null), 900); }, 2500);
    return () => clearInterval(interval);
  }, [nodes, prefersReducedMotion]);

  const centerNode = nodes[0];
  const hoveredNode = nodes.find(n => n.id === hoveredNodeId) || null;
  const nodeOpacity = (node: GraphNode) => { if (!hoveredNodeId) return 1; return (node.id === hoveredNodeId || node.kind === 'center') ? 1 : 0.3; };
  const lineOpacity = (node: GraphNode) => { if (!hoveredNodeId) return 0.5; return node.id === hoveredNodeId ? 1 : 0.12; };
  const clampZoom = (v: number) => Math.max(0.75, Math.min(1.45, v));
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => { if (prefersReducedMotion) return; const rect = e.currentTarget.getBoundingClientRect(); spotlightX.set(e.clientX - rect.left); spotlightY.set(e.clientY - rect.top); };
  const particles = useMemo(() => [{ x: '14%', y: '18%', size: 3, delay: 0, dur: 5 }, { x: '84%', y: '12%', size: 4, delay: 0.6, dur: 6 }, { x: '91%', y: '72%', size: 2.5, delay: 1.2, dur: 7 }, { x: '8%', y: '78%', size: 3.5, delay: 1.8, dur: 5.5 }, { x: '42%', y: '8%', size: 2, delay: 0.9, dur: 6.5 }, { x: '58%', y: '88%', size: 3, delay: 2.1, dur: 4.8 }, { x: '24%', y: '62%', size: 2.5, delay: 0.4, dur: 7.2 }, { x: '76%', y: '52%', size: 3, delay: 1.5, dur: 5.8 }], []);

  return (
    <motion.div className="glass-card" style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 16, padding: '24px', boxShadow: 'var(--neu-shadow)', marginBottom: 24, position: 'relative', overflow: 'hidden' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
      {/* Border Beam */}
      {!prefersReducedMotion && (
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, borderRadius: 16 }}>
          <motion.rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="15" ry="15" fill="none" stroke="rgba(90,115,92,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="55 9999" animate={{ strokeDashoffset: [0, -9999] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
        </svg>
      )}
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 relative z-10 gap-3">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 24, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>AI Brain</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 8px', borderRadius: 12, background: 'rgba(34,197,94,0.1)', color: '#16a34a', fontSize: 11, fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>
              <motion.div style={{ width: 5, height: 5, borderRadius: '50%', background: '#16a34a' }} animate={prefersReducedMotion ? {} : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              Live
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted-heavy)', fontFamily: 'Outfit, sans-serif' }}>Knowledge Graph / AI retrieval map</p>
        </div>
      </div>
      {/* Graph Area */}
      <div ref={containerRef} style={{ position: 'relative', height: 380, borderRadius: 16, background: 'transparent', overflow: 'hidden', zIndex: 1 }} onMouseMove={handleMouseMove} onMouseEnter={() => setShowSpotlight(true)} onMouseLeave={() => setShowSpotlight(false)}>
        {/* Aurora */}
        {!prefersReducedMotion && (
          <>
            <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 65% 55% at 28% 58%, rgba(90,115,92,0.07) 0%, transparent 100%)' }} animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.06, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 55% 65% at 72% 38%, rgba(34,197,94,0.04) 0%, transparent 100%)' }} animate={{ opacity: [0.3, 0.8, 0.3], scale: [1.06, 1, 1.06] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
          </>
        )}
        {/* Spotlight */}
        {!prefersReducedMotion && showSpotlight && (
          <motion.div style={{ position: 'absolute', pointerEvents: 'none', zIndex: 2, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(90,115,92,0.07) 0%, transparent 70%)', transform: 'translate(-50%, -50%)', x: spotlightX, y: spotlightY }} />
        )}
        {/* Ambient particles */}
        {!prefersReducedMotion && particles.map((p, i) => (
          <motion.div key={`ap-${i}`} style={{ position: 'absolute', left: p.x, top: p.y, width: p.size, height: p.size, borderRadius: '50%', background: 'rgba(90,115,92,0.35)', pointerEvents: 'none', zIndex: 1 }} animate={{ y: [0, -14, 0], opacity: [0.2, 0.55, 0.2], scale: [1, 1.4, 1] }} transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }} />
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 45%, rgba(90,115,92,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Zoom container */}
        <div style={{ position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: '50% 50%', transition: 'transform 0.2s ease' }}>
          {/* SVG lines */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            {nodes.filter(n => n.kind !== 'center').map((node, idx) => (
              <line key={`line-${node.id}`} x1={`${centerNode.x}%`} y1={`${centerNode.y}%`} x2={`${node.x}%`} y2={`${node.y}%`} stroke={hoveredNodeId === node.id ? '#5a735c' : 'rgba(0,0,0,0.1)'} strokeWidth={1} opacity={graphExpanded ? lineOpacity(node) : 0} style={{ transition: 'opacity 0.35s ease, stroke 0.35s ease', transitionDelay: graphExpanded ? '0ms' : `${60 + idx * 40}ms` }} />
            ))}
          </svg>
          {/* Data packets */}
          {graphExpanded && !prefersReducedMotion && nodes.filter(n => n.kind !== 'center').map((node, idx) => (
            <motion.div
              key={`pkt-${node.id}`}
              style={{ position: 'absolute', width: 5, height: 5, borderRadius: '50%', background: node.kind === 'url' ? '#16a34a' : '#ea580c', pointerEvents: 'none', zIndex: 5, filter: 'blur(0.5px)', willChange: 'transform' }}
              animate={{ left: [`${node.x}%`, `${centerNode.x}%`], top: [`${node.y}%`, `${centerNode.y}%`], opacity: [0, 0.75, 0.75, 0], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.2 + idx * 0.65, ease: 'easeInOut', delay: idx * 1.1 }}
            />
          ))}
          {/* Nodes */}
          {nodes.map((node, idx) => {
            const isCenter = node.kind === 'center'; const isHovered = node.id === hoveredNodeId; const isPulsing = node.id === pulsingNodeId;
            const delay = graphExpanded || isCenter ? '0ms' : `${80 + idx * 50}ms`;
            const scale = isCenter ? (graphExpanded ? 1 : 0.92) : (graphExpanded ? (isHovered ? 1.03 : 1) : 0.72);
            return (
              <div key={node.id} onMouseEnter={() => !isCenter && node.kind !== 'dot' && setHoveredNodeId(node.id)} onMouseLeave={() => !isCenter && setHoveredNodeId(null)} style={{ position: 'absolute', left: `${(!graphExpanded && !isCenter) ? centerNode.x : node.x}%`, top: `${(!graphExpanded && !isCenter) ? centerNode.y : node.y}%`, transform: `translate(-50%, -50%) scale(${scale})`, opacity: isCenter ? 1 : (graphExpanded ? nodeOpacity(node) : 0), transition: isCenter ? 'none' : 'left 0.58s cubic-bezier(0.16,1,0.3,1), top 0.58s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, transform 0.2s ease', transitionDelay: delay, cursor: isCenter ? 'default' : 'pointer', zIndex: isCenter ? 4 : 3, borderRadius: isCenter ? '50%' : undefined }}>
                {isCenter ? (
                  <motion.div style={{ position: 'relative', width: 94, height: 94 }}>
                    <motion.div style={{ width: 94, height: 94, borderRadius: '50%', background: '#3f5641', border: '4px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }} animate={prefersReducedMotion ? {} : { scale: [0.97, 1.03, 0.97], boxShadow: ['0 8px 30px rgba(63,86,65,0.3)', '0 16px 52px rgba(63,86,65,0.58)', '0 8px 30px rgba(63,86,65,0.3)'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><Brain size={42} strokeWidth={1.5} /></motion.div>
                    {!prefersReducedMotion && <motion.div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '1px solid rgba(90,115,92,0.28)', pointerEvents: 'none' }} animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.12, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />}
                  </motion.div>
                ) : node.kind === 'dot' ? (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a' }} />
                ) : (
                  <motion.div style={{ width: 38, height: 38, borderRadius: '50%', background: node.kind === 'url' ? '#f0fdf4' : node.kind === 'doc' ? '#fff7ed' : '#f8fafc', border: `1px solid ${node.kind === 'url' ? '#bbf7d0' : node.kind === 'doc' ? '#fed7aa' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: node.kind === 'url' ? '#16a34a' : node.kind === 'doc' ? '#ea580c' : '#475569', position: 'relative', willChange: 'transform, box-shadow' }} animate={prefersReducedMotion ? {} : { y: [0, -6, 0], boxShadow: isPulsing ? ['0 2px 8px rgba(0,0,0,0.04)', '0 0 0 10px rgba(90,115,92,0.1), 0 6px 18px rgba(0,0,0,0.1)', '0 2px 8px rgba(0,0,0,0.04)'] : isHovered ? '0 6px 18px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)' }} transition={{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }, boxShadow: { duration: isPulsing ? 0.9 : 0.2 } }}>
                    {node.kind === 'url' ? <Globe size={18} /> : node.kind === 'doc' ? <FileText size={18} /> : node.kind === 'cloud' ? <Cloud size={18} /> : <Lock size={18} />}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
        {/* Zoom controls */}
        <div style={{ position: 'absolute', right: 12, bottom: 12, display: 'flex', gap: 8, zIndex: 5 }}>
          <button onClick={() => setZoom(z => clampZoom(z + 0.12))} style={{ width: 30, height: 30, borderRadius: 9, border: '1px solid var(--border-strong)', background: 'var(--input-bg)', color: 'var(--text-muted-heavy)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ZoomIn size={14} /></button>
          <button onClick={() => setZoom(z => clampZoom(z - 0.12))} style={{ width: 30, height: 30, borderRadius: 9, border: '1px solid var(--border-strong)', background: 'var(--input-bg)', color: 'var(--text-muted-heavy)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ZoomOut size={14} /></button>
          <button onClick={() => setZoom(1)} style={{ width: 30, height: 30, borderRadius: 9, border: '1px solid var(--border-strong)', background: 'var(--input-bg)', color: 'var(--text-muted-heavy)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><LocateFixed size={14} /></button>
        </div>
        {/* Tooltip */}
        {hoveredNode && hoveredNode.kind !== 'center' && hoveredNode.kind !== 'dot' && (() => {
          const isLeft = hoveredNode.x < 20; const isRight = hoveredNode.x > 80; const isTop = hoveredNode.y < 35;
          const tLeft = isLeft ? `calc(${hoveredNode.x}% - 10px)` : isRight ? `calc(${hoveredNode.x}% + 10px)` : `${hoveredNode.x}%`;
          const tTop = isTop ? `calc(${hoveredNode.y}% + 26px)` : `calc(${hoveredNode.y}% - 26px)`;
          const tx = isLeft ? '0' : isRight ? '-100%' : '-50%'; const ty = isTop ? '0' : '-100%';
          return (
            <motion.div style={{ position: 'absolute', top: tTop, left: tLeft, transform: `translate(${tx}, ${ty})`, padding: '16px', borderRadius: 12, background: 'var(--panel-bg)', border: '1px solid var(--border-strong)', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', zIndex: 100, width: 220, pointerEvents: 'none' }} initial={{ opacity: 0, scale: 0.95, y: 4 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--foreground)', marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{hoveredNode.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div>Scrape Date: <span style={{ color: 'var(--foreground)' }}>{hoveredNode.scrapeDate ? new Date(hoveredNode.scrapeDate).toLocaleDateString() : 'N/A'}</span></div>
                <div>Token Size: <span style={{ color: 'var(--foreground)' }}>{hoveredNode.tokenSize.toLocaleString()}</span></div>
                <div>Retrieval Freq: <span style={{ color: 'var(--foreground)' }}>{hoveredNode.retrievalFrequency}/day</span></div>
              </div>
            </motion.div>
          );
        })()}
      </div>
      {/* Footer stats */}
      <div className="grid grid-cols-2 md:flex md:flex-row items-start md:items-center justify-center gap-6 md:gap-[100px] mt-3 pt-6 pb-4 border-t border-[var(--border-strong)] relative z-10 px-4 md:px-0">
        {[{ dot: '#86efac', val: docs.length.toLocaleString(), lbl: 'Total Chunks' }, { dot: '#f59e0b', val: `${retrievalQuality}%`, lbl: 'Retrieval Quality' }, { dot: '#86efac', val: lastUpdatedText, lbl: 'Last Uploaded' }].map(s => (
          <div key={s.lbl} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, marginTop: 8 }} />
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 24, color: 'var(--foreground)', lineHeight: 1, marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted-heavy)', fontWeight: 500, fontFamily: 'Outfit, sans-serif' }}>{s.lbl}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Animated Stat Item ────────────────────────────────────────────────────────
function AnimatedStat({ value, label, icon, bg, color, trend, trendColor, delay = 0 }: { value: number; label: string; icon: React.ReactNode; bg: string; color: string; trend: string; trendColor: string; delay?: number; }) {
  const count = useAnimatedCounter(value);
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div className="px-2 md:px-6 w-full" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}>
      <div className="flex flex-row items-center md:items-start gap-2.5 md:gap-3">
        <motion.div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }} whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 4 }} transition={{ duration: 0.2 }}>{icon}</motion.div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'var(--foreground)', lineHeight: 1, marginBottom: 4 }} className="text-2xl md:text-[28px]">{count.toLocaleString()}</div>
          <div style={{ color: 'var(--foreground)', fontWeight: 600, marginBottom: 6, lineHeight: 1.2 }} className="text-[11px] md:text-xs whitespace-normal break-words">{label}</div>
          <div style={{ color: trendColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }} className="text-[9px] md:text-[11px]"><span className="shrink-0">{trendColor === '#16a34a' && <ArrowUpRight size={10} strokeWidth={3} />}</span> <span className="overflow-hidden text-ellipsis whitespace-nowrap">{trend}</span></div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Content ─────────────────────────────────────────────────────────────
export function KnowledgeBaseContent() {
  const prefersReducedMotion = useReducedMotion();
  const [docs, setDocs] = useState<KnowledgeDoc[]>([]);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [uploadCategory, setUploadCategory] = useState('general');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [scrapeUrl, setScrapeUrl] = useState('');
  const [scrapeJobs, setScrapeJobs] = useState<ScrapeJob[]>([]);
  const [scraping, setScraping] = useState(false);
  const [forceRescrape, setForceRescrape] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'scraper'>('scraper');
  const [scraperWallet, setScraperWallet] = useState<ScraperWallet | null>(null);
  const [confirmState, setConfirmState] = useState<{ show: boolean; title: string; message: string; onConfirm: () => void; }>({ show: false, title: '', message: '', onConfirm: () => {} });
  const showConfirm = (title: string, message: string, onConfirm: () => void) => { setConfirmState({ show: true, title, message, onConfirm: () => { onConfirm(); setConfirmState(prev => ({ ...prev, show: false })); } }); };
  const [scrapedChunks, setScrapedChunks] = useState(0);

  const statsTrends = useMemo(() => {
    const now = Date.now(); const week = 7 * 24 * 60 * 60 * 1000;
    const calc = (items: KnowledgeDoc[], unique = false) => {
      const tw = new Set<string>(); const lw = new Set<string>(); let twc = 0; let lwc = 0;
      items.forEach(d => { const ms = new Date(d.upload_date).getTime(); const inTW = now - ms <= week; const inLW = now - ms > week && now - ms <= week * 2; if (unique) { if (inTW) tw.add(d.filename); else if (inLW) lw.add(d.filename); } else { if (inTW) twc++; else if (inLW) lwc++; } });
      const c1 = unique ? tw.size : twc; const c2 = unique ? lw.size : lwc;
      if (c2 === 0) return c1 > 0 ? '+100% this week' : '0% this week';
      const inc = Math.round(((c1 - c2) / c2) * 100);
      return `${inc >= 0 ? '+' : ''}${inc}% this week`;
    };
    return { total: calc(docs), scraped: calc(docs.filter(d => d.scrape_job_id)), manual: calc(docs.filter(d => !d.scrape_job_id), true) };
  }, [docs]);

  const retrievalQuality = useMemo(() => docs.length === 0 ? 0 : Math.min(99, 85 + Math.floor(docs.length / 10)), [docs]);
  const lastUpdatedText = useMemo(() => {
    if (!docs.length) return 'Never';
    const latest = new Date(Math.max(...docs.map(d => new Date(d.upload_date).getTime())));
    const diffMs = Date.now() - latest.getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Just now'; if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60); if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }, [docs]);

  const [msg, setMsg] = useState(''); const [msgType, setMsgType] = useState<'ok' | 'err'>('ok');
  const flash = (text: string, type: 'ok' | 'err' = 'ok') => { setMsg(text); setMsgType(type); setTimeout(() => setMsg(''), 4000); };

  const loadDocs = useCallback(() => { setFetching(true); axios.get(`${API}/tenant/knowledge`, { headers: authHeaders() }).then(res => { const all = res.data?.documents ?? res.data?.chunks ?? []; setDocs(all); setScrapedChunks(all.filter((d: KnowledgeDoc) => d.scrape_job_id).length); }).catch(() => setDocs([])).finally(() => setFetching(false)); }, []);
  const loadJobs = useCallback(() => { axios.get(`${API}/api/scraper/history`, { headers: authHeaders() }).then(res => setScrapeJobs(res.data?.jobs ?? [])).catch(() => {}); }, []);
  const loadScraperWallet = useCallback(() => { axios.get(`${API}/api/wallet/balance`, { headers: authHeaders() }).then(res => { const bots: any[] = res.data?.bots ?? []; const wb = bots.find((b: any) => b.bot_id === 'scraper_bot'); if (wb) setScraperWallet({ allocated: wb.allocated, remaining: wb.remaining, spent: wb.spent, is_paused: wb.is_paused }); else setScraperWallet(null); }).catch(() => {}); }, []);

  useEffect(() => { loadDocs(); loadJobs(); loadScraperWallet(); }, [loadDocs, loadJobs, loadScraperWallet]);
  useEffect(() => { const t = setInterval(loadScraperWallet, 30000); return () => clearInterval(t); }, [loadScraperWallet]);
  useEffect(() => {
    const running = scrapeJobs.filter(j => j.status === 'running' || j.status === 'queued');
    if (!running.length) return;
    const interval = setInterval(async () => {
      const updated = await Promise.all(running.map(j => axios.get(`${API}/api/scraper/status/${j.job_id}`, { headers: authHeaders() }).then(r => r.data).catch(() => j)));
      setScrapeJobs(prev => prev.map(j => { const u = updated.find(x => x.job_id === j.job_id); return u ?? j; }));
      if (updated.some(u => u.status === 'completed')) { loadDocs(); flash('Website scraped and indexed'); }
    }, 3000);
    return () => clearInterval(interval);
  }, [scrapeJobs, loadDocs]);

  const startScrape = async () => {
    if (!scrapeUrl.trim()) { flash('Enter a URL first', 'err'); return; }
    let url = scrapeUrl.trim(); if (!url.startsWith('http')) url = 'https://' + url;
    setScraping(true);
    try {
      const res = await axios.post(`${API}/api/scraper/start`,
        { url, force_rescrape: forceRescrape },
        { headers: authHeaders() }
      );
      const newJob: ScrapeJob = {
        job_id: res.data.job_id,
        url,
        status: 'queued',
        progress: 0,
        pages_scraped: 0,
        created_at: new Date().toISOString(),
      };
      setScrapeJobs(prev => [newJob, ...prev]);
      setScrapeUrl('');
      setForceRescrape(false);
      loadScraperWallet();
      flash('Crawl started — polling for progress');
    } catch (e: unknown) {
      const err = e as { response?: { status?: number, data?: { error?: string, message?: string, detail?: string } } };
      const resp = err?.response;
      const data = resp?.data;
      if (resp?.status === 402) {
        const errCode = data?.error;
        if (errCode === 'no_wallet' || errCode === 'insufficient_credits') {
          flash(`${data?.message} Redirecting to billing…`, 'err');
          setTimeout(() => window.location.href = '/dashboard/billing', 2000);
        } else if (errCode === 'bot_paused') {
          flash(`${data?.message}`, 'err');
        } else {
          flash(data?.message ?? 'Subscription required', 'err');
        }
      } else {
        const detail = data?.detail;
        flash(typeof detail === 'string' ? detail : 'Failed to start scrape', 'err');
      }
    } finally {
      setScraping(false);
    }
  };

  const handleRescrape = async (jobId: string) => {
    try {
      const res = await axios.post(`${API}/api/scraper/rescrape/${jobId}`, {}, { headers: authHeaders() });
      const newJob: ScrapeJob = {
        job_id: res.data.new_job_id,
        url: res.data.url,
        status: 'queued',
        progress: 0,
        pages_scraped: 0,
        created_at: new Date().toISOString(),
      };
      setScrapeJobs(prev => [newJob, ...prev.filter(j => j.job_id !== jobId)]);
      flash('Re-scrape queued');
    } catch { flash('Failed to re-scrape', 'err'); }
  };

  const handleClearJob = (jobId: string, _url?: string) => {
    showConfirm('Remove Crawl', 'Remove this crawl? This will cancel it and delete all associated data.', async () => {
      try {
        await axios.delete(`${API}/api/scraper/job/${jobId}`, { headers: authHeaders() });
        setScrapeJobs(prev => prev.filter(j => j.job_id !== jobId));
        loadDocs();
        flash('Crawl removed');
      } catch { flash('Failed to remove crawl', 'err'); }
    });
  };

  const ALLOWED_EXTENSIONS = ['.pdf', '.txt', '.md'];

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;

    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      flash(`Only ${ALLOWED_EXTENSIONS.join(', ')} files are allowed. Got "${fileExtension}"`, 'err');
      if (fileRef.current) fileRef.current.value = '';
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('category', uploadCategory);
      const res = await axios.post(`${API}/tenant/knowledge/upload`, fd, {
        headers: { 'Content-Type': 'multipart/form-data', ...authHeaders() }
      });
      if (res.data?.success === false) {
        flash(res.data.error || 'Upload failed on server.', 'err');
      } else {
        flash(`"${file.name}" uploaded and indexed`);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 1200);
        loadDocs();
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      const serverMsg = axiosErr?.response?.data?.error;
      flash(serverMsg || 'Upload failed. Please try again.', 'err');
    }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ''; }
  };

  const del = (id: number, filename: string) => {
    showConfirm('Delete Document', `Delete "${filename}"? This cannot be undone.`, async () => {
      setDeleting(id);
      try {
        await axios.delete(`${API}/tenant/knowledge/${encodeURIComponent(filename)}`, { headers: authHeaders() });
        flash(`"${filename}" deleted`);
        setDocs(d => d.filter(x => x.id !== id));
      } catch { flash('Delete failed', 'err'); }
      finally { setDeleting(null); }
    });
  };

  const manualDocs = docs.filter(d => !d.scrape_job_id);
  const grouped = manualDocs.reduce((acc: Record<string, KnowledgeDoc[]>, d) => { const k = d.filename ?? 'Unknown'; (acc[k] = acc[k] ?? []).push(d); return acc; }, {});
  const runningJobs = scrapeJobs.filter(j => j.status === 'running' || j.status === 'queued');
  const completedJobs = scrapeJobs.filter(j => j.status === 'completed');
  const stoppedJobs = scrapeJobs.filter(j => j.status === 'stopped');
  const failedJobs = scrapeJobs.filter(j => j.status === 'failed');

  return (
    <>
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .cat-btn { background: var(--panel-bg); border: 1px solid var(--border-strong); border-radius: 12px; padding: 14px 18px; cursor: pointer; text-align: left; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
        .cat-btn:hover { background: rgba(var(--blue-rgb),0.03); border-color: rgba(var(--blue-rgb),0.3); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(var(--blue-rgb),0.08); }
        .cat-btn.active { background: rgba(var(--blue-rgb),0.08); border-color: rgba(var(--blue-rgb),0.5); box-shadow: 0 0 20px rgba(var(--blue-rgb),0.12); transform: translateY(-2px); }
        .tab-btn { padding: 10px 24px; border-radius: 12px; border: 1px solid transparent; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); display: flex; align-items: center; gap: 8px; }
        .tab-btn.active { background: linear-gradient(135deg, var(--blue-primary), var(--blue-deep)); border-color: transparent; color: #fff; box-shadow: 0 4px 12px rgba(var(--blue-rgb),0.2); }
        .tab-btn.inactive { background: var(--panel-bg); border-color: var(--border-strong); color: var(--text-muted); }
        .tab-btn.inactive:hover { background: var(--input-bg); color: var(--text-muted-heavy); transform: translateY(-1px); }
        .scrape-input:focus { outline: none; border-color: rgba(var(--blue-rgb),0.6) !important; box-shadow: 0 0 0 4px rgba(var(--blue-rgb),0.15) !important; }
        .glass-card { transition: box-shadow 0.3s cubic-bezier(0.16,1,0.3,1); }
        .setting-chip { transition: all 0.2s ease; cursor: default; }
        .setting-chip:hover { transform: translateY(-1px); background: rgba(var(--blue-rgb),0.05) !important; border-color: rgba(var(--blue-rgb),0.3) !important; }
      `}</style>
      <div style={{ maxWidth: 1100, display: 'flex', flexDirection: 'column', gap: 24, margin: '0 auto' }} className="pt-6 px-4 md:px-0 pb-24 md:pb-0">
        {/* Stats Row */}
        <motion.div className="glass-card grid grid-cols-2 md:flex md:flex-row items-start md:items-center py-4 md:py-6" style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 16, boxShadow: 'var(--neu-shadow)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          {[
            { icon: <Layers size={20} />, label: 'Total Chunks', value: docs.length, trend: statsTrends.total, trendColor: '#16a34a' },
            { icon: <Globe size={20} />, label: 'Scraped Chunks', value: scrapedChunks, trend: statsTrends.scraped, trendColor: '#16a34a' },
            { icon: <FileText size={20} />, label: 'Manual Docs', value: Object.keys(grouped).length, trend: statsTrends.manual, trendColor: '#16a34a' },
            { icon: <Zap size={20} />, label: 'Active Crawls', value: runningJobs.length, trend: `${runningJobs.length} running now`, trendColor: 'var(--text-muted)' },
          ].map((stat, i) => (
            <div key={stat.label} className={`w-full md:w-auto flex-1 border-[var(--border-strong)] py-4 md:py-0 px-3 md:px-0 ${i % 2 === 0 ? 'border-r' : 'border-r-0'} ${i < 2 ? 'border-b' : 'border-b-0'} md:border-b-0 ${i < 3 ? 'md:border-r' : 'md:border-r-0'}`}>
              <AnimatedStat value={stat.value} label={stat.label} icon={stat.icon} bg="rgba(43,63,44,0.08)" color="#2b3f2c" trend={stat.trend} trendColor={stat.trendColor} delay={i * 0.08} />
            </div>
          ))}
        </motion.div>

        <KnowledgeGraphCard docs={docs} scrapeJobs={scrapeJobs} retrievalQuality={retrievalQuality} lastUpdatedText={lastUpdatedText} />

        {/* Flash */}
        <AnimatePresence>
          {msg && (
            <motion.div style={{ padding: '11px 15px', borderRadius: 10, background: msgType === 'ok' ? 'rgba(var(--blue-rgb),0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msgType === 'ok' ? 'rgba(var(--blue-rgb),0.25)' : 'rgba(239,68,68,0.25)'}`, color: msgType === 'ok' ? '#6ee7b7' : '#fca5a5', fontSize: 13, fontFamily: 'Outfit, sans-serif' }} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>{msg}</motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button className={`tab-btn justify-center w-full sm:w-auto ${activeTab === 'scraper' ? 'active' : 'inactive'}`} onClick={() => setActiveTab('scraper')}>
            <Globe size={14} /> Website Scraper
            {runningJobs.length > 0 && <span style={{ background: activeTab === 'scraper' ? '#fff' : 'var(--blue-accent)', color: activeTab === 'scraper' ? 'var(--blue-primary)' : 'var(--background)', borderRadius: 20, padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>{runningJobs.length}</span>}
          </button>
          <button className={`tab-btn justify-center w-full sm:w-auto ${activeTab === 'upload' ? 'active' : 'inactive'}`} onClick={() => setActiveTab('upload')}><Upload size={14} /> File Upload</button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'scraper' && (
            <motion.div key="scraper" style={{ display: 'flex', flexDirection: 'column', gap: 20 }} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.22 }}>
              <ScraperCreditBar wallet={scraperWallet} />
              <motion.div style={{ background: 'var(--panel-bg)', backdropFilter: 'var(--panel-backdrop)', WebkitBackdropFilter: 'var(--panel-backdrop)', boxShadow: 'var(--neu-shadow)', border: '1px solid var(--panel-border)', borderRadius: 18, padding: 24 }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(var(--blue-rgb),0.1)', border: '1px solid rgba(var(--blue-rgb),0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-accent)' }}><Globe size={17} /></div>
                  <div><div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--foreground)' }}>Website Crawler</div><div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Outfit, sans-serif' }}>Full-site BFS crawl — up to 200 pages, any tech stack</div></div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 mb-4">
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Link2 size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                    <input className="scrape-input" type="url" value={scrapeUrl} onChange={e => setScrapeUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && startScrape()} placeholder="https://yourwebsite.com" style={{ width: '100%', boxSizing: 'border-box', background: 'var(--input-bg)', border: '1px solid var(--border-strong)', borderRadius: 12, padding: '13px 14px 13px 38px', color: 'var(--foreground)', fontSize: 14, fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s' }} />
                  </div>
                  <button className="justify-center w-full md:w-auto" onClick={startScrape} disabled={scraping || !scrapeUrl.trim()} style={{ padding: '13px 24px', background: scraping || !scrapeUrl.trim() ? 'var(--panel-bg)' : 'linear-gradient(135deg, var(--blue-primary), var(--blue-deep))', border: scraping || !scrapeUrl.trim() ? '1px solid var(--border-strong)' : 'none', borderRadius: 12, color: scraping || !scrapeUrl.trim() ? 'var(--text-muted)' : '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 14, cursor: scraping || !scrapeUrl.trim() ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', boxShadow: scraping || !scrapeUrl.trim() ? 'none' : '0 4px 12px rgba(var(--blue-rgb),0.2)', transition: 'all 0.2s' }}>
                    {scraping ? <><RefreshCw size={15} className="animate-spin" />Starting...</> : <><Zap size={15} />Start Crawl</>}
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 0 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <div onClick={() => setForceRescrape(x => !x)} style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${forceRescrape ? 'var(--blue-accent)' : 'var(--text-muted)'}`, background: forceRescrape ? 'rgba(var(--blue-rgb),0.2)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', cursor: 'pointer', flexShrink: 0 }}>{forceRescrape && <CheckCircle2 size={11} style={{ color: 'var(--blue-accent)' }} />}</div>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Outfit, sans-serif' }}>Force re-scrape (clears existing data)</span>
                  </label>
                </div>
              </motion.div>
              {runningJobs.length > 0 && (<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}><div style={{ fontSize: 12, fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Active Crawls</div><AnimatePresence>{runningJobs.map(job => <ScrapeJobCard key={job.job_id} job={job} onRescrape={handleRescrape} onClear={handleClearJob} />)}</AnimatePresence></motion.div>)}
              {completedJobs.length > 0 && (<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}><div style={{ fontSize: 12, fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Indexed Websites ({completedJobs.length})</div><AnimatePresence>{completedJobs.map(job => <ScrapeJobCard key={job.job_id} job={job} onRescrape={handleRescrape} onClear={handleClearJob} />)}</AnimatePresence></motion.div>)}
              {stoppedJobs.length > 0 && (<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}><div style={{ fontSize: 12, fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: 'var(--lt-warning,#f97316)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Stopped · Needs Attention ({stoppedJobs.length})</div><AnimatePresence>{stoppedJobs.map(job => <ScrapeJobCard key={job.job_id} job={job} onRescrape={handleRescrape} onClear={handleClearJob} />)}</AnimatePresence></motion.div>)}
              {failedJobs.length > 0 && (<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.25 }}><div style={{ fontSize: 12, fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Failed ({failedJobs.length})</div><AnimatePresence>{failedJobs.map(job => <ScrapeJobCard key={job.job_id} job={job} onRescrape={handleRescrape} onClear={handleClearJob} />)}</AnimatePresence></motion.div>)}
              {scrapeJobs.length === 0 && (<motion.div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontFamily: 'Outfit, sans-serif' }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><Globe size={32} style={{ margin: '0 auto 12px', opacity: 0.3 }} /><p style={{ fontSize: 14, fontWeight: 500 }}>No websites scraped yet</p><p style={{ fontSize: 13, marginTop: 6, opacity: 0.7 }}>Enter a URL above to crawl an entire website</p></motion.div>)}
            </motion.div>
          )}
          {activeTab === 'upload' && (
            <motion.div key="upload" style={{ display: 'flex', flexDirection: 'column', gap: 20 }} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }}>
              <motion.div style={{ background: 'var(--panel-bg)', backdropFilter: 'var(--panel-backdrop)', WebkitBackdropFilter: 'var(--panel-backdrop)', boxShadow: 'var(--neu-shadow)', border: '1px solid var(--panel-border)', borderRadius: 18, padding: 24 }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Step 1 — Classification</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10 }}>
                    {[{ key: 'general', label: 'General', sub: 'Uncategorized' }, { key: 'services', label: 'Services', sub: 'Offerings' }, { key: 'pricing', label: 'Pricing', sub: 'Costs & Plans' }, { key: 'faq', label: 'FAQ', sub: 'Common Qs' }, { key: 'company', label: 'Company', sub: 'About Us' }].map(cat => (
                      <button key={cat.key} className={`cat-btn ${uploadCategory === cat.key ? 'active' : ''}`} onClick={() => setUploadCategory(cat.key)} disabled={uploading}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 13, textTransform: 'capitalize', color: uploadCategory === cat.key ? 'var(--blue-accent)' : 'var(--foreground)' }}>{cat.label}</div>
                        <div style={{ fontSize: 11, color: uploadCategory === cat.key ? 'rgba(var(--blue-rgb),0.6)' : 'var(--text-muted)', fontFamily: 'Outfit, sans-serif', marginTop: 4 }}>{cat.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Step 2 — Upload File</div>
                <motion.div onClick={() => !uploading && fileRef.current?.click()} style={{ border: '2px dashed rgba(var(--blue-rgb),0.25)', borderRadius: 18, padding: '50px 24px', textAlign: 'center', cursor: 'pointer', background: 'rgba(var(--blue-rgb),0.02)', position: 'relative', overflow: 'hidden' }} whileHover={prefersReducedMotion ? {} : { borderColor: 'rgba(var(--blue-rgb),0.55)', background: 'rgba(var(--blue-rgb),0.05)', scale: 1.008 }} animate={uploading ? { borderColor: ['rgba(var(--blue-rgb),0.3)', 'rgba(var(--blue-rgb),0.7)', 'rgba(var(--blue-rgb),0.3)'] } : {}} transition={{ duration: 1.2, repeat: uploading ? Infinity : 0 }}>
                  <AnimatePresence>
                    {uploadSuccess && (
                      <motion.div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                        {[1, 2].map(i => (<motion.div key={i} style={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%', border: '2px solid var(--blue-accent)' }} initial={{ scale: 0, opacity: 0.7 }} animate={{ scale: 5, opacity: 0 }} transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.18 }} />))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {uploading
                    ? <><RefreshCw size={32} className="animate-spin" style={{ color: 'var(--blue-accent)', margin: '0 auto 16px' }} /><p style={{ color: 'var(--blue-accent)', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 18 }}>Extracting vectors...</p></>
                    : <><div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(var(--blue-rgb),0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid rgba(var(--blue-rgb),0.2)' }}><Upload size={28} style={{ color: 'var(--blue-accent)' }} /></div><p style={{ color: 'var(--foreground)', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Drag &amp; drop your files here</p><p style={{ color: 'var(--text-muted)', fontSize: 14, fontFamily: 'Outfit, sans-serif', marginBottom: 16 }}>or <span style={{ color: 'var(--blue-accent)', fontWeight: 600 }}>Browse Files</span></p><p style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'Outfit, sans-serif', opacity: 0.8 }}>PDF, TXT, DOCX, MD — Max 10MB</p></>
                  }
                </motion.div>
                <input ref={fileRef} type="file" accept=".pdf,.txt,.md" onChange={upload} style={{ display: 'none' }} />
              </motion.div>
              <motion.div style={{ background: 'var(--panel-bg)', backdropFilter: 'var(--panel-backdrop)', WebkitBackdropFilter: 'var(--panel-backdrop)', boxShadow: 'var(--neu-shadow)', border: '1px solid var(--panel-border)', borderRadius: 18, padding: 24 }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                  <div><div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--foreground)' }}>Indexed Documents ({Object.keys(grouped).length})</div><div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Outfit, sans-serif', marginTop: 4 }}>{manualDocs.length} vector chunks across {Object.keys(grouped).length} files</div></div>
                  <button onClick={loadDocs} className="justify-center w-full md:w-auto" style={{ background: 'var(--input-bg)', border: '1px solid var(--text-muted)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', color: 'var(--text-muted-heavy)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}><RefreshCw size={12} /> Refresh</button>
                </div>
                {fetching ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[1, 2, 3].map(i => (<div key={i} style={{ height: 72, borderRadius: 16, background: 'var(--input-bg)', overflow: 'hidden', position: 'relative' }}><motion.div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.045) 50%, transparent 100%)' }} animate={{ x: ['-100%', '200%'] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: i * 0.18 }} /></div>))}
                  </div>
                ) : Object.keys(grouped).length === 0 ? (
                  <motion.div style={{ textAlign: 'center', padding: '28px 0', color: 'var(--text-muted)', fontFamily: 'Outfit, sans-serif', fontSize: 13 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><BookOpen size={26} style={{ margin: '0 auto 10px', opacity: 0.3 }} /><p>No documents uploaded yet</p></motion.div>
                ) : (
                  <motion.div variants={{ show: { transition: { staggerChildren: 0.06 } } }} initial="hidden" animate="show">
                    {Object.entries(grouped).map(([filename, chunks]) => (
                      <motion.div key={filename} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } } }} whileHover={prefersReducedMotion ? {} : { y: -2, boxShadow: '0 8px 28px rgba(0,0,0,0.07)' }} transition={{ duration: 0.2 }} className="glass-card flex flex-wrap md:flex-nowrap items-center gap-3.5 p-4 md:px-5 rounded-2xl mb-3 overflow-hidden" style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', willChange: 'transform' }}>
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--blue-glow)', border: '1px solid var(--blue-accent)33', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-accent)', flexShrink: 0 }}><FileText size={18} /></div>
                        <div className="flex-1 min-w-0" style={{ flexBasis: 'calc(100% - 60px)' }}>
                          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 14, color: 'var(--foreground)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{filename}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3, fontFamily: 'Outfit, sans-serif' }}>{chunks.length} chunks · <span style={{ color: 'var(--blue-accent)', textTransform: 'capitalize', fontWeight: 500 }}>{chunks[0]?.category ?? 'general'}</span></div>
                        </div>
                        <button className="magnetic-btn w-full md:w-auto justify-center mt-2 md:mt-0" onClick={() => del(chunks[0]?.id, filename)} disabled={deleting === chunks[0]?.id} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', color: 'var(--lt-error,#ef4444)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontFamily: 'Outfit, sans-serif', opacity: deleting === chunks[0]?.id ? 0.5 : 1, fontWeight: 600 }}>
                          {deleting === chunks[0]?.id ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />} Delete
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <ConfirmModal show={confirmState.show} title={confirmState.title} message={confirmState.message} onConfirm={confirmState.onConfirm} onCancel={() => setConfirmState(prev => ({ ...prev, show: false }))} />
      </div>
    </>
  );
}



