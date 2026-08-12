'use client';

import { useEffect, useState, useRef, type JSX } from 'react';
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
        setStep(0); // Reset
        await wait(1000);
        
        // Website Flow
        setStep(1); // Web gets visitor
        await wait(1000);
        setStep(2); // Visitor sends message
        await wait(1000);
        setStep(3); // Frosty typing
        await wait(1200);
        setStep(4); // Frosty responds, pulse to core
        await wait(600);
        setStep(5); // Core reacts
        await wait(1500);

        // WA Flow
        setStep(6); // WhatsApp gets message
        await wait(1000);
        setStep(7); // WA Frosty typing
        await wait(1200);
        setStep(8); // WA Frosty responds, pulse to core
        await wait(600);
        setStep(9); // Core reacts heavily, pulse to Unified
        await wait(800);

        // Unified Profile Update
        setStep(10); // Unified profile populates
        await wait(1500);
        
        // Unified Conversation Update
        setStep(11); // Unified Conversation Frosty typing
        await wait(1500);
        setStep(12); // Unified Conversation responds
        await wait(4000); // Pause to let user read
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
      
      {/* --- BACKGROUND PARTICLES & GRID --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center">
         {/* Base Glow */}
         <div className="absolute top-[30%] w-[1000px] h-[600px] bg-[#5F23C8]/10 rounded-[100%] blur-[120px]" />
         
         {/* Floating 3D Cubes (SVG) */}
         <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute left-[10%] top-[20%] w-16 h-16 opacity-70">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#A78BFA]"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
         </motion.div>
         <motion.div animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute right-[12%] top-[15%] w-12 h-12 opacity-50">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#34D399]"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
         </motion.div>
         <motion.div animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute left-[18%] bottom-[35%] w-10 h-10 opacity-40">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#EC4899]"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
         </motion.div>
         <motion.div animate={{ y: [0, 25, 0], rotate: [0, -8, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute right-[20%] bottom-[45%] w-14 h-14 opacity-60">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#A78BFA]"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
         </motion.div>
      </div>

      {/* --- TOP HEADER --- */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mb-16">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5F23C8] bg-black/40 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#A78BFA] mb-6 shadow-[0_0_15px_rgba(95,35,200,0.2)]"
        >
          CHANNELS. UNIFIED.
        </motion.div>
        
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-6"
        >
          Website. WhatsApp. <span className="text-[#A78BFA]">Unified.</span>
        </motion.h2>
        
        <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto"
        >
          Different channels. One agent. One memory.<br className="hidden md:block" /> One conversation that never breaks.
        </motion.p>
      </div>

      {/* --- MAIN VISUALIZATION AREA --- */}
      <div className="relative w-full max-w-[1400px] mx-auto h-[1050px] mt-10 hidden lg:block">
        
        {/* Core Connections SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
           {/* --- THICK GLOWS --- */}
           <path d="M 390,260 C 390,400 600,420 700,530" fill="none" stroke="#8B5CF6" strokeWidth="8" filter="blur(8px)" className="opacity-40" />
           <path d="M 700,240 C 700,350 700,380 700,530" fill="none" stroke="#34D399" strokeWidth="8" filter="blur(8px)" className="opacity-40" />
           <path d="M 1010,260 C 1010,400 800,420 700,530" fill="none" stroke="#EC4899" strokeWidth="8" filter="blur(8px)" className="opacity-40" />

           {/* --- MAIN PATHS --- */}
           {/* Web to Core */}
           <motion.path 
              d="M 390,260 C 390,400 600,420 700,530" 
              fill="none" 
              stroke="url(#lineGradient1)" 
              strokeWidth="2.5"
           />
           {/* WA to Core */}
           <motion.path 
              d="M 700,240 C 700,350 700,380 700,530" 
              fill="none" 
              stroke="url(#lineGradient2)" 
              strokeWidth="2.5"
           />
           {/* Unified to Core */}
           <motion.path 
              d="M 1010,260 C 1010,400 800,420 700,530" 
              fill="none" 
              stroke="url(#lineGradient3)" 
              strokeWidth="2.5"
           />

           {/* --- DOTTED CONNECTIONS TO BADGES --- */}
           <path d="M 700,540 Q 600,520 490,480" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 6" className="opacity-50" />
           <circle cx="490" cy="480" r="2.5" fill="#A78BFA" />

           <path d="M 700,540 Q 600,570 480,600" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 6" className="opacity-50" />
           <circle cx="480" cy="600" r="2.5" fill="#A78BFA" />

           <path d="M 700,540 Q 800,520 910,480" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 6" className="opacity-50" />
           <circle cx="910" cy="480" r="2.5" fill="#A78BFA" />

           <path d="M 700,540 Q 800,570 920,600" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 6" className="opacity-50" />
           <circle cx="920" cy="600" r="2.5" fill="#A78BFA" />

           {/* --- ANIMATED PULSES --- */}
           {/* Pulse from Web to Core */}
           <motion.circle r="4.5" fill="#fff" filter="blur(1px)">
              <animateMotion dur="1s" path="M 390,260 C 390,400 600,420 700,530" begin={step === 4 ? "0s" : "indefinite"} fill="freeze" />
              <animate attributeName="opacity" values="0;1;0" dur="1s" begin={step === 4 ? "0s" : "indefinite"} />
           </motion.circle>

           {/* Pulse from WA to Core */}
           <motion.circle r="4.5" fill="#fff" filter="blur(1px)">
              <animateMotion dur="1s" path="M 700,240 C 700,350 700,380 700,530" begin={step === 8 ? "0s" : "indefinite"} fill="freeze" />
              <animate attributeName="opacity" values="0;1;0" dur="1s" begin={step === 8 ? "0s" : "indefinite"} />
           </motion.circle>

           {/* Pulse from Core to Bottom Unified Chat */}
           <motion.circle r="5" fill="#fff" filter="blur(1px)">
              <animateMotion dur="1.2s" path="M 700,600 L 700,750" begin={step === 9 ? "0s" : "indefinite"} fill="freeze" />
              <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin={step === 9 ? "0s" : "indefinite"} />
           </motion.circle>
           
           {/* Pulse from Core to Right Profile */}
           <motion.circle r="5" fill="#fff" filter="blur(1px)">
              <animateMotion dur="1s" path="M 760,530 C 850,530 1100,580 1200,600" begin={step === 9 ? "0s" : "indefinite"} fill="freeze" />
              <animate attributeName="opacity" values="0;1;0" dur="1s" begin={step === 9 ? "0s" : "indefinite"} />
           </motion.circle>

           <defs>
              <linearGradient id="lineGradient1" x1="0" y1="0" x2="1" y2="1">
                 <stop offset="0%" stopColor="#8B5CF6" stopOpacity="1" />
                 <stop offset="100%" stopColor="#5F23C8" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="lineGradient2" gradientUnits="userSpaceOnUse" x1="700" y1="240" x2="700" y2="530">
                 <stop offset="0%" stopColor="#34D399" stopOpacity="1" />
                 <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="lineGradient3" x1="1" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor="#EC4899" stopOpacity="1" />
                 <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
              </linearGradient>
           </defs>
        </svg>

        {/* --- 1. LEFT FEATURES LIST --- */}
        <div className="absolute left-[20px] top-[420px] w-[260px] flex flex-col gap-8 z-10">
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0F111A] border border-white/10 flex items-center justify-center shrink-0 text-[#A78BFA] shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <div>
                 <h5 className="text-[13px] font-bold text-white leading-tight">All channels connected</h5>
                 <p className="text-[11px] text-white/50 leading-snug mt-1.5">Website, WhatsApp, Instagram DM and more.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0F111A] border border-white/10 flex items-center justify-center shrink-0 text-[#A78BFA] shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <div>
                 <h5 className="text-[13px] font-bold text-white leading-tight">One memory</h5>
                 <p className="text-[11px] text-white/50 leading-snug mt-1.5">Every interaction. Every detail. Always in context.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0F111A] border border-white/10 flex items-center justify-center shrink-0 text-[#A78BFA] shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <div>
                 <h5 className="text-[13px] font-bold text-white leading-tight">Instant sync</h5>
                 <p className="text-[11px] text-white/50 leading-snug mt-1.5">Real-time updates across every channel.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0F111A] border border-white/10 flex items-center justify-center shrink-0 text-[#A78BFA] shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div>
                 <h5 className="text-[13px] font-bold text-white leading-tight">One customer view</h5>
                 <p className="text-[11px] text-white/50 leading-snug mt-1.5">Unified profile. Complete conversation history.</p>
              </div>
           </div>
        </div>

        {/* --- 2. TOP LEFT: WEBSITE CARD --- */}
        <div className="absolute left-1/2 ml-[-440px] top-[70px] z-20">
           {/* Floating Badge */}
           <div className="absolute -left-5 -top-5 w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#5F23C8] rounded-xl flex items-center justify-center text-white shadow-[0_10px_25px_rgba(139,92,246,0.5)] z-30 transform -rotate-6">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
           </div>
           
           <motion.div 
              className="w-[260px] bg-white/[0.02] backdrop-blur-xl border border-[#5F23C8]/50 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden"
              initial={{ rotate: -6 }}
              whileHover={{ scale: 1.02, rotate: -4, boxShadow: '0 25px 50px rgba(139,92,246,0.25)' }}
           >
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-2 pl-3">
                    <span className="text-white text-[13px] font-bold">Website</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      {step >= 1 && step <= 4 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75"></span>}
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]"></span>
                    </span>
                    <span className="text-[10px] text-[#8B5CF6] font-semibold">Live</span>
                 </div>
              </div>
              
              <div className="p-3.5 min-h-[220px] pb-4 flex flex-col gap-2 overflow-hidden relative">
                 {step >= 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-0">
                       <span className="text-[10px] text-white/40 font-medium">New visit on Pricing Page</span>
                       <div className="text-[9px] text-white/30">10:24 AM • Bengaluru, India</div>
                    </motion.div>
                 )}
                 
                 <AnimatePresence>
                   {step >= 2 && (
                      <motion.div key="web-msg1" initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex flex-col max-w-[90%] self-end items-end relative mt-1">
                         <div className="px-3 py-2 text-[11px] bg-[#1A1D2D] text-white rounded-2xl rounded-tr-sm border border-white/5">Hi, looking for 100 units pricing.</div>
                         <span className="text-[9px] text-white/40 mt-0.5">10:24 AM</span>
                         {/* Avatar for user */}
                         <div className="absolute -right-1.5 -bottom-2 w-5 h-5 rounded-full border-2 border-[#0A0B10] overflow-hidden bg-slate-600 flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                         </div>
                      </motion.div>
                   )}
                   {step >= 4 && (
                      <motion.div key="web-msg2" initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex flex-col max-w-[90%] self-start items-start relative mt-1">
                         <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center shrink-0 border border-[#10B981]/30">
                            <FrostyIcon size={12} glow={0} />
                         </div>
                         <div className="px-3 py-2 text-[11px] bg-[#2D1B54] text-white rounded-2xl rounded-tl-sm border border-[#5F23C8]/30 flex items-center gap-1.5">
                            <span>I can help! We have bulk discounts. Need a quote?</span>
                         </div>
                      </motion.div>
                   )}
                 </AnimatePresence>

                 {step === 3 && (
                    <motion.div key="web-typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start mt-1 px-3 py-1 flex items-center gap-2 text-[10px] text-white/40">
                       <div className="w-5 h-5 rounded-full bg-[#5F23C8]/40 border border-[#5F23C8] flex items-center justify-center absolute -bottom-1 -right-1 shadow-sm">
                          <FrostyIcon size={10} glow={0} />
                       </div>
                       Frosty is typing...
                       <div className="flex gap-0.5 ml-1">
                          {[0,1,2].map(i => <motion.div key={i} animate={{ opacity: [0.3,1,0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i*0.2 }} className="w-1 h-1 rounded-full bg-[#8B5CF6]" />)}
                       </div>
                    </motion.div>
                 )}
              </div>
           </motion.div>
        </div>

        {/* --- 3. TOP CENTER: WHATSAPP CARD --- */}
        <div className="absolute left-1/2 ml-[-130px] top-[50px] z-20">
           {/* Floating Badge */}
           <div className="absolute -left-5 -top-5 w-10 h-10 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-xl flex items-center justify-center text-white shadow-[0_10px_25px_rgba(37,211,102,0.4)] z-30 transform -rotate-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.69 4.19 1.87 5.84L2 22l4.28-1.85A9.954 9.954 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.23c-1.83 0-3.56-.47-5.06-1.32l-3.32 1.44 1.46-3.24A8.257 8.257 0 013.77 12c0-4.54 3.69-8.23 8.23-8.23s8.23 3.69 8.23 8.23-3.69 8.23-8.23 8.23z"/></svg>
           </div>

           <motion.div 
              className="w-[260px] bg-white/[0.02] backdrop-blur-xl border border-[#25D366]/40 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden"
              whileHover={{ scale: 1.02, y: -2, boxShadow: '0 25px 50px rgba(37,211,102,0.15)' }}
           >
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-2 pl-3">
                    <span className="text-white text-[13px] font-bold">WhatsApp</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      {step >= 6 && step <= 8 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>}
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34D399]"></span>
                    </span>
                    <span className="text-[10px] text-[#34D399] font-semibold">Live</span>
                 </div>
              </div>
              
              <div className="p-3.5 min-h-[220px] flex flex-col gap-2.5 overflow-hidden relative bg-white/[0.02] backdrop-blur-xl">
                 <div className="relative z-10 w-full h-full flex flex-col gap-2.5">
                    {step >= 5 && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-0">
                          <span className="text-[10px] text-white/60 font-medium">New message</span>
                          <div className="text-[9px] text-white/40 mt-0.5">10:25 AM</div>
                       </motion.div>
                    )}
                    <AnimatePresence>
                      {step >= 6 && (
                         <motion.div key="wa-msg1" initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex flex-col max-w-[90%] self-start items-start relative mt-0">
                            <div className="px-3 py-2 text-[11px] bg-[#202C33] text-white rounded-lg rounded-tl-none shadow-sm border border-white/5">Any discounts for bulk orders?</div>
                            <span className="text-[9px] text-white/40 mt-0.5 self-end">10:25 AM</span>
                            <div className="absolute -right-3 -top-2 w-5 h-5 rounded-full border-2 border-[#0A0B10] overflow-hidden bg-slate-600 flex items-center justify-center">
                               <svg className="w-3.5 h-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                         </motion.div>
                      )}
                      {step >= 8 && (
                         <motion.div key="wa-msg2" initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex flex-col max-w-[90%] self-end items-end relative mt-1">
                            <div className="px-3 py-2 text-[11px] bg-[#005C4B] text-white rounded-lg rounded-tr-none shadow-sm flex flex-col gap-1 border border-[#005C4B]">
                               <span>Yes! Here's a quote based on our website chat.</span>
                               <svg className="w-3.5 h-3.5 text-[#53bdeb] self-end mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 10 12 16 9 13"/><polyline points="22 10 16 16 13 13"/></svg>
                            </div>
                         </motion.div>
                      )}
                    </AnimatePresence>
                    {step === 7 && (
                       <motion.div key="wa-typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start mt-1 px-3 py-1 flex items-center gap-2 text-[10px] text-[#25D366]">
                       <div className="w-5 h-5 rounded-full bg-[#5F23C8]/40 border border-[#5F23C8] flex items-center justify-center">
                          <FrostyIcon size={10} glow={0} />
                       </div>
                          Frosty is replying...
                          <div className="flex gap-0.5 ml-1">
                             {[0,1,2].map(i => <motion.div key={i} animate={{ opacity: [0.3,1,0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i*0.2 }} className="w-1 h-1 rounded-full bg-[#25D366]" />)}
                          </div>
                       </motion.div>
                    )}
                 </div>
              </div>
           </motion.div>
        </div>

        {/* --- 4. TOP RIGHT: GMAIL CARD --- */}
        <div className="absolute left-1/2 ml-[180px] top-[70px] z-20">
           {/* Floating Badge */}
           <div className="absolute -left-5 -top-5 w-10 h-10 bg-gradient-to-tr from-[#EA4335] to-[#B31412] rounded-xl flex items-center justify-center text-white shadow-[0_10px_25px_rgba(234,67,53,0.4)] z-30 transform rotate-6">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
           </div>

           <motion.div 
              className="w-[260px] bg-white/[0.02] backdrop-blur-xl border border-[#EA4335]/50 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden"
              initial={{ rotate: 6 }}
              whileHover={{ scale: 1.02, rotate: 4, boxShadow: '0 25px 50px rgba(234,67,53,0.2)' }}
           >
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-2 pl-3">
                    <span className="text-white text-[13px] font-bold">Email</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EA4335]"></span>
                    </span>
                    <span className="text-[10px] text-[#EA4335] font-semibold">Live</span>
                 </div>
              </div>
              
              <div className="p-3.5 min-h-[220px] pb-4 flex flex-col gap-2.5 relative overflow-hidden">
                 <div className="flex items-center gap-2.5 border-b border-white/10 pb-2.5">
                     <img className="w-7 h-7 rounded-full shrink-0 object-cover border border-white/10" src="https://i.pravatar.cc/150?img=68" alt="James Carter" />
                     <div className="flex flex-col">
                         <span className="text-white text-[11px] font-medium leading-tight">James Carter</span>
                         <span className="text-[9px] text-white/40">james.carter@email.com</span>
                     </div>
                 </div>
                 
                 <AnimatePresence>
                   {step >= 1 && (
                      <motion.div key="email-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1.5 mt-0.5">
                         <div className="text-[11px] text-white font-semibold">Bulk order timeline?</div>
                         <div className="text-[10px] text-white/60 leading-relaxed">
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

        {/* --- 5. CENTRAL CORE --- */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[420px] w-[240px] h-[240px] flex items-center justify-center z-30">
           
           {/* Elliptical base rings (Platform) */}
           <motion.div 
              className="absolute top-[50%] left-1/2 ml-[-175px] w-[350px] h-[100px] border-[3px] border-[#C4B5FD] rounded-[100%] shadow-[0_0_30px_#8B5CF6,inset_0_0_30px_#8B5CF6] pointer-events-none"
              style={{ transform: 'translateY(-50%) perspective(500px) rotateX(70deg)' }}
              animate={step >= 4 ? { opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] } : { opacity: 0.5 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           />
           <motion.div 
              className="absolute top-[50%] left-1/2 ml-[-225px] w-[450px] h-[130px] border-2 border-[#A78BFA] rounded-[100%] shadow-[0_0_20px_#8B5CF6,inset_0_0_20px_#8B5CF6] pointer-events-none"
              style={{ transform: 'translateY(-50%) perspective(500px) rotateX(70deg)' }}
              animate={step >= 4 ? { opacity: [0.4, 0.8, 0.4], scale: [1, 1.03, 1] } : { opacity: 0.3 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
           />
           <motion.div 
              className="absolute top-[50%] left-1/2 ml-[-275px] w-[550px] h-[160px] border border-[#8B5CF6] rounded-[100%] shadow-[0_0_10px_#8B5CF6] pointer-events-none"
              style={{ transform: 'translateY(-50%) perspective(500px) rotateX(70deg)' }}
              animate={step >= 4 ? { opacity: [0.2, 0.5, 0.2], scale: [1, 1.02, 1] } : { opacity: 0.2 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
           />
           <motion.div 
              className="absolute top-[50%] left-1/2 ml-[-325px] w-[650px] h-[190px] border border-[#7C3AED] rounded-[100%] shadow-[0_0_5px_#8B5CF6] pointer-events-none"
              style={{ transform: 'translateY(-50%) perspective(500px) rotateX(70deg)' }}
              animate={step >= 4 ? { opacity: [0.1, 0.3, 0.1], scale: [1, 1.01, 1] } : { opacity: 0.1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
           />

           {/* Badge Connector Lines */}
           <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none z-10">
               {/* Left Top -> Center */}
               <motion.path animate={step >= 4 ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.1 }} transition={{ duration: 2, repeat: Infinity }} d="M 300,150 Q 200,100 150,60" fill="none" stroke="#A78BFA" strokeWidth="1.5" />
               <motion.circle animate={step >= 4 ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.2 }} transition={{ duration: 2, repeat: Infinity }} cx="150" cy="60" r="3" fill="#ffffff" className="shadow-[0_0_10px_#ffffff]" />
               
               {/* Left Bottom -> Center */}
               <motion.path animate={step >= 8 ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.1 }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} d="M 300,150 Q 200,200 140,240" fill="none" stroke="#A78BFA" strokeWidth="1.5" />
               <motion.circle animate={step >= 8 ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.2 }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} cx="140" cy="240" r="3" fill="#ffffff" className="shadow-[0_0_10px_#ffffff]" />

               {/* Right Top -> Center */}
               <motion.path animate={step >= 9 ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.1 }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} d="M 300,150 Q 400,100 450,60" fill="none" stroke="#A78BFA" strokeWidth="1.5" />
               <motion.circle animate={step >= 9 ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.2 }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} cx="450" cy="60" r="3" fill="#ffffff" className="shadow-[0_0_10px_#ffffff]" />

               {/* Right Bottom -> Center */}
               <motion.path animate={step >= 10 ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.1 }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }} d="M 300,150 Q 400,200 460,240" fill="none" stroke="#A78BFA" strokeWidth="1.5" />
               <motion.circle animate={step >= 10 ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.2 }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }} cx="460" cy="240" r="3" fill="#ffffff" className="shadow-[0_0_10px_#ffffff]" />
           </svg>



           {/* Core Massive Glow */}
           <motion.div 
              className="absolute inset-[-80px] bg-[#a855f7] rounded-full blur-[90px] z-0 pointer-events-none"
              animate={
                 (step === 4 || step === 8 || step === 9) 
                 ? { opacity: 0.8, scale: 1.3 } 
                 : { opacity: 0.4, scale: 1 }
              }
              transition={{ duration: 0.5 }}
           />
           
           <motion.div 
              className="relative w-[150px] h-[150px] rounded-full bg-black/40 backdrop-blur-2xl border-[3px] border-[#C4B5FD] shadow-[0_0_80px_rgba(167,139,250,1),inset_0_0_60px_rgba(167,139,250,1)] flex flex-col items-center justify-center overflow-hidden z-20"
              animate={
                 (step === 4 || step === 8 || step === 9) 
                 ? { scale: 1.1, borderColor: '#ffffff', boxShadow: '0 0 100px rgba(255,255,255,1),inset 0 0 80px rgba(167,139,250,1)' } 
                 : { scale: 1, borderColor: '#E9D5FF' }
              }
              transition={{ duration: 0.4 }}
           >
              {/* Glass Dome Reflection */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-full opacity-80 pointer-events-none" />

              {/* Inner core pulse */}
              <motion.div 
                 className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.8)_0%,transparent_70%)]"
                 animate={{ opacity: [0.6, 1, 0.6] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="mb-2 relative z-10 flex items-center justify-center drop-shadow-[0_0_15px_#ffffff]">
                 <FrostyIcon size={44} glow={0} />
              </div>
              <span className="text-[16px] font-bold text-white relative z-10 tracking-widest drop-shadow-[0_2px_10px_#ffffff]">Frosty</span>
              <span className="text-[10px] text-[#E9D5FF] relative z-10 tracking-wider drop-shadow-[0_2px_5px_#A78BFA]">Unified Agent</span>
           </motion.div>

           {/* 6. Central Core Floating Badges */}
           <motion.div animate={step >= 4 ? { opacity: 1, x: -10 } : { opacity: 0.3, x: 0 }} className="absolute -left-[140px] top-[20%] text-[11px] bg-white/[0.03] backdrop-blur-md border border-[#A78BFA]/30 px-4 py-1.5 rounded-full text-white/90 whitespace-nowrap shadow-[0_0_15px_rgba(139,92,246,0.2)]">Context stitched</motion.div>
           <motion.div animate={step >= 8 ? { opacity: 1, x: -10 } : { opacity: 0.3, x: 0 }} className="absolute -left-[150px] top-[70%] text-[11px] bg-white/[0.03] backdrop-blur-md border border-[#A78BFA]/30 px-4 py-1.5 rounded-full text-white/90 whitespace-nowrap shadow-[0_0_15px_rgba(139,92,246,0.2)]">Intent recognised</motion.div>
           
           <motion.div animate={step >= 9 ? { opacity: 1, x: 10 } : { opacity: 0.3, x: 0 }} className="absolute -right-[140px] top-[20%] text-[11px] bg-white/[0.03] backdrop-blur-md border border-[#A78BFA]/30 px-4 py-1.5 rounded-full text-white/90 whitespace-nowrap shadow-[0_0_15px_rgba(139,92,246,0.2)]">History unified</motion.div>
           <motion.div animate={step >= 10 ? { opacity: 1, x: 10 } : { opacity: 0.3, x: 0 }} className="absolute -right-[150px] top-[70%] text-[11px] bg-white/[0.03] backdrop-blur-md border border-[#A78BFA]/30 px-4 py-1.5 rounded-full text-white/90 whitespace-nowrap shadow-[0_0_15px_rgba(139,92,246,0.2)]">Memory updated</motion.div>
        </div>

        {/* --- 7. BOTTOM CENTER: UNIFIED CONVERSATION --- */}
        <motion.div 
           className="absolute left-[380px] bottom-[40px] w-[540px] bg-white/[0.02] backdrop-blur-xl border border-[#5F23C8]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-20"
           initial={{ opacity: 0, y: 20 }}
           animate={step >= 9 ? { opacity: 1, y: 0, boxShadow: '0 0 40px rgba(139,92,246,0.2)', pointerEvents: 'auto' } : { opacity: 0, y: 20, boxShadow: 'none', pointerEvents: 'none' }}
           transition={{ duration: 0.5 }}
        >
           <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="text-[14px]">✨</div>
                 <span className="text-white text-[13px] font-bold">Unified Conversation</span>
              </div>
              <div className="flex items-center gap-1.5">
                 <span className="relative flex h-2 w-2">
                   {step >= 12 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75"></span>}
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]"></span>
                 </span>
                 <span className="text-[10px] text-[#8B5CF6] font-semibold">Live</span>
              </div>
           </div>
           
           <div className="p-5 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1A1D2D] border border-white/10 flex items-center justify-center shrink-0">
                 <FrostyIcon size={20} />
              </div>
              <div className="flex-1">
                 <p className="text-white text-[14px] font-bold mb-1.5">Hi James! 👋</p>
                 <p className="text-[12.5px] text-white/70 leading-[1.6]">
                    Thanks for reaching out across different channels.<br/>
                    I can help you with pricing, discounts and delivery timelines for 100 units.<br/>
                    Would you like me to share a quote or connect you with our sales team?
                 </p>
                 <div className="flex gap-2 mt-5">
                    <button className="px-4 py-2 bg-[#5F23C8] text-white text-[11px] font-bold rounded-lg shadow-sm hover:bg-[#7C3AED] transition-colors">Share quote</button>
                    <button className="px-4 py-2 bg-transparent border border-white/10 text-white/80 text-[11px] font-semibold rounded-lg hover:bg-white/5 transition-colors">Connect to sales</button>
                    <button className="px-4 py-2 bg-transparent border border-white/10 text-white/80 text-[11px] font-semibold rounded-lg hover:bg-white/5 transition-colors">More details</button>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* --- 8. RIGHT SIDE: CUSTOMER PROFILE --- */}
        <motion.div 
           className="absolute right-[20px] bottom-[40px] w-[300px] bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-20"
           initial={{ opacity: 0, y: 20 }}
           animate={step >= 10 ? { opacity: 1, y: 0, boxShadow: '0 0 30px rgba(139,92,246,0.1)', pointerEvents: 'auto' } : { opacity: 0, y: 20, boxShadow: 'none', pointerEvents: 'none' }}
           transition={{ duration: 0.5 }}
        >
           <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <span className="text-white/80 text-[12px] font-semibold">Customer Profile</span>
              <span className="text-[#A78BFA] text-[11px] font-semibold cursor-pointer">View full</span>
           </div>
           <div className="p-5">
              <div className="flex items-center gap-3 mb-5">
                 <div className="w-12 h-12 rounded-full border-2 border-white/10 overflow-hidden shrink-0 bg-slate-700 flex items-center justify-center">
                    <img src="https://i.pravatar.cc/150?img=68" alt="James Carter" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <div className="text-white text-[14px] font-bold flex items-center gap-2">
                       James Carter 
                       <motion.span 
                          className="text-[9px] bg-[#311C54] border border-[#5F23C8]/50 px-1.5 py-0.5 rounded text-[#A78BFA] font-bold uppercase tracking-wide"
                          animate={step >= 10 ? { opacity: 1 } : { opacity: 0.4 }}
                       >
                          High Intent
                       </motion.span>
                    </div>
                    <div className="text-[11px] text-white/50 leading-tight mt-1">james.carter@email.com<br/>+1 (415) 555-0198</div>
                 </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                 <span className="text-[10px] bg-[#1A1D2D] px-2.5 py-1.5 rounded-md text-white/70">Pricing page visited</span>
                 <span className="text-[10px] bg-[#1A1D2D] px-2.5 py-1.5 rounded-md text-white/70">Asked about bulk order</span>
                 <span className="text-[10px] bg-[#1A1D2D] px-2.5 py-1.5 rounded-md text-white/70">Interested in delivery</span>
                 <span className="text-[10px] bg-transparent border border-white/10 px-2.5 py-1.5 rounded-md text-white/50">+2 more</span>
              </div>

              <div className="pt-5 border-t border-white/5">
                 <span className="text-white/80 text-[11px] font-semibold mb-4 block">Lead Score</span>
                 <div className="flex items-center gap-6">
                    <div className="relative w-16 h-16 shrink-0">
                       <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                          <motion.path 
                             d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                             fill="none" 
                             stroke={step >= 10 ? "#A78BFA" : "#311C54"} 
                             strokeWidth="4" 
                             strokeDasharray="100, 100" 
                             initial={{ strokeDashoffset: 50 }}
                             animate={step >= 10 ? { strokeDashoffset: 18 } : { strokeDashoffset: 50 }}
                             transition={{ duration: 1 }}
                          />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-white font-bold text-[20px] leading-none">{step >= 10 ? '82' : '50'}</span>
                          <span className="text-white/50 text-[9px] uppercase mt-0.5">{step >= 10 ? 'High' : 'Med'}</span>
                       </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                       <div className="flex justify-between text-[11px]">
                          <span className="text-white/50">Intent</span>
                          <span className={step >= 10 ? "text-white font-bold" : "text-white/50"}>{step >= 10 ? 'High' : 'Med'}</span>
                       </div>
                       <div className="flex justify-between text-[11px]">
                          <span className="text-white/50">Engagement</span>
                          <span className={step >= 10 ? "text-white font-bold" : "text-white/50"}>{step >= 10 ? 'High' : 'Low'}</span>
                       </div>
                       <div className="flex justify-between text-[11px]">
                          <span className="text-white/50">Fit</span>
                          <span className="text-white/80 font-bold">Good.</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>

      </div>

      {/* --- BOTTOM STATS BAR --- */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 mt-16 hidden lg:block">
         <div className="bg-transparent border-t border-b border-[#2A2E44] py-5 px-8 flex justify-between items-center">
           
           {/* Stat 1 */}
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full border border-[#5F23C8]/40 flex items-center justify-center text-[#A78BFA]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
             </div>
             <div>
               <div className="text-white font-bold text-[19px] leading-tight">3x</div>
               <div className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Higher conversion</div>
             </div>
           </div>
           
           <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#2A2E44] to-transparent" />
           
           {/* Stat 2 */}
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full border border-[#5F23C8]/40 flex items-center justify-center text-[#A78BFA]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
             </div>
             <div>
               <div className="text-white font-bold text-[19px] leading-tight">60%</div>
               <div className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Less response time</div>
             </div>
           </div>
           
           <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#2A2E44] to-transparent" />
           
           {/* Stat 3 */}
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full border border-[#5F23C8]/40 flex items-center justify-center text-[#A78BFA]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
             </div>
             <div>
               <div className="text-white font-bold text-[19px] leading-tight">90%</div>
               <div className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Context accuracy</div>
             </div>
           </div>
           
           <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#2A2E44] to-transparent" />
           
           {/* Stat 4 */}
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full border border-[#5F23C8]/40 flex items-center justify-center text-[#A78BFA]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
             </div>
             <div>
               <div className="text-white font-bold text-[19px] leading-tight">24/7</div>
               <div className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Always-on engagement</div>
             </div>
           </div>

         </div>
      </div>

      {/* --- MOBILE FALLBACK --- */}
      <div className="relative w-full max-w-sm mx-auto px-6 flex flex-col gap-6 lg:hidden">
         <p className="text-white/40 text-center text-[12px] italic">Please view on a larger screen for the full interactive visualization.</p>
      </div>

    </section>
  );
}
