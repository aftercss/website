import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import webpack = require('webpack');
import webpackMerge = require('webpack-merge');
import { CLIController } from '../core/controller';
import { IBuildConfig } from '../interface/build-config';
import { AfterSitePlugin } from '../plugin/plugin';
import { IConstructor } from '../shared';
import { buildWebpackConfig } from '../webpack/config';
import { runWebpack } from '../webpack/run';
import InternalPlugins from './../plugin';

export interface IBuildOptionType {
  cwd: string;
}

/**
 * cwd 下 .after.config.json / .after.config.js 文件
 */
export const UserDefinedConfigPath: string = './.after.config.js';

export const UserDefinedConfigDefaultValue = {
  alias: {},
  output: './dist',
  pages: {
    index: {
      entry: './src/index.tsx',
    },
  },
};

export class BuildController extends CLIController<IBuildOptionType> {
  public static command = 'build';
  public plugins: AfterSitePlugin[] = [];
  public parseOption(commander: any) {
    return { cwd: process.cwd() };
  }
  /**
   * Controller 入口
   */
  public async entry() {
    const buildConfig = await this.loadUserConfigWithDefaultValue();
    this.registerPlugins(buildConfig);
    const webpackConfig = buildWebpackConfig(buildConfig);
    runWebpack(await this.pluginHandleWebpackConfig(webpackConfig));
  }
  /**
   *
   * @param config
   */
  public registerPlugins(config: IBuildConfig) {
    // 之后补充一些外部来的 plugin
    if (!config.plugin) {
      return;
    }
    const PluginKlassX: Record<string, IConstructor<AfterSitePlugin>> = { ...InternalPlugins };
    for (const pluginKlassName in PluginKlassX) {
      if (config.plugin[pluginKlassName] && PluginKlassX.hasOwnProperty(pluginKlassName)) {
        const PluginKlass = PluginKlassX[pluginKlassName];
        this.plugins.push(new PluginKlass(config.plugin[pluginKlassName]));
      }
    }
  }
  /**
   *
   * @param webpackConfig
   */
  public async pluginHandleWebpackConfig(webpackConfig: webpack.Configuration): Promise<webpack.Configuration> {
    let config = webpackConfig;
    for (const plugin of this.plugins) {
      config = await plugin.phaseWebpackConfig(config, webpackMerge);
    }
    return config;
  }
  /**
   *
   */
  public async loadUserConfigWithDefaultValue(): Promise<IBuildConfig> {
    const configFilePath = path.resolve(this.option.cwd, UserDefinedConfigPath);
    const exists = await promisify(fs.exists)(configFilePath);
    if (exists) {
      /**
       * TODO： 之后解决一下ES6的问题
       * TODO: 配置简化 缩写 部分默认配置等 拓展等
       */
      return { ...require(configFilePath).webpack, ...{ cwd: this.option.cwd } };
    } else {
      return { ...UserDefinedConfigDefaultValue, ...{ cwd: this.option.cwd } };
    }
  }
}
