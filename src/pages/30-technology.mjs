import { SITE } from '../site.mjs';
import { pageHero, film, plan, breadcrumb, breadcrumbLd, ctaSplit } from '../components.mjs';

const trail = [{ name: 'HOME', href: '/' }, { name: 'TECHNOLOGY' }];

const AI_AREAS = [
  ['MARKET ANALYSIS', '市場分析', 'エリア単位の取引の厚み・価格帯・在庫の推移を継続的に把握する。', 'research'],
  ['PROPERTY ANALYSIS', '物件分析', '建物・管理状態・間取りの特徴を構造化データとして蓄積する。', 'dev'],
  ['DEMAND ANALYSIS', '需要分析', '想定居住者像と、その世帯が求める条件を突き合わせる。', 'research'],
  ['PRICE ANALYSIS', '価格分析', '再生後の想定価格から逆算した取得価格の妥当性を検証する。', 'dev'],
  ['RENOVATION PLANNING', '再生計画', '再設計案と概算費用の組み合わせを比較検討する。', 'dev'],
  ['ENERGY OPTIMIZATION', 'エネルギー最適化', '断熱・設備更新による性能改善の効果を試算する。', 'research'],
];

const SMART = [
  ['SMART LOCK', 'スマートロック', '鍵の受け渡しと施錠管理を、物理鍵に依存しない形にする。'],
  ['SMART LIGHTING', 'スマート照明', '時間帯と生活シーンに合わせて、光の量と色温度を切り替える。'],
  ['SMART AIR CONDITIONING', '空調制御', '在室状況と外気に応じた運転で、快適性と消費電力を両立する。'],
  ['SENSOR', 'センサー', '人感・温湿度・開閉。住まいの状態を把握するための最小限の入力。'],
  ['SECURITY', 'セキュリティ', '施錠・来訪・異常の通知を、住まい手が確認できる形にする。'],
  ['ENERGY MONITORING', 'エネルギー可視化', '何にどれだけ使っているかを、住まい手が見られるようにする。'],
];

const ECO = [
  ['INSULATION', '断熱', '窓・玄関まわりを中心に、熱の出入りを抑える更新を検討します。'],
  ['HIGH EFFICIENCY AC', '高効率空調', '同じ体感温度を、より少ない消費電力で実現する機器へ更新します。'],
  ['LED', 'LED照明', '消費電力と交換頻度の双方を下げます。'],
  ['WATER SAVING', '節水', '水栓・シャワー・トイレの更新で使用水量を抑えます。'],
  ['EFFICIENT APPLIANCES', '高効率設備', '給湯・換気など、稼働時間の長い設備から優先的に見直します。'],
  ['SMART ENERGY MANAGEMENT', 'エネルギー管理', '可視化と自動制御を組み合わせ、我慢に頼らない省エネにします。'],
];

const CHIP = {
  live: '<span class="chip chip--live">LIVE ／ 稼働中</span>',
  dev: '<span class="chip chip--dev">IN DEVELOPMENT ／ 開発中</span>',
  research: '<span class="chip chip--research">RESEARCH ／ 研究中</span>',
  future: '<span class="chip chip--future">FUTURE ／ 構想</span>',
};

const body = `
${pageHero({
  eyebrow: 'TECHNOLOGY ／ テクノロジー',
  title: 'From instinct<br>to evidence.',
  jp: '感覚から、データへ。',
  lede: '不動産の判断を、記録し、検証し、次に引き継げるかたちへ。KACHINOVA が取り組む技術領域と、その現在地を開示します。',
  still: 'tech-mind',
})}

<div class="shell">${breadcrumb(trail).replace('<nav class="breadcrumb shell"', '<nav class="breadcrumb"')}</div>

<section class="band--tight" aria-labelledby="honest-t">
  <div class="shell shell--narrow">
    <div class="reveal">
      <p class="eyebrow eyebrow--gold">A NOTE ON HONESTY</p>
      <h2 class="display display--xl u-mt-s" id="honest-t">We label<br>everything.</h2>
      <p class="lede u-mt-s">このページに掲載する技術は、すべて開発状況を明記します。<strong>すでに稼働しているもの、開発中のもの、研究段階のもの、構想段階のもの。</strong>「AIが査定しています」という表現だけを先行させることはしません。</p>
      <div class="btn-row u-mt-s">${CHIP.live}${CHIP.dev}${CHIP.research}${CHIP.future}</div>
      <p class="form__note u-mt">現時点で、AIによる自動査定を単独の判断根拠として用いてはいません。査定・取得判断は、担当者による確認を必ず経ています。</p>
    </div>
  </div>
</section>

${film({
  shot: 'ai',
  id: 'ai',
  eyebrow: 'REAL ESTATE × AI',
  title: 'Six variables,<br>one decision.',
  jp: '不動産を、経験だけで判断しない。',
  body: '市場・立地・建物・需要・価格・エネルギー性能。不動産の判断材料は、本来これだけの変数を持っています。KACHINOVA は、この変数群をデータとして扱い、再現性のある評価へ近づけるための開発に取り組んでいます。',
  motes: ['MARKET', 'LOCATION', 'BUILDING', 'DEMAND', 'PRICE', 'ENERGY', 'RENOVATION POTENTIAL'],
  tall: true,
})}

<section class="band" id="ai" aria-labelledby="ai-areas-t">
  <div class="shell">
    <div class="reveal">
      <p class="eyebrow">AI &amp; DATA ／ 取り組み領域</p>
      <h2 class="display display--xxl u-mt-s" id="ai-areas-t">Where data<br>goes to work.</h2>
    </div>
    <div class="tiles tiles--3 stagger u-mt-l">
      ${AI_AREAS.map(([en, ja, note, st], i) => `<div class="tile" style="--i:${i}">
        <h3>${en}</h3>
        <p class="tile__jp">${ja}</p>
        <p>${note}</p>
        ${CHIP[st]}
      </div>`).join('\n      ')}
    </div>
    <div class="btn-row u-mt"><a class="btn" href="/lab.html">KACHINOVA LAB<i></i></a></div>
  </div>
</section>

${film({
  shot: 'smart',
  id: 'smart',
  eyebrow: 'SMART LIVING',
  title: 'Technology,<br>dissolved into<br>daily life.',
  jp: 'テクノロジーが、暮らしに溶け込む。',
  body: '良い技術は、操作を増やしません。帰宅、解錠、点灯、空調、そして消費エネルギーの可視化。生活そのものが自然に最適化される状態を目指します。',
  side: 'right',
  scrim: 'even',
  tall: true,
})}

<section class="band" aria-labelledby="smart-t">
  <div class="shell">
    <div class="split split--even">
      <div class="reveal">
        <p class="eyebrow">SMART LIVING ／ 採用方針</p>
        <h2 class="display display--xl u-mt-s" id="smart-t">Chosen per home,<br>never by default.</h2>
        <p class="lede u-mt-s">導入する技術は、物件・プロジェクトごとに決定します。<strong>全物件に一律で標準装備される、という表記はいたしません。</strong>建物の管理規約、住戸の構造、想定される住み手によって、最適な構成は変わるためです。</p>
        <p class="form__note u-mt">各物件で採用した機器・仕様は、販売時の資料に明記します。</p>
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
    <div class="tiles tiles--3 stagger u-mt-l">
      ${SMART.map(([en, ja, note], i) => `<div class="tile" style="--i:${i}">
        <h3>${en}</h3>
        <p class="tile__jp">${ja}</p>
        <p>${note}</p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

${film({
  shot: 'eco',
  id: 'eco',
  eyebrow: 'ECO LIVING',
  title: 'Less energy.<br>More value.',
  jp: '省エネを、我慢ではなく価値に。',
  body: '環境性能は「我慢して光熱費を下げる」ためのものではなく、住まいの快適性と資産価値を同時に押し上げる設計変数です。中古住宅の再生に、この新しい価値軸を加えます。',
  tall: true,
})}

<section class="band section--light" id="eco" aria-labelledby="eco-t">
  <div class="shell">
    <div class="reveal">
      <p class="eyebrow eyebrow--gold">ECO LIVING ／ 検討する技術</p>
      <h2 class="display display--xxl u-mt-s" id="eco-t">Comfort first.<br>Savings follow.</h2>
      <p class="lede u-mt-s">以下は、再生計画の中で採用を検討する技術です。すべての物件に一律で導入するものではなく、建物の条件と費用対効果を確認したうえで選択します。</p>
    </div>
    <div class="tiles tiles--3 stagger u-mt-l">
      ${ECO.map(([en, ja, note], i) => `<div class="tile" style="--i:${i}">
        <h3>${en}</h3>
        <p class="tile__jp">${ja}</p>
        <p>${note}</p>
      </div>`).join('\n      ')}
    </div>
    <p class="form__note u-mt">省エネ性能の等級表示、光熱費の削減額、断熱性能値などの具体的な数値は、実測または計算根拠を示せる形が整い次第、物件ごとに掲載します。<span class="chip chip--todo">根拠準備中 ／ DATA_REQUIRED</span></p>
  </div>
</section>

${ctaSplit()}`;

export default {
  path: '/technology.html',
  nav: '/technology.html',
  priority: '0.9',
  title: 'TECHNOLOGY｜AI不動産・スマートホーム・省エネ技術 - KACHINOVA',
  description:
    '渋谷の不動産テック企業 KACHINOVA が不動産に持ち込む技術領域。AIとデータによる市場・物件・需要・価格の分析、スマートホーム、エネルギー最適化。実装していない機能は「稼働中」と表示せず、開発ステータスを明示します。',
  jsonld: [breadcrumbLd([{ name: 'HOME', href: '/' }, { name: 'TECHNOLOGY', href: '/technology.html' }])],
  body,
};
