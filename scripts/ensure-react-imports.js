#!/usr/bin/env node

const glob = require('glob');
const fs = require('node:fs');
const path = require('node:path');

// Patterns for TSX files in key directories
const patterns = ['app/**/*.tsx', 'components/**/*.tsx', 'hooks/**/*.tsx'];

for (const pattern of patterns) {
    for (const file of glob.sync(pattern, { absolute: true })) {
        const content = fs.readFileSync(file, 'utf8');
        // If file uses React namespace but does not import React (default or namespace)
        const hasDefaultImport = /import\s+React\s+from\s+['\"]react['\"]/.test(content);
        const hasNamespaceImport = /import\s+\*\s+as\s+React\s+from\s+['\"]react['\"]/.test(content);
        if (/React\./.test(content) && !hasDefaultImport && !hasNamespaceImport) {
            const newContent = `import React from "react";\n${content}`;
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Injected React import into ${path.relative(process.cwd(), file)}`);
        }
    }
}

console.log('React import injection complete.');