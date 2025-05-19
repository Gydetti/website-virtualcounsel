import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/siteConfig';
import { notFound } from 'next/navigation';
import { staticContent } from '@/lib/data/staticContent';

export const metadata = defaultMetadata({
  title: `${siteConfig.site.name} | Privacy Policy`,
  description:
    'Our privacy policy outlines how we collect, use, and protect your personal information.',
});

export default function PrivacyPolicyPage() {
  // Disable this page if not enabled in config
  if (siteConfig.enabledPages && !siteConfig.enabledPages.includes('/privacy-policy')) {
    notFound();
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-brand-light text-primary hover:bg-brand-light/90">
            {staticContent.privacySection.badge}
          </Badge>
          <h1 className="">{staticContent.privacySection.title}</h1>

          <div className="prose prose-lg max-w-none">
            <p>Last updated: {staticContent.privacyPolicy.lastUpdated}</p>

            <h2>1. Introduction</h2>
            <p>{staticContent.privacyPolicy.introduction}</p>

            <h2>2. Information we collect</h2>
            <p>{staticContent.privacyPolicy.informationCollected}</p>

            <h3>2.1 Personal information</h3>
            <p>{staticContent.privacyPolicy.personalInformation}</p>

            <h3>2.2 Usage data</h3>
            <p>{staticContent.privacyPolicy.usageData}</p>

            <h2>3. How we use your information</h2>
            <p>{staticContent.privacyPolicy.howWeUse}</p>
            <ul>
              {[
                staticContent.privacyPolicy.usageListItem1,
                staticContent.privacyPolicy.usageListItem2,
                staticContent.privacyPolicy.usageListItem3,
                staticContent.privacyPolicy.usageListItem4,
              ].map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>4. Data Sharing and Disclosure</h2>
            <p>{staticContent.privacyPolicy.dataSharing}</p>

            <h2>5. Data Security</h2>
            <p>{staticContent.privacyPolicy.dataSecurity}</p>

            <h2>6. Your Rights</h2>
            <p>{staticContent.privacyPolicy.userRights}</p>

            <h2>7. Cookies Policy</h2>
            <p>{staticContent.privacyPolicy.cookiesPolicy}</p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>{staticContent.privacyPolicy.policyChanges}</p>

            <h2>9. Contact Us</h2>
            <p>{staticContent.privacyPolicy.contactInfo}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
