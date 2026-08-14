'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import IsometricPlatform from './IsometricPlatform';

export default function CapabilitiesSection() {
    return (
        <section id="under-the-hood" className="relative pt-12 pb-8 lg:pb-12 bg-transparent overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full relative">
                    {/* Left: text */}
                    <div className="w-full lg:w-[45%] flex flex-col items-start text-left lg:pr-8 xl:pr-12">
                        {/* Premium Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full relative group bg-[#5F23C8]/10 border border-[#5F23C8]/25 shadow-sm"
                            style={{ marginBottom: '2rem' }}
                        >
                            <Settings className="w-3.5 h-3.5 text-[#5F23C8] animate-[spin_4s_linear_infinite]" />
                            <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#5F23C8]">Under the hood</span>
                        </motion.div>

                        {/* Editorial Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                            className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-[#0F172A] leading-[1.15] tracking-tight"
                            style={{ marginBottom: '2rem' }}
                        >
                            Enterprise-grade.<br />
                            <span className="text-[#5F23C8] font-bold">Engineered</span><br />
                            from the ground up.
                        </motion.h2>

                        {/* Premium Paragraph */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                            className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl"
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

            </div>
        </section>
    );
}
