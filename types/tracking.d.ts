// Type definitions for tracking scripts

interface Window {
  // Google Tag Manager
  dataLayer: unknown[];

  // Google Analytics
  gtag: (command: string, ...args: unknown[]) => void;

  // Facebook Pixel
  fbq: (command: string, event: string, params?: Record<string, unknown>) => void;
  _fbq: unknown;

  // LinkedIn Insight
  lintrk: (command: string, params?: Record<string, unknown>) => void;
  _linkedin_data_partner_ids: string[];

  // HubSpot
  _hsq: unknown[];

  // Cookiebot
  Cookiebot: {
    consent: {
      necessary: boolean;
      preferences: boolean;
      statistics: boolean;
      marketing: boolean;
    };
    show: () => void;
    hide: () => void;
    renew: () => void;
  };
}
