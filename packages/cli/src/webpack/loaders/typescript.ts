export function getLoader4TypeScript() {
  return require.resolve('ts-loader');
}

export function getOptions4TypeScript() {
  return {
    transpileOnly: true,
  };
}
