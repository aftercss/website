import Friendly = require('friendly-errors-webpack-plugin');
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as webpackbar from 'webpackbar';
import { IBuildConfig } from '../../interface/build-config';
import { AfterSitePlugin } from '../../plugin/plugin';
import { ICommonConfig as IBuildConfig } from '../../interface/common-config';
import { OutputManagerPlugin } from './output-manager';

export const plugins: any = [
  new webpackbar({
    name: 'Client',
  }),
];

export function getBuildPlugins() {
  return [new BundleAnalyzerPlugin()];
}

export function getDevPlugins() {
  return [new webpack.HotModuleReplacementPlugin()];
}
export function getUglifyJsPlugin() {
  return new UglifyJsPlugin({
    test: /\.js(\?.*)?$/i,
  });
}

export { getHtmlPlugins } from './html';
export function getOutputManagerPlugin(buildConfig: IBuildConfig, afterSitePlugins: AfterSitePlugin[]) {
  const pages = Object.keys(buildConfig.pages);
  const outputPlugins = [];
  for (const page of pages) {
    outputPlugins.push(new OutputManagerPlugin(page, afterSitePlugins));
  }
  return outputPlugins;
}
