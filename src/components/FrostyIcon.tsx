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

  // Neon Glow Layer
  if (glowI > 0.01) {
    const grad = cx.createRadialGradient(0, 0, 0, 0, 0, size * 1.8);
    grad.addColorStop(0, `rgba(202,232,185,${glowI * .35})`);
    grad.addColorStop(.5, `rgba(154,188,133,${glowI * .15})`);
    grad.addColorStop(1, 'rgba(154,188,133,0)');
    cx.fillStyle = grad;
    cx.fillRect(-size * 2, -size * 2, size * 4, size * 4);
  }

  // Base Structural Gradients
  const sg = cx.createLinearGradient(-size, -size, size, size);
  sg.addColorStop(0, '#F0F5EB'); sg.addColorStop(.5, '#CAE8B9'); sg.addColorStop(1, '#9ABC85');
  
  cx.save();
  cx.shadowColor = '#CAE8B9'; cx.shadowBlur = glowI * 18;
  cx.strokeStyle = 'rgba(202,232,185,0.8)';
  cx.lineWidth = size * .03; cx.lineCap = 'round';
  cx.beginPath();
  for (let i = 0; i < 6; i++) { cx.save(); cx.rotate(i * Math.PI / 3); drawArm(cx, size * .48); cx.restore(); }
  cx.stroke(); cx.restore();

  // Top Layer Details
  cx.strokeStyle = sg; cx.lineWidth = size * .032; cx.lineCap = 'round';
  cx.beginPath();
  for (let i = 0; i < 6; i++) { cx.save(); cx.rotate(i * Math.PI / 3); drawArm(cx, size * .48); cx.restore(); }
  cx.stroke();

  // Inner Triangles
  [0, 60, 120].forEach(a => {
    const rad = a * Math.PI / 180;
    cx.beginPath();
    cx.moveTo(Math.cos(rad) * size * .13, Math.sin(rad) * size * .13);
    cx.lineTo(Math.cos(rad + Math.PI) * size * .13, Math.sin(rad + Math.PI) * size * .13);
    cx.strokeStyle = 'rgba(240,245,235,0.7)'; cx.lineWidth = size * .02;
    cx.stroke();
  });

  // Core Center Pearl
  const cg = cx.createRadialGradient(0, 0, 0, 0, 0, size * .08);
  cg.addColorStop(0, '#ffffff'); cg.addColorStop(.4, '#F0F5EB'); cg.addColorStop(1, '#9ABC85');
  cx.beginPath(); cx.arc(0, 0, size * .065, 0, Math.PI * 2);
  cx.fillStyle = cg; cx.fill();

  cx.restore();
}

// 2. The Reusable React Component
export default function FrostyIcon({
  size = 28,      // Core size of the snowflake
  rotation = 0,   // Current rotation in radians
  glow = 1,       // Intensity of the neon cyan aura
  alpha = 1,      // Overall opacity
  className = ""  // For passing Tailwind utility classes
}: {
  size?: number;
  rotation?: number;
  glow?: number;
  alpha?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.getContext('2d');
    if (!cx) return;

    // Retina Display (High-DPI) scaling to keep it crisp
    const dpr = window.devicePixelRatio || 1;

    // We create a bounding box exactly 4x the size to ensure the heavy glow is never clipped
    const boundingBox = size * 4;

    canvas.width = boundingBox * dpr;
    canvas.height = boundingBox * dpr;

    cx.scale(dpr, dpr);
    cx.clearRect(0, 0, boundingBox, boundingBox);

    // Render it perfectly dead-center
    drawSnowflake(cx, boundingBox / 2, boundingBox / 2, size, rotation, glow, alpha);

  }, [size, rotation, glow, alpha]);

  return (
    <div className={`flex items-center justify-center relative ${className}`} style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: size * 4,
          height: size * 4,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
