'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  PhoneCall,
  MessageSquare,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Building2,
  Globe2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import GlassNavbar from '@/components/GlassNavbar';
import FooterSection from '../FooterSection';
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

const GLOBAL_OFFICES = [
  {
    country: 'India (HQ)',
    isHq: true,
    address: '4th Floor, Unit No. 455, JMD Empire, Sector 62, Gurugram, Haryana 122102',
    accent: 'border-emerald-500/30 hover:border-emerald-500/60',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    country: 'USA',
    isHq: false,
    address: '701 Tillery Street Unit 12-3227, Austin, Texas 78702, United States',
    accent: 'border-[#0396A6]/30 hover:border-[#0396A6]/60',
    tagColor: 'bg-[#0396A6]/10 text-[#0396A6] border-[#0396A6]/20',
  },
  {
    country: 'UK',
    isHq: false,
    address: '24 - 26 Arcadia Avenue, Fin009/8701, London, United Kingdom, N3 2JU',
    accent: 'border-[#FF7A5E]/30 hover:border-[#FF7A5E]/60',
    tagColor: 'bg-[#FF7A5E]/10 text-[#FF7A5E] border-[#FF7A5E]/20',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    jobTitle: '',
    workEmail: '',
    reachTarget: 'Sales Enquiry',
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate reliable submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      companyName: '',
      jobTitle: '',
      workEmail: '',
      reachTarget: 'Sales Enquiry',
      details: '',
    });
    setIsSubmitted(false);
  };

  return (
    <div className="fx-root min-h-screen bg-[#FCFBF9] text-[#0A1A2F] selection:bg-[#0396A6]/15 selection:text-[#0396A6] relative overflow-hidden flex flex-col justify-between">
      {/* ── Ambient Background Depth ── */}
      <ParallaxStarfield />
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#0396A6]/8 via-[#0396A6]/3 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-[#FF7A5E]/4 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-[#0396A6]/6 blur-[110px] rounded-full" />
      </div>

      {/* ── Glass Navbar ── */}
      <GlassNavbar />

      {/* ── Main Content ── */}
      <main className="pt-28 sm:pt-32 md:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ══════════════════════════════════════════════════════════════════
              LEFT COLUMN: HERO HEADLINE & DIRECT CONNECT & OFFICES
          ══════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col space-y-7"
          >
            {/* Header / Intro */}
            <div className="space-y-3.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-[#0396A6] bg-[#0396A6]/10 border border-[#0396A6]/20">
                <Sparkles className="w-3.5 h-3.5" />
                GET IN TOUCH
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#0A1A2F] leading-[1.12] tracking-tight">
                Let's Start a <br className="hidden sm:inline" />
                <span className="text-[#0396A6]">Conversation</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-md" style={{ marginTop: '16px' }}>
                Have a project in mind or want to explore how AI can transform your business? We're here to help.
              </p>
            </div>

            {/* Direct Connect Section */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#0A1A2F] tracking-tight">
                Direct Connect
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Phone */}
                <a
                  href="tel:+916399999955"
                  className="p-4 rounded-2xl bg-[#FF7A5E]/5 border border-[#FF7A5E]/20 hover:border-[#FF7A5E]/40 hover:bg-[#FF7A5E]/10 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#FF7A5E]/15 flex items-center justify-center text-[#FF7A5E] group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-[#FF7A5E] uppercase mt-2.5">
                    CALL US
                  </span>
                  <span className="text-xs font-semibold text-[#0A1A2F] group-hover:text-[#FF7A5E] transition-colors mt-0.5">
                    +91 6399999955
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/17574722491"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#0396A6]/5 border border-[#0396A6]/20 hover:border-[#0396A6]/40 hover:bg-[#0396A6]/10 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#0396A6]/15 flex items-center justify-center text-[#0396A6] group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-[#0396A6] uppercase mt-2.5">
                    WHATSAPP
                  </span>
                  <span className="text-xs font-semibold text-[#0A1A2F] group-hover:text-[#0396A6] transition-colors mt-0.5">
                    +1 757 472 2491
                  </span>
                </a>
              </div>

              {/* Email */}
              <a
                href="mailto:contact@frostrek.com"
                className="p-4 rounded-2xl bg-[#027D8A]/5 border border-[#027D8A]/20 hover:border-[#027D8A]/40 hover:bg-[#027D8A]/10 transition-all flex flex-col items-center text-center group w-full"
              >
                <div className="w-9 h-9 rounded-full bg-[#027D8A]/15 flex items-center justify-center text-[#027D8A] group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-[#027D8A] uppercase mt-2">
                  EMAIL US
                </span>
                <span className="text-xs font-semibold text-[#0A1A2F] group-hover:text-[#027D8A] transition-colors mt-0.5">
                  contact@frostrek.com
                </span>
              </a>
            </div>

            {/* Global Offices Section */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#0A1A2F] tracking-tight">
                  Global Offices
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  3 Worldwide Hubs
                </span>
              </div>

              <div className="space-y-2.5">
                {GLOBAL_OFFICES.map((office) => (
                  <div
                    key={office.country}
                    className={`p-3.5 rounded-2xl bg-slate-50/70 border ${office.accent} transition-all space-y-1`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0A1A2F] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0396A6]" />
                        {office.country}
                      </span>
                      {office.isHq && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-5">
                      {office.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT COLUMN: SEND US A MESSAGE FORM
          ══════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="p-7 sm:p-9 md:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-sm relative overflow-hidden">
              
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0396A6] via-[#027D8A] to-[#FF7A5E]" />

              <div className="mb-7">
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#0A1A2F] tracking-tight">
                  Send Us a Message
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1" style={{ marginTop: '6px' }}>
                  Please fill in the form below and we'll connect shortly.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  /* ── Success Banner ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 px-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center flex flex-col items-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1 max-w-md">
                      <h3 className="text-xl font-bold text-emerald-950 font-serif">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                        Thank you for reaching out, <strong>{formData.firstName || 'there'}</strong>. Our engineering &amp; strategy team will review your enquiry and respond within 24 hours.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-100 transition-all shadow-2xs"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  /* ── Contact Form ── */
                  <form key="form" onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Row 1: First Name & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          FIRST NAME <span className="text-[#FF7A5E]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 text-[#0A1A2F] placeholder:text-slate-400 focus:outline-none focus:border-[#0396A6] focus:bg-white focus:ring-2 focus:ring-[#0396A6]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          LAST NAME <span className="text-[#FF7A5E]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 text-[#0A1A2F] placeholder:text-slate-400 focus:outline-none focus:border-[#0396A6] focus:bg-white focus:ring-2 focus:ring-[#0396A6]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Company Name & Job Title */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          COMPANY NAME
                        </label>
                        <input
                          type="text"
                          placeholder="Acme Corp"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 text-[#0A1A2F] placeholder:text-slate-400 focus:outline-none focus:border-[#0396A6] focus:bg-white focus:ring-2 focus:ring-[#0396A6]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          JOB TITLE
                        </label>
                        <input
                          type="text"
                          placeholder="Director of Operations"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
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
                        placeholder="john.doe@company.com"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 text-[#0A1A2F] placeholder:text-slate-400 focus:outline-none focus:border-[#0396A6] focus:bg-white focus:ring-2 focus:ring-[#0396A6]/20 transition-all"
                      />
                    </div>

                    {/* Row 4: Who are you trying to reach? */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
                        WHO ARE YOU TRYING TO REACH? <span className="text-[#FF7A5E]">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {REACH_TARGETS.map((target) => {
                          const isSelected = formData.reachTarget === target;
                          return (
                            <button
                              type="button"
                              key={target}
                              onClick={() => setFormData({ ...formData, reachTarget: target })}
                              className={`p-3 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition-all border ${
                                isSelected
                                  ? 'bg-[#0396A6]/10 border-[#0396A6] text-[#0396A6] shadow-xs'
                                  : 'bg-slate-50/70 border-slate-200/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                              }`}
                            >
                              <div
                                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                  isSelected ? 'border-[#0396A6] bg-[#0396A6]' : 'border-slate-300 bg-white'
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <span className="truncate">{target}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Row 5: Details / Message */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        PLEASE PROVIDE DETAILS REGARDING YOUR ENQUIRY <span className="text-[#FF7A5E]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us a bit more about what you're looking for..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 text-[#0A1A2F] placeholder:text-slate-400 focus:outline-none focus:border-[#0396A6] focus:bg-white focus:ring-2 focus:ring-[#0396A6]/20 transition-all resize-y"
                      />
                    </div>

                    {/* Legal note */}
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      By submitting this form, your information will be processed securely and in strict accordance with our{' '}
                      <Link href="/privacy" className="text-[#0396A6] underline hover:text-[#027D8A]">
                        Privacy Policy
                      </Link>
                      .
                    </p>

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
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </main>

      {/* ── Global Footer ── */}
      <FooterSection />
    </div>
  );
}
