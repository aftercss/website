import * as ChainConfig from 'webpack-chain';
import { IBuildConfig } from '../../interface/build-config';
import { webpackConfigEntry } from './entry';

export function buildWebpackConfig(buildConfig: IBuildConfig) {
  const config = new ChainConfig();
  webpackConfigEntry(config, buildConfig);
  return config.toConfig();
}
