import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/siteConfig';
import { notFound } from 'next/navigation';
import FaqClientPage from './FaqClientPage';
import { getFaqCategories, getFaqSection } from '@/lib/data/staticContent';

export const metadata = defaultMetadata({
  title: `${siteConfig.site.name} | FAQ`,
  description:
    'Vind hier antwoorden op veelgestelde vragen over mijn diensten, werkwijze en specialisaties in ICT-recht.',
});

export default async function FaqPage() {
  // Guard route by feature flag and enabledPages setting
  if (
    !siteConfig.features.enableFaqSection ||
    (siteConfig.enabledPages && !siteConfig.enabledPages.includes('/faq'))
  ) {
    notFound();
  }

  const [faqCategories, faqSection] = await Promise.all([getFaqCategories(), getFaqSection()]);

  return <FaqClientPage faqCategories={faqCategories} faqSection={faqSection} />;
}
