'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '@/components/BrandLogo';

interface GlassNavbarProps {
  ready?: boolean;
}

export default function GlassNavbar({ ready = true }: GlassNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on scroll
  useEffect(() => {
    if (mobileMenuOpen) {
      const handleScrollClose = () => setMobileMenuOpen(false);
      window.addEventListener('scroll', handleScrollClose, { once: true });
      return () => window.removeEventListener('scroll', handleScrollClose);
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Product', href: '/#what-is-frosty' },
    { name: 'How It Works', href: '/#how' },
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300">
      <nav
        className="w-full flex items-center justify-between px-4 md:px-6 lg:px-8 py-2.5 md:py-3 relative"
        style={{
          background: 'transparent',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(28, 25, 23, 0.04)',
        }}
      >
        {/* ── Left: Brand Logo ── */}
        <div className="flex flex-1 justify-start">
        <Link
          href="/"
          className="flex items-center group cursor-pointer focus:outline-none"
          aria-label="Frosty Homepage"
        >
          <BrandLogo ready={ready} />
          </Link>
        </div>

        {/* ── Center: Desktop Navigation Links ── */}
        <div className="hidden md:flex flex-none items-center justify-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[14px] lg:text-[15px] font-medium text-stone-700 hover:text-stone-950 px-4 py-2 rounded-full hover:bg-black/[0.04] transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ── Right: Auth & CTA Buttons ── */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-3">
          <Link
            href="/login"
            className="text-[14px] lg:text-[15px] font-semibold text-stone-800 hover:text-[#0396A6] px-4 py-2 rounded-full hover:bg-black/[0.04] transition-all duration-200"
          >
            Log in
          </Link>
          <Link
            href="/login?mode=register"
            className="inline-flex items-center justify-center text-[14px] lg:text-[15px] font-semibold !text-white px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #027D8A 0%, #0396A6 100%)',
              boxShadow: '0 4px 14px rgba(3, 150, 166, 0.25)',
            }}
          >
            Start free trial
          </Link>
        </div>

        {/* ── Mobile Hamburger Button ── */}
        <button
          className="flex md:hidden flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-full transition-all duration-200"
          style={{
            background: 'rgba(28, 25, 23, 0.04)',
            border: '1px solid rgba(28, 25, 23, 0.08)',
          }}
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            style={{
              width: 18,
              height: 2,
              background: '#18181B',
              borderRadius: 2,
              display: 'block',
              transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), margin 0.3s',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(2.5px, 2.5px)' : 'none',
            }}
          />
          <span
            style={{
              width: 18,
              height: 2,
              background: '#18181B',
              borderRadius: 2,
              display: 'block',
              transition: 'opacity 0.25s',
              opacity: mobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: 18,
              height: 2,
              background: '#18181B',
              borderRadius: 2,
              display: 'block',
              transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), margin 0.3s',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(2.5px, -2.5px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* ── Mobile Menu Floating Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden pointer-events-auto absolute left-4 right-4 top-full mt-2"
            style={{
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '20px',
              border: '1px solid rgba(28, 25, 23, 0.08)',
              boxShadow: '0 20px 40px -10px rgba(28, 25, 23, 0.1)',
              padding: '18px 20px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[16px] font-medium text-stone-800 hover:text-[#0396A6] px-4 py-2.5 rounded-xl hover:bg-black/[0.04] transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="h-px bg-stone-200/80 my-1" />

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[15px] font-semibold text-stone-800 hover:text-[#0396A6] px-4 py-2.5 rounded-xl bg-black/[0.03] text-center"
            >
              Log in
            </Link>
            <Link
              href="/login?mode=register"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[15px] font-semibold !text-white px-4 py-2.5 rounded-xl text-center shadow-md shadow-[#0396A6]/25 transition-transform active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #027D8A 0%, #0396A6 100%)',
              }}
            >
              Start free trial
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
