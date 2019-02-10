import * as webpackbar from 'webpackbar';
export function getWebpackbarPlugin() {
  return webpackbar;
}

export function getOptions4Webpackbar() {
  return {
    profile: true,
  };
}
