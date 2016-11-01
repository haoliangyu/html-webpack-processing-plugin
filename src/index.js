const assert = require('assert');

function HtmlWebpackProcessingPlugin (options) {
  assert.equal(options, undefined, 'The HtmlWebpackProcessingPlugin does not accept any options');
}

HtmlWebpackProcessingPlugin.prototype.apply = function (compiler) {
  let self = this;

  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
      self.preProcessing(htmlPluginData, callback);
    });
  });

  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-html-processing', (htmlPluginData, callback) => {
      self.postProcessing(htmlPluginData, callback);
    });
  });
};

HtmlWebpackProcessingPlugin.prototype.preProcessing = (htmlPluginData, callback) => {
  if (typeof htmlPluginData.plugin.options.preProcessing === 'function') {
    try {
      htmlPluginData.html = htmlPluginData.plugin.options.preProcessing(htmlPluginData.html);
      callback(null, htmlPluginData);
    } catch(err) {
      callback(err);
    }
  } else {
    callback(null, htmlPluginData);
  }
};

HtmlWebpackProcessingPlugin.prototype.postProcessing = (htmlPluginData, callback) => {
  if (typeof htmlPluginData.plugin.options.postProcessing === 'function') {
    try {
      htmlPluginData.html = htmlPluginData.plugin.options.postProcessing(htmlPluginData.html);
      callback(null, htmlPluginData);
    } catch(err) {
      callback(err);
    }
  } else {
    callback(null, htmlPluginData);
  }
};

module.exports = HtmlWebpackProcessingPlugin;
