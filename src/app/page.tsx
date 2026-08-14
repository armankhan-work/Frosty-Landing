'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
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
import CapabilitiesSection from './CapabilitiesSection';
import DoneForYou from './DoneForYou';
import IndustriesSection from './IndustriesSection';
import PricingSection from './PricingSection';
import CTASection from './CTASection';
import GlassNavbar from '@/components/GlassNavbar';
import './FrostyPage.css';

const FrostyEngineHero = dynamic(() => import('@/components/FrostyEngineHero'), { ssr: false });
import LandingPageAura from '@/components/LandingPageAura';
import { ParallaxStarfield } from '@/components/FrostyEngineHero';

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

export default function LandingPage() {
    const [showSplash, setShowSplash] = useState(true);



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
                className="frosty-root"
                style={{
                    background: 'radial-gradient(circle 800px at 100% 0%, rgba(95, 35, 200, 0.035) 0%, rgba(245, 158, 11, 0.018) 30%, transparent 100%), radial-gradient(circle 800px at 0% 100%, rgba(95, 35, 200, 0.03) 0%, rgba(217, 119, 6, 0.018) 30%, transparent 100%), #FCFBF9',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    color: '#18181B',
                    overflowX: 'hidden',
                    position: 'relative',
                    visibility: showSplash ? 'hidden' : 'visible'
                }}
            >

                <ParallaxStarfield />
                <LandingPageAura />

                <div className="relative z-10">
                    {/* PREMIUM GLASSMORPHISM NAVBAR */}
                    <GlassNavbar ready={!showSplash} />

                    <motion.div style={{ paddingTop: 72, position: 'relative', zIndex: 20 }}>
                        <FrostyEngineHero />
                        <ProblemSection />
                        <CostOfSlowSection />
                        <ProblemConclusion />
                        <IntroducingFrostySection />
                        <WhatIsFrostySection />
                        <UnifiedChannelsSection />
                        <CRMLeadIntelligenceSection />
                        <TwoAgentsSection />
                        <ItActsSection />
                        <CapabilitiesSection />
                        <DoneForYou />
                        <IndustriesSection />
                        <PricingSection />
                        <CTASection />
                        <FooterSection />
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}
