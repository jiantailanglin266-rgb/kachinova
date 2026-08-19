import { SITE } from '../site.mjs';
import { pageHero, breadcrumb, breadcrumbLd, ctaSplit } from '../components.mjs';

const trail = [{ name: 'HOME', href: '/' }, { name: 'JOURNAL' }];

/* Add entries here as they are written. Each entry:
   { slug, date: 'YYYY-MM-DD', category, title, excerpt, href }
   Left empty deliberately — no placeholder articles. */
const ENTRIES = [];

const TOPICS = [
  ['REAL ESTATE', '中古住宅', '中古区分マンションの選び方、管理と修繕、価格が決まる仕組み。'],
  ['PROPTECH', '不動産テック', '不動産の業務とデータがどう変わりつつあるのか。'],
  ['AI / DATA', 'AI・データ', '不動産の判断にデータをどう使うか、どこまで使えるか。'],
  ['SMART HOME', 'スマートホーム', '分譲マンションで現実的に導入できる構成と、その制約。'],
  ['ENERGY', '省エネ', '断熱・設備更新が、快適性と光熱費に与える影響。'],
  ['ARCHITECTURE', '設計', '既存住宅を設計し直すときの考え方と手順。'],
];

const empty = `<div class="empty reveal">
  <p class="display display--xl">First entry<br>in preparation.</p>
  <p>KACHINOVA JOURNAL は準備中です。憶測や伝聞ではなく、自社で確認した内容と出典のある情報のみを掲載します。<br>
  <span class="chip chip--todo">準備中 ／ DATA_REQUIRED</span></p>
</div>`;

const list = ENTRIES.length
  ? `<div class="tiles tiles--2 stagger">${ENTRIES.map((e, i) => `<a class="tile" href="${e.href}" style="--i:${i}">
      <span class="num">${e.date} ／ ${e.category}</span>
      <h3>${e.title}</h3>
      <p>${e.excerpt}</p>
    </a>`).join('')}</div>`
  : empty;

const body = `
${pageHero({
  eyebrow: 'JOURNAL ／ ジャーナル',
  title: 'Kachinova<br>Journal.',
  jp: 'お知らせではなく、読みものとして。',
  lede: '中古住宅、PropTech、AI、スマートホーム、省エネ、設計。KACHINOVA が事業のなかで確かめたことを、記録として公開していきます。',
  shot: 'eco',
})}

<div class="shell">${breadcrumb(trail).replace('<nav class="breadcrumb shell"', '<nav class="breadcrumb"')}</div>

<section class="band" aria-labelledby="entries-t">
  <div class="shell">
    <div class="reveal u-mb">
      <p class="eyebrow">ENTRIES</p>
      <h2 class="display display--xl u-mt-s" id="entries-t">Latest.</h2>
    </div>
    ${list}
  </div>
</section>

<section class="band--tight" aria-labelledby="topics-t">
  <div class="shell">
    <div class="reveal u-mb">
      <p class="eyebrow eyebrow--gold">TOPICS</p>
      <h2 class="display display--xl u-mt-s" id="topics-t">What we write about.</h2>
    </div>
    <div class="tiles tiles--3 stagger">
      ${TOPICS.map(([en, ja, note], i) => `<div class="tile" style="--i:${i}">
        <h3>${en}</h3>
        <p class="tile__jp">${ja}</p>
        <p>${note}</p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

${ctaSplit()}`;

export default {
  path: '/journal.html',
  nav: '/journal.html',
  priority: '0.6',
  changefreq: 'weekly',
  title: 'JOURNAL｜中古マンション・PropTech・省エネの読みもの - KACHINOVA',
  description:
    'KACHINOVA JOURNAL。中古区分マンション、不動産テック、AI、スマートホーム、省エネ、設計について、事業のなかで確かめたことを記録として公開します。',
  jsonld: [breadcrumbLd([{ name: 'HOME', href: '/' }, { name: 'JOURNAL', href: '/journal.html' }]), {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'KACHINOVA JOURNAL',
    url: SITE.origin + '/journal.html',
    inLanguage: 'ja',
  }],
  body,
};
