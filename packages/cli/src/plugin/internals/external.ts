import webpack = require('webpack');
import { WebpackMerge } from 'webpack-merge';
import { PageManager } from '../../page-manager';
import { isString } from '../../shared';
import { AfterSitePlugin } from '../plugin';

interface IExternalOptions {
  [key: string]: {
    name: string | string[];
    script: string | string[];
    style?: string | string[];
  };
}

export class ExternalPlugin extends AfterSitePlugin<IExternalOptions> {
  public constructor(options: IExternalOptions) {
    super(options);
  }
  public async phaseWebpackConfig(webpackConfig: webpack.Configuration, merge: WebpackMerge) {
    super.phaseWebpackConfig(webpackConfig, merge);
    const externalOptions: webpack.ExternalsElement = {};
    for (const name in this.rawOptions) {
      if (this.rawOptions.hasOwnProperty(name)) {
        externalOptions[name] = {
          window: this.rawOptions[name].name,
        };
      }
    }
    return merge(webpackConfig, {
      externals: externalOptions,
    });
  }
  public async phaseHtmlEntry(pageManager: PageManager, chunkGroup: any) {
    super.phaseHtmlEntry(pageManager, chunkGroup);
    /**
     * 现在会把所有的东西，之后要区分一下依赖，只送必要的
     */
    for (const externalItem in this.rawOptions) {
      if (this.rawOptions.hasOwnProperty(externalItem)) {
        const scripts = this.rawOptions[externalItem].script || [];
        if (isString(scripts)) {
          pageManager.scripts.push(scripts);
        } else {
          scripts.forEach(src => {
            pageManager.scripts.push(src);
          });
				}
        const styles = this.rawOptions[externalItem].style || [];
        if (isString(styles)) {
          pageManager.styles.push(styles);
        } else {
          styles.forEach(src => {
            pageManager.styles.push(src);
          });
        }
      }
    }
  }
  public isModuleInChunk(): boolean {
    return true;
  }
}
