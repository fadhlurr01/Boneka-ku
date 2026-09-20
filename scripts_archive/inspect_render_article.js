const fs = require('fs');

const s3 = fs.readFileSync('extracted_script_3.js', 'utf8');
const s = s3.indexOf('function renderArticleGrid(');
if (s !== -1) {
    console.log(s3.slice(s, s + 1500));
}
