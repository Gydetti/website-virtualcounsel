/* eslint-disable no-restricted-syntax */
import { siteConfig as rawConfig } from './site.config.local';
import type { SiteConfig } from './siteConfig';

// Each entry here must match the full SiteConfig['theme'] schema
export const themeVariants: Record<string, SiteConfig['theme']> = {
  v1: rawConfig.theme,

  // v2: WARM & SOPHISTICATED - Premium law firm with natural tones
  v2: {
    ...rawConfig.theme,
    colors: {
      // Warm, sophisticated color palette: forest greens, golds, and rich browns
      primary: '#1B5E20', // Deep forest green - trust, growth, stability
      secondary: '#2E7D32', // Medium forest green - nature, balance
      accent: '#F57F17', // Amber gold - premium, expertise, warmth
      accent2: '#FF8F00', // Deep amber - energy, confidence
      accent3: '#FFF8E1', // Cream - soft, elegant backgrounds
      extra1: '#0D4F13', // Very dark green
      extra2: '#388E3C', // Bright green
      extra3: '#4E342E', // Rich brown for contrast
      extra4: '#8BC34A', // Light green for highlights
      extra5: '#C8E6C9', // Very light green for backgrounds
      extra6: '#5D4037', // Warm brown for text
      extra7: '#F3E5AB', // Light gold for backgrounds
      extra8: '#FFF9C4', // Very light cream
      extra9: '#3E2723', // Dark brown for headings
      extra10: '#6D4C41', // Medium brown
      extra11: '#A1887F', // Light brown for subtle text
      extra12: '#689F38', // Green variant
      extra13: '#AED581', // Light green variant
      extra14: '#F1F8E9', // Very light green
      extra15: '#FFFDE7', // Cream white
      background: '#FAFAFA', // Warm white background
      header: '#3E2723', // Dark brown header text
      body: '#5D4037', // Warm brown body text
      lightGrey: '#F8F5F0', // Warm light surfaces
      heroBackground: '#F1F8E9', // Light green hero background
    },
    typography: {
      headingFont: 'Playfair Display', // Elegant serif for sophistication
      bodyFont: 'Source Sans Pro', // Clean, professional sans-serif
      baseSize: '16px',
      textStyle: 'balanced',
    },
    spacing: {
      xs: '0.375rem',
      sm: '0.75rem',
      md: '1.25rem',
      lg: '2rem',
      xl: '3rem',
    },
    borders: {
      radiusBase: '0.75rem', // Softer rounding for warmth
      widthBase: '1px',
      colorBase: '#C8E6C9',
      radiusScales: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
        none: '0px',
      },
    },
    shadows: {
      sm: '0 2px 4px rgba(46, 125, 50, 0.1)',
      md: '0 4px 8px rgba(46, 125, 50, 0.15)',
      lg: '0 8px 20px rgba(46, 125, 50, 0.2)',
      flat: 'none',
      subtle: '0 1px 3px rgba(46, 125, 50, 0.08)',
      medium: '0 3px 6px rgba(46, 125, 50, 0.12)',
      pronounced: '0 6px 12px rgba(46, 125, 50, 0.18)',
    },
    layout: {
      containerMaxWidth: '1400px',
      containerPadding: '3rem',
    },
    animation: {
      speed: 'balanced',
      style: 'smooth',
      intensity: 'moderate',
    },
    visualStyle: {
      cardStyle: 'subtle',
      borderRadius: 'soft',
      contentDensity: 'airy',
      patternStyle: 'waves',
      patternOpacity: 0.08,
      borderRadiusMappings: {
        badge: 'full',
        pill: 'full',
        indicator: 'full',
        button: 'lg',
        input: 'lg',
        card: 'xl',
        modal: '2xl',
        section: '2xl',
        image: 'xl',
        avatar: 'full',
        nav: 'lg',
        dropdown: 'lg',
      },
    },
    sectionStyles: {
      ctaStyle: 'bg-gradient-to-r from-amber-600 to-amber-700 text-white',
      dividerStyle: 'gradient',
      heroStyle: 'gradient',
      testimonialStyle: 'cards',
    },
    headerConfig: {
      transparentMode: true,
      scrolledBackgroundColor: 'bg-white/95 backdrop-blur-sm',
      heroTopPadding: 'pt-28 md:pt-36 lg:pt-40',
      transitionDuration: '400ms',
      scrollThreshold: 60,
      textColors: {
        changeOnScroll: false,
        transparentMode: 'text-green-900',
        scrolledMode: 'text-green-900',
      },
      ctaColors: {
        changeOnScroll: false,
        transparentMode: 'border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white',
        scrolledMode: 'border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white',
      },
    },
  },

  // v3: MODERN & BOLD - Dark, tech-forward with purple and cyber accents
  v3: {
    ...rawConfig.theme,
    colors: {
      // Dark, modern palette: deep purples, cyber greens, and high contrast
      primary: '#7C3AED', // Vibrant purple - innovation, technology
      secondary: '#A855F7', // Lighter purple - creativity, forward-thinking
      accent: '#00FF88', // Cyber green - tech, energy, growth
      accent2: '#00D9FF', // Cyan blue - digital, modern
      accent3: '#1A1A2E', // Dark navy for sections
      extra1: '#5B21B6', // Deep purple
      extra2: '#8B5CF6', // Medium purple
      extra3: '#0F0F23', // Almost black
      extra4: '#22D3EE', // Bright cyan
      extra5: '#34D399', // Bright green
      extra6: '#E5E7EB', // Light gray for text on dark
      extra7: '#374151', // Medium gray
      extra8: '#1F2937', // Dark gray
      extra9: '#F9FAFB', // White for headings on dark
      extra10: '#D1D5DB', // Light gray
      extra11: '#9CA3AF', // Medium light gray
      extra12: '#C084FC', // Light purple variant
      extra13: '#DDD6FE', // Very light purple
      extra14: '#F3F4F6', // Very light gray
      extra15: '#FFFFFF', // Pure white
      background: '#0F0F23', // Dark background
      header: '#FFFFFF', // White header text
      body: '#E5E7EB', // Light gray body text
      lightGrey: '#1F2937', // Dark surfaces
      heroBackground: '#1A1A2E', // Dark hero background
    },
    typography: {
      headingFont: 'Inter', // Modern, tech-forward sans-serif
      bodyFont: 'Roboto', // Clean, readable sans-serif
      baseSize: '16px',
      textStyle: 'tight',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2.5rem',
    },
    borders: {
      radiusBase: '0.25rem', // Sharp, modern edges
      widthBase: '1px',
      colorBase: '#374151',
      radiusScales: {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
        full: '9999px',
        none: '0px',
      },
    },
    shadows: {
      sm: '0 1px 3px rgba(124, 58, 237, 0.2)',
      md: '0 4px 8px rgba(124, 58, 237, 0.25)',
      lg: '0 8px 25px rgba(124, 58, 237, 0.3)',
      flat: 'none',
      subtle: '0 1px 2px rgba(124, 58, 237, 0.15)',
      medium: '0 3px 6px rgba(124, 58, 237, 0.2)',
      pronounced: '0 6px 15px rgba(124, 58, 237, 0.25)',
    },
    layout: {
      containerMaxWidth: '1800px',
      containerPadding: '2rem',
    },
    animation: {
      speed: 'fast',
      style: 'energetic',
      intensity: 'pronounced',
    },
    visualStyle: {
      cardStyle: 'pronounced',
      borderRadius: 'sharp',
      contentDensity: 'compact',
      patternStyle: 'hexagons',
      patternOpacity: 0.12,
      borderRadiusMappings: {
        badge: 'md',
        pill: 'full',
        indicator: 'sm',
        button: 'md',
        input: 'md',
        card: 'lg',
        modal: 'xl',
        section: 'lg',
        image: 'lg',
        avatar: 'full',
        nav: 'md',
        dropdown: 'md',
      },
    },
    sectionStyles: {
      ctaStyle: 'bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white',
      dividerStyle: 'line',
      heroStyle: 'pattern',
      testimonialStyle: 'featured',
    },
    headerConfig: {
      transparentMode: true,
      scrolledBackgroundColor: 'bg-gray-900/95 backdrop-blur-md',
      heroTopPadding: 'pt-20 md:pt-28 lg:pt-32',
      transitionDuration: '200ms',
      scrollThreshold: 40,
      textColors: {
        changeOnScroll: false,
        transparentMode: 'text-white',
        scrolledMode: 'text-white',
      },
      ctaColors: {
        changeOnScroll: false,
        transparentMode: 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white',
        scrolledMode: 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white',
      },
    },
  },
  // TODO: add 'final' variant combining v1 and v2 choices
};
