"""Big-Matrix Solutions letterhead, drawn as HTML for build-legal-pdfs.py.

One A4 sheet per page: logo and contact block on top, a hairline with a red
accent under the logo, a footer line with the company name and
"Page X of Y", and the red and black band along the bottom edge.
"""
import base64
import html
from pathlib import Path

LOGO = Path(__file__).resolve().parent.parent / 'docs' / 'letterhead' / 'big-matrix-solutions-logo.svg'

RED = '#ec362e'

# 24px line icons (Lucide shapes), stroked in the brand red.
ICONS = {
    'pin': '<path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0"/>'
           '<circle cx="12" cy="10" r="3"/>',
    'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 '
             '19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 '
             '2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    'mail': '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    'globe': '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>'
             '<path d="M2 12h20"/>',
}


def icon(name):
    return (f'<svg viewBox="0 0 24 24" fill="none" stroke="{RED}" stroke-width="2" '
            f'stroke-linecap="round" stroke-linejoin="round">{ICONS[name]}</svg>')


CSS = """
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: 'Inter', 'Segoe UI', sans-serif; color: #2b2f36; }
.sheet { position: relative; width: 210mm; height: 297mm; overflow: hidden;
         break-after: page; page-break-after: always; }
.sheet:last-child { break-after: auto; page-break-after: auto; }

.head { position: absolute; top: 11mm; left: 21mm; right: 21mm;
        display: flex; justify-content: space-between; align-items: center; }
.logo { height: 16mm; display: block; }
.contact { margin: 0; padding: 0; list-style: none; text-align: right; }
.contact li { display: flex; justify-content: flex-end; align-items: flex-start; gap: 2.4mm;
              font-size: 7.6pt; line-height: 1.45; color: #3a3f47; letter-spacing: .005em; }
.contact li + li { margin-top: 1.1mm; }
.contact svg { flex: none; width: 3.1mm; height: 3.1mm; margin-top: .45mm; }

.rule { position: absolute; top: 38.5mm; left: 21mm; right: 21mm; height: .35mm; background: #e6e8eb; }
.rule::before { content: ''; position: absolute; left: 0; top: -.35mm; width: 16mm; height: 1.05mm;
                background: #ec362e; }

.foot { position: absolute; left: 21mm; right: 21mm; bottom: 11mm; padding-top: 2.6mm;
        border-top: .3mm solid #e6e8eb; display: flex; justify-content: space-between;
        font-family: 'JetBrains Mono', Consolas, monospace; font-size: 6.6pt; letter-spacing: .02em;
        color: #8a8f98; }
.foot b { font-weight: 500; color: #3a3f47; }

.band { position: absolute; left: 0; right: 0; bottom: 0; height: 4.2mm; display: flex; gap: .9mm; }
.band span:first-child { width: 21%; background: #ec362e; }
.band span:last-child { flex: 1; background: #0d0f12; }
"""


def logo_src():
    return 'data:image/svg+xml;base64,' + base64.b64encode(LOGO.read_bytes()).decode()


def sheet(company, logo, page=None, total=None):
    lines = [(icon('pin'), '<br>'.join(html.escape(l) for l in company['addressLines'])),
             (icon('phone'), html.escape(company['phone'])),
             (icon('mail'), html.escape(company['email'])),
             (icon('globe'), html.escape(company['website'].replace('https://', '')))]
    contact = ''.join(f'<li><span>{text}</span>{svg}</li>' for svg, text in lines)
    number = f'Page <b>{page}</b> of <b>{total}</b>' if page else ''
    return (
        '<div class="sheet">'
        f'<div class="head"><img class="logo" src="{logo}" alt="{html.escape(company["name"])}">'
        f'<ul class="contact">{contact}</ul></div>'
        '<div class="rule"></div>'
        f'<div class="foot"><span>{html.escape(company["name"])}</span>'
        f'<span>{number}</span></div>'
        '<div class="band"><span></span><span></span></div>'
        '</div>'
    )


def letterhead_html(company, total=None, fonts_css=''):
    """`total` pages numbered "Page X of Y"; None gives one blank, unnumbered sheet."""
    logo = logo_src()
    sheets = [sheet(company, logo, i, total) for i in range(1, total + 1)] if total else [sheet(company, logo)]
    return (f'<!doctype html><html lang="en"><head><meta charset="utf-8">'
            f'<style>{fonts_css}{CSS}</style></head><body>{"".join(sheets)}</body></html>')
