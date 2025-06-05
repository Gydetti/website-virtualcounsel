import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { siteConfig } from '@/lib/siteConfig';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  readMoreText?: string;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  category,
  image,
  slug,
  readMoreText,
}: BlogCardProps) {
  const microClass = siteConfig.features.enableMicroInteractions
    ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1'
    : '';
  return (
    <Card className={`h-full overflow-hidden border shadow-sm ${microClass}`}>
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || DEFAULT_PLACEHOLDER_IMAGE}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs font-normal">
            {category}
          </Badge>
          <span className="text-xs text-neutral-text/500">{date}</span>
        </div>
        <CardTitle className="text-xl font-bold hover:text-primary transition-colors">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-body-base text-foreground">{excerpt}</CardDescription>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="link" className="p-0 h-auto text-primary group" asChild>
          <Link href={`/blog/${slug}`} className="transition-none">
            {readMoreText || 'Lees verder'}
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
