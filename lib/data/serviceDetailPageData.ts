import type { z } from 'zod';

import { serviceDetailPageDataSchema } from '@/lib/schemas/sections.schema';

/**
 * Service Detail Page Data - Meta-instructional placeholder content
 *
 * This file contains structured, meta-instructional content for service detail pages.
 * All content is designed to guide AI agents and content creators toward best practices.
 *
 * Content Strategy:
 * - Benefits: Focus on outcomes and value, not features
 * - FAQ: Address common objections and concerns
 * - Testimonials: Build trust with specific, credible examples
 * - CTAs: Create urgency and clear next steps
 */

export const serviceDetailPageData: z.infer<typeof serviceDetailPageDataSchema> = {
  // Benefits Section - Key outcomes clients achieve
  benefitsSection: {
    heading: 'Key Benefits of This Service',
    benefits: [
      {
        id: 'benefit-efficiency',
        title: 'Increased Efficiency',
        description:
          'Save time and resources with streamlined processes and automation tailored to your business needs.',
        icon: '✓',
      },
      {
        id: 'benefit-results',
        title: 'Better Results',
        description:
          'Achieve measurable outcomes with data-driven strategies that deliver real business impact.',
        icon: '✓',
      },
      {
        id: 'benefit-support',
        title: 'Expert Support',
        description:
          'Get guidance from specialists with years of industry experience and proven track records.',
        icon: '✓',
      },
    ],
  },

  // FAQ Section - Address common concerns and objections
  faqSection: {
    heading: 'Frequently Asked Questions',
    items: [
      {
        question: 'How long does it take to see results?',
        answer:
          "While timelines vary based on your specific situation and goals, most clients begin seeing initial results within 30-60 days. We'll provide you with a more specific timeline during our consultation based on your unique circumstances.",
      },
      {
        question: 'Do you offer ongoing support?',
        answer:
          'Yes, we provide comprehensive ongoing support and maintenance to ensure your continued success. We offer various support packages to meet your needs and budget, from basic check-ins to full-service management.',
      },
      {
        question: 'How do you measure success?',
        answer:
          'We establish clear KPIs and success metrics at the beginning of our engagement and provide regular reports on progress. Our focus is always on delivering measurable results that directly impact your bottom line and business objectives.',
      },
      {
        question: 'What makes your approach different?',
        answer:
          "Our approach combines data-driven strategies with creative solutions, all tailored to your specific business needs and industry context. We focus on sustainable, long-term growth rather than quick fixes that don't last.",
      },
    ],
  },

  // Testimonials Section - Build trust with social proof
  testimonialsSection: {
    heading: 'What Our Clients Say',
    testimonials: [
      {
        id: 'testimonial-jane',
        quote:
          'Working with this team transformed our business approach. Their expertise and dedication to our success made all the difference in achieving our goals.',
        author: 'Jane Smith',
        company: 'Tech Solutions Inc.',
      },
      {
        id: 'testimonial-john',
        quote:
          'The results exceeded our expectations. Their strategic approach and attention to detail delivered real business impact that we can measure.',
        author: 'John Davis',
        company: 'Growth Ventures',
      },
    ],
  },

  // Ready to Start CTA Section - Create urgency and clear next step
  readyToStartCta: {
    heading: 'Ready to Get Started?',
    description:
      'Take the next step towards achieving your goals with our expert guidance and personalized approach that delivers real results.',
    buttonText: 'Schedule your consultation',
    buttonLink: '/contact',
  },

  // Button Labels - Consistent terminology throughout service detail pages
  buttonLabels: {
    consultation: 'Schedule a Consultation',
    scheduleConsultation: 'Schedule your consultation',
    getStarted: 'Get started today',
  },
};

// Validate data at module load
try {
  serviceDetailPageDataSchema.parse(serviceDetailPageData);
} catch (error) {
  console.error(
    'Error validating serviceDetailPageData:',
    error instanceof Error ? error.message : error
  );
}
