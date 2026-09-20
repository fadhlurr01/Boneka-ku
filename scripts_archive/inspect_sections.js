const fs = require('fs');

for (let i = 0; i < 4; i++) {
    const s = fs.readFileSync(`extracted_script_${i}.js`, 'utf8');
    console.log(`=== Script ${i} (${s.length} chars) ===`);
    console.log(s.slice(0, 300).replace(/\r?\n/g, ' '));
}

const body = fs.readFileSync('extracted_body.html', 'utf8');
// Find main elements, ids, sections
const sections = [...body.matchAll(/<(?:section|div|header|nav|footer|main)[^>]*id=["']([^"']+)["'][^>]*>/gi)];
console.log('\n=== IDs found in body ===');
sections.forEach(s => console.log(s[0].slice(0, 100)));
