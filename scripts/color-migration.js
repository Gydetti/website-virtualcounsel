// scripts/color-migration.js
// Migrates hardcoded Tailwind color classes to semantic token classes.
// Usage: node scripts/color-migration.js

const fs = require('node:fs');
const path = require('node:path');

// Mapping of old class to new class
const mapping = {
  'bg-blue-100': 'bg-brand-light',
  'hover:bg-blue-200': 'hover:bg-brand-light/90',
  'bg-gray-50': 'bg-neutral-background',
  'bg-white': 'bg-surface',
  'text-gray-700': 'text-neutral-text',
  'border-gray-200': 'border-divider',
  'bg-red-50': 'bg-feedback-error-bg',
  'text-red-700': 'text-feedback-error',
  'bg-green-50': 'bg-feedback-success-bg',
  'text-green-700': 'text-feedback-success',
  // Surface and slate mappings
  'bg-surface': 'bg-neutral-surface',
  'bg-surface/10': 'bg-neutral-surface/10',
  'bg-surface/20': 'bg-neutral-surface/20',
  'bg-surface/30': 'bg-neutral-surface/30',
  'bg-slate-200': 'bg-neutral-divider',
  // Border mappings
  'border-slate-200': 'border-divider',
  'border-gray-100': 'border-divider',
  // Text mappings
  'text-slate-900': 'text-neutral-text',
  'text-gray-900': 'text-neutral-text',
  'text-slate-600': 'text-neutral-text',
};

// Dynamic regex patterns for generic Tailwind color classes
const dynamicPatterns = [
  // Map generic gray shades to neutral tokens
  { regex: /\btext-gray-(\d{1,3})\b/g, replace: (_, p1) => `text-neutral-text/${p1}` },
  {
    regex: /\bbg-gray-(\d{1,3})\b/g,
    replace: (_, p1) => (p1 === '50' ? 'bg-neutral-background' : `bg-neutral-background/${p1}`),
  },
  {
    regex: /\bborder-gray-(\d{1,3})\b/g,
    replace: (_, p1) => (p1 === '200' ? 'border-divider' : `border-divider/${p1}`),
  },
  // Feedback states
  { regex: /\btext-red-(\d{1,3})\b/g, replace: () => 'text-feedback-error' },
  { regex: /\bbg-red-(\d{1,3})\b/g, replace: () => 'bg-feedback-error-bg' },
  { regex: /\bborder-red-(\d{1,3})\b/g, replace: () => 'border-feedback-error' },
  { regex: /\btext-green-(\d{1,3})\b/g, replace: () => 'text-feedback-success' },
  { regex: /\bbg-green-(\d{1,3})\b/g, replace: () => 'bg-feedback-success-bg' },
  { regex: /\bborder-green-(\d{1,3})\b/g, replace: () => 'border-feedback-success' },
  // Primary opacity utilities
  { regex: /\bhover:bg-primary-(\d{1,3})\b/g, replace: (_, p1) => `hover:bg-primary/${p1}` },
  { regex: /\bbg-primary-(\d{1,3})\b/g, replace: (_, p1) => `bg-primary/${p1}` },
  // Map text-primary numeric suffix to slash-based opacity
  { regex: /\btext-primary-(\d{1,3})\b/g, replace: (_, p1) => `text-primary/${p1}` },
  // Slate grayscale mapping to neutral tokens
  { regex: /\btext-slate-(\d{1,3})\b/g, replace: (_, p1) => `text-neutral-text/${p1}` },
  {
    regex: /\bbg-slate-(\d{1,3})\b/g,
    replace: (_, p1) => (p1 === '200' ? 'bg-neutral-background' : `bg-neutral-background/${p1}`),
  },
  {
    regex: /\bborder-slate-(\d{1,3})\b/g,
    replace: (_, p1) => (p1 === '200' ? 'border-divider' : `border-divider/${p1}`),
  },
  // Map all blue text and background classes to primary token
  { regex: /\btext-blue-(\d{1,3})\b/g, replace: () => 'text-primary' },
  { regex: /\bbg-blue-(\d{1,3})(?:\/(\d{1,3}))?\b/g, replace: () => 'bg-primary' },
];

// Recursively walk directory and process files
function walk(dir, fileCallback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (['.next', 'node_modules', 'public', 'docs'].includes(file)) continue;
      walk(fullPath, fileCallback);
    } else if (/\.(js|ts|jsx|tsx)$/.test(file)) {
      fileCallback(fullPath);
    }
  }
}

function migrateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let updated = content;

  for (const [oldClass, newClass] of Object.entries(mapping)) {
    const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
    updated = updated.replace(regex, newClass);
  }

  // apply dynamic pattern replacements
  for (const { regex, replace } of dynamicPatterns) {
    updated = updated.replace(regex, replace);
  }

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

console.log('Starting color class migration...');
// Walk only existing directories
const dirsToWalk = ['components', 'app', 'pages', 'lib'];
for (const dirName of dirsToWalk) {
  const dirPath = path.resolve(__dirname, `../${dirName}`);
  if (fs.existsSync(dirPath)) {
    console.log(`Scanning directory: ${dirName}`);
    walk(dirPath, migrateFile);
  }
}
console.log('Migration complete. Please review changes and add any missing mappings.');
