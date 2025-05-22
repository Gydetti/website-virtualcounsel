import {
  ArrowRight,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

import { Button } from '@/components/ui/button';
import LazySection from '@/components/ui/lazy-section';
import { SubscribeForm } from '@/components/ui/SubscribeForm';
import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { enabledPages, features } = siteConfig;
  const filteredQuickLinks = (siteConfig.navLinks || []).filter(
    link => !enabledPages || enabledPages.includes(link.href)
  );
  const showFooterServices =
    features.enableServices &&
    features.enableFooterServices &&
    (!enabledPages || enabledPages.includes('/services'));

  return (
    <>
      {/* Newsletter subscription */}
      <div className="relative overflow-hidden py-10 text-white bg-hero-gradient">
        {/* Decorative blur spots */}
        <div className="absolute top-0 left-1/4 size-96 bg-primary/10 rounded-full -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 size-96 bg-secondary/10 rounded-full translate-y-1/2 blur-3xl" />
        <div className="container-wide relative z-10">
          <LazySection
            animation="none"
            className="stagger-container flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ '--stagger-delay': '0.1s' } as CSSProperties}
          >
            <div style={{ '--index': 0 } as CSSProperties}>
              <h3 className="text-white mb-2">Subscribe to our newsletter</h3>
            </div>
            <div style={{ '--index': 1 } as CSSProperties}>
              <p className="text-body-base text-white">
                Stay updated with the latest insights and news
              </p>
            </div>
            <div style={{ '--index': 2 } as CSSProperties}>
              <SubscribeForm />
            </div>
          </LazySection>
        </div>
      </div>

      <footer className="bg-brand-secondary-dark text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 size-96 bg-primary/10 rounded-full -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 size-96 bg-secondary/10 rounded-full translate-y-1/2 blur-3xl" />

        <div className="container-wide py-12 md:py-16 relative z-10">
          <LazySection
            animation="none"
            className={cn(
              'stagger-container mb-12',
              'grid gap-8 grid-cols-1 md:grid-cols-2 items-start',
              showFooterServices ? 'lg:grid-cols-4' : 'lg:grid-cols-2'
            )}
            style={{ '--stagger-delay': '0.1s' } as CSSProperties}
          >
            <div style={{ '--index': 0 } as CSSProperties}>
              <Link href="/" className="inline-block mb-4">
                {siteConfig.theme.logo.src ? (
                  <Image
                    src={siteConfig.theme.logo.src}
                    alt={siteConfig.theme.logo.alt}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="h-10 w-auto brightness-0 invert"
                  />
                ) : (
                  <span className="text-xl font-bold text-white">{siteConfig.site.name}</span>
                )}
              </Link>
              <p className="text-body-base text-white mb-6 max-w-xs">
                {siteConfig.site.description}
              </p>
              <div className="flex space-x-4">
                <Link
                  href={siteConfig.social.facebook ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-white hover:text-brand-light transition-colors bg-neutral-surface/10 p-2 rounded-full"
                  aria-label="Facebook"
                >
                  <Facebook className="size-5" />
                </Link>
                <Link
                  href={siteConfig.social.instagram ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-white hover:text-brand-light transition-colors bg-neutral-surface/10 p-2 rounded-full"
                  aria-label="Instagram"
                >
                  <Instagram className="size-5" />
                </Link>
                <Link
                  href={siteConfig.social.twitter ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-white hover:text-brand-light transition-colors bg-neutral-surface/10 p-2 rounded-full"
                  aria-label="Twitter"
                >
                  <Twitter className="size-5" />
                </Link>
                <Link
                  href={siteConfig.social.linkedin ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-white hover:text-brand-light transition-colors bg-neutral-surface/10 p-2 rounded-full"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="size-5" />
                </Link>
              </div>
            </div>

            <div style={{ '--index': 1 } as CSSProperties}>
              <h3 className="mt-0 mb-4">Quick links</h3>
              <ul className="space-y-2">
                {filteredQuickLinks.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-neutral-surface transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {showFooterServices && (
              <div style={{ '--index': 2 } as CSSProperties}>
                <h3 className="mt-0 mb-4">Services</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/services/web-design-development"
                      className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-neutral-surface transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
                      Web design & development
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/digital-marketing-strategy"
                      className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-neutral-surface transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
                      Digital marketing strategy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/business-automation"
                      className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-neutral-surface transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
                      Business automation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/content-creation"
                      className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-neutral-surface transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
                      Content creation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/seo-optimization"
                      className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-neutral-surface transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
                      SEO optimization
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            <div style={{ '--index': showFooterServices ? 3 : 2 } as CSSProperties}>
              <h3 className="mt-0 mb-4">Contact</h3>
              <ul className="space-y-4 text-white">
                <li className="flex items-start">
                  <Mail className="size-4 mr-2 mt-1" />
                  <span>Email:</span>
                  <a
                    href={`mailto:${siteConfig.contact.email ?? ''}`}
                    className="ml-1 hover:text-brand-light"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex items-start">
                  <Phone className="size-4 mr-2 mt-1" />
                  <span>Phone:</span>
                  <a
                    href={`tel:${siteConfig.contact.phone ?? ''}`}
                    className="ml-1 hover:text-brand-light"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin className="size-4 mr-2 mt-1" />
                  <span>Address:</span>
                  <address className="ml-1 not-italic">
                    {siteConfig.contact.address?.line1 ?? ''}
                    {siteConfig.contact.address?.line2 && (
                      <>
                        <br />
                        {siteConfig.contact.address.line2}
                      </>
                    )}
                    <br />
                    {siteConfig.contact.address?.zip ?? ''} {siteConfig.contact.address?.city ?? ''}
                    <br />
                    {siteConfig.contact.address?.country ?? ''}
                  </address>
                </li>
              </ul>
              <Button asChild className="mt-4 group" variant="white">
                <Link href="/contact">
                  Contact us
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </LazySection>

          <LazySection
            animation="none"
            className="stagger-container border-t border-divider/700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-start"
            style={{ '--stagger-delay': '0.1s' } as CSSProperties}
          >
            <p style={{ '--index': 0 } as CSSProperties} className="text-neutral-text/200 text-sm">
              © {currentYear} {siteConfig.site.name}. All rights reserved.
            </p>
            <div style={{ '--index': 1 } as CSSProperties} className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="https://groeienmetgydo.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-neutral-text/200 hover:text-white text-sm"
              >
                <span>Website gemaakt met 🍌 door Groeien met Gydo</span>
                <ExternalLink className="ml-1 size-4" />
              </Link>
              <Link
                style={{ '--index': 2 } as CSSProperties}
                href="/privacy-policy"
                className="text-neutral-text/200 hover:text-white text-sm"
              >
                Privacy policy
              </Link>
              <Link
                style={{ '--index': 3 } as CSSProperties}
                href="/terms-of-service"
                className="text-neutral-text/200 hover:text-white text-sm"
              >
                Terms of service
              </Link>
            </div>
          </LazySection>
        </div>
      </footer>
    </>
  );
}
