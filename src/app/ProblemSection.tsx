'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Globe, MessageCircle, User, Users, Clock, UserCircle, X } from 'lucide-react';

export default function ProblemSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [msgIndex, setMsgIndex] = useState(0);
    const [loopKey, setLoopKey] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
        };
    }, []);

    const SEQ = {
        website: 0.2, webWire: 0.8, centerCard: 1.6,
        whatsapp: 3.0, waWire: 3.4,
        lead: 4.8, leadWire: 5.2,
        team: 6.6, teamWire: 7.0,
        waitWire: 8.4, waitCard: 9.0,
        followWire: 9.8, followCard: 10.2,
        noRespWire: 11.0, noRespCard: 11.4,
    };

    const messages = [
        "Hi, I'm interested in\nyour enterprise plan.",
        "Hey, can someone\nexplain the pricing?",
        "I submitted a form\nbut no response.",
        "Ping: Need an update\non this prospect."
    ];

    useEffect(() => {
        if (!containerRef.current) return;
        
        // Dynamically measure the available width in the right column and scale the 800px diagram perfectly
        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                const availableWidth = entries[0].contentRect.width;
                setScale(Math.min(1, availableWidth / 800));
            }
        });
        
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-transparent flex flex-col items-center pt-32 pb-12 overflow-hidden z-10">
            
            {/* Atmospheric Glow */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="w-[800px] h-[800px] bg-[#5F23C8]/10 rounded-full blur-[150px]" 
                />
            </div>

            {/* Top Section Grid - Uses 50/50 split on large screens to prevent text squishing */}
            <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[45%_55%] gap-12 lg:gap-8 items-center z-10 relative">
                
                {/* TOP LEFT: The Core Problem Statement */}
                <div className="flex flex-col items-start text-left w-full z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full text-left"
                    >
                        <h4 className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#5F23C8] mb-8 block">
                            THE PROBLEM
                        </h4>
                    </motion.div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full text-left text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-[1.1] tracking-tight"
                        style={{ marginBottom: '2rem' }}
                    >
                        Your customers <br />
                        are already reaching out. <br />
                        <span className="text-[#8B5CF6]">They just aren't waiting.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-full text-left text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl"
                        style={{ marginBottom: '3.5rem' }}
                    >
                        Every enquiry starts a journey.<br />
                        Too many get lost in the gap between<br />
                        interest and action.
                    </motion.p>
                </div>

                {/* TOP RIGHT: The Interactive Network */}
                <div className="w-full flex justify-center lg:justify-end items-center z-10">
                    {/* The measuring container */}
                    <div ref={containerRef} className="w-full max-w-[800px] flex justify-center lg:justify-end overflow-visible">
                        {/* The bounding box that exactly matches the scaled dimension, preventing layout overflow */}
                        <div style={{ width: 800 * scale, height: 500 * scale }} className="relative shrink-0">
                            {/* The perfectly scaled 800x500 canvas */}
                            <motion.div 
                                key={loopKey}
                                className="absolute top-0 left-0 w-[800px] h-[500px] origin-top-left"
                                style={{ transform: `scale(${scale})` }}
                                initial={{ opacity: 1 }}
                                animate={{ opacity: isFadingOut ? 0 : 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                
                                {/* SVG CONNECTIONS (Back layer) */}
                                <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                    <defs>
                                        <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="1" />
                                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    
                                    {/* Website to Center - Base Line */}
                                    <motion.path 
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        onAnimationStart={() => setMsgIndex(0)}
                                        transition={{ duration: 1.2, delay: SEQ.webWire, ease: "easeInOut" }}
                                        d="M 180 80 Q 250 80 250 145 T 280 210" 
                                        fill="none" stroke="#8B5CF6" strokeOpacity="0.3" strokeWidth="1.5"
                                    />
                                    {/* Website to Center - Live Signal */}
                                    <motion.path 
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1, strokeDashoffset: [40, 0] }}
                                        viewport={{ once: true }}
                                        transition={{ 
                                            opacity: { delay: SEQ.webWire + 1.2, duration: 0.5 },
                                            strokeDashoffset: { repeat: Infinity, duration: 1.2, ease: "linear" }
                                        }}
                                        d="M 180 80 Q 250 80 250 145 T 280 210" 
                                        fill="none" stroke="url(#glowLine)" strokeWidth="2.5" strokeDasharray="6 34"
                                    />
                                    
                                    {/* Fragments to Center (Broken) */}
                                    {/* WhatsApp */}
                                    <motion.path 
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        onAnimationStart={() => setMsgIndex(1)}
                                        transition={{ duration: 0.6, delay: SEQ.waWire, ease: "easeOut" }}
                                        d="M 180 180 Q 230 180 250 195" 
                                        fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4"
                                    />
                                    <motion.text x="225" y="184" fill="#ef4444" fontSize="14" fontWeight="bold" initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{type:"spring", delay: SEQ.waWire + 0.6}}>X</motion.text>
                                    
                                    {/* Lead */}
                                    <motion.path 
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        onAnimationStart={() => setMsgIndex(2)}
                                        transition={{ duration: 0.6, delay: SEQ.leadWire, ease: "easeOut" }}
                                        d="M 180 280 Q 230 280 250 265" 
                                        fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4"
                                    />
                                    <motion.text x="238" y="284" fill="#ef4444" fontSize="14" fontWeight="bold" initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{type:"spring", delay: SEQ.leadWire + 0.6}}>X</motion.text>
                                    
                                    {/* Team */}
                                    <motion.path 
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        onAnimationStart={() => setMsgIndex(3)}
                                        transition={{ duration: 0.6, delay: SEQ.teamWire, ease: "easeOut" }}
                                        d="M 180 380 Q 250 380 250 315 T 280 250" 
                                        fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4"
                                    />
                                    <motion.text x="225" y="384" fill="#ef4444" fontSize="14" fontWeight="bold" initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{type:"spring", delay: SEQ.teamWire + 0.6}}>X</motion.text>

                                    {/* Center to Timeline (Waiting) */}
                                    <motion.path 
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: SEQ.waitWire, ease: "easeInOut" }}
                                        d="M 580 230 Q 640 230 640 180 T 680 130" 
                                        fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4"
                                    />
                                    
                                    {/* Vertical Timeline Lines */}
                                    <motion.line 
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: SEQ.followWire }}
                                        x1="680" y1="150" x2="680" y2="230"
                                        stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4"
                                    />
                                    <motion.line 
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: SEQ.noRespWire }}
                                        x1="680" y1="270" x2="680" y2="350"
                                        stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4"
                                    />

                                    {/* Dots and Crosses on Timeline */}
                                    <motion.circle cx="680" cy="180" r="3" fill="#8B5CF6" initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{delay:SEQ.waitCard}} />
                                    <motion.circle cx="680" cy="280" r="3" fill="#8B5CF6" initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{delay:SEQ.followCard}} />
                                    <motion.text x="635" y="334" fill="#ef4444" fontSize="14" fontWeight="bold" initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{type:"spring", delay: SEQ.noRespCard + 0.3}}>X</motion.text>
                                    <motion.path d="M 645 330 Q 660 330 680 340" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" initial={{pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true}} transition={{delay: SEQ.noRespCard}}/>
                                </svg>

                                {/* TOUCHPOINTS (Left Column) */}
                                <div className="absolute left-0 top-0 w-[180px] h-full flex flex-col justify-center gap-6 z-10">
                                    {/* WEBSITE */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: SEQ.website }}
                                        className="bg-[#050510]/80 border border-[#8B5CF6]/30 rounded-[12px] p-3 flex items-center gap-3 relative overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                                    >
                                        <div className="w-8 h-8 rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                                            <Globe size={14} className="text-[#8B5CF6]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-white tracking-wide">WEBSITE</span>
                                            <span className="text-[9px] text-slate-400">New enquiry</span>
                                            <span className="text-[9px] text-[#8B5CF6] mt-0.5">10:42 AM</span>
                                        </div>
                                    </motion.div>

                                    {/* WHATSAPP */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: SEQ.whatsapp }}
                                        className="bg-[#050510]/80 border border-white/5 rounded-[12px] p-3 flex items-center gap-3"
                                    >
                                        <div className="w-8 h-8 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/10 flex items-center justify-center shrink-0">
                                            <MessageCircle size={14} className="text-[#22c55e]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-white tracking-wide">WHATSAPP</span>
                                            <span className="text-[9px] text-slate-400">New message</span>
                                            <span className="text-[9px] text-slate-500 mt-0.5">10:43 AM</span>
                                        </div>
                                    </motion.div>

                                    {/* LEAD */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: SEQ.lead }}
                                        className="bg-[#050510]/80 border border-white/5 rounded-[12px] p-3 flex items-center gap-3"
                                    >
                                        <div className="w-8 h-8 rounded-full border border-blue-400/20 bg-blue-400/10 flex items-center justify-center shrink-0">
                                            <User size={14} className="text-blue-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-white tracking-wide">LEAD</span>
                                            <span className="text-[9px] text-slate-400">New contact</span>
                                            <span className="text-[9px] text-slate-500 mt-0.5">10:45 AM</span>
                                        </div>
                                    </motion.div>

                                    {/* TEAM */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: SEQ.team }}
                                        className="bg-[#050510]/80 border border-white/5 rounded-[12px] p-3 flex items-center gap-3"
                                    >
                                        <div className="w-8 h-8 rounded-full border border-slate-400/20 bg-slate-400/10 flex items-center justify-center shrink-0">
                                            <Users size={14} className="text-slate-300" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-white tracking-wide">TEAM</span>
                                            <span className="text-[9px] text-slate-400">Follow-up pending</span>
                                            <span className="text-[9px] text-slate-500 mt-0.5">-- : --</span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* CENTRAL CONVERSATION CARD */}
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: SEQ.centerCard }}
                                    className="absolute left-[280px] top-1/2 -translate-y-1/2 w-[300px] bg-[#050510]/95 backdrop-blur-md border border-[#8B5CF6]/30 shadow-[0_0_40px_rgba(139,92,246,0.15)] rounded-2xl p-5 z-20"
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full border border-[#8B5CF6]/30 flex items-center justify-center bg-[#8B5CF6]/10">
                                                <User size={14} className="text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-white">Visitor</span>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-mono">10:42 AM</span>
                                    </div>
                                    
                                    <div className="bg-[#0f0f1b] border border-[#8B5CF6]/20 rounded-xl rounded-tl-sm p-4 text-sm text-slate-200 mb-6 shadow-inner leading-relaxed min-h-[72px] flex items-center">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={msgIndex}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                transition={{ duration: 0.2 }}
                                                className="whitespace-pre-line"
                                            >
                                                {messages[msgIndex]}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    <div className="flex justify-center items-center gap-3 pt-3 bg-[#0a0a14] rounded-lg border border-white/5 p-2">
                                        <div className="flex gap-1.5">
                                            <motion.div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} />
                                            <motion.div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} />
                                            <motion.div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} />
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">WAITING FOR RESPONSE</span>
                                    </div>
                                </motion.div>

                                {/* STATUS TIMELINE (Right Column) */}
                                <div className="absolute right-0 top-0 h-full flex flex-col justify-center gap-[70px] z-10 w-[180px]">
                                    
                                    {/* WAITING */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: SEQ.waitCard }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-9 h-9 rounded-full border border-[#8B5CF6]/50 bg-[#8B5CF6]/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.2)] relative">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                            >
                                                <Clock size={14} className="text-[#8B5CF6]" />
                                            </motion.div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-white tracking-widest uppercase">WAITING</span>
                                            <span className="text-[9px] text-slate-400">Enquiry received</span>
                                        </div>
                                    </motion.div>

                                    {/* FOLLOW-UP PENDING */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: SEQ.followCard }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0">
                                            <UserCircle size={14} className="text-white" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-white tracking-widest uppercase">FOLLOW-UP PENDING</span>
                                            <span className="text-[9px] text-slate-400">Not yet assigned</span>
                                        </div>
                                    </motion.div>

                                    {/* NO RESPONSE */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: SEQ.noRespCard }}
                                        className="flex items-center gap-4"
                                        onAnimationComplete={() => {
                                            if (!loopTimeoutRef.current) {
                                                loopTimeoutRef.current = setTimeout(() => {
                                                    setIsFadingOut(true);
                                                    setTimeout(() => {
                                                        setLoopKey(prev => prev + 1);
                                                        setIsFadingOut(false);
                                                        setMsgIndex(0);
                                                        loopTimeoutRef.current = null;
                                                    }, 600);
                                                }, 4000);
                                            }
                                        }}
                                    >
                                        <div className="w-9 h-9 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 flex items-center justify-center shrink-0">
                                            <X size={14} className="text-slate-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-white tracking-widest uppercase">NO RESPONSE</span>
                                            <span className="text-[9px] text-slate-400">Opportunity at risk</span>
                                        </div>
                                    </motion.div>

                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
