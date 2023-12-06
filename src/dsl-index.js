/*!
Plugins that work with `html-webpack-plugin` can be applied only to one
transpilation (`main` or `legacy`). The same stands for the manipulation
with `htmlWebpackPlugin.files.js`. Therefore this is the only solution for now.
JavaScripts have to be added manually to html in development.
DON'T USE IN PRODUCTION.
*/

import config from '../.abstraction.dsl.config.defaults.js';

import 'whatwg-fetch';

const assetsJsonFile = config.assetsJsonUrl;

const appendScript = (url, ext) => {
   const s = document.createElement('script');

   if (ext === 'js') {
      s.defer = true;
      s.noModule = true;
   } else if (ext === 'mjs') {
      s.type = 'module';
   } else {
      return false;
   }

   s.src = '/' + url;
   document.head.appendChild(s);
};

const loadDifferentialScripts = async () => {
   const jsonData = await fetch(assetsJsonFile);

   if (!jsonData) return false;

   const assetsJson = await jsonData.json();

   if (!Object.keys(assetsJson).length) return false;

   // extensions that have to be loaded
   const allowedExtensions = ['mjs', 'js'];

   Object.keys(assetsJson).forEach((page) => {
      if (!Object.keys(page).length) return false;

      // assets-webpack-plugin can add `metadata` key as well.
      if (page === 'metadata') return false;

      console.log(page);

      // Get all file types for this page ('mjs'|'js').
      Object.keys(assetsJson[page]).forEach((ext) => {
         if (!allowedExtensions.includes(ext)) return false;
         if (!Object.keys(ext).length) return false;

         let filePath = assetsJson[page][ext];

         // if there is only one item, then it's a string
         if (typeof filePath === 'string') {
            appendScript(filePath, ext);
         } else {
            // get all filePaths for this type
            filePath.forEach((url) => {
               appendScript(url, ext);
            });
         }
      });
   });
};

loadDifferentialScripts();
