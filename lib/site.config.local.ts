/* eslint-disable no-restricted-syntax */
import type { SiteConfigSchema } from './schemas/siteConfig.schema';

/**
 * @file site.config.local.ts
 * @description Single source of truth for Virtual Counsel configuration.
 * This file contains all settings for the Virtual Counsel website -
 * a specialized ICT/Software law consultancy serving Dutch tech companies.
 */

// MAIN CONFIGURATION OBJECT: All Virtual Counsel settings are defined here.
export const siteConfig: SiteConfigSchema = {
  // SITE METADATA: Basic info for SEO, social sharing, and browser tabs.
  site: {
    title: 'ICT-jurist Nederland | VirtualCounsel - Juridisch advies voor tech-bedrijven',
    description:
      'ICT-jurist Maarten van Beek helpt SaaS-bedrijven en software ontwikkelaars met contracten, IP-bescherming en compliance. Gespecialiseerd juridisch advies voor de tech-sector.',
    url: 'https://virtualcounsel.nl',
    name: 'VirtualCounsel',
    // OPENGRAPH SETTINGS: For social media link previews (Facebook, LinkedIn, etc.)
    openGraph: {
      image: {
        url: '/images/og-virtualcounsel.png',
        width: 1200,
        height: 630,
        alt: 'VirtualCounsel - Juridische expertise voor de tech industrie',
      },
    },
    twitterImage: '/images/twitter-virtualcounsel.png',
  },
  // THEME & BRANDING: Colors, logo, favicon - using v1 Professional theme with Virtual Counsel blues
  // eslint-disable-next-line no-restricted-syntax
  theme: {
    colors: {
      primary: '#2563eb', // Royal blue - trust, professionalism
      secondary: '#027add', // Dodger blue - accent for CTAs
      accent: '#5FA9D9', // Light sky blue - supporting elements
      accent2: '#FF6666', // Secondary accent (keeping for compatibility)
      accent3: '#e5f3ff', // Very light blue for backgrounds
      extra1: '#1e40af', // Dark blue variant
      extra2: '#1d4ed8', // Medium blue variant
      extra3: '#042A41', // Dark navy for high contrast
      extra4: '#60a5fa', // Bright blue for highlights
      extra5: '#93c5fd', // Light blue for hover states
      extra6: '#6b7280', // Gray for text
      extra7: '#e5e7eb', // Light gray for backgrounds
      extra8: '#f3f4f6', // Very light gray for sections
      extra9: '#1f2937', // Dark gray for headings
      extra10: '#374151', // Medium gray
      extra11: '#9ca3af', // Light gray for subtle text
      extra12: '#3b82f6', // Primary blue variant
      extra13: '#93bbfc', // Light blue variant
      extra14: '#dbeafe', // Very light blue
      extra15: '#ffffff', // White
      background: '#FFFFFF', // Page background
      header: '#1f2937', // Header text color - dark gray
      body: '#4b5563', // Body text color - medium gray
      lightGrey: '#f7f7f7', // Light grey surfaces
      heroBackground: '#f0f7ff', // Light blue hero background
    },
    logo: {
      src: '/images/branding/virtual-counsel-transparant-white-logo-icon.webp',
      alt: 'VirtualCounsel Logo',
      subtitle: 'Juridisch advies voor ICT', // Subtitle next to logo
    },
    favicon: '/favicon.ico', // Will be replaced with VC favicon
    // Theme foundation values for dynamic CSS variables
    typography: {
      headingFont: 'Poppins',
      bodyFont: 'Raleway',
      baseSize: '16px',
      textStyle: 'balanced', // Professional readability for legal content
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
      speed: 'fast',
      style: 'smooth', // Professional, not bouncy
      intensity: 'subtle', // Minimal animations for legal industry
    },
    // Visual style configuration
    visualStyle: {
      cardStyle: 'subtle',
      borderRadius: 'medium', // Professional but not stark
      contentDensity: 'balanced', // Good for detailed service information
      patternStyle: 'dots', // Subtle dot pattern for hero sections
      patternOpacity: 0.05, // Very subtle pattern
      // Element-specific border radius mappings
      borderRadiusMappings: {
        // Small UI elements
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
      ctaStyle: 'bg-brand-secondary-dark text-white',
      dividerStyle: 'fade',
      heroStyle: 'pattern', // Pattern on hero
      testimonialStyle: 'cards',
    },
    // Header configuration for transparent/overlay mode
    headerConfig: {
      transparentMode: true,
      scrolledBackgroundColor: 'bg-white/95 backdrop-blur-sm',
      heroTopPadding: 'pt-32 md:pt-32 lg:pt-32',
      transitionDuration: '300ms',
      scrollThreshold: 50,
      textColors: {
        changeOnScroll: false,
        transparentMode: 'text-foreground',
        scrolledMode: 'text-foreground',
      },
      ctaColors: {
        changeOnScroll: false,
        transparentMode: 'border-primary text-primary hover:bg-primary hover:text-white',
        scrolledMode: 'border-primary text-primary hover:bg-primary hover:text-white',
      },
    },
  },
  // NAVIGATION LINKS: Main site navigation - Dutch language
  navLinks: [
    { text: 'Home', href: '/' },
    { text: 'Diensten', href: '/services' },
    { text: 'Over mij', href: '/about' },
    { text: 'Succesverhalen', href: '/testimonials' },
    { text: 'Blog', href: '/blog' },
    { text: 'Contact', href: '/contact' },
  ],
  // FOOTER LINKS: Links appearing in the site footer
  footerLinks: [
    { text: 'Privacyverklaring', href: '/privacy-policy' },
    { text: 'Algemene Voorwaarden', href: '/terms-of-service' },
    { text: 'Cookiebeleid', href: '/cookie-policy' },
  ],
  // NAVIGATION TEXT: Dynamic text for navigation elements - Dutch
  navigationText: {
    viewAllText: 'Bekijk Alles',
    contactUsText: 'Neem contact op',
  },
  // LANDING HEADER TEXT: Dynamic text for landing page headers - Dutch
  landingHeaderText: {
    defaultCtaText: 'Maak een afspraak',
  },
  // COOKIE CONSENT TEXT: Dynamic text for cookie banner - Dutch language
  cookieConsentText: {
    // Banner texts
    cookieSettingsTitle: 'Cookie-instellingen',
    cookiePreferencesTitle: 'Cookie voorkeuren',
    cookieDescription:
      'Ik gebruik cookies om uw browse-ervaring te verbeteren, gepersonaliseerde advertenties of inhoud te tonen en mijn verkeer te analyseren. Door op "Accepteer alles" te klikken, stemt u in met mijn gebruik van cookies.',

    // Button labels
    acceptAllText: 'Accepteer alles',
    rejectAllText: 'Weiger alles',
    customizeText: 'Aanpassen',
    backText: 'Terug',
    savePreferencesText: 'Voorkeuren opslaan',

    // Tab labels
    essentialTabText: 'Essentieel',
    analyticsTabText: 'Analytics',
    marketingTabText: 'Marketing',
    preferencesTabText: 'Voorkeuren',

    // Cookie type descriptions
    essentialTitle: 'Essentiële cookies',
    essentialDescription:
      'Deze cookies zijn noodzakelijk voor het functioneren van de website en kunnen niet worden uitgeschakeld.',
    analyticsTitle: 'Analytics cookies',
    analyticsDescription:
      'Deze cookies stellen mij in staat om bezoeken en verkeersbronnen te tellen, zodat ik de prestaties van mijn site kan meten en verbeteren.',
    marketingTitle: 'Marketing cookies',
    marketingDescription:
      'Deze cookies kunnen door mijn advertentiepartners via mijn site worden geplaatst om een profiel van uw interesses op te bouwen.',
    preferenceCookiesTitle: 'Voorkeur cookies',
    preferenceCookiesDescription:
      'Deze cookies maken gepersonaliseerde functies en functionaliteit op mijn website mogelijk.',
  },
  // SOCIAL MEDIA LINKS: Virtual Counsel social profiles
  social: {
    facebook: '', // Not used
    twitter: '', // Not used
    instagram: '', // Not used
    linkedin: 'https://www.linkedin.com/in/maarten-van-beek-688177147/', // Maarten's personal LinkedIn
  },
  // LEGAL & COMPANY DETAILS: Virtual Counsel business information
  legal: {
    businessName: 'VirtualCounsel - Maarten van Beek',
    kvkNumber: '81070411',
    btwNumber: 'NL003525657B91',
    address: {
      line1: 'Wibautstraat 131D',
      line2: '',
      city: 'Amsterdam',
      zip: '1091 GL',
      country: 'Nederland',
    },
    privacyContactName: 'Maarten van Beek',
    privacyContactEmail: 'info@virtualcounsel.nl',
    privacyContactPhone: '+31 6 11718358',
  },
  // COOKIE CONSENT: Configuration for cookie consent banner
  cookieConsent: {
    cookiebotId: '', // Not using Cookiebot - using custom banner
  },
  // TRACKING IDS: Analytics and marketing platforms
  tracking: {
    gtmId: 'GTM-T2L53P6', // Google Tag Manager confirmed
    ga4Id: '', // To be confirmed - client has two IDs
    fbPixelId: '', // Not currently used
    linkedinId: '', // Not currently used
    hubspotId: '', // Not currently used
    googleAdsId: '', // Not currently used
  },
  // NEWSLETTER INTEGRATION: Configuration for newsletter (currently disabled)
  newsletter: {
    provider: '' as const, // Empty string to disable newsletter
  },
  // FEATURE FLAGS: Enable all features for Virtual Counsel
  features: {
    // Animations
    enableStaggeredAnimations: true,
    enablePageTransitions: false, // Keep disabled for professional feel
    pageTransitionVariant: 'fade',
    enableAdvancedBackgrounds: false, // No animated backgrounds
    animatedBackgroundType: 'none',
    backgroundImageUrl: '',
    enableMicroInteractions: true,

    // Sections
    enableHeroSection: true,
    enableHeroStats: false, // Enable KPI stats bar in hero section
    enableBlog: true, // Blog enabled for content marketing
    enableServices: true, // All 8 services enabled
    enableContactForm: true,
    enableTestimonials: true, // Success stories page
    enablePricing: false, // No pricing section (fixed fees discussed individually)
    enableClientsSection: true, // Show client logos
    enableFeaturesSection: false,
    enableCtaSection: true,
    enableAboutSection: true,
    enableProblemPainSection: true, // Address generic legal advice pain points
    enableSolutionVisionSection: true, // Show 4-step process
    enableProcessSection: true, // Enable process visualization
    enableFaqSection: true,
    enableValuePropSection: true, // Core differentiators
    enableHomepageFaqCta: false,
    enableAboutHeroCta: false,
    enableAboutLearnMoreCta: true,
    enableLandingPages: true, // For future campaigns
    enableCustomCookieBanner: false, // Will use Cookiebot script instead
    enableFooterServices: true, // List services in footer
    enableKpiSection: false, // Using hero stats instead
    enableAboutKpiSection: false, // No KPIs for solo practice
  },
  // SECTION STYLES: Utility classes for special sections
  sectionStyles: {
    heroGradient:
      'bg-[linear-gradient(to_top_right,_hsl(var(--brand-primary)/0.08)_0%,_hsl(var(--brand-primary)/0.04)_30%,_white_70%,_white_100%)]',
  },
  // ENABLED PAGES: All pages active for Virtual Counsel
  enabledPages: [
    '/',
    '/services',
    '/about',
    '/blog',
    '/resources',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
    '/testimonials',
  ],
  // CONTACT FORM SETTINGS: Simple form for general inquiries
  contactForm: {
    provider: 'smtp', // Simple email delivery
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Uw naam',
        placeholder: 'Uw naam',
        required: true,
      },
      {
        name: 'email',
        type: 'email',
        label: 'Uw e-mailadres',
        placeholder: 'Uw e-mailadres',
        required: true,
      },
      {
        name: 'phone',
        type: 'tel',
        label: 'Uw telefoonnummer (optioneel)',
        placeholder: 'Uw telefoonnummer (optioneel)',
        required: false,
      },
      {
        name: 'message',
        type: 'textarea',
        label: 'Uw bericht',
        placeholder: 'Hoe kan ik u helpen?',
        required: true,
      },
    ],
    recaptchaSiteKey: '', // May add later for spam protection
    honeypotFieldName: 'honeypot',
  },
  // CONTACT DETAILS: Virtual Counsel contact information
  contact: {
    email: 'info@virtualcounsel.nl',
    phone: '+31 6 11718358',
    address: {
      line1: 'Wibautstraat 131D',
      line2: '',
      city: 'Amsterdam',
      zip: '1091 GL',
      country: 'Nederland',
    },
    hours: {
      monFri: '9:00 - 17:00',
      sat: 'Op afspraak',
      sun: 'Gesloten',
    },
  },
  // SECTIONS DATA KEYS: Configuration for specific sections
  sectionsDataKeys: {
    blog: { limit: 3 }, // Show 3 recent blog posts
  },
  // PAGE STRUCTURES: Homepage structure following blueprint recommendations
  pageStructures: [
    {
      path: '/',
      seo: {
        title: 'VirtualCounsel - De juridische partner voor ICT- & softwarebedrijven',
        description:
          'Met VirtualCounsel haal je geen standaard jurist in huis, maar een betrokken juridische partner die jouw bedrijf echt begrijpt en met je meegroeit.',
      },
      sections: [
        {
          id: 'home-hero',
          sectionType: 'HeroSection',
          patternStyle: 'dots',
          patternOpacity: 0.03,
          patternFade: 'vertical',
          patternColor: 'rgba(var(--primary-rgb), 0.1)',
        },
        {
          id: 'home-value-prop',
          sectionType: 'ValuePropSection', // Why choose VirtualCounsel
        },
        {
          id: 'home-clients',
          sectionType: 'ClientsSection', // NN, Deloitte, ICT Waarborg logos
        },
        {
          id: 'home-problem-pain',
          sectionType: 'ProblemPainSection', // The cost of generic contracts
        },
        {
          id: 'home-solution-vision',
          sectionType: 'SolutionVisionSection', // 4-step process
        },
        {
          id: 'home-cta',
          sectionType: 'CtaSection', // Book consultation CTA
          patternStyle: 'dots',
          patternOpacity: 0.03,
        },
        {
          id: 'home-about',
          sectionType: 'AboutSection', // Maarten introduction
          variant: 'imageRight',
        },
        {
          id: 'home-testimonials',
          sectionType: 'TestimonialsSection', // Client success stories
        },
        {
          id: 'home-services',
          sectionType: 'ServicesSection', // 8 service offerings
        },
        {
          id: 'home-blog',
          sectionType: 'BlogSection', // Recent insights
        },
        {
          id: 'home-faq',
          sectionType: 'HomepageFaqSection', // Common questions
        },
      ],
    },
    {
      path: '/resources/:slug',
      sections: [{ id: 'resource-main-content', sectionType: 'ResourceDetailSection' }],
    },
    {
      path: '/resources',
      seo: {
        title: 'Juridische Resources voor ICT-bedrijven',
        description:
          'Ontdek mijn verzameling van juridische gidsen, checklists en tools speciaal voor software- en ICT-bedrijven.',
      },
      sections: [{ id: 'resources-list-main', sectionType: 'ResourceListSection' }],
    },
    {
      path: '/about',
      seo: {
        title: 'Over Maarten van Beek - VirtualCounsel',
        description:
          'Maak kennis met Maarten van Beek, de ICT-jurist die jullie taal spreekt. Met jarenlange ervaring in de tech-industrie help ik software- en ICT-bedrijven met praktisch juridisch advies.',
      },
      sections: [
        {
          id: 'about-main-content',
          sectionType: 'AboutSection',
          variant: 'classic',
        },
        {
          id: 'about-feature-cards',
          sectionType: 'AboutFeatureCardsSection',
        },
        {
          id: 'about-personal-journey',
          sectionType: 'AboutPersonalJourneySection',
        },
        {
          id: 'about-credentials',
          sectionType: 'AboutCredentialsSection',
        },
        {
          id: 'about-philosophy',
          sectionType: 'AboutPhilosophySection',
        },
        {
          id: 'about-cta',
          sectionType: 'CtaSection',
        },
        {
          id: 'about-values',
          sectionType: 'AboutValuesSection',
        },
        {
          id: 'about-testimonials',
          sectionType: 'AboutSocialProofSection',
        },
      ],
    },
    {
      path: '/services',
      seo: {
        title: 'Mijn Diensten - Juridische expertise voor ICT-bedrijven',
        description:
          'Specialistische juridische diensten voor software- en ICT-bedrijven. Van contracten tot compliance, wij spreken uw taal.',
      },
      sections: [
        {
          id: 'services-overview',
          sectionType: 'ServicesOverviewSection',
        },
        {
          id: 'services-grid',
          sectionType: 'ServicesSection',
        },
        {
          id: 'services-why-choose',
          sectionType: 'ServicesWhyChooseSection',
        },
        {
          id: 'services-process',
          sectionType: 'ProcessSection',
        },
        {
          id: 'services-cta',
          sectionType: 'CtaSection',
        },
      ],
    },
  ],
};
