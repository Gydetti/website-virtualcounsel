/* eslint-disable no-restricted-syntax */
import { siteConfig as rawConfig } from './site.config.local';
import type { SiteConfig } from './siteConfig';

// Each entry here must match the full SiteConfig['theme'] schema
export const themeVariants: Record<string, SiteConfig['theme']> = {
  v1: rawConfig.theme,
  v2: {
    ...rawConfig.theme,
    colors: {
      ...rawConfig.theme.colors,
      primary: rawConfig.theme.colors.secondary,
      secondary: rawConfig.theme.colors.primary,
      accent: rawConfig.theme.colors.accent2,
      accent2: rawConfig.theme.colors.accent3,
      accent3: rawConfig.theme.colors.accent,
      extra1: rawConfig.theme.colors.extra2,
      extra2: rawConfig.theme.colors.extra3,
      extra3: rawConfig.theme.colors.extra4,
      extra4: rawConfig.theme.colors.extra5,
      extra5: rawConfig.theme.colors.extra6,
      extra6: rawConfig.theme.colors.extra7,
      extra7: rawConfig.theme.colors.extra8,
      extra8: rawConfig.theme.colors.extra9,
      extra9: rawConfig.theme.colors.extra10,
      extra10: rawConfig.theme.colors.extra11,
      extra11: rawConfig.theme.colors.extra12,
      extra12: rawConfig.theme.colors.extra13,
      extra13: rawConfig.theme.colors.extra14,
      extra14: rawConfig.theme.colors.extra15,
      extra15: rawConfig.theme.colors.extra1,
      background: rawConfig.theme.colors.heroBackground as string,
      heroBackground: rawConfig.theme.colors.background as string,
      header: rawConfig.theme.colors.body as string,
      body: rawConfig.theme.colors.header as string,
      lightGrey: rawConfig.theme.colors.lightGrey as string,
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
      colorBase: '#4B5563', // darker extra border
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
      primary: '#985A3D', // Complement of base primary
      secondary: '#BFD5BE', // Complement of base secondary
      accent: '#50A8F7', // Complementary accent
      accent2: '#66FF99', // Secondary complement
      accent3: '#002100', // Tertiary complement
      extra1: '#DFDFDF', // Inverse extra1
      extra2: '#CFCFCC', // Inverse extra2
      extra3: '#0E0E0E', // Inverse extra3
      extra4: '#913E1B', // Inverse extra4
      extra5: '#B7530F', // Inverse extra5
      extra6: '#63393C', // Inverse extra6
      extra7: '#35121A', // Inverse extra7
      extra8: '#996A6D', // Inverse extra8
      extra9: '#FDD0F4', // Inverse extra9
      extra10: '#C376B7', // Inverse extra10
      extra11: '#9E318F', // Inverse extra11
      extra12: '#A56C02', // Inverse extra12
      extra13: '#7E5200', // Inverse extra13
      extra14: '#423316', // Inverse extra14
      extra15: '#070707', // Inverse extra15
      background: '#000000', // Dark mode background
      heroBackground: '#1A1A1A',
      header: '#FFFFFF', // Light mode header text
      body: '#CCCCCC', // Light grey body text
      lightGrey: '#3D3D3D', // Dark extra surfaces
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
