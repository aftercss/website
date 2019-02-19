module.exports = {
  webpack: {
    pages: {
      index: { entry: './src/index.tsx' },
    },
    output: './dist',
    alias: {
      'source-map': require.resolve('./src/fake-source-map/index.js'),
    },
  },
  deploy: {
    repo: '',
    branch: 'gh-pages',
  },
};
