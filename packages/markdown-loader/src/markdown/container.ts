import * as markdown from 'markdown-it';
import * as container from 'markdown-it-container';
// tslint:disable
import Token = require('markdown-it/lib/token');

export default (md: markdown) => {
  md.use(container, ...createContainer('tip', 'TIP'))
    .use(container, ...createContainer('warning', 'WARNING'))
    .use(container, ...createContainer('danger', 'DANGER'));
};

function createContainer(klass: string, defaultTitle: string): Array<any> {
  return [
    klass,
    {
      render(tokens: Token[], idx: number) {
        const token = tokens[idx];
        const info = token.info
          .trim()
          .slice(klass.length)
          .trim();
        if (token.nesting === 1) {
          return `<div className='${klass} custom-container'><div className='custom-container-title'>${info ||
            defaultTitle}</div>\n`;
        } else {
          return `</div>\n`;
        }
      },
    },
  ];
}
