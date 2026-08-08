// Temporary: confirms Team is reachable from nav/footer and the page is sound.
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

const links = await page.evaluate(() => ({
    header: [...document.querySelectorAll('.bm-nav__links a')].map((a) => a.getAttribute('href')),
    footer: [...document.querySelectorAll('.bm-footer__list a')].map((a) => a.getAttribute('href')),
}));
console.log('HEADER NAV :', links.header.join(' '));
console.log('FOOTER     :', links.footer.join(' '));
console.log('team in header:', links.header.includes('/team'), '| team in footer:', links.footer.includes('/team'));

// Navigate via the header link, as a user would.
await page.click('.bm-nav__links a[href="/team"]');
await page.waitForURL('**/team');
await page.waitForSelector('.bm-card, .bm-person');
await page.waitForTimeout(400);

const team = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.bm-section .bm-grid > *')];
    const imgs = [...document.querySelectorAll('.bm-section img')];
    return {
        url: location.pathname,
        activeNav: document.querySelector('.bm-nav__link.is-active')?.textContent.trim(),
        title: document.querySelector('h1')?.textContent.trim(),
        members: cards.length,
        images: imgs.length,
        brokenImages: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
        firstMember: cards[0]?.textContent.replace(/\s+/g, ' ').trim().slice(0, 50),
        detailLinks: [...document.querySelectorAll('a[href^="/team/"]')].length,
        panel: !!document.querySelector('.bm-close__panel'),
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
});
console.log('\nTEAM PAGE');
console.log(JSON.stringify(team, null, 1));

// A member detail page.
const href = await page.evaluate(() => document.querySelector('a[href^="/team/"]')?.getAttribute('href'));
if (href) {
    errors.length = 0;
    await page.goto(`http://localhost:4173${href}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(350);
    const detail = await page.evaluate(() => ({
        title: document.querySelector('h1')?.textContent.trim().slice(0, 40),
        h1s: document.querySelectorAll('h1').length,
        broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
        panel: !!document.querySelector('.bm-close__panel'),
    }));
    console.log(`\nMEMBER DETAIL (${href})`);
    console.log(JSON.stringify(detail, null, 1));
}

console.log(errors.length ? '\nJS ERRORS: ' + errors.join(' | ') : '\nno JS errors');
await browser.close();
