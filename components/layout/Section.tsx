import type { HTMLAttributes, ReactNode } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** The content of the section */
  children: ReactNode;
  /** If true, renders a full-bleed section with inner container */
  fullBleed?: boolean;
  /** Custom background or utility classes to apply to the section */
  bgClass?: string;
}

export function Section({
  children,
  className = '',
  fullBleed = true,
  bgClass = '',
  ...rest
}: SectionProps) {
  // Horizontal padding: 1rem base, 1.5rem sm, 2rem md, 5rem xl & above
  const containerClasses = 'container mx-auto px-4 sm:px-6 md:px-8 xl:px-20 py-8 sm:py-12 md:py-16';
  if (fullBleed) {
    return (
      <section className={`overflow-hidden ${bgClass} ${className}`} {...rest}>
        <div className={containerClasses}>{children}</div>
      </section>
    );
  }
  return (
    <section className={`${containerClasses} overflow-hidden ${bgClass} ${className}`} {...rest}>
      {children}
    </section>
  );
}
