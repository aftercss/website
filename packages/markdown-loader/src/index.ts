import * as matter from 'gray-matter';
import markdown from './markdown';

export interface INav {
  headers: IHeader[];
  title: string;
}

export interface IHeader {
  id: string;
  level: string;
  title: string;
}

export default function markdownLoader(src: string) {
  const frontMatter = matter(src);
  const nav: INav = {
    headers: [],
    title: frontMatter.data.title,
  };
  const html = markdown.render(frontMatter.content, nav).replace(/\bclass="/g, 'className="');

  return `
  import * as React from 'react';
  ${frontMatter.data.imports && frontMatter.data.imports.join(';\n')};
  export function getTitle(){
    return '${nav.title}';
  }
  export function getHeaders(){
    return ${JSON.stringify(nav.headers)};
  }
  export default class MDContent extends React.Component<any>{
    public render(){
      return (<div>${html}</div>);
    }
  }
  `;
}
