'use client';

import Image from 'next/image';
import type { ReactEventHandler } from 'react';
import { useState } from 'react';

import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: ReactEventHandler<HTMLImageElement>;
  /** Drop shadow effect - applies filter drop-shadow to the image itself */
  dropShadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string;
}

/**
 * Helper function to convert dropShadow prop to Tailwind utility class
 * ⚠️ CRITICAL: Must handle '2xl' case explicitly to avoid drop-shadow-[2xl] bug
 */
const getDropShadowClass = (shadow: string) => {
  switch (shadow) {
    case 'sm':
      return 'drop-shadow-sm';
    case 'md':
      return 'drop-shadow-md';
    case 'lg':
      return 'drop-shadow-lg';
    case 'xl':
      return 'drop-shadow-xl';
    case '2xl':
      return 'drop-shadow-2xl'; // ESSENTIAL FIX: Explicit case for 2xl
    case 'none':
      return '';
    default:
      // Handle custom drop-shadow values
      return shadow.startsWith('drop-shadow') ? shadow : `drop-shadow-[${shadow}]`;
  }
};

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  className,
  objectFit = 'cover',
  onLoad,
  onError,
  dropShadow = 'none',
}: OptimizedImageProps) {
  // Initialize isLoading based on priority to skip skeleton for priority images
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  // Handle image error and fallback to default placeholder
  const handleImageError: ReactEventHandler<HTMLImageElement> = event => {
    setHasError(true);
    setIsLoading(false);
    if (onError) onError(event);
  };

  // Default sizes if not provided
  const defaultSizes = fill
    ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    : undefined;

  // Remove overflow-hidden when dropShadow is active to prevent clipping
  const containerOverflow = dropShadow !== 'none' ? '' : 'overflow-hidden';

  return (
    <div className={cn('relative', containerOverflow, className)}>
      {isLoading && (
        <div
          className="absolute inset-0 bg-neutral-background/200 animate-pulse"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        />
      )}
      <Image
        src={hasError ? DEFAULT_PLACEHOLDER_IMAGE : src || DEFAULT_PLACEHOLDER_IMAGE}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes || defaultSizes}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'fill' && 'object-fill',
          objectFit === 'none' && 'object-none',
          objectFit === 'scale-down' && 'object-scale-down',
          // Apply drop shadow class directly to the image
          getDropShadowClass(dropShadow)
        )}
      />
    </div>
  );
}
