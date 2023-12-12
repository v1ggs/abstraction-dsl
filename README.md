# Differential Serving Loader

- [Differential Serving Loader](#differential-serving-loader)
 	- [General Info](#general-info)
 	- [Example of the `.assets.json` file](#example-of-the-assetsjson-file)
 	- [Usage](#usage)
  		- [Use prebuilt bundle](#use-prebuilt-bundle)
   			- [1. Install](#1-install)
   			- [2. Download](#2-download)
  		- [Build yourself](#build-yourself)
   			- [1. Install with dependencies](#1-install-with-dependencies)
   			- [2. Clone/download](#2-clonedownload)
 	- [CHANGELOG](#changelog)
 	- [LICENSE](#license)

## General Info

>
> **IMPORTANT: This is only to be used in development!**
>

The problem: When having two transpilation configs for Webpack (i.e. differential serving: `modern/es6` and `legacy/es5`), webpack plugins being used to load javascript into HTML, together with `html-webpack-plugin`, can be used only with one configuration (either `main` or `legacy`). The same stands for the manipulation with `htmlWebpackPlugin.files.js`. Therefore this seems to be the only solution for now.

This project is created to work with [abstraction](https://github.com/v1ggs/abstraction), but if you produce a valid `.assets.json` (built with [assets-webpack-plugin](https://www.npmjs.com/package/assets-webpack-plugin), see an example below) and have it running on the same server as the page, it should work with any setup.

It contains `test/abstraction.dsl.js` and `test/abstraction.dsl.min.js` files. When you include one of them in HTML, it will read `.assets.json` for the information about javascripts, produced with the bundler, and load found bundles the "module/nomodule" way. Modern bundles should have `mjs` and the legacy `js` extension, for it to work properly. Files with `.mjs` extension will be loaded with `type="module"` and `.js` files with `nomodule defer` attributes. This way, all produced javascripts are present in the `index.html`, and the page can be tested on modern and legacy browsers at the same time, during development.

> There is also a [Safari 10.1 `nomodule` fix](https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc), if required.

NOTE: Since this bundle runs in browser and can't read files on your disk, it uses `fetch` to read the `.json` file. Therefore `.assets.json` has to run on the same server as the page. All required polyfills, including `whatwg-fetch` are bundled, to support legacy browsers, and the file is quite large.

## Example of the `.assets.json` file

This is an example of the `.assets.json` file being used with this setup, that can be found in the "test" folder:

> NOTE: Comments are not valid in .json, they are here just for info!

```json
{
   "index": { // Page
      "js": "assets/index.es5.js", // nomodule bundle
      "mjs": "assets/index.mjs" // module bundle
   },

   "homepage": {  // Page
      "js": "assets/homepage.es5.js", // nomodule bundle
      "mjs": "assets/homepage.mjs" // module bundle
   }
}
```

## Usage

>
> Do not use it as a webpack entry, you should include it in HTML another way.
>

### Use prebuilt bundle

There are two ways to use it: install or download.

#### 1. Install

Install this package without dependencies and use files from `node_modules`:

```sh
npm i -D --omit=optional @v1ggs/abstraction-dsl
```

```js
// This is how you can get it with JS
const path = require('path');
const absDSL = path.resolve(
   process.cwd(),
   'node_modules',
   '@v1ggs',
   'abstraction-dsl',
   'test',
   // minified bundle
   'abstraction.dsl.min.js',
);
```

#### 2. Download

Download either `test/abstraction.dsl.js` or `test/abstraction.dsl.min.js` and include it in HTML:

```html
<script src="/path/to/abstraction.dsl.js"></script>
```

> Before using prebuilt bundle, make sure you have a valid `.assets.json` (see example above) running on the same server as your HTML page, at the root, e.g. `localhost:8080/.assets.json`. You achieve that using your bundler.

### Build yourself

There are two ways to build it: install or clone/download.

#### 1. Install with dependencies

```sh
npm i -D --include=optional @v1ggs/abstraction-dsl
```

Create `.abstraction.dsl.config.js` file in the root dir, where `package.json` file is.

This is what the default config looks like:

```js
// .abstraction.dsl.config.js

module.exports = {
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
```

Build:

```sh
# Build the package
npx bdsl

# Minify the package
npx mdsl
```

#### 2. Clone/download

```sh
git clone https://github.com/v1ggs/abstraction-dsl
```

Navigate in the terminal to this folder and install dependencies:

```sh
# install dependencies
npm i
```

Config file `.abstraction.dsl.config.js` is already there, just modify it.

Build:

```sh
# produce the bundle
npm start

# minify the bundle
npm run min

# open the test page in browser
# use CTRL-C to stop the server
npm test
```

## CHANGELOG

[CHANGELOG](CHANGELOG.md)

## LICENSE

[MIT](LICENSE)
