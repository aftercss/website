import { AfterSitePlugin } from '../plugin';

interface IExternalOptions {
  [key: string]: {
    name: string;
    path: string;
  };
}

export class ExternalPlugin extends AfterSitePlugin<IExternalOptions> {
  public constructor(options: IExternalOptions) {
    super(options);
  }
}
