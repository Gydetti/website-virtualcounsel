import { siteConfig } from '@/lib/site.config.local';

type ElementType =
  | 'badge'
  | 'pill'
  | 'indicator'
  | 'button'
  | 'input'
  | 'card'
  | 'modal'
  | 'section'
  | 'image'
  | 'avatar'
  | 'nav'
  | 'dropdown';

type BorderRadiusScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'none';

/**
 * Hook that provides dynamic border radius classes based on theme configuration
 * Combines the global borderRadius setting (sharp/medium/soft) with element-specific mappings
 */
export function useThemeBorderRadius() {
  const globalBorderRadius = siteConfig.theme.visualStyle?.borderRadius || 'medium';
  const borderRadiusMappings = siteConfig.theme.visualStyle?.borderRadiusMappings;

  /**
   * Get the appropriate border radius class for a specific element type
   * @param elementType - The type of element (button, card, image, etc.)
   * @param override - Optional override for specific use cases
   * @returns Tailwind CSS border radius class
   */
  const getBorderRadiusClass = (elementType: ElementType, override?: BorderRadiusScale): string => {
    // Use override if provided
    if (override) {
      return getRadiusClassFromScale(override);
    }

    // Get the base scale for this element type
    const baseScale = borderRadiusMappings?.[elementType] || getDefaultScaleForElement(elementType);

    // Adjust the scale based on global border radius setting
    const adjustedScale = adjustScaleForGlobalSetting(baseScale, globalBorderRadius);

    return getRadiusClassFromScale(adjustedScale);
  };

  /**
   * Get CSS custom property for border radius
   * @param elementType - The type of element
   * @param override - Optional override
   * @returns CSS custom property string
   */
  const getBorderRadiusVar = (elementType: ElementType, override?: BorderRadiusScale): string => {
    const scale =
      override || borderRadiusMappings?.[elementType] || getDefaultScaleForElement(elementType);
    const adjustedScale = adjustScaleForGlobalSetting(scale, globalBorderRadius);
    return `var(--radius-${adjustedScale})`;
  };

  // Alias for backwards compatibility with existing components
  const getElementBorderRadius = getBorderRadiusClass;

  return {
    getBorderRadiusClass,
    getElementBorderRadius,
    getBorderRadiusVar,
    globalBorderRadius,
    borderRadiusMappings,
  };
}

/**
 * Convert border radius scale to Tailwind CSS class
 */
function getRadiusClassFromScale(scale: BorderRadiusScale): string {
  const scaleMap: Record<BorderRadiusScale, string> = {
    xs: 'rounded-sm', // 0.125rem -> closest Tailwind equivalent
    sm: 'rounded', // 0.25rem
    md: 'rounded-md', // 0.375rem
    lg: 'rounded-lg', // 0.5rem
    xl: 'rounded-xl', // 0.75rem
    '2xl': 'rounded-2xl', // 1rem
    '3xl': 'rounded-3xl', // 1.5rem
    full: 'rounded-full', // 9999px
    none: 'rounded-none', // 0px
  };

  return scaleMap[scale] || 'rounded-md';
}

/**
 * Get default scale for element type if not configured
 */
function getDefaultScaleForElement(elementType: ElementType): BorderRadiusScale {
  const defaults: Record<ElementType, BorderRadiusScale> = {
    badge: 'sm',
    pill: 'full',
    indicator: 'full',
    button: 'md',
    input: 'md',
    card: 'lg',
    modal: 'xl',
    section: 'xl',
    image: 'lg',
    avatar: 'full',
    nav: 'md',
    dropdown: 'md',
  };

  return defaults[elementType] || 'md';
}

/**
 * Adjust the border radius scale based on global setting
 */
function adjustScaleForGlobalSetting(
  baseScale: BorderRadiusScale,
  globalSetting: 'sharp' | 'medium' | 'soft'
): BorderRadiusScale {
  // Special cases that don't change
  if (baseScale === 'full' || baseScale === 'none') {
    return baseScale;
  }

  const scaleOrder: BorderRadiusScale[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
  const currentIndex = scaleOrder.indexOf(baseScale);

  if (currentIndex === -1) return baseScale;

  switch (globalSetting) {
    case 'sharp':
      // Reduce border radius by one step (minimum xs)
      return scaleOrder[Math.max(0, currentIndex - 1)] || baseScale;
    case 'soft':
      // Increase border radius by one step (maximum 3xl)
      return scaleOrder[Math.min(scaleOrder.length - 1, currentIndex + 1)] || baseScale;
    case 'medium':
      // Keep the base scale
      return baseScale;
  }

  // Fallback for unexpected values
  return baseScale;
}
