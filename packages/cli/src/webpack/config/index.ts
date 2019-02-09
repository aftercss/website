import { resolve } from 'path';
import * as ChainConfig from 'webpack-chain';
import { IBuildConfig } from '../../interface/build-config';
import { getLoader4TypeScript, getOptions4TypeScript } from '../loaders';
import { getFriendlyErrorPlugin } from '../plugins';
import { webpackConfigEntry } from './entry';

export function buildWebpackConfig(buildConfig: IBuildConfig) {
  const config = new ChainConfig();
  /**
   * 输入输出
   */
  webpackConfigEntry(config, buildConfig);
  config.resolve.extensions.add('.tsx').add('.ts').add('.js').end();
  config.output.path(resolve(buildConfig.cwd, buildConfig.output)).filename('[name].js');
  /**
   * loader 配置
   */
  config.module
    .rule('tsx')
    .test(/\.tsx$/)
    .use('typescript')
    .loader(getLoader4TypeScript())
    .options(getOptions4TypeScript());

  config.plugin('friendly-error').use(getFriendlyErrorPlugin());
  const json = config.toConfig();
  json.mode = 'none';
  return json;
}
