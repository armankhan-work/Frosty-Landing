'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  formatter?: (value: number) => string;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedNumber({
  value,
  duration = 900,
  decimals = 0,
  formatter,
  prefix = '',
  suffix = '',
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValueRef = useRef(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    const target = Number.isFinite(value) ? value : 0;
    const from = mountedRef.current ? previousValueRef.current : 0;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || duration <= 0 || from === target) {
      setDisplayValue(target);
      previousValueRef.current = target;
      mountedRef.current = true;
      return;
    }

    let rafId = 0;
    let startedAt = 0;

    const animate = (ts: number) => {
      if (!startedAt) startedAt = ts;
      const t = Math.min((ts - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (target - from) * eased;
      setDisplayValue(next);

      if (t < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        previousValueRef.current = target;
      }
    };

    rafId = requestAnimationFrame(animate);
    mountedRef.current = true;

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [value, duration]);

  const text = formatter
    ? formatter(displayValue)
    : displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

  return <>{prefix}{text}{suffix}</>;
}
