// This is a utility file to simulate fetching data from an API or database
// In a real application, you would replace this with actual data fetching logic

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  popular: boolean;
  slug: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  featured?: boolean;
};

// Sample services data
export const getServices = async (): Promise<Service[]> => {
  // In a real app, this would be an API call
  return [
    {
      id: "service-1",
      title: "Web Design & Development",
      description:
        "Custom websites that convert visitors into customers with modern design and seamless functionality.",
      icon: "Globe",
      features: [
        "Responsive design for all devices",
        "SEO-optimized structure",
        "Fast loading speeds",
        "User-friendly navigation",
      ],
      popular: false,
      slug: "web-design-development",
    },
    {
      id: "service-2",
      title: "Digital Marketing Strategy",
      description:
        "Data-driven marketing strategies that increase your online visibility and drive qualified traffic.",
      icon: "BarChart2",
      features: [
        "Comprehensive market analysis",
        "Competitor research",
        "Custom marketing plan",
        "Performance tracking",
        "Regular optimization",
      ],
      popular: true,
      slug: "digital-marketing-strategy",
    },
    {
      id: "service-3",
      title: "Business Automation",
      description:
        "Streamline your operations with custom automation solutions that save time and reduce errors.",
      icon: "Zap",
      features: [
        "Workflow analysis",
        "Custom automation setup",
        "Integration with existing tools",
        "Training and support",
        "Ongoing optimization",
      ],
      popular: false,
      slug: "business-automation",
    },
  ];
};

// Sample blog posts data
export const getBlogPosts = async (limit?: number): Promise<BlogPost[]> => {
  // In a real app, this would be an API call
  const posts = [
    {
      id: "post-1",
      title: "5 Ways to Improve Your Online Presence",
      excerpt:
        "Learn the essential strategies to boost your visibility online and attract more customers to your business.",
      date: "April 15, 2025",
      category: "Digital Marketing",
      image: "/placeholder.svg?height=300&width=600",
      slug: "improve-online-presence",
      featured: true,
    },
    {
      id: "post-2",
      title: "The Importance of Mobile-First Design",
      excerpt:
        "With most web traffic coming from mobile devices, here's why your website needs to prioritize mobile users.",
      date: "March 28, 2025",
      category: "Web Design",
      image: "/placeholder.svg?height=300&width=600",
      slug: "mobile-first-design",
    },
    {
      id: "post-3",
      title: "Automating Your Client Onboarding Process",
      excerpt:
        "Discover how automation can streamline your client onboarding and create a better first impression.",
      date: "March 10, 2025",
      category: "Automation",
      image: "/placeholder.svg?height=300&width=600",
      slug: "automating-client-onboarding",
    },
    {
      id: "post-4",
      title: "How to Create Content That Converts",
      excerpt:
        "Learn the secrets to creating engaging content that not only attracts readers but turns them into customers.",
      date: "February 22, 2025",
      category: "Content Marketing",
      image: "/placeholder.svg?height=300&width=600",
      slug: "content-that-converts",
    },
    {
      id: "post-5",
      title: "Building Trust with Your Online Audience",
      excerpt:
        "Explore proven strategies to establish credibility and build lasting trust with your online audience.",
      date: "February 5, 2025",
      category: "Brand Building",
      image: "/placeholder.svg?height=300&width=600",
      slug: "building-trust-online",
    },
    {
      id: "post-6",
      title: "The ROI of Professional Web Design",
      excerpt:
        "Understand the real business impact and return on investment from professional web design services.",
      date: "January 18, 2025",
      category: "Web Design",
      image: "/placeholder.svg?height=300&width=600",
      slug: "roi-web-design",
    },
  ];

  if (limit) {
    return posts.slice(0, limit);
  }

  return posts;
};

// Get a single service by slug
export const getServiceBySlug = async (
  slug: string,
): Promise<Service | undefined> => {
  const services = await getServices();
  return services.find((service) => service.slug === slug);
};

// Get a single blog post by slug
export const getBlogPostBySlug = async (
  slug: string,
): Promise<BlogPost | undefined> => {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
};
