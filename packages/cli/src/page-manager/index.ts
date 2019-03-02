import { isString } from '../shared';

export type PageManagerScript = string | IPageManagerScript;

export interface IPageManagerScript {
  src: string;
  defer?: boolean;
  async?: boolean;
}

export type PageManagerStyle = string | IPageManagerStyle;

export interface IPageManagerStyle {
  src: string;
}

/**
 * HTML 生成器
 * PageManager
 */
export class PageManager {
  public scripts: PageManagerScript[] = [];
  public styles: PageManagerStyle[] = [];
  public title: string = '';
  public toString() {
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${this.title}</title>
    ${this.styles
      .map(style => {
        if (isString(style)) {
          return `<link rel="stylesheet" href="${style}"/>`;
        } else {
          return `<link rel="stylesheet" href="${style.src}"/>`;
        }
      })
      .join('\r\n')}
  </head>
  <body>
    <div id="root"></div>
    ${this.scripts
      .map(script => {
        if (isString(script)) {
          return `<script src="${script}"/>`;
        } else {
          return `<script src="${script.src}"/>`;
        }
      })
      .join('\r\n')}
	</body>
</html>`;
  }
}
