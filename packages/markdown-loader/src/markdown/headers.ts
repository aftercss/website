import * as MarkdownIt from 'markdown-it';
import * as S from 'string';
export default (md: MarkdownIt, includes: string[] = []) => {
  const originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = function(...args) {
    const [tokens, idx, options, env, self] = args;

    const level = +tokens[idx].tag.substring(1);
    const title = tokens[idx + 1].content;

    const id = S(title).slugify().s;

    tokens[0].attrPush(['id', id]);

    if (!env.title) {
      env.title = title;
    }
    if (includes.includes(tokens[0].tag)) {
      env.headers.push({
        id: S(title).slugify().s,
        level,
        title,
      });
    }
    // Execute original rule.
    if (originalHeadingOpen) {
      return originalHeadingOpen.apply(this, args);
    } else {
      return self.renderToken(tokens, idx, options);
    }
  };
};
