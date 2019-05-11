import { resolve } from 'path';
import webpack = require('webpack');
import * as webpackMerge from 'webpack-merge';
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

const RULES_MAP = new Map<string, webpack.RuleSetRule>([
  [
    '/\\.css$/',
    {
      test: /\.css$/,
      use: getLoader4CSS(),
    },
  ],
  [
    '/\\.worker.ts$/',
    {
      test: /\.worker\.ts$/,
      use: getLoader4Worker(),
    },
  ],
  [
    '/\\.md$/',
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
  ],
  [
    '/\\.tsx?$/',
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: getLoader4TypeScript(),
          options: getOptions4TypeScript(),
        },
      ],
    },
  ],
  [
    '/\\.(png|jp(e)g|gif)$/',

    {
      test: /\.(png|jp(e)g|gif)$/,
      use: [
        {
          loader: getLoader4File(),
        },
      ],
    },
  ],
]);

export function commonWebpackConfig(commonConfig: ICommonConfig, afterSitePlugins: AfterSitePlugin[]) {
  // 用户定义的rule覆盖默认rule
  if (commonConfig.module && commonConfig.module.rules) {
    for (const rule of commonConfig.module.rules) {
      const regStr = rule.test.toString();
      RULES_MAP.set(regStr, rule);
    }
  }

  const config: webpack.Configuration = {
    entry: getWebpackConfigEntry(commonConfig),
    module: {
      rules: [...RULES_MAP.values()],
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
