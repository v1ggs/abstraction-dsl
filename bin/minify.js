#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const uglifyjs = require('uglify-js');
const { fileName, dist } = require('../.abstraction.dsl.config.defaults');

function min() {
   const distPath = path.join(process.cwd(), dist);

   if (!fs.existsSync(path.join(distPath, fileName))) {
      console.log('No file.');
      return false;
   }

   console.log('');
   console.log('ABSTRACTION-DSL MINIFYING...');
   console.log('');

   const fileContent = fs.readFileSync(path.join(distPath, fileName), 'utf8');
   const minify = uglifyjs.minify(fileContent);
   fs.writeFileSync(
      path.join(distPath, fileName).replace(/\.js/, '') + '.min.js',
      minify.code,
      'utf-8',
   );
}

min();
