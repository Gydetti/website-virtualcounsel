import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';

import { Section } from '@/components/layout/Section';
import ProcessSection from '@/components/sections/process-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { getServiceBySlug, getServices } from '@/lib/data-utils';
import { iconComponents } from '@/lib/icon-utils';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/siteConfig';

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

  const IconComponent = iconComponents[service.icon ?? 'Globe'] || iconComponents.Globe;

  // Additional service details
  const benefits = [
    {
      title: 'Increased Efficiency',
      description: 'Save time and resources with streamlined processes and automation.',
      icon: '✓',
    },
    {
      title: 'Better Results',
      description: 'Achieve measurable outcomes with data-driven strategies.',
      icon: '✓',
    },
    {
      title: 'Expert Support',
      description: 'Get guidance from specialists with years of industry experience.',
      icon: '✓',
    },
  ];

  const process = [
    {
      id: 'step-1',
      title: 'Discovery',
      description: 'We start by understanding your business, goals, and challenges.',
    },
    {
      id: 'step-2',
      title: 'Strategy',
      description: 'We develop a customized plan tailored to your specific needs.',
    },
    {
      id: 'step-3',
      title: 'Implementation',
      description: 'Our team executes the strategy with precision and attention to detail.',
    },
    {
      id: 'step-4',
      title: 'Optimization',
      description: 'We continuously monitor and improve to ensure optimal results.',
    },
  ];

  const faq = [
    {
      question: 'How long does it take to see results?',
      answer:
        "While timelines vary based on your specific situation and goals, most clients begin seeing initial results within 30-60 days. We'll provide you with a more specific timeline during our consultation.",
    },
    {
      question: 'Do you offer ongoing support?',
      answer:
        'Yes, we provide ongoing support and maintenance to ensure your continued success. We offer various support packages to meet your needs and budget.',
    },
    {
      question: 'How do you measure success?',
      answer:
        'We establish clear KPIs at the beginning of our engagement and provide regular reports on progress. Our focus is always on delivering measurable results that impact your bottom line.',
    },
    {
      question: 'What makes your approach different?',
      answer:
        'Our approach combines data-driven strategies with creative solutions, all tailored to your specific business needs. We focus on sustainable growth rather than quick fixes.',
    },
  ];

  const testimonials = [
    {
      quote:
        'Working with this team transformed our business. Their expertise and dedication to our success made all the difference.',
      author: 'Jane Smith',
      company: 'Tech Solutions Inc.',
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      quote:
        'The results exceeded our expectations. Their strategic approach and attention to detail delivered real business impact.',
      author: 'John Davis',
      company: 'Growth Ventures',
      image: '/placeholder.svg?height=100&width=100',
    },
  ];

  return (
    <>
      <Section bgClass={siteConfig.sectionStyles?.heroGradient ?? ''}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <LazySection animation="slide-up" delay={0}>
              <IconComponent className="size-20 text-primary mb-6" />
            </LazySection>
            <LazySection animation="fade-up" delay={0.1}>
              <h1 className="mb-4 break-words">{service.title}</h1>
            </LazySection>
            <LazySection animation="fade-up" delay={0.2}>
              <p className="text-neutral-text mb-8">{service.description}</p>
            </LazySection>
            <LazySection animation="fade-up" delay={0.3}>
              <Button size="lg" className="bg-primary hover:bg-primary90" asChild>
                <Link href="/contact">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </LazySection>
          </div>

          <LazySection
            animation="fade"
            delay={0.4}
            fullHeight={false}
            childrenStagger={false}
            className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl"
          >
            <Image
              src={DEFAULT_PLACEHOLDER_IMAGE}
              alt={`${service.title} service hero illustration`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="size-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
              <IconComponent className="size-32 text-white drop-shadow-lg" />
            </div>
          </LazySection>
        </div>
      </Section>

      <Section>
        <LazySection animation="fade-up" delay={0} className="text-center mb-12">
          <h2 className="text-heading text-3xl font-bold">Key Benefits of This Service</h2>
        </LazySection>
        <LazySection
          animation="none"
          className="stagger-container grid md:grid-cols-3 gap-8 items-stretch"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          {benefits.map((benefit, idx) => (
            <Card
              key={benefit.title}
              className="text-center h-full flex flex-col p-6 transition-all duration-300 hover:shadow-lg"
              style={{ '--index': idx } as CSSProperties}
            >
              <div className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                <span className="text-2xl">{benefit.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </Card>
          ))}
        </LazySection>
      </Section>

      <ProcessSection steps={process} />

      <Section className="bg-neutral-background">
        <LazySection
          animation="none"
          className="stagger-container text-center mb-12"
          style={{ '--stagger-delay': '0.2s' } as CSSProperties}
        >
          <h2 className="text-heading text-3xl font-bold" style={{ '--index': 0 } as CSSProperties}>
            Frequently Asked Questions
          </h2>
        </LazySection>
        <LazySection
          animation="none"
          className="stagger-container space-y-6 max-w-3xl mx-auto"
          style={{ '--stagger-delay': '0.2s' } as CSSProperties}
        >
          {faq.map((item, idx) => (
            <div key={item.question} style={{ '--index': idx + 1 } as CSSProperties}>
              <Card className="transition-all duration-200 hover:shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{item.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </LazySection>
      </Section>

      <Section className="bg-primary text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Take the next step towards achieving your goals with our expert guidance and
            personalized approach.
          </p>
          <Button size="lg" variant="white" className="group" asChild>
            <Link href="/contact">
              Schedule your consultation
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section className="bg-neutral-background">
        <LazySection
          animation="none"
          className="stagger-container"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          <h2
            className="text-heading text-3xl font-bold mb-12 text-center"
            style={{ '--index': 0 } as CSSProperties}
          >
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={testimonial.author} style={{ '--index': idx + 1 } as CSSProperties}>
                <Card className="p-6 h-full transition-all duration-200 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="relative size-16 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={DEFAULT_PLACEHOLDER_IMAGE}
                        alt={`${testimonial.author} profile photo`}
                        fill
                        sizes="64px"
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground italic mb-4 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </LazySection>
      </Section>
    </>
  );
}
