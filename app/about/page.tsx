import { Section } from "@/components/layout/Section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LazySection from "@/components/ui/lazy-section";
import { testimonialsSectionData } from "@/lib/data/homepage";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = defaultMetadata({
	title: `${siteConfig.site.name} | About`,
	description: "Learn more about our company, our mission, and our team.",
});

// Disable this page if not enabled in config
if (siteConfig.enabledPages && !siteConfig.enabledPages.includes("/about")) {
	notFound();
}

export default function AboutPage() {
	const values = [
		{
			title: "Short core 1 value label",
			description: "Brief sentence explaining why this value matters",
		},
		{
			title: "Short core 2 value label",
			description: "Brief sentence explaining why this value matters",
		},
		{
			title: "Short core 3 value label",
			description: "Brief sentence explaining why this value matters",
		},
		{
			title: "Short core 4 value label",
			description:
				"Brief sentence explaining why this value matters (e.g. 'We work together to achieve success')",
		},
	];

	return (
		<>
			{/* About Hero */}
			<section className="relative overflow-hidden bg-gradient-to-r from-blue-100 to-transparent">
				{/* Background patterns */}
				{/* <div className="absolute inset-0 bg-grid-pattern opacity-10" /> */}
				{/* <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl" /> */}

				<Section className="relative z-10">
					<div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
						<LazySection className="relative z-10">
							<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
								Short label for hero section (e.g., 'About us')
							</Badge>
							<h1
								id="about-page-heading"
								className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance break-words whitespace-normal max-w-full mb-6"
							>
								A nice line about the person / company
							</h1>
							<p className="text-gray-700 mb-6">
								First paragraph placeholder summarizing company mission and
								purpose.
							</p>
							<p className="text-gray-700">
								Second paragraph placeholder elaborating unique story or
								differentiators.
							</p>
						</LazySection>

						<LazySection className="relative z-10">
							<Image
								src="/placeholder.svg"
								alt="About placeholder"
								width={600}
								height={500}
								className="rounded-xl shadow-2xl"
							/>
						</LazySection>
					</div>
				</Section>
			</section>

			<LazySection>
				<section className="py-16 bg-white">
					<div className="container-wide">
						<div className="text-center mb-16">
							<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
								Short label introducing company story section
							</Badge>
							<h2 className="text-3xl font-bold mb-6">
								Section heading for company story and journey
							</h2>
							<p className="text-gray-700 max-w-3xl mx-auto">
								Paragraph placeholder outlining company history milestones
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							{/* Milestones with staggered entry and depth */}
							<LazySection delay={0} className="h-full">
								<Card className="p-6 w-full h-full whitespace-normal shadow-lg hover:shadow-xl transition-shadow duration-300">
									<h3 className="mb-4">Short milestone title</h3>
									<p className="text-gray-600 mb-2">Date of milestone</p>
									<p>Brief summary of milestone importance</p>
								</Card>
							</LazySection>
							<LazySection delay={0.1} className="h-full">
								<Card className="p-6 w-full h-full whitespace-normal shadow-lg hover:shadow-xl transition-shadow duration-300">
									<h3 className="mb-4">Short milestone title</h3>
									<p className="text-gray-600 mb-2">Date of milestone</p>
									<p>Brief summary of milestone importance</p>
								</Card>
							</LazySection>
							<LazySection delay={0.2} className="h-full">
								<Card className="p-6 w-full h-full whitespace-normal shadow-lg hover:shadow-xl transition-shadow duration-300">
									<h3 className="mb-4">Short milestone title</h3>
									<p className="text-gray-600 mb-2">Date of milestone</p>
									<p>Brief summary of milestone importance</p>
								</Card>
							</LazySection>
						</div>
					</div>
				</section>
			</LazySection>

			<LazySection>
				<section className="py-16 bg-gray-50">
					<div className="container-wide">
						<div className="text-center mb-16">
							<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
								Short label introducing values section
							</Badge>
							<h2 className="text-3xl font-bold mb-6">
								Section heading for company values and principles
							</h2>
							<p className="text-gray-700 max-w-3xl mx-auto">
								Paragraph placeholder explaining significance of core values
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-8">
							{/* Values with animation and depth */}
							{values.map((value, index) => (
								<LazySection
									key={value.title}
									delay={index * 0.1}
									className="h-full"
								>
									<Card className="p-6 w-full h-full whitespace-normal shadow-lg hover:shadow-xl transition-shadow duration-300">
										<h3 className="text-xl font-bold mb-4">{value.title}</h3>
										<p className="text-gray-600">{value.description}</p>
									</Card>
								</LazySection>
							))}
						</div>
					</div>
				</section>
			</LazySection>

			{/* Testimonials Section */}
			<LazySection>
				<TestimonialsSection {...testimonialsSectionData} />
			</LazySection>

			{/* Final CTA Section */}
			<LazySection>
				<section className="py-16 bg-primary text-white">
					<div className="container-wide text-center">
						<h2 className="text-3xl font-bold mb-6">
							Final CTA section heading encouraging action
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto">
							Persuasive text reinforcing the next step for users
						</p>
						<Button
							size="lg"
							className="bg-white text-primary hover:bg-gray-100"
							asChild
						>
							<Link href="/contact">
								Get started today
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</section>
			</LazySection>
		</>
	);
}
