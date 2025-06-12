import { ArrowRight, ExternalLink, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

import { Button } from '@/components/ui/button';
import LazySection from '@/components/ui/lazy-section';
import { SubscribeForm } from '@/components/ui/SubscribeForm';
import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';

type FooterProps = {
  /**
   * Hide the newsletter subscription section (useful for landing pages)
   */
  hideNewsletter?: boolean;
};

export default function Footer({ hideNewsletter = false }: FooterProps) {
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
      {/* Newsletter subscription - only show if not hidden */}
      {!hideNewsletter && (
        <div className="bg-gradient-to-br from-brand-secondary-dark to-brand-secondary-dark/90 border-t border-brand-primary/10">
          <div className="mx-auto max-w-[var(--container-max-width)] px-4 sm:px-6 md:px-8 xl:px-20 py-8">
            <LazySection animation="fade-up" delay={0}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Blijf op de hoogte van juridische ontwikkelingen voor ICT-bedrijven
                  </h3>
                  <p className="text-sm text-white/70">
                    Ontvang maandelijks praktische juridische tips en inzichten speciaal voor de
                    ICT-sector.
                  </p>
                </div>
                <div className="md:ml-8">
                  <SubscribeForm />
                </div>
              </div>
            </LazySection>
          </div>
        </div>
      )}

      <footer className="bg-brand-secondary-dark text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 size-96 bg-primary/10 rounded-full -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 size-96 bg-secondary/10 rounded-full translate-y-1/2 blur-3xl" />

        <div className="mx-auto max-w-[var(--container-max-width)] px-4 sm:px-6 md:px-8 xl:px-20 py-12 md:py-16 relative z-10">
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
                <Image
                  src="/images/branding/virtual-counsel-logo-transparant-white.png"
                  alt={siteConfig.theme.logo.alt}
                  width={160}
                  height={33}
                  loading="lazy"
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-body-base text-white mb-6 max-w-xs">
                {siteConfig.site.description}
              </p>
              <div className="flex space-x-4 mb-6">
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
              
              {/* Business Information - Required by Dutch Law */}
              <div className="text-neutral-text/200 text-xs space-y-1">
                <h4 className="text-white font-medium mb-2 text-sm">Bedrijfsgegevens</h4>
                <p>{siteConfig.legal.businessName}</p>
                <p>KvK-nummer: {siteConfig.legal.kvkNumber}</p>
                {siteConfig.legal.btwNumber && (
                  <p>BTW-nummer: {siteConfig.legal.btwNumber}</p>
                )}
              </div>
            </div>

            <div style={{ '--index': 1 } as CSSProperties}>
              <h3 className="mt-0 mb-4">Voor u</h3>
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
                <h3 className="mt-0 mb-4">Diensten</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/services/intellectuele-eigendom-software"
                      className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-neutral-surface transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
                      Intellectuele eigendom bij software
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/contracten-algemene-voorwaarden"
                      className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-neutral-surface transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
                      Contracten en algemene voorwaarden
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/privacy-avg-compliance"
                      className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-neutral-surface transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
                      Privacy en AVG compliance
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/beperking-aansprakelijkheid"
                      className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-neutral-surface transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
                      Beperking van aansprakelijkheid
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/ai-act-compliance"
                      className="text-white hover:text-brand-light transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-neutral-surface transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
                      AI Act compliance
                    </Link>
                  </li>
                  <li className="pt-2 border-t border-neutral-surface/20">
                    <Link
                      href="/services"
                      className="text-brand-light hover:text-white transition-colors inline-flex items-center group font-medium"
                    >
                      <span className="w-0 h-0.5 bg-brand-light transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
                      Alle 8 diensten →
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
                  <span>Telefoon:</span>
                  <a
                    href={`tel:${siteConfig.contact.phone ?? ''}`}
                    className="ml-1 hover:text-brand-light"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin className="size-4 mr-2 mt-1" />
                  <span>Adres:</span>
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
                  {siteConfig.navigationText?.contactUsText || 'Neem contact op'}
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
              © {currentYear} {siteConfig.site.name}. Alle rechten voorbehouden.
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
