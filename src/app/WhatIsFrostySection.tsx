'use client';

import React from 'react';
import InteractiveDashboard from './InteractiveDashboard';

export default function WhatIsFrostySection() {
    return (
        <section id="what-is-frosty" className="relative pt-8 sm:pt-12 pb-6 lg:pb-8 bg-transparent overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-8">
                <div className="w-full lg:w-[50%] flex flex-col justify-center relative z-20 xl:pr-10 lg:-translate-y-12">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#5F23C8] flex items-center mb-4 sm:mb-6 before:content-[''] before:inline-block before:w-[16px] sm:before:w-[22px] before:h-[1.5px] before:rounded-[1px] before:bg-current before:opacity-45 before:align-middle before:mr-[8px] sm:before:mr-[10px] after:content-[''] after:inline-block after:w-[16px] sm:after:w-[22px] after:h-[1.5px] after:rounded-[1px] after:bg-current after:opacity-45 after:align-middle after:ml-[8px] sm:after:ml-[10px]">PRODUCT OVERVIEW</span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-[#0F172A] leading-[1.15] tracking-tight text-balance max-w-[20ch]" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
                        What is Frosty Agent?
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
                        Frosty Agent is a 24/7 AI sales assistant that answers website and WhatsApp enquiries in seconds, qualifies leads, sends quotes, and books meetings directly into your calendar. It responds strictly using your own business content so it never misquotes or makes false promises. Everything syncs into one dashboard where your team can step in anytime. Set it up yourself in under 5 minutes with zero coding.
                    </p>
                </div>

                <div className="w-full lg:w-[50%] relative overflow-hidden">
                    <div className="w-full flex justify-center lg:justify-end">
                        <InteractiveDashboard />
                    </div>
                </div>
            </div>
        </section>
    );
}
