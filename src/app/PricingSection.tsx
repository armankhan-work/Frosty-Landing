'use client';

import React from 'react';
import { motion } from 'framer-motion';

function Icon({ n, className }: { n: string, className?: string }) {
    const p: Record<string, React.ReactNode> = {
        check: <path d="M20 6L9 17l-5-5" />,
        x: <><circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" /><path d="M15 9l-6 6M9 9l6 6" /></>
    };
    return (
        <svg 
            className={className || "w-5 h-5"} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            aria-hidden="true"
        >
            {p[n] || p['check']}
        </svg>
    );
}

export default function PricingSection() {
    const plans = [
        {
            tag: "BASIC",
            name: "Free",
            price: "₹0",
            period: "/month",
            features: [
                { text: "Up to 50 Leads", included: true },
                { text: "Email Support", included: true },
                { text: "No API Access", included: false }
            ],
            cta: "Get Started",
            highlighted: false
        },
        {
            tag: "SCALING",
            name: "Growth",
            price: "₹4,999",
            period: "/month",
            badge: "MOST POPULAR",
            features: [
                { text: "Unified Inbox", included: true },
                { text: "WhatsApp API", included: true },
                { text: "Advanced AI", included: true },
                { text: "Priority Support", included: true }
            ],
            cta: "Choose Growth",
            highlighted: true
        },
        {
            tag: "EXPANSION",
            name: "Dominance",
            price: "₹12,499",
            period: "/month",
            features: [
                { text: "Everything in Growth", included: true },
                { text: "Custom Branding", included: true },
                { text: "Multi-agent Support", included: true }
            ],
            cta: "Select Plan",
            highlighted: false
        },
        {
            tag: "CUSTOM",
            name: "Enterprise",
            price: "Custom",
            period: "",
            features: [
                { text: "Dedicated Manager", included: true },
                { text: "99.9% SLA", included: true },
                { text: "Custom Integrations", included: true }
            ],
            cta: "Contact Sales",
            highlighted: false
        }
    ];

    return (
        <section className="relative w-full overflow-hidden pt-24 pb-32 bg-transparent" id="pricing">
            {/* Background Glows matching Hero Section */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#5F23C8]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#5F23C8]/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-4"
                    >
                        Scale your reach globally
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg"
                    >
                        Select a plan that aligns with your merchant volume. Upgrade or downgrade anytime as your business evolves.
                    </motion.p>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -12 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`relative flex flex-col rounded-[24px] p-8 h-full ${
                                plan.highlighted 
                                    ? 'bg-gradient-to-b from-[#5F23C8]/10 to-transparent border-2 border-[#5F23C8]/50 shadow-[0_0_40px_rgba(95,35,200,0.15)]' 
                                    : 'bg-white/[0.02] border border-white/10 backdrop-blur-sm'
                            }`}
                        >
                            {/* Most Popular Badge */}
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#5F23C8] to-[#A78BFA] text-white text-[9px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(95,35,200,0.5)]">
                                    {plan.badge}
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="mb-8">
                                <div className={`text-[10px] md:text-[11px] font-bold tracking-widest uppercase mb-3 ${plan.highlighted ? 'text-[#A78BFA]' : 'text-slate-500'}`}>
                                    {plan.tag}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 font-serif">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-white tracking-tight">{plan.price}</span>
                                    {plan.period && <span className="text-sm text-slate-400 font-medium">{plan.period}</span>}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className={`w-full h-px mb-8 ${plan.highlighted ? 'bg-gradient-to-r from-[#5F23C8]/50 to-transparent' : 'bg-white/10'}`} />

                            {/* Features */}
                            <ul className="flex flex-col gap-4 mb-10 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-full ${feature.included ? (plan.highlighted ? 'bg-[#5F23C8]/30 text-[#A78BFA]' : 'bg-white/5 text-slate-300') : 'text-slate-600'}`}>
                                            <Icon n={feature.included ? 'check' : 'x'} className="w-3.5 h-3.5" />
                                        </div>
                                        <span className={`text-[14px] ${feature.included ? 'text-slate-300' : 'text-slate-500'}`}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button className={`w-full py-4 rounded-xl font-bold text-[14px] transition-all duration-300 mt-auto ${
                                plan.highlighted 
                                    ? 'bg-[#5F23C8] text-white hover:bg-[#7029ed] shadow-[0_0_20px_rgba(95,35,200,0.4)] hover:shadow-[0_0_30px_rgba(95,35,200,0.6)]' 
                                    : 'bg-white/[0.05] border border-white/10 text-white hover:bg-white/10'
                            }`}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
