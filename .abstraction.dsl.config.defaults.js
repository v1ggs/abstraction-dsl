// This is the default configuration.
// User config is in `.abstraction.dsl.config.js` in the CWD.

const path = require('path');
let userConfig = {},
   userConfigFile;

const configDefault = {
   // dist dir name (it's in the root)
   dist: 'test',
   // Url relative to the site root (w/o leading slash):
   // `assetsJson: 'somedir/.assets.json'` will be loaded from
   // e.g. `http://localhost:8080/somedir/.assets.json`.
   assetsJsonUrl: '.assets.json',
   // If you change this, you have to change it in `test/index.html` as well.
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
