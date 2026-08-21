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
   DATA_REQUIRED — every value below is unverified.
   `null` renders as a visible "確認中 / DATA_REQUIRED" chip so nothing false
   can ever reach the page by accident.
   -------------------------------------------------------------------------- */
export const COMPANY = {
  legalName: null,          // 商号（登記上の正式名称）
  representative: null,     // 代表者
  founded: null,            // 設立年月
  capital: null,            // 資本金
  address: null,            // 本店所在地
  tel: null,                // 代表電話
  email: null,              // 問い合わせメール
  license: null,            // 宅地建物取引業免許番号
  licenseHolder: null,      // 宅地建物取引士（専任）
  businesses: [
    '中古区分マンションの買取・再生・再販',
    '不動産の企画・設計・リノベーション',
    'スマートホーム／省エネ設備の導入企画',
    '不動産データ・AI活用に関する研究開発',
  ],
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
