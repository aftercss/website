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
    compiler.hooks.afterCompile.tapPromise('OutPutManagerPlugin', async compilation => {
      const chunkGroup = compilation.namedChunks.get(this.entryName);
      if (!chunkGroup) {
        return;
      }
      const pageManager = new PageManager();
      pageManager.title = this.entryName;
      if (this.plugins) {
        for (const plugin of this.plugins) {
          await plugin.phaseHtmlEntry(pageManager, chunkGroup);
        }
      }
      pageManager.scripts = pageManager.scripts.concat(
        chunkGroup.files.filter((file: string) => {
          return !file.match(/\.map$/);
        }),
      );
      const htmlContent = pageManager.toString();
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
