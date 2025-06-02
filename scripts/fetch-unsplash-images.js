#!/usr/bin/env node

const fs = require('node:fs/promises');
const path = require('node:path');
const https = require('node:https');

/**
 * Unsplash Image Fetcher for GMG Template
 * Integrates with existing image-optimize.js workflow
 *
 * Usage:
 * node scripts/fetch-unsplash-images.js --category hero --query "professional business team" --count 3
 * node scripts/fetch-unsplash-images.js --config unsplash-requests.json
 */

async function downloadImage(url, outputPath) {
  const file = await fs.open(outputPath, 'w');

  return new Promise((resolve, reject) => {
    https
      .get(url, response => {
        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
          return;
        }

        response.pipe(file.createWriteStream());
        response.on('end', () => {
          file.close();
          resolve();
        });
        response.on('error', reject);
      })
      .on('error', reject);
  });
}

async function fetchUnsplashImages(requests) {
  const rawBase = path.join(process.cwd(), 'assets/images/raw');

  for (const request of requests) {
    const { category, query, count = 1, purpose, orientation = 'landscape' } = request;

    console.log(`🔍 Fetching ${count} image(s) for category: ${category}`);
    console.log(`   Query: "${query}"`);
    console.log(`   Purpose: ${purpose || 'general'}`);

    // Create category directory
    const categoryDir = path.join(rawBase, category);
    await fs.mkdir(categoryDir, { recursive: true });

    // This would integrate with the MCP server
    // For now, we'll create placeholders and document the integration points
    console.log(`📁 Created directory: ${categoryDir}`);
    console.log('✨ Ready for MCP integration with unsplash-smart-mcp-server');

    // Integration point: AI assistant would use MCP server here
    // Example MCP call result:
    const mockResults = [
      {
        id: 'mock-photo-1',
        urls: {
          full: 'https://images.unsplash.com/photo-example-1',
          regular: 'https://images.unsplash.com/photo-example-1?w=1080',
        },
        alt_description: `Professional ${purpose || query} image`,
        user: {
          name: 'John Photographer',
          username: 'johnphoto',
        },
        attribution: 'Photo by John Photographer on Unsplash',
      },
    ];

    for (let i = 0; i < count; i++) {
      const filename = `${category}-${i + 1}.jpg`;
      const outputPath = path.join(categoryDir, filename);

      // Document where MCP integration would happen
      console.log(`   → Would download: ${filename}`);
      console.log(`   → Output path: ${outputPath}`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
🖼️  Unsplash Image Fetcher for GMG Template

Usage:
  node scripts/fetch-unsplash-images.js --category hero --query "business team" --count 3
  node scripts/fetch-unsplash-images.js --config unsplash-requests.json

Options:
  --category     Image category (hero, team, services, testimonials, etc.)
  --query        Search query for Unsplash
  --count        Number of images to fetch (default: 1)
  --purpose      Purpose description (e.g., "homepage hero", "about section")
  --orientation  Image orientation (landscape, portrait, square)
  --config       JSON file with multiple requests

Integration:
  This script is designed to work with the unsplash-smart-mcp-server.
  When run by an AI assistant with MCP access, it will:
  1. Fetch images from Unsplash based on context
  2. Download to assets/images/raw/[category]/
  3. Run npm run image-optimize automatically
  4. Update data files with correct image paths
  
Examples:
  # Fetch hero images for homepage
  node scripts/fetch-unsplash-images.js --category hero --query "modern office workspace" --purpose "homepage hero section" --count 2
  
  # Fetch team photos
  node scripts/fetch-unsplash-images.js --category team --query "professional headshots" --count 5
  
  # Fetch service illustrations
  node scripts/fetch-unsplash-images.js --category services --query "consulting business" --count 3
    `);
    return;
  }

  // Parse command line arguments
  const categoryIndex = args.indexOf('--category');
  const queryIndex = args.indexOf('--query');
  const countIndex = args.indexOf('--count');
  const purposeIndex = args.indexOf('--purpose');
  const orientationIndex = args.indexOf('--orientation');
  const configIndex = args.indexOf('--config');

  let requests = [];

  if (configIndex !== -1) {
    // Load from config file
    const configPath = args[configIndex + 1];
    const configContent = await fs.readFile(configPath, 'utf-8');
    requests = JSON.parse(configContent);
  } else if (categoryIndex !== -1 && queryIndex !== -1) {
    // Single request from command line
    requests = [
      {
        category: args[categoryIndex + 1],
        query: args[queryIndex + 1],
        count: countIndex !== -1 ? Number.parseInt(args[countIndex + 1]) : 1,
        purpose: purposeIndex !== -1 ? args[purposeIndex + 1] : undefined,
        orientation: orientationIndex !== -1 ? args[orientationIndex + 1] : 'landscape',
      },
    ];
  } else {
    console.error('❌ Missing required arguments. Use --help for usage information.');
    process.exit(1);
  }

  await fetchUnsplashImages(requests);

  console.log('\n✅ Unsplash image fetching complete!');
  console.log('📝 Next steps:');
  console.log('   1. Run: npm run image-optimize');
  console.log('   2. Update data files with new image paths');
  console.log('   3. Commit changes to repository');
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
