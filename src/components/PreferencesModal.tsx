'use client';
import { useState, useEffect } from 'react';
import { getCookieConsent, setCookieConsent, CookiePreferences, CookieConsent } from '@/lib/cookies';
import { X, Check } from 'lucide-react';
import { useTheme } from 'next-themes';

interface PreferencesModalProps {
  show: boolean;
  onClose: () => void;
  onSaved?: (prefs: CookiePreferences) => void;
}

export default function PreferencesModal({ show, onClose, onSaved }: PreferencesModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = getCookieConsent();
    if (consent) {
      setPrefs(consent.preferences);
    }
  }, [show]);

  const handleSave = () => {
    if (onSaved) {
      onSaved(prefs);
    } else {
      // Fallback if no onSaved provided
      const currentConsent = getCookieConsent();
      const consent: CookieConsent = {
        status: (prefs.analytics && prefs.marketing) ? 'accepted' : 'partial',
        preferences: prefs,
        timestamp: new Date().toISOString(),
        visitorId: currentConsent?.visitorId || crypto.randomUUID()
      };
      setCookieConsent(consent);
      window.location.reload();
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="glass-strong rounded-2xl w-full max-w-lg overflow-hidden flex flex-col shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300"
        style={isDark ? {
          background: '#0d1117',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.25), 0 16px 48px rgba(56, 189, 248, 0.15)'
        } : {}}
      >
        <div className="p-6 border-bottom border-white/10 flex items-center justify-between">
          <h2 className="font-display font-bold text-2xl text-white">Privacy Preferences</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h4 className="font-bold text-white mb-1">Essential Cookies</h4>
              <p className="text-white/50 text-xs">Necessary for the website to function correctly. Cannot be disabled.</p>
            </div>
            <div className="w-12 h-6 rounded-full bg-[#FF7A5E]/20 border border-[#FF7A5E]/30 flex items-center px-1">
              <div className="w-4 h-4 rounded-full bg-[#FF7A5E] flex items-center justify-center ml-auto">
                <Check size={10} className="text-white" />
              </div>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h4 className="font-bold text-white mb-1">Analytics Cookies</h4>
              <p className="text-white/50 text-xs">Help us understand how users interact with our website to improve performance and features.</p>
            </div>
            <button 
              onClick={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))}
              className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${prefs.analytics ? 'bg-[#00d4ff]' : 'bg-white/10'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-all ${prefs.analytics ? 'ml-auto' : 'ml-0'}`} />
            </button>
          </div>

          <div className="h-px bg-white/5" />

          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h4 className="font-bold text-white mb-1">Marketing Cookies</h4>
              <p className="text-white/50 text-xs">Used to deliver personalized advertisements and track marketing campaign effectiveness.</p>
            </div>
            <button 
              onClick={() => setPrefs(p => ({ ...p, marketing: !p.marketing }))}
              className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${prefs.marketing ? 'bg-[#8250ff]' : 'bg-white/10'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-all ${prefs.marketing ? 'ml-auto' : 'ml-0'}`} />
            </button>
          </div>
        </div>

        <div className="p-6 bg-white/5 flex gap-3">
          <button 
            onClick={() => setPrefs({ essential: true, analytics: true, marketing: true })}
            className="flex-1 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
          >
            Allow All
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#8250ff] text-white font-bold shadow-lg hover:opacity-90 transition-opacity"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
