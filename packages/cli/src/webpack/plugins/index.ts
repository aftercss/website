import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as webpackbar from 'webpackbar';
import { ICommonConfig as IBuildConfig } from '../../interface/common-config';
import { AfterSitePlugin } from '../../plugin/plugin';
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

export function getOutputManagerPlugin(buildConfig: IBuildConfig, afterSitePlugins: AfterSitePlugin[]) {
  const outputPlugins = [];
  for (const [page, { title }] of Object.entries(buildConfig.pages)) {
    outputPlugins.push(new OutputManagerPlugin(page, afterSitePlugins, title));
  }
  return outputPlugins;
}
