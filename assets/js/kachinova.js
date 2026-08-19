/* ============================================================================
   KACHINOVA — site behaviour
   No framework, no dependencies. Everything degrades to a readable, static
   document if JS never runs.

   01 helpers
   02 header + drawer
   03 scroll reveal
   04 cinematic video loader (lazy, budget-aware, poster-first)
   05 signature motion: the REVALUE LINE
   06 counters
   07 forms
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, root) { return (root || doc).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }

  /* --------------------------------------------------------- 01 helpers --- */
  // Give every staggered / masked child its index so CSS can offset the delay.
  $$('.stagger, .line-mask-group, .motes, .flow').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      if (!child.style.getPropertyValue('--i')) child.style.setProperty('--i', i);
    });
  });
  $$('.line-mask').forEach(function (el, i) {
    if (!el.style.getPropertyValue('--i')) el.style.setProperty('--i', i % 6);
  });

  /* --------------------------------------------------- 02 header/drawer --- */
  var header = $('.site-header');
  var toggle = $('.nav-toggle');
  var drawer = $('.drawer');

  if (header) {
    var lastY = window.scrollY;
    var ticking = false;
    var onScroll = function () {
      var y = window.scrollY;
      header.classList.toggle('is-stuck', y > 24);
      // hide on downward scroll once past the first screen, reveal on up
      if (!drawer || !drawer.classList.contains('is-open')) {
        header.classList.toggle('is-hidden', y > window.innerHeight * 0.9 && y > lastY + 4);
      }
      lastY = y;
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }

  if (toggle && drawer) {
    var setDrawer = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      drawer.classList.toggle('is-open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      doc.body.classList.toggle('is-locked', open);
      if (open) header.classList.remove('is-hidden');
    };
    toggle.addEventListener('click', function () {
      setDrawer(toggle.getAttribute('aria-expanded') !== 'true');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setDrawer(false);
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        setDrawer(false); toggle.focus();
      }
    });
    setDrawer(false);
  }

  /* ------------------------------------------------------ 03 reveal ------- */
  var revealTargets = $$('.reveal, .reveal-soft, .stagger, .line-mask, .plan, [data-reveal]');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealIO.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    revealTargets.forEach(function (el) { revealIO.observe(el); });
  }

  /* ------------------------------------------ 04 cinematic video loader --- */
  /* Contract for markup:
       <div class="film__media">
         <img src="…poster.jpg" alt="">                       <- always present
         <video muted playsinline loop preload="none"
                data-video="assets/videos/kachinova-city"      <- no extension
                data-priority="high|auto">
       </div>
     Nothing downloads until the section is close to the viewport (except the
     hero). If the network is metered or slow, the poster is the final state. */

  var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var saveData = !!(conn && conn.saveData);
  var slowNet = !!(conn && /^(slow-2g|2g|3g)$/.test(conn.effectiveType || ''));
  var videoBudget = (reduceMotion || saveData || slowNet) ? 0 : Infinity;

  var videos = $$('video[data-video]');

  function attach(video) {
    if (video.dataset.loaded) return;
    video.dataset.loaded = '1';
    var base = video.dataset.video;
    [['webm', 'video/webm'], ['mp4', 'video/mp4']].forEach(function (pair) {
      var s = doc.createElement('source');
      s.src = base + '.' + pair[0];
      s.type = pair[1];
      video.appendChild(s);
    });
    video.addEventListener('loadeddata', function () {
      video.classList.add('is-ready');
    }, { once: true });
    // If every source fails the poster simply stays — nothing else to do.
    video.addEventListener('error', function () { video.classList.remove('is-ready'); }, true);
    video.load();
  }

  function tryPlay(video) {
    var p = video.play();
    if (p && typeof p.catch === 'function') p.catch(function () { /* autoplay blocked */ });
  }

  if (videos.length && videoBudget > 0) {
    videos.forEach(function (video) {
      if (video.dataset.priority === 'high') attach(video);
    });

    if ('IntersectionObserver' in window) {
      var playIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var v = entry.target;
          if (entry.isIntersecting) { attach(v); tryPlay(v); }
          else if (!v.paused) { v.pause(); }
        });
      }, { rootMargin: '35% 0px 35% 0px', threshold: 0.01 });
      videos.forEach(function (v) { playIO.observe(v); });
    } else {
      videos.forEach(function (v) { attach(v); tryPlay(v); });
    }

    doc.addEventListener('visibilitychange', function () {
      videos.forEach(function (v) {
        if (doc.hidden) { if (!v.paused) v.pause(); }
        else if (v.dataset.loaded && v.getBoundingClientRect().top < window.innerHeight) tryPlay(v);
      });
    });
  }

  /* --------------------------------------- 05 signature: the REVALUE LINE - */
  /* Measure each drawn path so the dash animation is always exactly its
     own length — the plan draws itself at a constant, calm speed. */
  $$('.plan').forEach(function (svg) {
    $$('.plan-new', svg).forEach(function (path) {
      var len = 0;
      try { len = Math.ceil(path.getTotalLength()); } catch (e) { len = 1400; }
      if (len) path.style.setProperty('--len', len);
    });
    $$('.plan-node', svg).forEach(function (node, i) { node.style.setProperty('--i', i); });
  });

  /* ------------------------------------------------------- 06 counters ---- */
  var counters = $$('[data-count]');
  if (counters.length) {
    var runCount = function (el) {
      var target = parseFloat(el.dataset.count);
      var dec = parseInt(el.dataset.decimals || '0', 10);
      var suffix = el.dataset.suffix || '';
      if (reduceMotion || isNaN(target)) { el.textContent = target.toFixed(dec) + suffix; return; }
      var dur = 1600, t0 = null;
      var step = function (ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec) + suffix;
        if (p < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var countIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          runCount(e.target); countIO.unobserve(e.target);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { countIO.observe(el); });
    } else { counters.forEach(runCount); }
  }

  /* ---------------------------------------------------------- 07 forms ---- */
  /* No backend is wired yet (see DATA_REQUIRED.md). The form validates on the
     client and, until an endpoint exists, hands the enquiry to the visitor's
     mail client rather than silently dropping it. */
  $$('form[data-form]').forEach(function (form) {
    var status = $('.form__status', form);
    var submit = form.querySelector('[type="submit"]');

    var setError = function (field, msg) {
      var wrap = field.closest('.field') || field.closest('.consent');
      if (!wrap) return;
      wrap.classList.toggle('has-error', !!msg);
      var err = $('.field__err', wrap);
      if (err) err.textContent = msg || '';
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    };

    var validate = function () {
      var ok = true, first = null;
      $$('[required]', form).forEach(function (field) {
        var val = (field.type === 'checkbox') ? field.checked : String(field.value || '').trim();
        var msg = '';
        if (!val) {
          msg = field.type === 'checkbox' ? 'ご同意が必要です。' : '入力してください。';
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field.value)) {
          msg = 'メールアドレスの形式をご確認ください。';
        } else if (field.type === 'tel' && !/^[0-9+\-()\s]{9,20}$/.test(field.value)) {
          msg = '電話番号の形式をご確認ください。';
        }
        setError(field, msg);
        if (msg) { ok = false; if (!first) first = field; }
      });
      if (first) first.focus();
      return ok;
    };

    form.addEventListener('submit', function (e) {
      // honeypot: bots fill everything
      var trap = form.querySelector('[name="_company_url"]');
      if (trap && trap.value) { e.preventDefault(); return; }

      var endpoint = form.getAttribute('action');
      var hasEndpoint = endpoint && endpoint !== '#' && endpoint.indexOf('DATA_REQUIRED') === -1;

      if (!validate()) { e.preventDefault(); return; }
      if (hasEndpoint) return;   // real endpoint: let the browser post it

      e.preventDefault();
      var to = form.dataset.mailto || '';
      var subject = form.dataset.subject || 'KACHINOVA — お問い合わせ';
      var lines = [];
      $$('input, select, textarea', form).forEach(function (f) {
        if (!f.name || f.name.charAt(0) === '_' || f.type === 'submit') return;
        var label = (f.closest('.field') && $('label', f.closest('.field')));
        var key = label ? label.childNodes[0].textContent.trim() : f.name;
        var val = f.type === 'checkbox' ? (f.checked ? 'はい' : 'いいえ') : f.value;
        if (val) lines.push(key + '：' + val);
      });
      var body = lines.join('\n');

      if (to) {
        window.location.href = 'mailto:' + to +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(body);
        if (status) {
          status.dataset.state = 'ok';
          status.textContent = 'メールソフトを起動しました。送信を完了してください。';
        }
      } else if (status) {
        status.dataset.state = 'err';
        status.textContent = '送信先が未設定です（DATA_REQUIRED）。お電話またはメールでご連絡ください。';
      }
      if (submit) { submit.disabled = true; setTimeout(function () { submit.disabled = false; }, 2500); }
    });

    $$('[required]', form).forEach(function (field) {
      field.addEventListener('blur', function () {
        if ((field.closest('.field') || field.closest('.consent') || {}).classList) validate();
      });
    });
  });

  /* Mark the document as enhanced (lets CSS opt into JS-only behaviour). */
  doc.documentElement.classList.add('js');
})();
