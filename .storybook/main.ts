import type { StorybookConfig } from '@storybook/react';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
};

export default config; 