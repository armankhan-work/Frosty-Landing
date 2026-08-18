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
              ? 'radial-gradient(circle, rgba(3, 150, 166,0.08) 0%, transparent 70%)'
              : active === 'inbound'
              ? 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)'
              : isHoveringSection 
              ? 'radial-gradient(circle, rgba(3, 150, 166,0.05) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(3, 150, 166,0) 0%, transparent 70%)',
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
                stroke="#0396A6"
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
              className="w-24 h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-slate-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] pointer-events-auto relative z-50"
            >
              <div className="flex items-center justify-center w-full h-full pointer-events-none">
                <FrostyIcon size={40} glow={0.6} />
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
                <motion.line
                  x1="60" y1="80" x2="300" y2="80"
                  stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4"
                />
                <motion.line
                  x1="60" y1="80" x2="300" y2="80"
                  stroke="#0396A6" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
                
                <motion.line
                  x1="300" y1="80" x2="300" y2="260"
                  stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4"
                />
                <motion.line
                  x1="300" y1="80" x2="300" y2="260"
                  stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 3 }}
                />

                <motion.line
                  x1="300" y1="260" x2="60" y2="260"
                  stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4"
                />
                <motion.line
                  x1="300" y1="260" x2="60" y2="260"
                  stroke="#10B981" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 4.5 }}
                />
                
                <motion.line
                  x1="60" y1="260" x2="60" y2="80"
                  stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4"
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
                className="absolute top-[56px] left-[36px] w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-200 z-10 cursor-pointer pointer-events-auto shadow-md"
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.2, type: 'spring' }}
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <User className="w-6 h-6 text-slate-700" />
              </motion.div>

              {/* Node 2: Website (Top Right) */}
              <motion.div 
                className="absolute top-[56px] left-[276px] w-12 h-12 bg-[#F0FDFA] rounded-full flex items-center justify-center border border-[#0396A6]/30 z-10 cursor-pointer pointer-events-auto shadow-md"
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.4, type: 'spring' }}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <Globe className="w-6 h-6 text-[#0396A6]" />
              </motion.div>

              {/* Node 3: Brain (Bottom Right) */}
              <motion.div 
                className="absolute top-[236px] left-[276px] w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center border border-teal-200 z-10 shadow-md cursor-pointer pointer-events-auto"
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.6, type: 'spring' }}
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <Brain className="w-6 h-6 text-[#0396A6]" />
              </motion.div>

              {/* Node 4: WhatsApp (Bottom Left) */}
              <motion.div 
                className="absolute top-[236px] left-[36px] w-12 h-12 bg-green-50 rounded-full flex items-center justify-center border border-green-200 z-10 p-2.5 cursor-pointer pointer-events-auto shadow-md"
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.8, type: 'spring' }}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <img src="/whatsapp.png" alt="WhatsApp" className="w-full h-full object-contain" />
              </motion.div>
              
              {/* Message Bubbles */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="absolute top-[80px] left-[180px] bg-white text-slate-800 text-[10px] p-2 rounded-2xl shadow-lg w-[130px] z-20 leading-tight text-center border border-slate-200 font-medium"
              >
                "plz tell me about ur service on wp on +91 98765 43210"
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.4, delay: 3.5 }}
                className="absolute top-[170px] left-[300px] bg-teal-50 text-[#0396A6] text-[10px] font-bold px-3 py-1 rounded-full border border-teal-200 z-20 shadow-sm"
              >
                Syncing Context...
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.4, delay: 5 }}
                className="absolute top-[260px] left-[180px] bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full border border-green-200 z-20 shadow-sm"
              >
                Context Connected!
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.5, delay: 6.5 }}
                className="absolute top-[170px] left-[60px] bg-[#16A34A] text-white text-[10px] p-2 rounded-2xl shadow-lg w-[130px] z-20 leading-tight text-center font-medium"
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
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-[#0F172A] leading-[1.15] tracking-tight mb-4 sm:mb-6">
            Two agents.<br />
            One <span className="relative">
              <span className="relative z-10 font-bold text-[#0396A6]">conversation.</span>
              <motion.div 
                className="absolute bottom-1 left-0 right-0 h-3 bg-[#0396A6]/10 -z-10 rounded-sm"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            The web and WhatsApp agents share a single memory — so a visitor who starts on your site and finishes on WhatsApp never repeats themselves.
          </p>
        </motion.div>

        {/* Cards Layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_240px_1fr] gap-6 lg:gap-0 items-stretch">
          
          {/* Animated Connecting Lines */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" fill="none">
              <motion.line 
                x1="30%" y1="50%" x2="43%" y2="50%" 
                stroke={active === 'outbound' || isGlowing ? '#0396A6' : '#CBD5E1'} 
                strokeWidth={isGlowing ? "2.5" : "1.5"}
                strokeDasharray="4 4"
                animate={{
                  strokeDashoffset: active === 'outbound' || isGlowing ? [0, -40] : 0,
                  opacity: active === 'outbound' || isGlowing ? 1 : 0.6
                }}
                transition={{ strokeDashoffset: { duration: isGlowing ? 0.5 : 1, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.4 } }}
              />
              <motion.line 
                x1="57%" y1="50%" x2="70%" y2="50%" 
                stroke={active === 'inbound' || isGlowing ? '#10B981' : '#CBD5E1'} 
                strokeWidth={isGlowing ? "2.5" : "1.5"} 
                strokeDasharray="4 4" 
                animate={{
                  strokeDashoffset: active === 'inbound' || isGlowing ? [40, 0] : 0,
                  opacity: active === 'inbound' || isGlowing ? 1 : 0.6
                }}
                transition={{ strokeDashoffset: { duration: isGlowing ? 0.5 : 1, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.4 } }}
              />
            </svg>
          </div>

          {/* LEFT: WEB AGENT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 lg:pr-6 group cursor-pointer perspective-1000"
            onMouseEnter={() => setActive('outbound')}
            onMouseLeave={() => setActive(null)}
          >
            <motion.div 
              className="h-full rounded-2xl p-5 sm:p-8 flex flex-col transition-all duration-500 overflow-hidden relative bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              whileHover={{ scale: 1.02, rotateY: 2, rotateX: 2 }}
              style={{
                borderColor: active === 'outbound' || isGlowing ? '#0396A6' : '#E2E8F0',
                boxShadow: isGlowing 
                  ? '0 0 40px rgba(3, 150, 166,0.15), 0 0 0 4px rgba(3, 150, 166,0.08)'
                  : active === 'outbound' 
                  ? '0 20px 40px -10px rgba(3, 150, 166,0.12), 0 0 0 4px rgba(3, 150, 166,0.06)' 
                  : '0 4px 20px rgba(0,0,0,0.03)',
              }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shadow-sm"
                    animate={{ scale: active === 'outbound' ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Globe className="w-5 h-5 text-[#0396A6]" strokeWidth={2.5} />
                  </motion.div>
                  <div className="px-3 py-1 rounded-full bg-[#0396A6]/10 text-[10px] font-bold text-[#0396A6] tracking-wider uppercase border border-[#0396A6]/20">
                    WEB AGENT
                  </div>
                </div>

                <h3 className="text-base md:text-lg font-bold text-[#0396A6] mb-3">
                  Website Conversion Agent
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8">
                  Engages visitors instantly, answers complex product questions from your verified knowledge base, qualifies intent, and books meetings into your calendar.
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100 relative z-10">
                <p className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                  FOR: WEBSITE VISITORS • INBOUND LEADS • E-COMMERCE
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* CENTRAL BRAIN */}
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
              className="relative w-28 h-28 rounded-full flex items-center justify-center mb-4 transition-all duration-500 bg-white shadow-md"
              whileHover={{ scale: 1.05 }}
              style={{
                border: `2px solid ${isGlowing || active ? '#0396A6' : '#CBD5E1'}`,
                boxShadow: isGlowing || active
                  ? '0 0 35px rgba(3, 150, 166,0.25), inset 0 0 15px rgba(3, 150, 166,0.1)'
                  : '0 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              <Brain 
                className="w-12 h-12 relative z-10 transition-colors duration-500 text-[#0396A6]" 
                strokeWidth={2.5} 
              />
            </motion.div>
            
            <span className="text-[11px] font-bold text-slate-700 text-center leading-tight max-w-[14ch] tracking-wider uppercase">
              Shared contextual memory
            </span>
          </motion.div>

          {/* RIGHT: WHATSAPP AGENT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 lg:pl-6 group cursor-pointer perspective-1000"
            onMouseEnter={() => setActive('inbound')}
            onMouseLeave={() => setActive(null)}
          >
            <motion.div 
              className="h-full rounded-2xl p-5 sm:p-8 flex flex-col transition-all duration-500 overflow-hidden relative bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              whileHover={{ scale: 1.02, rotateY: -2, rotateX: 2 }}
              style={{
                borderColor: active === 'inbound' || isGlowing ? '#10B981' : '#E2E8F0',
                boxShadow: isGlowing
                  ? '0 0 40px rgba(16,185,129,0.15), 0 0 0 4px rgba(16,185,129,0.08)'
                  : active === 'inbound' 
                  ? '0 20px 40px -10px rgba(16,185,129,0.12), 0 0 0 4px rgba(16,185,129,0.06)' 
                  : '0 4px 20px rgba(0,0,0,0.03)',
              }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shadow-sm"
                    animate={{ scale: active === 'inbound' ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <MessageSquare className="w-5 h-5 text-green-600" strokeWidth={2.5} />
                  </motion.div>
                  <div className="px-3 py-1 rounded-full bg-green-50 text-[10px] font-bold text-green-700 tracking-wider uppercase border border-green-200">
                    WHATSAPP AGENT
                  </div>
                </div>

                <h3 className="text-base md:text-lg font-bold text-green-700 mb-3">
                  WhatsApp Conversation Agent
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8">
                  Picks up with full context, handles voice notes, and understands romanised Hinglish the way customers actually type.
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100 relative z-10">
                <p className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                  FOR: 24/7 WHATSAPP ENGAGEMENT • LEAD NURTURE • SUPPORT
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
