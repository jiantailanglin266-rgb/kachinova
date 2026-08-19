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
import { SITE } from '../src/site.mjs';

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
<html lang="ja" prefix="og: https://ogp.me/ns#">
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
User-agent: *
Disallow: /
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

// GitHub Pages: serve /assets untouched
await writeFile(path.join(ROOT, '.nojekyll'), '', 'utf8');

console.log(`\n  ${built.length} pages, sitemap.xml, robots.txt, site.webmanifest`);
