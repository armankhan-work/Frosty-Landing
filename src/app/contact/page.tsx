import React from 'react';
import Link from 'next/link';
import BrandLogo from '../BrandLogo';

export default function ContactPage() {
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
            Contact Us
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Get in touch with the Frosty team
          </p>
        </div>
      </section>

      <section className="w-full py-24 px-6">
        <div className="max-w-3xl mx-auto">
          
          <div className="flex flex-col items-start gap-4 mb-12">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">Frostrek</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 border border-orange-500/30 text-orange-400 text-xs font-bold rounded-full bg-orange-500/5">ISO 27001</span>
                <span className="px-3 py-1 border border-orange-500/30 text-orange-400 text-xs font-bold rounded-full bg-orange-500/5">ISO 9001</span>
              </div>
            </div>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              Empowering industries through AI, automation, and innovation - one intelligent solution at a time
            </p>
          </div>

          <p className="mb-8 text-slate-300">Have questions about deploying Frosty? Need enterprise support or a custom SLA? We are here to help.</p>
          
          <div className="flex flex-col gap-6">
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
              <h3 className="font-bold text-white mb-2 text-lg">General Inquiries</h3>
              <p className="text-slate-400 mb-4">For general questions about Frosty, pricing, and capabilities.</p>
              <a href="mailto:info@frostrek.com" className="text-[#635A80] font-bold hover:underline">info@frostrek.com</a>
            </div>
            
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
              <h3 className="font-bold text-white mb-2 text-lg">Technical Support</h3>
              <p className="text-slate-400 mb-4">For assistance with integrations, API keys, or agent logic.</p>
              <a href="mailto:info@frostrek.com" className="text-[#635A80] font-bold hover:underline">info@frostrek.com</a>
            </div>
          </div>
          
          <div className="mt-12 text-center border-t border-white/[0.06] pt-12">
            <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-4">Corporate Headquarters</p>
            <p className="text-white font-medium">Frostrek LLP</p>
            <p className="text-slate-400">JMD Empire, Golf Course Extension Road,</p>
            <p className="text-slate-400">Gurgaon, Haryana 122002, IN</p>
          </div>
        </div>
      </section>
      
      <footer className="w-full py-12 border-t border-white/[0.06] text-center text-sm text-slate-600 font-medium">
        © 2021 Frostrek LLP. All rights reserved.
      </footer>
    </main>
  );
}
