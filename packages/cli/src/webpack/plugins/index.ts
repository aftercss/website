import * as webpackbar from 'webpackbar';

export const plugins: any = [
  new webpackbar({
    name: 'Client',
  }),
];

export { getHtmlPlugins } from './html';
