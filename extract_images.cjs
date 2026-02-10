
const fs = require('fs');
const path = require('path');

const projectRoot = String.raw`d:\Web3 Work\Vibe Code\flowfi2`;
const indexHtmlPath = path.join(projectRoot, 'index.html');
const assetsDir = path.join(projectRoot, 'public', 'assets');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

let content = fs.readFileSync(indexHtmlPath, 'utf8');

// Regex to capture the tag ID and the base64 content
// Looking for id="..." then later xlink:href="data:image/png;base64,..."
// OR just find the base64 and try to find the ID nearby.
// simpler: iterate all matches of base64, find the ID in the surrounding tag.

const matches = [];
const regex = /<image[^>]*?id="([^"]+)"[^>]*?xlink:href="data:image\/png;base64,([^"]+)"/g;

let match;
while ((match = regex.exec(content)) !== null) {
    matches.push({
        fullMatch: match[0],
        id: match[1],
        data: match[2],
        index: match.index
    });
}

console.log(`Found ${matches.length} matches.`);

// Process matches in reverse order to avoid messing up indices if we were using them (though we are doing string replacement)
// Actually we can just do string replacement.

let newContent = content;

for (const m of matches) {
    const filename = `${m.id}.png`;
    const filePath = path.join(assetsDir, filename);
    const relativePath = `./public/assets/${filename}`;

    console.log(`Processing ${m.id} -> ${filename} (${m.data.length} bytes)`);

    const buffer = Buffer.from(m.data, 'base64');
    fs.writeFileSync(filePath, buffer);

    // Replace in content
    // We replace the specific data URI with the file path
    // Be careful to only replace this specific instance? 
    // The match.data is unique enough usually, but let's be safe and replace the whole href attribute or just the data part in the context we found.

    // Construct the replacement string for the href attribute
    // The regex matched the whole <image ... href="..."> part up to the closing quote.
    // Actually my regex `regex` captures the ID and the Data.
    // The `match[0]` contains the beginning of the tag up to the end of the base64 string (excluding the closing quote because `[^"]+` stops at quote).

    // Let's just text replace the base64 part with the relative path.
    // Since `m.data` matches strictly the base64 string.

    // However, string.replace(str, newStr) only replaces the first occurrence?
    // And if multiple images have SAME content?
    // We should be careful. 

    // Better approach: Reconstruct the new tag part using the ID.
    // But the tag might have other attributes between ID and href.

    // Safe approach: Split content into chunks based on match indices?
    // `matches` are found in order.

}

// Let's re-architecture the loop to build top-down string
let result = '';
let lastIndex = 0;

// Need to re-run regex to ensure we process in order
let loopMatch;
const loopRegex = /<image[^>]*?id="([^"]+)"[^>]*?xlink:href="data:image\/png;base64,([^"]+)"/g;

while ((loopMatch = loopRegex.exec(content)) !== null) {
    const fullMatchLength = loopMatch[0].length;
    const id = loopMatch[1];
    const base64Data = loopMatch[2];
    const startIndex = loopMatch.index;

    // Append text before this match
    result += content.substring(lastIndex, startIndex);

    // Identify the part BEFORE the href
    // We know loopMatch[0] is `<image ... href="data:..."` (no closing quote for href yet)

    // We want to keep everything before `data:image...` and replace `data:image...` with path.
    const splitPoint = loopMatch[0].lastIndexOf('data:image/png;base64,');
    const tagPrefix = loopMatch[0].substring(0, splitPoint);

    const filename = `${id}.png`;
    const filePath = path.join(assetsDir, filename);
    const relativePath = `./public/assets/${filename}`;

    // Write file
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, buffer);
    console.log(`Saved ${filename}`);

    // Append new tag part
    result += tagPrefix + relativePath;

    lastIndex = startIndex + fullMatchLength;
}

// Append remaining content
result += content.substring(lastIndex);

fs.writeFileSync(indexHtmlPath, result, 'utf8');
console.log("Done updating index.html");
