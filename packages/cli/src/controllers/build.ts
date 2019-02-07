import { CLIController } from '../core/controller';

export interface IBuildOptionType {
  cwd: string;
}

export class BuildController extends CLIController<IBuildOptionType> {
  public static command = 'build';
  public static options = [['-i, --input [input]'], ['-o, --output [output]']];
  public parseOption(commander: any) {
    return { cwd: commander.cwd };
  }
  public entry() {
    
  }
}
