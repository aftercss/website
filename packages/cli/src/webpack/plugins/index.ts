import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as webpackbar from 'webpackbar';

export const plugins: any = [
  new webpackbar({
    name: 'Client',
  }),
];

export { getHtmlPlugins } from './html';

export function getUglifyJsPlugin() {
  return new UglifyJsPlugin({
    test: /\.js(\?.*)?$/i,
  });
}
