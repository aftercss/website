module.exports = {
  webpack: {
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
          script: ['https://unpkg.com/moment@2.24.0/moment.js'],
        },
        react: {
          name: 'React',
          script: ['https://unpkg.com/react@16/umd/react.development.js'],
        },
        'react-dom': {
          name: 'ReactDOM',
          script: ['https://unpkg.com/react-dom@16/umd/react-dom.development.js'],
        },
        antd: {
          name: 'antd',
          script: ['https://unpkg.com/antd@3.15.1/dist/antd.js'],
          style: ['https://unpkg.com/antd@3.15.1/dist/antd.css'],
        },
        // 'monaco-editor': {
        //   name: 'Monaco',
        //   script: [
        //     'https://cdn.bootcss.com/monaco-editor/0.15.6/min/vs/base/worker/workerMain.js',
        //     'https://cdn.bootcss.com/monaco-editor/0.15.6/min/vs/basic-languages/css/css.js',
        //     'https://cdn.bootcss.com/monaco-editor/0.15.6/min/vs/editor/editor.main.js',
        //     'https://cdn.bootcss.com/monaco-editor/0.15.6/min/vs/editor/editor.main.nls.js',
        //     'https://cdn.bootcss.com/monaco-editor/0.15.6/min/vs/language/css/cssMode.js',
        //     'https://cdn.bootcss.com/monaco-editor/0.15.6/min/vs/language/css/cssWorker.js',
        //     'https://cdn.bootcss.com/monaco-editor/0.15.6/min/vs/language/json/jsonMode.js',
        //     'https://cdn.bootcss.com/monaco-editor/0.15.6/min/vs/language/json/jsonWorker.js',
        //     'https://cdn.bootcss.com/monaco-editor/0.15.6/min/vs/loader.js',
        //   ],
        //   style: ['https://cdn.bootcss.com/monaco-editor/0.15.6/min/vs/editor/editor.main.css'],
        // },
      },
    },
  },
  deploy: {
    branch: 'test',
    dist: 'dist',
    repo: 'website.git',
    username: 'aftercss',
  },
  devSer: {
    compress: true,
    hot: true,
    open: true,
    port: 8080,
  },
};
