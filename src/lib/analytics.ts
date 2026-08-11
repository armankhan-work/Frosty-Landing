'use client';
import { getCookieConsent } from './cookies';

/**
 * Example Analytics Wrapper
 * Only loads/executes tracking if consent is granted.
 */
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;

  const consent = getCookieConsent();
  if (consent?.preferences.analytics) {
    console.log('📊 Analytics initialized (Consent Granted)');
    // Insert your GA4, Mixpanel, etc. initialization here
    // Example:
    // window.gtag('config', 'G-XXXXXXXXXX');
  } else {
    console.log('🚫 Analytics skipped (No Consent)');
  }
};

export const trackEvent = (name: string, properties?: any) => {
  const consent = getCookieConsent();
  if (consent?.preferences.analytics) {
    console.log(`📈 Tracking event: ${name}`, properties);
    // window.gtag('event', name, properties);
  }
};
