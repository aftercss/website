import { ControllerKlasses } from './controllers';
import { bootstrap, prepareKlass } from './core/bootstrap';

export function entry(arg: string[]) {
  prepareKlass(ControllerKlasses);
  bootstrap(arg);
}
