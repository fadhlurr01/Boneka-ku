const fs = require('fs');

console.log('=== CAT_INFO ===');
console.log(fs.readFileSync('extracted_var_CAT_INFO.json', 'utf8').slice(0, 500));

console.log('=== PRODUCTS_RAW ===');
console.log(fs.readFileSync('extracted_var_PRODUCTS_RAW.json', 'utf8').slice(0, 500));

console.log('=== ARTICLES_RAW ===');
console.log(fs.readFileSync('extracted_var_ARTICLES_RAW.json', 'utf8').slice(0, 500));
