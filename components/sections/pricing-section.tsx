"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PricingCard {
  title: string
  price: string
  features: string[]
  cta: { text: string; href: string }
}

interface PricingSectionProps {
  cards: PricingCard[]
}

export default function PricingSection({ cards }: PricingSectionProps) {
  return (
    <section id="pricing" className="section-padding bg-white relative overflow-hidden">
      <div className="container-wide text-center mb-16">
        <h2 className="section-title">Pricing Plans</h2>
        <p className="section-subtitle">Choose the plan that best fits your needs</p>
      </div>
      <div className="container-wide grid gap-8 md:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.title} className="border shadow-sm hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CardTitle>{card.title}</CardTitle>
              <div className="mt-2 text-3xl font-bold">{card.price}</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
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
            <CardFooter className="text-center">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <a href={card.cta.href}>{card.cta.text}</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
} 