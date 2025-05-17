import { Section } from "@/components/layout/Section";
import ProcessSection from "@/components/sections/process-section";
import ServicesOverviewSection from "@/components/sections/services-overview-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LazySection from "@/components/ui/lazy-section";
import { getServices } from "@/lib/data-utils";
import { processSectionData } from "@/lib/data/homepage";
import { servicesOverviewSectionData } from "@/lib/data/servicesPageData";
import { iconComponents } from "@/lib/icon-utils";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Disable this page if services feature is off or page not enabled
if (
  !siteConfig.features.enableServices ||
  (siteConfig.enabledPages && !siteConfig.enabledPages.includes("/services"))
) {
  notFound();
}

export const metadata = defaultMetadata({
  title: `${siteConfig.site.name} | Services`,
  description:
    "Explore our range of services designed to help entrepreneurs grow their business.",
  openGraph: {
    title: `${siteConfig.site.name} | Services`,
    description:
      "Explore our range of services designed to help entrepreneurs grow their business.",
  },
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <ServicesOverviewSection {...servicesOverviewSectionData} />

      <Section className="">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent =
              iconComponents[service.icon ?? "Globe"] || iconComponents.Globe;

            return (
              <LazySection key={service.id} delay={index * 0.1}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <IconComponent className="h-16 w-16 text-primary-40" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="mb-4">
                      <IconComponent className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold break-words">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 break-words">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Button
                      size="lg"
                      className="w-full whitespace-normal break-words bg-primary hover:bg-primary-90"
                      asChild
                    >
                      <Link href={`/services/${service.slug}`}>
                        {`Learn more about ${service.title}`}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </LazySection>
            );
          })}
        </div>
      </Section>

      <Section className="bg-gray-50">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <LazySection animation="slide-right">
            <h2 className="text-3xl font-bold mb-6">
              Heading introducing key reasons to choose these services
            </h2>
            <p className="text-gray-700 mb-6">
              Brief description explaining the purpose of this section and how
              it builds trust.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span>Tailored solutions for your specific business needs</span>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span>
                  Data-driven strategies that deliver measurable results
                </span>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span>Transparent communication throughout the process</span>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span>Ongoing support and optimization</span>
              </div>
            </div>

            <Button
              size="lg"
              className="mt-8 whitespace-normal break-words group"
              asChild
            >
              <Link href="/contact">
                Primary CTA button text (e.g., 'Schedule a consultation')
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </LazySection>

          <LazySection animation="slide-left" delay={0.15}>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Why Choose Us"
                fill
                className="object-cover"
              />
            </div>
          </LazySection>
        </div>
        <LazySection>
          <ProcessSection {...processSectionData} />
        </LazySection>
      </Section>

      <LazySection>
        <Section className="bg-primary text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              Final CTA section heading encouraging action
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Persuasive text reinforcing the benefit of taking action now
            </p>
            <Button
              size="lg"
              className="whitespace-normal break-words group"
              asChild
            >
              <Link href="/contact">
                Secondary CTA button text (e.g., 'Get started today')
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Section>
      </LazySection>
    </>
  );
}
