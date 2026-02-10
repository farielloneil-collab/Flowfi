
const fs = require('fs');
const path = require('path');

const filePath = String.raw`d:\Web3 Work\Vibe Code\flowfi2\index.html`;
const outputDir = String.raw`d:\Web3 Work\Vibe Code\flowfi2\public\assets`;

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const content = fs.readFileSync(filePath, 'utf8');

// Find all data URI strings
const matches = [...content.matchAll(/data:image\/([a-zA-Z]+);base64,([^"]+)/g)];

console.log(`Found ${matches.length} matches.`);

matches.forEach((match, index) => {
    const ext = match[1];
    const data = match[2];
    console.log(`Match ${index}: extension=${ext}, data length=${data.length}`);
});

// Check specific comments
if (content.includes('<!-- Asset: FFtoken.svg -->')) {
    console.log('Includes FFtoken.svg comment');
}
if (content.includes('<!-- Asset: ecosystem.svg -->')) {
    console.log('Includes ecosystem.svg comment');
}
