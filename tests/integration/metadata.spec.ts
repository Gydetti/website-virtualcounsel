import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config.local";
import { describe, expect, it } from "vitest";

describe("defaultMetadata util", () => {
	it("returns defaults based on siteConfig when no overrides are provided", () => {
		const meta = defaultMetadata();
		expect(meta.title).toBe(siteConfig.site.name);
		expect(meta.description).toBe(siteConfig.site.description);
		expect(meta.openGraph.title).toBe(siteConfig.site.name);
		expect(meta.twitter.card).toBe("summary_large_image");
	});

	it("applies overrides for title, openGraph, and twitter", () => {
		const overrides = {
			title: "Custom Title",
			openGraph: { title: "OG Title", images: ["/img1.jpg"] },
			twitter: { title: "Tw Title", images: ["/img2.jpg"] },
		} as const;
		const meta = defaultMetadata(overrides);
		expect(meta.title).toBe(overrides.title);
		expect(meta.openGraph.title).toBe(overrides.openGraph.title);
		expect(meta.openGraph.images).toEqual(overrides.openGraph.images);
		expect(meta.twitter.title).toBe(overrides.twitter.title);
		expect(meta.twitter.images).toEqual(overrides.twitter.images);
	});
});
