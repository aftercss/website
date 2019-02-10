import webpack = require('webpack');
import { IBuildConfig } from '../../interface/build-config';
import { getConfig4HtmlPlugin, getHtmlPlugin } from '../plugins/html';

export function getWebpackConfig4HtmlPlugin(webpackConfig: webpack.Configuration, buildConfig: IBuildConfig) {
  const pages = buildConfig.pages;
  for (const page in pages) {
    if (pages.hasOwnProperty(page)) {
      const HtmlPluginKlass = getHtmlPlugin();
      const pageHtmlPlugin = new HtmlPluginKlass(getConfig4HtmlPlugin(page));
      webpackConfig.plugins.push(pageHtmlPlugin);
    }
  }
}
