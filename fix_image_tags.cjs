
const fs = require('fs');
const path = require('path');

const indexHtmlPath = String.raw`d:\Web3 Work\Vibe Code\flowfi2\index.html`;

let content = fs.readFileSync(indexHtmlPath, 'utf8');

// Pattern: xlink:href="/assets/..." without a closing quote before the tag end or next attribute
// We see the specific failure mode is `...png />`
// Let's indiscriminately find any `xlink:href="/assets/..."` that doesn't end with a quote.

// Look for `xlink:href="/assets/FILENAME` followed by ` />` or ` >` or whitespace.
// And specifically where the quote is MISSING.
// If it was correct, it would be `...png" />`
// If incorrect, it is `...png />`

const regex = /(xlink:href="\/assets\/[^"]+?)(\s*\/?>)/g;

let count = 0;
const newContent = content.replace(regex, (match, p1, p2) => {
    // p1 is `xlink:href="/assets/filename.png`
    // p2 is ` />` or `/>`
    // Check if p1 already ends with quote? 
    // The regex `[^"]+` ensures we don't consume a quote if it matches.
    // But if the quote IS simply missing, p1 will capture until whitespace or `/>`.
    // Wait, `[^"]` matches non-quote. `/>` contains non-quotes.
    // So `[^"]+` would greedily consume ` />` if `>` is not excluded?
    // `>` is not `"`.
    // So `[^"]+` includes ` />`.
    // My regex needs to be tighter.

    return match; // Placeholder
});

// Better regex:
// Match `xlink:href="/assets/` then any non-quote non-whitespace chars, then space or `/>`, WITHOUT a quote in between.
const betterRegex = /(xlink:href="\/assets\/[\w\d._-]+)(\s*\/?>)/g;

const fixedContent = content.replace(betterRegex, (match, p1, p2) => {
    count++;
    return `${p1}"${p2}`;
});

console.log(`Fixed ${count} image tags.`);
fs.writeFileSync(indexHtmlPath, fixedContent, 'utf8');
