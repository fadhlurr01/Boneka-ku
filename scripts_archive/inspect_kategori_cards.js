const fs = require('fs');

const body = fs.readFileSync('extracted_body.html', 'utf8');
const s = body.indexOf('<section class="section" id="kategori">');
const e = body.indexOf('<section class="section section-alt" id="favorite">');
if (s !== -1 && e !== -1) {
    console.log(body.slice(s, e));
}
