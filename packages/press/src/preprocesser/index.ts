import * as fs from 'fs';
import globby from 'globby';
import { resolve } from 'path';
import { promisify } from 'util';
import { getConfig } from './config';
import { getMDCompFileContent } from './md-comps';

const writeP = promisify(fs.writeFile);

export interface IOptions {
  pages: string[];
  theme: string;
}

export default class PreProcessor {
  private cwd: string;
  private options: IOptions;
  constructor(cwd: string) {
    this.cwd = cwd;
    this.options = {
      pages: [],
      theme: resolve(__dirname, '../../app/theme'),
    };
  }

  public async run() {
    await this.resolveOptions();
    // generate app/.temp/md-comp.ts
    const mdCompFile = await getMDCompFileContent(this.options.pages, resolve(this.cwd, 'docs'));
    await this.writeToTemp('md-comps.ts', mdCompFile);
    // generate app/.temp/.after.config.js
    const config = getConfig(this.cwd);
    config.build.alias = {
      '@theme': this.options.theme,
    };
    await this.writeToTemp('.after.config.js', `module.exports=${JSON.stringify(config)}`);
  }

  public async resolveOptions() {
    // 扫描markdown文件
    const pages = await globby(['**/*.md'], {
      cwd: resolve(this.cwd, 'docs'),
    });
    this.options.pages = pages;

    // 自定义theme
    // 检测theme目录下是否存在Layout组件
    const hasCustomTheme =
      fs.existsSync(resolve(this.cwd, 'theme')) &&
      (fs.existsSync(resolve(this.cwd, 'theme/Layout.tsx')) || fs.existsSync(resolve(this.cwd, 'theme/Layout.jsx')));
    if (hasCustomTheme) {
      this.options.theme = resolve(this.cwd, 'theme');
    }
  }

  private async writeToTemp(fileName: string, content: string) {
    const base = resolve(__dirname, '../../app/.temp');
    if (!fs.existsSync(base)) {
      fs.mkdirSync(base);
    }
    await writeP(resolve(base, fileName), content);
  }
}
