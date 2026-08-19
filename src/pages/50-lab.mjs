import { SITE } from '../site.mjs';
import { pageHero, breadcrumb, breadcrumbLd, ctaSplit, marquee } from '../components.mjs';

const trail = [{ name: 'HOME', href: '/' }, { name: 'LAB' }];

/* status: live | dev | research | future — shown verbatim on the page.
   Nothing here claims capability the company does not have. */
const THEMES = [
  {
    en: 'AI PROPERTY ANALYSIS', ja: '物件分析',
    body: '建物・管理状態・間取り・周辺条件を構造化データとして蓄積し、取得判断の材料を再現可能にする取り組み。まずは自社案件の記録形式を統一するところから進めています。',
    status: 'dev',
  },
  {
    en: 'REAL ESTATE DATA', ja: '不動産データ基盤',
    body: '公開情報と自社の取得・再生記録を、同じ粒度で扱えるようにするためのデータ設計。分析の前提となる土台にあたる領域です。',
    status: 'dev',
  },
  {
    en: 'SMART HOME', ja: 'スマートホーム',
    body: '区分マンションの管理規約と構造の制約下で、どこまで実装できるかの検証。工事を伴わない構成と、再生時に組み込む構成の両方を試しています。',
    status: 'research',
  },
  {
    en: 'ENERGY', ja: 'エネルギー',
    body: '断熱・設備更新による性能改善を、体感と数値の両面で評価する方法の検討。根拠を示せない削減率は公表しない方針です。',
    status: 'research',
  },
  {
    en: 'AUTOMATION', ja: '業務自動化',
    body: '査定・資料作成・進行管理など、社内業務の定型部分を自動化し、判断に使う時間を増やすための取り組み。',
    status: 'research',
  },
  {
    en: 'DIGITAL TWIN', ja: 'デジタルツイン',
    body: '住戸を三次元データとして持ち、再設計案の比較や引き渡し後の記録に用いる構想。現時点では調査段階です。',
    status: 'future',
  },
];

const CHIP = {
  live: '<span class="chip chip--live">LIVE ／ 稼働中</span>',
  dev: '<span class="chip chip--dev">IN DEVELOPMENT ／ 開発中</span>',
  research: '<span class="chip chip--research">RESEARCH ／ 研究中</span>',
  future: '<span class="chip chip--future">FUTURE ／ 構想</span>',
};

const body = `
${pageHero({
  eyebrow: 'KACHINOVA LAB ／ 研究開発',
  title: 'What we are<br>working on,<br>and how far.',
  jp: '取り組んでいることと、その現在地。',
  lede: 'KACHINOVA の技術研究は、完成した機能だけを見せる場所ではありません。何に取り組んでいて、どこまで進んでいるのかを、ステータス付きで開示します。',
  still: 'lab-globe',
})}

<div class="shell">${breadcrumb(trail).replace('<nav class="breadcrumb shell"', '<nav class="breadcrumb"')}</div>

<section class="band--tight" aria-labelledby="status-t">
  <div class="shell shell--narrow">
    <div class="reveal">
      <p class="eyebrow eyebrow--gold">STATUS DEFINITION</p>
      <h2 class="display display--xl u-mt-s" id="status-t">Four honest labels.</h2>
      <dl class="data u-mt">
        <div><dt>LIVE</dt><dd>実際の業務で継続的に使用しているもの。</dd></div>
        <div><dt>IN DEVELOPMENT</dt><dd>実装を進めており、社内で試験運用している段階のもの。</dd></div>
        <div><dt>RESEARCH</dt><dd>有効性を検証している段階。導入は決まっていません。</dd></div>
        <div><dt>FUTURE</dt><dd>構想として持っているが、着手していないもの。</dd></div>
      </dl>
      <p class="form__note u-mt">現時点で LIVE に該当する項目はありません。実運用に入り次第、このページで更新します。</p>
    </div>
  </div>
</section>

${marquee(['RESEARCH', 'IN DEVELOPMENT', 'PROPTECH', 'DIGITAL TWIN', 'ENERGY', 'SMART HOME', 'REAL ESTATE DATA'])}

<section class="band" aria-labelledby="themes-t">
  <div class="shell">
    <div class="reveal u-mb">
      <p class="eyebrow">RESEARCH THEMES</p>
      <h2 class="display display--xxl u-mt-s" id="themes-t">Six themes.</h2>
    </div>
    <div class="tiles tiles--2 stagger">
      ${THEMES.map((t, i) => `<div class="tile" style="--i:${i}">
        <span class="num">${String(i + 1).padStart(2, '0')}</span>
        <h3>${t.en}</h3>
        <p class="tile__jp">${t.ja}</p>
        <p>${t.body}</p>
        ${CHIP[t.status]}
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="band--tight section--light" aria-labelledby="collab-t">
  <div class="shell shell--narrow">
    <div class="reveal">
      <p class="eyebrow eyebrow--gold">COLLABORATION</p>
      <h2 class="display display--xl u-mt-s" id="collab-t">Open to<br>collaborators.</h2>
      <p class="lede u-mt-s">不動産データ、スマートホーム機器、エネルギー技術、機械学習の分野で、実証実験や共同開発にご関心のある企業・研究者の方からのご連絡をお待ちしています。</p>
      <div class="btn-row u-mt"><a class="btn" href="/contact.html">技術連携のご相談<i></i></a></div>
    </div>
  </div>
</section>

${ctaSplit()}`;

export default {
  path: '/lab.html',
  nav: '/lab.html',
  priority: '0.7',
  title: 'KACHINOVA LAB｜PropTech 研究開発 - KACHINOVA',
  description:
    'KACHINOVA LAB は、AI物件分析・不動産データ基盤・スマートホーム・エネルギー・業務自動化・デジタルツインの研究開発拠点です。各テーマの開発ステータスを明示して公開しています。',
  jsonld: [breadcrumbLd([{ name: 'HOME', href: '/' }, { name: 'LAB', href: '/lab.html' }])],
  body,
};
