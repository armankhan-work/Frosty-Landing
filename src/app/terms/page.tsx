import React from 'react';
import Link from 'next/link';
import BrandLogo from '../BrandLogo';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-[#635A80]/30">
      <nav className="w-full p-6 border-b border-white/[0.06] flex items-center justify-between sticky top-0 bg-[#030712]/80 backdrop-blur-xl z-50">
        <Link href="/">
          <BrandLogo />
        </Link>
        <Link href="/" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
          Back to Home
        </Link>
      </nav>

      <section className="relative w-full py-24 px-6 flex flex-col items-center justify-center border-b border-white/[0.06] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#635A80]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Frosty Platform Documentation & Policies
          </p>
        </div>
      </section>

      <section className="w-full py-24 px-6">
        <div className="max-w-3xl mx-auto text-base text-slate-300 leading-relaxed">
          <p className="mb-6">By accessing and using the Frosty platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.</p>
          <h2 className="text-2xl font-bold text-white mb-4 mt-12">1. Service Provision</h2>
          <p className="mb-6">Frosty provides AI-driven agent automation software. We grant you a non-exclusive, non-transferable license to use our platform in accordance with your subscription plan.</p>
          <h2 className="text-2xl font-bold text-white mb-4 mt-12">2. Acceptable Use</h2>
          <p className="mb-6">You agree not to use Frosty agents to distribute spam, engage in illegal activities, or violate the terms of service of connected platforms (such as Meta/WhatsApp or Slack).</p>
          <h2 className="text-2xl font-bold text-white mb-4 mt-12">3. API & Usage Limits</h2>
          <p className="mb-6">Usage is billed based on token consumption and message limits. Frosty reserves the right to throttle or suspend accounts that exceed their allocated bandwidth or violate API abuse policies.</p>
        </div>
      </section>
      
      <footer className="w-full py-12 border-t border-white/[0.06] text-center text-sm text-slate-600 font-medium">
        © 2021 Frostrek LLP. All rights reserved.
      </footer>
    </main>
  );
}
