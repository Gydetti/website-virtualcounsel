import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/siteConfig';
import { notFound } from 'next/navigation';
import FaqClientPage from './FaqClientPage';

export const metadata = defaultMetadata({
  title: `${siteConfig.site.name} | FAQ`,
  description:
    'Vind hier antwoorden op veelgestelde vragen over mijn diensten, werkwijze en specialisaties in ICT-recht.',
});

export default function FaqPage() {
  // Guard route by feature flag and enabledPages setting
  if (
    !siteConfig.features.enableFaqSection ||
    (siteConfig.enabledPages && !siteConfig.enabledPages.includes('/faq'))
  ) {
    notFound();
  }

  return <FaqClientPage />;
}
