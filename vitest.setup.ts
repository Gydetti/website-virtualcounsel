// Register jest-axe matchers for a11y tests
import 'jest-axe/extend-expect';

// React Testing Library extended matchers
import '@testing-library/jest-dom';

import { afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';

// Polyfill IntersectionObserver for framer-motion in JSDOM
beforeAll(() => {
  class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
  });
});

// Cleanup after each test
afterEach(() => {
  cleanup();
}); 