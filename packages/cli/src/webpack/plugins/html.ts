import * as htmlWebpackPlugin from 'html-webpack-plugin';
import { IBuildConfig } from '../../interface/build-config';
import { templateMaker } from '../../shared';

export function getConfig4HtmlPlugin(chuck: string): htmlWebpackPlugin.Options {
  return {
    chunks: [chuck],
    filename: chuck + '.html',
    inject: true,
    // 之后交给用户配置
    templateContent: htmlTemplate({ title: chuck }),
  };
}

const htmlTemplate = templateMaker`
<html>
  <head>
    <title>${'title'}</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export function getHtmlPlugins(buildConfig: IBuildConfig): any {
  const pages = buildConfig.pages;
  const htmlPlugins = [];
  for (const page in pages) {
    if (pages.hasOwnProperty(page)) {
      const pageHtmlPlugin = new htmlWebpackPlugin(getConfig4HtmlPlugin(page));
      htmlPlugins.push(pageHtmlPlugin);
    }
  }
  return htmlPlugins;
}
