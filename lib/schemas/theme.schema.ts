// Placeholder for theme-related Zod schemas (colors, typography, spacing, etc.)
import { z } from 'zod';

import { imageSchema } from './common.schema';

export const placeholderThemeSchema = z.object({});

export const typographySchema = z.object({
  headingFont: z.string().min(1, 'Heading font cannot be empty'),
  bodyFont: z.string().min(1, 'Body font cannot be empty'),
  baseSize: z.string().default('16px'),
  textStyle: z.enum(['balanced', 'tight', 'airy']).default('balanced'),
});

export const spacingScaleSchema = z.object({
  xs: z.string().min(1, 'Spacing xs cannot be empty'),
  sm: z.string().min(1, 'Spacing sm cannot be empty'),
  md: z.string().min(1, 'Spacing md cannot be empty'),
  lg: z.string().min(1, 'Spacing lg cannot be empty'),
  xl: z.string().min(1, 'Spacing xl cannot be empty'),
});

export const borderSchema = z.object({
  radiusBase: z.string().min(1, 'Border radius cannot be empty'),
  widthBase: z.string().min(1, 'Border width cannot be empty'),
  colorBase: z.string().min(1, 'Border color cannot be empty'),
  // Element-specific border radius scales
  radiusScales: z
    .object({
      // Small elements like badges, pills, indicators
      xs: z.string().default('0.125rem'), // 2px
      sm: z.string().default('0.25rem'), // 4px
      // Default elements like buttons, inputs
      md: z.string().default('0.375rem'), // 6px
      lg: z.string().default('0.5rem'), // 8px
      // Large elements like cards, sections
      xl: z.string().default('0.75rem'), // 12px
      '2xl': z.string().default('1rem'), // 16px
      '3xl': z.string().default('1.5rem'), // 24px
      // Special cases
      full: z.string().default('9999px'), // Fully rounded
      none: z.string().default('0px'), // No rounding
    })
    .optional(),
});

export const shadowSchema = z.object({
  sm: z.string().min(1, 'Shadow sm cannot be empty'),
  md: z.string().min(1, 'Shadow md cannot be empty'),
  lg: z.string().min(1, 'Shadow lg cannot be empty'),
  // Enhanced shadow system
  flat: z.string().optional(),
  subtle: z.string().optional(),
  medium: z.string().optional(),
  pronounced: z.string().optional(),
});

export const layoutSchema = z.object({
  containerMaxWidth: z.string().min(1, 'Container max width cannot be empty'),
  containerPadding: z.string().min(1, 'Container padding cannot be empty'),
});

export const animationSchema = z
  .object({
    speed: z.enum(['fast', 'balanced', 'slow']).default('balanced'),
    style: z.enum(['smooth', 'bounce', 'energetic']).default('smooth'),
    intensity: z.enum(['subtle', 'moderate', 'pronounced']).default('subtle'),
  })
  .optional();

export const visualStyleSchema = z
  .object({
    cardStyle: z.enum(['flat', 'subtle', 'pronounced']).default('subtle'),
    borderRadius: z.enum(['sharp', 'medium', 'soft']).default('medium'),
    contentDensity: z.enum(['compact', 'balanced', 'airy']).default('balanced'),
    patternStyle: z
      .enum(['none', 'dots', 'grid', 'waves', 'noise', 'triangles', 'hexagons', 'crosshatch'])
      .default('dots'),
    patternOpacity: z.number().min(0).max(1).default(0.05),
    // Element-specific border radius mappings based on borderRadius setting
    borderRadiusMappings: z
      .object({
        // Small UI elements (badges, pills, indicators)
        badge: z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'none']).default('sm'),
        pill: z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'none']).default('full'),
        indicator: z
          .enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'none'])
          .default('full'),

        // Form elements
        button: z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'none']).default('md'),
        input: z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'none']).default('md'),

        // Content containers
        card: z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'none']).default('lg'),
        modal: z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'none']).default('xl'),
        section: z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'none']).default('xl'),

        // Media elements
        image: z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'none']).default('lg'),
        avatar: z
          .enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'none'])
          .default('full'),

        // Navigation elements
        nav: z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'none']).default('md'),
        dropdown: z
          .enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'none'])
          .default('md'),
      })
      .optional(),
  })
  .optional();

export const themeSectionStylesSchema = z
  .object({
    dividerStyle: z.enum(['none', 'line', 'gradient', 'fade']).default('fade'),
    heroStyle: z.enum(['flat', 'gradient', 'pattern', 'image']).default('gradient'),
    testimonialStyle: z.enum(['minimal', 'cards', 'featured']).default('cards'),
    ctaStyle: z.string().default('accent'),
  })
  .optional();

// Header configuration schema
export const headerConfigSchema = z
  .object({
    // Enable transparent header that overlaps hero sections
    transparentMode: z.boolean().default(false),
    // Background color when scrolled (only applies in transparent mode)
    scrolledBackgroundColor: z.string().optional(), // e.g., 'bg-white/95'
    // Extra padding to add to hero sections when transparent mode is enabled
    heroTopPadding: z.string().default('pt-24'), // Tailwind class(es) for top padding - supports responsive classes
    // Transition settings for smooth animations
    transitionDuration: z.string().default('300ms'),
    // Scroll threshold before background appears (in pixels)
    scrollThreshold: z.number().default(50),
    // Text color configuration
    textColors: z
      .object({
        // Whether to change text colors based on scroll state
        changeOnScroll: z.boolean().default(true),
        // Text color when header is transparent (only used if changeOnScroll is true)
        transparentMode: z.string().default('text-white'),
        // Text color when header has background (always used, or when changeOnScroll is false)
        scrolledMode: z.string().default('text-foreground'),
      })
      .optional(),
    // Button/CTA colors in header
    ctaColors: z
      .object({
        // Whether to change CTA colors based on scroll state
        changeOnScroll: z.boolean().default(true),
        // CTA styling when header is transparent
        transparentMode: z
          .string()
          .default('border-white text-white hover:bg-white hover:text-black'),
        // CTA styling when header has background
        scrolledMode: z
          .string()
          .default('border-primary text-primary hover:bg-primary hover:text-white'),
      })
      .optional(),
  })
  .optional();

export const themeSchema = z.object({
  colors: z
    .object({
      primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
        message: 'Invalid primary color hex',
      }),
      secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
        message: 'Invalid secondary color hex',
      }),
      accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
        message: 'Invalid accent color hex',
      }),
      background: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, { message: 'Invalid background color hex' })
        .optional(),
      header: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, { message: 'Invalid header color hex' })
        .optional(),
      body: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, { message: 'Invalid body color hex' })
        .optional(),
      lightGrey: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, { message: 'Invalid light grey color hex' })
        .optional(),
      heroBackground: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, { message: 'Invalid hero background color hex' })
        .optional(),
    })
    .catchall(z.string().regex(/^#[0-9A-Fa-f]{6}$/, { message: 'Invalid color hex' })),
  logo: imageSchema.extend({ subtitle: z.string().optional() }),
  favicon: z.string().min(1, 'Favicon path cannot be empty'),
  typography: typographySchema,
  spacing: spacingScaleSchema,
  borders: borderSchema,
  shadows: shadowSchema,
  layout: layoutSchema,
  // New animation configuration
  animation: animationSchema,
  // Visual style configuration
  visualStyle: visualStyleSchema,
  // Section treatment configuration
  sectionStyles: themeSectionStylesSchema,
  // New header configuration
  headerConfig: headerConfigSchema,
});
