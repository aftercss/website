import webpack = require('webpack');
import { WebpackMerge } from 'webpack-merge';

export class AfterSitePlugin<T extends any = any> {
  public rawOptions: T;
  public constructor(options: T) {
    this.rawOptions = options;
  }
  public phaseWebpackConfig(
    webpackConfig: webpack.Configuration,
    webpackInstance: webpack.Compiler,
    merge: WebpackMerge,
  ): webpack.Configuration {
    return webpackConfig;
  }
}
