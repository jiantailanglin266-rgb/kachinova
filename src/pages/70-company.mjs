import { SITE, COMPANY } from '../site.mjs';
import { pageHero, breadcrumb, breadcrumbLd, ctaSplit, fact } from '../components.mjs';

const trail = [{ name: 'HOME', href: '/' }, { name: 'COMPANY' }];

const ROWS = [
  ['商号 ／ COMPANY NAME', fact(COMPANY.legalName, '登記上の正式名称を確認のうえ掲載します。ブランド名は KACHINOVA（カチノヴァ）です。')],
  ['代表者 ／ REPRESENTATIVE', fact(COMPANY.representative)],
  ['設立 ／ FOUNDED', fact(COMPANY.founded)],
  ['資本金 ／ CAPITAL', fact(COMPANY.capital)],
  ['所在地 ／ ADDRESS', fact(COMPANY.address)],
  ['電話 ／ TEL', fact(COMPANY.tel)],
  ['メール ／ EMAIL', fact(COMPANY.email)],
  ['宅地建物取引業免許 ／ LICENSE', fact(COMPANY.license, '免許番号は、免許証の記載どおりに掲載します。未確定の情報は一切記載しません。')],
  ['宅地建物取引士 ／ LICENSED AGENT', fact(COMPANY.licenseHolder)],
  ['事業内容 ／ BUSINESS', `<ul style="display:grid;gap:.4rem">${COMPANY.businesses.map((b) => `<li>・${b}</li>`).join('')}</ul>`],
];

const body = `
${pageHero({
  eyebrow: 'COMPANY ／ 会社概要',
  title: 'Company.',
  jp: '会社概要',
  lede: '不動産取引を行う企業として必要な情報を掲載します。確定していない項目は空欄にせず、確認中であることを明示します。',
  still: 'sell-city',
})}

<div class="shell">${breadcrumb(trail).replace('<nav class="breadcrumb shell"', '<nav class="breadcrumb"')}</div>

<section class="band" aria-labelledby="profile-t">
  <div class="shell shell--narrow">
    <div class="reveal">
      <p class="eyebrow">CORPORATE PROFILE</p>
      <h2 class="display display--xl u-mt-s" id="profile-t">Company profile.</h2>
    </div>
    <dl class="data u-mt-l reveal">
      ${ROWS.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n      ')}
    </dl>
    <p class="form__note u-mt">上記のうち「確認中 ／ DATA_REQUIRED」と表示されている項目は、正式な書類にもとづく内容が確定していないため掲載していません。<strong>推定値や仮の情報を記載することはありません。</strong></p>
  </div>
</section>

<section class="band--tight section--light" aria-labelledby="trust-t">
  <div class="shell shell--narrow">
    <div class="reveal">
      <p class="eyebrow eyebrow--gold">FOR CUSTOMERS ／ ご確認いただきたいこと</p>
      <h2 class="display display--xl u-mt-s" id="trust-t">Before you<br>work with us.</h2>
    </div>
    <dl class="data u-mt-l reveal">
      <div>
        <dt>取引の形態</dt>
        <dd>当社が直接買主となる「買取」を基本としています。仲介手数料は発生しませんが、買取価格は市場での売却想定価格とは異なります。両者を比較したうえでご判断ください。</dd>
      </div>
      <div>
        <dt>査定について</dt>
        <dd>査定は無料です。査定価格は、その時点の市場環境・建物の状態・再生計画の前提にもとづく見込み額であり、確定した買取価格の保証ではありません。</dd>
      </div>
      <div>
        <dt>費用の負担</dt>
        <dd>登記費用、税金、管理費・修繕積立金の精算、残置物の処分などの負担区分は物件ごとに異なります。契約前に書面で明示します。</dd>
      </div>
      <div>
        <dt>再生後の性能表示</dt>
        <dd>断熱性能・省エネ効果・スマート機器の仕様は、実際に採用したものだけを、根拠を示せる範囲で表示します。想定値を実測値として表示することはありません。</dd>
      </div>
      <div>
        <dt>個人情報の取り扱い</dt>
        <dd>お問い合わせ・査定でお預かりした情報の利用目的と管理方法は<a href="/privacy.html">プライバシーポリシー</a>に定めています。</dd>
      </div>
      <div>
        <dt>お問い合わせ窓口</dt>
        <dd>${COMPANY.tel || COMPANY.email
          ? [COMPANY.tel, COMPANY.email].filter(Boolean).join(' ／ ')
          : '<span class="chip chip--todo">確認中 ／ DATA_REQUIRED</span><small>当面は<a href="/contact.html">お問い合わせフォーム</a>をご利用ください。</small>'}</dd>
      </div>
    </dl>
  </div>
</section>

${ctaSplit()}`;

export default {
  path: '/company.html',
  nav: '/company.html',
  priority: '0.8',
  title: 'COMPANY｜会社概要 - KACHINOVA',
  description:
    'KACHINOVA の会社概要。商号・代表者・所在地・宅地建物取引業免許などの企業情報と、お取引にあたってご確認いただきたい事項を掲載しています。',
  jsonld: [breadcrumbLd([{ name: 'HOME', href: '/' }, { name: 'COMPANY', href: '/company.html' }]), {
    /* Only verified facts are emitted. Address / licence are omitted entirely
       until confirmed — an incomplete RealEstateAgent node is better than a
       fabricated one. */
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: SITE.name,
    url: SITE.origin + '/company.html',
    image: SITE.origin + '/assets/img/og-kachinova.jpg',
    areaServed: { '@type': 'Country', name: 'Japan' },
    inLanguage: 'ja',
  }],
  body,
};
