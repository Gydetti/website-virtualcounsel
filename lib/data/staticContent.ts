import 'server-only';

import fs from 'node:fs';
import path from 'node:path';

import { z } from 'zod';

import {
  cookiePolicySchema,
  faqCategoriesSchema,
  privacyPolicySchema,
  termsOfServiceSchema,
  // Import other schemas as you create them
} from '../schemas/siteConfig.schema';

const staticContentDirectory = path.join(process.cwd(), 'lib/content/static');

function readAndParseJSON(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function getCookiePolicy() {
  const data = readAndParseJSON(path.join(staticContentDirectory, 'cookiePolicy.json'));
  return cookiePolicySchema.parse(data);
}

export async function getPrivacyPolicy() {
  const data = readAndParseJSON(path.join(staticContentDirectory, 'privacyPolicy.json'));
  return privacyPolicySchema.parse(data);
}

export async function getTermsOfService() {
  const data = readAndParseJSON(path.join(staticContentDirectory, 'termsOfService.json'));
  return termsOfServiceSchema.parse(data);
}

export async function getFaqCategories() {
  const data = readAndParseJSON(path.join(staticContentDirectory, 'faq.json'));
  return z.array(faqCategoriesSchema).parse(data);
}

export async function getFaqSection() {
  const data = readAndParseJSON(path.join(staticContentDirectory, 'faqSection.json'));
  return z
    .object({
      badge: z.string(),
      title: z.string(),
      subtitle: z.string(),
      searchPlaceholder: z.string(),
      assistance: z.object({
        heading: z.string(),
        prompt: z.string(),
        buttonLabel: z.string(),
      }),
    })
    .parse(data);
}

// Add functions for other static content files...

// --- Synchrone statische content objecten ---
const staticDir = staticContentDirectory;

function readJSON(fileName: string): unknown {
  return readAndParseJSON(path.join(staticDir, fileName));
}

export const staticContent = {
  cookiePolicy: cookiePolicySchema.parse(readJSON('cookiePolicy.json')),
  privacyPolicy: privacyPolicySchema.parse(readJSON('privacyPolicy.json')),
  termsOfService: termsOfServiceSchema.parse(readJSON('termsOfService.json')),
  faqCategories: z.array(faqCategoriesSchema).parse(readJSON('faq.json')),
  faqSection: z
    .object({
      badge: z.string(),
      title: z.string(),
      subtitle: z.string(),
      searchPlaceholder: z.string(),
      assistance: z.object({ heading: z.string(), prompt: z.string(), buttonLabel: z.string() }),
    })
    .parse(readJSON('faqSection.json')),
  privacySection: z.object({ badge: z.string(), title: z.string() }).parse({
    badge: 'Privacybeleid',
    title: 'Privacybeleid',
  }),
  termsSection: z.object({ badge: z.string(), title: z.string() }).parse({
    badge: 'Algemene Voorwaarden',
    title: 'Algemene Voorwaarden',
  }),
  notFoundPage: {
    statusCode: '404',
    title: 'Page Not Found',
    description:
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
    buttonText: 'Terug naar home',
  },
  blogPage: {
    badgeText: 'From our blog',
    heading: 'Latest insights & articles',
    description: 'Read our latest articles and insights.',
    regularPostsHeading: 'Recent articles',
    readFeaturedText: 'Lees het uitgelichte artikel',
    readMoreText: 'Lees verder',
    noPostsMessage: 'No posts available',
  },
  resourcesPage: {
    noResourcesMessage: 'No resources available at the moment.',
    readMoreText: 'Lees verder',
  },
};

// Aliassen voor backwards compatibility met pagina-imports
export const blogPageData = staticContent.blogPage;
export const resourcesPageData = staticContent.resourcesPage;
export const notFoundPageData = staticContent.notFoundPage;
