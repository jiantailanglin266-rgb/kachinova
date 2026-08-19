const body = `
<section class="hero" style="min-height:80svh">
  <div class="hero__media">
    <picture>
      <source type="image/webp" srcset="/assets/img/video-posters/kachinova-city-1280.webp">
      <img src="/assets/img/video-posters/kachinova-city-1280.jpg" alt="" width="1920" height="1080">
    </picture>
  </div>
  <div class="hero__scrim"></div>
  <div class="shell hero__inner">
    <p class="eyebrow">ERROR 404</p>
    <h1 class="display display--xxl u-mt-s">Page not found.</h1>
    <p class="jp-display jp-display--sm u-mt-s">お探しのページは見つかりませんでした。</p>
    <p class="lede u-mt-s">URL が変更されたか、削除された可能性があります。</p>
    <div class="btn-row u-mt-l">
      <a class="btn" href="/">HOME<i></i></a>
      <a class="btn" href="/business.html">BUSINESS<i></i></a>
      <a class="btn btn--cyan" href="/sell.html">SELL<i></i></a>
    </div>
  </div>
</section>`;

export default {
  path: '/404.html',
  nav: '/',
  noindex: true,
  title: '404 — ページが見つかりません｜KACHINOVA',
  description: 'お探しのページは見つかりませんでした。',
  body,
};
