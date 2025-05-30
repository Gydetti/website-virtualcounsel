import { siteConfig } from '@/lib/siteConfig';

/**
 * Hook to get transparent header configuration and utilities
 * Useful for sections that need to account for transparent header spacing
 */
export function useTransparentHeader() {
  const headerConfig = siteConfig.theme.headerConfig;
  const isTransparentMode = headerConfig?.transparentMode ?? false;
  const heroTopPadding = headerConfig?.heroTopPadding ?? 'pt-20 md:pt-24 lg:pt-28';
  const transitionDuration = headerConfig?.transitionDuration ?? '300ms';
  const scrollThreshold = headerConfig?.scrollThreshold ?? 50;

  /**
   * Get the appropriate top spacing class for hero-like sections
   * @param isHeroSection - Whether this is a hero section that should receive spacing
   * @returns CSS class string for top spacing, or empty string if not needed
   */
  const getHeroSpacing = (isHeroSection = true) => {
    return isTransparentMode && isHeroSection ? heroTopPadding : '';
  };

  /**
   * Check if transparent header mode is enabled and should affect layout
   */
  const shouldApplySpacing = (isHeroSection = true) => {
    return isTransparentMode && isHeroSection;
  };

  return {
    isTransparentMode,
    heroTopPadding,
    transitionDuration,
    scrollThreshold,
    getHeroSpacing,
    shouldApplySpacing,
  };
}
