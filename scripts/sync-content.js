import { cpSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcDir = join(root, 'src', 'content');
const publicDir = join(root, 'public', 'content');

const contentDirs = ['projects', 'blogs', 'services'];

export function syncContent() {
    console.log('Syncing content to public directory...');

    if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

    contentDirs.forEach(dir => {
        const fullPath = join(srcDir, dir);
        if (existsSync(fullPath)) {
            const destPath = join(publicDir, dir);
            cpSync(fullPath, destPath, { recursive: true });
            console.log(`✅ Copied ${dir} to public/content`);
        }
    });
}

// Allow running directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    syncContent();
}
