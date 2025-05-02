const { siteConfig } = require('./lib/site.config');

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
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: '*', disallow: exclusions },
        ],
    },
};