const minify = require('html-minifier').minify;
const fs = require('fs');
const path = require('path');

const html = minify(fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8'));

fs.writeFile(path.join(__dirname, 'index.html'), html, function (err) {
  if (err) throw err;
  console.log('Saved!');
});