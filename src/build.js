const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// 1. Read the HTML template
let htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// 2. Read the CSS file
const cssContent = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

// 3. Read the JS file
let jsContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

// 4. Read the generated JSON data
const talksData = fs.readFileSync(path.join(distDir, 'talks.json'), 'utf8');

// 5. Inline CSS
htmlContent = htmlContent.replace(
    '<link rel="stylesheet" href="style.css">',
    `<style>${cssContent}</style>`
);

// 6. Inline JavaScript data
// Replace the fetch call with the actual data
jsContent = jsContent.replace(
    "fetch('talks.json')",
    `new Promise(resolve => resolve({ json: () => ${talksData} }))`
);

// 7. Inline JavaScript
htmlContent = htmlContent.replace(
    '<script src="script.js"></script>',
    `<script>${jsContent}</script>`
);

// 8. Write the final bundled file to dist
fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent);

console.log('Successfully built single-file website to dist/index.html');
