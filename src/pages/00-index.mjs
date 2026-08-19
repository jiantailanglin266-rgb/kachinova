import { SITE } from '../site.mjs';
import { film, statement, plan, marquee, ctaSplit } from '../components.mjs';

/* ---------------------------------------------------------------- 01 hero -- */
const hero = `<section class="hero" aria-labelledby="hero-t">
  <div class="hero__media">
    <picture>
      <source type="image/webp" srcset="/assets/img/video-posters/kachinova-city-720.webp 720w, /assets/img/video-posters/kachinova-city-1280.webp 1280w, /assets/img/video-posters/kachinova-city.webp 1920w" sizes="100vw">
      <img src="/assets/img/video-posters/kachinova-city-1280.jpg" alt="夜明け前の東京。高層マンションと都市の光。" width="1920" height="1080" fetchpriority="high">
    </picture>
    <video muted playsinline loop preload="none" aria-hidden="true" tabindex="-1"
           data-video="/assets/videos/kachinova-city" data-priority="high"></video>
  </div>
  <div class="hero__scrim"></div>
  <div class="shell hero__inner">
    <img class="hero__mark" src="/assets/img/logo-mark-dark.webp" alt="" width="415" height="200" fetchpriority="high">
    <p class="eyebrow">${SITE.name} ／ ${SITE.tagline}</p>
    <h1 class="display hero__title line-mask-group" id="hero-t">
      <span class="line-mask"><span>Reinvent</span></span>
      <span class="line-mask"><span>the Value</span></span>
      <span class="line-mask"><span>of Living.</span></span>
    </h1>
    <p class="jp-display jp-display--sm hero__jp reveal">住まいの価値を、再発明する。</p>
    <p class="u-mono u-mt-s" style="color:var(--silver)">${SITE.sub}</p>
    <p class="scroll-cue"><i></i>SCROLL</p>
  </div>
</section>`;

/* -------------------------------------------------- 02 scroll introduction -- */
const intro = `
${statement({
  en: 'CHAPTER 01 ／ THE STOCK',
  jp: '日本には、<br>まだ価値を引き出せていない<br>住まいがある。',
  tall: true,
})}
${statement({
  en: 'CHAPTER 02 ／ THE ASSUMPTION',
  jp: '築年数だけで、<br>住宅の価値は決まらない。',
  align: 'end',
  tall: true,
})}

<section class="statement statement--tall" aria-label="KACHINOVA を構成する4つの軸">
  <div class="shell">
    <div class="stagger">
      <p class="eyebrow u-mb">CHAPTER 03 ／ THE VARIABLES</p>
      <p class="display display--mega">DESIGN.</p>
      <p class="display display--mega">TECHNOLOGY.</p>
      <p class="display display--mega">ENERGY.</p>
      <p class="display display--mega">DATA.</p>
      <p class="lede u-mt">住まいの価値は、立地と築年数だけで決まるものではありません。設計、技術、環境性能、そしてデータ。<br>KACHINOVA は、この4つの変数から住宅の価値を組み立て直します。</p>
    </div>
  </div>
</section>

${statement({
  en: 'CHAPTER 04 ／ THE ANSWER',
  jp: '私たちは、<br>住まいの価値を<br>再設計する。',
  align: 'center',
  tall: true,
  note: 'KACHINOVA ／ REAL ESTATE TECHNOLOGY COMPANY',
})}

${marquee([
  'REINVENTING THE VALUE OF LIVING',
  'AI × REAL ESTATE × SMART LIVING',
  '住まいの価値を、再発明する',
  'REAL ESTATE RE-ENGINEERED',
])}`;

/* --------------------------------------------------------- 03 what we do --- */
const FLOW = [
  ['ACQUIRE', '買取', '独自の評価軸で、再生後の価値を起点に取得判断を行います。'],
  ['ANALYZE', '分析', '立地・市場・建物・需要・エネルギー性能を分解して読み解きます。'],
  ['DESIGN', '設計', '「新品に戻す」のではなく、次の時代に適した住宅へ再設計します。'],
  ['REBUILD', '再生', '内装・設備・スマート機器・省エネ性能を一体で実装します。'],
  ['REVALUE', '価値創造', '次の所有者へ、更新された価値とともに引き渡します。'],
];

const business = `<section class="band" id="what-we-do" aria-labelledby="wwd-t">
  <div class="shell">
    <div class="split split--sticky">
      <div>
        <p class="eyebrow">WHAT WE DO</p>
        <h2 class="display display--xxl u-mt-s" id="wwd-t">Residential<br>Revalue</h2>
        <p class="jp-display jp-display--sm u-mt-s">中古区分マンションを、<br>買い取り、分析し、再設計する。</p>
        <div class="btn-row u-mt">
          <a class="btn" href="/business.html">事業内容を見る<i></i></a>
        </div>
      </div>
      <div>
        <p class="lede">KACHINOVA の主力事業は、中古区分マンションの買取・再生・再販です。ただし私たちは、これを「リフォームして売る」仕事だとは考えていません。既存の住宅というハードウェアに、設計・技術・環境性能を実装し直す<strong>リアルエステート・リエンジニアリング</strong>として捉えています。</p>
        <div class="flow stagger">
          ${FLOW.map(([en, ja, note], i) => `<div class="flow__step" style="--i:${i}">
            <span class="flow__n">0${i + 1}</span>
            <span class="flow__en">${en}<span class="flow__jp">${ja}</span></span>
            <span class="flow__note">${note}</span>
          </div>`).join('\n          ')}
        </div>
      </div>
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------- 04 film AI -- */
const filmAI = film({
  shot: 'ai',
  id: 'ai',
  eyebrow: 'REAL ESTATE × AI',
  title: 'From instinct<br>to evidence.',
  jp: '不動産を、経験だけで判断しない。',
  body: '市場・立地・建物・需要・価格・エネルギー性能。不動産の判断材料は、本来これだけの変数を持っています。KACHINOVA は、この変数群をデータとして扱い、再現性のある評価へ近づけるための技術開発に取り組んでいます。',
  motes: [
    'MARKET <b>／ 市場</b>', 'LOCATION <b>／ 立地</b>', 'BUILDING <b>／ 建物</b>',
    'DEMAND <b>／ 需要</b>', 'PRICE <b>／ 価格</b>', 'ENERGY <b>／ 環境性能</b>',
    'RENOVATION POTENTIAL <b>／ 再生余地</b>',
  ],
  cta: '<a class="btn" href="/technology.html">TECHNOLOGY<i></i></a>',
  side: 'left',
  tall: true,
});

const aiNote = `<section class="band--tight" aria-label="AI 活用状況に関する注記">
  <div class="shell shell--narrow">
    <div class="reveal">
      <p class="eyebrow eyebrow--gold">A NOTE ON HONESTY ／ 現在地について</p>
      <p class="lede u-mt-s">KACHINOVA が公開する技術は、すべて開発状況を明記します。すでに運用しているもの、研究段階のもの、構想段階のもの。<strong>「AI が査定しています」という言葉だけを先行させることはしません。</strong>各技術のステータスは <a href="/lab.html" style="color:var(--cyan)">KACHINOVA LAB</a> で開示します。</p>
      <div class="btn-row u-mt-s">
        <span class="chip chip--live">LIVE ／ 稼働中</span>
        <span class="chip chip--dev">IN DEVELOPMENT ／ 開発中</span>
        <span class="chip chip--research">RESEARCH ／ 研究中</span>
        <span class="chip chip--future">FUTURE ／ 構想</span>
      </div>
    </div>
  </div>
</section>`;

/* ------------------------------------------------------- 05 acquire / film -- */
const AXES = [
  ['LOCATION', '立地', '駅距離や住所ではなく、10年後に人が住み続ける理由があるかを見ます。'],
  ['MARKET', '市場', '同一エリア・同一規模帯の取引の厚みと、価格の安定性を確認します。'],
  ['BUILDING', '建物', '管理状態・修繕計画・共用部・構造。専有部より先に建物を読みます。'],
  ['LAYOUT', '間取り', '現在の間取りではなく、間取りを変えられる余地があるかを評価します。'],
  ['DEMAND', '需要', '誰が次の住み手になるのか。世帯像を具体的に置いてから判断します。'],
  ['RENOVATION POTENTIAL', '再生余地', '再設計でどれだけ価値を積み上げられるかを取得前に見積もります。'],
  ['ENERGY POTENTIAL', '環境性能余地', '断熱・設備更新でどこまで性能を引き上げられるかを検討します。'],
];

const filmRevalue = film({
  shot: 'revalue',
  id: 'revalue',
  eyebrow: 'RE:VALUE',
  title: 'Re:value<br>the home.',
  jp: '既存住宅に、新しい価値を。',
  body: '日本には、まだ十分に価値を引き出せていない住宅ストックがあります。私たちが取得するのは「古いマンション」ではなく、再設計の余地が残された住まいです。',
  side: 'right',
  scrim: 'even',
  tall: true,
});

const acquire = `<section class="band" id="acquire" aria-labelledby="acq-t">
  <div class="shell">
    <div class="reveal">
      <p class="eyebrow">ACQUIRE ／ 買取</p>
      <h2 class="display display--xxl u-mt-s" id="acq-t">What we look at.</h2>
      <p class="lede u-mt-s">築年数や表面的な状態ではなく、「再生後にどのような価値を生み出せるか」という視点から不動産を見ます。以下は、KACHINOVA が取得判断で必ず確認する評価軸です。</p>
    </div>
  </div>
  <div class="u-mt-l">
    <div class="shell">
      <div class="tiles tiles--3 stagger">
        ${AXES.map(([en, ja, note], i) => `<div class="tile" style="--i:${i}">
          <span class="num">0${i + 1}</span>
          <h3>${en}</h3>
          <p class="tile__jp">${ja}</p>
          <p>${note}</p>
        </div>`).join('\n        ')}
      </div>
    </div>
  </div>
</section>`;

/* ---------------------------------------------- 06 re:design + signature ---- */
const redesign = `<section class="band section--light" id="redesign" aria-labelledby="rd-t">
  <div class="shell">
    <div class="split split--even">
      <div class="reveal">
        <p class="eyebrow eyebrow--gold">RE:DESIGN ／ 再設計</p>
        <h2 class="display display--xxl u-mt-s" id="rd-t">Not restored.<br>Re-engineered.</h2>
        <p class="jp-display jp-display--sm u-mt-s">新品に戻すのではなく、<br>次の時代に合わせて設計し直す。</p>
        <div class="prose u-mt-s">
          <p>1980〜2000年代に設計された住まいは、その時代の家族像と生活動線を前提にしています。私たちはその前提そのものを引き直します。壁を減らすのか、増やすのか。光をどこから入れるのか。働く場所をどこに置くのか。</p>
          <p><strong>設計要素：</strong>間取り／内装／照明／収納／素材／設備／断熱・省エネ／スマート機器。これらを個別の工事項目ではなく、ひとつの設計として統合します。</p>
        </div>
        <div class="btn-row u-mt">
          <a class="btn" href="/business.html#redesign">再設計のプロセス<i></i></a>
        </div>
      </div>
      <div class="reveal">
        ${plan({
          nodes: [
            { x: 150, y: 210, label: 'OPEN LDK' },
            { x: 566, y: 150, label: 'PRIVATE' },
            { x: 566, y: 330, label: 'WORK' },
          ],
          caption: '既存の間取り（細線）に、再設計の線（シアン）を重ねる。',
        })}
      </div>
    </div>
  </div>
</section>`;

/* ------------------------------------------------------- 07 smart + eco ----- */
const filmSmart = film({
  shot: 'smart',
  id: 'smart',
  eyebrow: 'SMART LIVING',
  title: 'Technology,<br>dissolved into<br>daily life.',
  jp: 'テクノロジーが、暮らしに溶け込む。',
  body: '帰宅、解錠、点灯、空調、そして消費エネルギーの可視化。良い技術は、操作を増やさず、意識されないまま生活を最適化します。KACHINOVA はスマートホーム機器を「設備」ではなく、住宅価値の一部として設計に組み込みます。',
  motes: [
    'SMART LOCK', 'SMART LIGHTING', 'AIR CONDITIONING',
    'SENSOR', 'SECURITY', 'ENERGY MONITORING',
  ],
  side: 'left',
  tall: true,
});

const smartNote = `<section class="band--tight" aria-label="スマートホーム採用方針">
  <div class="shell shell--narrow">
    <div class="split split--even">
      <div class="reveal">
        <p class="eyebrow eyebrow--gold">ADOPTION POLICY</p>
        <p class="lede u-mt-s">導入する技術は、物件・プロジェクトごとに決定します。<strong>全物件に一律で標準装備される、という表記はいたしません。</strong>建物の管理規約、住戸の構造、想定される住み手によって、最適な構成は変わるためです。</p>
      </div>
      <div class="reveal">
        ${plan({
          nodes: [
            { x: 452, y: 372, label: 'LOCK' },
            { x: 150, y: 150, label: 'AIR' },
            { x: 262, y: 296, label: 'SENSOR' },
            { x: 604, y: 236, label: 'ENERGY' },
          ],
          caption: '同じ設計線の上に、技術のノードを置く。',
        })}
      </div>
    </div>
  </div>
</section>`;

const filmEco = film({
  shot: 'eco',
  id: 'eco',
  eyebrow: 'ECO LIVING',
  title: 'Less energy.<br>More value.',
  jp: '省エネを、我慢ではなく価値に。',
  body: '断熱、高効率設備、LED、節水、エネルギーの可視化。環境性能は「我慢して光熱費を下げる」ためのものではなく、住まいの快適性と資産価値を同時に押し上げる設計変数です。中古住宅の再生に、この新しい価値軸を加えます。',
  motes: ['INSULATION', 'HIGH-EFFICIENCY AC', 'LED', 'WATER SAVING', 'ENERGY MANAGEMENT'],
  side: 'right',
  scrim: 'even',
  tall: true,
});

/* --------------------------------------------------------- 08 three values -- */
const VALUES = [
  {
    n: '01', en: 'TECHNOLOGY', jp: 'AIとデータで、不動産を見る。',
    body: '感覚と経験に依存してきた判断を、記録し、検証し、再現できるかたちに置き換えていく。それが KACHINOVA の技術に対する立場です。',
    href: '/technology.html', cta: 'TECHNOLOGY',
  },
  {
    n: '02', en: 'DESIGN', jp: '空間そのものの価値を、再設計する。',
    body: '内装の刷新ではなく、住まいの構成そのものを引き直す。設計が変われば、同じ専有面積でも暮らしの質は変わります。',
    href: '/business.html#redesign', cta: 'RE:DESIGN',
  },
  {
    n: '03', en: 'SUSTAINABILITY', jp: '既存住宅を活かし、次の暮らしへつなぐ。',
    body: '建てることだけが未来ではありません。すでにある建築を活かしながら性能を引き上げることは、最も現実的な選択肢のひとつです。',
    href: '/about.html#why-reuse', cta: 'WHY REUSE?',
  },
];

const values = `<section aria-labelledby="values-t" id="values">
  <div class="shell band--tight">
    <h2 class="sr-only" id="values-t">KACHINOVA の3つの価値</h2>
    <p class="eyebrow reveal">THREE VALUES</p>
  </div>
  ${VALUES.map((v, i) => `<div class="value${i === 0 ? ' value--accent' : ''}">
    <div class="shell">
      <div class="split split--even">
        <div class="reveal">
          <p class="value__n">${v.n}</p>
          <h3 class="display display--xxl">${v.en}</h3>
        </div>
        <div class="reveal">
          <p class="jp-display jp-display--sm">${v.jp}</p>
          <p class="lede u-mt-s">${v.body}</p>
          <div class="btn-row u-mt"><a class="btn" href="${v.href}">${v.cta}<i></i></a></div>
        </div>
      </div>
    </div>
  </div>`).join('\n  ')}
</section>`;

/* ----------------------------------------------------------- 09 why reuse --- */
const whyReuse = `<section class="band section--light" id="why-reuse" aria-labelledby="why-t">
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
          <p>日本には膨大な既存住宅ストックがあります。それらをすべて解体し、新築へ置き換えることが唯一の答えではありません。壊さずに、活かす。そのうえで、Technology・Design・Energy によって価値を組み立て直す。</p>
          <p>KACHINOVA は、<strong>既存住宅の再価値化</strong>を事業テーマであると同時に、取り組むべき社会的なテーマだと捉えています。</p>
        </div>
        <div class="btn-row u-mt-s"><a class="btn" href="/about.html#why-reuse">私たちの考え<i></i></a></div>
      </div>
    </div>
  </div>
</section>`;

/* -------------------------------------------------------- 10 business model - */
const MODEL = [
  ['PROPERTY', '対象住戸'], ['ACQUISITION', '取得'], ['DATA / ANALYSIS', '分析'],
  ['REVALUE DESIGN', '再設計'], ['RENOVATION', '施工'], ['SMART / ECO', '技術実装'],
  ['NEW OWNER', '次の所有者'],
];

const model = `<section class="band" id="model" aria-labelledby="model-t">
  <div class="shell">
    <div class="reveal">
      <p class="eyebrow">BUSINESS MODEL</p>
      <h2 class="display display--xxl u-mt-s" id="model-t">One property,<br>seven states.</h2>
    </div>
    <ol class="flow stagger u-mt-l">
      ${MODEL.map(([en, ja], i) => `<li class="flow__step" style="--i:${i}">
        <span class="flow__n">${String(i + 1).padStart(2, '0')}</span>
        <span class="flow__en">${en}<span class="flow__jp">${ja}</span></span>
      </li>`).join('\n      ')}
    </ol>
  </div>
</section>`;

/* ------------------------------------------------------ 11 projects / lab --- */
const teasers = `<section class="band--tight" aria-labelledby="tease-t">
  <div class="shell">
    <h2 class="sr-only" id="tease-t">プロジェクトと研究開発</h2>
    <div class="tiles tiles--3 stagger">
      <a class="tile" href="/projects.html" style="--i:0">
        <span class="num">PROJECTS</span>
        <h3>Revalue<br>Projects</h3>
        <p class="tile__jp">販売物件ではなく、再価値化のプロジェクトとして公開します。</p>
        <span class="chip chip--todo">準備中 ／ DATA_REQUIRED</span>
      </a>
      <a class="tile" href="/lab.html" style="--i:1">
        <span class="num">LAB</span>
        <h3>KACHINOVA<br>Lab</h3>
        <p class="tile__jp">AI・スマートホーム・エネルギー・不動産データの研究開発。</p>
        <span class="chip chip--research">RESEARCH</span>
      </a>
      <a class="tile" href="/journal.html" style="--i:2">
        <span class="num">JOURNAL</span>
        <h3>Kachinova<br>Journal</h3>
        <p class="tile__jp">中古住宅・PropTech・省エネ・設計についての発信。</p>
        <span class="chip chip--todo">準備中 ／ DATA_REQUIRED</span>
      </a>
    </div>
  </div>
</section>`;

/* ---------------------------------------------------------- 12 final film --- */
const finale = `<section class="film film--tall film--center" id="finale" aria-labelledby="fin-t">
  <div class="film__media">
    <picture>
      <source type="image/webp" srcset="/assets/img/video-posters/kachinova-future-720.webp 720w, /assets/img/video-posters/kachinova-future-1280.webp 1280w, /assets/img/video-posters/kachinova-future.webp 1920w" sizes="100vw">
      <img src="/assets/img/video-posters/kachinova-future-1280.jpg" alt="夜、窓に明かりの灯る住宅と東京の都市景観。" width="1920" height="1080" loading="lazy" decoding="async">
    </picture>
    <video muted playsinline loop preload="none" aria-hidden="true" tabindex="-1"
           data-video="/assets/videos/kachinova-future"></video>
  </div>
  <div class="film__scrim"></div>
  <div class="shell film__inner">
    <div class="film__body reveal">
      <p class="film__index">FILM 06 ／ KACHINOVA FUTURE</p>
      <p class="jp-display u-mt" style="font-size:var(--t-xl)">住まいは、<br>もっと進化できる。</p>
      <h2 class="display display--mega u-mt" id="fin-t">Real Estate<br>Re-engineered.</h2>
      <p class="u-mono u-mt" style="color:var(--mist)">${SITE.name}</p>
      <p class="u-mono u-mt-s" style="color:var(--steel)">${SITE.sub}</p>
      <div class="btn-row u-mt-l" style="justify-content:center">
        <a class="btn btn--lg" href="/projects.html">PROJECTS<i></i></a>
        <a class="btn btn--lg btn--cyan" href="/sell.html">SELL TO KACHINOVA<i></i></a>
        <a class="btn btn--lg" href="/contact.html">CONTACT<i></i></a>
      </div>
    </div>
  </div>
</section>`;

export default {
  path: '/index.html',
  nav: '/',
  changefreq: 'weekly',
  priority: '1.0',
  title: 'KACHINOVA｜住まいの価値を、再発明する。中古区分マンションの買取・再生・再販',
  description:
    'KACHINOVA（カチノヴァ）は、AI・データ・スマートホーム・省エネ技術で中古区分マンションを再設計するリアルエステート・テクノロジーカンパニーです。買取・再生・再販を通じて、既存住宅の価値を組み立て直します。',
  preloadPoster: {
    webp: '/assets/img/video-posters/kachinova-city-1280.webp',
    srcset: '/assets/img/video-posters/kachinova-city-720.webp 720w, /assets/img/video-posters/kachinova-city-1280.webp 1280w, /assets/img/video-posters/kachinova-city.webp 1920w',
  },
  jsonld: [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.name,
      alternateName: SITE.nameJa,
      url: SITE.origin + '/',
      logo: SITE.origin + '/assets/img/logo-lockup.png',
      description:
        'AI・データ・スマートホーム・省エネ技術を用いて中古区分マンションを再設計する不動産テクノロジー企業。',
      slogan: SITE.claim,
      areaServed: { '@type': 'Country', name: 'Japan' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.origin + '/',
      inLanguage: 'ja',
    },
  ],
  body: [hero, intro, business, filmAI, aiNote, filmRevalue, acquire, redesign,
         filmSmart, smartNote, filmEco, values, whyReuse, model, teasers,
         finale, ctaSplit()].join('\n\n'),
};
