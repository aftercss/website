import container from './container';
import headers from './headers';
import highlight from './highlight';

import * as markdown from 'markdown-it';

export default markdown({
  breaks: true,
  highlight,
  html: true,
  typographer: true,
})
  .use(container)
  .use(headers, ['h1', 'h2', 'h3']);
