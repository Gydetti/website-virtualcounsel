import StructuredData from "@/components/seo/structured-data";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
	ctaText?: string;
	ctaLink?: string;
}

export default function HomepageFaqSection({
	badgeText = "Frequently Asked Questions",
	heading = "Have Questions? We have answers.",
	description,
	categories,
	ctaText = "Still have questions? Contact us",
	ctaLink = "/contact",
}: HomepageFaqSectionProps) {
	// Prepare JSON-LD items for structured-data
	const faqSchema = categories.flatMap(cat => cat.questions.map(q => ({ question: q.question, answer: q.answer })));

	return (
		<>
			<StructuredData type="faq" data={{ items: faqSchema }} />
			<section id="faq-homepage" className="section-padding bg-white">
				<div className="container-wide mx-auto text-center">
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						{badgeText}
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
					{description && <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">{description}</p>}
					{categories.map(cat => (
						<div key={cat.category} className="mb-12 text-left max-w-3xl mx-auto">
							<h3 className="text-2xl font-semibold mb-6">{cat.category}</h3>
							<Accordion type="single" collapsible className="space-y-4">
								{cat.questions.map((q) => (
									<AccordionItem key={q.question} value={`faq-${cat.category}-${q.question}`} className="border border-gray-200 rounded-lg overflow-hidden">
										<AccordionTrigger className="px-6 py-4 font-medium">{q.question}</AccordionTrigger>
										<AccordionContent className="px-6 py-4 text-gray-700">{q.answer}</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					))}
					<Button asChild className="mt-8 bg-primary hover:bg-primary/90">
						<Link href={ctaLink}>{ctaText}</Link>
					</Button>
				</div>
			</section>
		</>
	);
} 