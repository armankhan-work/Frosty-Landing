'use client';

import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CursorAura from './CursorAura';

export default function GlobalBackground() {
  const { theme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  if (!isDark) return null;

  // Don't render CursorAura orbs on the landing/marketing page.
  // The landing page manages its own static background via globals.css
  const isLandingPage = pathname === '/' || pathname === '';

  if (isLandingPage) return null;

  return <CursorAura />;
}
