export function getLoader4Worker() {
  return require.resolve('worker-loader');
}

export function getOptions4Worker() {
  return {
    name: 'worker.js',
  };
}
