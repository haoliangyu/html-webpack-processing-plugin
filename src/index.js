const assert = require('assert');

class HtmlWebpackProcessingPlugin {

  constructor(options) {
    assert.equal(options, undefined, 'The HtmlWebpackProcessingPlugin does not accept any options');
  }

  apply(compiler) {
    let self = this;

    compiler.hooks.compilation.tap('HTMLWebpackProcessingPlugin', compilation => {
      HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tap(
        'HTMLWebpackProcessingPlugin',
        (htmlPluginData, callback) => {
          self.preProcessing(htmlPluginData, callback);
        }
      );
    });
    compiler.hooks.compilation.tap('HTMLWebpackProcessingPlugin', compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(
        'HTMLWebpackProcessingPlugin',
        (htmlPluginData, callback) => {
          self.postProcessing(htmlPluginData, callback);
        }
      );
   });
  }

  preProcessing(htmlPluginData, callback) {
    if (typeof htmlPluginData.plugin.options.preProcessing === 'function') {
      try {
        htmlPluginData.html = htmlPluginData.plugin.options.preProcessing(htmlPluginData.html);
        typeof callback === 'function' && callback(null, htmlPluginData);
      } catch(err) {
        typeof callback === 'function' && callback(err);
      }
    } else {
      typeof callback === 'function' && callback(null, htmlPluginData);
    }
  }

  postProcessing(htmlPluginData, callback) {
    if (typeof htmlPluginData.plugin.options.postProcessing === 'function') {
      try {
        htmlPluginData.html = htmlPluginData.plugin.options.postProcessing(htmlPluginData.html);
        typeof callback === 'function' && callback(null, htmlPluginData);
      } catch(err) {
        typeof callback === 'function' && callback(err);
      }
    } else {
      typeof callback === 'function' && callback(null, htmlPluginData);
    }
  }
}

module.exports = HtmlWebpackProcessingPlugin;
