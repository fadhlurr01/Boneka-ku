const fs = require('fs');

const content = fs.readFileSync('boneka-ku.html', 'utf8');
const match = content.match(/<script\s+id="preloaded-generator-data"[^>]*>([\s\S]*?)<\/script>/i);
const data = JSON.parse(match[1]);

console.log('outputTemplate length:', data.outputTemplate ? data.outputTemplate.length : 0);
if (data.outputTemplate) {
    fs.writeFileSync('extracted_outputTemplate.html', data.outputTemplate, 'utf8');
    console.log('Wrote extracted_outputTemplate.html');
}

if (data.srcManifest) {
    fs.writeFileSync('extracted_srcManifest.json', JSON.stringify(data.srcManifest, null, 2), 'utf8');
    console.log('Wrote extracted_srcManifest.json');
}
