import { render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));
// Mock the OptimizedImage component to avoid blur data URL issues in tests
vi.mock('@/components/ui/optimized-image', () => ({
  default: ({ alt, className }: { alt: string; className: string }) => (
    <img alt={alt} className={className} src="/placeholder.svg" />
  ),
}));
import HeroSection from '@/components/sections/hero-section';
import { heroSectionData } from '@/lib/data/homepage';

describe('HeroSection', () => {
  it('renders the headline and badge text', () => {
    render(<HeroSection {...heroSectionData} />);
    // Check that the headline is rendered
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('De juridische partner voor ICT- & softwarebedrijven');
    // Check that the badge text is rendered
    const badge = screen.getByText(heroSectionData.badgeText);
    expect(badge).toBeInTheDocument();
  });
});
