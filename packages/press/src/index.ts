import { entry as cliEntry } from '@aftercss/site-cli';
import * as Command from 'commander';
import { version } from '../package.json';
import PreProcessor from './preprocesser';

export function exec(args: string[]) {
  const cmdExector = execCmd.bind(null, args);
  Command.version(version)
    .command('dev')
    .action(cmdExector)
    .command('build')
    .action(cmdExector);
}

async function execCmd(args: string[]) {
  const preprocesser = new PreProcessor(process.cwd());
  await preprocesser.init();
  await preprocesser.genEntryFile();
  cliEntry(args);
}
