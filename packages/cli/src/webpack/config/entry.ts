import * as ChainConfig from 'webpack-chain';
import { IBuildConfig } from '../../interface/build-config';

export function webpackConfigEntry(webpackConfig: ChainConfig, buildConfig: IBuildConfig) {
  for (const item in buildConfig) {
    if (buildConfig.hasOwnProperty(item)) {
      webpackConfig
        .entry(item)
        .add(buildConfig[item].entry)
        .end();
    }
  }
}
