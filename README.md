# Christopher Bou Saada — CAD portfolio

A static site for GitHub Pages. No build step, no framework, no npm install
needed to deploy. Every project is a machined **coupon**: a spec stamp, an
interactive 3D model the visitor can rotate and re-finish, and a revision
history.

---

## ⚠ Before this goes live

The site currently ships with **placeholder content**, marked by the red
`UNCONTROLLED COPY — NOT FOR ISSUE` strip at the top of every page. Nothing
below is real. Replace it, then delete the strip.

### Everything that must be replaced

| Where | What is fake | Replace with |
|---|---|---|
| `index.html` nameplate | "Mechanical design" | His actual discipline / title |
| Footer, `index.html` | "Available for mechanical design work and full-time engineering roles." | Confirm this is true |
| `index.html` → Capability | CAD packages, processes, materials, finishes | What he actually uses |
| `index.html` → Capability | "How a part gets issued" (5 stages) | His real working method, or delete the table |
| All seven projects | Titles, part numbers, specs, masses, tolerances, constraints, revision histories | Real projects |
| `assets/models/*` | Generated stand-in geometry | His CAD exports |
| `assets/renders/*` | Renders of the stand-ins | Renders of his parts (or regenerate — see below) |

**Nothing on this site invents a client, employer, award, testimonial, or
years-of-experience figure.** Keep it that way: an empty rack slot is better
than a fabricated one, which is why the "slot reserved" ghost coupons exist.

### Removing the draft strip

Delete every block that looks like this (one per page, 4 lines):

```html
<div class="issue-strip">
  <b>Uncontrolled copy — not for issue</b>
  <span>…</span>
</div>
```

The hero automatically reclaims the height when it goes.

---

## The models

### What Christopher needs to export

Native `.SLDPRT`, `.SLDASM`, and `.STEP` files cannot be opened by a browser.
Each part must be exported to a web format first:

| Format | How | Notes |
|---|---|---|
| **STL** (recommended) | Any CAD package, File → Save As / Export | Geometry only, no colour. The site applies the finish, so every part looks consistent. **Use binary STL, not ASCII** — ASCII is roughly 5× larger. |
| **GLB / glTF** | Fusion 360 exports directly; SolidWorks needs a plugin or a Blender round-trip | Carries its own materials and colours |

The loader picks the path from the file extension. Both are already exercised:
`PL-0206` ships as GLB, the rest as STL.

### Export settings that matter

- **Resolution / deviation:** fine enough to hide facets on curves, coarse
  enough to stay under about **2 MB**. In SolidWorks, "Fine" is usually right;
  set deviation around 0.05 mm and angle around 10°. The specimens here are
  200–900 KB.
- **Units:** millimetres. The viewer auto-frames, so absolute scale does not
  matter, but consistency does.
- **Orientation:** whatever face should be "up" when the part first appears.
  The viewer keeps the model's own axes.
- **One body per file.** Assemblies export as a single merged mesh.

### Adding a model to a page

Drop the file in `assets/models/` and point the viewer at it:

```html
<div class="viewer" data-model="../../assets/models/your-part.stl">
```

Optional attributes:

| Attribute | Does |
|---|---|
| `data-fit="1.4"` | Framing. Higher = more air around the part. Hero uses `1.72`, project bays `1.12` |
| `data-shift="-0.17,0.15"` | Shifts the part off-centre (fractions of width, height). Desktop only — used to seat the hero specimen up and right of the headline |
| `data-spin="off"` | Disables the slow auto-rotate |

---

## The images

Every model needs a **poster** — the still shown before the mesh loads, in the
coupon grid, and to anyone without WebGL.

**Regenerate them from the models automatically:**

```bash
node tools/make-posters.mjs
```

This renders each specimen through the site's own viewer at three angles
(isometric, elevation, from above) and writes WebP with transparency to
`assets/renders/`. It needs a Chromium; set `PW_CHROME=/path/to/chrome` if it
cannot find one.

**Or supply them by hand** — `assets/renders/<name>.webp`, 4:3, ideally
960 × 720 or larger, transparent or dark background.

---

## Adding a project

1. Export the model to `assets/models/`.
2. Render its posters (`node tools/make-posters.mjs`, after adding it to the
   `SPECIMENS` list in that file).
3. Copy an existing folder in `projects/` and edit the HTML — it is plain
   static markup, nothing to compile.
4. Add a coupon to the rack in `index.html`: copy one `<a class="coupon seat">`
   block and change the link, image, title, and stamped rail.
5. Delete one `coupon--ghost` block, or leave them — they are the deliberate
   "slot reserved" state.

If you would rather keep the seven project pages consistent, edit the `PROJECTS`
array in `tools/make-projects.mjs` and run `node tools/make-projects.mjs`. That
script **writes** the static pages; it is never needed to serve them.

---

## Deploying to GitHub Pages

```bash
git init
git add .
git commit -m "Christopher Bou Saada portfolio"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

Then **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.

Every path in the site is relative, so it works both at
`username.github.io` (user site) and `username.github.io/repo/` (project
site) with no configuration. `.nojekyll` is already present so GitHub serves
the files as-is.

For a custom domain, add a `CNAME` file containing the domain and set it in
Settings → Pages.

---

## Local preview

Because of ES modules and the import map, `file://` will not work. Any static
server does:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## How it is put together

```
index.html              the rack — hero specimen, seven coupons, capability, title block
projects/<part-no>/     one page per coupon; plain static HTML
assets/css/site.css     the whole design system, one file, commented by section
assets/js/finishes.js   the dye rack: chip colour, text ink, PBR values, spec rows
assets/js/site.js       page behaviour; classic script, works everywhere
assets/js/viewer.js     the 3D viewer; ES module, loaded only when a model scrolls into view
assets/models/          .stl / .glb exports
assets/renders/         poster plates
assets/fonts/           Archivo + Azeret Mono, self-hosted
vendor/three/           three.js r169, pinned and vendored — no CDN at runtime
tools/                  generators for the placeholder geometry, posters, and project pages
```

**Things worth knowing before editing:**

- **The page's accent colour is the selected finish.** Picking a dye chip
  rewrites `--dye` / `--ink` on `<html>`, retints buttons, links, and headline
  accents, updates the Finish and Roughness rows, and re-materialises the 3D
  model. One table — `assets/js/finishes.js` — drives all of it.
- **Everything snaps to one 8 px cell** (`--cell`). Spacing tokens are
  multiples of it.
- **The site works with JavaScript off.** All content, navigation, and the
  contact path are in the HTML; the poster plate stands in for the model.
- **Models never block first paint.** three.js is only fetched when a viewer
  scrolls within 300 px, and the viewer stops rendering when off-screen or when
  the tab is hidden.
- **Motion respects `prefers-reduced-motion`**: auto-rotate and the coupon
  seating animation both switch off.

### Deleting the placeholder tooling

Once real work is in, these can go:

```
tools/make-specimens.mjs   generated the stand-in geometry
tools/poster.html          the poster rig (keep if you want to regenerate posters)
node_modules/              only used by tools/make-specimens.mjs
```
