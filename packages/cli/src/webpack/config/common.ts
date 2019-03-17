import { resolve } from 'path';
import webpack = require('webpack');
import { ICommonConfig } from '../../interface/common-config';
import { AfterSitePlugin } from '../../plugin/plugin';
import {
  getLoader4CSS,
  getLoader4File,
  getLoader4Markdown,
  getLoader4TypeScript,
  getOptions4TypeScript,
} from '../loaders';
import { getOutputManagerPlugin, plugins } from '../plugins';
import { getWebpackConfigEntry } from './entry';

export function commonWebpackConfig(commonConfig: ICommonConfig, afterSitePlugins: AfterSitePlugin[]) {
  const config: webpack.Configuration = {
    entry: getWebpackConfigEntry(commonConfig),
    module: {
      rules: [
        {
          test: /\.css$/,
          use: getLoader4CSS(),
        },
        {
          test: /\.md$/,
          use: getLoader4Markdown(),
        },
        {
          test: /\.tsx$/,
          use: [
            {
              loader: getLoader4TypeScript(),
              options: getOptions4TypeScript(),
            },
          ],
        },
        {
          test: /\.(png|jp(e)g|gif)$/,
          use: [
            {
              loader: getLoader4File(),
            },
          ],
        },
      ],
    },
    output: {
      filename: '[name].js',
      libraryTarget: 'window',
      path: resolve(commonConfig.cwd, commonConfig.output),
    },
    plugins: plugins.concat(getOutputManagerPlugin(commonConfig, afterSitePlugins)),
    resolve: {
      alias: {
        // TODO: 把 webpack config 弄出去让人 merge 一下吧这样下去会死。
        ...commonConfig.alias,
      },
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
  };

  return config;
}
