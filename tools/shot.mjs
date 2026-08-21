/* Dev-only visual check. Renders pages at a set of breakpoints and writes
   full-page PNGs (sliced, so they stay readable) to the scratch directory.

     node tools/shot.mjs [path] [width] [--slices=n]
*/
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT = process.env.SHOT_DIR ||
  'C:/Users/kenta/AppData/Local/Temp/claude/C--Users-kenta-OneDrive--------STELLAR-HP-kachinova/08e1c237-0151-45d1-a34d-4d6950c2b50d/scratchpad/shots';

let target = process.argv[2] || '/';
if (!target.startsWith('/')) target = '/' + target;
const width = parseInt(process.argv[3] || '1440', 10);
const slices = parseInt((process.argv.find((a) => a.startsWith('--slices=')) || '--slices=0').split('=')[1], 10);
const height = width < 600 ? 844 : 900;

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu', '--force-prefers-reduced-motion'],
  defaultViewport: { width, height, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
page.on('console', (m) => { if (m.type() === 'error') console.log('  [console]', m.text()); });
page.on('pageerror', (e) => console.log('  [pageerror]', e.message));
page.on('requestfailed', (r) => console.log('  [404?]', r.url().replace('http://localhost:4477', ''), r.failure()?.errorText));

await page.goto((process.env.BASE_URL||'http://localhost:4477') + target, { waitUntil: 'networkidle2', timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
// force every reveal open so static shots show the finished state
await page.evaluate(() => {
  document.querySelectorAll('.reveal,.reveal-soft,.stagger,.line-mask,.plan').forEach((e) => e.classList.add('is-in'));
});
await new Promise((r) => setTimeout(r, 900));

const full = await page.evaluate(() => document.body.scrollHeight);
const slug = (target === '/' ? 'index' : target.replace(/[/.]/g, '_')) + '-' + width;
console.log(`  ${target} @${width}  height=${full}px`);

if (slices > 0) {
  const step = Math.ceil(full / slices);
  for (let i = 0; i < slices; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * step);
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: path.join(OUT, `${slug}-${String(i).padStart(2, '0')}.png`) });
  }
} else {
  await page.screenshot({ path: path.join(OUT, `${slug}-full.png`), fullPage: true });
}

// report anything wider than the viewport (horizontal-scroll bugs)
const overflow = await page.evaluate(() => {
  const bad = [];
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && (r.right > window.innerWidth + 2 || r.left < -2)) {
      bad.push(el.tagName.toLowerCase() + '.' + (el.className || '').toString().split(' ')[0] +
               ' [' + Math.round(r.left) + '→' + Math.round(r.right) + ']');
    }
  });
  return [...new Set(bad)].slice(0, 14);
});
if (overflow.length) console.log('  OVERFLOW:', overflow.join(', '));
console.log('  docWidth', await page.evaluate(() => document.documentElement.scrollWidth), 'vs', width);

await browser.close();
