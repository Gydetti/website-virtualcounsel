import Image from 'next/image';
import type { z } from 'zod';

import ContentBlockRenderer from '@/components/content-blocks/ContentBlockRenderer';
import FormBlock from '@/components/content-blocks/FormBlock'; // Assuming FormBlock can be used
import { Section } from '@/components/layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import type { resourceSchema } from '@/lib/schemas/contentBlocks.schema';

interface ResourceDetailSectionProps {
  resource: z.infer<typeof resourceSchema>;
  // We might need to pass form configuration if not part of resource schema directly
}

export default function ResourceDetailSection({ resource }: ResourceDetailSectionProps) {
  // Placeholder form configuration - this would ideally come from resource data or a central config
  const downloadFormConfig = {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Your full name',
        required: true,
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'your@email.com',
        required: true,
      },
    ],
    submitButtonText: 'Download Your Free E-Book',
    // action: "/api/submit-resource-form" // Placeholder for form submission endpoint
  };
  // Hero image variables with fallback to placeholder
  const imgSrc = resource.heroImage?.src || '/images/placeholders/placeholder.svg';
  const imgAlt = resource.heroImage?.alt || 'Placeholder hero image';
  const imgWidth = resource.heroImage?.width || 700;
  const imgHeight = resource.heroImage?.height || 1000;

  return (
    <Section
      id={`resource-${resource.slug}-detail`}
      className="relative overflow-hidden py-12 md:py-20 z-10"
    >
      <div className="container mx-auto px-4 ">
        {/* Enhanced Hero Area for the Resource */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-12 md:mb-20">
          {/* Hero Items: sequential fade-up animations */}
          <div className="text-center md:text-left">
            <LazySection animation="fade-up" delay={0.1}>
              <h1 className=" mb-4 text-balance">{resource.title}</h1>
            </LazySection>
            {resource.subtitle && (
              <LazySection animation="fade-up" delay={0.2}>
                <p className="text-lg text-foreground mb-6 leading-relaxed">{resource.subtitle}</p>
              </LazySection>
            )}
            {/* Key benefits/learnings section */}
            <LazySection animation="fade-up" delay={0.3}>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-neutral-text/800">
                  What you'll gain:
                </h3>
                <ul className="list-none space-y-2 text-left text-foreground">
                  <li className="flex items-start">
                    <svg
                      className="size-5 text-primary mr-2 shrink-0 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <title>Checkmark</title>
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Placeholder benefit 1: Unlock exclusive insights.</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="size-5 text-primary mr-2 shrink-0 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <title>Checkmark</title>
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Placeholder benefit 2: Master advanced techniques.</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="size-5 text-primary mr-2 shrink-0 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <title>Checkmark</title>
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Placeholder benefit 3: Accelerate your growth.</span>
                  </li>
                </ul>
              </div>
            </LazySection>
          </div>
          <div className="flex flex-col items-center">
            <LazySection animation="fade-up" delay={0.4}>
              <div className="w-full max-w-md mb-6 transition-all duration-500 hover:scale-105">
                <Image
                  src={imgSrc}
                  alt={imgAlt}
                  width={imgWidth}
                  height={imgHeight}
                  className="rounded-lg shadow-xl w-full h-auto object-contain"
                  priority
                />
              </div>
            </LazySection>
            <LazySection animation="fade-up" delay={0.5}>
              <Card className="relative z-10 w-full max-w-md bg-neutral-surface shadow-xl p-0 rounded-xl">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-semibold">
                    Download Your Free E-Book
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormBlock config={downloadFormConfig} />
                </CardContent>
              </Card>
            </LazySection>
          </div>
        </div>

        {/* Dynamic Content Blocks for further details, benefits, sneak peeks etc. */}
        <div className="prose prose-lg max-w-none mx-auto">
          {resource.sections
            .filter(block => block.type !== 'image')
            .map((block, i) => (
              <LazySection key={`${block.type}-${i}`} animation="fade-up" delay={(i + 3) * 0.2}>
                <ContentBlockRenderer block={block} />
              </LazySection>
            ))}
        </div>
      </div>
    </Section>
  );
}
