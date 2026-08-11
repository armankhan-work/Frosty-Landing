import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import {
  Globe, MessageCircle, CalendarDays, BarChart3,
} from 'lucide-react';

/* ─── Feature pills ─── */
const featurePills = [
  { text: 'Instant Replies', icon: '⚡' },
  { text: 'Books Meetings', icon: '📅' },
  { text: '24/7 Support', icon: '🎧' },
  { text: 'In Your Voice', icon: '✓' },

];


const ICON_BUBBLES = [
  { id: 'globe',     label: 'Global Reach',  desc: 'Connect with customers anywhere in the world', icon: Globe,         color: '#1B4332',  deg: 225, size: 56, floatY: 6, floatDur: 5.0, delay: 0 },
  { id: 'whatsapp',  label: 'WhatsApp Sync', desc: 'Instantly reply and capture leads on WhatsApp', icon: MessageCircle, color: '#25D366',  deg: 315, size: 50, floatY: 8, floatDur: 4.6, delay: 0.4 },
  { id: 'analytics', label: 'Live Analytics',desc: 'Track performance and intent in real-time', icon: BarChart3,     color: '#E1306C',  deg: 135, size: 54, floatY: 7, floatDur: 5.4, delay: 0.8 },
  { id: 'calendar',  label: 'Auto Booking',  desc: 'Seamlessly schedule meetings 24/7',  icon: CalendarDays,  color: '#2D6A4F',  deg: 45,  size: 48, floatY: 5, floatDur: 5.8, delay: 0.6 },
];

/* ═══════════════════════════════════════════════════════ */

export default function PremiumHero() {
  const [isGlowing, setIsGlowing] = useState(false);
  const [isHoveringOrb, setIsHoveringOrb] = useState(false);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const [isSuckedIn, setIsSuckedIn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSequenceClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsGlowing(true);
    setOrbitRotation(prev => prev + 270);
    
    // After rotation finishes (2.5s), suck icons into the center
    setTimeout(() => setIsSuckedIn(true), 2500);
    // After they go in, pop them back out
    setTimeout(() => setIsSuckedIn(false), 3300);
    // Sequence complete
    setTimeout(() => {
      setIsGlowing(false);
      setIsAnimating(false);
    }, 4000);
  };
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-white overflow-hidden font-sans">

      {/* ═══ WAVE BACKGROUND IMAGE ═══ */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/hero-waves.png"
          alt=""
          className="absolute top-0 right-0 w-[70%] h-full object-cover object-left"
          style={{ opacity: 0.85 }}
          draggable={false}
        />
        {/* Fade to white on left */}
        <div
          className="absolute inset-y-0 left-0 w-[45%]"
          style={{ background: 'linear-gradient(to right, white 40%, transparent 100%)' }}
        />
        {/* Slight fade at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[15%]"
          style={{ background: 'linear-gradient(to top, white, transparent)' }}
        />
      </div>

      {/* ═══ SUBTLE GLOW BEHIND ORB AREA ═══ */}
      <div className="absolute top-[15%] right-[8%] w-[40%] h-[50%] rounded-full bg-white/40 blur-[60px] pointer-events-none" />

      {/* ═══ HERO CONTENT ═══ */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-12 pt-20 lg:pt-28">
        <div className="flex flex-col lg:flex-row items-center min-h-[calc(100vh-220px)] py-16 lg:py-0 gap-12 lg:gap-8">

          {/* ── LEFT SIDE (50%) ── */}
          <div className="w-full lg:w-[50%] flex flex-col justify-center relative z-20 xl:pr-10">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/10 mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span className="text-[13px] font-semibold text-[#2D6A4F] tracking-wide uppercase">Powered by Frostrek LLP</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <h1 className="tracking-[-0.02em] leading-[1.06]">
                <span
                  className="block text-[42px] sm:text-[52px] lg:text-[58px] xl:text-[64px] italic font-normal text-[#2D6A4F]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Frosty agent -
                </span>
                <span className="block text-[38px] sm:text-[48px] lg:text-[54px] xl:text-[60px] font-extrabold text-[#0F172A] mt-1">
                  Never lose a lead
                </span>
                <span className="block text-[38px] sm:text-[48px] lg:text-[54px] xl:text-[60px] font-extrabold text-[#0F172A]">
                  to a slow reply again.
                </span>
              </h1>
            </motion.div>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[16px] sm:text-[17px] leading-[1.7] text-[#64748B] max-w-[440px] mb-8"
            >
              Frosty answers every website and WhatsApp enquiry in seconds, qualifies it, books the meeting, and hands your team a warm lead - 24/7, in your brand's voice.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-2 sm:gap-2.5 mb-8 w-full max-w-full overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-hide flex-nowrap"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {featurePills.map((pill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    boxShadow: "0 8px 20px -4px rgba(45, 106, 79, 0.15)",
                    borderColor: "rgba(45, 106, 79, 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    delay: 0.55 + i * 0.08,
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-[rgba(45,106,79,.1)] shadow-[0_1px_3px_rgba(0,0,0,.04)] cursor-pointer whitespace-nowrap group relative overflow-hidden flex-shrink-0"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" 
                  />
                  <motion.span 
                    className="text-[14px]"
                    whileHover={{ rotate: [0, -15, 15, -15, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {pill.icon}
                  </motion.span>
                  <span className="text-[13px] font-semibold text-[#0F172A]/80 group-hover:text-[#2D6A4F] transition-colors relative z-10">{pill.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
            >
              <a 
                href="http://bot.candoramigo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-[56px] px-8 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] !text-white text-[16px] font-bold flex items-center gap-2.5 hover:scale-[1.03] shadow-[0_8px_24px_-6px_rgba(45,106,79,0.45)] hover:shadow-[0_20px_40px_-10px_rgba(45,106,79,0.6)] border border-[#40916C]/40 transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">Try Frosty Free</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
              <button className="h-[56px] px-6 text-[#0F172A] text-[16px] font-semibold flex items-center gap-3 bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#CBD5E1] rounded-full transition-all duration-300 group hover:-translate-y-0.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center shadow-inner border border-gray-200/50 group-hover:from-white group-hover:to-gray-100 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300">
                  <Play className="w-3.5 h-3.5 ml-0.5 fill-[#0F172A]/70 group-hover:fill-[#2D6A4F] text-transparent transition-colors duration-300" />
                </div>
                See how it works
              </button>
            </motion.div>


            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8 lg:mt-10"
            >
              <div className="flex items-center -space-x-3">
                {[43, 21, 64, 45].map((imgId, i) => (
                  <div key={i} className="w-[42px] h-[42px] rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-100 relative z-10" style={{ zIndex: 10 - i }}>
                    <img 
                      src={`https://i.pravatar.cc/100?img=${imgId}`} 
                      alt={`User ${i}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-[15px] font-medium text-[#475569]">
                Join a growing community of <span className="font-semibold text-[#0F172A]">forward-thinking teams</span>
              </p>
            </motion.div>

          </div>

          {/* ── RIGHT SIDE (50%) - Illustration ── */}
          <div className="w-full lg:w-[50%] relative min-h-[500px] lg:min-h-[580px]">

            {/* ═══ ORBITAL RING CONTAINER ═══ */}
            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] lg:w-[540px] lg:h-[540px] z-10 pointer-events-none">
              {/* Spinning Dashed Ring */}
              <motion.div
                animate={{ rotate: orbitRotation }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-[1.5px] border-dashed"
                style={{ 
                  borderColor: isGlowing || isHoveringOrb ? '#2D6A4F' : 'rgba(45,106,79,0.3)',
                  opacity: isGlowing || isHoveringOrb ? 0.6 : 0.4,
                  transition: 'all 0.5s ease'
                }}
              />
              
              {/* ═══ FLOATING ICON BUBBLES ═══ */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: orbitRotation }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              >
              {ICON_BUBBLES.map((b) => {
                const Icon = b.icon;
                const iconPx = b.size * 0.4;
                
                // Calculate exact position on the circular orbit
                const rad = (b.deg * Math.PI) / 180;
                const left = `calc(50% + ${Math.cos(rad) * 50}%)`;
                const top = `calc(50% + ${Math.sin(rad) * 50}%)`;

                return (
                  <motion.div 
                    key={b.id} 
                    className="absolute z-20 pointer-events-auto" 
                    initial={{ top, left, scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
                    animate={{ 
                      top: isSuckedIn ? 'calc(50% + 0%)' : top, 
                      left: isSuckedIn ? 'calc(50% + 0%)' : left,
                      scale: isSuckedIn ? 0 : 1,
                      opacity: isSuckedIn ? 0 : 1,
                      x: '-50%',
                      y: '-50%'
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ width: b.size + 16, height: b.size + 16 }}
                  >
                    <motion.div
                      className="w-full h-full"
                      animate={{ rotate: -orbitRotation }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        opacity: { duration: 0.5, delay: 0.5 + b.delay },
                        scale: { duration: 0.5, delay: 0.5 + b.delay },
                      }}
                      whileHover={{ rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative w-full h-full cursor-pointer group"
                    >
                    {/* Outer glow ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full group-hover:opacity-70"
                      animate={isGlowing ? { scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] } : { scale: 1, opacity: 0.4 }}
                      transition={{ duration: 0.8, ease: "easeInOut", repeat: isGlowing ? Infinity : 0 }}
                      style={{
                        background: `radial-gradient(circle, ${b.color}${isGlowing ? '50' : '15'} 0%, transparent 70%)`,
                        filter: `blur(${isGlowing ? '12px' : '8px'})`,
                      }}
                    />
                    
                    {/* Info Card Tooltip */}
                    <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[180px] p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-[0_12px_30px_-4px_rgba(0,0,0,0.15)] border border-gray-100 opacity-0 scale-0 origin-bottom group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none z-50 flex flex-col items-center text-center">
                      <span className="text-[13px] font-bold text-gray-900 mb-1" style={{ color: b.color }}>{b.label}</span>
                      <span className="text-[11.5px] leading-snug text-gray-500">{b.desc}</span>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45" />
                    </div>

                    {/* Glass circle */}
                    <motion.div
                      className="relative w-full h-full rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-transparent overflow-hidden"
                      animate={isGlowing ? { 
                        scale: [1, 1.15, 1], 
                        boxShadow: [
                          `0 0 20px ${b.color}80, 0 0 40px ${b.color}40, 0 4px 24px rgba(0,0,0,.1)`,
                          `0 0 40px ${b.color}A0, 0 0 80px ${b.color}60, 0 4px 24px rgba(0,0,0,.2)`,
                          `0 0 20px ${b.color}80, 0 0 40px ${b.color}40, 0 4px 24px rgba(0,0,0,.1)`
                        ] 
                      } : { 
                        scale: 1, 
                        boxShadow: `0 4px 24px rgba(0,0,0,.06), 0 0 20px ${b.color}12, 0 0 0 1px rgba(45,106,79,.04)` 
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut", repeat: isGlowing ? Infinity : 0 }}
                      style={{
                        background: isGlowing ? b.color : 'rgba(255,255,255,0.93)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: isGlowing ? `1.5px solid ${b.color}` : '1.5px solid rgba(255,255,255,0.9)',
                        color: isGlowing ? '#fff' : b.color,
                      }}
                    >
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                        style={{ backgroundColor: b.color }} 
                      />
                      <Icon className="relative z-10 transition-colors duration-300 group-hover:text-white" style={{ width: iconPx, height: iconPx }} strokeWidth={1.8} />
                    </motion.div>
                    </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
              </motion.div>
            </div>

            {/* ═══ FROSTED GLASS ORB WITH LOGO ═══ */}
            <motion.div 
              className="hero-orb cursor-pointer z-20"
              style={{ x: '-50%', y: '-50%' }}
              onHoverStart={() => setIsHoveringOrb(true)}
              onHoverEnd={() => setIsHoveringOrb(false)}
              onClick={handleSequenceClick}
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0], x: '-50%', y: '-50%' }}
              whileTap={{ scale: 0.95, x: '-50%', y: '-50%' }}
              transition={{ duration: 0.5 }}
            >
              {/* Outer glow aura */}
              <div className="hero-orb-glow" />
              {/* Outer translucent halo ring */}
              <div className="hero-orb-ring" />
              {/* Glass orb */}
              <div className="hero-orb-glass">
                {/* Inner shine */}
                <div className="hero-orb-shine" />
                {/* Logo */}
                <img
                  src="/logonew.png"
                  alt="Frosty"
                  className="hero-orb-logo"
                  draggable={false}
                />
              </div>
            </motion.div>


          </div>
        </div>


      </div>

      {/* ═══ CSS FOR ORB ═══ */}
      <style>{`
        .hero-orb {
          position: absolute;
          top: 48%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 15;
        }
        .hero-orb-glow {
          position: absolute;
          inset: -70px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(45, 106, 79, 0.12) 45%, transparent 75%);
          filter: blur(25px);
          pointer-events: none;
        }
        .hero-orb-ring {
          position: absolute;
          inset: -45px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.7);
          background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 70%, transparent 100%);
          box-shadow: 0 0 50px rgba(255, 255, 255, 0.9), inset 0 0 35px rgba(255, 255, 255, 0.6);
          pointer-events: none;
        }
        .hero-orb-glass {
          position: relative;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1.5px solid rgba(255, 255, 255, 0.85);
          box-shadow:
            0 0 80px rgba(45, 106, 79, 0.1),
            0 24px 60px rgba(0, 0, 0, 0.07),
            inset 0 2px 0 rgba(255, 255, 255, 0.95);
        }
        .hero-orb-shine {
          position: absolute;
          top: 12px;
          left: 20px;
          width: 55%;
          height: 35%;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          filter: blur(10px);
        }
        .hero-orb-logo {
          position: relative;
          z-index: 10;
          width: 55%;
          height: 55%;
          object-fit: contain;
        }
        @keyframes heroOrbFloat {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-12px); }
        }
        @media (max-width: 640px) {
          .hero-orb-glass { width: 140px; height: 140px; }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          .hero-orb-glass { width: 160px; height: 160px; }
        }
      `}</style>
    </div>
  );
}
