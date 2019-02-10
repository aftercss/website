export function templateMaker<T extends string>(templates: TemplateStringsArray, ...argKeys: T[]) {
  return (data: { [K in T]: string }) => {
    let res = '';
    for (let index = 0; index < templates.length; index++) {
      res += templates[index];
      if (index !== templates.length - 1) {
        res += data[argKeys[index]];
      }
    }
    return res;
  };
}
