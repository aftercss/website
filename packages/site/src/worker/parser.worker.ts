import { AfterContext } from '@aftercss/shared';
import { CSSTokenizer } from '@aftercss/tokenizer';
/* tslint:disable */
import { Root } from '@aftercss/parser/lib/parser-node/index';
import { CSSParser } from '@aftercss/parser';
import * as postcss from 'postcss';

export interface IWorkerOuput {
  res: postcss.Root | Root;
  time: number;
}

const ctx: Worker = self as any;

ctx.addEventListener('message', event => {
  const { css, type } = event.data;
  const out: IWorkerOuput = {
    res: new Root(),
    time: 0,
  };
  const start = performance.now();
  try {
    if (type === 'Aftercss') {
      const tokenizer = new CSSTokenizer(
        new AfterContext({
          fileContent: css,
        }),
      );
      const parser = new CSSParser(tokenizer);
      out.res = parser.parseStyleSheet();
    } else if (type === 'Postcss') {
      out.res = postcss.parse(css);
    }
  } catch (err) {
    out.res = err.message;
  }
  out.time = performance.now() - start;
  ctx.postMessage(out);
});
