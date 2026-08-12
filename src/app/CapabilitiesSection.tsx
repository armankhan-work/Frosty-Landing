'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Database, Zap, Wrench, UserCheck, ShieldCheck } from 'lucide-react';
import IsometricPlatform from './IsometricPlatform';
import CarouselStacked from '@/components/ui/carousel-07';

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
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full relative group"
                            style={{
                                marginBottom: '2rem',
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
                            className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-[1.1] tracking-tight"
                            style={{ marginBottom: '2rem' }}
                        >
                            Enterprise-grade.<br />
                            <span style={{ color: '#5F23C8' }}>Engineered</span><br />
                            from the ground up.
                        </motion.h2>

                        {/* Premium Paragraph */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                            className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl"
                            style={{ marginBottom: '3.5rem' }}
                        >
                            Every request flows through a purpose-built AI architecture that crawls, understands, retrieves and reasons before generating enterprise-grade responses.
                        </motion.p>
                    </div>
                    {/* Right: isometric illustration */}
                    <div className="w-full lg:w-[50%] flex justify-center items-center">
                        <IsometricPlatform />
                    </div>
                </div>

                <div className="w-full mt-6 sm:mt-8 lg:mt-16">
                    <CarouselStacked />
                </div>
            </div>
        </section>
    );
}
