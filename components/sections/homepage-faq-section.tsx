"use client";

import { Section } from "@/components/layout/Section";
import StructuredData from "@/components/seo/structured-data";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LazySection from "@/components/ui/lazy-section";
import type { ctaSchema } from "@/lib/schemas/common.schema";
import Link from "next/link";
import type { z } from "zod";

export interface FaqItem {
	question: string;
	answer: string;
}

export interface FaqCategory {
	category: string;
	questions: FaqItem[];
}

export interface HomepageFaqSectionProps {
	badgeText?: string;
	heading?: string;
	description?: string;
	categories: FaqCategory[];
	cta?: z.infer<typeof ctaSchema>;
}

export default function HomepageFaqSection({
	badgeText = "Frequently asked questions",
	heading = "Invite users to explore common questions",
	description,
	categories,
	cta = { text: "See all FAQs", href: "/contact" },
}: HomepageFaqSectionProps) {
	// Prepare JSON-LD items for structured-data
	const faqSchema = categories.flatMap((cat) =>
		cat.questions.map((q) => ({ question: q.question, answer: q.answer })),
	);

	return (
		<>
			<StructuredData type="faq" data={{ items: faqSchema }} />
			<Section id="faq-homepage">
				<LazySection animation="slide-up" delay={0} className="text-center">
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						{badgeText}
					</Badge>
					<h2 className="section-title mb-12">{heading}</h2>
					{description && (
						<p className="text-gray-700 mb-8 max-w-2xl mx-auto">
							{description}
						</p>
					)}
				</LazySection>
				{categories.map((cat) => (
					<LazySection
						key={cat.category}
						animation="slide-up"
						delay={0.1}
						className="mb-12 text-left max-w-3xl mx-auto"
					>
						<h3 className="text-body-base mb-6">{cat.category}</h3>
						<Accordion type="single" collapsible className="space-y-4">
							{cat.questions.map((q) => (
								<AccordionItem
									key={q.question}
									value={`faq-${cat.category}-${q.question}`}
									className="border border-gray-200 rounded-lg overflow-hidden"
								>
									<AccordionTrigger className="px-6 py-4 text-body-base font-medium">
										{q.question}
									</AccordionTrigger>
									<AccordionContent className="px-6 py-4 text-gray-700">
										{q.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</LazySection>
				))}
				<div className="flex justify-center mt-8">
					<Button size="lg" asChild>
						<Link href={cta.href || "/contact"}>
							{cta.text || "See all FAQs"}
						</Link>
					</Button>
				</div>
			</Section>
		</>
	);
}
