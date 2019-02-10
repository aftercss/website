import * as webpack from 'webpack';
export * from './file';
export * from './typescript';
export function getWebpackInstance() {
  return webpack;
}
