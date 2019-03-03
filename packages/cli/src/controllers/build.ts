import { buildWebpackConfig } from '../webpack/config/build';
import { runWebpack } from '../webpack/run/build';
import { CommonController } from './common';

export class BuildController extends CommonController {
  public static command = 'build';
  /**
   * Controller 入口
   */
  public async entry() {
    const buildConfig = await this.loadUserConfigWithDefaultValue();
    this.registerPlugins(buildConfig);
    const webpackConfig = buildWebpackConfig(buildConfig, this.plugins);
    runWebpack(await this.pluginHandleWebpackConfig(webpackConfig));
  }
}
