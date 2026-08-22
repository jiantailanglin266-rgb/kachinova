import { SITE } from '../site.mjs';
import { pageHero, film, plan, breadcrumb, breadcrumbLd, ctaSplit, abs } from '../components.mjs';

const trail = [{ name: 'HOME', href: '/' }, { name: 'BUSINESS' }];

const FLOW = [
  ['ACQUIRE', '買取', '再生後の価値を起点に取得判断を行います。築年数や表面的な劣化ではなく、「この住戸をどこまで引き上げられるか」を先に見積もります。'],
  ['ANALYZE', '分析', '立地・市場・建物・間取り・需要・再生余地・環境性能余地の7軸で分解します。管理状態や修繕計画など、専有部の外側も必ず確認します。'],
  ['DESIGN', '設計', '想定する住み手を具体的に置いたうえで、間取り・光・動線・収納・素材・設備・断熱を一体で設計します。'],
  ['REBUILD', '再生', '設計に基づいて施工します。内装工事とスマート機器・省エネ設備の導入を、別々の発注ではなくひとつの工程として管理します。'],
  ['REVALUE', '価値創造', '更新された性能と設計意図を明示したうえで、次の所有者へ引き渡します。何をどう変えたのかを説明できることを重視します。'],
];

const AXES = [
  ['LOCATION', '立地', '駅距離や住所ではなく、10年後にも人が住み続ける理由があるかを見ます。'],
  ['MARKET', '市場', '同一エリア・同一規模帯の取引の厚みと、価格の安定性を確認します。'],
  ['BUILDING', '建物', '管理状態・修繕計画・共用部・構造。専有部より先に建物を読みます。'],
  ['LAYOUT', '間取り', '現在の間取りではなく、間取りを変えられる余地があるかを評価します。'],
  ['DEMAND', '需要', '誰が次の住み手になるのか。世帯像を具体的に置いてから判断します。'],
  ['RENOVATION POTENTIAL', '再生余地', '再設計でどれだけ価値を積み上げられるかを取得前に見積もります。'],
  ['ENERGY POTENTIAL', '環境性能余地', '断熱・設備更新でどこまで性能を引き上げられるかを検討します。'],
];

const DESIGN_ELEMENTS = [
  ['LAYOUT', '間取り', '前提となる家族像を引き直し、必要な部屋数と広さを再定義します。'],
  ['INTERIOR', '内装', '素材の質感と色数を絞り、時間が経っても古びない構成にします。'],
  ['LIGHTING', '照明', '一室一灯をやめ、生活シーンごとに光の量と色温度を設計します。'],
  ['STORAGE', '収納', '容量ではなく、置き場所の動線に合わせて配置します。'],
  ['MATERIALS', '素材', '手が触れる場所と目に入る場所を分けて仕様を決めます。'],
  ['TECHNOLOGY', '設備・技術', 'スマート機器を後付けの家電ではなく、設計要素として組み込みます。'],
  ['ENERGY EFFICIENCY', '断熱・省エネ', '窓・断熱・空調・給湯を、快適性と光熱費の両面から更新します。'],
];

const MODEL = [
  ['PROPERTY', '対象住戸', '中古区分マンション（1住戸単位）。'],
  ['ACQUISITION', '取得', '所有者様からの直接買取、または仲介会社経由での取得。'],
  ['DATA / ANALYSIS', '分析', '7つの評価軸による分解と、再生計画の策定。'],
  ['REVALUE DESIGN', '再設計', '想定居住者を定義したうえでの設計。'],
  ['RENOVATION', '施工', '設計に基づく内装・設備工事。'],
  ['SMART / ECO', '技術実装', '物件ごとに採用を判断するスマート機器・省エネ設備。'],
  ['NEW OWNER', '次の所有者', '設計意図と更新内容を明示したうえでの販売。'],
];

const body = `
${pageHero({
  eyebrow: 'BUSINESS ／ 事業内容',
  title: 'Residential<br>Revalue.',
  jp: '中古区分マンションを、買い取り、分析し、再設計する。',
  lede: 'KACHINOVA の主力事業は、中古区分マンションの買取・再生・再販です。取得から引き渡しまでを一貫して自社で設計・管理します。',
  shot: 'revalue',
})}

<div class="shell">${breadcrumb(trail).replace('<nav class="breadcrumb shell"', '<nav class="breadcrumb"')}</div>

<section class="band" id="flow" aria-labelledby="flow-t">
  <div class="shell">
    <div class="reveal">
      <p class="eyebrow">WHAT WE DO</p>
      <h2 class="display display--xxl u-mt-s" id="flow-t">Five states<br>of one home.</h2>
      <p class="lede u-mt-s">ひとつの住戸が、買取から引き渡しまでに通過する5つの状態です。私たちはこの全工程を、外部に切り出さず自社で設計・管理します。</p>
    </div>
    <ol class="flow stagger u-mt-l">
      ${FLOW.map(([en, ja, note], i) => `<li class="flow__step" style="--i:${i}">
        <span class="flow__n">0${i + 1}</span>
        <span class="flow__en">${en}<span class="flow__jp">${ja}</span></span>
        <span class="flow__note">${note}</span>
      </li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="band--tight" id="acquire" aria-labelledby="acq-t">
  <div class="shell">
    <div class="reveal">
      <p class="eyebrow">ACQUIRE ／ 買取</p>
      <h2 class="display display--xxl u-mt-s" id="acq-t">What we look at.</h2>
      <p class="lede u-mt-s">築年数や表面的な状態ではなく、「再生後にどのような価値を生み出せるか」という視点から不動産を見ます。将来的には、これらの評価軸をデータとして蓄積し、AIによる分析へ接続していく構想です。</p>
    </div>
    <div class="tiles tiles--3 stagger u-mt-l">
      ${AXES.map(([en, ja, note], i) => `<div class="tile" style="--i:${i}">
        <span class="num">0${i + 1}</span>
        <h3>${en}</h3>
        <p class="tile__jp">${ja}</p>
        <p>${note}</p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

${film({
  shot: 'revalue',
  id: 'revalue-film',
  eyebrow: 'RE:VALUE',
  title: 'Re:value<br>the home.',
  jp: '既存住宅に、新しい価値を。',
  body: '私たちが取得するのは「古いマンション」ではなく、再設計の余地が残された住まいです。',
  side: 'right',
  scrim: 'even',
})}

<section class="band section--light" id="redesign" aria-labelledby="rd-t">
  <div class="shell">
    <div class="split split--even">
      <div class="reveal">
        <p class="eyebrow eyebrow--gold">RE:DESIGN ／ 再設計</p>
        <h2 class="display display--xxl u-mt-s" id="rd-t">Not restored.<br>Re-engineered.</h2>
        <p class="jp-display jp-display--sm u-mt-s">新品に戻すのではなく、<br>次の時代に合わせて設計し直す。</p>
        <div class="prose u-mt-s">
          <p>1980〜2000年代に設計された住まいは、その時代の家族像と生活動線を前提にしています。私たちはその前提そのものを引き直します。壁を減らすのか、増やすのか。光をどこから入れるのか。働く場所をどこに置くのか。</p>
        </div>
      </div>
      <div class="reveal">
        ${plan({
          nodes: [
            { x: 150, y: 210, label: 'OPEN LDK' },
            { x: 566, y: 150, label: 'PRIVATE' },
            { x: 566, y: 330, label: 'WORK' },
          ],
          caption: '既存の間取り（細線）に、再設計の線（アクセント）を重ねる。',
        })}
      </div>
    </div>
    <div class="tiles tiles--3 stagger u-mt-l">
      ${DESIGN_ELEMENTS.map(([en, ja, note], i) => `<div class="tile" style="--i:${i}">
        <span class="num">0${i + 1}</span>
        <h3>${en}</h3>
        <p class="tile__jp">${ja}</p>
        <p>${note}</p>
      </div>`).join('\n      ')}
    </div>
    <p class="prose u-mt" style="font-size:.9rem">物件ごとの BEFORE / AFTER は、実績の公開開始にあわせて PROJECTS ページに掲載します。<span class="chip chip--todo">準備中 ／ DATA_REQUIRED</span></p>
  </div>
</section>

<section class="band" id="model" aria-labelledby="model-t">
  <div class="shell">
    <div class="reveal">
      <p class="eyebrow">BUSINESS MODEL</p>
      <h2 class="display display--xxl u-mt-s" id="model-t">One property,<br>seven states.</h2>
    </div>
    <ol class="flow stagger u-mt-l">
      ${MODEL.map(([en, ja, note], i) => `<li class="flow__step" style="--i:${i}">
        <span class="flow__n">${String(i + 1).padStart(2, '0')}</span>
        <span class="flow__en">${en}<span class="flow__jp">${ja}</span></span>
        <span class="flow__note">${note}</span>
      </li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="band--tight" id="transaction" aria-labelledby="tx-t">
  <div class="shell shell--narrow">
    <div class="reveal">
      <p class="eyebrow eyebrow--gold">TRANSACTION ／ ご売却の流れ</p>
      <h2 class="display display--xl u-mt-s" id="tx-t">How a sale works.</h2>
      <p class="lede u-mt-s">区分マンションを KACHINOVA へご売却いただく場合の一般的な流れです。個別の条件により手順が前後する場合があります。</p>
      <ol class="flow stagger u-mt">
        ${[
          ['ENQUIRY', 'お問い合わせ', 'フォームまたはお電話で、物件の概要をお知らせください。'],
          ['ASSESSMENT', '査定', '資料と現地確認をもとに買取価格をご提示します。費用はいただきません。'],
          ['TERMS', '条件のご相談', '価格・引渡し時期・残置物の扱いなどを調整します。'],
          ['CONTRACT', '売買契約', '重要事項説明のうえ、売買契約を締結します。'],
          ['SETTLEMENT', '決済・引渡し', '代金のお支払いと所有権移転を行います。'],
        ].map(([en, ja, note], i) => `<li class="flow__step" style="--i:${i}">
          <span class="flow__n">0${i + 1}</span>
          <span class="flow__en">${en}<span class="flow__jp">${ja}</span></span>
          <span class="flow__note">${note}</span>
        </li>`).join('\n        ')}
      </ol>
      <p class="form__note u-mt">仲介ではなく当社が直接買主となる「買取」を基本としています。査定価格・諸費用の負担区分・引渡し条件は物件ごとに異なります。契約前に書面で明示し、ご確認いただいたうえで進めます。</p>
      <div class="btn-row u-mt"><a class="btn btn--cyan" href="/sell.html">無料査定を相談する<i></i></a></div>
    </div>
  </div>
</section>

${ctaSplit()}`;

export default {
  path: '/business.html',
  nav: '/business.html',
  priority: '0.9',
  title: 'BUSINESS｜中古区分マンションの買取・再生・再販 - KACHINOVA',
  description:
    'KACHINOVA の事業内容。中古区分マンションの買取（ACQUIRE）から分析・再設計・再生・価値創造まで、5つの工程を一貫して自社で設計・管理します。ご売却の流れもご案内します。',
  jsonld: [breadcrumbLd([{ name: 'HOME', href: '/' }, { name: 'BUSINESS', href: '/business.html' }]), {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: '中古区分マンションの買取・再生・再販',
    provider: { '@type': 'Organization', name: SITE.name, url: abs('/') },
    areaServed: { '@type': 'Country', name: 'Japan' },
    inLanguage: 'ja',
  }],
  body,
};
