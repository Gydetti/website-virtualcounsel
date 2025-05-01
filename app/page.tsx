import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import AboutSection from "@/components/sections/about-section"
import ProcessSection from "@/components/sections/process-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import CtaSection from "@/components/sections/cta-section"
import ContactSection from "@/components/sections/contact-section"
import ClientsSection from "@/components/sections/clients-section"
import BlogSection from "@/components/sections/blog-section"
import FeaturesSection from "@/components/sections/features-section"
import { getServices, getBlogPosts } from "@/lib/data-utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home | Professional Business Website for Entrepreneurs",
  description:
    "A modern, responsive website template for entrepreneurs and small businesses looking to establish a strong online presence.",
  openGraph: {
    title: "Professional Business Website for Entrepreneurs",
    description:
      "A modern, responsive website template for entrepreneurs and small businesses looking to establish a strong online presence.",
    url: "https://your-domain.com",
    siteName: "Your Business Name",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Business Name",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Business Website for Entrepreneurs",
    description:
      "A modern, responsive website template for entrepreneurs and small businesses looking to establish a strong online presence.",
    images: ["https://your-domain.com/twitter-image.jpg"],
  },
}

export default async function Home() {
  // Fetch data for the homepage
  const services = await getServices()
  const blogPosts = await getBlogPosts(3) // Limit to 3 posts for the homepage

  return (
    <>
      <HeroSection />
      <ClientsSection />
      <ServicesSection services={services} />
      <FeaturesSection />
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
      <BlogSection posts={blogPosts} />
      <CtaSection />
      <ContactSection />
    </>
  )
}
