'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
    Calendar, 
    Database, 
    ShieldCheck, 
    FileText, 
    Lock, 
    Zap, 
    Globe, 
    Users, 
    Sparkles, 
    Info, 
    Check, 
    ArrowRight,
    Headphones,
    MessageCircle,
    Building2
} from 'lucide-react';

type Region = 'IN' | 'INTL';

function IndiaFlagIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <span className={`inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden border border-black/10 shadow-2xs ${className}`}>
            <svg viewBox="0 0 24 24" className="w-full h-full block">
                <rect width="24" height="8" fill="#FF9933" />
                <rect y="8" width="24" height="8" fill="#FFFFFF" />
                <rect y="16" width="24" height="8" fill="#138808" />
                <circle cx="12" cy="12" r="2.5" fill="#000080" />
                <circle cx="12" cy="12" r="1.8" fill="#FFFFFF" />
                <circle cx="12" cy="12" r="0.8" fill="#000080" />
            </svg>
        </span>
    );
}

interface PlanDetails {
    tag: string;
    name: string;
    originalPrice?: string;
    price: string;
    discountBadge?: string;
    period: string;
    conversations: string;
    seats: string;
    overage: string;
    support?: string;
    cta: string;
    ctaLink: string;
    secondaryCta?: string;
    secondaryCtaLink?: string;
    highlighted?: boolean;
    isEnterprise?: boolean;
}

export default function PricingSection() {
    const [region, setRegion] = useState<Region>('IN');

    // Auto-detect visitor region on client mount
    useEffect(() => {
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
            const isIndianTimezone = tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('India');
            
            if (isIndianTimezone) {
                setRegion('IN');
            } else {
                fetch('https://ipapi.co/json/')
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.country_code === 'IN') {
                            setRegion('IN');
                        } else if (data && data.country_code) {
                            setRegion('INTL');
                        }
                    })
                    .catch(() => {
                        setRegion(isIndianTimezone ? 'IN' : 'INTL');
                    });
            }
        } catch {
            setRegion('IN');
        }
    }, []);

    const indiaPlans: PlanDetails[] = [
        {
            tag: 'STARTER',
            name: 'Starter',
            originalPrice: '₹6,249',
            price: '₹4,999',
            discountBadge: '20% OFF',
            period: '/mo',
            conversations: '300 conversations',
            seats: '2 team seats',
            overage: '₹25 / extra conversation',
            cta: 'Choose Starter',
            ctaLink: '/login?mode=register',
            secondaryCta: 'Start 3-Day Free Trial',
            secondaryCtaLink: '/login?mode=register',
            highlighted: false
        },
        {
            tag: 'GROWTH',
            name: 'Growth',
            originalPrice: '₹11,249',
            price: '₹8,999',
            discountBadge: '20% OFF',
            period: '/mo',
            conversations: '600 conversations',
            seats: '3 team seats',
            overage: '₹22 / extra conversation',
            cta: 'Choose Growth',
            ctaLink: '/login?mode=register',
            secondaryCta: 'Start 3-Day Free Trial',
            secondaryCtaLink: '/login?mode=register',
            highlighted: true
        },
        {
            tag: 'SCALE',
            name: 'Scale',
            originalPrice: '₹24,999',
            price: '₹19,999',
            discountBadge: '20% OFF',
            period: '/mo',
            conversations: '1,600 conversations',
            seats: '4 team seats',
            overage: '₹18 / extra conversation',
            cta: 'Choose Scale',
            ctaLink: '/login?mode=register',
            secondaryCta: 'Start 3-Day Free Trial',
            secondaryCtaLink: '/login?mode=register',
            highlighted: false
        },
        {
            tag: 'ENTERPRISE',
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            conversations: 'Custom volume',
            seats: 'Custom team seats',
            overage: 'Tiered volume overage',
            cta: 'Talk to us',
            ctaLink: '/contact',
            secondaryCta: 'Book Architecture Call',
            secondaryCtaLink: '/contact',
            highlighted: false,
            isEnterprise: true
        }
    ];

    const internationalPlans: PlanDetails[] = [
        {
            tag: 'STARTER',
            name: 'Starter',
            originalPrice: '$249',
            price: '$199',
            discountBadge: '20% OFF',
            period: '/mo',
            conversations: '300 conversations',
            seats: '2 team seats',
            overage: '$0.95 / extra conversation',
            support: 'Email support',
            cta: 'Choose Starter',
            ctaLink: '/login?mode=register',
            secondaryCta: 'Start 3-Day Free Trial',
            secondaryCtaLink: '/login?mode=register',
            highlighted: false
        },
        {
            tag: 'GROWTH',
            name: 'Growth',
            originalPrice: '$439',
            price: '$349',
            discountBadge: '20% OFF',
            period: '/mo',
            conversations: '600 conversations',
            seats: '3 team seats',
            overage: '$0.85 / extra conversation',
            support: 'Priority support',
            cta: 'Choose Growth',
            ctaLink: '/login?mode=register',
            secondaryCta: 'Start 3-Day Free Trial',
            secondaryCtaLink: '/login?mode=register',
            highlighted: true
        },
        {
            tag: 'SCALE',
            name: 'Scale',
            originalPrice: '$879',
            price: '$699',
            discountBadge: '20% OFF',
            period: '/mo',
            conversations: '1,600 conversations',
            seats: '4 team seats',
            overage: '$0.65 / extra conversation',
            support: 'Dedicated onboarding + review',
            cta: 'Choose Scale',
            ctaLink: '/login?mode=register',
            secondaryCta: 'Start 3-Day Free Trial',
            secondaryCtaLink: '/login?mode=register',
            highlighted: false
        },
        {
            tag: 'ENTERPRISE',
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            conversations: 'Custom volume',
            seats: 'Custom team seats',
            overage: 'Tiered volume overage',
            support: 'SLA agreed per contract',
            cta: 'Talk to us',
            ctaLink: '/contact',
            secondaryCta: 'Book Architecture Call',
            secondaryCtaLink: '/contact',
            highlighted: false,
            isEnterprise: true
        }
    ];

    const currentPlans = region === 'IN' ? indiaPlans : internationalPlans;

    const universalFeatures = [
        {
            icon: <Globe className="w-5 h-5 text-[#5F23C8]" />,
            title: 'Multi-Channel Deployment',
            desc: 'Deploy on Web, WhatsApp Business, and custom portals seamlessly.'
        },
        {
            icon: <Calendar className="w-5 h-5 text-[#5F23C8]" />,
            title: 'Calendars & Scheduling',
            desc: 'Real-time 2-way sync with Google Calendar, Outlook, and Cal.com.'
        },
        {
            icon: <Database className="w-5 h-5 text-[#5F23C8]" />,
            title: 'CRM & Lead Intelligence',
            desc: 'Instant lead handoff into HubSpot, Salesforce, Zoho, & webhook endpoints.'
        },
        {
            icon: <ShieldCheck className="w-5 h-5 text-[#5F23C8]" />,
            title: 'Team RBAC & Permissions',
            desc: 'Granular role management, secure invites, and workspace governance.'
        },
        {
            icon: <FileText className="w-5 h-5 text-[#5F23C8]" />,
            title: 'Audit Logs & Live Transcripts',
            desc: 'Full message histories, user sentiment tracking, and compliance logs.'
        },
        {
            icon: <Lock className="w-5 h-5 text-[#5F23C8]" />,
            title: 'Enterprise AI Guardrails',
            desc: 'Strict factual grounding, zero hallucinations, and brand safety rules.'
        },
        {
            icon: <Zap className="w-5 h-5 text-[#5F23C8]" />,
            title: 'REST APIs & Webhooks',
            desc: 'Full programmatic access to query leads, trigger actions, and automate.'
        },
        {
            icon: <Building2 className="w-5 h-5 text-[#5F23C8]" />,
            title: 'SSO & Bank-Grade Security',
            desc: 'SAML/Google SSO, TLS 1.3 encryption, and isolated client data privacy.'
        }
    ];

    return (
        <section className="relative w-full overflow-hidden pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12 bg-transparent" id="pricing">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#5F23C8]/4 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
                    {/* Early Bird Offer Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50/90 border border-purple-200/80 mb-3 shadow-xs"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[#5F23C8]" />
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#5F23C8]">
                            Early Bird Offer · 20% Off Launch Pricing
                        </span>
                    </motion.div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-[#0F172A] leading-[1.15] tracking-tight mb-2.5"
                    >
                        Simple, volume-based pricing.
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-slate-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto"
                    >
                        Choose the right tier for your inbound pipeline. Every plan includes full platform access.
                    </motion.p>

                    {/* Currency / Region Toggle */}
                    <div className="mt-5 flex justify-center">
                        <div className="inline-flex p-1 rounded-full bg-stone-100/90 border border-stone-200/80 shadow-inner">
                            <button
                                type="button"
                                onClick={() => setRegion('IN')}
                                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                                    region === 'IN' 
                                        ? 'bg-white text-slate-900 shadow-xs border border-stone-200/60' 
                                        : 'text-slate-500 hover:text-slate-800'
                                }`}
                            >
                                <IndiaFlagIcon className="w-4 h-4 shadow-2xs" />
                                <span>India (INR)</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRegion('INTL')}
                                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                                    region === 'INTL' 
                                        ? 'bg-white text-slate-900 shadow-xs border border-stone-200/60' 
                                        : 'text-slate-500 hover:text-slate-800'
                                }`}
                            >
                                <Globe className={`w-3.5 h-3.5 ${region === 'INTL' ? 'text-[#0284C7]' : 'text-slate-400'}`} />
                                <span>International (USD)</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pricing Cards Grid - 4 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-4 xl:gap-5 items-stretch">
                    <AnimatePresence>
                        {currentPlans.map((plan, index) => (
                            <motion.div
                                key={`${region}-${plan.name}`}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                whileHover={{ y: -5, transition: { duration: 0.18, ease: "easeOut" } }}
                                className={`relative flex flex-col rounded-[22px] p-5 lg:p-5 xl:p-6 h-full transition-all duration-200 ${
                                    plan.highlighted 
                                        ? 'bg-white border-2 border-[#5F23C8] shadow-[0_8px_30px_rgba(95,35,200,0.1)] ring-1 ring-[#5F23C8]/15' 
                                        : plan.isEnterprise
                                            ? 'bg-white border border-slate-300/80 shadow-xs hover:border-slate-400'
                                            : 'bg-white border border-slate-200/90 shadow-xs hover:border-slate-300'
                                }`}
                            >
                                {/* Card Header: Plan Name (Left) & Offer Badge (Right) */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-tight">
                                        {plan.name}
                                    </h3>
                                    {plan.discountBadge && (
                                        <span className="text-[10px] font-bold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full uppercase shrink-0">
                                            {plan.discountBadge}
                                        </span>
                                    )}
                                </div>

                                {/* Divider */}
                                <div className={`w-full h-px mb-4 ${plan.highlighted ? 'bg-[#5F23C8]/20' : 'bg-slate-100'}`} />

                                {/* Price Hierarchy Area */}
                                <div className="flex flex-col min-h-[58px] justify-center mb-4">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl sm:text-[34px] xl:text-4xl font-extrabold text-slate-900 tracking-tight font-serif leading-none">
                                            {plan.price}
                                        </span>
                                        {plan.period && (
                                            <span className="text-xs sm:text-sm text-slate-500 font-medium ml-0.5">
                                                {plan.period}
                                            </span>
                                        )}
                                    </div>
                                    {plan.originalPrice ? (
                                        <div className="text-xs text-slate-400 line-through decoration-slate-300 font-medium mt-1">
                                            {plan.originalPrice}
                                        </div>
                                    ) : (
                                        <div className="text-xs text-transparent select-none mt-1">Custom</div>
                                    )}
                                </div>

                                {/* Core Metrics: Volume & Seats */}
                                <div className="flex flex-col gap-2.5 mb-4 flex-1">
                                    {/* Volume Box */}
                                    <div className={`p-3 rounded-xl border flex flex-col gap-0.5 transition-colors duration-200 ${
                                        plan.highlighted 
                                            ? 'bg-purple-50/60 border-purple-200/70' 
                                            : 'bg-slate-50/80 border-slate-200/70'
                                    }`}>
                                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                            <span>Volume</span>
                                            <MessageCircle className="w-3 h-3 text-[#5F23C8]" />
                                        </div>
                                        <div className="text-[13.5px] sm:text-[14px] font-bold text-slate-900 leading-tight">
                                            {plan.conversations}
                                        </div>
                                        <div className="text-[10.5px] text-slate-500 font-medium">
                                            Overage: {plan.overage}
                                        </div>
                                    </div>

                                    {/* Team Seats Box */}
                                    <div className="p-2.5 px-3 rounded-xl border border-slate-200/70 bg-white flex items-center justify-between shadow-2xs">
                                        <div className="flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5 text-slate-500" />
                                            <span className="text-xs font-semibold text-slate-700">Team Seats</span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                                            {plan.seats}
                                        </span>
                                    </div>

                                    {/* Support Tier (Rendered for International plans or Enterprise) */}
                                    {plan.support && (
                                        <div className="p-2.5 px-3 rounded-xl border border-slate-200/70 bg-white flex items-center justify-between shadow-2xs">
                                            <div className="flex items-center gap-1.5">
                                                <Headphones className="w-3.5 h-3.5 text-slate-500" />
                                                <span className="text-xs font-semibold text-slate-700">Support</span>
                                            </div>
                                            <span className="text-[11px] font-medium text-slate-800 text-right leading-tight truncate max-w-[130px]">
                                                {plan.support}
                                            </span>
                                        </div>
                                    )}

                                    {/* Universal Included Note */}
                                    <div className="my-2 flex items-center gap-1.5 text-[11.5px] text-slate-600">
                                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                                        <span>All platform capabilities included</span>
                                    </div>
                                </div>

                                {/* CTA Buttons Area - Pinned to bottom with identical baseline */}
                                <div className="mt-auto pt-2 flex flex-col gap-2">
                                    <Link
                                        href={plan.ctaLink}
                                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-[13px] transition-all duration-200 flex items-center justify-center gap-1.5 text-center group ${
                                            plan.highlighted 
                                                ? 'bg-[#5F23C8] !text-white hover:bg-[#4C1D95] shadow-sm hover:shadow-md active:scale-[0.98]' 
                                                : plan.isEnterprise
                                                    ? 'bg-slate-900 !text-white hover:bg-slate-800 shadow-sm active:scale-[0.98]'
                                                    : 'bg-stone-50 border border-slate-200 text-slate-800 hover:bg-white hover:border-[#5F23C8]/40 hover:text-[#5F23C8] active:scale-[0.98]'
                                        }`}
                                    >
                                        <span>{plan.cta}</span>
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                                    </Link>

                                    {plan.secondaryCta && plan.secondaryCtaLink ? (
                                        <Link
                                            href={plan.secondaryCtaLink}
                                            className={`w-full py-2 px-3 rounded-xl font-semibold text-xs sm:text-[12px] transition-all duration-200 flex items-center justify-center gap-1.5 text-center shadow-2xs active:scale-[0.98] ${
                                                plan.isEnterprise
                                                    ? 'bg-slate-50 border border-slate-200/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                                    : plan.highlighted
                                                        ? 'bg-purple-50/80 border border-purple-200/90 text-[#5F23C8] hover:bg-purple-100 hover:border-purple-300 font-bold'
                                                        : 'bg-stone-50/80 border border-stone-200/80 text-slate-700 hover:bg-purple-50/50 hover:text-[#5F23C8] hover:border-purple-200'
                                            }`}
                                        >
                                            {!plan.isEnterprise && <Sparkles className="w-3 h-3 text-[#5F23C8] shrink-0" />}
                                            <span>{plan.secondaryCta}</span>
                                        </Link>
                                    ) : (
                                        <div className="h-[32px] select-none" />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pricing Disclaimer & 3-Day Trial Guarantee */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs text-slate-500 mt-6 mb-10 sm:mb-12 text-center">
                    <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#5F23C8] shrink-0" />
                        <span className="font-medium text-slate-700">3-day full access trial on all self-serve plans</span>
                    </div>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <div className="flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>India pricing is available to businesses registered and operating in India.</span>
                    </div>
                </div>

                {/* ── Separate "Everything you need, included in every plan" Section ── */}
                <div className="pt-8 sm:pt-10 border-t border-slate-200/80">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/60 mb-2.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#5F23C8]" />
                            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#5F23C8] uppercase">Full Product Included</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif font-medium text-slate-900 tracking-tight mb-2.5">
                            Everything you need, included in every plan
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600">
                            We never lock or gate core capabilities behind enterprise paywalls. Every Frosty subscription unlocks the entire AI conversion engine from day one.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                        {universalFeatures.map((feat, idx) => (
                            <motion.div
                                key={feat.title}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.04, duration: 0.3 }}
                                className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-xs hover:border-[#5F23C8]/30 transition-all duration-200 flex flex-col"
                            >
                                <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center mb-2.5 shrink-0">
                                    {feat.icon}
                                </div>
                                <h4 className="text-[13.5px] font-bold text-slate-900 mb-1 font-serif">
                                    {feat.title}
                                </h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    {feat.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
