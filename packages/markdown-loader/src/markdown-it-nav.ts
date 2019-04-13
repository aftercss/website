import * as MarkdownIt from 'markdown-it';
export default (md: MarkdownIt, navDepth: number = 2) => {
  const originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = function(...args) {
    const [tokens, idx, options, env, self] = args;

    const level = +tokens[idx].tag.substring(1);
    const title = tokens[idx + 1].children.reduce((acc, t) => acc + t.content, '');

    if (level === 1 && !env.title) {
      env.title = title;
    }
    if (level === navDepth) {
      env.list.push({
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
