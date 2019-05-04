module.exports = {
  build: {
    pages: {
      index: { entry: './app/temp/app.tsx', title: '@aftercss/press' },
    },
    output: './dist',
  },
  deploy: {
    branch: 'gh-pages',
    dist: 'dist',
    repo: 'website.git',
    username: 'aftercss',
  },
  devSer: {
    compress: true,
    hot: true,
    open: true,
    port: 8080,
    https: false,
  },
};
