/* Any dotted, space-free hostname counts. The previous version matched against a
   hard-coded TLD list, which silently left multi-level hosts such as
   `segmentation-editor.pages.dev` unlinked. Values with spaces ("Feb 2026 - Apr
   2026") or a numeric last segment ("v1.2") still fall through as plain text. */
const DOMAIN = /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}\/?$/i;

const isUrl = (value) =>
    typeof value === 'string' && (/^(https?:\/\/|www\.)/i.test(value) || DOMAIN.test(value.trim()));

const hrefFor = (value) => (/^https?:\/\//i.test(value) ? value : `https://${value}`);

/**
 * "At a glance" panel for the project showcase pages: a short list of
 * label/value rows. Values that look like a site are linked.
 */
const ShowcaseFacts = ({ items = [], label = 'At a glance' }) => {
    if (items.length === 0) return null;

    return (
        <div className="bc-facts-block">
            {label && <span className="bc-eyebrow">{label}</span>}
            <dl className="bc-facts">
                {items.map((item) => (
                    <div className="bc-fact-row" key={item.label + item.value}>
                        <dt className="bc-fact-label">
                            {item.icon && <i className={item.icon} aria-hidden="true"></i>}
                            {item.label}
                        </dt>
                        <dd className="bc-fact-value">
                            {isUrl(item.value) ? (
                                <a
                                    className="bm-button bm-button--live"
                                    href={hrefFor(item.value)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open ${item.value} in a new tab`}
                                >
                                    <span className="bm-live-dot" aria-hidden="true"></span>
                                    {item.value}
                                    <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                                </a>
                            ) : (
                                item.value
                            )}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};

export default ShowcaseFacts;
