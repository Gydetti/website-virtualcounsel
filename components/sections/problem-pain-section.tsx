"use client";
import { Section } from "@/components/layout/Section";
import { AlertTriangle } from "lucide-react";

export interface ProblemPainSectionProps {
  badgeText?: string;
  heading?: string;
  description?: string;
  calloutText?: string;
  cards?: { title: string; description: string }[];
}

export default function ProblemPainSection({
  badgeText = "Short label introducing problem section",
  heading = "Section heading highlighting common problem",
  description = "Brief description outlining typical challenges faced by your target audience",
  calloutText = "Callout text emphasizing consequences of ignoring these challenges",
  cards = [
    {
      title: "Card title: short problem label",
      description: "Brief sentence explaining problem's impact",
    },
    {
      title: "Card title: short problem label",
      description: "Brief sentence explaining problem's impact",
    },
    {
      title: "Card title: short problem label",
      description: "Brief sentence explaining problem's impact",
    },
    {
      title: "Card title: short problem label",
      description: "Brief sentence explaining problem's impact",
    },
  ],
}: ProblemPainSectionProps) {
  return (
    <Section
      id="pain"
      className="bg-gradient-to-b from-transparent to-secondary/10"
    >
      <div className="bg-gray-900 text-white rounded-[30px] border border-gray-700/50 shadow-lg p-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 text-secondary">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">{badgeText}</span>
              </div>
              <h2 className="section-title text-white">{heading}</h2>
              <p className="max-w-[600px] text-gray-400 md:text-xl">
                {description}
              </p>
            </div>
            {calloutText && (
              <div className="rounded-lg bg-gray-800 p-6">
                <p className="text-lg font-medium">{calloutText}</p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {cards.map((card) => (
              <div key={card.title} className="rounded-lg bg-gray-800 p-6">
                <h3 className="mb-3 text-xl font-bold text-secondary">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
