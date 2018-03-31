const { lstatSync, readdirSync, writeFile, readFileSync } = require('fs');
const { join } = require('path');
const htmlMinify = require('html-minifier').minify;
const cssoMinify = require('csso').minify;
const jsMinify = require('uglify-js').minify;
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');


const readAllFiles = (folder, files, data = '') => { 
    files.forEach(value => {
        data += readFileSync(join(folder, value), 'utf-8'); 
    });
    return data;
};

const getDirectories = source => 
    readdirSync(source).map(name => 
        join(source, name)).filter(source => lstatSync(source).isDirectory());

const optimizeImages = source => {

    if (!source) {
        return;
    }

    getDirectories(source).forEach(folder => {
        imagemin([folder + '/*.{jpg,png}'], folder, {
            plugins: [
                imageminJpegtran(),
                imageminPngquant({quality: '65-80'})
            ]
        }).then(files => {
            console.log('Optimize images', folder);
        });

        optimizeImages(folder);
    });
};

optimizeImages(join(__dirname, 'assets/img'));

const html = readFileSync(join(__dirname, 'index.html'), 'utf-8');
writeFile(join(__dirname, 'index.html'), htmlMinify(html), function () {
    console.log('HTML is minify');
});

const css = readAllFiles(join(__dirname, 'assets/css'), [
    'material-kit.css',
    'index.css'
]);

writeFile(join(__dirname, 'assets/app.min.css'), cssoMinify(css).css, function () {
    console.log('CSS is minify');
});

const js = readAllFiles(join(__dirname, 'assets/js'), [
    'jquery.min.js',
    'popper.min.js',
    'bootstrap-material-design.js',
    'nouislider.min.js',
    'material-kit.js',
    'index.js'
]);

writeFile(join(__dirname, 'assets/app.min.js'), jsMinify(js).code, function () {
    console.log('JS is minify');
});

