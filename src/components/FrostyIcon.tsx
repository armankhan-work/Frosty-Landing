"use client";

import React from 'react';

/* ─── Frosty Official Two-Sparkle Brand Logo ─── */
export default function FrostyIcon({
  size = 28,
  rotation = 0,
  glow = 1,
  alpha = 1,
  className = ""
}: {
  size?: number;
  rotation?: number;
  glow?: number;
  alpha?: number;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center relative ${className}`}
      style={{
        width: size,
        height: size,
        opacity: alpha,
        transform: rotation ? `rotate(${rotation}rad)` : undefined,
        filter: glow > 0 ? `drop-shadow(0 0 ${glow * 8}px rgba(3, 150, 166, 0.45))` : 'none'
      }}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain pointer-events-none"
      >
        {/* Big teal 4-pointed diamond sparkle */}
        <path
          d="M13 2C13 8.075 8.075 13 2 13C8.075 13 13 17.925 13 24C13 17.925 17.925 13 24 13C17.925 13 13 8.075 13 2Z"
          fill="#0396A6"
        />
        {/* Small coral 4-pointed diamond sparkle */}
        <path
          d="M23 18C23 21.314 20.314 24 17 24C20.314 24 23 26.686 23 30C23 26.686 25.686 24 29 24C25.686 24 23 21.314 23 18Z"
          fill="#FF7A5E"
        />
      </svg>
    </div>
  );
}
