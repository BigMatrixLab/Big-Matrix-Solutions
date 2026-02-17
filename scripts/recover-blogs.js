import fs from 'fs';
import path from 'path';

const blogData = [
    {
        "id": 1,
        "slug": "the-rise-of-agentic-ai-from-chatbots-to-autonomous-partners",
        "title": "The Rise of Agentic AI: From Chatbots to Autonomous Partners",
        "author": "Mera",
        "admin": "Mera",
        "comments": "12",
        "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format&fit=crop",
        "category": "Agentic AI",
        "desc": "Moving beyond reactive prompts to proactive agents that plan, decide, and execute tasks independently.",
        "date": "Feb 14, 2026",
        "contentFile": "blogs/agentic-ai.md",
        "tags": ["Agentic AI", "Machine Learning", "Automation", "AI Agents"]
    },
    {
        "id": 2,
        "slug": "mcp-the-new-standard-for-ai-tool-interoperability",
        "title": "MCP: The New Standard for AI Tool Interoperability",
        "admin": "Mera",
        "comments": "08",
        "image": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800",
        "category": "Software Development",
        "desc": "How the Model Context Protocol (MCP) is revolutionizing how AI agents connect to data and local tools.",
        "date": "Feb 08, 2026",
        "contentFile": "blogs/mcp-interoperability.md",
        "tags": ["MCP", "Software Development", "AI Integration"]
    },
    {
        "id": 3,
        "slug": "quantum-enhanced-machine-learning-breaking-the-compute-barrier",
        "title": "Quantum-Enhanced Machine Learning: Breaking the Compute Barrier",
        "admin": "Mera",
        "comments": "05",
        "image": "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=696&auto=format&fit=crop&q=80&w=800",
        "category": "AI Innovation",
        "desc": "Exploring how quantum processors are beginning to accelerate neural network training and complex simulations.",
        "date": "Jan 25, 2026",
        "contentFile": "blogs/quantum-ml.md",
        "tags": ["Quantum Computing", "Machine Learning", "AI Innovation"]
    },
    {
        "id": 4,
        "slug": "agentic-ops-the-future-of-self-healing-infrastructure",
        "title": "Agentic Ops: The Future of Self-Healing Infrastructure",
        "admin": "Mera",
        "comments": "14",
        "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        "category": "Cyber Security",
        "desc": "Autonomous agents are now monitoring and fixing server vulnerabilities in real-time using Agentic Ops.",
        "date": "Jan 12, 2026",
        "contentFile": "blogs/agentic-operations.md",
        "tags": ["Cyber Security", "AIOps", "Infrastructure"]
    },
    {
        "id": 5,
        "slug": "native-adaptive-interfaces-ai-driven-ux-personalization",
        "title": "Native Adaptive Interfaces: AI-Driven UX Personalization",
        "admin": "Mera",
        "comments": "09",
        "image": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800",
        "category": "UI Design",
        "desc": "Interfaces that reconfigure themselves in real-time based on user behavior and intent.",
        "date": "Feb 05, 2026",
        "contentFile": "blogs/adaptive-interfaces.md",
        "tags": ["UI Design", "UX", "Personalization"]
    },
    {
        "id": 6,
        "slug": "the-rise-of-specialized-small-language-models-slms",
        "title": "The Rise of Specialized Small Language Models (SLMs)",
        "admin": "Mera",
        "comments": "11",
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        "category": "Software",
        "desc": "Why the industry is moving away from massive models toward efficient, task-specific SLMs.",
        "date": "Jan 02, 2026",
        "contentFile": "blogs/small-language-models.md",
        "tags": ["Small Language Models", "AI Efficiency", "Edge Computing"]
    }
];

blogData.forEach(item => {
    const mdPath = path.join('src/content', item.contentFile);
    if (fs.existsSync(mdPath)) {
        let content = fs.readFileSync(mdPath, 'utf8');
        // Remove old frontmatter
        content = content.replace(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/g, '');

        let fm = '---\n';
        const meta = { ...item };
        delete meta.contentFile;
        Object.entries(meta).forEach(([k, v]) => {
            if (Array.isArray(v)) fm += `${k}: [${v.map(i => `"${i}"`).join(', ')}]\n`;
            else fm += `${k}: "${v}"\n`;
        });
        fm += '---\n\n';
        fs.writeFileSync(mdPath, fm + content);
        console.log(`Recovered and updated FM for ${mdPath}`);
    }
});
