var MonacoEditorAfterSitePlugin = require('./build/index').MonacoEditorAfterSitePlugin;
module.exports = {
  build: {
    pages: {
      index: { entry: './src/index.tsx', title: 'spades' },
      second: { entry: './src/second.ts' },
    },
    output: './dist',
    alias: {
      'source-map': require.resolve('./src/fake-source-map/index.js'),
    },
    plugin: {
      external: {
        moment: {
          name: 'moment',
          script: ['https://unpkg.com/moment@2.24.0/min/moment.min.js'],
        },
        react: {
          name: 'React',
          script: ['https://unpkg.com/react@16/umd/react.production.min.js'],
        },
        'react-dom': {
          name: 'ReactDOM',
          script: ['https://unpkg.com/react-dom@16/umd/react-dom.production.min.js'],
        },
        antd: {
          name: 'antd',
          script: ['https://unpkg.com/antd@3.15.1/dist/antd.min.js'],
          style: ['https://unpkg.com/antd@3.15.1/dist/antd.min.css'],
        },
      },
      MonacoEditorAfterSitePlugin: new MonacoEditorAfterSitePlugin(),
    },
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
    https: true,
  },
};
