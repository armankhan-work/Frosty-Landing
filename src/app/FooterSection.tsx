
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, MapPin, ExternalLink } from 'lucide-react';
import FrostyIcon from '@/components/FrostyIcon';

const FlipText = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
  <span className={className} style={style}>{children}</span>
);

const NAV_ITEMS = [
  {
    label: 'Products',
    megaMenu: [
      {
        items: [
          { name: 'Frosty Web Agent', href: '/#two-agents' },
          { name: 'Frosty WhatsApp Agent', href: '/#two-agents' },
          { name: 'Unified Channels', href: '/#unified-channels' },
          { name: 'CRM & Lead Intelligence', href: '/#crm' }
        ]
      }
    ]
  },
  {
    label: 'Solutions',
    megaMenu: [
      {
        items: [
          { name: 'AI Agents', href: 'https://www.frostrek.ai/solutions/ai-agents' },
          { name: 'Manufacturing Intelligence', href: 'https://www.frostrek.ai/solutions/manufacturing-intelligence' },
          { name: 'Voice AI', href: 'https://www.frostrek.ai/solutions/voice-ai' },
          { name: 'Fintech & Custom Wallets', href: 'https://www.frostrek.ai/solutions/fintech-and-custom-wallets' },
          { name: 'Multivendor Dashboard', href: 'https://www.frostrek.ai/solutions/multivendor-dashboard' },
          { name: 'LLM Model Training', href: 'https://www.frostrek.ai/solutions/llm-model-training' }
        ]
      }
    ]
  }
];

const COMPANY_INFO = {
  name: "Frostrek",
  address: "4th Floor, Jmd Empire, 455, Golf Course Ext Rd, Sector 62, Gurugram, Haryana 122102, India",
  contact: "contact@frostrek.ai",
  socials: {
    linkedin: "https://www.linkedin.com/company/frostrek/",
    instagram: "https://www.instagram.com/frostrekai",
    whatsapp: "https://wa.me/916399999955",
    facebook: "https://www.facebook.com/people/Frostrek-Ai/pfbid0VrxpmzPP7zNRjztYScYUHgSVp1vYcryckLy7hY2jbe9jRnLXoC2KgSJWDzAD9irWl/",
    youtube: "https://www.youtube.com/@frostrekai"
  }
};

const FooterSection = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  const footerRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const handleLocationClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(COMPANY_INFO.address), '_blank');
  };

  return (
    <>
      <style>{`
        @keyframes footerReveal { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes underlineExpand { from { width: 0; } to { width: 100%; } }
        @keyframes linkFadeIn { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes networkPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }

        .footer-revealed { animation: footerReveal 300ms ease-out forwards; }
        .section-title { position: relative; display: inline-block; }
        .section-title::after { content: ''; position: absolute; bottom: -4px; left: 0; height: 2px; background: #0396A6; width: 0; }
        .footer-revealed .section-title::after { animation: underlineExpand 400ms ease-out 150ms forwards; }
        .footer-link { position: relative; display: inline-block; transition: color 150ms ease-out; }
        .footer-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform 200ms ease-out; }
        .footer-link:hover::after { transform: scaleX(1); }
        .footer-revealed .footer-link { animation: linkFadeIn 300ms ease-out forwards; }
        
        .careers-card { transition: all 300ms ease-out; }
        .careers-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(3, 150, 166,0.1); }
        .careers-card:active { transform: translateY(2px); }
        .careers-icon { transition: opacity 200ms ease-out; }
        .careers-card:hover .careers-icon { opacity: 1; }
      `}</style>


      <footer
        ref={footerRef}
        className={`border-t pt-8 pb-3 transition-colors duration-300 font-sans ${isVisible ? 'footer-revealed' : 'opacity-0'} bg-white/70 backdrop-blur-md border-slate-200 relative z-10`}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 mb-4">

            <div className="lg:col-span-3 flex flex-col space-y-4">
              <div className="flex items-center gap-2 group">
                <Link href="/" className="flex items-center gap-2 cursor-pointer">
                  <div className="transition-transform group-hover:scale-110">
                    <FrostyIcon size={32} glow={0.5} />
                  </div>
                </Link>
                <div className="flex flex-col justify-center">
                  <Link href="/" className="cursor-pointer">
                    <FlipText className="text-[1.65rem] font-serif font-bold text-slate-900 leading-tight" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                      Frosty Agent
                    </FlipText>
                  </Link>
                  <a 
                    href="https://www.frostrek.ai/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[11px] font-medium !text-slate-500 hover:!text-[#0396A6] mt-0.5 transition-colors relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Powered by Frostrek
                  </a>
                </div>
              </div>

              <div className="flex flex-col w-full max-w-[340px] gap-4">
                {/* Social Links Row */}
                <div className="flex items-center justify-between w-full">
                  <a
                    href={COMPANY_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/80 hover:bg-[#0077B5]/10 hover:border-[#0077B5]/50 hover:shadow-[0_0_16px_rgba(0,119,181,0.35)] shadow-xs flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 group"
                  >
                    <img src="/linkedin.png" alt="Linkedin" className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110" loading="lazy" width={512} height={512} />
                  </a>

                  <a
                    href={COMPANY_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/80 hover:bg-[#E4405F]/10 hover:border-[#E4405F]/50 hover:shadow-[0_0_16px_rgba(228,64,95,0.35)] shadow-xs flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 group"
                  >
                    <img src="/instagram.png" alt="Instagram" className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110" loading="lazy" width={512} height={512} />
                  </a>

                  <a
                    href={COMPANY_INFO.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/80 hover:bg-[#25D366]/10 hover:border-[#25D366]/50 hover:shadow-[0_0_16px_rgba(37,211,102,0.35)] shadow-xs flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 group"
                  >
                    <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110" loading="lazy" width={512} height={512} />
                  </a>

                  <a
                    href="tel:+916399999955"
                    aria-label="Call us"
                    className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/80 hover:bg-[#1877F2]/10 hover:border-[#1877F2]/50 hover:shadow-[0_0_16px_rgba(24,119,242,0.35)] shadow-xs flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="transition-transform duration-300 group-hover:scale-110">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#1877F2" />
                    </svg>
                  </a>

                  <a
                    href={`mailto:${COMPANY_INFO.contact}`}
                    aria-label="Email"
                    className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/80 hover:bg-[#EA4335]/10 hover:border-[#EA4335]/50 hover:shadow-[0_0_16px_rgba(234,67,53,0.35)] shadow-xs flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 group"
                  >
                    <img src="/gmail.png" alt="Gmail" className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110" loading="lazy" width={512} height={512} />
                  </a>

                  <a
                    href={COMPANY_INFO.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/80 hover:bg-[#1877F2]/10 hover:border-[#1877F2]/50 hover:shadow-[0_0_16px_rgba(24,119,242,0.35)] shadow-xs flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="transition-transform duration-300 group-hover:scale-110">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
                    </svg>
                  </a>
                </div>

                {/* ISO / Compliance Certifications Row */}
                <div className="flex items-center gap-3 pt-0.5">
                  <div
                    aria-label="ISO 27001:2022 Certified"
                    className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/80 hover:bg-[#0070BA]/10 hover:border-[#0070BA]/50 hover:shadow-[0_0_16px_rgba(0,112,186,0.35)] shadow-xs flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 cursor-pointer group"
                  >
                    <img
                      src="/ISO 27001.png"
                      alt="ISO 27001"
                      style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                      className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110 shrink-0"
                      loading="lazy"
                    />
                  </div>

                  <div
                    aria-label="GDPR-ready"
                    className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/80 hover:bg-[#003399]/10 hover:border-[#003399]/50 hover:shadow-[0_0_16px_rgba(0,51,153,0.35)] shadow-xs flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 cursor-pointer group"
                  >
                    <img
                      src="/gdpr logo.jpg"
                      alt="GDPR-ready"
                      style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                      className="w-6 h-6 object-cover rounded-full transition-transform duration-300 group-hover:scale-110 shrink-0"
                      loading="lazy"
                    />
                  </div>

                  <div
                    aria-label="ISO 9001:2015 Certified"
                    className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/80 hover:bg-[#0070BA]/10 hover:border-[#0070BA]/50 hover:shadow-[0_0_16px_rgba(0,112,186,0.35)] shadow-xs flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 cursor-pointer group"
                  >
                    <img
                      src="/ISO_9001-2015.svg.webp"
                      alt="ISO 9001"
                      style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                      className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110 shrink-0"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <h3 className="section-title font-bold text-[10px] uppercase tracking-widest text-[#0396A6]">Products</h3>
                <ul className="space-y-1">
                  {NAV_ITEMS.find(n => n.label === 'Products')?.megaMenu?.flatMap(s => s.items).slice(0, 7).map(item => (
                    <li key={item.name}>
                      <Link href={item.href} className="footer-link text-[13px] font-medium text-slate-600 hover:text-[#0396A6] group">
                        <FlipText>{item.name}</FlipText>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1">
                <h3 className="section-title font-bold text-[10px] uppercase tracking-widest text-[#0396A6]">Solutions</h3>
                <ul className="space-y-1">
                  {NAV_ITEMS.find(n => n.label === 'Solutions')?.megaMenu?.flatMap(s => s.items).map(item => (
                    <li key={item.name}>
                      <Link href={item.href} className="footer-link text-[13px] font-medium text-slate-600 hover:text-[#0396A6] group">
                        <FlipText>{item.name}</FlipText>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1">
                <h3 className="section-title font-bold text-[10px] uppercase tracking-widest text-[#0396A6]">Company</h3>
                <ul className="space-y-1">
                  <li><Link href="/about" className="footer-link text-[13px] font-medium text-slate-600 hover:text-[#0396A6] group"><FlipText>About Us</FlipText></Link></li>
                  <li><Link href="https://www.frostrek.ai/experience" className="footer-link text-[13px] font-medium text-slate-600 hover:text-[#0396A6] group"><FlipText>Experience</FlipText></Link></li>
                  <li><Link href="/faq" className="footer-link text-[13px] font-medium text-slate-600 hover:text-[#0396A6] group"><FlipText>FAQ</FlipText></Link></li>
                  <li><Link href="/contact" className="footer-link text-[13px] font-medium text-slate-600 hover:text-[#0396A6] group"><FlipText>Book Demo & Contact</FlipText></Link></li>
                </ul>
              </div>

              <div className="space-y-1">
                <div className="text-center">
                  <h3 className="section-title font-bold text-[10px] uppercase tracking-widest text-[#0396A6]">Location</h3>
                </div>
                <div
                  ref={locationRef}
                  onClick={handleLocationClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLocationClick(); }}
                  className="relative w-full h-36 md:h-44 mx-auto rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-50 cursor-pointer transition-all duration-300 group hover:border-[#0396A6]/40 select-none"
                >
                  <svg className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <rect width="400" height="200" fill="#F8FAFC" />
                    <path d="M-20 60 C80 90, 160 30, 240 70 C320 110, 380 40, 420 80 L420 220 L-20 220 Z" fill="#EEF2F6" />
                    <path d="M-10 40 L410 160" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
                    <path d="M120 -10 L190 210" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
                    <path d="M-10 130 L410 70" stroke="#E2E8F0" strokeWidth="4" />
                    <path d="M280 -10 L250 210" stroke="#E2E8F0" strokeWidth="5" />
                    <path d="M-10 95 L410 115" stroke="#94A3B8" strokeWidth="3" strokeDasharray="4 4" />
                    <rect x="140" y="70" width="35" height="25" rx="3" fill="#0396A6" fillOpacity="0.1" />
                    <rect x="210" y="55" width="28" height="40" rx="3" fill="#0396A6" fillOpacity="0.1" />
                    <rect x="150" y="110" width="45" height="30" rx="3" fill="#0396A6" fillOpacity="0.1" />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                    <span className="absolute w-12 h-12 rounded-full bg-[#0396A6]/20 animate-ping" />
                    <span className="absolute w-7 h-7 rounded-full bg-[#0396A6]/30" />
                    <div className="relative z-10 w-9 h-9 rounded-full bg-[#0396A6] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(3, 150, 166,0.4)] transform group-hover:scale-110 transition-transform duration-300">
                      <MapPin size={18} className="text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-[#0396A6] px-2 py-1 rounded-md shadow-md">
                      Open Map <ExternalLink size={10} />
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 z-20">
                    <div className="px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-md bg-white/95 border border-slate-200 text-slate-800 flex flex-col gap-0.5 group-hover:border-[#0396A6]/50 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-[#0396A6]" />
                        <span className="text-[11px] font-bold">JMD Empire, Sector 62, Gurugram, India</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center pt-2 border-t border-slate-200 text-[11px] font-medium text-slate-500">
            &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
