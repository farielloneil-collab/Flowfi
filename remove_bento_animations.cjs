
const fs = require('fs');
const file = String.raw`d:\Web3 Work\Vibe Code\flowfi2\index.html`;

try {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove arrow animation
    content = content.replace(/class="group-hover:translate-x-1 transition-transform"/g, 'class=""');

    // 2. Remove card hover shadow and transition
    content = content.replace(/hover:shadow-lg transition-shadow duration-300/g, '');

    // 3. Remove image transition-all and duration
    content = content.replace(/transition-all duration-700/g, '');

    // 4. Remove grayscale hover effect
    content = content.replace(/group-hover:grayscale-0/g, '');

    // 5. Remove specific group translations
    content = content.replace(/transition-transform duration-700 ease-out group-hover:[-]?translate-x-\d+ group-hover:[-]?translate-y-\d+/g, '');

    // 6. Cleanup extra spaces in class attributes
    content = content.replace(/class="\s+"/g, 'class=""');
    content = content.replace(/\s+>/g, '>');

    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully updated index.html");

} catch (err) {
    console.error(err);
}
