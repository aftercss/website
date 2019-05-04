import chalk from 'chalk';
import * as Prismjs from 'prismjs';
// tslint:disable
const loadLanguages = require('prismjs/components/');

const DEFAULT_LANGS = ['text'];

loadLanguages(DEFAULT_LANGS);

function wrap(code: string, lang: string) {
  return `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`;
}

export default function highlight(str: string, lang: string) {
  lang = lang.toLowerCase();
  switch (lang) {
    case 'html':
    case 'xml':
      lang = 'markup';
      break;
    case 'md':
      lang = 'markdown';
      break;
    default:
      break;
  }
  if (!Prismjs.languages[lang]) {
    try {
      loadLanguages([lang]);
    } catch (err) {
      console.log(chalk.red(`[aftercss/markdown-loader] Syntax highlight for language "${lang}" isn't supported.`));
      lang = 'text';
    }
  }
  const code = Prismjs.highlight(str, Prismjs.languages[lang], lang).replace(/[{}]/g, string => `{'${string}'}`);
  return wrap(code, lang);
}