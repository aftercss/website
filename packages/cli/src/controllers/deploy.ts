// import * as fs from 'fs';
// import * as path from 'path';
// import { promisify } from 'util';
// import { CLIController } from '../core/controller';
// import { IDeployConfig } from '../interface/deploy-config';
// import { IBuildOptionType, UserDefinedConfigPath } from './build';
// export interface IDeployOptionType {
//   output: string;
//   repo: string;
//   branch: string;
// }

// export class BuildController extends CLIController<IBuildOptionType> {
//   public static command = 'deploy';

//   public async entry() {}
//   public async loadUserConfig(): Promise<IDeployConfig> {
//     const configFilePath = path.resolve(this.option.cwd, UserDefinedConfigPath);
//     const exists = await promisify(fs.exists)(configFilePath);
//     if (!exists) {
//       throw new Error('should have a config file');
//     }
// 		const deployConfig = require(configFilePath).deploy;
// 		if(!deployConfig.hasOwnProperty('repo')){
// 			throw new Error('must hav `repo` prop in config.deploy')

// 		}
//   }
// }
