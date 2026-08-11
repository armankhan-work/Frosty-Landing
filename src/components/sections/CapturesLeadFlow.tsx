import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MessageCircle, Brain, Database, ArrowDown } from 'lucide-react';

export default function CapturesLeadFlow({ onComplete }: { onComplete?: () => void }) {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);

    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 10000); 

    return () => { clearTimeout(timer); clearTimeout(completeTimer); };
  }, [onComplete]);

  return (
    <div className="w-full flex items-center justify-center relative min-h-[400px]">
      <div className="relative w-full max-w-5xl flex items-center justify-center z-10">
        <div className="w-full h-[460px] flex items-center justify-center relative">
          <AnimatePresence>
            {animationStarted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="relative w-[500px] h-[460px] pointer-events-none"
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                  <motion.line x1="100" y1="80" x2="400" y2="80" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
                  <motion.line x1="100" y1="80" x2="400" y2="80" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 1 }} />
                  
                  <motion.line x1="400" y1="80" x2="400" y2="380" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
                  <motion.line x1="400" y1="80" x2="400" y2="380" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 2.5 }} />

                  <motion.line x1="400" y1="380" x2="100" y2="380" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
                  <motion.line x1="400" y1="380" x2="100" y2="380" stroke="#F43F5E" strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 4.5 }} />
                  
                  <motion.line x1="100" y1="380" x2="100" y2="80" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
                  <motion.line x1="100" y1="380" x2="100" y2="80" stroke="#06B6D4" strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 6 }} />
                </svg>

                <motion.div className="absolute top-[56px] left-[76px] w-12 h-12 bg-gradient-to-tr from-gray-100 to-white rounded-full flex items-center justify-center border border-gray-200 z-10 cursor-pointer pointer-events-auto"
                  initial={{ scale: 0 }} animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }} transition={{ delay: 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.25, rotate: -10, boxShadow: "0px 20px 40px -5px rgba(0, 0, 0, 0.4)" }}>
                  <User className="w-6 h-6 text-gray-700" />
                </motion.div>

                <motion.div className="absolute top-[56px] left-[376px] w-12 h-12 bg-gradient-to-tr from-green-100 to-green-50 rounded-full flex items-center justify-center border border-green-200 z-10 cursor-pointer pointer-events-auto"
                  initial={{ scale: 0 }} animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }} transition={{ delay: 0.4, type: 'spring' }}
                  whileHover={{ scale: 1.25, rotate: 10, boxShadow: "0px 20px 40px -5px rgba(16, 185, 129, 0.8)" }}>
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </motion.div>

                <motion.div className="absolute top-[356px] left-[376px] w-12 h-12 bg-gradient-to-tr from-purple-100 to-purple-50 rounded-full flex items-center justify-center border border-purple-200 z-10 cursor-pointer pointer-events-auto"
                  initial={{ scale: 0 }} animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }} transition={{ delay: 0.6, type: 'spring' }}
                  whileHover={{ scale: 1.25, rotate: -10, boxShadow: "0px 20px 40px -5px rgba(168, 85, 247, 0.8)" }}>
                  <Brain className="w-6 h-6 text-purple-600" />
                </motion.div>
                
                <motion.div className="absolute top-[356px] left-[76px] w-12 h-12 bg-gradient-to-tr from-rose-100 to-rose-50 rounded-full flex items-center justify-center border border-rose-200 z-10 cursor-pointer pointer-events-auto"
                  initial={{ scale: 0 }} animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }} transition={{ delay: 0.8, type: 'spring' }}
                  whileHover={{ scale: 1.25, rotate: 10, boxShadow: "0px 20px 40px -5px rgba(244, 63, 94, 0.8)" }}>
                  <Database className="w-6 h-6 text-rose-600" />
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }} animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }} transition={{ duration: 0.5, delay: 1.5 }}
                  className="absolute top-[80px] left-[250px] bg-green-500 text-white text-[11px] p-2 rounded-2xl shadow-xl w-[140px] z-20 leading-tight text-center border border-green-400">
                  "I'm interested - here's my number."
                </motion.div>
                
                <motion.div initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }} animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }} transition={{ duration: 0.5, delay: 3.2 }}
                  className="absolute top-[230px] left-[400px] bg-purple-100 text-purple-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-purple-200 z-20 shadow-sm whitespace-nowrap">
                  Extracting contact info...
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }} animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }} transition={{ duration: 0.5, delay: 5 }}
                  className="absolute top-[380px] left-[250px] bg-rose-100 text-rose-800 text-[11px] font-bold px-3 py-1.5 rounded-full border border-rose-300 z-20 shadow-sm whitespace-nowrap">
                  Intent: High Intent Lead
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }} animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }} transition={{ duration: 0.5, delay: 7 }}
                  className="absolute top-[230px] left-[100px] bg-cyan-100 text-cyan-800 text-[11px] p-2 rounded-2xl shadow-xl w-[140px] z-20 leading-tight text-center border border-cyan-400 font-medium">
                  Lead saved · synced to your CRM
                </motion.div>

                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 8.5 }}
                  onClick={() => { setAnimationStarted(false); setTimeout(() => setAnimationStarted(true), 100); }}
                  className="absolute top-[230px] left-[250px] -translate-x-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer pointer-events-auto transition-colors duration-200 z-10 shadow-md">
                  <ArrowDown className="w-4 h-4 -rotate-90" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
