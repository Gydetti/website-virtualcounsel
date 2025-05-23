import { z } from 'zod';

import {
  aboutSectionDataSchema,
  blogSectionDataSchema,
  clientsSectionDataSchema,
  contactSectionDataSchema,
  ctaSectionDataSchema,
  featuresSectionDataSchema,
  heroSectionDataSchema,
  homepageFaqSectionDataSchema,
  kpiSectionDataSchema,
  pricingSectionDataSchema,
  problemPainSectionDataSchema,
  processSectionDataSchema,
  servicesSectionDataSchema,
  solutionVisionSectionDataSchema,
  testimonialsSectionDataSchema,
  valuePropSectionDataSchema,
  // Import other section schemas as needed
} from '../schemas/sections.schema';

// Note: The old PropType imports are removed as we'll use Zod inferred types.

export const heroSectionData: z.infer<typeof heroSectionDataSchema> = {
  badgeText: 'Short, attention-grabbing badge',
  headline: 'Headline stating your core value',
  subheadline: 'Supportive subtitle: what you do, for whom, and the primary result',
  primaryCta: { text: 'Main CTA button', href: '/contact' },
  secondaryCta: { text: 'Secondary CTA button', href: '/about' },
  showSecondaryCta: true,
  typingWords: ['Unique value prop', 'Key benefit', 'Target audience'],
  stats: [
    { value: 7, suffix: '+', label: 'Years of experience' },
    { value: 98, suffix: '%', label: 'Client satisfaction rate' },
    { value: 40, suffix: '+', label: 'Successful projects delivered' },
    { value: 300, suffix: '+', label: 'Happy clients' },
  ],
  image: {
    src: '/images/hero/hero-main.webp',
    alt: 'Professional business hero image for homepage',
  },
  showHelpedStats: true,
  showOverlayStat: true,
  overlayTitle: 'Overlay stat title',
  overlayValue: '+150%',
};

export const featuresSectionData: z.infer<typeof featuresSectionDataSchema> = {
  badgeText: 'See the clear difference',
  heading: 'From problem state to solution state',
  description: 'Contrast typical challenges versus ideal outcomes',
  comparison: {
    without: {
      title: 'Current state',
      items: [
        'Pain point placeholder one',
        'Pain point placeholder two',
        'Pain point placeholder three',
        'Pain point placeholder four',
        'Pain point placeholder five',
      ],
    },
    with: {
      title: 'Future state',
      items: [
        'Solution placeholder one',
        'Solution placeholder two',
        'Solution placeholder three',
        'Solution placeholder four',
        'Solution placeholder five',
      ],
    },
  },
  cta: { text: 'Discover our method', href: '/services' },
};

export const clientsSectionData: z.infer<typeof clientsSectionDataSchema> = {
  badgeText: 'Trusted by leading brands',
  heading: 'Client logos showcasing credibility and partnerships', // Schema allows it, component might not use it
  clients: [
    {
      name: 'TechCorp',
      logo: {
        src: '/images/placeholders/placeholder-logo.svg',
        alt: 'TechCorp Logo',
      },
    },
    {
      name: 'InnovateLabs',
      logo: {
        src: '/images/placeholders/placeholder-logo.svg',
        alt: 'InnovateLabs Logo',
      },
    },
    {
      name: 'GrowthPartners',
      logo: {
        src: '/images/placeholders/placeholder-logo.svg',
        alt: 'GrowthPartners Logo',
      },
    },
    {
      name: 'FutureVision',
      logo: {
        src: '/images/placeholders/placeholder-logo.svg',
        alt: 'FutureVision Logo',
      },
    },
    {
      name: 'NextLevel',
      logo: {
        src: '/images/placeholders/placeholder-logo.svg',
        alt: 'NextLevel Logo',
      },
    },
    {
      name: 'PeakPerformance',
      logo: {
        src: '/images/placeholders/placeholder-logo.svg',
        alt: 'PeakPerformance Logo',
      },
    },
    {
      name: 'EliteServices',
      logo: {
        src: '/images/placeholders/placeholder-logo.svg',
        alt: 'EliteServices Logo',
      },
    },
    {
      name: 'PrimeConsulting',
      logo: {
        src: '/images/placeholders/placeholder-logo.svg',
        alt: 'PrimeConsulting Logo',
      },
    },
  ],
};

export const testimonialsSectionData: z.infer<typeof testimonialsSectionDataSchema> = {
  badgeText: 'Testimonials',
  heading: 'Testimonial section',
  subtitle: 'Important section to build credibility with real client feedback',
  testimonials: [
    {
      id: 'testimonial-1',
      quote:
        'Working with this team transformed our online presence. Within three months, our website traffic increased by 150% and our leads doubled. Their strategic approach and attention to detail made all the difference.',
      name: 'Sarah Johnson',
      title: 'CEO, Innovate Solutions',
      image: {
        src: '/images/placeholders/placeholder.svg',
        alt: 'Sarah Johnson',
      },
      rating: 5,
    },
    {
      id: 'testimonial-2',
      quote:
        'I was skeptical about digital marketing until I started working with this team. They took the time to understand my business and created a strategy that actually works. My ROI has been incredible.',
      name: 'Michael Chen',
      title: 'Founder, GrowthTech',
      image: {
        src: '/images/placeholders/placeholder.svg',
        alt: 'Michael Chen',
      },
      rating: 5,
    },
    {
      id: 'testimonial-3',
      quote:
        "The level of expertise and personalized service is outstanding. They don't just implement tactics; they develop comprehensive strategies tailored to my specific goals. I've seen consistent growth month after month.",
      name: 'Emma Rodriguez',
      title: 'Marketing Director, Elevate Inc.',
      image: {
        src: '/images/placeholders/placeholder.svg',
        alt: 'Emma Rodriguez',
      },
      rating: 5,
    },
  ],
};

export const problemPainSectionData: z.infer<typeof problemPainSectionDataSchema> = {
  badgeText: 'Problem section',
  heading: 'Understanding client challenges',
  description: 'Empathy-driven intro highlighting common client problems',
  calloutText: 'Optional: emphasize the cost of inaction',
  cards: [
    {
      id: 'pain-card-1',
      title: 'Pain point one',
      description: 'Describe how this challenge affects the client',
    },
    {
      id: 'pain-card-2',
      title: 'Pain point two',
      description: 'Explain this second common frustration briefly',
    },
    {
      id: 'pain-card-3',
      title: 'Pain point three',
      description: 'Outline another key challenge your clients face',
    },
    {
      id: 'pain-card-4',
      title: 'Pain point four',
      description: 'Highlight an additional obstacle impacting clients',
    },
  ],
};

export const solutionVisionSectionData: z.infer<typeof solutionVisionSectionDataSchema> = {
  badgeText: 'Introducing your solution',
  heading: 'Your clear path to success',
  description: 'Explain how this section outlines your approach to solving client challenges',
  benefits: [
    'Consistent, predictable results',
    'More time for core activities',
    'Confidence in your strategy',
    'Optional: additional benefit placeholder',
    'Optional: another key outcome',
  ],
  calloutText: 'Optional: inspiring statement about expected outcomes',
  calloutCta: { text: 'Learn how it works', href: '/about' },
};

export const ctaSectionData: z.infer<typeof ctaSectionDataSchema> = {
  badgeText: 'Ready to get started?',
  heading: "Let's build your success story together",
  description: 'Persuasive message reinforcing the benefit of acting now',
  primaryCta: { text: 'Schedule a consultation', href: '/contact' },
  secondaryCta: { text: 'Download a free resource', href: '/services' },
};

export const valuePropSectionData: z.infer<typeof valuePropSectionDataSchema> = {
  badgeText: 'Why choose us?',
  heading: 'How we deliver exceptional results',
  subheading: 'Highlight key differentiators that answer "What\'s in it for the client?"]',
  benefits: [
    {
      id: 'benefit-1',
      title: 'Achieve goals faster',
      description: 'Accelerate outcomes with targeted strategies for your business.',
      icon: 'check-circle',
    },
    {
      id: 'benefit-2',
      title: 'Tailored solutions',
      description: 'Receive custom plans crafted to your unique needs.',
      icon: 'check-circle',
    },
    {
      id: 'benefit-3',
      title: 'Measurable impact',
      description: 'Track real results with clear metrics and KPIs.',
      icon: 'check-circle',
    },
  ],
};

export const pricingSectionData: z.infer<typeof pricingSectionDataSchema> = {
  badgeText: 'Simple & transparent',
  heading: 'Our pricing plans',
  description: 'Choose the plan that fits your needs.',
  cards: [
    {
      id: 'price-basic',
      title: 'Basic',
      price: '$99/mo',
      features: ['Feature A', 'Feature B', 'Feature C'],
      cta: { text: 'Choose basic', href: '/#pricing' },
      popular: false,
    },
    {
      id: 'price-pro',
      title: 'Pro',
      price: '$199/mo',
      features: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
      cta: { text: 'Choose pro', href: '/#pricing' },
      popular: true,
    },
    {
      id: 'price-enterprise',
      title: 'Enterprise',
      price: '$299/mo',
      features: ['All pro features', 'Feature E', 'Feature F'],
      cta: { text: 'Contact sales', href: '/contact' },
      popular: false,
    },
  ],
};

export const homepageFaqSectionData: z.infer<typeof homepageFaqSectionDataSchema> = {
  badgeText: 'Your questions answered',
  heading: 'Frequently asked questions',
  description:
    "Find quick answers to common inquiries about our services and processes. If you don't see your question here, feel free to reach out!",
  categories: [
    {
      category: 'General questions',
      questions: [
        {
          question: 'What services do you offer?',
          answer:
            'We provide digital growth strategy, web design, content marketing, and automation to help businesses scale.',
        },
        {
          question: 'How do I get started?',
          answer:
            'You can reach out via our contact form or schedule a consultation to discuss your needs and goals.',
        },
        {
          question: 'Which industries do you serve?',
          answer:
            'We work with entrepreneurs and small businesses across tech, professional services, e-commerce, and more.',
        },
      ],
    },
    {
      category: 'Services',
      questions: [
        {
          question: 'Can I customize my service package?',
          answer:
            'Absolutely—each package is tailored to your specific goals and budget to ensure the best outcome.',
        },
        {
          question: 'How long does a typical project take?',
          answer: 'Most projects take between 4 to 8 weeks, depending on the scope and complexity.',
        },
        {
          question: 'Do you provide ongoing support?',
          answer:
            'Yes, we offer maintenance and optimization services after launch to keep your digital presence at peak performance.',
        },
      ],
    },
    {
      category: 'Pricing & billing',
      questions: [
        {
          question: 'What are your pricing options?',
          answer:
            'We offer both fixed-price packages and hourly rates, allowing flexibility based on project needs.',
        },
        {
          question: 'Do you offer payment plans?',
          answer:
            'Yes, we can structure payments into milestones to fit your budgeting requirements.',
        },
        {
          question: 'Is there a refund policy?',
          answer:
            "If you're not satisfied within the first 14 days of service, we offer a full refund.",
        },
      ],
    },
  ],
  cta: { text: 'View all FAQs', href: '/faq' },
};

// ++ Data for Services Preview Section on Homepage (Corrected) ++
export const servicesPreviewSectionData: Omit<
  z.infer<typeof servicesSectionDataSchema>,
  'services'
> = {
  heading: 'Services we offer',
  description: 'Explore our range of expert services designed to help your business thrive.',
  viewAllCta: { text: 'View all services', href: '/services' },
  displayType: 'grid', // Added as per schema, can be overridden if needed by component
};

// ++ Data for Blog Preview Section on Homepage ++
export const blogPreviewSectionData: Omit<z.infer<typeof blogSectionDataSchema>, 'posts'> = {
  badgeText: 'From our blog',
  heading: 'Latest articles & insights',
  subtitle: 'Stay updated with our latest news, tips, and industry insights.',
  viewAllCta: { text: 'View all posts', href: '/blog' },
};

export const aboutSectionData: z.infer<typeof aboutSectionDataSchema> = {
  badgeText: 'About section',
  heading: 'Tell your company story',
  paragraphs: [
    'Use this section to introduce your company, its mission, and core values.',
    'Highlight key milestones, achievements, or what makes your team unique.',
    'Connect with your audience on a personal level.',
  ],
  image: {
    src: '/images/placeholders/placeholder.svg',
    alt: 'Placeholder image representing company or team',
  },
  stats: [
    { id: 'stat-experience', value: '10+ years', label: 'Industry experience' },
    { id: 'stat-clients', value: '500+ happy', label: 'Clients served' },
    {
      id: 'stat-projects',
      value: '1000+ projects',
      label: 'Successfully delivered',
    },
  ],
  cta: { text: 'Learn more about us', href: '/about' },
  philosophy: {
    title: 'My philosophy',
    text: "I believe that the best results come from a collaborative approach where we work together as partners to achieve your goals. My clients aren't just customers – they're collaborators in the journey to success.",
  },
  featureCards: [
    {
      id: 'certified',
      title: 'Certified professional',
      description: 'Industry-recognized credentials and certifications',
      icon: 'Star',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      id: 'proven',
      title: 'Proven results',
      description: 'Track record of success with measurable outcomes',
      icon: 'CheckCircle',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
  ],
};

// ++ Data for Process Section on Homepage ++
export const processSectionData: z.infer<typeof processSectionDataSchema> = {
  badgeText: 'Our method',
  heading: 'How we achieve results',
  subtitle:
    'A clear, step-by-step overview of our proven process, designed for transparency and client success.',
  steps: [
    {
      id: 'step-01',
      number: '01',
      title: 'Discovery & strategy',
      description: 'Understand your goals, audience, and challenges to create a tailored plan.',
      details: [
        'Initial consultation and needs assessment.',
        'Market research and competitor analysis.',
        'Defining key performance indicators (KPIs).',
      ],
    },
    {
      id: 'step-02',
      number: '02',
      title: 'Design & development',
      description: 'Crafting a user-centric design and building a robust, scalable solution.',
      details: [
        'Wireframing and prototyping based on UX best practices.',
        'Visual design aligned with your brand identity.',
        'Agile development sprints for iterative progress.',
      ],
    },
    {
      id: 'step-03',
      number: '03',
      title: 'Testing & launch',
      description: 'Ensuring quality through rigorous testing before a seamless deployment.',
      details: [
        'Comprehensive QA across devices and browsers.',
        'Performance and security testing.',
        'Go-live strategy and post-launch monitoring.',
      ],
    },
    {
      id: 'step-04',
      number: '04',
      title: 'Growth & optimization',
      description:
        'Continuously analyzing data to refine strategies and drive ongoing improvement.',
      details: [
        'Regular performance reporting and insights.',
        'A/B testing and conversion rate optimization (CRO).',
        'Adapting to market changes and new opportunities.',
      ],
    },
  ],
};

// ++ Data for Contact Section on Homepage ++
export const contactSectionData: z.infer<typeof contactSectionDataSchema> = {
  badgeText: 'Get in touch',
  heading: 'Contact us today',
  subtitle:
    "Have questions or ready to start your project? Reach out and we'll get back to you shortly. Use the form below or contact us directly via email or phone.",
  // Note: The actual form fields and contact details (email, phone, address)
  // are pulled from siteConfig by the ContactSection component itself.
  // This data object is just for the introductory text specific to the homepage instance.
};

// ++ Data for KPI Stats Section on Homepage ++
export const kpiSectionData: z.infer<typeof kpiSectionDataSchema> = {
  stats: [
    {
      id: 'kpi-experience',
      value: 10,
      suffix: '+',
      label: 'Years of experience',
    },
    {
      id: 'kpi-satisfaction',
      value: 98,
      suffix: '%',
      label: 'Client satisfaction rate',
    },
    {
      id: 'kpi-projects',
      value: 40,
      suffix: '+',
      label: 'Successful projects delivered',
    },
    { id: 'kpi-clients', value: 300, suffix: '+', label: 'Happy clients' },
  ],
};

// Schema validation for all exported data objects
try {
  heroSectionDataSchema.parse(heroSectionData);
  featuresSectionDataSchema.parse(featuresSectionData);
  clientsSectionDataSchema.parse(clientsSectionData);
  testimonialsSectionDataSchema.parse(testimonialsSectionData);
  pricingSectionDataSchema.parse(pricingSectionData);
  servicesSectionDataSchema.parse({
    ...servicesPreviewSectionData,
    services: [],
  });
  blogSectionDataSchema.parse({
    ...blogPreviewSectionData,
    posts: [
      {
        id: 'mock-post-validation',
        title: 'Mock Post for Validation',
        excerpt: 'This is a mock excerpt to satisfy Zod validation.',
        date: '2024-01-01',
        category: 'Mock Category',
        image: { src: '/placeholder.svg', alt: 'Mock Validation Image' },
        slug: 'mock-post-slug-validation',
      },
    ],
  });
  problemPainSectionDataSchema.parse(problemPainSectionData);
  solutionVisionSectionDataSchema.parse(solutionVisionSectionData);
  ctaSectionDataSchema.parse(ctaSectionData);
  valuePropSectionDataSchema.parse(valuePropSectionData);
  homepageFaqSectionDataSchema.parse(homepageFaqSectionData);
  aboutSectionDataSchema.parse(aboutSectionData);
  processSectionDataSchema.parse(processSectionData);
  contactSectionDataSchema.parse(contactSectionData);
  kpiSectionDataSchema.parse(kpiSectionData);
} catch (error) {
  console.error(
    'Error validating homepage data:',
    error instanceof z.ZodError ? error.errors : error
  );
  // Decide how to handle validation errors: throw, log, etc.
  // For now, logging to console during development is fine.
  // In a build step, you might want to throw to fail the build.
}
