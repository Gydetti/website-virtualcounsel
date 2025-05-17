import LazySection from '@/components/ui/lazy-section'; // Assuming LazySection is still used
import type { pageSectionConfigSchema, pageStructureSchema } from '@/lib/schemas/siteConfig.schema'; // Adjust path as needed
/* biome-disable-file */
import dynamic from 'next/dynamic';
import type { ComponentType, FC } from 'react';
import type { z } from 'zod';
import HeroSection from '@/components/sections/hero-section';

// Replace static section imports with dynamic for heavy sections
// Dynamically import HeroSection to code-split JS-driven animations
// const HeroSection = dynamic(() => import('@/components/sections/hero-section'));
import AboutSection from '@/components/sections/about-section';
import BlogSection from '@/components/sections/blog-section';
import ClientsSection from '@/components/sections/clients-section';
import ContactSection from '@/components/sections/contact-section';
import CtaSection from '@/components/sections/cta-section';
import FeaturesSection from '@/components/sections/features-section';
import HomepageFaqSection from '@/components/sections/homepage-faq-section';
import KpiSection from '@/components/sections/kpi-section';
import ProblemPainSection from '@/components/sections/problem-pain-section';
import ProcessSectionHome from '@/components/sections/process-section-home';
import ServicesSection from '@/components/sections/services-section';
import SolutionVisionSection from '@/components/sections/solution-vision-section';
// Static imports for simple, CSS-only sections
import ValuePropSection from '@/components/sections/value-prop-section';
// Dynamically import heavy, code-split sections (SSR enabled by default in server components)
const TestimonialsSection = dynamic(() => import('@/components/sections/testimonials-section'));
const ResourceDetailSection = dynamic(() => import('@/components/sections/ResourceDetailSection'));
const ResourceListSection = dynamic(() => import('@/components/sections/ResourceListSection'));
import AboutSocialProofSection from '@/components/sections/about-social-proof-section';
import AboutValuesSection from '@/components/sections/about-values-section';

import { getBlogPosts, getServices } from '@/lib/data-utils'; // Now using these
import {
  aboutPageMainContentData,
  aboutSocialProofSectionData,
  aboutValuesSectionData,
} from '@/lib/data/aboutPageData'; // ++ Import about page data and new aboutValues/aboutSocialProof data
// ++ NEW IMPORTS FOR DATA ++
import * as homepageData from '@/lib/data/homepage';
import { getResourceBySlug as getResourceBySlugFromData, getResources } from '@/lib/data/resources'; // Alias to avoid conflict if used directly
import { siteConfig } from '@/lib/site.config.local'; // For blog limit

// Define the type for the component props
type PageStructure = z.infer<typeof pageStructureSchema>;
type PageSectionConfig = z.infer<typeof pageSectionConfigSchema>; // Added for clarity

interface DynamicPageRendererProps {
  pagePath: string; // To help with data fetching context if needed
  pageStructure: PageStructure;
  // We might need a way to pass down all site-wide section data, or fetch it here.
  // allSectionsData: Record<string, unknown>; // Using unknown for potential future prop
}

// biome-ignore lint: Diverse section components in map, type safety at component prop level.
const sectionComponentMap: Record<string, ComponentType<any>> = {
  HeroSection,
  ValuePropSection,
  ClientsSection,
  ProblemPainSection,
  SolutionVisionSection,
  FeaturesSection,
  TestimonialsSection,
  CtaSection,
  AboutSection,
  KpiSection,
  ServicesSection,
  ProcessSectionHome,
  BlogSection,
  HomepageFaqSection,
  ContactSection,
  ResourceDetailSection,
  ResourceListSection,
  AboutValuesSection,
  AboutSocialProofSection,
};

// Define simple, CSS-only sections to wrap with a single LazySection animation="none"
const cssOnlySections = new Set<string>([
  'ValuePropSection',
  'ClientsSection',
  'ProblemPainSection',
  'SolutionVisionSection',
  'FeaturesSection',
  'CtaSection',
  'ServicesSection',
  'ProcessSectionHome',
  'BlogSection',
  'HomepageFaqSection',
  'ContactSection',
]);

// Async data fetching
const getSectionData = async (
  pagePath: string,
  sectionConfig: PageSectionConfig
): Promise<Record<string, unknown>> => {
  if (pagePath === '/') {
    switch (sectionConfig.sectionType) {
      case 'HeroSection':
        return homepageData.heroSectionData;
      case 'KpiSection':
        return homepageData.kpiSectionData;
      case 'ValuePropSection':
        return homepageData.valuePropSectionData;
      case 'ClientsSection':
        return homepageData.clientsSectionData;
      case 'ProblemPainSection':
        return homepageData.problemPainSectionData;
      case 'SolutionVisionSection':
        return homepageData.solutionVisionSectionData;
      case 'FeaturesSection':
        return homepageData.featuresSectionData;
      case 'TestimonialsSection':
        return homepageData.testimonialsSectionData;
      case 'CtaSection':
        return homepageData.ctaSectionData;
      case 'ServicesPreviewSection': {
        const services = await getServices();
        return {
          ...homepageData.servicesPreviewSectionData,
          id: sectionConfig.id,
          services: services.slice(0, 3),
        };
      }
      case 'ServicesSection': {
        const services = await getServices();
        return {
          ...homepageData.servicesPreviewSectionData,
          id: sectionConfig.id,
          services,
        };
      }
      case 'BlogPreviewSection': {
        const blogLimit = siteConfig.sectionsDataKeys?.blog?.limit || 3;
        const posts = await getBlogPosts(blogLimit);
        return {
          ...homepageData.blogPreviewSectionData,
          id: sectionConfig.id,
          posts: posts,
        };
      }
      case 'BlogSection': {
        const blogLimit = siteConfig.sectionsDataKeys?.blog?.limit || 3;
        const posts = await getBlogPosts(blogLimit);
        return {
          ...homepageData.blogPreviewSectionData,
          id: sectionConfig.id,
          posts,
        };
      }
      case 'HomepageFaqSection':
        return homepageData.homepageFaqSectionData;
      case 'AboutSection':
        return homepageData.aboutSectionData;
      case 'ProcessSection':
        return homepageData.processSectionData;
      case 'ProcessSectionHome':
        return homepageData.processSectionData;
      case 'ContactSection':
        return homepageData.contactSectionData;
      default:
        console.warn(
          `Data for section type "${sectionConfig.sectionType}" (id: ${sectionConfig.id}) not implemented for homepage.`
        );
        return { id: sectionConfig.id };
    }
  }

  if (pagePath.startsWith('/resources/')) {
    const slug = pagePath.substring('/resources/'.length);
    if (slug && sectionConfig.sectionType === 'ResourceDetailSection') {
      const resource = await getResourceBySlugFromData(slug);
      if (resource) {
        return { resource: resource };
      }
      console.warn(`Resource with slug "${slug}" not found for ResourceDetailSection.`);
      return { resource: null };
    }
  }

  if (pagePath === '/resources') {
    if (sectionConfig.sectionType === 'ResourceListSection') {
      const resources = await getResources();
      return {
        id: sectionConfig.id,
        resources: resources,
      };
    }
  }

  if (pagePath === '/about') {
    switch (sectionConfig.sectionType) {
      case 'AboutSection':
        return aboutPageMainContentData;
      case 'AboutValuesSection':
        return aboutValuesSectionData;
      case 'AboutSocialProofSection':
        return aboutSocialProofSectionData;
      case 'TestimonialsSection':
        return homepageData.testimonialsSectionData;
      case 'CtaSection':
        return homepageData.ctaSectionData;
      case 'KpiSection':
        return homepageData.kpiSectionData;
      default:
        console.warn(
          `Data for section type "${sectionConfig.sectionType}" (id: ${sectionConfig.id}) not implemented for /about page.`
        );
        return { id: sectionConfig.id };
    }
  }

  console.warn(
    `Data fetching for section type "${sectionConfig.sectionType}" on page "${pagePath}" (id: ${sectionConfig.id}) is not implemented.`
  );
  return { id: sectionConfig.id };
};

// DynamicPageRenderer becomes an async component
const DynamicPageRenderer: FC<DynamicPageRendererProps> = async ({
  pagePath,
  pageStructure,
  // allSectionsData
}) => {
  if (!pageStructure?.sections || pageStructure.sections.length === 0) {
    // Or render a fallback, or handle this upstream
    return <p>No sections configured for this page.</p>;
  }

  // Fetch data for all sections in parallel
  const sectionsWithDataPromises = pageStructure.sections.map(sectionConfig =>
    getSectionData(pagePath, sectionConfig).then(data => ({
      ...sectionConfig,
      data,
    }))
  );
  const sectionsWithData = await Promise.all(sectionsWithDataPromises);

  // Configure stagger timing (reduced for snappier feel)
  const delayStep = 0.1; // 100ms between section animations
  const maxDelay = 0.3; // cap maximum delay at 300ms
  // Group Problem and Solution sections to share background
  const elements = [];
  for (let i = 0; i < sectionsWithData.length; i++) {
    const section = sectionsWithData[i];
    // Skip section based on KPI page-specific flags or general feature flags
    if (section.sectionType === 'KpiSection') {
      if (pagePath === '/' && !siteConfig.features.enableKpiSection) {
        continue;
      }
      if (pagePath === '/about' && !siteConfig.features.enableAboutKpiSection) {
        continue;
      }
    } else {
      const featureFlagKey = `enable${section.sectionType}` as keyof typeof siteConfig.features;
      if (siteConfig.features[featureFlagKey] === false) {
        continue;
      }
    }
    // Group ProblemPainSection & SolutionVisionSection if both enabled
    if (
      section.sectionType === 'ProblemPainSection' &&
      siteConfig.features.enableProblemPainSection &&
      i + 1 < sectionsWithData.length &&
      sectionsWithData[i + 1].sectionType === 'SolutionVisionSection' &&
      siteConfig.features.enableSolutionVisionSection
    ) {
      const nextSection = sectionsWithData[i + 1];
      elements.push(
        <LazySection key={`${section.id}-${nextSection.id}`} animation="none">
          <ProblemPainSection {...section.data} />
          <SolutionVisionSection {...nextSection.data} />
        </LazySection>
      );
      i++; // Skip the next section as it's already rendered
      continue;
    }
    const Component = sectionComponentMap[section.sectionType];
    if (!Component) {
      console.error(
        `Error: Unknown section type "${section.sectionType}" for id "${section.id}" on page "${pagePath}". Check component map.`
      );
      elements.push(
        <div key={section.id} className="py-8 text-center text-red-500">
          Unknown section type: {section.sectionType} (ID: {section.id})
        </div>
      );
      continue;
    }
    // Compute clamped delay for this section
    const rawDelay = i * delayStep;
    const sectionDelay = Math.min(rawDelay, maxDelay);
    // HeroSection: render directly (JS-driven animations inside component)
    if (section.sectionType === 'HeroSection') {
      elements.push(
        <LazySection key={section.id} animation="none">
          <Component {...section.data} />
        </LazySection>
      );
      continue;
    }
    // CSS-only sections: wrap with LazySection animation="none" for stagger-trigger
    if (cssOnlySections.has(section.sectionType)) {
      elements.push(
        <LazySection
          key={section.id}
          animation="none"
          className="stagger-container"
          style={{ '--stagger-delay': `${sectionDelay}s` } as React.CSSProperties}
        >
          <Component variant={section.variant} {...section.data} />
        </LazySection>
      );
      continue;
    }
    // Special case: KpiSection on homepage
    if (section.sectionType === 'KpiSection' && pagePath === '/') {
      elements.push(
        <LazySection key={section.id} animation="fade-up" delay={sectionDelay}>
          <Component {...section.data} isHomepage={true} />
        </LazySection>
      );
      continue;
    }
    // Special case: KpiSection on About page
    if (section.sectionType === 'KpiSection' && pagePath === '/about') {
      elements.push(
        <LazySection key={section.id} animation="fade-up" delay={sectionDelay}>
          <Component {...section.data} isAboutPage={true} />
        </LazySection>
      );
      continue;
    }
    // Special case: AboutSection on homepage gets isHomepage={true}
    if (pagePath === '/' && section.sectionType === 'AboutSection') {
      elements.push(
        <LazySection key={section.id} animation="fade-up" delay={sectionDelay}>
          <Component variant={section.variant} isHomepage={true} {...section.data} />
        </LazySection>
      );
      continue;
    }
    elements.push(
      <LazySection key={section.id} animation="fade-up" delay={sectionDelay}>
        <Component variant={section.variant} {...section.data} />
      </LazySection>
    );
  }
  return <>{elements}</>;
};

export default DynamicPageRenderer;
