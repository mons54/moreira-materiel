const fs = require('fs');
const path = require('path');
const htmlMinify = require('html-minifier').minify;
const cssoMinify = require('csso').minify;

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
fs.writeFile(path.join(__dirname, 'index.html'), htmlMinify(html));


const cssPath = path.join(__dirname, 'assets/css');
const css = readAllFiles(cssPath, [
    'material-kit.css',
    'index.css'
]);

fs.writeFile(path.join(cssPath, 'app.min.css'), cssoMinify(css).css);

function readAllFiles(folder, files, data = '') {

    files.forEach(function (value) {
        data += fs.readFileSync(path.join(folder, value), 'utf-8');
    });

    return data;
}