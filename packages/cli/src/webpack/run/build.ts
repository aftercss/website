// tslint:disable no-console
import webpack = require('webpack');
export function runWebpack(config: webpack.Configuration) {
  const instance = webpack(config);
  instance.run((err, stats) => {
    console.log(err);
    console.log(
      stats.toString({
        colors: true,
      }),
    );
  });
}
