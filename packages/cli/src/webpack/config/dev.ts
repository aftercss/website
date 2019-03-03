import webpack = require('webpack');
import * as webpackMerge from 'webpack-merge';
import { ICommonConfig as IDevConfig } from '../../interface/common-config';
import { getDevPlugins } from '../plugins';
import { commonWebpackConfig } from './common';

export function devWebpackConfig(config: IDevConfig) {
  const commonConfig = commonWebpackConfig(config);
  const devConfig: webpack.Configuration = {
    devtool: 'inline-source-map',
    mode: 'development',
    plugins: getDevPlugins(),
  };
  return webpackMerge(commonConfig, devConfig);
}
