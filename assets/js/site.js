/* ==========================================================================
   The finish sample card — page behaviour.

   Classic script on purpose: the page must work on anything, and the heavy
   module (three.js) is pulled in only when a specimen actually scrolls into
   view.
   ========================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  /* ---- the dye rack ---------------------------------------------------- */
  /* One source of truth for every finish: the chip colour, the text ink that
     clears 4.5:1 on the plate, the PBR values the viewer renders, and the
     real spec rows the stamp shows. Picking a chip changes all of them. */

  var FINISHES = window.__FINISHES;

  var viewers = [];
  var currentFinish = document.documentElement.dataset.finish || 'gold';

  function setFinish(name, announce) {
    var f = FINISHES[name];
    if (!f) return;
    currentFinish = name;

    var root = document.documentElement;
    root.style.setProperty('--dye', f.chip);
    root.style.setProperty('--ink', f.ink);
    root.dataset.finish = name;

    document.querySelectorAll('.chip').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.finish === name));
    });

    document.querySelectorAll('[data-live-finish]').forEach(function (el) {
      el.textContent = f.code;
    });
    document.querySelectorAll('[data-live-process]').forEach(function (el) {
      el.textContent = f.process;
    });
    document.querySelectorAll('[data-live-ra]').forEach(function (el) {
      el.textContent = f.ra + ' \u00b5m';
    });

    viewers.forEach(function (v) { if (v && v.setFinish) v.setFinish(name); });

    var live = document.getElementById('finish-live');
    if (live && announce) live.textContent = f.process + ', roughness Ra ' + f.ra + ' micrometres.';
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.chip') : null;
    if (!btn) return;
    setFinish(btn.dataset.finish, true);
  });

  /* ---- specimens load on intent ---------------------------------------- */

  var loader = null;
  function loadViewerModule() {
    if (!loader) loader = import('./viewer.js');
    return loader;
  }

  function supportsWebGL() {
    try {
      var c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (c.getContext('webgl2') || c.getContext('webgl')));
    } catch (err) { return false; }
  }

  var viewerRoots = Array.prototype.slice.call(document.querySelectorAll('.viewer'));

  if (viewerRoots.length) {
    if (!supportsWebGL()) {
      viewerRoots.forEach(function (root) {
        root.classList.add('is-failed');
        var t = root.querySelector('[data-state-text]');
        if (t) t.textContent = 'No 3D in this browser \u2014 showing the rendered plate';
        var bar = root.querySelector('.viewer__bar');
        if (bar) bar.style.display = 'none';
      });
    } else {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          vio.unobserve(entry.target);
          var root = entry.target;
          root.dataset.finish = currentFinish;
          loadViewerModule().then(function (mod) {
            var v = mod.mountViewer(root);
            if (v) viewers.push(v);
          }).catch(function () {
            root.classList.add('is-failed');
            var t = root.querySelector('[data-state-text]');
            if (t) t.textContent = 'Specimen viewer unavailable \u2014 showing the rendered plate';
          });
        });
      }, { rootMargin: '300px' });
      viewerRoots.forEach(function (r) { vio.observe(r); });
    }
  }

  /* ---- the rack seats ---------------------------------------------------- */
  /* One authored moment: coupons drop into the rack the way a card seats into
     a fan deck. Everything else on the page is state feedback. */

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      'IntersectionObserver' in window) {
    var seats = document.querySelectorAll('.seat');
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sio.unobserve(entry.target);
        var siblings = Array.prototype.slice.call(
          entry.target.parentElement.querySelectorAll('.seat'));
        var i = siblings.indexOf(entry.target);
        entry.target.style.setProperty('--seat-delay', Math.min(i, 7) * 55 + 'ms');
        entry.target.classList.add('is-seated');
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    seats.forEach(function (s) { sio.observe(s); });
  } else {
    document.querySelectorAll('.seat').forEach(function (s) { s.classList.add('is-seated'); });
  }

  /* ---- issue date in the title block ------------------------------------ */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  setFinish(currentFinish, false);
}());
