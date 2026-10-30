/**
 * Site-wide announcement: a pop-up on a visitor's first visit, then a slim bar
 * above the navigation on every later page view (Misbah, Oct 2026: NVIDIA
 * Inception membership).
 *
 * Wording follows NVIDIA's member guide: "NVIDIA Inception Program" in titles,
 * "NVIDIA Inception program" in sentences, never "Inception" alone and never
 * the name in capitals, plus the legal line wherever NVIDIA is named.
 *
 * To retire it, set `active: false`. To run a new one, change `id` so visitors
 * who closed the old pop-up see the new one.
 */
export const ANNOUNCEMENT = {
    active: true,
    id: 'nvidia-inception-2026',
    to: '/blog/big-matrix-solutions-joins-nvidia-inception-program',
    eyebrow: 'Announcement',
    // The headline is split so one word can take the accent.
    title: ['Big-Matrix Solutions', 'joins', 'the NVIDIA Inception Program'],
    body: "We're excited to announce our membership in the NVIDIA Inception program. It gives startups access to the latest developer resources and training, exclusive pricing on NVIDIA hardware and software, and exposure to the venture capital community.",
    detail: 'For our clients it means stronger support behind the AI diagnostics and hospital systems we build.',
    bar: 'Big-Matrix Solutions is a member of the NVIDIA Inception program',
    barShort: 'Member of NVIDIA Inception',
    cta: 'Read the announcement',
    barCta: 'Read more',
    legal: '© 2025 NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries.',
    // Official member badge from NVIDIA's member guide (Member Badge -> Download Badge),
    // stored in public/assets/images/partners/. Left null until the files are added; the
    // pop-up shows our logo alone until then. Use the files exactly as supplied: never
    // recolour or stretch them, and never show the badge larger than our logo.
    badge: { light: null, dark: null },
    // Wait before the pop-up opens, so it doesn't land on top of the page load.
    delayMs: 1200,
};

export default ANNOUNCEMENT;
