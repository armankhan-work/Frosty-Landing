'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Users, Clock, Trophy } from 'lucide-react';
import PremiumOddsDashboard from './PremiumOddsDashboard';

export default function CostOfSlowSection() {
    return (
        <section id="cost" className="relative pt-6 sm:pt-8 lg:pt-10 pb-8 lg:pb-12 bg-transparent">
            {/* Ambient Glows */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#5F23C8]/5 rounded-full blur-[100px]" />
            </div>
            
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col lg:flex-row justify-between items-center relative z-10 lg:gap-4">
                {/* Left Column */}
                <div className="w-full lg:w-[33%] shrink-0 flex flex-col bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-[24px] p-4 sm:p-5 lg:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] z-10">
                    
                    {/* Eyebrow */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-5 h-5 rounded-full bg-[#5F23C8]/10 border border-[#5F23C8]/20 flex items-center justify-center">
                            <Zap className="w-3 h-3 text-[#5F23C8]" />
                        </span>
                        <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#5F23C8]">THE COST OF A SLOW REPLY</span>
                    </div>
                    
                    {/* Heading */}
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-[#0F172A] leading-[1.15] tracking-tight mb-2">
                        The first five minutes decide who they <span className="text-[#5F23C8] font-semibold">talk to.</span>
                    </h2>
                    
                    {/* Body */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mb-4 sm:mb-5">
                        Reply inside five minutes and your odds of qualifying the lead multiply - and almost nobody replies that fast. Frosty is built to win that window, every time.
                    </p>
                    
                    {/* Premium Stat Cards */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
                        
                        {/* Card 1 */}
                        <div className="group flex-1 bg-white rounded-xl p-3 border border-slate-200 shadow-sm hover:border-[#5F23C8]/40 hover:shadow-md transition-all duration-300">
                            <div className="flex flex-col">
                                <div className="w-8 h-8 shrink-0 rounded-lg bg-[#5F23C8]/10 border border-[#5F23C8]/20 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
                                    <TrendingUp className="w-4 h-4 text-[#5F23C8]" />
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none mb-1 font-sans">7×</div>
                                    <p className="text-[10px] sm:text-[11px] text-slate-600 leading-[1.3]">more likely to qualify a lead when you reply within the hour than an hour later.</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Card 2 */}
                        <div className="group flex-1 bg-white rounded-xl p-3 border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all duration-300">
                            <div className="flex flex-col">
                                <div className="w-8 h-8 shrink-0 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
                                    <Users className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none mb-1 font-sans">60×</div>
                                    <p className="text-[10px] sm:text-[11px] text-slate-600 leading-[1.3]">more likely than the teams that wait a day or more.</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Card 3 */}
                        <div className="group flex-1 bg-white rounded-xl p-3 border border-slate-200 shadow-sm hover:border-red-400 hover:shadow-md transition-all duration-300">
                            <div className="flex flex-col">
                                <div className="w-8 h-8 shrink-0 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
                                    <Clock className="w-4 h-4 text-red-600" />
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-red-600 leading-none mb-1 font-sans">0.4%</div>
                                    <p className="text-[10px] sm:text-[11px] text-slate-600 leading-[1.3]">of first replies actually go out inside five minutes.</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    {/* Bottom Insight Card */}
                    <div className="w-full bg-[#5F23C8]/10 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-[#5F23C8]/25 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#5F23C8] flex items-center justify-center shadow-[0_2px_8px_rgba(95,35,200,0.3)] shrink-0">
                                <Trophy className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-[12px] font-bold text-slate-900 leading-snug mb-0.5">Frosty replies in seconds - before this chart even starts.</div>
                                <div className="text-[11px] text-slate-600">While others respond, we convert.</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Center Hourglass */}
                <motion.div 
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="hidden lg:flex w-[34%] relative items-center justify-center z-0 h-[300px] xl:h-[350px]"
                >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-90 scale-[1.3] xl:scale-[1.5]" style={{
                        backgroundImage: "url('/glowing_hourglass.png')",
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
                        maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)'
                    }}>
                        <div className="absolute left-[50%] -translate-x-1/2 top-[41%] w-[10px] h-[50px] xl:h-[60px] overflow-hidden pointer-events-none">
                            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[0.5px] h-full bg-gradient-to-b from-transparent via-[#5F23C8] to-transparent opacity-40" />
                            {[...Array(20)].map((_, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ y: -5, opacity: 0 }}
                                    animate={{ y: 90, opacity: [0, 1, 1, 0] }}
                                    transition={{ 
                                        duration: 1.5, 
                                        repeat: Infinity, 
                                        ease: 'linear', 
                                        delay: i * 0.1 
                                    }}
                                    className="absolute left-1/2 -translate-x-1/2 w-[1.5px] h-[3px] rounded-full bg-[#5F23C8] shadow-[0_0_4px_#5F23C8]"
                                    style={{ marginLeft: i % 2 === 0 ? '-0.5px' : (i % 3 === 0 ? '0.5px' : '0px') }}
                                />
                            ))}
                        </div>
                        <motion.div 
                            animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute left-[50%] -translate-x-1/2 bottom-[26%] w-[40px] h-[15px] bg-[#5F23C8]/30 blur-[6px] rounded-full"
                        />
                    </div>
                </motion.div>

                {/* Right Column */}
                <div className="w-full lg:w-[33%] relative mt-12 lg:mt-0 flex flex-col z-10">
                    <PremiumOddsDashboard />
                </div>
            </div>
        </section>
    );
}
