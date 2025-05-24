'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';

type LandingHeaderProps = {
  /**
   * Show a CTA button in the header (defaults to true)
   * Set to false for pages where the main CTA is elsewhere
   */
  showCta?: boolean;
  /**
   * Override the default CTA text
   */
  ctaText?: string;
  /**
   * Override the default CTA link
   */
  ctaHref?: string;
  /**
   * Add a subtle background for better contrast
   */
  withBackground?: boolean;
};

export default function LandingHeader({
  showCta = true,
  ctaText = 'Get Started',
  ctaHref = '/contact',
  withBackground = true,
}: LandingHeaderProps) {
  return (
    <header
      className={cn(
        'w-full py-4 transition-all duration-300',
        withBackground
          ? 'bg-neutral-surface/95 backdrop-blur-sm border-b border-neutral-divider shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-[var(--container-max-width)] px-4 sm:px-6 md:px-8 xl:px-20">
        <nav className="flex items-center justify-between" aria-label="Landing page navigation">
          {/* Logo Section - matches main header design */}
          <div className="flex">
            <Link href="/" className="-m-1.5 p-1.5 group">
              <span className="sr-only">{siteConfig.site.name}</span>
              <div className="flex items-center gap-3 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src={siteConfig.theme.logo.src}
                  alt={siteConfig.theme.logo.alt}
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                  priority
                />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold leading-tight text-neutral-text">
                    {siteConfig.site.name}
                  </span>
                  {siteConfig.theme.logo.subtitle && (
                    <span className="text-sm text-neutral-text/70 leading-snug">
                      {siteConfig.theme.logo.subtitle}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>

          {/* CTA Section - professional but not overwhelming */}
          {showCta && (
            <div className="flex items-center">
              <Button
                asChild
                variant="default"
                size="sm"
                className="group text-sm px-4 py-2 min-h-0 min-w-0 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Link href={ctaHref}>
                  {ctaText}
                  <svg
                    className="ml-2 size-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
