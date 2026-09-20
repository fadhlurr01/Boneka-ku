const fs = require('fs');

const s2 = fs.readFileSync('extracted_script_2.js', 'utf8');

// Find DICT
const dictMatch = s2.match(/var\s+DICT\s*=\s*(\{[\s\S]*?\});\s*(?:function|var|let|const)/);
if (dictMatch) {
    console.log('DICT found, length:', dictMatch[1].length);
    fs.writeFileSync('extracted_dict.json', dictMatch[1], 'utf8');
} else {
    console.log('DICT pattern not matched directly, extracting between DICT and function');
    const start = s2.indexOf('var DICT = {');
    const end = s2.indexOf('function t(s)');
    if (start !== -1 && end !== -1) {
        const dictStr = s2.slice(start + 'var DICT = '.length, end).trim().replace(/;$/, '');
        fs.writeFileSync('extracted_dict.json', dictStr, 'utf8');
        console.log('Saved dict, length:', dictStr.length);
    }
}
