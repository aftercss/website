export interface IBuildConfig {
  cwd: string;
  pages: {
    [key: string]: {
      entry: string;
    };
  };
  alias: Record<string, string>;
  output: string;
}
