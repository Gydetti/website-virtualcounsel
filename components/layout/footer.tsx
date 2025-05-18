import { SubscribeForm } from '@/components/ui/SubscribeForm';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';
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
import Link from 'next/link';
import Image from 'next/image';

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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full translate-y-1/2 blur-3xl" />
        <div className="container-wide relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white mb-2">Subscribe to our newsletter</h3>
              <p className="text-body-base text-white">
                Stay updated with the latest insights and news
              </p>
            </div>
            <SubscribeForm />
          </div>
        </div>
      </div>

      <footer className="bg-brand-dark text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full translate-y-1/2 blur-3xl" />

        <div className="container-wide py-12 md:py-16 relative z-10">
          <div
            className={cn(
              'grid gap-8',
              'grid-cols-1',
              'md:grid-cols-2',
              showFooterServices ? 'lg:grid-cols-4' : 'lg:grid-cols-2'
            )}
          >
            <div>
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
                  className="text-white hover:text-brand-light transition-colors bg-neutral-surface/10 p-2 rounded-full"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href={siteConfig.social.instagram ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-brand-light transition-colors bg-neutral-surface/10 p-2 rounded-full"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href={siteConfig.social.twitter ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-brand-light transition-colors bg-neutral-surface/10 p-2 rounded-full"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href={siteConfig.social.linkedin ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-brand-light transition-colors bg-neutral-surface/10 p-2 rounded-full"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4">Quick links</h3>
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

            {/* Services section */}
            {showFooterServices && (
              <div>
                <h3 className="mb-4">Services</h3>
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

            <div>
              <h3 className="mb-4">Contact</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Email: </span>
                  <a
                    href={`mailto:${siteConfig.contact.email ?? ''}`}
                    className="ml-1 hover:text-brand-light"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Phone: </span>
                  <a
                    href={`tel:${siteConfig.contact.phone ?? ''}`}
                    className="ml-1 hover:text-brand-light"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-1" />
                  <span>Address: </span>
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
              <Button
                asChild
                className="mt-4 bg-neutral-surface text-brand-dark hover:bg-neutral-background/200 group"
              >
                <Link href="/contact">
                  Contact us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="border-t border-divider/700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-text/200 text-sm">
              © {currentYear} {siteConfig.site.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="https://groeienmetgydo.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-neutral-text/100 hover:text-white text-sm"
              >
                <span>Website gemaakt met 🍌 door Groeien met Gydo</span>
                <ExternalLink className="ml-1 h-4 w-4" />
              </Link>

              <Link
                href="/privacy-policy"
                className="text-neutral-text/200 hover:text-white text-sm"
              >
                Privacy policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-neutral-text/200 hover:text-white text-sm"
              >
                Terms of service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
