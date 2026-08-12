// @ts-nocheck
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Zap } from 'lucide-react';

const ODDS = [
  {
    t: "5 min", v: 100, color: "#3B82F6", label: "100",
    head: "The window is open.",
    body: "The study's baseline. Every other number here is measured against this moment.",
    quote: null
  },
  {
    t: "10 min", v: 25, color: "#F59E0B", label: "25",
    head: "Four times worse - after five more minutes.",
    body: "Five minutes of delay costs three-quarters of the odds.",
    quote: "From 5 minutes to 10 minutes the dial to qualify odds decrease 4 times."
  },
  {
    t: "30 min", v: 4.8, color: "#EF4444", label: "4.8",
    head: "21× worse. The lead has gone cold.",
    body: "Half an hour is the difference between a live conversation and a voicemail.",
    quote: "The odds of qualifying a lead if called in 5 minutes versus 30 minutes drop 21 times."
  },
];

export default function PremiumOddsDashboard() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [activeBar, setActiveBar] = useState<number | null>(null);

  const cur = ODDS[hoveredIndex];

  return (
    <div className="relative w-full flex-1 flex flex-col justify-center rounded-[24px] overflow-hidden bg-transparent backdrop-blur-sm border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.05)] p-4 sm:p-5 lg:p-6 font-sans z-10">

      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[80%] h-[60%] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0) 70%)' }} />

      {/* Header */}
      <div className="relative z-10 mb-4 sm:mb-6">
        <h3 className="text-[16px] sm:text-[18px] font-bold text-white mb-1 leading-tight tracking-tight">
          Relative odds of qualifying a lead
        </h3>
        <p className="text-[12px] text-slate-400">
          Values are indexed to 100 at the five-minute mark (not a percentage).
        </p>
      </div>

      {/* Chart Section */}
      <div className="relative z-10 flex flex-col mb-4">
        <div className="text-[10px] text-slate-500 mb-2 font-medium tracking-wide uppercase">Relative odds (index)</div>

        <div className="relative pl-6 sm:pl-8">
          {/* Y-Axis Labels */}
          <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between text-[11px] font-semibold text-slate-500 py-[2px]">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>

          {/* Grid and Bars */}
          <div 
            className="relative h-[110px] sm:h-[130px] w-full border-b border-[rgba(255,255,255,0.1)] flex items-end justify-around px-2 sm:px-4 pb-[1px]"
          onMouseLeave={() => setActiveBar(null)}
        >
          {/* Horizontal Grid lines */}
          {[0, 25, 50, 75, 100].map((val) => (
            <div
              key={val}
              className="absolute left-0 right-0 h-px bg-[rgba(255,255,255,0.06)] pointer-events-none"
              style={{ bottom: `${val}%` }}
            />
          ))}

          {/* Bars */}
          {ODDS.map((item, i) => {
            const isDull = activeBar !== null && activeBar !== i;
            return (
              <div
                key={item.t}
                className={`relative flex flex-col justify-end items-center group w-1/4 max-w-[80px] h-full cursor-pointer transition-all duration-300 ${isDull ? 'opacity-30 grayscale-[50%]' : 'opacity-100'}`}
                onMouseEnter={() => {
                  setHoveredIndex(i);
                  setActiveBar(i);
                }}
              >
                {/* Value Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  className="mb-2 text-[15px] font-bold text-white whitespace-nowrap"
                >
                  {item.label}
                </motion.div>

                {/* Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${item.v}%` }}
                  viewport={{ margin: "-50px" }}
                  transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 + i * 0.1 }}
                  className="w-full rounded-t-[10px] shadow-sm relative overflow-hidden group-hover:brightness-110 transition-all duration-300"
                  style={{ backgroundColor: item.color }}
                >
                  {/* Inner highlight */}
                  <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* X-Axis Labels */}
        <div className="flex justify-around px-2 sm:px-4 mt-3">
          {ODDS.map((item) => (
            <div key={item.t} className="text-[12px] font-bold text-white w-1/4 max-w-[80px] text-center">
              {item.t}
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Text block */}
      <div className="relative z-10 mt-3 min-h-[45px]">
        <h4 className="text-[13px] font-bold text-white mb-0.5">{cur.head}</h4>
        <p className="text-[11px] sm:text-[12px] text-slate-400">
          {cur.body}
          {cur.quote && <span> The study's words: <q className="italic">{cur.quote}</q></span>}
        </p>
      </div>

    </div>
  );
}
