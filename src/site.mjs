/* KACHINOVA — site-wide constants.
   Anything that is not yet a confirmed fact lives in DATA_REQUIRED and is
   rendered as an explicit placeholder, never invented. See DATA_REQUIRED.md. */

export const SITE = {
  name: 'KACHINOVA',
  nameJa: 'KACHINOVA（カチノヴァ）',
  tagline: 'REAL ESTATE TECHNOLOGY',
  claim: 'REINVENTING THE VALUE OF LIVING.',
  claimJa: '住まいの価値を、再発明する。',
  sub: 'AI × REAL ESTATE × SMART LIVING',
  // Replace with the production origin before launch.
  origin: 'https://kachinova.co.jp',
  locale: 'ja_JP',
};

/* --------------------------------------------------------------------------
   Confirmed company information. Anything still `null` renders as a visible
   "確認中 / DATA_REQUIRED" chip — it is never invented, never guessed, and
   never quietly omitted. See DATA_REQUIRED.md.
   -------------------------------------------------------------------------- */
export const COMPANY = {
  legalName: '株式会社KACHINOVA',
  representative: null,     // 代表者 — 未提供
  founded: '2025年',
  capital: '10,000,000円',
  postalCode: '150-0031',
  address: '東京都渋谷区桜丘町29-24',
  tel: '03-6821-9132',
  fax: '03-6821-9132',
  email: 'info@kachinova.com',
  // 宅地建物取引業法上、広告には免許番号の表示義務があります。
  // 支給された「東京都（1）114064」を法定の表記に展開したもの。
  // 東京都内のみに事務所を置く業者の免許は「東京都知事」免許、(1) は更新回数。
  // ★免許証の記載と一字一句一致しているか、公開前に必ず照合してください。
  license: '東京都知事（1）第114064号',
  licenseHolder: null,      // 専任の宅地建物取引士 — 未提供
  // 登記および会社案内の記載どおり。サイトの物語は現在この中の
  // 「不動産事業／売買事業」に相当する部分だけを扱っています。
  businesses: [
    '不動産事業',
    '民泊事業',
    '賃貸管理事業',
    '売買事業',
    'サブリース事業',
  ],
};

/* Structured-data address, emitted only because every part of it is confirmed. */
export const POSTAL = {
  '@type': 'PostalAddress',
  postalCode: COMPANY.postalCode,
  addressRegion: '東京都',
  addressLocality: '渋谷区',
  streetAddress: '桜丘町29-24',
  addressCountry: 'JP',
};

/* --------------------------------------------------------------------------
   SEO / MEO の軸。キーワードは「詰め込む」のではなく、実体のあるページを
   1本立てて、そのページのタイトル・見出し・本文・構造化データを一致させる。
   -------------------------------------------------------------------------- */
export const AREA = {
  /* 本社所在地は確定事実。対応エリアは事業判断なので DATA_REQUIRED 扱い。
     ★ 現在は「渋谷区を中心とした東京23区」と記載しています。実際の対応範囲と
       異なる場合は必ず修正してください（誇大広告になり得ます）。 */
  base: '渋谷区',
  primary: ['渋谷区'],
  secondary: ['目黒区', '世田谷区', '港区', '新宿区', '中央区', '品川区', '文京区', '台東区'],
  statement: '渋谷区を中心とした東京23区',
  confirmed: false,
};

export const NAV = [
  { href: '/about.html',      en: 'ABOUT',      ja: '私たちについて' },
  { href: '/business.html',   en: 'BUSINESS',   ja: '事業内容' },
  { href: '/projects.html',   en: 'PROJECTS',   ja: '実績' },
  { href: '/technology.html', en: 'TECHNOLOGY', ja: 'テクノロジー' },
  { href: '/company.html',    en: 'COMPANY',    ja: '会社概要' },
  { href: '/contact.html',    en: 'CONTACT',    ja: 'お問い合わせ' },
];

export const NAV_MORE = [
  { href: '/shibuya.html', en: 'SHIBUYA', ja: '渋谷の不動産' },
  { href: '/lab.html',     en: 'LAB',     ja: '研究開発' },
  { href: '/journal.html', en: 'JOURNAL', ja: 'ジャーナル' },
  { href: '/sell.html',    en: 'SELL',    ja: '売却・査定' },
];

/* The six films. `shot` maps to assets/videos/kachinova-<shot>.{webm,mp4}
   and assets/img/video-posters/kachinova-<shot>*.{webp,jpg}. */
export const FILMS = {
  city:    { n: '01', label: 'THE CITY',        alt: '夕暮れの東京。ガラス張りの高層建築の間から、眼下に街の灯りが広がる。' },
  ai:      { n: '02', label: 'AI × REAL ESTATE', alt: '静かな和の室内。床と壁に沿って細い解析線が走る。' },
  revalue: { n: '03', label: 'RE:VALUE',        alt: '内装のない既存住戸が、木質で仕上げられた空間へと移り変わる。' },
  smart:   { n: '04', label: 'SMART LIVING',    alt: '夕暮れの住戸。間接照明が灯り、窓の外に街の光が見える。' },
  eco:     { n: '05', label: 'ECO HOUSE',       alt: '朝の光が差し込む木の床の室内と、窓の外の東京の街並み。' },
  future:  { n: '06', label: 'KACHINOVA FUTURE', alt: '夜。灯りのともる住戸から見下ろす、東京の夜景。' },
};
