import { getResourceBySlug } from "@/lib/data/resources";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import ResourceContent from "./ResourceContent";

describe("ResourceContent", () => {
	it("renders hero title, subtitle, and image", async () => {
		const resource = await getResourceBySlug("example-ebook");
		if (!resource) throw new Error("Resource not found");
		render(<ResourceContent resource={resource} />);

		// Hero title
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			resource.title,
		);
		// Hero subtitle
		if (resource.subtitle) {
			expect(screen.getByText(resource.subtitle)).toBeInTheDocument();
		}
		// Hero image
		const img = screen.getByAltText(resource.title) as HTMLImageElement;
		expect(img).toBeInTheDocument();
		expect(img.src).toContain(resource.heroImage);
	});

	it("renders text section content", async () => {
		const resource = await getResourceBySlug("example-ebook");
		if (!resource) throw new Error("Resource not found");
		render(<ResourceContent resource={resource} />);

		// TextSection content
		expect(
			screen.getByText(/Introduce the resource: who it's for/i),
		).toBeInTheDocument();
	});

	it("renders form placeholder when no formEmbed provided", async () => {
		const resource = await getResourceBySlug("example-ebook");
		if (!resource) throw new Error("Resource not found");
		render(<ResourceContent resource={resource} />);

		expect(screen.getByText(/Form embed placeholder/i)).toBeInTheDocument();
	});
});
