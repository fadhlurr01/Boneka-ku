const fs = require('fs');

const css = fs.readFileSync('extracted_style_0.css', 'utf8');
console.log('CSS total length:', css.length);

// Check if @import or font links are in CSS
const imports = [...css.matchAll(/@import[^;]+;/g)];
console.log('Imports:', imports.map(i => i[0]));

// Check root variables
const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
if (rootMatch) {
    console.log('Root variables snippet:\n', rootMatch[1].slice(0, 500));
}

// Check dark mode
const darkMatch = css.match(/\[data-theme=["']?dark["']?\]\s*\{([\s\S]*?)\}/);
if (darkMatch) {
    console.log('Dark mode snippet:\n', darkMatch[1].slice(0, 500));
}
