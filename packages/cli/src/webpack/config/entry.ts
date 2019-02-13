import { resolve } from 'path';
import { IBuildConfig } from '../../interface/build-config';
export interface IEntry {
  [index: string]: string;
}

export function getWebpackConfigEntry(buildConfig: IBuildConfig) {
  const pages = buildConfig.pages;
  const entry: IEntry = {};
  for (const item in pages) {
    if (pages.hasOwnProperty(item)) {
      entry[item] = resolve(buildConfig.cwd, pages[item].entry);
    }
  }
  return entry;
}
