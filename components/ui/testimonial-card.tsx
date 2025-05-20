import { Star } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { siteConfig } from '@/lib/siteConfig';

export interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  image: string;
  rating?: number;
}

export default function TestimonialCard({
  quote,
  name,
  title,
  image,
  rating = 5,
}: TestimonialProps) {
  const microClass = siteConfig.features.enableMicroInteractions
    ? 'transition-all hover:shadow-xl'
    : '';
  return (
    <Card className={`border-none bg-neutral-surface flex flex-col h-full shadow-lg ${microClass}`}>
      <CardContent className="p-8 flex flex-col flex-1">
        {rating > 0 && (
          <div className="flex items-center mb-6">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                aria-hidden="true"
                className={`size-5 ${
                  star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-text/300'
                }`}
              />
            ))}
          </div>
        )}
        <p className="text-foreground italic mb-8">{quote}</p>
        <div className="flex items-center mt-auto">
          <div className="mr-4">
            <Image
              src={image || DEFAULT_PLACEHOLDER_IMAGE}
              alt={name}
              width={60}
              height={60}
              className="rounded-full border-2 border-divider"
            />
          </div>
          <div>
            <h4 className="text-neutral-text">{name}</h4>
            <p className="text-foreground">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
