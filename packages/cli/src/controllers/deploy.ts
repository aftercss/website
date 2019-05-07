// tslint:disable:no-console

import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import * as shell from 'shelljs';
import { promisify } from 'util';
import { CLIController } from '../core/controller';
import { IDeployConfig } from '../interface/deploy-config';
import { UserDefinedConfigPath } from './common';
export interface IDeployOptionType {
  cwd: string;
}

export class DeployController extends CLIController<IDeployOptionType> {
  public static command = 'deploy';

  public parseOption(commander: any) {
    return { cwd: process.cwd() };
  }
  public async entry() {
    let config: IDeployConfig;
    try {
      config = await this.loadUserConfig();
    } catch (err) {
      console.log(chalk.red(err.message));
      return;
    }

    // excute deploy command
    try {
      await this.execCmd(
        `cd ${config.dist} && git init && git add -A && git commit -m 'deploy' && git push -f git@github.com:${
          config.username
        }/${config.repo} master:${config.branch}`,
        config.verbose,
      );
    } catch (err) {
      console.log(chalk.red(`[aftercss/site-cli] ${err}`));
      return;
    }
    console.log(chalk.green('[aftercss/site-cli] deploy successfully.'));
  }

  public async loadUserConfig(): Promise<IDeployConfig> {
    const configFilePath = path.resolve(this.option.cwd, UserDefinedConfigPath);
    const exists = fs.existsSync(configFilePath);
    if (!exists) {
      throw new Error('[aftercss/site-cli] There should be a configuration file in the root directory.');
    }
    const deployConfig = require(configFilePath).deploy;

    if (!deployConfig.repo) {
      throw new Error("[aftercss/site-cli] Cann't find deploy.repo in the configuration file.");
    }
    if (!deployConfig.username) {
      throw new Error("[aftercss/site-cli] Cann't find deploy.username in the configuration file.");
    }
    const config: IDeployConfig = {
      branch: deployConfig.type === 'project' ? 'gh-pages' : 'master',
      dist: 'dist',
      repo: '',
      username: '',
      verbose: false,
    };
    Object.assign(config, deployConfig);
    if (!path.isAbsolute(config.dist)) {
      config.dist = path.resolve(this.option.cwd, config.dist);
    }
    return config;
  }

  public async execCmd(shellCommand: string, verbose: boolean) {
    return new Promise((resolve, reject) => {
      shell.exec(shellCommand, { silent: !verbose }, (code, res, err) => {
        if (err && code === 1) {
          reject(err);
          return;
        }
        if (err) {
          console.log(chalk.yellow(`[aftercss/site-cli] ${err}`));
        }
        resolve(code);
      });
    });
  }
}
