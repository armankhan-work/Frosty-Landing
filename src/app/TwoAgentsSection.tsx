'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Globe, MessageSquare, Brain, User } from 'lucide-react';
import FrostyIcon from '@/components/FrostyIcon';

export default function TwoAgentsSection() {
  const [active, setActive] = useState<'outbound' | 'inbound' | null>(null);
  
  // Mouse tracking for whole section spotlight
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);

  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
   
  // Drag coordinates for the logo thread
  const logoDragX = useMotionValue(0);
  const logoDragY = useMotionValue(0);
  // Transform coordinates so the line connects to the top center of the logo
  const threadX2 = useTransform(logoDragX, x => x + 48);
  const threadY2 = useTransform(logoDragY, y => y + 80);
  
  const [isHoveringSection, setIsHoveringSection] = useState(false);
  const [logoDropped, setLogoDropped] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const glowTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBrainClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const newDropped = !logoDropped;
    setLogoDropped(newDropped);
    
    if (newDropped) {
      setIsGlowing(true);
      if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);
      glowTimeoutRef.current = setTimeout(() => {
        setIsGlowing(false);
      }, 2000);
    } else {
      setIsGlowing(false);
      if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Center the spotlight initially
  useEffect(() => {
    if (sectionRef.current) {
      const { width, height } = sectionRef.current.getBoundingClientRect();
      mouseX.set(width / 2);
      mouseY.set(height / 2);
    }
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={sectionRef}
      className="relative pt-8 lg:pt-12 pb-12 lg:pb-16 overflow-hidden bg-transparent"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringSection(true)}
      onMouseLeave={() => {
        setIsHoveringSection(false);
        setActive(null);
      }}
    >
      
      {/* Interactive Section-Wide Spotlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: 800,
            height: 800,
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            background: active === 'outbound'
              ? 'radial-gradient(circle, rgba(95, 35, 200,0.15) 0%, transparent 70%)'
              : active === 'inbound'
              ? 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)'
              : isHoveringSection 
              ? 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139,92,246,0) 0%, transparent 70%)',
            scale: isHoveringSection ? 1 : 0.8,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Dropping Logo Animation */}
      <AnimatePresence>
        {logoDropped && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 10, stiffness: 80, mass: 1 }}
            className="absolute top-0 left-12 lg:left-32 flex flex-col items-center z-50 pointer-events-none"
          >
            {/* Dynamic stretchy thread */}
            <svg className="absolute top-0 left-0 w-full h-[500px] pointer-events-none z-0" style={{ overflow: 'visible' }}>
              <motion.line 
                x1={48} 
                y1={0} 
                x2={threadX2} 
                y2={threadY2} 
                stroke="#5F23C8"
                strokeWidth="2.5"
                strokeOpacity="0.4"
                strokeLinecap="round"
              />
            </svg>
            <motion.div 
              drag
              dragSnapToOrigin={true}
              dragElastic={0.6}
              style={{ x: logoDragX, y: logoDragY, marginTop: 80, cursor: "grab" }}
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              className="w-24 h-24 bg-white/[0.05] backdrop-blur-md rounded-full flex items-center justify-center border border-white/[0.15] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] pointer-events-auto relative z-50"
            >
              <div className="flex items-center justify-center w-full h-full pointer-events-none drop-shadow-[0_0_15px_rgba(95,35,200,0.5)]">
                <FrostyIcon size={40} glow={0} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Shared Memory Circular Animation Popup */}
      <AnimatePresence>
        {logoDropped && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 50 }}
            className="absolute -top-4 right-4 lg:right-10 z-50 w-[360px] pointer-events-none hidden md:block"
          >
            <div className="relative w-[360px] h-[340px] mx-auto pointer-events-none">
              
              {/* SVG Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                {/* Line 1: User to Website */}
                <motion.line
                  x1="60" y1="80" x2="300" y2="80"
                  stroke="#334155" strokeWidth="2" strokeDasharray="4 4"
                />
                <motion.line
                  x1="60" y1="80" x2="300" y2="80"
                  stroke="#5F23C8" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
                
                {/* Line 2: Website to Brain (Syncing context) */}
                <motion.line
                  x1="300" y1="80" x2="300" y2="260"
                  stroke="#334155" strokeWidth="2" strokeDasharray="4 4"
                />
                <motion.line
                  x1="300" y1="80" x2="300" y2="260"
                  stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 3 }}
                />

                {/* Line 3: Brain to WhatsApp (Context Connected) */}
                <motion.line
                  x1="300" y1="260" x2="60" y2="260"
                  stroke="#334155" strokeWidth="2" strokeDasharray="4 4"
                />
                <motion.line
                  x1="300" y1="260" x2="60" y2="260"
                  stroke="#10B981" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 4.5 }}
                />
                
                {/* Line 4: WhatsApp to User */}
                <motion.line
                  x1="60" y1="260" x2="60" y2="80"
                  stroke="#334155" strokeWidth="2" strokeDasharray="4 4"
                />
                <motion.line
                  x1="60" y1="260" x2="60" y2="80"
                  stroke="#10B981" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 6 }}
                />
              </svg>

              {/* Node 1: User (Top Left) */}
              <motion.div 
                className="absolute top-[56px] left-[36px] w-12 h-12 bg-white/[0.05] backdrop-blur-md rounded-full flex items-center justify-center border border-white/[0.1] z-10 cursor-pointer pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.2, type: 'spring' }}
                whileHover={{ scale: 1.25, rotate: -10, boxShadow: "0px 20px 40px -5px rgba(0, 0, 0, 0.7)" }}
              >
                <User className="w-6 h-6 text-white" />
              </motion.div>

              {/* Node 2: Website (Top Right) */}
              <motion.div 
                className="absolute top-[56px] left-[276px] w-12 h-12 bg-[#5F23C8]/10 backdrop-blur-md rounded-full flex items-center justify-center border border-[#5F23C8]/20 z-10 cursor-pointer pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.4, type: 'spring' }}
                whileHover={{ scale: 1.25, rotate: 10, boxShadow: "0px 20px 40px -5px rgba(95, 35, 200, 0.4)" }}
              >
                <Globe className="w-6 h-6 text-[#5F23C8]" />
              </motion.div>

              {/* Node 3: Brain (Bottom Right) */}
              <motion.div 
                className="absolute top-[236px] left-[276px] w-12 h-12 bg-[#8B5CF6]/10 backdrop-blur-md rounded-full flex items-center justify-center border border-[#8B5CF6]/20 z-10 shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-pointer pointer-events-auto"
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.6, type: 'spring' }}
                whileHover={{ scale: 1.25, rotate: -10, boxShadow: "0px 20px 40px -5px rgba(139, 92, 246, 0.4)" }}
              >
                <Brain className="w-6 h-6 text-[#A78BFA]" />
              </motion.div>

              {/* Node 4: WhatsApp (Bottom Left) */}
              <motion.div 
                className="absolute top-[236px] left-[36px] w-12 h-12 bg-[#10B981]/10 backdrop-blur-md rounded-full flex items-center justify-center border border-[#10B981]/20 z-10 p-2.5 cursor-pointer pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.8, type: 'spring' }}
                whileHover={{ scale: 1.25, rotate: 10, boxShadow: "0px 20px 40px -5px rgba(16, 185, 129, 0.4)" }}
              >
                <img src="/whatsapp.png" alt="WhatsApp" className="w-full h-full object-contain" />
              </motion.div>
              
              {/* Message Bubbles */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="absolute top-[80px] left-[180px] bg-[#1E293B] text-white text-[10px] p-2 rounded-2xl shadow-xl w-[130px] z-20 leading-tight text-center border border-[#334155]"
              >
                "plz tell me about ur service on wp on this no 769292XXXX"
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.4, delay: 3.5 }}
                className="absolute top-[170px] left-[300px] bg-[#8B5CF6]/20 backdrop-blur-md text-[#C4B5FD] text-[10px] font-bold px-3 py-1 rounded-full border border-[#8B5CF6]/40 z-20 shadow-sm"
              >
                Syncing Context...
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.4, delay: 5 }}
                className="absolute top-[260px] left-[180px] bg-[#10B981]/20 backdrop-blur-md text-[#6EE7B7] text-[10px] font-bold px-3 py-1 rounded-full border border-[#10B981]/40 z-20 shadow-sm"
              >
                Context Connected!
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.5, delay: 6.5 }}
                className="absolute top-[170px] left-[60px] bg-[#10B981] text-white text-[10px] p-2 rounded-2xl shadow-xl w-[130px] z-20 leading-tight text-center border border-[#059669]"
              >
                "Hi! Here is the detailed info on our services..."
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 max-w-[700px] mx-auto"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-4 sm:mb-6">
            Two agents.<br />
            One <span className="relative">
              <span className="relative z-10 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#5F23C8] via-[#5F23C8] to-[#5F23C8]">conversation.</span>
              <motion.div 
                className="absolute bottom-1 left-0 right-0 h-3 bg-[#5F23C8]/20 -z-10 rounded-sm"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            The web and WhatsApp agents share a single memory — so a visitor who starts on your site and finishes on WhatsApp never repeats themselves.
          </p>
        </motion.div>

        {/* ── Cards Layout ── */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_240px_1fr] gap-6 lg:gap-0 items-stretch">
          
          {/* Animated Connecting Lines (Desktop) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" fill="none">
              {/* Left dashed line */}
              <motion.line 
                x1="30%" y1="50%" x2="43%" y2="50%" 
                stroke={active === 'outbound' || isGlowing ? '#5F23C8' : '#334155'} 
                strokeWidth={isGlowing ? "2.5" : "1.5"}
                strokeDasharray="4 4"
                animate={{
                  strokeDashoffset: active === 'outbound' || isGlowing ? [0, -40] : 0,
                  opacity: active === 'outbound' || isGlowing ? 1 : 0.4
                }}
                transition={{ strokeDashoffset: { duration: isGlowing ? 0.5 : 1, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.4 } }}
              />
              {/* Right dashed line */}
              <motion.line 
                x1="57%" y1="50%" x2="70%" y2="50%" 
                stroke={active === 'inbound' || isGlowing ? '#10B981' : '#334155'} 
                strokeWidth={isGlowing ? "2.5" : "1.5"} 
                strokeDasharray="4 4" 
                animate={{
                  strokeDashoffset: active === 'inbound' || isGlowing ? [40, 0] : 0,
                  opacity: active === 'inbound' || isGlowing ? 1 : 0.4
                }}
                transition={{ strokeDashoffset: { duration: isGlowing ? 0.5 : 1, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.4 } }}
              />
            </svg>
          </div>

          {/* ═══ LEFT: OUTBOUND CARD ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 lg:pr-6 group cursor-pointer perspective-1000"
            onMouseEnter={() => setActive('outbound')}
            onMouseLeave={() => setActive(null)}
          >
            {/* 3D Tilt Wrapper */}
            <motion.div 
              className="h-full rounded-2xl p-5 sm:p-8 flex flex-col transition-all duration-500 overflow-hidden relative bg-[#121212]/80 backdrop-blur-xl"
              whileHover={{ scale: 1.02, rotateY: 2, rotateX: 2 }}
              style={{
                border: `1px solid ${active === 'outbound' || isGlowing ? '#5F23C8' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isGlowing 
                  ? '0 0 40px rgba(95, 35, 200,0.3), 0 0 0 4px rgba(95, 35, 200,0.15)'
                  : active === 'outbound' 
                  ? '0 32px 64px -16px rgba(95, 35, 200,0.2), 0 0 0 4px rgba(95, 35, 200,0.1)' 
                  : '0 8px 24px -8px rgba(0,0,0,0.5)',
              }}
            >
              {/* Inner Glow Gradient on Hover */}
              <div 
                className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#5F23C8]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" 
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center shadow-sm"
                    animate={{ scale: active === 'outbound' ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Globe className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </motion.div>
                  <div className="px-3 py-1 rounded-full bg-[#5F23C8]/10 text-[10px] font-bold text-[#5F23C8] tracking-wider uppercase border border-[#5F23C8]/20">
                    OUTBOUND
                  </div>
                </div>

                <h3 className="text-base md:text-lg font-semibold text-[#5F23C8] mb-3">
                  Sales and Outreach Calling
                </h3>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6 sm:mb-8">
                  Upload your lead list or connect your CRM. The agent dials, pitches, qualifies, and books. It runs hundreds of conversations in parallel while your reps focus on closing.
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.08)] relative z-10">
                <p className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                  FOR: REAL ESTATE • FINANCE • SALES TEAMS
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ═══ CENTRAL BRAIN ═══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-20 flex flex-col items-center justify-center py-4 lg:py-0 cursor-pointer"
            onMouseEnter={() => setIsGlowing(true)}
            onMouseLeave={() => setIsGlowing(false)}
            onClick={handleBrainClick}
          >
            <motion.div 
              className="relative w-28 h-28 rounded-full flex items-center justify-center mb-4 transition-all duration-500 bg-[#0A1026]"
              whileHover={{ scale: 1.05 }}
              style={{
                border: `1px solid ${isGlowing || active ? '#5F23C8' : 'rgba(99, 90, 128,0.2)'}`,
                boxShadow: isGlowing || active
                  ? '0 0 40px rgba(99, 90, 128,0.5), inset 0 0 20px rgba(99, 90, 128,0.3)'
                  : '0 0 20px rgba(99, 90, 128,0.15), inset 0 0 10px rgba(99, 90, 128,0.1)',
              }}
            >
              <AnimatePresence>
                {(isGlowing || active) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(99, 90, 128,0.25) 0%, rgba(95, 35, 200,0.15) 60%, transparent 100%)',
                      filter: 'blur(4px)'
                    }}
                  />
                )}
              </AnimatePresence>
              <Brain 
                className="w-12 h-12 relative z-10 transition-colors duration-500" 
                strokeWidth={2.5} 
                style={{ 
                  color: isGlowing || active ? '#5F23C8' : '#5F23C8',
                  filter: isGlowing || active ? 'drop-shadow(0 0 10px rgba(99, 90, 128,0.8))' : 'drop-shadow(0 0 4px rgba(95, 35, 200,0.4))'
                }}
              />
            </motion.div>
            
            <span className="text-[11px] font-bold text-slate-300 text-center leading-tight max-w-[14ch] tracking-wider uppercase">
              Shared contextual memory
            </span>
          </motion.div>

          {/* ═══ RIGHT: INBOUND CARD ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 lg:pl-6 group cursor-pointer perspective-1000"
            onMouseEnter={() => setActive('inbound')}
            onMouseLeave={() => setActive(null)}
          >
            {/* 3D Tilt Wrapper */}
            <motion.div 
              className="h-full rounded-2xl p-5 sm:p-8 flex flex-col transition-all duration-500 overflow-hidden relative bg-[#121212]/80 backdrop-blur-xl"
              whileHover={{ scale: 1.02, rotateY: -2, rotateX: 2 }}
              style={{
                border: `1px solid ${active === 'inbound' || isGlowing ? '#10B981' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isGlowing
                  ? '0 0 40px rgba(16,185,129,0.3), 0 0 0 4px rgba(16,185,129,0.15)'
                  : active === 'inbound' 
                  ? '0 32px 64px -16px rgba(16,185,129,0.2), 0 0 0 4px rgba(16,185,129,0.1)' 
                  : '0 8px 24px -8px rgba(0,0,0,0.5)',
              }}
            >
              {/* Inner Glow Gradient on Hover */}
              <div 
                className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#10B981]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none" 
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center shadow-sm"
                    animate={{ scale: active === 'inbound' ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <MessageSquare className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </motion.div>
                  <div className="px-3 py-1 rounded-full bg-[#10B981]/10 text-[10px] font-bold text-[#34D399] tracking-wider uppercase border border-[#10B981]/20">
                    INBOUND
                  </div>
                </div>

                <h3 className="text-base md:text-lg font-semibold text-[#34D399] mb-3">
                  Support and Query Resolution
                </h3>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6 sm:mb-8">
                  Every inbound call is answered instantly. The agent resolves common queries, collects information, and escalates only what truly needs a human, with full context handed over.
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.08)] relative z-10">
                <p className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                  FOR: CUSTOMER SUPPORT • FINANCE • REAL ESTATE
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
