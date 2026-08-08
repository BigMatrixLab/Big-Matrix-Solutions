const isUrl = (value) => /^(https?:\/\/|www\.)/i.test(value) || /^[\w-]+\.(com|space|dev|org|net|io|ai)/i.test(value);

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
                                <a href={hrefFor(item.value)} target="_blank" rel="noopener noreferrer">
                                    {item.value}
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
