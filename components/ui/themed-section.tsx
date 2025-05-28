'use client';

import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import { cn } from '@/lib/utils';

type BorderRadiusScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'none';

export interface ThemedSectionProps extends HTMLAttributes<HTMLDivElement> {
  borderRadiusOverride?: BorderRadiusScale;
  variant?: 'section' | 'card' | 'modal' | 'nav';
  hasBackground?: boolean;
  hasBorder?: boolean;
  hasShadow?: boolean;
}

const ThemedSection = forwardRef<HTMLDivElement, ThemedSectionProps>(
  (
    {
      className,
      borderRadiusOverride,
      variant = 'section',
      hasBackground = false,
      hasBorder = false,
      hasShadow = false,
      ...props
    },
    ref
  ) => {
    const { getBorderRadiusClass } = useThemeBorderRadius();

    // Map variants to element types for border radius
    const variantToElementType: Record<string, 'section' | 'card' | 'modal' | 'nav'> = {
      section: 'section',
      card: 'card',
      modal: 'modal',
      nav: 'nav',
    };

    const elementType = variantToElementType[variant] || 'section';
    const borderRadiusClass = getBorderRadiusClass(elementType, borderRadiusOverride);

    // Optional styling based on props
    const backgroundClass = hasBackground ? 'bg-neutral-surface/50' : '';
    const borderClass = hasBorder ? 'border border-border/50' : '';
    const shadowClass = hasShadow ? 'shadow-sm hover:shadow-md transition-shadow' : '';

    return (
      <div
        ref={ref}
        className={cn(borderRadiusClass, backgroundClass, borderClass, shadowClass, className)}
        {...props}
      />
    );
  }
);

ThemedSection.displayName = 'ThemedSection';

export { ThemedSection };
