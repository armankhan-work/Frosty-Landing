// @ts-nocheck
/**
 * GDPR + DPDP Compliant Cookie Utilities
 */

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsent {
  status: 'accepted' | 'rejected' | 'partial';
  preferences: CookiePreferences;
  timestamp: string;
  userId?: string;
  visitorId: string;
}

const COOKIE_NAME = 'frosty_cookie_consent';

export const getCookieConsent = (): CookieConsent | null => {
  if (typeof window === 'undefined') return null;
  const name = COOKIE_NAME + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      try {
        const consent = JSON.parse(c.substring(name.length, c.length));
        // If visitorId is missing for some reason, ensure it's added back
        if (!consent.visitorId) {
          consent.visitorId = crypto.randomUUID();
        }
        return consent;
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

export const setCookieConsent = async (consent: CookieConsent, userId?: string) => {
  if (typeof window === 'undefined') return;
  
  // Ensure we have a visitorId
  if (!consent.visitorId) {
    consent.visitorId = crypto.randomUUID();
  }

  const d = new Date();
  d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // 365 days
  const expires = "expires=" + d.toUTCString();
  
  // Secure, SameSite=Lax, Path=/ are standard for non-sensitive consent cookies
  // We use Lax instead of Strict to ensure consent is respect if user follows a link to the site
  const payload = { ...consent, userId };
  document.cookie = `${COOKIE_NAME}=${JSON.stringify(payload)};${expires};path=/;SameSite=Lax;Secure`;
  
  // Log to backend if API URL is available
  // Replaced absolute URL with relative /api for ngrok compatibility
  return fetch(`/api/auth/cookie-consent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      visitor_id: consent.visitorId,
      consent: consent.preferences,
      timestamp: consent.timestamp,
    }),
  })
  .then(res => {
    // Backend logging endpoint can be absent in some environments.
    // Treat 404 as non-fatal to avoid noisy dev overlays.
    if (!res.ok && res.status !== 404 && process.env.NODE_ENV === 'development') {
      console.warn('Cookie consent log request returned status:', res.status);
    }
    return res;
  })
  .catch(() => {
    // Don't re-throw — consent is already saved locally in browser cookie.
    // Network failure should not interrupt UX.
  });
};
