import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-extra1/10 text-primary hover:bg-extra1/20',
        dark: 'border-transparent bg-primary/80 text-primary hover:bg-primary/70',
        secondary: 'border-transparent bg-secondary/10 text-secondary hover:bg-secondary/20',
        accent: 'border-transparent bg-accent/10 text-accent hover:bg-accent/20',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive-80',
        outline: 'text-foreground',
        light: 'border-transparent bg-brand-light/90 text-white/80 hover:bg-brand-light/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
