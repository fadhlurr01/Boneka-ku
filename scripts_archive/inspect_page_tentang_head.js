const fs = require('fs');

const body = fs.readFileSync('extracted_body.html', 'utf8');
const s = body.indexOf('<section class="page" id="page-tentang">');
console.log(body.slice(s, s + 1500));
