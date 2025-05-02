/**
 * Copy this file to fill in your client-specific values.
 * All keys must be present (see site.config.ts.example for guidance).
 */

export const siteConfig = {
  site: {
    title: "",
    description: "",
    url: "",
    name: "",
    openGraph: { image: { url: "", width: 1200, height: 630, alt: "" } },
    twitterImage: ""
  },
  theme: {
    colors: {
      primary: "",
      secondary: "",
      accent: ""
    },
    logo: { src: "", alt: "" },
    favicon: ""
  },
  navLinks: [],
  footerLinks: [],
  social: { facebook: "", twitter: "", instagram: "", linkedin: "" },
  cookieConsent: { cookiebotId: "" },
  tracking: {
    gtmId: "",
    ga4Id: "",
    fbPixelId: "",
    linkedinId: "",
    hubspotId: "",
    googleAdsId: ""
  },
  newsletter: {
    provider: "",
    hubspot: { portalId: "", formId: "" },
    mailchimp: { apiKey: "", listId: "" },
    activeCampaign: { apiUrl: "", token: "" }
  },
  contact: {
    email: "",
    phone: "",
    address: { line1: "", line2: "", city: "", zip: "", country: "" },
    hours: { monFri: "", sat: "", sun: "" }
  },
  sections: {
    hero: {
      badge: "",
      preTitle: "",
      words: [""],
      subtitle: "",
      image: { src: "", alt: "", fallback: "" },
      ctaPrimary: { text: "", href: "" },
      ctaSecondary: { text: "", href: "" },
      stats: [{ value: 0, suffix: "", label: "" }]
    },
    blog: { limit: 3 }
    // Add other section configs below (services, features, etc.)
  }
} as const; 