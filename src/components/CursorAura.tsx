'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CursorAura
 *
 * Three-layer system:
 *   1. Corner orbs   — large, always-drifting ambient background glow (sin/cos)
 *   2. Cursor orb pull — corner orbs gently lean toward cursor (slow lerp)
 *   3. Cursor spotlight — a warm blue bloom that follows the cursor with a soft
 *      lag (lerp 0.1), using mix-blend-mode:screen to feel like emitted light
 */
export default function CursorAura() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const trRef   = useRef<HTMLDivElement>(null);
  const blRef   = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    /* Raw cursor position in px */
    const mouse = { x: W() * 0.85, y: H() * 0.15 };
    /* Lerped glow position */
    const glow  = { x: mouse.x, y: mouse.y };
    /* Cursor pull offsets on corner orbs */
    const c1 = { dx: 0, dy: 0 };
    const c2 = { dx: 0, dy: 0 };

    const MAX_PULL   = 0.055;
    const LERP_ORB   = 0.030;   // slow corner-orb pull
    const LERP_GLOW  = 0.095;   // snappy-ish glow follow
    const ORB_HALF_W = 130;     // half of glow div width (260/2)
    const ORB_HALF_H = 130;

    let driftT = 0;
    let rafId  = 0;
    let entered = false;

    const clamp = (v: number, lo: number, hi: number) =>
      Math.max(lo, Math.min(hi, v));

    const onMove = (e: MouseEvent) => {
      mouse.x  = e.clientX;
      mouse.y  = e.clientY;
      entered  = true;
      if (glowRef.current) glowRef.current.style.opacity = '1';
    };

    const onLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    const tick = () => {
      driftT += 0.005;

      /* ── 1. Autonomous corner-orb drift ── */
      const d1x = Math.sin(driftT * 0.68) * 0.040;
      const d1y = Math.cos(driftT * 0.49) * 0.034;
      const d2x = Math.cos(driftT * 0.57) * 0.036;
      const d2y = Math.sin(driftT * 0.78) * 0.030;

      /* ── 2. Cursor pull (normalised 0-1) ── */
      const nx = mouse.x / W();
      const ny = mouse.y / H();
      c1.dx += (clamp((nx - 0.85) * MAX_PULL * 3, -MAX_PULL, MAX_PULL) - c1.dx) * LERP_ORB;
      c1.dy += (clamp((ny - 0.15) * MAX_PULL * 3, -MAX_PULL, MAX_PULL) - c1.dy) * LERP_ORB;
      c2.dx += (clamp((nx - 0.15) * MAX_PULL * 3, -MAX_PULL, MAX_PULL) - c2.dx) * LERP_ORB;
      c2.dy += (clamp((ny - 0.85) * MAX_PULL * 3, -MAX_PULL, MAX_PULL) - c2.dy) * LERP_ORB;

      if (trRef.current)
        trRef.current.style.transform =
          `translate(${(d1x + c1.dx) * 100}vw, ${(d1y + c1.dy) * 100}vh)`;
      if (blRef.current)
        blRef.current.style.transform =
          `translate(${(d2x + c2.dx) * 100}vw, ${(d2y + c2.dy) * 100}vh)`;

      /* ── 3. Cursor spotlight — lerped px position ── */
      glow.x += (mouse.x - glow.x) * LERP_GLOW;
      glow.y += (mouse.y - glow.y) * LERP_GLOW;
      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${glow.x - ORB_HALF_W}px, ${glow.y - ORB_HALF_H}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove',  onMove,  { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove',  onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ── Top-right corner ambient orb ── */}
      <div
        ref={trRef}
        aria-hidden="true"
        className="aurora-orb-1"
        style={{
          position: 'fixed',
          top: '-5%', right: '-5%',
          width: '35vw', height: '35vh',
          /* Narrowed spread so it doesn't cross the screen */
          background:
            'radial-gradient(ellipse at 40% 38%, rgba(255,255,255,0.06) 0%, transparent 30%),' +
            'radial-gradient(ellipse at 62% 58%, rgba(96,165,250,0.20) 0%, transparent 45%),' +
            'radial-gradient(ellipse at 30% 65%, rgba(29,78,216,0.24) 0%, transparent 40%),' +
            'radial-gradient(ellipse at center, rgba(59,130,246,0.30) 0%, rgba(147,197,253,0.12) 35%, transparent 60%)',
          pointerEvents: 'none',
          willChange: 'transform',
          zIndex: 0 }}
      />

      {/* ── Bottom-left corner ambient orb ── */}
      <div
        ref={blRef}
        aria-hidden="true"
        className="aurora-orb-2"
        style={{
          position: 'fixed',
          bottom: '-5%', left: '-5%',
          width: '32vw', height: '32vh',
          /* Narrowed spread so it doesn't cross the screen */
          background:
            'radial-gradient(ellipse at 58% 32%, rgba(255,255,255,0.05) 0%, transparent 30%),' +
            'radial-gradient(ellipse at 35% 60%, rgba(96,165,250,0.18) 0%, transparent 45%),' +
            'radial-gradient(ellipse at 65% 70%, rgba(29,78,216,0.20) 0%, transparent 40%),' +
            'radial-gradient(ellipse at center, rgba(59,130,246,0.24) 0%, rgba(147,197,253,0.10) 35%, transparent 60%)',
          pointerEvents: 'none',
          willChange: 'transform',
          zIndex: 0 }}
      />

      {/* ── Cursor spotlight — the "aura" that follows the cursor ── */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '260px', height: '260px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center,' +
            ' rgba(147,197,253,0.14) 0%,' +
            ' rgba(96,165,250,0.08) 25%,' +
            ' rgba(59,130,246,0.03) 55%,' +
            ' transparent 85%)',
          pointerEvents: 'none',
          willChange: 'transform',
          filter: 'blur(32px)',
          mixBlendMode: 'screen',
          zIndex: 2,
          opacity: 0,
          transition: 'opacity 0.6s ease' }}
      />
    </>
  );
}