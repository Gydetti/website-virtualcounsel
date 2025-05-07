import { Section } from "@/components/layout/Section";
import ProcessSection from "@/components/sections/process-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getServiceBySlug, getServices } from "@/lib/data-utils";
import { iconComponents } from "@/lib/icon-utils";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ServicePageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata(
	props: ServicePageProps,
): Promise<Metadata> {
	const { slug } = await props.params;
	const service = await getServiceBySlug(slug);
	if (!service) {
		return defaultMetadata({ title: "Service Not Found" });
	}
	return defaultMetadata({
		title: `${service.title} | ${siteConfig.site.name}`,
		description: service.description,
		openGraph: {
			title: `${service.title} | ${siteConfig.site.name}`,
			description: service.description,
		},
	});
}

export async function generateStaticParams() {
	const services = await getServices();

	return services.map((service) => ({
		slug: service.slug,
	}));
}

export default async function ServicePage(props: ServicePageProps) {
	const { slug } = await props.params;
	const service = await getServiceBySlug(slug);

	if (!service) {
		notFound();
	}

	// Disable this page if services feature is off or page not enabled
	if (
		!siteConfig.features.enableServices ||
		(siteConfig.enabledPages && !siteConfig.enabledPages.includes("/services"))
	) {
		notFound();
	}

	const IconComponent = iconComponents[service.icon] || iconComponents.Globe;

	// Additional service details
	const benefits = [
		{
			title: "Increased Efficiency",
			description:
				"Save time and resources with streamlined processes and automation.",
			icon: "✓",
		},
		{
			title: "Better Results",
			description: "Achieve measurable outcomes with data-driven strategies.",
			icon: "✓",
		},
		{
			title: "Expert Support",
			description:
				"Get guidance from specialists with years of industry experience.",
			icon: "✓",
		},
	];

	const process = [
		{
			title: "Discovery",
			description:
				"We start by understanding your business, goals, and challenges.",
		},
		{
			title: "Strategy",
			description:
				"We develop a customized plan tailored to your specific needs.",
		},
		{
			title: "Implementation",
			description:
				"Our team executes the strategy with precision and attention to detail.",
		},
		{
			title: "Optimization",
			description:
				"We continuously monitor and improve to ensure optimal results.",
		},
	];

	const faq = [
		{
			question: "How long does it take to see results?",
			answer:
				"While timelines vary based on your specific situation and goals, most clients begin seeing initial results within 30-60 days. We'll provide you with a more specific timeline during our consultation.",
		},
		{
			question: "Do you offer ongoing support?",
			answer:
				"Yes, we provide ongoing support and maintenance to ensure your continued success. We offer various support packages to meet your needs and budget.",
		},
		{
			question: "How do you measure success?",
			answer:
				"We establish clear KPIs at the beginning of our engagement and provide regular reports on progress. Our focus is always on delivering measurable results that impact your bottom line.",
		},
		{
			question: "What makes your approach different?",
			answer:
				"Our approach combines data-driven strategies with creative solutions, all tailored to your specific business needs. We focus on sustainable growth rather than quick fixes.",
		},
	];

	const testimonials = [
		{
			quote:
				"Working with this team transformed our business. Their expertise and dedication to our success made all the difference.",
			author: "Jane Smith",
			company: "Tech Solutions Inc.",
			image: "/placeholder.svg?height=100&width=100",
		},
		{
			quote:
				"The results exceeded our expectations. Their strategic approach and attention to detail delivered real business impact.",
			author: "John Davis",
			company: "Growth Ventures",
			image: "/placeholder.svg?height=100&width=100",
		},
	];

	return (
		<>
			<Section className="bg-gradient-to-r from-blue-50 to-white">
				<div className="max-w-4xl mx-auto text-center">
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						{service.title}
					</Badge>
				</div>
			</Section>

			<Section className="bg-white">
				<div className="grid md:grid-cols-2 gap-8 items-start">
					<div>
						<IconComponent className="h-20 w-20 text-primary mb-6" />
						<h1 className="text-3xl font-bold mb-4 break-words">
							{service.title}
						</h1>
						<p className="text-gray-700 mb-8">{service.description}</p>

						<div className="space-y-4 mb-8">
							{service.features.map((feature) => (
								<div key={feature} className="flex items-start">
									<div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
										<Check className="h-4 w-4 text-green-600" />
									</div>
									<span>{feature}</span>
								</div>
							))}
						</div>

						<Button
							size="lg"
							className="bg-primary hover:bg-primary/90"
							asChild
						>
							<Link href="/contact">
								Schedule a Consultation
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>

					<div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
						<div className="absolute inset-0 flex items-center justify-center bg-gray-100">
							<IconComponent className="h-32 w-32 text-primary/30" />
						</div>
					</div>
				</div>
			</Section>

			<section className="py-16 bg-white">
				<div className="container-wide">
					<h2 className="text-3xl font-bold mb-12 text-center">Key Benefits</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{benefits.map((benefit) => (
							<Card
								key={benefit.title}
								className="text-center p-6 hover:shadow-lg transition-shadow"
							>
								<div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
									<span className="text-2xl">{benefit.icon}</span>
								</div>
								<h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
								<p className="text-gray-600">{benefit.description}</p>
							</Card>
						))}
					</div>
				</div>
			</section>

			<ProcessSection />

			<section className="py-16 bg-white">
				<div className="container-wide">
					<h2 className="text-3xl font-bold mb-12 text-center">
						Frequently Asked Questions
					</h2>
					<div className="max-w-3xl mx-auto">
						<div className="space-y-6">
							{faq.map((item) => (
								<Card key={item.question} className="overflow-hidden">
									<CardContent className="p-6">
										<h3 className="text-xl font-bold mb-2">{item.question}</h3>
										<p className="text-gray-600">{item.answer}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 bg-gray-50">
				<div className="container-wide">
					<h2 className="text-3xl font-bold mb-12 text-center">
						What Our Clients Say
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						{testimonials.map((testimonial) => (
							<Card key={testimonial.author} className="p-6">
								<div className="flex items-start">
									<div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
										<Image
											src={testimonial.image || "/placeholder.svg"}
											alt={testimonial.author}
											fill
											className="object-cover"
										/>
									</div>
									<div>
										<p className="italic text-gray-600 mb-4">
											"{testimonial.quote}"
										</p>
										<div>
											<p className="font-bold">{testimonial.author}</p>
											<p className="text-sm text-gray-500">
												{testimonial.company}
											</p>
										</div>
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="py-16 bg-primary text-white">
				<div className="container-wide text-center">
					<h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Schedule a free consultation to discuss how we can help you achieve
						your business goals.
					</p>
					<Button
						size="lg"
						className="bg-white text-primary hover:bg-gray-100"
						asChild
					>
						<Link href="/contact">
							Schedule a Consultation
							<ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</div>
			</section>
		</>
	);
}
