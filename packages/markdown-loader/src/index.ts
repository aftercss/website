import * as matter from 'gray-matter';
import {resolve} from 'path'
import markdown from './markdown';
import { getHeaders, getTitle } from './utils';

export default function markdownLoader(src: string) {
  const frontMatter = matter(src);
  const title = getTitle(frontMatter);
  const headers = getHeaders(frontMatter.content, ['h2', 'h3']);
  const html = markdown.render(frontMatter.content).replace(/\bclass="/g, 'className="');

  return `
  import * as React from 'react';
  ${frontMatter.data.imports && frontMatter.data.imports.join(';\n')};
  export default class MDContent extends React.Component<any>{
    public render(){
      return (<div>${html}</div>);
    }
  }
  `;
}
