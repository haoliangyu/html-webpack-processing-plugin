# html-webpack-processing-plugin

HTML pre-processing and post-processing for [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin).

## Installation

``` bash
npm install html-webpack-processing-plugin
```

## Usage

* add pre-processor

``` javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackProcessingPlugin = require('html-webpack-processing-plugin');

const webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      preProcessing: originalHTML => {
        let newHTML = originalHTML + '<div></div>';
        return newHTML;
      }
    }),
    new HtmlWebpackProcessingPlugin()
  ]
};
```

* add post-processor

``` javascript
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
