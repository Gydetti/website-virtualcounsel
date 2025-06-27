import type { z } from 'zod';

import servicesPageContent from '@/lib/content/servicesPage.json';
import {
  servicesOverviewSectionDataSchema,
  servicesPageDataSchema,
} from '@/lib/schemas/sections.schema';
import type { ServicesPage } from '@/types/generated/servicesPage.d';

/**
 * Virtual Counsel Services Page Data
 *
 * This file contains structured content for the services overview page.
 * Content is in Dutch and focused on ICT/Software legal services.
 */

export const servicesOverviewSectionData: z.infer<typeof servicesOverviewSectionDataSchema> = {
  badgeText: 'Mijn expertise',
  heading: 'Juridische diensten voor de tech industrie',
  description:
    'Specialistische juridische ondersteuning voor ICT- en softwarebedrijven. Van contracten tot compliance - ik spreek uw taal.',
};

// Complete services page data with all sections
export const servicesPageData: ServicesPage = servicesPageContent;

// Validate data
try {
  servicesOverviewSectionDataSchema.parse(servicesOverviewSectionData);
  servicesPageDataSchema.parse(servicesPageData);
} catch (error) {
  console.error(
    'Error validating servicesPageData:',
    error instanceof Error ? error.message : error
  );
}
