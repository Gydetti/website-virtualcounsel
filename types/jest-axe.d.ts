// Declare module for jest-axe to provide types
declare module 'jest-axe' {
  import type { MatcherFunction } from 'expect';
  // The axe function returns a Promise with results object
  export function axe(html: Element | string, options?: unknown): Promise<unknown>;
  // toHaveNoViolations matcher for a11y tests
  export const toHaveNoViolations: MatcherFunction<unknown>;
} 