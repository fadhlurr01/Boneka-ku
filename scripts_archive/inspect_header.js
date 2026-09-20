const fs = require('fs');

const body = fs.readFileSync('extracted_body.html', 'utf8');
const headerIdx = body.indexOf('<header id="siteHeader"');
const mainIdx = body.indexOf('<main id="main">');
if (headerIdx !== -1 && mainIdx !== -1) {
    console.log(body.slice(headerIdx, mainIdx));
}
