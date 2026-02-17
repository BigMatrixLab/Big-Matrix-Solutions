import fs from 'fs';
import path from 'path';

const root = './';
const dataDir = path.join(root, 'src', 'data');
const contentDir = path.join(root, 'src', 'content');

const mappings = {
    'blogs': 'blogs.json',
    'services': 'services.json'
};

Object.entries(mappings).forEach(([dir, jsonFile]) => {
    const jsonPath = path.join(dataDir, jsonFile);
    if (!fs.existsSync(jsonPath)) return;

    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    data.forEach(item => {
        if (!item.contentFile) return;
        const mdPath = path.join(root, 'src', 'content', item.contentFile);
        if (!fs.existsSync(mdPath)) {
            console.warn(`File not found: ${mdPath}`);
            return;
        }

        let content = fs.readFileSync(mdPath, 'utf8');
        if (content.trimStart().startsWith('---')) {
            console.log(`Skipping ${mdPath} - already has frontmatter`);
            return;
        }

        const metadata = { ...item };
        delete metadata.contentFile;
        // Keep ID if desired, but slug and title are most important

        let frontmatter = '---\n';
        Object.entries(metadata).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                frontmatter += `${key}: [${value.map(v => `"${v}"`).join(', ')}]\n`;
            } else if (typeof value === 'object' && value !== null) {
                frontmatter += `${key}: ${JSON.stringify(value)}\n`;
            } else {
                frontmatter += `${key}: "${value}"\n`;
            }
        });
        frontmatter += '---';

        fs.writeFileSync(mdPath, `${frontmatter}\n\n${content}`);
        console.log(`✅ Added frontmatter to ${mdPath}`);
    });
});
