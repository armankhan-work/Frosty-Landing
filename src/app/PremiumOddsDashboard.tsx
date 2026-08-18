// @ts-nocheck
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const ODDS = [
  {
    t: "5 min", v: 100, color: "#0396A6", label: "100",
    head: "The window is open.",
    body: "The study's baseline. Every other number here is measured against this moment.",
    quote: null
  },
  {
    t: "10 min", v: 25, color: "#D97706", label: "25",
    head: "Four times worse - after five more minutes.",
    body: "Five minutes of delay costs three-quarters of the odds.",
    quote: "From 5 minutes to 10 minutes the dial to qualify odds decrease 4 times."
  },
  {
    t: "30 min", v: 4.8, color: "#E11D48", label: "4.8",
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
    <div className="w-full flex-1 flex flex-col justify-center font-sans z-10">
      {/* Main Chart Container */}
      <div className="w-full transition-all duration-300">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-tight tracking-tight">
            Relative odds of qualifying a lead
          </h3>
        </div>

        {/* Chart Section */}
        <div className="flex flex-col">
          <div className="text-[10px] text-stone-500 mb-2 font-semibold tracking-wide uppercase">Relative odds (index)</div>

          <div className="relative pl-7 sm:pl-9">
            {/* Y-Axis Labels */}
            <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between text-[11px] font-semibold text-stone-500 py-[2px]">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            {/* Grid and Bars */}
            <div 
              className="relative h-[140px] sm:h-[185px] lg:h-[200px] w-full border-b border-stone-200 flex items-end justify-around px-4 sm:px-8 pb-[1px]"
              onMouseLeave={() => setActiveBar(null)}
            >
              {/* Horizontal Grid lines */}
              {[0, 25, 50, 75, 100].map((val) => (
                <div
                  key={val}
                  className="absolute left-0 right-0 h-px bg-stone-200/80 pointer-events-none"
                  style={{ bottom: `${val}%` }}
                />
              ))}

              {/* Bars */}
              {ODDS.map((item, i) => {
                const isDull = activeBar !== null && activeBar !== i;
                return (
                  <div
                    key={item.t}
                    className={`relative flex flex-col justify-end items-center group w-1/4 max-w-[110px] h-full cursor-pointer transition-all duration-300 ${isDull ? 'opacity-35 grayscale-[40%]' : 'opacity-100'}`}
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
                      className="mb-2 text-[15px] font-bold text-stone-900 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.div>

                    {/* Bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${item.v}%` }}
                      viewport={{ margin: "-50px" }}
                      transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 + i * 0.1 }}
                      className="w-full rounded-t-xl shadow-sm relative overflow-hidden group-hover:brightness-105 transition-all duration-300"
                      style={{ backgroundColor: item.color }}
                    >
                      {/* Inner highlight */}
                      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
                    </motion.div>
                  </div>
                )
              })}
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-around px-4 sm:px-8 mt-3">
              {ODDS.map((item) => (
                <div key={item.t} className="text-[12px] font-bold text-stone-700 w-1/4 max-w-[110px] text-center">
                  {item.t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
