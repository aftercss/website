import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import webpack = require('webpack');
import webpackMerge = require('webpack-merge');
import { CLIController } from '../core/controller';
import { ICommonConfig as IBuildConfig } from '../interface/common-config';
import { AfterSitePlugin } from '../plugin/plugin';
import { IConstructor } from '../shared';
import InternalPlugins from './../plugin';

export interface ICommonOptionType {
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

export class CommonController extends CLIController<ICommonOptionType> {
  public plugins: AfterSitePlugin[] = [];
  public parseOption(commander: any) {
    return {
      cwd: path.isAbsolute(commander.workdir) ? commander.workdir : path.resolve(process.cwd(), commander.workdir),
    };
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
    // const internalName = new Set(Object.keys(InternalPlugins));
    // const allNames = new Set(Object.keys(config.plugin));

    const PluginKlassX: Record<string, IConstructor<AfterSitePlugin>> = { ...InternalPlugins };
    for (const pluginKlassName in config.plugin) {
      if (config.plugin[pluginKlassName]) {
        if (PluginKlassX[pluginKlassName]) {
          const PluginKlass = PluginKlassX[pluginKlassName];
          this.plugins.push(new PluginKlass(config.plugin[pluginKlassName]));
        } else {
          this.plugins.push(config.plugin[pluginKlassName]);
        }
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
    const exists = fs.existsSync(configFilePath);
    if (exists) {
      /**
       * TODO： 之后解决一下ES6的问题
       * TODO: 配置简化 缩写 部分默认配置等 拓展等
       */
      if (require.cache[configFilePath]) {
        const moduleToDel = require.cache[configFilePath];
        // prevent memory leak
        if (moduleToDel.parent) {
          moduleToDel.parent.children.splice(moduleToDel.parent.children.indexOf(moduleToDel), 1);
        }
        delete require.cache[configFilePath];
      }
      return { ...require(configFilePath).build, ...{ cwd: this.option.cwd } };
    } else {
      return { ...UserDefinedConfigDefaultValue, ...{ cwd: this.option.cwd } };
    }
  }
}
