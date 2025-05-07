"use client";

import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Service } from "@/lib/data-utils";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Globe, Zap } from "lucide-react";
import Link from "next/link";

// Map of icon names to components
const iconMap: Record<string, React.ReactNode> = {
	Globe: <Globe className="h-10 w-10 text-primary" />,
	BarChart2: <BarChart2 className="h-10 w-10 text-primary" />,
	Zap: <Zap className="h-10 w-10 text-primary" />,
};

export interface ServicesSectionProps {
	badgeText?: string;
	heading?: string;
	description?: string;
	services: Service[];
	viewAllText?: string;
	viewAllLink?: string;
}

export default function ServicesSection({
	badgeText = "Our services",
	heading = "How we can help you grow",
	description = "We offer specialized services designed to help entrepreneurs and small businesses thrive in the digital landscape.",
	services,
	viewAllText = "View all services",
	viewAllLink = "/services",
}: ServicesSectionProps) {
	return (
		<Section
			id="services-section"
			aria-labelledby="services-section-heading"
			className="relative overflow-hidden"
		>
			{/* Decorative elements */}
			{/* <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
			<div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/20 rounded-full translate-y-1/2 -translate-x-1/2" /> */}

			<div className="relative z-10">
				<div className="text-center mb-16">
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						{badgeText}
					</Badge>
					<h2 id="services-section-heading" className="section-title">
						{heading}
					</h2>
					<p className="section-subtitle">{description}</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service, idx) => (
						<motion.div
							key={service.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: idx * 0.1 }}
							viewport={{ once: true }}
							className="h-full"
						>
							<Card
								className={`card-equal-height h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
									service.popular
										? "border-primary shadow-lg relative"
										: "border-gray-200 shadow-sm"
								}`}
							>
								{service.popular && (
									<div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
										Popular
									</div>
								)}

								<CardHeader className="pt-12">
									<div className="mb-6 bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center">
										{iconMap[service.icon] || (
											<Globe className="h-10 w-10 text-primary" />
										)}
									</div>
									<CardTitle className="text-xl font-bold">
										{service.title}
									</CardTitle>
									<CardDescription className="text-gray-600">
										{service.description}
									</CardDescription>
								</CardHeader>

								<CardContent className="card-content">
									<ul className="space-y-3">
										{service.features.map((feature) => (
											<li key={feature} className="flex items-start">
												<span className="text-green-500 mr-3 flex-shrink-0 mt-0.5">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="h-5 w-5"
													>
														<title>Check mark icon</title>
														<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
														<polyline points="22 4 12 14.01 9 11.01" />
													</svg>
												</span>
												<span>{feature}</span>
											</li>
										))}
									</ul>
								</CardContent>

								<CardFooter className="card-footer pt-6">
									<Button
										variant={service.popular ? "default" : "outline"}
										className={`group w-full whitespace-normal break-words ${
											service.popular
												? "hover:bg-primary/90"
												: "bg-white border border-primary text-primary hover:bg-primary hover:text-white"
										}`}
										asChild
									>
										<Link href={`/services/${service.slug}`}>
											{`Learn more about ${service.title}`}
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Link>
									</Button>
								</CardFooter>
							</Card>
						</motion.div>
					))}
				</div>

				{/*<div className="text-center mt-12 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
					<Button
						size="lg"
						className="bg-primary hover:bg-primary/90 group w-full sm:w-auto whitespace-normal break-words"
						asChild
					>
						<Link href={viewAllLink}>
							{viewAllText}
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</div>*/}
			</div>
		</Section>
	);
}
