export function parseFrontmatter(text) {
    if (!text) return { data: {}, content: '' };

    // Remove UTF-8 BOM if present
    let trimmed = text.replace(/^\uFEFF/, '').trimStart();

    // More flexible regex: handle optional spaces and both line endings
    const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/;
    const match = trimmed.match(frontmatterRegex);

    const data = {};
    let content = text;

    if (match) {
        const yaml = match[1];
        content = trimmed.slice(match[0].length).trim();

        const lines = yaml.split(/\r?\n/);
        lines.forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex !== -1) {
                const key = line.slice(0, colonIndex).trim();
                let value = line.slice(colonIndex + 1).trim();

                // Clean up value
                if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);

                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''));
                }

                data[key] = value;
            }
        });
    }

    return { data, content };
}

export function loadContent(modules, type) {
    const items = Object.entries(modules).map(([path, raw]) => {
        try {
            const { data } = parseFrontmatter(raw);
            const fileName = path.split('/').pop();

            // If we didn't find frontmatter data, but the file exists, 
            // at least provide a title from the filename
            return {
                title: fileName.replace(/\.md$/, '').replace(/-/g, ' '),
                slug: fileName.replace(/\.md$/, ''),
                ...data,
                contentFile: `${type}/${fileName}`,
                id: data.id ? String(data.id) : `manual-${fileName}`
            };
        } catch (e) {
            console.error(`Error loading content from ${path}:`, e);
            return null;
        }
    }).filter(Boolean);

    return items.sort((a, b) => {
        if (a.date && b.date) {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (!isNaN(dateA) && !isNaN(dateB)) {
                return dateB - dateA;
            }
        }
        // Fallback sort by ID string
        return String(b.id).localeCompare(String(a.id));
    });
}
