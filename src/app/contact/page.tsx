'use client';

import React from 'react';
import Link from 'next/link';
import BrandLogo from '../BrandLogo';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FCFBF9] text-stone-700 font-sans selection:bg-[#5F23C8]/20">
      <nav className="w-full p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <Link href="/">
          <BrandLogo />
        </Link>
        <Link href="/" className="text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors">
          Back to Home
        </Link>
      </nav>

      <section className="relative w-full py-24 px-6 flex flex-col items-center justify-center border-b border-stone-200 overflow-hidden bg-white/50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#5F23C8]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-stone-600 text-lg">
            Talk to our AI engineering team or schedule a personalized architecture walkthrough.
          </p>
        </div>
      </section>

      <section className="max-w-xl mx-auto py-16 px-6">
        <form className="space-y-6 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Your Name</label>
            <input type="text" placeholder="Jane Doe" className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-none focus:border-[#5F23C8]" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Work Email</label>
            <input type="email" placeholder="jane@company.com" className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-none focus:border-[#5F23C8]" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Message</label>
            <textarea rows={4} placeholder="Tell us about your pipeline and monthly conversation volume..." className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-none focus:border-[#5F23C8]" />
          </div>
          <button type="submit" className="w-full py-4 bg-[#5F23C8] text-white font-bold rounded-xl shadow-lg shadow-[#5F23C8]/30 hover:bg-[#4C1D95] transition-all">
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
