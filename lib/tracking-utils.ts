/* eslint-disable @typescript-eslint/no-explicit-any */
/* biome-disable-file */
/* biome-disable lint/suspicious/noExplicitAny */

// Utility functions for tracking events

// Google Analytics event tracking
export const trackGAEvent = (
  eventName: string,
  category: string,
  label: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Facebook Pixel event tracking
export const trackFBEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

// LinkedIn Insight event tracking
export const trackLinkedInEvent = (conversionId: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.lintrk) {
    window.lintrk('track', { conversion_id: conversionId, ...params });
  }
};

// HubSpot event tracking
export const trackHubSpotEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window._hsq) {
    window._hsq.push(['trackEvent', { id: eventName, ...params }]);
  }
};

// Google Ads conversion tracking
export const trackGoogleAdsConversion = (
  conversionId: string,
  conversionLabel: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `AW-${conversionId}/${conversionLabel}`,
      value: value,
      currency: 'EUR',
    });
  }
};

// Generic event tracking that sends to all platforms
export const trackEvent = (
  eventName: string,
  category: string,
  label: string,
  value?: number,
  additionalParams?: Record<string, unknown>
) => {
  // Track in Google Analytics
  trackGAEvent(eventName, category, label, value);

  // Track in Facebook Pixel
  trackFBEvent(eventName, {
    content_name: label,
    value,
    currency: 'EUR',
    ...additionalParams,
  });

  // Track in LinkedIn (if it's a conversion)
  if (eventName.includes('conversion')) {
    trackLinkedInEvent(eventName, { ...additionalParams });
  }

  // Track in HubSpot
  trackHubSpotEvent(eventName, { category, label, value, ...additionalParams });
};
