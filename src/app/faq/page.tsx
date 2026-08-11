'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, ArrowLeft } from 'lucide-react';
import BrandLogo from '../BrandLogo';
import FooterSection from '../FooterSection';
import { ParallaxStarfield } from '@/components/FrostyEngineHero';
import '../FrostyPage.css';

const FAQ_GROUPS: [string, [string, string][]][] = [
    ["About Frosty", [
        ["What is Frosty?", "Frosty is an AI agent that talks to your website visitors and WhatsApp leads for you. It answers their questions in seconds, works out what they want, books meetings, and passes qualified leads to your team, day and night. Frostrek builds, trains, and runs it around your business, so you get a working agent without adding staff."],
        ["How is Frosty different from a basic automated chat?", "A basic automated chat follows a fixed script and gets stuck the moment a customer asks something it wasn't set up for. Frosty understands the actual question, replies in a natural way, and takes real steps like booking a call or sending a quote. It works more like a junior sales rep that never sleeps than a set of pre-written replies."],
        ["Can Frosty handle both my website and WhatsApp?", "Yes. Frosty runs on your website and on WhatsApp at the same time, using one shared memory. If someone starts a chat on your site and later messages you on WhatsApp, Frosty remembers the earlier conversation, so the customer never has to repeat themselves."],
        ["Can Frosty qualify leads and book meetings on its own?", "Yes. Frosty asks the right questions to understand budget, timeline, and intent, then tags each lead as warm or hot based on rules you set. When a lead is ready, it books a meeting straight into your calendar, sends a proposal or quote, and saves the contact details for your team to follow up."],
        ["Can Frosty handle customer support, not just lead generation?", "Yes. Frosty can handle around 90% of the everyday questions your customers ask, things like hours, pricing, availability, order and service queries, and how your process works. When something needs a person, it passes the conversation to your team, so support stays fast without your staff answering the same questions all day."],
        ["Does Frosty really work 24/7?", "Yes. Frosty answers the moment a message comes in, at any hour, including nights, weekends, and holidays. That matters because most buyers go with whoever replies first, and enquiries usually arrive long after your team has logged off."],
        ["Can't I just use ChatGPT for this?", "ChatGPT is a general tool that doesn't know your business, doesn't sit on your website and WhatsApp, and can't book a meeting or hand a lead to your team. Frosty is trained on your own content and runs on your channels, so it answers as your business and takes the next step for you. It's the difference between a general assistant and one built around how you actually sell."],
    ]],
    ["Setting it up", [
        ["Do I need a developer to set up Frosty?", "No. The Frostrek team sets Frosty up for you. We customize and train the agent around your business and deploy it on your website and WhatsApp, so there's nothing for you to build or code. You tell us about your services, and we handle the rest during onboarding."],
        ["How does Frosty learn about my business?", "The Frostrek team trains and customizes Frosty around your business, your services, and your rates. It also reads the content on your website to build its knowledge, and you can share PDFs or documents to add to what it knows. That's why its answers match what you actually offer instead of sounding generic."],
        ["How long does it take to get Frosty live?", "It usually takes anywhere from a few hours to a few days. The timeline depends on the size of your knowledge base and what you need Frosty to do, so a straightforward setup goes live quickly while custom requirements take a little longer. The Frostrek team confirms the timeline with you upfront."],
        ["Will Frosty answer in my brand's voice?", "Yes. The team sets the tone Frosty uses, and it answers from your own content, so it sounds like your business rather than a generic script. You stay in control of how it speaks and what it's allowed to say."],
        ["Does Frosty work with my existing website?", "Yes. Frosty can be added to most common website setups, and the Frostrek team handles the integration for you. Your customers get the same agent on your site and on WhatsApp, working from one shared knowledge base."],
        ["Which AI models does Frosty use?", "Frosty uses a multi-model approach. The Frostrek team picks the best available model for each type of task, so the right model handles the right kind of work behind the scenes. If you have a preference, the setup can be customized to your requirements."],
    ]],
    ["How it works day to day", [
        ["How does Frosty make sure its answers are accurate?", "Frosty answers from your own content rather than making things up, so it stays grounded in what you actually offer. When it isn't confident or a question needs a person, it hands the conversation to your team instead of guessing, and that question can be added to its knowledge for next time."],
        ["Where do my conversations and leads end up?", "Everything lands in one live dashboard. You can see every conversation across your website and WhatsApp, old and new, with leads sorted by intent and every action logged, from meetings booked to quotes sent. You also get analytics on response times and where leads drop off."],
        ["Can my whole team use Frosty and take over chats?", "Yes. Frosty runs on a shared dashboard that your whole team can log into. Any team member can step into a live conversation with one click and continue with the full history in front of them, and different people can handle different conversations at the same time. Frosty picks each one back up automatically once your team is done."],
        ["Does Frosty connect with my CRM, calendar, and email?", "Yes. Frosty syncs qualified leads and their full history into your CRM, and it works with Google Calendar for bookings, Gmail for follow-ups, and Slack for team alerts. It does more than reply, it acts through the tools you already use."],
        ["What languages can Frosty speak?", "Frosty is a multi-language agent. It replies in the language your customer writes in and picks up the language automatically during the chat, so you can help visitors from different regions with one agent."],
        ["Can Frosty answer phone calls too?", "Yes, through a separate voice agent. It answers inbound calls, qualifies the caller the same way the website and WhatsApp agents do, and books a callback when no one is free to pick up. Voice is offered as an add-on, so ask the Frosty team to include it."],
    ]],
    ["Trust and getting started", [
        ["Is my data safe with Frosty?", "Yes. Frostrek is ISO 27001 and ISO 9001 certified and GDPR-ready. Your content is used only to train your own agent, and Frosty is built and hosted end to end by Frostrek rather than pieced together from other people's tools."],
        ["Who maintains and updates Frosty after it goes live?", "The Frostrek team does. We keep Frosty running, update it as your business changes, and retrain it when you add new services or content. If something needs adjusting, you have a team to reach rather than a tool you're left to manage on your own."],
        ["What types of businesses is Frosty for?", "Frosty fits any business that gets enquiries and wants to answer them fast. That includes marketing agencies, real estate, clinics and healthcare, education and study-abroad consultancies, car dealers, financial services, and online stores. If your leads come in through a website or WhatsApp, Frosty can capture and qualify them."],
        ["How much does Frosty cost?", "Plans start at ₹19,999 per month for the enterprise-grade Frosty agent. Final pricing depends on how many conversations you handle and which features you need, so contact the Frosty team and they'll walk you through the options and quote for your business."],
        ["How can I see Frosty in action?", "Book a demo and the Frostrek team will set Frosty up on a sample of your own content, so you can watch it answer a real enquiry before you decide. You can reach the Frosty team through the Book a Demo button or on WhatsApp."],
    ]],
];

// Replicating the screenshot's subtle colored themes for different FAQs but in a dark-mode premium style
const FAQ_THEMES = [
    { border: 'border-[#3B82F6]/20', bgActive: 'bg-[#3B82F6]/5', text: 'text-[#60A5FA]', numberBg: 'bg-[#3B82F6]/10' },
    { border: 'border-[#10B981]/20', bgActive: 'bg-[#10B981]/5', text: 'text-[#34D399]', numberBg: 'bg-[#10B981]/10' },
    { border: 'border-[#EC4899]/20', bgActive: 'bg-[#EC4899]/5', text: 'text-[#F472B6]', numberBg: 'bg-[#EC4899]/10' },
    { border: 'border-[#F59E0B]/20', bgActive: 'bg-[#F59E0B]/5', text: 'text-[#FBBF24]', numberBg: 'bg-[#F59E0B]/10' },
    { border: 'border-[#8B5CF6]/20', bgActive: 'bg-[#8B5CF6]/5', text: 'text-[#A78BFA]', numberBg: 'bg-[#8B5CF6]/10' },
];

export default function FAQPage() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [openFaq, setOpenFaq] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Filter FAQs based on search
    const filteredGroups = FAQ_GROUPS.map(([groupName, faqs]) => {
        const filteredFaqs = faqs.filter(([q, a]) => 
            q.toLowerCase().includes(searchQuery.toLowerCase()) || 
            a.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return [groupName, filteredFaqs] as [string, [string, string][]];
    }).filter(([_, faqs]) => faqs.length > 0);

    return (
        <div className="frosty-root dark" style={{
            background: 'radial-gradient(circle 800px at 100% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(59, 130, 246, 0.12) 30%, transparent 100%), radial-gradient(circle 800px at 0% 100%, rgba(255, 255, 255, 0.04) 0%, rgba(59, 130, 246, 0.12) 30%, transparent 100%), #000000',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            color: '#fff',
            overflowX: 'hidden',
            position: 'relative'
        }}>
            {/* Global Backgrounds */}
            <ParallaxStarfield />

            <div className="relative z-10">
                {/* NAVBAR */}
                <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center pointer-events-none">
                    <div className="pointer-events-auto transition-all duration-500 w-full" style={{
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
                        <BrandLogo ready={true} />

                        {/* Desktop Nav */}
                        <div className="hidden md:flex" style={{ gap: 14, alignItems: 'center' }}>
                            <Link href="/login" style={{ fontSize: 15, color: '#fff', fontWeight: 600, padding: '10px 18px', borderRadius: 10, transition: 'background 0.2s' }} className="hover:bg-white/10">Log in</Link>
                            <Link href="/login?mode=register" style={{ background: '#5F23C8', padding: '10px 24px', borderRadius: 10, fontSize: 15, color: '#fff', fontWeight: 600, boxShadow: '0 4px 14px rgba(95, 35, 200,0.3)' }} className="hover:scale-105 transition-transform duration-200">Get started free</Link>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            className="flex md:hidden flex-col gap-[5px] p-2 rounded-lg pointer-events-auto"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                            onClick={() => setMobileMenuOpen(v => !v)}
                            aria-label="Toggle menu"
                        >
                            <span className="w-5 h-0.5 bg-white transition-all" style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
                            <span className="w-5 h-0.5 bg-white transition-all" style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
                            <span className="w-5 h-0.5 bg-white transition-all" style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed top-[68px] left-0 right-0 z-40 bg-[#0A0F1E]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl md:hidden pointer-events-auto"
                        >
                            <Link href="/login" className="px-4 py-3 rounded-xl bg-white/5 font-semibold text-center text-white" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                            <Link href="/login?mode=register" className="px-4 py-3 rounded-xl bg-[#5F23C8] font-semibold text-center text-white" onClick={() => setMobileMenuOpen(false)}>Get started free</Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MAIN CONTENT - FAQ Section Redesign */}
                <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 w-full max-w-[1600px] mx-auto flex flex-col relative z-10">
                    
                    {/* Back Button */}
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 w-fit">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>

                    {/* Hero Header */}
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                            <span className="text-[10px] font-bold tracking-widest text-[#34D399] uppercase">Help Center</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-6">
                            Frequently Asked Questions
                        </h1>
                        
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl">
                            Everything you need to know about our AI solutions, security, pricing, and technical capabilities.
                        </p>
                    </div>

                    {/* FAQ Categories */}
                    <div className="flex flex-col gap-24 lg:gap-32 w-full mt-8">
                        {FAQ_GROUPS.map(([group, qs], gIdx) => {
                            const isEven = gIdx % 2 === 1; // 0 is Image Left, 1 is Image Right
                            const imageNames = ["faq_about.png", "faq_setup.png", "faq_daily.png", "faq_trust.png"];

                            return (
                                <motion.div 
                                    key={group} 
                                    initial={{ opacity: 0, y: 80 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Image Side */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                        className="w-full md:w-[55%] relative group"
                                    >
                                        <div className="relative w-full aspect-[16/10] xl:aspect-[21/10] rounded-[2rem] overflow-hidden bg-[#0A0A14] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-hover:border-[#5F23C8]/50 transition-all duration-500">
                                            <img 
                                                src={`/images/${imageNames[gIdx % 4]}`} 
                                                alt={group} 
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                            />
                                            {/* Subtle gradient overlay to blend into dark theme */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-transparent opacity-80"></div>
                                        </div>
                                    </motion.div>
                                    
                                    {/* FAQ Side */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                                        className="w-full md:w-[45%] flex flex-col"
                                    >
                                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8 border-b border-white/10 pb-6">
                                            {group}
                                        </h3>
                                        
                                        <div className="flex flex-col gap-4">
                                            {qs.map(([q, a], i) => {
                                                const globalIndex = FAQ_GROUPS.slice(0, gIdx).reduce((acc, [, faqs]) => acc + faqs.length, 0) + i;
                                                const key = `${gIdx}-${i}`;
                                                const isActive = openFaq === key;
                                                const theme = FAQ_THEMES[globalIndex % FAQ_THEMES.length];
                                                
                                                return (
                                                    <div 
                                                        key={key} 
                                                        className={`w-full rounded-[20px] transition-all duration-300 overflow-hidden ${
                                                            isActive ? `bg-white/[0.04] ${theme.border} border` : 'bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                                                        }`}
                                                    >
                                                        <button
                                                            onClick={() => setOpenFaq(isActive ? null : key)}
                                                            className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none gap-4"
                                                        >
                                                            <div className="flex items-center gap-4 flex-1">
                                                                <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-bold text-sm ${theme.numberBg} ${theme.text}`}>
                                                                    {String(globalIndex + 1).padStart(2, '0')}
                                                                </div>
                                                                <span className={`text-[15px] font-medium leading-snug transition-colors pr-2 ${isActive ? theme.text : 'text-slate-200'}`}>
                                                                    {q}
                                                                </span>
                                                            </div>
                                                            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                                                                isActive ? `${theme.numberBg} ${theme.border} ${theme.text} rotate-180` : 'bg-transparent border-white/10 text-slate-400'
                                                            }`}>
                                                                {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                            </div>
                                                        </button>
                                                        
                                                        <AnimatePresence>
                                                            {isActive && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="px-4 pb-5 pt-1 pl-[4.5rem] text-[14px] leading-relaxed text-slate-400">
                                                                        {a}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </main>
                
                <FooterSection />
            </div>
        </div>
    );
}
