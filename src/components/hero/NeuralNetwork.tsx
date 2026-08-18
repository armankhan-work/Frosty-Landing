// @ts-nocheck
import { useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Globe, MessageCircle, CalendarDays, Instagram,
  Phone, Bot, Mail, Database,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   DATA       
   ═══════════════════════════════════════════════════════ */

/* Icon nodes - scattered organically around the 3D orb */
const ICON_NODES: {
  id: string; x: number; y: number; size: number;
  icon: typeof Globe; color: string; label: string;
  delay: number; floatY: number; floatDur: number;
}[] = [
  { id: 'web',       x: 8,   y: 18,  size: 52, icon: Globe,          color: '#2D6A4F', label: 'Website',    delay: 0,    floatY: 7,  floatDur: 5.2 },
  { id: 'whatsapp',  x: 82,  y: 12,  size: 48, icon: MessageCircle,  color: '#25D366', label: 'WhatsApp',   delay: 0.3,  floatY: 9,  floatDur: 4.8 },
  { id: 'calendar',  x: 88,  y: 55,  size: 46, icon: CalendarDays,   color: '#2D6A4F', label: 'Calendar',   delay: 0.6,  floatY: 5,  floatDur: 5.5 },
  { id: 'instagram', x: 5,   y: 60,  size: 50, icon: Instagram,      color: '#E1306C', label: 'Instagram',  delay: 0.9,  floatY: 8,  floatDur: 4.5 },
  { id: 'phone',     x: 18,  y: 82,  size: 42, icon: Phone,          color: '#2D6A4F', label: 'Calls',      delay: 1.2,  floatY: 5,  floatDur: 6.0 },
  { id: 'bot',       x: 50,  y: 5,   size: 44, icon: Bot,            color: '#40916C', label: 'AI Bot',     delay: 0.15, floatY: 6,  floatDur: 5.0 },
  { id: 'mail',      x: 78,  y: 80,  size: 44, icon: Mail,           color: '#FF7A5E', label: 'Email',      delay: 0.45, floatY: 6,  floatDur: 5.8 },
  { id: 'crm',       x: 3,   y: 40,  size: 40, icon: Database,       color: '#26B3AA', label: 'CRM',        delay: 0.75, floatY: 4,  floatDur: 6.2 },
];

/* Particles - seeded random for consistency */
function seededRnd(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  x: 5 + seededRnd(i) * 90,
  y: 5 + seededRnd(i + 100) * 90,
  size: 1.5 + seededRnd(i + 200) * 2,
  opacity: 0.12 + seededRnd(i + 300) * 0.25,
  dur: 4 + seededRnd(i + 400) * 5,
  delay: seededRnd(i + 500) * 3,
}));

/* Connection lines - center of image to each icon node (%) */
const CENTER = { x: 50, y: 48 };
const CONNECTIONS = ICON_NODES.map(n => ({
  x1: CENTER.x, y1: CENTER.y, x2: n.x + n.size / 20, y2: n.y + n.size / 20,
  delay: n.delay,
}));

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function NeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { damping: 30, stiffness: 60, mass: 0.8 };
  const sx = useSpring(mouseX, spring);
  const sy = useSpring(mouseY, spring);
  const tx = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const ty = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const txSlow = useTransform(sx, [-0.5, 0.5], [-5, 5]);
  const tySlow = useTransform(sy, [-0.5, 0.5], [-5, 5]);

  /* Data packets memoised */
  const packets = useMemo(() =>
    CONNECTIONS.map((c, i) => ({
      ...c,
      pktDelay: (i * 2.2) % 16,
      pktDur: 2.2 + (i % 3) * 0.5,
    })),
  []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      className="relative w-full max-w-[640px] mx-auto select-none"
      style={{ aspectRatio: '1 / 1' }}
    >

      {/* ── 3D Hero image (base layer) ── */}
      <motion.div
        style={{ x: txSlow, y: tySlow }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full h-full z-0"
      >
        <img
          src="/hero-3d.png"
          alt="Frosty AI Platform"
          className="w-full h-full object-contain drop-shadow-[0_20px_60px_rgba(45,106,79,.12)]"
          draggable={false}
        />

        {/* Subtle glow pulse behind the orb */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[22%] left-[22%] w-[56%] h-[56%] rounded-full bg-[#2D6A4F]/[.06] blur-[40px] pointer-events-none"
        />
      </motion.div>

      {/* ── SVG overlay: connection lines + data packets ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="nn-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#40916C" stopOpacity="0.05" />
          </linearGradient>
          <filter id="nn-glow">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        {CONNECTIONS.map((c, i) => (
          <line
            key={`ln-${i}`}
            x1={`${c.x1}%`} y1={`${c.y1}%`}
            x2={`${c.x2}%`} y2={`${c.y2}%`}
            stroke="url(#nn-line-grad)"
            strokeWidth="0.15"
          />
        ))}

        {/* Animated pulse on lines */}
        {CONNECTIONS.map((c, i) => (
          <motion.line
            key={`pulse-${i}`}
            x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
            stroke="#2D6A4F"
            strokeWidth="0.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 0.5, 0], opacity: [0, 0.25, 0] }}
            transition={{
              duration: 3.5 + i * 0.3,
              delay: i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Data packets */}
        {packets.map((p, i) => (
          <motion.circle
            key={`pkt-${i}`}
            r="0.5"
            fill="#2D6A4F"
            filter="url(#nn-glow)"
            initial={{ cx: p.x1, cy: p.y1, opacity: 0 }}
            animate={{
              cx: [p.x1, p.x2, p.x2],
              cy: [p.y1, p.y2, p.y2],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: p.pktDur,
              delay: p.pktDelay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>

      {/* ── Floating icon nodes ── */}
      {ICON_NODES.map((node) => {
        const Icon = node.icon;
        const iconPx = node.size * 0.4;

        return (
          <motion.div
            key={node.id}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
              x: tx,
              y: ty,
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -node.floatY, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.4 + node.delay },
              scale: { duration: 0.5, delay: 0.4 + node.delay, type: 'spring', stiffness: 200 },
              y: { duration: node.floatDur, repeat: Infinity, ease: 'easeInOut', delay: node.delay },
            }}
            whileHover={{ scale: 1.18 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
          >
            <div className="w-full h-full rounded-full flex items-center justify-center
              bg-white/85 backdrop-blur-xl
              borderXD612 `12 border-white/80
              shadow-[0_4px_24px_rgba(0,0,0,.07),0_0_0_1px_rgba(45,106,79,.05)]
              group-hover:shadow-[0_8px_36px_rgba(0,0,0,.12),0_0_40px_rgba(45,106,79,.1)]
              transition-shadow duration-300"
            >
              <Icon
                style={{ width: iconPx, height: iconPx, color: node.color }}
                strokeWidth={1.8}
              />
            </div>
            {/* Hover label */}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100
              transition-all duration-200 whitespace-nowrap text-[10px] font-bold text-[#2D6A4F]
              bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-[#2D6A4F]/10
              pointer-events-none">
              {node.label}
            </div>
          </motion.div>
        );
      })}

      {/* ── Floating particles ── */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={`pt-${i}`}
          className="absolute rounded-full bg-[#2D6A4F] pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -(3 + p.size * 2), 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ── Glass info card at bottom ── */}
      <motion.div
        style={{ x: txSlow }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.4 }}
        className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-30"
      >
        <div className="px-5 py-3.5 rounded-[20px]
          bg-white/70 backdrop-blur-2xl
          border border-white/70
          shadow-[0_12px_40px_rgba(0,0,0,.06),0_0_0_1px_rgba(45,106,79,.04)]
          text-center min-w-[240px]"
        >
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <span className="text-xs">✨</span>
            <p className="text-[12px] font-extrabold text-[#0F172A] tracking-tight">
              One Agent. Every Channel.
            </p>
          </div>
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {['Website', 'WhatsApp', 'Instagram', 'Calendar', 'Calls'].map((ch) => (
              <span
                key={ch}
                className="text-[9px] font-bold text-[#2D6A4F] bg-[#E8F5EE] px-2 py-0.5 rounded-full"
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
