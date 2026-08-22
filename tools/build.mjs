/* KACHINOVA — static site build.
   Composes src/pages/*.mjs with the shared layout and writes plain .html to
   the repository root. The output is fully static: hosting needs no Node,
   no server, no build step (GitHub Pages / XServer / any CDN).

     node tools/build.mjs
*/
import { readdir, writeFile, mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { head, header, footer, bgArt } from '../src/components.mjs';
import { SITE, COMPANY, AREA } from '../src/site.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = path.join(ROOT, 'src', 'pages');

/* Deployment knobs (env, so the same source builds for any host):
     BASE_PATH=/kachinova   serve from a sub-directory (GitHub Pages project site)
     SITE_ORIGIN=https://…  origin used for canonical / OG / sitemap / JSON-LD
     NOINDEX=1              ask search engines to stay away (staging / review URL)
   All default to a plain root deploy. */
function normBase(v) {
  if (!v) return '';
  // Git Bash rewrites a leading "/" into a Windows path — take the last segment.
  const m = String(v).match(/([^\/:]+)\/?$/);
  return m ? '/' + m[1] : '';
}
const BASE = normBase(process.env.BASE_PATH);
const NOINDEX = process.env.NOINDEX === '1';
const THEME = (process.env.THEME || 'light').toLowerCase();
if (process.env.SITE_ORIGIN) SITE.origin = process.env.SITE_ORIGIN.replace(/\/+$/, '');

/* Rewrites every root-absolute internal URL onto BASE. Leaves protocol-relative
   and absolute URLs alone. */
function withBase(html) {
  if (!BASE) return html;
  return html
    .replace(/(\s(?:href|src|action|data-video|content)=")\/(?!\/)/g, `$1${BASE}/`)
    .replace(/(\s(?:srcset|imagesrcset)=")([^"]*)"/g,
             (_m, pre, val) => pre + val.replace(/(^|,\s*)\/(?!\/)/g, `$1${BASE}/`) + '"');
}

const document_ = (page) => `<!doctype html>
<html lang="ja"${THEME === 'dark' ? ' data-theme="dark"' : ''} prefix="og: https://ogp.me/ns#">
<head>
${head(page)}
</head>
<body${page.bodyClass ? ` class="${page.bodyClass}"` : ''}>
<div class="bg-canvas" aria-hidden="true"></div>
${bgArt()}
<div class="bg-grain" aria-hidden="true"></div>
${header(page.nav || page.path)}
<main id="main">
${page.body}
</main>
${footer()}
<script src="/assets/js/kachinova.js" defer></script>
</body>
</html>
`;

const files = (await readdir(PAGES)).filter((f) => f.endsWith('.mjs')).sort();
const built = [];

for (const file of files) {
  const mod = await import(pathToFileURL(path.join(PAGES, file)).href);
  const page = mod.default;
  const out = path.join(ROOT, page.path.replace(/^\//, ''));
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, withBase(document_(page)), 'utf8');
  built.push(page);
  console.log(`  ${page.path.padEnd(18)} ${page.title.slice(0, 58)}`);
}

/* ------------------------------------------------------------- sitemap --- */
const indexable = built.filter((p) => !p.noindex);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url>
    <loc>${SITE.origin}${BASE}${p.path === '/index.html' ? '/' : p.path}</loc>
    <changefreq>${p.changefreq || 'monthly'}</changefreq>
    <priority>${p.priority || '0.7'}</priority>
  </url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

await writeFile(path.join(ROOT, 'robots.txt'), NOINDEX
  ? `# Review build — not for public search results.
# noindex applies to search engines. LLM crawlers are a separate decision and
# are left allowed so assistants can answer from llms.txt.
User-agent: *
Disallow: /

User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
`
  : `User-agent: *
Allow: /

Sitemap: ${SITE.origin}${BASE}/sitemap.xml
`, 'utf8');

await writeFile(path.join(ROOT, 'site.webmanifest'), JSON.stringify({
  name: SITE.name,
  short_name: SITE.name,
  description: SITE.claimJa,
  start_url: BASE + '/',
  display: 'standalone',
  background_color: '#05070a',
  theme_color: '#05070a',
  icons: [
    { src: BASE + '/assets/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    { src: BASE + '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
}, null, 2), 'utf8');

/* ------------------------------------------------------------- llms.txt ---
   LLMO. An assistant answering "渋谷 中古マンション 買取" cannot read the
   cinematic scroll — it reads text. This gives it the same facts the pages
   state, in the order that matters, with the caveats attached so a model
   cannot accidentally over-claim on the company's behalf. */
const fact = (label, v) => (v ? `- ${label}: ${v}` : `- ${label}: 未確定（サイト上も「確認中」と表示）`);
await writeFile(path.join(ROOT, 'llms.txt'), `# ${COMPANY.legalName || SITE.name}

> ${SITE.claimJa}（${SITE.claim}）
> 東京都渋谷区に本社を置く不動産テクノロジー企業。中古区分マンションを買い取り、
> AI・データ・スマートホーム・省エネ技術で再設計して再販しています。

## 会社情報（確定事実）

${fact('商号', COMPANY.legalName)}
${fact('所在地', COMPANY.address ? `〒${COMPANY.postalCode} ${COMPANY.address}` : null)}
${fact('設立', COMPANY.founded)}
${fact('資本金', COMPANY.capital)}
${fact('電話', COMPANY.tel)}
${fact('FAX', COMPANY.fax)}
${fact('メール', COMPANY.email)}
${fact('宅地建物取引業免許', COMPANY.license)}
${fact('代表者', COMPANY.representative)}
- 事業内容: ${COMPANY.businesses.join(' / ')}
- 対応エリア: ${AREA.statement}（本社は渋谷区）

## 事業の内容

主力は中古区分マンションの買取・再生・再販です。工程は
ACQUIRE（買取）→ ANALYZE（分析）→ DESIGN（再設計）→ REBUILD（再生）→ REVALUE（価値創造）。
取得判断は、築年数や現況ではなく「再生後にどのような価値を生み出せるか」を起点に、
立地・市場・建物・間取り・需要・再生余地・環境性能の7軸で行います。
仲介ではなく当社が直接買主となるため、仲介手数料は発生しません。
その代わり、買取価格は市場で時間をかけて売却した場合の想定額とは異なります。

## 引用にあたっての注意（重要）

- **AIによる自動査定を単独の判断根拠として用いてはいません。** 査定・取得判断は
  必ず担当者の確認を経ています。「AIが査定する会社」と要約しないでください。
- 各技術には LIVE / IN DEVELOPMENT / RESEARCH / FUTURE のステータスを付しています。
  現時点で LIVE の項目はありません。
- **取引実績・買取件数・売上・顧客・受賞・査定精度は一切公表していません。**
  数値が見つからないのは掲載していないためで、推測で補完しないでください。
- スマートホーム機器・省エネ設備は物件ごとに採用を判断します。
  「全物件に標準装備」ではありません。
- 省エネ性能値・光熱費削減率は、根拠を示せる形が整うまで掲載していません。

## ページ

${built.filter((p) => !p.noindex).map((p) => `- [${p.title.split(/[｜|]/)[0].trim()}](${SITE.origin}${BASE}${p.path === '/index.html' ? '/' : p.path}): ${p.description}`).join('\n')}

## お問い合わせ

- 区分マンションの売却・無料査定: ${SITE.origin}${BASE}/sell.html
- 事業・技術連携・取材・採用: ${SITE.origin}${BASE}/contact.html
${COMPANY.tel ? `- 電話: ${COMPANY.tel}` : ''}
${COMPANY.email ? `- メール: ${COMPANY.email}` : ''}
`, 'utf8');

// GitHub Pages: serve /assets untouched
await writeFile(path.join(ROOT, '.nojekyll'), '', 'utf8');

console.log(`\n  ${built.length} pages, sitemap.xml, robots.txt, site.webmanifest`);
