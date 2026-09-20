const fs = require('fs');

const s3 = fs.readFileSync('extracted_script_3.js', 'utf8');

// Search for data definitions: PRODUCTS, CATEGORIES, ARTICLES, etc.
const matches = [...s3.matchAll(/(?:const|let|var)\s+([A-Za-z0-9_]+)\s*=\s*(\[[\s\S]*?\]|\{[\s\S]*?\});/g)];
console.log('Total variable assignments found:', matches.length);
matches.forEach(m => {
    const varName = m[1];
    const val = m[2];
    if (val.length > 200 || ['products', 'categories', 'articles', 'testimonials', 'clients', 'services'].some(k => varName.toLowerCase().includes(k))) {
        console.log(`Variable: ${varName} (length: ${val.length})`);
        fs.writeFileSync(`extracted_var_${varName}.json`, val, 'utf8');
    }
});
