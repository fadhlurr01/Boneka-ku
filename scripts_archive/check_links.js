const fs = require('fs');

const html = fs.readFileSync('extracted_outputTemplate.html', 'utf8');
const links = [...html.matchAll(/<link[^>]*>/gi)];
console.log('Links in template:', links.map(l => l[0]));
