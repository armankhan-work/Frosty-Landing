import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Globe, MessageSquare, Brain, User } from 'lucide-react';
import FrostyIcon from '@/components/FrostyIcon';

export default function PremiumTwoAgents() {
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
      className="relative pt-8 lg:pt-12 pb-24 lg:pb-32 overflow-hidden"
      style={{ background: '#FFFFFF' }}
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
              ? 'radial-gradient(circle, rgba(255, 122, 94,0.06) 0%, transparent 70%)'
              : active === 'inbound'
                ? 'radial-gradient(circle, rgba(22,101,52,0.06) 0%, transparent 70%)'
                : isHoveringSection
                  ? 'radial-gradient(circle, rgba(38, 179, 170,0.03) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(38, 179, 170,0) 0%, transparent 70%)',
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
                stroke="#2D6A4F"
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
              className="w-24 h-24 bg-[#E8F5EE] rounded-full flex items-center justify-center border border-[#2D6A4F]/15 shadow-[0_12px_40px_-10px_rgba(45,106,79,0.2)] pointer-events-auto relative z-50"
            >
              <div className="flex items-center justify-center w-full h-full pointer-events-none">
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
                  stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"
                />
                <motion.line
                  x1="60" y1="80" x2="300" y2="80"
                  stroke="#FF7A5E" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />

                {/* Line 2: Website to Brain (Syncing context) */}
                <motion.line
                  x1="300" y1="80" x2="300" y2="260"
                  stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"
                />
                <motion.line
                  x1="300" y1="80" x2="300" y2="260"
                  stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 3 }}
                />

                {/* Line 3: Brain to WhatsApp (Context Connected) */}
                <motion.line
                  x1="300" y1="260" x2="60" y2="260"
                  stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"
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
                  stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"
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
                className="absolute top-[56px] left-[36px] w-12 h-12 bg-gradient-to-tr from-gray-100 to-white rounded-full flex items-center justify-center border border-gray-200 z-10 cursor-pointer pointer-events-auto"
                initial={{ scale: 0 }}
                animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                transition={{ delay: 0.2, type: 'spring' }}
                whileHover={{ scale: 1.25, rotate: -10, boxShadow: "0px 20px 40px -5px rgba(0, 0, 0, 0.4)" }}
              >
                <User className="w-6 h-6 text-gray-700" />
              </motion.div>

              {/* Node 2: Website (Top Right) */}
              <motion.div
                className="absolute top-[56px] left-[276px] w-12 h-12 bg-gradient-to-tr from-blue-100 to-blue-50 rounded-full flex items-center justify-center border border-blue-200 z-10 cursor-pointer pointer-events-auto"
                initial={{ scale: 0 }}
                animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                transition={{ delay: 0.4, type: 'spring' }}
                whileHover={{ scale: 1.25, rotate: 10, boxShadow: "0px 20px 40px -5px rgba(59, 130, 246, 0.8)" }}
              >
                <Globe className="w-6 h-6 text-blue-600" />
              </motion.div>

              {/* Node 3: Brain (Bottom Right) */}
              <motion.div
                className="absolute top-[236px] left-[276px] w-12 h-12 bg-gradient-to-tr from-teal-100 to-teal-50 rounded-full flex items-center justify-center border border-teal-200 z-10 shadow-[0_0_15px_rgba(38, 179, 170,0.3)] cursor-pointer pointer-events-auto"
                initial={{ scale: 0 }}
                animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                transition={{ delay: 0.6, type: 'spring' }}
                whileHover={{ scale: 1.25, rotate: -10, boxShadow: "0px 20px 40px -5px rgba(168, 85, 247, 0.8)" }}
              >
                <Brain className="w-6 h-6 text-teal-600" />
              </motion.div>

              {/* Node 4: WhatsApp (Bottom Left) */}
              <motion.div
                className="absolute top-[236px] left-[36px] w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-100 z-10 p-2.5 cursor-pointer pointer-events-auto"
                initial={{ scale: 0 }}
                animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                transition={{ delay: 0.8, type: 'spring' }}
                whileHover={{ scale: 1.25, rotate: 10, boxShadow: "0px 20px 40px -5px rgba(34, 197, 94, 0.8)" }}
              >
                <img src="/whatsapp.png" alt="WhatsApp" className="w-full h-full object-contain" />
              </motion.div>

              {/* Message Bubble 1: User to Website */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="absolute top-[80px] left-[180px] bg-blue-500 text-white text-[10px] p-2 rounded-2xl shadow-xl w-[130px] z-20 leading-tight text-center border border-blue-400"
              >
                "plz tell me about ur service on wp on +91 98765 43210"
              </motion.div>

              {/* Message Bubble 2: Website to Brain (Syncing) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.4, delay: 3.5 }}
                className="absolute top-[170px] left-[300px] bg-teal-100 text-teal-700 text-[10px] font-bold px-3 py-1 rounded-full border border-teal-200 z-20 shadow-sm"
              >
                Syncing Context...
              </motion.div>

              {/* Message Bubble 3: Brain to WP (Connected) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.4, delay: 5 }}
                className="absolute top-[260px] left-[180px] bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full border border-green-200 z-20 shadow-sm"
              >
                Context Connected!
              </motion.div>

              {/* Message Bubble 4: WP to User */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.5, delay: 6.5 }}
                className="absolute top-[170px] left-[60px] bg-green-500 text-white text-[10px] p-2 rounded-2xl shadow-xl w-[130px] z-20 leading-tight text-center border border-green-400"
              >
                "Hi! Here is the detailed info on our services..."
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-[1300px] mx-auto px-6 lg:px-10 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 max-w-[700px] mx-auto"
        >
          <h2 className="text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.05] tracking-tight text-[#132A1F] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Two agents.<br />
            One <span className="relative">
              <span className="relative z-10 italic text-[#26B3AA]">conversation.</span>
              <motion.div
                className="absolute bottom-1 left-0 right-0 h-3 bg-[#CCFBF1] -z-10 rounded-sm"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </h2>
          <p className="text-[17px] text-[#5B6B63] leading-[1.6]">
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
                stroke={active === 'outbound' || isGlowing ? '#FF7A5E' : '#E5E7EB'}
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
                stroke={active === 'inbound' || isGlowing ? '#166534' : '#E5E7EB'}
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
              className="h-full rounded-2xl p-8 flex flex-col transition-all duration-500 overflow-hidden relative bg-white"
              whileHover={{ scale: 1.02, rotateY: 2, rotateX: 2 }}
              style={{
                background: '#F4F9FE',
                border: `1px solid ${active === 'outbound' || isGlowing ? '#BAE6FD' : '#E0F2FE'}`,
                boxShadow: isGlowing
                  ? '0 0 40px rgba(255, 122, 94,0.3), 0 0 0 4px rgba(255, 122, 94,0.15)'
                  : active === 'outbound'
                    ? '0 32px 64px -16px rgba(255, 122, 94,0.12), 0 0 0 4px rgba(255, 122, 94,0.05)'
                    : '0 8px 24px -8px rgba(255, 122, 94,0.06)',
              }}
            >
              {/* Inner Glow Gradient on Hover */}
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E0F2FE] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white border border-[#E0F2FE] flex items-center justify-center shadow-sm"
                    animate={{ scale: active === 'outbound' ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Globe className="w-5 h-5 text-black" strokeWidth={2.5} />
                  </motion.div>
                  <div className="px-3 py-1 rounded-full bg-[#E0F2FE] text-[10px] font-bold text-[#FF7A5E] tracking-wider uppercase">
                    WEB AGENT
                  </div>
                </div>

                <h3 className="text-[26px] font-bold text-[#FF7A5E] mb-3 font-serif leading-tight">
                  Website Conversion Agent
                </h3>
                <p className="text-[14px] text-[#5B6B63] leading-[1.6] mb-8">
                  Engages visitors instantly, answers complex product questions from your verified knowledge base, qualifies intent, and books meetings into your calendar.
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-[#E0F2FE] relative z-10">
                <p className="text-[11px] font-bold tracking-wider uppercase text-[#5B6B63]">
                  FOR: WEBSITE VISITORS • INBOUND LEADS • E-COMMERCE
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
            onMouseEnter={() => setActive(active ? null : 'outbound')} // Mini interaction: hovering brain pulses
            onClick={handleBrainClick}
          >
            <motion.div
              className="relative w-28 h-28 rounded-full flex items-center justify-center mb-4 transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              style={{
                background: isGlowing ? '#F0FDFA' : active === 'outbound' ? '#FF7A5E' : active === 'inbound' ? '#166534' : '#F0FDFA',
                border: `1px solid ${isGlowing ? '#5EEAD4' : active === 'outbound' ? '#FF7A5E' : active === 'inbound' ? '#166534' : '#CCFBF1'}`,
                boxShadow: isGlowing
                  ? '0 0 50px rgba(38, 179, 170,0.4), 0 0 0 6px rgba(38, 179, 170,0.2)'
                  : active === 'outbound'
                    ? '0 12px 32px -8px rgba(255, 122, 94,0.5)'
                    : active === 'inbound'
                      ? '0 12px 32px -8px rgba(22,101,52,0.5)'
                      : '0 0 0 4px rgba(245,243,255,0.5)',
              }}
            >
              <AnimatePresence>
                {active && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 bg-white opacity-20 blur-sm rounded-full"
                  />
                )}
              </AnimatePresence>
              <Brain
                className="w-12 h-12 relative z-10 transition-colors duration-500"
                strokeWidth={2.5}
                style={{ color: 'black' }}
              />
            </motion.div>

            <span className="text-[11px] font-bold text-[#2D6A4F] text-center leading-tight max-w-[14ch]">
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
              className="h-full rounded-2xl p-8 flex flex-col transition-all duration-500 overflow-hidden relative bg-white"
              whileHover={{ scale: 1.02, rotateY: -2, rotateX: 2 }}
              style={{
                background: '#F4fdf8',
                border: `1px solid ${active === 'inbound' || isGlowing ? '#BBF7D0' : '#DCFCE7'}`,
                boxShadow: isGlowing
                  ? '0 0 40px rgba(22,101,52,0.3), 0 0 0 4px rgba(22,101,52,0.15)'
                  : active === 'inbound'
                    ? '0 32px 64px -16px rgba(22,101,52,0.12), 0 0 0 4px rgba(22,101,52,0.05)'
                    : '0 8px 24px -8px rgba(22,101,52,0.06)',
              }}
            >
              {/* Inner Glow Gradient on Hover */}
              <div
                className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#DCFCE7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white border border-[#DCFCE7] flex items-center justify-center shadow-sm"
                    animate={{ scale: active === 'inbound' ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <MessageSquare className="w-5 h-5 text-black" strokeWidth={2.5} />
                  </motion.div>
                  <div className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[10px] font-bold text-[#166534] tracking-wider uppercase">
                    WHATSAPP AGENT
                  </div>
                </div>

                <h3 className="text-[26px] font-bold text-[#166534] mb-3 font-serif leading-tight">
                  WhatsApp Conversation Agent
                </h3>
                <p className="text-[14px] text-[#5B6B63] leading-[1.6] mb-8">
                  Picks up with full context, handles voice notes, and understands romanised Hinglish the way customers actually type.
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-[#DCFCE7] relative z-10">
                <p className="text-[11px] font-bold tracking-wider uppercase text-[#5B6B63]">
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
