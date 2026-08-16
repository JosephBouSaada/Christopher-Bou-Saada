#!/usr/bin/env node
/**
 * Writes projects/<part-no>/index.html for every coupon.
 *
 * The OUTPUT is plain static HTML with nothing to build — edit those files
 * directly if you prefer. This script exists so the six of them stay
 * consistent while the content is still placeholder, and so a seventh can be
 * added by copying an entry rather than a page.
 *
 *   node tools/make-projects.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ------------------------------------------------------------- the coupons */

const PROJECTS = [
  {
    pn: 'WH-0784',
    slug: 'wh-0784',
    file: 'wh-0784-main-wheel',
    model: 'wh-0784-main-wheel.glb',
    title: 'A320 main wheel half',
    finish: 'violet',
    lede: 'The inboard half of a two-piece main wheel, with the bead seat and the tie-bolt flange turned in the same setup so the joint face stays square to the axis.',
    prose: [
      'A two-piece wheel is really one joint pretending to be a part. Everything that matters &mdash; bead retention, bearing alignment, how evenly the tie bolts load &mdash; comes back to whether the two halves meet on a face that is actually perpendicular to the bore.',
      'So the bead seat, the joint face and the bearing register are cut without releasing the part. Concentricity between them is then a machine tolerance rather than a stack of separate setups, and the halves interchange without being matched at assembly.',
      'The web is scalloped between the bolt bosses rather than left solid. It removes rotating mass where the section does no work, and it gives the inspector line of sight to the back of every boss without a mirror.',
    ],
    spec: [
      ['Material', '2014-T6 forging'],
      ['Process', 'CNC turn, 5-axis mill'],
      ['Envelope', '&#8960;262 &times; 177 mm'],
      ['Mass', '4.18 kg'],
      ['Key tolerance', '&#8960;140 H6 bearing register'],
      ['Mesh', '10 868 triangles &middot; 241 KB'],
    ],
    constraints: [
      ['Envelope', '&#8960;262 &times; 177 mm inside the brake stack'],
      ['Register', '&#8960;140 H6 for the bearing cup'],
      ['Interface', '12 &times; M12 tie bolts on &#8960;206 PCD'],
      ['Joint face', 'Perpendicular to the bore within 0.02 mm'],
      ['Must not', 'require the halves to be matched at assembly'],
    ],
    revisions: [
      ['A', 'First issue', 'Solid web, bosses blended into the flange'],
      ['B', 'Web scalloped', 'Rotating mass removed where the section carried no load'],
      ['C', 'Joint face reworked', 'Cut in the bore setup; matched halves were no longer needed'],
      ['D', 'Released for quote', 'Bead seat Ra 0.8 called, tie-bolt torque noted on the face'],
    ],
  },
];

/* ------------------------------------------------------------- the fragments */

const CHIPS = [
  ['natural', '#c3cacd', 'Bead blast', 'BB'],
  ['clear', '#9fb0ba', 'Clear anodize', 'AN-2C'],
  ['black', '#2a2d30', 'Hardcoat', 'AN-3K'],
  ['gold', '#d99a2b', 'Gold dye', 'AN-2G'],
  ['red', '#c93c2b', 'Red dye', 'AN-2R'],
  ['blue', '#2f79d8', 'Blue dye', 'AN-2B'],
  ['violet', '#8a52d6', 'Violet dye', 'AN-2V'],
  ['olive', '#6f9a3a', 'Olive dye', 'AN-2O'],
];

const ARROW = '<svg class="ico" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M1.5 7.5h11M8.5 3.5l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="square"/></svg>';

function dyerack(active) {
  return CHIPS.map(([key, hex, label, code]) =>
    `        <button type="button" class="chip" data-finish="${key}" style="--chip:${hex}" aria-pressed="${key === active}">
          <span>${label}<small>${code}</small></span>
        </button>`).join('\n');
}

function rows(pairs) {
  return pairs.map(([k, v]) =>
    `            <tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('\n');
}

function revrows(revs) {
  return revs.map(([r, what, why]) =>
    `            <tr><th scope="row" class="rev">Rev ${r}</th><td>${what}</td><td>${why}</td></tr>`).join('\n');
}

function page(p, prev, next) {
  const title = `${p.title} · ${p.pn} — Christopher Bou Saada`;
  return `<!doctype html>
<html lang="en" class="no-js" data-finish="${p.finish}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${p.lede.replace(/&mdash;/g, '—').replace(/"/g, '&quot;')}">
<meta name="theme-color" content="#16181a">
<meta property="og:title" content="${p.title} · ${p.pn}">
<meta property="og:description" content="${p.lede.replace(/&mdash;/g, '—').replace(/"/g, '&quot;')}">
<meta property="og:type" content="article">
<link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="../../assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/fonts/azeret-mono-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="../../assets/css/site.css">
<script type="importmap">
{
  "imports": {
    "three": "../../vendor/three/three.module.min.js",
    "three/addons/": "../../vendor/three/"
  }
}
</script>
<script defer src="../../assets/js/finishes.js"></script>
<script defer src="../../assets/js/site.js"></script>
</head>
<body>
<!--
DIRECTION CONTRACT
THESIS: Every project is a machined sample coupon you can pick up and re-finish, not a render tile; this refuses the dark portfolio grid of glowing cards.
OWN-WORLD: Type III hardcoat graphite ground, bead-blast aluminium type, a full Type II anodize dye rack carrying the page accent; Archivo stamped wide, Azeret Mono spec rows; drilled coupons, hairline rules, one 8px cell governing every dimension.
STORY: A recruiter reads what the part had to do, turns the geometry, and follows the revision table to see how the engineer thinks.
FIRST VIEWPORT: The coupon's own sheet — title and lede left, the full specification stacked right, the specimen viewer running full width beneath with its dye rack.
FORM: The Finish Sample Card, candidate 6 of 7 grounded directions, seed key 66124021.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->
<a class="skip" href="#specimen">Skip to the specimen</a>

<!-- PLACEHOLDER MARKER. Delete this block once Christopher's real material is in. -->
<div class="issue-strip">
  <b>Uncontrolled copy — not for issue</b>
  <span>This coupon is placeholder content pending Christopher's material.</span>
</div>

<header class="nameplate">
  <a class="nameplate__mark" href="../../">
    <b>Christopher Bou Saada</b>
    <em>Mechanical design</em>
  </a>
  <nav class="nameplate__nav" aria-label="Primary">
    <a href="../../#work" aria-current="page">Work</a>
    <a href="../../#capability" class="hide-sm">Capability</a>
    <a href="../../#contact" class="is-primary">Contact</a>
  </nav>
</header>

<main>
  <section class="band band--tight">
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="../../">Rack</a>
        ${ARROW}
        <span aria-current="page">${p.pn}</span>
      </nav>

      <div class="sheet sheet--specimen">
        <div class="sheet__title">
          <h1 class="display">${p.title}</h1>
          <p class="lede">${p.lede}</p>
          <p class="stamp mt-4">${p.pn} &middot; ${p.spec[0][1]} &middot; ${p.spec[2][1]}</p>
        </div>

        <div class="specimen" id="specimen">
          <div class="viewer"
               data-model="../../assets/models/${p.model}"
               data-fit="1.12">
            <img class="viewer__poster" src="../../assets/renders/${p.file}.webp"
                 alt="Rendered isometric view of ${p.pn}, ${p.title.toLowerCase()}.">
            <canvas class="viewer__canvas" tabindex="0" role="application"
                    aria-label="Interactive 3D model of part ${p.pn}. Drag to turn the part and view it from any angle, scroll to zoom. With the keyboard: arrow keys turn it, plus and minus zoom, R resets the view."></canvas>
            <div class="viewer__state">
              <span data-state-text>Loading specimen</span>
              <span class="viewer__bar"><i></i></span>
            </div>
            <!-- PLACEHOLDER MARKER. Delete with the issue strip. -->
            <p class="viewer__note">Placeholder mesh. Christopher's export drops in here.</p>
            <div class="viewer__readout">
              <span>Drag to turn it</span>
              <b>&middot;</b>
              <span class="pointer-fine">Scroll to zoom</span>
              <span class="pointer-coarse">Pinch to zoom</span>
              <button type="button" class="viewer__reset">Reset</button>
            </div>
          </div>

          <div class="dyerack dyerack--flat">
            <p class="dyerack__head" id="dye-rack-label">Finish</p>
            <div class="dyerack__list" role="group" aria-labelledby="dye-rack-label">
${dyerack(p.finish)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================================================== what it is -->
  <section class="band" aria-labelledby="read-title">
    <div class="wrap">
      <div class="two-col">
        <div>
          <h2 class="vh" id="read-title">About this part</h2>
          <div class="prose">
            ${p.prose.map((t) => `<p>${t}</p>`).join('\n            ')}
          </div>
        </div>

        <table class="spectable">
          <caption>Specification &middot; ${p.pn}</caption>
          <tbody>
${rows(p.spec)}
            <tr><th scope="row">Finish</th><td data-live-process>&mdash;</td></tr>
            <tr><th scope="row">Roughness</th><td data-live-ra>&mdash;</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- ===================================================== back panel -->
  <section class="band" aria-labelledby="brief-title">
    <div class="wrap">
      <div class="two-col">
        <table class="spectable">
          <caption id="brief-title">What it had to do</caption>
          <tbody>
${rows(p.constraints)}
          </tbody>
        </table>

        <table class="spectable">
          <caption>Revision history</caption>
          <thead>
            <tr><th scope="col">Rev</th><th scope="col">Change</th><th scope="col">Why</th></tr>
          </thead>
          <tbody>
${revrows(p.revisions)}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- ===================================================== plates -->
  <section class="band" aria-labelledby="plates-title">
    <div class="wrap">
      <div class="band__head">
        <h2 class="display" id="plates-title">Plates</h2>
        <p>Rendered from the same model, in the finish this part ships in.</p>
      </div>
      <div class="plates">
        <figure class="plate seat">
          <img src="../../assets/renders/${p.file}.webp" alt="Isometric view of ${p.pn}." loading="lazy" width="960" height="720">
          <figcaption>Isometric</figcaption>
        </figure>
        <figure class="plate seat">
          <img src="../../assets/renders/${p.file}-front.webp" alt="Elevation view of ${p.pn}." loading="lazy" width="960" height="720">
          <figcaption>Elevation</figcaption>
        </figure>
        <figure class="plate seat">
          <img src="../../assets/renders/${p.file}-top.webp" alt="View of ${p.pn} from above." loading="lazy" width="960" height="720">
          <figcaption>From above</figcaption>
        </figure>
      </div>

${prev === p ? '' : `      <nav class="pager mt-8" aria-label="Other coupons">
        <a href="../${prev.slug}/"><span>Previous coupon</span><b>${prev.pn} · ${prev.title}</b></a>
        <a href="../${next.slug}/" class="is-next"><span>Next coupon</span><b>${next.pn} · ${next.title}</b></a>
      </nav>`}
    </div>
  </section>
</main>

<footer class="titleblock" id="contact">
  <div class="titleblock__grid">
    <div class="titleblock__cell titleblock__issuer">
      <span class="k">Issued by</span>
      <span class="v">Christopher Bou Saada</span>
      <p class="stamp" style="text-transform:none;letter-spacing:0.02em;line-height:1.6">
        Available for mechanical design work and full-time engineering roles.
      </p>
    </div>
    <div class="titleblock__cell">
      <span class="k">Email</span>
      <span class="v"><a href="mailto:ChristopherBouSaada@gmail.com">ChristopherBouSaada@gmail.com</a></span>
      <span class="k">Location</span>
      <span class="v" style="font-size:0.875rem">Salem, NH</span>
    </div>
    <div class="titleblock__cell">
      <span class="k">Drawing</span>
      <span class="v" style="font-size:0.875rem">${p.pn} · Rev ${p.revisions[p.revisions.length - 1][0]}</span>
      <span class="k">Sheet</span>
      <span class="v" style="font-size:0.875rem">1 of 1</span>
    </div>
  </div>
  <div class="titleblock__foot">
    <span>${p.pn} · Sheet 1 of 1</span>
    <span>Drawn by C. Bou Saada</span>
    <span>&copy; <span data-year>2026</span> Christopher Bou Saada</span>
  </div>
</footer>

<div id="finish-live" class="vh" role="status" aria-live="polite"></div>
</body>
</html>
`;
}

/* ---------------------------------------------------------------- emit */

PROJECTS.forEach((p, i) => {
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const dir = path.join(ROOT, 'projects', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(p, prev, next));
  console.log(`projects/${p.slug}/index.html`);
});
