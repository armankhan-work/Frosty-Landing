'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Users, Clock, Trophy } from 'lucide-react';
import PremiumOddsDashboard from './PremiumOddsDashboard';

export default function CostOfSlowSection() {
    return (
        <section id="cost" className="relative pt-10 sm:pt-12 lg:pt-16 pb-16 lg:pb-24 bg-transparent">
            {/* Subtle Gradients and Glowing Hourglass */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                {/* Purple ambient glow behind hourglass */}
                <div className="absolute left-[45%] top-[25%] -translate-x-1/2 w-[300px] h-[300px] bg-[#8B5CF6]/20 rounded-full blur-[80px] mix-blend-screen" />
                
                {/* The Hourglass Image */}
                <div className="absolute left-[45%] top-[10%] -translate-x-1/2 w-[260px] h-[260px] opacity-90" style={{
                    backgroundImage: "url('/glowing_hourglass.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    mixBlendMode: 'screen',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
                }}>
                    {/* Smooth Infinite Falling Sand Particles */}
                    <div className="absolute left-[50%] -translate-x-1/2 top-[41%] w-[10px] h-[65px] overflow-hidden pointer-events-none">
                        {/* Center thin beam for the continuous flow look */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[0.5px] h-full bg-gradient-to-b from-transparent via-[#a78bfa] to-transparent opacity-30" />
                        
                        {/* Falling individual particles */}
                        {[...Array(15)].map((_, i) => (
                            <motion.div 
                                key={i}
                                initial={{ y: -5, opacity: 0 }}
                                animate={{ y: 70, opacity: [0, 1, 1, 0] }}
                                transition={{ 
                                    duration: 1.5, 
                                    repeat: Infinity, 
                                    ease: 'linear', 
                                    delay: i * 0.15 
                                }}
                                className="absolute left-1/2 -translate-x-1/2 w-[1px] h-[2.5px] rounded-full bg-[#eaddff] shadow-[0_0_3px_#fff]"
                                style={{ marginLeft: i % 2 === 0 ? '-0.5px' : (i % 3 === 0 ? '0.5px' : '0px') }}
                            />
                        ))}
                    </div>
                    
                    {/* Sand piling up animation (pulsing glow at bottom) */}
                    <motion.div 
                        animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute left-[50%] -translate-x-1/2 bottom-[26%] w-[45px] h-[15px] bg-[#a78bfa]/40 blur-[8px] rounded-full"
                    />
                </div>
            </div>
            
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 flex flex-col lg:flex-row justify-between items-center relative z-10">
                
                {/* Left Column */}
                <div className="w-full lg:w-[40%] shrink-0 flex flex-col xl:pr-8 lg:pt-8">
                    
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-6 h-6 rounded-full bg-[#5F23C8]/10 border border-[#5F23C8]/20 flex items-center justify-center">
                            <Zap className="w-3.5 h-3.5 text-[#5F23C8]" />
                        </span>
                        <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#5F23C8]">THE COST OF A SLOW REPLY</span>
                    </div>
                    
                    {/* Heading */}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-4 sm:mb-6">
                        The first five minutes decide who they <span className="text-[#8B5CF6]">talk to.</span>
                    </h2>
                    
                    {/* Body */}
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mb-8 sm:mb-12">
                        Reply inside five minutes and your odds of qualifying the lead multiply - and almost nobody replies that fast. Frosty is built to win that window, every time.
                    </p>
                    
                    {/* Premium Stat Cards */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                        
                        {/* Card 1 */}
                        <div className="group flex-1 bg-[#0A0A14]/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] hover:border-[#8B5CF6]/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300">
                            <div className="flex items-center gap-3 sm:gap-0 sm:block">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg sm:rounded-xl bg-[#5F23C8]/10 border border-[#5F23C8]/20 flex items-center justify-center sm:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#5F23C8]/20">
                                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#5F23C8]" />
                                </div>
                                <div>
                                    <div className="text-[24px] sm:text-[32px] font-bold text-white leading-none mb-1 font-sans">7×</div>
                                    <p className="text-[12px] sm:text-[13px] text-slate-400 leading-[1.4] sm:leading-[1.5]">more likely to qualify a lead when you reply within the hour than an hour later.</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Card 2 */}
                        <div className="group flex-1 bg-[#0A0A14]/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] hover:border-[#F59E0B]/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-300">
                            <div className="flex items-center gap-3 sm:gap-0 sm:block">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg sm:rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center sm:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#F59E0B]/20">
                                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B]" />
                                </div>
                                <div>
                                    <div className="text-[24px] sm:text-[32px] font-bold text-white leading-none mb-1 font-sans">60×</div>
                                    <p className="text-[12px] sm:text-[13px] text-slate-400 leading-[1.4] sm:leading-[1.5]">more likely than the teams that wait a day or more.</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Card 3 */}
                        <div className="group flex-1 bg-[#0A0A14]/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] hover:border-[#EF4444]/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all duration-300">
                            <div className="flex items-center gap-3 sm:gap-0 sm:block">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg sm:rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 flex items-center justify-center sm:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#EF4444]/20">
                                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#EF4444]" />
                                </div>
                                <div>
                                    <div className="text-[24px] sm:text-[32px] font-bold text-[#EF4444] leading-none mb-1 font-sans">0.4%</div>
                                    <p className="text-[12px] sm:text-[13px] text-slate-400 leading-[1.4] sm:leading-[1.5]">of first replies actually go out inside five minutes.</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    {/* Bottom Insight Card */}
                    <div className="w-full bg-[#0A0A14]/80 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-[#8B5CF6]/30 shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#5F23C8] flex items-center justify-center shadow-[0_0_15px_rgba(95, 35, 200,0.3)] shrink-0">
                                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-[13px] sm:text-[14px] font-bold text-white leading-snug">Frosty replies in seconds - before this chart even starts.</div>
                                <div className="text-[12px] sm:text-[13px] text-slate-400">While others respond, we convert.</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column */}
                <div className="w-full lg:w-[46%] relative mt-12 lg:mt-0">
                    <PremiumOddsDashboard />
                </div>

            </div>
        </section>
    );
}
