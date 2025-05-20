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
      neutral1: rawConfig.theme.colors.neutral2,
      neutral2: rawConfig.theme.colors.neutral3,
      neutral3: rawConfig.theme.colors.neutral4,
      neutral4: rawConfig.theme.colors.neutral5,
      neutral5: rawConfig.theme.colors.neutral6,
      neutral6: rawConfig.theme.colors.neutral7,
      neutral7: rawConfig.theme.colors.neutral8,
      neutral8: rawConfig.theme.colors.neutral9,
      neutral9: rawConfig.theme.colors.neutral10,
      neutral10: rawConfig.theme.colors.neutral11,
      neutral11: rawConfig.theme.colors.neutral12,
      neutral12: rawConfig.theme.colors.neutral13,
      neutral13: rawConfig.theme.colors.neutral14,
      neutral14: rawConfig.theme.colors.neutral15,
      neutral15: rawConfig.theme.colors.neutral1,
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
      primary: '#985A3D', // Complement of base primary
      secondary: '#BFD5BE', // Complement of base secondary
      accent: '#50A8F7', // Complementary accent
      accent2: '#66FF99', // Secondary complement
      accent3: '#002100', // Tertiary complement
      neutral1: '#DFDFDF', // Inverse neutral1
      neutral2: '#CFCFCC', // Inverse neutral2
      neutral3: '#0E0E0E', // Inverse neutral3
      neutral4: '#913E1B', // Inverse neutral4
      neutral5: '#B7530F', // Inverse neutral5
      neutral6: '#63393C', // Inverse neutral6
      neutral7: '#35121A', // Inverse neutral7
      neutral8: '#996A6D', // Inverse neutral8
      neutral9: '#FDD0F4', // Inverse neutral9
      neutral10: '#C376B7', // Inverse neutral10
      neutral11: '#9E318F', // Inverse neutral11
      neutral12: '#A56C02', // Inverse neutral12
      neutral13: '#7E5200', // Inverse neutral13
      neutral14: '#423316', // Inverse neutral14
      neutral15: '#070707', // Inverse neutral15
      background: '#000000', // Dark mode background
      heroBackground: '#1A1A1A',
      header: '#FFFFFF', // Light mode header text
      body: '#CCCCCC', // Light grey body text
      lightGrey: '#3D3D3D', // Dark neutral surfaces
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
