import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Globe, Brain, ArrowDown } from 'lucide-react';

export default function AnswersQualifiesFlow({ onComplete }: { onComplete?: () => void }) {
  const [animationStarted, setAnimationStarted] = useState(false);

  // Auto-start animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);

    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 9000); // 8.5s animation + 0.5s initial delay

    return () => { clearTimeout(timer); clearTimeout(completeTimer); };
  }, [onComplete]);

  return (
    <div className="w-full flex items-center justify-center relative min-h-[400px]">
      
      <div className="relative w-full max-w-5xl flex items-center justify-center z-10">
        
        {/* The Interactive Animated Triangle Flow */}
        <div className="w-full h-[460px] flex items-center justify-center relative">
          
          <AnimatePresence>
            {animationStarted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="relative w-[500px] h-[460px] pointer-events-none"
              >
                
                {/* SVG Connections (Triangle Layout) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                  {/* Line 1: User (Top Center) to Website (Bottom Right) */}
                  <motion.line
                    x1="250" y1="80" x2="420" y2="380"
                    stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"
                  />
                  <motion.line
                    x1="250" y1="80" x2="420" y2="380"
                    stroke="#FF7A5E" strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                  
                  {/* Line 2: Website (Bottom Right) to Brain (Bottom Left) */}
                  <motion.line
                    x1="420" y1="380" x2="80" y2="380"
                    stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"
                  />
                  <motion.line
                    x1="420" y1="380" x2="80" y2="380"
                    stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 3 }}
                  />

                  {/* Line 3: Brain (Bottom Left) to User (Top Center) */}
                  <motion.line
                    x1="80" y1="380" x2="250" y2="80"
                    stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"
                  />
                  <motion.line
                    x1="80" y1="380" x2="250" y2="80"
                    stroke="#10B981" strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 5 }}
                  />
                </svg>

                {/* Node 1: User (Top Center) */}
                <motion.div 
                  className="absolute top-[56px] left-[226px] w-12 h-12 bg-gradient-to-tr from-gray-100 to-white rounded-full flex items-center justify-center border border-gray-200 z-10 cursor-pointer pointer-events-auto"
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }} 
                  transition={{ delay: 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.25, rotate: -10, boxShadow: "0px 20px 40px -5px rgba(0, 0, 0, 0.4)" }}
                >
                  <User className="w-6 h-6 text-gray-700" />
                </motion.div>

                {/* Node 2: Website (Bottom Right) */}
                <motion.div 
                  className="absolute top-[356px] left-[396px] w-12 h-12 bg-gradient-to-tr from-blue-100 to-blue-50 rounded-full flex items-center justify-center border border-blue-200 z-10 cursor-pointer pointer-events-auto"
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }} 
                  transition={{ delay: 0.4, type: 'spring' }}
                  whileHover={{ scale: 1.25, rotate: 10, boxShadow: "0px 20px 40px -5px rgba(59, 130, 246, 0.8)" }}
                >
                  <Globe className="w-6 h-6 text-blue-600" />
                </motion.div>

                {/* Node 3: Brain (Bottom Left) */}
                <motion.div 
                  className="absolute top-[356px] left-[56px] w-12 h-12 bg-gradient-to-tr from-teal-100 to-teal-50 rounded-full flex items-center justify-center border border-teal-200 z-10 cursor-pointer pointer-events-auto"
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }} 
                  transition={{ delay: 0.6, type: 'spring' }}
                  whileHover={{ scale: 1.25, rotate: -10, boxShadow: "0px 20px 40px -5px rgba(168, 85, 247, 0.8)" }}
                >
                  <Brain className="w-6 h-6 text-teal-600" />
                </motion.div>

                {/* Message Bubble 1: User to Website */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="absolute top-[230px] left-[335px] bg-blue-500 text-white text-[11px] p-2 rounded-2xl shadow-xl w-[140px] z-20 leading-tight text-center border border-blue-400"
                >
                  "Do you work with clinics like ours?"
                </motion.div>
                
                {/* Message Bubble 2: Website to Brain */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  transition={{ duration: 0.5, delay: 3.5 }}
                  className="absolute top-[380px] left-[250px] bg-teal-100 text-teal-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-teal-200 z-20 shadow-sm whitespace-nowrap"
                >
                  Analyzing Intent... tagged WARM
                </motion.div>

                {/* Message Bubble 3: Brain to User */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  transition={{ duration: 0.5, delay: 5.5 }}
                  className="absolute top-[230px] left-[165px] bg-green-500 text-white text-[11px] p-2 rounded-2xl shadow-xl w-[140px] z-20 leading-tight text-center border border-green-400"
                >
                  "Yes we do! How many locations do you have?"
                </motion.div>

                {/* Restart Animation Button (Centered vertically/horizontally) */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 7.5 }}
                  onClick={() => {
                    setAnimationStarted(false);
                    setTimeout(() => setAnimationStarted(true), 100);
                  }}
                  className="absolute top-[260px] left-[250px] -translate-x-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer pointer-events-auto transition-colors duration-200 z-10 shadow-md"
                  title="Replay animation"
                >
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
