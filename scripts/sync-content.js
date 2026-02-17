import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcDir = join(root, 'src', 'content');
const dataDir = join(root, 'src', 'data');
const publicDir = join(root, 'public', 'content');

const contentDirs = ['projects', 'blogs', 'services'];

function parseFrontmatter(content) {
    const match = content.trimStart().match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return { data: {}, content };

    const data = {};
    const lines = match[1].split(/\r?\n/);
    lines.forEach(line => {
        const indexOfColon = line.indexOf(':');
        if (indexOfColon !== -1) {
            const key = line.slice(0, indexOfColon).trim();
            let value = line.slice(indexOfColon + 1).trim();

            // Handle quotes
            if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);

            // Handle arrays
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(v => {
                    v = v.trim();
                    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
                    else if (v.startsWith("'") && v.endsWith("'")) v = v.slice(1, -1);
                    return v;
                });
            }

            data[key] = value;
        }
    });
    return { data, content: content.slice(match[0].length).trim() };
}

export function syncContent() {
    console.log('Syncing content from src/content to src/data...');

    if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true });
    }

    contentDirs.forEach(dir => {
        const fullPath = join(srcDir, dir);
        if (!existsSync(fullPath)) {
            console.warn(`Directory not found: ${fullPath}`);
            return;
        }

        // Copy to public folder
        const destPath = join(publicDir, dir);
        if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });
        cpSync(fullPath, destPath, { recursive: true });
        const files = readdirSync(fullPath).filter(f => f.endsWith('.md'));
        const items = files.map((file, index) => {
            const filePath = join(fullPath, file);
            const content = readFileSync(filePath, 'utf8');
            const { data } = parseFrontmatter(content);

            // Base item from frontmatter or defaults
            const item = {
                id: data.id ? parseInt(data.id) : index + 1,
                slug: data.slug || file.replace('.md', ''),
                title: data.title || file.replace('.md', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                ...data,
                contentFile: `${dir}/${file}`
            };

            // Ensure specific fields exist based on directory type
            if (dir === 'projects' && !item.category) item.category = 'Uncategorized';
            if (dir === 'blogs' && !item.date) item.date = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
            if (dir === 'blogs' && !item.author) item.author = 'Admin';

            return item;
        });

        // Sort by ID if available, or just keep order
        items.sort((a, b) => (a.id || 0) - (b.id || 0));

        const targetFile = join(dataDir, `${dir}.json`);
        writeFileSync(targetFile, JSON.stringify(items, null, 4));
        console.log(`✅ Synced ${items.length} items to ${dir}.json`);
    });
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    syncContent();
}
