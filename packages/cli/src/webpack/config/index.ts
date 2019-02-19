import { resolve } from 'path';
import webpack = require('webpack');
import { IBuildConfig } from '../../interface/build-config';
import {
  getLoader4CSS,
  getLoader4File,
  getLoader4TypeScript,
  getLoader4Worker,
  getOptions4TypeScript,
  getOptions4Worker,
} from '../loaders';
import { getHtmlPlugins, plugins } from '../plugins';
import { getWebpackConfigEntry } from './entry';

export function buildWebpackConfig(buildConfig: IBuildConfig) {
  const config: webpack.Configuration = {
    entry: getWebpackConfigEntry(buildConfig),
    externals: {
      'monaco-editor': {
        root: 'Monaco',
      },
      'source-map': {
        root: 'SourceMap',
      },
    },
    mode: 'none',
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
          test: /\.worker\.ts$/,
          use: [
            {
              loader: getLoader4Worker(),
              options: getOptions4Worker(),
            },
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
      path: resolve(buildConfig.cwd, buildConfig.output),
    },
    plugins: plugins.concat(getHtmlPlugins(buildConfig)),
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
