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
import type { ctaSchema } from "@/lib/schemas/common.schema";
import Link from "next/link";
import type { z } from "zod";
import LazySection from "@/components/ui/lazy-section";
import type { CSSProperties } from "react";

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
				<LazySection
					animation="none"
					className="stagger-container text-center"
					style={{ '--stagger-delay': '0.1s' } as CSSProperties}
				>
					<Badge className="mb-4" style={{ '--index': 0 } as React.CSSProperties}>
						{badgeText}
					</Badge>
					<h2 className="section-title mb-12" style={{ '--index': 1 } as React.CSSProperties}>
						{heading}
					</h2>
					{description && (
						<p
							className="text-gray-700 mb-8 max-w-2xl mx-auto"
							style={{ '--index': 2 } as React.CSSProperties}
						>
							{description}
						</p>
					)}
					{categories.map((cat, idx) => (
						<div
							key={cat.category}
							className="mb-12 text-left max-w-3xl mx-auto"
							style={{ '--index': 3 + idx } as React.CSSProperties}
						>
							<h3 className="text-body-base mb-6">{cat.category}</h3>
							<Accordion type="single" collapsible className="space-y-4">
								{cat.questions.map((q) => (
									<AccordionItem
										key={q.question}
										value={`faq-${cat.category}-${q.question}`}
										className="border border-gray-200 rounded-lg overflow-hidden"
									>
										<AccordionTrigger className="px-6 py-2 text-body-base font-medium">
											{q.question}
										</AccordionTrigger>
										<AccordionContent className="px-6 py-4 text-gray-700">
											{q.answer}
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					))}
					<div
						className="flex justify-center mt-8"
						style={{ '--index': 3 + categories.length } as React.CSSProperties}
					>
						<Button size="lg" asChild>
							<Link href={cta.href || "/contact"}>
								{cta.text || "See all FAQs"}
							</Link>
						</Button>
					</div>
				</LazySection>
			</Section>
		</>
	);
}
