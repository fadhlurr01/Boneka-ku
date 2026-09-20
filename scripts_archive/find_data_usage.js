const fs = require('fs');
const s3 = fs.readFileSync('extracted_script_3.js', 'utf8');

function findUsage(varName) {
    console.log(`=== USAGE OF ${varName} ===`);
    let pos = 0;
    while ((pos = s3.indexOf(varName, pos)) !== -1) {
        const start = Math.max(0, pos - 100);
        const end = Math.min(s3.length, pos + 300);
        console.log(s3.slice(start, end).replace(/\r?\n/g, ' '));
        console.log('---');
        pos += varName.length;
    }
}

findUsage('PRODUCTS_RAW');
findUsage('ARTICLES_RAW');
findUsage('CAT_INFO');
