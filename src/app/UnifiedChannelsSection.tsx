'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FrostyIcon from '@/components/FrostyIcon';

export default function UnifiedChannelsSection() {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let isAlive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) => new Promise<void>(r => { 
      const t = setTimeout(r, ms);
      timers.push(t);
    });

    const runSequence = async () => {
      while (isAlive) {
        setStep(0);
        await wait(1000);
        
        // Website Flow
        setStep(1);
        await wait(1000);
        setStep(2);
        await wait(1000);
        setStep(3);
        await wait(1200);
        setStep(4);
        await wait(600);
        setStep(5);
        await wait(1500);

        // WA Flow
        setStep(6);
        await wait(1000);
        setStep(7);
        await wait(1200);
        setStep(8);
        await wait(600);
        setStep(9);
        await wait(800);

        // Unified Profile Update
        setStep(10);
        await wait(1500);
        
        // Unified Conversation Update
        setStep(11);
        await wait(1500);
        setStep(12);
        await wait(4000);
      }
    };

    runSequence();

    return () => {
      isAlive = false;
      timers.forEach(clearTimeout);
    };
  }, [inView]);

  return (
    <section ref={containerRef} className="relative w-full py-24 overflow-hidden z-10 flex flex-col items-center bg-transparent">
      
      {/* BACKGROUND PARTICLES & GLOW */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center">
         <div className="absolute top-[30%] w-[1000px] h-[600px] bg-[#5F23C8]/5 rounded-[100%] blur-[120px]" />
         
         {/* Floating 3D Cubes */}
         <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute left-[10%] top-[20%] w-16 h-16 opacity-30">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#5F23C8]"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
         </motion.div>
         <motion.div animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute right-[12%] top-[15%] w-12 h-12 opacity-25">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#10B981]"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
         </motion.div>
         <motion.div animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute left-[18%] bottom-[35%] w-10 h-10 opacity-20">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#E11D48]"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
         </motion.div>
      </div>

      {/* TOP HEADER */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mb-16">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5F23C8]/30 bg-[#5F23C8]/10 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#5F23C8] mb-6 shadow-sm"
        >
          CHANNELS. UNIFIED.
        </motion.div>
        
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-[#0F172A] leading-[1.15] tracking-tight mb-6"
        >
          Website. WhatsApp. <span className="text-[#5F23C8] font-bold">Unified.</span>
        </motion.h2>
        
        <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto"
        >
          Different channels. One agent. One memory.<br className="hidden md:block" /> One conversation that never breaks.
        </motion.p>
      </div>

      {/* MAIN VISUALIZATION AREA */}
      <div className="relative w-full max-w-[1400px] mx-auto h-[1050px] mt-10 hidden lg:block">
        
        {/* Core Connections SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
           {/* THICK GLOWS */}
           <path d="M 390,260 C 390,400 600,420 700,530" fill="none" stroke="#5F23C8" strokeWidth="6" filter="blur(6px)" className="opacity-20" />
           <path d="M 700,240 C 700,350 700,380 700,530" fill="none" stroke="#10B981" strokeWidth="6" filter="blur(6px)" className="opacity-20" />
           <path d="M 1010,260 C 1010,400 800,420 700,530" fill="none" stroke="#EA4335" strokeWidth="6" filter="blur(6px)" className="opacity-20" />

           {/* MAIN PATHS */}
           <motion.path 
              d="M 390,260 C 390,400 600,420 700,530" 
              fill="none" 
              stroke="url(#lineGradient1)" 
              strokeWidth="2.5"
           />
           <motion.path 
              d="M 700,240 C 700,350 700,380 700,530" 
              fill="none" 
              stroke="url(#lineGradient2)" 
              strokeWidth="2.5"
           />
           <motion.path 
              d="M 1010,260 C 1010,400 800,420 700,530" 
              fill="none" 
              stroke="url(#lineGradient3)" 
              strokeWidth="2.5"
           />

           {/* DOTTED CONNECTIONS TO BADGES */}
           <path d="M 700,540 Q 600,520 490,480" fill="none" stroke="#5F23C8" strokeWidth="1.5" strokeDasharray="3 6" className="opacity-40" />
           <circle cx="490" cy="480" r="2.5" fill="#5F23C8" />

           <path d="M 700,540 Q 600,570 480,600" fill="none" stroke="#5F23C8" strokeWidth="1.5" strokeDasharray="3 6" className="opacity-40" />
           <circle cx="480" cy="600" r="2.5" fill="#5F23C8" />

           <path d="M 700,540 Q 800,520 910,480" fill="none" stroke="#5F23C8" strokeWidth="1.5" strokeDasharray="3 6" className="opacity-40" />
           <circle cx="910" cy="480" r="2.5" fill="#5F23C8" />

           <path d="M 700,540 Q 800,570 920,600" fill="none" stroke="#5F23C8" strokeWidth="1.5" strokeDasharray="3 6" className="opacity-40" />
           <circle cx="920" cy="600" r="2.5" fill="#5F23C8" />

           {/* ANIMATED PULSES */}
           <motion.circle r="4.5" fill="#5F23C8" filter="drop-shadow(0 0 4px #5F23C8)">
              <animateMotion dur="1s" path="M 390,260 C 390,400 600,420 700,530" begin={step === 4 ? "0s" : "indefinite"} fill="freeze" />
              <animate attributeName="opacity" values="0;1;0" dur="1s" begin={step === 4 ? "0s" : "indefinite"} />
           </motion.circle>

           <motion.circle r="4.5" fill="#10B981" filter="drop-shadow(0 0 4px #10B981)">
              <animateMotion dur="1s" path="M 700,240 C 700,350 700,380 700,530" begin={step === 8 ? "0s" : "indefinite"} fill="freeze" />
              <animate attributeName="opacity" values="0;1;0" dur="1s" begin={step === 8 ? "0s" : "indefinite"} />
           </motion.circle>

           <motion.circle r="5" fill="#5F23C8" filter="drop-shadow(0 0 4px #5F23C8)">
              <animateMotion dur="1.2s" path="M 700,600 L 700,750" begin={step === 9 ? "0s" : "indefinite"} fill="freeze" />
              <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin={step === 9 ? "0s" : "indefinite"} />
           </motion.circle>
           
           <motion.circle r="5" fill="#5F23C8" filter="drop-shadow(0 0 4px #5F23C8)">
              <animateMotion dur="1s" path="M 760,530 C 850,530 1100,580 1200,600" begin={step === 9 ? "0s" : "indefinite"} fill="freeze" />
              <animate attributeName="opacity" values="0;1;0" dur="1s" begin={step === 9 ? "0s" : "indefinite"} />
           </motion.circle>

           <defs>
              <linearGradient id="lineGradient1" x1="0" y1="0" x2="1" y2="1">
                 <stop offset="0%" stopColor="#5F23C8" stopOpacity="0.8" />
                 <stop offset="100%" stopColor="#5F23C8" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="lineGradient2" gradientUnits="userSpaceOnUse" x1="700" y1="240" x2="700" y2="530">
                 <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                 <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="lineGradient3" x1="1" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor="#EA4335" stopOpacity="0.8" />
                 <stop offset="100%" stopColor="#5F23C8" stopOpacity="0.3" />
              </linearGradient>
           </defs>
        </svg>

        {/* 1. LEFT FEATURES LIST */}
        <div className="absolute left-[20px] top-[420px] w-[260px] flex flex-col gap-8 z-10">
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[#5F23C8] shadow-sm">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <div>
                 <h5 className="text-[13px] font-bold text-slate-900 leading-tight">All channels connected</h5>
                 <p className="text-[11px] text-slate-500 leading-snug mt-1.5">Website, WhatsApp, Instagram DM and more.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[#5F23C8] shadow-sm">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <div>
                 <h5 className="text-[13px] font-bold text-slate-900 leading-tight">One memory</h5>
                 <p className="text-[11px] text-slate-500 leading-snug mt-1.5">Every interaction. Every detail. Always in context.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[#5F23C8] shadow-sm">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <div>
                 <h5 className="text-[13px] font-bold text-slate-900 leading-tight">Instant sync</h5>
                 <p className="text-[11px] text-slate-500 leading-snug mt-1.5">Real-time updates across every channel.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[#5F23C8] shadow-sm">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div>
                 <h5 className="text-[13px] font-bold text-slate-900 leading-tight">One customer view</h5>
                 <p className="text-[11px] text-slate-500 leading-snug mt-1.5">Unified profile. Complete conversation history.</p>
              </div>
           </div>
        </div>

        {/* 2. TOP LEFT: WEBSITE CARD */}
        <div className="absolute left-1/2 ml-[-440px] top-[70px] z-20">
           <div className="absolute -left-5 -top-5 w-10 h-10 bg-gradient-to-br from-[#5F23C8] to-[#7C3AED] rounded-xl flex items-center justify-center text-white shadow-[0_10px_25px_rgba(95,35,200,0.35)] z-30 transform -rotate-6">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
           </div>
           
           <motion.div 
              className="w-[260px] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] overflow-hidden"
              initial={{ rotate: -6 }}
              whileHover={{ scale: 1.02, rotate: -4, boxShadow: '0 25px 50px rgba(95,35,200,0.12)' }}
           >
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-2 pl-3">
                    <span className="text-slate-900 text-[13px] font-bold">Website</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      {step >= 1 && step <= 4 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5F23C8] opacity-75"></span>}
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5F23C8]"></span>
                    </span>
                    <span className="text-[10px] text-[#5F23C8] font-semibold">Live</span>
                 </div>
              </div>
              
              <div className="p-3.5 min-h-[220px] pb-4 flex flex-col gap-2 overflow-hidden relative">
                 {step >= 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-0">
                       <span className="text-[10px] text-slate-500 font-medium">New visit on Pricing Page</span>
                       <div className="text-[9px] text-slate-400">10:24 AM • Bengaluru, India</div>
                    </motion.div>
                 )}
                 
                 <AnimatePresence>
                   {step >= 2 && (
                      <motion.div key="web-msg1" initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex flex-col max-w-[90%] self-end items-end relative mt-1">
                         <div className="px-3 py-2 text-[11px] bg-slate-100 text-slate-900 rounded-2xl rounded-tr-sm border border-slate-200">Hi, looking for 100 units pricing.</div>
                         <span className="text-[9px] text-slate-400 mt-0.5">10:24 AM</span>
                      </motion.div>
                   )}
                   {step >= 4 && (
                      <motion.div key="web-msg2" initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex flex-col max-w-[90%] self-start items-start relative mt-1">
                         <div className="px-3 py-2 text-[11px] bg-[#5F23C8] text-white rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                            <span>I can help! We have bulk discounts. Need a quote?</span>
                         </div>
                      </motion.div>
                   )}
                 </AnimatePresence>

                 {step === 3 && (
                    <motion.div key="web-typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start mt-1 px-3 py-1 flex items-center gap-2 text-[10px] text-[#5F23C8] font-medium">
                       Frosty is typing...
                       <div className="flex gap-0.5 ml-1">
                          {[0,1,2].map(i => <motion.div key={i} animate={{ opacity: [0.3,1,0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i*0.2 }} className="w-1 h-1 rounded-full bg-[#5F23C8]" />)}
                       </div>
                    </motion.div>
                 )}
              </div>
           </motion.div>
        </div>

        {/* 3. TOP CENTER: WHATSAPP CARD */}
        <div className="absolute left-1/2 ml-[-130px] top-[50px] z-20">
           <div className="absolute -left-5 -top-5 w-10 h-10 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-xl flex items-center justify-center text-white shadow-[0_10px_25px_rgba(37,211,102,0.3)] z-30 transform -rotate-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.69 4.19 1.87 5.84L2 22l4.28-1.85A9.954 9.954 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.23c-1.83 0-3.56-.47-5.06-1.32l-3.32 1.44 1.46-3.24A8.257 8.257 0 013.77 12c0-4.54 3.69-8.23 8.23-8.23s8.23 3.69 8.23 8.23-3.69 8.23-8.23 8.23z"/></svg>
           </div>

           <motion.div 
              className="w-[260px] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] overflow-hidden"
              whileHover={{ scale: 1.02, y: -2, boxShadow: '0 25px 50px rgba(37,211,102,0.12)' }}
           >
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-2 pl-3">
                    <span className="text-slate-900 text-[13px] font-bold">WhatsApp</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      {step >= 6 && step <= 8 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>}
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                    </span>
                    <span className="text-[10px] text-[#10B981] font-semibold">Live</span>
                 </div>
              </div>
              
              <div className="p-3.5 min-h-[220px] flex flex-col gap-2.5 overflow-hidden relative">
                 <div className="relative z-10 w-full h-full flex flex-col gap-2.5">
                    {step >= 5 && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-0">
                          <span className="text-[10px] text-slate-500 font-medium">New message</span>
                          <div className="text-[9px] text-slate-400 mt-0.5">10:25 AM</div>
                       </motion.div>
                    )}
                    <AnimatePresence>
                      {step >= 6 && (
                         <motion.div key="wa-msg1" initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex flex-col max-w-[90%] self-start items-start relative mt-0">
                            <div className="px-3 py-2 text-[11px] bg-slate-100 text-slate-900 rounded-lg rounded-tl-none shadow-sm border border-slate-200">Any discounts for bulk orders?</div>
                            <span className="text-[9px] text-slate-400 mt-0.5 self-end">10:25 AM</span>
                         </motion.div>
                      )}
                      {step >= 8 && (
                         <motion.div key="wa-msg2" initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex flex-col max-w-[90%] self-end items-end relative mt-1">
                            <div className="px-3 py-2 text-[11px] bg-[#16A34A] text-white rounded-lg rounded-tr-none shadow-sm flex flex-col gap-1">
                               <span>Yes! Here's a quote based on our website chat.</span>
                               <svg className="w-3.5 h-3.5 text-green-100 self-end mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 10 12 16 9 13"/><polyline points="22 10 16 16 13 13"/></svg>
                            </div>
                         </motion.div>
                      )}
                    </AnimatePresence>
                    {step === 7 && (
                       <motion.div key="wa-typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start mt-1 px-3 py-1 flex items-center gap-2 text-[10px] text-[#16A34A] font-medium">
                          Frosty is replying...
                          <div className="flex gap-0.5 ml-1">
                             {[0,1,2].map(i => <motion.div key={i} animate={{ opacity: [0.3,1,0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i*0.2 }} className="w-1 h-1 rounded-full bg-[#16A34A]" />)}
                          </div>
                       </motion.div>
                    )}
                 </div>
              </div>
           </motion.div>
        </div>

        {/* 4. TOP RIGHT: GMAIL CARD */}
        <div className="absolute left-1/2 ml-[180px] top-[70px] z-20">
           <div className="absolute -left-5 -top-5 w-10 h-10 bg-gradient-to-tr from-[#EA4335] to-[#B31412] rounded-xl flex items-center justify-center text-white shadow-[0_10px_25px_rgba(234,67,53,0.3)] z-30 transform rotate-6">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
           </div>

           <motion.div 
              className="w-[260px] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] overflow-hidden"
              initial={{ rotate: 6 }}
              whileHover={{ scale: 1.02, rotate: 4, boxShadow: '0 25px 50px rgba(234,67,53,0.15)' }}
           >
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-2 pl-3">
                    <span className="text-slate-900 text-[13px] font-bold">Email</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EA4335]"></span>
                    </span>
                    <span className="text-[10px] text-[#EA4335] font-semibold">Live</span>
                 </div>
              </div>
              
              <div className="p-3.5 min-h-[220px] pb-4 flex flex-col gap-2.5 relative overflow-hidden">
                 <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                     <img className="w-7 h-7 rounded-full shrink-0 object-cover border border-slate-200" src="https://i.pravatar.cc/150?img=68" alt="James Carter" />
                     <div className="flex flex-col">
                         <span className="text-slate-900 text-[11px] font-semibold leading-tight">James Carter</span>
                         <span className="text-[9px] text-slate-500">james.carter@email.com</span>
                     </div>
                 </div>
                 
                 <AnimatePresence>
                   {step >= 1 && (
                      <motion.div key="email-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1.5 mt-0.5">
                         <div className="text-[11px] text-slate-900 font-bold">Bulk order timeline?</div>
                         <div className="text-[10px] text-slate-600 leading-relaxed">
                            Hi team,<br/><br/>
                            Can I get delivery timelines for a 100 unit bulk order?<br/><br/>
                            Thanks,<br/>James
                         </div>
                      </motion.div>
                   )}
                 </AnimatePresence>
              </div>
           </motion.div>
        </div>

        {/* 5. CENTRAL CORE */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[420px] w-[240px] h-[240px] flex items-center justify-center z-30">
           
           {/* Elliptical base rings */}
           <motion.div 
              className="absolute top-[50%] left-1/2 ml-[-175px] w-[350px] h-[100px] border-[2px] border-[#5F23C8]/40 rounded-[100%] pointer-events-none"
              style={{ transform: 'translateY(-50%) perspective(500px) rotateX(70deg)' }}
              animate={step >= 4 ? { opacity: [0.6, 0.9, 0.6], scale: [1, 1.04, 1] } : { opacity: 0.4 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           />
           <motion.div 
              className="absolute top-[50%] left-1/2 ml-[-225px] w-[450px] h-[130px] border border-[#5F23C8]/25 rounded-[100%] pointer-events-none"
              style={{ transform: 'translateY(-50%) perspective(500px) rotateX(70deg)' }}
              animate={step >= 4 ? { opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] } : { opacity: 0.2 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
           />

           {/* Core Glow */}
           <motion.div 
              className="absolute inset-[-60px] bg-[#5F23C8]/10 rounded-full blur-[80px] z-0 pointer-events-none"
              animate={
                 (step === 4 || step === 8 || step === 9) 
                 ? { opacity: 0.6, scale: 1.2 } 
                 : { opacity: 0.2, scale: 1 }
              }
              transition={{ duration: 0.5 }}
           />
           
           <motion.div 
              className="relative w-[150px] h-[150px] rounded-full bg-white/95 backdrop-blur-2xl border-[3px] border-[#5F23C8]/30 shadow-[0_10px_35px_rgba(95,35,200,0.15)] flex flex-col items-center justify-center overflow-hidden z-20"
              animate={
                 (step === 4 || step === 8 || step === 9) 
                 ? { scale: 1.08, borderColor: '#5F23C8', boxShadow: '0 15px 45px rgba(95,35,200,0.25)' } 
                 : { scale: 1, borderColor: 'rgba(95,35,200,0.3)' }
              }
              transition={{ duration: 0.4 }}
           >
              <div className="mb-1 relative z-10 flex items-center justify-center">
                 <FrostyIcon size={44} glow={0.5} />
              </div>
              <span className="text-[15px] font-bold text-slate-900 relative z-10 tracking-wider">Frosty</span>
              <span className="text-[9.5px] font-semibold text-[#5F23C8] relative z-10 uppercase tracking-widest">Unified Agent</span>
           </motion.div>

           {/* Floating Badges */}
           <motion.div animate={step >= 4 ? { opacity: 1, x: -10 } : { opacity: 0.4, x: 0 }} className="absolute -left-[140px] top-[20%] text-[11px] bg-white border border-slate-200 px-4 py-1.5 rounded-full text-slate-800 font-semibold whitespace-nowrap shadow-sm">Context stitched</motion.div>
           <motion.div animate={step >= 8 ? { opacity: 1, x: -10 } : { opacity: 0.4, x: 0 }} className="absolute -left-[150px] top-[70%] text-[11px] bg-white border border-slate-200 px-4 py-1.5 rounded-full text-slate-800 font-semibold whitespace-nowrap shadow-sm">Intent recognised</motion.div>
           
           <motion.div animate={step >= 9 ? { opacity: 1, x: 10 } : { opacity: 0.4, x: 0 }} className="absolute -right-[140px] top-[20%] text-[11px] bg-white border border-slate-200 px-4 py-1.5 rounded-full text-slate-800 font-semibold whitespace-nowrap shadow-sm">History unified</motion.div>
           <motion.div animate={step >= 10 ? { opacity: 1, x: 10 } : { opacity: 0.4, x: 0 }} className="absolute -right-[150px] top-[70%] text-[11px] bg-white border border-slate-200 px-4 py-1.5 rounded-full text-slate-800 font-semibold whitespace-nowrap shadow-sm">Memory updated</motion.div>
        </div>

        {/* 7. BOTTOM CENTER: UNIFIED CONVERSATION */}
        <motion.div 
           className="absolute left-[380px] bottom-[40px] w-[540px] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden z-20"
           initial={{ opacity: 0, y: 20 }}
           animate={step >= 9 ? { opacity: 1, y: 0, boxShadow: '0 15px 40px rgba(95,35,200,0.1)', pointerEvents: 'auto' } : { opacity: 0, y: 20, boxShadow: 'none', pointerEvents: 'none' }}
           transition={{ duration: 0.5 }}
        >
           <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="text-[14px]">✨</div>
                 <span className="text-slate-900 text-[13px] font-bold">Unified Conversation</span>
              </div>
              <div className="flex items-center gap-1.5">
                 <span className="relative flex h-2 w-2">
                   {step >= 12 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5F23C8] opacity-75"></span>}
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5F23C8]"></span>
                 </span>
                 <span className="text-[10px] text-[#5F23C8] font-semibold">Live</span>
              </div>
           </div>
           
           <div className="p-5 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FAF5FF] border border-[#5F23C8]/20 flex items-center justify-center shrink-0">
                 <FrostyIcon size={20} />
              </div>
              <div className="flex-1">
                 <p className="text-slate-900 text-[14px] font-bold mb-1.5">Hi James! 👋</p>
                 <p className="text-[12.5px] text-slate-600 leading-[1.6]">
                    Thanks for reaching out across different channels.<br/>
                    I can help you with pricing, discounts and delivery timelines for 100 units.<br/>
                    Would you like me to share a quote or connect you with our sales team?
                 </p>
                 <div className="flex gap-2 mt-5">
                    <button className="px-4 py-2 bg-[#5F23C8] text-white text-[11px] font-bold rounded-lg shadow-sm hover:bg-[#4C1D95] transition-colors">Share quote</button>
                    <button className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg hover:bg-slate-100 transition-colors">Connect to sales</button>
                    <button className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg hover:bg-slate-100 transition-colors">More details</button>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* 8. RIGHT SIDE: CUSTOMER PROFILE */}
        <motion.div 
           className="absolute right-[20px] bottom-[40px] w-[300px] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden z-20"
           initial={{ opacity: 0, y: 20 }}
           animate={step >= 10 ? { opacity: 1, y: 0, boxShadow: '0 15px 40px rgba(95,35,200,0.08)', pointerEvents: 'auto' } : { opacity: 0, y: 20, boxShadow: 'none', pointerEvents: 'none' }}
           transition={{ duration: 0.5 }}
        >
           <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-slate-800 text-[12px] font-bold">Customer Profile</span>
              <span className="text-[#5F23C8] text-[11px] font-semibold cursor-pointer">View full</span>
           </div>
           <div className="p-5">
              <div className="flex items-center gap-3 mb-5">
                 <div className="w-12 h-12 rounded-full border-2 border-slate-200 overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center">
                    <img src="https://i.pravatar.cc/150?img=68" alt="James Carter" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <div className="text-slate-900 text-[14px] font-bold flex items-center gap-2">
                       James Carter 
                       <motion.span 
                          className="text-[9px] bg-purple-50 border border-[#5F23C8]/30 px-1.5 py-0.5 rounded text-[#5F23C8] font-bold uppercase tracking-wide"
                          animate={step >= 10 ? { opacity: 1 } : { opacity: 0.4 }}
                       >
                          High Intent
                       </motion.span>
                    </div>
                    <div className="text-[11px] text-slate-500 leading-tight mt-1">james.carter@email.com<br/>+1 (415) 555-0198</div>
                 </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                 <span className="text-[10px] bg-slate-100 px-2.5 py-1.5 rounded-md text-slate-700 font-medium">Pricing page visited</span>
                 <span className="text-[10px] bg-slate-100 px-2.5 py-1.5 rounded-md text-slate-700 font-medium">Asked about bulk order</span>
                 <span className="text-[10px] bg-slate-100 px-2.5 py-1.5 rounded-md text-slate-700 font-medium">Interested in delivery</span>
              </div>

              <div className="pt-5 border-t border-slate-100">
                 <span className="text-slate-800 text-[11px] font-bold mb-4 block">Lead Score</span>
                 <div className="flex items-center gap-6">
                    <div className="relative w-16 h-16 shrink-0">
                       <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                          <motion.path 
                             d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                             fill="none" 
                             stroke={step >= 10 ? "#5F23C8" : "#94A3B8"} 
                             strokeWidth="4" 
                             strokeDasharray="100, 100" 
                             initial={{ strokeDashoffset: 50 }}
                             animate={step >= 10 ? { strokeDashoffset: 18 } : { strokeDashoffset: 50 }}
                             transition={{ duration: 1 }}
                          />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-slate-900 font-bold text-[20px] leading-none">{step >= 10 ? '82' : '50'}</span>
                          <span className="text-slate-500 text-[9px] uppercase font-bold mt-0.5">{step >= 10 ? 'High' : 'Med'}</span>
                       </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                       <div className="flex justify-between text-[11px]">
                          <span className="text-slate-500 font-medium">Intent</span>
                          <span className={step >= 10 ? "text-slate-900 font-bold" : "text-slate-500 font-medium"}>{step >= 10 ? 'High' : 'Med'}</span>
                       </div>
                       <div className="flex justify-between text-[11px]">
                          <span className="text-slate-500 font-medium">Engagement</span>
                          <span className={step >= 10 ? "text-slate-900 font-bold" : "text-slate-500 font-medium"}>{step >= 10 ? 'High' : 'Low'}</span>
                       </div>
                       <div className="flex justify-between text-[11px]">
                          <span className="text-slate-500 font-medium">Fit</span>
                          <span className="text-slate-900 font-bold">Good</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>

      </div>

      {/* BOTTOM STATS BAR */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 mt-16 hidden lg:block">
         <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 py-5 px-8 flex justify-between items-center shadow-sm">
           
           {/* Stat 1 */}
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full border border-[#5F23C8]/30 bg-[#5F23C8]/10 flex items-center justify-center text-[#5F23C8]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
             </div>
             <div>
               <div className="text-slate-900 font-bold text-[19px] leading-tight">3x</div>
               <div className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Higher conversion</div>
             </div>
           </div>
           
           <div className="w-px h-12 bg-slate-200" />
           
           {/* Stat 2 */}
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full border border-[#5F23C8]/30 bg-[#5F23C8]/10 flex items-center justify-center text-[#5F23C8]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
             </div>
             <div>
               <div className="text-slate-900 font-bold text-[19px] leading-tight">60%</div>
               <div className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Less response time</div>
             </div>
           </div>
           
           <div className="w-px h-12 bg-slate-200" />
           
           {/* Stat 3 */}
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full border border-[#5F23C8]/30 bg-[#5F23C8]/10 flex items-center justify-center text-[#5F23C8]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
             </div>
             <div>
               <div className="text-slate-900 font-bold text-[19px] leading-tight">90%</div>
               <div className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Context accuracy</div>
             </div>
           </div>
           
           <div className="w-px h-12 bg-slate-200" />
           
           {/* Stat 4 */}
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full border border-[#5F23C8]/30 bg-[#5F23C8]/10 flex items-center justify-center text-[#5F23C8]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
             </div>
             <div>
               <div className="text-slate-900 font-bold text-[19px] leading-tight">24/7</div>
               <div className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Always-on engagement</div>
             </div>
           </div>

         </div>
      </div>

      {/* MOBILE FALLBACK */}
      <div className="relative w-full max-w-sm mx-auto px-6 flex flex-col gap-6 lg:hidden">
         <p className="text-slate-500 text-center text-[12px] italic">Please view on a larger screen for the full interactive visualization.</p>
      </div>

    </section>
  );
}
