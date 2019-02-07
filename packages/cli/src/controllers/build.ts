import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { CLIController } from '../core/controller';
import { IBuildConfig } from '../interface/build-config';
import { buildWebpackConfig } from '../webpack/config';

export interface IBuildOptionType {
  cwd: string;
}

/**
 * cwd 下 .after.config.json / .after.config.js 文件
 */
export const UserDefinedConfigPath: string = './.after.config';

export const UserDefinedConfigDefaultValue: IBuildConfig = {
  index: {
    entry: './src/index.tsx',
  },
};

export class BuildController extends CLIController<IBuildOptionType> {
  public static command = 'build';
  public static options = [['-i, --input [input]'], ['-o, --output [output]']];
  public parseOption(commander: any) {
    return { cwd: commander.cwd };
  }
  public async entry() {
    const buildConfig = await this.loadUserConfigWithDefaultValue();
    buildWebpackConfig(buildConfig);
  }
  public async loadUserConfigWithDefaultValue(): Promise<IBuildConfig> {
    const configFilePath = path.resolve(this.option.cwd, UserDefinedConfigPath);
    const exists = await promisify(fs.exists)(configFilePath);
    if (exists) {
      return require(configFilePath);
    } else {
      return UserDefinedConfigDefaultValue;
    }
  }
}
