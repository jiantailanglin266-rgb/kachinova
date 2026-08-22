/* KACHINOVA — reusable markup components.
   Plain template functions: the build emits static HTML, the browser gets no
   framework. Every component degrades to readable markup without CSS or JS. */

import { SITE, NAV, NAV_MORE, FILMS, COMPANY, POSTAL } from './site.mjs';

/* The logo ships as two artworks: the original (dark ink + gold, for paper)
   and a knockout (off-white + gold, for ink). Pick by theme. */
export const THEME = (process.env.THEME || 'light').toLowerCase();
const LOGO = THEME === 'dark' ? '-dark' : '';

/* Absolute URL for structured data / canonical / OG.
   BASE_PATH is folded in here so JSON-LD can never drift from the real URL —
   withBase() in the build only rewrites HTML attributes, not script contents. */
export const BASE = (() => {
  const m = String(process.env.BASE_PATH || '').match(/([^\/:]+)\/?$/);
  return m ? '/' + m[1] : '';
})();
export const abs = (path = '/') => SITE.origin + BASE + (path === '/' ? '/' : path);

export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ------------------------------------------------------------------ head -- */
export function head(page) {
  const base = BASE;
  const noindex = process.env.NOINDEX === '1' || page.noindex;
  const title = page.title;
  const url = abs(page.path === '/index.html' ? '/' : page.path);
  const ogImg = abs('/assets/img/og-kachinova.jpg');
  const ld = page.jsonld ? page.jsonld : [];

  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="${THEME === 'dark' ? '#05070a' : '#f4f3f0'}">
<meta name="format-detection" content="telephone=no">
<meta name="robots" content="${noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'}">

<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:locale" content="${SITE.locale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${ogImg}">

<link rel="icon" href="/assets/img/favicon-64.png" sizes="64x64" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400&family=IBM+Plex+Mono:wght@300;400&family=Noto+Sans+JP:wght@200;300;400;500&family=Noto+Serif+JP:wght@200;300;400&display=swap">
<link rel="stylesheet" href="/assets/css/kachinova.css">
${page.preloadPoster ? `<link rel="preload" as="image" href="${page.preloadPoster.webp}" type="image/webp" imagesrcset="${page.preloadPoster.srcset}" imagesizes="100vw" fetchpriority="high">` : ''}
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}`;
}

/* ---------------------------------------------------------------- header -- */
export function header(current) {
  const link = (i) => `<a href="${i.href}"${i.href === current ? ' aria-current="page"' : ''}>${i.en}</a>`;
  const drawerLink = (i) =>
    `<a href="${i.href}"${i.href === current ? ' aria-current="page"' : ''}>${i.en}<small>${i.ja}</small></a>`;

  return `<a class="skip-link" href="#main">本文へスキップ</a>
<header class="site-header">
  <div class="header-in">
    <a class="brand" href="/" aria-label="KACHINOVA ホームへ">
      <img class="brand__mark" src="/assets/img/logo-mark${LOGO}.webp" alt="" width="415" height="200" fetchpriority="high">
      <img class="brand__word" src="/assets/img/logo-word${LOGO}.webp" alt="KACHINOVA" width="1211" height="96" fetchpriority="high">
      <span class="brand__tag">${SITE.tagline}</span>
    </a>
    <nav class="nav" aria-label="メインナビゲーション">
      ${NAV.map(link).join('\n      ')}
    </nav>
    <a class="nav-cta" href="/sell.html">無料査定<span aria-hidden="true"> ／ </span>SELL</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="drawer" aria-label="メニューを開く">
      <span></span><span></span>
    </button>
  </div>
</header>
<div class="drawer" id="drawer" aria-hidden="true">
  <nav aria-label="モバイルナビゲーション">
    ${[...NAV, ...NAV_MORE].map(drawerLink).join('\n    ')}
  </nav>
  <div class="drawer__foot">
    <a class="btn" href="/sell.html">無料査定を相談する<i></i></a>
    <a class="btn" href="/contact.html">CONTACT<i></i></a>
  </div>
</div>`;
}

/* ---------------------------------------------------------------- footer -- */
export function footer() {
  const col = (title, items) => `<div class="footer-col">
      <h4>${title}</h4>
      <ul>${items.map((i) => `<li><a href="${i.href}">${i.en}<span class="sr-only"> ${i.ja}</span></a></li>`).join('')}</ul>
    </div>`;

  return `<footer class="site-footer">
  <div class="shell">
    <div class="footer-grid">
      <div class="footer-col footer__brand">
        <span class="brand">
          <img class="brand__mark" src="/assets/img/logo-mark${LOGO}.webp" alt="" width="415" height="200" loading="lazy">
          <img class="brand__word" src="/assets/img/logo-word${LOGO}.webp" alt="KACHINOVA" width="1211" height="96" loading="lazy">
        </span>
        <p>${SITE.claimJa}<br>${SITE.sub}</p>
        ${COMPANY.address ? `<address class="footer__addr">
          ${COMPANY.legalName}<br>
          ${fullAddress()}<br>
          TEL ${telLink()}　／　${mailLink()}
          ${COMPANY.license ? `<br><span class="footer__lic">宅地建物取引業免許　${COMPANY.license}</span>` : ''}
        </address>` : ''}
      </div>
      ${col('COMPANY', NAV.slice(0, 3))}
      ${col('EXPLORE', [...NAV.slice(3), ...NAV_MORE.slice(0, 2)])}
      ${col('CONTACT', [
        { href: '/sell.html', en: 'SELL YOUR PROPERTY', ja: '売却・無料査定' },
        { href: '/contact.html', en: 'GENERAL ENQUIRY', ja: '一般のお問い合わせ' },
        { href: '/privacy.html', en: 'PRIVACY POLICY', ja: 'プライバシーポリシー' },
      ])}
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} ${SITE.name}. ALL RIGHTS RESERVED.</span>
      <span>${SITE.tagline} ／ TOKYO, JAPAN</span>
    </div>
  </div>
</footer>`;
}

/* ------------------------------------------------------------------ film -- */
/* A full-bleed cinematic section backed by one of the six films.
   The poster <img> is always rendered; the <video> only ever fades in on top
   once it has actually decoded a frame. */
export function film({ shot, id, eyebrow, title, jp, body, motes, cta, side = 'left',
                       priority = false, tall = false, scrim = '' }) {
  const f = FILMS[shot];
  const base = `/assets/img/video-posters/kachinova-${shot}`;
  const cls = ['film', tall ? 'film--tall' : '', side === 'right' ? 'film--right' : '',
               side === 'center' ? 'film--center' : ''].filter(Boolean).join(' ');

  return `<section class="${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${id || shot}-t">
  <div class="film__media">
    <picture>
      <source type="image/webp" srcset="${base}-720.webp 720w, ${base}-1280.webp 1280w, ${base}.webp 1920w" sizes="100vw">
      <img src="${base}-1280.jpg" alt="${esc(f.alt)}" width="1920" height="1080"
           ${priority ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}>
    </picture>
    <video muted playsinline loop preload="none" aria-hidden="true" tabindex="-1"
           data-video="/assets/videos/kachinova-${shot}"${priority ? ' data-priority="high"' : ''}></video>
  </div>
  <div class="film__scrim${scrim === 'even' ? ' film__scrim--even' : ''}"></div>
  <div class="shell film__inner">
    <div class="film__body reveal">
      <p class="film__index">FILM ${f.n} ／ ${f.label}</p>
      ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
      <h2 class="display display--xxl u-mt-s" id="${id || shot}-t">${title}</h2>
      ${jp ? `<p class="jp-display jp-display--sm u-mt-s">${jp}</p>` : ''}
      ${body ? `<div class="prose u-mt-s"><p>${body}</p></div>` : ''}
      ${motes ? `<div class="motes">${motes.map((m) => `<span class="mote">${m}</span>`).join('')}</div>` : ''}
      ${cta ? `<div class="btn-row u-mt">${cta}</div>` : ''}
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------- statement -- */
export function statement({ en, jp, note, align = 'left', tall = false, id }) {
  const cls = ['statement', tall ? 'statement--tall' : '',
               align === 'center' ? 'statement--center' : '',
               align === 'end' ? 'statement--end' : ''].filter(Boolean).join(' ');
  return `<section class="${cls}"${id ? ` id="${id}"` : ''}>
  <div class="shell">
    <div class="statement__body reveal">
      ${en ? `<p class="eyebrow u-mb">${en}</p>` : ''}
      <p class="jp-display">${jp}</p>
      ${note ? `<p class="lede u-mt-s">${note}</p>` : ''}
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------- the REVALUE LINE (SVG) -- */
/* KACHINOVA's one signature motion: an architectural plan that redraws itself
   over the existing structure. Reused — with different nodes — for RE:DESIGN
   and SMART LIVING so the site has a single visual verb. */
export function plan({ nodes = [], caption = '' }) {
  const node = (n, i) => `
    <g class="plan-node" style="--i:${i}">
      <circle cx="${n.x}" cy="${n.y}" r="3.5"></circle>
      <circle cx="${n.x}" cy="${n.y}" r="10" fill="none" stroke="currentColor" stroke-width=".6" opacity=".45"></circle>
    </g>
    <text class="plan-label" x="${n.x + 16}" y="${n.y + 4}" style="--i:${i}">${esc(n.label)}</text>`;

  return `<figure class="figure">
  <svg class="plan" viewBox="0 0 720 460" role="img" aria-label="既存の間取りに新しい設計線を重ねた概念図" color="#4fe3ff">
    <g class="plan-existing">
      <rect x="40" y="40" width="640" height="360"></rect>
      <path d="M40 190 H300"></path>
      <path d="M300 40 V400"></path>
      <path d="M300 270 H680"></path>
      <path d="M520 270 V400"></path>
      <path d="M40 96 H120"></path>
    </g>
    <path class="plan-fill" d="M40 296 H262 V128 H452 V400 H40 Z"></path>
    <path class="plan-new" d="M40 296 H262 V128 H452 V400"></path>
    <path class="plan-new" d="M452 236 H680"></path>
    ${nodes.map(node).join('')}
    <text class="plan-label" x="40" y="438">ILLUSTRATIVE PLAN ／ 概念図（実在の物件ではありません）</text>
  </svg>
  ${caption ? `<figcaption class="figure__cap">${caption}</figcaption>` : ''}
</figure>`;
}

/* ------------------------------------------------------------------ misc -- */
export function marquee(items) {
  const run = items.map((i) => `<span>${i}</span>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="marquee__track">${run}${run}</div></div>`;
}

export function ctaSplit() {
  return `<section class="band--tight" aria-labelledby="cta-t">
  <div class="shell">
    <h2 class="sr-only" id="cta-t">お問い合わせ</h2>
  </div>
  <div class="cta-split">
    <a href="/sell.html">
      <p class="eyebrow">SELL TO KACHINOVA</p>
      <p class="display display--xl u-mt-s">その住まいの、<br>次の価値まで考える。</p>
      <p class="prose" style="font-size:.92rem">区分マンションの売却・買取をご検討の方へ。無料査定のご相談を承ります。</p>
      <span class="cta-split__go">無料査定を相談する<i></i></span>
    </a>
    <a href="/contact.html">
      <p class="eyebrow eyebrow--gold">CONTACT</p>
      <p class="display display--xl u-mt-s">事業・協業の<br>ご相談。</p>
      <p class="prose" style="font-size:.92rem">仕入・販売・技術連携・採用など、KACHINOVA へのお問い合わせはこちらから。</p>
      <span class="cta-split__go">お問い合わせ<i></i></span>
    </a>
  </div>
</section>`;
}

export function breadcrumb(trail) {
  return `<nav class="breadcrumb shell" aria-label="パンくずリスト">
  <ol>${trail.map((t, i) => `<li>${i === trail.length - 1 ? `<span aria-current="page">${t.name}</span>` : `<a href="${t.href}">${t.name}</a>`}</li>`).join('')}</ol>
</nav>`;
}

export function breadcrumbLd(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem', position: i + 1, name: t.name,
      item: abs(t.href || '/'),
    })),
  };
}

/* Inner-page hero: same cinematic language, shorter. */
export function pageHero({ eyebrow, title, jp, lede, shot, still, trail }) {
  const media = shot
    ? (() => {
        const base = `/assets/img/video-posters/kachinova-${shot}`;
        return `<picture>
        <source type="image/webp" srcset="${base}-720.webp 720w, ${base}-1280.webp 1280w, ${base}.webp 1920w" sizes="100vw">
        <img src="${base}-1280.jpg" alt="${esc(FILMS[shot].alt)}" width="1920" height="1080" fetchpriority="high">
      </picture>`;
      })()
    : `<picture>
        <source type="image/webp" srcset="/assets/img/${still}.webp">
        <img src="/assets/img/${still}.jpg" alt="" width="1600" height="900" fetchpriority="high">
      </picture>`;

  return `<section class="hero hero--inner">
  <div class="hero__media">${media}</div>
  <div class="hero__scrim"></div>
  <div class="shell hero__inner">
    ${trail ? breadcrumb(trail).replace('<nav class="breadcrumb shell"', '<nav class="breadcrumb"').replace('padding-top', '') : ''}
    <div class="reveal u-mt">
      <p class="eyebrow">${eyebrow}</p>
      <h1 class="display display--xxl u-mt-s">${title}</h1>
      ${jp ? `<p class="jp-display jp-display--sm u-mt-s hero__jp">${jp}</p>` : ''}
      ${lede ? `<p class="lede u-mt-s">${lede}</p>` : ''}
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------ DATA_REQUIRED placeholder */
/* Renders a confirmed value, or a visible, honest placeholder. Nothing about
   the company, its licence or its record is ever invented. */
/* Clickable contact primitives. Rendered only when the value is confirmed —
   an empty tel: link is worse than no link. */
export const telLink = (v = COMPANY.tel) =>
  v ? `<a href="tel:${v.replace(/[^0-9+]/g, '')}">${esc(v)}</a>` : '';
export const mailLink = (v = COMPANY.email) =>
  v ? `<a href="mailto:${esc(v)}">${esc(v)}</a>` : '';
export const fullAddress = () =>
  COMPANY.address ? `〒${esc(COMPANY.postalCode)}<br>${esc(COMPANY.address)}` : '';

/* Emitted into JSON-LD only when every part is confirmed. */
export function orgLd(extra = {}) {
  const o = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: COMPANY.legalName || SITE.name,
    alternateName: SITE.name,
    url: abs('/'),
    logo: abs('/assets/img/logo-lockup.png'),
    image: abs('/assets/img/og-kachinova.jpg'),
    slogan: SITE.claim,
    areaServed: { '@type': 'Country', name: 'Japan' },
    inLanguage: 'ja',
    ...extra,
  };
  if (COMPANY.address) o.address = POSTAL;
  if (COMPANY.tel) o.telephone = COMPANY.tel;
  if (COMPANY.fax) o.faxNumber = COMPANY.fax;
  if (COMPANY.email) o.email = COMPANY.email;
  if (COMPANY.founded) o.foundingDate = COMPANY.founded.replace('年', '');
  return o;
}

export function fact(value, note) {
  if (value) return esc(value) + (note ? `<small>${note}</small>` : '');
  return `<span class="chip chip--todo">確認中 ／ DATA_REQUIRED</span>` +
         `<small>${note || '正式情報の確定後に掲載します。'}</small>`;
}

export function formNote() {
  return `<p class="form__note">ご入力いただいた個人情報は、お問い合わせへの回答および査定のご案内にのみ利用し、
ご本人の同意なく第三者へ提供いたしません。詳細は<a href="/privacy.html" style="color:var(--cyan)">プライバシーポリシー</a>をご確認ください。<br>
※ フォーム送信基盤は設定中です。それまでの間、送信ボタンはご利用のメールソフトを起動し、
${COMPANY.email ? `<a href="mailto:${COMPANY.email}">${COMPANY.email}</a> 宛の下書きを作成します` : '下書きを作成します'}。
お急ぎの場合は ${COMPANY.tel ? `お電話（${telLink()}）` : 'お電話'} でも承ります。</p>`;
}

export function honeypot() {
  return `<div class="sr-only" aria-hidden="true">
    <label>この欄は入力しないでください<input type="text" name="_company_url" tabindex="-1" autocomplete="off"></label>
  </div>`;
}

/* ---------------------------------------------------- background art layer -- */
/* NY modern-art vocabulary, rendered in the site's monochrome:
     FIELD   Reinhardt / Judd  — black-on-black rectangles, ΔL* ≤ 3
     WEAVE   Agnes Martin      — a barely-there hand-drawn grid
     ZIPS    Barnett Newman    — vertical bands of light that breathe
     TRAVEL  Mondrian, "Broadway Boogie Woogie" — light moving along the
             grid; here it doubles as data moving through the city.
   Pure CSS: no canvas, no rAF, no JS. Fully disabled under reduced-motion. */
export function bgArt() {
  // x/y are percentages; d = delay, s = duration. Irregular on purpose —
  // an even rhythm would read as a loading bar, not a painting.
  const V = [
    { x: 13, d: 0,    s: 23 },
    { x: 37, d: 8.5,  s: 27 },
    { x: 64, d: 15,   s: 21, gold: true },
    { x: 88, d: 4,    s: 31 },
  ];
  const H = [
    { y: 28, d: 11, s: 29 },
    { y: 71, d: 2,  s: 25, gold: true },
  ];

  return `<div class="bg-art" aria-hidden="true">
  <div class="bg-art__field"></div>
  <div class="bg-art__weave"></div>
  <div class="bg-art__zips"></div>
  ${V.map((t) => `<i class="bw bw--v${t.gold ? ' bw--gold' : ''}" style="--x:${t.x}%;--d:${t.d}s;--s:${t.s}s"></i>`).join('\n  ')}
  ${H.map((t) => `<i class="bw bw--h${t.gold ? ' bw--gold' : ''}" style="--y:${t.y}%;--d:${t.d}s;--s:${t.s}s"></i>`).join('\n  ')}
</div>`;
}
