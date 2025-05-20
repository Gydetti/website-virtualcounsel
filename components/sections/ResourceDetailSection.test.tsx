import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeAll, describe, expect, it } from 'vitest';
import type { z } from 'zod';

import { getResourceBySlug } from '@/lib/data/resources';
import type { resourceSchema } from '@/lib/schemas/contentBlocks.schema';

import ResourceDetailSection from './ResourceDetailSection';

type ResourceType = z.infer<typeof resourceSchema>;

describe('ResourceDetailSection', () => {
  let resource: ResourceType | undefined;

  beforeAll(async () => {
    resource = await getResourceBySlug('example-ebook');
  });

  it('throws error if resource not found for tests', () => {
    if (!resource) {
      expect(() => {
        throw new Error('Resource not found for testing setup');
      }).toThrow();
    }
    expect(resource).toBeDefined();
  });

  it('renders hero title, subtitle, and image', () => {
    if (!resource) throw new Error('Resource not found');
    render(<ResourceDetailSection resource={resource} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(resource.title);
    if (resource.subtitle) {
      expect(screen.getByText(resource.subtitle)).toBeInTheDocument();
    }
    if (resource.heroImage) {
      const img = screen.getByAltText(resource.heroImage.alt) as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toContain(encodeURIComponent(resource.heroImage.src));
    }
  });

  it('renders text block content from resource sections', () => {
    if (!resource) throw new Error('Resource not found');
    render(<ResourceDetailSection resource={resource} />);

    const textBlockContent = resource.sections.find(s => s.type === 'text')?.content;
    if (textBlockContent) {
      expect(screen.getByText(textBlockContent)).toBeInTheDocument();
    } else {
      throw new Error('Sample resource data does not contain expected text block for testing.');
    }
  });

  it('renders form block with title from resource sections', () => {
    if (!resource) throw new Error('Resource not found');
    render(<ResourceDetailSection resource={resource} />);

    const formBlockData = resource.sections.find(s => s.type === 'form');
    if (formBlockData?.title) {
      expect(screen.getByText(formBlockData.title)).toBeInTheDocument();
    } else {
      console.warn('Sample resource form block might not have a title for testing.');
      expect(
        screen.getByText(/Form provider not configured or embed code missing/i)
      ).toBeInTheDocument();
    }
  });
});
