const fs = require('fs');

const content = fs.readFileSync('boneka-ku.html', 'utf8');

const match = content.match(/<script\s+id="preloaded-generator-data"[^>]*>([\s\S]*?)<\/script>/i);
if (!match) {
    console.log('preloaded-generator-data not found!');
    process.exit(1);
}

const data = JSON.parse(match[1]);
console.log('Keys in data:', Object.keys(data));
console.log('ModelText length:', data.modelText ? data.modelText.length : 0);

if (data.modelText) {
    fs.writeFileSync('extracted_modelText.txt', data.modelText, 'utf8');
    console.log('Wrote extracted_modelText.txt');
    
    // Check first 1000 characters
    console.log('--- First 1000 chars ---');
    console.log(data.modelText.slice(0, 1000));
}
