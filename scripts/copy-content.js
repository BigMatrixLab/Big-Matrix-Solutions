import { cpSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcContent = join(root, 'src', 'content');
const destContent = join(root, 'public', 'content');
if (!existsSync(destContent)) mkdirSync(destContent, { recursive: true });
for (const name of readdirSync(srcContent)) {
  cpSync(join(srcContent, name), join(destContent, name), { recursive: true });
}
console.log('Copied src/content to public/content');
