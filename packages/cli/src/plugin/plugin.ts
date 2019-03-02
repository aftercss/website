import webpack = require('webpack');
import { WebpackMerge } from 'webpack-merge';
import { PageManager } from '../page-manager';

export class AfterSitePlugin<T extends any = any> {
  public rawOptions: T;
  public constructor(options: T) {
    this.rawOptions = options;
  }
  public async phaseWebpackConfig(
    webpackConfig: webpack.Configuration,
    merge: WebpackMerge,
  ): Promise<webpack.Configuration> {
    return webpackConfig;
  }
  public async phaseHtmlEntry(pageManger: PageManager) {}
}
