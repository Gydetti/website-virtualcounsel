import type { ReactNode, HTMLAttributes } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** The content of the section */
  children: ReactNode;
  /** If true, renders a full-bleed section with inner container */
  fullBleed?: boolean;
}

export function Section({ children, className = "", fullBleed = true, ...rest }: SectionProps) {
  // Horizontal padding: 1rem base, 1.5rem sm, 2rem md, 5rem xl & above
  const containerClasses = "container mx-auto px-4 sm:px-6 md:px-8 xl:px-20 py-12 md:py-16";
  if (fullBleed) {
    return (
      <section className={className} {...rest}>
        <div className={containerClasses}>
          {children}
        </div>
      </section>
    );
  }
  return (
    <section className={`${containerClasses} ${className}`} {...rest}>
      {children}
    </section>
  );
} 