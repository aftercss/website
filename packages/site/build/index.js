var AfterSitePlugin = require('@aftercss/site-cli').AfterSitePlugin;

var Clean = require('clean-webpack-plugin');
var MonacoEditor = require('monaco-editor-webpack-plugin');

class MonacoEditorAfterSitePlugin extends AfterSitePlugin {
  phaseWebpackConfig(webpackConfig, webpackMerge) {
    return webpackMerge(webpackConfig, {
      plugins: [
        new MonacoEditor({
          languages: ['css', 'json'],
        }),
      ],
    });
  }
}

module.exports = {
  MonacoEditorAfterSitePlugin: MonacoEditorAfterSitePlugin,
};
