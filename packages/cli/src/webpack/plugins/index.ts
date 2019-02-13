import * as friendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import * as webpackbar from 'webpackbar';

export const plugins: any = [
  new friendlyErrorsWebpackPlugin(),
  new webpackbar({
    name: 'Client',
  }),
];

export { getHtmlPlugins } from './html';
