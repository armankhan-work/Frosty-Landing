// @ts-nocheck
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './FrostyPage.css';
import AnswersQualifiesFlow from './AnswersQualifiesFlow';
import BooksMeetingsFlow from './BooksMeetingsFlow';
import ProposalsQuotesFlow from './ProposalsQuotesFlow';
import CapturesLeadFlow from './CapturesLeadFlow';
import HandsOffFlow from './HandsOffFlow';

function Icon({ n }: { n: string }) {
    const p: Record<string, React.ReactNode> = {
        snow: <path d="M12 2v20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M3.3 7l17.4 10M3.3 7l1.1 4.1M3.3 7l4.1-1.1M20.7 17l-4.1 1.1M20.7 17l-1.1-4.1M20.7 7L3.3 17M20.7 7l-4.1-1.1M20.7 7l-1.1 4.1M3.3 17l4.1 1.1M3.3 17l1.1-4.1" />,
        arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
        chat: <path d="M4 5h16v11H8l-4 4V5z" />,
        wa: <path d="M4 20l1.4-4A8 8 0 1112 20a8 8 0 01-6.6-3.5M9 10.5c.4 2 2.5 4.1 4.5 4.5.7.1 1.3-.5 1.5-1l-1.6-1-1 .7c-.8-.4-1.4-1-1.8-1.8l.7-1-1-1.6c-.5.2-1.1.8-1 1.5z" />,
        brain: <path d="M9 4a3 3 0 00-3 3 3 3 0 00-1 5.8A3 3 0 007 18a3 3 0 003 2V4zM15 4a3 3 0 013 3 3 3 0 011 5.8A3 3 0 0117 18a3 3 0 01-3 2V4z" />,
        cal: <path d="M4 6h16v14H4V6zM4 10h16M8 3v4M16 3v4M9 14h2M14 14h2" />,
        doc: <path d="M7 3h7l4 4v14H7V3zM14 3v4h4M9 12h7M9 16h7" />,
        user: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 20a7 7 0 0114 0" />,
        hand: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 20a7 7 0 0111.5-5.5M17 15l2 2 3-3" />,
        bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
        layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" />,
        model: <path d="M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v10M7 12h10M8.5 8.5l7 7M15.5 8.5l-7 7" />,
        plug: <path d="M9 3v6M15 3v6M7 9h10v3a5 5 0 01-10 0V9zM12 17v4" />,
        shield: <path d="M12 3l8 3v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V6l8-3zM9 12l2 2 4-4" />,
        infinity: <path d="M6 9a3 3 0 100 6c2 0 3-2 6-3s4-3 6-3a3 3 0 110 6c-2 0-3-2-6-3S8 9 6 9z" />,
        chart: <path d="M4 20V4M4 20h16M8 16l3-4 3 2 4-6" />,
        check: <path d="M4 12l5 5L20 6" />,
        spark: <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z" />,
        globe: <path d="M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" />
    };
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p[n]}</svg>;
}

const ACTS = [
    {
        i: "/icons/chat.png", h: "Answers & qualifies", p: "Understands the question and asks the right ones back.",
        q: "Do you work with clinics like ours?", via: "Website", out: "Intent understood · tagged WARM", c: "act-purple"
    },
    {
        i: "/icons/email.png", h: "Books meetings", p: "Drops a slot straight onto your team's calendar.",
        q: "Can someone walk me through it this week?", via: "WA", out: "Meeting booked · Thu 4:30 PM", c: "act-blue"
    },
    {
        i: "/icons/innovation.png", h: "Sends proposals & quotes", p: "Shares the right document at the right moment.",
        q: "Send me pricing for 50 seats.", via: "Website", out: "Quotation #218 sent on WA", c: "act-orange"
    },
    {
        i: "/icons/data-analytics.png", h: "Captures the lead", p: "Pulls contact and intent from a natural chat.",
        q: "I'm interested - here's my number.", via: "WA", out: "Lead saved · synced to your CRM", c: "act-green"
    },
    {
        i: "/icons/advisors.png", h: "Hands off to a human", p: "Escalates to your team with the full history.",
        q: "I'd rather speak to a person.", via: "Website", out: "Live chat handed to your team", c: "act-rose"
    }
];

function ActsDiagram({ active, onSelect, setHeld }: { active: number, onSelect: (i: number) => void, setHeld: (h: boolean) => void }) {
    const [paths, setPaths] = useState<string[]>([]);
    const [feed, setFeed] = useState("");
    const wrap = useRef<HTMLDivElement>(null), core = useRef<HTMLDivElement>(null), tilt = useRef<HTMLDivElement>(null), enq = useRef<HTMLDivElement>(null);
    const nodes = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const el = wrap.current; if (!el) return;
        const curve = (x1: number, y1: number, x2: number, y2: number) => {
            const m = (x1 + x2) / 2;
            return `M${x1.toFixed(1)},${y1.toFixed(1)} C${m.toFixed(1)},${y1.toFixed(1)} ${m.toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
        };
        const measure = () => {
            const w = el.getBoundingClientRect(), c = core.current?.getBoundingClientRect();
            if (!c) return;
            const cx = c.left - w.left + c.width / 2, cy = c.top - w.top + c.height / 2;
            const e = enq.current?.getBoundingClientRect();
            setFeed(e ? curve(e.right - w.left, e.top - w.top + e.height / 2, cx, cy) : "");
            setPaths(nodes.current.map((n) => {
                if (!n) return "";
                const r = n.getBoundingClientRect();
                return curve(cx, cy, r.left - w.left, r.top - w.top + r.height / 2);
            }));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        const el = tilt.current; if (!el) return;
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            el.style.setProperty("--tx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
            el.style.setProperty("--ty", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
        };
        const out = () => { el.style.setProperty("--tx", "0"); el.style.setProperty("--ty", "0"); };
        el.addEventListener("pointermove", move as EventListener);
        el.addEventListener("pointerleave", out as EventListener);
        return () => { el.removeEventListener("pointermove", move as EventListener); el.removeEventListener("pointerleave", out as EventListener); };
    }, []);

    const cur = ACTS[active];
    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }} className="fx-acts">
            <div className="fx-acts-3d" ref={tilt}>
                <div className="fx-acts-grid" ref={wrap}>
                    <svg className={`fx-acts-svg ${cur.c}`} aria-hidden="true">
                        {feed && <path className="fx-link on" d={feed} style={{ stroke: '#8B5CF6' }} />}
                        {paths.map((d, i) => d && <path key={i} className={"fx-link" + (i === active ? " on" : "")} d={d} />)}
                        {feed && <path className="fx-pulse" d={feed} pathLength="100" style={{ stroke: '#8B5CF6' }} />}
                        {paths[active] && <path className="fx-pulse lag" d={paths[active]} pathLength="100" />}
                    </svg>

                    <div className="fx-enq" ref={enq}>
                        <span className="lbl">Enquiry in</span>
                        <p>“{cur.q}”</p>
                        <span className="via">via {cur.via}</span>
                    </div>

                    <div className="fx-brain">
                        <div className="node" ref={core}><img src="/icons/ai.png" alt="Brain" className="w-8 h-8 object-contain" style={{ filter: 'brightness(0) invert(1)' }} /></div>
                        <small>Reads intent</small>
                    </div>

                    <div className="fx-act-list">
                        {ACTS.map((a, i) => (
                            <button
                                key={a.h}
                                ref={(n) => { nodes.current[i] = n; }}
                                className={`fx-act ${a.c}` + (i === active ? " on" : "")}
                                aria-pressed={i === active}
                                onClick={() => { onSelect(i); setHeld(true); }}
                                onMouseEnter={() => { onSelect(i); setHeld(true); }}
                                onMouseLeave={() => setHeld(false)}
                                onFocus={() => { onSelect(i); setHeld(true); }}
                                onBlur={() => setHeld(false)}
                            >
                                <span className="ic"><img src={a.i} alt="" className="w-5 h-5 object-contain" style={{ filter: 'brightness(0) invert(1)' }} /></span>
                                <b>{a.h}</b>
                                <span className="fx-sr">. {a.p} Example: “{a.q}” - {a.out}.</span>
                                <span className="tick"><Icon n="check" /></span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

const ACTIVE_TAB_STYLES = [
  "border-[#8B5CF6] text-[#C4B5FD] bg-[#8B5CF6]/15",
  "border-[#5F23C8] text-[#5F23C8] bg-[#5F23C8]/15",
  "border-[#F59E0B] text-[#FBBF24] bg-[#F59E0B]/15",
  "border-[#10B981] text-[#34D399] bg-[#10B981]/15",
  "border-[#F43F5E] text-[#FB7185] bg-[#F43F5E]/15",
];

const TAB_DOT_COLORS = [
  "bg-[#8B5CF6]",
  "bg-[#5F23C8]",
  "bg-[#F59E0B]",
  "bg-[#10B981]",
  "bg-[#F43F5E]",
];

function MobileTabs({ active, onSelect, setHeld }: { active: number; onSelect: (i: number) => void; setHeld: (h: boolean) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const activeBtn = container.children[active] as HTMLElement;
    if (!activeBtn) return;
    const scrollLeft = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, [active]);

  return (
    <div className="w-full lg:hidden">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-2 pb-2 w-full snap-x scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {ACTS.map((a, i) => {
          const isActive = i === active;
          return (
            <button
              key={a.h}
              onClick={() => {
                onSelect(i);
                setHeld(true);
                setTimeout(() => setHeld(false), 8000);
              }}
              className={`snap-center flex-none flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-semibold border transition-all duration-300 ${
                isActive
                  ? ACTIVE_TAB_STYLES[i]
                  : 'bg-white/[0.03] text-slate-500 border-white/[0.06]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-none ${isActive ? TAB_DOT_COLORS[i] : 'bg-slate-600'}`} />
              <span className="whitespace-nowrap">{a.h}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FeatureShowcase() {
    const [active, setActive] = useState(0);
    const [held, setHeld] = useState(false);

    const handleComplete = () => {
        if (!held) {
            setActive(a => (a + 1) % 5);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-16 mt-6 sm:mt-12 w-full">
            {/* Mobile: Tabs on top */}
            <MobileTabs active={active} onSelect={setActive} setHeld={setHeld} />

            {/* Desktop: Full diagram on left */}
            <div className="hidden lg:block lg:w-[48%]"
              onMouseEnter={() => setHeld(true)}
              onMouseLeave={() => setHeld(false)}
            >
                <ActsDiagram active={active} onSelect={setActive} setHeld={setHeld} />
            </div>

            {/* Flow Animations — responsive container */}
            <div className="w-full lg:w-[48%] flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-[400px] lg:max-w-none aspect-square lg:aspect-auto lg:min-h-[460px] flex items-center justify-center">
                    {active === 0 && <AnswersQualifiesFlow onComplete={handleComplete} />}
                    {active === 1 && <BooksMeetingsFlow onComplete={handleComplete} />}
                    {active === 2 && <ProposalsQuotesFlow onComplete={handleComplete} />}
                    {active === 3 && <CapturesLeadFlow onComplete={handleComplete} />}
                    {active === 4 && <HandsOffFlow onComplete={handleComplete} />}
                </div>
            </div>
        </div>
    );
}

export default function ItActsSection() {
    return (
        <section className="relative pt-4 sm:pt-8 lg:pt-12 pb-12 sm:pb-16 lg:pb-24 overflow-hidden bg-transparent" id="how">
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }} className="text-center mx-auto flex flex-col items-center" style={{ maxWidth: 640 }}>
                    <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#5F23C8] flex items-center mb-3 sm:mb-4">Not a chatbot</span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-3 sm:mb-6">
                        It doesn&apos;t just chat. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F23C8] to-[#5F23C8]">It acts.</span>
                    </h2>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl px-2 sm:px-0">
                        Rule-based bots frustrate people with scripts. Frosty understands intent and takes the next step on its own.
                    </p>
                </motion.div>
                <FeatureShowcase />
            </div>
        </section>
    );
}
