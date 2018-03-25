const fs = require('fs');
const path = require('path');
const htmlMinify = require('html-minifier').minify;
const cssoMinify = require('csso').minify;
const jsMinify = require('uglify-js').minify;


const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
fs.writeFile(path.join(__dirname, 'index.html'), htmlMinify(html));

const cssPath = path.join(__dirname, 'assets/css');
const css = readAllFiles(cssPath, [
    'material-kit.css',
    'index.css'
]);

fs.writeFile(path.join(cssPath, 'app.min.css'), cssoMinify(css).css);

const jsPath = path.join(__dirname, 'assets/js');
const js = readAllFiles(jsPath, [
    'jquery.min.js',
    'popper.min.js',
    'bootstrap-material-design.js',
    'nouislider.min.js',
    'material-kit.js',
    'index.js'
]);

fs.writeFile(path.join(jsPath, 'app.min.js'), jsMinify(js).code);

function readAllFiles(folder, files, data = '') {

    files.forEach(function (value) {
        data += fs.readFileSync(path.join(folder, value), 'utf-8');
    });

    return data;
}