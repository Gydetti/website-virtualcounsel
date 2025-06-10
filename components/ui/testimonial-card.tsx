import { Star } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  testimonial: {
    id: string;
    quote: string;
    name: string;
    title: string;
    rating?: number;
  };
  className?: string;
  style?: React.CSSProperties;
}

export default function TestimonialCard({ testimonial, className, style }: TestimonialCardProps) {
  const { quote, name, title, rating } = testimonial;

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
                  i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-text/40'
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
        <div className="card-footer text-center mt-auto">
          <div className="font-semibold text-foreground">{name}</div>
          <div className="text-sm text-neutral-text">{title}</div>
        </div>
      </CardContent>
    </Card>
  );
}
