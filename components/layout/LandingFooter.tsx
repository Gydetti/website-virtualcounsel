import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';

type LandingFooterProps = {
  /**
   * Show privacy/legal links (defaults to true)
   */
  showLegalLinks?: boolean;
  /**
   * Show simplified branding (logo + name)
   */
  showBranding?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
};

export default function LandingFooter({
  showLegalLinks = true,
  showBranding = true,
  className,
}: LandingFooterProps) {
  const currentYear = new Date().getFullYear();
  const legalLinks =
    siteConfig.footerLinks?.filter(
      link =>
        link.href.includes('privacy') || link.href.includes('terms') || link.href.includes('cookie')
    ) || [];

  return (
    <footer
      className={cn('w-full py-8 bg-neutral-background border-t border-neutral-divider', className)}
    >
      <div className="mx-auto max-w-[var(--container-max-width)] px-4 sm:px-6 md:px-8 xl:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Branding Section */}
          {showBranding && (
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <Image
                  src={siteConfig.theme.logo.src}
                  alt={siteConfig.theme.logo.alt}
                  width={32}
                  height={32}
                  className="h-8 w-auto transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-neutral-text">
                    {siteConfig.site.name}
                  </span>
                  {siteConfig.theme.logo.subtitle && (
                    <span className="text-xs text-neutral-text/60">
                      {siteConfig.theme.logo.subtitle}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          )}

          {/* Legal Links & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-neutral-text/70">
            {showLegalLinks && legalLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {legalLinks.map((link, index) => (
                  <div key={link.href} className="flex items-center gap-4">
                    <Link
                      href={link.href}
                      className="hover:text-primary transition-colors duration-200"
                    >
                      {link.text}
                    </Link>
                    {index < legalLinks.length - 1 && (
                      <span className="text-neutral-text/30">•</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              {showLegalLinks && legalLinks.length > 0 && (
                <span className="hidden md:block text-neutral-text/30">•</span>
              )}
              <span>
                © {currentYear} {siteConfig.site.name}. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
