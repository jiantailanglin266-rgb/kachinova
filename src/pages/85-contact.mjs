import { SITE, COMPANY } from '../site.mjs';
import { pageHero, breadcrumb, breadcrumbLd, formNote, honeypot } from '../components.mjs';

const trail = [{ name: 'HOME', href: '/' }, { name: 'CONTACT' }];

const body = `
${pageHero({
  eyebrow: 'CONTACT ／ お問い合わせ',
  title: 'Contact.',
  jp: '事業・技術・採用に関するお問い合わせ',
  lede: '仕入・販売・技術連携・取材・採用など、KACHINOVA へのご連絡はこちらから。区分マンションのご売却・査定については SELL ページの専用フォームをご利用ください。',
  shot: 'city',
})}

<div class="shell">${breadcrumb(trail).replace('<nav class="breadcrumb shell"', '<nav class="breadcrumb"')}</div>

<section class="band--tight" aria-labelledby="route-t">
  <div class="shell">
    <h2 class="sr-only" id="route-t">お問い合わせ窓口</h2>
    <div class="tiles tiles--2 stagger">
      <a class="tile" href="/sell.html" style="--i:0">
        <span class="num">FOR OWNERS</span>
        <h3>Sell your<br>property</h3>
        <p class="tile__jp">区分マンションのご売却・無料査定</p>
        <p>お住まいの売却をご検討中の方は、専用フォームからご相談ください。</p>
        <span class="cta-split__go">SELL<i></i></span>
      </a>
      <div class="tile" style="--i:1">
        <span class="num">FOR BUSINESS</span>
        <h3>General<br>enquiry</h3>
        <p class="tile__jp">事業・技術連携・取材・採用</p>
        <p>下記フォームよりご連絡ください。内容を確認のうえ、担当者よりご返信します。</p>
      </div>
    </div>
  </div>
</section>

<section class="band section--light" id="form" aria-labelledby="form-t">
  <div class="shell shell--narrow">
    <div class="reveal u-mb">
      <p class="eyebrow eyebrow--gold">ENQUIRY FORM</p>
      <h2 class="display display--xl u-mt-s" id="form-t">Send us<br>a message.</h2>
    </div>

    <form class="form reveal" data-form="contact" method="post" action="#"
          data-mailto="${COMPANY.email || ''}" data-subject="KACHINOVA｜お問い合わせ" novalidate>
      ${honeypot()}

      <div class="field">
        <label for="f-type">お問い合わせ種別<span class="req">REQUIRED</span></label>
        <select id="f-type" name="type" required>
          <option value="">選択してください</option>
          <option>物件の仕入・売却のご提案</option>
          <option>再生物件の購入について</option>
          <option>技術連携・共同開発（KACHINOVA LAB）</option>
          <option>協業・パートナーシップ</option>
          <option>取材・メディア</option>
          <option>採用について</option>
          <option>その他</option>
        </select>
        <p class="field__err" role="alert"></p>
      </div>

      <div class="form__grid form__grid--2">
        <div class="field">
          <label for="f-name">お名前<span class="req">REQUIRED</span></label>
          <input type="text" id="f-name" name="name" required autocomplete="name" placeholder="価値野 太郎">
          <p class="field__err" role="alert"></p>
        </div>
        <div class="field">
          <label for="f-company">会社名・団体名</label>
          <input type="text" id="f-company" name="company" autocomplete="organization" placeholder="株式会社〇〇">
          <p class="field__err" role="alert"></p>
        </div>
        <div class="field">
          <label for="f-email">メールアドレス<span class="req">REQUIRED</span></label>
          <input type="email" id="f-email" name="email" required autocomplete="email" placeholder="you@example.com">
          <p class="field__err" role="alert"></p>
        </div>
        <div class="field">
          <label for="f-tel">電話番号</label>
          <input type="tel" id="f-tel" name="tel" autocomplete="tel" placeholder="03-0000-0000">
          <p class="field__err" role="alert"></p>
        </div>
      </div>

      <div class="field">
        <label for="f-message">お問い合わせ内容<span class="req">REQUIRED</span></label>
        <textarea id="f-message" name="message" required placeholder="ご用件をご記入ください。"></textarea>
        <p class="field__err" role="alert"></p>
      </div>

      <div class="consent">
        <input type="checkbox" id="f-consent" name="consent" required>
        <label for="f-consent"><a href="/privacy.html">プライバシーポリシー</a>に同意のうえ送信します。<span class="req">REQUIRED</span></label>
        <p class="field__err" role="alert"></p>
      </div>

      ${formNote()}

      <div class="btn-row">
        <button class="btn btn--lg btn--solid" type="submit">送信する<i></i></button>
      </div>
      <p class="form__status" role="status" aria-live="polite"></p>
    </form>

    <dl class="data u-mt-l reveal">
      <div><dt>電話 ／ TEL</dt><dd>${COMPANY.tel || '<span class="chip chip--todo">確認中 ／ DATA_REQUIRED</span>'}</dd></div>
      <div><dt>メール ／ EMAIL</dt><dd>${COMPANY.email || '<span class="chip chip--todo">確認中 ／ DATA_REQUIRED</span>'}</dd></div>
      <div><dt>所在地 ／ ADDRESS</dt><dd>${COMPANY.address || '<span class="chip chip--todo">確認中 ／ DATA_REQUIRED</span>'}</dd></div>
    </dl>
  </div>
</section>`;

export default {
  path: '/contact.html',
  nav: '/contact.html',
  priority: '0.8',
  title: 'CONTACT｜お問い合わせ - KACHINOVA',
  description:
    'KACHINOVA へのお問い合わせ。物件の仕入・販売、技術連携、協業、取材、採用に関するご連絡を承ります。区分マンションのご売却・無料査定は SELL ページから。',
  jsonld: [breadcrumbLd([{ name: 'HOME', href: '/' }, { name: 'CONTACT', href: '/contact.html' }]), {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'CONTACT — KACHINOVA',
    url: SITE.origin + '/contact.html',
    inLanguage: 'ja',
  }],
  body,
};
