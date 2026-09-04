/**
 * Single source of truth for how services are grouped, ordered and numbered.
 *
 * Both the catalogue page and the solutions index in the rail read from here,
 * so they can never drift out of order relative to each other.
 *
 * Display numbers are **derived from position**, never stored in frontmatter.
 * Remove a service and the rest renumber themselves; the `id` in a service's
 * frontmatter is only an internal key and never needs editing.
 */

/**
 * Grouped by domain so the page reads as a catalogue: pick the problem area
 * first, the practice area second. Slugs are listed explicitly to keep the
 * reading order stable regardless of file or id order.
 */
export const SERVICE_GROUPS = [
    {
        label: 'Healthcare & life sciences',
        note: 'Clinical, diagnostic and pharmaceutical systems — from imaging and treatment planning to hospital infrastructure.',
        slugs: [
            'intelligent-healthcare-pharma',
            'digital-hospital-infrastructure',
            'medical-imaging-ai-radiology',
            'radiotherapy-planning-contouring',
        ],
    },
    {
        label: 'AI, data & platforms',
        note: 'The intelligence layer: models, agents, analytics pipelines and the products built on top of them.',
        slugs: [
            'ai-machine-learning',
            'agentic-ai-llm-engineering',
            'retrieval-knowledge-systems',
            'document-intelligence-reporting',
            'computer-vision-inspection',
            'ai-evaluation-assurance',
            'big-data-analytics',
            'enterprise-saas-platform',
        ],
    },
    {
        label: 'Infrastructure & operations',
        note: 'What keeps the rest running: automation on the floor, data pipelines underneath, and scale in the cloud.',
        slugs: [
            'data-engineering-pipelines',
            'mlops-model-lifecycle',
            'cloud-devops-architecture',
            'industrial-automation',
        ],
    },
];

/**
 * Groups with their resolved items, each carrying a running display number `n`
 * that counts continuously across the whole catalogue.
 *
 * A service added to /content/services but not listed in any group above joins
 * the final group rather than spawning a stray "additional" section — it stays
 * visible and numbered without anyone having to edit this file first.
 */
export const groupedServices = (services) => {
    const bySlug = new Map(services.map((service) => [service.slug, service]));
    const claimed = new Set(SERVICE_GROUPS.flatMap((group) => group.slugs));
    const unlisted = services.filter((service) => !claimed.has(service.slug));
    const lastIndex = SERVICE_GROUPS.length - 1;

    let counter = 0;

    return SERVICE_GROUPS.map((group, index) => {
        const items = group.slugs
            .map((slug) => bySlug.get(slug))
            .filter(Boolean)
            .concat(index === lastIndex ? unlisted : []);

        return {
            ...group,
            items: items.map((service) => ({ ...service, n: ++counter })),
        };
    }).filter((group) => group.items.length > 0);
};

/** Flat catalogue order, numbering intact. Used by the solutions index. */
export const orderedServices = (services) =>
    groupedServices(services).flatMap((group) => group.items);

/** Display number formatting: 1 -> "01". */
export const padIndex = (value) => String(value).padStart(2, '0');
