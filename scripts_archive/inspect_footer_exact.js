const fs = require('fs');

const body = fs.readFileSync('extracted_body.html', 'utf8');
const fStart = body.indexOf('<footer');
const fEnd = body.indexOf('</footer>', fStart);
if (fStart !== -1 && fEnd !== -1) {
    console.log(body.slice(fStart, fEnd + 9));
}
