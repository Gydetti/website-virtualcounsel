import serviceDetailPageContent from '@/lib/content/serviceDetailPage.json';
import type { ServiceDetailPage } from '@/types/generated/serviceDetailPage.d';

/**
 * Virtual Counsel Service Detail Page Data
 *
 * This file contains structured content for service detail pages.
 * Content is in Dutch and focused on legal services for ICT/Software companies.
 * Each service has unique, detailed content based on CSV data and scraped content.
 */

// Bridge module: import JSON content and assert the generated type
export const serviceDetailPageData: ServiceDetailPage =
  serviceDetailPageContent as ServiceDetailPage;

// Extract services map
export const servicesDetailData = serviceDetailPageData.services;

// Helper function to get service detail data by slug, preserving default and merging specific fields
export const getServiceDetailData = (
  slug: keyof typeof servicesDetailData
): ServiceDetailPage['default'] &
  Partial<ServiceDetailPage['services'][keyof ServiceDetailPage['services']]> => {
  const specific = servicesDetailData[slug];
  if (!specific) {
    return serviceDetailPageData.default;
  }
  return {
    ...serviceDetailPageData.default,
    ...specific,
  };
};
