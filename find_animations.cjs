
const fs = require('fs');

const file = String.raw`d:\Web3 Work\Vibe Code\flowfi2\index.html`;

try {
    const data = fs.readFileSync(file, 'utf8');
    const lines = data.split('\n');
    lines.forEach((line, index) => {
        if (/transition-transform|duration-\d+|group-hover:[^\s"]+|ease-[a-z]+/.test(line)) {
            console.log(`${index + 1}: ${line.trim()}`);
        }
    });
} catch (err) {
    console.error(err);
}
