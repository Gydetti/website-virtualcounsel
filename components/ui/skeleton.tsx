import type { HTMLAttributes } from 'react';

import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { getElementBorderRadius } = useThemeBorderRadius();

  return (
    <div
      className={cn(`animate-pulse ${getElementBorderRadius('card')} bg-muted`, className)}
      {...props}
    />
  );
}

export { Skeleton };
