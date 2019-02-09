// tslint:disable no-console
import webpack = require('webpack');
import { getWebpackInstance } from '../loaders';

export function runWebpack(config: webpack.Configuration) {
  const instance = getWebpackInstance()(config);
  instance.run((err, stats) => {});
}
