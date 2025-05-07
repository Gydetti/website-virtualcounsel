import { Section } from "@/components/layout/Section";
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
import { iconComponents } from "@/lib/icon-utils";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config";
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
			<LazySection>
				<Section className="bg-gradient-to-r from-blue-50 to-white">
					<div className="text-center max-w-3xl mx-auto">
						<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
							Our Services
						</Badge>
						<h1>How We Help You Grow</h1>
						<p className="text-gray-700 mb-8">
							We offer specialized services designed to help entrepreneurs and
							small businesses thrive in the digital landscape.
						</p>
					</div>
				</Section>
			</LazySection>

			<Section className="bg-white">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service, index) => {
						const IconComponent =
							iconComponents[service.icon] || iconComponents.Globe;

						return (
							<LazySection key={service.id} delay={index * 0.1}>
								<Card className="overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
									<div className="relative h-48 w-full overflow-hidden">
										<div className="absolute inset-0 flex items-center justify-center bg-gray-100">
											<IconComponent className="h-16 w-16 text-primary/40" />
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
											className="w-full whitespace-normal break-words bg-primary hover:bg-primary/90"
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

			<LazySection animation="none">
				<Section className="bg-gray-50">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<LazySection animation="slide-right">
							<h2 className="text-3xl font-bold mb-6">
								Why Choose Our Services
							</h2>
							<p className="text-gray-700 mb-6">
								We understand the unique challenges entrepreneurs face in
								today's digital landscape. Our services are designed with your
								specific needs in mind.
							</p>

							<div className="space-y-4">
								<div className="flex items-start">
									<div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
										<Check className="h-4 w-4 text-green-600" />
									</div>
									<span>
										Tailored solutions for your specific business needs
									</span>
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
								className="mt-8 whitespace-normal break-words bg-primary hover:bg-primary/90"
								asChild
							>
								<Link href="/contact">
									Schedule a Consultation
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
				</Section>
			</LazySection>

			<LazySection>
				<Section className="bg-primary text-white">
					<div className="text-center">
						<h2 className="text-3xl font-bold mb-6">
							Ready to Grow Your Business?
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto">
							Schedule a free consultation to discuss your business needs and
							how we can help you achieve your goals.
						</p>
						<Button
							size="lg"
							className="whitespace-normal break-words bg-white text-primary hover:bg-gray-100"
							asChild
						>
							<Link href="/contact">
								Get Started Today
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</Section>
			</LazySection>
		</>
	);
}
