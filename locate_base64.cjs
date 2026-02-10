
const fs = require('fs');

const filePath = String.raw`d:\Web3 Work\Vibe Code\flowfi2\index.html`;
const content = fs.readFileSync(filePath, 'utf8');

const regex = /data:image\/[a-zA-Z]+;base64,[^"]+/g;
let match;
const locations = [];

while ((match = regex.exec(content)) !== null) {
    // Find the line number
    const linesUpToMatch = content.substring(0, match.index).split('\n');
    const lineNum = linesUpToMatch.length;

    // Find surrounding context (e.g. is it inside an SVG?)
    const startObj = content.lastIndexOf('<svg', match.index);
    const endObj = content.indexOf('</svg>', match.index);
    const context = (startObj !== -1 && endObj !== -1 && endObj > match.index) ? 'Inside SVG' : 'Unknown';

    locations.push({
        line: lineNum,
        context: context,
        length: match[0].length,
        svgStat: startObj
    });
}

console.log(JSON.stringify(locations, null, 2));
