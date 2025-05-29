import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ThemedSection } from '@/components/ui/themed-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import { siteConfig } from '@/lib/siteConfig';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
  slug: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  features,
  popular = false,
  slug,
}: ServiceCardProps) {
  const microClass = siteConfig.features.enableMicroInteractions
    ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1'
    : '';
  const { getBorderRadiusClass } = useThemeBorderRadius();
  const buttonRadius = getBorderRadiusClass('button');
  return (
    <Card
      className={`card-equal-height h-full overflow-hidden ${microClass} ${
        popular ? 'border-primary shadow-lg relative' : 'border shadow-sm'
      }`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          Popular
        </div>
      )}
      <CardHeader className={`${popular ? 'pt-12' : ''}`}>
        <ThemedSection
          variant="card"
          hasBackground
          className="mb-6 bg-primary/10 size-16 flex items-center justify-center"
        >
          {icon}
        </ThemedSection>
        <CardTitle className="text-xl font-bold text-center">{title}</CardTitle>
        <CardDescription className="text-body-base text-foreground text-left">{description}</CardDescription>
      </CardHeader>
      <CardContent className="card-content">
        <ul className="space-y-3 text-left">
          {features.map(feature => (
            <li key={feature} className="flex items-start">
              <span className="text-feedback-success mr-3 shrink-0 mt-0.5">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="card-footer pt-6">
        <Button
          variant="clean"
          animation="none"
          asChild
          className={`w-full ${buttonRadius} text-style-balanced px-4 py-2.5 font-semibold transition-colors duration-200 ${
            popular
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-white border border-primary text-primary hover:bg-primary hover:text-white'
          }`}
        >
          <Link href={`/services/${slug}`}>
            {`Learn more about ${title}`}
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
