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
    pn: 'MB-0142',
    slug: 'mb-0142',
    file: 'mb-0142-motor-mount',
    model: 'mb-0142-motor-mount.stl',
    title: 'Motor mount face plate',
    finish: 'gold',
    lede: 'A NEMA 34 stepper had to hang off a gantry beam with no spacer stack, so the bearing boss and the mounting face are cut in the same setup.',
    prose: [
      'The assembly this replaces put a stamped bracket between the motor and the beam. It was cheap, and it was also why the axis lost repeatability every time the belt was retensioned: the bracket flexed exactly where it was thinnest.',
      'This is one milled plate instead. The bearing boss stands 14 mm proud of the mounting face, which puts the belt in plane with the drive pulley without a shim, and the bore and the four mounting holes are cut without releasing the part &mdash; so concentricity between them is a machine tolerance rather than a stack-up.',
      'Stock is 25 mm plate and the boss is what is left after facing the rest away. More material removed, but it takes a setup out of the job, and the shop quoted it under the two-piece version.',
    ],
    spec: [
      ['Material', '6061-T6'],
      ['Process', '3-axis mill, one setup'],
      ['Envelope', '132 &times; 96 &times; 26 mm'],
      ['Mass', '412 g'],
      ['Key tolerance', '&#8960;52 H7 bore'],
      ['Mesh', '5 712 triangles &middot; 279 KB'],
    ],
    constraints: [
      ['Envelope', '132 &times; 96 mm face, 26 mm behind the beam'],
      ['Bore', '&#8960;52 H7 for the drive bearing'],
      ['Interface', 'NEMA 34 pattern, 4 &times; M8'],
      ['Load', '340 N belt tension, reversing'],
      ['Must not', 'need a shim or spacer at assembly'],
    ],
    revisions: [
      ['A', 'First issue', 'Two-piece bracket and boss, dowelled together'],
      ['B', 'Boss made integral', 'The dowel stack was the flex path; one part removed it'],
      ['C', 'Corner radius 6 &rarr; 10 mm', 'Let the shop profile it with a cutter it already owns'],
      ['D', 'Released for quote', 'Chamfer 0.5 &times; 45&deg;, Ra 1.6 called on the mounting face'],
    ],
  },
  {
    pn: 'PL-0206',
    slug: 'pl-0206',
    file: 'pl-0206-v-belt-pulley',
    model: 'pl-0206-v-belt-pulley.glb',
    title: 'V-belt drive pulley',
    finish: 'clear',
    lede: 'An SPZ pulley for a 3 000 rpm spindle drive, turned from bar and balanced with the keyway already cut.',
    prose: [
      'Off-the-shelf pulleys this size arrive with a taper bush, which adds 22 mm of stack the head did not have. This one takes the belt straight onto a keyed bore.',
      'The groove is cut to SPZ profile, 34&deg; included, with the pitch diameter landed so the existing 850 mm belt still works. That constraint set the outside diameter before anything else was drawn.',
      'Balancing happens after the keyway, never before. Cutting a keyway into a balanced pulley is how you end up with a spindle that sings at 2 800 rpm.',
    ],
    spec: [
      ['Material', '6061-T6'],
      ['Process', 'CNC turn, keyseat'],
      ['Envelope', '&#8960;98 &times; 26 mm'],
      ['Mass', '268 g'],
      ['Key tolerance', '&#8960;18 H7 bore'],
      ['Mesh', 'glTF binary &middot; 155 KB'],
    ],
    constraints: [
      ['Belt', 'SPZ, existing 850 mm length retained'],
      ['Speed', '3 000 rpm continuous'],
      ['Bore', '&#8960;18 H7, 6 &times; 3.5 keyway to DIN 6885'],
      ['Balance', 'G6.3 at 3 000 rpm, after keyway'],
      ['Must not', 'add axial stack to the head'],
    ],
    revisions: [
      ['A', 'First issue', 'Taper-bush bore, as the catalogue part'],
      ['B', 'Keyed bore', 'Removed 22 mm of stack from the head'],
      ['C', 'Hub shortened 4 mm', 'Cleared the bearing cap at full travel'],
      ['D', 'Released', 'Balance spec written to follow the keyway'],
    ],
  },
  {
    pn: 'PC-0318',
    slug: 'pc-0318',
    file: 'pc-0318-planet-carrier',
    model: 'pc-0318-planet-carrier.stl',
    title: 'Planet carrier',
    finish: 'red',
    lede: 'A three-pin carrier for a 4:1 planetary reduction, with the pin bosses cut into the plate so there is no press fit to go loose.',
    prose: [
      'Pressed-in pins were the failure mode on the unit this replaces. After a few thousand reversals the interference relaxed and the pins started walking.',
      'Machining the bosses from solid costs material and cycle time, and it deletes an interference fit, a press operation, and an inspection step. 7075 because the web between the pin bores and the bolt circle is thin.',
      'The three pin positions are cut on the same circular interpolation as the centre bore, so pin-to-sun spacing is one machine&rsquo;s repeatability instead of three tolerances added together.',
    ],
    spec: [
      ['Material', '7075-T6'],
      ['Process', '3-axis mill, two setups'],
      ['Envelope', '&#8960;110 &times; 38 mm'],
      ['Mass', '604 g'],
      ['Key tolerance', '&plusmn;0.02 pin spacing'],
      ['Mesh', '8 812 triangles &middot; 430 KB'],
    ],
    constraints: [
      ['Ratio', '4:1, three planets'],
      ['Pin spacing', '&#8960;70 PCD, &plusmn;0.02 between any two'],
      ['Torque', '180 Nm peak, reversing'],
      ['Interface', '&#8960;30 H7 output bore, 6 &times; M6 on &#8960;96'],
      ['Must not', 'rely on an interference fit'],
    ],
    revisions: [
      ['A', 'First issue', 'Pressed pins on a &#8960;70 circle'],
      ['B', 'Pins made integral', 'Deleted the press fit and the inspection it needed'],
      ['C', 'Material 6061 &rarr; 7075', 'The web between bores was the limiting section'],
      ['D', 'Released', 'All pin bores called from one datum'],
    ],
  },
  {
    pn: 'MN-0421',
    slug: 'mn-0421',
    file: 'mn-0421-manifold-block',
    model: 'mn-0421-manifold-block.stl',
    title: 'Four-port manifold block',
    finish: 'black',
    lede: 'A four-port hydraulic manifold laid out so every fitting can be reached with a standard spanner, which is less obvious than it sounds.',
    prose: [
      'The galleries are cross-drilled and plugged, and the plugs sit on a face the assembly can still reach once the block is mounted.',
      'Port spacing is set by the fitting hex across corners plus a spanner swing, not by the port thread. Three of the four ports moved outward in rev B for exactly that reason.',
      'Hardcoat rather than clear anodize: the block lives in a wash-down area and the fittings come off often enough for the finish to matter.',
    ],
    spec: [
      ['Material', '6061-T6'],
      ['Process', '3-axis mill, cross-drilled'],
      ['Envelope', '96 &times; 64 &times; 42 mm'],
      ['Mass', '892 g'],
      ['Key tolerance', '210 bar working pressure'],
      ['Mesh', '5 736 triangles &middot; 280 KB'],
    ],
    constraints: [
      ['Ports', '4 &times; G1/4, one G3/8 supply'],
      ['Pressure', '210 bar working'],
      ['Access', 'every fitting reachable with a 22 mm spanner, mounted'],
      ['Finish', 'Type III hardcoat, 25 &micro;m'],
      ['Must not', 'come off the machine to service a port'],
    ],
    revisions: [
      ['A', 'First issue', 'Ports on a tight square pattern'],
      ['B', 'Ports spread 8 mm', 'Spanner swing sets the pattern, not thread spacing'],
      ['C', 'Plugs moved to one face', 'Service access from a single side'],
      ['D', 'Released', 'Hardcoat thickness and plug torques called out'],
    ],
  },
  {
    pn: 'SH-0537',
    slug: 'sh-0537',
    file: 'sh-0537-spindle-housing',
    model: 'sh-0537-spindle-housing.stl',
    title: 'Flanged spindle housing',
    finish: 'blue',
    lede: 'A bearing housing for an 80 mm spindle, bored and flanged in one chucking so concentricity is not a stack-up.',
    prose: [
      'Both bearing seats and the register diameter come off the same chucking. Releasing the part between them is where the runout was coming from on the housing this replaces.',
      'The flange is a separate feature but not a separate part: it is faced and drilled after the bores, with the register diameter as the datum for the bolt circle.',
      'Preload is set at the cap, not by the housing, so the housing carries a hard shoulder at one end and clearance at the other.',
    ],
    spec: [
      ['Material', '6061-T6'],
      ['Process', 'CNC turn, then mill'],
      ['Envelope', '&#8960;124 &times; 64 mm'],
      ['Mass', '1.14 kg'],
      ['Key tolerance', '0.008 mm TIR, seat to register'],
      ['Mesh', '5 016 triangles &middot; 245 KB'],
    ],
    constraints: [
      ['Bearings', '2 &times; 7008 angular contact, &#8960;68 seats'],
      ['Runout', '0.008 mm TIR seat to register'],
      ['Register', '&#8960;124 h6 to the machine face'],
      ['Preload', 'set at the cap, not the housing'],
      ['Must not', 'need shimming at assembly'],
    ],
    revisions: [
      ['A', 'First issue', 'Separate housing and bolted flange'],
      ['B', 'Single piece', 'Removed the joint the runout was living in'],
      ['C', 'Rear seat relieved', 'Let the cap own the preload'],
      ['D', 'Released', 'TIR called from the register datum'],
    ],
  },
  {
    pn: 'TL-0663',
    slug: 'tl-0663',
    file: 'tl-0663-chassis-rail',
    model: 'tl-0663-chassis-rail.stl',
    title: 'Formed chassis rail',
    finish: 'olive',
    lede: 'A 2.5 mm channel with the bend allowance worked back into the flat pattern, so the first part off the brake is the right length.',
    prose: [
      'Sheet metal parts fail at the flat pattern, not at the model. The k-factor here is measured off the shop&rsquo;s own tooling rather than taken from a table.',
      'The inside radius matches the 4 mm punch the shop already owns. Specifying a radius nobody has is the fastest way to get a part that is quietly bent to something else.',
      'Powder coat rather than anodize: the part is formed after cutting, and the coating has to cover a work-hardened bend.',
    ],
    spec: [
      ['Material', '5052-H32, 2.5 mm'],
      ['Process', 'Laser cut, brake formed'],
      ['Envelope', '168 &times; 46 &times; 30 mm'],
      ['Mass', '386 g'],
      ['Key tolerance', '&plusmn;0.5 mm formed length'],
      ['Mesh', '284 triangles &middot; 14 KB'],
    ],
    constraints: [
      ['Material', '5052-H32, 2.5 mm sheet'],
      ['Bend radius', '4.0 mm inside, the shop&rsquo;s existing punch'],
      ['k-factor', '0.42, measured on the shop&rsquo;s brake'],
      ['Length', '168 mm formed, &plusmn;0.5'],
      ['Must not', 'need tooling the shop does not own'],
    ],
    revisions: [
      ['A', 'First issue', '3 mm inside radius from a table'],
      ['B', 'Radius 3 &rarr; 4 mm', 'Matched the punch actually on the floor'],
      ['C', 'k-factor measured', 'The flat pattern had been 1.8 mm short'],
      ['D', 'Released', 'Powder coat spec added, bend lines marked'],
    ],
  },
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
                    aria-label="Interactive 3D model of part ${p.pn}. Drag to rotate, scroll to zoom. With the keyboard: arrow keys rotate, plus and minus zoom, R resets the view."></canvas>
            <div class="viewer__state">
              <span data-state-text>Loading specimen</span>
              <span class="viewer__bar"><i></i></span>
            </div>
            <!-- PLACEHOLDER MARKER. Delete with the issue strip. -->
            <p class="viewer__note">Placeholder mesh. Christopher's export drops in here.</p>
            <div class="viewer__readout">
              <span>Drag to rotate</span>
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

      <nav class="pager mt-8" aria-label="Other coupons">
        <a href="../${prev.slug}/"><span>Previous coupon</span><b>${prev.pn} · ${prev.title}</b></a>
        <a href="../${next.slug}/" class="is-next"><span>Next coupon</span><b>${next.pn} · ${next.title}</b></a>
      </nav>
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
      <span class="v"><a href="mailto:hello@example.com">hello@example.com</a></span>
      <span class="k">Location</span>
      <span class="v" style="font-size:0.875rem">City, Country</span>
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
