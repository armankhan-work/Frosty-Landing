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
    BadgePercent,
    Mic,
    History,
    FileCheck2,
    Languages
} from 'lucide-react';

type Region = 'IN' | 'INTL';
type BillingTerm = 'annual' | 'biannual' | 'quarterly' | 'monthly';

interface TierPricing {
    price: string;
    period: string;
    billingNote: string;
    savings?: string;
}

interface PlanDetails {
    tag: string;
    name: string;
    conversations: string;
    seats: string;
    overage: string;
    support?: string;
    cta: string;
    ctaLink: string;
    highlighted?: boolean;
    isEnterprise?: boolean;
    pricing: Record<BillingTerm, TierPricing>;
}

export default function PricingSection() {
    const [region, setRegion] = useState<Region>('IN');
    const [term, setTerm] = useState<BillingTerm>('annual');

    // Auto-detect visitor region on client mount (Geolock + URL override for testing)
    useEffect(() => {
        try {
            // 1. Check URL param override (e.g., ?region=intl or ?currency=usd)
            if (typeof window !== 'undefined') {
                const params = new URLSearchParams(window.location.search);
                const queryRegion = params.get('region')?.toLowerCase();
                const queryCurrency = params.get('currency')?.toLowerCase();
                
                if (queryRegion === 'intl' || queryRegion === 'us' || queryRegion === 'global' || queryCurrency === 'usd') {
                    setRegion('INTL');
                    return;
                }
                if (queryRegion === 'in' || queryRegion === 'india' || queryCurrency === 'inr') {
                    setRegion('IN');
                    return;
                }
            }

            // 2. Fetch IP location first so VPNs (US/UK/Global) immediately switch to International
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
            const isIndianTimezone = tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('India');

            // Set initial state from timezone, then confirm via IP
            if (!isIndianTimezone) {
                setRegion('INTL');
            }

            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(data => {
                    if (data && data.country_code) {
                        if (data.country_code === 'IN') {
                            setRegion('IN');
                        } else {
                            setRegion('INTL');
                        }
                    }
                })
                .catch(() => {
                    // Fallback to timezone detection
                    setRegion(isIndianTimezone ? 'IN' : 'INTL');
                });
        } catch {
            setRegion('IN');
        }
    }, []);

    const indiaPlans: PlanDetails[] = [
        {
            tag: 'STARTER',
            name: 'Starter',
            conversations: '300 conversations',
            seats: '2 team seats',
            overage: '₹25 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '₹3,999',
                    period: '/mo',
                    billingNote: 'Billed annually (₹47,988)',
                    savings: 'Save ₹11,998'
                },
                biannual: {
                    price: '₹4,249',
                    period: '/mo',
                    billingNote: 'Billed 6 months (₹25,495)',
                    savings: 'Save ₹4,499'
                },
                quarterly: {
                    price: '₹4,599',
                    period: '/mo',
                    billingNote: 'Billed quarterly (₹13,797)',
                    savings: 'Save ₹1,200'
                },
                monthly: {
                    price: '₹4,999',
                    period: '/mo',
                    billingNote: 'Billed monthly'
                }
            }
        },
        {
            tag: 'GROWTH',
            name: 'Growth',
            conversations: '600 conversations',
            seats: '3 team seats',
            overage: '₹22 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: true,
            pricing: {
                annual: {
                    price: '₹7,199',
                    period: '/mo',
                    billingNote: 'Billed annually (₹86,388)',
                    savings: 'Save ₹21,598'
                },
                biannual: {
                    price: '₹7,649',
                    period: '/mo',
                    billingNote: 'Billed 6 months (₹45,895)',
                    savings: 'Save ₹8,099'
                },
                quarterly: {
                    price: '₹8,279',
                    period: '/mo',
                    billingNote: 'Billed quarterly (₹24,837)',
                    savings: 'Save ₹2,160'
                },
                monthly: {
                    price: '₹8,999',
                    period: '/mo',
                    billingNote: 'Billed monthly'
                }
            }
        },
        {
            tag: 'SCALE',
            name: 'Scale',
            conversations: '1,600 conversations',
            seats: '4 team seats',
            overage: '₹18 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '₹15,999',
                    period: '/mo',
                    billingNote: 'Billed annually (₹191,988)',
                    savings: 'Save ₹47,998'
                },
                biannual: {
                    price: '₹16,999',
                    period: '/mo',
                    billingNote: 'Billed 6 months (₹101,995)',
                    savings: 'Save ₹17,999'
                },
                quarterly: {
                    price: '₹18,399',
                    period: '/mo',
                    billingNote: 'Billed quarterly (₹55,197)',
                    savings: 'Save ₹4,800'
                },
                monthly: {
                    price: '₹19,999',
                    period: '/mo',
                    billingNote: 'Billed monthly'
                }
            }
        },
        {
            tag: 'ENTERPRISE',
            name: 'Enterprise',
            conversations: 'Custom volume',
            seats: 'Custom team seats',
            overage: 'Custom volume overage',
            cta: 'Talk to us',
            ctaLink: 'https://www.frostrek.ai/contact',
            highlighted: false,
            isEnterprise: true,
            pricing: {
                annual: { price: 'Custom', period: '', billingNote: 'Custom invoicing' },
                biannual: { price: 'Custom', period: '', billingNote: 'Custom invoicing' },
                quarterly: { price: 'Custom', period: '', billingNote: 'Custom invoicing' },
                monthly: { price: 'Custom', period: '', billingNote: 'Custom invoicing' }
            }
        }
    ];

    const internationalPlans: PlanDetails[] = [
        {
            tag: 'STARTER',
            name: 'Starter',
            conversations: '300 conversations',
            seats: '2 team seats',
            overage: '$0.95 / extra conversation',
            support: 'Email support',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '$159',
                    period: '/mo',
                    billingNote: 'Billed annually ($1,910)',
                    savings: 'Save $478'
                },
                biannual: {
                    price: '$169',
                    period: '/mo',
                    billingNote: 'Billed 6 months ($1,015)',
                    savings: 'Save $179'
                },
                quarterly: {
                    price: '$183',
                    period: '/mo',
                    billingNote: 'Billed quarterly ($549)',
                    savings: 'Save $48'
                },
                monthly: {
                    price: '$199',
                    period: '/mo',
                    billingNote: 'Billed monthly'
                }
            }
        },
        {
            tag: 'GROWTH',
            name: 'Growth',
            conversations: '600 conversations',
            seats: '3 team seats',
            overage: '$0.85 / extra conversation',
            support: 'Priority support',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: true,
            pricing: {
                annual: {
                    price: '$279',
                    period: '/mo',
                    billingNote: 'Billed annually ($3,350)',
                    savings: 'Save $838'
                },
                biannual: {
                    price: '$297',
                    period: '/mo',
                    billingNote: 'Billed 6 months ($1,780)',
                    savings: 'Save $314'
                },
                quarterly: {
                    price: '$321',
                    period: '/mo',
                    billingNote: 'Billed quarterly ($963)',
                    savings: 'Save $84'
                },
                monthly: {
                    price: '$349',
                    period: '/mo',
                    billingNote: 'Billed monthly'
                }
            }
        },
        {
            tag: 'SCALE',
            name: 'Scale',
            conversations: '1,600 conversations',
            seats: '4 team seats',
            overage: '$0.65 / extra conversation',
            support: 'Dedicated onboarding + review',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '$559',
                    period: '/mo',
                    billingNote: 'Billed annually ($6,710)',
                    savings: 'Save $1,678'
                },
                biannual: {
                    price: '$594',
                    period: '/mo',
                    billingNote: 'Billed 6 months ($3,565)',
                    savings: 'Save $629'
                },
                quarterly: {
                    price: '$643',
                    period: '/mo',
                    billingNote: 'Billed quarterly ($1,929)',
                    savings: 'Save $168'
                },
                monthly: {
                    price: '$699',
                    period: '/mo',
                    billingNote: 'Billed monthly'
                }
            }
        },
        {
            tag: 'ENTERPRISE',
            name: 'Enterprise',
            conversations: 'Custom volume',
            seats: 'Custom team seats',
            overage: 'Tiered volume overage',
            support: 'SLA agreed per contract',
            cta: 'Talk to us',
            ctaLink: 'https://www.frostrek.ai/contact',
            highlighted: false,
            isEnterprise: true,
            pricing: {
                annual: { price: 'Custom', period: '', billingNote: 'Custom invoicing' },
                biannual: { price: 'Custom', period: '', billingNote: 'Custom invoicing' },
                quarterly: { price: 'Custom', period: '', billingNote: 'Custom invoicing' },
                monthly: { price: 'Custom', period: '', billingNote: 'Custom invoicing' }
            }
        }
    ];

    const currentPlans = region === 'IN' ? indiaPlans : internationalPlans;

    const universalFeatures = [
        {
            icon: <Lock className="w-5 h-5 text-[#5F23C8]" />,
            title: "Strict Factual Grounding",
            desc: "Answers grounded in your own content. Invented prices, links and phone numbers are removed before the customer sees them."
        },
        {
            icon: <Globe className="w-5 h-5 text-[#5F23C8]" />,
            title: "One Shared Memory",
            desc: "One shared memory across website and WhatsApp — conversations pick up with zero lost context."
        },
        {
            icon: <ShieldCheck className="w-5 h-5 text-[#5F23C8]" />,
            title: "Approval Gates",
            desc: "Approval gates for bookings, high-value actions, and custom quotes before dispatch."
        },
        {
            icon: <History className="w-5 h-5 text-[#5F23C8]" />,
            title: "Agent Versioning & Rollback",
            desc: "Full agent versioning with one-click rollback for prompts, knowledge, and settings."
        },
        {
            icon: <FileCheck2 className="w-5 h-5 text-[#5F23C8]" />,
            title: "Quotations with GST as PDF",
            desc: "Instant quotes generated with GST calculated and formatted automatically as a downloadable PDF."
        },
        {
            icon: <Mic className="w-5 h-5 text-[#5F23C8]" />,
            title: "Voice Notes on WhatsApp",
            desc: "Transcribes, understands, and replies to WhatsApp audio voice notes in real-time."
        },
        {
            icon: <Users className="w-5 h-5 text-[#5F23C8]" />,
            title: "RBAC & Message Audit Logs",
            desc: "Granular role permissions, secure team governance, and complete compliance audit trails."
        },
        {
            icon: <Languages className="w-5 h-5 text-[#5F23C8]" />,
            title: "Multilingual Intelligence",
            desc: "English, 10 Indian and 6 international languages. Frosty replies in the language your customer writes in."
        },
        {
            icon: <Zap className="w-5 h-5 text-[#5F23C8]" />,
            title: "Lead Re-engagement & Routing",
            desc: "Follows up on leads that went quiet, with per-capability AI/human/off routing and knowledge-gap logging."
        }
    ];

    return (
        <section className="relative w-full overflow-hidden pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12 bg-transparent" id="pricing">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#5F23C8]/4 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
                    {/* Launch Offer Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50/95 border border-purple-200 mb-3.5 shadow-xs"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[#5F23C8]" />
                        <span className="text-[11px] sm:text-xs font-bold tracking-wide text-[#5F23C8]">
                            Launch pricing, first 100 customers. Save a further 20% paying annually.
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
                        className="text-slate-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed"
                    >
                        Launch pricing for the first 100 customers. Your price stays fixed for as long as your subscription is active.
                    </motion.p>

                    {/* Term Discount Selector Toggle (Defaulted to Annual) */}
                    <div className="mt-6 flex flex-wrap justify-center items-center gap-1.5 sm:gap-2">
                        <div className="inline-flex p-1 rounded-2xl sm:rounded-full bg-slate-100/90 border border-slate-200/90 shadow-inner flex-wrap justify-center">
                            <button
                                type="button"
                                onClick={() => setTerm('annual')}
                                className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                                    term === 'annual' 
                                        ? 'bg-[#5F23C8] text-white shadow-sm' 
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <span>Annual</span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                                    term === 'annual' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                    Save 20%
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setTerm('biannual')}
                                className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                                    term === 'biannual' 
                                        ? 'bg-[#5F23C8] text-white shadow-sm' 
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <span>6 Months</span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                                    term === 'biannual' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                    Save 15%
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setTerm('quarterly')}
                                className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                                    term === 'quarterly' 
                                        ? 'bg-[#5F23C8] text-white shadow-sm' 
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <span>Quarterly</span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                                    term === 'quarterly' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                    Save 8%
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setTerm('monthly')}
                                className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                                    term === 'monthly' 
                                        ? 'bg-[#5F23C8] text-white shadow-sm' 
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <span>Monthly</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pricing Cards Grid - 4 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-4 xl:gap-5 items-stretch">
                    <AnimatePresence mode="wait">
                        {currentPlans.map((plan, index) => {
                            const currentPricing = plan.pricing[term];
                            return (
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
                                    {/* Card Header: Plan Name (Left) & Savings Badge (Right) */}
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-tight">
                                            {plan.name}
                                        </h3>
                                        {currentPricing.savings ? (
                                            <span className="text-[10.5px] font-bold tracking-tight text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                                                <BadgePercent className="w-3 h-3 text-emerald-600" />
                                                {currentPricing.savings}
                                            </span>
                                        ) : plan.highlighted ? (
                                            <span className="text-[10px] font-bold tracking-wider text-[#5F23C8] bg-purple-50 border border-purple-200/80 px-2 py-0.5 rounded-full uppercase shrink-0">
                                                Most Popular
                                            </span>
                                        ) : null}
                                    </div>

                                    {/* Divider */}
                                    <div className={`w-full h-px mb-4 ${plan.highlighted ? 'bg-[#5F23C8]/20' : 'bg-slate-100'}`} />

                                    {/* Price Hierarchy Area */}
                                    <div className="flex flex-col min-h-[64px] justify-center mb-4">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl sm:text-[34px] xl:text-4xl font-extrabold text-slate-900 tracking-tight font-serif leading-none">
                                                {currentPricing.price}
                                            </span>
                                            {currentPricing.period && (
                                                <span className="text-xs sm:text-sm text-slate-500 font-medium ml-0.5">
                                                    {currentPricing.period}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs text-slate-500 font-medium mt-1">
                                            {currentPricing.billingNote}
                                        </div>
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

                                        {/* Support Tier */}
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
                                        <div className="my-2 flex flex-col gap-1 text-[11px] text-slate-600">
                                            <div className="flex items-center gap-1.5">
                                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                                                <span>All platform capabilities included</span>
                                            </div>
                                            {!plan.isEnterprise && (
                                                <div className="flex items-center gap-1.5 text-slate-500">
                                                    <Sparkles className="w-3.5 h-3.5 text-[#5F23C8] shrink-0" />
                                                    <span>7-day trial (up to 50 conversations)</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Single CTA Button Area */}
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
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Pricing Disclaimer & 7-Day Trial Guarantee + Discreet Currency Switcher */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 mt-6 mb-10 sm:mb-12 max-w-4xl mx-auto px-2">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-center sm:text-left">
                        <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#5F23C8] shrink-0" />
                            <span className="font-medium text-slate-700">7-day full access trial (up to 50 conversations) on all self-serve plans</span>
                        </div>
                        <span className="hidden sm:inline text-slate-300">•</span>
                        <div className="flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>Launch pricing stays fixed for your lifetime subscription.</span>
                        </div>
                    </div>

                    {/* Discreet Currency Indicator / Switcher for Geolock */}
                    <div className="shrink-0">
                        <button
                            type="button"
                            onClick={() => setRegion(r => r === 'IN' ? 'INTL' : 'IN')}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200 text-[11px] font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                            <Globe className="w-3 h-3 text-[#5F23C8]" />
                            <span>{region === 'IN' ? 'India (₹ INR)' : 'International ($ USD)'}</span>
                            <span className="text-slate-400">·</span>
                            <span className="text-[#5F23C8] underline">Switch</span>
                        </button>
                    </div>
                </div>

                {/* ── Expanded "Everything you need, included in every plan" Section ── */}
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
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
