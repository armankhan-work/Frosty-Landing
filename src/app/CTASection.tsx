'use client';

import React from 'react';

const DEMO = "https://www.frostrek.ai/schedule-demo";

function Icon({ n }: { n: string }) {
    const p: Record<string, React.ReactNode> = {
        arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    };
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p[n]}</svg>;
}

export default function CTASection() {
    return (
        <section className="relative pt-16 pb-24 bg-transparent">
            <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-12 relative z-10">
                <div className="relative rounded-[32px] overflow-hidden px-8 py-10 md:px-16 md:py-14 text-center bg-white/95 backdrop-blur-md border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex flex-col justify-center">
                    {/* Decorative glows */}
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#5F23C8]/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#0284C7]/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col items-center justify-center">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-[#0F172A] leading-[1.15] tracking-tight mb-6">
                            Capture every enquiry — starting this week.
                        </h2>
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
                            Book a 20-minute demo and we&apos;ll set Frosty up on your website and WhatsApp, trained on your own content. You&apos;ll see it answer a real enquiry before you decide.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
                            <a 
                                href={DEMO}
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm text-white bg-[#5F23C8] hover:bg-[#4C1D95] shadow-[0_10px_30px_rgba(95,35,200,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                                style={{ color: '#FFFFFF', textDecoration: 'none' }}
                            >
                                <span className="flex h-2 w-2 relative shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                </span>
                                
                                <span className="relative z-10 tracking-wide font-bold text-white whitespace-nowrap">Book a demo</span>
                                
                                <span className="w-4 h-4 relative z-10 transform group-hover:translate-x-1.5 transition-transform duration-300 flex items-center justify-center text-white shrink-0">
                                    <Icon n="arrow" />
                                </span>
                            </a>
                            
                            <a 
                                href="https://wa.me/17574722491"
                                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-semibold text-slate-800 hover:text-[#5F23C8] text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
                                style={{ textDecoration: 'none' }}
                            >
                                <span>Chat on WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
