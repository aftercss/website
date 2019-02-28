module.exports = {
  webpack: {
    pages: {
      index: { entry: './src/index.tsx' },
    },
    output: './dist',
    alias: {
      'source-map': require.resolve('./src/fake-source-map/index.js'),
    },
    toInject: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/editor/editor.main.css"/>
    	<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/base/worker/workerMain.js" defer></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/basic-languages/css/css.js" defer></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/language/css/cssMode.js" defer></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/language/css/cssWorker.js" defer></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/editor/editor.main.js" defer></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/language/json/jsonMode.js" defer></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/language/json/jsonWorker.js" defer></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/loader.js" defer></script>
			`,
  },
  deploy: {
    repo: '',
    branch: 'gh-pages',
  },
};
