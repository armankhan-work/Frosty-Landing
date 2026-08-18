'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    state: 'funnel' | 'falling' | 'settling';
    settleLife: number;
    slideDir: number;
}

// 4-Color Brand Palette: Coral-Orange Sand variations
const SAND_COLORS = [
    '#FF7A5E', // primary brand coral orange
    '#FF8A73', // bright coral
    '#E8654B', // deep coral
    '#FFA08C', // light coral highlight
    '#FFB5A5', // sunlit grain
    '#FFF5F2', // specular quartz speck
    '#D45138', // rich shadow grain
];

export default function HourglassSandCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let isRunning = true;

        const updateDimensions = () => {
            const w = canvas.clientWidth || canvas.offsetWidth || 280;
            const h = canvas.clientHeight || canvas.offsetHeight || 420;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        };

        updateDimensions();

        const resizeObserver = new ResizeObserver(() => {
            updateDimensions();
        });
        resizeObserver.observe(canvas);

        // Exact dynamic containment geometry based on background-size: contain (1:1 aspect)
        const getGeom = () => {
            const w = canvas.clientWidth || canvas.offsetWidth || 280;
            const h = canvas.clientHeight || canvas.offsetHeight || 420;
            const imgSize = Math.min(w, h);
            const offsetX = (w - imgSize) / 2;
            const offsetY = (h - imgSize) / 2;

            const cx = w / 2;
            // Calibrated to glowing_hourglass.png
            const neckY = offsetY + 0.475 * imgSize;
            const apexY = offsetY + 0.725 * imgSize;
            const funnelTopY = offsetY + 0.425 * imgSize;
            const neckHalfW = 0.007 * imgSize;

            return { w, h, imgSize, offsetX, offsetY, cx, neckY, apexY, funnelTopY, neckHalfW };
        };

        const createParticle = (spawnInFunnel = true): Particle => {
            const { cx, neckY, funnelTopY, neckHalfW, imgSize } = getGeom();
            const color = SAND_COLORS[Math.floor(Math.random() * SAND_COLORS.length)];
            // Micro-fine sand grains
            const size = 0.45 + Math.random() * 0.65;

            if (spawnInFunnel) {
                const y = funnelTopY + Math.random() * (neckY - funnelTopY);
                const progress = (y - funnelTopY) / Math.max(neckY - funnelTopY, 1);
                // Funnel narrows down towards neck strictly inside the glass cavity
                const currentMaxHalfW = (1 - progress) * (imgSize * 0.038) + neckHalfW;
                const x = cx + (Math.random() - 0.5) * 2 * currentMaxHalfW;

                return {
                    x,
                    y,
                    vx: (cx - x) * 0.03,
                    vy: 0.25 + Math.random() * 0.35,
                    size,
                    color,
                    alpha: 0.35 + Math.random() * 0.45,
                    state: 'funnel',
                    settleLife: 0,
                    slideDir: Math.random() > 0.5 ? 1 : -1,
                };
            } else {
                // Spawn directly in the falling stream at neck
                const x = cx + (Math.random() - 0.5) * neckHalfW * 1.6;
                return {
                    x,
                    y: neckY + Math.random() * 3,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: 1.1 + Math.random() * 0.7,
                    size,
                    color,
                    alpha: 0.65 + Math.random() * 0.3,
                    state: 'falling',
                    settleLife: 0,
                    slideDir: Math.random() > 0.5 ? 1 : -1,
                };
            }
        };

        const particles: Particle[] = [];
        const MAX_PARTICLES = 180;

        for (let i = 0; i < MAX_PARTICLES; i++) {
            particles.push(createParticle(Math.random() > 0.4));
        }

        let lastTime = performance.now();

        const render = (time: number) => {
            if (!isRunning) return;
            const dt = Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;

            const { w, h, cx, neckY, apexY, funnelTopY, neckHalfW, imgSize } = getGeom();

            ctx.clearRect(0, 0, w, h);

            // 1. Draw subtle natural trickling sand stream line in brand coral-orange
            const streamGrad = ctx.createLinearGradient(cx, neckY, cx, apexY);
            streamGrad.addColorStop(0, 'rgba(255, 245, 242, 0.9)');
            streamGrad.addColorStop(0.2, 'rgba(255, 122, 94, 0.85)');
            streamGrad.addColorStop(0.8, 'rgba(232, 101, 75, 0.7)');
            streamGrad.addColorStop(1, 'rgba(212, 81, 56, 0.4)');

            ctx.save();
            ctx.beginPath();
            const waver = Math.sin(time * 0.005) * 0.3;
            ctx.moveTo(cx - 0.6 + waver, neckY);
            ctx.lineTo(cx + 0.6 + waver, neckY);
            ctx.lineTo(cx + 1.0 + waver, apexY);
            ctx.lineTo(cx - 1.0 + waver, apexY);
            ctx.closePath();
            ctx.fillStyle = streamGrad;
            ctx.fill();

            // Fine bright core filament
            ctx.beginPath();
            ctx.moveTo(cx + waver, neckY);
            ctx.lineTo(cx + waver, apexY);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.restore();

            // 2. Update and draw micro-particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                if (p.state === 'funnel') {
                    // Funnel motion: gently converge inwards to neck
                    const dx = cx - p.x;
                    p.vx = dx * 0.04 + (Math.random() - 0.5) * 0.1;
                    p.vy += 0.03;
                    p.x += p.vx;
                    p.y += p.vy;

                    // Ensure grain strictly stays within funnel boundary
                    const progress = (p.y - funnelTopY) / Math.max(neckY - funnelTopY, 1);
                    const currentMaxHalfW = (1 - progress) * (imgSize * 0.038) + neckHalfW;
                    if (Math.abs(p.x - cx) > currentMaxHalfW) {
                        p.x = cx + Math.sign(p.x - cx) * currentMaxHalfW;
                    }

                    if (p.y >= neckY) {
                        p.state = 'falling';
                        p.x = cx + (Math.random() - 0.5) * neckHalfW * 1.5;
                        p.vy = 1.4 + Math.random() * 0.6;
                        p.alpha = 0.75 + Math.random() * 0.25;
                    }
                } else if (p.state === 'falling') {
                    // Gravitational acceleration
                    p.vy += 0.22;
                    // Keep stream tightly collimated
                    p.vx += (Math.random() - 0.5) * 0.12;
                    p.vx *= 0.90;
                    p.x += p.vx;
                    p.y += p.vy;

                    // Hard constraint to stream width
                    if (Math.abs(p.x - cx) > neckHalfW * 1.6) {
                        p.x = cx + Math.sign(p.x - cx) * neckHalfW * 1.6;
                    }

                    // Hits the sand mound apex cleanly
                    if (p.y >= apexY) {
                        p.state = 'settling';
                        p.y = apexY + Math.random() * 1.5;
                        p.vx = p.slideDir * (0.35 + Math.random() * 0.55);
                        p.vy = 0.2 + Math.random() * 0.3;
                        p.settleLife = 1.0;
                    }
                } else if (p.state === 'settling') {
                    // Subtle granular avalanche into the sand heap
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vx *= 0.88;
                    p.vy *= 0.90;
                    p.settleLife -= dt * 4.5;
                    p.alpha = Math.max(0, p.settleLife * 0.6);

                    if (p.settleLife <= 0 || p.y > apexY + imgSize * 0.025) {
                        Object.assign(p, createParticle(Math.random() > 0.45));
                    }
                }

                // Draw sharp micro-particle
                if (p.alpha > 0.02) {
                    ctx.save();
                    ctx.globalAlpha = p.alpha;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }

            // 3. Subtle soft landing contact glow (coral orange)
            ctx.save();
            const contactGrad = ctx.createRadialGradient(cx, apexY, 0, cx, apexY, 5);
            contactGrad.addColorStop(0, 'rgba(255, 245, 242, 0.7)');
            contactGrad.addColorStop(0.5, 'rgba(255, 122, 94, 0.35)');
            contactGrad.addColorStop(1, 'rgba(255, 122, 94, 0)');
            ctx.fillStyle = contactGrad;
            ctx.beginPath();
            ctx.arc(cx, apexY, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        const handleResize = () => {
            updateDimensions();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            isRunning = false;
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
    );
}
