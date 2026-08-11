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
                <div className="relative rounded-[32px] overflow-hidden px-8 py-10 md:px-16 md:py-12 text-center bg-white/[0.02] backdrop-blur-md border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] flex flex-col justify-center">
                    {/* Decorative glows */}
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#5F23C8]/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#5F23C8]/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col items-center justify-center">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            Capture every enquiry — starting this week.
                        </h2>
                        <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
                            Book a 20-minute demo and we&apos;ll set Frosty up on your website and WhatsApp, trained on your own content. You&apos;ll see it answer a real enquiry before you decide.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
                            <a 
                                href={DEMO}
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#5F23C8] via-[#5F23C8] to-[#5F23C8] hover:from-[#5F23C8] hover:via-[#5F23C8] hover:to-[#5F23C8] border border-[#5F23C8]/50 hover:border-white/80 shadow-[0_0_30px_-5px_rgba(95, 35, 200,0.6)] hover:shadow-[0_0_45px_0px_rgba(95, 35, 200,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                                style={{ color: '#FFFFFF', textDecoration: 'none' }}
                            >
                                {/* Top inner highlight for 3D glass shine */}
                                <span className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
                                
                                {/* Shimmer overlay */}
                                <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                {/* Live indicator dot */}
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
                                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-semibold text-slate-200 hover:text-white text-sm bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/30 shadow-sm hover:shadow transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
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
