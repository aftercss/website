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
  const html = md.render(src, nav);
  return generateContent(html, nav);
}

function render(nav: INav): string {
  let listHTML = `
		<ul class="navList">
	`;
  nav.list.forEach(item => {
    listHTML += `
		<li class="item-level${item.level}">
			<a href="#${item.title}">${item.title}</a>
		</li>`;
  });
  return `
	<div class="navGroup">
		<div class="navGroupName">${nav.title}</div>
		${listHTML}
		</ul>
	</div>
`;
}

function generateContent(html: string, nav: INav): string {
  return `
	import * as React from 'react';
	
	export class Header extends React.Component {
		public render() {
			return (
				<template>
					${html}
				</template>
			);
		}
		public getRawNav(){
			return JSON.parse(${JSON.stringify(nav)})
		}
		public getNavHTML(): string{
			return ${render(nav)}
		}
	}
	`;
}

export default markdownLoader;
