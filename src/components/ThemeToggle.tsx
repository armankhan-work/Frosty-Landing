// @ts-nocheck
'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const TAU = Math.PI * 2;

function buildSplashPath(
  cx: number,
  cy: number,
  radius: number,
  amplitude: number,
  phase: number,
  lobes = 6,
  steps = 96,
) {
  const points: Array<{ x: number; y: number }> = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * TAU;
    const waveA = Math.sin(t * lobes + phase);
    const waveB = Math.sin(t * (lobes * 0.5) - phase * 0.7);
    const waveC = Math.sin(t * (lobes * 1.35) + phase * 0.5);
    const r = Math.max(
      0,
      radius +
        waveA * amplitude * 0.8 +
        waveB * amplitude * 0.32 +
        waveC * amplitude * 0.12,
    );
    points.push({
      x: cx + Math.cos(t) * r,
      y: cy + Math.sin(t) * r,
    });
  }

  if (!points.length) return `M ${cx} ${cy} Z`;
  const first = points[0];
  const rest = points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
  return `M ${first.x} ${first.y} ${rest} Z`;
}

export function ThemeToggle({ variant = 'button', onToggle }: { variant?: 'button' | 'menuItem', onToggle?: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const isDark = theme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      onToggle?.();
      setIsAnimating(false);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const maxDist = Math.max(
      Math.hypot(originX, originY),
      Math.hypot(window.innerWidth - originX, originY),
      Math.hypot(originX, window.innerHeight - originY),
      Math.hypot(window.innerWidth - originX, window.innerHeight - originY)
    );

    const clipId = `theme-splash-clip-${Date.now()}`;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = 'position: fixed; inset: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 2147483647;';
    svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    clipPath.id = clipId;
    clipPath.setAttribute('clipPathUnits', 'userSpaceOnUse');

    const splashShape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    splashShape.setAttribute('d', buildSplashPath(originX, originY, 2, 5.5, 0, 6, 96));
    clipPath.appendChild(splashShape);

    // Visible contour layers to give the wave a subtle 3D liquid rim.
    const rimShadow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rimShadow.setAttribute('d', buildSplashPath(originX, originY, 2, 5.5, 0, 6, 96));
    rimShadow.setAttribute('fill', 'none');
    rimShadow.setAttribute('stroke', 'rgba(7, 89, 133, 0.22)');
    rimShadow.setAttribute('stroke-width', '18');
    rimShadow.setAttribute('stroke-linecap', 'round');
    rimShadow.setAttribute('stroke-linejoin', 'round');
    rimShadow.setAttribute('transform', 'translate(0 4)');
    rimShadow.style.filter = 'blur(5px)';
    rimShadow.style.opacity = '0';

    const rimHighlight = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rimHighlight.setAttribute('d', buildSplashPath(originX, originY, 2, 5.5, 0, 6, 96));
    rimHighlight.setAttribute('fill', 'none');
    rimHighlight.setAttribute('stroke', 'rgba(224, 242, 254, 0.8)');
    rimHighlight.setAttribute('stroke-width', '10');
    rimHighlight.setAttribute('stroke-linecap', 'round');
    rimHighlight.setAttribute('stroke-linejoin', 'round');
    rimHighlight.style.filter = 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.35))';
    rimHighlight.style.opacity = '0';

    defs.appendChild(clipPath);
    svg.appendChild(defs);
    svg.appendChild(rimShadow);
    svg.appendChild(rimHighlight);
    document.body.appendChild(svg);

    const style = document.createElement('style');
    style.innerHTML = `
      ::view-transition-old(root) {
        animation: none;
        z-index: 1;
      }
      ::view-transition-new(root) {
        animation: theme-splash-hold 1.7s linear forwards;
        z-index: 2;
        clip-path: url('#${clipId}');
      }
      @keyframes theme-splash-hold {
        from { opacity: 1; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const start = performance.now();
      const duration = 1450;

      // Gather all interactive elements to apply the 3D ripple pop
      const interactives = document.querySelectorAll('button, a, [role="button"]');
      const interactiveData = Array.from(interactives).map(el => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();
        return {
          el: htmlEl,
          dist: Math.hypot((rect.left + rect.width / 2) - originX, (rect.top + rect.height / 2) - originY),
          originalTransform: htmlEl.style.transform,
          originalTransition: htmlEl.style.transition
        };
      });

      // Disable CSS transitions temporarily so our frame-by-frame transform is instantaneous
      interactiveData.forEach(b => {
        b.el.style.transition = 'none';
      });

      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeInOutSine(progress);

        const baseRadius = maxDist * 1.12 * eased;
        const amplitude = Math.pow(1 - progress, 1.1) * 12 + 0.55;
        const phase = elapsed / 300;
        const path = buildSplashPath(originX, originY, baseRadius, amplitude, phase, 6, 96);
        splashShape.setAttribute('d', path);
        rimShadow.setAttribute('d', path);
        rimHighlight.setAttribute('d', path);

        const rimFade = Math.max(0, 1 - progress / 0.86);
        rimShadow.style.opacity = String(0.45 * rimFade);
        rimHighlight.style.opacity = String(0.72 * rimFade);

        // Apply spatial pop to interactives
        const waveThickness = 180; // pixels
        interactiveData.forEach(b => {
          const diff = baseRadius - b.dist;
          if (diff > -waveThickness && diff < waveThickness) {
            // Parabolic intensity curve
            const intensity = Math.pow(Math.max(0, 1 - Math.abs(diff) / waveThickness), 2);
            const scale = 1 + 0.12 * intensity;
            const yPop = -8 * intensity;
            b.el.style.transform = `scale(${scale}) translateY(${yPop}px)`;
          } else if (diff >= waveThickness && b.el.style.transform !== b.originalTransform) {
            // Wave passed, ensure it is reset
            b.el.style.transform = b.originalTransform;
          }
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    });

    transition.finished.then(() => {
      svg.remove();
      style.remove();
      setIsAnimating(false);
      // Restore original inline styles
      const interactives = document.querySelectorAll('button, a, [role="button"]');
      interactives.forEach(el => {
        (el as HTMLElement).style.transform = '';
        (el as HTMLElement).style.transition = '';
      });
    });
  };

    if (!mounted) {
    if (variant === 'menuItem') {
      return (
        <button
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 12px', background: 'transparent', border: 'none',
            borderRadius: 8, color: 'var(--foreground)', fontSize: 13, fontWeight: 500,
            cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s'
          }}
        >
          <div style={{ width: 15, height: 15 }} />
          Toggle Theme
        </button>
      );
    }
    return (
      <button style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-strong)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--foreground)', transition: 'all 0.2s' }}>
        <div style={{ width: 18, height: 18 }} />
      </button>
    );
  }

  if (variant === 'menuItem') {
    return (
      <button
        onClick={handleToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 12px', background: 'transparent', border: 'none',
          borderRadius: 8, color: 'var(--foreground)', fontSize: 13, fontWeight: 500,
          cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--input-bg)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        Toggle Theme
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      style={{
        width: 40, height: 40,
        background: 'var(--input-bg)',
        border: '1px solid var(--border-strong)',
        borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: 'var(--foreground)',
        transition: 'all 0.2s',
        position: 'relative',
        zIndex: 100
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--sidebar-hover)'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--input-bg)'}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
