import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/layout/Section";

export interface CtaSectionProps {
	badgeText?: string;
	heading?: string;
	description?: string;
	primaryCtaText?: string;
	primaryCtaLink?: string;
	secondaryCtaText?: string;
	secondaryCtaLink?: string;
}

export default function CtaSection({
	badgeText = "Get started",
	heading = "Ready to grow your business?",
	description = "Let's discuss how we can help you achieve your business goals.",
	primaryCtaText = "Schedule a consultation",
	primaryCtaLink = "/contact",
	secondaryCtaText = "Learn more",
	secondaryCtaLink = "/services",
}: CtaSectionProps) {
	return (
		<Section
			id="cta-section"
			aria-labelledby="cta-section-heading"
			fullBleed
			className="bg-brand-dark text-white relative overflow-hidden"
		>
			{/* Decorative elements matching the dark theme */}
			<div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

			<div className="relative z-10 text-center">
				<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
					{badgeText}
				</Badge>
				<h2
					id="cta-section-heading"
					className="section-title text-white"
				>
					{heading}
				</h2>
				<p className="text-gray-300 max-w-xl mx-auto mb-8">
					{description}
				</p>

				<div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
					<Button
						size="lg"
						className="bg-white text-brand-dark hover:bg-gray-200 group w-full sm:w-auto whitespace-normal"
						asChild
					>
						<Link href={primaryCtaLink}>
							{primaryCtaText}
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="bg-transparent border-gray-400 text-gray-200 hover:bg-white/10 hover:text-white group w-full sm:w-auto whitespace-normal"
						asChild
					>
						<Link href={secondaryCtaLink}>
							{secondaryCtaText}
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</div>
			</div>
		</Section>
	);
}
