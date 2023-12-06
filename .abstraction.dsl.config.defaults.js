// This is the default configuration.
// User config is in `.abstraction.dsl.config.js` in the CWD.

const path = require('path');
let userConfig = {},
   userConfigFile;

const configDefault = {
   // dist dir (root-relative)
   dist: 'test',

   // This is where this bundle will look for `assetsJson`.
   // A path, relative to the site root (w/o a leading slash):
   // e.g. `assetsJson: 'somedir/.assets.json'` will be loaded from
   // `http://localhost:8080/somedir/.assets.json`.
   assetsJsonUrl: '.assets.json',

   // Built file's name: if you change this, you have to change it
   // in `test/index.html` as well.
   fileName: 'abstraction.dsl.js',
};

try {
   userConfigFile = path.join(process.cwd(), '.abstraction.dsl.config.js');
   userConfig = require(userConfigFile);

   console.log('User config found:');
   console.log(userConfig);
} catch (error) {
   // console.log(error);
}

module.exports = Object.assign(configDefault, userConfig);
