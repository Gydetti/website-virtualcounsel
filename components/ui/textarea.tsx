import * as React from 'react';

import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import { cn } from '@/lib/utils';

/* eslint-disable react/prop-types */
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const { getElementBorderRadius } = useThemeBorderRadius();

    return (
      <textarea
        className={cn(
          `flex min-h-[80px] w-full ${getElementBorderRadius('input')} border border-gray-200 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
