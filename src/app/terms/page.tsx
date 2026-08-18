import React from 'react';
import Link from 'next/link';
import BrandLogo from '../BrandLogo';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-stone-700 font-sans selection:bg-[#0396A6]/20">
      <nav className="w-full p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <Link href="/">
          <BrandLogo />
        </Link>
        <Link href="/" className="text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors">
          Back to Home
        </Link>
      </nav>

      <section className="relative w-full py-24 px-6 flex flex-col items-center justify-center border-b border-stone-200 overflow-hidden bg-white/50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0396A6]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-stone-600 text-lg">
            Last updated: February 2025. Please review our service terms and operating guidelines.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-16 px-6 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Agreement to Terms</h2>
          <p className="leading-relaxed">
            By accessing or using Frosty’s autonomous pipelines and intelligence engines, you agree to be bound by these Terms. If you disagree with any part, you may not access the service.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Autonomous Actions & Verification</h2>
          <p className="leading-relaxed">
            Frosty acts on behalf of your pipeline to answer inquiries and book meetings. You maintain governance over knowledge bounds and integration permissions.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Termination</h2>
          <p className="leading-relaxed">
            We reserve the right to suspend or terminate accounts that violate our API terms, acceptable use policies, or deploy hostile automated traffic.
          </p>
        </div>
      </section>
    </main>
  );
}
