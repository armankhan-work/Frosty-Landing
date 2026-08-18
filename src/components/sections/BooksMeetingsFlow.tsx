import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MessageCircle, Brain, Calendar, ArrowDown } from 'lucide-react';

export default function BooksMeetingsFlow({ onComplete }: { onComplete?: () => void }) {
  const [animationStarted, setAnimationStarted] = useState(false);

  // Auto-start animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);

    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 10000); // 9.5s animation + 0.5s initial delay

    return () => { clearTimeout(timer); clearTimeout(completeTimer); };
  }, [onComplete]);

  return (
    <div className="w-full flex items-center justify-center relative min-h-[400px]">
      
      <div className="relative w-full max-w-5xl flex items-center justify-center z-10">
        
        {/* The Interactive Animated Diamond Flow */}
        <div className="w-full h-[460px] flex items-center justify-center relative">
          
          <AnimatePresence>
            {animationStarted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="relative w-[500px] h-[460px] pointer-events-none"
              >
                
                {/* SVG Connections (Square Layout) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                  {/* Line 1: User (Top-Left) to WhatsApp (Top-Right) */}
                  <motion.line
                    x1="100" y1="80" x2="400" y2="80"
                    stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"
                  />
                  <motion.line
                    x1="100" y1="80" x2="400" y2="80"
                    stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" // Green for WhatsApp
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                  
                  {/* Line 2: WhatsApp (Top-Right) to Brain (Bottom-Right) */}
                  <motion.line
                    x1="400" y1="80" x2="400" y2="380"
                    stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"
                  />
                  <motion.line
                    x1="400" y1="80" x2="400" y2="380"
                    stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4" // Purple for Brain
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 2.5 }}
                  />

                  {/* Line 3: Brain (Bottom-Right) to Calendar (Bottom-Left) */}
                  <motion.line
                    x1="400" y1="380" x2="100" y2="380"
                    stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"
                  />
                  <motion.line
                    x1="400" y1="380" x2="100" y2="380"
                    stroke="#FF7A5E" strokeWidth="2" strokeDasharray="4 4" // Blue for Calendar
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 4.5 }}
                  />
                  
                  {/* Line 4: Calendar (Bottom-Left) to User (Top-Left) */}
                  <motion.line
                    x1="100" y1="380" x2="100" y2="80"
                    stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"
                  />
                  <motion.line
                    x1="100" y1="380" x2="100" y2="80"
                    stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" // Yellow/Orange
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 6 }}
                  />
                </svg>

                {/* Node 1: User (Top-Left) */}
                <motion.div 
                  className="absolute top-[56px] left-[76px] w-12 h-12 bg-gradient-to-tr from-gray-100 to-white rounded-full flex items-center justify-center border border-gray-200 z-10 cursor-pointer pointer-events-auto"
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }} 
                  transition={{ delay: 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.25, rotate: -10, boxShadow: "0px 20px 40px -5px rgba(0, 0, 0, 0.4)" }}
                >
                  <User className="w-6 h-6 text-gray-700" />
                </motion.div>

                {/* Node 2: WhatsApp (Top-Right) */}
                <motion.div 
                  className="absolute top-[56px] left-[376px] w-12 h-12 bg-gradient-to-tr from-green-100 to-green-50 rounded-full flex items-center justify-center border border-green-200 z-10 cursor-pointer pointer-events-auto"
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }} 
                  transition={{ delay: 0.4, type: 'spring' }}
                  whileHover={{ scale: 1.25, rotate: 10, boxShadow: "0px 20px 40px -5px rgba(16, 185, 129, 0.8)" }}
                >
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </motion.div>

                {/* Node 3: Brain (Bottom-Right) */}
                <motion.div 
                  className="absolute top-[356px] left-[376px] w-12 h-12 bg-gradient-to-tr from-teal-100 to-teal-50 rounded-full flex items-center justify-center border border-teal-200 z-10 cursor-pointer pointer-events-auto"
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }} 
                  transition={{ delay: 0.6, type: 'spring' }}
                  whileHover={{ scale: 1.25, rotate: -10, boxShadow: "0px 20px 40px -5px rgba(168, 85, 247, 0.8)" }}
                >
                  <Brain className="w-6 h-6 text-teal-600" />
                </motion.div>
                
                {/* Node 4: Calendar (Bottom-Left) */}
                <motion.div 
                  className="absolute top-[356px] left-[76px] w-12 h-12 bg-gradient-to-tr from-blue-100 to-blue-50 rounded-full flex items-center justify-center border border-blue-200 z-10 cursor-pointer pointer-events-auto"
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" }} 
                  transition={{ delay: 0.8, type: 'spring' }}
                  whileHover={{ scale: 1.25, rotate: 10, boxShadow: "0px 20px 40px -5px rgba(59, 130, 246, 0.8)" }}
                >
                  <Calendar className="w-6 h-6 text-blue-600" />
                </motion.div>

                {/* Message Bubble 1: User to WhatsApp (Top Edge) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="absolute top-[80px] left-[250px] bg-green-500 text-white text-[11px] p-2 rounded-2xl shadow-xl w-[140px] z-20 leading-tight text-center border border-green-400"
                >
                  "Can someone walk me through it this week?"
                </motion.div>
                
                {/* Message Bubble 2: WhatsApp to Brain (Right Edge) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  transition={{ duration: 0.5, delay: 3.2 }}
                  className="absolute top-[230px] left-[400px] bg-teal-100 text-teal-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-teal-200 z-20 shadow-sm whitespace-nowrap"
                >
                  Checking Availability...
                </motion.div>

                {/* Message Bubble 3: Brain to Calendar (Bottom Edge) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  transition={{ duration: 0.5, delay: 5 }}
                  className="absolute top-[380px] left-[250px] bg-blue-100 text-blue-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-blue-200 z-20 shadow-sm whitespace-nowrap"
                >
                  Schedule Demo for Thu 4:30 PM
                </motion.div>

                {/* Message Bubble 4: Calendar to User (Left Edge) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  transition={{ duration: 0.5, delay: 7 }}
                  className="absolute top-[230px] left-[100px] bg-amber-100 text-amber-800 text-[11px] p-2 rounded-2xl shadow-xl w-[140px] z-20 leading-tight text-center border border-amber-300 font-medium"
                >
                  Meeting booked! See you Thu 4:30 PM
                </motion.div>

                {/* Restart Animation Button (Center of Square) */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 8.5 }}
                  onClick={() => {
                    setAnimationStarted(false);
                    setTimeout(() => setAnimationStarted(true), 100);
                  }}
                  className="absolute top-[230px] left-[250px] -translate-x-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer pointer-events-auto transition-colors duration-200 z-10 shadow-md"
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
