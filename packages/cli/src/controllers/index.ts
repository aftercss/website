// import * as Commander from 'commander';
import { BuildController } from './build';
import { DevController } from './dev';

// Commander.usage('after [command]').version('1.0');

export const ControllerKlasses = [BuildController, DevController];
