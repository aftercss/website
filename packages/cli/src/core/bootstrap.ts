import * as Commander from 'commander';
import { CLIController } from './controller';

export interface IControllerKlass<T = any> {
  command: string;
  options: string[][];
  new (): CLIController<T>;
}

export function prepareKlass(ControllerKlasses: Array<IControllerKlass<any>>) {
  for (const ControllerKlass of ControllerKlasses) {
    Commander.command(ControllerKlass.command);
    if (ControllerKlass.options) {
      for (const option of ControllerKlass.options) {
        (Commander as any).option(...option);
      }
    }
    Commander.action((command, cmd) => {
      const controller = new ControllerKlass();
      controller.option = controller.parseOption(cmd);
      controller.entry().catch(e => {
        // tslint:disable-next-line
        console.error(e);
      });
    });
  }
}

export function bootstrap(arg: string[]) {
  Commander.parse(arg);
}
