// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { getCookieConsent, setCookieConsent, CookieConsent } from '@/lib/cookies';
import { X, Settings, ShieldCheck } from 'lucide-react';
import PreferencesModal from '@/components/PreferencesModal';

function getUserIdFromToken(token: string): string | undefined {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return undefined;
    const payload = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4);
    const decoded = JSON.parse(atob(padded));
    return decoded?.tenant_id || decoded?.user_id || decoded?.sub || undefined;
  } catch {
    return undefined;
  }
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const consent = getCookieConsent();
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);

    }
  }, []);

  // Resolve user ID from JWT and sync guest consent with the logged-in profile.
  useEffect(() => {
    const syncFromToken = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('frosty_token') : '';
      if (!token) {
        // Reset userId if token is gone (logout)
        if (userId) setUserId(undefined);
        return;
      }

      const id = getUserIdFromToken(token);
      if (!id) return;

      if (userId !== id) {
        setUserId(id);
      }

      const currentConsent = getCookieConsent();
      // Sync if guest consent exists without this ID
      if (currentConsent && currentConsent.userId !== id) {
        await setCookieConsent(currentConsent, id);
      }
    };

    syncFromToken();

    // Listen for storage events (login/logout in other tabs)
    const handleStorage = () => {
      void syncFromToken();
    };
    window.addEventListener('storage', handleStorage);

    // Also handle login/logout changes in this tab without polling.
    const handleFocus = () => {
      void syncFromToken();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
    };
  }, [userId]); // Re-run effect if userId is cleared

  const handleAcceptAll = async () => {
    const currentConsent = getCookieConsent();
    const consent: CookieConsent = {
      status: 'accepted',
      preferences: { essential: true, analytics: true, marketing: true },
      timestamp: new Date().toISOString(),
      visitorId: currentConsent?.visitorId || crypto.randomUUID()
    };
    try {
      await setCookieConsent(consent, userId);
      setShow(false);
      window.location.reload();
    } catch (err) {
      window.location.reload();
    }
  };

  const handleRejectAll = async () => {
    const currentConsent = getCookieConsent();
    const consent: CookieConsent = {
      status: 'rejected',
      preferences: { essential: true, analytics: false, marketing: false },
      timestamp: new Date().toISOString(),
      visitorId: currentConsent?.visitorId || crypto.randomUUID()
    };
    try {
      await setCookieConsent(consent, userId);
      setShow(false);
      window.location.reload();
    } catch (err) {
      window.location.reload();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-4xl mx-auto glass-strong rounded-2xl p-6 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-[#00d4ff]" />
            <h3 className="font-display font-bold text-lg text-white">We value your privacy</h3>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            We use cookies to enhance your experience, analyze site traffic, and serve personalized ads.
            By clicking "Accept All", you consent to our use of cookies.
            You can manage your preferences or read our <a href="/cookie-policy" className="text-[#00d4ff] hover:underline underline-offset-4">Cookie Policy</a>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white/70 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <Settings size={14} />
            Manage
          </button>
          <button
            onClick={handleRejectAll}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-white/10 text-white/70 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Reject All
          </button>
          <button
            onClick={handleAcceptAll}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#8250ff] text-white text-sm font-bold shadow-lg hover:opacity-90 transition-opacity"
          >
            Accept All
          </button>
        </div>
      </div>

      <PreferencesModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSaved={async (preferences: any) => {
          console.log('📝 Saving preferences with User ID:', userId);
          const currentConsent = getCookieConsent();
          const consent: CookieConsent = {
            status: 'partial',
            preferences,
            timestamp: new Date().toISOString(),
            visitorId: currentConsent?.visitorId || crypto.randomUUID()
          };
          try {
            await setCookieConsent(consent, userId);
            console.log('✅ Preferences saved successfully');
            setShow(false);
            window.location.reload();
          } catch (err) {
            console.error('❌ Failed to save preferences:', err);
            window.location.reload();
          }
        }}
      />
    </div>
  );
}
