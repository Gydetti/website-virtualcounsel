// Type definitions for tracking scripts

interface Window {
  // Google Tag Manager
  dataLayer: any[]

  // Google Analytics
  gtag: (command: string, ...args: any[]) => void

  // Facebook Pixel
  fbq: (command: string, event: string, params?: Record<string, any>) => void
  _fbq: any

  // LinkedIn Insight
  lintrk: (command: string, params?: Record<string, any>) => void
  _linkedin_data_partner_ids: string[]

  // HubSpot
  _hsq: any[]

  // Cookiebot
  Cookiebot: {
    consent: {
      necessary: boolean
      preferences: boolean
      statistics: boolean
      marketing: boolean
    }
    show: () => void
    hide: () => void
    renew: () => void
  }
}
