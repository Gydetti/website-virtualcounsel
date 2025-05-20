'use client';

import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { pricingCardSchema, pricingSectionDataSchema } from '@/lib/schemas/sections.schema';

// Updated props type alias using Zod schema
export type PricingSectionProps = z.infer<typeof pricingSectionDataSchema>;

export default function PricingSection({
  badgeText, // Added from schema
  heading, // Added from schema
  description, // Added from schema
  cards,
}: PricingSectionProps) {
  if (!cards || cards.length === 0) {
    // Schema enforces min(1) for cards
    return null;
  }
  return (
    <Section id="pricing" className="bg-neutral-surface relative overflow-hidden">
      {/* Heading & description with CSS-only stagger */}
      <div className="stagger-container text-center mb-16">
        {heading && (
          <h2 className="" style={{ '--index': 0 } as React.CSSProperties}>
            {heading}
          </h2>
        )}
        {description && (
          <p className="section-subtitle" style={{ '--index': 1 } as React.CSSProperties}>
            {description}
          </p>
        )}
      </div>
      {/* Pricing cards with CSS-only stagger */}
      <div className="stagger-container grid gap-8 md:grid-cols-3 items-stretch">
        {cards.map((card: z.infer<typeof pricingCardSchema>, idx) => (
          <Card
            key={card.id}
            className="relative flex h-full flex-col justify-between border bg-neutral-surface shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            style={{ '--index': idx + 2 } as React.CSSProperties}
          >
            {card.popular && (
              <div className="absolute top-0 right-0 mt-4 mr-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                Popular
              </div>
            )}
            <CardHeader className="text-center bg-background px-6 py-8 rounded-t-lg">
              <CardTitle>{card.title}</CardTitle>
              <div className="mt-2 text-3xl font-bold">{card.price}</div>
            </CardHeader>
            <CardContent className="grow px-6 py-4">
              <ul className="space-y-3">
                {card.features.map(feature => (
                  <li key={feature} className="flex items-start">
                    <span className="text-feedback-success mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-5"
                      >
                        <title>Feature checkmark</title>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="text-center p-6">
              {card.cta?.href && card.cta?.text && (
                <Button asChild className="w-full py-3 text-sm font-semibold">
                  <a href={card.cta.href}>{card.cta.text}</a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
