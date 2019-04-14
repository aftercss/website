import { CLIController } from '../core/controller';

interface IDocControllerOption {
  cwd: string;
  build: boolean;
  dev: boolean;
}

export class DocController extends CLIController<IDocControllerOption> {
  public static command = 'doc';
  public static options = [['--build', 'build docs'], ['--dev', 'dev docs']];
  public parseOption(commander: any) {
    let build = true;
    let dev = false;
    if (commander.dev) {
      dev = true;
      build = false;
    }
    if (commander.build) {
      build = true;
      dev = false;
    }
    return {
      build,
      cwd: process.cwd(),
      dev,
    };
  }
  public async entry() {
    
  }
}
