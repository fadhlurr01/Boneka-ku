const fs = require('fs');

const content = fs.readFileSync('boneka-ku.html', 'utf8');
console.log('Total length:', content.length);

const styleMatches = [...content.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
console.log('Style tags count:', styleMatches.length);
styleMatches.forEach((m, idx) => {
    console.log(`Style ${idx}: ${m[1].length} chars`);
});

const scriptMatches = [...content.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Script tags count:', scriptMatches.length);
scriptMatches.forEach((m, idx) => {
    console.log(`Script ${idx}: ${m[1].length} chars`);
});

// Let's also check title and meta tags
const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : 'None');
