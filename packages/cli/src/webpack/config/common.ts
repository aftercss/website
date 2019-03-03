import { resolve } from 'path';
import webpack = require('webpack');
import { ICommonConfig } from '../../interface/common-config';
import { getLoader4CSS, getLoader4File, getLoader4TypeScript, getOptions4TypeScript } from '../loaders';
import { getHtmlPlugins, getOutputManagerPlugin, plugins } from '../plugins';
import { getWebpackConfigEntry } from './entry';

export function commonWebpackConfig(buildConfig: ICommonConfig) {
  const config: webpack.Configuration = {
    entry: getWebpackConfigEntry(buildConfig),
    module: {
      rules: [
        {
          test: /\.css$/,
          use: getLoader4CSS(),
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
      path: resolve(buildConfig.cwd, buildConfig.output),
    },
    plugins: plugins.concat(getHtmlPlugins(buildConfig)).concat(getOutputManagerPlugin(buildConfig)),
    resolve: {
      alias: {
        // TODO: 把 webpack config 弄出去让人 merge 一下吧这样下去会死。
        ...buildConfig.alias,
      },
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
  };

  return config;
}
