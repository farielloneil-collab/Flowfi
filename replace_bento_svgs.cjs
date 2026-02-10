const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

console.log('Starting SVG replacement...');

// Card 1: FFtoken - Find and replace
const card1Comment = '<!-- Asset: FFtoken.svg -->';
const card1Start = html.indexOf(card1Comment);
if (card1Start !== -1) {
    // Find the SVG opening tag after the comment
    const svgStart = html.indexOf('<svg', card1Start);
    // Find the corresponding closing tag - look for the next </svg> after the opening
    let svgEnd = html.indexOf('</svg>', svgStart);
    if (svgEnd !== -1) {
        svgEnd += 6; // Include </svg>

        const card1Replacement = `<!-- Asset: FFtoken.svg -->
                    <img src="/assets/partners/FFtoken.svg" alt="FF Token" class="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-72 md:w-80 h-auto object-contain opacity-90 z-0">`;

        html = html.substring(0, card1Start) + card1Replacement + html.substring(svgEnd);
        console.log('✓ Replaced Card 1 (FFtoken)');
    }
}

// Card 2: Fairlaunch
const card2Comment = '<!-- Asset: Fairlaunch.svg -->';
const card2Start = html.indexOf(card2Comment);
if (card2Start !== -1) {
    const svgStart = html.indexOf('<svg', card2Start);
    let svgEnd = html.indexOf('</svg>', svgStart);
    if (svgEnd !== -1) {
        svgEnd += 6;

        const card2Replacement = `<!-- Asset: Fairlaunch.svg -->
                    <img src="/assets/partners/Fairlaunch.svg" alt="Fair Launch" class="absolute bottom-6 right-6 w-80 h-auto object-contain opacity-90 z-0">`;

        html = html.substring(0, card2Start) + card2Replacement + html.substring(svgEnd);
        console.log('✓ Replaced Card 2 (Fairlaunch)');
    }
}

// Card 3: ecosystem
const card3Comment = '<!-- Asset: ecosystem.svg -->';
const card3Start = html.indexOf(card3Comment);
if (card3Start !== -1) {
    const svgStart = html.indexOf('<svg', card3Start);
    let svgEnd = html.indexOf('</svg>', svgStart);
    if (svgEnd !== -1) {
        svgEnd += 6;

        const card3Replacement = `<!-- Asset: ecosystem.svg -->
                    <img src="/assets/partners/ecosystem.svg" alt="Ecosystem" class="absolute bottom-6 right-6 w-80 h-auto object-contain opacity-90 z-0">`;

        html = html.substring(0, card3Start) + card3Replacement + html.substring(svgEnd);
        console.log('✓ Replaced Card 3 (ecosystem)');
    }
}

// Card 4: collact
const card4Comment = '<!-- Asset: collact.svg -->';
const card4Start = html.indexOf(card4Comment);
if (card4Start !== -1) {
    const svgStart = html.indexOf('<svg', card4Start);
    let svgEnd = html.indexOf('</svg>', svgStart);
    if (svgEnd !== -1) {
        svgEnd += 6;

        const card4Replacement = `<!-- Asset: collact.svg -->
                    <img src="/assets/partners/collact.svg" alt="Deep Collateral" class="absolute bottom-6 right-6 w-80 h-auto object-contain opacity-90 z-0">`;

        html = html.substring(0, card4Start) + card4Replacement + html.substring(svgEnd);
        console.log('✓ Replaced Card 4 (collact)');
    }
}

// Save the file
fs.writeFileSync(htmlPath, html, 'utf-8');
console.log('\n✅ All bento box SVGs replaced successfully!');
