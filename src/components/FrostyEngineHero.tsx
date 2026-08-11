"use client";

import React from 'react';
import { motion } from 'framer-motion';


export function ParallaxStarfield() {
  const [mounted, setMounted] = React.useState(false);
  const [layers, setLayers] = React.useState<{
    layer1: { left: string, top: string }[],
    layer2: { left: string, top: string }[],
    layer3: { left: string, top: string }[]
  }>({ layer1: [], layer2: [], layer3: [] });

  React.useEffect(() => {
    const generateStars = (count: number) => Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }));

    setLayers({
      layer1: generateStars(120), // Increased density
      layer2: generateStars(80),
      layer3: generateStars(40)
    });
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderStars = (stars: { left: string, top: string }[], className: string) => (
    <>
      {stars.map((pos, i) => (
        <div key={i} className={`absolute bg-[#5F23C8] dark:bg-white rounded-full ${className}`} style={{ left: pos.left, top: pos.top }} />
      ))}
    </>
  );

  return (
    <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none flex items-center justify-center">
      {/* 
         Rotate the entire field to transform vertical motion into diagonal motion (Top-Right to Bottom-Left).
         We use a container larger than the viewport to avoid empty corners during rotation.
      */}
      <div className="relative w-[150vmax] h-[150vmax] rotate-[15deg] flex-shrink-0">

        {/* Layer 1 - Deep Background - Slowest */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 w-full h-full">
            {renderStars(layers.layer1, "w-[1px] h-[1px] opacity-30")}
          </div>
          <div className="absolute inset-0 w-full h-full" style={{ top: "-100%" }}>
            {renderStars(layers.layer1, "w-[1px] h-[1px] opacity-30")}
          </div>
        </motion.div>

        {/* Layer 2 - Midground - Medium Speed */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 w-full h-full">
            {renderStars(layers.layer2, "w-[1.5px] h-[1.5px] opacity-50")}
          </div>
          <div className="absolute inset-0 w-full h-full" style={{ top: "-100%" }}>
            {renderStars(layers.layer2, "w-[1.5px] h-[1.5px] opacity-50")}
          </div>
        </motion.div>

        {/* Layer 3 - Foreground - Fastest */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 w-full h-full">
            {renderStars(layers.layer3, "w-[2px] h-[2px] opacity-80 shadow-[0_0_5px_rgba(255,255,255,0.4)]")}
          </div>
          <div className="absolute inset-0 w-full h-full" style={{ top: "-100%" }}>
            {renderStars(layers.layer3, "w-[2px] h-[2px] opacity-80 shadow-[0_0_5px_rgba(255,255,255,0.4)]")}
          </div>
        </motion.div>

      </div>
    </div>
  );
}



export default function FrostyEngineHero() {

  return (
    <motion.div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center z-0 pt-16 md:pt-24 pb-24">

      {/* Top Center Soft Icy Blue Aura Gradient */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(95, 35, 200,0.1)_0%,rgba(95, 35, 200,0.05)_40%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(95, 35, 200,0.12)_0%,rgba(95, 35, 200,0.02)_40%,transparent_70%)] rounded-full blur-[80px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen" />

      {/* Hero Typography — Centered */}
      <div
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-6"
        style={{ marginBottom: '40px' }}
      >
        {/* ANIMATED HEADLINE */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-center mt-0 mb-4 sm:mb-6 flex flex-col items-center justify-center gap-1 sm:gap-2"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 }
            }
          }}
        >
          {/* Top Line */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {["Intelligence", "Engineered"].map((word, i) => (
              <motion.span
                key={i}
                className="text-white drop-shadow-sm"
                variants={{
                  initial: { opacity: 0, y: 30, filter: "blur(12px)" },
                  animate: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Bottom Line (Gradient) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-1 sm:mt-2">
            {["For", "Your", "Pipeline."].map((word, i) => (
              <motion.span
                key={i}
                className="bg-clip-text text-transparent bg-gradient-to-b from-white to-[#5F23C8] drop-shadow-md"
                variants={{
                  initial: { opacity: 0, y: 30, filter: "blur(12px)" },
                  animate: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        <motion.p
          className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto mt-3 sm:mt-4 text-center px-2"
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.6 } }
          }}
        >
          Connect your data streams, automate customer journeys, and measure the impact. <br className="hidden md:block" />
          Agentic architecture built to handle the heavy lifting while your team focuses on closing.
        </motion.p>

        {/* MINIMAL SCROLL INDICATOR */}
        <motion.div
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { delay: 1.2, duration: 1 } }
          }}
          className="mt-8 sm:mt-12 md:mt-16 flex flex-col items-center gap-3 relative z-50 cursor-pointer"
        >
          <span className="text-sm text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase">Scroll to explore</span>

          {/* Mouse Outline */}
          <div className="w-5 h-8 border border-slate-400/30 dark:border-white/20 rounded-full flex justify-center p-1 bg-slate-200/50 dark:bg-white/5 backdrop-blur-sm">

            {/* Bouncing Wheel */}
            <motion.div
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="w-1 h-1.5 bg-[#5F23C8] dark:bg-[#5F23C8] rounded-full shadow-[0_0_5px_rgba(95, 35, 200,0.6)] dark:shadow-[0_0_5px_#5F23C8]"
            />

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
