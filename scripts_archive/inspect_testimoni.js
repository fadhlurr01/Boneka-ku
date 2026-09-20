const fs = require('fs');

const body = fs.readFileSync('extracted_body.html', 'utf8');
const s = body.indexOf('<section class="section" id="testimoni">');
const e = body.indexOf('<section class="section section-alt clients" id="klien">');
if (s !== -1 && e !== -1) {
    console.log(body.slice(s, e));
}
