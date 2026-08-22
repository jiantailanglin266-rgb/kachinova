import { SITE } from '../site.mjs';
import { pageHero, breadcrumb, breadcrumbLd, ctaSplit, abs } from '../components.mjs';

const trail = [{ name: 'HOME', href: '/' }, { name: 'PROJECTS' }];

/* No projects are published yet. This array is the only place to add them —
   the page renders an honest empty state while it is empty. NEVER seed it with
   illustrative or sample properties: they would read as real transactions. */
const PROJECTS = [];

const CHAPTERS = [
  ['BEFORE', '取得時の状態', '間取り・仕上げ・設備の状態を、加工しない写真で記録します。'],
  ['CONCEPT', '再生の考え方', '誰のための住まいとして設計し直すのかを明示します。'],
  ['DESIGN', '設計', '変更した間取り・光・動線・素材と、その理由。'],
  ['TECHNOLOGY', '導入技術', 'その住戸で実際に採用したスマート機器と仕様。'],
  ['ENERGY', '環境性能', '実施した断熱・設備更新と、根拠を示せる範囲での性能。'],
  ['AFTER', '再生後', '完成後の状態を、同じ画角で記録します。'],
  ['PROPERTY DATA', '物件データ', '所在地・専有面積・間取り・築年・管理状況などの基本情報。'],
];

const empty = `<div class="empty reveal">
  <p class="display display--xl">No projects<br>published yet.</p>
  <p>実績の公開は準備中です。事実確認と関係者の同意が取れたプロジェクトのみを掲載します。<br>
  <span class="chip chip--todo">準備中 ／ DATA_REQUIRED</span></p>
  <div class="btn-row u-mt" style="justify-content:center"><a class="btn" href="/contact.html">公開時期についてお問い合わせ<i></i></a></div>
</div>`;

const list = PROJECTS.length
  ? `<div class="tiles tiles--3 stagger">${PROJECTS.map((p, i) => `<a class="tile" href="${p.href}" style="--i:${i}">
      <span class="num">PROJECT ${p.no}</span>
      <h3>${p.area}</h3>
      <p class="tile__jp">${p.size}／${p.layout}</p>
      <p>REVALUE PROJECT</p>
    </a>`).join('')}</div>`
  : empty;

const body = `
${pageHero({
  eyebrow: 'PROJECTS ／ 実績',
  title: 'Revalue<br>Projects.',
  jp: '「販売物件」ではなく、再価値化のプロジェクトとして。',
  lede: '私たちが手がけた住戸を、価格と面積の一覧ではなく、何をどう考えて設計し直したかの記録として公開していきます。',
  shot: 'revalue',
})}

<div class="shell">${breadcrumb(trail).replace('<nav class="breadcrumb shell"', '<nav class="breadcrumb"')}</div>

<section class="band" aria-labelledby="list-t">
  <div class="shell">
    <div class="reveal u-mb">
      <p class="eyebrow">INDEX</p>
      <h2 class="display display--xl u-mt-s" id="list-t">All projects.</h2>
    </div>
    ${list}
  </div>
</section>

<section class="band--tight" aria-labelledby="fmt-t">
  <div class="shell">
    <div class="reveal">
      <p class="eyebrow eyebrow--gold">PROJECT FORMAT</p>
      <h2 class="display display--xl u-mt-s" id="fmt-t">How each project<br>will be documented.</h2>
      <p class="lede u-mt-s">1件ごとに、以下の構成で記録・公開します。写真の加工、面積や築年の丸め、導入していない設備の記載は行いません。</p>
    </div>
    <ol class="flow stagger u-mt-l">
      ${CHAPTERS.map(([en, ja, note], i) => `<li class="flow__step" style="--i:${i}">
        <span class="flow__n">${String(i + 1).padStart(2, '0')}</span>
        <span class="flow__en">${en}<span class="flow__jp">${ja}</span></span>
        <span class="flow__note">${note}</span>
      </li>`).join('\n      ')}
    </ol>
    <p class="form__note u-mt">掲載にあたっては、取引の相手方および管理組合等の関係者への配慮を前提とします。所在地の表記粒度は物件ごとに判断します。</p>
  </div>
</section>

${ctaSplit()}`;

export default {
  path: '/projects.html',
  nav: '/projects.html',
  priority: '0.8',
  title: 'PROJECTS｜REVALUE PROJECT 一覧 - KACHINOVA',
  description:
    'KACHINOVA が再設計した住戸の記録。BEFORE・CONCEPT・DESIGN・TECHNOLOGY・ENERGY・AFTER の構成で、何をどう考えて設計し直したかを公開していきます。',
  jsonld: [breadcrumbLd([{ name: 'HOME', href: '/' }, { name: 'PROJECTS', href: '/projects.html' }]), {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'REVALUE PROJECTS',
    url: abs('/projects.html'),
    inLanguage: 'ja',
  }],
  body,
};
