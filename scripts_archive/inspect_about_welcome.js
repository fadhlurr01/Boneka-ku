const fs = require('fs');

const body = fs.readFileSync('extracted_body.html', 'utf8');
const s = body.indexOf('<div class="about-welcome">');
console.log(body.slice(s, s + 2500));
