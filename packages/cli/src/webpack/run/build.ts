// tslint:disable no-console
import webpack = require('webpack');
class BuildRunner {
  public start(config: webpack.Configuration) {
    const compiler = webpack(config);
    compiler.run((err, stats) => {
      console.log(err);
      console.log(
        stats.toString({
          colors: true,
        }),
      );
    });
  }
}

export default new BuildRunner();
