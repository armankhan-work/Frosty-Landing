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

    const onMouseMove = (e: MouseEvent) => {
      if ((e as any).__synthetic) return;
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      exitIdle();
      scheduleIdle();
    };

    window.addEventListener('mousemove', onMouseMove);
    scheduleIdle();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isLoaded]);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = () => {
      if (!canvasRef.current || !scriptLoaded || !(window as any).TubesCursor) return;

      try {
        const TubesCursor = (window as any).TubesCursor;
        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          bloom: false,
          sleepRadiusX: 300,
          sleepRadiusY: 150,
          sleepTimeScale1: 1,
          sleepTimeScale2: 2,
          tubes: {
            count: 16,
            // Single solid darkest shade: Deep Royal Violet (#6D28D9)
            colors: ["#6D28D9", "#6D28D9", "#6D28D9"],
            minRadius: 0.005,
            maxRadius: 0.05,
            minTubularSegments: 32,
            maxTubularSegments: 128,
            material: {
              metalness: 0.25,
              roughness: 0.35,
            },
            lights: {
              intensity: 220,
              colors: ["#FFFFFF", "#DDD6FE", "#FFFFFF", "#C4B5FD"]
            },
            lerp: 0.5,
            noise: 0.05
          }
        });

        // Ensure canvas renderer clear color is transparent
        if (app && app.three && app.three.renderer) {
          app.three.renderer.setClearColor(0x000000, 0);
        }

        tubesRef.current = app;
        setIsLoaded(true);

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
    tubesRef.current.tubes.setColors(["#6D28D9", "#6D28D9", "#6D28D9"]);
    tubesRef.current.tubes.setLightsColors(["#FFFFFF", "#DDD6FE", "#FFFFFF", "#C4B5FD"]);
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
          background: 'transparent'
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ touchAction: 'none', background: 'transparent' }}
        />
        <div className="relative z-10 w-full h-full pointer-events-none">
          {children}
        </div>
      </div>
    </>
  );
}

export default TubesBackground;