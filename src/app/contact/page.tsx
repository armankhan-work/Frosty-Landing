'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Sparkles,
  PhoneCall,
  MessageSquare,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Building2,
  Clock,
  ArrowDown,
} from 'lucide-react';
import GlassNavbar from '@/components/GlassNavbar';
import FooterSection from '../FooterSection';
import GoogleCalendarScheduler from '@/components/GoogleCalendarScheduler';
import { ParallaxStarfield } from '@/components/FrostyEngineHero';
import '../FrostyPage.css';

const REACH_TARGETS = [
  'Sales Enquiry',
  'Project Enquiry',
  'Partnerships',
  'Support',
  'Careers',
  'Other',
];

const CONTACT_INFO_CARDS = [
  {
    icon: PhoneCall,
    label: 'PHONE',
    value: '+91 6399999955',
    subValue: '+1 (856) 942-3661',
    href: 'tel:+916399999955',
    color: 'text-[#0396A6] bg-[#0396A6]/10 border-[#0396A6]/20',
  },
  {
    icon: Mail,
    label: 'EMAIL',
    value: 'contact@frostrek.com',
    subValue: 'sales@frostrek.com',
    href: 'mailto:contact@frostrek.com',
    color: 'text-[#027D8A] bg-[#027D8A]/10 border-[#027D8A]/20',
  },
  {
    icon: MapPin,
    label: 'OFFICE ADDRESS',
    value: '4th Floor, JMD Empire, Sec 62, Gurugram, India (HQ)',
    subValue: '701 Tillery St Unit 12, Austin, TX 78702, USA',
    href: '#',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    icon: Clock,
    label: 'OPERATING HOURS',
    value: 'Mon – Fri: 9am – 6pm EST',
    subValue: '24/7 AI Availability on Web & WhatsApp',
    href: '#',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    icon: Building2,
    label: 'LEGAL ENTITY',
    value: 'Frostrek Technologies Inc.',
    subValue: 'Registered & Certified Enterprise AI Provider',
    href: '#',
    color: 'text-[#FF7A5E] bg-[#FF7A5E]/10 border-[#FF7A5E]/20',
  },
];

// Stagger animation container
const heroContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    jobRole: '',
    workEmail: '',
    reachTarget: 'Sales Enquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      companyName: '',
      jobRole: '',
      workEmail: '',
      reachTarget: 'Sales Enquiry',
      message: '',
    });
    setIsSubmitted(false);
  };

  const scrollToContent = () => {
    const el = document.getElementById('contact-content');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fx-root min-h-screen bg-[#FFFFFF] text-[#0A1A2F] selection:bg-[#0396A6]/15 selection:text-[#0396A6] relative overflow-hidden flex flex-col justify-between">
      {/* ── Ambient Background Depth ── */}
      <ParallaxStarfield />
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#0396A6]/8 via-[#0396A6]/3 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[45%] right-[-10%] w-[450px] h-[450px] bg-[#FF7A5E]/4 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-[#0396A6]/6 blur-[110px] rounded-full" />
      </div>

      {/* ── Glass Navbar ── */}
      <GlassNavbar />

      <main className="w-full relative z-10">
        {/* ══════════════════════════════════════════════════════════════════
            HERO SECTION: FULL VIEWPORT HERO WITH CENTERED SPACING
        ══════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[96vh] sm:min-h-screen flex flex-col items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0396A60A_1px,transparent_1px),linear-gradient(to_bottom,#0396A60A_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_48%,#000_70%,transparent_100%)] pointer-events-none" />

          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center max-w-4xl mx-auto"
          >
            {/* Eyebrow */}
            <motion.div variants={heroItem} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-[#0396A6] bg-[#0396A6]/[0.08] border border-[#0396A6]/20 backdrop-blur-sm shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0396A6]" />
                <span>LET'S START A CONVERSATION</span>
              </div>
            </motion.div>

            {/* Main Hero Headline */}
            <motion.h1
              variants={heroItem}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-serif font-bold text-[#0A1A2F] leading-[1.06] tracking-tight mb-7"
            >
              Let's Start With the <span className="text-[#0396A6] font-semibold">Problem.</span>
            </motion.h1>

            {/* Subtitle / Description */}
            <motion.p
              variants={heroItem}
              className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mb-9 font-sans"
            >
              Whether you are seeking an operational diagnostic to understand why lead conversion is stalling, looking to optimize workflows with 24/7 Web &amp; WhatsApp AI agents, or executing an enterprise-grade technical solution, the first step is understanding the problem clearly. Tell us what you are working through, where friction exists, or book a live discovery session.
            </motion.p>

            {/* Hero Action Button */}
            <motion.div variants={heroItem} className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={scrollToContent}
                className="group px-8 py-4 rounded-xl font-semibold text-xs sm:text-sm bg-[#0396A6] hover:bg-[#027D8A] text-white shadow-lg shadow-[#0396A6]/25 transition-all flex items-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Start the Conversation</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <span className="text-[11px] font-semibold text-slate-400 mt-2">
                Scroll to message form &amp; Google Calendar booking
              </span>
            </motion.div>
          </motion.div>

          {/* Bottom Floating Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: [0.4, 0.9, 0.4], y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            onClick={scrollToContent}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer p-2 text-slate-400 hover:text-[#0396A6] transition-colors"
          >
            <div className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#0396A6]" />
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            2-COLUMN SECTION: SEND US A MESSAGE & GOOGLE CALENDAR (SCROLL REVEAL)
        ══════════════════════════════════════════════════════════════════ */}
        <section id="contact-content" className="pt-8 sm:pt-12 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* ── LEFT COLUMN: SEND US A MESSAGE FORM & DIRECT CONTACT CARDS ── */}
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex flex-col space-y-6"
            >
              {/* Message Form Card */}
              <div className="p-6 sm:p-8 md:p-9 rounded-3xl bg-white border border-slate-200/80 shadow-sm relative overflow-hidden">
                {/* Top Accent Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0396A6] via-[#027D8A] to-[#FF7A5E]" />

                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A1A2F] tracking-tight">
                    Send us a message
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Fill in your details below and our team will get back to you promptly.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-12 px-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center flex flex-col items-center space-y-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div className="space-y-1 max-w-md">
                        <h3 className="text-xl font-bold text-emerald-950">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                          Thank you for reaching out, <strong>{formData.fullName || 'there'}</strong>. Our engineering &amp; strategy team will review your enquiry and respond within 24 hours.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-100 transition-all shadow-2xs cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form key="form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                      
                      {/* Row 1: Full Name */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          FULL NAME <span className="text-[#FF7A5E]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 text-[#0A1A2F] placeholder:text-slate-400 focus:outline-none focus:border-[#0396A6] focus:bg-white focus:ring-2 focus:ring-[#0396A6]/20 transition-all"
                        />
                      </div>

                      {/* Row 2: Company & Job Role */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            COMPANY <span className="text-[#FF7A5E]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Acme Corp"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 text-[#0A1A2F] placeholder:text-slate-400 focus:outline-none focus:border-[#0396A6] focus:bg-white focus:ring-2 focus:ring-[#0396A6]/20 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            JOB ROLE <span className="text-[#FF7A5E]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Director"
                            value={formData.jobRole}
                            onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                            className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 text-[#0A1A2F] placeholder:text-slate-400 focus:outline-none focus:border-[#0396A6] focus:bg-white focus:ring-2 focus:ring-[#0396A6]/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 3: Work Email */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          WORK EMAIL <span className="text-[#FF7A5E]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="john@acmecorp.com"
                          value={formData.workEmail}
                          onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                          className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 text-[#0A1A2F] placeholder:text-slate-400 focus:outline-none focus:border-[#0396A6] focus:bg-white focus:ring-2 focus:ring-[#0396A6]/20 transition-all"
                        />
                      </div>

                      {/* Row 4: Reach Target Category */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          WHO ARE YOU TRYING TO REACH?
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {REACH_TARGETS.map((target) => {
                            const isSelected = formData.reachTarget === target;
                            return (
                              <button
                                type="button"
                                key={target}
                                onClick={() => setFormData({ ...formData, reachTarget: target })}
                                className={`p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                                  isSelected
                                    ? 'bg-[#0396A6]/10 border-[#0396A6] text-[#0396A6] shadow-xs'
                                    : 'bg-slate-50/70 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <div
                                  className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                                    isSelected ? 'border-[#0396A6] bg-[#0396A6]' : 'border-slate-300 bg-white'
                                  }`}
                                >
                                  {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                                </div>
                                <span className="truncate">{target}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Row 5: Message */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          MESSAGE <span className="text-[#FF7A5E]">*</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="What business outcome are you trying to achieve, or where is work currently getting stuck?"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 text-[#0A1A2F] placeholder:text-slate-400 focus:outline-none focus:border-[#0396A6] focus:bg-white focus:ring-2 focus:ring-[#0396A6]/20 transition-all resize-y"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl font-semibold text-xs sm:text-sm bg-[#0396A6] hover:bg-[#027D8A] text-white shadow-md shadow-[#0396A6]/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Start the Conversation</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct Info Cards Grid (Phone, Email, Office, Hours, Legal) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {CONTACT_INFO_CARDS.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5 ${
                        idx === 2 ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${card.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          {card.label}
                        </span>
                        {card.href !== '#' ? (
                          <a
                            href={card.href}
                            className="text-xs font-bold text-[#0A1A2F] hover:text-[#0396A6] transition-colors block truncate"
                          >
                            {card.value}
                          </a>
                        ) : (
                          <div className="text-xs font-bold text-[#0A1A2F] leading-snug">
                            {card.value}
                          </div>
                        )}
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {card.subValue}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </motion.div>

            {/* ── RIGHT COLUMN: GOOGLE CALENDAR APPOINTMENT SCHEDULER ── */}
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 h-full"
            >
              <GoogleCalendarScheduler />
            </motion.div>

          </div>
        </section>
      </main>

      {/* ── Global Footer ── */}
      <FooterSection />
    </div>
  );
}
