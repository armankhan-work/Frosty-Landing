'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BrandLogo from './BrandLogo';
import FooterSection from './FooterSection';
import SplashScreen from './SplashScreen';
import ProblemSection from './ProblemSection';
import ProblemConclusion from './ProblemConclusion';
import WhatIsFrostySection from './WhatIsFrostySection';
import CostOfSlowSection from './CostOfSlowSection';
import TwoAgentsSection from './TwoAgentsSection';
import ItActsSection from './ItActsSection';
import IntroducingFrostySection from './IntroducingFrostySection';
import UnifiedChannelsSection from './UnifiedChannelsSection';
import CRMLeadIntelligenceSection from './CRMLeadIntelligenceSection';
// import DashboardSection from './DashboardSection';
import CapabilitiesSection from './CapabilitiesSection';
import DoneForYou from './DoneForYou';
import IndustriesSection from './IndustriesSection';
import PricingSection from './PricingSection';
import CTASection from './CTASection';
import './FrostyPage.css';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });
const FrostyEngineHero = dynamic(() => import('@/components/FrostyEngineHero'), { ssr: false });
import LandingPageAura from '@/components/LandingPageAura';
import TubesBackground from '@/components/TubesBackground';
import { ParallaxStarfield } from '@/components/FrostyEngineHero';
import PinnedFeaturesSection from './PinnedFeaturesSection';

/* ─── useScrollReveal hook ────────────────────────────────────── */
function useScrollReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed', 'is-visible', 'is-in');
                    } else {
                        entry.target.classList.remove('revealed', 'is-visible', 'is-in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        document
            .querySelectorAll('[data-reveal], .fx-reveal')
            .forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}

/* ─── Feature card data ────────────────────────────────────────── */
const FEATURES = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
        title: 'Web Agent',
        desc: 'Deploy a fully-branded AI chat widget on any webpage. Engage every visitor in real-time, answer questions instantly, and convert page views into qualified leads.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.39-.12-.56.12-.16.25-.64.82-.78.99-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.25-.27.37-.41.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
            </svg>
        ),
        title: 'WA Agent',
        desc: "Reach customers on the world's most popular messaging app. Automate responses, qualify leads, and book meetings — all within WhatsApp.",
    },

    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
        title: 'Lead Capture',
        desc: 'Automatically collect name, email, and phone during conversations. Every captured lead is logged and ready to export or push to your CRM.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
        title: 'Meeting Scheduler',
        desc: "Let your AI book meetings directly into Google Calendar. No back-and-forth, no manual work — prospects pick a slot and it's confirmed instantly.",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
        title: 'AI Insights',
        desc: 'Receive daily AI-generated business intelligence: hot leads, trending topics, conversation usage alerts, and actionable recommendations — all in one dashboard.',
    },
];

const METRICS = [
    { value: '10,000+', label: 'Conversations' },
    { value: '500+', label: 'Businesses' },
    { value: '98%', label: 'Satisfaction' },
    { value: '3×', label: 'Lead Rate' },
];

const HOW_STEPS = [
    {
        n: '01',
        title: 'Install in 60 seconds',
        desc: 'Paste one line of code on your website, or connect your WhatsApp number. No engineers required.',
    },
    {
        n: '02',
        title: 'Configure your AI',
        desc: 'Upload your knowledge base, set your brand tone, choose your AI model, and define your working hours.',
    },
    {
        n: '03',
        title: 'Convert at scale',
        desc: 'Frosty works around the clock — capturing leads, scheduling meetings, and closing deals while you sleep.',
    },
];



export default function LandingPage() {
    const [showSplash, setShowSplash] = useState(true);
    const [dashboardHovered, setDashboardHovered] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const heroBackgroundRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!heroBackgroundRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        gsap.to(heroBackgroundRef.current, {
            scrollTrigger: {
                trigger: ".frosty-root",
                start: "top top",
                end: "800px top",
                scrub: true,
            },
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            ease: "none"
        });
    }, { scope: heroBackgroundRef });

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on scroll
    useEffect(() => {
        if (mobileMenuOpen) {
            const close = () => setMobileMenuOpen(false);
            window.addEventListener('scroll', close, { once: true });
            return () => window.removeEventListener('scroll', close);
        }
    }, [mobileMenuOpen]);

    useScrollReveal();

    return (
        <>
            <AnimatePresence>
                {showSplash && (
                    <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
                )}
            </AnimatePresence>

            <motion.div
                initial="initial"
                animate={showSplash ? "initial" : "animate"}
                variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="frosty-root dark"
                style={{
                    background: 'radial-gradient(circle 800px at 100% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(59, 130, 246, 0.12) 30%, transparent 100%), radial-gradient(circle 800px at 0% 100%, rgba(255, 255, 255, 0.04) 0%, rgba(59, 130, 246, 0.12) 30%, transparent 100%), #000000',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    color: '#fff',
                    overflowX: 'hidden',
                    position: 'relative',
                    visibility: showSplash ? 'hidden' : 'visible'
                }}
            >
                <div ref={heroBackgroundRef} className="fixed inset-0 pointer-events-none z-0">
                    <TubesBackground className="w-full h-full" enableClickInteraction={true} />
                </div>
                <ParallaxStarfield />
                <LandingPageAura />

                <div className="relative z-10">
                    {/* NAVBAR */}
                    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center pointer-events-none">
                        <div className="pointer-events-auto transition-all duration-500" style={{
                            width: '100%',
                            background: scrolled ? 'rgba(10, 15, 30, 0.65)' : 'rgba(10, 15, 30, 0.25)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '14px 24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: scrolled ? '0 12px 40px rgba(0, 0, 0, 0.2)' : 'none'
                        }}>
                            <BrandLogo ready={!showSplash} />

                            {/* Desktop Nav */}
                            <div className="hidden md:flex" style={{ gap: 14, alignItems: 'center' }}>
                                <Link href="/login" style={{ fontSize: 15, color: '#fff', fontWeight: 600, padding: '10px 18px', borderRadius: 10, transition: 'background 0.2s' }} className="hover:bg-white/10">Log in</Link>
                                <Link href="/login?mode=register" style={{ background: '#5F23C8', padding: '10px 24px', borderRadius: 10, fontSize: 15, color: '#fff', fontWeight: 600, boxShadow: '0 4px 14px rgba(95, 35, 200,0.3)' }} className="hover:scale-105 transition-transform duration-200">Get started free</Link>
                            </div>

                            {/* Mobile Hamburger */}
                            <button
                                className="flex md:hidden flex-col gap-[5px] p-2 rounded-lg"
                                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                onClick={() => setMobileMenuOpen(v => !v)}
                                aria-label="Toggle menu"
                            >
                                <span style={{ width: 20, height: 2, background: '#fff', borderRadius: 2, display: 'block', transition: 'transform 0.3s', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
                                <span style={{ width: 20, height: 2, background: '#fff', borderRadius: 2, display: 'block', opacity: mobileMenuOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
                                <span style={{ width: 20, height: 2, background: '#fff', borderRadius: 2, display: 'block', transition: 'transform 0.3s', transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
                            </button>
                        </div>

                        {/* Mobile Drawer */}
                        <AnimatePresence>
                            {mobileMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="md:hidden pointer-events-auto"
                                    style={{
                                        position: 'absolute', top: '100%', left: 0, right: 0,
                                        background: 'rgba(8, 12, 28, 0.97)',
                                        backdropFilter: 'blur(24px)',
                                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                                        padding: '16px 24px 24px',
                                        display: 'flex', flexDirection: 'column', gap: 12
                                    }}
                                >
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 16, color: '#fff', fontWeight: 600, padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.05)' }}>Log in</Link>
                                    <Link href="/login?mode=register" onClick={() => setMobileMenuOpen(false)} style={{ background: '#5F23C8', padding: '12px 16px', borderRadius: 10, fontSize: 16, color: '#fff', fontWeight: 600, textAlign: 'center', boxShadow: '0 4px 14px rgba(95, 35, 200,0.3)' }}>Get started free</Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </nav>

                    <motion.div style={{ paddingTop: 60, position: 'relative', zIndex: 20 }}>
                        <FrostyEngineHero />
                        <ProblemSection />

                        {/* ═══ Frostrek-Main migrated sections ═══ */}
                        <CostOfSlowSection />
                        <ProblemConclusion />
                        <IntroducingFrostySection />
                        <WhatIsFrostySection />
                        <UnifiedChannelsSection />
                        <CRMLeadIntelligenceSection />
                        <TwoAgentsSection />
                        <ItActsSection />
                        {/* <DashboardSection /> */}
                        <CapabilitiesSection />
                        <DoneForYou />
                        <IndustriesSection />
                        {/* <FAQSection /> removed and moved to /faq */}
                        <PricingSection />
                        <CTASection />

                        <FooterSection />
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}


