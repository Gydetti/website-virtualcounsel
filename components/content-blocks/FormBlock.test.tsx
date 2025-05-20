import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import type { z } from 'zod';

import type { formBlockSchema } from '@/lib/schemas/contentBlocks.schema';

import FormBlock from './FormBlock';

type FormBlockProps = z.infer<typeof formBlockSchema>;

describe('FormBlock', () => {
  it('renders placeholder when config is insufficient', () => {
    const mockProps: FormBlockProps = {
      type: 'form',
      config: { provider: 'custom' },
    };
    render(<FormBlock {...mockProps} />);
    expect(
      screen.getByText(/Form provider not configured or embed code missing/i)
    ).toBeInTheDocument();
  });

  it('renders title, description, and custom embed code', () => {
    const mockProps: FormBlockProps = {
      type: 'form',
      title: 'Test Form Title',
      description: 'Test form description.',
      config: {
        provider: 'custom',
        embedCode: '<button data-testid="custom-button">Submit</button>',
      },
    };
    render(<FormBlock {...mockProps} />);
    expect(screen.getByText('Test Form Title')).toBeInTheDocument();
    expect(screen.getByText('Test form description.')).toBeInTheDocument();
    const customButton = screen.getByTestId('custom-button');
    expect(customButton).toBeInTheDocument();
    expect(customButton.tagName).toBe('BUTTON');
  });

  it('renders HubSpot placeholder when provider is hubspot', () => {
    const mockProps: FormBlockProps = {
      type: 'form',
      title: 'HubSpot Form',
      config: {
        provider: 'hubspot',
        portalId: '123',
        formId: 'abc',
      },
    };
    render(<FormBlock {...mockProps} />);
    expect(screen.getByText('HubSpot Form')).toBeInTheDocument();
    expect(screen.getByText(/HubSpot Form Placeholder/i)).toBeInTheDocument();
    expect(screen.getByText(/Portal ID: 123, Form ID: abc/i)).toBeInTheDocument();
  });
});
