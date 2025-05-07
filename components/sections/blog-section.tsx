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
import type { BlogPost } from "@/lib/data-utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogSectionProps {
	posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
	return (
		<Section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-transparent">
			{/* Decorative elements */}
			{/*<div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-50 rounded-full -translate-y-1/2 blur-3xl opacity-70"></div>
			{/*<div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full translate-y-1/2 blur-3xl"></div>*/}

			<div className="relative z-10">
				<div className="text-center mb-16">
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						Latest insights
					</Badge>
					<h2 className="section-title">From our blog</h2>
					<p className="section-subtitle">
						Expert advice, industry trends, and practical tips to help you grow
						your business.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-12 lg:gap-16">
					{posts.map((post, index) => (
						<motion.div
							key={post.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-gray-200 shadow-sm">
								<div className="relative h-48 w-full overflow-hidden">
									<Image
										src={post.image || "/placeholder.svg"}
										alt={post.title}
										width={600}
										height={400}
										className="object-cover transition-transform duration-300 hover:scale-105"
									/>
								</div>
								<CardHeader className="pt-6">
									<div className="flex items-center justify-between mb-2">
										<Badge variant="outline" className="text-xs font-normal">
											{post.category}
										</Badge>
										<span className="text-xs text-gray-500">{post.date}</span>
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
										className="p-0 h-auto text-primary group"
										asChild
									>
										<Link href={`/blog/${post.slug}`}>
											{`Read more: ${post.title}`}
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Link>
									</Button>
								</CardFooter>
							</Card>
						</motion.div>
					))}
				</div>

				<div className="flex justify-center mt-12">
					<Button
						size="lg"
						variant="outline"
						className="border-primary text-primary hover:bg-primary hover:text-white group"
						asChild
					>
						<Link href="/blog">
							View all articles
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</div>
			</div>
		</Section>
	);
}
