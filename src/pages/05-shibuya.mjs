import { SITE, COMPANY, AREA } from '../site.mjs';
import {
  pageHero, breadcrumb, breadcrumbLd, ctaSplit, faqLd, faqBlock,
  telLink, fullAddress, orgLd, abs,
} from '../components.mjs';

const trail = [{ name: 'HOME', href: '/' }, { name: 'SHIBUYA' }];

/* The keyword axis (渋谷 不動産 / 渋谷 買取再販 / 渋谷 AI不動産) only earns a
   ranking if there is a page that genuinely answers it. Everything here is
   either a confirmed fact about the company, publicly-known background about
   the ward, or an explicitly-labelled statement of policy — no invented
   track record, no invented statistics. */

const WHY_SHIBUYA = [
  ['AT THE DESK', '渋谷区に本社を置いている', `本社は${COMPANY.address}。査定のご相談から現地確認まで、社内の人間が動きます。エリアの状況を人づてではなく自分たちで見ています。`],
  ['DENSE STOCK', '区分マンションの層が厚い', '渋谷区は単身・二人世帯向けの区分マンションが多く、築年数も供給時期も幅があります。同じ「渋谷」でも、駅からの距離と管理状態で評価は大きく変わります。'],
  ['RE-DESIGNABLE', '再設計の余地が残っている', '1980〜2000年代に供給された住戸は、当時の家族像を前提にした間取りのままであることが少なくありません。私たちが取得するのは、そこに設計の余地が残っている住まいです。'],
];

const AREAS = [
  ['渋谷区', '本社所在地。桜丘町・道玄坂・恵比寿・代官山・広尾・笹塚・幡ヶ谷など区内全域。'],
  ['隣接区', AREA.secondary.join('／') + ' ほか。'],
];

const FAQ = [
  ['渋谷区のマンションを売りたいのですが、査定は無料ですか。',
   '無料です。株式会社KACHINOVA（宅地建物取引業免許 ' + COMPANY.license + '）が直接買主となる買取のご相談として承ります。査定後にご売却をお断りいただいても費用は一切かかりません。'],
  ['対応エリアはどこまでですか。',
   `${AREA.statement}が対応範囲です。本社は東京都渋谷区桜丘町にあり、渋谷区内は最優先で対応します。`],
  ['「買取」と「仲介」は何が違いますか。',
   '仲介は買主を探して売買を成立させる形で、時間はかかりますが市場価格に近づく可能性があります。買取は当社が直接買主になる形で、買主を探す期間・内覧対応・仲介手数料が発生しない代わりに、価格は市場での売却想定額とは異なります。目的とご希望の時期に応じて、両者を比較したうえでご判断ください。'],
  ['AIで査定するのですか。',
   '現時点で、AIによる自動査定を単独の判断根拠として用いてはいません。市場・立地・建物・間取り・需要・再生余地・環境性能の7つの軸をデータとして記録し、再現性のある評価に近づける開発を進めている段階です。各技術の開発状況は KACHINOVA LAB で開示しています。'],
  ['築年数が古くても相談できますか。',
   '相談できます。当社は取得後に自社で再設計を行うため、評価の起点は現況ではなく「再生後にどのような価値を生み出せるか」です。売却前のリフォームも原則として不要です。'],
  ['賃貸中（オーナーチェンジ）でも売却できますか。',
   '可能な場合があります。賃貸借契約の内容を確認させていただいたうえでご回答します。'],
];

const body = `
${pageHero({
  eyebrow: 'SHIBUYA ／ 渋谷区の不動産',
  title: 'Shibuya,<br>re-engineered.',
  jp: '渋谷の住まいの価値を、再設計する。',
  lede: `株式会社KACHINOVA は、東京都渋谷区桜丘町に本社を置く不動産テクノロジー企業です。渋谷区の中古区分マンションを買い取り、AI・データ・スマートホーム・省エネ技術で再設計して次の所有者へ引き渡します。`,
  shot: 'city',
})}

<div class="shell">${breadcrumb(trail).replace('<nav class="breadcrumb shell"', '<nav class="breadcrumb"')}</div>

<section class="band" aria-labelledby="why-t">
  <div class="shell">
    <div class="reveal">
      <p class="eyebrow">WHY SHIBUYA</p>
      <h2 class="display display--xxl u-mt-s" id="why-t">Why we work<br>from Shibuya.</h2>
      <p class="lede u-mt-s">渋谷を「エリアのひとつ」としてではなく、拠点として扱っています。</p>
    </div>
    <div class="tiles tiles--3 stagger u-mt-l">
      ${WHY_SHIBUYA.map(([en, ja, note], i) => `<div class="tile" style="--i:${i}">
        <span class="num">0${i + 1}</span>
        <h3>${en}</h3>
        <p class="tile__jp">${ja}</p>
        <p>${note}</p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="band--tight section--light" aria-labelledby="svc-t">
  <div class="shell shell--narrow">
    <div class="reveal">
      <p class="eyebrow eyebrow--gold">WHAT WE BUY ／ 買取の対象</p>
      <h2 class="display display--xl u-mt-s" id="svc-t">What we buy<br>in Shibuya.</h2>
    </div>
    <dl class="data u-mt-l reveal">
      <div><dt>物件種別</dt><dd>中古区分マンション（1住戸単位）</dd></div>
      <div><dt>築年数</dt><dd>問いません。再生後の価値を起点に評価します。</dd></div>
      <div><dt>状態</dt><dd>現況のままで結構です。売却前のリフォーム・残置物の処分は原則不要です。</dd></div>
      <div><dt>ご状況</dt><dd>居住中／空室／賃貸中（オーナーチェンジ）／相続により取得　いずれもご相談ください。</dd></div>
      <div><dt>対応エリア</dt><dd>${AREA.statement}<small>本社は渋谷区。区内は最優先で対応します。</small></dd></div>
      <div><dt>取引の形態</dt><dd>当社が直接買主となる買取。仲介手数料は発生しません。</dd></div>
    </dl>
    <div class="btn-row u-mt"><a class="btn" href="/sell.html">無料査定を相談する<i></i></a></div>
  </div>
</section>

<section class="band--tight" aria-labelledby="area-t">
  <div class="shell shell--narrow">
    <div class="reveal u-mb">
      <p class="eyebrow">AREA ／ 対応エリア</p>
      <h2 class="display display--xl u-mt-s" id="area-t">Where we work.</h2>
    </div>
    <dl class="data reveal">
      ${AREAS.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n      ')}
    </dl>
    <p class="form__note u-mt">上記以外の地域についても、まずはご相談ください。対応可否をお伝えします。</p>
  </div>
</section>

<section class="band--tight" aria-labelledby="office-t">
  <div class="shell shell--narrow">
    <div class="reveal">
      <p class="eyebrow eyebrow--gold">OFFICE ／ 拠点</p>
      <h2 class="display display--xl u-mt-s" id="office-t">Sakuragaoka,<br>Shibuya.</h2>
    </div>
    <dl class="data u-mt reveal">
      <div><dt>商号</dt><dd>${COMPANY.legalName}</dd></div>
      <div><dt>所在地</dt><dd>${fullAddress()}</dd></div>
      <div><dt>電話</dt><dd>${telLink()}</dd></div>
      <div><dt>宅地建物取引業免許</dt><dd>${COMPANY.license}</dd></div>
    </dl>
    <div class="btn-row u-mt"><a class="btn" href="/company.html">会社概要<i></i></a></div>
  </div>
</section>

${faqBlock(FAQ, { id: 'faq', eyebrow: 'FAQ ／ 渋谷での売却について', title: 'よくあるご質問' })}

${ctaSplit()}`;

export default {
  path: '/shibuya.html',
  nav: '/shibuya.html',
  priority: '0.95',
  title: '渋谷の不動産｜中古区分マンションの買取・再販 - 株式会社KACHINOVA',
  description:
    '渋谷区桜丘町に本社を置く不動産テクノロジー企業。渋谷区を中心に中古区分マンションを買い取り、AI・データ・スマートホーム・省エネ技術で再設計して再販します。査定無料。宅地建物取引業免許 東京都知事（1）第114064号。',
  ogAlt: '渋谷の不動産 — 中古区分マンションの買取・再販 KACHINOVA',
  jsonld: [
    breadcrumbLd([{ name: 'HOME', href: '/' }, { name: 'SHIBUYA', href: '/shibuya.html' }]),
    orgLd({ url: abs('/shibuya.html') }),
    faqLd(FAQ),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: '中古区分マンションの買取・再生・再販',
      provider: { '@type': 'RealEstateAgent', name: COMPANY.legalName, url: abs('/') },
      areaServed: { '@type': 'AdministrativeArea', name: '東京都渋谷区' },
      inLanguage: 'ja',
    },
  ],
  body,
};
