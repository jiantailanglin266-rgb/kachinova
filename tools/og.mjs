/* Per-page OG cards.
 *
 * Rendered in headless Chrome rather than composited in PIL, so the card uses
 * the site's real fonts, real grade and real palette — one less place for the
 * brand to drift. Each page gets its own film still and its own headline, so a
 * shared link no longer shows the same picture whatever was shared.
 *
 *   BASE_URL=http://localhost:4488/kachinova node tools/og.mjs
 */
import puppeteer from 'puppeteer-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { COMPANY } from '../src/site.mjs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'assets', 'img', 'og');
const THEME = (process.env.THEME || 'light').toLowerCase();

/* slug -> { still, eyebrow, en, jp } */
const CARDS = {
  index:      { img: 'video-posters/kachinova-city',    eyebrow: 'REAL ESTATE TECHNOLOGY', en: 'Reinvent<br>the Value<br>of Living.', jp: '住まいの価値を、再発明する。' },
  shibuya:    { img: 'video-posters/kachinova-city',    eyebrow: '渋谷の不動産',            en: 'Shibuya,<br>re-engineered.',        jp: '渋谷区の中古区分マンション買取・再販' },
  about:      { img: 'about-city',                      eyebrow: 'ABOUT',                  en: 'Real Estate<br>Re-engineered.',      jp: '不動産を再設計するテクノロジー企業' },
  business:   { img: 'video-posters/kachinova-revalue', eyebrow: 'BUSINESS',               en: 'Residential<br>Revalue.',            jp: '買取 → 分析 → 設計 → 再生 → 価値創造' },
  technology: { img: 'tech-mind',                       eyebrow: 'TECHNOLOGY',             en: 'From instinct<br>to evidence.',      jp: 'AI・スマートホーム・省エネ技術' },
  projects:   { img: 'video-posters/kachinova-revalue', eyebrow: 'PROJECTS',               en: 'Revalue<br>Projects.',               jp: '再価値化のプロジェクト' },
  lab:        { img: 'lab-globe',                       eyebrow: 'KACHINOVA LAB',          en: 'What we are<br>working on.',         jp: 'PropTech 研究開発' },
  journal:    { img: 'video-posters/kachinova-eco',     eyebrow: 'JOURNAL',                en: 'Kachinova<br>Journal.',              jp: '中古住宅・PropTech・省エネの読みもの' },
  company:    { img: 'sell-city',                       eyebrow: 'COMPANY',                en: 'Company.',                           jp: '株式会社KACHINOVA ／ 東京都渋谷区桜丘町' },
  sell:       { img: 'video-posters/kachinova-future',  eyebrow: '売却・無料査定',          en: 'Sell to<br>Kachinova.',              jp: '区分マンションの買取査定（無料）' },
  contact:    { img: 'video-posters/kachinova-city',    eyebrow: 'CONTACT',                en: 'Contact.',                           jp: 'お問い合わせ' },
  privacy:    { img: 'sell-city',                       eyebrow: 'PRIVACY POLICY',         en: 'Privacy.',                           jp: 'プライバシーポリシー' },
  404:        { img: 'video-posters/kachinova-city',    eyebrow: 'ERROR 404',              en: 'Page<br>not found.',                 jp: 'お探しのページは見つかりませんでした' },
};

const BASE = process.env.BASE_URL || 'http://localhost:4488/kachinova';

const page_ = (c) => `<!doctype html><html lang="ja"${THEME === 'dark' ? ' data-theme="dark"' : ''}><head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500&family=IBM+Plex+Mono:wght@400&family=Noto+Serif+JP:wght@300&family=Noto+Sans+JP:wght@300;400&display=swap">
<link rel="stylesheet" href="${BASE}/assets/css/kachinova.css">
<style>
  html,body{margin:0;padding:0;width:1200px;height:630px;overflow:hidden}
  .card{position:relative;width:1200px;height:630px;background:var(--bg);overflow:hidden;isolation:isolate}
  .card__plate{position:absolute;inset:0;z-index:-2}
  .card__plate img{width:100%;height:100%;object-fit:cover}
  .card__veil{position:absolute;inset:0;z-index:-1;
    background:
      linear-gradient(180deg, rgba(var(--veil),var(--sc-a)) 0%, rgba(var(--veil),var(--sc-b)) 34%, rgba(var(--veil),var(--sc-d)) 100%),
      linear-gradient(90deg, rgba(var(--veil),.94) 0%, rgba(var(--veil),.72) 42%, rgba(var(--veil),.14) 78%);}
  .card__in{position:relative;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:52px 60px}
  .card__brand{display:flex;align-items:center;gap:14px}
  .card__brand img.m{height:34px;width:auto}
  .card__brand img.w{height:17px;width:auto}
  .card__eyebrow{font-family:var(--f-mono);font-size:15px;letter-spacing:.30em;text-transform:uppercase;
    color:var(--fg);display:flex;align-items:center;gap:16px;margin-bottom:14px}
  .card__eyebrow::before{content:"";width:46px;height:1px;background:var(--cyan)}
  .card__en{font-family:var(--f-display);font-weight:500;font-size:74px;line-height:.94;
    letter-spacing:-.015em;text-transform:uppercase;color:var(--fg);margin:0}
  .card__jp{font-family:var(--f-jp);font-weight:300;font-size:25px;line-height:1.6;letter-spacing:.05em;
    color:var(--fg);margin:22px 0 0}
  .card__foot{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;
    font-family:var(--f-mono);font-size:13px;letter-spacing:.13em;color:var(--fg-mute)}
  .card__foot b{font-weight:400;color:var(--fg)}
</style></head><body>
<div class="card">
  <div class="card__plate"><img src="${BASE}/assets/img/${c.img}${c.img.includes('posters') ? '-1280' : ''}.jpg" alt=""></div>
  <div class="card__veil"></div>
  <div class="card__in">
    <div class="card__brand">
      <img class="m" src="${BASE}/assets/img/logo-mark${THEME === 'dark' ? '-dark' : ''}.webp" alt="">
      <img class="w" src="${BASE}/assets/img/logo-word${THEME === 'dark' ? '-dark' : ''}.webp" alt="">
    </div>
    <div>
      <p class="card__eyebrow">${c.eyebrow}</p>
      <h1 class="card__en">${c.en}</h1>
      <p class="card__jp">${c.jp}</p>
    </div>
    <div class="card__foot">
      <span><b>${COMPANY.legalName || 'KACHINOVA'}</b>　東京都渋谷区桜丘町29-24</span>
      <span>${COMPANY.license ? '宅建業免許 ' + COMPANY.license : 'AI × REAL ESTATE × SMART LIVING'}</span>
    </div>
  </div>
</div></body></html>`;

await mkdir(OUT, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: CHROME, headless: 'new',
  args: ['--hide-scrollbars', '--force-prefers-reduced-motion'],
  defaultViewport: { width: 1200, height: 630, deviceScaleFactor: 1 },
});
const page = await browser.newPage();

for (const [slug, c] of Object.entries(CARDS)) {
  const tmp = path.join(OUT, `_${slug}.html`);
  await writeFile(tmp, page_(c), 'utf8');
  await page.goto('file://' + tmp.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 260));
  await page.screenshot({ path: path.join(OUT, `${slug}.jpg`), type: 'jpeg', quality: 86 });
  console.log(`  og/${slug}.jpg`);
}
await browser.close();

// clean the scratch templates
const { readdir, unlink } = await import('node:fs/promises');
for (const f of await readdir(OUT)) if (f.startsWith('_')) await unlink(path.join(OUT, f));
console.log(`\n  ${Object.keys(CARDS).length} cards, theme=${THEME}`);
