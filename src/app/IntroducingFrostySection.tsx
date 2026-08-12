'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Globe, MessageCircle, BookOpen, Users, Activity, Sparkles, MessageSquare, Zap, Filter } from 'lucide-react';
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
        icon: <Globe className="w-5 h-5 text-white" />,
        iconColor: 'bg-[#5F23C8]/40 border-[#8B5CF6]/40',
        position: { x: 15, y: 15 },
        delayOffset: 0
    },
    {
        id: 'whatsapp',
        title: 'WhatsApp',
        subtitle: 'Agent',
        icon: <MessageCircle className="w-5 h-5 text-white" />,
        iconColor: 'bg-green-500/40 border-green-400/40',
        position: { x: 85, y: 15 },
        delayOffset: 1.2
    },
    {
        id: 'unified',
        title: 'Unified',
        subtitle: 'Agent',
        icon: <Sparkles className="w-5 h-5 text-white" />,
        iconColor: 'bg-[#5F23C8]/40 border-[#8B5CF6]/40',
        position: { x: 15, y: 55 },
        delayOffset: 2.5
    },
    {
        id: 'crm',
        title: 'CRM',
        subtitle: '& Integrations',
        icon: <Users className="w-5 h-5 text-white" />,
        iconColor: 'bg-[#5F23C8]/40 border-[#8B5CF6]/40',
        position: { x: 85, y: 55 },
        delayOffset: 3.8
    },
    {
        id: 'lead',
        title: 'Lead',
        subtitle: 'Segregation',
        icon: <Filter className="w-5 h-5 text-white" />,
        iconColor: 'bg-[#5F23C8]/40 border-[#8B5CF6]/40',
        position: { x: 15, y: 95 },
        delayOffset: 4.5
    },
    {
        id: 'analytics',
        title: 'Analytics',
        subtitle: '& Insights',
        icon: <Activity className="w-5 h-5 text-white" />,
        iconColor: 'bg-[#5F23C8]/40 border-[#8B5CF6]/40',
        position: { x: 85, y: 95 },
        delayOffset: 5.1
    }
];

export default function IntroducingFrostySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

    const [particles, setParticles] = useState<Array<{ id: number, top: string, left: string, size: number, delay: number, duration: number }>>([]);
    const [burstActive, setBurstActive] = useState(false);
    const [corePulse, setCorePulse] = useState(0);

    // Perfect Sync Orchestrator States
    const [rayOutState, setRayOutState] = useState<Record<string, number>>({});
    const [rayInState, setRayInState] = useState<Record<string, number>>({});
    const [nodeGlowState, setNodeGlowState] = useState<Record<string, number>>({});

    // Click Interaction Controls
    const nodeTiltControls = useAnimation();
    const coreGlowControls = useAnimation();

    const handleCoreClick = () => {
        // Core instantly glows
        coreGlowControls.start({
            filter: ["brightness(1.5)", "brightness(2.5)", "brightness(1.5)"],
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
        }, 3500); // 3.5s heartbeat

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

                fireCycle(); // Fire the first one immediately upon delay
                const interval = setInterval(fireCycle, 7000); // Loop every 7s
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
        <section ref={sectionRef} className="relative w-full min-h-screen py-24 md:py-32 overflow-hidden bg-transparent">
            
            {/* Layer 2 & 3: Atmospheric Glow & Bottom Wave Field */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <motion.div 
                    animate={isInView ? { opacity: [0.2, 0.3, 0.2] } : {}}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#5F23C8]/10 via-transparent to-transparent blur-3xl"
                />
                
                {/* Abstract Electromagnetic Field Waves */}
                <div className="absolute bottom-0 left-0 w-full h-[350px] overflow-hidden opacity-30">
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
                                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
                                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </motion.svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                    
                    {/* Left Copy Column */}
                    <div className="flex flex-col justify-center order-2 lg:order-1 mt-10 lg:mt-0 lg:-translate-y-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.span 
                                className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#8B5CF6] mb-8 block"
                                animate={isInView ? { opacity: [0.8, 1, 0.8] } : {}}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                INTRODUCING FROSTY
                            </motion.span>
                            <h2 
                                className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-[1.1] tracking-tight"
                                style={{ marginBottom: '2rem' }}
                            >
                                Meet <motion.span 
                                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd]"
                                    animate={isInView ? { textShadow: ["0 0 10px rgba(139,92,246,0.3)", "0 0 20px rgba(139,92,246,0.6)", "0 0 10px rgba(139,92,246,0.3)"] } : {}}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    Frosty.
                                </motion.span>
                            </h2>
                            <p 
                                className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl"
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
                                            className={`flex-shrink-0 transition-colors duration-700 ${activeCapability === i ? 'text-[#C4B5FD]' : 'text-[#8B5CF6]/60'}`}
                                            animate={activeCapability === i ? { scale: [1, 1.1, 1], filter: "drop-shadow(0 0 8px rgba(139,92,246,0.8))" } : { filter: "drop-shadow(0 0 0px rgba(139,92,246,0))" }}
                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                        <span className={`font-medium text-lg transition-colors duration-700 ${activeCapability === i ? 'text-white' : 'text-zinc-400'}`}>
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Visual Column */}
                    <div className="relative w-full aspect-square max-w-[500px] mx-auto order-1 lg:order-2 mt-8 lg:mt-0">
                        
                        {/* Layer 4: Magnetic Rings */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                            {[1, 2, 3, 4].map((ring, i) => (
                                <motion.div
                                    key={ring}
                                    className="absolute rounded-full border border-[#8B5CF6]"
                                    style={{ width: '20%', height: '20%' }}
                                    animate={isInView ? {
                                        width: ['20%', '150%'],
                                        height: ['20%', '150%'],
                                        opacity: [0.4, 0],
                                        borderWidth: ['1.5px', '0.5px'],
                                        borderRadius: ['50%', '48%', '50%'], // Subtle magnetic distortion
                                    } : {}}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        delay: i * 2, // Sequential ripple from core
                                        ease: "circOut" // Starts slightly faster, slows down smoothly
                                    }}
                                />
                            ))}
                        </div>

                        {/* Layer 5 & 6: Connection Paths & Data Particles */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {NODES.map((node) => {
                                const isBurst = burstActive;
                                return (
                                    <g key={`path-${node.id}`}>
                                        {/* Breathing Connection Line */}
                                        <motion.path 
                                            d={`M50,50 Q${(node.position.x + 50)/2},${node.position.y} ${node.position.x},${node.position.y}`}
                                            fill="none" 
                                            stroke="rgba(139,92,246,0.3)" 
                                            strokeWidth="0.25"
                                            animate={isInView ? {
                                                opacity: isBurst ? 0.8 : [0.3, 0.55, 0.3],
                                            } : {}}
                                            transition={{ duration: 4 + (node.delayOffset % 2), repeat: Infinity, ease: "easeInOut" }}
                                        />
                                        
                                        {/* Outbound Data Particle (Frosty -> Node) */}
                                        {rayOutState[node.id] && (
                                            <motion.circle
                                                key={`out-${node.id}-${rayOutState[node.id]}`}
                                                r="1.2"
                                                fill="#E9D5FF"
                                                style={{ filter: 'drop-shadow(0 0 4px #C4B5FD)' }}
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
                                                fill="#C4B5FD"
                                                style={{ filter: 'drop-shadow(0 0 4px #A78BFA)' }}
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

                        {/* Layer 7: Agent Nodes */}
                        {NODES.map((node) => {
                            // Unique micro-motions based on node id
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
                                    className="absolute z-20 flex items-center gap-3 bg-[#0C0F1A]/85 backdrop-blur-md border border-white/5 rounded-xl p-3 pr-5 shadow-xl"
                                    style={{
                                        left: `${node.position.x}%`,
                                        top: `${node.position.y}%`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    animate={isInView ? {
                                        // Magnetic Node Floating + Micro Orbital Drift
                                        y: [`calc(-50% + 0px)`, `calc(-50% - ${floatY}px)`, `calc(-50% + ${floatY}px)`, `calc(-50% + 0px)`],
                                        x: [`calc(-50% + 0px)`, `calc(-50% + ${floatX}px)`, `calc(-50% - ${floatX}px)`, `calc(-50% + 0px)`],
                                        boxShadow: burstActive 
                                            ? "0 0 25px rgba(139,92,246,0.3)" 
                                            : "0 4px 20px rgba(0,0,0,0.5)"
                                    } : {}}
                                    transition={{
                                        y: { duration: floatDur, repeat: Infinity, ease: "easeInOut" },
                                        x: { duration: floatDur * 1.1, repeat: Infinity, ease: "easeInOut" },
                                        boxShadow: { duration: 0.5, ease: "easeOut" }
                                    }}
                                >
                                    <motion.div 
                                        className="flex items-center gap-3 relative w-full h-full"
                                        animate={nodeTiltControls}
                                    >
                                        <motion.div 
                                            className={`flex items-center justify-center w-10 h-10 rounded-lg border ${node.iconColor} relative`}
                                            animate={isInView ? {
                                                // Icon Micro-rotation
                                                rotate: isWeb ? [0, 2, -1, 0] : isWA ? [0, -2, 1, 0] : [0, 1, -1, 0],
                                                borderColor: burstActive ? 'rgba(196,181,253,0.6)' : 'rgba(139,92,246,0.4)',
                                            } : {}}
                                            transition={{
                                                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                                                borderColor: { duration: 0.8, ease: "easeOut" }
                                            }}
                                        >
                                            {/* Icon subtle glow on burst or simulated pulse arrival */}
                                            <motion.div
                                                className="absolute inset-0 bg-[#C4B5FD] rounded-lg blur-md"
                                                animate={{ opacity: burstActive ? 0.4 : 0 }}
                                                transition={{ duration: 0.4 }}
                                            />
                                            <div className="relative z-10">
                                                {node.icon}
                                            </div>
                                        </motion.div>
                                        <div>
                                            <div className="text-white font-medium text-sm leading-tight whitespace-nowrap">{node.title}</div>
                                            <div className="text-zinc-400 text-xs whitespace-nowrap">{node.subtitle}</div>
                                        </div>
                                    </motion.div>
                                    
                                    {/* Localized node response (purple halo) synced via state */}
                                    {nodeGlowState[node.id] && (
                                        <motion.div 
                                            key={`glow-${node.id}-${nodeGlowState[node.id]}`}
                                            className="absolute inset-0 rounded-xl border border-[#C4B5FD] pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 0.6, 0] }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    )}
                                    
                                    {/* Burst active halo */}
                                    {burstActive && (
                                        <motion.div 
                                            className="absolute inset-0 rounded-xl border border-[#C4B5FD] pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 0.4, 0] }}
                                            transition={{ duration: 1.5 }}
                                        />
                                    )}
                                </motion.div>
                            );
                        })}

                        {/* Layer 8: Central Frosty Core */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center">
                            
                            <div className="relative flex items-center justify-center w-[140px] h-[140px]">
                                {/* Outer atmospheric glow (Heartbeat driven) */}
                                <motion.div 
                                    className="absolute rounded-full bg-[#8B5CF6]/30 blur-[40px]"
                                    animate={isInView ? {
                                        width: burstActive ? 240 : [200, 220, 200],
                                        height: burstActive ? 240 : [200, 220, 200],
                                        opacity: burstActive ? 0.9 : [0.4, 0.7, 0.4]
                                    } : {}}
                                    transition={burstActive ? { duration: 0.4, ease: "easeOut" } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                />
                                
                                {/* Inner bright rim */}
                                <motion.div 
                                    className="absolute w-[140px] h-[140px] rounded-full border-[2px] border-[#C4B5FD]/70 bg-[#3B0764]/50 backdrop-blur-sm flex items-center justify-center"
                                    animate={isInView ? {
                                        scale: burstActive ? 1.05 : [1, 1.015, 1], // Core heartbeat expansion
                                        boxShadow: burstActive 
                                            ? "0 0 100px rgba(196,181,253,0.8), inset 0 0 40px rgba(196,181,253,0.6)"
                                            : [
                                                "0 0 40px rgba(139,92,246,0.5), inset 0 0 15px rgba(196,181,253,0.2)", 
                                                "0 0 70px rgba(139,92,246,0.8), inset 0 0 30px rgba(196,181,253,0.5)", 
                                                "0 0 40px rgba(139,92,246,0.5), inset 0 0 15px rgba(196,181,253,0.2)"
                                            ]
                                    } : {}}
                                    transition={burstActive ? { duration: 0.4, ease: "easeOut" } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div 
                                        className="absolute w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#1E0533] to-[#0D021A] flex items-center justify-center cursor-pointer"
                                        onClick={handleCoreClick}
                                    >
                                        <motion.div
                                            animate={isInView ? {
                                                opacity: burstActive ? 1 : [0.8, 1, 0.8],
                                                filter: burstActive ? "brightness(1.5)" : ["brightness(1)", "brightness(1.2)", "brightness(1)"]
                                            } : {}}
                                            transition={burstActive ? { duration: 0.3 } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <motion.div
                                                animate={coreGlowControls}
                                                whileHover={{ rotate: 90, scale: 1.1 }}
                                            >
                                                <FrostyIcon size={60} glow={0} />
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                            
                            <motion.div 
                                className="absolute -bottom-8 text-white font-medium text-lg tracking-wide z-40"
                                animate={{ opacity: burstActive ? 1 : 0.8, textShadow: burstActive ? "0 0 10px #C4B5FD" : "none" }}
                            >
                                Frosty
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>
            
            {/* Layer 9: Ambient Particles around magnetic field */}
            <div className="absolute inset-0 pointer-events-none z-50">
                {particles.map((p) => (
                    <motion.div
                        key={`amb-${p.id}`}
                        className="absolute rounded-full bg-[#E9D5FF]"
                        style={{ top: p.top, left: p.left, width: p.size, height: p.size, filter: "blur(0.5px)" }}
                        animate={isInView ? {
                            opacity: [0, 0.6, 0],
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
