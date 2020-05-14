# html-webpack-processing-plugin

[![npm](https://img.shields.io/npm/v/html-webpack-processing-plugin)](https://www.npmjs.com/package/html-webpack-processing-plugin) [![NPM](https://img.shields.io/npm/l/html-webpack-processing-plugin)](https://github.com/haoliangyu/html-webpack-processing-plugin/blob/master/LICENSE) [![Build Status](https://www.travis-ci.org/haoliangyu/html-webpack-processing-plugin.svg?branch=master)](https://www.travis-ci.org/haoliangyu/html-webpack-processing-plugin)

HTML pre-processing and post-processing for [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin). It supports webpack v4.

## Installation

```bash
npm install html-webpack-processing-plugin
```

## Usage

- add pre-processor

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackProcessingPlugin = require("html-webpack-processing-plugin");

const webpackConfig = {
  entry: "index.js",
  output: {
    path: "dist",
    filename: "index_bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      preProcessing: (originalHTML) => {
        let newHTML = originalHTML + "<div></div>";
        return newHTML;
      },
    }),
    new HtmlWebpackProcessingPlugin(),
  ],
};
```

- add post-processor

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackProcessingPlugin = require('html-webpack-processing-plugin';)

const webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      postProcessing: originalHTML => {
        let newHTML = originalHTML + '<div></div>';
        return newHTML;
      }
    }),
    new HtmlWebpackProcessingPlugin()
  ]
};
```

## License

This project is licensed under MIT.
