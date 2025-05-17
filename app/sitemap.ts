import { getBlogPosts, getServices } from "@/lib/data-utils";
import { siteConfig } from "@/lib/siteConfig";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://your-domain.com";

  // Get dynamic routes
  const services = await getServices();
  const blogPosts = await getBlogPosts();

  // Feature flags and enabled pages
  const { enableBlog, enableServices } = siteConfig.features;
  const enabledPages = siteConfig.enabledPages;

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Filter static routes by enabledPages and feature flags
  const filteredStatic = staticRoutes.filter((route) => {
    const path = route.url.replace(baseUrl, "") || "/";
    // Exclude by enabledPages
    if (enabledPages && !enabledPages.includes(path)) return false;
    // Exclude blog and services if disabled
    if (path.startsWith("/blog") && !enableBlog) return false;
    if (path.startsWith("/services") && !enableServices) return false;
    return true;
  });

  // Service routes
  const serviceRoutes =
    enableServices && (!enabledPages || enabledPages.includes("/services"))
      ? services.map((service) => ({
          url: `${baseUrl}/services/${service.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        }))
      : [];

  // Blog post routes
  const blogRoutes =
    enableBlog && (!enabledPages || enabledPages.includes("/blog"))
      ? blogPosts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.date),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }))
      : [];

  return [...filteredStatic, ...serviceRoutes, ...blogRoutes];
}
