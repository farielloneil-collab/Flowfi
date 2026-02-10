
const fs = require('fs');
const path = require('path');

const indexHtmlPath = String.raw`d:\Web3 Work\Vibe Code\flowfi2\index.html`;

let content = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace ./public/assets/ with /assets/
// Matches exactly what I wrote in previous script
const newContent = content.replace(/\.\/public\/assets\//g, '/assets/');

fs.writeFileSync(indexHtmlPath, newContent, 'utf8');
console.log("Fixed paths for Vite");
