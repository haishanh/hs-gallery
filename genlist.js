#!/bin/env node

var glob = require('glob'),
    fs = require('fs');

var imgs = 'var imgs=['

glob('img/**/*.{jpg,JPG}', function (err, files) {
  if (err) throw err;
  var len = files.length;
  files.forEach(function (img, i) {
    img = img.replace(/^img\//, '');
    imgs += '"' + img + '"';
    imgs += i === len-1 ? '' : ',';
  });
  imgs += ']\n'
  fs.writeFileSync('js/imgs.js', imgs);
});
