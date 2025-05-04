"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export interface FeaturesSectionProps {
	badgeText?: string;
	heading?: string;
	description?: string;
	withoutTitle?: string;
	withoutItems?: string[];
	withTitle?: string;
	withItems?: string[];
	ctaText?: string;
	ctaLink?: string;
}

export default function FeaturesSection({
	badgeText = "Why choose us",
	heading = "Transform your business",
	description = "See the difference our services can make for your business growth and online presence.",
	withoutTitle = "Without our services",
	withoutItems = [
		"Struggling to attract qualified leads online",
		"Wasting time on ineffective marketing strategies",
		"Losing business to more visible competitors",
		"Inconsistent results and unpredictable growth",
		"Feeling overwhelmed by constant digital changes",
	],
	withTitle = "With our services",
	withItems = [
		"Steady flow of qualified leads from your digital presence",
		"Strategic approach that maximizes your time and budget",
		"Stand out from competitors with a distinctive brand",
		"Consistent, measurable growth you can track",
		"Expert guidance keeping you ahead of industry trends",
	],
	ctaText = "Explore our services",
	ctaLink = "/services",
}: FeaturesSectionProps) {
	return (
		<section
			id="features-section"
			aria-labelledby="features-section-heading"
			className="section-padding text-gray-800 relative overflow-hidden"
		>
			{/* Ensure decorative elements overlap edges */}
			{/* <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/4 translate-x-1/4 blur-3xl z-0" /> */}

			<div className="container-wide relative z-10">
				<div className="max-w-3xl mx-auto text-center mb-12">
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						{badgeText}
					</Badge>
					<h2
						id="features-section-heading"
						className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
					>
						{heading}
					</h2>
					<p className="text-lg text-gray-700">{description}</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 mb-16">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="rounded-lg border border-red-200 bg-red-50/50 backdrop-blur p-6 hover:bg-red-100/50 transition-colors text-gray-800"
					>
						<h3 className="text-xl font-bold text-red-400 mb-4">
							{withoutTitle}
						</h3>
						<ul className="space-y-3">
							{withoutItems.map((item) => (
								<li key={item} className="flex items-start">
									<XCircle className="text-red-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
									<span className="text-gray-700">{item}</span>
								</li>
							))}
						</ul>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="rounded-lg border border-green-200 bg-green-50/50 backdrop-blur p-6 hover:bg-green-100/50 transition-colors text-gray-800"
					>
						<h3 className="text-xl font-bold text-green-400 mb-4">
							{withTitle}
						</h3>
						<ul className="space-y-3">
							{withItems.map((item) => (
								<li key={item} className="flex items-start">
									<CheckCircle className="text-green-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
									<span className="text-gray-700">{item}</span>
								</li>
							))}
						</ul>
					</motion.div>
				</div>

				<div className="text-center">
					<Button
						size="lg"
						className="bg-primary text-white hover:bg-primary/90 group"
						asChild
					>
						<Link href={ctaLink}>
							{ctaText}
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
