import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ResourceListSection from '@/components/sections/ResourceListSection';
import { getResources } from '@/lib/data/resources';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site.config.local';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
  const title = `Resources | ${siteConfig.site.name}`;
  const description = `Explore various resources offered by ${siteConfig.site.name}.`;
  return defaultMetadata({ title, description });
}

export default async function ResourcesIndexPage() {
  // Guard route if not enabled
  if (siteConfig.enabledPages && !siteConfig.enabledPages.includes('/resources')) {
    notFound();
  }
  // Fetch resources
  const resources = await getResources();
  if (!resources || resources.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-feedback-error">No resources available at the moment.</p>
        </div>
      </section>
    );
  }
  // Render resource list with static background; inner content animates
  return <ResourceListSection id="resources-list-main" resources={resources} />;
}
