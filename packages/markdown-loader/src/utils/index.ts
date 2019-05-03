
import * as S from 'string';
import markdown from '../markdown';



export interface IFront {
  data: IYamlData;
  content: string;
}

export interface IHeader {
  level: number;
  slug: string;
  title: string;
}

export interface IYamlData {
  title?: string;
}



export function getHeaders(origin: string, include: string[]) {
  const tokens = markdown.parse(origin, {});
  const res: IHeader[] = [];
  tokens.forEach((token, index) => {
    if (token.type === 'heading_open' && include.includes(token.tag)) {
      const title = tokens[index + 1].content;
      res.push({
        level: parseInt(token.tag.slice(1), 10),
        slug: S(title).slugify().s,
        title,
      });
    }
  });
  return res;
}

/**
 *
 * @param origin
 * @returns string
 */
export function getTitle(parsed: IFront): string {
  // front 中指定
  if (parsed.data.title) {
    return parsed.data.title;
  }
  // 未指定，由内容推测
  const match = parsed.content.match(/^#+\s+(.*)/);
  if (match) {
    return match[1];
  }

  return '';
}