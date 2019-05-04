import { entry as cliEntry } from '@aftercss/site-cli';
import * as Command from 'commander';
import * as fs from 'fs';
import { resolve } from 'path';
import PreProcessor from './preprocesser';

// 放弃require -> 编译前后文件在结构树种同一层级
const version = JSON.parse(
  fs.readFileSync('../package.json', {
    encoding: 'utf-8',
  }),
).version;

export function exec(args: string[]) {
  const cmdExector = execCmd.bind(null, args);
  Command.version(version)
    .command('dev')
    .action(cmdExector)
    .command('build')
    .action(cmdExector);
  Command.parse(args);
}

async function execCmd(args: string[]) {
  const preprocesser = new PreProcessor(process.cwd());
  await preprocesser.init();
  await preprocesser.genEntryFile();
  args.push('-w', resolve(__dirname, '../'));
  cliEntry(args);
}
