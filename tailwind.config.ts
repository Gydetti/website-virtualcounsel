import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { semanticColors, semanticGradients } from './theme/colors';
import { siteConfig } from './lib/siteConfig';

// Convert camelCase to kebab-case for utility names
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
        ...semanticColors,
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        blink: 'blink 1s step-end infinite',
        typing: 'typing 3.5s steps(40, end)',
      },
      backgroundImage: {
        'concrete-texture': "url('/images/textures/concrete_texture_overlay_cleaned.png')",
        ...semanticGradients,
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(({ matchUtilities, theme }) => {
      const colors = Object.keys(siteConfig.theme.colors);
      for (const color of colors) {
        const name = toKebabCase(color);
        matchUtilities(
          {
            [`bg-${name}`]: value => ({
              'background-color': `rgba(var(--${name}-rgb), ${value})`,
            }),
            [`text-${name}`]: value => ({
              color: `rgba(var(--${name}-rgb), ${value})`,
            }),
            [`border-${name}`]: value => ({
              'border-color': `rgba(var(--${name}-rgb), ${value})`,
            }),
          },
          { values: theme('opacity') }
        );
      }
    }),
  ],
} satisfies Config;

export default config;
