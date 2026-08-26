# RxCloud — Product Case Study

> Source material for the Big-Matrix Solutions website case study.
> Compiled from the product landing page, the Bangla copy deck, and a direct audit of the codebase.
>
> **Every feature below carries a status marker.** `LIVE` = implemented and working end to end.
> `PARTIAL` = implemented but with a caveat that changes how you should describe it.
> `NOT BUILT` = modelled in the database or present in the UI, but with no working implementation behind it.
>
> **Read §14 and §15 before publishing anything.** Several claims in the current marketing copy are
> not supported by the code, and one of them is a liability risk.

---

## 1. At a glance

| | |
|---|---|
| **Product** | RxCloud |
| **Category** | Clinic and practice management SaaS (multi-tenant) |
| **Built by** | Big-Matrix Solutions |
| **Market** | Bangladesh — private practice doctors, clinic staff, patients |
| **Live at** | `rxcloud.care`, plus a site per doctor on `<doctor>.rxcloud.care` |
| **English tagline** | Efficient Care, Everywhere · *The practice management platform doctors trust* |
| **Bangla tagline** | সহজ চেম্বার, স্মার্ট চিকিৎসা, নিশ্চিন্ত আপনি |
| **Languages** | English and Bangla throughout, including printed prescriptions |
| **Stack** | Django 5 + DRF · React 19 + TanStack Start (SSR) · MySQL 8 · Redis · Celery · Cloudflare Workers |
| **Build scale** | ~685 source files, ~115,000 lines, 18 backend domains, ~150 API endpoints, 68 models |
| **Doctors provisioned** | 5 (verified in the seed registry) |

---

## 2. The problem

Private specialist practice in Bangladesh runs on phone calls, paper registers, and handwritten
prescription pads. One consultant may hold chambers in three or four locations across two cities,
each with its own receptionist, its own schedule, and its own drawer of files. Nothing is shared.

Four concrete failures follow:

- **Booking is a phone queue.** A patient spends up to half an hour on the phone for a slot, and
  nothing exists as a record until somebody writes it in a book.
- **The record lives wherever the paper is.** History, prescriptions, and lab reports don't travel
  to the doctor's other chamber, let alone to the patient's home.
- **The doctor is the bottleneck for admin.** Prescriptions, records, billing, and follow-up all
  queue behind the one person who should be consulting.
- **Handing work to staff means handing over trust.** Without a permission and approval layer,
  delegating record-keeping to a receptionist means letting them alter clinical documents.

RxCloud addresses all four, and the fourth is the one competitors usually skip.

---

## 3. What RxCloud is

One platform covering the full loop: public booking → appointment → queue → consultation →
prescription → records → billing → follow-up. Doctors, clinic staff, and patients each get their own
surface onto the same data, with role permissions, per-branch scoping, and doctor approval deciding
who can do what.

**Landing page promise, verbatim:**

> Manage patients, appointments, prescriptions, and billing in one place.
> Patients book directly. You focus on care.

**Commercial framing:** no credit card, 14-day trial, cancel anytime. Practices enter through the
*Start your service* form (name, phone, email, plus optional BMDC number, specialty, clinic, city,
requirements) so the team can plan the setup. Three plans are seeded — Starter ৳999/mo,
Professional ৳2,499/mo, Clinic ৳5,999/mo, with annual discounts.

**Cities on the trust strip:** Dhaka, Chittagong, Sylhet, Khulna, Rajshahi, Barisal.

---

## 4. Complete feature inventory

Eighteen backend domains. Grouped by what a user does, with honest status.

### Prescriptions and clinical documents

| Feature | Status | Notes |
|---|---|---|
| Structured prescription authoring | **LIVE** | 5–6 step wizard. See §5. |
| Custom prescription templates | **LIVE** | 8 templates × 6 designs. See §5.1. |
| Print-grade PDF rendering | **LIVE** | Chromium via Playwright. See §5.4. |
| Body-Only print mode | **LIVE** | Prints onto existing pre-printed pads, fully configurable margins. |
| Drug library with autocomplete | **LIVE** | Brand-first search. ~1,660 generics / ~21,600 brands in the dev snapshot. |
| Allergy + interaction alerts | **LIVE** | Fire live while typing, before save. Advisory, non-blocking. |
| Reusable medication sets | **LIVE** | Doctor-owned, named, e.g. "Asthma Protocol". |
| Reusable instruction templates | **LIVE** | Single or grouped (e.g. "Lung Cancer" → N instructions), Bangla-first. |
| Reuse a previous prescription | **LIVE** | Rehydrates drugs, diagnosis, tests, instructions, clinical fields. |
| Medical certificates | **LIVE** | Sick leave, fitness, referral. Own codes, PDF, approval flow. |
| Chemo protocol orders | **LIVE** | Oncology. BSA dosing, 5 drug tables, prepare→check→finalise. Access-gated per doctor. |
| Prescription immutability | **LIVE** | Schema + design frozen per prescription. See §5.3. |

### Practice operations

| Feature | Status | Notes |
|---|---|---|
| Multi-chamber / multi-city management | **LIVE** | Clinic → branches, per-branch schedules, fees, appointments. |
| Availability configuration | **LIVE** | Per branch, per weekday or one-off date, individually toggleable slots. |
| Appointment booking | **LIVE** | Clinic, portal, phone, walk-in sources. 7 statuses. Collision detection. |
| Booking limits | **LIVE** | Max 2 active appointments per patient per doctor per Dhaka calendar day. |
| Live patient queue | **PARTIAL** | Queue logic and privacy redaction are excellent, but `serial_number` is never populated — serials always render blank. |
| Reschedule / cancel | **LIVE** | Both doctor-side and patient-side, with reason capture. |
| Appointment reminders | **NOT BUILT** | The model exists with channel, schedule, and status fields. Nothing creates or sends one. No SMS, WhatsApp, or push provider exists anywhere in the codebase. |
| Invoicing | **LIVE** | Sequential codes, line items, discount/tax, 8 statuses, server-rendered PDF. |
| Payment recording | **PARTIAL** | Cash, card, bKash, Nagad, Rocket, bank all exist as *labels*. No gateway, no webhook, no checkout. Manual bookkeeping. |
| Subscriptions | **PARTIAL** | Plans, trial, upgrade, cancel all work. Plan limits and locked features are presentation-only — nothing enforces them. |
| Analytics | **LIVE** | Single aggregate endpoint: 6 KPIs, appointment/revenue trends, demographics, status breakdown, per-branch comparison. Recharts. |
| Doctor dashboard | **LIVE** | 5 endpoints: stats, consulted patients, visits by month, top diagnoses, revenue by city. |

### Staff and delegation

| Feature | Status | Notes |
|---|---|---|
| Staff accounts | **LIVE** | Invite, suspend, deactivate, multi-branch assignment. |
| Granular staff permissions | **LIVE** | 9 independent capability flags. See §7. |
| Doctor approval workflow | **LIVE** | 6 states across prescriptions, certificates, invoices, availability. Unified inbox. See §7. |
| Staff activity log | **LIVE** | Every staff action and every approval outcome recorded, visible to the owning doctor. |

### Patients and records

| Feature | Status | Notes |
|---|---|---|
| Global patient records | **LIVE** | One row per human, shared across clinics and cities — the architectural centrepiece. |
| Allergies, tags, emergency contacts, aliases | **LIVE** | Severity-ordered allergies against a reference allergen table. |
| Vitals with derived values | **LIVE** | BMI, BSA, and ideal body weight computed on save. |
| Visit history | **LIVE** | Auto-created when a prescription is saved. |
| Doctor–patient consent layer | **LIVE** | Explicit relationships, OTP-verified access requests, 4-hour emergency access, 365-day dormancy. |
| Access audit log | **LIVE** | Patient can see who viewed their record and when. |
| Patient ID card with QR | **PARTIAL** | The card renders, but the QR is a decorative hashed grid, not a real encoder. It cannot be scanned. |
| Data export | **PARTIAL** | Client-side CSV of the currently loaded patient page and of invoices. No server export, no visits/prescriptions/reports export. |

### Documents, labs, and AI

| Feature | Status | Notes |
|---|---|---|
| Document upload | **LIVE** | 20 MB cap, PDF + 7 image formats, versioned model, tokenised share links. |
| Document OCR and extraction | **LIVE** | Real vision-model pipeline. See §6. |
| Auto-promotion to structured records | **LIVE** | A scanned lab report becomes a `PatientReport` with per-parameter values; a scanned prescription becomes a `Prescription`. |
| OCR import into the prescription form | **LIVE** | Pull a scanned report's values or medications straight into the Rx being written. |
| Abnormal lab value flagging | **LIVE** | Deterministic, not AI. Normal / High / Low / Critical. |
| Lab trend charts across visits | **LIVE** | Client-side Recharts with reference lines and abnormal points highlighted. |
| Doctor AI assistant on patient history | **LIVE** | Real LLM, scoped to authorised records. See §6.2. |
| Patient-side "AI summary" of uploads | **NOT BUILT** | Canned strings selected by filename keyword. **Do not showcase.** See §14. |
| Pre-appointment form "AI summary" | **NOT BUILT** | Joins question/answer pairs with a pipe character. No model call. |
| Consultation transcript summary | **NOT BUILT** | 7-entry keyword table producing canned sentences. No speech-to-text. |

### Communication

| Feature | Status | Notes |
|---|---|---|
| Video consultations | **LIVE** | Agora RTC. Doctor starts a call, patient joins by invite link with no login. No recording. |
| Doctor–patient messaging | **PARTIAL** | Threads and messages work. Conversations are not scoped to the requester — a security fix, not a feature gap. |
| Broadcast to patients | **NOT BUILT** | Writes one audit row with the message and recipient list. No fan-out to messages, notifications, SMS, or email. Nothing reads it. |
| In-app notifications | **NOT BUILT** | Full read/unread UI and preference model. Nothing in the backend ever creates a notification. |
| Transactional email | **LIVE** | Mailtrap HTTP API for account and auth email, brand logo inlined. |

### Public presence

| Feature | Status | Notes |
|---|---|---|
| Per-doctor site on own subdomain | **LIVE** | The strongest differentiator. See §8. |
| Bilingual doctor sites | **LIVE** | Full English/Bangla toggle on public sites. |
| Patient success stories with video | **LIVE** | Carousel, ratings, expandable text, autoplay that pauses on engagement. |
| Booking from the public site | **LIVE** | Writes straight into the clinic schedule. |
| Server-side rendering for crawlers | **LIVE** | Full HTML with per-doctor metadata and Physician structured data. |
| Google discoverability | **PARTIAL** | No sitemap, no robots.txt, no local-business or FAQ schema. See §14. |

---

## 5. Signature system: the prescription platform

This is the deepest part of the product, the largest subsystem in the repo — 97 files, ~16,300 lines,
28 migrations — and the thing doctors judge the product on. It deserves to lead the case study.

The insight behind it: **the piece of paper the patient carries home is the product.** A doctor in
Bangladesh has printed their prescription pad a particular way for twenty years. Software that forces
a generic layout on them gets rejected regardless of how good the rest is.

### 5.1 Custom templates — four concerns that vary independently

Most systems couple "what fields exist" to "how it looks" to "whose name is on it". RxCloud separates
all four, which is why a new bespoke prescription design is a config change rather than a code fork.

| Concern | What it holds |
|---|---|
| **Type** (schema) | Which clinical sections and fields exist. Versioned. |
| **Design** (look) | The HTML/CSS layout and which render engine draws it. Versioned. |
| **Template** (assignable format) | Binds one type + one design + doctor-agnostic branding. |
| **Identity** | Doctor name, credentials, signature, clinic, hotline — resolved *live*, never stored on the template. |

Currently **8 templates** across **6 designs**: general, radiology, cardiology, general medicine,
medical-radiation-oncology (a specialty default), a bespoke BIRDEM layout for one doctor, and two
test templates. Three of those templates share a single design, which is the decoupling paying for
itself.

Adding a new custom template is a fixed five-step recipe no matter how large the catalogue gets: add
a versioned HTML design file extending the shared base and macros, register the type, add two entries
to a manifest, run one sync command, assign it in admin. The render engine is never touched. The sync
command is validation-first and idempotent — every design must resolve to a real file, every type key
must be registered — and it never deletes, so **doctor assignments survive every catalogue change.**

A build-time lint test fails the build if anything resembling doctor identity leaks into template
branding. That's the kind of guardrail that keeps a multi-tenant design system honest.

### 5.2 The writing flow

A three-pane clinical workspace: patient list, patient context (prescription history / visits / lab
reports / AI assistant), and the authoring panel. Opening it from an appointment pulls in that
appointment's chamber and any vitals already recorded at reception.

The wizard, with the chamber chosen up front (remembered from last time):

1. **Visit & Vitals** — OPD/IPD, date, BP, pulse, temperature, weight, height. BMI, BSA, and ideal
   body weight derive automatically on save.
2. **Clinical History** — presenting symptoms, past history, investigation history, current
   medications, allergies. For schema-driven templates this step renders from the type definition
   instead of fixed fields.
3. **Medications** — the core. Each row is drug, dose, frequency, duration, instructions, with
   type-ahead on all five.
4. **Clinical Tests** — investigation chips with suggestions, attached to the visit automatically.
5. **Instructions** — a structured instruction list plus free notes, then follow-up date.

Oncology swaps steps 2 and 4 for a structured specialist section; whether a Clinical Tests step
appears at all is driven by the template's own schema flag.

**What makes the medication step notable:**

- **Brand-first search.** Bangladeshi doctors type brand names, not generics. The ranking
  deliberately places brand prefix matches above generic prefix matches, so typing "nap" surfaces
  Napa. Six relevance tiers. The library is derived from medex.com.bd — roughly 1,660 generics and
  21,600 brand entries across 232 companies in the development snapshot.
- **Strength auto-fill.** Picking a brand fills its strength into the dose field, and the available
  strengths stay offered even for drugs resolved from the backend search.
- **Bangla dose language as first-class.** Frequency offers `১+০+০`, `০+১+০`, `১+১+১`, `প্রয়োজনমতো`.
  Duration offers `৩ দিন`, `৭ দিন`, `চলবে`. Instructions offer `খাওয়ার পরে`, `খালি পেটে`,
  `রাতে ঘুমানোর আগে`. Not translations bolted on — the default options are Bangla.
- **Safety checks while typing, not on submit.** Allergy conflicts and drug interactions recompute on
  every keystroke and appear as a banner pinned to the top of the medication card, red for allergy
  conflicts and high-risk interactions, orange for moderate. The doctor sees the warning while still
  choosing the drug. The server re-runs the same check before saving and returns a warning count.
  Sixteen hard-coded high-risk pairs (warfarin combinations, clopidogrel + omeprazole,
  lithium + NSAIDs, metformin + contrast) work even with an empty database, and allergy checking
  matches by drug class as well as by name — a penicillin allergy flags amoxicillin.

### 5.3 Immutability — the part a lawyer would care about

An issued prescription is a clinical and legal document. If the template changes next year, last
year's prescription must still reproduce exactly as issued.

RxCloud freezes, per prescription, both the resolved field schema and a design descriptor pinned to a
*versioned* file path. Design files are append-only: changing a design means publishing `v2.html` and
bumping the version, which affects only new prescriptions. Old ones keep rendering from their frozen
`v1`. Doctor identity is deliberately *not* frozen, so a corrected signature or updated credentials
propagate everywhere.

### 5.4 Print rendering

Prescriptions render Jinja → HTML → PDF through a pluggable engine, Chromium via Playwright by
default. The same HTML drives the on-screen preview and the print output *by construction*, so what
the doctor sees is what prints. Fonts and logos are embedded as base64 data URIs, so the renderer
needs no font server and no network — which is also how Bengali text shaping is solved in PDF.

Two details worth citing as craft: a two-pass render measures the page count and then pins the
signature block to the bottom of the final page, with a safety net that discards the second pass if
it would spill onto an extra page; and **Body Only mode** prints just the clinical content into a
configurable blank frame — adjustable top, bottom, left, right margins as percentages of A4,
adjustable two-column split, optional patient-info strip and footer — so doctors keep using the
pre-printed stationery they already own.

---

## 6. The AI surface, described honestly

There are two real LLM features and several non-AI stubs presented in the UI as AI. The two real ones
are genuinely good. Showcase those; leave the rest out.

### 6.1 Document OCR and extraction — LIVE

Upload a scan or photo. A Celery background job routes each page intelligently: if a PDF page has a
real text layer it is parsed directly; if it's a scan it is rasterised, downscaled, and sent to a
vision model. Pages are merged with deduplication and a majority vote on document type, then passed
through a second structuring pass. Supports PDF up to 20 pages plus seven image formats.

What comes back is structured: patient name, date, facility, doctor, every lab parameter with value,
unit, reference range and abnormal flag, every medication with dose and frequency, plus an impression.

Then the genuinely clever part: **auto-promotion**. A recognised lab report becomes a real
`PatientReport` with one row per parameter and parsed reference ranges. A recognised prescription
becomes a real `Prescription` with items. And while writing a new prescription, the doctor can pull a
scanned report's values or medication list directly into the form. A paper report from another
hospital enters the system as structured, queryable clinical data.

**Two caveats for the copy.** It is not instant — it's an asynchronous job, and a multi-page scan
takes minutes, with a progress indicator and a possible failure state. And the summary line itself is
assembled in code from the extracted fields, not written by a model. So: *AI reads the document and
extracts structured data*, not *AI writes you a clinical summary*.

### 6.2 Doctor's AI assistant on patient history — LIVE

Inside the prescription writer, the doctor can ask questions about the patient in plain language.
This is a real model call, and the access control is the impressive part: the request is checked
against the doctor–patient relationship layer *before* any context is assembled, and the context
builder only ever reads that one patient's rows, excluding soft-deleted records.

The context is substantial — demographics, computed age, blood group, primary condition, allergies
with severity, the last five visits with diagnoses and vitals, the last five prescriptions with drug
and dose, the last eight lab reports with abnormal values called out explicitly, and the last three
imaging documents via their extracted impressions.

The system prompt is tuned for how doctors actually read: answer only from the records, say so when
data is missing, never invent values, bullets under fifteen words, and pick one of three response
shapes depending on whether the question is a lookup or a judgement call. Replies are post-processed
to strip empty sections. There's a mock mode for testing.

The product's own framing is the right one to publish: **decision support, and the clinician verifies
the output.**

### 6.3 What is not AI, despite the label

- The "clinical summary" shown above the AI chat is plain client-side computation over already-loaded
  records — useful, but not generated.
- The pre-appointment form summary joins question and answer strings with a pipe.
- The consultation transcript summary is a seven-keyword lookup table emitting canned sentences.
  There is no speech-to-text anywhere.
- An "AI Summary" button on the patient detail page only shows a success toast. The SOAP note and
  trend analysis cards on that page are hardcoded template sentences.
- **The patient portal's document "AI Summary" is canned text chosen by filename keyword** — see
  §14, this one is a liability, not just an overstatement.

---

## 7. Signature system: delegation without losing control

This solves the trust problem that stops doctors from delegating, and it's the feature most likely to
close a sale. Worth its own section on the case study page.

**Nine independent staff permissions:** create/view patients, upload patient records, prepare patient
records, create/update prescriptions, manage availability, manage certificates, book appointments,
process payments, view reports. Plus branch-level scoping, so a receptionist at one chamber sees only
that chamber.

**Then the approval layer.** When staff prepare something clinical or financial, it does not go live.
It enters one of six states — active, pending approval, approved, rejected, pending update, pending
deletion — and waits. The doctor gets **one unified inbox** covering prescriptions, certificates,
invoices, and availability changes, with a total badge count.

Details that show the workflow was thought through rather than bolted on:

- Reviewing a staff draft opens the **same authoring panel**, fully editable. The doctor can fix and
  approve in one pass instead of rejecting and asking for a redo.
- Approving auto-signs the prescription if it isn't already signed.
- Approving a *deletion request* soft-deletes, preserving the audit trail.
- Rejecting a deletion request restores the row and attaches the reason.
- The doctor can edit their own issued prescriptions within a 24-hour window, after which the record
  locks — clinically sensible, and it stops silent history rewrites.
- Any content edit invalidates the cached PDF automatically.
- Every outcome writes to the staff activity log with a distinct verb, so the staff member sees what
  happened to what they submitted.
- Staff-proposed availability changes stay invisible to patients until approved.

---

## 8. Signature system: a real website for every doctor

Easy to demo, hard to copy, and immediately legible to a non-technical reader. Lead with this
visually.

Every doctor gets a full public marketing site on their own subdomain —
`tousifurrahman.rxcloud.care`, `ishtiaqurrahim.rxcloud.care`. Not a profile page: hero with
credentials, trust strip, biography, a credential timeline, chamber cards with live Google Maps
embeds and tap-to-call numbers, treatment and condition grids, a patient success-story carousel with
video and ratings, FAQ, and a booking dialog that writes into the clinic's schedule. All of it in
both English and Bangla.

**The engineering decision that makes it scale:** one data-driven template renders every doctor.
Content comes from a public-site API keyed by subdomain, so onboarding a doctor is a database record
plus one management command — no frontend build, no per-doctor configuration, live immediately on a
Cloudflare wildcard route. A registry allows a bespoke design per subdomain when a doctor wants one;
two currently have custom layouts while the rest share the default.

Subdomain resolution runs on both sides of the render — from the request host during SSR, from the
browser location on the client — with reserved subdomains filtered and a localhost override for
development. Missing and broken are distinguished properly: an unpublished subdomain gets a clear
not-found page, an API failure gets a maintenance page.

**Verified today:** five doctors provisioned — ahsanhabib, tousifurrahman, ishtiaqurrahim,
mahbubhossain, mohammedkamaluddin — each with their own public-site fixture.

---

## 9. The patient side

A patient portal across eight screens, plus a consent layer that is genuinely differentiated.

- **Book** — browse doctors, filter by city, see real computed slots, submit. Deep-links from the
  public doctor sites land directly on the right doctor.
- **Appointments** — own bookings, cancel, and a live queue view showing now-serving, position, and
  how many are ahead.
- **Records** — prescriptions plus a merged document library spanning doctor-uploaded and
  self-uploaded files, with search, filters, multi-upload with progress, and a share toggle.
- **Reminders** — patient-authored medication reminders with adherence logging. In-app only.
- **Permissions** — the standout. Three tabs: which doctors have access (with revoke), a privacy
  level control, and a full audit log of who viewed the record and when.
- **Profile**, **Notifications**, **Dashboard**.

The queue snapshot deserves a technical mention: all redaction flows through a single function, so
other patients' entries can only ever expose serial, status, and type — never a name. The privacy
boundary lives at exactly one auditable point in the code. (Note the serial-number gap in §4.)

---

## 10. Architecture

```
Doctors · Staff · Patients · Public visitors
                  │
                  ▼
   Frontend — React 19 + TanStack Start (SSR)
   One app; multi-tenant by subdomain
   Deployed to Cloudflare Workers (wildcard route)
                  │  HTTPS / JSON / JWT
                  ▼
   Backend — Django 5 + Django REST Framework
   nginx → Gunicorn, fronted by Cloudflare Tunnel
                  │
        ┌─────────┼──────────┬───────────────┐
        ▼         ▼          ▼               ▼
     MySQL 8   Redis 7   Celery worker    media
                         + beat           storage
```

**Backend.** Django 5.2 with DRF across 18 domain apps: accounts, tenancy, patients, relationships,
visits, drugs, prescriptions, labs, scheduling, documents, billing, subscriptions, messaging,
ai_consult, notifications, chemo_protocol, video_calls, core. Around 150 endpoints, every one an
explicit route bound to a view class — no auto-generated routers — documented via OpenAPI. JWT auth
with 15-minute access tokens, refresh rotation, blacklist after rotation. MySQL 8 on utf8mb4 in
strict mode. Redis backs Celery for OCR and scheduled work, on Asia/Dhaka time.

**Frontend.** React 19 on TanStack Start with SSR, 71 file-based route modules, TanStack Query,
Tailwind 4 with a scoped design-token layer, 145 Radix-based components. Cloudflare Workers via
Wrangler. Agora video code-split into its own chunk and excluded from SSR.

**Tenancy.** Single database, shared schema, foreign-key scoped. Clinic is the top-level tenant and
owns branches; doctors belong to a clinic. Patients are *global* records reachable across clinics and
cities through an explicit relationship layer with emergency access and dormancy rules — that global
patient record is the architectural centrepiece and what makes cross-chamber continuity possible.

**Operations.** Structured JSON logging, health endpoint, Sentry wiring, server-sent events for live
updates, container health checks, and a written failover runbook for restoring onto standby hardware
from NAS backups.

---

## 11. Bilingual, by design

Not an i18n afterthought. Clinical and profile content carries paired English/Bangla fields with
English fallback when Bangla is blank. Prescription authoring defaults to Bangla dose, duration, and
instruction vocabulary. Print uses a Bengali-capable embedded font so PDF shaping works without a
font server. Public doctor sites toggle fully. The product landing page localises through a keyed
copy deck with automatic Bangla numeral conversion for anything unkeyed.

---

## 12. Build scale

| | |
|---|---|
| Total source | ~685 files, ~115,000 lines |
| Backend Python (excl. migrations) | 350 files, ~35,300 lines |
| Frontend TypeScript/TSX/CSS | 334 files, ~79,600 lines |
| Domain apps | 18 |
| Database models | 68 |
| Migrations | 100 |
| API endpoints | ~150 across 24 route modules |
| Frontend routes | 71 |
| UI components | 145 |
| Largest subsystem | Prescriptions — 97 files, ~16,300 lines, 28 migrations |
| Prescription templates / designs | 8 / 6 |

The prescription subsystem being the largest single piece of the codebase is the story in one number:
the thing doctors judge the product on is the paper they hand the patient, so that is where the work
went.

---

## 13. FAQ, condensed from the landing page

Reusable near-verbatim.

- **Who is it for?** Doctors, clinic staff, and patients — public booking, appointments,
  consultations, prescriptions, records, billing, and communication in one system.
- **How do patients book?** They open the doctor's public RxCloud profile, choose a chamber and an
  available time, and submit. It lands in the clinic's schedule and queue.
- **Multiple chambers?** Yes. Separate addresses, schedules, availability, fees, appointments, and
  queues per branch, from one account.
- **Can staff use it without full doctor access?** Yes. Staff are scoped to their doctor and
  branches, permissions limited by responsibility, and sensitive drafts require doctor approval.
- **Digital prescriptions?** Structured prescriptions, assigned templates, draft review, approval and
  signing, printable documents, and per-doctor identity and layout.
- **Video consultations?** Invite-link video through a configured provider, subject to clinic setup
  and connectivity.
- **How does the AI assistant work?** It answers from records the doctor is authorised to access and
  summarises relevant history. Decision support only; clinicians verify.
- **Bangla and English?** Both, across the product and doctor sites, with bilingual prescription
  templates where configured.
- **How do I start?** Submit the *Start your service* form; the team plans the setup.

---

## 14. Audit of the current Bangla marketing copy

Claim by claim, against the code. Fix the four marked ✗ before this copy goes out.

| Claim in the copy | Verdict |
|---|---|
| কাগজের ফাইলে রোগীর হিস্ট্রি খোঁজার সমস্যা | ✓ Accurate framing of the problem. |
| চেম্বার বদলালে পুরোনো রোগীদের সাথে যোগাযোগ বিচ্ছিন্ন | ✓ Accurate, and the global patient record is the direct answer. |
| মেডিসিন লাইব্রেরি থেকে ওষুধের সাজেশন | ✓ Real, and better than described — brand-first ranking with strength auto-fill. **But call it "smart autocomplete", not AI.** It's a prefix index, not a model. |
| AI-এর সহায়তায় প্রেসক্রিপশন লেখা | ⚠ Reword. There *is* AI adjacent to prescribing (the history assistant, OCR import), but the writing aids and safety checks are deterministic. Claiming AI-written prescriptions invites a question you don't want to answer. |
| সম্পূর্ণ ক্লিনিক্যাল হিস্ট্রিসহ প্রেসক্রিপশন শেয়ার | ⚠ Partly. PDF download, print, and patient-portal visibility all work. **There is no SMS send** — drop any implication of sending to the patient's phone directly. |
| ডকুমেন্ট স্ক্যান করলেই AI সামারাইজেশন | ⚠ Real, but **remove "মুহূর্তেই" (instantly)**. It's a background job; multi-page scans take minutes. Also: AI *extracts structured data*, the summary line is composed in code. |
| প্রতিটা তথ্য স্থায়ীভাবে সংরক্ষিত | ✗ **Not supportable.** Clinical rows soft-delete, but deleting a document removes the file bytes from disk permanently. There is no backup mechanism in the repo. |
| ব্যবহার করতে পারবেন নিজের গবেষণার কাজেও | ✗ **Not supportable.** No cohort query, no aggregate export, no de-identification, no research tooling. The only export is a client-side CSV of the currently loaded patient page. |
| একাধিক চেম্বার ও অ্যাপয়েন্টমেন্ট পরিচালনা | ✓ Fully accurate. |
| ভিডিও কলের মাধ্যমে টেলিমেডিসিন | ✓ Accurate. Invite-link join, no app install for the patient. |
| সব রোগীকে এক ক্লিকে ব্রডকাস্ট মেসেজ | ✗ **Not built.** The endpoint records the message and recipient list and nothing else — no delivery by any channel. Remove this or ship it first. |
| সুরক্ষিত Doctor Approval Workflow | ✓ **Fully accurate and under-sold.** This is one of the best features in the product — see §7. Give it more space, not less. |
| নিজস্ব সাবডোমেইন আর কাস্টম ল্যান্ডিং পেজ | ✓ Fully accurate. |
| সাফল্যের গল্প দেখাতে পারবেন | ✓ Accurate — success stories with video and ratings. |
| গুগলে সহজে খুঁজে পাবেন রোগীরা | ⚠ Overstated. Pages are properly server-rendered with per-doctor titles, descriptions, and Physician structured data, so they're *ready to index*. But there is no sitemap, no robots.txt, no local-business or FAQ schema, and a new subdomain has zero authority. Say "a fast, search-ready site of their own", not "patients will find you on Google". |
| ডিজিটাল মার্কেটিং সাপোর্ট | ✓ Fine — a service you provide, not a code claim. |
| সহজ চেম্বার, স্মার্ট চিকিৎসা, নিশ্চিন্ত আপনি | ✓ Already the product's Bangla tagline. Keep it. |

**Also missing from the copy but worth adding**, because it's real and strong: medical certificates,
invoicing with PDF, the analytics dashboard, the patient consent and access-audit layer, Body-Only
printing onto existing pads, and the chemo protocol module for oncologists.

---

## 15. Publishing notes — read before you publish

### Do not publish as fact

- The about page's **"2,400+ doctors onboarded", "180K+ appointments", "3 countries"** and the
  founding narrative (2022, named founders, seed round) are **placeholder content** written alongside
  fictional personas. Verified reality is five provisioned doctor sites.
- All four testimonials — Dr. Samira Chowdhury, Dr. Tanvir Ahmed, Dr. Nadia Islam, Rahim Khan — are
  illustrative personas; the same names appear inside the UI mockups. The quoted outcomes
  ("admin time in half", "no-show rate 22% → under 5%") are copy, not case data.
- **"Automated reminders cut no-shows by 40%"** — doubly unusable: unsourced, *and* reminders are not
  implemented. Remove it from both the landing page and the case study.
- **"HIPAA-grade security" and "end-to-end encryption"** should not be repeated. Not certified, and
  transport encryption terminates at the edge. Use the product's own accurate FAQ wording instead:
  authenticated access, role and branch permissions, relationship checks, access audit logs, soft
  deletion.
- RxCloud is **not** an offline-capable PWA. No service worker, no offline mode.
- The patient ID card QR **cannot be scanned**. Don't demo it as a working QR feature.

### Fix in the product before showcasing

**Priority — the patient portal fabricates clinical reassurance.** Patient-uploaded documents get a
canned "AI Summary" chosen by filename keyword, including strings like *"AI screening detected no
acute abnormalities"* and *"Rhythm appears regular"*. No file is ever read. A patient could see
reassurance about a scan nothing examined. This is a patient-safety and liability exposure well
before it's a marketing problem. Remove the canned strings or gate the panel until real OCR runs on
portal uploads.

Also worth resolving before a public case study, in rough priority order:

1. **Conversations are not access-scoped** — any authenticated user with a conversation UUID can read
   and post to it.
2. **Video invite tokens** are unauthenticated and never expire. Anyone with the link can join for
   the life of the call.
3. `StaffMember.password_plain` stores staff passwords in cleartext by design.
4. Patient data (name, MRN, diagnoses, lab values) is sent to OpenAI with no BAA or consent gate in
   the call path. Any privacy claim needs to account for this.
5. A hardcoded fallback `OPENAI_API_KEY` and `DB_PASSWORD` sit in `settings.py` alongside a tracked
   `.env`. **Rotate that API key** and move both to environment-only config.
6. `Appointment.serial_number` is never populated, so the queue UI shows blank serials.
7. Not-found and backend-outage states return HTTP 200, so an outage during a crawl can get indexed.
8. Open Graph `og:url` and `og:image` are relative, which breaks social previews on WhatsApp,
   Facebook, and LinkedIn — a cheap fix with direct marketing value.

### Keep out of public copy

The production server IP, database credentials, and internal hostnames that appear in
`docs/ARCHITECTURE.md` and `docs/FAILOVER.md`.

### Get real numbers

Ask for: doctors live, prescriptions generated, documents processed through OCR, appointments booked,
and one named practice willing to be quoted with a measured before/after. A single verified customer
outcome will carry the case study further than the placeholder stats it replaces. Prescriptions
generated is the most persuasive number here, because it maps directly to the deepest engineering.

---

## 16. Suggested case study page structure

1. **Hero** — "RxCloud" / *The practice management platform doctors trust* / one-line summary and a
   product screenshot. Badge it as a Big-Matrix Solutions product.
2. **Challenge** — §2, tightened to four sentences.
3. **Solution overview** — §3 plus a feature grid built from §4. Publish only `LIVE` rows.
4. **Signature work — three deep sections.** These carry the case study:
   - §5 the prescription platform (custom templates + the writing flow + print),
   - §7 delegation with doctor approval,
   - §8 a real website for every doctor.
5. **AI, honestly** — §6.1 and §6.2 only. The candour is a selling point in healthcare.
6. **The patient side** — §9, with the consent and audit layer highlighted.
7. **Technology** — §10 diagram, §11 bilingual, §12 build-scale table.
8. **Trust** — the product's own careful security wording, not the landing page's stronger claim.
9. **Outcome** — hold until §15's real numbers arrive.
10. **CTA** — link `rxcloud.care` and a live doctor subdomain as the working demo.

**Assets in the repo:** `assets/rxcloud_logo.png`, `assets/bigmatrix_cube.png`,
`assets/bigmatrix_qr.png`. The live doctor sites double as screenshot sources; the prescription
preview and Body-Only print settings screens are the most persuasive product shots.
