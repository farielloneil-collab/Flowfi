
const fs = require('fs');
const path = require('path');

const filePath = String.raw`d:\Web3 Work\Vibe Code\flowfi2\index.html`;

const replacements = [
    { old: 'class="transition-transform duration-700 ease-out group-hover:translate-x-3 group-hover:translate-y-3"', new: '' },
    { old: 'class="transition-transform duration-700 ease-out group-hover:-translate-x-3 group-hover:-translate-y-3"', new: '' },
    { old: 'class="motion-lines-top transition-transform duration-500 ease-out group-hover:-translate-x-6 group-hover:-translate-y-6"', new: 'class="motion-lines-top"' },
    { old: 'class="motion-lines-bottom transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:translate-y-6"', new: 'class="motion-lines-bottom"' },
    { old: 'class="transition-transform duration-700 ease-out group-hover:-translate-y-4"', new: '' },
    { old: 'class="transition-transform duration-700 ease-out group-hover:translate-x-8 group-hover:-translate-y-8"', new: '' },
    { old: 'class="transition-transform duration-700 ease-out group-hover:-translate-x-8 group-hover:-translate-y-8"', new: '' }
];

try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    replacements.forEach(rep => {
        content = content.replace(rep.old, rep.new);
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Successfully updated index.html");
    } else {
        console.log("No changes needed or patterns not found.");
    }
} catch (e) {
    console.error(`Error: ${e}`);
}
