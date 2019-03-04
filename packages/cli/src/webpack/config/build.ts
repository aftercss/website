import webpack = require('webpack');
import * as webpackMerge from 'webpack-merge';
import { ICommonConfig as IBuildConfig } from '../../interface/common-config';
import { AfterSitePlugin } from '../../plugin/plugin';
import { getBuildPlugins } from '../plugins';
import { commonWebpackConfig } from './common';

export function buildWebpackConfig(config: IBuildConfig, afterSitePlugins: AfterSitePlugin[]) {
  const commonConfig = commonWebpackConfig(config, afterSitePlugins);
  const buildConfig: webpack.Configuration = {
    devtool: 'source-map',
    mode: 'production',
    plugins: getBuildPlugins(),
  };
  return webpackMerge(commonConfig, buildConfig);
}
