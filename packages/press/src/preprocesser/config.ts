import * as fs from 'fs';
import { resolve } from 'path';

const cssRule = [
  {
    exclude: '',
    test: /\.css$/,
    use: [
      {
        loader: require.resolve('style-loader'),
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          localIdentName: '[name]__[local]',
          modules: true,
        },
      },
    ],
  },
  {
    include: '',
    test: /\.css$/,
    use: [require.resolve('style-loader'), require.resolve('css-loader')],
  },
];

const DEFAULT_CONFIG = {
  build: {
    module: {
      rules: [...cssRule],
    },
    output: resolve(process.cwd(), './dist'),
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

export function getConfig(cwd: string, theme: string) {
  cssRule[0].exclude = cssRule[1].include = resolve(theme, 'styles');
  const configPath = resolve(cwd, PRESS_CONFIG_FILE);
  if (fs.existsSync(configPath)) {
    return { ...DEFAULT_CONFIG, ...require(configPath) };
  }
  return DEFAULT_CONFIG;
}
