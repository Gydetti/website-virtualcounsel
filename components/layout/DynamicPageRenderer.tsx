// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
/* biome-disable-file */

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { z } from 'zod';

// Section components (static or dynamic as in template)
const HeroSection = dynamic(() => import('@/components/sections/hero-section'));
const ValuePropSection = dynamic(() => import('@/components/sections/value-prop-section'));
const ClientsSection = dynamic(() => import('@/components/sections/clients-section'));
const ProblemPainSection = dynamic(() => import('@/components/sections/problem-pain-section'));
const SolutionVisionSection = dynamic(
  () => import('@/components/sections/solution-vision-section')
);
const AboutSection = dynamic(() => import('@/components/sections/about-section'));
const ServicesSection = dynamic(() => import('@/components/sections/services-section'));
const BlogSection = dynamic(() => import('@/components/sections/blog-section'));
const CtaSection = dynamic(() => import('@/components/sections/cta-section'));
const FeaturesSection = dynamic(() => import('@/components/sections/features-section'));
const TestimonialsSection = dynamic(() => import('@/components/sections/testimonials-section'));
const HomepageFaqSection = dynamic(() => import('@/components/sections/homepage-faq-section'));
const AboutValuesSection = dynamic(() => import('@/components/sections/about-values-section'));
const AboutPersonalJourneySection = dynamic(
  () => import('@/components/sections/about-personal-journey-section')
);
const AboutCredentialsSection = dynamic(
  () => import('@/components/sections/about-credentials-section')
);
const AboutPhilosophySection = dynamic(
  () => import('@/components/sections/about-philosophy-section')
);
const AboutSocialProofSection = dynamic(
  () => import('@/components/sections/about-social-proof-section')
);
const AboutFeatureCardsSection = dynamic(
  () => import('@/components/sections/about-feature-cards-section')
);
const ProcessSection = dynamic(() => import('@/components/sections/process-section'));
const ResourceDetailSection = dynamic(() => import('@/components/sections/ResourceDetailSection'));
const ResourceListSection = dynamic(() => import('@/components/sections/ResourceListSection'));
const ServicesOverviewSection = dynamic(
  () => import('@/components/sections/services-overview-section')
);
const ServicesWhyChooseSection = dynamic(
  () => import('@/components/sections/services-why-choose-section')
);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const sectionComponentMap: any = {
  // eslint-disable-line @typescript-eslint/no-explicit-any
  HeroSection,
  ValuePropSection,
  ClientsSection,
  ProblemPainSection,
  SolutionVisionSection,
  AboutSection,
  ServicesSection,
  BlogSection,
  CtaSection,
  FeaturesSection,
  TestimonialsSection,
  HomepageFaqSection,
  AboutValuesSection,
  AboutPersonalJourneySection,
  AboutCredentialsSection,
  AboutPhilosophySection,
  AboutSocialProofSection,
  AboutFeatureCardsSection,
  ProcessSection,
  ResourceDetailSection,
  ResourceListSection,
  ServicesOverviewSection,
  ServicesWhyChooseSection,
};

// Data imports
import * as aboutPageData from '@/lib/data/aboutPageData';
import * as homepageData from '@/lib/data/homepage';
import { getResourceBySlug as getResourceBySlugFromData, getResources } from '@/lib/data/resources';
import * as serviceDetailPageData from '@/lib/data/serviceDetailPageData';
import * as servicesPageData from '@/lib/data/servicesPageData';
import { getBlogPosts, getServiceBySlug, getServices } from '@/lib/data-utils';
import type { pageSectionConfigSchema, pageStructureSchema } from '@/lib/schemas/siteConfig.schema';
import { siteConfig } from '@/lib/site.config.local';

// Types
type PageStructure = z.infer<typeof pageStructureSchema>;
type SectionConfig = z.infer<typeof pageSectionConfigSchema>;

// Fetch logic (unchanged signature)
async function getSectionData(
  sectionConfig: SectionConfig,
  pagePath: string
): Promise<Record<string, unknown> | null> {
  if (pagePath === '/') {
    switch (sectionConfig.sectionType) {
      case 'HeroSection':
        return homepageData.heroSectionData;
      case 'ValuePropSection':
        return homepageData.valuePropSectionData;
      case 'ClientsSection':
        return homepageData.clientsSectionData;
      case 'ProblemPainSection':
        return homepageData.problemPainSectionData;
      case 'SolutionVisionSection':
        return homepageData.solutionVisionSectionData;
      case 'AboutSection':
        return { ...homepageData.aboutSectionData, isHomepage: true };
      case 'ServicesSection': {
        const allServices = await getServices();

        // Only filter for popular services on homepage
        const popularServices = allServices.filter(service => service.popular);
        const displayServices = popularServices.slice(0, 3);
        const totalServicesCount = allServices.length;
        const remainingServicesCount = totalServicesCount - displayServices.length;

        return {
          ...homepageData.servicesPreviewSectionData,
          id: sectionConfig.id,
          services: displayServices,
          totalServicesCount,
          remainingServicesCount,
          showRemainingCount: true,
        };
      }
      case 'BlogPreviewSection': {
        const blogLimit = siteConfig.sectionsDataKeys?.blog?.limit || 3;
        const posts = await getBlogPosts(blogLimit);
        return {
          ...homepageData.blogPreviewSectionData,
          id: sectionConfig.id,
          posts,
        };
      }
      case 'CtaSection':
        return homepageData.ctaSectionData;
      case 'KpiSection':
        return homepageData.kpiSectionData;
      case 'FeaturesSection':
        return homepageData.featuresSectionData;
      case 'PricingSection':
        return homepageData.pricingSectionData;
      case 'TestimonialsSection':
        return homepageData.testimonialsSectionData;
      case 'ProcessSection':
        return homepageData.processSectionData;
      case 'HomepageFaqSection':
        return homepageData.homepageFaqSectionData;
      default:
        console.warn(`Unknown section type '${sectionConfig.sectionType}' for homepage`);
        return null;
    }
  }

  if (pagePath === '/about') {
    switch (sectionConfig.sectionType) {
      case 'AboutSection':
        return aboutPageData.aboutPageMainContentData;
      case 'AboutValuesSection':
        return aboutPageData.aboutValuesSectionData;
      case 'AboutPersonalJourneySection':
        return aboutPageData.aboutPersonalJourneySectionData;
      case 'AboutCredentialsSection':
        return aboutPageData.aboutCredentialsSectionData;
      case 'AboutPhilosophySection':
        return aboutPageData.aboutPhilosophySectionData;
      case 'AboutSocialProofSection':
        return aboutPageData.aboutSocialProofSectionData;
      case 'AboutFeatureCardsSection':
        return aboutPageData.aboutFeatureCardsSectionData;
      case 'TestimonialsSection':
        return homepageData.testimonialsSectionData;
      case 'CtaSection':
        return homepageData.ctaSectionData;
      case 'KpiSection':
        return homepageData.kpiSectionData;
      default:
        console.warn(
          `Unknown section type '${sectionConfig.sectionType}' for about page, falling back to homepage data`
        );
        return null;
    }
  }

  if (pagePath === '/services') {
    switch (sectionConfig.sectionType) {
      case 'ServicesOverviewSection': {
        return {
          ...servicesPageData.servicesPageData.overview,
          id: sectionConfig.id,
        };
      }
      case 'ServicesSection': {
        const allServices = await getServices();

        // On services page, show all services sorted by popular first
        const sortedServices = [...allServices].sort((a, b) => {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return 0;
        });

        return {
          ...homepageData.servicesPreviewSectionData,
          id: sectionConfig.id,
          services: sortedServices,
          displayType: 'grid',
        };
      }
      case 'ServicesWhyChooseSection': {
        return {
          ...servicesPageData.servicesPageData.whyChooseSection,
          id: sectionConfig.id,
        };
      }
      case 'ProcessSection':
        return homepageData.processSectionData;
      case 'CtaSection': {
        return {
          ...servicesPageData.servicesPageData.ctaSection,
          id: sectionConfig.id,
        };
      }
      default:
        console.warn(`Unknown section type '${sectionConfig.sectionType}' for services page`);
        return null;
    }
  }

  // Default fallback for all other pages
  console.warn(`Data fallback for '${sectionConfig.sectionType}' on '${pagePath}`);
  return null;
}

// Server-side async component
export default async function DynamicPageRenderer({
  pagePath,
  pageStructure,
}: {
  pagePath: string;
  pageStructure: PageStructure;
}) {
  // Fetch section data on the server
  const sectionsWithData = await Promise.all(
    pageStructure.sections.map(sec => getSectionData(sec, pagePath))
  );

  // Render immediately, no client loading
  return (
    <>
      {pageStructure.sections.map((section, idx) => {
        const Component = sectionComponentMap[section.sectionType];
        const data = sectionsWithData[idx];
        if (!Component || !data) {
          console.warn(`Unknown section '${section.sectionType}'`);
          return null;
        }
        return <Component key={section.id} {...data} />;
      })}
    </>
  );
}
