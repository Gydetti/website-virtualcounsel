'use client';

import Image from 'next/image';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import { cn } from '@/lib/utils';

type BorderRadiusScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'none';

export interface ThemedImageProps extends ComponentProps<typeof Image> {
  borderRadiusOverride?: BorderRadiusScale;
  variant?: 'avatar' | 'image' | 'hero' | 'thumbnail';
}

const ThemedImage = forwardRef<React.ElementRef<typeof Image>, ThemedImageProps>(
  ({ className, borderRadiusOverride, variant = 'image', ...props }, ref) => {
    const { getBorderRadiusClass } = useThemeBorderRadius();

    // Map variants to element types for border radius
    const variantToElementType: Record<string, 'image' | 'avatar'> = {
      avatar: 'avatar',
      image: 'image',
      hero: 'image',
      thumbnail: 'image',
    };

    const elementType = variantToElementType[variant] || 'image';
    const borderRadiusClass = getBorderRadiusClass(elementType, borderRadiusOverride);

    return <Image ref={ref} className={cn(borderRadiusClass, className)} alt={props.alt ?? ''} {...props} />;
  }
);

ThemedImage.displayName = 'ThemedImage';

export { ThemedImage };
