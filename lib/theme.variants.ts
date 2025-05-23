/* eslint-disable no-restricted-syntax */
import { siteConfig as rawConfig } from './site.config.local';
import type { SiteConfig } from './siteConfig';

// Each entry here must match the full SiteConfig['theme'] schema
export const themeVariants: Record<string, SiteConfig['theme']> = {
  v1: rawConfig.theme,
  v2: {
    ...rawConfig.theme,
    colors: {
      // Base colors for Warm & Approachable: earthy, soft pastels
      ...rawConfig.theme.colors,
      primary: '#E07A5F', // terracotta
      secondary: '#81B29A', // sage green
      accent: '#F2CC8F', // warm ochre
      accent2: '#F28482', // soft coral
      accent3: '#D8C3A5', // sandy beige
      // Override background and text
      background: '#F4F1DE', // creamy off-white
      heroBackground: '#F4F1DE',
      header: '#3D405B', // gentle gray-purple
      body: '#6D6875', // muted mauve
      lightGrey: '#E07A5F', // terracotta tone light
    },
    typography: {
      headingFont: 'Nunito',
      bodyFont: 'Raleway',
      baseSize: '16px', // standard readable base size
      textStyle: rawConfig.theme.typography.textStyle,
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem',
    },
    borders: {
      radiusBase: '1rem', // soft, comforting rounding
      widthBase: '1px',
      colorBase: '#D8C3A5', // light sandy border
    },
    shadows: {
      sm: '0 1px 2px rgba(0,0,0,0.05)', // gentle shadow
      md: '0 2px 4px rgba(0,0,0,0.08)',
      lg: '0 4px 8px rgba(0,0,0,0.1)',
    },
    layout: {
      containerMaxWidth: '1024px',
      containerPadding: rawConfig.theme.layout.containerPadding,
    },
    animation: {
      speed: 'slow',
      style: 'smooth',
      intensity: 'moderate',
    },
    visualStyle: {
      cardStyle: 'subtle',
      borderRadius: 'soft',
      contentDensity: 'airy',
      patternStyle: 'noise',
      patternOpacity: 0.1,
    },
    sectionStyles: {
      ctaStyle: 'accent',
      dividerStyle: 'fade',
      heroStyle: 'pattern',
      testimonialStyle: 'cards',
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
      textStyle: rawConfig.theme.typography.textStyle,
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
      containerPadding: rawConfig.theme.layout.containerPadding,
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
      patternOpacity: 0.05,
    },
    sectionStyles: {
      ctaStyle: 'bold',
      dividerStyle: 'line',
      heroStyle: 'image',
      testimonialStyle: 'featured',
    },
  },
  // TODO: add 'final' variant combining v1 and v2 choices
};
