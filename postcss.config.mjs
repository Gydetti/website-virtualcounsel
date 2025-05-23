import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import purgecss from '@fullhuman/postcss-purgecss';

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    ...(process.env.NODE_ENV === 'production'
      ? [
          purgecss({
            content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: [
              /^container/,
              /^btn-spark/,
              /^spark-/,
              /^bg-/,
              /^text-/,
              /^animate-/,
              /^shadow-/,
              /^opacity-/,
              /^flex/,
              /^grid/,
            ],
          }),
        ]
      : []),
  ],
};

export default config;
