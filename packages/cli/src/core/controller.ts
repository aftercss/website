export class CLIController<OptionType> {
  public static command: string;
  public static options: string[][];
  public option: OptionType;
  public parseOption(commander: any): OptionType {
    return null;
  }
  public async entry() {}
}
