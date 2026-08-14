"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function ParallaxStarfield() {
  const [mounted, setMounted] = React.useState(false);
  const [layers, setLayers] = React.useState<{
    layer1: { left: string, top: string, color: string }[],
    layer2: { left: string, top: string, color: string }[],
    layer3: { left: string, top: string, color: string }[]
  }>({ layer1: [], layer2: [], layer3: [] });

  React.useEffect(() => {
    // Pure monochromatic shades of lavender
    const palette = ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE'];
    const generateStars = (count: number) => Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: palette[Math.floor(Math.random() * palette.length)]
    }));

    setLayers({
      layer1: generateStars(110),
      layer2: generateStars(70),
      layer3: generateStars(35)
    });
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderStars = (stars: { left: string, top: string, color: string }[], className: string) => (
    <>
      {stars.map((pos, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${className}`}
          style={{
            left: pos.left,
            top: pos.top,
            backgroundColor: pos.color
          }}
        />
      ))}
    </>
  );

  return (
    <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none flex items-center justify-center">
      {/* 
         Rotate the entire field to transform vertical motion into diagonal motion (Top-Right to Bottom-Left).
      */}
      <div className="relative w-[150vmax] h-[150vmax] rotate-[15deg] flex-shrink-0">

        {/* Layer 1 - Deep Background Micro-Texture - Slowest */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 w-full h-full">
            {renderStars(layers.layer1, "w-[2.5px] h-[2.5px] opacity-25")}
          </div>
          <div className="absolute inset-0 w-full h-full" style={{ top: "-100%" }}>
            {renderStars(layers.layer1, "w-[2.5px] h-[2.5px] opacity-25")}
          </div>
        </motion.div>

        {/* Layer 2 - Midground Subtle Specks - Medium Speed */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 w-full h-full">
            {renderStars(layers.layer2, "w-[3.5px] h-[3.5px] opacity-35")}
          </div>
          <div className="absolute inset-0 w-full h-full" style={{ top: "-100%" }}>
            {renderStars(layers.layer2, "w-[3.5px] h-[3.5px] opacity-35")}
          </div>
        </motion.div>

        {/* Layer 3 - Foreground Gentle Glowing Motes - Fastest */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 w-full h-full">
            {renderStars(layers.layer3, "w-[4.5px] h-[4.5px] opacity-45 shadow-[0_0_8px_rgba(139,92,246,0.25)]")}
          </div>
          <div className="absolute inset-0 w-full h-full" style={{ top: "-100%" }}>
            {renderStars(layers.layer3, "w-[4.5px] h-[4.5px] opacity-45 shadow-[0_0_8px_rgba(139,92,246,0.25)]")}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default function FrostyEngineHero() {
  return (
    <motion.div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center z-0 pt-16 md:pt-24 pb-24">

      {/* Top Center Soft Lavender Aura */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.06)_0%,rgba(196,181,253,0.035)_35%,rgba(221,214,254,0.015)_60%,transparent_75%)] rounded-full blur-[90px] pointer-events-none z-0" />

      {/* Hero Typography — Centered */}
      <div
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-6"
        style={{ marginBottom: '40px' }}
      >
        {/* Soft atmospheric depth scrim behind headline to guarantee 100% crystal-clear readability */}
        <div className="absolute inset-0 -m-8 bg-[radial-gradient(ellipse_at_center,rgba(252,251,249,0.70)_0%,rgba(252,251,249,0.30)_50%,transparent_75%)] pointer-events-none -z-10 rounded-full blur-xl" />

        {/* ANIMATED HEADLINE */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-center mt-0 mb-4 sm:mb-6 flex flex-col items-center justify-center gap-1 sm:gap-2 relative z-10"
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
                className="text-[#18181B] drop-shadow-sm font-semibold"
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

          {/* Bottom Line (Solid Theme Lavender Color) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-1 sm:mt-2">
            {["For", "Your", "Pipeline."].map((word, i) => (
              <motion.span
                key={i}
                className="text-[#5F23C8] font-bold drop-shadow-sm"
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
          className="text-sm md:text-base text-[#52525B] leading-relaxed max-w-2xl mx-auto mt-3 sm:mt-4 text-center px-2 font-normal relative z-10"
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
          <span className="text-sm text-[#71717A] tracking-[0.2em] uppercase font-semibold">Scroll to explore</span>

          {/* Mouse Outline */}
          <div className="w-5 h-8 border border-stone-300/80 rounded-full flex justify-center p-1 bg-white/90 shadow-sm backdrop-blur-sm">

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
              className="w-1 h-1.5 bg-[#5F23C8] rounded-full shadow-[0_0_5px_rgba(95,35,200,0.4)]"
            />

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
