/**
 * Semantic color token definitions.
 * Each token maps to a CSS variable defined in globals.css.
 * Purpose-based naming ensures clarity and future flexibility.
 */
export const semanticColors = {
  brand: {
    primary: ({ opacityValue = 1 }: { opacityValue?: number }) =>
      `hsl(var(--brand-primary) / ${opacityValue})`,
    light: ({ opacityValue = 1 }: { opacityValue?: number }) =>
      `rgb(var(--brand-light-rgb) / ${opacityValue})`,
    'light-2': ({ opacityValue = 1 }: { opacityValue?: number }) =>
      `rgb(var(--brand-light-2-rgb) / ${opacityValue})`,
    dark: ({ opacityValue = 1 }: { opacityValue?: number }) =>
      `rgb(var(--brand-dark-rgb) / ${opacityValue})`,
    'dark-2': ({ opacityValue = 1 }: { opacityValue?: number }) =>
      `rgb(var(--brand-dark-2-rgb) / ${opacityValue})`,
    'light-3': ({ opacityValue = 1 }: { opacityValue?: number }) =>
      `rgb(var(--brand-light-3-rgb) / ${opacityValue})`,
    'dark-3': ({ opacityValue = 1 }: { opacityValue?: number }) =>
      `rgb(var(--brand-dark-3-rgb) / ${opacityValue})`,
    secondary: ({ opacityValue = 1 }: { opacityValue?: number }) =>
      `rgb(var(--brand-secondary-rgb) / ${opacityValue})`,
    'secondary-light': ({ opacityValue = 1 }: { opacityValue?: number }) =>
      `rgb(var(--brand-secondary-light-rgb) / ${opacityValue})`,
    'secondary-dark': ({ opacityValue = 1 }: { opacityValue?: number }) =>
      `rgb(var(--brand-secondary-dark-rgb) / ${opacityValue})`,
    heroBackground: ({ opacityValue = 1 }: { opacityValue?: number }) =>
      `rgb(var(--brand-hero-background-rgb) / ${opacityValue})`,
    'accent-light': ({ opacityValue = 1 }: { opacityValue?: number }) =>
      `rgb(var(--brand-accent-light-rgb) / ${opacityValue})`,
    'accent-dark': ({ opacityValue = 1 }: { opacityValue?: number }) =>
      `rgb(var(--brand-accent-dark-rgb) / ${opacityValue})`,
  },
  neutral: {
    background: 'hsl(var(--background))', // page backgrounds, sections
    surface: 'hsl(var(--card))', // card and surface backgrounds
    text: 'hsl(var(--foreground))', // primary body text
    divider: 'hsl(var(--border))', // borders and dividers

    // CTA outline border color (maps from Tailwind `border-gray-400`, #9CA3AF)
    'border-strong': 'hsl(217.5 16% 64%)',
    // CTA secondary text color (maps from Tailwind `text-gray-200`, #E5E7EB)
    'text-subtle': 'hsl(210 16% 93%)',
  },
  feedback: {
    'error-bg': 'hsl(var(--destructive))', // error backgrounds
    'error-text': 'hsl(var(--destructive-foreground))',
    'success-bg': 'hsl(var(--muted))', // success backgrounds
    'success-text': 'hsl(var(--muted-foreground))',
    'warning-bg': 'hsl(var(--accent))', // warning backgrounds (accent)
    'warning-text': 'hsl(var(--accent-foreground))',
  },
  // General asset colors for visuals and charts
  asset: {
    // Band accent color for assets (mapped to theme accent)
    band: 'hsl(var(--brand-accent))',
  },
};

/**
 * Semantic gradient token definitions.
 * Use CSS gradients referencing CSS variables for stops.
 */
export const semanticGradients = {
  // Original newsletter subscription gradient from the archived template
  'hero-gradient':
    'linear-gradient(to bottom right, var(--brand-secondary-dark) 0%, hsl(var(--brand-secondary)) 50%, hsl(var(--brand-primary)) 100%)',
  'footer-gradient':
    'linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--brand-dark)) 100%)',
  // Global body gradient from primary color into transparent
  'body-gradient':
    'linear-gradient(to bottom right, rgb(var(--extra1-rgb) / 0.1) 0%, transparent 100%)',
};
