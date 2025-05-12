// Register ts-node to allow TypeScript imports
require("ts-node").register({
	project: "./tsconfig.json",
	preferTsExts: true,
	// esm: true, // Experimental ESM support - did not work
	// Override compiler options for ts-node in this specific context
	compilerOptions: {
		module: "commonjs", // Force module output to CommonJS for ts-node
	},
});
const { siteConfig } = require("./lib/site.config.local.ts");
// Add fallback for siteUrl if missing
const siteUrl =
	siteConfig.site.url && siteConfig.site.url.length > 0
		? siteConfig.site.url
		: "http://localhost:3000";

// Build exclusion patterns from feature flags
const exclusions = [];
if (!siteConfig.features.enableBlog) {
	exclusions.push("/blog", "/blog/*");
}
if (!siteConfig.features.enableServices) {
	exclusions.push("/services", "/services/*");
}
if (!siteConfig.features.enableContactForm) {
	exclusions.push("/contact", "/contact/*");
}

module.exports = {
	siteUrl,
	generateRobotsTxt: true,
	exclude: exclusions,
	sitemapSize: 5000,
	robotsTxtOptions: {
		policies: [
			{ userAgent: "*", allow: "/" },
			{ userAgent: "*", disallow: exclusions },
		],
	},
	additionalPaths: async (config) => {
		const paths = [];
		if (siteConfig.features.enableBlog) {
			const { getBlogPosts } = require("./lib/data-utils.ts");
			const posts = await getBlogPosts();
			paths.push(...posts.map((p) => ({ loc: `/blog/${p.slug}` })));
		}
		if (siteConfig.features.enableServices) {
			const { getServices } = require("./lib/data-utils.ts");
			const services = await getServices();
			paths.push(...services.map((s) => ({ loc: `/services/${s.slug}` })));
		}
		return paths;
	},
};
