'use client';
import './spark-button.css';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white shadow-md hover:shadow-lg hover:bg-primary hover:brightness-110 active:shadow-sm active:translate-y-0.5 transition-all duration-200',
        destructive:
          'bg-destructive text-destructive-foreground shadow-md hover:shadow-lg active:shadow-sm active:translate-y-0.5 transition-all duration-200 hover:bg-destructive-90',
        outline:
          'border border-input bg-neutral-background shadow-md hover:shadow-lg active:shadow-sm active:translate-y-0.5 transition-all duration-200 hover:bg-accent/10 hover:text-accent-foreground',
        secondary:
          'bg-[var(--secondary)] text-secondary-foreground shadow-md hover:shadow-lg active:shadow-sm active:translate-y-0.5 transition-all duration-200 hover:bg-secondary/90',
        ghost: 'hover:bg-accent/10 hover:text-accent-foreground active:bg-accent/20',
        link: 'text-primary underline-offset-4 hover:underline',
        white:
          'bg-neutral-surface text-neutral-text shadow-md hover:shadow-lg active:shadow-sm active:translate-y-0.5 transition-all duration-200 hover:bg-neutral-surface/90',
        spark:
          'bg-primary text-white shadow-md hover:shadow-lg active:shadow-sm active:translate-y-0.5 transition-all duration-200 hover:bg-primary hover:brightness-110',
        sparkextra1:
          'bg-extra1 text-white shadow-md hover:shadow-lg active:shadow-sm active:translate-y-0.5 transition-all duration-200 hover:bg-extra1 hover:brightness-110',
      },
      size: {
        default: 'px-4 py-2.5',
        sm: 'px-3 py-2.5 rounded-md',
        lg: 'px-8 py-2.5 rounded-md',
        icon: 'size-10',
      },
      elevation: {
        flat: 'shadow-none border border-gray-200',
        subtle: 'shadow-sm',
        medium: 'shadow-md',
        pronounced: 'shadow-lg',
      },
      animation: {
        none: '',
        subtle: 'transition-transform hover:-translate-y-0.5 active:translate-y-0.5',
        moderate: 'transition-transform hover:-translate-y-1 active:translate-y-0.5',
        pronounced: 'transition-transform hover:-translate-y-1.5 active:translate-y-0.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      elevation: 'medium',
      animation: 'subtle',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, elevation, animation, asChild = false, children, ...props },
    ref
  ) => {
    // Get animation settings from site config
    const configIntensity = siteConfig.theme.animation?.intensity || 'subtle';
    const configSpeed = siteConfig.theme.animation?.speed || 'balanced';

    // Apply animation speed from config
    const speedClass =
      configSpeed === 'fast'
        ? 'duration-150'
        : configSpeed === 'slow'
          ? 'duration-500'
          : 'duration-300';

    // Use micro-interactions if enabled in config
    const microClass = siteConfig.features.enableMicroInteractions
      ? cn('transition-all', speedClass, animation !== 'none' && 'hover:scale-[1.025]')
      : '';

    const Comp = asChild ? Slot : 'button';
    // Detect any variant containing 'spark' to apply spark effect
    const variantStr = String(variant);
    const isSpark = variantStr.includes('spark');

    if (isSpark) {
      return (
        <Comp
          ref={ref}
          type={props.type || 'button'}
          className={cn(
            // apply styling for the specific spark variant (e.g. 'spark', 'sparkExtra1')
            buttonVariants({ variant, size, elevation, animation }),
            microClass,
            'spark-button',
            className
          )}
          {...props}
        >
          <span className="spark__container">
            <span className="spark" />
          </span>
          <span className="backdrop" />
          <span className="text">{children}</span>
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, elevation, animation }),
          microClass,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
