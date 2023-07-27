# Differential Serving Loader

## INFO

> Problem: When having two transpilation configs for Webpack (i.e. differential serving: `modern/es6` and `legacy/es5`), webpack plugins being used to load javascript into HTML, together with `html-webpack-plugin`, can be used only with one configuration (either `main` or `legacy`). The same stands for the manipulation with `htmlWebpackPlugin.files.js`. Therefore this is the only solution I can find for now.
>
> It was created to work with [abstraction](https://github.com/v1ggs/abstraction), but if you produce a correct `.assets.json` (with [assets-webpack-plugin](https://www.npmjs.com/package/assets-webpack-plugin)), it should work with any setup.
>
> ---
> IMPORTANT: This is only to be used in development!
> ___

This projects creates an `abstraction.dsl.js` and `abstraction.dsl.min.js` files. When you include it into HTML, it will load produced bundles the "module/nomodule" way.

HTML has to be run on a server, because it works in browser: it `fetch`es `.assets.json` file (built with [assets-webpack-plugin](https://www.npmjs.com/package/assets-webpack-plugin)), and reads the information about produced javascript files. Then it loads all javascript found in the `.json` file. Files with `.mjs` extension will be loaded with `type="module"` and `.js` files with `nomodule defer` attributes.

This way, all produced javascripts are present in the `index.html`, and the page can be tested on modern and legacy browsers at the same time, during development.

Since it has to be supported on all browsers, all required polyfills, including `whatwg-fetch` are bundled, and the file is quite large.

An example of the `.assets.json` file, that can be found in the "test" folder. This is the content of the file being used with this setup:

```json
{
 "index": {
  "js": "assets/index.es5.js",
  "mjs": "assets/index.mjs"
 },
 "homepage": {
  "js": "assets/homepage.es5.js",
  "mjs": "assets/homepage.mjs"
 }
}
```

## CONFIG

Create `.abstraction.dsl.config.js` file in the root of your project. This is the default config:

```js
// .abstraction.dsl.config.js

module.exports = {
   // dist dir name (it's in the root)
   dist: 'test',
   // Url relative to the site root (w/o leading slash):
   // `assetsJson: 'somedir/.assets.json'` will be loaded from
   // e.g. `http://localhost:8080/somedir/.assets.json`.
   assetsJsonUrl: '.assets.json',
   // If you change this, you have to change it in `test/index.html` as well.
   fileName: 'abstraction.dsl.js',
};
```

## USAGE

You can take built files from the `test` folder: `abstraction.dsl.js` and `abstraction.dsl.min.js`, and include one of them in HTML.

You can also build them yourself: either install this package or clone/download it somewhere on your disk.

### Install

```sh
# Install first
npm i -D @v1ggs/abstraction-dsl

# Then create a config file (.abstraction.dsl.config.js)
# in the root, and edit it as required.

# Then build the script
npx bdsl

# Minify the built file
npx mdsl
```

### Clone or download

First create and edit config as per your requirements.

Navigate in the console/terminal to this folder.

```sh
# install dependencies
npm i

# produce the bundle
npm start

# open the test page in browser
npm test

# minify the bundle
npm run min
```

## LICENSE

[MIT](LICENSE)
