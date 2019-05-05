// tslint:disable no-console
import webpack = require('webpack');
import * as webpackDevServer from 'webpack-dev-server';
class DevRunner {
  private server: webpackDevServer;
  public start(config: webpack.Configuration, devSerConfig: webpackDevServer.Configuration) {
    const compiler = webpack(config);
    this.server = new webpackDevServer(compiler, devSerConfig);
    const port = devSerConfig.port || 8080;
    const host = devSerConfig.host || 'localhost';
    this.server.listen(port, host, () => {
      console.log(`Starting server on http://${host}:${port}`);
    });
  }
  public close() {
    if (this.server) {
      this.server.close();
    }
  }
}

export default new DevRunner();
