#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const babelify = require('babelify');
const browserify = require('browserify');
const { fileName, dist } = require('../.abstraction.dsl.config.defaults');

function build() {
   console.log('');
   console.log('ABSTRACTION-DSL BUILD');
   console.log('');

   let src;
   const distPath = path.join(process.cwd(), dist);

   if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath, { recursive: true });
   }

   if (
      fs.existsSync('./node_modules/@v1ggs/abstraction-dsl/src/dsl-index.js')
   ) {
      console.log('Source file found in "node_modules".');
      src = './node_modules/@v1ggs/abstraction-dsl/src/dsl-index.js';
   } else if (fs.existsSync('./src/dsl-index.js')) {
      console.log('Source file found in "./src".');
      src = './src/dsl-index.js';
   } else {
      console.log('Source file NOT found.');
      return;
   }

   browserify(src)
      .transform(babelify, {
         presets: [
            [
               '@babel/preset-env',

               {
                  // When no targets are specified: Babel will assume you are targeting
                  // the oldest browsers possible. For example, @babel/preset-env will
                  // transform all ES2015-ES2020 code to be ES5 compatible.
                  // Because of this, Babel's behavior is different than browserslist:
                  // it does not use the defaults query when there are no targets are
                  // found in your Babel or browserslist config(s). If you want to use
                  // the defaults query, you will need to explicitly pass it as a target:
                  // babel.config.json { 'targets': 'defaults' }
                  // targets: {}, // better than 'ie 11'
                  // targets: 'chrome 110', // just to test "auto-polyfilling"
                  useBuiltIns: 'usage',
                  corejs: 3.31,
                  loose: true,
                  // modules: false,
                  bugfixes: true,
                  debug: true,
               },
            ],
         ],
      })
      .bundle()
      .pipe(fs.createWriteStream(path.join(distPath, fileName)));
}

build();
