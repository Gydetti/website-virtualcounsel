// @ts-nocheck
// Remove strict type checking as colors use functions
// import type { Config } from 'tailwindcss';
import { semanticColors, semanticGradients } from './theme/colors';
import { siteConfig } from './lib/siteConfig';

// Convert camelCase to kebab-case for utility names
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Dynamically generate Tailwind color functions from siteConfig.theme.colors
const dynamicColors = Object.fromEntries(
  Object.keys(siteConfig.theme.colors).map(key => {
    const name = toKebabCase(key);
    return [
      name,
      ({ opacityValue = 1 }: { opacityValue?: number }) =>
        `rgb(var(--${name}-rgb) / ${opacityValue})`,
    ];
  })
);
// Add static white color with opacity support
dynamicColors.white = ({ opacityValue = 1 }) => `rgba(255, 255, 255, ${opacityValue})`;

// Reintroduce extra semantic utilities that reference CSS vars directly
const extraColors: Record<string, (opts: { opacityValue?: number }) => string> = {
  border: ({ opacityValue = 1 }) => `hsl(var(--border) / ${opacityValue})`,
  input: ({ opacityValue = 1 }) => `rgb(var(--input-rgb) / ${opacityValue})`,
  ring: ({ opacityValue = 1 }) => `rgb(var(--ring-rgb) / ${opacityValue})`,
  popover: ({ opacityValue = 1 }) => `hsl(var(--popover) / ${opacityValue})`,
  card: ({ opacityValue = 1 }) => `hsl(var(--card) / ${opacityValue})`,
  foreground: ({ opacityValue = 1 }) => `hsl(var(--foreground) / ${opacityValue})`,
  // Text color for card backgrounds
  'card-foreground': ({ opacityValue = 1 }) => `hsl(var(--card-foreground) / ${opacityValue})`,
  muted: ({ opacityValue = 1 }) => `hsl(var(--muted) / ${opacityValue})`,
  'muted-foreground': ({ opacityValue = 1 }) => `hsl(var(--muted-foreground) / ${opacityValue})`,
  destructive: ({ opacityValue = 1 }) => `hsl(var(--destructive) / ${opacityValue})`,
  'destructive-foreground': ({ opacityValue = 1 }) =>
    `hsl(var(--destructive-foreground) / ${opacityValue})`,
  // Feedback colors that map to semantic tokens
  'feedback-error': ({ opacityValue = 1 }) => `hsl(var(--destructive) / ${opacityValue})`,
  'feedback-error-bg': ({ opacityValue = 1 }) => `hsl(var(--destructive) / ${opacityValue})`,
  'feedback-success': ({ opacityValue = 1 }) => `hsl(var(--muted-foreground) / ${opacityValue})`,
  'feedback-success-bg': ({ opacityValue = 1 }) => `hsl(var(--muted) / ${opacityValue})`,
  // Neutral text colors
  'neutral-text': ({ opacityValue = 1 }) => `hsl(var(--foreground) / ${opacityValue})`,
  'neutral-text-subtle': ({ opacityValue = 1 }) => `hsl(210 16% 60% / ${opacityValue})`, // Medium gray text with better contrast
  'neutral-surface': ({ opacityValue = 1 }) => `hsl(var(--card) / ${opacityValue})`,
  'neutral-background': ({ opacityValue = 1 }) => `hsl(var(--background) / ${opacityValue})`,
  // Computed brand color variants - these match the CSS variables generated in layout.tsx
  'brand-light': ({ opacityValue = 1 }) => `rgb(var(--brand-light-rgb) / ${opacityValue})`,
  'brand-dark': ({ opacityValue = 1 }) => `rgb(var(--brand-dark-rgb) / ${opacityValue})`,
  'brand-light-2': ({ opacityValue = 1 }) => `rgb(var(--brand-light-2-rgb) / ${opacityValue})`,
  'brand-dark-2': ({ opacityValue = 1 }) => `rgb(var(--brand-dark-2-rgb) / ${opacityValue})`,
  'brand-light-3': ({ opacityValue = 1 }) => `rgb(var(--brand-light-3-rgb) / ${opacityValue})`,
  'brand-dark-3': ({ opacityValue = 1 }) => `rgb(var(--brand-dark-3-rgb) / ${opacityValue})`,
  'brand-secondary-light': ({ opacityValue = 1 }) =>
    `rgb(var(--brand-secondary-light-rgb) / ${opacityValue})`,
  'brand-secondary-dark': ({ opacityValue = 1 }) =>
    `rgb(var(--brand-secondary-dark-rgb) / ${opacityValue})`,
  'brand-accent-light': ({ opacityValue = 1 }) =>
    `rgb(var(--brand-accent-light-rgb) / ${opacityValue})`,
  'brand-accent-dark': ({ opacityValue = 1 }) =>
    `rgb(var(--brand-accent-dark-rgb) / ${opacityValue})`,
};
// Merge extraColors into dynamicColors to enable utilities like border-border
Object.assign(dynamicColors, extraColors);

const config = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  // Minimal safelist - only truly dynamic styles that can't be detected statically
  safelist: [
    // Dynamic text styles from theme variants
    'text-style-balanced',
    'text-style-tight',
    'text-style-airy',
    // Typography system utilities
    'text-body-base',
    'text-body-lg',
    'text-caption',
    'text-caption-muted',
    'text-section-lead',
    'text-card-description',
    'text-stat-label',
    'text-promo-emphasis',
    'text-error-message',
    'text-cta-description',
    'text-quote-emphasis',
    'text-overlay-title',
    'text-overlay-value',
    // Responsive alignment utilities
    'text-mobile-center',
    'text-mobile-left',
    'text-card-center',
    'text-section-center',
    // Light grey styling for subtle text
    'text-neutral-text-subtle',
    // Dynamic section padding based on contentDensity
    'section-padding-compact',
    'section-padding-balanced',
    'section-padding-airy',
    // Transparent header padding classes (configurable via headerConfig.heroTopPadding)
    'pt-16',
    'pt-20',
    'pt-24',
    'pt-28',
    'pt-32',
    'pt-36',
    'pt-40',
    'pt-44',
    'pt-48',
    'md:pt-16',
    'md:pt-20',
    'md:pt-24',
    'md:pt-28',
    'md:pt-32',
    'md:pt-36',
    'md:pt-40',
    'md:pt-44',
    'md:pt-48',
    'lg:pt-16',
    'lg:pt-20',
    'lg:pt-24',
    'lg:pt-28',
    'lg:pt-32',
    'lg:pt-36',
    'lg:pt-40',
    'lg:pt-44',
    'lg:pt-48',
    // Dynamic pattern background classes (defined in CSS, but need to be preserved)
    'bg-grid-pattern',
    'bg-dots-pattern',
    'bg-waves-pattern',
    'bg-noise-pattern',
    'bg-triangle-pattern',
    'bg-crosshatch-pattern',
    'bg-hex-pattern',
    'bg-stripes-pattern',
    // Pattern opacity variants
    'opacity-[0.025]',
    'opacity-5',
    'opacity-[0.075]',
    'opacity-10',
    // Dynamic gradients used in components
    'bg-gradient-to-r',
    'from-brand-primary/10',
    'to-brand-hero-background',
    'bg-hero-gradient',
    // Computed brand color utilities
    'bg-brand-secondary-dark',
    'bg-brand-light',
    'bg-brand-dark',
    'text-brand-light',
    'hover:text-brand-light',
    // Drop shadow utilities for image enhancements (especially round images)
    'drop-shadow-sm',
    'drop-shadow-md',
    'drop-shadow-lg',
    'drop-shadow-xl',
    'drop-shadow-2xl', // Critical for round image shadows!
  ],
  prefix: '',
  theme: {
    // Configure the container utility's max-width at each breakpoint
    container: {
      center: true,
      padding: 'var(--container-padding)',
      screens: {
        sm: '1600px',
        md: '1600px',
        lg: '1600px',
        xl: '1600px', // increased from 1280px to 1440px
        '2xl': '1600px', // new extra-large cap
      },
    },
    extend: {
      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
      },
      borderWidth: {
        DEFAULT: 'var(--border-width-base)',
      },
      borderColor: {
        DEFAULT: 'var(--border-color-base)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      colors: {
        ...semanticColors,
        ...dynamicColors,
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-raleway)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        raleway: ['var(--font-raleway)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        // Clients slider scroll animation
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        blink: 'blink 1s step-end infinite',
        typing: 'typing 3.5s steps(40, end)',
        // Clients slider scroll
        scroll: 'scroll 80s linear infinite',
      },
      backgroundImage: {
        'concrete-texture': "url('/images/textures/concrete_texture_overlay_cleaned.png')",
        ...semanticGradients,
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
