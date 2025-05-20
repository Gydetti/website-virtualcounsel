/* eslint-disable no-restricted-syntax */
import type { SiteConfig } from './siteConfig';
import { siteConfig as rawConfig } from './site.config.local';

// Each entry here must match the full SiteConfig['theme'] schema
export const themeVariants: Record<string, SiteConfig['theme']> = {
  v1: rawConfig.theme,
  v2: {
    ...rawConfig.theme,
    colors: {
      primary: '#1F2937', // dark slate
      secondary: '#10B981', // emerald
      accent: '#F59E0B', // amber accent
      background: '#111827', // dark background
      header: '#F9FAFB', // light header text
      body: '#E5E7EB', // light body text
      lightGrey: '#374151', // mid-gray surfaces
      heroBackground: '#1F2937', // dark hero background
    },
    typography: {
      headingFont: 'Montserrat',
      bodyFont: 'Roboto',
      baseSize: '18px', // slightly larger base font
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem',
    },
    borders: {
      radiusBase: '1rem', // larger rounded corners
      widthBase: '2px',
      colorBase: '#4B5563', // darker neutral border
    },
    shadows: {
      sm: '0 2px 4px rgba(0,0,0,0.1)',
      md: '0 6px 8px rgba(0,0,0,0.15)',
      lg: '0 12px 20px rgba(0,0,0,0.2)',
    },
    layout: {
      containerMaxWidth: '1024px',
      containerPadding: '1.5rem',
    },
  },
  v3: {
    ...rawConfig.theme,
    colors: {
      primary: '#C084FC', // purple
      secondary: '#F472B6', // pink
      accent: '#FBBF24', // yellow accent
      background: '#FAF5FF', // light lavender
      header: '#6B21A8', // deep purple text
      body: '#4C1D95', // purple text
      lightGrey: '#EDE9FE', // light violet surfaces
      heroBackground: '#F3E8FF', // soft purple hero background
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Open Sans',
      baseSize: '17px',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.75rem',
      md: '1.25rem',
      lg: '1.75rem',
      xl: '2.5rem',
    },
    borders: {
      radiusBase: '0.75rem',
      widthBase: '1px',
      colorBase: '#DDD6FE',
    },
    shadows: {
      sm: '0 1px 3px rgba(0,0,0,0.1)',
      md: '0 4px 6px rgba(0,0,0,0.1)',
      lg: '0 10px 15px rgba(0,0,0,0.1)',
    },
    layout: {
      containerMaxWidth: '1200px',
      containerPadding: '1.25rem',
    },
  },
  // TODO: add 'final' variant combining v1 and v2 choices
};
