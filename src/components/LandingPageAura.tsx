'use client';

/**
 * LandingPageAura
 * 
 * A pure, non-interactive, static CSS aura specifically for the landing page.
 * Provides a pitch-black foundation with rich blue glowing auras strictly 
 * locked to the top-right and bottom-left bounds. 
 */
export default function LandingPageAura() {
  return (
    <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
      {/* ── Top-Right Cool Aura ── */}
      <div
        className="absolute top-0 right-0 w-[1200px] h-[1200px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(95, 35, 200, 0.35) 0%, rgba(95, 35, 200, 0.18) 25%, rgba(95, 35, 200, 0.05) 50%, transparent 75%)',
          /* Removed translation to keep the rich core slightly more visible on screen */
          transform: 'translate(10%, -10%)' }}
      />

      {/* ── Bottom-Left Cool Aura ── */}
      <div
        className="absolute bottom-0 left-0 w-[1000px] h-[1000px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(95, 35, 200, 0.30) 0%, rgba(95, 35, 200, 0.15) 25%, rgba(95, 35, 200, 0.04) 50%, transparent 75%)',
          transform: 'translate(-10%, 10%)' }}
      />
    </div>
  );
}