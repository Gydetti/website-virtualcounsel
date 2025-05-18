/**
 * Semantic color token definitions.
 * Each token maps to a CSS variable defined in globals.css.
 * Purpose-based naming ensures clarity and future flexibility.
 */
export const semanticColors = {
  brand: {
    primary: 'hsl(var(--brand-primary))',
    light: 'hsl(var(--brand-light))',
    dark: 'hsl(var(--brand-dark))',
    secondary: 'hsl(var(--brand-secondary))',
    heroBackground: 'hsl(var(--brand-hero-background))',
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
    // Band accent color for assets (hex #3C82F6)
    band: 'hsl(217.5 91.3% 60%)',
  },
};

/**
 * Semantic gradient token definitions.
 * Use CSS gradients referencing CSS variables for stops.
 */
export const semanticGradients = {
  'hero-gradient': 'linear-gradient(90deg, hsl(var(--brand-light)) 0%, hsl(var(--card)) 100%)',
  'footer-gradient':
    'linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--brand-dark)) 100%)',
  // Global body gradient from primary color into transparent
  'body-gradient':
    'linear-gradient(to bottom right, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)',
};
