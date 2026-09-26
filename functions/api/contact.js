/**
 * POST /api/contact — contact form handler.
 *
 * Runs as a Cloudflare Pages Function (the site is deployed on Cloudflare
 * Pages, so this file is picked up automatically from /functions and served
 * at the matching URL path). It does two things per submission:
 *
 *   1. Emails the enquiry to the team inbox, with Reply-To set to the sender
 *      so hitting reply answers the lead directly.
 *   2. Emails an acknowledgement back to the sender.
 *
 * Both go out through the Mailtrap transactional Email Sending API. The bulk
 * stream is deliberately not used — bulk mail is far more likely to be filed
 * under Gmail's Promotions tab, and these are one-to-one transactional sends.
 *
 * The Mailtrap token is read from env and never reaches the browser. See
 * docs/EMAIL_SETUP.md for where to set it.
 *
 * Deliverability choices that keep these in the primary inbox are commented
 * inline and summarised in docs/EMAIL_SETUP.md.
 */

/** Transactional stream. Bulk would be https://bulk.api.mailtrap.io/api/send. */
const MAILTRAP_ENDPOINT = 'https://send.api.mailtrap.io/api/send';

/**
 * Allowed topics, mirroring SUBJECTS in src/pages/Contact.jsx. The label is
 * resolved here rather than trusted from the request, so a crafted POST cannot
 * inject arbitrary text into the subject line. Keep both lists in sync.
 */
const TOPICS = {
    research: 'Research collaboration',
    software: 'Software solutions',
    consulting: 'AI consulting',
    partnership: 'Partnership inquiry',
    other: 'Something else',
};

/** Field caps. Anything longer is a bot or a paste accident, not a lead. */
const LIMITS = {
    name: 100,
    email: 254,
    phone: 40,
    message: 5000,
};

/** Defaults; every one of these can be overridden with an env var. */
const DEFAULTS = {
    to: 'contact@big-matrix.com',
    fromEmail: 'contact@big-matrix.com',
    fromName: 'Big-Matrix Solutions',
    siteUrl: 'https://big-matrix.com',
    phone: '+880 1339 870730',
    address: 'Bashundhara R/A, Dhaka 1229, Bangladesh',
};

/** Dev origins allowed to post here, on top of the deployment's own origin. */
const DEV_ORIGINS = new Set([
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
]);

const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'no-store',
        },
    });

const fail = (message, status = 400, field) =>
    json({ ok: false, error: message, ...(field ? { field } : {}) }, status);

const escapeHtml = (value) =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

/** Collapse whitespace and strip control characters that could forge headers. */
const clean = (value) =>
    typeof value === 'string'
        // eslint-disable-next-line no-control-regex
        ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()
        : '';

/** Keep newlines in the message, drop the rest. */
const cleanMultiline = (value) =>
    typeof value === 'string'
        ? value
            // eslint-disable-next-line no-control-regex
            .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
            .replace(/\r\n/g, '\n')
            .trim()
        : '';

/**
 * Deliberately conservative: one @, a dot in the domain, no whitespace. Full
 * RFC 5322 compliance is not the goal, catching typos and junk is.
 */
const isEmail = (value) => /^[^\s@,;:<>"']+@[^\s@,;:<>"']+\.[a-z]{2,}$/i.test(value);

/**
 * Only accept posts from a page we served. Cheap, and it removes the whole
 * class of scripted cross-site abuse without touching real submissions.
 */
const originAllowed = (request) => {
    const origin = request.headers.get('origin');
    if (!origin) return false;
    if (DEV_ORIGINS.has(origin)) return true;
    try {
        return new URL(origin).host === new URL(request.url).host;
    } catch {
        return false;
    }
};

const config = (env) => ({
    token: env.MAILTRAP_API_TOKEN,
    to: env.CONTACT_TO_EMAIL || DEFAULTS.to,
    fromEmail: env.CONTACT_FROM_EMAIL || DEFAULTS.fromEmail,
    fromName: env.CONTACT_FROM_NAME || DEFAULTS.fromName,
    siteUrl: env.SITE_URL || DEFAULTS.siteUrl,
    phone: env.CONTACT_PHONE || DEFAULTS.phone,
    address: env.CONTACT_ADDRESS || DEFAULTS.address,
});

const receivedAt = () => {
    try {
        return new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: 'Asia/Dhaka',
        }).format(new Date()) + ' (Dhaka)';
    } catch {
        return new Date().toISOString();
    }
};

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * @returns {{ error: string, field?: string } | { data: object }}
 */
function validate(payload) {
    if (!payload || typeof payload !== 'object') {
        return { error: 'Malformed request.' };
    }

    // Honeypot: a real browser never fills a hidden, visually-removed field.
    // Answer 200-with-ok to a bot so it has nothing to tune against.
    if (clean(payload.company_website)) {
        return { silentDrop: true };
    }

    // Humans take longer than two seconds to fill five fields. Weak on its own
    // (the value is client-supplied) but it costs nothing and filters scripts
    // that post the instant the page loads.
    const elapsed = Number(payload.elapsed);
    if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < 2000) {
        return { silentDrop: true };
    }

    const name = clean(payload.name);
    const email = clean(payload.email).toLowerCase();
    const phone = clean(payload.phone);
    const subject = clean(payload.subject);
    const message = cleanMultiline(payload.message);

    if (!name) return { error: 'Please tell us your name.', field: 'name' };
    if (name.length > LIMITS.name) {
        return { error: `Name must be ${LIMITS.name} characters or fewer.`, field: 'name' };
    }

    if (!email) return { error: 'Please add an email address.', field: 'email' };
    if (email.length > LIMITS.email || !isEmail(email)) {
        return { error: 'That email address does not look right.', field: 'email' };
    }

    if (phone.length > LIMITS.phone) {
        return { error: `Phone must be ${LIMITS.phone} characters or fewer.`, field: 'phone' };
    }

    if (!subject) return { error: 'Select a topic to continue.', field: 'subject' };
    if (!Object.prototype.hasOwnProperty.call(TOPICS, subject)) {
        return { error: 'Select a topic to continue.', field: 'subject' };
    }

    if (!message) return { error: 'Please add a message.', field: 'message' };
    if (message.length > LIMITS.message) {
        return { error: `Message must be ${LIMITS.message} characters or fewer.`, field: 'message' };
    }

    // Link-stuffed messages are spam, not enquiries.
    if ((message.match(/https?:\/\//gi) || []).length > 8) {
        return { error: 'Please remove some links from your message.', field: 'message' };
    }

    return { data: { name, email, phone, subject, topic: TOPICS[subject], message } };
}

/* -------------------------------------------------------------------------- */
/* Email bodies                                                               */
/* -------------------------------------------------------------------------- */

/*
 * Both templates are intentionally plain: system fonts, one border, no images,
 * no tracking pixel of our own, no promotional wording and at most one link.
 * Image-heavy, button-heavy mail with many links is exactly what Gmail's
 * Promotions classifier looks for. Every message also ships a real plain-text
 * part — a missing text/plain alternative is one of the strongest spam signals
 * there is.
 */

const shell = (inner) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:24px;background:#f5f5f2;">
<div style="max-width:560px;margin:0 auto;padding:28px;background:#ffffff;border:1px solid #e3e3de;border-radius:10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1b1b1b;">
${inner}
</div>
</body>
</html>`;

const row = (label, value) => `<tr>
<td style="padding:6px 16px 6px 0;vertical-align:top;font-size:13px;color:#6b6b66;white-space:nowrap;">${escapeHtml(label)}</td>
<td style="padding:6px 0;vertical-align:top;">${value}</td>
</tr>`;

function notificationEmail(data, cfg, stamp) {
    const phoneRow = data.phone
        ? row('Phone', escapeHtml(data.phone))
        : '';

    const text = [
        `New enquiry from the ${new URL(cfg.siteUrl).host} contact form.`,
        '',
        `Name:  ${data.name}`,
        `Email: ${data.email}`,
        ...(data.phone ? [`Phone: ${data.phone}`] : []),
        `Topic: ${data.topic}`,
        '',
        'Message',
        '-------',
        data.message,
        '',
        `Received ${stamp}`,
        'Reply to this email to answer the sender directly.',
    ].join('\n');

    const html = shell(`
<p style="margin:0 0 4px;font-size:13px;color:#6b6b66;">New contact form enquiry</p>
<p style="margin:0 0 20px;font-size:19px;font-weight:600;">${escapeHtml(data.topic)}</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;font-size:15px;">
${row('Name', escapeHtml(data.name))}
${row('Email', `<a href="mailto:${escapeHtml(data.email)}" style="color:#c8322b;">${escapeHtml(data.email)}</a>`)}
${phoneRow}
${row('Received', escapeHtml(stamp))}
</table>
<p style="margin:22px 0 6px;font-size:13px;color:#6b6b66;">Message</p>
<div style="padding:14px 16px;background:#f7f7f4;border-left:2px solid #c8322b;border-radius:4px;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
<p style="margin:22px 0 0;padding-top:16px;border-top:1px solid #ecece7;font-size:13px;color:#6b6b66;">Reply to this email to answer ${escapeHtml(data.name)} directly.</p>`);

    return {
        // From our own verified domain so SPF and DKIM align. Putting the
        // sender's address in From would fail DMARC on their domain.
        from: { email: cfg.fromEmail, name: `${cfg.fromName} Website` },
        to: [{ email: cfg.to }],
        // The whole point: reply goes to the lead, not back to ourselves.
        reply_to: { email: data.email, name: data.name },
        subject: `New enquiry — ${data.topic} — ${data.name}`,
        text,
        html,
        category: 'contact-form-notification',
        headers: {
            // Stops Gmail collapsing successive enquiries into one thread.
            'X-Entity-Ref-ID': crypto.randomUUID(),
        },
    };
}

function autoReplyEmail(data, cfg, stamp) {
    const firstName = data.name.split(/\s+/)[0];
    const host = new URL(cfg.siteUrl).host;

    const text = [
        `Hi ${firstName},`,
        '',
        `Thanks for getting in touch with ${cfg.fromName}. Your message has reached our engineering team and we will reply within one business day.`,
        '',
        'A copy of what you sent:',
        '',
        `Topic: ${data.topic}`,
        `Sent:  ${stamp}`,
        '',
        data.message,
        '',
        'If you want to add anything, just reply to this email.',
        '',
        '--',
        cfg.fromName,
        cfg.address,
        cfg.phone,
        cfg.siteUrl,
    ].join('\n');

    const html = shell(`
<p style="margin:0 0 16px;">Hi ${escapeHtml(firstName)},</p>
<p style="margin:0 0 16px;">Thanks for getting in touch with ${escapeHtml(cfg.fromName)}. Your message has reached our engineering team and we will reply within one business day.</p>
<p style="margin:0 0 6px;font-size:13px;color:#6b6b66;">A copy of what you sent</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;font-size:15px;">
${row('Topic', escapeHtml(data.topic))}
${row('Sent', escapeHtml(stamp))}
</table>
<div style="margin-top:12px;padding:14px 16px;background:#f7f7f4;border-left:2px solid #c8322b;border-radius:4px;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
<p style="margin:20px 0 0;">If you want to add anything, just reply to this email.</p>
<p style="margin:22px 0 0;padding-top:16px;border-top:1px solid #ecece7;font-size:13px;line-height:1.7;color:#6b6b66;">
${escapeHtml(cfg.fromName)}<br>
${escapeHtml(cfg.address)}<br>
${escapeHtml(cfg.phone)}<br>
<a href="${escapeHtml(cfg.siteUrl)}" style="color:#6b6b66;">${escapeHtml(host)}</a>
</p>`);

    return {
        from: { email: cfg.fromEmail, name: cfg.fromName },
        to: [{ email: data.email, name: data.name }],
        reply_to: { email: cfg.to, name: cfg.fromName },
        // Personalised, no marketing language, no "no-reply".
        subject: `We got your message, ${firstName}`,
        text,
        html,
        category: 'contact-form-auto-reply',
        headers: {
            // RFC 3834: marks this as machine-generated so the recipient's own
            // vacation responder does not reply and start a mail loop.
            'Auto-Submitted': 'auto-replied',
            'X-Entity-Ref-ID': crypto.randomUUID(),
        },
    };
}

/* -------------------------------------------------------------------------- */
/* Mailtrap                                                                   */
/* -------------------------------------------------------------------------- */

async function sendViaMailtrap(payload, token) {
    const response = await fetch(MAILTRAP_ENDPOINT, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${token}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (response.ok) return { ok: true };

    // Mailtrap returns { errors: [...] } on failure. Read it for the log only;
    // it can name the sending domain, so it must not reach the browser.
    let detail = `HTTP ${response.status}`;
    try {
        const body = await response.json();
        if (Array.isArray(body?.errors)) detail = body.errors.join('; ');
        else if (body?.error) detail = String(body.error);
    } catch {
        /* non-JSON error body, the status is enough */
    }

    return { ok: false, detail };
}

/* -------------------------------------------------------------------------- */
/* Route                                                                      */
/* -------------------------------------------------------------------------- */

export async function onRequestPost({ request, env }) {
    if (!originAllowed(request)) {
        return fail('Request blocked.', 403);
    }

    const cfg = config(env);
    if (!cfg.token) {
        // Misconfiguration, not the visitor's fault. Say so plainly in the log
        // and give the visitor the fallback address.
        console.error('[contact] MAILTRAP_API_TOKEN is not set');
        return fail(
            `Our mail service is not reachable right now. Please email us at ${cfg.to}.`,
            503
        );
    }

    let payload;
    try {
        payload = await request.json();
    } catch {
        return fail('Malformed request.');
    }

    const checked = validate(payload);

    // Bot. Look identical to a success so it learns nothing, and send no mail.
    if (checked.silentDrop) return json({ ok: true });

    if (checked.error) return fail(checked.error, 422, checked.field);

    const data = checked.data;
    const stamp = receivedAt();

    // The team notification is the one that must not be lost, so it goes first
    // and its failure is the only thing that fails the request.
    const notification = await sendViaMailtrap(notificationEmail(data, cfg, stamp), cfg.token);

    if (!notification.ok) {
        console.error('[contact] notification send failed:', notification.detail);
        return fail(
            `We could not send your message. Please email us directly at ${cfg.to}.`,
            502
        );
    }

    // The acknowledgement is a nicety. If it bounces, the lead is still safely
    // in the inbox, so report success and leave a trail in the logs.
    const autoReply = await sendViaMailtrap(autoReplyEmail(data, cfg, stamp), cfg.token);
    if (!autoReply.ok) {
        console.error('[contact] auto-reply send failed:', autoReply.detail);
    }

    return json({ ok: true, autoReplied: autoReply.ok });
}

/**
 * Only POST and OPTIONS are declared. Pages answers every other method with a
 * 405 on its own, so there is no catch-all `onRequest` here — exporting one
 * would risk shadowing the method-specific handler above.
 */
export async function onRequestOptions() {
    return new Response(null, { status: 204, headers: { allow: 'POST, OPTIONS' } });
}
