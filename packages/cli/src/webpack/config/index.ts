import * as ChainConfig from 'webpack-chain';

export function buildWebpackConfig() {
  const config = new ChainConfig();
  return config.toConfig();
}
