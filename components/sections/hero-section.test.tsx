/* biome-disable-file */
/* eslint-disable */
/* eslint-disable jsx-a11y/alt-text */
// @ts-nocheck

import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import React from "react";
import { describe, expect, it, vi } from "vitest";

// Mock Next.js Image to return a standard img tag with static alt for accessibility
vi.mock("next/image", () => ({
	__esModule: true,
	default: (props: any) => <img alt="hero" {...props} />,
}));

import HeroSection from "./hero-section";

describe("HeroSection", () => {
	it("renders heading and badge", () => {
		render(<HeroSection />);
		expect(screen.getByText(/Digital growth solutions/i)).toBeInTheDocument();
		expect(screen.getByText(/Grow your business with/i)).toBeInTheDocument();
	});

	it("has no a11y violations", async () => {
		const { container } = render(<HeroSection />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
