module.exports = {
  webpack: {
    pages: {
      index: { entry: './src/index.tsx' },
    },
    output: './dist',
  },
  deploy: {
    repo: '',
    branch: 'gh-pages',
  },
};
