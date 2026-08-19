'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    AlertTriangle,
    Clock,
    TrendingUp,
    DollarSign,
    Sparkles,
    Globe,
    MessageCircle,
    FileText,
    PhoneCall,
    User,
    X,
    UserCheck,
    Zap,
    ShieldCheck,
    Target,
    ArrowRight
} from 'lucide-react';

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
        { name: 'Website', sub: 'New enquiry', icon: Globe, color: 'text-[#0396A6]', bg: 'bg-teal-50 border-teal-100' },
        { name: 'WhatsApp', sub: 'New message', icon: MessageCircle, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
        { name: 'Lead Form', sub: 'New enquiry', icon: FileText, color: 'text-slate-700', bg: 'bg-slate-50 border-slate-200/80' },
        { name: 'Phone / Call', sub: 'New call', icon: PhoneCall, color: 'text-[#0396A6]', bg: 'bg-teal-50 border-teal-100' }
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

                        {/* 3 Metric Stat Cards */}
                        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-4">
                            {/* Stat Card 1: 5X */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-[#0396A6]/30 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mb-2">
                                    <Clock className="w-4 h-4 text-[#0396A6] stroke-[1.75]" />
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold font-serif text-[#0396A6] leading-none mb-1">
                                        5X
                                    </div>
                                    <div className="text-[10.5px] sm:text-xs text-slate-600 leading-tight">
                                        more likely to convert if you respond in 5 mins
                                    </div>
                                </div>
                            </motion.div>

                            {/* Stat Card 2: 80% */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 }}
                                className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-[#EA580C]/30 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mb-2">
                                    <TrendingUp className="w-4 h-4 text-[#EA580C] stroke-[1.75]" />
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold font-serif text-[#EA580C] leading-none mb-1">
                                        80%
                                    </div>
                                    <div className="text-[10.5px] sm:text-xs text-slate-600 leading-tight">
                                        of leads choose competitors due to slow response
                                    </div>
                                </div>
                            </motion.div>

                            {/* Stat Card 3: Lost */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-[#0396A6]/30 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mb-2">
                                    <DollarSign className="w-4 h-4 text-[#0396A6] stroke-[1.75]" />
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold font-serif text-[#0396A6] leading-none mb-1">
                                        Lost
                                    </div>
                                    <div className="text-[10.5px] sm:text-xs text-slate-600 leading-tight">
                                        revenue & time on every missed opportunity
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Bottom Banner Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 }}
                            className="p-3.5 rounded-2xl bg-white border border-teal-100 shadow-2xs flex items-center gap-3.5"
                        >
                            <div className="w-8 h-8 rounded-xl bg-[#0396A6]/10 flex items-center justify-center shrink-0 border border-[#0396A6]/20">
                                <Sparkles className="w-4 h-4 text-[#0396A6] stroke-[1.75]" />
                            </div>
                            <div className="text-xs sm:text-sm">
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
                                    
                                    {/* 1. Left Channel Column (4 pills) */}
                                    <div className="w-full sm:w-[130px] lg:w-[140px] flex flex-col gap-1.5 shrink-0 z-10">
                                        {channels.map((ch) => {
                                            const Icon = ch.icon;
                                            return (
                                                <div
                                                    key={`without-${ch.name}`}
                                                    className="p-1.5 px-2.5 rounded-xl border border-slate-200/80 bg-white shadow-2xs flex items-center gap-2"
                                                >
                                                    <div className={`w-5.5 h-5.5 rounded-lg ${ch.bg} flex items-center justify-center shrink-0`}>
                                                        <Icon className={`w-3.5 h-3.5 ${ch.color} stroke-[1.75]`} />
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
                                            );
                                        })}
                                    </div>

                                    {/* 2. SVG Wires Connector */}
                                    <div className="hidden sm:flex items-center justify-center w-[34px] lg:w-[40px] h-[124px] shrink-0 relative">
                                        <svg className="w-full h-full" viewBox="0 0 40 124" fill="none">
                                            {/* 4 incoming branch lines from channel pills */}
                                            <path d="M 0 16 H 20" stroke="#0396A6" strokeWidth="1.5" strokeDasharray="3 3" />
                                            <path d="M 0 48 H 20" stroke="#0396A6" strokeWidth="1.5" strokeDasharray="3 3" />
                                            <path d="M 0 78 H 20" stroke="#0396A6" strokeWidth="1.5" strokeDasharray="3 3" />
                                            <path d="M 0 108 H 20" stroke="#0396A6" strokeWidth="1.5" strokeDasharray="3 3" />
                                            {/* Vertical bus wire */}
                                            <path d="M 20 16 V 108" stroke="#0396A6" strokeWidth="1.5" strokeDasharray="3 3" />
                                            {/* Main outgoing line with arrow */}
                                            <path d="M 20 62 H 34" stroke="#0396A6" strokeWidth="1.5" strokeDasharray="3 3" />
                                            <polyline points="31,58 37,62 31,66" fill="none" stroke="#0396A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                                                <div className="w-7.5 h-7.5 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mb-1.5 shrink-0">
                                                    <Clock className="w-4 h-4 text-[#0396A6] stroke-[1.75]" />
                                                </div>
                                                <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-800 leading-tight font-sans">
                                                    Waiting for <br /> response
                                                </span>
                                            </div>

                                            {/* Arrow 1 */}
                                            <ArrowRight className="w-4 h-4 text-[#0396A6] stroke-[1.75] shrink-0" />

                                            {/* Block 2: Delayed follow up */}
                                            <div className="flex-1 sm:flex-initial w-full sm:w-[104px] lg:w-[112px] h-[98px] sm:h-[106px] lg:h-[110px] p-3 rounded-[16px] border border-slate-200/90 bg-white text-center flex flex-col items-center justify-center shadow-2xs shrink-0">
                                                <div className="w-7.5 h-7.5 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mb-1.5 shrink-0">
                                                    <User className="w-4 h-4 text-[#0396A6] stroke-[1.75]" />
                                                </div>
                                                <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-800 leading-tight font-sans">
                                                    Delayed <br /> follow up
                                                </span>
                                            </div>

                                            {/* Arrow 2 */}
                                            <ArrowRight className="w-4 h-4 text-[#0396A6] stroke-[1.75] shrink-0" />

                                            {/* Block 3: Lead lost */}
                                            <div className="flex-1 sm:flex-initial w-full sm:w-[104px] lg:w-[112px] h-[98px] sm:h-[106px] lg:h-[110px] p-3 rounded-[16px] border border-[#FED7AA] bg-[#FFF9F5] text-center flex flex-col items-center justify-center shadow-2xs shrink-0">
                                                <div className="w-7.5 h-7.5 rounded-full bg-[#EA580C] text-white flex items-center justify-center mb-1.5 shrink-0 shadow-2xs">
                                                    <X className="w-3.5 h-3.5 stroke-[2.5]" />
                                                </div>
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
                                    
                                    {/* 1. Left Channel Column (4 pills) */}
                                    <div className="w-full sm:w-[130px] lg:w-[140px] flex flex-col gap-1.5 shrink-0 z-10">
                                        {channels.map((ch) => {
                                            const Icon = ch.icon;
                                            return (
                                                <div
                                                    key={`with-${ch.name}`}
                                                    className="p-1.5 px-2.5 rounded-xl border border-teal-200/80 bg-white shadow-2xs flex items-center gap-2"
                                                >
                                                    <div className={`w-5.5 h-5.5 rounded-lg ${ch.bg} flex items-center justify-center shrink-0`}>
                                                        <Icon className={`w-3.5 h-3.5 ${ch.color} stroke-[1.75]`} />
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
                                            );
                                        })}
                                    </div>

                                    {/* 2. SVG Wires Connector (Solid Cyan with Animated Pulses) */}
                                    <div className="hidden sm:flex items-center justify-center w-[34px] lg:w-[40px] h-[124px] shrink-0 relative">
                                        <svg className="w-full h-full" viewBox="0 0 40 124" fill="none">
                                            {/* 4 incoming branch lines from channel pills */}
                                            <path d="M 0 16 H 20" stroke="#0396A6" strokeWidth="1.75" />
                                            <path d="M 0 48 H 20" stroke="#0396A6" strokeWidth="1.75" />
                                            <path d="M 0 78 H 20" stroke="#0396A6" strokeWidth="1.75" />
                                            <path d="M 0 108 H 20" stroke="#0396A6" strokeWidth="1.75" />
                                            {/* Vertical bus wire */}
                                            <path d="M 20 16 V 108" stroke="#0396A6" strokeWidth="1.75" />
                                            {/* Main outgoing line with arrow */}
                                            <path d="M 20 62 H 34" stroke="#0396A6" strokeWidth="1.75" />
                                            <polyline points="31,58 37,62 31,66" fill="none" stroke="#0396A6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                            {/* Traveling particle */}
                                            <circle cx={20} cy={16 + (pulse * 0.92) % 92} r="2.5" fill="#0396A6" />
                                        </svg>
                                    </div>

                                    {/* 3. Steps Pipeline (Frosty Agent Card & Qualified Lead Card) */}
                                    <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-3.5 pl-0 sm:pl-1">
                                        
                                        {/* Block 4: Frosty Agent Centerpiece Card */}
                                        <div className="flex-1 sm:max-w-[225px] lg:max-w-[245px] p-3.5 sm:p-4 rounded-[18px] border border-teal-200/90 bg-white shadow-2xs text-center flex flex-col items-center justify-center shrink-0">
                                            <div className="w-7.5 h-7.5 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mb-1.5">
                                                <Sparkles className="w-4 h-4 text-[#0396A6] stroke-[1.75]" />
                                            </div>
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
                                            <div className="w-7.5 h-7.5 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mb-1.5">
                                                <UserCheck className="w-4 h-4 text-[#0396A6] stroke-[1.75]" />
                                            </div>
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
