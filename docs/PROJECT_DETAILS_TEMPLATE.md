# Project Details Template

Hand this file to an agent that has access to a project (its codebase, docs, landing page, or notes). The agent's job is to produce one markdown file that drops straight into the Big-Matrix Solutions website as a project details page at `/project/<slug>`.

---

## Instructions for the agent

You are writing the public details page for one product built by Big-Matrix Solutions. Readers are prospective clients: clinic owners, hospital IT leads, researchers, founders. They want to know what the product does, who it is for, and whether the team can be trusted to build something similar.

1. Study the project first. Read the code, README, docs, landing page and any copy decks you were given. Only describe what you can confirm.
2. Fill in the frontmatter and body using the skeleton at the bottom of this file.
3. Save the result as `<slug>.md`, where `<slug>` matches the `slug` field.
4. In your chat reply (not in the file), list anything you could not verify, any claims you dropped, and any placeholder values the owner still needs to supply.

### How the website uses this file

- The frontmatter feeds the product listing card, the sidebar on the details page, and the SEO meta tags.
- The body is rendered as markdown in the main column, under a page header that already shows the title. Do not repeat the title as an `#` heading.
- Single line breaks are kept as line breaks. Write each paragraph on one line. Do not hard-wrap prose at 80 or 100 characters.
- Raw HTML is sanitised. Scripts and inline event handlers are removed. `<iframe>` embeds (for a demo video) are allowed.
- Images live in the website repo under `public/assets/images/projects/` and are referenced as `/assets/images/projects/<file>`.

---

## Frontmatter reference

The site uses a minimal parser. Each field must sit on a single line as `key: "value"`. No multi-line values, no nested YAML, and no unescaped double quotes inside a value.

| Field | Required | Shown where | Rules |
|---|---|---|---|
| `id` | yes | Sort order | Quoted integer. The site owner assigns this; use `"TBD"` if you don't know it. |
| `slug` | yes | URL `/project/<slug>` | Lowercase, hyphenated, no spaces. Must match the filename. |
| `title` | yes | Header, card, SEO title | Product name only, no tagline. |
| `category` | yes | Card meta, sidebar | 2–6 words, e.g. `Medical AI / Radiotherapy`. |
| `image` | yes | Hero image, card | `/assets/images/projects/<file>`. 16:9 screenshot works best. Use a placeholder name if you don't have one and flag it. |
| `desc` | yes | Card text, SEO description | One sentence, 120–170 characters. Say what the product does, concretely. |
| `client` | yes | Sidebar "Clients", card "Built for" | Organisation the product was built for. Use `Big-Matrix Solutions` for in-house products. |
| `date` | yes | Sidebar "Starting Date", card "Year" | A year (`2026`) or a range (`February, 2026 - April, 2026`). |
| `location` | no | "Open live site" button | Full `https://` URL of the live product. Omit the line entirely if there is no public site. |

---

## Body sections

Use `##` for sections and `###` for sub-sections. Keep the order below. Sections marked optional can be removed if there is nothing true to say.

| Section | Purpose | Length |
|---|---|---|
| Overview | What it is, who uses it, the core idea | 1–2 paragraphs |
| At a glance | Fact table for quick scanning | 5–9 rows |
| The problem | The real-world situation before the product | 1 paragraph + 3–5 bullets |
| What we built | The solution as a whole, how the parts connect | 1–2 paragraphs |
| Key features | The capabilities that matter, grouped | 3–6 groups, 2–4 bullets each |
| How it works | The main workflow from the user's side | 4–7 numbered steps |
| Technology | Stack and architecture choices with reasons | Table + optional paragraph |
| Results (optional) | Measured outcomes, deployments, users | Bullets with real numbers only |
| Our role (optional) | What Big-Matrix did: research, design, build, deployment | Short bullets |
| What's next (optional) | Planned work, clearly marked as planned | 2–4 bullets |

Aim for 600–1,200 words in total.

---

## Writing rules

- Every claim must be traceable to the code, docs or a source you were given. If a feature is modelled but not working, leave it out or label it as planned.
- Never invent metrics, client names, user counts, certifications or regulatory status. Medical products in particular: do not claim FDA, CE, or clinical validation unless you have the document.
- Prefer concrete nouns and numbers over adjectives. "Generates a structured CT report in under a minute" beats "revolutionary AI reporting".
- Avoid filler words: seamless, cutting-edge, robust, leverage, empower, game-changing, state-of-the-art, unlock, elevate.
- Write in plain British or American English consistently (the existing site uses British spelling: organisation, tumour).
- Use "we" for Big-Matrix Solutions. Address the reader rarely, if at all.
- Bold only the lead phrase of a bullet. No emoji. Avoid exclamation marks.
- Do not include internal URLs, credentials, API keys, server names, or personal data about patients or staff.

---

## Skeleton

Copy everything inside the fence below into `<slug>.md` and replace each `{{placeholder}}`.

````markdown
---
id: "{{id}}"
slug: "{{slug}}"
title: "{{Product name}}"
category: "{{Category, 2-6 words}}"
image: "/assets/images/projects/{{image-file.png}}"
desc: "{{One concrete sentence, 120-170 characters, describing what the product does.}}"
client: "{{Client organisation or Big-Matrix Solutions}}"
date: "{{Year or date range}}"
location: "{{https://live-url.example — delete this line if there is no public site}}"
---

## Overview

{{Paragraph 1: what the product is and who uses it, in plain terms.}}

{{Paragraph 2 (optional): the core idea or design decision that sets it apart.}}

## At a glance

| | |
|---|---|
| **Product** | {{Product name}} |
| **Category** | {{Category}} |
| **Users** | {{Who uses it day to day}} |
| **Platform** | {{Web app / desktop / on-premise / mobile}} |
| **Stack** | {{Key technologies, separated by ·}} |
| **Status** | {{Live / Pilot / In development}} |
| **Live at** | {{domain, or remove this row}} |

## The problem

{{One paragraph describing how the work was done before this product, and why that was costly, slow or risky.}}

- **{{Pain point 1}}.** {{One sentence of detail.}}
- **{{Pain point 2}}.** {{One sentence of detail.}}
- **{{Pain point 3}}.** {{One sentence of detail.}}

## What we built

{{One or two paragraphs describing the solution as a whole: the main modules, who sees what, and how data flows between them.}}

## Key features

### {{Feature group 1}}

- **{{Capability}}.** {{What it does and why it matters to the user.}}
- **{{Capability}}.** {{What it does and why it matters to the user.}}

### {{Feature group 2}}

- **{{Capability}}.** {{What it does and why it matters to the user.}}
- **{{Capability}}.** {{What it does and why it matters to the user.}}

### {{Feature group 3}}

- **{{Capability}}.** {{What it does and why it matters to the user.}}
- **{{Capability}}.** {{What it does and why it matters to the user.}}

## How it works

1. **{{Step}}.** {{What the user does and what the system does in response.}}
2. **{{Step}}.** {{...}}
3. **{{Step}}.** {{...}}
4. **{{Step}}.** {{...}}

![{{Descriptive alt text for the screenshot}}](/assets/images/projects/{{screenshot-file.png}})

## Technology

| Layer | Choice | Why |
|---|---|---|
| Frontend | {{e.g. React 19}} | {{One-line reason}} |
| Backend | {{e.g. Django 5 + DRF}} | {{One-line reason}} |
| Data | {{e.g. PostgreSQL, Redis}} | {{One-line reason}} |
| AI / ML | {{Models, frameworks — remove row if not applicable}} | {{One-line reason}} |
| Infrastructure | {{Hosting, CI/CD}} | {{One-line reason}} |

{{Optional paragraph on an architectural decision worth explaining: security model, multi-tenancy, offline support, model pipeline.}}

## Results

- **{{Metric or outcome}}.** {{Source or context for the number.}}
- **{{Metric or outcome}}.** {{Source or context for the number.}}

## Our role

- {{e.g. Research and dataset preparation}}
- {{e.g. Product design and UI}}
- {{e.g. Full-stack development and deployment}}

## What's next

- {{Planned feature or milestone}}
- {{Planned feature or milestone}}
````

---

## Handoff checklist

Before returning the file, confirm:

- [ ] Frontmatter has every required field, one line each, values in double quotes.
- [ ] `slug` matches the filename and contains no spaces or capitals.
- [ ] `desc` is 120–170 characters.
- [ ] `location` is a full `https://` URL or the line is removed.
- [ ] No `#` heading in the body; sections start at `##`.
- [ ] Each paragraph is on a single line.
- [ ] No `{{placeholder}}` left, except values you have flagged for the owner.
- [ ] Optional sections with nothing verifiable to say are removed.
- [ ] Every image path starts with `/assets/images/projects/` and the needed files are listed in your reply.
- [ ] Your reply lists unverified claims, dropped claims, and missing assets.

---

## Installing the file (for the website maintainer)

Every product on the site has a dedicated showcase page in `src/pages/projects/Project<Name>.jsx` (hero, stat cards, section blocks), routed in `src/App.jsx`. The markdown file is source material for that page, not the page itself. The generic markdown fallback in `ProjectDetails.jsx` looks different from the rest of the site and should not be used for published products.

1. Save the agent's full write-up as `public/content/projects/case_study/<NAME>_CASE_STUDY.md`.
2. Put the frontmatter only (no body) in both `src/content/projects/<slug>.md` and `public/content/projects/<slug>.md`. This feeds the products list.
3. Build `src/pages/projects/Project<Name>.jsx` from the write-up, following an existing page such as `ProjectScriptor.jsx`, and add its route above `/project/:slug` in `src/App.jsx`.
4. Put the hero and screenshot images in `public/assets/images/projects/`.
