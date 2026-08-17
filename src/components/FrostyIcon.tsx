"use client";

import { useEffect, useRef } from 'react';

// 1. The Core Geometric Rendering Engines
function drawArm(cx: CanvasRenderingContext2D, len: number) {
  cx.moveTo(0, 0); cx.lineTo(0, -len);
  [.32, .55, .75].forEach(p => {
    const y = -len * p, b = len * .18 * (1 - p * .4);
    cx.moveTo(0, y); cx.lineTo(b, y - b * .5);
    cx.moveTo(0, y); cx.lineTo(-b, y - b * .5);
  });
}

function drawSnowflake(cx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, glowI: number, alpha: number) {
  cx.save();
  cx.translate(x, y); cx.rotate(rotation); cx.globalAlpha = alpha;

  // Soft Vibrant Aura Layer
  if (glowI > 0.01) {
    const grad = cx.createRadialGradient(0, 0, 0, 0, 0, size * 1.8);
    grad.addColorStop(0, `rgba(3, 150, 166,${glowI * .25})`);
    grad.addColorStop(.5, `rgba(255, 122, 94,${glowI * .12})`);
    grad.addColorStop(1, 'rgba(3, 150, 166,0)');
    cx.fillStyle = grad;
    cx.fillRect(-size * 2, -size * 2, size * 4, size * 4);
  }

  // Base Structural Gradients - Vibrant Frost Purple & Sky Blue
  const sg = cx.createLinearGradient(-size, -size, size, size);
  sg.addColorStop(0, '#0396A6');
  sg.addColorStop(.5, '#14B8A6');
  sg.addColorStop(1, '#FF7A5E');
  
  cx.save();
  cx.shadowColor = 'rgba(3, 150, 166,0.35)';
  cx.shadowBlur = glowI * 12;
  cx.strokeStyle = 'rgba(3, 150, 166,0.85)';
  cx.lineWidth = size * .036;
  cx.lineCap = 'round';
  cx.beginPath();
  for (let i = 0; i < 6; i++) { cx.save(); cx.rotate(i * Math.PI / 3); drawArm(cx, size * .48); cx.restore(); }
  cx.stroke();
  cx.restore();

  // Top Layer Details
  cx.strokeStyle = sg;
  cx.lineWidth = size * .038;
  cx.lineCap = 'round';
  cx.beginPath();
  for (let i = 0; i < 6; i++) { cx.save(); cx.rotate(i * Math.PI / 3); drawArm(cx, size * .48); cx.restore(); }
  cx.stroke();

  // Inner Triangles
  [0, 60, 120].forEach(a => {
    const rad = a * Math.PI / 180;
    cx.beginPath();
    cx.moveTo(Math.cos(rad) * size * .13, Math.sin(rad) * size * .13);
    cx.lineTo(Math.cos(rad + Math.PI) * size * .13, Math.sin(rad + Math.PI) * size * .13);
    cx.strokeStyle = 'rgba(3, 150, 166,0.6)';
    cx.lineWidth = size * .024;
    cx.stroke();
  });

  // Core Center Pearl
  const cg = cx.createRadialGradient(0, 0, 0, 0, 0, size * .08);
  cg.addColorStop(0, '#FFFFFF');
  cg.addColorStop(.4, '#DDD6FE');
  cg.addColorStop(1, '#0396A6');
  cx.beginPath();
  cx.arc(0, 0, size * .07, 0, Math.PI * 2);
  cx.fillStyle = cg;
  cx.fill();

  cx.restore();
}

// 2. The Reusable React Component
export default function FrostyIcon({
  size = 28,      // Core size of the snowflake
  rotation = 0,   // Current rotation in radians
  glow = 1,       // Intensity of the neon aura
  alpha = 1,      // Overall opacity
  className = ""  // For passing Tailwind utility classes
}: {
  size?: number;
  rotation?: number;
  glow?: number;
  alpha?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center relative ${className}`} style={{ width: size, height: size, opacity: alpha, transform: `rotate(${rotation}rad)`, filter: glow > 0 ? `drop-shadow(0 0 ${glow * 10}px rgba(3, 150, 166, 0.4))` : 'none' }}>
      <img src="/logonew.png" alt="Frosty Logo" className="w-full h-full object-contain pointer-events-none" />
    </div>
  );
}
