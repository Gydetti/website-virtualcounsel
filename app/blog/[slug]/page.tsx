import { ArrowLeft, ArrowRight, Share2, User } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';

import { Section } from '@/components/layout/Section';
import BlogSchema from '@/components/seo/blog-schema';
import StructuredData from '@/components/seo/structured-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import OptimizedImage from '@/components/ui/optimized-image';
import { blogPageData } from '@/lib/data/staticContent';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/data-utils';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';
import { calculateReadingTime, parseMarkdownParts } from '@/lib/utils/text-formatting';

import BlogPostSocialShare from './BlogPostSocialShare';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return defaultMetadata({ title: 'Post Not Found' });
  }
  return defaultMetadata({
    title: `${post.title} | ${siteConfig.site.name}`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${siteConfig.site.name}`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  });
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const { slug } = await props.params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Disable this post if blogging is turned off
  if (!siteConfig.features.enableBlog) {
    notFound();
  }

  // Get related posts (excluding current post)
  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);

  // Check if transparent header is enabled and apply proper padding
  const isTransparentHeader = true; // Blog pages always use transparent header
  const heroTopPadding = 'pt-20 md:pt-24 lg:pt-28';

  const author = {
    name: 'Maarten van Beek',
    title: 'Oprichter VirtualCounsel, ICT-jurist',
    bio: 'Specialist in ICT-recht, helpt softwarebedrijven en IT-dienstverleners met praktisch juridisch advies. Focus op contracten, privacy (AVG), en intellectueel eigendom.',
    image: '/images/team/maarten-klein-profile.webp',
  };

  const blogSchemaData = {
    title: post.title,
    description: post.excerpt,
    datePublished: post.date,
    authorName: author.name,
    imageUrl: post.coverImage?.src || '/placeholder.svg',
    url: `${siteConfig.site.url}/blog/${post.slug}`,
  };

  const currentUrl = `${siteConfig.site.url}/blog/${post.slug}`;

  return (
    <>
      <BlogSchema {...blogSchemaData} />
      <StructuredData type="article" data={blogSchemaData} />

      {/* Blog Header Section */}
      <Section
        bgClass={siteConfig.sectionStyles?.heroGradient ?? ''}
        className={cn('relative z-10', heroTopPadding)}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header with CSS-only stagger animation */}
          <LazySection
            animation="none"
            className="stagger-container"
            style={{ '--stagger-delay': '0.1s' } as CSSProperties}
          >
            {/* Back link and category badge grouped to prevent overlap on small screens */}
            <div
              className="flex flex-wrap items-center gap-3 mb-6"
              style={{ '--index': 0 } as CSSProperties}
            >
              <Link href="/blog" className="inline-flex items-center text-primary hover:underline">
                <ArrowLeft className="mr-2 size-4" />
                Terug naar blogoverzicht
              </Link>
              <Badge>{post.category}</Badge>
            </div>

            <h1 className="" style={{ '--index': 1 } as CSSProperties}>
              {post.title}
            </h1>

            <div
              className="flex flex-wrap items-center gap-4 text-neutral-text/600 mb-8"
              style={{ '--index': 2 } as CSSProperties}
            >
              <div className="flex items-center">
                <User className="size-4 mr-2" />
                <span>{author.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-neutral-text/500">
                  {calculateReadingTime(post.content || '')}
                </span>
              </div>
            </div>
          </LazySection>
        </div>
      </Section>

      {/* Main Content Section */}
      <Section>
        <div className="grid lg:grid-cols-4 gap-8 md:gap-12">
          <div className="lg:col-span-3">
            {/* Hero Image */}
            <LazySection
              animation="fade"
              delay={0.3}
              fullHeight={false}
              className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden"
            >
              <Image
                src={post.coverImage?.src || '/placeholder.svg'}
                alt={post.coverImage?.alt || post.title}
                fill
                priority
                className="object-cover"
              />
            </LazySection>

            {/* Article Content */}
            <LazySection animation="fade-up" delay={0.4}>
              <article className="prose prose-lg space-y-6">
                {post.content && (
                  <div className="space-y-6">
                    {post.content.split('\n\n').map((paragraph, index) => {
                      if (paragraph.trim() === '') return null;

                      // Use paragraph content for stable keys
                      const key = `paragraph-${index}-${paragraph.slice(0, 20).replace(/\s+/g, '-')}`;

                      // Handle headings
                      if (paragraph.startsWith('# ')) {
                        return (
                          <h1 key={key} className="text-3xl font-bold mt-8 mb-4">
                            {paragraph.replace('# ', '')}
                          </h1>
                        );
                      }
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={key} className="text-2xl font-bold mt-6 mb-3">
                            {paragraph.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={key} className="text-xl font-semibold mt-4 mb-2">
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      }

                      // Handle blockquotes
                      if (paragraph.startsWith('> ')) {
                        return (
                          <blockquote
                            key={key}
                            className="border-l-4 border-primary pl-4 italic text-neutral-text"
                          >
                            {paragraph.replace('> ', '')}
                          </blockquote>
                        );
                      }

                      // Handle regular paragraphs with markdown
                      const parts = parseMarkdownParts(paragraph);
                      return (
                        <p key={key} className="text-lg leading-relaxed text-foreground/80">
                          {parts.map((part, partIndex) =>
                            part.isBold ? (
                              <strong
                                key={`${key}-part-${partIndex}-${part.text.slice(0, 10)}`}
                                className="font-semibold text-primary-dark"
                              >
                                {part.text}
                              </strong>
                            ) : (
                              part.text
                            )
                          )}
                        </p>
                      );
                    })}
                  </div>
                )}
              </article>
            </LazySection>

            {/* Social Share Section */}
            <LazySection animation="fade-up" delay={0.5}>
              <BlogPostSocialShare title={post.title} url={currentUrl} />
            </LazySection>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Card */}
            <LazySection animation="slide-left" delay={0.4}>
              <Card className="bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center">
                    {/* Author Image - Clean and professional */}
                    <div className="relative mx-auto mb-6">
                      <div className="relative size-24 rounded-full overflow-hidden mx-auto ring-4 ring-primary/10 shadow-xl">
                        <Image
                          src={author.image || '/images/team/maarten-klein-profile.webp'}
                          alt={author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">Over de auteur</h3>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <h4 className="text-lg font-semibold text-primary">{author.name}</h4>
                        <div className="size-5 bg-primary rounded-full flex items-center justify-center shadow-sm">
                          <svg
                            className="size-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-label="Verified expert"
                          >
                            <title>Geverifieerde expert</title>
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-neutral-text bg-primary/5 px-3 py-1 rounded-full inline-block">
                        {author.title}
                      </p>
                    </div>

                    {/* Bio */}
                    <div className="space-y-4">
                      <p className="text-neutral-text leading-relaxed text-left">{author.bio}</p>

                      {/* Contact CTA */}
                      <div className="pt-4 border-t border-gray-100">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-primary/5 border-primary/20 hover:bg-primary hover:text-white transition-all duration-300"
                          asChild
                        >
                          <Link href="/contact">
                            <User className="mr-2 size-4" />
                            Neem contact op
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>

            {/* Categories */}
            <LazySection animation="slide-left" delay={0.5}>
              <div className="mt-8">
                <h3 className="mb-4">Categorieën</h3>
                <div className="flex flex-wrap gap-2">
                  {/* Generate dynamic categories from all blog posts */}
                  {Array.from(new Set(allPosts.map(p => p.category))).map(category => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </LazySection>
          </div>
        </div>
      </Section>

      {/* Related Articles Section */}
      <Section className="bg-neutral-background">
        <LazySection animation="fade-up" delay={0.1}>
          <h2 className="text-3xl font-bold mb-12">Gerelateerde artikelen</h2>
        </LazySection>

        <LazySection
          animation="none"
          className="stagger-container grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ '--stagger-delay': '0.15s' } as CSSProperties}
        >
          {relatedPosts.map((relatedPost, index) => (
            <Card
              key={relatedPost.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-xl"
              style={{ '--index': index } as CSSProperties}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={relatedPost.coverImage?.src || '/placeholder.svg'}
                  alt={relatedPost.coverImage?.alt || relatedPost.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 hover:text-primary transition-colors">
                  <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                </h3>
                <p className="text-neutral-text/600 mb-4">{relatedPost.excerpt}</p>
                <Button variant="link" className="p-0 h-auto text-primary" asChild>
                  <Link href={`/blog/${relatedPost.slug}`}>
                    {blogPageData.readMoreText || 'Lees meer'}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </LazySection>
      </Section>
    </>
  );
}
