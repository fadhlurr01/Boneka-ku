const fs = require('fs');

const content = fs.readFileSync('boneka-ku.html', 'utf8');

// Let's inspect where the actual bonekaku HTML/CSS/content is.
// Search for keywords like "bonekaku", "Bean Bag", "Boneka Souvenir", "katalog", "testimonial"
const keywords = ['bonekaku', 'Bean Bag', 'Boneka Souvenir', 'katalog', 'testimonial', 'layanan', 'bantal'];
keywords.forEach(kw => {
    let count = 0;
    let pos = 0;
    while ((pos = content.toLowerCase().indexOf(kw.toLowerCase(), pos)) !== -1) {
        count++;
        pos += kw.length;
    }
    console.log(`Keyword '${kw}': ${count} occurrences`);
});

// Let's find script tags and their first 100 chars or attributes
const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let match;
let idx = 0;
while ((match = scriptRegex.exec(content)) !== null) {
    const attrs = match[1];
    const body = match[2];
    const preview = body.slice(0, 150).replace(/\s+/g, ' ');
    console.log(`Script ${idx} (attrs: ${attrs}, len: ${body.length}): ${preview}`);
    idx++;
}
