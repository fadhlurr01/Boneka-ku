const fs = require('fs');

const body = fs.readFileSync('extracted_body.html', 'utf8');

function printSnippet(startId, endId) {
    const s = body.indexOf(startId);
    const e = endId ? body.indexOf(endId, s) : s + 2000;
    if (s !== -1) {
        console.log(`\n=== SNIPPET: ${startId} ===`);
        console.log(body.slice(s, e !== -1 ? e : s + 2000));
    }
}

printSnippet('id="proses"', 'id="testimoni"');
printSnippet('id="preFoot"', '<div class="wa-widget"');
