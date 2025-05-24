/* eslint-disable import/named */
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import ContactSection from './contact-section';

describe('ContactSection', () => {
  it('renders form inputs and submit button', () => {
    render(<ContactSection />);
    expect(screen.getByPlaceholderText(/Your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/How can we help you/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send message/i })).toBeInTheDocument();
  });

  it('shows thank you message after submit', async () => {
    render(<ContactSection />);
    fireEvent.change(screen.getByPlaceholderText(/Your name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Your email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/How can we help you/i), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Send message/i }));
    // wait for simulated API delay
    await new Promise(r => setTimeout(r, 1600));
    expect(screen.getByText(/Thank you for your message/i)).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<ContactSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
