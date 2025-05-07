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
import { getBlogPosts } from "@/lib/data-utils";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Disable this page if blog feature is off or page not enabled
if (
	!siteConfig.features.enableBlog ||
	(siteConfig.enabledPages && !siteConfig.enabledPages.includes("/blog"))
) {
	notFound();
}

export const metadata = defaultMetadata({
	title: `${siteConfig.site.name} | Blog`,
	description:
		"Read our latest articles and insights on business growth, marketing, and more.",
});

export default async function BlogPage() {
	const allPosts = await getBlogPosts();

	// Extract featured post
	const featuredPost = allPosts.find((post) => post.featured);
	const regularPosts = allPosts.filter((post) => !post.featured);

	return (
		<>
			<LazySection>
				<Section className="bg-gradient-to-r from-blue-50 to-white">
					<div className="text-center mb-16">
						<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
							Our Blog
						</Badge>
						<h1>Latest Insights & Articles</h1>
						<p className="text-gray-700 max-w-3xl mx-auto">
							Expert advice, industry trends, and practical tips to help you
							grow your business.
						</p>
					</div>

					{featuredPost && (
						<LazySection delay={0}>
							<div className="mb-16">
								<Card className="overflow-hidden border-none shadow-xl">
									<div className="grid md:grid-cols-2 gap-6">
										<div className="relative h-64 md:h-full">
											<Image
												src={featuredPost.image || "/placeholder.svg"}
												alt={featuredPost.title}
												fill
												className="object-cover"
											/>
										</div>
										<div className="p-6 md:p-8 flex flex-col justify-center">
											<Badge className="w-fit mb-4">
												{featuredPost.category}
											</Badge>
											<CardTitle className="text-2xl md:text-3xl font-bold break-words mb-4">
												<Link
													href={`/blog/${featuredPost.slug}`}
													className="hover:text-primary transition-colors"
												>
													{featuredPost.title}
												</Link>
											</CardTitle>
											<CardDescription className="text-gray-600 mb-6 text-lg break-words">
												{featuredPost.excerpt}
											</CardDescription>
											<div className="flex items-center justify-between mt-auto">
												<span className="text-sm text-gray-500">
													{featuredPost.date}
												</span>
												<Button
													variant="link"
													className="p-0 h-auto text-primary"
													asChild
												>
													<Link href={`/blog/${featuredPost.slug}`}>
														{`Read featured article: ${featuredPost.title}`}
														<ArrowRight className="ml-2 h-4 w-4" />
													</Link>
												</Button>
											</div>
										</div>
									</div>
								</Card>
							</div>
						</LazySection>
					)}
				</Section>
			</LazySection>

			<LazySection>
				<Section className="bg-gray-50">
					<h2 className="text-3xl font-bold mb-12">Latest Articles</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{regularPosts.map((post, index) => (
							<LazySection key={post.id} delay={index * 0.1}>
								<Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
									<div className="relative h-48 w-full overflow-hidden">
										<Image
											src={post.image || "/placeholder.svg"}
											alt={post.title}
											fill
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
										<CardTitle className="text-xl font-bold break-words hover:text-primary transition-colors">
											<Link href={`/blog/${post.slug}`}>{post.title}</Link>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<CardDescription className="text-gray-600 break-words">
											{post.excerpt}
										</CardDescription>
									</CardContent>
									<CardFooter className="mt-auto pt-0">
										<Button
											variant="link"
											className="p-0 h-auto whitespace-normal break-words text-primary"
											asChild
										>
											<Link href={`/blog/${post.slug}`}>
												{`Read more: ${post.title}`}
												<ArrowRight className="ml-2 h-4 w-4" />
											</Link>
										</Button>
									</CardFooter>
								</Card>
							</LazySection>
						))}
					</div>
				</Section>
			</LazySection>
		</>
	);
}
