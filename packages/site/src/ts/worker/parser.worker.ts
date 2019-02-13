import { CSSParser } from '@aftercss/parser';
/* tslint:disable */
import { Root } from '@aftercss/parser/lib/parser-node/index';
import { AfterContext } from '@aftercss/shared';
import { CSSTokenizer } from '@aftercss/tokenizer';
import * as postcss from 'postcss';

const ctx: Worker = self as any;

ctx.postMessage({ foo: 'foo' });

ctx.addEventListener('message', event => {
  const start = performance.now();
  let res: postcss.Root | Root;
  try {
    if (event.data.type === 'Aftercss') {
      const tokenizer = new CSSTokenizer(
        new AfterContext({
          fileContent: event.data.css,
        }),
      );
      const parser = new CSSParser(tokenizer);
      res = parser.parseStyleSheet();
    } else if (event.data.type === 'Postcss') {
      res = postcss.parse(event.data.css);
    }
  } catch (err) {
    res = err.message;
  }
  ctx.postMessage({
    res,
    time: performance.now() - start,
  });
  ctx.terminate();
});

export default ctx;
