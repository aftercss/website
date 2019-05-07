import * as fs from 'fs';
import { resolve } from 'path';

const DEFAULT_CONFIG = {
  build: {
    output: './dist',
    pages: {
      index: { entry: resolve(__dirname, '../../app/index.tsx'), title: '@aftercss/press' },
    },
  },
  deploy: {
    branch: 'gh-pages',
    dist: 'dist',
    repo: 'website.git',
    username: 'aftercss',
  },
  devSer: {
    compress: true,
    hot: true,
    https: false,
    open: true,
    port: 8080,
  },
};

const PRESS_CONFIG_FILE = './afterpress.config.js';

export function getConfig(cwd: string) {
  const configPath = resolve(cwd, PRESS_CONFIG_FILE);
  if (fs.existsSync(configPath)) {
    return { ...DEFAULT_CONFIG, ...require(configPath) };
  }
  return DEFAULT_CONFIG;
}
