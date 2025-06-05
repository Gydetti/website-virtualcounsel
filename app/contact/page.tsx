import { notFound } from 'next/navigation';

import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/siteConfig';

import ContactPageClient from './ContactPageClient';

export const metadata = defaultMetadata({
  title: `${siteConfig.site.name} | Contact`,
  description:
    'Neem contact met mij op om uw zakelijke behoeften te bespreken en hoe ik u kan helpen groeien.',
});

export default function ContactPage() {
  // Disable this page if contact form feature is off or page not enabled
  if (
    !siteConfig.features.enableContactForm ||
    (siteConfig.enabledPages && !siteConfig.enabledPages.includes('/contact'))
  ) {
    notFound();
  }

  return <ContactPageClient />;
}
