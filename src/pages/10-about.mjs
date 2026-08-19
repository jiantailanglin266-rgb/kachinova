import { SITE } from '../site.mjs';
import { pageHero, statement, breadcrumb, breadcrumbLd, ctaSplit, marquee } from '../components.mjs';

const trail = [{ name: 'HOME', href: '/' }, { name: 'ABOUT' }];

const VALUES = [
  ['01', 'TECHNOLOGY', 'AIとデータで、不動産を見る。',
   '取得・分析・設計・販売の各段階で扱ってきた判断材料を、記録可能・検証可能なかたちへ置き換えていきます。属人的な勘を否定するのではなく、勘の中身を言語化し、次の判断に引き継げるようにすることが目的です。'],
  ['02', 'DESIGN', '空間そのものの価値を、再設計する。',
   '同じ専有面積でも、設計が変われば暮らしの質は変わります。私たちは内装の刷新ではなく、住まいの構成そのものを引き直します。壁・光・動線・収納・素材を、ひとつの設計として統合します。'],
  ['03', 'SUSTAINABILITY', '既存住宅を活かし、次の暮らしへつなぐ。',
   'すでにある建築を活かしながら性能を引き上げることは、最も現実的な選択肢のひとつです。断熱・設備更新・エネルギーの可視化を通じて、既存住宅に環境性能という価値軸を加えます。'],
];

const body = `
${pageHero({
  eyebrow: 'ABOUT KACHINOVA',
  title: 'A technology<br>company that<br>redesigns homes.',
  jp: '不動産会社ではなく、<br>住まいを再設計するテクノロジー企業として。',
  lede: 'KACHINOVA は、中古区分マンションの買取・再生・再販を軸に、AI・データ・スマートホーム・エネルギー技術を用いて既存住宅の価値を組み立て直す会社です。',
  shot: 'city',
})}

<div class="shell">${breadcrumb(trail).replace('<nav class="breadcrumb shell"', '<nav class="breadcrumb"')}</div>

<section class="band" aria-labelledby="mission-t">
  <div class="shell">
    <div class="split split--sticky">
      <div>
        <p class="eyebrow">OUR POSITION</p>
        <h2 class="display display--xxl u-mt-s" id="mission-t">Real Estate<br>Re-engineered.</h2>
      </div>
      <div class="prose reveal">
        <p>不動産は、日本で最も大きく、最も更新が遅れている産業のひとつです。とりわけ既存住宅は、築年数という単一の指標で価値が語られ、本来持っているはずの可能性が十分に評価されていません。</p>
        <p>KACHINOVA は、この状況を「情報と設計の問題」だと捉えています。建物の状態、周辺の需要、間取りを変えられる余地、断熱や設備を更新したときの性能。<strong>これらを分解して読み解けば、価値は再構築できます。</strong></p>
        <p>私たちは既存住宅を取得し、Technology・Design・Sustainability を組み合わせて再設計し、次の所有者へ引き渡します。単なるリフォームではなく、<strong>リアルエステート・リエンジニアリング</strong>という考え方をブランドの中心に置いています。</p>
      </div>
    </div>
  </div>
</section>

${marquee(['REINVENTING THE VALUE OF LIVING', 'AI × REAL ESTATE × SMART LIVING', '住まいの価値を、再発明する', 'REAL ESTATE RE-ENGINEERED'])}

${statement({
  en: 'BRAND MESSAGE',
  jp: '住まいの価値を、<br>再発明する。',
  align: 'center',
  note: 'REINVENTING THE VALUE OF LIVING. ／ AIとテクノロジーで、住まいに新しい価値を。',
})}

<section class="band section--light" id="why-reuse" aria-labelledby="why-t">
  <div class="shell">
    <div class="split">
      <div class="reveal">
        <p class="eyebrow eyebrow--gold">WHY REUSE?</p>
        <h2 class="display display--xxl u-mt-s" id="why-t">Building new<br>is not the only<br>future.</h2>
        <p class="jp-display u-mt" style="font-size:var(--t-xl)">建てるだけが、<br>未来ではない。</p>
      </div>
      <div class="reveal">
        <figure class="figure figure--mask">
          <picture>
            <source type="image/webp" srcset="/assets/img/why-reuse.webp">
            <img src="/assets/img/why-reuse.jpg" alt="水辺に建ち並ぶ既存の分譲マンション。" width="1600" height="1190" loading="lazy" decoding="async">
          </picture>
          <figcaption class="figure__cap">EXISTING STOCK ／ すでに、ここにある。</figcaption>
        </figure>
        <div class="prose u-mt">
          <p>日本には膨大な既存住宅ストックがあります。そのすべてを解体し、新築へ置き換えることが唯一の答えではありません。壊さずに活かす。そのうえで、設計・技術・環境性能によって価値を組み立て直す。</p>
          <p>この考え方は、資源の観点からも、住宅を選ぶ人の選択肢という観点からも、意味があると私たちは考えています。KACHINOVA は<strong>既存住宅の再価値化</strong>を、事業テーマであると同時に取り組むべき社会的テーマとして捉えています。</p>
          <p>なお、住宅ストックや空き家に関する具体的な統計数値は、出典を明示できる形が整い次第、本ページに掲載します。<span class="chip chip--todo">出典確認中 ／ DATA_REQUIRED</span></p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band" id="values" aria-labelledby="v-t">
  <div class="shell">
    <p class="eyebrow reveal">THREE VALUES</p>
    <h2 class="sr-only" id="v-t">KACHINOVA の3つの価値</h2>
  </div>
  ${VALUES.map(([n, en, jp, txt], i) => `<div class="value${i === 0 ? ' value--accent' : ''}">
    <div class="shell">
      <div class="split split--even">
        <div class="reveal">
          <p class="value__n">${n}</p>
          <h3 class="display display--xxl">${en}</h3>
        </div>
        <div class="reveal">
          <p class="jp-display jp-display--sm">${jp}</p>
          <p class="lede u-mt-s">${txt}</p>
        </div>
      </div>
    </div>
  </div>`).join('\n  ')}
</section>

<section class="band" id="recruit" aria-labelledby="rec-t">
  <div class="shell">
    <div class="split">
      <div class="reveal">
        <p class="eyebrow">RECRUIT</p>
        <h2 class="display display--xxl u-mt-s" id="rec-t">Rebuild<br>real estate.</h2>
        <p class="jp-display jp-display--sm u-mt-s">不動産を、つくり直す側へ。</p>
      </div>
      <div class="reveal">
        <p class="lede">KACHINOVA は、不動産・AI・エンジニアリング・デザイン・建築・マーケティングの領域から、産業そのものを設計し直すことに関心のある方を求めています。</p>
        <div class="tiles tiles--2 stagger u-mt">
          ${['REAL ESTATE', 'AI / DATA', 'ENGINEERING', 'DESIGN', 'ARCHITECTURE', 'MARKETING']
            .map((t, i) => `<div class="tile" style="--i:${i}"><h3>${t}</h3></div>`).join('')}
        </div>
        <p class="prose u-mt-s" style="font-size:.9rem">募集職種・条件の詳細は準備中です。<span class="chip chip--todo">準備中 ／ DATA_REQUIRED</span><br>ご関心のある方は、お問い合わせフォームより「採用について」としてご連絡ください。</p>
        <div class="btn-row u-mt-s"><a class="btn" href="/contact.html">CONTACT<i></i></a></div>
      </div>
    </div>
  </div>
</section>

${ctaSplit()}`;

export default {
  path: '/about.html',
  nav: '/about.html',
  priority: '0.9',
  title: 'ABOUT｜住まいの価値を、再発明する。 - KACHINOVA',
  description:
    'KACHINOVA は、中古区分マンションの買取・再生・再販を軸に、AI・データ・スマートホーム・省エネ技術で既存住宅の価値を再設計する不動産テクノロジー企業です。私たちの考え方と3つの価値をご紹介します。',
  jsonld: [breadcrumbLd([{ name: 'HOME', href: '/' }, { name: 'ABOUT', href: '/about.html' }]), {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'ABOUT — KACHINOVA',
    url: SITE.origin + '/about.html',
    inLanguage: 'ja',
  }],
  body,
};
