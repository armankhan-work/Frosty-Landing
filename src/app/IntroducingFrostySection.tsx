'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Sparkles,
    MessageSquare,
    Zap,
    Globe,
    MessageCircle,
    Phone,
    Send,
    Check
} from 'lucide-react';

/* ─── Sparkle Star SVG Logo ────────────────────────────────────── */
function FrostySparkleIcon({ className = "w-9 h-9" }: { className?: string }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Primary Teal Star */}
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-[#0396A6] fill-current drop-shadow-[0_2px_8px_rgba(3,150,166,0.35)]"
            >
                <path d="M 50 8 C 50 35 35 50 8 50 C 35 50 50 65 50 92 C 50 65 65 50 92 50 C 65 50 50 35 50 8 Z" />
            </svg>
            {/* Secondary Orange Star */}
            <svg
                viewBox="0 0 100 100"
                className="w-[45%] h-[45%] absolute -bottom-0.5 -right-0.5 text-[#F59E0B] fill-current drop-shadow-[0_1px_4px_rgba(245,158,11,0.4)]"
            >
                <path d="M 50 8 C 50 35 35 50 8 50 C 35 50 50 65 50 92 C 50 65 65 50 92 50 C 65 50 50 35 50 8 Z" />
            </svg>
        </div>
    );
}

/* ─── Qualified Lead User Checkmark Icon ────────────────────────── */
function QualifiedLeadIcon() {
    return (
        <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[#0396A6]/[0.08] border border-[#0396A6]/20 flex items-center justify-center">
                <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-[#0396A6]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0396A6] text-white flex items-center justify-center shadow-xs">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
        </div>
    );
}

/* ─── Bottom Banner SVG Icons (Transparent, Aesthetic, Hollow Teal) ─── */
function ShieldCheckCustomIcon({ className = "w-7 h-7" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="#0396A6"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}

function TargetCustomIcon({ className = "w-7 h-7" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 28 28"
            className={className}
            fill="none"
            stroke="#0396A6"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="16" r="9" strokeDasharray="48" />
            <circle cx="12" cy="16" r="5" />
            <circle cx="12" cy="16" r="1.5" fill="#0396A6" />
            <path d="M23 5L15 13" />
            <polyline points="18 5 23 5 23 10" />
        </svg>
    );
}

function RevenueChartCustomIcon({ className = "w-7 h-7" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 28 28"
            className={className}
            fill="none"
            stroke="#0396A6"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="18" width="3" height="7" rx="0.5" />
            <rect x="8" y="14" width="3" height="11" rx="0.5" />
            <rect x="13" y="10" width="3" height="15" rx="0.5" />
            <path d="M3 13 L10 8 L16 12 L24 4" />
            <polyline points="19 4 24 4 24 9" />
        </svg>
    );
}

/* ─── Data Constants ───────────────────────────────────────────── */
const FEATURES = [
    {
        icon: <Sparkles className="w-5 h-5 text-[#0396A6]" strokeWidth={1.75} />,
        title: 'Understands your business',
        description: 'Learns your goals, products and audience.'
    },
    {
        icon: <MessageSquare className="w-5 h-5 text-[#0396A6]" strokeWidth={1.75} />,
        title: 'Engages across every channel',
        description: 'Web, WhatsApp, voice, social and more.'
    },
    {
        icon: <Zap className="w-5 h-5 text-[#0396A6]" strokeWidth={1.75} />,
        title: 'Takes action that drives results',
        description: 'Qualifies leads and moves conversations forward.'
    }
];

const CHANNELS = [
    {
        id: 'website',
        title: 'Website',
        subtitle: 'New enquiry',
        icon: <Globe className="w-[18px] h-[18px] text-[#0396A6]" strokeWidth={1.75} />
    },
    {
        id: 'whatsapp',
        title: 'WhatsApp',
        subtitle: 'New message',
        icon: <MessageCircle className="w-[18px] h-[18px] text-[#0396A6]" strokeWidth={1.75} />
    },
    {
        id: 'voice',
        title: 'Voice Call',
        subtitle: 'New call',
        icon: <Phone className="w-[18px] h-[18px] text-[#0396A6]" strokeWidth={1.75} />
    },
    {
        id: 'social',
        title: 'Social',
        subtitle: 'New message',
        icon: <Send className="w-[18px] h-[18px] text-[#0396A6]" strokeWidth={1.75} />
    }
];

export default function IntroducingFrostySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, margin: '-60px' });
    const [pulseKey, setPulseKey] = useState(0);

    // Periodic heartbeat glow trigger for Frosty central core
    useEffect(() => {
        if (!isInView) return;
        const interval = setInterval(() => {
            setPulseKey((k) => k + 1);
        }, 2800);
        return () => clearInterval(interval);
    }, [isInView]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[calc(100vh-72px)] lg:h-[calc(100vh-72px)] lg:max-h-[920px] flex flex-col justify-between py-6 sm:py-8 lg:py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-transparent select-none"
        >
            {/* Main Content (Split 2-Column on Desktop) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center flex-1 my-auto relative z-10 w-full">
                
                {/* ── Left Column: Intro & Features ── */}
                <div className="lg:col-span-5 flex flex-col justify-center text-left lg:pr-2 xl:pr-4">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        {/* Eyebrow Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0396A6]/[0.08] border border-[#0396A6]/20 mb-3.5 backdrop-blur-xs shadow-2xs">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#0396A6]/20 flex items-center justify-center">
                                <Sparkles className="w-2.5 h-2.5 text-[#0396A6]" strokeWidth={2} />
                            </span>
                            <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#0396A6]">
                                INTRODUCING FROSTY AGENT
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#0F172A] leading-[1.12] tracking-tight m-0 mb-3">
                            Meet{' '}
                            <span className="text-[#0396A6] font-bold" style={{ color: '#0396A6' }}>
                                Frosty Agent.
                            </span>
                        </h2>

                        {/* Subtitle */}
                        <p className="text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed max-w-lg m-0 mb-4">
                            An AI workforce that engages customers, qualifies leads, and takes action 24/7.
                        </p>

                        {/* Subtle Accent Line */}
                        <div className="w-12 h-1 bg-[#0396A6]/80 rounded-full mb-5" />

                        {/* 3 Core Feature Items */}
                        <div className="flex flex-col gap-3.5 sm:gap-4">
                            {FEATURES.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -14 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.15 + idx * 0.1, ease: 'easeOut' }}
                                    className="flex items-start gap-3.5 group"
                                >
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0396A6]/[0.08] border border-[#0396A6]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0396A6]/[0.14] group-hover:border-[#0396A6]/40 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                                            {item.title}
                                        </span>
                                        <span className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed mt-0.5">
                                            {item.description}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── Right Column: Interactive Diagram Flow ── */}
                <div className="lg:col-span-7 flex items-center justify-center w-full relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                        className="relative w-full max-w-[660px] h-[340px] sm:h-[360px] mx-auto flex items-center"
                    >
                        {/* 1. Left Sub-Column: 4 Input Cards */}
                        <div className="absolute left-0 top-0 bottom-0 w-[140px] sm:w-[155px] flex flex-col justify-between py-2 z-20">
                            {CHANNELS.map((ch, idx) => (
                                <motion.div
                                    key={ch.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
                                    whileHover={{ scale: 1.03, x: 2 }}
                                    className="h-[62px] p-2 sm:p-2.5 bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_22px_rgba(3,150,166,0.12)] hover:border-[#0396A6]/40 transition-all flex items-center gap-2 sm:gap-2.5 cursor-pointer backdrop-blur-xs"
                                >
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0396A6]/[0.08] border border-[#0396A6]/20 flex items-center justify-center shrink-0 text-[#0396A6]">
                                        {ch.icon}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight truncate">
                                            {ch.title}
                                        </span>
                                        <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight mt-0.5 truncate">
                                            {ch.subtitle}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* 2. Middle Central Hub: Frosty Agent Circle */}
                        <div className="absolute left-[47%] -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                            {/* Ambient Glow */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.08, 1],
                                    opacity: [0.35, 0.6, 0.35]
                                }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute w-[210px] h-[210px] sm:w-[230px] sm:h-[230px] rounded-full bg-[radial-gradient(circle,_rgba(3,150,166,0.22)_0%,_transparent_70%)] blur-xl pointer-events-none"
                            />

                            {/* Outer Subtle Pulse Ring */}
                            <motion.div
                                key={`pulse-${pulseKey}`}
                                initial={{ scale: 0.95, opacity: 0.8 }}
                                animate={{ scale: 1.25, opacity: 0 }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}
                                className="absolute w-[165px] h-[165px] sm:w-[185px] sm:h-[185px] rounded-full border border-[#0396A6]/40 pointer-events-none"
                            />

                            {/* Frosty Agent Main Circular Card */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                className="relative w-[165px] h-[165px] sm:w-[185px] sm:h-[185px] rounded-full bg-white border border-[#0396A6]/25 shadow-[0_8px_32px_rgba(3,150,166,0.12)] flex flex-col items-center justify-center text-center p-3 cursor-pointer group"
                            >
                                <motion.div
                                    whileHover={{ rotate: 90 }}
                                    transition={{ duration: 0.4 }}
                                    className="mb-1"
                                >
                                    <FrostySparkleIcon className="w-10 h-10 sm:w-11 sm:h-11" />
                                </motion.div>

                                <span className="font-bold text-[15px] sm:text-[17px] text-[#0396A6] tracking-tight leading-tight">
                                    Frosty Agent
                                </span>

                                <div className="mt-1.5 flex flex-col items-center gap-0.5">
                                    <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 tracking-wider">
                                        Understand <span className="text-[#0396A6] mx-0.5">•</span> Respond
                                    </span>
                                    <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 tracking-wider">
                                        Qualify <span className="text-[#0396A6] mx-0.5">•</span> Act
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* 3. Right Sub-Column: Qualified Lead Card */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[125px] sm:w-[140px] z-20">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                whileHover={{ scale: 1.04, y: -2 }}
                                className="p-3 sm:p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_22px_rgba(3,150,166,0.12)] hover:border-[#0396A6]/40 transition-all flex flex-col items-center text-center cursor-pointer"
                            >
                                <QualifiedLeadIcon />

                                <span className="text-xs sm:text-[13px] font-bold text-slate-900 mt-2 mb-2 leading-tight">
                                    Qualified Lead
                                </span>

                                <div className="flex flex-col gap-1 w-full text-left">
                                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-600 font-medium leading-tight">
                                        <Check className="w-3.5 h-3.5 text-[#0396A6] stroke-[2.5] shrink-0" />
                                        <span className="truncate">CRM Updated</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-600 font-medium leading-tight">
                                        <Check className="w-3.5 h-3.5 text-[#0396A6] stroke-[2.5] shrink-0" />
                                        <span className="truncate">Follow-up Ready</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* 4. SVG Connecting Paths & Animated Data Packets */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
                            viewBox="0 0 660 360"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                {/* Directional Arrow Markers */}
                                <marker
                                    id="teal-arrow"
                                    viewBox="0 0 10 10"
                                    refX="6"
                                    refY="5"
                                    markerWidth="5"
                                    markerHeight="5"
                                    orient="auto"
                                >
                                    <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#0396A6" />
                                </marker>

                                {/* Packet Glow Filter */}
                                <filter id="pulse-glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Path 1: Website (Top) -> Frosty */}
                            <path
                                id="path-website"
                                d="M 148 40 L 210 40 Q 225 40 225 55 L 225 105 Q 225 118 238 120 L 255 125"
                                fill="none"
                                stroke="#0396A6"
                                strokeWidth="1.5"
                                strokeDasharray="3.5 3.5"
                                strokeOpacity="0.75"
                                markerEnd="url(#teal-arrow)"
                            />

                            {/* Path 2: WhatsApp (Mid-Top) -> Frosty */}
                            <path
                                id="path-whatsapp"
                                d="M 148 120 L 215 120 Q 235 120 242 145 L 250 152"
                                fill="none"
                                stroke="#0396A6"
                                strokeWidth="1.5"
                                strokeDasharray="3.5 3.5"
                                strokeOpacity="0.75"
                                markerEnd="url(#teal-arrow)"
                            />

                            {/* Path 3: Voice Call (Mid-Bottom) -> Frosty */}
                            <path
                                id="path-voice"
                                d="M 148 240 L 215 240 Q 235 240 242 215 L 250 208"
                                fill="none"
                                stroke="#0396A6"
                                strokeWidth="1.5"
                                strokeDasharray="3.5 3.5"
                                strokeOpacity="0.75"
                                markerEnd="url(#teal-arrow)"
                            />

                            {/* Path 4: Social (Bottom) -> Frosty */}
                            <path
                                id="path-social"
                                d="M 148 320 L 210 320 Q 225 320 225 305 L 225 255 Q 225 242 238 240 L 255 235"
                                fill="none"
                                stroke="#0396A6"
                                strokeWidth="1.5"
                                strokeDasharray="3.5 3.5"
                                strokeOpacity="0.75"
                                markerEnd="url(#teal-arrow)"
                            />

                            {/* Path 5: Frosty -> Qualified Lead (Right) */}
                            <path
                                id="path-lead"
                                d="M 405 180 L 522 180"
                                fill="none"
                                stroke="#0396A6"
                                strokeWidth="1.5"
                                strokeDasharray="3.5 3.5"
                                strokeOpacity="0.75"
                                markerEnd="url(#teal-arrow)"
                            />

                            {/* ── Animated Flowing Data Packets ── */}
                            {/* Packet 1: Website */}
                            <circle r="3" fill="#0396A6" filter="url(#pulse-glow)">
                                <animateMotion
                                    dur="2.4s"
                                    repeatCount="indefinite"
                                    path="M 148 40 L 210 40 Q 225 40 225 55 L 225 105 Q 225 118 238 120 L 255 125"
                                    keyPoints="0;1"
                                    keyTimes="0;1"
                                />
                            </circle>

                            {/* Packet 2: WhatsApp */}
                            <circle r="3" fill="#0396A6" filter="url(#pulse-glow)">
                                <animateMotion
                                    dur="2.4s"
                                    begin="0.6s"
                                    repeatCount="indefinite"
                                    path="M 148 120 L 215 120 Q 235 120 242 145 L 250 152"
                                    keyPoints="0;1"
                                    keyTimes="0;1"
                                />
                            </circle>

                            {/* Packet 3: Voice Call */}
                            <circle r="3" fill="#0396A6" filter="url(#pulse-glow)">
                                <animateMotion
                                    dur="2.4s"
                                    begin="1.2s"
                                    repeatCount="indefinite"
                                    path="M 148 240 L 215 240 Q 235 240 242 215 L 250 208"
                                    keyPoints="0;1"
                                    keyTimes="0;1"
                                />
                            </circle>

                            {/* Packet 4: Social */}
                            <circle r="3" fill="#0396A6" filter="url(#pulse-glow)">
                                <animateMotion
                                    dur="2.4s"
                                    begin="1.8s"
                                    repeatCount="indefinite"
                                    path="M 148 320 L 210 320 Q 225 320 225 305 L 225 255 Q 225 242 238 240 L 255 235"
                                    keyPoints="0;1"
                                    keyTimes="0;1"
                                />
                            </circle>

                            {/* Packet 5: Frosty -> Qualified Lead (Repeats rhythmically) */}
                            <circle r="3.2" fill="#0396A6" filter="url(#pulse-glow)">
                                <animateMotion
                                    dur="1.8s"
                                    begin="0.8s"
                                    repeatCount="indefinite"
                                    path="M 405 180 L 522 180"
                                    keyPoints="0;1"
                                    keyTimes="0;1"
                                />
                            </circle>
                            <circle r="3.2" fill="#0396A6" filter="url(#pulse-glow)">
                                <animateMotion
                                    dur="1.8s"
                                    begin="1.7s"
                                    repeatCount="indefinite"
                                    path="M 405 180 L 522 180"
                                    keyPoints="0;1"
                                    keyTimes="0;1"
                                />
                            </circle>
                        </svg>
                    </motion.div>
                </div>

            </div>

            {/* ── Bottom Metrics Banner (Aesthetic, Transparent, Divided) ── */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                className="w-full relative z-10 mt-4 lg:mt-2"
            >
                <div className="w-full rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white/40 backdrop-blur-xs px-4 sm:px-8 py-3.5 sm:py-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 items-center divide-y lg:divide-y-0 lg:divide-x divide-slate-200/60">
                        
                        {/* Stat 1: Instant Response */}
                        <div className="flex items-center gap-3 sm:gap-3.5 lg:px-6 first:lg:pl-2">
                            <div className="text-[#0396A6] shrink-0">
                                <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-[#0396A6]" strokeWidth={1.75} fill="none" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight truncate">
                                    Instant Response
                                </span>
                                <span className="text-[10px] sm:text-[11px] text-slate-500 font-normal leading-tight mt-0.5 truncate">
                                    Engage in seconds
                                </span>
                            </div>
                        </div>

                        {/* Stat 2: Never Miss a Lead */}
                        <div className="flex items-center gap-3 sm:gap-3.5 lg:px-6 pt-3 lg:pt-0">
                            <div className="text-[#0396A6] shrink-0">
                                <ShieldCheckCustomIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#0396A6]" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight truncate">
                                    Never Miss a Lead
                                </span>
                                <span className="text-[10px] sm:text-[11px] text-slate-500 font-normal leading-tight mt-0.5 truncate">
                                    24/7 coverage
                                </span>
                            </div>
                        </div>

                        {/* Stat 3: Higher Conversions */}
                        <div className="flex items-center gap-3 sm:gap-3.5 lg:px-6 pt-3 lg:pt-0">
                            <div className="text-[#0396A6] shrink-0">
                                <TargetCustomIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#0396A6]" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight truncate">
                                    Higher Conversions
                                </span>
                                <span className="text-[10px] sm:text-[11px] text-slate-500 font-normal leading-tight mt-0.5 truncate">
                                    Turn more leads into sales
                                </span>
                            </div>
                        </div>

                        {/* Stat 4: More Revenue */}
                        <div className="flex items-center gap-3 sm:gap-3.5 lg:px-6 last:lg:pr-2 pt-3 lg:pt-0">
                            <div className="text-[#0396A6] shrink-0">
                                <RevenueChartCustomIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#0396A6]" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight truncate">
                                    More Revenue
                                </span>
                                <span className="text-[10px] sm:text-[11px] text-slate-500 font-normal leading-tight mt-0.5 truncate">
                                    Grow your business
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>

        </section>
    );
}
