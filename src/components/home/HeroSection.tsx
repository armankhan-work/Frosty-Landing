"use client";

import { motion } from "framer-motion";
import { useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

type Props = {
  companyName: string;
  userName: string;
};

export function HeroSection({ companyName, userName }: Props) {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-background/40 backdrop-blur-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)] mb-8 group min-h-[140px] flex flex-col justify-center">
      
      {/* Interactive Particles Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <ParticlesProvider init={particlesInit}>
          <Particles
            id="tsparticles-hero"
            options={{
              background: { color: { value: "transparent" } },
              fpsLimit: 60,
              interactivity: {
                events: {
                  onHover: { enable: true, mode: "grab" },
                  resize: true,
                },
                modes: {
                  grab: { distance: 140, links: { opacity: 0.3 } },
                },
              },
              particles: {
                color: { value: "#673EBE" }, // Metallic purple to match brand theme
                links: {
                  color: "#673EBE",
                  distance: 150,
                  enable: true,
                  opacity: 0.15,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: { default: "bounce" },
                  random: true,
                  speed: 0.6,
                  straight: false,
                },
                number: {
                  density: { enable: true },
                  value: 60,
                },
                opacity: { value: 0.4 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 2.5 } },
              },
              detectRetina: true,
            }}
          />
        </ParticlesProvider>
      </div>

      {/* Animated Mesh / Blobs Background (Underneath) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30 mix-blend-screen">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[30%] -left-[10%] w-[60%] h-[150%] rounded-full bg-primary/20 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute -bottom-[40%] -right-[10%] w-[50%] h-[120%] rounded-full bg-blue-500/10 blur-[120px]"
        />
      </div>

      {/* Subtle Noise Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
    </section>
  );
}
