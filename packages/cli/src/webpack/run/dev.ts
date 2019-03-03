// tslint:disable no-console
import webpack = require('webpack');
import * as webpackDevServer from 'webpack-dev-server';
export function runWebpack(config: webpack.Configuration, devSerConfig: webpackDevServer.Configuration) {
  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, devSerConfig);
  const port = devSerConfig.port || 8080;
  const host = devSerConfig.host || 'localhost';
  server.listen(port, host, () => {
    console.log(`Starting server on http://${host}:${port}`);
  });
}
