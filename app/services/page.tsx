import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Section } from '@/components/layout/Section';
import ProcessSection from '@/components/sections/process-section';
import ServicesOverviewSection from '@/components/sections/services-overview-section';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { processSectionData } from '@/lib/data/homepage';
import { servicesPageData } from '@/lib/data/servicesPageData';
import { getServices } from '@/lib/data-utils';
import { iconComponents } from '@/lib/icon-utils';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/siteConfig';

// Disable this page if services feature is off or page not enabled
if (
  !siteConfig.features.enableServices ||
  (siteConfig.enabledPages && !siteConfig.enabledPages.includes('/services'))
) {
  notFound();
}

export const metadata = defaultMetadata({
  title: `${siteConfig.site.name} | Diensten`,
  description: 'Ontdek mijn aanbod van diensten, ontworpen om ondernemers te helpen groeien.',
  openGraph: {
    title: `${siteConfig.site.name} | Diensten`,
    description: 'Ontdek mijn aanbod van diensten, ontworpen om ondernemers te helpen groeien.',
  },
});

export default async function ServicesPage() {
  const services = await getServices();

  // Sort services to show popular ones first
  const sortedServices = [...services].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return 0;
  });

  // Get dynamic content
  const { overview, whyChooseSection, ctaSection, buttonLabels } = servicesPageData;

  // Dynamic grid classes based on number of services for proper centering
  const getGridClasses = (serviceCount: number) => {
    if (serviceCount === 1) {
      return 'grid grid-cols-1 place-items-center gap-8';
    }
    if (serviceCount === 2) {
      return 'grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center max-w-4xl mx-auto';
    }
    return 'grid md:grid-cols-2 lg:grid-cols-3 gap-8 card-equal-height justify-items-center';
  };

  return (
    <>
      <ServicesOverviewSection {...overview} />

      <Section>
        <div className={getGridClasses(sortedServices.length)}>
          {sortedServices.map((service, index) => {
            const IconComponent = iconComponents[service.icon ?? 'Globe'] || iconComponents.Globe;

            return (
              <LazySection key={service.id} delay={index * 0.1}>
                <div className="size-full max-w-sm">
                  <Card className="size-full flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl relative">
                    {service.popular && (
                      <div className="absolute top-0 right-0 z-10 bg-accent text-white text-sm font-bold px-3 py-1 rounded-bl-lg">
                        Populair
                      </div>
                    )}
                    <div className="relative h-48 w-full">
                      <Image
                        src={DEFAULT_PLACEHOLDER_IMAGE}
                        alt={`${service.title} service illustration`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="size-full object-cover"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <IconComponent className="size-16 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold mb-3 text-foreground">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-neutral-text leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button
                        size="lg"
                        animation="none"
                        className="w-full hover:scale-100 hover:shadow-none hover:-translate-y-0 group"
                        asChild
                      >
                        <Link href={`/services/${service.slug}`}>
                          {buttonLabels?.learnMore || 'Meer informatie'}
                          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </LazySection>
            );
          })}
        </div>
      </Section>

      <Section className="bg-neutral-background">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <LazySection animation="slide-right" className="!overflow-x-visible">
            <h2 className="text-heading text-3xl font-bold mb-6">{whyChooseSection.heading}</h2>
            <p className="text-neutral-text mb-8 text-lg">{whyChooseSection.description}</p>

            <div className="space-y-6">
              {whyChooseSection.benefits.map(benefit => {
                const IconComponent = iconComponents[benefit.icon ?? 'Check'] || Check;
                return (
                  <div key={benefit.id} className="flex items-start gap-4">
                    <div className="shrink-0 size-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="size-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            <Button size="lg" className="mt-8 group" asChild>
              <Link href={whyChooseSection.buttonLink || '/contact'}>
                {whyChooseSection.buttonText}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </LazySection>

          <LazySection animation="slide-left" delay={0.15} className="!overflow-x-visible">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/team/virtual-counsel-maarten-pointing.webp"
                alt="Professional consultation and strategic planning session"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="size-full object-cover"
                priority
              />
            </div>
          </LazySection>
        </div>
      </Section>

      <Section>
        <ProcessSection {...processSectionData} />
      </Section>

      <Section className="bg-primary text-white">
        <LazySection>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">{ctaSection.heading}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">{ctaSection.description}</p>
            <Button size="lg" variant="white" className="group" asChild>
              <Link href={ctaSection.buttonLink || '/contact'}>
                {ctaSection.buttonText}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </LazySection>
      </Section>
    </>
  );
}
