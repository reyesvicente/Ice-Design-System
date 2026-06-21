import { cpSync, mkdirSync } from 'fs';
import { createRequire } from 'module';
import path from 'path';

const req = createRequire(import.meta.url);
const dest = 'dist/files';
mkdirSync(dest, { recursive: true });

for (const pkg of [
  '@fontsource-variable/inter',
  '@fontsource-variable/space-grotesk',
  '@fontsource-variable/jetbrains-mono',
]) {
  const src = path.join(path.dirname(req.resolve(`${pkg}/package.json`)), 'files');
  cpSync(src, dest, { recursive: true });
}
