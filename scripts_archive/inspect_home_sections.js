const fs = require('fs');

const body = fs.readFileSync('extracted_body.html', 'utf8');

function printSection(id, max = 2500) {
    const idx = body.indexOf(`id="${id}"`);
    if (idx !== -1) {
        console.log(`\n================= [SECTION: ${id}] =================`);
        console.log(body.slice(idx, idx + max));
    }
}

printSection('page-home', 3000);
printSection('kategori', 2500);
printSection('favorite', 2500);
printSection('special', 2500);
printSection('produk-baru', 2500);
