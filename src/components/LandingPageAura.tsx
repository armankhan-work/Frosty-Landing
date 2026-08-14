'use client';

/**
 * LandingPageAura
 * 
 * A pure, non-interactive, static CSS aura specifically for the light white-shade landing page.
 * Provides a clean foundation with soft luminous frost-violet and warm champagne-amber glowing auras 
 * strictly locked to the top-right and bottom-left bounds. 
 */
export default function LandingPageAura() {
  return (
    <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
      {/* ── Top-Right Warm Violet / Champagne Aura ── */}
      <div
        className="absolute top-0 right-0 w-[1200px] h-[1200px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(95, 35, 200, 0.04) 0%, rgba(245, 158, 11, 0.025) 30%, rgba(95, 35, 200, 0.01) 60%, transparent 80%)',
          transform: 'translate(10%, -10%)'
        }}
      />

      {/* ── Bottom-Left Warm Amber / Frost Glow ── */}
      <div
        className="absolute bottom-0 left-0 w-[1000px] h-[1000px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(217, 119, 6, 0.03) 0%, rgba(95, 35, 200, 0.025) 30%, rgba(251, 191, 36, 0.01) 60%, transparent 80%)',
          transform: 'translate(-10%, 10%)'
        }}
      />
    </div>
  );
}