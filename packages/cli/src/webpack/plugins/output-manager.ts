import webpack = require('webpack');
import { PageManager } from '../../page-manager';
import { AfterSitePlugin } from '../../plugin/plugin';

export class OutputManagerPlugin implements webpack.Plugin {
  public entryName: string;
  public plugins: AfterSitePlugin[] = [];
  public constructor(entryName: string, plugins: AfterSitePlugin[]) {
    if (entryName === null || entryName === undefined || entryName === '') {
      throw new Error('OutputManager require a entry name');
    }
    this.entryName = entryName;
    this.plugins = plugins;
  }
  public apply(compiler: webpack.Compiler) {
    compiler.hooks.afterCompile.tapAsync('OutPutManagerPlugin', async compilation => {
      const chunkGroup = compilation.namedChunks.get(this.entryName);
      if (!chunkGroup) {
        return;
      }
      const pageManger = new PageManager();
      if (this.plugins) {
        for (const plugin of this.plugins) {
          await plugin.phaseHtmlEntry(pageManger, chunkGroup);
        }
      }
      // await plugin.phaseHTMLContent;
      const htmlContent = pageManger.toString();
      compilation.assets[this.entryName + '.html'] = {
        source() {
          return htmlContent;
        },
        size() {
          return htmlContent.length;
        },
      };
    });
  }
}
