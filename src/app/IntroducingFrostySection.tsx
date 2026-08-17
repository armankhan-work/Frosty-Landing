'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { Globe, MessageCircle, Users, Activity, Sparkles, MessageSquare, Zap, Filter } from 'lucide-react';
import FrostyIcon from '@/components/FrostyIcon';

type NodeData = {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    iconColor: string;
    position: { x: number; y: number };
    delayOffset: number;
};

const NODES: NodeData[] = [
    {
        id: 'website',
        title: 'Website',
        subtitle: 'Agent',
        icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#5F23C8]" />,
        iconColor: 'bg-[#5F23C8]/10 border-[#5F23C8]/25',
        position: { x: 18, y: 16 },
        delayOffset: 0
    },
    {
        id: 'whatsapp',
        title: 'WhatsApp',
        subtitle: 'Agent',
        icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />,
        iconColor: 'bg-green-50 border-green-200',
        position: { x: 82, y: 16 },
        delayOffset: 1.2
    },
    {
        id: 'unified',
        title: 'Unified',
        subtitle: 'Agent',
        icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#5F23C8]" />,
        iconColor: 'bg-[#5F23C8]/10 border-[#5F23C8]/25',
        position: { x: 14, y: 50 },
        delayOffset: 2.5
    },
    {
        id: 'crm',
        title: 'CRM',
        subtitle: '& Integrations',
        icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
        iconColor: 'bg-blue-50 border-blue-200',
        position: { x: 86, y: 50 },
        delayOffset: 3.8
    },
    {
        id: 'lead',
        title: 'Lead',
        subtitle: 'Segregation',
        icon: <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />,
        iconColor: 'bg-amber-50 border-amber-200',
        position: { x: 18, y: 84 },
        delayOffset: 4.5
    },
    {
        id: 'analytics',
        title: 'Analytics',
        subtitle: '& Insights',
        icon: <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[#5F23C8]" />,
        iconColor: 'bg-[#5F23C8]/10 border-[#5F23C8]/25',
        position: { x: 82, y: 84 },
        delayOffset: 5.1
    }
];

export default function IntroducingFrostySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

    const [particles, setParticles] = useState<Array<{ id: number, top: string, left: string, size: number, delay: number, duration: number }>>([]);
    const [burstActive, setBurstActive] = useState(false);
    const [, setCorePulse] = useState(0);

    // Perfect Sync Orchestrator States
    const [rayOutState, setRayOutState] = useState<Record<string, number>>({});
    const [rayInState, setRayInState] = useState<Record<string, number>>({});
    const [nodeGlowState, setNodeGlowState] = useState<Record<string, number>>({});

    // Click Interaction Controls
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const nodeTiltControls = useAnimation();
    const coreGlowControls = useAnimation();

    const handleCoreClick = () => {
        // Core instantly glows
        coreGlowControls.start({
            scale: [1, 1.15, 1],
            transition: { duration: 0.4 }
        });

        // Nodes tilt right, left, settle
        nodeTiltControls.start({
            rotate: [0, 8, -8, 4, -4, 0],
            transition: { duration: 0.7, ease: "easeInOut" }
        });
    };

    // Generate ambient particles
    useEffect(() => {
        const newParticles = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 5,
            duration: Math.random() * 6 + 6
        }));
        setParticles(newParticles);
    }, []);

    // Core Heartbeat & Intelligence Burst Orchestration
    useEffect(() => {
        if (!isInView) return;
        
        let beatCounter = 0;
        const beatInterval = setInterval(() => {
            beatCounter++;
            setCorePulse(prev => prev + 1);
            
            // Trigger intelligence burst every 3rd or 4th beat (approx 9-12s)
            if (beatCounter % 3 === 0) {
                setBurstActive(true);
                setTimeout(() => setBurstActive(false), 1500);
            }
        }, 3500);

        return () => clearInterval(beatInterval);
    }, [isInView]);

    // Master Timer for Rays and Node Glows
    useEffect(() => {
        if (!isInView) return;
        
        const intervals: NodeJS.Timeout[] = [];
        const timeouts: NodeJS.Timeout[] = [];

        NODES.forEach((node) => {
            const startDelay = node.delayOffset * 1000;
            
            const startNodeLoop = () => {
                let iteration = 0;
                
                const fireCycle = () => {
                    iteration++;
                    const now = Date.now();
                    
                    // Fire outbound ray
                    setRayOutState(prev => ({ ...prev, [node.id]: now }));
                    
                    // Glow EXACTLY when the 2nd ray hits (2.1s travel time)
                    if (iteration % 2 === 0) {
                        const tGlow = setTimeout(() => {
                            setNodeGlowState(prev => ({ ...prev, [node.id]: Date.now() }));
                        }, 2100);
                        timeouts.push(tGlow);
                    }
                    
                    // Fire inbound ray slightly later
                    const tIn = setTimeout(() => {
                        setRayInState(prev => ({ ...prev, [node.id]: Date.now() }));
                    }, 3500);
                    timeouts.push(tIn);
                };

                fireCycle();
                const interval = setInterval(fireCycle, 7000);
                intervals.push(interval);
            };

            const tStart = setTimeout(startNodeLoop, startDelay);
            timeouts.push(tStart);
        });

        return () => {
            intervals.forEach(clearInterval);
            timeouts.forEach(clearTimeout);
        };
    }, [isInView]);

    // Capability highlight sequence
    const [activeCapability, setActiveCapability] = useState(0);
    useEffect(() => {
        if (!isInView) return;
        const interval = setInterval(() => {
            setActiveCapability(prev => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, [isInView]);

    return (
        <section ref={sectionRef} className="relative w-full py-12 sm:py-16 lg:py-20 flex flex-col justify-center overflow-hidden bg-transparent">
            
            {/* Atmospheric Glow & Bottom Wave Field */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <motion.div 
                    animate={isInView ? { opacity: [0.15, 0.25, 0.15] } : {}}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#5F23C8]/8 via-transparent to-transparent blur-3xl"
                />
                
                {/* Abstract Electromagnetic Field Waves */}
                <div className="absolute bottom-0 left-0 w-full h-[350px] overflow-hidden opacity-20">
                    <motion.svg 
                        animate={isInView ? { x: [0, -1000] } : {}}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        width="300%" height="100%" viewBox="0 0 3000 300" preserveAspectRatio="none" className="absolute bottom-0"
                    >
                        <path d="M0,150 Q150,80 300,150 T600,150 T900,150 T1200,150 T1500,150 T1800,150 T2100,150 T2400,150 T2700,150 T3000,150" fill="none" stroke="url(#wave-grad)" strokeWidth="1.5" />
                    </motion.svg>
                    <motion.svg 
                        animate={isInView ? { x: [0, -1000] } : {}}
                        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                        width="300%" height="100%" viewBox="0 0 3000 300" preserveAspectRatio="none" className="absolute bottom-0"
                    >
                        <path d="M0,200 Q150,120 300,200 T600,200 T900,200 T1200,200 T1500,200 T1800,200 T2100,200 T2400,200 T2700,200 T3000,200" fill="none" stroke="url(#wave-grad)" strokeWidth="1" opacity="0.6"/>
                    </motion.svg>
                    <motion.svg 
                        animate={isInView ? { x: [0, -1000] } : {}}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        width="300%" height="100%" viewBox="0 0 3000 300" preserveAspectRatio="none" className="absolute bottom-0"
                    >
                        <path d="M0,250 Q150,180 300,250 T600,250 T900,250 T1200,250 T1500,250 T1800,250 T2100,250 T2400,250 T2700,250 T3000,250" fill="none" stroke="url(#wave-grad)" strokeWidth="2" opacity="0.3"/>
                        <defs>
                            <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#5F23C8" stopOpacity="0" />
                                <stop offset="50%" stopColor="#5F23C8" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#5F23C8" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </motion.svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                    
                    {/* Left Copy Column */}
                    <div className="flex flex-col justify-center mt-6 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.span 
                                className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#5F23C8] mb-8 block"
                                animate={isInView ? { opacity: [0.8, 1, 0.8] } : {}}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                INTRODUCING FROSTY AGENT
                            </motion.span>
                            <h2 
                                className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-[#0F172A] leading-[1.15] tracking-tight"
                                style={{ marginBottom: '2rem' }}
                            >
                                Meet <motion.span 
                                    className="inline-block text-[#5F23C8] font-bold"
                                    animate={isInView ? { textShadow: ["0 0 10px rgba(95,35,200,0.15)", "0 0 20px rgba(95,35,200,0.3)", "0 0 10px rgba(95,35,200,0.15)"] } : {}}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    Frosty Agent.
                                </motion.span>
                            </h2>
                            <p 
                                className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl"
                                style={{ marginBottom: '3.5rem' }}
                            >
                                An AI workforce built to engage customers, qualify opportunities, and move conversations forward.
                            </p>

                            <div className="flex flex-col" style={{ gap: '2rem' }}>
                                {[
                                    { icon: <Sparkles className="w-5 h-5" />, text: "Understands your business" },
                                    { icon: <MessageSquare className="w-5 h-5" />, text: "Engages across every channel" },
                                    { icon: <Zap className="w-5 h-5" />, text: "Takes action that drives results" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <motion.div 
                                            className={`flex-shrink-0 transition-colors duration-700 ${activeCapability === i ? 'text-[#5F23C8]' : 'text-slate-400'}`}
                                            animate={activeCapability === i ? { scale: [1, 1.1, 1] } : {}}
                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                        <span className={`font-semibold text-lg transition-colors duration-700 ${activeCapability === i ? 'text-[#0F172A]' : 'text-slate-500'}`}>
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Visual Column */}
                    <div className="relative w-full aspect-square max-w-[390px] sm:max-w-[420px] lg:max-w-[450px] mx-auto mt-4 lg:mt-0">
                        
                        {/* Magnetic Rings */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                            {[1, 2, 3, 4].map((ring, i) => (
                                <motion.div
                                    key={ring}
                                    className="absolute rounded-full border border-[#5F23C8]"
                                    style={{ width: '20%', height: '20%' }}
                                    animate={isInView ? {
                                        width: ['20%', '150%'],
                                        height: ['20%', '150%'],
                                        opacity: [0.25, 0],
                                        borderWidth: ['1.5px', '0.5px'],
                                        borderRadius: ['50%', '48%', '50%'],
                                    } : {}}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        delay: i * 2,
                                        ease: "circOut"
                                    }}
                                />
                            ))}
                        </div>

                        {/* Connection Paths & Data Particles */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {NODES.map((node) => {
                                const isBurst = burstActive;
                                return (
                                    <g key={`path-${node.id}`}>
                                        {/* Breathing Connection Line */}
                                        <motion.path 
                                            d={`M50,50 Q${(node.position.x + 50)/2},${node.position.y} ${node.position.x},${node.position.y}`}
                                            fill="none" 
                                            stroke="rgba(95,35,200,0.2)" 
                                            strokeWidth="0.3"
                                            animate={isInView ? {
                                                opacity: isBurst ? 0.8 : [0.3, 0.6, 0.3],
                                            } : {}}
                                            transition={{ duration: 4 + (node.delayOffset % 2), repeat: Infinity, ease: "easeInOut" }}
                                        />
                                        
                                        {/* Outbound Data Particle (Frosty -> Node) */}
                                        {rayOutState[node.id] && (
                                            <motion.circle
                                                key={`out-${node.id}-${rayOutState[node.id]}`}
                                                r="1.2"
                                                fill="#5F23C8"
                                                style={{ filter: 'drop-shadow(0 0 3px rgba(95,35,200,0.6))' }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0, 1, 1, 0] }}
                                                transition={{ duration: 2.1, times: [0, 0.1, 0.9, 1], ease: "linear" }}
                                            >
                                                <animateMotion 
                                                    dur="2.1s" 
                                                    fill="freeze"
                                                    path={`M50,50 Q${(node.position.x + 50)/2},${node.position.y} ${node.position.x},${node.position.y}`} 
                                                />
                                            </motion.circle>
                                        )}

                                        {/* Inbound Data Particle (Node -> Frosty) */}
                                        {rayInState[node.id] && (
                                            <motion.circle
                                                key={`in-${node.id}-${rayInState[node.id]}`}
                                                r="1.2"
                                                fill="#0284C7"
                                                style={{ filter: 'drop-shadow(0 0 3px rgba(2,132,199,0.6))' }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0, 1, 1, 0] }}
                                                transition={{ duration: 2.1, times: [0, 0.1, 0.9, 1], ease: "linear" }}
                                            >
                                                <animateMotion 
                                                    dur="2.1s" 
                                                    fill="freeze"
                                                    path={`M${node.position.x},${node.position.y} Q${(node.position.x + 50)/2},${node.position.y} 50,50`} 
                                                />
                                            </motion.circle>
                                        )}
                                    </g>
                                );
                            })}
                        </svg>

                        {/* Agent Nodes */}
                        {NODES.map((node) => {
                            const isWeb = node.id === 'website';
                            const isWA = node.id === 'whatsapp';
                            const isUnified = node.id === 'unified';
                            const isCRM = node.id === 'crm';
                            const isLead = node.id === 'lead';
                            
                            const floatY = isWeb ? 3 : isUnified ? 4 : isCRM ? 2 : isLead ? 3.5 : 2.5;
                            const floatX = isWA ? 3 : isCRM ? 2 : isLead ? -2 : 1;
                            const floatDur = isWeb ? 5.5 : isWA ? 6.2 : isUnified ? 7.1 : isCRM ? 5.8 : isLead ? 6.5 : 8.0;
                            
                            return (
                                <motion.div
                                    key={node.id}
                                    onHoverStart={() => setHoveredNode(node.id)}
                                    onHoverEnd={() => setHoveredNode(null)}
                                    onClick={() => setHoveredNode(hoveredNode === node.id ? null : node.id)}
                                    className={`absolute flex items-center justify-center sm:justify-start w-11 h-11 sm:w-auto sm:h-auto sm:gap-2.5 sm:bg-white/95 sm:backdrop-blur-md sm:border sm:border-slate-200/80 sm:rounded-xl sm:p-2 sm:pr-3.5 sm:shadow-[0_4px_18px_rgba(0,0,0,0.06)] cursor-pointer group ${hoveredNode === node.id ? 'z-50' : 'z-20'} sm:z-20`}
                                    style={{
                                        left: `${node.position.x}%`,
                                        top: `${node.position.y}%`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    animate={isInView ? {
                                        y: [`calc(-50% + 0px)`, `calc(-50% - ${floatY}px)`, `calc(-50% + ${floatY}px)`, `calc(-50% + 0px)`],
                                        x: [`calc(-50% + 0px)`, `calc(-50% + ${floatX}px)`, `calc(-50% - ${floatX}px)`, `calc(-50% + 0px)`],
                                        boxShadow: burstActive 
                                            ? "0 0 25px rgba(95,35,200,0.15)" 
                                            : "0 4px 18px rgba(0,0,0,0.06)"
                                    } : {}}
                                    transition={{
                                        y: { duration: floatDur, repeat: Infinity, ease: "easeInOut" },
                                        x: { duration: floatDur * 1.1, repeat: Infinity, ease: "easeInOut" },
                                        boxShadow: { duration: 0.5, ease: "easeOut" }
                                    }}
                                >
                                    <motion.div 
                                        className="relative w-full h-full flex items-center justify-center sm:justify-start"
                                        animate={nodeTiltControls}
                                    >
                                        {/* Colored Icon Box */}
                                        <motion.div 
                                            className={`flex items-center justify-center w-full h-full sm:w-9 sm:h-9 rounded-xl sm:rounded-lg sm:border ${node.iconColor} relative`}
                                            animate={isInView ? {
                                                rotate: isWeb ? [0, 2, -1, 0] : isWA ? [0, -2, 1, 0] : [0, 1, -1, 0],
                                                borderColor: burstActive ? 'rgba(95,35,200,0.5)' : 'rgba(95,35,200,0.2)',
                                            } : {}}
                                            transition={{
                                                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                                                borderColor: { duration: 0.8, ease: "easeOut" }
                                            }}
                                        >
                                            {/* Icon subtle glow on burst */}
                                            <motion.div
                                                className="absolute inset-0 bg-[#5F23C8] blur-md sm:rounded-lg"
                                                animate={{ opacity: burstActive ? 0.2 : 0 }}
                                                transition={{ duration: 0.4 }}
                                            />
                                            <div className="relative z-10 scale-105 sm:scale-100 drop-shadow-sm sm:drop-shadow-none">
                                                {node.icon}
                                            </div>
                                        </motion.div>
                                        
                                        {/* Desktop Text */}
                                        <div className="hidden sm:block ml-2.5">
                                            <div className="text-slate-900 font-bold text-[13px] leading-tight whitespace-nowrap">{node.title}</div>
                                            <div className="text-slate-500 text-[11px] whitespace-nowrap font-medium">{node.subtitle}</div>
                                        </div>
                                    </motion.div>
                                    
                                    {/* Mobile Tooltip */}
                                    <AnimatePresence>
                                        {hoveredNode === node.id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute sm:hidden top-full mt-3 left-1/2 -translate-x-1/2 bg-white border border-slate-200 text-slate-900 py-2 px-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] whitespace-nowrap z-50 flex flex-col items-center pointer-events-none"
                                            >
                                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-200 rotate-45 rounded-sm" />
                                                <div className="text-slate-900 font-bold text-[13px] leading-tight relative z-10">{node.title}</div>
                                                <div className="text-[#5F23C8] text-[10px] uppercase tracking-widest font-bold mt-0.5 relative z-10">{node.subtitle}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    
                                    {/* Localized node response halo */}
                                    {nodeGlowState[node.id] && (
                                        <motion.div 
                                            key={`glow-${node.id}-${nodeGlowState[node.id]}`}
                                            className="absolute inset-0 rounded-xl border border-[#5F23C8]/60 pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 0.6, 0] }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    )}
                                    
                                    {/* Burst active halo */}
                                    {burstActive && (
                                        <motion.div 
                                            className="absolute inset-0 rounded-xl border border-[#5F23C8]/40 pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 0.4, 0] }}
                                            transition={{ duration: 1.5 }}
                                        />
                                    )}
                                </motion.div>
                            );
                        })}

                        {/* Central Frosty Core */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center scale-[0.65] sm:scale-95 transition-transform duration-300">
                            
                            <div className="relative flex items-center justify-center w-[125px] h-[125px]">
                                {/* Outer atmospheric glow */}
                                <motion.div 
                                    className="absolute rounded-full bg-[#5F23C8]/15 blur-[35px]"
                                    animate={isInView ? {
                                        width: burstActive ? 210 : [170, 190, 170],
                                        height: burstActive ? 210 : [170, 190, 170],
                                        opacity: burstActive ? 0.6 : [0.3, 0.5, 0.3]
                                    } : {}}
                                    transition={burstActive ? { duration: 0.4, ease: "easeOut" } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                />
                                
                                {/* Inner bright rim */}
                                <motion.div 
                                    className="absolute w-[125px] h-[125px] rounded-full border-[2px] border-[#5F23C8]/30 bg-white/95 backdrop-blur-sm flex items-center justify-center"
                                    animate={isInView ? {
                                        scale: burstActive ? 1.05 : [1, 1.015, 1],
                                        boxShadow: burstActive 
                                            ? "0 0 50px rgba(95,35,200,0.3), inset 0 0 18px rgba(95,35,200,0.15)"
                                            : [
                                                "0 0 25px rgba(95,35,200,0.15), inset 0 0 10px rgba(95,35,200,0.05)", 
                                                "0 0 40px rgba(95,35,200,0.25), inset 0 0 18px rgba(95,35,200,0.1)", 
                                                "0 0 25px rgba(95,35,200,0.15), inset 0 0 10px rgba(95,35,200,0.05)"
                                            ]
                                    } : {}}
                                    transition={burstActive ? { duration: 0.4, ease: "easeOut" } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div 
                                        className="absolute w-[105px] h-[105px] rounded-full bg-gradient-to-br from-white via-[#FAF5FF] to-[#EDE9FE] border border-slate-100 flex items-center justify-center cursor-pointer shadow-inner"
                                        onClick={handleCoreClick}
                                    >
                                        <motion.div
                                            animate={isInView ? {
                                                opacity: burstActive ? 1 : [0.9, 1, 0.9],
                                                scale: burstActive ? 1.05 : 1
                                            } : {}}
                                            transition={burstActive ? { duration: 0.3 } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <motion.div
                                                animate={coreGlowControls}
                                                whileHover={{ rotate: 90, scale: 1.1 }}
                                            >
                                                <FrostyIcon size={50} glow={0.6} />
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                            
                            <motion.div 
                                className="absolute -bottom-7 text-slate-900 font-bold text-base tracking-wide z-40 whitespace-nowrap"
                                animate={{ opacity: burstActive ? 1 : 0.9 }}
                            >
                                Frosty Agent
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>
            
            {/* Ambient Particles around magnetic field */}
            <div className="absolute inset-0 pointer-events-none z-50">
                {particles.map((p) => (
                    <motion.div
                        key={`amb-${p.id}`}
                        className="absolute rounded-full bg-[#5F23C8]"
                        style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
                        animate={isInView ? {
                            opacity: [0, 0.3, 0],
                            y: [0, -40],
                            x: [0, (Math.random() - 0.5) * 30]
                        } : {}}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
            
        </section>
    );
}
