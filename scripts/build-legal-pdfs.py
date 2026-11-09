"""Build the company-document PDFs in public/documents from src/data/legal.json.

Each document is typeset as HTML and printed to A4 with Playwright (Edge).
The letterhead (scripts/legal_letterhead.py) is then printed with one sheet
per page, numbered "Page X of Y", and laid under the text page by page. A
blank copy of the letterhead is written to docs/letterhead/.
The website renders the same JSON, so the PDFs and the pages always match.

    pip install playwright pymupdf
    python scripts/build-legal-pdfs.py

Run it again whenever src/data/legal.json changes.
"""
import html
import json
import re
from pathlib import Path

import pymupdf
from playwright.sync_api import sync_playwright

from legal_letterhead import letterhead_html

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / 'src' / 'data' / 'legal.json'
BLANK = ROOT / 'docs' / 'letterhead' / 'big-matrix-solutions-letterhead.pdf'
OUT = ROOT / 'public' / 'documents'

# Content area inside the letterhead: below the header rule, above the
# footer line, aligned with the logo and the rule's ends.
MARGIN = {'top': '48mm', 'bottom': '24mm', 'left': '21mm', 'right': '21mm'}

FONTS = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap');\n"

CSS = FONTS + """
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: 'Inter', 'Segoe UI', sans-serif; font-size: 10pt;
       line-height: 1.6; color: #2b2f36; }
.eyebrow { margin: 0 0 6pt; font-family: 'JetBrains Mono', monospace; font-size: 7.5pt;
           font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: #ec362e; }
h1 { margin: 0 0 4pt; font-family: 'Inter Tight', 'Inter', sans-serif; font-size: 22pt;
     line-height: 1.15; font-weight: 700; color: #111318; letter-spacing: -.01em; }
.updated { margin: 0 0 14pt; font-family: 'JetBrains Mono', monospace; font-size: 7.5pt;
           color: #6b7280; }
p, li { text-align: justify; text-justify: inter-word; hyphens: auto; }
p { margin: 0 0 7pt; }
.intro { font-size: 10.5pt; color: #111318; }
section { margin-top: 13pt; padding-top: 9pt; border-top: .6pt solid #e3e5e8; }
h2 { margin: 0 0 6pt; font-family: 'Inter Tight', 'Inter', sans-serif; font-size: 12pt;
     font-weight: 700; color: #111318; break-after: avoid; page-break-after: avoid; }
h2 .num { display: inline-block; min-width: 20pt; font-family: 'JetBrains Mono', monospace;
          font-size: 8.5pt; font-weight: 500; color: #ec362e; }
ul, ol { margin: 0 0 8pt; padding-left: 15pt; }
li { margin-bottom: 4pt; }
ul li { list-style: none; position: relative; }
ul li::before { content: ''; position: absolute; left: -11pt; top: .62em; width: 4.5pt;
                height: 4.5pt; background: #ec362e; }
ol li::marker { font-weight: 600; color: #ec362e; }
strong { color: #111318; font-weight: 600; }
a { color: #c22a23; text-decoration: none; hyphens: none; white-space: nowrap; }
section.keep { break-inside: avoid; page-break-inside: avoid; }
dl { margin: 4pt 0 8pt; border-top: .6pt solid #e3e5e8; }
dl div { display: flex; gap: 12pt; padding: 5pt 0; border-bottom: .6pt solid #e3e5e8;
         break-inside: avoid; }
dt { width: 58pt; flex: none; font-family: 'JetBrains Mono', monospace; font-size: 7pt;
     letter-spacing: .12em; text-transform: uppercase; color: #6b7280; line-height: 2.2; }
dd { margin: 0; font-weight: 600; color: #111318; }
"""

def inline(text, company):
    """Escape, then link the email, phone and website, as the site does."""
    out = html.escape(text)
    out = out.replace(company['email'], f'<a href="mailto:{company["email"]}">{company["email"]}</a>')
    out = out.replace(company['phone'], f'<a href="{company["phoneHref"]}">{company["phone"]}</a>')
    return re.sub(r'https://big-matrix\.com(?!/)', '<a href="https://big-matrix.com">https://big-matrix.com</a>', out)


def list_item(text, company):
    at = text.find(': ')
    if 0 < at < 48:
        return f'<li><strong>{html.escape(text[:at])}:</strong> {inline(text[at + 2:], company)}</li>'
    return f'<li>{inline(text, company)}</li>'


def build_html(doc, company):
    kind = 'Company profile' if doc['slug'] == 'about-us' else 'Policy'
    parts = [
        f'<p class="eyebrow">{kind}</p>',
        f'<h1>{html.escape(doc["title"])}</h1>',
        f'<p class="updated">Last updated: {html.escape(doc["updated"])}</p>',
    ]
    parts += [f'<p class="intro">{inline(t, company)}</p>' for t in doc['intro']]
    for i, s in enumerate(doc['sections'], 1):
        keep = ' class="keep"' if s.get('contact') else ''
        parts.append(f'<section{keep}><h2><span class="num">{i:02d}</span>{html.escape(s["heading"])}</h2>')
        parts += [f'<p>{inline(t, company)}</p>' for t in s.get('paragraphs', [])]
        if s.get('list'):
            tag = 'ol' if s.get('ordered') else 'ul'
            parts.append(f'<{tag}>' + ''.join(list_item(t, company) for t in s['list']) + f'</{tag}>')
        if s.get('contact'):
            parts.append(
                '<dl>'
                f'<div><dt>Email</dt><dd>{html.escape(company["email"])}</dd></div>'
                f'<div><dt>Phone</dt><dd>{html.escape(company["phone"])}</dd></div>'
                f'<div><dt>Website</dt><dd>{html.escape(company["website"])}</dd></div>'
                f'<div><dt>Address</dt><dd>{html.escape(company["address"])}</dd></div>'
                '</dl>'
            )
        parts += [f'<p>{inline(t, company)}</p>' for t in s.get('after', [])]
        parts.append('</section>')
    return (f'<!doctype html><html lang="en"><head><meta charset="utf-8">'
            f'<title>{html.escape(doc["title"])} | {company["name"]}</title>'
            f'<style>{CSS}</style></head><body>{"".join(parts)}</body></html>')


def render(page, markup, **pdf_options):
    page.set_content(markup, wait_until='networkidle')
    page.evaluate('document.fonts.ready')
    return page.pdf(**pdf_options)


def save(doc, target, title):
    doc.set_metadata({'title': title, 'author': 'Big-Matrix Solutions',
                      'creator': 'Big-Matrix Solutions', 'producer': 'Big-Matrix Solutions'})
    doc.save(target, garbage=4, deflate=True)


def main():
    data = json.loads(DATA.read_text(encoding='utf-8'))
    company = data['company']
    OUT.mkdir(parents=True, exist_ok=True)
    sheet = {'format': 'A4', 'print_background': True, 'prefer_css_page_size': True}
    with sync_playwright() as pw:
        browser = pw.chromium.launch(channel='msedge')
        page = browser.new_page()

        blank = render(page, letterhead_html(company, fonts_css=FONTS), **sheet)
        save(pymupdf.open(stream=blank, filetype='pdf'), BLANK, f'{company["name"]} letterhead')
        print('wrote', BLANK.relative_to(ROOT))

        for doc in data['documents']:
            text = pymupdf.open(stream=render(page, build_html(doc, company), format='A4',
                                              margin=MARGIN, print_background=False), filetype='pdf')
            pad = pymupdf.open(stream=render(page, letterhead_html(company, len(text), FONTS), **sheet),
                               filetype='pdf')
            for i, text_page in enumerate(text):
                text_page.show_pdf_page(text_page.rect, pad, i, overlay=False)
            target = OUT / f'big-matrix-solutions-{doc["slug"]}.pdf'
            save(text, target, f'{doc["title"]} | {company["name"]}')
            print('wrote', target.relative_to(ROOT))
        browser.close()


if __name__ == '__main__':
    main()
