/* eslint-disable no-restricted-syntax */
import type { SiteConfigSchema } from './schemas/siteConfig.schema';

/**
 * @file site.config.local.ts
 * @description Single source of truth for client-specific public data.
 * This file is part of the repository and used at build time.
 * For a new client, open this file and replace placeholder values.
 * No need to copy or rename it.
 */

// MAIN CONFIGURATION OBJECT: All site settings are defined here.
export const siteConfig: SiteConfigSchema = {
  // SITE METADATA: Basic info for SEO, social sharing, and browser tabs.
  site: {
    title: 'Placeholder Title', // <--- Browser tab title, default SEO title
    description: 'Placeholder description for the site.', // <--- Default SEO description
    url: 'https://placeholder.com', // <--- Production URL of the client's site
    name: 'Site Name', // <--- Used in OpenGraph, general site identification
    // OPENGRAPH SETTINGS: For social media link previews (Facebook, LinkedIn, etc.)
    openGraph: {
      image: {
        url: '/images/og-placeholder.png', // <--- Path to OpenGraph image (e.g., 1200x630px)
        width: 1200,
        height: 630,
        alt: 'OpenGraph Placeholder', // <--- Alt text for OG image
      },
    },
    twitterImage: '/images/twitter-placeholder.png', // <--- Path to Twitter card image (e.g., 800x418px)
  },
  // THEME & BRANDING: Colors, logo, favicon.
  // eslint-disable-next-line no-restricted-syntax
  theme: {
    colors: {
      primary: '#2563EB', // Main brand color
      secondary: '#3D5A98', // Secondary brand color
      accent: '#F78D50', // Primary accent for CTAs & highlights
      accent2: '#FF6666', // Secondary accent
      accent3: '#D6EFFF', // Tertiary accent
      extra1: '#2563EB', // Dark extra
      extra2: '#3D5A98', // Dark extra variant
      extra3: '#042A41', // Light extra
      extra4: '#6EC1E4', // Cool blue extra
      extra5: '#48ACF0', // Bright blue
      extra6: '#99C6C3', // Teal light
      extra7: '#CAEDE5', // Mint light
      extra8: '#669592', // Teal gray
      extra9: '#022F0B', // Dark green
      extra10: '#3E8948', // Mid green
      extra11: '#61CE70', // Bright green
      extra12: '#5A93FD', // Blue accent
      extra13: '#81ADFF', // Light blue accent
      extra14: '#BDCCE9', // Light periwinkle
      extra15: '#F8F8F8', // Off-white extra
      background: '#FFFFFF', // Page background
      header: '#1F1F1F', // Header text color
      body: '#2B2A33', // Body text color
      lightGrey: '#EFEFF0', // Light grey surfaces
      heroBackground: '#F5F9FF', // Default hero background
    },
    logo: {
      src: '/images/placeholders/png-Logo.webp', // <--- Path to site logo
      alt: 'Placeholder Logo', // <--- Alt text for logo
      subtitle: 'Role', // <--- Optional subtitle text displayed next to the logo
    },
    favicon: '/favicon.ico', // <--- Path to site favicon
    // Theme foundation values for dynamic CSS variables
    typography: {
      headingFont: 'Poppins',
      bodyFont: 'Raleway',
      baseSize: '16px',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    borders: {
      radiusBase: '0.5rem',
      widthBase: '1px',
      colorBase: '#e5e7eb',
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.15)',
      // Enhanced shadow system
      flat: 'none',
      subtle: '0 2px 4px rgba(0, 0, 0, 0.05)',
      medium: '0 4px 8px rgba(0, 0, 0, 0.08)',
      pronounced: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
    layout: {
      containerMaxWidth: '1280px',
      containerPadding: '1rem',
    },
    // New animation configuration
    animation: {
      speed: 'balanced', // fast, balanced, slow
      style: 'smooth', // smooth, bounce, energetic
      intensity: 'subtle', // subtle, moderate, pronounced
    },
    // Visual style configuration
    visualStyle: {
      cardStyle: 'subtle', // flat, subtle, pronounced
      borderRadius: 'medium', // sharp, medium, soft
      contentDensity: 'balanced', // compact, balanced, airy
      patternStyle: 'none', // none, dots, grid, waves, noise, etc.
      patternOpacity: 0.05, // 0-1
    },
    // Section treatment configuration
    sectionStyles: {
      /**
       * CTA section background style.
       * - Use a semantic key: 'bold', 'accent', 'standard'
       * - Or use any Tailwind or custom class string, e.g. 'bg-[hsl(var(--brand-dark-3))] text-white'
       * Examples:
       *   ctaStyle: 'bold'
       *   ctaStyle: 'bg-[hsl(var(--brand-dark-3))] text-white'
       *
       * Available color tokens (from theme.colors):
       *   primary, secondary, accent, accent2, accent3, extra1, ..., brand-dark-3, etc.
       *   Use as: 'bg-[hsl(var(--primary))]', 'bg-[hsl(var(--brand-dark-3))]', etc.
       *
       * Available pattern styles (for patternStyle):
       *   'none', 'dots', 'grid', 'waves', 'noise', 'triangles', 'hexagons', 'crosshatch'
       */
      ctaStyle: 'bg-brand-secondary-dark', // or 'bg-brand-secondary-dark text-white'
      dividerStyle: 'fade', // none, line, gradient, fade
      heroStyle: 'gradient', // flat, gradient, pattern, image
      testimonialStyle: 'cards', // minimal, cards, featured
    },
  },
  // NAVIGATION LINKS: Main site navigation (header).
  navLinks: [
    { text: 'Home', href: '/' }, // <--- Example nav link
    { text: 'Services', href: '/services' },
    { text: 'About', href: '/about' },
    { text: 'Blog', href: '/blog' },
    { text: 'Resources', href: '/resources' },
    { text: 'FAQ', href: '/faq' },
    { text: 'Contact', href: '/contact' },
    { text: 'Testimonials', href: '/testimonials' },
  ],
  // FOOTER LINKS: Links appearing in the site footer (e.g., legal pages).
  footerLinks: [
    { text: 'Privacy Policy', href: '/privacy-policy' },
    { text: 'Terms of Service', href: '/terms-of-service' },
    { text: 'Cookie Policy', href: '/cookie-policy' },
  ],
  // SOCIAL MEDIA LINKS: URLs for social media profiles.
  social: {
    facebook: '', // <--- Facebook page URL
    twitter: '', // <--- Twitter profile URL
    instagram: '', // <--- Instagram profile URL
    linkedin: '', // <--- LinkedIn profile URL
  },
  // LEGAL & COMPANY DETAILS: used for Privacy Policy page
  legal: {
    businessName: 'Placeholder BV', // e.g. 'ACME Corp'
    kvkNumber: '12345678', // e.g. '12345678'
    address: {
      line1: 'Straat 1',
      line2: 'Unit 2',
      city: 'Amsterdam',
      zip: '1234 AB',
      country: 'Nederland',
    },
    privacyContactName: 'John Doe', // e.g. 'John Doe'
    privacyContactEmail: 'privacy@example.com', // e.g. 'privacy@client.com'
    privacyContactPhone: '+31 6 12345678', // e.g. '+31 6 12345678'
  },
  // COOKIE CONSENT: Configuration for cookie consent banner.
  cookieConsent: {
    cookiebotId: '', // <--- Cookiebot ID, if using Cookiebot service
  },
  // TRACKING IDS: IDs for analytics and marketing platforms.
  tracking: {
    gtmId: '', // <--- Google Tag Manager ID
    ga4Id: '', // <--- Google Analytics 4 ID
    fbPixelId: '', // <--- Facebook Pixel ID
    linkedinId: '', // <--- LinkedIn Insight Tag ID
    hubspotId: '', // <--- HubSpot Tracking ID
    googleAdsId: '', // <--- Google Ads Conversion ID
  },
  // NEWSLETTER INTEGRATION: Configuration for newsletter subscription form.
  newsletter: {
    provider: 'mailchimp', // <--- mailchimp | hubspot | activecampaign | "" (disabled)
    // HubSpot specific settings (only if provider is "hubspot")
    hubspot: { portalId: 'hs-placeholder', formId: 'hs-form-placeholder' },
    // Mailchimp specific settings (only if provider is "mailchimp")
    mailchimp: {
      apiKey: 'mc-apikey-placeholder',
      listId: 'mc-listid-placeholder',
    },
    // ActiveCampaign specific settings (only if provider is "activecampaign")
    activeCampaign: {
      apiUrl: 'https://placeholder.api-us1.com',
      token: 'ac-token-placeholder',
    },
  },
  // FEATURE FLAGS: Toggle sections/features on or off site-wide.
  features: {
    // Toggle scroll-driven & staggered animations across all sections
    enableStaggeredAnimations: true,
    // FIRST_EDIT: Toggle page-level route transition animations
    enablePageTransitions: false,
    // FIRST_EDIT: Variant for page transition animations (fade, slide, cover)
    pageTransitionVariant: 'cover',
    // FIRST_EDIT: Toggle interactive/animated backgrounds (canvas, particles)
    enableAdvancedBackgrounds: true,
    // FIRST_EDIT: Choose which animated background style to use (none, gradient, particles, parallax, noise, wave, image)
    animatedBackgroundType: 'none',
    // FIRST_EDIT: Optional background image URL to use when animatedBackgroundType is "image"
    backgroundImageUrl: '',
    // FIRST_EDIT: Toggle micro-interactions and hover animations
    enableMicroInteractions: true,
    enableHeroSection: true, // <--- Toggle Hero section display
    enableHeroStats: true, // <--- Toggle KPI stats count-up block in hero section
    enableBlog: true, // <--- Toggle Blog feature (includes pages & sections)
    enableServices: true, // <--- Toggle Services feature
    enableContactForm: true, // <--- Toggle Contact Form functionality
    enableTestimonials: true, // <--- Toggle Testimonials section display
    enablePricing: false, // <--- Toggle Pricing section display
    enableClientsSection: true, // <--- Toggle Clients/logo section display
    enableFeaturesSection: false, // <--- Toggle Features/comparison section display
    enableCtaSection: true, // <--- Toggle general Call-to-Action sections
    enableAboutSection: true, // <--- Toggle About section display (e.g., on homepage)
    enableProblemPainSection: true, // <--- Toggle Problem/Pain section display
    enableSolutionVisionSection: true, // <--- Toggle Solution/Vision section display
    enableProcessSection: false, // <--- Toggle Process/how-it-works section display (disabled on homepage)
    enableFaqSection: true, // <--- Toggle FAQ section display (e.g., on homepage)
    enableValuePropSection: true, // <--- Toggle Value Proposition section display
    enableHomepageFaqCta: false,
    enableAboutHeroCta: false,
    enableLandingPages: true, // <--- Toggle dedicated Landing Page functionality
    enableCustomCookieBanner: false, // <--- Use custom banner instead of Cookiebot (if ID not set)
    enableFooterServices: true, // <--- Toggle services list in footer
    // FIRST_EDIT: Toggle the KPI stats section on the homepage
    enableKpiSection: false,
    // FIRST_EDIT: Toggle the KPI stats section display on the About page
    enableAboutKpiSection: true,
  },
  // SECTION STYLES: Utility classes for special sections (e.g., hero)
  sectionStyles: {
    // Gradient class for hero-like top sections
    heroGradient: 'bg-gradient-to-r from-brand-primary/10 to-brand-hero-background',
  },
  // ENABLED PAGES: Defines which page routes are active and included in sitemap.
  enabledPages: [
    '/', // <--- Homepage always enabled usually
    '/services',
    '/about',
    '/blog',
    '/faq',
    '/resources',
    '/contact',
    '/privacy-policy', // <--- Enable Privacy Policy page
    '/terms-of-service', // <--- Example legal page
    '/testimonials',
  ],
  // CONTACT FORM SETTINGS: Configuration for the contact form.
  contactForm: {
    provider: 'smtp', // <--- smtp | sendgrid | postmark | etc. | "" (disabled)
    fields: [
      // <--- Define fields for the contact form
      {
        name: 'name',
        type: 'text',
        label: 'Your name',
        placeholder: 'Your name',
        required: true,
      },
      {
        name: 'email',
        type: 'email',
        label: 'Your email',
        placeholder: 'Your email',
        required: true,
      },
      {
        name: 'phone',
        type: 'tel',
        label: 'Your phone (optional)',
        placeholder: 'Your phone (optional)',
        required: false,
      },
      {
        name: 'message',
        type: 'textarea',
        label: 'Message',
        placeholder: 'How can we help you?',
        required: true,
      },
    ],
    recaptchaSiteKey: '', // <--- Google reCAPTCHA v2 Site Key DISABLED
    honeypotFieldName: 'honeypot', // <--- Name for anti-spam honeypot field
  },
  // CONTACT DETAILS: General contact information for the business.
  contact: {
    email: 'contact@placeholder.com', // <--- Main contact email
    phone: '+1-555-123-4567', // <--- Main contact phone number
    address: {
      // <--- Physical address (optional)
      line1: '123 Placeholder St',
      line2: 'Suite 4B',
      city: 'Placeholder City',
      zip: '90210',
      country: 'Placeholder Country',
    },
    hours: {
      // <--- Business hours (optional)
      monFri: '9am - 5pm',
      sat: '10am - 2pm',
      sun: 'Closed',
    },
  },
  // SECTIONS DATA KEYS: Configuration for specific data aspects of sections (e.g., limits).
  sectionsDataKeys: {
    blog: { limit: 3 }, // <--- Number of posts to show in blog previews
  },
  // PAGE STRUCTURES: Defines the layout (sections and their order) for each page.
  pageStructures: [
    {
      path: '/', // <--- HOMEPAGE STRUCTURE
      seo: undefined, // <--- SEO overrides for homepage (title, description, etc.)
      sections: [
        // <--- Sections on the homepage, IN ORDER OF APPEARANCE
        { id: 'home-hero', sectionType: 'HeroSection' }, // <--- ID is unique key for React, sectionType maps to component
        { id: 'home-value-prop', sectionType: 'ValuePropSection' },
        { id: 'home-clients', sectionType: 'ClientsSection' },
        { id: 'home-problem-pain', sectionType: 'ProblemPainSection' },
        { id: 'home-solution-vision', sectionType: 'SolutionVisionSection' },
        { id: 'home-features', sectionType: 'FeaturesSection' },
        { id: 'home-testimonials', sectionType: 'TestimonialsSection' },
        { id: 'home-cta', sectionType: 'CtaSection' },
        { id: 'home-about', sectionType: 'AboutSection' },
        { id: 'home-kpi', sectionType: 'KpiSection' },
        { id: 'home-services', sectionType: 'ServicesSection' }, // <--- Or use ServicesPreviewSection for a summary
        { id: 'home-process', sectionType: 'ProcessSectionHome' },
        { id: 'home-blog', sectionType: 'BlogSection' }, // <--- Or use BlogPreviewSection for a summary
        { id: 'home-faq', sectionType: 'HomepageFaqSection' }, // <--- FAQ specifically for homepage
        { id: 'home-contact', sectionType: 'ContactSection' },
      ],
    },
    {
      path: '/resources/:slug', // <--- DYNAMIC PAGE STRUCTURE (e.g., individual resource page)
      sections: [{ id: 'resource-main-content', sectionType: 'ResourceDetailSection' }],
    },
    {
      path: '/resources', // <--- RESOURCES INDEX PAGE STRUCTURE
      seo: {
        title: 'Helpful Resources',
        description: 'Explore our collection of e-books, guides, and tools.',
      },
      sections: [{ id: 'resources-list-main', sectionType: 'ResourceListSection' }],
    },
    {
      path: '/about', // <--- ABOUT US PAGE STRUCTURE
      seo: {
        title: 'About Our Company',
        description: 'Learn more about our company, our mission, and our values.',
      },
      sections: [
        {
          id: 'about-main-content',
          sectionType: 'AboutSection',
          variant: 'classic',
        },
        { id: 'about-values', sectionType: 'AboutValuesSection' },
        { id: 'about-testimonials', sectionType: 'TestimonialsSection' },
        { id: 'about-cta', sectionType: 'CtaSection' },
      ],
    },
  ],
};
