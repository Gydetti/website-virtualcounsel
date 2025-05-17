// This is a utility file to simulate fetching data from an API or database
// In a real application, you would replace this with actual data fetching logic

import { z } from 'zod';
import { blogPostSchema } from './schemas/pages.schema';
import type { serviceItemSchema } from './schemas/sections.schema'; // Service items are often part of sections

// Type alias for inferred types for cleaner usage in function signatures
export type ServiceType = z.infer<typeof serviceItemSchema>;
export type BlogPostType = z.infer<typeof blogPostSchema>;

// Sample services data
export const getServices = async (): Promise<ServiceType[]> => {
  const servicesData: ServiceType[] = [
    {
      id: 'service-1',
      title: 'Web Design & Development',
      description:
        'Custom websites that convert visitors into customers with modern design and seamless functionality.',
      icon: 'Globe',
      features: [
        'Responsive design for all devices',
        'SEO-optimized structure',
        'Fast loading speeds',
        'User-friendly navigation',
      ],
      popular: false,
      slug: 'web-design-development',
    },
    {
      id: 'service-2',
      title: 'Digital Marketing Strategy',
      description:
        'Data-driven marketing strategies that increase your online visibility and drive qualified traffic.',
      icon: 'BarChart2',
      features: [
        'Comprehensive market analysis',
        'Competitor research',
        'Custom marketing plan',
        'Performance tracking',
        'Regular optimization',
      ],
      popular: true,
      slug: 'digital-marketing-strategy',
    },
    {
      id: 'service-3',
      title: 'Business Automation',
      description:
        'Streamline your operations with custom automation solutions that save time and reduce errors.',
      icon: 'Zap',
      features: [
        'Workflow analysis',
        'Custom automation setup',
        'Integration with existing tools',
        'Training and support',
        'Ongoing optimization',
      ],
      popular: false,
      slug: 'business-automation',
    },
  ];
  // In a real app, this data would be fetched and then validated.
  // For mock data, we assume it conforms. We can add parsing for robustness:
  // return z.array(serviceItemSchema).parse(servicesData);
  return servicesData;
};

// Sample blog posts data
export const getBlogPosts = async (limit?: number): Promise<BlogPostType[]> => {
  const postsDataRaw = [
    {
      id: 'post-1',
      title: '5 Ways to Improve Your Online Presence',
      excerpt:
        'Learn the essential strategies to boost your visibility online and attract more customers to your business.',
      date: '2025-04-15',
      category: 'Digital Marketing',
      coverImage: {
        src: '/placeholder.svg?height=300&width=600',
        alt: 'Improve Online Presence',
      },
      content: 'Full blog post content for post-1 would go here...',
      slug: 'improve-online-presence',
      featured: true,
      author: {
        name: 'Default Author',
        image: { src: '/placeholder.svg', alt: 'Author' },
      },
      seo: { title: 'SEO Title for Post 1' },
    },
    {
      id: 'post-2',
      title: 'The Importance of Mobile-First Design',
      excerpt:
        "With most web traffic coming from mobile devices, here's why your website needs to prioritize mobile users.",
      date: '2025-03-28',
      category: 'Web Design',
      coverImage: {
        src: '/placeholder.svg?height=300&width=600',
        alt: 'Mobile-First Design',
      },
      content: 'Full blog post content for post-2...',
      slug: 'mobile-first-design',
    },
    {
      id: 'post-3',
      title: 'Automating Your Client Onboarding Process',
      excerpt:
        'Discover how automation can streamline your client onboarding and create a better first impression.',
      date: '2025-03-10',
      category: 'Automation',
      coverImage: {
        src: '/placeholder.svg?height=300&width=600',
        alt: 'Client Onboarding Automation',
      },
      content: 'Full blog post content for post-3...',
      slug: 'automating-client-onboarding',
    },
    {
      id: 'post-4',
      title: 'How to Create Content That Converts',
      excerpt:
        'Learn the secrets to creating engaging content that not only attracts readers but turns them into customers.',
      date: '2025-02-22',
      category: 'Content Marketing',
      coverImage: {
        src: '/placeholder.svg?height=300&width=600',
        alt: 'Content That Converts',
      },
      content: 'Full blog post content for post-4...',
      slug: 'content-that-converts',
    },
    {
      id: 'post-5',
      title: 'Building Trust with Your Online Audience',
      excerpt:
        'Explore proven strategies to establish credibility and build lasting trust with your online audience.',
      date: '2025-02-05',
      category: 'Brand Building',
      coverImage: {
        src: '/placeholder.svg?height=300&width=600',
        alt: 'Building Trust Online',
      },
      content: 'Full blog post content for post-5...',
      slug: 'building-trust-online',
    },
    {
      id: 'post-6',
      title: 'The ROI of Professional Web Design',
      excerpt:
        'Understand the real business impact and return on investment from professional web design services.',
      date: '2025-01-18',
      category: 'Web Design',
      coverImage: {
        src: '/placeholder.svg?height=300&width=600',
        alt: 'ROI Web Design',
      },
      content: 'Full blog post content for post-6...',
      slug: 'roi-web-design',
    },
  ];

  const postsDataForValidation = postsDataRaw.map(post => ({
    ...post,
    author: post.author || {
      name: 'Default Author',
      image: { src: '/placeholder.svg', alt: 'Author' },
    },
    seo: post.seo || { title: post.title },
  }));

  const validatedPosts = z.array(blogPostSchema).parse(postsDataForValidation);

  // Convert Date to ISO string and alias coverImage to image for BlogSection
  const postsWithImage = validatedPosts.map(post => ({
    ...post,
    date: post.date,
    image: post.coverImage,
  }));

  if (limit) {
    return postsWithImage.slice(0, limit);
  }

  return postsWithImage;
};

// Get a single service by slug
export const getServiceBySlug = async (slug: string): Promise<ServiceType | undefined> => {
  const services = await getServices();
  return services.find(service => service.slug === slug);
};

// Get a single blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPostType | undefined> => {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug);
};
