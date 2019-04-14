import glob from 'glob';
import * as path from 'path';
import { promisify } from 'util';
export async function entry(sourcePath: string): Promise<Record<string, string>> {
  const files = await promisify(glob)(path.resolve(sourcePath, './**/*.md'));
  const relativePath = files.map((file: string) => path.relative(file, this.root));
  // todo
  return {};
}
