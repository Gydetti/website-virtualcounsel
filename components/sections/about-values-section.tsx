import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import LazySection from "@/components/ui/lazy-section";
import type { aboutValuesSectionDataSchema } from "@/lib/schemas/sections.schema";
import type { CSSProperties } from "react";
import type { z } from "zod";

export type AboutValuesSectionProps = z.infer<
  typeof aboutValuesSectionDataSchema
>;

export default function AboutValuesSection({
  badgeText,
  heading,
  values,
}: AboutValuesSectionProps) {
  return (
    <Section id="about-values" className="py-12">
      <LazySection
        animation="none"
        className="stagger-container max-w-3xl mx-auto text-center"
        style={{ "--stagger-delay": "0.1s" } as CSSProperties}
      >
        {badgeText && (
          <Badge
            className="mb-4 bg-primary text-primary-foreground"
            style={{ "--index": 0 } as CSSProperties}
          >
            {badgeText}
          </Badge>
        )}
        {heading && (
          <h3
            className="section-title mb-6"
            style={{ "--index": 1 } as CSSProperties}
          >
            {heading}
          </h3>
        )}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          style={{ "--index": 2 } as CSSProperties}
        >
          {values.map((value, idx) => (
            <li
              key={value}
              className="text-foreground text-lg"
              style={{ "--index": 3 + idx } as CSSProperties}
            >
              • {value}
            </li>
          ))}
        </ul>
      </LazySection>
    </Section>
  );
}
