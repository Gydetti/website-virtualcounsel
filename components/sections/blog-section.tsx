'use client';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import type { blogSectionDataSchema } from '@/lib/schemas/sections.schema';

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
    <Section className="relative overflow-hidden pattern-overlay pattern-overlay-fade">
      {/* Decorative elements - re-enabled and styled with theme colors */}
      <div className="hidden sm:block absolute top-0 left-1/4 size-72 bg-secondary/2 rounded-full -translate-y-1/2 blur-3xl pointer-events-none opacity-70" />
      <div className="hidden sm:block absolute bottom-0 right-1/4 size-72 bg-primary/2 rounded-full translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header stagger container */}
        <LazySection
          animation="none"
          className="stagger-container text-center mb-16"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          {badgeText && (
            <Badge className="mb-4" style={{ '--index': 0 } as CSSProperties}>
              {badgeText}
            </Badge>
          )}
          {heading && (
            <h2 className="" style={{ '--stagger-index': 1 } as CSSProperties}>
              {heading}
            </h2>
          )}
          {subtitle && (
            <p className="section-subtitle" style={{ '--index': 2 } as CSSProperties}>
              {subtitle}
            </p>
          )}
        </LazySection>

        {/* Posts grid stagger container */}
        <LazySection
          animation="none"
          className="stagger-container grid md:grid-cols-2 lg:grid-cols-3 gap-8 card-equal-height justify-items-center"
          style={{ '--stagger-delay': '0.2s' } as CSSProperties}
        >
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="size-full max-w-sm"
              style={{ '--index': index } as CSSProperties}
            >
              <Card className="size-full flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-b from-card to-transparent border border-border shadow-lg">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image?.src || '/placeholder.svg'}
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
                    <span className="text-xs text-neutral-divider">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-neutral-text">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant="link"
                    elevation="flat"
                    animation="none"
                    className="group w-full whitespace-normal break-words !border-none"
                    asChild
                  >
                    <Link href={`/blog/${post.slug}`} className="transition-none">
                      {`Read more: ${post.title}`}
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </LazySection>

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
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
