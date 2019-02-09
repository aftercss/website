import { resolve } from 'path';
import * as ChainConfig from 'webpack-chain';
import { IBuildConfig } from '../../interface/build-config';

export function webpackConfigEntry(webpackConfig: ChainConfig, buildConfig: IBuildConfig) {
  const pages = buildConfig.pages;
  for (const item in pages) {
    if (pages.hasOwnProperty(item)) {
      webpackConfig
        .entry(item)
        .add(resolve(buildConfig.cwd, pages[item].entry))
        .end();
    }
  }
}
