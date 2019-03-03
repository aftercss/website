import webpack = require('webpack');
import * as webpackMerge from 'webpack-merge';
import { ICommonConfig as IBuildConfig } from '../../interface/common-config';
import { getBuildPlugins, getUglifyJsPlugin } from '../plugins';
import { commonWebpackConfig } from './common';

export function buildWebpackConfig(config: IBuildConfig) {
  const commonConfig = commonWebpackConfig(config);
  const buildConfig: webpack.Configuration = {
    devtool: 'source-map',
    mode: 'production',
    // optimization: {
    //   minimizer: [getUglifyJsPlugin()],
    // },
    plugins: getBuildPlugins(),
  };
  return webpackMerge(commonConfig, buildConfig);
}
