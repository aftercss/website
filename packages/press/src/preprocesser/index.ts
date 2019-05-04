import * as fs from 'fs';
import globby from 'globby';
import { resolve } from 'path';
import { promisify } from 'util';

const writeP = promisify(fs.writeFile);
const INDEX_REG = /\breadme.md/i;

export interface IOptions {
  pages: string[];
  // TODO: 后面支持可自定义theme
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
  // 使用前必须先初始化
  public async init() {
    await this.resolveOptions();
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
  public async genEntryFile() {
    let componentsToImport: string = '';
    let routes: string = '';
    this.options.pages.map(page => {
      const component = this.fileToComponentName(page);
      componentsToImport += `import ${component} from '${resolve(this.cwd, 'docs', page)}';\n`;
      routes += `<Route exact path='${this.fileToPath(page)}' component={${component}}/>\n`;
    });

    const routeFile = `
      import * as React from 'react';
      import * as ReactDOM from 'react-dom';
      import { HashRouter, Link, Route, Switch } from 'react-router-dom';
      import Layout from '${this.options.theme}/Layout'
      ${componentsToImport}
      function App() {
        return (
          <HashRouter>
            <Layout>
              <Switch>
                ${routes}
              </Switch>
            </Layout>
          </HashRouter>
        )
      }
      ReactDOM.render(<App/>, document.querySelector('#root'));
    `;
    await this.writeToTemp('app.tsx', routeFile);
  }

  public fileToComponentName(file: string) {
    const main = file.slice(1, -3); // 去掉extname
    return file[0].toUpperCase() + main.replace(/\/\.*(\w)/g, (match, p1) => p1.toUpperCase());
  }

  public fileToPath(file: string) {
    if (INDEX_REG.test(file)) {
      return `/${file.replace(INDEX_REG, '')}`;
    } else {
      return `/${file.replace('.md', '')}`;
    }
  }

  private async writeToTemp(fileName: string, content: string) {
    const base = '../../app/temp';
    await writeP(resolve(__dirname, base, fileName), content);
  }
}
