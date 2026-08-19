'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    AlertTriangle,
    Clock,
    User,
    X,
    UserCheck,
    ArrowRight
} from 'lucide-react';

/* ─── Two-Sparkle Frosty Brand Logo ─── */
function TwoSparklesIcon({ className = "w-7 h-7", size = 28 }: { className?: string; size?: number }) {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ width: size, height: size, flexShrink: 0 }}
        >
            {/* Big teal 4-pointed diamond sparkle */}
            <path
                d="M13 2C13 8.075 8.075 13 2 13C8.075 13 13 17.925 13 24C13 17.925 17.925 13 24 13C17.925 13 13 8.075 13 2Z"
                fill="#0396A6"
            />
            {/* Small coral 4-pointed diamond sparkle */}
            <path
                d="M23 18C23 21.314 20.314 24 17 24C20.314 24 23 26.686 23 30C23 26.686 25.686 24 29 24C25.686 24 23 21.314 23 18Z"
                fill="#FF7A5E"
            />
        </svg>
    );
}

/* ─── Color-Masked Custom Asset Icon ─── */
function MaskIcon({ src, color, size = 20, className = "" }: { src: string; color: string; size?: number; className?: string }) {
    return (
        <span
            className={`inline-block shrink-0 ${className}`}
            style={{
                width: size,
                height: size,
                backgroundColor: color,
                WebkitMaskImage: `url('${src}')`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url('${src}')`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
            }}
        />
    );
}

export default function ProblemSection() {
    const [pulse, setPulse] = useState(0);

    // Continuous smooth animation timer for connecting pulses
    useEffect(() => {
        const interval = setInterval(() => {
            setPulse((p) => (p + 1) % 100);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const channels = [
        { name: 'Website', sub: 'New enquiry', img: '/web.svg' },
        { name: 'WhatsApp', sub: 'New message', img: '/whatsapp.png' },
        { name: 'Email', sub: 'New email', img: '/gmail.png' },
    ];

    return (
        <section className="relative w-full overflow-hidden py-8 sm:py-10 lg:py-12 bg-transparent flex flex-col justify-center min-h-[calc(100vh-76px)]" id="problem">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
                    
                    {/* ═════════════════════════════════════════════════════════════════════ */}
                    {/* LEFT COLUMN: Problem Statement, Metrics & Callout                    */}
                    {/* ═════════════════════════════════════════════════════════════════════ */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        {/* Problem Tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0396A6]/10 border border-[#0396A6]/20 mb-3 backdrop-blur-sm self-start"
                        >
                            <AlertTriangle className="w-3.5 h-3.5 text-[#0396A6] stroke-[1.75]" />
                            <span className="text-[10.5px] font-bold tracking-widest uppercase text-[#0396A6]">
                                THE PROBLEM
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-2.5"
                        >
                            Hot leads <br />
                            <span className="text-[#0396A6] relative inline-block">
                                don&apos;t wait.
                                <span className="absolute -bottom-1 left-0 w-16 h-[3px] bg-[#0396A6] rounded-full" />
                            </span>
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 }}
                            className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 max-w-lg"
                        >
                            Every enquiry is an opportunity. <br className="hidden sm:inline" />
                            But when leads wait for a reply, they move on.
                        </motion.p>

                        {/* 3 Metric Stat Cards (Compact, Centered: SVG -> Name -> Text) */}
                        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-4">
                            {/* Stat Card 1: 5X */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="min-h-[145px] sm:min-h-[155px] p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center text-center gap-1.5 hover:border-[#0396A6]/30 transition-colors"
                            >
                                <div className="w-7 h-7 shrink-0 flex items-center justify-center mb-0.5">
                                    <Clock className="w-[23px] h-[23px] text-[#0396A6] stroke-[1.85]" />
                                </div>
                                <div className="text-2xl sm:text-3xl font-bold text-[#0396A6] leading-none font-sans">
                                    5X
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-slate-600 leading-tight font-sans text-center">
                                    more likely to convert if you respond in 5 mins
                                </div>
                            </motion.div>

                            {/* Stat Card 2: 80% (New Analytics Icon from public/analytics.png in Orange) */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 }}
                                className="min-h-[145px] sm:min-h-[155px] p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center text-center gap-1.5 hover:border-[#EA580C]/30 transition-colors"
                            >
                                <div className="w-7 h-7 shrink-0 flex items-center justify-center mb-0.5">
                                    <MaskIcon src="/analytics.png" color="#EA580C" size={23} />
                                </div>
                                <div className="text-2xl sm:text-3xl font-bold text-[#EA580C] leading-none font-sans">
                                    80%
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-slate-600 leading-tight font-sans text-center">
                                    of leads choose competitors due to slow response
                                </div>
                            </motion.div>

                            {/* Stat Card 3: Lost (Dollar Icon from public/dollar.png in Teal, balanced optical size) */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="min-h-[145px] sm:min-h-[155px] p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center text-center gap-1.5 hover:border-[#0396A6]/30 transition-colors"
                            >
                                <div className="w-7 h-7 shrink-0 flex items-center justify-center mb-0.5 overflow-visible">
                                    <MaskIcon src="/dollar.png" color="#0396A6" size={48} />
                                </div>
                                <div className="text-2xl sm:text-3xl font-bold text-[#0396A6] leading-none font-sans">
                                    Lost
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-slate-600 leading-tight font-sans text-center">
                                    revenue and time on every missed opportunity
                                </div>
                            </motion.div>
                        </div>

                        {/* Bottom Banner Card with Sparkle Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 }}
                            className="p-3.5 sm:p-4 rounded-2xl bg-[#F0FDFA]/60 border border-teal-100 shadow-2xs flex items-center gap-3.5"
                        >
                            <div className="shrink-0 flex items-center justify-center">
                                <TwoSparklesIcon size={28} />
                            </div>
                            <div className="text-xs sm:text-sm font-sans">
                                <div className="font-bold text-slate-900 leading-tight">
                                    One AI agent. Every conversation.
                                </div>
                                <div className="font-bold text-[#0396A6] leading-tight mt-0.5">
                                    No lead left waiting.
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ═════════════════════════════════════════════════════════════════════ */}
                    {/* RIGHT COLUMN: Generous, Balanced Comparison Flow Diagram             */}
                    {/* ═════════════════════════════════════════════════════════════════════ */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <div className="w-full relative">
                            
                            {/* ── TOP FLOW: WITHOUT FROSTY AGENT ── */}
                            <div className="relative">
                                <div className="flex items-center justify-between mb-2.5">
                                    <span className="text-[11px] font-bold tracking-wider text-slate-800 uppercase">
                                        WITHOUT FROSTY AGENT
                                    </span>
                                </div>

                                {/* Flow Row Container */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 relative">
                                    
                                    {/* 1. Left Channel Column (3 pills: Website, WhatsApp, Email) */}
                                    <div className="w-full sm:w-[130px] lg:w-[140px] flex flex-col gap-2 shrink-0 z-10">
                                        {channels.map((ch) => (
                                            <div
                                                key={`without-${ch.name}`}
                                                className="p-1.5 px-2.5 rounded-xl border border-slate-200/80 bg-white shadow-2xs flex items-center gap-2"
                                            >
                                                <div className="shrink-0 flex items-center justify-center">
                                                    <img src={ch.img} alt={ch.name} className="w-4 h-4 object-contain" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-[10.5px] font-bold text-slate-900 leading-none truncate">
                                                        {ch.name}
                                                    </div>
                                                    <div className="text-[9px] text-slate-500 leading-none mt-0.5 truncate">
                                                        {ch.sub}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 2. SVG Wires Connector */}
                                    <div className="hidden sm:flex items-center justify-center w-[34px] lg:w-[40px] h-[96px] shrink-0 relative">
                                        <svg className="w-full h-full" viewBox="0 0 40 96" fill="none">
                                            {/* 3 incoming branch lines from channel pills */}
                                            <path d="M 0 16 H 20" stroke="#0396A6" strokeWidth="1.5" strokeDasharray="3 3" />
                                            <path d="M 0 48 H 20" stroke="#0396A6" strokeWidth="1.5" strokeDasharray="3 3" />
                                            <path d="M 0 80 H 20" stroke="#0396A6" strokeWidth="1.5" strokeDasharray="3 3" />
                                            {/* Vertical bus wire */}
                                            <path d="M 20 16 V 80" stroke="#0396A6" strokeWidth="1.5" strokeDasharray="3 3" />
                                            {/* Main outgoing line with arrow */}
                                            <path d="M 20 48 H 34" stroke="#0396A6" strokeWidth="1.5" strokeDasharray="3 3" />
                                            <polyline points="31,44 37,48 31,52" fill="none" stroke="#0396A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>

                                    {/* 3. Steps Pipeline */}
                                    <div className="flex-1 flex flex-col justify-center relative sm:pl-1">
                                        
                                        {/* Overpass Arch Callout */}
                                        <div className="hidden sm:flex items-center justify-center mb-1.5 relative">
                                            <svg className="absolute -top-1 w-full max-w-[340px] h-[20px] pointer-events-none" viewBox="0 0 340 20" fill="none">
                                                <path d="M 15 18 Q 170 -4 325 18" stroke="#0396A6" strokeWidth="1.25" strokeDasharray="3 3" />
                                            </svg>
                                            <div className="relative z-10 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-800 text-[9.5px] font-bold shadow-2xs">
                                                <span className="w-2.5 h-2.5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[8px] font-extrabold leading-none">
                                                    !
                                                </span>
                                                <span>Slow reply = Lost customers</span>
                                            </div>
                                        </div>

                                        {/* 3 Balanced Squared Blocks */}
                                        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 lg:gap-3.5">
                                            
                                            {/* Block 1: Waiting for response */}
                                            <div className="flex-1 sm:flex-initial w-full sm:w-[104px] lg:w-[112px] h-[98px] sm:h-[106px] lg:h-[110px] p-3 rounded-[16px] border border-slate-200/90 bg-white text-center flex flex-col items-center justify-center shadow-2xs shrink-0">
                                                <Clock className="w-5 h-5 text-[#0396A6] stroke-[1.75] mb-1.5 shrink-0" />
                                                <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-800 leading-tight font-sans">
                                                    Waiting for <br /> response
                                                </span>
                                            </div>

                                            {/* Arrow 1 */}
                                            <ArrowRight className="w-4 h-4 text-[#0396A6] stroke-[1.75] shrink-0" />

                                            {/* Block 2: Delayed follow up */}
                                            <div className="flex-1 sm:flex-initial w-full sm:w-[104px] lg:w-[112px] h-[98px] sm:h-[106px] lg:h-[110px] p-3 rounded-[16px] border border-slate-200/90 bg-white text-center flex flex-col items-center justify-center shadow-2xs shrink-0">
                                                <User className="w-5 h-5 text-[#0396A6] stroke-[1.75] mb-1.5 shrink-0" />
                                                <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-800 leading-tight font-sans">
                                                    Delayed <br /> follow up
                                                </span>
                                            </div>

                                            {/* Arrow 2 */}
                                            <ArrowRight className="w-4 h-4 text-[#0396A6] stroke-[1.75] shrink-0" />

                                            {/* Block 3: Lead lost */}
                                            <div className="flex-1 sm:flex-initial w-full sm:w-[104px] lg:w-[112px] h-[98px] sm:h-[106px] lg:h-[110px] p-3 rounded-[16px] border border-[#FED7AA] bg-[#FFF9F5] text-center flex flex-col items-center justify-center shadow-2xs shrink-0">
                                                <X className="w-5 h-5 text-[#EA580C] stroke-[2.5] mb-1.5 shrink-0" />
                                                <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-900 leading-tight font-sans">
                                                    Lead lost
                                                </span>
                                                <span className="text-[8.5px] sm:text-[9px] font-semibold text-[#EA580C] leading-none mt-0.5 font-sans">
                                                    Opportunity <br /> gone forever
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── CENTRAL DIVIDER WITH MATCHING TEAL LINE & SOLID TEAL VS BADGE ── */}
                            <div className="relative my-4.5 sm:my-5.5 flex items-center justify-center">
                                <div className="w-full h-[1.5px] bg-[#0396A6]/35" />
                                <div className="absolute w-8 h-8 rounded-full bg-[#0396A6] text-white flex items-center justify-center font-bold text-[10.5px] tracking-wider shadow-sm ring-4 ring-white">
                                    VS
                                </div>
                            </div>

                            {/* ── BOTTOM FLOW: WITH FROSTY AGENT ── */}
                            <div className="relative">
                                <div className="flex items-center justify-between mb-2.5">
                                    <span className="text-[11px] font-bold tracking-wider text-[#0396A6] uppercase">
                                        WITH FROSTY AGENT
                                    </span>
                                </div>

                                {/* Flow Row Container */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 relative">
                                    
                                    {/* 1. Left Channel Column (3 pills: Website, WhatsApp, Email) */}
                                    <div className="w-full sm:w-[130px] lg:w-[140px] flex flex-col gap-2 shrink-0 z-10">
                                        {channels.map((ch) => (
                                            <div
                                                key={`with-${ch.name}`}
                                                className="p-1.5 px-2.5 rounded-xl border border-teal-200/80 bg-white shadow-2xs flex items-center gap-2"
                                            >
                                                <div className="shrink-0 flex items-center justify-center">
                                                    <img src={ch.img} alt={ch.name} className="w-4 h-4 object-contain" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-[10.5px] font-bold text-slate-900 leading-none truncate">
                                                        {ch.name}
                                                    </div>
                                                    <div className="text-[9px] text-[#0396A6] font-semibold leading-none mt-0.5 truncate">
                                                        {ch.sub}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 2. SVG Wires Connector (Solid Cyan with Animated Pulses) */}
                                    <div className="hidden sm:flex items-center justify-center w-[34px] lg:w-[40px] h-[96px] shrink-0 relative">
                                        <svg className="w-full h-full" viewBox="0 0 40 96" fill="none">
                                            {/* 3 incoming branch lines from channel pills */}
                                            <path d="M 0 16 H 20" stroke="#0396A6" strokeWidth="1.75" />
                                            <path d="M 0 48 H 20" stroke="#0396A6" strokeWidth="1.75" />
                                            <path d="M 0 80 H 20" stroke="#0396A6" strokeWidth="1.75" />
                                            {/* Vertical bus wire */}
                                            <path d="M 20 16 V 80" stroke="#0396A6" strokeWidth="1.75" />
                                            {/* Main outgoing line with arrow */}
                                            <path d="M 20 48 H 34" stroke="#0396A6" strokeWidth="1.75" />
                                            <polyline points="31,44 37,48 31,52" fill="none" stroke="#0396A6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                            {/* Traveling particle */}
                                            <circle cx={20} cy={16 + (pulse * 0.64) % 64} r="2.5" fill="#0396A6" />
                                        </svg>
                                    </div>

                                    {/* 3. Steps Pipeline (Frosty Agent Card & Qualified Lead Card) */}
                                    <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-3.5 pl-0 sm:pl-1">
                                        
                                        {/* Block 4: Frosty Agent Centerpiece Card with Sparkle Logo */}
                                        <div className="flex-1 sm:max-w-[225px] lg:max-w-[245px] p-3.5 sm:p-4 rounded-[18px] border border-teal-200/90 bg-white shadow-2xs text-center flex flex-col items-center justify-center shrink-0">
                                            <TwoSparklesIcon size={32} className="mb-2" />
                                            <div
                                                className="text-xs sm:text-[13px] font-extrabold text-[#0396A6] tracking-wider uppercase leading-tight font-sans"
                                                style={{ fontFamily: "'Outfit', -apple-system, sans-serif" }}
                                            >
                                                FROSTY AGENT
                                            </div>
                                            <p className="text-[10.5px] font-semibold text-slate-700 leading-tight mt-0.5 font-sans">
                                                Responds instantly in seconds
                                            </p>
                                            <span className="mt-1.5 inline-block text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-[#0396A6]/10 text-[#0396A6] border border-[#0396A6]/20 font-sans">
                                                24/7 • Instant • Accurate
                                            </span>
                                        </div>

                                        {/* Arrow between Frosty and Lead */}
                                        <div className="hidden sm:flex items-center justify-center shrink-0">
                                            <ArrowRight className="w-5 h-5 text-[#0396A6] stroke-[2]" />
                                        </div>

                                        {/* Block 5: Qualified Lead Card */}
                                        <div className="flex-1 sm:max-w-[145px] lg:max-w-[160px] p-3.5 sm:p-4 rounded-[18px] border border-teal-200/90 bg-white shadow-2xs text-center flex flex-col items-center justify-center shrink-0">
                                            <UserCheck className="w-5 h-5 text-[#0396A6] stroke-[1.75] mb-1.5" />
                                            <div
                                                className="text-xs sm:text-[12.5px] font-bold text-slate-900 leading-tight font-sans"
                                                style={{ fontFamily: "'Outfit', -apple-system, sans-serif" }}
                                            >
                                                Qualified Lead
                                            </div>
                                            <p className="text-[9.5px] text-slate-600 leading-tight mt-0.5 font-sans">
                                                Happy customer <br />
                                                Higher conversions
                                            </p>
                                            <span className="text-[10px] font-bold text-[#0396A6] mt-1 block font-sans">
                                                More revenue
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


