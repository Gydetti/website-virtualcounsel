#!/usr/bin/env node

const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');
const { execSync } = require('node:child_process');

async function main() {
    const rawBase = path.join(process.cwd(), 'assets/images/raw');
    const publicBase = path.join(process.cwd(), 'public/images');
    // Include existing placeholders in the optimization pipeline
    const publicRoot = path.join(process.cwd(), 'public');
    const placeholderFiles = [
        'placeholder-user.jpg',
        'placeholder.jpg',
        'placeholder.svg',
        'placeholder-logo.png',
        'placeholder-logo.svg',
    ];
    const placeholdersRaw = path.join(rawBase, 'placeholders');
    await fs.mkdir(placeholdersRaw, { recursive: true });
    for (const file of placeholderFiles) {
        const src = path.join(publicRoot, file);
        const dest = path.join(placeholdersRaw, file);
        try {
            await fs.copyFile(src, dest);
        } catch (err) {
            // ignore if placeholder file is missing
        }
    }

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

        // Skip non-directories (like .txt files)
        const stat = await fs.stat(rawDir);
        if (!stat.isDirectory()) {
            console.log(`Skipping non-directory: ${category}`);
            continue;
        }

        const outDir = path.join(publicBase, category);
        await fs.mkdir(outDir, { recursive: true });

        const files = await fs.readdir(rawDir);
        for (const file of files) {
            const ext = path.extname(file).slice(1).toLowerCase(); // e.g. 'jpg', 'png', 'svg'
            const inputPath = path.join(rawDir, file);
            const outputPath = path.join(outDir, file);

            // Copy original file for Next.js optimization on demand
            await fs.copyFile(inputPath, outputPath);

            // Only generate blur placeholders for supported raster formats
            const rasterExts = ['jpg', 'jpeg', 'png', 'webp'];
            if (!rasterExts.includes(ext)) {
                // Skip blur for unsupported formats (e.g., svg)
                continue;
            }
            try {
                // Generate a small blurred placeholder (20px wide)
                const buffer = await sharp(inputPath).resize({ width: 20 }).toBuffer();
                const dataUrl = `data:image/${ext};base64,${buffer.toString('base64')}`;

                // Map public URL to its blurDataURL
                const publicPath = `/images/${category}/${file}`;
                blurData[publicPath] = dataUrl;
            } catch (err) {
                console.warn(`⚠️ Could not generate blur for ${inputPath}: ${err.message}`);
            }

            // --- WebP conversion logic ---
            if (['jpg', 'jpeg', 'png'].includes(ext)) {
                const webpFile = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                const webpOutputPath = path.join(outDir, webpFile);
                try {
                    execSync(`cwebp -q 80 "${inputPath}" -o "${webpOutputPath}"`);
                    // Generate blur for webp
                    const webpBuffer = await sharp(webpOutputPath).resize({ width: 20 }).toBuffer();
                    const webpDataUrl = `data:image/webp;base64,${webpBuffer.toString('base64')}`;
                    const webpPublicPath = `/images/${category}/${webpFile}`;
                    blurData[webpPublicPath] = webpDataUrl;
                } catch (err) {
                    console.warn(`⚠️ Could not convert to WebP for ${inputPath}: ${err.message}`);
                }
            }
        }
    }

    // Write blurDataURL JSON map
    const blurJsonPath = path.join(publicBase, 'blurDataURL.json');
    await fs.writeFile(blurJsonPath, JSON.stringify(blurData, null, 2));

    console.log('✅ Image optimization complete.');
    console.log('  • Blur map: public/images/blurDataURL.json');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});