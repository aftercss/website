export interface IBuildConfig {
  cwd: string;
  pages: {
    [key: string]: {
      entry: string;
    };
  };
  output: string;
}
