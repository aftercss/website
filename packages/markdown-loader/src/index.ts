import * as MarkdownIt from 'markdown-it';
import MarkdownItNav from './markdown-it-nav';

export interface IListItem {
  level: number;
  title: string;
}

export interface INav {
  title: string;
  list: IListItem[];
}

function markdownLoader(src: string): string {
  const md = new MarkdownIt();
  const nav: INav = {
    list: [],
    title: '',
  };
  md.use(require('markdown-it-anchor')).use(MarkdownItNav);
  return generateContent(md.render(src, nav).replace(/class="/g, 'className="'), nav);
}

function renderNav(nav: INav): string {
  let listItems = '';
  nav.list.forEach(item => {
    listItems += `
		<li className="item-level${item.level}">
			<a href="#${item.title}">${item.title}</a>
		</li>`;
  });
  return `
	<div className="navGroup">
		<div className="navGroupName">${nav.title}</div>
		<ul className="navList">
			${listItems}
		</ul>
	</div>
`;
}

function generateContent(html: string, nav: INav): string {
  return `
	import * as React from 'react';
	
	export class MDContent extends React.Component {
		public render() {
			return (<div>${html}</div>);
		}
	}

	export class MDNav extends React.Component {
		public render(){
			return (${renderNav(nav)})
		}
	}
	`;
}

export default markdownLoader;
