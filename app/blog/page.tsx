import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import OptimizedImage from '@/components/ui/optimized-image';
import { getBlogPosts } from '@/lib/data-utils';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/siteConfig';

// Disable this page if blog feature is off or page not enabled
if (
  !siteConfig.features.enableBlog ||
  (siteConfig.enabledPages && !siteConfig.enabledPages.includes('/blog'))
) {
  notFound();
}

export const metadata = defaultMetadata({
  title: `${siteConfig.site.name} | Blog`,
  description: 'Read our latest articles and insights on business growth, marketing, and more.',
});

export default async function BlogPage() {
  const allPosts = await getBlogPosts();

  // Extract featured post
  const featuredPost = allPosts.find(post => post.featured);
  const regularPosts = allPosts.filter(post => !post.featured);

  return (
    <>
      <Section bgClass={siteConfig.sectionStyles?.heroGradient ?? ''} className="relative z-10">
        <LazySection>
          <div className="text-center mb-16">
            <Badge className="mb-4">Short label introducing blog section</Badge>
            <h1 className="">Blog page heading</h1>
            <p className="text-neutral-text max-w-3xl mx-auto">
              Brief description explaining content focus and reader benefits.
            </p>
          </div>

          {featuredPost && (
            <LazySection delay={0}>
              <div className="mb-16">
                <Link href={`/blog/${featuredPost.slug}`} className="block group">
                  <Card className="overflow-hidden border-none shadow-xl transition-shadow hover:shadow-xl">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative h-64 md:h-full overflow-hidden">
                        <OptimizedImage
                          src={
                            featuredPost.coverImage?.src || '/images/placeholders/placeholder.svg'
                          }
                          alt={featuredPost.coverImage?.alt || featuredPost.title}
                          fill
                          className="absolute inset-0 object-cover"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
                        <CardTitle className="text-2xl md:text-3xl font-bold break-words mb-4">
                          {featuredPost.title}
                        </CardTitle>
                        <CardDescription className="text-neutral-text/600 mb-6 text-lg break-words">
                          {featuredPost.excerpt}
                        </CardDescription>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-sm text-neutral-text/500">
                            {new Date(featuredPost.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                          <div className="text-primary flex items-center space-x-2">
                            <span>{`Read featured article: ${featuredPost.title}`}</span>
                            <ArrowRight className="ml-2 size-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            </LazySection>
          )}
        </LazySection>
      </Section>

      <LazySection>
        <Section className="bg-neutral-background">
          <h2 className="text-3xl font-bold mb-12">Section heading for regular posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <LazySection key={post.id} delay={index * 0.1} className="h-full">
                <Link href={`/blog/${post.slug}`} className="block h-full group">
                  <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <div className="relative h-48 w-full overflow-hidden">
                      <OptimizedImage
                        src={post.coverImage?.src || '/images/placeholders/placeholder.svg'}
                        alt={post.coverImage?.alt || post.title}
                        fill
                        className="absolute inset-0 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs font-normal">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-neutral-text/500">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-bold break-words hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-neutral-text/600 break-words">
                        {post.excerpt}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="mt-auto pt-0">
                      <div className="mt-auto pt-0 whitespace-normal break-words text-primary flex items-center space-x-2">
                        <span>{`Read more: ${post.title}`}</span>
                        <ArrowRight className="ml-2 size-4" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </LazySection>
            ))}
          </div>
        </Section>
      </LazySection>
    </>
  );
}
