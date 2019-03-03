export interface ICommonConfig {
  cwd: string;
  pages: {
    [key: string]: {
      entry: string;
    };
  };
  alias: Record<string, string>;
  output: string;
  plugin?: Record<string, any>;
}
