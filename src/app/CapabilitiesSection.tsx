'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Database, Zap, Wrench, UserCheck, ShieldCheck } from 'lucide-react';
import IsometricPlatform from './IsometricPlatform';

export default function CapabilitiesSection() {
    return (
        <section id="under-the-hood" className="relative pt-12 pb-24 lg:pb-32 bg-transparent overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full relative mb-12">
                    {/* Left: text */}
                    <div className="w-full lg:w-[45%] flex flex-col items-start text-left lg:pr-8 xl:pr-12">
                        {/* Premium Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 relative group"
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                            }}
                        >
                            <div className="absolute inset-0 rounded-full bg-[#5F23C8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Settings className="w-3.5 h-3.5 text-[#5F23C8] animate-[spin_4s_linear_infinite]" />
                            <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#5F23C8]">Under the hood</span>
                        </motion.div>

                        {/* Editorial Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                            className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-10"
                        >
                            Enterprise-grade.<br />
                            <div style={{ height: '0.25em' }} />
                            <span style={{ color: '#5F23C8' }}>Engineered</span><br />
                            from the ground up.
                        </motion.h2>

                        {/* Premium Paragraph */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                            className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mb-14"
                        >
                            Every request flows through a purpose-built AI architecture that crawls, understands, retrieves and reasons before generating enterprise-grade responses.
                        </motion.p>
                    </div>
                    {/* Right: isometric illustration */}
                    <div className="w-full lg:w-[50%] flex justify-center items-center">
                        <IsometricPlatform />
                    </div>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-6 sm:mt-8 lg:mt-16 pb-6 sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="flex-none w-[85vw] sm:w-auto snap-center col-span-1 sm:col-span-2 rounded-[20px] sm:rounded-[32px] p-5 sm:p-8 md:p-10 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group border border-[rgba(255,255,255,0.08)] bg-white/[0.02] backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/10 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 font-sans">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mb-4 sm:mb-8 border border-[#10B981]/20 bg-[#10B981]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"><Database size={24} className="text-[#34D399] w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} /></div>
                            <h3 className="tracking-tighter font-bold text-xl sm:text-2xl mb-2 sm:mb-4 text-white">RAG knowledge engine</h3>
                            <p className="text-slate-400 leading-relaxed max-w-[95%] text-[14px] sm:text-[15px] md:text-[16px] font-medium">We feed Frosty your PDFs and crawl up to 200 pages of your site. It chunks, embeds and indexes them into a semantic brain - so answers are grounded in your content, never generic.</p>
                        </div>
                    </div>
                    
                    <div className="flex-none w-[85vw] sm:w-auto snap-center col-span-1 md:col-span-1 lg:col-span-1 rounded-[20px] sm:rounded-[32px] p-5 sm:p-8 md:p-10 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group border border-[rgba(255,255,255,0.08)] bg-white/[0.02] backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#5F23C8]/10 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 font-sans">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mb-4 sm:mb-8 border border-[#5F23C8]/20 bg-[#5F23C8]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"><Zap size={24} className="text-[#5F23C8] w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} /></div>
                            <h3 className="tracking-tighter font-bold text-xl sm:text-2xl mb-2 sm:mb-4 text-white">The right model for every task</h3>
                            <p className="text-slate-400 leading-relaxed text-[14px] sm:text-[15px] md:text-[16px] font-medium">Multi-model under the hood - Gemini and GPT-4o. Our team picks and tunes the best model for each job.</p>
                        </div>
                    </div>

                    <div className="flex-none w-[85vw] sm:w-auto snap-center col-span-1 md:col-span-1 lg:col-span-1 rounded-[20px] sm:rounded-[32px] p-5 sm:p-8 md:p-10 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group border border-[rgba(255,255,255,0.08)] bg-white/[0.02] backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/10 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 font-sans">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mb-4 sm:mb-8 border border-[#F59E0B]/20 bg-[#F59E0B]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"><Wrench size={24} className="text-[#FBBF24] w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} /></div>
                            <h3 className="tracking-tighter font-bold text-xl sm:text-2xl mb-2 sm:mb-4 text-white">Acts through your tools</h3>
                            <p className="text-slate-400 leading-relaxed text-[14px] sm:text-[15px] md:text-[16px] font-medium">Calendar for bookings, Gmail for follow-ups, Slack for alerts, WhatsApp for chat.</p>
                        </div>
                    </div>

                    <div className="flex-none w-[85vw] sm:w-auto snap-center col-span-1 sm:col-span-2 rounded-[20px] sm:rounded-[32px] p-5 sm:p-8 md:p-10 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group border border-[rgba(255,255,255,0.08)] bg-white/[0.02] backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 font-sans">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mb-4 sm:mb-8 border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"><UserCheck size={24} className="text-[#A78BFA] w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} /></div>
                            <h3 className="tracking-tighter font-bold text-xl sm:text-2xl mb-2 sm:mb-4 text-white">Human-in-the-loop</h3>
                            <p className="text-slate-400 leading-relaxed text-[14px] sm:text-[15px] md:text-[16px] font-medium">Pause the agent in one click, take over live, auto-resume when you're done.</p>
                        </div>
                    </div>

                    <div className="flex-none w-[85vw] sm:w-auto snap-center col-span-1 sm:col-span-2 rounded-[20px] sm:rounded-[32px] p-5 sm:p-8 md:p-10 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group border border-[rgba(255,255,255,0.08)] bg-white/[0.02] backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444]/10 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 font-sans">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mb-4 sm:mb-8 border border-[#EF4444]/20 bg-[#EF4444]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"><ShieldCheck size={24} className="text-[#F87171] w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} /></div>
                            <h3 className="tracking-tighter font-bold text-xl sm:text-2xl mb-2 sm:mb-4 text-white">Secure &amp; certified</h3>
                            <p className="text-slate-400 leading-relaxed text-[14px] sm:text-[15px] md:text-[16px] font-medium">ISO 27001 &amp; ISO 9001 certified, GDPR-ready. Your content trains only your own agent.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
