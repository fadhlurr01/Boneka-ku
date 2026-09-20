const fs = require('fs');

const body = fs.readFileSync('extracted_body.html', 'utf8');

function showSection(name, startTag, endTag) {
    const s = body.indexOf(startTag);
    const e = endTag ? body.indexOf(endTag, s) : s + 2000;
    if (s !== -1) {
        console.log(`=== ${name} ===`);
        console.log(body.slice(s, e !== -1 ? e : s + 2000));
    }
}

showSection('FOOTER', '<footer class="site-footer"', '</footer>');
showSection('WA WIDGET', '<div class="wa-widget"', '</div>\n</div>\n</div>');
showSection('LIGHTBOX', '<div class="lightbox"', '</div>\n</div>');
