import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

import * as webpackDevServer from 'webpack-dev-server';
import { devWebpackConfig } from '../webpack/config/dev';
import { runWebpack } from '../webpack/run/dev';
import { CommonController, UserDefinedConfigPath } from './common';
const defaultWebpackServerConfig: webpackDevServer.Configuration = {
  compress: true,
  hot: true,
  open: true,
  port: 8080,
};

export class DevController extends CommonController {
  public static command = 'dev';
  public async entry() {
    const devConfig = await this.loadUserConfigWithDefaultValue();
    this.registerPlugins(devConfig);
    const webpackConfig = devWebpackConfig(devConfig);
    const devSerConfig = await this.loadWebpackDevConfigWithDefaultValue();
    runWebpack(webpackConfig, devSerConfig);
  }
  public async loadWebpackDevConfigWithDefaultValue(): Promise<webpackDevServer.Configuration> {
    const configFilePath = path.resolve(this.option.cwd, UserDefinedConfigPath);
    const exists = await promisify(fs.exists)(configFilePath);
    if (exists) {
      return require(configFilePath).devSer;
    } else {
      return defaultWebpackServerConfig;
    }
  }
}
