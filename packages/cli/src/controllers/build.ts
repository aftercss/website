import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { CLIController } from '../core/controller';
import { IBuildConfig } from '../interface/build-config';
import { AfterSitePlugin } from '../plugin/plugin';
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
  public plugins: Record<string, AfterSitePlugin> = {};
  public parseOption(commander: any) {
    return { cwd: process.cwd() };
  }
  public async entry() {
    this.registerPlugins();
    const buildConfig = await this.loadUserConfigWithDefaultValue();
    const webpackConfig = buildWebpackConfig(buildConfig);
    runWebpack(webpackConfig);
  }
  public registerPlugins() {
    const internalPlugins = InternalPlugins;
  }
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
