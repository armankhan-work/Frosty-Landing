import React from 'react';
import Link from 'next/link';
import BrandLogo from '../BrandLogo';

export default function StatusPage() {
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
            System Status
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Real-time Operational Uptime for Frosty Platform
          </p>
        </div>
      </section>

      <section className="w-full py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-10 p-6 bg-[#635A80]/5 border border-[#635A80]/20 rounded-2xl">
            <div className="w-4 h-4 rounded-full bg-[#635A80] animate-pulse shadow-[0_0_15px_#635A80]"></div>
            <span className="text-xl font-bold text-[#635A80]">All Systems Operational</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
              <h3 className="font-bold text-white mb-2">Core API & Routing</h3>
              <p className="text-[#25D366] font-mono text-sm">Operational (100% Uptime)</p>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
              <h3 className="font-bold text-white mb-2">WhatsApp Integration</h3>
              <p className="text-[#25D366] font-mono text-sm">Operational (100% Uptime)</p>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
              <h3 className="font-bold text-white mb-2">LLM Inference Engine</h3>
              <p className="text-[#25D366] font-mono text-sm">Operational (100% Uptime)</p>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
              <h3 className="font-bold text-white mb-2">Web Widgets</h3>
              <p className="text-[#25D366] font-mono text-sm">Operational (100% Uptime)</p>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="w-full py-12 border-t border-white/[0.06] text-center text-sm text-slate-600 font-medium">
        © 2026 Frostrek LLP. All rights reserved.
      </footer>
    </main>
  );
}
