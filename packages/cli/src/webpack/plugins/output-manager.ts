import webpack = require('webpack');

export class OutputManagerPlugin implements webpack.Plugin {
  public entryName: string;
  public constructor(entryName: string) {
    if (entryName === null || entryName === undefined || entryName === '') {
      throw new Error('require a entry name');
    }
    this.entryName = entryName;
  }
  public apply(compiler: webpack.Compiler) {
    compiler.hooks.afterCompile.tap('OutPutManagerPlugin', compilation => {
      const chunkGroup = compilation.namedChunkGroups.get(this.entryName);
      if (!chunkGroup) {
        return;
      }
    });
  }
}
