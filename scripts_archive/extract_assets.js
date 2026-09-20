const fs = require('fs');

const html = fs.readFileSync('extracted_outputTemplate.html', 'utf8');
console.log('Length:', html.length);

const styleMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
console.log('Styles in outputTemplate:', styleMatches.length);
styleMatches.forEach((m, i) => {
    console.log(`Style ${i}: ${m[1].length} chars`);
    fs.writeFileSync(`extracted_style_${i}.css`, m[1], 'utf8');
});

const scriptMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Scripts in outputTemplate:', scriptMatches.length);
scriptMatches.forEach((m, i) => {
    console.log(`Script ${i}: ${m[1].length} chars`);
    fs.writeFileSync(`extracted_script_${i}.js`, m[1], 'utf8');
});

// Let's also extract the HTML structure without styles and scripts to see the DOM sections
let domOnly = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '<!-- STYLE -->')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '<!-- SCRIPT -->');
fs.writeFileSync('extracted_body.html', domOnly, 'utf8');
console.log('Wrote extracted_body.html, length:', domOnly.length);
