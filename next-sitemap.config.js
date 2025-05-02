// Register ts-node to allow TypeScript imports
require('ts-node').register({
    project: './tsconfig.json'
});
const { siteConfig } = require('./lib/site.config.ts');

// Build exclusion patterns from feature flags
const exclusions = [];
if (!siteConfig.features.enableBlog) {
    exclusions.push('/blog', '/blog/*');
}
if (!siteConfig.features.enableServices) {
    exclusions.push('/services', '/services/*');
}
if (!siteConfig.features.enableContactForm) {
    exclusions.push('/contact', '/contact/*');
}

module.exports = {
    siteUrl: siteConfig.site.url,
    generateRobotsTxt: true,
    exclude: exclusions,
    sitemapSize: 5000,
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: '*', disallow: exclusions },
        ],
    },
    additionalPaths: async(config) => {
        const paths = [];
        if (siteConfig.features.enableBlog) {
            const { getBlogPosts } = require('./lib/data-utils');
            const posts = await getBlogPosts();
            paths.push(...posts.map(p => ({ loc: `/blog/${p.slug}` })));
        }
        if (siteConfig.features.enableServices) {
            const { getServices } = require('./lib/data-utils');
            const services = await getServices();
            paths.push(...services.map(s => ({ loc: `/services/${s.slug}` })));
        }
        return paths;
    },
};