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
