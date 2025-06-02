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
      textStyle: 'balanced', // OPTIONS: 'balanced', 'tight', 'airy'
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
      // Element-specific border radius scales
      radiusScales: {
        xs: '0.125rem', // 2px - very small elements
        sm: '0.25rem', // 4px - small elements like badges
        md: '0.375rem', // 6px - default elements like buttons
        lg: '0.5rem', // 8px - cards, inputs
        xl: '0.75rem', // 12px - large cards, sections
        '2xl': '1rem', // 16px - very large elements
        '3xl': '1.5rem', // 24px - hero sections, large modals
        full: '9999px', // fully rounded
        none: '0px', // no rounding
      },
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
      containerMaxWidth: '1600px',
      containerPadding: '4rem',
    },
    // New animation configuration
    animation: {
      speed: 'fast', // OPTIONS: 'fast', 'balanced', 'slow'
      style: 'smooth', // OPTIONS: 'smooth', 'bounce', 'energetic', 'in-out', 'out'
      intensity: 'subtle', // OPTIONS: 'subtle', 'moderate', 'pronounced'
    },
    // Visual style configuration
    visualStyle: {
      cardStyle: 'subtle', // OPTIONS: 'flat', 'subtle', 'pronounced'
      borderRadius: 'medium', // OPTIONS: 'sharp', 'medium', 'soft'
      contentDensity: 'balanced', // OPTIONS: 'compact', 'balanced', 'airy'
      patternStyle: 'grid', // OPTIONS: 'none', 'dots', 'grid', 'waves', 'noise', 'triangles', 'hexagons', 'crosshatch'
      patternOpacity: 0.1, // RANGE: 0-1 (decimal)
      // Element-specific border radius mappings
      borderRadiusMappings: {
        // Small UI elements - OPTIONS for all: 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'none'
        badge: 'full',
        pill: 'full',
        indicator: 'full',
        // Form elements
        button: 'md',
        input: 'md',
        // Content containers
        card: 'lg',
        modal: 'xl',
        section: 'xl',
        // Media elements
        image: 'lg',
        avatar: 'full',
        // Navigation elements
        nav: 'md',
        dropdown: 'md',
      },
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
      dividerStyle: 'fade', // OPTIONS: 'none', 'line', 'gradient', 'fade'
      heroStyle: 'pattern', // OPTIONS: 'flat', 'gradient', 'pattern', 'image'
      testimonialStyle: 'cards', // OPTIONS: 'minimal', 'cards', 'featured'
    },
    // Header configuration for transparent/overlay mode
    headerConfig: {
      /**
       * Enable transparent header that overlaps hero sections
       * When true, header starts transparent and gains background on scroll
       * When false, header always has background (default behavior)
       */
      transparentMode: true, // <--- Set to true to enable transparent header

      /**
       * Background color/classes when scrolled (only applies in transparent mode)
       * Examples: 'bg-white/95', 'bg-neutral-surface/90', 'bg-black/80'
       */
      scrolledBackgroundColor: 'bg-white/95 backdrop-blur-sm',

      /**
       * Extra padding to add to hero sections when transparent mode is enabled
       * This prevents content from being hidden behind the transparent header
       * Supports responsive classes for different screen sizes
       * Now supports all Tailwind spacing values: pt-16 through pt-48
       */
      heroTopPadding: 'pt-24 md:pt-32 lg:pt-36', // Higher values now work!

      /**
       * Transition duration for smooth animations (CSS transition-duration value)
       */
      transitionDuration: '300ms',

      /**
       * Scroll threshold before background appears (in pixels)
       */
      scrollThreshold: 50,

      /**
       * Text color configuration for different header states
       * - changeOnScroll: whether text colors should change when scrolling (default: true)
       * - transparentMode: text color when header is transparent
       * - scrolledMode: text color when header has background
       */
      textColors: {
        changeOnScroll: false, // Keep colors consistent - doesn't change on scroll!
        transparentMode: 'text-foreground', // Same color always
        scrolledMode: 'text-foreground', // Same color always
      },

      /**
       * CTA button color configuration for different header states
       * - changeOnScroll: whether CTA colors should change when scrolling (default: true)
       * - transparentMode: CTA styling when header is transparent
       * - scrolledMode: CTA styling when header has background
       */
      ctaColors: {
        changeOnScroll: false, // Keep CTA styling consistent
        transparentMode: 'border-primary text-primary hover:bg-primary hover:text-white',
        scrolledMode: 'border-primary text-primary hover:bg-primary hover:text-white',
      },
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
  // NAVIGATION TEXT: Dynamic text for navigation elements.
  navigationText: {
    viewAllText: 'View All', // Text for dropdown "View All" links in header
    contactUsText: 'Contact us', // Text for footer contact button
  },
  // LANDING HEADER TEXT: Dynamic text for landing page headers.
  landingHeaderText: {
    defaultCtaText: 'Get Started', // Default CTA text for landing page headers
  },
  // COOKIE CONSENT TEXT: Dynamic text for cookie banner and preferences.
  cookieConsentText: {
    // Banner texts
    cookieSettingsTitle: 'Cookie settings',
    cookiePreferencesTitle: 'Cookie preferences',
    cookieDescription:
      'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept all", you consent to our use of cookies.',

    // Button labels
    acceptAllText: 'Accept all',
    rejectAllText: 'Reject all',
    customizeText: 'Customize',
    backText: 'Back',
    savePreferencesText: 'Save preferences',

    // Tab labels
    essentialTabText: 'Essential',
    analyticsTabText: 'Analytics',
    marketingTabText: 'Marketing',
    preferencesTabText: 'Preferences',

    // Cookie type descriptions
    essentialTitle: 'Essential cookies',
    essentialDescription:
      'These cookies are necessary for the website to function and cannot be switched off.',
    analyticsTitle: 'Analytics cookies',
    analyticsDescription:
      'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.',
    marketingTitle: 'Marketing cookies',
    marketingDescription:
      'These cookies may be set through our site by our advertising partners to build a profile of your interests.',
    preferenceCookiesTitle: 'Preference cookies',
    preferenceCookiesDescription:
      'These cookies enable personalized features and functionality on our website.',
  },
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
    provider: 'mailchimp', // OPTIONS: 'mailchimp', 'hubspot', 'activecampaign', '' (disabled)
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
    // FIRST_EDIT: Variant for page transition animations - OPTIONS: 'fade', 'slide', 'cover'
    pageTransitionVariant: 'cover',
    // FIRST_EDIT: Toggle interactive/animated backgrounds (canvas, particles)
    enableAdvancedBackgrounds: true,
    // FIRST_EDIT: Choose which animated background style to use - OPTIONS: 'none', 'gradient', 'particles', 'parallax', 'noise', 'wave', 'image'
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
    enableAboutLearnMoreCta: true, // <--- Toggle "Learn more about me" button in AboutSection
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
    provider: 'smtp', // OPTIONS: 'smtp', 'sendgrid', 'postmark', '' (disabled)
    fields: [
      // <--- Define fields for the contact form
      {
        name: 'name',
        type: 'text', // OPTIONS: 'text', 'email', 'tel', 'textarea'
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
  // Optional per-section pattern overrides (fallback to global defaults if omitted):
  //   patternStyle: OPTIONS: 'none', 'dots', 'grid', 'waves', 'noise', 'triangles', 'hexagons', 'crosshatch'
  //   patternOpacity: RANGE: 0-1 (decimal)
  //   patternFade: OPTIONS: 'none', 'edges', 'vertical', 'top', 'bottom'
  //   patternColor: Any valid CSS color string (e.g., 'rgba(var(--accent-rgb), 0.2)')
  //
  // LazySection animation options for components:
  //   animation: OPTIONS: 'fade', 'fade-up', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'zoom', 'none'
  //   delay: Numeric value in seconds (e.g., 0.1, 0.2)
  //   duration: Numeric value in seconds (e.g., 0.3, 0.5)
  //   intensity: OPTIONS: 'subtle', 'moderate', 'pronounced'
  //   easingFunction: OPTIONS: 'smooth', 'bounce', 'in-out', 'out', 'energetic'
  //
  // Button component options:
  //   variant: OPTIONS: 'default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'white', 'spark', 'sparkextra1', 'clean'
  //   size: OPTIONS: 'default', 'sm', 'lg', 'icon'
  //   elevation: OPTIONS: 'flat', 'subtle', 'medium', 'pronounced'
  //   animation: OPTIONS: 'none', 'subtle', 'moderate', 'pronounced'
  //
  // Badge component options:
  //   variant: OPTIONS: 'default', 'dark', 'secondary', 'accent', 'destructive', 'outline', 'light'
  //   shape: OPTIONS: 'default' (uses theme border radius), 'pill' (fully rounded)
  pageStructures: [
    {
      path: '/',
      seo: undefined, // <--- SEO overrides for homepage
      sections: [
        {
          id: 'home-hero',
          sectionType: 'HeroSection',
          patternStyle: 'grid',
          patternOpacity: 0.05,
          patternFade: 'vertical',
          patternColor: 'rgba(var(--accent-rgb), 0.2)',
        },
        {
          id: 'home-value-prop',
          sectionType: 'ValuePropSection' /* patternStyle: 'grid', patternOpacity: 0.1 */,
        },
        {
          id: 'home-clients',
          sectionType: 'ClientsSection' /* patternStyle: 'grid', patternOpacity: 0.1 */,
        },
        {
          id: 'home-problem-pain',
          sectionType: 'ProblemPainSection' /* patternStyle: 'grid', patternOpacity: 0.1 */,
        },
        {
          id: 'home-solution-vision',
          sectionType: 'SolutionVisionSection' /* patternStyle: 'grid', patternOpacity: 0.1 */,
        },
        {
          id: 'home-features',
          sectionType: 'FeaturesSection' /* patternStyle: 'grid', patternOpacity: 0.1 */,
        },
        {
          id: 'home-testimonials',
          sectionType: 'TestimonialsSection' /* patternStyle: 'grid', patternOpacity: 0.1 */,
        },
        {
          id: 'home-cta',
          sectionType: 'CtaSection',
          patternStyle: 'grid',
          patternOpacity: 0.03,
        },
        {
          id: 'home-about',
          sectionType:
            'AboutSection' /* patternStyle: 'grid', patternOpacity: 0.1, patternFade: 'edges', patternColor: 'rgba(var(--accent-rgb), 0.2)' */,
          variant: 'imageLeft', // OPTIONS: 'default', 'imageLeft', 'imageRight', 'centered', 'classic'
        },
        {
          id: 'home-kpi',
          sectionType: 'KpiSection' /* patternStyle: 'grid', patternOpacity: 0.1 */,
        },
        {
          id: 'home-services',
          sectionType: 'ServicesSection' /* patternStyle: 'grid', patternOpacity: 0.1 */,
        },
        {
          id: 'home-process',
          sectionType: 'ProcessSectionHome' /* patternStyle: 'grid', patternOpacity: 0.1 */,
        },
        {
          id: 'home-blog',
          sectionType: 'BlogSection' /* patternStyle: 'grid', patternOpacity: 0.1 */,
        },
        {
          id: 'home-faq',
          sectionType: 'HomepageFaqSection' /* patternStyle: 'grid', patternOpacity: 0.1 */,
        },
        {
          id: 'home-contact',
          sectionType: 'ContactSection' /* patternStyle: 'grid', patternOpacity: 0.1 */,
        },
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
      path: '/about', // <--- ENHANCED ABOUT PAGE STRUCTURE FOR SOLO ENTREPRENEURS
      seo: {
        title: 'About [Name] - Personal Story & Expertise',
        description:
          "Learn about [Name]'s journey, qualifications, and unique approach to helping clients achieve transformation.",
      },
      sections: [
        {
          id: 'about-main-content',
          sectionType: 'AboutSection',
          variant: 'classic', // OPTIONS: 'default', 'imageLeft', 'imageRight', 'centered', 'classic'
          // patternStyle: 'grid', patternOpacity: 0.05
        },
        {
          id: 'about-personal-journey',
          sectionType: 'AboutPersonalJourneySection',
          // patternStyle: 'none', patternOpacity: 0
        },
        {
          id: 'about-credentials',
          sectionType: 'AboutCredentialsSection',
          // patternStyle: 'dots', patternOpacity: 0.03
        },
        {
          id: 'about-philosophy',
          sectionType: 'AboutPhilosophySection',
          // patternStyle: 'waves', patternOpacity: 0.04
        },
        {
          id: 'about-values',
          sectionType: 'AboutValuesSection',
          // patternStyle: 'grid', patternOpacity: 0.03
        },
        {
          id: 'about-testimonials',
          sectionType: 'TestimonialsSection',
          // patternStyle: 'none', patternOpacity: 0
        },
        {
          id: 'about-cta',
          sectionType: 'CtaSection',
          // patternStyle: 'grid', patternOpacity: 0.05
        },
      ],
    },
  ],
};
