import { describe, it, expect } from 'vitest';
import { contactSchema } from '@/app/api/contact/route';

describe('contactSchema validation', () => {
  it('parses a valid payload successfully', () => {
    const valid = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Hello',
      message: 'Test message',
    };
    expect(() => contactSchema.parse(valid)).not.toThrow();
  });

  it('throws on missing required fields', () => {
    const invalid = { email: 'john@example.com' };
    try {
      contactSchema.parse(invalid as unknown);
      // Should not reach here
      throw new Error('Expected ZodError');
    } catch (err: unknown) {
      expect(err).toHaveProperty('issues');
    }
  });
}); 