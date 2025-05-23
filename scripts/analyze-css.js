#!/usr/bin/env node

/**
 * CSS Analysis Script
 * Analyzes the production CSS bundle to identify potential optimizations
 */

const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');

function analyzeCSSBundle() {
  const buildDir = fs.existsSync('.next-prod') ? '.next-prod' : '.next';
  const cssDir = path.join(buildDir, 'static/css');

  if (!fs.existsSync(cssDir)) {
    console.log('❌ No CSS directory found. Run npm run build first.');
    return;
  }

  const cssFiles = glob.sync(`${cssDir}/*.css`);

  if (cssFiles.length === 0) {
    console.log('❌ No CSS files found in build output.');
    return;
  }

  console.log('📊 CSS Bundle Analysis\n');

  let totalSize = 0;
  let tailwindClasses = 0;
  let customClasses = 0;

  for (const file of cssFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const size = Buffer.byteLength(content, 'utf8');
    totalSize += size;

    // Count Tailwind utility classes (rough estimate)
    const twMatches = content.match(/\.(bg-|text-|p-|m-|w-|h-|flex|grid|border)/g);
    tailwindClasses += twMatches ? twMatches.length : 0;

    // Count custom classes
    const customMatches = content.match(/\.[a-zA-Z][a-zA-Z0-9_-]*\{/g);
    customClasses += customMatches ? customMatches.length : 0;

    console.log(`📄 ${path.basename(file)}: ${(size / 1024).toFixed(2)} KB`);
  }

  console.log(`\n📈 Total CSS Size: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log(`🎨 Estimated Tailwind Classes: ${tailwindClasses}`);
  console.log(`✨ Custom Classes: ${customClasses}`);

  if (totalSize > 50 * 1024) {
    // More than 50KB
    console.log('\n⚠️  CSS bundle is large. Consider:');
    console.log('   • Removing unused custom CSS');
    console.log('   • Checking for duplicate Tailwind utilities');
    console.log('   • Using dynamic imports for page-specific styles');
  } else {
    console.log('\n✅ CSS bundle size looks good!');
  }
}

if (require.main === module) {
  analyzeCSSBundle();
}

module.exports = { analyzeCSSBundle };
