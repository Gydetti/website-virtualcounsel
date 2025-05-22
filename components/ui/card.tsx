import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';

const cardVariants = cva('rounded-lg border bg-card text-card-foreground', {
  variants: {
    elevation: {
      flat: 'shadow-none',
      subtle: 'shadow-sm',
      medium: 'shadow-md',
      pronounced: 'shadow-lg',
    },
    hover: {
      none: '',
      lift: 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
      grow: 'transition-all duration-300 hover:shadow-lg hover:scale-[1.02]',
      highlight: 'transition-all duration-300 hover:shadow-lg hover:border-primary/50',
    },
    border: {
      none: 'border-0',
      subtle: 'border border-border/50',
      normal: 'border border-border',
      accent: 'border border-primary/20',
    },
    padding: {
      none: 'p-0',
      small: 'p-3',
      medium: 'p-4',
      large: 'p-6',
    },
  },
  defaultVariants: {
    elevation: 'subtle',
    hover: 'none',
    border: 'normal',
    padding: 'none',
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  equalHeight?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevation, hover, border, padding, equalHeight, ...props }, ref) => {
    // Get default card style from site config if available
    const configCardStyle = siteConfig.theme.visualStyle?.cardStyle || 'subtle';

    // Map config style to elevation if not explicitly set
    const mappedElevation =
      elevation ||
      (configCardStyle === 'flat'
        ? 'flat'
        : configCardStyle === 'pronounced'
          ? 'pronounced'
          : 'subtle');

    // Apply equal height class if requested
    const heightClass = equalHeight ? 'flex flex-col h-full' : '';

    // Use micro-interactions if enabled
    const shouldAddHover = siteConfig.features.enableMicroInteractions && hover === 'none';
    const mappedHover = shouldAddHover ? 'lift' : hover;

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({
            elevation: mappedElevation,
            hover: mappedHover,
            border,
            padding,
          }),
          heightClass,
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0 flex-grow', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0 mt-auto', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
