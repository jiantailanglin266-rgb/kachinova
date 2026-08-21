/* Measures text contrast against the pixels ACTUALLY rendered behind it.
   Hides each text node, screenshots, samples the region it occupied. Catches
   what a nominal fg/bg comparison cannot: gradients, photography, video, and
   the bleed of one section's background into another.

     BASE_URL=http://localhost:4488/kachinova node tools/contrast.mjs
*/
import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE_URL || 'http://localhost:4477';
const PAGES = (process.env.PAGES || '/,/about.html,/business.html,/technology.html,/projects.html,/lab.html,/journal.html,/company.html,/sell.html,/contact.html,/privacy.html,/404.html').split(',');

const srgb = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
const lum = (c) => 0.2126 * srgb(c[0]) + 0.7152 * srgb(c[1]) + 0.0722 * srgb(c[2]);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)]; return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: 'new',
  args: ['--force-prefers-reduced-motion', '--hide-scrollbars'],
  defaultViewport: { width: 1440, height: 900 },
});

let fails = 0, checked = 0;
for (const url of PAGES) {
  const page = await browser.newPage();
  await page.goto(BASE + url, { waitUntil: 'networkidle2' });
  await page.evaluate(() => document.querySelectorAll('.reveal,.reveal-soft,.stagger,.line-mask,.plan').forEach((e) => e.classList.add('is-in')));

  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += 820) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await new Promise((r) => setTimeout(r, 260));

    const boxes = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('p,a,span,dt,dd,h1,h2,h3,h4,li,label,button,small,figcaption,text').forEach((el) => {
        const t = (el.textContent || '').trim();
        if (!t || el.children.length) return;
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.5) return;
        const r = el.getBoundingClientRect();
        if (r.width < 6 || r.height < 6 || r.bottom < 0 || r.top > innerHeight) return;
        if (el.closest('.marquee') || el.classList.contains('skip-link') || el.classList.contains('value__n')) return;
        // SVG text is painted with `fill`, not `color` — reading `color` here
        // reports the inherited currentColor and produces false failures.
        const isSvg = el.ownerSVGElement != null;
        const paint = isSvg ? cs.fill : cs.color;
        if (!/^rgb/.test(paint)) return;
        out.push({
          id: out.length, sel: (el.getAttribute('class') || el.tagName).toString().split(' ')[0],
          color: paint, fs: parseFloat(cs.fontSize), bold: parseInt(cs.fontWeight) >= 700,
          txt: t.slice(0, 26),
          x: Math.max(0, Math.round(r.left)), y: Math.max(0, Math.round(r.top)),
          w: Math.round(r.width), h: Math.round(r.height),
        });
      });
      out.forEach((b, i) => { b.id = i; });
      window.__boxes = out;
      return out;
    });
    if (!boxes.length) continue;

    await page.evaluate(() => {
      window.__hidden = [];
      document.querySelectorAll('p,a,span,dt,dd,h1,h2,h3,h4,li,label,button,small,figcaption').forEach((el) => {
        if (!el.children.length && (el.textContent || '').trim()) { window.__hidden.push([el, el.style.visibility]); el.style.visibility = 'hidden'; }
      });
    });
    await new Promise((r) => setTimeout(r, 120));
    const shot = await page.screenshot({ encoding: 'base64' });
    await page.evaluate(() => window.__hidden.forEach(([el, v]) => { el.style.visibility = v; }));

    const sampled = await page.evaluate(async (b64, boxes) => {
      const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const g = c.getContext('2d'); g.drawImage(img, 0, 0);
      return boxes.map((b) => {
        const w = Math.min(b.w, img.width - b.x), h = Math.min(b.h, img.height - b.y);
        if (w <= 0 || h <= 0) return null;
        const d = g.getImageData(b.x, b.y, w, h).data;
        let r = 0, gr = 0, bl = 0, n = 0;
        for (let k = 0; k < d.length; k += 4) { r += d[k]; gr += d[k + 1]; bl += d[k + 2]; n++; }
        return { ...b, bg: [r / n, gr / n, bl / n] };
      }).filter(Boolean);
    }, shot, boxes);

    for (const b of sampled) {
      const fg = b.color.match(/[\d.]+/g).slice(0, 3).map(Number);
      const need = (b.fs >= 24 || (b.fs >= 18.66 && b.bold)) ? 3 : 4.5;
      const cr = ratio(fg, b.bg);
      checked++;
      if (cr < need) { fails++; console.log(`FAIL ${cr.toFixed(2)}/${need}  ${url} .${b.sel} ${b.fs.toFixed(0)}px  "${b.txt}"`); }
    }
  }
  await page.close();
}
console.log(`\nchecked ${checked} text elements — ${fails} below AA`);
await browser.close();
