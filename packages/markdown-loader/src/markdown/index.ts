import container from './container';
import highlight from './highlight';

import * as markdown from 'markdown-it';

export default markdown({
  breaks: true,
  highlight,
  html: true,
  typographer: true,

}).use(container);
