import { render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
import HeroSection from "@/components/sections/hero-section";
import { heroSectionData } from "@/lib/data/homepage";

describe("HeroSection", () => {
  it("renders the headline and badge text", () => {
    render(<HeroSection {...heroSectionData} />);
    // Check that the headline is rendered
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(heroSectionData.headline ?? "");
    // Check that the badge text is rendered
    const badge = screen.getByText(heroSectionData.badgeText);
    expect(badge).toBeInTheDocument();
  });
});
