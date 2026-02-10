
const fs = require('fs');

const file = String.raw`d:\Web3 Work\Vibe Code\flowfi2\index.html`;
const outFile = String.raw`d:\Web3 Work\Vibe Code\flowfi2\found_animations_utf8.txt`;

try {
    const data = fs.readFileSync(file, 'utf8');
    const lines = data.split('\n');
    let output = '';
    lines.forEach((line, index) => {
        if (index >= 400 && index <= 800) {
            if (/transition-transform|duration-\d+|group-hover:[^\s"]+|ease-[a-z]+/.test(line)) {
                output += `${index + 1}: ${line.trim()}\n`;
            }
        }
    });
    fs.writeFileSync(outFile, output, 'utf8');
    console.log("Done");
} catch (err) {
    console.error(err);
}
