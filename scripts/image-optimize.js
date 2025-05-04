#!/usr/bin/env node

const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

async function main() {
    const rawBase = path.join(process.cwd(), 'assets/images/raw');
    const publicBase = path.join(process.cwd(), 'public/images');
    const blurData = {};

    // Ensure public/images folder exists
    await fs.mkdir(publicBase, { recursive: true });

    // Read categories (branding, team, services, blog, testimonials), skip if raw folder missing
    let categories;
    try {
        categories = await fs.readdir(rawBase);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.warn(`⚠️ Raw images directory not found at ${rawBase}, skipping image optimization.`);
            // Write empty blur map to satisfy build
            const blurJsonPath = path.join(publicBase, 'blurDataURL.json');
            await fs.writeFile(blurJsonPath, JSON.stringify({}, null, 2));
            console.log('✅ No raw images to optimize.');
            return;
        }
        throw err;
    }

    for (const category of categories) {
        const rawDir = path.join(rawBase, category);
        const outDir = path.join(publicBase, category);
        await fs.mkdir(outDir, { recursive: true });

        const files = await fs.readdir(rawDir);
        for (const file of files) {
            const ext = path.extname(file).slice(1); // e.g. 'jpg', 'png'
            const inputPath = path.join(rawDir, file);
            const outputPath = path.join(outDir, file);

            // Copy original file for Next.js optimization on demand
            await fs.copyFile(inputPath, outputPath);

            // Generate a small blurred placeholder (20px wide)
            const buffer = await sharp(inputPath)
                .resize({ width: 20 })
                .toBuffer();
            const dataUrl = `data:image/${ext};base64,${buffer.toString('base64')}`;

            // Map public URL to its blurDataURL
            const publicPath = `/images/${category}/${file}`;
            blurData[publicPath] = dataUrl;
        }
    }

    // Write blurDataURL JSON map
    const blurJsonPath = path.join(publicBase, 'blurDataURL.json');
    await fs.writeFile(blurJsonPath, JSON.stringify(blurData, null, 2));

    console.log('✅ Image optimization complete.');
    console.log("  • Blur map: public/images/blurDataURL.json");
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});