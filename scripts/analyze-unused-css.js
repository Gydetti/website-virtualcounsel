#!/usr/bin/env node

/**
 * Unused CSS Analysis Script
 * Analyzes globals.css and finds potentially unused CSS variables, classes, and animations
 */

const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');

function analyzeUnusedCSS() {
  console.log('🔍 Analyzing CSS Usage...\n');

  // Read globals.css
  const globalsPath = 'app/globals.css';
  if (!fs.existsSync(globalsPath)) {
    console.log('❌ globals.css not found');
    return;
  }

  const globalsContent = fs.readFileSync(globalsPath, 'utf8');

  // Extract CSS variables from globals.css
  const cssVarMatches = globalsContent.match(/--[\w-]+/g) || [];
  const cssVars = [...new Set(cssVarMatches)];

  // Extract custom CSS classes
  const customClassMatches = globalsContent.match(/\.[\w-]+(?=\s*{)/g) || [];
  const customClasses = [...new Set(customClassMatches.map(cls => cls.slice(1)))]; // Remove the dot

  // Extract animation names
  const animationMatches = globalsContent.match(/@keyframes\s+([\w-]+)/g) || [];
  const animations = [...new Set(animationMatches.map(match => match.replace('@keyframes ', '')))];

  // Find all relevant source files
  const sourceFiles = [
    ...glob.sync('app/**/*.{tsx,ts}'),
    ...glob.sync('components/**/*.{tsx,ts}'),
    ...glob.sync('lib/**/*.{tsx,ts}'),
    ...glob.sync('hooks/**/*.{tsx,ts}'),
    'tailwind.config.ts',
  ];

  let allSourceContent = '';
  for (const file of sourceFiles) {
    allSourceContent += `${fs.readFileSync(file, 'utf8')}\n`;
  }

  // Check usage of CSS variables
  const unusedVars = cssVars.filter(cssVar => {
    const varName = cssVar.replace('--', '');
    return (
      !allSourceContent.includes(cssVar) &&
      !allSourceContent.includes(`var(${cssVar})`) &&
      !allSourceContent.includes(varName)
    );
  });

  // Check usage of custom classes
  const unusedClasses = customClasses.filter(className => {
    return (
      !allSourceContent.includes(className) &&
      !allSourceContent.includes(`.${className}`) &&
      !globalsContent.includes(`.${className}:`)
    ); // Not used in hover/focus variants
  });

  // Check usage of animations
  const unusedAnimations = animations.filter(animation => {
    return (
      !allSourceContent.includes(animation) &&
      !allSourceContent.includes(`animation: ${animation}`) &&
      !allSourceContent.includes(`animate-${animation}`)
    );
  });

  // Calculate savings potential
  const totalLines = globalsContent.split('\n').length;
  const potentialSavings = unusedVars.length + unusedClasses.length + unusedAnimations.length;

  console.log('📊 CSS Usage Analysis');
  console.log(`📄 Total lines in globals.css: ${totalLines}`);
  console.log(`🎨 CSS Variables defined: ${cssVars.length}`);
  console.log(`✨ Custom classes defined: ${customClasses.length}`);
  console.log(`🎭 Animations defined: ${animations.length}\n`);

  if (unusedVars.length > 0) {
    console.log(`⚠️  Potentially unused CSS variables (${unusedVars.length}):`);
    for (const v of unusedVars.slice(0, 10)) {
      console.log(`   ${v}`);
    }
    if (unusedVars.length > 10) console.log(`   ... and ${unusedVars.length - 10} more`);
    console.log('');
  }

  if (unusedClasses.length > 0) {
    console.log(`⚠️  Potentially unused custom classes (${unusedClasses.length}):`);
    for (const c of unusedClasses.slice(0, 10)) {
      console.log(`   .${c}`);
    }
    if (unusedClasses.length > 10) console.log(`   ... and ${unusedClasses.length - 10} more`);
    console.log('');
  }

  if (unusedAnimations.length > 0) {
    console.log(`⚠️  Potentially unused animations (${unusedAnimations.length}):`);
    for (const a of unusedAnimations.slice(0, 10)) {
      console.log(`   @keyframes ${a}`);
    }
    if (unusedAnimations.length > 10)
      console.log(`   ... and ${unusedAnimations.length - 10} more`);
    console.log('');
  }

  if (potentialSavings === 0) {
    console.log('✅ No obviously unused CSS found!');
  } else {
    console.log(`💡 Potential optimizations: ${potentialSavings} unused definitions`);
    console.log('   Review and remove unused CSS to reduce bundle size');
  }

  // Check for redundant pattern utilities
  const patternClasses = customClasses.filter(c => c.includes('pattern') || c.includes('bg-'));
  if (patternClasses.length > 5) {
    console.log(`\n🎨 Found ${patternClasses.length} pattern-related classes`);
    console.log('   Consider consolidating or removing unused patterns');
  }
}

if (require.main === module) {
  analyzeUnusedCSS();
}

module.exports = { analyzeUnusedCSS };
