import { Star } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  testimonial: {
    id: string;
    quote: string;
    name: string;
    title: string;
    image: {
      src: string;
      alt: string;
    };
    rating?: number;
  };
  className?: string;
  style?: React.CSSProperties;
}

export default function TestimonialCard({ testimonial, className, style }: TestimonialCardProps) {
  const { quote, name, title, image, rating } = testimonial;

  const microClass = siteConfig.features.enableMicroInteractions
    ? 'transition-all hover:shadow-xl'
    : '';

  return (
    <Card
      className={cn(
        'card-equal-height h-full shadow-lg hover:shadow-xl transition-all duration-300',
        className
      )}
      style={style}
    >
      <CardContent className="p-6 flex flex-col h-full">
        {/* Rating stars */}
        {rating && (
          <div className="flex items-center gap-1 mb-4 justify-center">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={`star-${i + 1}`}
                className={cn(
                  'size-4',
                  i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                )}
              />
            ))}
          </div>
        )}

        {/* Quote content - flexible space */}
        <blockquote className="card-content text-neutral-text italic mb-6 grow text-left">
          "{quote}"
        </blockquote>

        {/* Author info - fixed at bottom */}
        <div className="card-footer flex items-center gap-3 mt-auto text-center">
          <Image
            src={image.src || DEFAULT_PLACEHOLDER_IMAGE}
            alt={image.alt}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div className="text-left">
            <div className="font-semibold text-foreground">{name}</div>
            <div className="text-sm text-neutral-text">{title}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
