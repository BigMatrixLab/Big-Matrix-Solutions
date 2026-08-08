/**
 * Restructures rendered solution markdown into distinct presentation blocks.
 *
 * The source files lean almost entirely on bullet lists and emoji prefixes, so
 * a straight render reads as one long monotonous column. This pass detects the
 * shape of each block and rewrites it into the right component:
 *
 *   emoji-prefixed lines      -> check chips        (.bm-md-checks)
 *   "**Label**: value" lines  -> spec rows          (.bm-md-specs)
 *   labelled bullet lists     -> definition grid    (.bm-md-defs)
 *   two-column metric tables  -> metric tiles       (.bm-md-metrics)
 *   "### 1. Title"            -> numbered heading   (.bm-md-num)
 *
 * Input is already sanitised by the renderer; this only moves existing nodes
 * and creates elements from their text, so nothing unsafe is introduced.
 */

const LEADING_EMOJI = /^\s*(?:\p{Extended_Pictographic}\uFE0F?\s*)+/u;
const LEADING_COLON = /^\s*[:\u2013\u2014-]\s*/;
const NUMBERED_HEADING = /^\s*(\d{1,2})\.\s+/;

const textOf = (nodes) => nodes.map((node) => node.textContent).join('').trim();

/** Splits a block's children into lines at <br> boundaries. */
const splitOnBreaks = (element) => {
    const lines = [[]];

    Array.from(element.childNodes).forEach((node) => {
        if (node.nodeName === 'BR') lines.push([]);
        else lines[lines.length - 1].push(node);
    });

    return lines.filter((nodes) => textOf(nodes) !== '');
};

const firstTextNode = (element) => {
    const walk = (node) => {
        if (node.nodeType === 3) return node;
        for (const child of node.childNodes) {
            const found = walk(child);
            if (found) return found;
        }
        return null;
    };
    return walk(element);
};

const stripLeading = (element, pattern) => {
    const node = firstTextNode(element);
    if (node) node.textContent = node.textContent.replace(pattern, '');
};

/** A line shaped like "**Label**: detail". */
const labelOf = (nodes) => {
    const meaningful = nodes.filter(
        (node) => node.nodeType !== 3 || node.textContent.trim() !== ''
    );
    const first = meaningful[0];
    if (!first || first.nodeName !== 'STRONG') return null;

    const rest = textOf(meaningful.slice(1));
    if (rest && !LEADING_COLON.test(rest)) return null;

    return { strong: first, rest: meaningful.slice(1) };
};

const buildChecks = (doc, lines) => {
    const list = doc.createElement('ul');
    list.className = 'bm-md-checks';

    lines.forEach((nodes) => {
        const item = doc.createElement('li');

        const icon = doc.createElement('i');
        icon.className = 'bi bi-check-lg';
        icon.setAttribute('aria-hidden', 'true');

        const body = doc.createElement('span');
        nodes.forEach((node) => body.appendChild(node));
        stripLeading(body, LEADING_EMOJI);
        stripLeading(body, LEADING_COLON);

        item.append(icon, body);
        list.appendChild(item);
    });

    return list;
};

const buildSpecs = (doc, entries) => {
    const list = doc.createElement('dl');
    list.className = 'bm-md-specs';

    entries.forEach(({ strong, rest }) => {
        const row = doc.createElement('div');

        const term = doc.createElement('dt');
        term.textContent = strong.textContent.replace(/:\s*$/, '');

        const detail = doc.createElement('dd');
        rest.forEach((node) => detail.appendChild(node));
        stripLeading(detail, LEADING_COLON);

        row.append(term, detail);
        list.appendChild(row);
    });

    return list;
};

const buildDefs = (doc, entries) => {
    const list = doc.createElement('dl');
    list.className = 'bm-md-defs';

    entries.forEach(({ strong, rest }) => {
        const row = doc.createElement('div');

        const term = doc.createElement('dt');
        term.textContent = strong.textContent.replace(/:\s*$/, '');

        const detail = doc.createElement('dd');
        rest.forEach((node) => detail.appendChild(node));
        stripLeading(detail, LEADING_COLON);

        row.append(term, detail);
        list.appendChild(row);
    });

    return list;
};

const meaningfulChildren = (element) =>
    Array.from(element.childNodes).filter(
        (node) => node.nodeType !== 3 || node.textContent.trim() !== ''
    );

/**
 * Single-line paragraphs carry two recurring roles in these files:
 * a bold-only line acting as a caption above a list, and "**Label**: detail"
 * acting as an aside. Both get marked so they stop reading as body copy.
 */
const annotateParagraph = (paragraph) => {
    const children = meaningfulChildren(paragraph);
    const [first, ...rest] = children;
    if (!first || first.nodeName !== 'STRONG') return;

    const restText = textOf(rest);

    // Bold line on its own — a caption for whatever follows. The colon may sit
    // either inside or outside the emphasis.
    if (!restText || /^[:\u2013\u2014-]$/.test(restText)) {
        first.textContent = first.textContent.replace(/:\s*$/, '');
        rest.forEach((node) => node.remove());
        paragraph.classList.add('bm-md-kicker');
        return;
    }

    if (!LEADING_COLON.test(restText)) return;

    first.textContent = first.textContent.replace(/:\s*$/, '');

    const next = rest[0];
    if (next.nodeType === 3) next.textContent = next.textContent.replace(LEADING_COLON, '');
    else stripLeading(next, LEADING_COLON);

    paragraph.classList.add('bm-md-note');
};

/** Paragraphs of <br>-separated lines become chips or spec rows. */
const convertParagraph = (doc, paragraph) => {
    const lines = splitOnBreaks(paragraph);

    if (lines.length < 2) {
        annotateParagraph(paragraph);
        return;
    }

    const emojiLines = lines.filter((nodes) => LEADING_EMOJI.test(textOf(nodes)));
    if (emojiLines.length >= Math.ceil(lines.length * 0.6)) {
        paragraph.replaceWith(buildChecks(doc, lines));
        return;
    }

    const entries = lines.map(labelOf);
    if (entries.every(Boolean)) {
        paragraph.replaceWith(buildSpecs(doc, entries));
    }
};

/** Bullet lists where every item carries a bold label become a grid. */
const convertList = (doc, list) => {
    if (list.closest('li')) return;

    const items = Array.from(list.children).filter((node) => node.tagName === 'LI');
    if (items.length < 3) return;
    if (items.some((item) => item.querySelector('ul, ol'))) return;

    const entries = items.map((item) => labelOf(Array.from(item.childNodes)));
    if (!entries.every(Boolean)) return;

    list.replaceWith(buildDefs(doc, entries));
};

/** Two-column tables of figures become metric tiles. */
const convertTable = (doc, table) => {
    const rows = Array.from(table.querySelectorAll('tr')).filter(
        (row) => row.querySelectorAll('td').length === 2
    );
    if (rows.length < 2) return;

    const readings = rows.map((row) => {
        const cells = row.querySelectorAll('td');
        return {
            label: cells[0].textContent.trim(),
            value: cells[1].textContent.trim(),
        };
    });

    const numeric = readings.every(
        (reading) => reading.value.length <= 28 && /\d/.test(reading.value)
    );
    if (!numeric) return;

    const grid = doc.createElement('div');
    grid.className = 'bm-md-metrics';

    readings.forEach(({ label, value }) => {
        const tile = doc.createElement('div');
        tile.className = 'bm-md-metric';

        const match = value.match(/^([<>~]?[\d.,]+\s*(?:%|x|×)?)\s*(.*)$/i);

        const figure = doc.createElement('strong');
        figure.textContent = match ? match[1].trim() : value;
        tile.appendChild(figure);

        if (match && match[2]) {
            const note = doc.createElement('em');
            note.textContent = match[2].trim();
            tile.appendChild(note);
        }

        const caption = doc.createElement('span');
        caption.textContent = label;
        tile.appendChild(caption);

        grid.appendChild(tile);
    });

    table.replaceWith(grid);
};

/** "1. Predictive Maintenance" gets a real mono index. */
const convertHeading = (doc, heading) => {
    const match = heading.textContent.match(NUMBERED_HEADING);
    if (!match) return;

    stripLeading(heading, NUMBERED_HEADING);

    const index = doc.createElement('span');
    index.className = 'bm-md-num';
    index.textContent = String(match[1]).padStart(2, '0');

    heading.prepend(index);
    heading.classList.add('is-numbered');
};

export function enrichSolutionHtml(html) {
    if (!html || typeof window === 'undefined' || typeof DOMParser === 'undefined') {
        return html;
    }

    try {
        const parsed = new DOMParser().parseFromString(
            `<div id="bm-doc-root">${html}</div>`,
            'text/html'
        );
        const root = parsed.getElementById('bm-doc-root');
        if (!root) return html;

        root.querySelectorAll('p').forEach((node) => {
            if (!node.closest('blockquote')) convertParagraph(parsed, node);
        });
        root.querySelectorAll('ul').forEach((node) => {
            if (!node.closest('blockquote')) convertList(parsed, node);
        });
        root.querySelectorAll('table').forEach((node) => convertTable(parsed, node));
        root.querySelectorAll('h3, h4').forEach((node) => convertHeading(parsed, node));

        // Any emoji still sitting at the head of a block loses its prefix.
        root.querySelectorAll('p, li, dd, h2, h3, h4').forEach((node) => {
            if (LEADING_EMOJI.test(node.textContent)) stripLeading(node, LEADING_EMOJI);
        });

        return root.innerHTML;
    } catch (error) {
        console.error('Could not enrich solution content:', error);
        return html;
    }
}

export default enrichSolutionHtml;
