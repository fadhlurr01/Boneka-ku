const fs = require('fs');

const body = fs.readFileSync('extracted_body.html', 'utf8');
const s = body.indexOf('<section class="page" id="page-tentang">');
const e = body.indexOf('<section class="page" id="page-kontak">');
if (s !== -1 && e !== -1) {
    console.log(body.slice(s, e));
}
