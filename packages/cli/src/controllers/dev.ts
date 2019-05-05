import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

import * as webpackDevServer from 'webpack-dev-server';
import { devWebpackConfig } from '../webpack/config/dev';
import DevRunner from '../webpack/run/dev';
import { CommonController, UserDefinedConfigPath } from './common';
const defaultWebpackServerConfig: webpackDevServer.Configuration = {
  compress: true,
  hot: true,
  open: true,
  port: 8080,
};

export class DevController extends CommonController {
  public static command = 'dev';
  public static options = [['-w, --workdir [workdir]', 'current work directory', '']];
  public async entry() {
    chokidar.watch(path.resolve(this.option.cwd, UserDefinedConfigPath)).on('change', async () => {
      DevRunner.close();
      await this.serverStart();
    });
    await this.serverStart();
  }

  public async serverStart() {
    const devConfig = await this.loadUserConfigWithDefaultValue();
    this.registerPlugins(devConfig);
    const webpackConfig = devWebpackConfig(devConfig, this.plugins);
    const devSerConfig = await this.loadWebpackDevConfigWithDefaultValue();
    DevRunner.start(await this.pluginHandleWebpackConfig(webpackConfig), devSerConfig);
  }
  public async loadWebpackDevConfigWithDefaultValue(): Promise<webpackDevServer.Configuration> {
    const configFilePath = path.resolve(this.option.cwd, UserDefinedConfigPath);
    const exists = await promisify(fs.exists)(configFilePath);

    if (exists) {
      if (require.cache[configFilePath]) {
        const moduleToDel = require.cache[configFilePath];
        // prevent memory leak
        if (moduleToDel.parent) {
          moduleToDel.parent.children.splice(moduleToDel.parent.children.indexOf(moduleToDel), 1);
        }
        delete require.cache[configFilePath];
      }
      return require(configFilePath).devSer;
    } else {
      return defaultWebpackServerConfig;
    }
  }
}
