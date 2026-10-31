# Contact form email — Mailtrap setup

The contact form at `/contact` posts to `/api/contact`, which sends two emails
through Mailtrap's transactional Email Sending API:

| Email | From | To | Reply-To |
| --- | --- | --- | --- |
| Enquiry notification | `contact@big-matrix.com` | `contact@big-matrix.com` | the visitor |
| Auto-reply | `contact@big-matrix.com` | the visitor | `contact@big-matrix.com` |

Because Reply-To on the notification is the visitor's address, hitting reply in
the shared inbox answers the lead directly.

**The API token is a server-side secret.** It is read from an environment
variable inside `functions/api/contact.js` and never reaches the browser. Do not
put it in a `VITE_*` variable — anything with that prefix is compiled into the
public JavaScript bundle.

## Files involved

```
functions/api/contact.js     the endpoint (Cloudflare Pages Function)
scripts/dev-api-plugin.js    serves that same file under `npm run dev`
src/pages/Contact.jsx        the form
.dev.vars                    your local token (gitignored)
.dev.vars.example            the template, committed
```

---

## Step 1 — Get the Mailtrap API token

1. Sign in at [mailtrap.io](https://mailtrap.io).
2. Open **Sending Domains** and confirm `big-matrix.com` shows **Verified**.
   You cannot send to real recipients from a domain that is Pending or Rejected.
3. Go to **Settings → API Tokens** (direct link:
   `https://mailtrap.io/api-tokens`).
4. Click **Add Token**. Give it a name like `big-matrix-website`, and grant it
   the **Email Sending** permission. It does not need admin, billing, or sandbox
   access — keep the scope as narrow as it will go.
5. Copy the token now. Mailtrap shows the full value once.

## Step 2 — Add the token locally

From the project root:

```powershell
Copy-Item .dev.vars.example .dev.vars
```

Open `.dev.vars` and paste the token:

```
MAILTRAP_API_TOKEN=paste-the-token-here
```

`.dev.vars` is gitignored, so it stays on your machine. Then:

```powershell
npm run dev
```

Vite prints an `API: /api/contact` line at startup, and submitting the form on
`http://localhost:3000/contact` sends real email.

## Step 3 — Add the token to production (Cloudflare Pages)

The site is served by Cloudflare Pages, which is also what runs
`functions/api/contact.js`. The token goes in the Pages project, not in the repo.

1. Open the [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers &
   Pages** → your Big-Matrix Pages project.
2. Go to **Settings → Environment variables** (newer dashboards label this
   **Settings → Variables and Secrets**).
3. Under **Production**, click **Add variable**:
   - Variable name: `MAILTRAP_API_TOKEN`
   - Value: the token from step 1
   - Click **Encrypt**. This turns it into a secret, so the value can never be
     read back out of the dashboard.
4. Repeat for the **Preview** environment if you want the form working on branch
   deployments.
5. Click **Save**.
6. **Redeploy.** Environment variables are bound at build time, so an existing
   deployment will not pick up the new value. Go to **Deployments**, open the
   latest one, and choose **Retry deployment** — or just push a commit.

That is the only required variable. Everything else has a default in
`functions/api/contact.js`; add the optional variables from
`.dev.vars.example` only if you want to change an address or the auto-reply
signature.

---

## Step 4 — Keep the mail in the primary inbox

Landing in the primary tab is part authentication, part content, part sending
behaviour. The code already handles the content side; the first two items below
need a look in the dashboards.

### Already correct on big-matrix.com

Checked against live DNS:

- **SPF** — `v=spf1 include:spf.privateemail.com include:spf.mailtrap.io ~all`.
  Covers both Namecheap Private Email (your mailboxes) and Mailtrap (sending).
- **DKIM** — `rwmt1._domainkey` and `rwmt2._domainkey` both resolve to
  `dkim.smtp.mailtrap.live`.
- **DMARC** — `_dmarc.big-matrix.com` publishes a `p=none` policy.
- **MX** — `mx1/mx2.privateemail.com`, so mail to `contact@big-matrix.com`
  arrives in your Namecheap mailbox as normal.

### Two things worth changing in Mailtrap

1. **Turn off open and click tracking** for the domain: **Domains →
   big-matrix.com → Tracking Settings**, then switch off *Track Opened Emails*
   and *Track Clicks*.

   Open tracking injects an invisible pixel into every message. Click tracking
   rewrites your links to run through `mt-link.big-matrix.com` — that host
   currently resolves, so click tracking is on. A tracking pixel plus rewritten
   links is one of the clearest promotional-mail fingerprints there is, and
   neither buys you anything useful for a contact form.

2. **Tighten DMARC once you have watched the reports for a week or two.** Move
   the policy from `p=none` to `p=quarantine`, and point the `rua` address at a
   mailbox you actually read. The record Mailtrap provisioned reports to
   `dmarc@smtp-staging.mailtrap.net`, which you cannot see.

### What the code already does

- Sends on the **transactional** stream (`send.api.mailtrap.io`), never the bulk
  stream. Bulk mail is much more likely to be filed under Promotions.
- Ships a real **plain-text part alongside the HTML** in every message. A
  missing `text/plain` alternative is a strong spam signal on its own.
- Keeps the HTML plain: system fonts, no images, no tracking pixel of ours, no
  marketing buttons, and at most one link. No `List-Unsubscribe` and no
  `Precedence: bulk` header either, since both mark a message as bulk.
- **Personalises** the subject and greeting with the sender's name.
- Sets **`Reply-To`** so real replies flow both ways. Two-way conversation is
  one of the strongest positive reputation signals you can generate.
- Adds a unique **`X-Entity-Ref-ID`** per message so Gmail does not collapse
  successive enquiries into one thread.
- Marks the auto-reply **`Auto-Submitted: auto-replied`** (RFC 3834), so a
  visitor's out-of-office responder will not reply back and start a mail loop.
- Signs the auto-reply with a real postal address and phone number.

One thing no configuration can shortcut: for the first week or two, open the
auto-replies that land in your own test accounts and mark any that go to
Promotions or Spam as **Not spam** / drag them to Primary. Recipient engagement
is what teaches the filters.

---

## Step 5 — Test it

With `npm run dev` running, submit the form at
`http://localhost:3000/contact` using an address you can read. You should get:

- the enquiry at `contact@big-matrix.com`, with the visitor as Reply-To
- the auto-reply at the address you typed in

You can also drive the endpoint directly:

```powershell
$body = @{
  name    = 'Test Sender'
  email   = 'you@example.com'
  phone   = '+880 1339 870730'
  subject = 'research'
  message = 'Checking the contact form wiring.'
  elapsed = 9000
} | ConvertTo-Json

Invoke-RestMethod -Uri 'http://localhost:3000/api/contact' -Method Post `
  -ContentType 'application/json' -Headers @{ Origin = 'http://localhost:3000' } `
  -Body $body
```

A success looks like `{ ok = True; autoReplied = True }`.

The `Origin` header is required — the endpoint rejects requests that did not
come from a page it served.

Check **Email Logs** in Mailtrap for the delivery result of each message, and
`wrangler pages deployment tail` (or the **Functions** log stream in the Pages
dashboard) for server-side errors in production.

### If something fails

| Symptom | Cause |
| --- | --- |
| `401` in the Mailtrap log line | Token is wrong, revoked, or lacks Email Sending permission |
| `Sending from domain is not allowed` | `big-matrix.com` is not Verified yet, or `CONTACT_FROM_EMAIL` is on another domain |
| `From: Header does not match the sender's domain` | `CONTACT_FROM_EMAIL` does not belong to a verified Mailtrap domain |
| `503` and `MAILTRAP_API_TOKEN is not set` in logs | Variable missing, or the deployment predates it — redeploy |
| `403 Request blocked.` | Request arrived without a matching `Origin` header |

---

## A note on abuse

`/api/contact` is public and unauthenticated by nature — it has to be, since
visitors are not logged in. That means it can be used to send mail, and a
compromised or hammered form endpoint can damage your sending reputation.

Built in already: an origin check, a honeypot field, a minimum fill time, strict
per-field length caps, a topic allowlist, and a cap on links per message.

If you start seeing junk, add these in order:

1. **A Cloudflare rate-limiting rule** on `/api/contact` — Security → WAF →
   Rate limiting rules. Something like 5 requests per minute per IP. The free
   plan includes one rule, and this is the single highest-value addition.
2. **[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)** — a
   privacy-preserving CAPTCHA. It needs a widget in `Contact.jsx` and a
   `siteverify` call in the function before sending.
