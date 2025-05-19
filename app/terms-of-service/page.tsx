import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/lib/siteConfig';
import { staticContent } from '@/lib/data/staticContent';
import { notFound } from 'next/navigation';

// Disable this page if not enabled
if (siteConfig.enabledPages && !siteConfig.enabledPages.includes('/terms-of-service')) {
  notFound();
}

export const metadata = {
  title: 'Terms of Service | Entrepreneur Template',
  description:
    'Our terms of service outline the rules and guidelines for using our website and services.',
};

export default function TermsOfServicePage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-brand-light text-primary hover:bg-brand-light/90">
            {staticContent.termsSection.badge}
          </Badge>
          <h1 className="">{staticContent.termsSection.title}</h1>

          <div className="prose prose-lg max-w-none">
            <p>Last updated: {staticContent.termsOfService.lastUpdated}</p>

            <h2>1. Introduction</h2>
            <p>{staticContent.termsOfService.introduction}</p>

            <h2>2. Acceptance of terms</h2>
            <p>{staticContent.termsOfService.acceptance}</p>

            <h2>3. Description of services</h2>
            <p>{staticContent.termsOfService.services}</p>

            <h2>4. User accounts</h2>
            <p>{staticContent.termsOfService.userAccounts}</p>

            <h2>5. Intellectual property rights</h2>
            <p>{staticContent.termsOfService.intellectualProperty}</p>

            <h2>6. User content</h2>
            <p>{staticContent.termsOfService.userContent}</p>

            <h2>7. Prohibited activities</h2>
            <p>{staticContent.termsOfService.prohibitedActivities}</p>

            <h2>8. Limitation of liability</h2>
            <p>{staticContent.termsOfService.limitationOfLiability}</p>

            <h2>9. Indemnification</h2>
            <p>{staticContent.termsOfService.indemnification}</p>

            <h2>10. Termination</h2>
            <p>{staticContent.termsOfService.termination}</p>

            <h2>11. Governing law</h2>
            <p>{staticContent.termsOfService.governingLaw}</p>

            <h2>12. Changes to terms</h2>
            <p>{staticContent.termsOfService.changes}</p>

            <h2>13. Contact information</h2>
            <p>{staticContent.termsOfService.contactInfo}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
