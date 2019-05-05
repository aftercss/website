import { buildWebpackConfig } from '../webpack/config/build';
import BuildRunner from '../webpack/run/build';
import { CommonController } from './common';

export class BuildController extends CommonController {
  public static command = 'build';
  public static options = [['-w, --workdir [workdir]', 'current work directory', '']];
  /**
   * Controller 入口
   */
  public async entry() {
    const buildConfig = await this.loadUserConfigWithDefaultValue();
    this.registerPlugins(buildConfig);
    const webpackConfig = buildWebpackConfig(buildConfig, this.plugins);
    BuildRunner.start(await this.pluginHandleWebpackConfig(webpackConfig));
  }
}
