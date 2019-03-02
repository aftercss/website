module.exports = {
  webpack: {
    pages: {
      index: { entry: './src/index.tsx' },
      second: { entry: './src/second.ts' },
    },
    output: './dist',
    alias: {
      'source-map': require.resolve('./src/fake-source-map/index.js'),
    },
    plugin: {
      external: {
        react: {
          name: 'react',
          script: ['https://react.js'],
        },
        'monaco-editor': {
          name: 'Monaco',
          script: [
            'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/base/worker/workerMain.js',
            'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/basic-languages/css/css.js',
            'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/language/css/cssMode.js',
            'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/language/css/cssWorker.js',
            'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/editor/editor.main.js',
            'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/language/json/jsonMode.js',
            'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/language/json/jsonWorker.js',
            'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/loader.js',
          ],
          style: ['https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/editor/editor.main.css'],
        },
      },
    },
  },
  deploy: {
    repo: '',
    branch: 'gh-pages',
  },
};
