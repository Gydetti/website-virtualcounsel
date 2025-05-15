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
import LazySection from "@/components/ui/lazy-section";
import type { blogSectionDataSchema } from "@/lib/schemas/sections.schema";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { z } from "zod";

// Updated props type alias using Zod schema
export type BlogSectionProps = z.infer<typeof blogSectionDataSchema>;

export default function BlogSection({
	badgeText,
	heading,
	subtitle,
	posts,
	viewAllCta,
}: BlogSectionProps) {
	if (!posts || posts.length === 0) {
		// Schema enforces min(1) for posts
		return null;
	}
	return (
		<Section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-transparent">
			{/* Decorative elements - re-enabled and styled with theme colors */}
			<div className="hidden sm:block absolute top-0 left-1/4 w-72 h-72 bg-[rgba(var(--secondary-rgb),0.02)] rounded-full -translate-y-1/2 blur-3xl pointer-events-none opacity-70" />
			<div className="hidden sm:block absolute bottom-0 right-1/4 w-72 h-72 bg-[rgba(var(--primary-rgb),0.02)] rounded-full translate-y-1/2 blur-3xl pointer-events-none" />

			<div className="relative z-10">
				<div className="text-center mb-16">
					{badgeText && (
						<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
							{badgeText}
						</Badge>
					)}
					{heading && (
						<h2 className="text-[var(--font-subheading-size)]">{heading}</h2>
					)}
					{subtitle && <p className="section-subtitle">{subtitle}</p>}
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-12 lg:gap-16 card-equal-height">
					{posts.map((post, index) => (
						<LazySection
							key={post.id}
							animation="fade"
							delay={index * 0.1}
							className="h-full"
						>
							<Card className="w-full h-full flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-b from-white to-blue-50/30 border border-[#e5e7eb80] shadow-lg">
								<div className="relative h-48 w-full overflow-hidden">
									<Image
										src={post.image?.src || "/placeholder.svg"}
										alt={post.image?.alt || post.title}
										width={post.image?.width || 600}
										height={post.image?.height || 400}
										className="object-cover transition-transform duration-300 hover:scale-105"
									/>
								</div>
								<CardHeader className="pt-6">
									<div className="flex items-center justify-between mb-2">
										<Badge variant="outline" className="text-xs font-normal">
											{post.category}
										</Badge>
										<span className="text-xs text-gray-500">
											{new Date(post.date).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</span>
									</div>
									<CardTitle className="text-xl font-bold hover:text-primary transition-colors">
										<Link href={`/blog/${post.slug}`}>{post.title}</Link>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-gray-600">
										{post.excerpt}
									</CardDescription>
								</CardContent>
								<CardFooter className="pt-0">
									<Button
										variant="link"
										className="group w-full whitespace-normal break-words shadow-none hover:shadow-none hover:scale-100"
										asChild
									>
										<Link
											href={`/blog/${post.slug}`}
											className="transition-none"
										>
											{`Read more: ${post.title}`}
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Link>
									</Button>
								</CardFooter>
							</Card>
						</LazySection>
					))}
				</div>

				{viewAllCta?.href && viewAllCta?.text && (
					<div className="flex justify-center mt-12">
						<Button
							size="lg"
							variant="outline"
							className="border-primary text-primary hover:bg-primary hover:text-white group"
							asChild
						>
							<Link href={viewAllCta.href}>
								{viewAllCta.text}
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
					</div>
				)}
			</div>
		</Section>
	);
}
