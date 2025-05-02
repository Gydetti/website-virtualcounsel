/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
import { siteConfig as defaultConfig } from "./site.config.example"
import { z } from "zod"
// Load local overrides if present (gitignored); fallback to empty object
let localConfig: Partial<typeof defaultConfig> = {}
try {
  // @ts-ignore: optional local config
  localConfig = require("./site.config.local").siteConfig
} catch {
  // no local config found, proceed with defaults
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

function deepMerge<T>(defaults: T, override: DeepPartial<T>): T {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const result = { ...defaults } as any
  for (const key in override) {
    const overrideValue = override[key]
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const defaultValue = (defaults as any)[key]
    // skip undefined, null, or empty-string overrides so defaults stay in place
    if (overrideValue === undefined || overrideValue === null || overrideValue === "") continue
    if (
      overrideValue && typeof overrideValue === "object" && !Array.isArray(overrideValue) &&
      defaultValue && typeof defaultValue === "object" && !Array.isArray(defaultValue)
    ) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      result[key] = deepMerge(defaultValue, overrideValue as any)
    } else {
      result[key] = overrideValue
    }
  }
  return result as T
}

// Zod schema for validating siteConfig structure
const siteConfigSchema = z.object({
  site: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    name: z.string(),
    openGraph: z.object({
      image: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
        alt: z.string(),
      }),
    }),
    twitterImage: z.string(),
  }),
  theme: z.object({
    colors: z.object({ primary: z.string(), secondary: z.string(), accent: z.string() }),
    logo: z.object({ src: z.string(), alt: z.string() }),
    favicon: z.string(),
  }),
  navLinks: z.array(z.any()),
  footerLinks: z.array(z.any()),
  social: z.object({ facebook: z.string(), twitter: z.string(), instagram: z.string(), linkedin: z.string() }),
  cookieConsent: z.object({ cookiebotId: z.string() }),
  tracking: z.object({
    gtmId: z.string(),
    ga4Id: z.string(),
    fbPixelId: z.string(),
    linkedinId: z.string(),
    hubspotId: z.string(),
    googleAdsId: z.string(),
  }),
  newsletter: z.object({
    provider: z.string(),
    hubspot: z.object({ portalId: z.string(), formId: z.string() }),
    mailchimp: z.object({ apiKey: z.string(), listId: z.string() }),
    activeCampaign: z.object({ apiUrl: z.string(), token: z.string() }),
  }),
  contact: z.object({
    email: z.string().email().or(z.literal("")),
    phone: z.string(),
    address: z.object({ line1: z.string(), line2: z.string(), city: z.string(), zip: z.string(), country: z.string() }),
    hours: z.object({ monFri: z.string(), sat: z.string(), sun: z.string() }),
  }),
  sections: z.object({
    hero: z.object({
      badge: z.string(),
      preTitle: z.string(),
      words: z.array(z.string()),
      subtitle: z.string(),
      image: z.object({ src: z.string(), alt: z.string(), fallback: z.string() }),
      ctaPrimary: z.object({ text: z.string(), href: z.string() }),
      ctaSecondary: z.object({ text: z.string(), href: z.string() }),
      stats: z.array(z.object({ value: z.number(), suffix: z.string(), label: z.string() })),
    }),
    blog: z.object({ limit: z.number() }),
  }),
})

// Merge defaults and overrides
const mergedConfig = deepMerge(defaultConfig, localConfig)

// Validate merged config and export
export const siteConfig = siteConfigSchema.parse(mergedConfig)
export type SiteConfig = z.infer<typeof siteConfigSchema> 