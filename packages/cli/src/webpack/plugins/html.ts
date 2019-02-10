import HtmlWebpackPlugin = require('html-webpack-plugin');
import { templateMaker } from '../../shared';
export function getHtmlPlugin() {
  return HtmlWebpackPlugin;
}

export function getConfig4HtmlPlugin(chuck: string): HtmlWebpackPlugin.Options {
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
