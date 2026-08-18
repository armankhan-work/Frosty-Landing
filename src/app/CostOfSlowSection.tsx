'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Users, Clock, Trophy } from 'lucide-react';
import PremiumOddsDashboard from './PremiumOddsDashboard';

import HourglassSandCanvas from '@/components/HourglassSandCanvas';

export default function CostOfSlowSection() {
    return (
        <section id="cost" className="relative pt-8 sm:pt-12 lg:pt-14 pb-12 lg:pb-16 bg-transparent overflow-hidden">
            {/* Rich Ambient Purple / Warm Backdrop Aura */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(3, 150, 166,0.08)_0%,rgba(196,181,253,0.03)_40%,transparent_75%)] rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 w-full">

                    {/* ── Left Side: Pure Editorial Layout Blended Seamlessly ── */}
                    <div className="w-full lg:w-[46%] xl:w-[45%] flex flex-col justify-between z-10 lg:pr-4 xl:pr-6">

                        <div className="mb-5">
                            {/* Eyebrow */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0396A6]/[0.08] border border-[#0396A6]/20 mb-3.5 backdrop-blur-sm shadow-xs">
                                <span className="w-4 h-4 rounded-full bg-[#0396A6]/20 flex items-center justify-center">
                                    <Zap className="w-2.5 h-2.5 text-[#0396A6]" />
                                </span>
                                <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#0396A6]">THE COST OF A SLOW REPLY</span>
                            </div>

                            {/* Heading */}
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#18181B] leading-[1.12] tracking-tight mb-5">
                                The first five minutes decide who they <span className="text-[#0396A6] font-semibold" style={{ color: '#0396A6' }}>talk to.</span>
                            </h2>

                            {/* Body */}
                            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl mb-6">
                                Reply inside five minutes and your odds of qualifying the lead multiply - and almost nobody replies that fast. Frosty is built to win that window, every time.
                            </p>
                        </div>

                        {/* Boxless Inline Stats (Icon + Single Word Label + Big Value) */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-6 py-2 mb-6 border-y border-stone-200/50">

                            {/* Stat 1: Qualification */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
                                    <div className="w-6 h-6 rounded-lg bg-[#0396A6]/10 flex items-center justify-center shrink-0">
                                        <TrendingUp className="w-3.5 h-3.5 text-[#0396A6]" />
                                    </div>
                                    <span className="text-[9px] sm:text-[10px] font-semibold text-stone-600 tracking-wider uppercase">Qualification</span>
                                </div>
                                <div className="text-xl sm:text-2xl font-bold text-stone-900 leading-none font-sans">7×</div>
                            </div>

                            {/* Stat 2: Advantage */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
                                    <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                                        <Users className="w-3.5 h-3.5 text-amber-600" />
                                    </div>
                                    <span className="text-[9px] sm:text-[10px] font-semibold text-stone-600 tracking-wider uppercase">Advantage</span>
                                </div>
                                <div className="text-xl sm:text-2xl font-bold text-stone-900 leading-none font-sans">60×</div>
                            </div>

                            {/* Stat 3: Average */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
                                    <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                                        <Clock className="w-3.5 h-3.5 text-red-600" />
                                    </div>
                                    <span className="text-[9px] sm:text-[10px] font-semibold text-stone-600 tracking-wider uppercase">Average</span>
                                </div>
                                <div className="text-xl sm:text-2xl font-bold text-red-600 leading-none font-sans">0.4%</div>
                            </div>

                        </div>

                        {/* Bottom Insight Banner */}
                        <div className="w-full bg-[#0396A6]/[0.06] backdrop-blur-md rounded-2xl p-4 border border-[#0396A6]/15 shadow-sm flex items-center gap-3.5">
                            <div className="w-8 h-8 rounded-xl bg-[#0396A6] flex items-center justify-center shadow-[0_2px_10px_rgba(3, 150, 166,0.3)] shrink-0">
                                <Trophy className="w-4 h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-[13px] font-bold text-stone-900 leading-tight">Frosty Agent replies in seconds - before this chart even starts.</div>
                                <div className="text-[12px] text-stone-600 mt-0.5">While others respond, Frosty Agent converts.</div>
                            </div>
                        </div>

                    </div>

                    {/* ── Center: Majestic 3D Hourglass ── */}
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="hidden lg:flex w-[300px] xl:w-[340px] h-[430px] xl:h-[480px] shrink-0 relative items-center justify-center z-20 -mx-10 xl:-mx-12 pointer-events-none"
                    >
                        <div className="relative w-full h-full opacity-100" style={{
                            backgroundImage: "url('/glowing_hourglass.png')",
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}>
                            {/* Realistic Granular Physics Sand Canvas Simulation */}
                            <HourglassSandCanvas />

                            {/* Radiant Sand Heap Breathing Glow */}
                            <motion.div
                                animate={{ opacity: [0.45, 0.8, 0.45], scale: [0.96, 1.04, 0.96] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute left-1/2 -translate-x-1/2 top-[66.7%] -translate-y-1/2 w-[85px] xl:w-[95px] h-[25px] bg-[radial-gradient(ellipse_at_center,rgba(255,122,94,0.45)_0%,rgba(232,101,75,0.25)_45%,transparent_75%)] blur-[9px] rounded-full pointer-events-none"
                            />
                        </div>
                    </motion.div>

                    {/* ── Right Side: Chart Dashboard Blended Seamlessly ── */}
                    <div className="w-full lg:w-[46%] xl:w-[45%] relative flex flex-col z-10 lg:pl-4 xl:pl-6">
                        <PremiumOddsDashboard />
                    </div>

                </div>
            </div>
        </section>
    );
}
