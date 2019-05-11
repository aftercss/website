import * as webpack from 'webpack';
export interface ICommonConfig {
  alias: Record<string, string>;
  cwd: string;
  module?: webpack.Module;
  output: string;
  pages: {
    [key: string]: {
      entry: string;
      title?: string;
    };
  };
  plugin?: Record<string, any>;
}
