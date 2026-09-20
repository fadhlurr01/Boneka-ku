const fs = require('fs');
const body = fs.readFileSync('extracted_body.html', 'utf8');

function extractSnippet(startId, endId, maxLen = 3000) {
    const idx = body.indexOf(`id="${startId}"`);
    if (idx === -1) {
        console.log(`id="${startId}" not found`);
        return;
    }
    console.log(`=== SNIPPET: ${startId} ===`);
    console.log(body.slice(idx, idx + maxLen));
}

extractSnippet('testimoni', 'klien', 2000);
extractSnippet('special', 'produk-baru', 2000);
extractSnippet('proses', 'testimoni', 2000);
extractSnippet('klien', 'kontak', 2000);
extractSnippet('page-layanan', 'page-tentang', 2000);
extractSnippet('page-tentang', 'page-kontak', 2000);
extractSnippet('page-kontak', 'page-artikel', 2000);
