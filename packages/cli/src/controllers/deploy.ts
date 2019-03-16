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

function exec(shellCommand: string) {
  return new Promise((resolve, reject) => {
    shell.exec(shellCommand, (code, res, err) => {
      if (err && code === 1) {
        reject(err);
      }
      console.log(chalk.yellow(`[aftercss/site-cli] ${err}`));
      resolve(code);
    });
  });
}

export class DeployController extends CLIController<IDeployOptionType> {
  public static command = 'deploy';

  public parseOption(commander: any) {
    return { cwd: process.cwd() };
  }
  public async entry() {
    let config;
    try {
      config = await this.loadUserConfig();
    } catch (err) {
      console.log(chalk.red(err.message));
      return;
    }

    // excute deploy command
    try {
      let pushCmd = `git push -f git@github.com:${config.username}/${config.repo} `;

      if (config.type === 'user') {
        pushCmd += `${config.branch}`;
      } else {
        pushCmd += `master:${config.branch}`;
      }
      await exec(`cd ${config.dist} && git init && git add -A && git commit -m 'deploy' && ${pushCmd}`);
    } catch (err) {
      console.log(chalk.red(`[aftercss/site-cli] ${err.message}`));
      return;
    }
    console.log(chalk.green('[aftercss/site-cli] deploy successfully.'));
  }
  public async loadUserConfig(): Promise<IDeployConfig> {
    const configFilePath = path.resolve(this.option.cwd, UserDefinedConfigPath);
    const exists = await promisify(fs.exists)(configFilePath);
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
      type: 'project',
      username: '',
    };
    Object.assign(config, deployConfig);
    if (!path.isAbsolute(config.dist)) {
      config.dist = path.resolve(this.option.cwd, config.dist);
    }
    return config;
  }
}
