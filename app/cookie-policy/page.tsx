import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/lib/siteConfig';
import { notFound } from 'next/navigation';
import { staticContent } from '@/lib/data/staticContent';

export const metadata = {
  title: 'Cookie Policy | Entrepreneur Template',
  description:
    'Our cookie policy explains how we use cookies and similar technologies on our website.',
};

export default function CookiePolicyPage() {
  // Disable this page if not enabled in config
  if (siteConfig.enabledPages && !siteConfig.enabledPages.includes('/cookie-policy')) {
    notFound();
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-brand-light text-primary hover:bg-brand-light/90">
            {staticContent.cookieSection.badge}
          </Badge>
          <h1 className="">{staticContent.cookieSection.title}</h1>

          <div className="prose prose-lg max-w-none">
            <p>Last updated: {staticContent.cookiePolicy.lastUpdated}</p>

            <h2>1. Introduction</h2>
            <p>{staticContent.cookiePolicy.introduction}</p>

            <h2>2. What are cookies</h2>
            <p>{staticContent.cookiePolicy.whatAreCookies}</p>

            <h2>3. Types of cookies we use</h2>
            <p>{staticContent.cookiePolicy.cookieTypes}</p>

            <h3>3.1 Essential cookies</h3>
            <p>{staticContent.cookiePolicy.essentialCookies}</p>

            <h3>3.2 Performance cookies</h3>
            <p>{staticContent.cookiePolicy.performanceCookies}</p>

            <h3>3.3 Functionality cookies</h3>
            <p>{staticContent.cookiePolicy.functionalityCookies}</p>

            <h3>3.4 Targeting cookies</h3>
            <p>{staticContent.cookiePolicy.targetingCookies}</p>

            <h2>4. Third-party cookies</h2>
            <p>{staticContent.cookiePolicy.thirdPartyCookies}</p>

            <h2>5. Cookie management</h2>
            <p>{staticContent.cookiePolicy.management}</p>

            <h2>6. Changes to this cookie policy</h2>
            <p>{staticContent.cookiePolicy.changes}</p>

            <h2>7. Contact information</h2>
            <p>{staticContent.cookiePolicy.contactInfo}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
