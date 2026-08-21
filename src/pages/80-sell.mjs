import { SITE, COMPANY } from '../site.mjs';
import { pageHero, breadcrumb, breadcrumbLd, formNote, honeypot } from '../components.mjs';

const trail = [{ name: 'HOME', href: '/' }, { name: 'SELL' }];

const field = ({ name, label, type = 'text', required = false, placeholder = '', hint = '', autocomplete = '' }) =>
  `<div class="field">
    <label for="f-${name}">${label}${required ? '<span class="req">REQUIRED</span>' : ''}</label>
    <input type="${type}" id="f-${name}" name="${name}"${required ? ' required' : ''}
      ${placeholder ? `placeholder="${placeholder}"` : ''}${autocomplete ? ` autocomplete="${autocomplete}"` : ''}>
    ${hint ? `<p class="field__hint">${hint}</p>` : ''}
    <p class="field__err" role="alert"></p>
  </div>`;

const select = ({ name, label, options, required = false, hint = '' }) =>
  `<div class="field">
    <label for="f-${name}">${label}${required ? '<span class="req">REQUIRED</span>' : ''}</label>
    <select id="f-${name}" name="${name}"${required ? ' required' : ''}>
      <option value="">選択してください</option>
      ${options.map((o) => `<option value="${o}">${o}</option>`).join('')}
    </select>
    ${hint ? `<p class="field__hint">${hint}</p>` : ''}
    <p class="field__err" role="alert"></p>
  </div>`;

const WHY = [
  ['ONE BUYER', '当社が直接買主', '仲介ではなく当社が買い取ります。買主を探す期間や内覧対応が発生しません。'],
  ['AS-IS', '現況のままで', '売却前のリフォームや残置物の処分は、原則として不要です。'],
  ['NEXT VALUE', '次の価値まで設計', '取得後にどう再設計するかを前提に評価するため、状態だけで判断しません。'],
];

const body = `
${pageHero({
  eyebrow: 'SELL TO KACHINOVA ／ 売却・無料査定',
  title: 'We think about<br>what your home<br>becomes next.',
  jp: 'その住まいの、次の価値まで考える。',
  lede: '区分マンションのご売却をご検討中の方へ。KACHINOVA は再生後の価値を起点に評価するため、築年数や現況だけで判断することはありません。査定は無料です。',
  shot: 'future',
})}

<div class="shell">${breadcrumb(trail).replace('<nav class="breadcrumb shell"', '<nav class="breadcrumb"')}</div>

<section class="band--tight" aria-labelledby="why-t">
  <div class="shell">
    <h2 class="sr-only" id="why-t">KACHINOVA に売却する場合の特徴</h2>
    <div class="tiles tiles--3 stagger">
      ${WHY.map(([en, ja, note], i) => `<div class="tile" style="--i:${i}">
        <span class="num">0${i + 1}</span>
        <h3>${en}</h3>
        <p class="tile__jp">${ja}</p>
        <p>${note}</p>
      </div>`).join('\n      ')}
    </div>
    <p class="form__note u-mt">買取価格は、市場で時間をかけて売却した場合の想定価格とは異なります。ご売却の目的やご希望の時期に応じて、仲介での売却と比較したうえでご判断ください。ご要望があれば、その比較の考え方もご説明します。</p>
  </div>
</section>

<section class="band section--light" id="form" aria-labelledby="form-t">
  <div class="shell shell--narrow">
    <div class="reveal u-mb">
      <p class="eyebrow eyebrow--gold">FREE ASSESSMENT ／ 無料査定のご相談</p>
      <h2 class="display display--xl u-mt-s" id="form-t">Tell us about<br>the home.</h2>
      <p class="lede u-mt-s">わかる範囲でご記入ください。不明な項目は空欄のままで構いません。折り返しご連絡のうえ、必要な情報を確認させていただきます。</p>
    </div>

    <form class="form reveal" data-form="sell" method="post" action="#"
          data-mailto="${COMPANY.email || ''}" data-subject="KACHINOVA｜無料査定のご相談" novalidate>
      ${honeypot()}

      <p class="eyebrow eyebrow--plain" style="color:var(--fg)">01 ／ お客様について</p>
      <div class="form__grid form__grid--2">
        ${field({ name: 'name', label: 'お名前', required: true, placeholder: '価値野 太郎', autocomplete: 'name' })}
        ${field({ name: 'email', label: 'メールアドレス', type: 'email', required: true, placeholder: 'you@example.com', autocomplete: 'email' })}
        ${field({ name: 'tel', label: '電話番号', type: 'tel', required: true, placeholder: '03-0000-0000', autocomplete: 'tel', hint: 'ご連絡がつきやすい番号をご記入ください。' })}
        ${select({ name: 'contact_pref', label: 'ご希望の連絡方法', options: ['メール', '電話', 'どちらでも'] })}
      </div>

      <hr class="rule u-mt-s">

      <p class="eyebrow eyebrow--plain" style="color:var(--fg)">02 ／ 物件について</p>
      <div class="form__grid form__grid--2">
        ${field({ name: 'property_address', label: '物件所在地', required: true, placeholder: '東京都〇〇区〇〇 1-2-3', hint: '番地までわからない場合は市区町村までで結構です。' })}
        ${field({ name: 'building_name', label: 'マンション名', placeholder: '〇〇マンション' })}
        ${field({ name: 'room_size', label: '専有面積', placeholder: '例：55.20㎡', hint: '登記簿または販売時の資料の数値をご記入ください。' })}
        ${select({ name: 'layout', label: '間取り', options: ['1R / 1K', '1DK / 1LDK', '2DK / 2LDK', '3DK / 3LDK', '4DK / 4LDK 以上', 'わからない'] })}
        ${field({ name: 'built_year', label: '築年数（または竣工年）', placeholder: '例：1998年築' })}
        ${select({ name: 'status', label: '現在の状況', options: ['ご自身が居住中', '賃貸中（オーナーチェンジ）', '空室', '相続により取得', 'その他'] })}
        ${select({ name: 'timing', label: 'ご希望時期', options: ['できるだけ早く', '3か月以内', '半年以内', '1年以内', '時期は未定・情報収集中'] })}
        ${select({ name: 'reason', label: 'ご売却の理由', options: ['住み替え', '相続', '転勤・転居', '資産の整理', '賃貸経営の見直し', 'その他・回答しない'] })}
      </div>

      <div class="field">
        <label for="f-message">その他・ご要望</label>
        <textarea id="f-message" name="message" placeholder="管理状況、リフォーム履歴、ご不安な点など、お知らせいただける範囲でご記入ください。"></textarea>
      </div>

      <hr class="rule u-mt-s">

      <div class="consent">
        <input type="checkbox" id="f-consent" name="consent" required>
        <label for="f-consent"><a href="/privacy.html">プライバシーポリシー</a>に同意のうえ送信します。<span class="req">REQUIRED</span></label>
        <p class="field__err" role="alert"></p>
      </div>

      ${formNote()}

      <div class="btn-row">
        <button class="btn btn--lg btn--solid" type="submit">無料査定を相談する<i></i></button>
      </div>
      <p class="form__status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>

<section class="band--tight" aria-labelledby="faq-t">
  <div class="shell shell--narrow">
    <div class="reveal u-mb">
      <p class="eyebrow">FAQ</p>
      <h2 class="display display--xl u-mt-s" id="faq-t">Common questions.</h2>
    </div>
    <dl class="data reveal">
      <div><dt>査定に費用はかかりますか</dt><dd>かかりません。査定後にご売却をお断りいただいても、費用は一切発生しません。</dd></div>
      <div><dt>賃貸中でも売却できますか</dt><dd>可能な場合があります。賃貸借契約の内容を確認させていただいたうえでご回答します。</dd></div>
      <div><dt>リフォームしてからのほうが高く売れますか</dt><dd>当社は取得後に自社で再設計を行うため、売却前のリフォームは原則不要です。かえって費用が回収できない場合があります。</dd></div>
      <div><dt>残置物があっても大丈夫ですか</dt><dd>状況により対応可能です。量と内容をお知らせください。負担区分は契約前に明示します。</dd></div>
      <div><dt>ローンが残っていても売却できますか</dt><dd>残債と売却価格の関係によります。金融機関との調整が必要になるため、まずは状況をお聞かせください。</dd></div>
      <div><dt>査定額はどのくらいで出ますか</dt><dd>資料が揃っている場合の目安をご案内できますが、確定した日数をお約束できる段階ではありません。<span class="chip chip--todo">運用確定後に明記 ／ DATA_REQUIRED</span></dd></div>
    </dl>
  </div>
</section>`;

export default {
  path: '/sell.html',
  nav: '/sell.html',
  priority: '0.95',
  title: 'SELL｜区分マンションの買取・無料査定のご相談 - KACHINOVA',
  description:
    '区分マンションの売却をご検討の方へ。KACHINOVA が直接買主となる買取をご提案します。査定は無料。再生後の価値を起点に評価するため、築年数や現況だけで判断しません。',
  jsonld: [breadcrumbLd([{ name: 'HOME', href: '/' }, { name: 'SELL', href: '/sell.html' }]), {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ja',
    mainEntity: [
      ['査定に費用はかかりますか', 'かかりません。査定後にご売却をお断りいただいても、費用は一切発生しません。'],
      ['賃貸中でも売却できますか', '可能な場合があります。賃貸借契約の内容を確認させていただいたうえでご回答します。'],
      ['リフォームしてからのほうが高く売れますか', '当社は取得後に自社で再設計を行うため、売却前のリフォームは原則不要です。'],
      ['残置物があっても大丈夫ですか', '状況により対応可能です。量と内容をお知らせください。負担区分は契約前に明示します。'],
      ['ローンが残っていても売却できますか', '残債と売却価格の関係によります。まずは状況をお聞かせください。'],
    ].map(([q, a]) => ({
      '@type': 'Question', name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }],
  body,
};
