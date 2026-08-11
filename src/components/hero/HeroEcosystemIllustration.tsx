// @ts-nocheck
import { motion } from 'framer-motion';
import { Globe, Calendar, Instagram, MessageCircle } from 'lucide-react';

export default function HeroEcosystemIllustration() {
  return (
    <div className="relative w-full max-w-[620px] mx-auto flex items-center justify-center py-6 select-none">

      {/* Outer ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#9AD7B0]/20 via-[#DCEFE5]/30 to-transparent rounded-full blur-[80px] -z-10 pointer-events-none" />

      {/* Main 3D Artwork Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="relative w-full flex items-center justify-center group"
      >
        {/* Generated High-Res 3D Glass Artwork */}
        <div className="relative w-full rounded-[36px] overflow-hidden shadow-[0_30px_90px_rgba(45,106,79,0.12)] border border-white/60 bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-xl">
          <img
            src="/hero_ai_ecosystem_3d.png"
            alt="Frosty AI Ecosystem 3D"
            className="w-full h-auto object-cover rounded-[36px] transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Interactive Floating Orbit Nodes (4 Channels) */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[14%] left-[12%] flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/25 backdrop-blur-md border border-white/50 shadow-lg text-[#0F172A]"
          >
            <div className="w-7 h-7 rounded-xl bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F]">
              <Globe className="w-4 h-4" />
            </div>
            <span className="text-[12px] font-bold tracking-wide">Website</span>
          </motion.div>

          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-[18%] right-[10%] flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/25 backdrop-blur-md border border-white/50 shadow-lg text-[#0F172A]"
          >
            <div className="w-7 h-7 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
            <span className="text-[12px] font-bold tracking-wide">WhatsApp</span>
          </motion.div>

          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-[28%] left-[8%] flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/25 backdrop-blur-md border border-white/50 shadow-lg text-[#0F172A]"
          >
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#F58529]/20 via-[#DD2A7B]/20 to-[#8134AF]/20 flex items-center justify-center text-[#DD2A7B]">
              <Instagram className="w-4 h-4" />
            </div>
            <span className="text-[12px] font-bold tracking-wide">Instagram</span>
          </motion.div>

          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-[32%] right-[12%] flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/25 backdrop-blur-md border border-white/50 shadow-lg text-[#0F172A]"
          >
            <div className="w-7 h-7 rounded-xl bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F]">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-[12px] font-bold tracking-wide">Calendar</span>
          </motion.div>

          {/* Floating Frosted Glass Information Card at Bottom-Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 max-w-[280px] sm:max-w-[310px] p-5 rounded-[32px] bg-white/30 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_rgba(15,23,42,0.12)] text-[#0F172A]"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[14px]">✨</span>
              <h3 className="text-[14px] font-extrabold text-[#0F172A] tracking-tight">One agent. Every channel.</h3>
            </div>
            <p className="text-[12px] leading-relaxed text-[#475569] font-medium">
              Seamless conversations across <br />
              <span className="font-bold text-[#2D6A4F]">Website</span>, <span className="font-bold text-[#2D6A4F]">WhatsApp</span>, <span className="font-bold text-[#2D6A4F]">Instagram</span> &amp; <span className="font-bold text-[#2D6A4F]">Calendar</span>.
            </p>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
