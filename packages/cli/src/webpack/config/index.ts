import { resolve } from 'path';
import * as ChainConfig from 'webpack-chain';
import { IBuildConfig } from '../../interface/build-config';
import { getLoader4File, getLoader4TypeScript, getOptions4TypeScript } from '../loaders';
import { getFriendlyErrorPlugin, getOptions4Webpackbar, getWebpackbarPlugin } from '../plugins';
import { webpackConfigEntry } from './entry';
import { getWebpackConfig4HtmlPlugin } from './html.plugin';

export function buildWebpackConfig(buildConfig: IBuildConfig) {
  const config = new ChainConfig();
  /**
   * 输入输出
   */
  webpackConfigEntry(config, buildConfig);
  config.resolve.extensions
    .add('.tsx')
    .add('.ts')
    .add('.js')
    .end();
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

  config.module
    .rule('file')
    .test(/\.(png|jpg|gif)$/)
    .use('file')
    .loader(getLoader4File());

  config
    .plugin('friendly-error')
    .use(getFriendlyErrorPlugin())
    .end()
    .plugin('webpackbar')
    .use(getWebpackbarPlugin(), [getOptions4Webpackbar()]);

  const json = config.toConfig();
  json.mode = 'none';
  getWebpackConfig4HtmlPlugin(json, buildConfig);
  return json;
}
