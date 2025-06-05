import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';

import { Section } from '@/components/layout/Section';
import ServiceFeaturesSection from '@/components/sections/service-detail/service-features-section';
import ServiceHeroSection from '@/components/sections/service-detail/service-hero-section';
import ServiceProblemSection from '@/components/sections/service-detail/service-problem-section';
import ServiceProcessSection from '@/components/sections/service-detail/service-process-section';
import ServiceUniqueValueSection from '@/components/sections/service-detail/service-unique-value-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { processSectionData } from '@/lib/data/homepage';
import { serviceDetailPageData } from '@/lib/data/serviceDetailPageData';
import { getServiceDetailData } from '@/lib/data/serviceDetailPageData';
import { getServiceBySlug, getServices } from '@/lib/data-utils';
import { iconComponents } from '@/lib/icon-utils';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site.config.local';
import { cn } from '@/lib/utils';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: ServicePageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);
  if (!service) {
    return defaultMetadata({ title: 'Service Not Found' });
  }
  return defaultMetadata({
    title: `${service.title} | ${siteConfig.site.name}`,
    description: service.description,
    openGraph: {
      title: `${service.title} | ${siteConfig.site.name}`,
      description: service.description,
    },
  });
}

export async function generateStaticParams() {
  const services = await getServices();

  return services.map(service => ({
    slug: service.slug,
  }));
}

export default async function ServicePage(props: ServicePageProps) {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Disable this page if services feature is off or page not enabled
  if (
    !siteConfig.features.enableServices ||
    (siteConfig.enabledPages && !siteConfig.enabledPages.includes('/services'))
  ) {
    notFound();
  }

  // Get service-specific enhanced content
  const serviceDetailData = getServiceDetailData(slug);

  // Get header configuration
  const headerConfig = siteConfig.theme.headerConfig;
  const isTransparentHeader = headerConfig?.transparentMode ?? false;
  const heroTopPadding = headerConfig?.heroTopPadding ?? 'pt-20 md:pt-24 lg:pt-28';

  return (
    <>
      {/* Hero Section */}
      <Section
        bgClass={siteConfig.sectionStyles?.heroGradient ?? ''}
        className={cn('relative z-10', isTransparentHeader && heroTopPadding)}
      >
        <ServiceHeroSection
          title={service.title}
          description={service.description}
          targetAudience={serviceDetailData.targetAudience || []}
          icon={service.icon ?? 'Globe'}
          slug={service.slug}
          trustIndicators={['Vaste prijzen', '1-2 weken levering', 'Direct contact met specialist']}
        />
      </Section>

      {/* Problem Section */}
      {serviceDetailData.problemSection && (
        <Section className="bg-neutral-background">
          <ServiceProblemSection
            heading={serviceDetailData.problemSection.heading}
            problems={serviceDetailData.problemSection.problems}
            mainProblemStatement={serviceDetailData.problemSection.mainProblemStatement}
          />
        </Section>
      )}

      {/* Features/Benefits Section */}
      {serviceDetailData.features && serviceDetailData.features.length > 0 && (
        <Section>
          <ServiceFeaturesSection
            heading="Wat krijgt u concreet?"
            subheading="Praktische oplossingen die direct waarde toevoegen aan uw business"
            features={serviceDetailData.features}
            layout="grid"
          />
        </Section>
      )}

      {/* Process Section */}
      {serviceDetailData.processSteps && serviceDetailData.processSteps.length > 0 && (
        <Section className="bg-primary/5">
          <ServiceProcessSection
            heading="Hoe werkt het?"
            subheading="Een helder en efficiënt proces van A tot Z"
            steps={serviceDetailData.processSteps}
            ctaText="Start vandaag nog"
            ctaLink="/contact"
          />
        </Section>
      )}

      {/* Unique Value Section */}
      {serviceDetailData.uniqueValue && (
        <Section>
          <ServiceUniqueValueSection
            heading={serviceDetailData.uniqueValue.heading}
            uniqueValueStatement={serviceDetailData.uniqueValue.statement}
            keyDifferentiators={serviceDetailData.uniqueValue.differentiators}
            highlight={serviceDetailData.uniqueValue.highlight}
          />
        </Section>
      )}

      {/* FAQ Section */}
      {serviceDetailData.faqSection && (
        <Section className="bg-neutral-background">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {serviceDetailData.faqSection.heading}
              </h2>
            </div>
            <div className="space-y-6">
              {serviceDetailData.faqSection.items.map(item => (
                <details
                  key={`faq-${item.question.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-foreground pr-4">{item.question}</h3>
                    <span className="shrink-0 text-primary transition-transform group-open:rotate-180">
                      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <title>Uitklappen</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-neutral-text leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Testimonials Section */}
      {serviceDetailData.testimonialsSection && (
        <Section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {serviceDetailData.testimonialsSection.heading}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {serviceDetailData.testimonialsSection.testimonials.map(testimonial => (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={`star-rating-${testimonial.id}-${i}`}
                      className="size-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <title>Ster {i + 1} van 5</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-neutral-text italic mb-6 text-lg">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-neutral-text">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="bg-primary text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {serviceDetailData.readyToStartCta.heading}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {serviceDetailData.readyToStartCta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="white" className="group" asChild>
              <Link href={serviceDetailData.readyToStartCta.buttonLink || '/contact'}>
                {serviceDetailData.readyToStartCta.buttonText}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="white" className="opacity-90 hover:opacity-100" asChild>
              <Link href="tel:+31611718358">Bel direct: 06 11718358</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
