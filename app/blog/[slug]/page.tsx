import BlogSchema from "@/components/seo/blog-schema";
import StructuredData from "@/components/seo/structured-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data-utils";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config";
import {
	ArrowLeft,
	ArrowRight,
	Calendar,
	Clock,
	Share2,
	User,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
	params: { slug: string };
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const post = await getBlogPostBySlug(params.slug);
	if (!post) {
		return defaultMetadata({ title: "Post Not Found" });
	}
	return defaultMetadata({
		title: `${post.title} | ${siteConfig.site.name}`,
		description: post.excerpt,
		openGraph: {
			title: `${post.title} | ${siteConfig.site.name}`,
			description: post.excerpt,
			type: "article",
			publishedTime: post.date,
		},
	});
}

export async function generateStaticParams() {
	const posts = await getBlogPosts();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const post = await getBlogPostBySlug(params.slug);

	if (!post) {
		notFound();
	}

	// Disable this post if blogging is turned off
	if (!siteConfig.features.enableBlog) {
		notFound();
	}

	// Get related posts (excluding current post)
	const allPosts = await getBlogPosts();
	const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

	// Sample content for the blog post
	const content = `
    <p>In today's digital landscape, establishing a strong online presence is more important than ever for businesses of all sizes. Whether you're a solopreneur just starting out or an established small business looking to expand your reach, your online presence can make or break your success.</p>
    
    <h2>Why Online Presence Matters</h2>
    
    <p>Your online presence is often the first impression potential customers have of your business. In fact, studies show that over 70% of consumers research companies online before making a purchase decision. If your online presence is weak or non-existent, you're missing out on valuable opportunities to connect with potential customers.</p>
    
    <p>A strong online presence helps establish credibility, build trust, and showcase your expertise. It allows you to reach a wider audience, engage with customers, and ultimately drive more sales and growth for your business.</p>
    
    <h2>Key Components of a Strong Online Presence</h2>
    
    <ul>
      <li>A professional, mobile-friendly website that clearly communicates your value proposition</li>
      <li>Active social media profiles on platforms where your target audience spends time</li>
      <li>Consistent branding across all online channels</li>
      <li>Valuable content that addresses your audience's needs and questions</li>
      <li>Positive online reviews and testimonials</li>
    </ul>
    
    <p>Investing in these areas can significantly impact how potential customers perceive your business and whether they choose to engage with you.</p>
    
    <blockquote>The question isn't whether you need an online presence—it's whether your current online presence is working as hard as it could be for your business.</blockquote>
    
    <h2>Taking the Next Step</h2>
    
    <p>If you're looking to improve your online presence, start by assessing your current digital footprint. What comes up when you search for your business online? How does your website compare to competitors? Are you actively engaging with your audience on social media?</p>
    
    <p>Once you've identified areas for improvement, develop a strategic plan to enhance your online presence. This might involve redesigning your website, creating a content strategy, or implementing a social media management system.</p>
  `;

	const author = {
		name: "Sarah Johnson",
		title: "Digital Marketing Specialist",
		bio: "Sarah has over 8 years of experience helping businesses grow their online presence. She specializes in content strategy, SEO, and social media marketing.",
		image: "/placeholder.svg?height=100&width=100",
	};

	const blogSchemaData = {
		title: post.title,
		description: post.excerpt,
		datePublished: post.date,
		authorName: author.name,
		imageUrl: post.image || "/placeholder.svg",
		url: `${siteConfig.site.url}/blog/${post.slug}`,
	};

	return (
		<>
			<BlogSchema {...blogSchemaData} />
			<StructuredData type="article" data={blogSchemaData} />
			<section className="bg-gradient-to-r from-blue-50 to-white py-16">
				<div className="container-wide">
					<div className="max-w-4xl mx-auto">
						<Link
							href="/blog"
							className="inline-flex items-center text-primary mb-6 hover:underline"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to all articles
						</Link>

						<Badge className="mb-4">{post.category}</Badge>
						<h1>{post.title}</h1>

						<div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
							<div className="flex items-center">
								<User className="h-4 w-4 mr-2" />
								<span>{author.name}</span>
							</div>
							<div className="flex items-center">
								<Calendar className="h-4 w-4 mr-2" />
								<span>{post.date}</span>
							</div>
							<div className="flex items-center">
								<Clock className="h-4 w-4 mr-2" />
								<span>5 min read</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-12">
				<div className="container-wide">
					<div className="grid lg:grid-cols-4 gap-12">
						<div className="lg:col-span-3">
							<div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
								<Image
									src={post.image || "/placeholder.svg"}
									alt={post.title}
									fill
									className="object-cover"
								/>
							</div>

							<article className="prose prose-lg max-w-none">
								{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
								<div dangerouslySetInnerHTML={{ __html: content }} />
							</article>

							<div className="flex items-center justify-between mt-12 pt-8 border-t">
								<div className="flex items-center">
									<span className="mr-4">Share this article:</span>
									<div className="flex space-x-2">
										<Button
											size="icon"
											variant="ghost"
											aria-label="Share on Twitter"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												aria-hidden="true"
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
												<title>Twitter</title>
												<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
											</svg>
										</Button>
										<Button
											size="icon"
											variant="ghost"
											aria-label="Share on Facebook"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												aria-hidden="true"
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
												<title>Facebook</title>
												<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
											</svg>
										</Button>
										<Button
											size="icon"
											variant="ghost"
											aria-label="Share on LinkedIn"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												aria-hidden="true"
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
												<title>LinkedIn</title>
												<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
												<rect x="2" y="9" width="4" height="12" />
												<circle cx="4" cy="4" r="2" />
											</svg>
										</Button>
										<Button size="icon" variant="ghost" aria-label="Copy link">
											<Share2 className="h-5 w-5" />
										</Button>
									</div>
								</div>
							</div>
						</div>

						<div className="lg:col-span-1">
							<Card>
								<CardContent className="p-6">
									<h3 className="mb-4">About the Author</h3>
									<div className="flex items-center mb-4">
										<div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
											<Image
												src={author.image || "/placeholder.svg"}
												alt={author.name}
												fill
												className="object-cover"
											/>
										</div>
										<div>
											<h4>{author.name}</h4>
											<p className="text-sm text-gray-600">{author.title}</p>
										</div>
									</div>
									<p className="text-gray-600 text-sm">{author.bio}</p>
								</CardContent>
							</Card>

							<div className="mt-8">
								<h3 className="mb-4">Categories</h3>
								<div className="flex flex-wrap gap-2">
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-primary hover:text-white"
									>
										Digital Marketing
									</Badge>
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-primary hover:text-white"
									>
										Web Design
									</Badge>
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-primary hover:text-white"
									>
										Business Growth
									</Badge>
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-primary hover:text-white"
									>
										SEO
									</Badge>
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-primary hover:text-white"
									>
										Social Media
									</Badge>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 bg-gray-50">
				<div className="container-wide">
					<h2 className="text-3xl font-bold mb-12">Related Articles</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{relatedPosts.map((relatedPost) => (
							<Card
								key={relatedPost.id}
								className="overflow-hidden transition-all duration-300 hover:shadow-xl"
							>
								<div className="relative h-48 w-full overflow-hidden">
									<Image
										src={relatedPost.image || "/placeholder.svg"}
										alt={relatedPost.title}
										fill
										className="object-cover transition-transform duration-300 hover:scale-105"
									/>
								</div>
								<CardContent className="p-6">
									<h3 className="mb-2 hover:text-primary transition-colors">
										<Link href={`/blog/${relatedPost.slug}`}>
											{relatedPost.title}
										</Link>
									</h3>
									<p className="text-gray-600 mb-4">{relatedPost.excerpt}</p>
									<Button
										variant="link"
										className="p-0 h-auto text-primary"
										asChild
									>
										<Link href={`/blog/${relatedPost.slug}`}>
											Read More
											<ArrowRight className="ml-2 h-4 w-4" />
										</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
