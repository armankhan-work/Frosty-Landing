import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HandsOffFlow({ onComplete }: { onComplete?: () => void }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStarted(true), 400);
    const t2 = setTimeout(() => { if (onComplete) onComplete(); }, 9500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div className="w-full flex items-center justify-center">
      <AnimatePresence>
        {started && (
          <motion.svg
            viewBox="0 0 500 460"
            className="w-full h-auto max-h-[340px] sm:max-h-[420px] lg:max-h-[460px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Dashed background lines (square) */}
            <line x1="100" y1="80" x2="400" y2="80" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="400" y1="80" x2="400" y2="380" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="400" y1="380" x2="100" y2="380" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="100" y1="380" x2="100" y2="80" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />

            {/* Animated lines */}
            <motion.line x1="100" y1="80" x2="400" y2="80" stroke="#5F23C8" strokeWidth="2.5" strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} />
            <motion.line x1="400" y1="80" x2="400" y2="380" stroke="#8B5CF6" strokeWidth="2.5" strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 2.2 }} />
            <motion.line x1="400" y1="380" x2="100" y2="380" stroke="#EA580C" strokeWidth="2.5" strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 4 }} />
            <motion.line x1="100" y1="380" x2="100" y2="80" stroke="#E11D48" strokeWidth="2.5" strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 5.5 }} />

            {/* Node: User (top left) */}
            <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
              <circle cx="100" cy="80" r="24" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
              <text x="100" y="85" textAnchor="middle" fill="#0F172A" fontSize="20">👤</text>
            </motion.g>

            {/* Node: Website (top right) */}
            <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, type: 'spring' }}>
              <circle cx="400" cy="80" r="24" fill="#FAF5FF" stroke="#5F23C8" strokeWidth="1.5" />
              <text x="400" y="85" textAnchor="middle" fill="#5F23C8" fontSize="20">🌐</text>
            </motion.g>

            {/* Node: Brain (bottom right) */}
            <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, type: 'spring' }}>
              <circle cx="400" cy="380" r="24" fill="#FAF5FF" stroke="#8B5CF6" strokeWidth="1.5" />
              <text x="400" y="385" textAnchor="middle" fill="#5F23C8" fontSize="20">🧠</text>
            </motion.g>

            {/* Node: Headset/Human (bottom left) */}
            <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, type: 'spring' }}>
              <circle cx="100" cy="380" r="24" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.5" />
              <text x="100" y="385" textAnchor="middle" fill="#EA580C" fontSize="20">🎧</text>
            </motion.g>

            {/* Bubble 1: User request */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.4 }}>
              <rect x="155" y="56" width="190" height="46" rx="14" fill="#5F23C8" />
              <text x="250" y="76" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">&quot;I&apos;d rather speak</text>
              <text x="250" y="91" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">to a person.&quot;</text>
            </motion.g>

            {/* Bubble 2: Escalating */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.4 }}>
              <rect x="310" y="215" width="160" height="28" rx="14" fill="#FFFFFF" stroke="#5F23C8" strokeWidth="1" />
              <text x="390" y="234" textAnchor="middle" fill="#5F23C8" fontSize="11" fontWeight="700">Escalating priority…</text>
            </motion.g>

            {/* Bubble 3: Transferring */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.8, duration: 0.4 }}>
              <rect x="130" y="367" width="240" height="28" rx="14" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1" />
              <text x="250" y="386" textAnchor="middle" fill="#EA580C" fontSize="11" fontWeight="700">Transferring full chat history…</text>
            </motion.g>

            {/* Bubble 4: Handed over */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6.5, duration: 0.4 }}>
              <rect x="20" y="195" width="160" height="46" rx="14" fill="#E11D48" />
              <text x="100" y="215" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Live chat handed</text>
              <text x="100" y="230" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">to your team!</text>
            </motion.g>
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  );
}
