import { resolve } from 'path';
import { IBuildConfig } from '../../interface/build-config';
import {
  getLoader4CSS,
  getLoader4File,
  getLoader4TypeScript,
  getLoader4Worker,
  getOptions4TypeScript,
} from '../loaders';
import { getHtmlPlugins, plugins } from '../plugins';
import { getWebpackConfigEntry } from './entry';

export function buildWebpackConfig(buildConfig: IBuildConfig) {
  return {
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
          test: /\.worker\.ts$/,
          use: {
            loader: getLoader4Worker(),
          },
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
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
  };
}
