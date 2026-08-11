// @ts-nocheck
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ShieldCheck, Sparkles, ArrowRight, ArrowLeft, Diamond, Check, Globe } from 'lucide-react';

const STEPS_DATA = [
    {
        stepNumber: "01",
        stepLabel: "Step 1 of 3",
        title: "Tell us about your business",
        description: "A short onboarding session to understand your services, products, pricing, FAQs, and how you like to speak to your customers.",
        items: [
            "Your services & offerings",
            "Pricing & common queries",
            "Tone, rules & brand voice",
            "Preferred platforms"
        ],
        time: "20-30 MIN",
        summaryTitle: "Tell us about\nyour business",
        summaryDesc: "A short onboarding session to understand your services, products, and FAQs."
    },
    {
        stepNumber: "02",
        stepLabel: "Step 2 of 3",
        title: "We customize and train Frosty",
        description: "Built around your content, tested against real customer questions. We tune AI guardrails and conversation flow to match your exact standards.",
        items: [
            "Custom knowledge base ingestion",
            "Rigorous QA & test scenarios",
            "Guardrails & fallback protocols",
            "Brand voice refinement"
        ],
        time: "48-72 HOURS",
        summaryTitle: "We customize\nand train Frosty",
        summaryDesc: "Built around your content, tested against real customer questions."
    },
    {
        stepNumber: "03",
        stepLabel: "Step 3 of 3",
        title: "We deploy – you convert",
        description: "We launch Frosty on your website and WhatsApp and keep tuning it while you focus on closing. Continuous learning from real customer interactions.",
        items: [
            "One-click website widget setup",
            "Direct WhatsApp Business integration",
            "Real-time analytics & transcript monitoring",
            "Continuous optimization & tuning"
        ],
        time: "GO LIVE FAST",
        summaryTitle: "We deploy –\nyou convert",
        summaryDesc: "We launch Frosty on your website and WhatsApp and keep tuning it while you focus on closing."
    }
];

export default function DoneForYou() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const activeStep = STEPS_DATA[currentStep];

    const renderCompactPreview = (stepIdx: number) => {
        if (stepIdx === 0) {
            return (
                <div className="bg-gradient-to-r from-[#1e293b]/80 to-[#020617] text-white rounded-xl px-3.5 h-[46px] mb-5 flex items-center justify-between text-[11px] shadow-sm border border-[#5F23C8]/30 shrink-0">
                    <div className="flex items-center gap-2 truncate pr-2">
                        <span className="flex h-2 w-2 relative shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5F23C8] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5F23C8]"></span>
                        </span>
                        <span className="font-mono text-slate-300 truncate text-[10px] sm:text-[11px]"><strong className="text-white font-semibold">Scanner Active:</strong> <span className="hidden sm:inline">Ingesting pricing, rules & FAQs...</span></span>
                    </div>
                    <span className="bg-[#5F23C8]/20 text-[#5F23C8] font-mono px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] shrink-0 border border-[#5F23C8]/30 font-bold">100% READY</span>
                </div>
            );
        } else if (stepIdx === 1) {
            return (
                <div className="bg-gradient-to-r from-[#1e293b]/80 to-[#020617] text-white rounded-xl px-3.5 h-[46px] mb-5 flex items-center justify-between text-[11px] shadow-sm border border-[#5F23C8]/30 shrink-0">
                    <div className="flex items-center gap-2 truncate pr-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#5F23C8] shrink-0" />
                        <span className="font-mono text-slate-300 truncate text-[10px] sm:text-[11px]"><strong className="text-white font-semibold">Neural QA:</strong> <span className="hidden sm:inline">Guardrails locked & tested against queries</span></span>
                    </div>
                    <span className="bg-[#5F23C8]/20 text-[#5F23C8] font-mono px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] shrink-0 border border-[#5F23C8]/30 font-bold">0 ERRORS</span>
                </div>
            );
        } else {
            return (
                <div className="bg-gradient-to-r from-[#1e293b]/80 to-[#020617] text-white rounded-xl px-3.5 h-[46px] mb-5 flex items-center justify-between text-[11px] shadow-sm border border-[#5F23C8]/30 shrink-0">
                    <div className="flex items-center gap-2 truncate pr-2">
                        <Globe className="w-3.5 h-3.5 text-[#5F23C8] shrink-0" />
                        <span className="font-mono text-slate-300 truncate text-[10px] sm:text-[11px]"><strong className="text-white font-semibold">Omnichannel:</strong> <span className="hidden sm:inline">Live on Web Widget & WhatsApp API</span></span>
                    </div>
                    <span className="bg-[#5F23C8] text-white font-mono px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] shrink-0 font-bold animate-pulse">CONVERTING</span>
                </div>
            );
        }
    };

    return (
        <section id="setup" className="relative w-full overflow-hidden font-sans pt-16 sm:pt-24 pb-20 sm:pb-32 bg-transparent">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#5F23C8]/[0.03] blur-[120px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#5F23C8]/[0.03] blur-[100px]" />
                
                {/* Subtle curved lines in background similar to image */}
                <svg className="absolute bottom-0 left-0 w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                    <path d="M0,1000 C200,800 400,1000 1000,600" fill="none" stroke="#5F23C8" strokeWidth="0.5" strokeDasharray="4 8" />
                    <path d="M0,900 C300,700 500,900 1000,500" fill="none" stroke="#5F23C8" strokeWidth="0.5" strokeDasharray="4 8" />
                </svg>
            </div>

            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">

            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-12 lg:gap-8 w-full relative z-10">
                
                {/* Left Column */}
                <div className="w-full lg:w-[45%] flex flex-col justify-center">
                    
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 relative w-max"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                        }}
                    >
                        <Diamond className="w-3.5 h-3.5 text-[#5F23C8]" />
                        <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#5F23C8]">Done for you</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                        className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-6"
                    >
                        <span className="text-[#5F23C8]">The Frosty team</span><br />
                        sets Frosty up for you.
                    </motion.h2>

                    {/* Divider Line */}
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: '48px', opacity: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
                        className="h-[2px] bg-[#5F23C8]/60 mb-8"
                    />

                    {/* Paragraph */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                        className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mb-12 space-y-4"
                    >
                        <p>
                            We customize and train the agent around your business and deploy it on your website and WhatsApp, so there is nothing for you to build or code.
                        </p>
                        <p>
                            You tell us about your services, and we handle the rest during onboarding.
                        </p>
                    </motion.div>

                    {/* Features Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                    >
                        {/* Feature 1 */}
                        <div className="flex flex-row sm:flex-col lg:flex-row items-center sm:items-start lg:items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-[#5F23C8]/10 border border-[#5F23C8]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                                <Clock className="w-5 h-5 text-[#5F23C8]" />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-white leading-tight">Quick onboarding</h4>
                                <p className="text-[12px] text-slate-400 font-medium">20-30 minutes</p>
                            </div>
                        </div>
                        {/* Feature 2 */}
                        <div className="flex flex-row sm:flex-col lg:flex-row items-center sm:items-start lg:items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-[#5F23C8]/10 border border-[#5F23C8]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                                <ShieldCheck className="w-5 h-5 text-[#5F23C8]" />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-white leading-tight">100% handled</h4>
                                <p className="text-[12px] text-slate-400 font-medium">by our team</p>
                            </div>
                        </div>
                        {/* Feature 3 */}
                        <div className="flex flex-row sm:flex-col lg:flex-row items-center sm:items-start lg:items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-[#5F23C8]/10 border border-[#5F23C8]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                                <Sparkles className="w-5 h-5 text-[#5F23C8]" />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-white leading-tight">Go live fast</h4>
                                <p className="text-[12px] text-slate-400 font-medium">with confidence</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Progress Bar - Moved to Left Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                        className="mt-14 pt-8 border-t border-slate-200/60 w-full relative"
                    >
                        <div className="flex items-start w-full relative px-2 sm:px-4">
                            <div className="absolute top-2 left-[16.66%] right-[16.66%] h-[2px] bg-slate-200" />
                            <div 
                                className="absolute top-2 left-[16.66%] h-[2px] bg-[#5F23C8] transition-all duration-500 ease-out" 
                                style={{ width: isCompleted ? '66.66%' : currentStep === 0 ? '0%' : currentStep === 1 ? '33.33%' : '66.66%' }} 
                            />

                            {/* Stage 1 */}
                            <div onClick={() => { setCurrentStep(0); setIsCompleted(false); }} className="flex-1 flex flex-col items-center relative cursor-pointer group">
                                <div className={`w-4 h-4 rounded-full transition-all duration-300 z-10 mb-3 shadow-sm flex items-center justify-center ${
                                    isCompleted || currentStep > 0 
                                        ? 'bg-[#5F23C8] text-white border-2 border-[#5F23C8]' 
                                        : currentStep === 0 
                                        ? 'bg-[#020617] border-[2.5px] border-[#5F23C8] shadow-[0_0_0_4px_rgba(95, 35, 200,0.2)] scale-110' 
                                        : 'bg-[#020617] border-[2px] border-slate-300 group-hover:border-[#5F23C8]'
                                }`}>
                                    {(isCompleted || currentStep > 0) && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                                </div>
                                <h5 className={`text-[13px] font-bold transition-colors duration-300 mb-1 ${
                                    isCompleted || currentStep >= 0 ? 'text-[#5F23C8]' : 'text-white group-hover:text-[#5F23C8]'
                                }`}>Discover</h5>
                                <div className="text-[11px] text-center max-w-[130px] leading-tight">
                                    {isCompleted || currentStep > 0 ? (
                                        <span className="text-[#5F23C8] font-semibold flex items-center justify-center gap-1">✓ Completed</span>
                                    ) : currentStep === 0 ? (
                                        <span className="text-[#5F23C8] font-semibold">● In Progress</span>
                                    ) : (
                                        <span className="text-slate-400">We learn about your business</span>
                                    )}
                                </div>
                            </div>
                            
                            {/* Stage 2 */}
                            <div onClick={() => { setCurrentStep(1); setIsCompleted(false); }} className="flex-1 flex flex-col items-center relative cursor-pointer group">
                                <div className={`w-4 h-4 rounded-full transition-all duration-300 z-10 mb-3 shadow-sm flex items-center justify-center ${
                                    isCompleted || currentStep > 1 
                                        ? 'bg-[#5F23C8] text-white border-2 border-[#5F23C8]' 
                                        : currentStep === 1 
                                        ? 'bg-[#020617] border-[2.5px] border-[#5F23C8] shadow-[0_0_0_4px_rgba(95, 35, 200,0.2)] scale-110' 
                                        : 'bg-[#020617] border-[2px] border-slate-300 group-hover:border-[#5F23C8]'
                                }`}>
                                    {(isCompleted || currentStep > 1) && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                                </div>
                                <h5 className={`text-[13px] font-bold transition-colors duration-300 mb-1 ${
                                    isCompleted || currentStep >= 1 ? 'text-[#5F23C8]' : 'text-white group-hover:text-[#5F23C8]'
                                }`}>Configure</h5>
                                <div className="text-[11px] text-center max-w-[130px] leading-tight">
                                    {isCompleted || currentStep > 1 ? (
                                        <span className="text-[#5F23C8] font-semibold flex items-center justify-center gap-1">✓ Completed</span>
                                    ) : currentStep === 1 ? (
                                        <span className="text-[#5F23C8] font-semibold">● In Progress</span>
                                    ) : (
                                        <span className="text-slate-400">We build & train your AI agent</span>
                                    )}
                                </div>
                            </div>
                            
                            {/* Stage 3 */}
                            <div onClick={() => { setCurrentStep(2); if (isCompleted) setIsCompleted(false); }} className="flex-1 flex flex-col items-center relative cursor-pointer group">
                                <div className={`w-4 h-4 rounded-full transition-all duration-300 z-10 mb-3 shadow-sm flex items-center justify-center ${
                                    isCompleted 
                                        ? 'bg-[#5F23C8] text-white border-2 border-[#5F23C8]' 
                                        : currentStep === 2 
                                        ? 'bg-[#020617] border-[2.5px] border-[#5F23C8] shadow-[0_0_0_4px_rgba(95, 35, 200,0.2)] scale-110' 
                                        : 'bg-[#020617] border-[2px] border-slate-300 group-hover:border-[#5F23C8]'
                                }`}>
                                    {isCompleted && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                                </div>
                                <h5 className={`text-[13px] font-bold transition-colors duration-300 mb-1 ${
                                    isCompleted || currentStep === 2 ? 'text-[#5F23C8]' : 'text-white group-hover:text-[#5F23C8]'
                                }`}>Deploy</h5>
                                <div className="text-[11px] text-center max-w-[130px] leading-tight">
                                    {isCompleted ? (
                                        <span className="text-[#5F23C8] font-semibold flex items-center justify-center gap-1">✓ Completed</span>
                                    ) : currentStep === 2 ? (
                                        <span className="text-[#5F23C8] font-semibold">● In Progress</span>
                                    ) : (
                                        <span className="text-slate-400">We go live and optimize</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
                
                {/* Right Column */}
                <div className="w-full lg:w-[55%] relative flex flex-col pt-8 lg:pt-14">
                    
                    <div className="relative flex flex-col md:flex-row gap-8 lg:gap-12 w-full h-full">
                        
                        {/* The Main Card - 100% Uniform Height, Zero Jump */}
                        <div className="relative md:w-[60%] shrink-0 flex flex-col">
                            {/* Subtle background glow */}
                            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-[#5F23C8]/15 via-blue-500/10 to-indigo-500/10 blur-xl opacity-70 pointer-events-none" />
                            
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                                className="bg-[#020617] rounded-[28px] p-5 sm:p-6 lg:p-8 shadow-[0_15px_50px_-12px_rgba(0,0,0,0.06)] border border-white/10 relative z-20 flex flex-col justify-between hover:shadow-[0_25px_60px_-12px_rgba(95, 35, 200,0.15)] transition-all duration-500 min-h-[350px] lg:h-[470px] w-full"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`${currentStep}-${isCompleted}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="flex flex-col flex-grow"
                                    >
                                        {/* Compact Studio Header (Integrates Completed State without changing height!) */}
                                        <div className="flex items-center justify-between mb-4 shrink-0">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-[13px] shadow-sm transition-all duration-300 ${
                                                    isCompleted ? 'bg-[#5F23C8] text-white' : 'bg-[#1e293b] text-white border border-[#5F23C8]/30'
                                                }`}>
                                                    {isCompleted ? <Check className="w-4 h-4" strokeWidth={3} /> : activeStep.stepNumber}
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block leading-none mb-1">{activeStep.stepLabel}</span>
                                                    <span className="text-[11px] font-bold text-[#5F23C8] flex items-center gap-1.5 leading-none">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#5F23C8] animate-ping" />
                                                        {isCompleted ? "All 3 Steps Verified Complete ✓" : "Active Sandbox"}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {/* When Completed, show Restart right here in the header so card height never increases! */}
                                            {isCompleted ? (
                                                <button 
                                                    onClick={() => { setIsCompleted(false); setCurrentStep(0); }} 
                                                    className="flex items-center gap-1.5 bg-[#5F23C8]/20 hover:bg-[#5F23C8]/30 text-[#5F23C8] px-3 py-1.5 rounded-xl border border-[#5F23C8]/40 text-[11px] font-bold transition-all duration-300 cursor-pointer shadow-2xs shrink-0"
                                                >
                                                    <span>Restart</span>
                                                    <span className="text-[12px] leading-none">↻</span>
                                                </button>
                                            ) : (
                                                <div className="hidden sm:flex items-center gap-1.5 bg-[#1e293b]/60 px-2.5 py-1 rounded-lg border border-[#5F23C8]/30 text-[10px] font-mono font-semibold text-[#5F23C8] shrink-0">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#5F23C8]" />
                                                    FROSTY_AI // V2.4
                                                </div>
                                            )}
                                        </div>
                                        
                                        <h3 className="text-xl lg:text-2xl font-medium text-white mb-2 leading-tight shrink-0 line-clamp-2" style={{ fontFamily: 'var(--font-serif, "Playfair Display", serif)' }}>
                                            {activeStep.title}
                                        </h3>
                                        
                                        <p className="text-[13px] text-slate-400 mb-4 leading-relaxed line-clamp-2 shrink-0 min-h-[38px]">
                                            {activeStep.description}
                                        </p>
                                        
                                        {/* Compact 2-Column Checklist Grid - Always 4 items (2 rows) */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4 shrink-0">
                                            {activeStep.items.map((item, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className={`flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border transition-all duration-300 ${
                                                        isCompleted 
                                                            ? 'bg-[#5F23C8]/15 border-[#5F23C8]/40' 
                                                            : 'bg-[#1e293b]/40 border-[#5F23C8]/20 hover:bg-[#1e293b]/60 hover:border-[#5F23C8] shadow-2xs'
                                                    }`}
                                                >
                                                    <div className={`w-4.5 h-4.5 rounded-md flex items-center justify-center shrink-0 transition-colors duration-300 ${
                                                        isCompleted ? 'bg-[#5F23C8] text-white' : 'bg-[#5F23C8]/20 text-[#5F23C8]'
                                                    }`}>
                                                        <Check className="w-3 h-3" strokeWidth={2.5} />
                                                    </div>
                                                    <span className={`text-[12px] font-medium leading-tight truncate ${
                                                        isCompleted ? 'text-white font-semibold' : 'text-slate-300'
                                                    }`}>{item}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Sleek Dark Terminal Activity Bar - Exactly 46px height */}
                                        {renderCompactPreview(currentStep)}
                                    </motion.div>
                                </AnimatePresence>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto shrink-0">
                                    <div className="flex items-center gap-1.5 sm:gap-2 bg-[#1e293b]/50 px-2 sm:px-3 py-1.5 rounded-xl border border-[#5F23C8]/30 shadow-2xs shrink-0">
                                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5F23C8]" />
                                        <div className="flex flex-col">
                                            <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-[#5F23C8] uppercase leading-none mb-0.5">Time</span>
                                            <span className={`text-[10px] sm:text-[11px] font-bold leading-none ${isCompleted ? 'text-[#5F23C8]' : 'text-[#5F23C8]'}`}>
                                                {isCompleted ? "COMPLETED" : activeStep.time}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Back and Next Button Group */}
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => {
                                                if (isCompleted) {
                                                    setIsCompleted(false);
                                                }
                                                setCurrentStep(prev => Math.max(0, prev - 1));
                                            }}
                                            disabled={currentStep === 0 && !isCompleted}
                                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                currentStep === 0 && !isCompleted
                                                    ? 'bg-white/5 text-slate-500 cursor-not-allowed' 
                                                    : 'bg-white/10 text-white hover:bg-[#1e293b] active:scale-95 cursor-pointer shadow-sm'
                                            }`}
                                            title="Previous step"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                        </button>

                                        {!isCompleted ? (
                                            <button 
                                                onClick={() => {
                                                    if (currentStep < STEPS_DATA.length - 1) {
                                                        setCurrentStep(prev => prev + 1);
                                                    } else {
                                                        setIsCompleted(true);
                                                    }
                                                }}
                                                className="px-3 sm:px-5 h-9 rounded-full flex items-center gap-1.5 sm:gap-2 font-semibold text-[11px] sm:text-[12.5px] bg-[#5F23C8] text-white hover:bg-[#2563EB] active:scale-95 cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 shrink-0 whitespace-nowrap"
                                                title={currentStep === STEPS_DATA.length - 1 ? "Complete Setup" : "Next step"}
                                            >
                                                <span>{currentStep === STEPS_DATA.length - 1 ? "Finish" : "Next Step"}</span>
                                                {currentStep === STEPS_DATA.length - 1 ? <Check className="w-3.5 h-3.5 shrink-0" /> : <ArrowRight className="w-3.5 h-3.5 shrink-0" />}
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => {
                                                    setIsCompleted(false);
                                                    setCurrentStep(0);
                                                }}
                                                className="px-4 h-9 rounded-full flex items-center gap-1.5 font-semibold text-[12.5px] bg-[#5F23C8] text-white hover:bg-[#2563EB] active:scale-95 cursor-pointer shadow-md transition-all duration-300"
                                            >
                                                <Check className="w-3.5 h-3.5" />
                                                <span>Restart</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Side Steps List - Shows the non-selected steps with Completion status */}
                        <div className="md:w-[40%] hidden md:flex flex-col justify-center gap-6 relative z-10 pl-8 md:pl-0 border-l-2 md:border-l-0 border-slate-200/40 ml-4 md:ml-0">
                            
                            {/* Connecting dashed lines */}
                            <div className="hidden md:block absolute top-[25%] -left-12 w-12 border-t border-dashed border-slate-300 z-0" />
                            <div className="hidden md:block absolute top-[75%] -left-12 w-12 border-t border-dashed border-slate-300 z-0" />
                            <div className="hidden md:block absolute top-[25%] left-0 w-px h-[50%] border-l border-dashed border-slate-300 z-0" />

                            <AnimatePresence mode="popLayout">
                                {STEPS_DATA.filter((_, idx) => idx !== currentStep).map((step) => {
                                    const originalIndex = STEPS_DATA.findIndex(s => s.stepNumber === step.stepNumber);
                                    const isStepDone = isCompleted || originalIndex < currentStep;

                                    return (
                                        <motion.div
                                            key={step.stepNumber}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            onClick={() => { setCurrentStep(originalIndex); if (isCompleted) setIsCompleted(false); }}
                                            className="relative cursor-pointer group p-3.5 -ml-3 rounded-2xl hover:bg-[#1e293b]/50 hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#5F23C8]/40"
                                        >
                                            <div className={`absolute -left-[17px] md:-left-4 top-3.5 w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] transition-all duration-300 shadow-sm z-10 ${
                                                isStepDone 
                                                    ? 'bg-[#5F23C8] text-white border border-[#5F23C8]' 
                                                    : 'bg-[#1e293b]/50 text-slate-300 border border-[#5F23C8]/30 group-hover:bg-[#5F23C8] group-hover:text-white group-hover:border-[#5F23C8]'
                                            }`}>
                                                {isStepDone ? <Check className="w-4 h-4 text-white" strokeWidth={2.5} /> : step.stepNumber}
                                            </div>
                                            <div className="pl-4 md:pl-10">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <h4 className={`text-[15px] font-bold leading-snug transition-colors duration-300 ${
                                                        isStepDone ? 'text-slate-200' : 'text-white group-hover:text-[#5F23C8]'
                                                    }`}>
                                                        {step.summaryTitle.replace('\n', ' ')}
                                                    </h4>
                                                    {isStepDone ? (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#5F23C8]/20 text-[#5F23C8] border border-[#5F23C8]/30 uppercase tracking-wider">
                                                            ✓ Done
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-300 uppercase tracking-wider">
                                                            Next
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[12.5px] text-slate-400 leading-relaxed">
                                                    {step.summaryDesc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                        </div>
                    </div>

                </div>

            </div>
            </div>
        </section>
    );
}
