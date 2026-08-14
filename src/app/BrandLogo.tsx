'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FrostyIcon from '@/components/FrostyIcon';
import { useTheme } from 'next-themes';

gsap.registerPlugin(useGSAP);

export default function BrandLogo({ ready = true, collapsed = false, forceLight = false }: { ready?: boolean, collapsed?: boolean, forceLight?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useGSAP(() => {
    if (!ready) return;

    const tl = gsap.timeline({ delay: 0.1 });

    // Step 1: Snowflake spins in and locks
    tl.fromTo('.frost-icon',
      { rotation: -360, scale: 0, opacity: 0 },
      { rotation: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)' }
    )
    // Step 2: Text drawer opens while snowflake finishes braking
    .fromTo('.text-reveal-container',
      { width: 0, opacity: 0 },
      { 
        width: collapsed ? 0 : 'auto', 
        opacity: collapsed ? 0 : 1, 
        duration: 0.8, 
        ease: 'power3.out' 
      },
      '-=0.6'
    )
    // Step 3: Text slides out in sync with drawer
    .fromTo('.frosty-text',
      { x: -30 },
      { 
        x: 0, 
        opacity: collapsed ? 0 : 1,
        duration: 0.8, 
        ease: 'power3.out' 
      },
      '<'
    );

    // Hover micro-interaction
    const logo = containerRef.current;
    if (!logo) return;

    const onEnter = () => {
      gsap.to('.frost-icon', { rotation: 90, scale: 1.1, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => {
      gsap.to('.frost-icon', { rotation: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    };

    logo.addEventListener('mouseenter', onEnter);
    logo.addEventListener('mouseleave', onLeave);

    return () => {
      logo.removeEventListener('mouseenter', onEnter);
      logo.removeEventListener('mouseleave', onLeave);
    };
  }, { dependencies: [ready, collapsed, theme, forceLight], scope: containerRef });

  return (
    <div ref={containerRef} className="flex items-center cursor-pointer group select-none">
      
      {/* The Mechanical Snowflake Emoji */}
      <div 
        className="frost-icon flex-shrink-0 z-10 relative flex items-center justify-center translate-y-[-1px] mr-2"
        style={{ opacity: 0 }}
      >
        <FrostyIcon size={24} glow={forceLight ? 1.5 : 0.8} />
      </div>

      {/* The Hidden Text Drawer */}
      <div 
        className="text-reveal-container overflow-hidden flex items-center"
        style={{ width: 0, opacity: 0 }}
      >
        <span className="frosty-text font-sans font-bold text-2xl tracking-tight block pl-2 text-[#18181B]" style={{ whiteSpace: 'nowrap' }}>
          Frosty
        </span>
      </div>

    </div>
  );
}
