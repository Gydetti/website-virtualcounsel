import { Badge } from '@/components/ui/badge';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/siteConfig';
import { notFound } from 'next/navigation';

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
          <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
            Section label for legal page
          </Badge>
          <h1 className="text-[var(--font-heading-size)]">Section title for privacy policy page</h1>

          <div className="prose prose-lg max-w-none">
            <p>Last updated date placeholder (e.g. 'January 1, 2025')</p>

            <h2>1. Introduction</h2>
            <p>
              Paragraph placeholder: introduction explaining who you are and purpose of this privacy
              policy
            </p>

            <h2>2. Information we collect</h2>
            <p>Paragraph placeholder: detail types of personal information collected from users</p>

            <h3>2.1 Personal information</h3>
            <p>
              Paragraph placeholder: specify personal information collected (e.g. names, email
              addresses)
            </p>

            <h3>2.2 Usage data</h3>
            <p>
              Paragraph placeholder: explain usage data collected (e.g. IP address, browser type)
            </p>

            <h2>3. How we use your information</h2>
            <p>Paragraph placeholder: explain how collected information is used</p>
            <ul>
              <li>List item placeholder: specific purpose for using collected data</li>
              <li>List item placeholder: specific purpose for using collected data</li>
              <li>List item placeholder: specific purpose for using collected data</li>
              <li>List item placeholder: specific purpose for using collected data</li>
            </ul>

            <h2>4. Data Sharing and Disclosure</h2>
            <p>[DATA_SHARING: Explain who you share the data with and under what circumstances.]</p>

            <h2>5. Data Security</h2>
            <p>[DATA_SECURITY: Describe the measures you take to protect user data.]</p>

            <h2>6. Your Rights</h2>
            <p>[USER_RIGHTS: Explain what rights users have regarding their data.]</p>

            <h2>7. Cookies Policy</h2>
            <p>[COOKIES_POLICY: Explain your use of cookies and similar technologies.]</p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>[POLICY_CHANGES: Explain how you will notify users of changes to this policy.]</p>

            <h2>9. Contact Us</h2>
            <p>[CONTACT_INFORMATION: Provide contact information for privacy-related inquiries.]</p>
          </div>
        </div>
      </div>
    </section>
  );
}
