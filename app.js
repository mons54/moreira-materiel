const { lstatSync, readdirSync, writeFile, readFileSync } = require('fs');
const { join } = require('path');
const htmlMinify = require('html-minifier').minify;
const cssMinify = require('csso').minify;
const purifyCss = require('purify-css');
const jsMinify = require('uglify-js').minify;
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');


const readFiles = (folder, files, data = '') => { 
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

let css = readFiles(join(__dirname, 'assets/css'), [
    'material-kit.css',
]);

['index.html', 'tuiles.html'].forEach(file => {

    const htmlPath = join(__dirname, file);
    const html = htmlMinify(readFileSync(htmlPath, 'utf-8'));

    writeFile(htmlPath, html, () => {
        console.log('HTML is minify');
    });

    css = purifyCss(html, css, {
        whitelist: ['.nav-open', '#bodyClick']
    });

    css += readFiles(join(__dirname, 'assets/css'), [
        'index.css',
    ]);

    writeFile(join(__dirname, 'assets/' +  file.replace('.html', '') + '.min.css'), cssMinify(css).css);
});

const js = readFiles(join(__dirname, 'assets/js'), [
    'jquery.min.js',
    'popper.min.js',
    'bootstrap-material-design.js',
    'nouislider.min.js',
    'material-kit.js',
    'index.js'
]);

writeFile(join(__dirname, 'assets/app.min.js'), jsMinify(js).code, () => {
    console.log('JS is minify');
});

