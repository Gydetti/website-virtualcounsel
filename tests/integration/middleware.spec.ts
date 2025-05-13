import { siteConfig } from "@/lib/siteConfig";
import { middleware } from "@/middleware";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { vi } from "vitest";

// Stub NextResponse.rewrite to attach the rewrite header
vi.spyOn(NextResponse, "rewrite").mockImplementation((url) => {
	const res = NextResponse.next();
	res.headers.set("x-middleware-rewrite", url.pathname);
	return res;
});

describe("middleware feature flag gating", () => {
	let originalEnableBlog: boolean;

	beforeEach(() => {
		originalEnableBlog = siteConfig.features.enableBlog;
	});

	afterEach(() => {
		siteConfig.features.enableBlog = originalEnableBlog;
	});

	it("rewrites to /404 when blog feature is disabled", () => {
		siteConfig.features.enableBlog = false;
		const req = new NextRequest("https://example.com/blog");
		const res = middleware(req);
		expect(res.headers.get("x-middleware-rewrite")).toContain("/404");
	});

	it("does not rewrite when blog feature is enabled", () => {
		siteConfig.features.enableBlog = true;
		const req = new NextRequest("https://example.com/blog");
		const res = middleware(req);
		expect(res.headers.get("x-middleware-rewrite")).toBeNull();
	});
});
