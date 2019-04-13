import { resolve } from 'path';
import webpack = require('webpack');
import { ICommonConfig } from '../../interface/common-config';
import { AfterSitePlugin } from '../../plugin/plugin';
import {
  getLoader4CSS,
  getLoader4File,
  getLoader4Markdown,
  getLoader4TypeScript,
  getLoader4Worker,
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
          test: /\.worker\.ts$/,
          use: getLoader4Worker(),
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: getLoader4TypeScript(),
              options: Object.assign(getOptions4TypeScript(), {
                appendTsxSuffixTo: [/\.md$/],
              }),
            },
            {
              loader: getLoader4Markdown(),
            },
          ],
        },
        {
          test: /\.tsx?$/,
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
      globalObject: 'this',
      libraryTarget: 'window',
      path: resolve(commonConfig.cwd, commonConfig.output),
    },
    plugins: plugins.concat(getOutputManagerPlugin(commonConfig, afterSitePlugins)),
    resolve: {
      alias: {
        ...commonConfig.alias,
      },
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
  };

  return config;
}
