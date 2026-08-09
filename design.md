# Design System — Replication Guide

A portable spec for the Big-Matrix visual language. Copy the token block, follow the
layer order, and rebuild the components from the recipes below. Nothing here depends
on this repo's content or routing.

---

## 1. Design intent

Light, high-contrast, engineering-grade. The reference point is the Cloudflare /
Vercel design language rather than a marketing template:

- **Hairlines, not shadows.** Structure comes from 1px borders. Elevation is used
  sparingly and only on hover or for floating plates.
- **Near-square radii.** 2–10px. Nothing looks soft or bubbly.
- **One accent hue.** A single red, stepped by lightness. Colour is an event, not a
  surface treatment. Everything else is achromatic grey.
- **Tight geometric display type** over a neutral body face, with a mono face
  reserved for labels, metadata and figures. The mono is a *signal*: if text is
  mono, it is data or a label, never prose.
- **A dot matrix is the page canvas**, fixed behind all content, unbroken across
  sections. Sections are transparent by default so the field shows through.
- **Type and whitespace do the structuring.** Cards are used where content is
  genuinely card-shaped; elsewhere prefer rule-topped columns, numbered rows and
  bento cells that share hairlines.

Anti-patterns to avoid: gradients as surfaces, drop shadows for separation,
rounded pill cards, multiple accent colours, decorative icons in circles,
centre-aligned body copy.

---

## 2. Layer architecture

Four stylesheets, loaded in this order. Later files win the cascade.

| File | Role |
| --- | --- |
| `bm-tokens.css` | Custom properties only. No selectors except `:root`. |
| `bm-core.css` | Base element styles, layout primitives, buttons, forms, page header, a11y helpers. |
| `bm-sections.css` | Re-skins any inherited third-party markup you cannot delete. |
| `bm-ui.css` | Namespaced `bm-*` components. All new work goes here. |

```js
// entry point — design system loaded last, on purpose
import './index.css'                    // global bootstrap only
import './assets/css/bm-tokens.css'
import './assets/css/bm-core.css'
import './assets/css/bm-sections.css'
import './assets/css/bm-ui.css'
```

**The namespace rule:** every component class is `bm-` prefixed with BEM-ish
element/modifier suffixes (`bm-card`, `bm-card__body`, `bm-card--wide`). This is
what keeps an inherited template's line clamps, justified text, min-heights and
hard-coded colours from reaching new components. If you start from a clean project
you still want the prefix — it makes the system's surface area obvious.

If porting into a fresh project with no legacy CSS, drop `bm-sections.css` and use
three files.

---

## 3. Tokens

Copy this file verbatim as `bm-tokens.css`. It is the whole contract; if you change
one thing, change it here.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  /* ---------- Canvas: achromatic ramp ---------- */
  --bm-bg: #ffffff;
  --bm-bg-warm: #fdfdfd;
  --bm-surface: #fafafa;
  --bm-surface-2: #f4f4f4;
  --bm-surface-3: #eaeaea;
  --bm-ink-bg: #181818;
  --bm-ink-bg-2: #222222;

  /* ---------- Hairlines ---------- */
  --bm-line: #e6e6e6;
  --bm-line-soft: #efefef;
  --bm-line-strong: #d4d4d4;
  --bm-line-ink: rgba(255, 255, 255, 0.12);

  /* ---------- Ink / text ---------- */
  --bm-text: #1c1c1c;
  --bm-text-2: #4e4e4e;   /* 8.3:1 on white */
  --bm-text-3: #6c6c6c;   /* 5.2:1 on white */
  --bm-text-inv: #ffffff;
  --bm-text-inv-2: rgba(255, 255, 255, 0.68);

  /* ---------- Accent: one hue, stepped by lightness ---------- */
  --bm-accent: #ec362e;        /* brand mark — decoration, rules, icons */
  --bm-accent-fill: #d92d22;   /* accessible fill: 4.8:1 with white text */
  --bm-accent-hover: #b81f16;  /* 6.5:1 */
  --bm-accent-deep: #c62519;   /* large filled surfaces: 5.7:1 */
  --bm-accent-ink: #a81f16;    /* accent text on light bg: 7.3:1 */
  --bm-accent-tint: #fef2f0;
  --bm-accent-tint-2: #fcdedb;

  /* Aliases — component layers reference both spellings. */
  --bm-orange: var(--bm-accent);
  --bm-orange-fill: var(--bm-accent-fill);
  --bm-orange-hover: var(--bm-accent-hover);
  --bm-orange-deep: var(--bm-accent-deep);
  --bm-orange-ink: var(--bm-accent-ink);
  --bm-orange-tint: var(--bm-accent-tint);
  --bm-orange-tint-2: var(--bm-accent-tint-2);

  /* ---------- Secondary / signal ---------- */
  --bm-blue: #1d75b9;
  --bm-blue-tint: #eef6fc;
  --bm-red: var(--bm-accent);
  --bm-ok: #067647;
  --bm-warn: #b45309;

  /* ---------- Gradients, washes, grids ---------- */
  --bm-wash-orange: radial-gradient(60% 70% at 12% 0%, rgba(236, 54, 46, 0.14) 0%, rgba(236, 54, 46, 0) 70%);
  --bm-wash-warm: linear-gradient(180deg, #fff9f8 0%, #ffffff 62%);
  --bm-grid: radial-gradient(var(--bm-line-strong) 1px, transparent 1.5px);
  --bm-grid-ink: radial-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1.5px);
  --bm-grid-size: 22px 22px;
  --bm-rules:
    linear-gradient(var(--bm-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--bm-line) 1px, transparent 1px);
  --bm-rules-ink:
    linear-gradient(rgba(255, 255, 255, 0.075) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.075) 1px, transparent 1px);
  --bm-rules-size: 66px 66px;   /* 3x the dot pitch, so the two align */

  /* ---------- Typography ---------- */
  --bm-font-display: 'Inter Tight', 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --bm-font-body: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --bm-font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  --bm-fs-display: clamp(2.35rem, 1.25rem + 3.9vw, 4.25rem);
  --bm-fs-h1: clamp(1.95rem, 1.3rem + 2.2vw, 3rem);
  --bm-fs-h2: clamp(1.6rem, 1.25rem + 1.3vw, 2.25rem);
  --bm-fs-h3: clamp(1.3rem, 1.12rem + 0.7vw, 1.6rem);
  --bm-fs-h4: clamp(1.08rem, 1.02rem + 0.3vw, 1.25rem);
  --bm-fs-lead: clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem);
  --bm-fs-body: 1rem;
  --bm-fs-sm: 0.9375rem;
  --bm-fs-xs: 0.8125rem;
  --bm-fs-label: 0.75rem;

  --bm-lh-display: 1.02;
  --bm-lh-tight: 1.1;
  --bm-lh-snug: 1.28;
  --bm-lh-body: 1.65;

  --bm-track-display: -0.032em;
  --bm-track-heading: -0.022em;
  --bm-track-body: -0.006em;
  --bm-track-label: 0.13em;

  /* ---------- Space ---------- */
  --bm-1: 4px;   --bm-2: 8px;   --bm-3: 12px;  --bm-4: 16px;  --bm-5: 24px;
  --bm-6: 32px;  --bm-7: 48px;  --bm-8: 64px;  --bm-9: 96px;
  --bm-section: clamp(56px, 3rem + 4.5vw, 112px);
  --bm-gutter: clamp(20px, 1rem + 1.5vw, 40px);
  --bm-max: 1240px;

  /* ---------- Radius ---------- */
  --bm-r-xs: 2px;
  --bm-r-sm: 4px;
  --bm-r: 6px;
  --bm-r-lg: 10px;
  --bm-r-pill: 999px;

  /* ---------- Elevation ---------- */
  --bm-shadow-xs: 0 1px 2px rgba(28, 27, 22, 0.04);
  --bm-shadow-sm: 0 1px 2px rgba(28, 27, 22, 0.05), 0 2px 12px rgba(28, 27, 22, 0.03);
  --bm-shadow: 0 2px 12px rgba(28, 27, 22, 0.05), 0 12px 40px -12px rgba(28, 27, 22, 0.1);
  --bm-shadow-lift: 0 2px 8px rgba(28, 27, 22, 0.05), 0 18px 48px -16px rgba(236, 54, 46, 0.18);
  --bm-shadow-ink: 0 8px 32px -8px rgba(28, 27, 22, 0.4);

  /* ---------- Motion ---------- */
  --bm-ease: cubic-bezier(0.19, 1, 0.22, 1);        /* expo-out, for transforms */
  --bm-ease-inout: cubic-bezier(0.4, 0, 0.2, 1);    /* for colour changes */
  --bm-dur-fast: 120ms;
  --bm-dur: 240ms;
  --bm-dur-slow: 560ms;

  /* ---------- Layout ---------- */
  --bm-header-h: 72px;
  --bm-focus: 0 0 0 2px #ffffff, 0 0 0 4px var(--bm-orange);
}

@media (prefers-reduced-motion: reduce) {
  :root { --bm-dur-fast: 1ms; --bm-dur: 1ms; --bm-dur-slow: 1ms; }
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Rebranding

To retarget the palette, replace the seven `--bm-accent-*` steps with a new hue and
keep the lightness relationships (base → fill → hover → deep → ink getting darker,
plus two tints). Everything else is achromatic and hue-agnostic. Also update the
hardcoded `rgba(236, 54, 46, …)` values inside the wash, grid and shadow tokens.

### Contrast contract

`--bm-accent` clears 3:1 (large text and non-text UI) but **not** 4.5:1. Anything
carrying white text uses `--bm-accent-fill` or darker. Accent text on light
backgrounds uses `--bm-accent-ink`.

---

## 4. Foundations (`bm-core.css`)

### The page canvas

The dot matrix is a fixed pseudo-element on `html`, not `background-attachment:
fixed` — mobile Safari and several Android browsers re-anchor that value to the
document and the pattern scrolls with the page.

```css
html::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image: var(--bm-grid);
  background-size: var(--bm-grid-size);
  pointer-events: none;
}
body { background-color: transparent; }
```

### Base rules

- `box-sizing: border-box` on everything; `overflow-x: clip` on `html, body`.
- Body: body font, `--bm-fs-body`, `--bm-lh-body`, `--bm-track-body`, `--bm-text`,
  antialiased, `font-feature-settings: 'cv02','cv03','cv04','ss01'`.
- Headings: display font, weight 600, `--bm-lh-tight`, `--bm-track-heading`,
  `text-wrap: balance`. `h1`–`h4` map to `--bm-fs-h1`…`h4`.
- Paragraphs default to `--bm-text-2`, never `--bm-text`.
- Links inherit `--bm-text`, hover to `--bm-accent-ink`, no underline by default.
- `::selection` uses `--bm-accent-tint-2`.
- Focus ring: `outline: 2px solid var(--bm-accent-fill); outline-offset: 2px` on
  `:focus-visible` for every interactive element. Never remove it.
- Custom thin scrollbar in `--bm-line-strong` on `--bm-surface`.

### Layout primitives

| Class | Purpose |
| --- | --- |
| `.bm-container` | `max-width: var(--bm-max)`, auto margins, `padding-inline: var(--bm-gutter)`. |
| `.bm-rule` | 1px full-bleed hairline for separating stacked bands. |
| `.bm-eyebrow` | Mono uppercase label with a 6×6px accent square before it. |
| `.bm-lead` | Lead paragraph, `--bm-fs-lead`, capped at `62ch`. |
| `.bm-skip-link` | Fixed skip-to-content link, translated off-screen until focused. |
| `.visually-hidden` | Standard clip-rect screen-reader-only utility. |

### Forms

46px min-height, 12/14px padding, `--bm-r-sm`, 1px `--bm-line-strong` border, white
fill. Focus swaps the border to `--bm-accent` and adds
`box-shadow: 0 0 0 3px rgba(236,54,46,0.16)`. Textareas are 148px min and
`resize: vertical`. Placeholders use `--bm-text-3` at full opacity.

---

## 5. Components (`bm-ui.css`)

Numbered catalogue as built. Reproduce in order; each later item leans on the
earlier ones.

1. Layout primitives (section/container)
2. Section head
3. Grid
4. Buttons
5. Card
6. Navigation
7. Hero
8. Logo wall
9. About / lab split
10. CTA band
11. Footer
12. Back-to-top dial
13. Card variants (incl. person card)
14. Quote / testimonial
15. Bento (asymmetric cells sharing hairlines)
16. Rows (numbered hairline list)
17. Showcase (framed product shots)
18. Editorial (lead story + numbered index)
19. Closing panel (inset accent slab with horizon glow)
20. Job listings (role rows + filter toolbar)
21. Insights (featured post above grid)
22. Contact (form + direct-lines panel)
23. Person profile (portrait masthead, expertise meters, work ledger)
24. Select popover (custom combobox)

### 5.1 Section

Transparent by default so the dot canvas shows through; a top hairline carries the
rhythm that a solid fill used to.

```css
.bm-section {
  position: relative;
  padding-block: var(--bm-section);
  background: transparent;
  border-top: 1px solid var(--bm-line);
}
.bm-section--warm    { background: var(--bm-bg-warm); }   /* opaque tint */
.bm-section--surface { background: var(--bm-surface); }
.bm-section--opaque  { background: var(--bm-bg); }
.bm-section--flush   { border-top: 0; }
.bm-section--ink     { background: var(--bm-ink-bg); border-top: 0; overflow: hidden; }
.bm-section > .bm-container { position: relative; z-index: 1; }
```

Texture opt-in, layered as `::before`:

```css
.bm-grid-wash::before {
  content: ''; position: absolute; inset: 0;
  background-image: var(--bm-grid);
  background-size: var(--bm-grid-size);
  pointer-events: none;
}
.bm-section--ink.bm-grid-wash::before      { background-image: var(--bm-grid-ink); }
.bm-grid-wash--squares::before             { background-image: var(--bm-rules); background-size: var(--bm-rules-size); }
.bm-section--ink.bm-grid-wash--squares::before { background-image: var(--bm-rules-ink); background-size: var(--bm-rules-size); }
```

Dots read as a *field*; ruled squares read as a *drafting plane*. Use one per
section, never both.

Ink sections re-map their children rather than requiring new classes:

```css
.bm-section--ink .bm-head__title  { color: #fff; }
.bm-section--ink .bm-head__lead   { color: var(--bm-text-inv-2); }
.bm-section--ink .bm-head__eyebrow{ color: var(--bm-orange); }
```

### 5.2 Section head

One pattern for every section on the site: mono eyebrow, tight display title,
optional lead, optional right-aligned action.

```jsx
<div className="bm-head">
  <div>
    <p className="bm-head__eyebrow">What we do</p>
    <h2 className="bm-head__title">Systems that hold under load</h2>
    <p className="bm-head__lead">Optional supporting sentence.</p>
  </div>
  <div className="bm-head__action">
    <a className="bm-button bm-button--ghost">All services <i className="bi bi-arrow-right" /></a>
  </div>
</div>
```

```css
.bm-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  column-gap: var(--bm-6);
  margin-bottom: var(--bm-7);
}
.bm-head__eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  margin: 0 0 var(--bm-4);
  font-family: var(--bm-font-mono);
  font-size: var(--bm-fs-label); font-weight: 500; line-height: 1;
  letter-spacing: var(--bm-track-label); text-transform: uppercase;
  color: var(--bm-orange-ink);
}
.bm-head__eyebrow::before {
  content: ''; flex: 0 0 auto; width: 6px; height: 6px; background: var(--bm-orange);
}
.bm-head__title {
  max-width: 22ch; margin: 0;
  font-family: var(--bm-font-display);
  font-size: var(--bm-fs-h1); font-weight: 600;
  line-height: 1.06; letter-spacing: var(--bm-track-display);
  color: var(--bm-text); text-wrap: balance;
}
.bm-head__lead { max-width: 60ch; margin: var(--bm-4) 0 0; font-size: var(--bm-fs-lead); line-height: 1.6; color: var(--bm-text-2); }
.bm-head__action { justify-self: end; }

@media (max-width: 767px) {
  .bm-head { grid-template-columns: minmax(0, 1fr); row-gap: var(--bm-5); margin-bottom: var(--bm-6); }
  .bm-head__action { justify-self: start; }
  .bm-head__title { max-width: none; }
}
```

The **6×6px accent square** before a mono uppercase label is the system's signature
mark. It also appears on breadcrumbs and stat cells, which is what ties bands to
each other.

### 5.3 Grid

```css
.bm-grid {
  display: grid;
  grid-template-columns: repeat(var(--bm-cols, 3), minmax(0, 1fr));
  gap: var(--bm-5);
  align-items: stretch;
}
.bm-grid--2 { --bm-cols: 2; }
.bm-grid--4 { --bm-cols: 4; }

@media (max-width: 991px) { .bm-grid { --bm-cols: 2 !important; } }
@media (max-width: 639px) { .bm-grid { --bm-cols: 1 !important; } }
```

Column count is a custom property, so breakpoints override once for every variant.
`minmax(0, 1fr)` prevents blowout from long unbroken strings.

### 5.4 Buttons

Three variants only: solid ink (default), accent, ghost. 44px min-height for touch.

```css
.bm-button {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 44px; padding: 11px 20px;
  font-family: var(--bm-font-body); font-size: var(--bm-fs-sm); font-weight: 600;
  line-height: 1.2; letter-spacing: -0.01em; white-space: nowrap;
  color: #fff; background: var(--bm-text);
  border: 1px solid transparent; border-radius: var(--bm-r-sm);
  cursor: pointer;
  transition: background var(--bm-dur) var(--bm-ease-inout),
              border-color var(--bm-dur) var(--bm-ease-inout),
              color var(--bm-dur) var(--bm-ease-inout),
              transform var(--bm-dur) var(--bm-ease);
}
.bm-button:hover     { background: #000; transform: translateY(-1px); }
.bm-button:hover i   { transform: translateX(3px); }

.bm-button--accent       { background: var(--bm-orange-fill); }
.bm-button--accent:hover { background: var(--bm-orange-hover); }

.bm-button--ghost        { color: var(--bm-text); background: var(--bm-bg); border-color: var(--bm-line-strong); }
.bm-button--ghost:hover  { background: var(--bm-surface); border-color: var(--bm-text); }

.bm-section--ink .bm-button--ghost       { color: #fff; background: transparent; border-color: rgba(255,255,255,0.28); }
.bm-section--ink .bm-button--ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.5); }
```

Quiet inline link for use inside cards — an underline that becomes accent on hover,
with the arrow nudging right:

```css
.bm-link {
  display: inline-flex; align-items: center; gap: 8px; padding-bottom: 3px;
  font-size: var(--bm-fs-sm); font-weight: 600; color: var(--bm-text);
  border-bottom: 1px solid var(--bm-line-strong);
  transition: color var(--bm-dur) var(--bm-ease-inout), border-color var(--bm-dur) var(--bm-ease-inout);
}
.bm-link:hover   { color: var(--bm-orange-ink); border-bottom-color: var(--bm-orange); }
.bm-link:hover i { transform: translateX(3px); }
```

**Rule:** two buttons maximum per view region — one accent, one ghost.

### 5.5 Card

One card shape for the whole site. The signature move is a 2px accent rule that
wipes across the top edge on hover, done with `background-size` so it animates on
the compositor without an extra element.

```css
.bm-card {
  position: relative; display: flex; flex-direction: column; height: 100%;
  overflow: hidden;
  background: var(--bm-bg);
  border: 1px solid var(--bm-line);
  border-radius: var(--bm-r);
  background-image: linear-gradient(90deg, var(--bm-orange), var(--bm-orange));
  background-repeat: no-repeat;
  background-size: 0% 2px;
  background-position: 0 0;
  transition: border-color var(--bm-dur) var(--bm-ease-inout),
              box-shadow var(--bm-dur) var(--bm-ease),
              transform var(--bm-dur) var(--bm-ease),
              background-size var(--bm-dur-slow) var(--bm-ease);
}
.bm-card:hover {
  border-color: var(--bm-line-strong);
  box-shadow: var(--bm-shadow);
  transform: translateY(-2px);
  background-size: 100% 2px;
}
```

Anatomy:

| Element | Spec |
| --- | --- |
| `__media` | `aspect-ratio: 16 / 10`, `--bm-surface-2` placeholder, bottom hairline; image `object-fit: cover`, scales to 1.04 on card hover over `--bm-dur-slow`. |
| `__body` | Flex column, `gap: var(--bm-3)`, `padding: var(--bm-5)`, `flex: 1 1 auto`. |
| `__icon` | 44×44, `--bm-surface-2` fill, hairline border, `--bm-r-sm`; on card hover flips to `--bm-accent-ink` on `--bm-accent-tint`. |
| `__meta` | Mono 11px, uppercase, `0.09em` tracking, `--bm-text-3`, flex-wrapped with `gap: var(--bm-2) var(--bm-4)`. |
| `__index` | Absolute top/right at `var(--bm-5)`, mono 11px — the counter. |
| `__title` | Display font 1.125rem/1.3, weight 600, clamped to **2 lines**. |
| `__text` | `--bm-fs-sm`/1.6, `--bm-text-2`, clamped to **3 lines**, left-aligned. |
| `__foot` | `margin-top: auto` so footers align across a row. |

Line clamps plus `height: 100%` are what keep every card in a row the same shape
without fixed heights.

### 5.6 Hero

Centred editorial composition. The headline is the only focal point; it fills
exactly one viewport on landing.

```css
.bm-hero {
  position: relative; display: flex; flex-direction: column;
  min-height: 100vh; min-height: 100svh;
  padding-top: var(--bm-header-h);
  background: var(--bm-bg);
  border-bottom: 1px solid var(--bm-line);
  overflow: hidden; isolation: isolate;
}
.bm-hero__dots  { position: absolute; inset: 0; z-index: -2; pointer-events: none; }
.bm-hero__main  { position: relative; z-index: 1; flex: 1 1 auto; display: flex; align-items: center; padding-block: clamp(32px, 5vh, 72px); }
.bm-hero__inner { max-width: 60rem; margin-inline: auto; text-align: center; }
```

Stack, top to bottom:

1. **Badge** — pill, mono 0.875rem uppercase at `0.14em`, opaque white with a
   `--bm-line-strong` border and `--bm-shadow-sm`. A pulsing 8px accent dot before
   it (`box-shadow` beacon keyframe, 2.4s).
2. **Headline** — display font, `clamp(2.5rem, 1.2rem + 5.4vw, 5rem)`,
   `line-height: 0.98`, `letter-spacing: -0.04em`. One `<em>` word takes weight 700
   and a clipped accent gradient (`background-clip: text`) so the emphasis carries
   weight as well as colour.
3. **Lead** — `--bm-fs-lead`, capped `58ch`, centred, `--bm-text-2`.
4. **Actions** — centred flex, `gap: var(--bm-3)`. The accent button gets a coloured
   drop glow: `0 10px 28px -12px rgba(217,45,34,0.55)`.
5. **KPI panel** — 3-column plate, `max-width: 600px`, white, hairline border,
   `--bm-r-lg`, `--bm-shadow-sm`; cells split by hairlines, each stacking a
   display-scale figure over a mono label with an accent tick above.

Vertical fit is handled by stepping the scale down rather than dropping elements —
the KPI panel is the tallest optional block, so it gives up height first:

```css
@media (min-width: 992px) and (max-height: 860px) {
  .bm-hero__title { font-size: clamp(2.25rem, 6vh, 3.75rem); }
  .bm-hero__lead  { font-size: 1rem; }
}
```

Since the hero uses `svh` and a fixed dot canvas, an interactive dot canvas (mouse
reactive) can be dropped into `.bm-hero__dots` without touching layout.

### 5.7 Page header (interior pages)

Ink band that mirrors the hero: dark canvas, two accent radial glows, a dot matrix
masked to fade downward, breadcrumbs in mono, and a full-width display title as the
only other content.

```css
.bm-pagehead {
  position: relative;
  padding-top: calc(var(--bm-header-h) + clamp(56px, 3rem + 3vw, 96px));
  padding-bottom: clamp(56px, 3rem + 3vw, 96px);
  color: #fff;
  background:
    radial-gradient(1040px 560px at 82% -14%, rgba(236, 54, 46, 0.42), transparent 64%),
    radial-gradient(680px 340px at 8% 112%, rgba(236, 54, 46, 0.18), transparent 70%),
    var(--bm-ink-bg);
  border-bottom: 1px solid var(--bm-line-ink);
  overflow: hidden;
}
.bm-pagehead::before {
  content: ''; position: absolute; inset: 0;
  background-image: var(--bm-grid-ink);
  background-size: var(--bm-grid-size);
  mask-image: linear-gradient(180deg, #000 0%, rgba(0,0,0,0.6) 42%, transparent 86%);
  pointer-events: none;
}
.bm-pagehead__title {
  font-family: var(--bm-font-display);
  font-size: clamp(2.2rem, 1.3rem + 3.4vw, 4rem);
  font-weight: 600; line-height: 1.04;
  letter-spacing: var(--bm-track-display);
  color: #fff; text-wrap: balance;
}
```

Breadcrumbs: `<ol>` reset flat, mono `--bm-fs-label` uppercase at `0.08em`,
`--bm-text-inv-2`, accent square before the first item, `aria-current` item in white.

### 5.8 Nav

Fixed to the top, `z-index: 900`, `rgba(255,255,255,0.82)` with
`backdrop-filter: saturate(180%) blur(14px)`, hairline bottom border. Height is
`--bm-header-h` (72px) — the same token the hero and page head pad against, so
nothing has to hardcode it.

### 5.9 CTA band + footer

```css
.bm-cta-band { padding-block: clamp(56px, 3rem + 3vw, 96px); }
.bm-cta-band::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(60% 90% at 84% 10%, rgba(236, 54, 46, 0.22), transparent 70%);
  pointer-events: none;
}
.bm-cta-band__inner {
  display: grid; grid-template-columns: minmax(0, 1fr) auto;
  align-items: center; gap: var(--bm-7);
}
.bm-cta-band__actions { display: flex; flex-wrap: wrap; gap: var(--bm-3); justify-self: end; }
@media (max-width: 991px) {
  .bm-cta-band__inner   { grid-template-columns: minmax(0, 1fr); }
  .bm-cta-band__actions { justify-self: start; }
}

.bm-footer {
  position: relative;
  padding-top: clamp(40px, 2rem + 2vw, 64px);
  background: var(--bm-ink-bg);
  overflow: hidden;
  margin-top: -1px;   /* see note */
}
.bm-footer__top {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr));
  gap: var(--bm-6) var(--bm-5);
  padding-bottom: clamp(40px, 2rem + 2vw, 64px);
}
```

The footer's `margin-top: -1px` is deliberate. Section heights land on fractional
device pixels at DPR 2/3, and the sub-pixel gap exposes the white page canvas as a
bright line between the dark CTA panel and the dark footer. Carry this over.

On phones, keep the two short link columns paired on one row and let the brand and
contact blocks span full width.

---

## 6. Responsive strategy

Fluid first, breakpoints second. `clamp()` handles type, section padding and
gutters, so only structural changes need media queries. Standard stops:

| Query | Change |
| --- | --- |
| `max-width: 575px` | Footer column pairing; single-column everything. |
| `max-width: 639px` | `.bm-grid` → 1 column. |
| `max-width: 767px` | Section head stacks, action left-aligns. |
| `max-width: 991px` | `.bm-grid` → 2 columns; split layouts stack; CTA band stacks. |
| `min-width: 992px` | Desktop nav, side-by-side splits, right-aligned head actions. |
| `min-width: 992px and max-height: 860px` | Hero scale step-down for laptops. |

---

## 7. Motion

- Colour transitions use `--bm-ease-inout`; transforms and size use `--bm-ease`
  (expo-out) so movement decelerates hard.
- Hover lift is `translateY(-1px)` on buttons, `-2px` on cards. Nothing more.
- Arrow icons nudge `translateX(3px)`.
- Image zoom on card hover is `scale(1.04)` over `--bm-dur-slow`.
- Only animate `transform`, `opacity`, `background-size` and colours.
- `prefers-reduced-motion` collapses all three duration tokens to 1ms *and* forces
  `animation-duration`/`transition-duration` globally. Any infinite animation
  (marquees, beacons) needs an explicit `animation: none` in that query.

---

## 8. Accessibility contract

- Body copy is `--bm-text-2` (8.3:1) and metadata `--bm-text-3` (5.2:1). Do not go
  lighter for prose.
- Accent on white is not 4.5:1 — use `--bm-accent-ink` for accent text,
  `--bm-accent-fill` or darker under white text.
- Every interactive element keeps a `:focus-visible` ring; 44px minimum hit target
  on buttons, 46px on inputs.
- Skip link is the first focusable element; `<main id="main-content">` is the target.
- Decorative icons get `aria-hidden="true"`. Breadcrumb current page gets
  `aria-current`.
- `text-wrap: balance` on headings, `max-width` in `ch` on all prose blocks
  (`22ch` titles, `58–62ch` leads, `66ch` section copy).

Full WCAG conformance still needs manual testing with assistive tech and an expert
review; the above covers the parts a design system can guarantee.

---

## 9. Component conventions

Keep components thin and prop-driven, with class names as the only styling surface —
no inline styles, no CSS-in-JS.

```jsx
const SectionHead = ({ eyebrow, title, lead, action }) => (
  <div className="bm-head">
    <div>
      {eyebrow && <p className="bm-head__eyebrow">{eyebrow}</p>}
      <h2 className="bm-head__title">{title}</h2>
      {lead && <p className="bm-head__lead">{lead}</p>}
    </div>
    {action && (
      <div className="bm-head__action">
        <Link to={action.to} className="bm-button bm-button--ghost">
          {action.label}
          <i className="bi bi-arrow-right" aria-hidden="true"></i>
        </Link>
      </div>
    )}
  </div>
);
```

Shell layout owns the chrome so pages only render sections:

```jsx
<>
  <a className="bm-skip-link" href="#main-content">Skip to content</a>
  <Header />
  <MobileMenu />
  <main id="main-content"><Outlet /></main>
  <FooterArea />
  <ScrollToTop />
</>
```

A page is a stack of `<section className="bm-section">` blocks, each opening with a
`SectionHead` and alternating tint (`bare → --warm → bare → --ink`) so the dot canvas
reads through every other band.

---

## 10. Runtime dependencies

Only what the design language actually needs:

| Package | Used for |
| --- | --- |
| `react` + `react-dom` 18 | UI |
| `react-router-dom` 7 | routing, `<Link>` in components |
| `react-helmet-async` | per-page head |
| `bootstrap-icons` (CSS) | `<i className="bi bi-*">` icon set |
| `@fortawesome/fontawesome-free` | legacy icon markup only — skip on a clean start |
| `lucide-react` | React-side icons |
| `swiper` | carousels |
| `react-countup` | KPI figure animation |
| `three` + `vanta` | optional hero background field |
| `marked` + `dompurify` + `highlight.js` | markdown content rendering |

Build is Vite 5 with `@vitejs/plugin-react`, ESLint 9 flat config.

Font loading is a single Google Fonts import at the top of the token file: Inter
400–700, Inter Tight 400–700, JetBrains Mono 400–500, `display=swap`. Self-host
these if you want to drop the third-party request.

---

## 11. Porting checklist

1. Scaffold Vite + React, install the dependencies you actually need from §10.
2. Copy `bm-tokens.css` verbatim. Retarget the accent steps if rebranding.
3. Write `bm-core.css`: base reset, canvas pseudo-element, typography, focus ring,
   scrollbar, layout primitives, forms, page header, a11y helpers.
4. Write `bm-ui.css` starting with §5.1–5.5 (section, head, grid, buttons, card).
   Those five cover roughly 80% of any page.
5. Import in order: bootstrap → tokens → core → ui.
6. Build the `Layout` shell with skip link, fixed nav at `--bm-header-h`, and footer.
7. Add hero and page header bands.
8. Add specialised patterns from the §5 catalogue as content demands them. Resist
   inventing a second card shape.

### Review gate

Before merging any new UI, check:

- No hardcoded colour, spacing, radius, duration or font stack. Tokens only.
- Class is `bm-` prefixed and belongs in the catalogue, or is a justified addition.
- Separation is a hairline, not a shadow. Elevation only on hover or floating plates.
- Mono type is used only for labels, metadata and figures.
- Prose has a `ch` cap and sits on `--bm-text-2`.
- Hover state limited to lift, hairline, accent wipe, arrow nudge.
- Focus ring intact; contrast steps respected.
- Card contents clamp to 2/3 lines so rows stay even.
