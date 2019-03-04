import webpack = require('webpack');
import * as webpackMerge from 'webpack-merge';
import { ICommonConfig as IDevConfig } from '../../interface/common-config';
import { AfterSitePlugin } from '../../plugin/plugin';
import { getDevPlugins } from '../plugins';
import { commonWebpackConfig } from './common';

export function devWebpackConfig(config: IDevConfig, afterSitePlugins: AfterSitePlugin[]) {
  const commonConfig = commonWebpackConfig(config, afterSitePlugins);
  const devConfig: webpack.Configuration = {
    devtool: 'inline-source-map',
    mode: 'development',
    plugins: getDevPlugins(),
  };
  return webpackMerge(commonConfig, devConfig);
}
