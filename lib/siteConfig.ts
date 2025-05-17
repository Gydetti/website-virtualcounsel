// This file loads the raw local configuration, validates it against the schema,
// and exports the validated site configuration object for use throughout the application.

import { z } from 'zod';
import {
  type SiteConfigSchema as SiteConfigType,
  siteConfigSchema,
} from './schemas/siteConfig.schema';
import { siteConfig as rawConfig } from './site.config.local';

let validatedSiteConfig: SiteConfigType;

try {
  validatedSiteConfig = siteConfigSchema.parse(rawConfig);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Error validating site.config.local.ts:', error.flatten().fieldErrors);
    console.error(
      'FATAL: Site configuration validation failed. Please check site.config.local.ts against the defined schema.'
    );
    throw new Error('Site config validation failed (ZodError). Check console for details.');
  }
  console.error('An unexpected error occurred during site config validation:', error);
  throw new Error('Site config validation failed (UnknownError). Check console for details.');
}

export const siteConfig: SiteConfigType = validatedSiteConfig;
export type SiteConfig = SiteConfigType; // Re-exporting the type for convenience
