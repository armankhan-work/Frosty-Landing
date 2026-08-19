'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    ShieldCheck,
    Lock,
    Zap,
    Users,
    Sparkles,
    Info,
    Check,
    ArrowRight,
    MessageCircle,
    BadgePercent,
    Mic,
    History,
    FileCheck2,
    Languages,
    ShoppingBag,
    Bot,
    ChevronDown,
    Building2,
    HelpCircle,
    CheckCircle2
} from 'lucide-react';

type Region = 'IN' | 'INTL';
type PlanFamily = 'core' | 'commerce';
type CoreBillingTerm = 'annual' | 'biannual' | 'quarterly' | 'monthly';
type CommerceBillingTerm = 'annual' | 'biannual' | 'trimonthly';
type BillingTerm = CoreBillingTerm | CommerceBillingTerm;

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
    pricing: Record<string, TierPricing>;
}

export default function PricingSection() {
    const [region, setRegion] = useState<Region>('IN');
    const [planFamily, setPlanFamily] = useState<PlanFamily>('core');
    const [coreTerm, setCoreTerm] = useState<CoreBillingTerm>('annual');
    const [commerceTerm, setCommerceTerm] = useState<CommerceBillingTerm>('annual');
    const [showGuaranteeModal, setShowGuaranteeModal] = useState(false);

    // Multi-tier Geo-Lock Detection (Timezone heuristic + IP fallback APIs)
    useEffect(() => {
        try {
            // 1. Check URL parameters for developer/preview testing (e.g. ?geo=intl or ?geo=in)
            if (typeof window !== 'undefined') {
                const params = new URLSearchParams(window.location.search);
                const queryGeo = params.get('geo')?.toLowerCase() || params.get('region')?.toLowerCase() || params.get('country')?.toLowerCase();
                if (queryGeo === 'intl' || queryGeo === 'us' || queryGeo === 'global' || queryGeo === 'usd') {
                    setRegion('INTL');
                    return;
                }
                if (queryGeo === 'in' || queryGeo === 'india' || queryGeo === 'inr') {
                    setRegion('IN');
                    return;
                }
            }

            // 2. Instant client-side timezone check
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
            const isIndianTimezone = tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('India');

            if (!isIndianTimezone) {
                setRegion('INTL');
            } else {
                setRegion('IN');
            }

            // 3. Confirm with IP Geolocation API with fast failover
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3500);

            fetch('https://ipapi.co/json/', { signal: controller.signal })
                .then((res) => {
                    if (!res.ok) throw new Error('ipapi failed');
                    return res.json();
                })
                .then((data) => {
                    clearTimeout(timeoutId);
                    if (data && data.country_code) {
                        setRegion(data.country_code === 'IN' ? 'IN' : 'INTL');
                    }
                })
                .catch(() => {
                    // Secondary fallback API
                    fetch('https://api.country.is/')
                        .then((res) => res.json())
                        .then((data) => {
                            if (data && data.country) {
                                setRegion(data.country === 'IN' ? 'IN' : 'INTL');
                            }
                        })
                        .catch(() => {
                            // Maintain initial timezone detection
                        });
                });
        } catch {
            setRegion('IN');
        }
    }, []);

    // ─────────────────────────────────────────────────────────────
    // INDIA PRICING (₹ INR)
    // ─────────────────────────────────────────────────────────────
    const indiaCorePlans: PlanDetails[] = [
        {
            tag: 'STARTER',
            name: 'Core Starter',
            conversations: '300 conversations',
            seats: '2 team seats',
            overage: '₹26 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '₹5,279',
                    period: '/mo',
                    billingNote: 'Billed annually (₹63,348)',
                    savings: 'Save ₹15,840'
                },
                biannual: {
                    price: '₹5,899',
                    period: '/mo',
                    billingNote: 'Billed 6 months (₹35,394)',
                    savings: 'Save ₹4,200'
                },
                quarterly: {
                    price: '₹6,299',
                    period: '/mo',
                    billingNote: 'Billed quarterly (₹18,897)',
                    savings: 'Save ₹900'
                },
                monthly: {
                    price: '₹6,599',
                    period: '/mo',
                    billingNote: 'Billed monthly'
                }
            }
        },
        {
            tag: 'GROWTH',
            name: 'Core Growth',
            conversations: '600 conversations',
            seats: '3 team seats',
            overage: '₹20 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: true,
            pricing: {
                annual: {
                    price: '₹7,919',
                    period: '/mo',
                    billingNote: 'Billed annually (₹95,028)',
                    savings: 'Save ₹23,760'
                },
                biannual: {
                    price: '₹8,899',
                    period: '/mo',
                    billingNote: 'Billed 6 months (₹53,394)',
                    savings: 'Save ₹6,000'
                },
                quarterly: {
                    price: '₹9,399',
                    period: '/mo',
                    billingNote: 'Billed quarterly (₹28,197)',
                    savings: 'Save ₹1,500'
                },
                monthly: {
                    price: '₹9,899',
                    period: '/mo',
                    billingNote: 'Billed monthly'
                }
            }
        },
        {
            tag: 'SCALE',
            name: 'Core Scale',
            conversations: '1,600 conversations',
            seats: '4 team seats',
            overage: '₹16 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '₹17,599',
                    period: '/mo',
                    billingNote: 'Billed annually (₹211,188)',
                    savings: 'Save ₹52,800'
                },
                biannual: {
                    price: '₹19,799',
                    period: '/mo',
                    billingNote: 'Billed 6 months (₹118,794)',
                    savings: 'Save ₹13,200'
                },
                quarterly: {
                    price: '₹20,899',
                    period: '/mo',
                    billingNote: 'Billed quarterly (₹62,697)',
                    savings: 'Save ₹3,300'
                },
                monthly: {
                    price: '₹21,999',
                    period: '/mo',
                    billingNote: 'Billed monthly'
                }
            }
        },
        {
            tag: 'MAX',
            name: 'Core Max',
            conversations: '4,000 conversations',
            seats: '7 team seats',
            overage: '₹15 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '₹40,479',
                    period: '/mo',
                    billingNote: 'Billed annually (₹485,748)',
                    savings: 'Save ₹121,440'
                },
                biannual: {
                    price: '₹45,499',
                    period: '/mo',
                    billingNote: 'Billed 6 months (₹272,994)',
                    savings: 'Save ₹30,600'
                },
                quarterly: {
                    price: '₹48,099',
                    period: '/mo',
                    billingNote: 'Billed quarterly (₹144,297)',
                    savings: 'Save ₹7,500'
                },
                monthly: {
                    price: '₹50,599',
                    period: '/mo',
                    billingNote: 'Billed monthly'
                }
            }
        }
    ];

    const indiaCommercePlans: PlanDetails[] = [
        {
            tag: 'STARTER',
            name: 'Commerce Starter',
            conversations: '500 conversations',
            seats: '2 team seats',
            overage: '₹24 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '₹7,999',
                    period: '/mo',
                    billingNote: 'Billed annually (₹95,988)',
                    savings: 'Save ₹24,000'
                },
                biannual: {
                    price: '₹8,999',
                    period: '/mo',
                    billingNote: 'Billed 6 months (₹53,994)',
                    savings: 'Save ₹6,000'
                },
                trimonthly: {
                    price: '₹9,999',
                    period: '/mo',
                    billingNote: 'Billed 3 months (₹29,997) · Min Term'
                }
            }
        },
        {
            tag: 'GROWTH',
            name: 'Commerce Growth',
            conversations: '1,000 conversations',
            seats: '3 team seats',
            overage: '₹22 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: true,
            pricing: {
                annual: {
                    price: '₹14,399',
                    period: '/mo',
                    billingNote: 'Billed annually (₹172,788)',
                    savings: 'Save ₹43,200'
                },
                biannual: {
                    price: '₹16,199',
                    period: '/mo',
                    billingNote: 'Billed 6 months (₹97,194)',
                    savings: 'Save ₹10,800'
                },
                trimonthly: {
                    price: '₹17,999',
                    period: '/mo',
                    billingNote: 'Billed 3 months (₹53,997) · Min Term'
                }
            }
        },
        {
            tag: 'SCALE',
            name: 'Commerce Scale',
            conversations: '2,000 conversations',
            seats: '4 team seats',
            overage: '₹18 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '₹23,999',
                    period: '/mo',
                    billingNote: 'Billed annually (₹287,988)',
                    savings: 'Save ₹72,000'
                },
                biannual: {
                    price: '₹26,999',
                    period: '/mo',
                    billingNote: 'Billed 6 months (₹161,994)',
                    savings: 'Save ₹18,000'
                },
                trimonthly: {
                    price: '₹29,999',
                    period: '/mo',
                    billingNote: 'Billed 3 months (₹89,997) · Min Term'
                }
            }
        },
        {
            tag: 'MAX',
            name: 'Commerce Max',
            conversations: '5,000 conversations',
            seats: '7 team seats',
            overage: '₹16 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '₹53,999',
                    period: '/mo',
                    billingNote: 'Billed annually (₹647,988)',
                    savings: 'Save ₹162,000'
                },
                biannual: {
                    price: '₹60,799',
                    period: '/mo',
                    billingNote: 'Billed 6 months (₹364,794)',
                    savings: 'Save ₹40,200'
                },
                trimonthly: {
                    price: '₹67,499',
                    period: '/mo',
                    billingNote: 'Billed 3 months (₹202,497) · Min Term'
                }
            }
        }
    ];

    // ─────────────────────────────────────────────────────────────
    // INTERNATIONAL PRICING ($ USD)
    // ─────────────────────────────────────────────────────────────
    const intlCorePlans: PlanDetails[] = [
        {
            tag: 'STARTER',
            name: 'Core Starter',
            conversations: '300 conversations',
            seats: '2 team seats',
            overage: '$0.80 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '$159',
                    period: '/mo',
                    billingNote: 'Billed annually ($1,908)',
                    savings: 'Save $480'
                },
                biannual: {
                    price: '$179',
                    period: '/mo',
                    billingNote: 'Billed 6 months ($1,074)',
                    savings: 'Save $120'
                },
                quarterly: {
                    price: '$189',
                    period: '/mo',
                    billingNote: 'Billed quarterly ($567)',
                    savings: 'Save $30'
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
            name: 'Core Growth',
            conversations: '600 conversations',
            seats: '3 team seats',
            overage: '$0.70 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: true,
            pricing: {
                annual: {
                    price: '$279',
                    period: '/mo',
                    billingNote: 'Billed annually ($3,348)',
                    savings: 'Save $840'
                },
                biannual: {
                    price: '$319',
                    period: '/mo',
                    billingNote: 'Billed 6 months ($1,914)',
                    savings: 'Save $180'
                },
                quarterly: {
                    price: '$329',
                    period: '/mo',
                    billingNote: 'Billed quarterly ($987)',
                    savings: 'Save $60'
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
            name: 'Core Scale',
            conversations: '1,600 conversations',
            seats: '4 team seats',
            overage: '$0.52 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '$559',
                    period: '/mo',
                    billingNote: 'Billed annually ($6,708)',
                    savings: 'Save $1,680'
                },
                biannual: {
                    price: '$629',
                    period: '/mo',
                    billingNote: 'Billed 6 months ($3,774)',
                    savings: 'Save $420'
                },
                quarterly: {
                    price: '$669',
                    period: '/mo',
                    billingNote: 'Billed quarterly ($2,007)',
                    savings: 'Save $90'
                },
                monthly: {
                    price: '$699',
                    period: '/mo',
                    billingNote: 'Billed monthly'
                }
            }
        },
        {
            tag: 'MAX',
            name: 'Core Max',
            conversations: '4,000 conversations',
            seats: '7 team seats',
            overage: '$0.44 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '$1,179',
                    period: '/mo',
                    billingNote: 'Billed annually ($14,148)',
                    savings: 'Save $3,600'
                },
                biannual: {
                    price: '$1,329',
                    period: '/mo',
                    billingNote: 'Billed 6 months ($7,974)',
                    savings: 'Save $900'
                },
                quarterly: {
                    price: '$1,409',
                    period: '/mo',
                    billingNote: 'Billed quarterly ($4,227)',
                    savings: 'Save $210'
                },
                monthly: {
                    price: '$1,479',
                    period: '/mo',
                    billingNote: 'Billed monthly'
                }
            }
        }
    ];

    const intlCommercePlans: PlanDetails[] = [
        {
            tag: 'STARTER',
            name: 'Commerce Starter',
            conversations: '500 conversations',
            seats: '2 team seats',
            overage: '$0.81 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '$269',
                    period: '/mo',
                    billingNote: 'Billed annually ($3,228)',
                    savings: 'Save $840'
                },
                biannual: {
                    price: '$309',
                    period: '/mo',
                    billingNote: 'Billed 6 months ($1,854)',
                    savings: 'Save $180'
                },
                trimonthly: {
                    price: '$339',
                    period: '/mo',
                    billingNote: 'Billed 3 months ($1,017) · Min Term'
                }
            }
        },
        {
            tag: 'GROWTH',
            name: 'Commerce Growth',
            conversations: '1,000 conversations',
            seats: '3 team seats',
            overage: '$0.72 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: true,
            pricing: {
                annual: {
                    price: '$479',
                    period: '/mo',
                    billingNote: 'Billed annually ($5,748)',
                    savings: 'Save $1,440'
                },
                biannual: {
                    price: '$539',
                    period: '/mo',
                    billingNote: 'Billed 6 months ($3,234)',
                    savings: 'Save $360'
                },
                trimonthly: {
                    price: '$599',
                    period: '/mo',
                    billingNote: 'Billed 3 months ($1,797) · Min Term'
                }
            }
        },
        {
            tag: 'SCALE',
            name: 'Commerce Scale',
            conversations: '2,000 conversations',
            seats: '4 team seats',
            overage: '$0.56 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '$739',
                    period: '/mo',
                    billingNote: 'Billed annually ($8,868)',
                    savings: 'Save $2,280'
                },
                biannual: {
                    price: '$839',
                    period: '/mo',
                    billingNote: 'Billed 6 months ($5,034)',
                    savings: 'Save $540'
                },
                trimonthly: {
                    price: '$929',
                    period: '/mo',
                    billingNote: 'Billed 3 months ($2,787) · Min Term'
                }
            }
        },
        {
            tag: 'MAX',
            name: 'Commerce Max',
            conversations: '5,000 conversations',
            seats: '7 team seats',
            overage: '$0.47 / extra conversation',
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: false,
            pricing: {
                annual: {
                    price: '$1,579',
                    period: '/mo',
                    billingNote: 'Billed annually ($18,948)',
                    savings: 'Save $4,800'
                },
                biannual: {
                    price: '$1,779',
                    period: '/mo',
                    billingNote: 'Billed 6 months ($10,674)',
                    savings: 'Save $1,200'
                },
                trimonthly: {
                    price: '$1,979',
                    period: '/mo',
                    billingNote: 'Billed 3 months ($5,937) · Min Term'
                }
            }
        }
    ];

    // Determine current plan list
    const currentPlans =
        planFamily === 'core'
            ? region === 'IN'
                ? indiaCorePlans
                : intlCorePlans
            : region === 'IN'
                ? indiaCommercePlans
                : intlCommercePlans;

    const currentTerm: BillingTerm = planFamily === 'core' ? coreTerm : commerceTerm;

    const universalFeatures = [
        {
            icon: <Lock className="w-5 h-5 text-[#0396A6]" />,
            title: 'Strict Factual Grounding',
            desc: 'Answers strictly grounded in your verified content. Invented prices, phone numbers, and false promises are removed before the customer sees them.'
        },
        {
            icon: <MessageCircle className="w-5 h-5 text-[#0396A6]" />,
            title: 'One Shared Memory',
            desc: 'Continuous shared customer memory across Website and WhatsApp — conversations pick up with zero lost context.'
        },
        {
            icon: <ShieldCheck className="w-5 h-5 text-[#0396A6]" />,
            title: 'Approval Gates',
            desc: 'Human-in-the-loop review gates for bookings, custom quotations, and high-value workflows before customer dispatch.'
        },
        {
            icon: <History className="w-5 h-5 text-[#0396A6]" />,
            title: 'Agent Versioning & Rollback',
            desc: 'Full agent versioning history with instant one-click rollback for system prompts, knowledge documents, and tools.'
        },
        {
            icon: <FileCheck2 className="w-5 h-5 text-[#0396A6]" />,
            title: 'GST Quotations as PDF',
            desc: 'Instantly build verified quotes with GST calculations and render downloadable branded PDFs directly in the chat.'
        },
        {
            icon: <Mic className="w-5 h-5 text-[#0396A6]" />,
            title: 'WhatsApp Voice Notes',
            desc: 'Transcribes, parses intent, and responds naturally to WhatsApp audio voice notes in real-time.'
        },
        {
            icon: <Users className="w-5 h-5 text-[#0396A6]" />,
            title: 'RBAC & Audit Trails',
            desc: 'Granular role permissions, complete message audit logs, and security controls for enterprise compliance.'
        },
        {
            icon: <Languages className="w-5 h-5 text-[#0396A6]" />,
            title: 'Multilingual Intelligence',
            desc: 'English, 10 Indian regional languages, and 6 global languages. Frosty responds in the exact dialect the customer writes.'
        },
        {
            icon: <Zap className="w-5 h-5 text-[#0396A6]" />,
            title: 'Lead Re-engagement & Routing',
            desc: 'Proactively re-engages quiet leads, logs knowledge gaps, and routes conversations with AI/Human fallback rules.'
        }
    ];

    return (
        <section className="relative w-full overflow-hidden pt-8 sm:pt-10 lg:pt-12 pb-14 sm:pb-16 bg-transparent" id="pricing">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ── Section Header ── */}
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0396A6]/[0.08] border border-[#0396A6]/20 mb-4 backdrop-blur-sm shadow-xs"
                    >
                        <span className="w-4 h-4 rounded-full bg-[#0396A6]/20 flex items-center justify-center">
                            <Sparkles className="w-2.5 h-2.5 text-[#0396A6]" />
                        </span>
                        <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#0396A6]">
                            TRANSPARENT, VOLUME-BASED PRICING
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#0F172A] leading-[1.15] tracking-tight m-0 mb-3"
                    >
                        Every plan includes every feature.
                    </motion.h2>

                    {/* Subtitle & Zero-Fee Highlight */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-slate-600 font-normal text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed m-0 mb-2"
                    >
                        Plans differ on conversation volume, seats and support only.
                    </motion.p>

                    {/* Guaranteed Zero-Fee Callout */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mt-1 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>No setup fee, no onboarding fee, no implementation fee — on any plan.</span>
                    </div>

                    {/* ── Category Switcher: Core Plans vs Commerce Plans ── */}
                    <div className="mt-8 flex justify-center">
                        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200 shadow-inner max-w-full">
                            <button
                                type="button"
                                onClick={() => setPlanFamily('core')}
                                className={`relative px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${planFamily === 'core'
                                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <Bot className={`w-4 h-4 ${planFamily === 'core' ? 'text-[#0396A6]' : 'text-slate-400'}`} />
                                <span>Core Plans</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setPlanFamily('commerce')}
                                className={`relative px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${planFamily === 'commerce'
                                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <ShoppingBag className={`w-4 h-4 ${planFamily === 'commerce' ? 'text-[#0396A6]' : 'text-slate-400'}`} />
                                <span>Commerce Plans</span>
                                <span className="hidden sm:inline text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-teal-50 text-[#0396A6] border border-teal-200/60">
                                    Store Sync & Returns
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Category Description Banner */}
                    <div className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
                        {planFamily === 'core' ? (
                            <span>Full-featured agent for websites, WhatsApp, knowledge base, quotes & lead management.</span>
                        ) : (
                            <span>
                                Live store integration: answers &ldquo;where is my order&rdquo;, tracks shipments & handles returns from live order data. (3-month min, no setup fee).
                            </span>
                        )}
                    </div>

                    {/* ── Adaptive Billing Term Selector ── */}
                    <div className="mt-5 flex flex-wrap justify-center items-center gap-1.5 sm:gap-2">
                        <div className="inline-flex p-1 rounded-2xl sm:rounded-full bg-slate-100/90 border border-slate-200/90 shadow-inner flex-wrap justify-center">
                            {/* Annual Term (Available in both) */}
                            <button
                                type="button"
                                onClick={() => (planFamily === 'core' ? setCoreTerm('annual') : setCommerceTerm('annual'))}
                                className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${currentTerm === 'annual'
                                        ? 'bg-[#0396A6] !text-white shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <span className={currentTerm === 'annual' ? '!text-white font-bold' : ''}>Annual</span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${currentTerm === 'annual' ? 'bg-white/20 !text-white' : 'bg-emerald-100 text-emerald-800'
                                    }`}>
                                    Save 20%
                                </span>
                            </button>

                            {/* 6-Month Term (Available in both) */}
                            <button
                                type="button"
                                onClick={() => (planFamily === 'core' ? setCoreTerm('biannual') : setCommerceTerm('biannual'))}
                                className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${currentTerm === 'biannual'
                                        ? 'bg-[#0396A6] !text-white shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <span className={currentTerm === 'biannual' ? '!text-white font-bold' : ''}>6 Months</span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${currentTerm === 'biannual' ? 'bg-white/20 !text-white' : 'bg-emerald-100 text-emerald-800'
                                    }`}>
                                    {planFamily === 'commerce' ? 'Save 10%' : 'Save 10-15%'}
                                </span>
                            </button>

                            {/* Core Only: Quarterly */}
                            {planFamily === 'core' && (
                                <button
                                    type="button"
                                    onClick={() => setCoreTerm('quarterly')}
                                    className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${currentTerm === 'quarterly'
                                            ? 'bg-[#0396A6] !text-white shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                >
                                    <span className={currentTerm === 'quarterly' ? '!text-white font-bold' : ''}>Quarterly</span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${currentTerm === 'quarterly' ? 'bg-white/20 !text-white' : 'bg-emerald-100 text-emerald-800'
                                        }`}>
                                        Save ~5%
                                    </span>
                                </button>
                            )}

                            {/* Core Only: Monthly */}
                            {planFamily === 'core' && (
                                <button
                                    type="button"
                                    onClick={() => setCoreTerm('monthly')}
                                    className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${currentTerm === 'monthly'
                                            ? 'bg-[#0396A6] !text-white shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                >
                                    <span className={currentTerm === 'monthly' ? '!text-white font-bold' : ''}>Monthly</span>
                                </button>
                            )}

                            {/* Commerce Only: 3-Month Minimum Term */}
                            {planFamily === 'commerce' && (
                                <button
                                    type="button"
                                    onClick={() => setCommerceTerm('trimonthly')}
                                    className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${currentTerm === 'trimonthly'
                                            ? 'bg-[#0396A6] !text-white shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                >
                                    <span className={currentTerm === 'trimonthly' ? '!text-white font-bold' : ''}>3 Months</span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${currentTerm === 'trimonthly' ? 'bg-white/20 !text-white' : 'bg-slate-200 text-slate-700'}`}>
                                        Min Term · List Price
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── 4-Tier Plan Grid (Starter, Growth, Scale, Max) ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-4 xl:gap-5 items-stretch">
                    <AnimatePresence mode="wait">
                        {currentPlans.map((plan, index) => {
                            const currentPricing = plan.pricing[currentTerm] || plan.pricing['annual'];
                            return (
                                <motion.div
                                    key={`${region}-${planFamily}-${plan.name}`}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ delay: index * 0.05, duration: 0.25 }}
                                    whileHover={{ y: -5, transition: { duration: 0.18, ease: 'easeOut' } }}
                                    className={`relative flex flex-col rounded-[22px] p-5 lg:p-5 xl:p-6 h-full transition-all duration-200 ${plan.highlighted
                                            ? 'bg-white border-2 border-[#0396A6] shadow-[0_8px_30px_rgba(3,150,166,0.12)] ring-1 ring-[#0396A6]/20'
                                            : 'bg-white border border-slate-200/90 shadow-xs hover:border-slate-300'
                                        }`}
                                >
                                    {/* Card Header: Plan Name & Badge */}
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
                                            <span className="text-[10px] font-bold tracking-wider text-[#0396A6] bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-full uppercase shrink-0">
                                                Most Popular
                                            </span>
                                        ) : null}
                                    </div>

                                    {/* Divider */}
                                    <div className={`w-full h-px mb-4 ${plan.highlighted ? 'bg-[#0396A6]/20' : 'bg-slate-100'}`} />

                                    {/* Price Display Area */}
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

                                    {/* Metrics Box: Volume & Extra Conversation Rate */}
                                    <div className="flex flex-col gap-2.5 mb-4 flex-1">
                                        {/* Volume & Overage Box */}
                                        <div
                                            className={`p-3 rounded-xl border flex flex-col gap-0.5 transition-colors duration-200 ${plan.highlighted
                                                    ? 'bg-teal-50/60 border-teal-200/70'
                                                    : 'bg-slate-50/80 border-slate-200/70'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                <span>Monthly Allowance</span>
                                                <MessageCircle className="w-3 h-3 text-[#0396A6]" />
                                            </div>
                                            <div className="text-[13.5px] sm:text-[14px] font-bold text-slate-900 leading-tight">
                                                {plan.conversations}
                                            </div>
                                            <div className="text-[11px] text-[#0396A6] font-semibold mt-0.5">
                                                Extra: {plan.overage}
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

                                        {/* WhatsApp Channel Indicator */}
                                        <div className="p-2.5 px-3 rounded-xl border border-slate-200/70 bg-white flex items-center justify-between shadow-2xs">
                                            <div className="flex items-center gap-1.5">
                                                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                                                <span className="text-xs font-semibold text-slate-700">WhatsApp Channel</span>
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-800">
                                                {region === 'IN' ? 'Included' : 'Meta + 5%'}
                                            </span>
                                        </div>

                                        {/* Included Checklist */}
                                        <div className="my-2 flex flex-col gap-1.5 text-[11px] text-slate-600">
                                            <div className="flex items-center gap-1.5">
                                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                                                <span>All platform features included</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                                                <span>Zero setup or onboarding fees</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Sparkles className="w-3.5 h-3.5 text-[#0396A6] shrink-0" />
                                                <span>7-day free trial (up to 50 convos)</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Single CTA Button */}
                                    <div className="mt-auto pt-2 flex flex-col gap-2">
                                        <Link
                                            href={plan.ctaLink}
                                            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-[13px] transition-all duration-200 flex items-center justify-center gap-1.5 text-center group cursor-pointer ${plan.highlighted
                                                    ? 'bg-[#0396A6] !text-white hover:!text-white hover:bg-[#027A87] shadow-sm hover:shadow-md active:scale-[0.98]'
                                                    : 'bg-stone-50 border border-slate-200 text-slate-800 hover:bg-white hover:border-[#0396A6]/40 hover:text-[#0396A6] active:scale-[0.98]'
                                                }`}
                                        >
                                            <span className={plan.highlighted ? '!text-white' : ''}>{plan.cta}</span>
                                            <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 ${plan.highlighted ? '!text-white' : ''}`} />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* ── Enterprise Tier Card (High-Contrast, Premium Light Design) ── */}
                <div className="mt-6 p-6 sm:p-7 rounded-[22px] bg-white border border-slate-200/90 shadow-sm hover:border-[#0396A6]/40 transition-all duration-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
                    {/* Subtle gradient accent background */}
                    <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-teal-50/40 to-transparent pointer-events-none" />

                    <div className="flex items-start gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 shadow-2xs">
                            <Building2 className="w-6 h-6 text-[#0396A6]" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0396A6]/10 border border-[#0396A6]/20 text-[10.5px] font-bold tracking-wider uppercase text-[#0396A6]">
                                    Enterprise Plan
                                </span>
                                <span className="text-xs font-semibold text-slate-500">
                                    Custom Volume · Dedicated Infrastructure · Custom SLA
                                </span>
                            </div>
                            <h4 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 leading-tight mb-1.5">
                                Need custom scale, bespoke integrations, or dedicated SLAs?
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-3.5">
                                Everything in Max plus custom conversation volume, dedicated account manager, multi-region data residency, custom security reviews, and direct Slack/Teams engineer bridge.
                            </p>

                            {/* Enterprise Feature Badges */}
                            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-800">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                                    Custom volume & rollover
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-800">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                                    99.9% Uptime SLA
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-800">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                                    Dedicated Account Manager
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-800">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                                    Custom Invoicing & PO
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 w-full lg:w-auto relative z-10 flex flex-col sm:flex-row lg:flex-col gap-2.5 items-stretch sm:items-center lg:items-end">
                        <div className="text-left lg:text-right">
                            <span className="text-2xl font-bold font-serif text-slate-900 block">Custom</span>
                            <span className="text-xs text-slate-500 font-medium">Billed per agreement</span>
                        </div>
                        <Link
                            href="https://www.frostrek.ai/contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0396A6] hover:bg-[#027A87] !text-white hover:!text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer text-center group"
                            style={{ color: '#FFFFFF' }}
                        >
                            <span className="!text-white text-white font-bold">Talk to Sales</span>
                            <ArrowRight className="w-4 h-4 !text-white text-white transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>

                {/* ── Section: What counts as a conversation & Add-ons Info ── */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Unit Explanation Card */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0396A6]">
                                    <HelpCircle className="w-4 h-4" />
                                    <span>The Unit · What counts as a conversation</span>
                                </div>
                                <span className="text-[11px] font-semibold text-slate-400">Section 1</span>
                            </div>
                            <ul className="space-y-2 text-xs text-slate-700 mt-3">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0396A6] mt-1.5 shrink-0" />
                                    <span>
                                        <strong className="text-slate-900 font-semibold">1 Conversation = Up to 12 replies</strong> from the Frosty agent. A 13th reply automatically starts a new conversation.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0396A6] mt-1.5 shrink-0" />
                                    <span>
                                        <strong className="text-slate-900 font-semibold">Customer messages are unlimited and never counted.</strong> Only the agent&apos;s outgoing responses count toward your monthly allowance.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                                    <span>Unused conversation allowances do not roll over between billing cycles.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Add-ons & WhatsApp Rules Card */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                                    <Info className="w-4 h-4 text-[#0396A6]" />
                                    <span>Add-ons, Team Seats & WhatsApp</span>
                                </div>
                                <span className="text-[11px] font-semibold text-slate-400">Section 5</span>
                            </div>
                            <ul className="space-y-2 text-xs text-slate-700 mt-3">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0396A6] mt-1.5 shrink-0" />
                                    <span>
                                        <strong className="text-slate-900 font-semibold">Additional team seats:</strong> {region === 'IN' ? '₹999 per seat / month' : '$19.99 per seat / month'}. Included seats are specified per tier.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0396A6] mt-1.5 shrink-0" />
                                    <span>
                                        <strong className="text-slate-900 font-semibold">WhatsApp Messaging:</strong>{' '}
                                        {region === 'IN' ? (
                                            <span className="text-emerald-700 font-semibold">Included in every India plan. Nothing extra to pay.</span>
                                        ) : (
                                            <span>Billed at Meta&apos;s published per-message rate plus 5% as a separate invoice line.</span>
                                        )}
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                                    <span>
                                        <strong className="text-slate-900 font-semibold">Extra usage notifications:</strong> You will be notified in real-time as you approach plan limits. Upgrading is always cheaper than sustained extra overages.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ── 14-Day Money-Back Guarantee Section ── */}
                <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-teal-50/70 via-white to-slate-50 border border-teal-200/80 shadow-xs relative overflow-hidden">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0396A6]/10 border border-[#0396A6]/20 mb-3">
                            <ShieldCheck className="w-4 h-4 text-[#0396A6]" />
                            <span className="text-xs font-bold tracking-wider text-[#0396A6] uppercase">Risk-Free Purchase Guarantee</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mb-2">
                            14-day money-back guarantee
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            If Frosty isn&apos;t right for you, cancel within 14 days of going live and we&apos;ll refund what you&apos;ve paid.{' '}
                            <strong className="text-slate-900 font-semibold">
                                Your first 20% of the monthly conversation allowance is free
                            </strong>{' '}
                            — if you use more than that, we only charge for the conversations beyond it, at your plan&apos;s rate.
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                            <span>Available on Quarterly, 6-Month, Annual, and all Commerce plans.</span>
                            <button
                                type="button"
                                onClick={() => setShowGuaranteeModal(!showGuaranteeModal)}
                                className="text-[#0396A6] font-semibold underline hover:text-[#0A1A2F] cursor-pointer inline-flex items-center gap-1"
                            >
                                <span>{showGuaranteeModal ? 'Hide Full Terms' : 'View Full Terms & FAQ'}</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showGuaranteeModal ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* Expandable Guarantee Terms Drawer */}
                        {showGuaranteeModal && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-teal-200/60 text-xs text-slate-600 space-y-2 bg-white/80 p-4 rounded-xl"
                            >
                                <p className="font-bold text-slate-800">Full Guarantee Terms (§6):</p>
                                <ul className="list-disc list-inside space-y-1.5">
                                    <li>The 14 days start when the agent goes live (published and connected to at least one channel) or 14 days after payment, whichever comes first.</li>
                                    <li>Available once per customer, on a first purchase only. Not available on renewals or upgrades.</li>
                                    <li>Monthly plans do not need it — cancel anytime and the plan simply ends at the close of the current monthly billing period.</li>
                                    <li>Refunds are processed to the original payment method, typically within 5–7 business days.</li>
                                </ul>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* ── Universal Platform Capabilities ── */}
                <div className="pt-12 sm:pt-14 border-t border-slate-200/80 mt-12">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 mb-2.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#0396A6]" />
                            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#0396A6] uppercase">
                                Full Product Included
                            </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mb-2.5">
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
                                transition={{ delay: idx * 0.03, duration: 0.25 }}
                                className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-xs hover:border-[#0396A6]/30 transition-all duration-200 flex flex-col"
                            >
                                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center mb-2.5 shrink-0">
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
