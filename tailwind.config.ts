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
  // Text color for card backgrounds
  'card-foreground': ({ opacityValue = 1 }) => `hsl(var(--card-foreground) / ${opacityValue})`,
  muted: ({ opacityValue = 1 }) => `hsl(var(--muted) / ${opacityValue})`,
  destructive: ({ opacityValue = 1 }) => `hsl(var(--destructive) / ${opacityValue})`,
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
    // Dynamic section padding based on contentDensity
    'section-padding-compact',
    'section-padding-balanced', 
    'section-padding-airy',
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
