import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/lib/siteConfig';
import { staticContent } from '@/lib/data/staticContent';
import { notFound } from 'next/navigation';

// Helper to interpolate client-provided legal placeholders
function interpolateTerms(text: string) {
  const legal = siteConfig.legal;
  if (!legal) return text;
  return text
    .replace(/{{businessName}}/g, legal.businessName)
    .replace(/{{privacyContactEmail}}/g, legal.privacyContactEmail)
    .replace(/{{URL van jouw website}}/g, siteConfig.site.url);
}

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
            {/* Dynamic company header using legal info */}
            <p>
              {siteConfig.legal?.businessName} ("Opdrachtnemer"), gevestigd te{' '}
              {siteConfig.legal?.address?.line1}
              {siteConfig.legal?.address?.line2 ? `, ${siteConfig.legal.address.line2}` : ''},{' '}
              {siteConfig.legal?.address?.zip} {siteConfig.legal?.address?.city}, KvK-nummer:{' '}
              {siteConfig.legal?.kvkNumber}.
            </p>
            <p>
              E-mail:{' '}
              <a href={`mailto:${siteConfig.legal?.privacyContactEmail}`}>
                {siteConfig.legal?.privacyContactEmail}
              </a>{' '}
              Website: {siteConfig.site.url}.
            </p>

            <h2>2. Acceptance of terms</h2>
            <p>{interpolateTerms(staticContent.termsOfService.acceptance)}</p>

            <h2>3. Description of services</h2>
            <p>{interpolateTerms(staticContent.termsOfService.services)}</p>

            <h2>4. User accounts</h2>
            <p>{interpolateTerms(staticContent.termsOfService.userAccounts)}</p>

            <h2>5. Intellectual property rights</h2>
            <p>{interpolateTerms(staticContent.termsOfService.intellectualProperty)}</p>

            <h2>6. User content</h2>
            <p>{interpolateTerms(staticContent.termsOfService.userContent)}</p>

            <h2>7. Prohibited activities</h2>
            <p>{interpolateTerms(staticContent.termsOfService.prohibitedActivities)}</p>

            <h2>8. Limitation of liability</h2>
            <p>{interpolateTerms(staticContent.termsOfService.limitationOfLiability)}</p>

            <h2>9. Indemnification</h2>
            <p>{interpolateTerms(staticContent.termsOfService.indemnification)}</p>

            <h2>10. Termination</h2>
            <p>{interpolateTerms(staticContent.termsOfService.termination)}</p>

            <h2>11. Governing law</h2>
            <p>{interpolateTerms(staticContent.termsOfService.governingLaw)}</p>

            <h2>12. Changes to terms</h2>
            <p>{interpolateTerms(staticContent.termsOfService.changes)}</p>

            <h2>13. Contact information</h2>
            <p>{interpolateTerms(staticContent.termsOfService.contactInfo)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
