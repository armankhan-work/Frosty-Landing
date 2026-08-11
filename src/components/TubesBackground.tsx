'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(() => typeof window !== 'undefined' && !!(window as any).TubesCursor);
  const tubesRef = useRef<any>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isIdleRef = useRef<boolean>(true);
  const lastPosRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });

  // ─── Idle detection: fake pointer leave/enter on the canvas ───
  useEffect(() => {
    if (!isLoaded) return;

    const IDLE_DELAY = 1500;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const enterIdle = () => {
      if (isIdleRef.current) return;
      isIdleRef.current = true;

      // Smoothly drift to center before leaving to avoid jerky jump
      import('gsap').then(({ gsap }) => {
        gsap.to(lastPosRef.current, {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          duration: 2.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (!isIdleRef.current) return;
            const e = new MouseEvent('mousemove', {
              clientX: lastPosRef.current.x,
              clientY: lastPosRef.current.y,
              bubbles: true
            });
            (e as any).__synthetic = true;
            canvas.dispatchEvent(e);

            // Also pointermove for modern libs
            const pe = new PointerEvent('pointermove', {
              clientX: lastPosRef.current.x,
              clientY: lastPosRef.current.y,
              bubbles: true,
              pointerType: 'mouse'
            });
            (pe as any).__synthetic = true;
            canvas.dispatchEvent(pe);
          },
          onComplete: () => {
            if (!isIdleRef.current) return;

            canvas.dispatchEvent(new PointerEvent('pointerleave', {
              bubbles: true,
              cancelable: true,
              clientX: -1,
              clientY: -1,
            }));

            document.body.dispatchEvent(new PointerEvent('pointerleave', {
              bubbles: false,
              cancelable: true,
            }));
          }
        });
      });
    };

    const exitIdle = () => {
      if (!isIdleRef.current) return;
      isIdleRef.current = false;
      import('gsap').then(({ gsap }) => {
        gsap.killTweensOf(lastPosRef.current);
      });
    };

    const scheduleIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(enterIdle, IDLE_DELAY);
    };

    // Filter: ignore synthetic events we might dispatch
    const onMouseMove = (e: MouseEvent) => {
      if ((e as any).__synthetic) return;
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      exitIdle();
      scheduleIdle();
    };

    window.addEventListener('mousemove', onMouseMove);
    scheduleIdle(); // start idle immediately on mount

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isLoaded]);
  // ──────────────────────────────────────────────────────────────

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = () => {
      if (!canvasRef.current || !scriptLoaded || !(window as any).TubesCursor) return;

      try {
        const TubesCursor = (window as any).TubesCursor;
        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          bloom: {
            threshold: 0.2,
            strength: 0.6,
            radius: 0.4
          },
          tubes: {
            colors: ["#4338CA", "#7C3AED", "#A78BFA", "#DDD6FE", "#F5F3FF"],
            lights: {
              intensity: 200,
              colors: ["#7C3AED", "#A78BFA", "#4338CA", "#6D28D9"]
            }
          }
        });

        tubesRef.current = app;
        setIsLoaded(true);

        // Instantly force idle state on mount to prevent the initial freeze and subsequent jerk
        setTimeout(() => {
          if (canvasRef.current) {
             canvasRef.current.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true, cancelable: true }));
          }
        }, 50);

        cleanup = () => {
          if (tubesRef.current && typeof tubesRef.current.dispose === 'function') {
            tubesRef.current.dispose();
          }
        };
      } catch (error) {
        console.error("Failed to initialize TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, [scriptLoaded]);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;
    const frostyColors = ["#4338CA", "#7C3AED", "#A78BFA", "#DDD6FE", "#F5F3FF"];
    const rand = () => frostyColors[Math.floor(Math.random() * frostyColors.length)];
    tubesRef.current.tubes.setColors([rand(), rand(), rand()]);
    tubesRef.current.tubes.setLightsColors([rand(), rand(), rand(), rand()]);
  };

  return (
    <>
      <Script
        src="/tubes.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div
        className={`overflow-hidden ${className || "relative w-full h-full min-h-[400px]"}`}
        onClick={handleClick}
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)' }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ touchAction: 'none' }}
        />
        <div className="relative z-10 w-full h-full pointer-events-none">
          {children}
        </div>
      </div>
    </>
  );
}

export default TubesBackground;