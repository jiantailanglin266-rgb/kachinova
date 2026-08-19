import { SITE, COMPANY } from '../site.mjs';
import { breadcrumb, breadcrumbLd } from '../components.mjs';

const trail = [{ name: 'HOME', href: '/' }, { name: 'PRIVACY' }];

const S = [
  ['1. 基本方針', `${SITE.name}（以下「当社」）は、不動産の買取・再生・再販および関連する技術開発の事業を行うにあたり、
    お客様よりお預かりする個人情報の重要性を認識し、個人情報の保護に関する法律その他の関係法令およびガイドラインを遵守します。`],
  ['2. 取得する情報', `当社は、以下の情報を取得する場合があります。<br>
    ・お問い合わせフォーム、査定フォームにご入力いただいた氏名、メールアドレス、電話番号、ご住所<br>
    ・査定の対象となる不動産の所在地、建物名、専有面積、築年、利用状況等の情報<br>
    ・お取引に必要な範囲での本人確認書類および登記関係の情報<br>
    ・ウェブサイトの利用状況に関する情報（アクセスログ、閲覧ページ等）`],
  ['3. 利用目的', `取得した個人情報は、以下の目的の範囲内で利用します。<br>
    ・お問い合わせおよび査定のご依頼への回答、ご連絡<br>
    ・不動産の売買契約の締結、履行および付随する手続<br>
    ・法令にもとづく本人確認および記録の作成・保存<br>
    ・サービス改善のための統計的な分析（個人を識別しない形に加工したうえで実施）<br>
    ・当社からのご案内の送付（ご本人の同意がある場合に限ります）`],
  ['4. 第三者提供', `当社は、次の場合を除き、ご本人の同意なく個人情報を第三者へ提供しません。<br>
    ・法令にもとづく場合<br>
    ・人の生命、身体または財産の保護のために必要があり、ご本人の同意を得ることが困難な場合<br>
    ・国の機関等が法令の定める事務を遂行することに協力する必要がある場合`],
  ['5. 業務委託', `利用目的の達成に必要な範囲内で、個人情報の取扱いを外部に委託する場合があります。
    その際は、委託先に対して適切な監督を行います。`],
  ['6. 安全管理措置', `個人情報への不正アクセス、紛失、破壊、改ざんおよび漏えいを防止するため、
    組織的・人的・物理的・技術的な安全管理措置を講じます。`],
  ['7. 保有期間', `個人情報は、利用目的の達成に必要な期間および法令で定められた保存期間に限り保有し、
    その期間を経過した情報は、適切な方法により消去または廃棄します。`],
  ['8. 開示・訂正・削除等のご請求', `ご本人からの、保有個人データの開示、内容の訂正、追加、削除、利用停止、消去および
    第三者提供の停止のご請求に対しては、ご本人であることを確認のうえ、法令にもとづき遅滞なく対応します。
    ご請求は下記の窓口までお申し出ください。`],
  ['9. Cookie 等の利用', `当ウェブサイトでは、閲覧状況の把握やサイトの改善を目的として Cookie または類似の技術を
    利用する場合があります。ブラウザの設定により Cookie の受け取りを拒否することができますが、
    その場合、一部の機能が利用できなくなることがあります。<br>
    <span class="chip chip--todo">アクセス解析ツールの導入状況 ／ DATA_REQUIRED</span>
    <small>解析ツールを導入した際は、ツール名・提供事業者・オプトアウト方法を本項に追記します。</small>`],
  ['10. 本ポリシーの変更', `法令の改正や事業内容の変更に応じて、本ポリシーを変更することがあります。
    変更後の内容は、当ウェブサイトに掲載した時点から適用されます。`],
];

const body = `
<section class="band" style="padding-top:calc(var(--hdr-h) + var(--band))">
  <div class="shell shell--text">
    ${breadcrumb(trail).replace('<nav class="breadcrumb shell"', '<nav class="breadcrumb"').replace('breadcrumb"', 'breadcrumb" style="padding-top:0"')}
    <div class="reveal u-mt">
      <p class="eyebrow">PRIVACY POLICY</p>
      <h1 class="display display--xl u-mt-s">プライバシーポリシー</h1>
      <p class="lede u-mt-s">お預かりする個人情報の取り扱いについて、当社の方針を定めたものです。</p>
    </div>

    <dl class="data u-mt-l reveal">
      ${S.map(([h, p]) => `<div><dt>${h}</dt><dd>${p}</dd></div>`).join('\n      ')}
      <div>
        <dt>11. お問い合わせ窓口</dt>
        <dd>${[COMPANY.legalName, COMPANY.address, COMPANY.tel, COMPANY.email].filter(Boolean).join('<br>')
          || '<span class="chip chip--todo">確認中 ／ DATA_REQUIRED</span><small>事業者情報の確定後に掲載します。それまでは<a href="/contact.html">お問い合わせフォーム</a>よりご連絡ください。</small>'}</dd>
      </div>
      <div><dt>制定日</dt><dd><span class="chip chip--todo">確認中 ／ DATA_REQUIRED</span><small>正式な制定日を確定のうえ掲載します。</small></dd></div>
    </dl>

    <p class="form__note u-mt-l">本ポリシーは、事業者情報および個人情報保護管理者の確定にあわせて最終確認を行います。
    確定前の項目は推定で埋めず、確認中であることを明示しています。</p>
  </div>
</section>`;

export default {
  path: '/privacy.html',
  nav: '/privacy.html',
  priority: '0.3',
  title: 'PRIVACY POLICY｜プライバシーポリシー - KACHINOVA',
  description: 'KACHINOVA における個人情報の取得・利用目的・第三者提供・安全管理措置・開示請求の取り扱いについて定めたプライバシーポリシーです。',
  jsonld: [breadcrumbLd([{ name: 'HOME', href: '/' }, { name: 'PRIVACY', href: '/privacy.html' }])],
  body,
};
