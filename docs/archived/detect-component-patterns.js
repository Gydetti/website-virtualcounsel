#!/usr/bin/env node

/**
 * GMG Template Website - Component Pattern Detector
 * Scans codebase for inconsistent component usage and reports violations
 */

const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');

// Define patterns to detect
const PATTERNS = {
  hardcodedButtons: {
    name: 'Hardcoded Button Styling',
    description: 'Link elements with button-like styling instead of using Button component',
    regex:
      /<Link[^>]*className="[^"]*(?:inline-block.*px-\d+.*py-\d+|bg-primary.*text-white|px-\d+.*py-\d+.*bg-)[^"]*"[^>]*>/g,
    suggestion: 'Use <Button asChild><Link href="...">...</Link></Button> instead',
  },

  hardcodedBorderRadius: {
    name: 'Hardcoded Border Radius',
    description: 'Using hardcoded rounded-* classes instead of theme system',
    regex: /className="[^"]*rounded-(?:sm|md|lg|xl|2xl|3xl|full)[^"]*"/g,
    suggestion: 'Use theme border radius system with getBorderRadiusClass() or CSS variables',
  },

  incorrectHoverSyntax: {
    name: 'Incorrect Hover Color Syntax',
    description: 'Using old hover:bg-color format instead of slash syntax',
    regex: /hover:bg-(\w+)(\d+)(?!\d)/g,
    suggestion: 'Use hover:bg-{color}/{opacity} syntax (e.g., hover:bg-primary/90)',
  },

  imgTags: {
    name: 'Raw img Tags',
    description: 'Using <img> tags instead of Next.js Image or OptimizedImage',
    regex: /<img[^>]*>/g,
    suggestion: 'Use <Image> from next/image or <OptimizedImage> component',
  },

  hardcodedColors: {
    name: 'Hardcoded Colors',
    description: 'Using hex colors or raw Tailwind colors instead of theme tokens',
    regex:
      /#(?:[0-9a-fA-F]{3}){1,2}\b|(?:bg|text|border)-(?:red|blue|green|yellow|purple|pink|indigo|gray)-\d+/g,
    suggestion: 'Use theme color tokens (e.g., bg-primary, text-neutral-text)',
  },

  inlineStyles: {
    name: 'Inline Styles',
    description: 'Using inline styles instead of Tailwind classes',
    regex: /style=\{\{[^}]+\}\}/g,
    suggestion: 'Use Tailwind utility classes or CSS variables',
  },
};

// Files to scan
const SCAN_PATHS = [
  'app/**/*.{tsx,jsx,ts,js}',
  'components/**/*.{tsx,jsx,ts,js}',
  'lib/**/*.{tsx,jsx,ts,js}',
];

// Files to exclude
const EXCLUDE_PATTERNS = [
  '**/node_modules/**',
  '**/.next/**',
  '**/.next-prod/**',
  '**/test-results/**',
  '**/coverage/**',
  '**/*.test.{tsx,jsx,ts,js}',
  '**/*.spec.{tsx,jsx,ts,js}',
];

function scanFile(filePath, content) {
  const violations = [];

  for (const [key, pattern] of Object.entries(PATTERNS)) {
    const matches = [...content.matchAll(pattern.regex)];

    if (matches.length > 0) {
      for (const [index, match] of matches.entries()) {
        const lines = content.substring(0, match.index).split('\n');
        const lineNumber = lines.length;
        const columnNumber = lines[lines.length - 1].length + 1;

        violations.push({
          type: key,
          name: pattern.name,
          description: pattern.description,
          suggestion: pattern.suggestion,
          file: filePath,
          line: lineNumber,
          column: columnNumber,
          match: match[0].slice(0, 100) + (match[0].length > 100 ? '...' : ''),
        });
      }
    }
  }

  return violations;
}

function generateReport(violations) {
  if (violations.length === 0) {
    console.log('✅ No component pattern violations found!');
    return;
  }

  console.log(`❌ Found ${violations.length} component pattern violations:\n`);

  // Group by pattern type
  const groupedViolations = violations.reduce((acc, violation) => {
    if (!acc[violation.type]) {
      acc[violation.type] = [];
    }
    acc[violation.type].push(violation);
    return acc;
  }, {});

  for (const [type, typeViolations] of Object.entries(groupedViolations)) {
    const pattern = PATTERNS[type];
    console.log(`\n🔍 ${pattern.name} (${typeViolations.length} violations)`);
    console.log(`   ${pattern.description}`);
    console.log(`   💡 ${pattern.suggestion}\n`);

    for (const violation of typeViolations) {
      console.log(`   📁 ${violation.file}:${violation.line}:${violation.column}`);
      console.log(`   📝 ${violation.match}`);
      console.log('');
    }
  }

  // Summary
  console.log('\n📊 Summary by Pattern:');
  for (const [type, typeViolations] of Object.entries(groupedViolations)) {
    console.log(`   ${PATTERNS[type].name}: ${typeViolations.length} violations`);
  }

  console.log('\n📊 Summary by File:');
  const fileViolations = violations.reduce((acc, violation) => {
    if (!acc[violation.file]) {
      acc[violation.file] = 0;
    }
    acc[violation.file]++;
    return acc;
  }, {});

  for (const [file, count] of Object.entries(fileViolations)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)) {
    console.log(`   ${file}: ${count} violations`);
  }
}

async function main() {
  console.log('🔍 Scanning for component pattern violations...\n');

  const allViolations = [];

  for (const scanPath of SCAN_PATHS) {
    const files = glob.sync(scanPath, { ignore: EXCLUDE_PATTERNS });

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const violations = scanFile(file, content);
        allViolations.push(...violations);
      } catch (error) {
        console.warn(`⚠️  Error reading file ${file}:`, error.message);
      }
    }
  }

  generateReport(allViolations);

  // Exit with error code if violations found
  if (allViolations.length > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

module.exports = { scanFile, generateReport, PATTERNS };
