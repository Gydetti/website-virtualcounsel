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
import { defaultMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/site.config'
import type { Metadata } from "next"

export const metadata = defaultMetadata({
  title: `${siteConfig.site.name} | Home`,
})

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
