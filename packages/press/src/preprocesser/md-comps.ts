import { resolve } from 'path';

const INDEX_REG = /\breadme.md/i;

function fileToComponentName(file: string) {
  const main = file.slice(1, -3); // 去掉extname
  return file[0].toUpperCase() + main.replace(/\/\.*(\w)/g, (match, p1) => p1.toUpperCase());
}

function fileToPath(file: string) {
  if (INDEX_REG.test(file)) {
    return `/${file.replace(INDEX_REG, '')}`;
  } else {
    return `/${file.replace('.md', '')}`;
  }
}

export async function getMDCompFileContent(pages: string[], basePath: string) {
  let componentsToImport: string = '';
  const navSource: string[] = [];
  pages.map(page => {
    const component = fileToComponentName(page);
    const path = fileToPath(page);
    componentsToImport += `import ${component}, { getHeaders as ${component}Headers, getTitle as ${component}Title} from '${resolve(basePath, page)}';\n`;
    navSource.push(`{
      comp: ${component},
      getHeaders: ${component}Headers,
      getTitle: ${component}Title,
      path: '${path}',
    }`);
  });

  return `
    ${componentsToImport}
    export default [${navSource.join(',')}]
  `;
}
