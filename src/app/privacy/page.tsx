import React from 'react';
import Link from 'next/link';
import BrandLogo from '../BrandLogo';

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-stone-600 text-lg">
            How we protect, process, and respect your data across enterprise AI workflows.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-16 px-6 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Data Encryption & Isolation</h2>
          <p className="leading-relaxed">
            All customer dialogues and CRM records are encrypted in transit with TLS 1.3 and at rest with AES-256 keys. Tenant knowledge vectors are strictly partitioned.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Zero Training Guarantee</h2>
          <p className="leading-relaxed">
            Your proprietary business information and private conversation data are never used to train public base models.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Data Retention and Export</h2>
          <p className="leading-relaxed">
            You maintain full ownership of all captured leads and conversations, with real-time export and purge capabilities via your dashboard.
          </p>
        </div>
      </section>
    </main>
  );
}
