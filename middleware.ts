import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { siteConfig } from "./lib/site.config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Ensure feature flags are defined; default to all enabled if missing
  const features = siteConfig.features ?? {
    enableBlog: true,
    enableServices: true,
    enableContactForm: true,
    enableLandingPages: true,
  };

  const checks: { pattern: RegExp; enabled: boolean }[] = [
    { pattern: /^\/blog(\/|$)/, enabled: features.enableBlog },
    { pattern: /^\/services(\/|$)/, enabled: features.enableServices },
    { pattern: /^\/contact(\/|$)/, enabled: features.enableContactForm },
    { pattern: /^\/landing(\/|$)/, enabled: features.enableLandingPages },
  ];

  for (const { pattern, enabled } of checks) {
    if (pattern.test(pathname) && !enabled) {
      const url = request.nextUrl.clone();
      url.pathname = "/404";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/:path*", "/services/:path*", "/contact/:path*", "/landing/:path*"],
};
