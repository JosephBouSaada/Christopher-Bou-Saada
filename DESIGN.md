---
name: Christopher Bou Saada — Mechanical Design & CAD
description: A portfolio built as an anodize sample card, where the page accent is the finish the visitor selected.
colors:
  void: "#0e0f10"
  plate: "#191b1e"
  plate-2: "#1d2023"
  plate-3: "#24282c"
  rule: "#32373b"
  rule-bright: "#454b50"
  alu: "#d4d9dc"
  alu-dim: "#949b9f"
  alu-faint: "#848b8f"
  dye-natural: "#c3cacd"
  ink-natural: "#d4d9dc"
  dye-clear: "#9fb0ba"
  ink-clear: "#bcccd4"
  dye-black: "#2a2d30"
  ink-black: "#b9bfc3"
  dye-gold: "#d99a2b"
  ink-gold: "#f0b955"
  dye-red: "#c93c2b"
  ink-red: "#f2705c"
  dye-blue: "#2f79d8"
  ink-blue: "#6faaf5"
  dye-violet: "#8a52d6"
  ink-violet: "#b591f0"
  dye-olive: "#6f9a3a"
  ink-olive: "#a8cf6a"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.1rem + 3.1vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.1rem + 1.6vw, 2.375rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.014em"
    fontVariation: "'wdth' 104"
  lede:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.5vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.9375rem, 0.9rem + 0.2vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Azeret Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0.14em"
    fontFeature: "tabular-nums"
  label-micro:
    fontFamily: "Azeret Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.18em"
    fontFeature: "tabular-nums"
rounded:
  none: "0"
  dot: "50%"
spacing:
  cell: "8px"
  c1: "8px"
  c2: "16px"
  c3: "24px"
  c4: "32px"
  c6: "48px"
  c8: "64px"
  c12: "96px"
  c16: "128px"
components:
  button-primary:
    backgroundColor: "{colors.dye-gold}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.dye-gold}"
    textColor: "{colors.void}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.alu}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-ghost-hover:
    textColor: "{colors.ink-gold}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.alu-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "11px 8px"
    height: "48px"
  chip-selected:
    backgroundColor: "rgb(255 255 255 / 0.05)"
    textColor: "{colors.alu}"
  chip-swatch:
    rounded: "{rounded.none}"
    size: "26px"
  register-row:
    backgroundColor: "transparent"
    textColor: "{colors.alu}"
    rounded: "{rounded.none}"
    padding: "24px"
  register-row-hover:
    backgroundColor: "rgb(255 255 255 / 0.028)"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.alu-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  nav-link-primary:
    backgroundColor: "{colors.dye-gold}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  viewer-reset:
    backgroundColor: "transparent"
    textColor: "{colors.alu-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "3px 8px"
  issue-strip:
    backgroundColor: "#2a1618"
    textColor: "{colors.ink-red}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "9px 32px"
    height: "42px"
---

# Design System: Christopher Bou Saada — Mechanical Design & CAD

## Overview

**Creative North Star: "The Finish Sample Card"**

The site is an anodize dye-chip card. Not a portfolio that shows machined parts —
a machined artifact in its own right. Every project is a sample coupon lying in a
drawer on a bead-blast field, its specification stamped alongside it, the dye rack
standing at the edge. The visitor does what anyone handed a sample card does:
picks up a coupon, turns it, and holds a dye chip against it.

The system's governing idea is that the page has no fixed brand colour. STL files
carry no material data, so the site art-directs the finish — and then hands that
control to the visitor. Selecting a dye chip re-materials the live 3D mesh *and*
retints every accent on the page in the same gesture, because the page's accent
**is** the selected finish. The format's limitation became the signature
interaction. Nothing else in the system is allowed to compete with it.

Everything around that moment is drawing-office restraint: a warm-dark Type III
hardcoat ground, bead-blast aluminium type, hairline rules instead of shadows,
zero radius everywhere, and one 8px cell that governs every dimension on the page.
Absence is drawn as deliberately as presence — an unissued drawer slot gets a
dashed plate and a number, not a gap. The confirmed anti-reference is the dark
portfolio grid of glowing rounded cards over static renders; this system refuses
tiles, refuses glow, and refuses any picture standing in for geometry it could
have shown live.

**Key Characteristics:**

- The accent colour is a runtime variable the visitor controls, never a constant.
- Two voices only: Archivo states, Azeret Mono specifies.
- Hairline rules carry structure; shadows only seat physical objects.
- Zero corner radius, without exception, on every rectangular surface.
- One 8px cell unit behind every dimension, gap, and grid track.
- Absence is composed, labelled, and part-numbered — never empty.

## Colors

A warm-dark graphite ground with cool aluminium type, over which a full Type II
anodize dye rack plays as the only chromatic voice.

### Primary

The primary is not a fixed value. It is the pair `--dye` / `--ink`, resolved at
runtime from the visitor's selected finish (`setFinish()` in `assets/js/site.js`
writes both onto `:root`). The eight chips in `assets/js/finishes.js` are the
complete set of values it can take.

- **Gold Dye** (`#d99a2b`, ink `#f0b955`): the at-rest default (`AN-2G`). The
  site's identity colour on first load, on any surface with no prior selection,
  and in every static asset (favicon, `theme-color`, social preview).
- **Bead Blast** (`#c3cacd`, ink `#d4d9dc`): the as-machined finish. The most
  restrained state the page can be in.
- **Clear Anodize** (`#9fb0ba`, ink `#bcccd4`): cool, near-neutral.
- **Hardcoat Black** (`#2a2d30`, ink `#b9bfc3`): the darkest chip. Its ink is
  deliberately far from its dye — the chip is near-invisible against the plate,
  so its text twin carries the whole contrast burden.
- **Red Dye** (`#c93c2b`, ink `#f2705c`), **Blue Dye** (`#2f79d8`, ink `#6faaf5`),
  **Violet Dye** (`#8a52d6`, ink `#b591f0`), **Olive Dye** (`#6f9a3a`, ink
  `#a8cf6a`): the saturated Type II bath colours.

### Neutral

- **Hardcoat Void** (`#0e0f10`): the deepest ground. The title block, scrollbar
  track, and any text set *on* a dye fill.
- **Hardcoat Plate** (`#191b1e`): the page ground, overlaid with a fixed isotropic
  bead-blast grain and a single soft radial bloom from above.
- **Plate 2 / Plate 3** (`#1d2023` / `#24282c`): raised inner surfaces — image
  plates, progress-bar track, scrollbar thumb.
- **Rule** (`#32373b`): every hairline that draws structure.
- **Rule Bright** (`#454b50`): the emphasised hairline — a table's header edge, a
  section's opening line, a ghost button's border.
- **Bead-Blast Aluminium** (`#d4d9dc`): body and heading text.
- **Aluminium Dim** (`#949b9f`): secondary prose, ledes, spec values.
- **Aluminium Faint** (`#848b8f`): stamped labels and column heads.

### Named Rules

**The Live Finish Rule.** There is no brand hue. Every accent — button fills,
link colour, focus rings, selection highlight, the headline's emphasised words,
the nameplate underline, the row seat channel, the progress bar — resolves
through `var(--dye)` or `var(--ink)`. A literal dye hex may appear in exactly two
places: the `:root` token block, and a `--chip` inline value on a rack chip
declaring which finish it *is*. Anywhere else it is a bug. This holds on surfaces
that have no 3D viewer at all: the selected finish tints the whole site.

**The Ink Split Rule.** `--dye` is the physical colour — fills, swatches, edges,
seat channels, 3D material. `--ink` is its lightened twin, the only one cleared
for text and for hairlines that must be read. Never set type in `--dye` on the
plate; never fill a swatch with `--ink`. Text placed *on* a `--dye` fill is
always `--void`, never aluminium.

**The One Chromatic Voice Rule.** Red is reserved. It appears only on the
`UNCONTROLLED COPY` issue strip and the placeholder-mesh note, where it means
"this is not real content yet". It is never decoration, and it survives finish
selection unchanged.

## Typography

**Display Font:** Archivo (variable, weight 100–900, width 62–125%), with
`ui-sans-serif, system-ui, sans-serif`
**Body Font:** Archivo, at `wdth 100`
**Label/Mono Font:** Azeret Mono (variable, weight 300–700), with
`ui-monospace, 'SF Mono', Menlo, monospace`

**Character:** A grotesque stamped wide and tight against a squared-off
engineering mono. Archivo at `wdth 112` and weight 800 reads like a part number
struck into metal; Azeret Mono's flat terminals and tabular figures read like the
spec block on a drawing. The pairing is the whole voice: one font asserts, the
other certifies.

### Hierarchy

- **Display** (800, `clamp(2rem, 1.1rem + 3.1vw, 3.5rem)`, `wdth 112`, `-0.032em`,
  line-height 0.92, uppercase, balanced wrap): page-owning statements — the hero
  headline, a project's title, the issuer name in the title block. Capped at
  ~15–18ch so it always breaks into a stacked block, never a single wide line.
- **Headline** (800, `clamp(1.5rem, 1.1rem + 1.6vw, 2.375rem)`, same treatment):
  section heads inside a band. Same class as Display, one step down in size.
- **Title** (700, `1.125rem`, `wdth 104`, `-0.014em`, line-height 1.2): the part
  name in a register row. Sentence case — it is a name, not a stamp.
- **Lede** (400, `clamp(1.0625rem, 1rem + 0.5vw, 1.3125rem)`, line-height 1.45,
  dim aluminium, max 46ch, pretty wrap): the sentence directly under a display
  heading. One per heading, never two.
- **Body** (400, `clamp(0.9375rem, 0.9rem + 0.2vw, 1rem)`, line-height 1.6, max
  68ch in prose): running text.
- **Label** (mono, 500, `0.75rem`, `0.14em`, uppercase, tabular): the stamp. Spec
  keys and values, nav links, chip names, buttons, breadcrumbs, viewer readouts.
- **Label Micro** (mono, 400, `0.6875rem`, `0.16–0.18em`, uppercase): column
  heads, title-block keys, figure captions, chip finish codes.

### Named Rules

**The Two-Voice Rule.** Archivo states, Azeret Mono specifies. Anything a
machinist would read off a drawing — a part number, a material, a tolerance, a
mass, a finish code, a revision letter, a date — is mono. Anything addressed to a
person is Archivo. There is no third font and no third register.

**The Stamped Caps Rule.** Mono is always uppercase and always tracked at
`0.06em` or wider; the smaller it gets, the wider it tracks. Archivo is
uppercase only at Display and Headline, and never tracked positively.

**The Tabular Figures Rule.** Every number that sits in a column, a table, or a
spec pair carries `font-variant-numeric: tabular-nums`. Digits must align down
the page or the drawing reads as sloppy.

## Layout

**The cell.** `--cell: 8px` is the single spatial unit. Every padding, gap, and
grid track is `--c1` through `--c16` (8/16/24/32/48/64/96/128px) or a `calc()` on
`--cell`. The datum grid drawn behind the hero and the specimen bay is ruled at
`calc(var(--cell) * 6)` — 48px — so the visible grid and the invisible one are the
same grid.

**Page container.** `--page: min(1560px, 100% - var(--c8))`, centred. Wide, because
the register rows need room to be read across rather than scanned as tiles.

**The hero (the coupon test).** A three-column grid — `244px | 1fr | 252px` —
filling `100svh` minus the sticky nameplate and the issue strip. The viewer is
absolutely positioned across the entire section as the field itself; the spec
stamp (left), dye rack (right), and the headline block (seated in the lower-left
void) float over it on `z-index: 2`. The composed emptiness upper-left and the
specimen sitting off-centre are the point: the geometry gets the room.

**The register (the rack).** Not a card grid. A specification register:
`176px | 1fr | 384px | 104px | 24px`, hairline-ruled top and bottom, read across
like drawer contents. The spec cell is itself a four-track sub-grid so part
numbers, materials, processes, and masses align vertically down the whole list.

**Bands.** Sections are `padding-block: clamp(64px, 7vw, 128px)`, closed with a
single `--rule` hairline. A band head is a baseline-aligned flex row — heading
left, supporting sentence right — closed with its own hairline.

**Responsive.** Breakpoints are content-driven, not device-driven, and each one
un-nests exactly one structure:

- `1220px` / `1180px`: the register and hero shed their widest columns; the
  environment spec drops.
- `960px`: the project sheet collapses from two columns to one.
- `940px`: register rows re-form as a plate + stacked-detail layout; the column
  header disappears with them.
- `900px`: the hero unstacks entirely — viewer at `50svh` on top, then the dye
  rack as a horizontal snap-scrolling strip, then the statement, then the spec
  stamp as a two-column list.
- `820px` / `760px` / `720px` / `560px` / `520px`: title block, issue strip,
  nameplate, and register text each simplify one step.

The dye rack is the element that changes most: a vertical stack of full-width
chips on desktop becomes a horizontal, scroll-snapped, mask-faded strip below
900px. It stays a rack either way.

### Named Rules

**The Cell Rule.** No dimension is authored in a raw pixel value unless it is a
hairline (1px), a fixed component measure declared as a token (`--header-h`,
`--stamp-w`, `--rack-w`), or a sub-cell detail under 8px. Everything else is a
multiple of `--cell`.

**The Geometry-First Rule.** On any surface that has a specimen, the geometry is
in the first viewport at every breakpoint. It is never pushed below prose, never
behind a tab, and never traded for a hero image.

## Elevation & Depth

The system is structurally flat and materially deep. Structure is drawn entirely
with 1px `--rule` hairlines — no card shadows, no floating panels, no glow.
Shadows are reserved for objects that would physically cast one: a coupon lying in
its tray, a dye chip in its rack, a specimen bay seated in the page.

Depth otherwise comes from material, not lift: the fixed bead-blast grain over the
plate, the radial bloom from above, inset highlights and shadows that give a plate
real edge thickness, and `backdrop-filter: blur()` on the two surfaces that
genuinely sit *over* the moving viewer (nameplate, spec stamp, dye rack).

### Shadow Vocabulary

- **Seat** (`0 1px 2px rgb(0 0 0 / 0.5), 0 7px 14px -8px rgb(0 0 0 / 0.65)`): an
  object at rest in its tray. The specimen bay, a coupon plate.
- **Lift** (`0 2px 4px rgb(0 0 0 / 0.55), 0 14px 22px -10px rgb(0 0 0 / 0.75)`):
  the same object picked up. Reserved; used sparingly.
- **Edge thickness** (`inset 0 1px 0 rgb(255 255 255 / 0.05)`, `inset 0 -2px 3px
  rgb(0 0 0 / 0.55)`): not a shadow but a bevel — the top edge catches light, the
  bottom edge sits in its own shade. This is what makes a plate read as milled
  stock rather than a div.

### Named Rules

**The Hairline Rule.** Structure is drawn with `1px solid var(--rule)`, never with
a shadow, never with a filled panel. `--rule-bright` marks the *opening* edge of a
structure (a table's header, a title block's top, a register's first line); plain
`--rule` marks every division inside it.

**The Physical Shadow Rule.** A shadow means the thing is an object. UI chrome —
menus, buttons, notes, states — gets a hairline and a translucent ground instead.
If it could not be picked up in the hand, it does not cast.

## Shapes

**Zero radius, everywhere.** Every rectangular surface in the system — buttons,
chips, plates, tables, inputs, the scrollbar thumb, the focus ring — is square-
cornered. The single exception is the 5px live-status dot on a register row's
plate, which is a circle because it is a lamp, not a panel.

Form language is milled: rectangular plates with `4 / 3` aspect ratio, 26px square
dye swatches carrying a diagonal brushed-grain gradient at 146°, hairline
divisions, and a 5px diamond (a rotated square) marking the selected chip in the
rack. The dashed border is reserved exclusively for unissued content — a ghost
coupon in an empty drawer slot.

### Named Rules

**The Zero Radius Rule.** `border-radius` is `0` on every rectangular surface,
including on hover, focus, and active. A rounded corner in this system reads as
imported from a different product.

**The Dashed Absence Rule.** A dashed border means "nothing has been issued here
yet". It is never a decorative stroke and never marks live content.

## Components

### Buttons

- **Shape:** square (0 radius), inline flex, mono label, uppercase, `0.14em`.
- **Primary:** `--dye` fill with a `--dye` border and `--void` text; padding
  `12px 24px`. The fill transitions colour over `0.4s` on finish change, so
  changing the dye visibly re-finishes the buttons too.
- **Hover / Focus:** `filter: brightness(1.14)` and `translateY(-1px)`; returns to
  `translateY(0)` on `:active`. No colour swap, no shadow.
- **Ghost:** transparent fill, `--alu` text, `--rule-bright` border. On hover both
  text and border become `--ink` — the ghost is where the finish shows on a
  secondary action.

### Chips (the dye rack)

- **Style:** a `26px` square swatch filled with `--chip`, carrying a 146° gloss
  gradient and a fine repeating grain, plus an inset dark keyline and a seat
  shadow — a coupon seen edge-on. Label and finish code to its right, mono,
  stacked.
- **State:** `aria-pressed` is the selected state. Selected gets a faint white
  wash, brightened label text, a double ring around the swatch (`--plate` gap,
  then `--chip`), and a 5px diamond struck into the rack's left margin. Hover
  slides the swatch `-2px` and scales it `1.06` — the coupon lifting out of the
  rack.
- **Behaviour:** selecting a chip is the site's one significant interaction. It
  writes `--dye` and `--ink` onto `:root` and re-materials every 3D viewer on the
  page in the same call.

### Cards / Containers

There are no cards. Content sits in **register rows** and **plates**.

- **Register row:** a full-width hairline-ruled grid row, not a tile. Hover fills
  at `rgb(255 255 255 / 0.028)`, scales the plate image `1.06`, grows the finish
  swatch `1.12`, slides the chevron `4px`, and — the signature — grows a 3px
  `--chip` seat channel up the row's left edge via `scaleY(0 → 1)`.
- **Plate:** a `4 / 3` image bay with a radial bore-light gradient, a `--rule`
  border, and inset bevel shadows. `object-fit: contain` always: the geometry is
  never cropped.
- **Ghost row:** same grid, dashed plate, part number in place of an image, dimmed
  and lighter-weight title, no hover response. An unissued drawer slot.

### Inputs / Fields

No form inputs exist yet. When they do: square, `--plate-2` or transparent ground,
`--rule` border, mono label above, `--rule-bright` border and `--ink` focus ring
on focus. Follow the ghost button, not the primary.

### Navigation

- **Nameplate:** sticky, 56px, `backdrop-filter: blur(14px) saturate(1.2)` over an
  86%-opaque plate, closed with a `--rule` hairline. The mark is the issuer's name
  in bold Archivo with a `--dye` 2px underline that retints with the finish, plus
  a mono discipline line that drops below 720px.
- **Links:** mono, uppercase, `--alu-dim`, transparent 1px border that becomes
  `--rule` on hover. The current page carries `--ink` text and a `--rule-bright`
  border.
- **Primary action:** the same link filled with `--dye` and set in `--void` — the
  contact path is the only filled element in the nameplate.
- **Breadcrumbs / Pager:** mono, uppercase, faint; the pager's two ends are
  bordered blocks that brighten on hover.

### The Viewer

The signature component. A `position: relative` bay containing, in order: a
`contain`-fitted render poster at `opacity: 1`; a canvas with `touch-action: none`
and a `grab` / `grabbing` cursor; a centred load state (mono caption over a 128px
progress bar filled with `--dye` and driven by `scaleX(var(--p))`); and a corner
readout with the interaction verbs and a Reset button.

When the mesh is live, `.is-live` fades the poster out over `0.7s` and hides the
load state. If WebGL is absent or loading fails, `.is-failed` brings the state
block back and the poster simply stays — the fallback is the rest state, not an
error screen. The readout swaps "Scroll to zoom" for "Pinch to zoom" on coarse
pointers and drops the verbs entirely below 560px, where the grab cursor is the
only affordance that means anything.

### The Spec Stamp

A `<dl>` of key-value pairs, each row a baseline-aligned flex with a `--rule`
hairline beneath, mono on both sides, value right-aligned and tabular. Values
bound to the live finish carry `--ink` and a `0.4s` colour transition. Below
900px it becomes a two-column list, then one column below 560px.

### The Title Block

The footer is the drawing's title block: a bordered grid of cells (`2fr 1fr 1fr`),
each with a mono key above an aluminium value, over the `--void` ground. The
issuer cell spans wide and sets the name in Display. It collapses to `1fr 1fr` at
820px and one column at 520px.

### The Issue Strip

The honest-state marker: a red-tinted full-width bar reading
`UNCONTROLLED COPY — NOT FOR ISSUE`. It is the one element exempt from the finish
system and the one place red appears. It is designed to be deleted wholesale once
real content lands, and the CSS says so in a comment.

### Motion

One authored moment: `.seat` — register rows arriving with
`translateY(14px) scale(0.985)` and settling on a slight-overshoot ease
(`cubic-bezier(0.22, 1.1, 0.36, 1)`) with a staggered `--seat-delay`. Coupons
dropping into a fan deck. Everything else in the system is state feedback:
`0.16s` for hover colour, `0.24–0.3s` for physical movement, `0.4s` for finish
retinting, `0.7s` for the poster dissolve. `prefers-reduced-motion: reduce`
collapses all of it to `0.01ms` and disables smooth scrolling.

## Do's and Don'ts

### Do:

- **Do** resolve every accent through `var(--dye)` or `var(--ink)`. A new surface
  inherits the visitor's selected finish even if it has no 3D viewer on it.
- **Do** use `--ink` for text and read-critical hairlines, `--dye` for fills,
  swatches, edges, and 3D material. Set type on a `--dye` fill in `--void`.
- **Do** author every dimension as a multiple of `--cell` (8px) via `--c1`…`--c16`.
- **Do** set anything a machinist would read — part numbers, materials, masses,
  tolerances, revisions, dates — in Azeret Mono, uppercase, tracked `0.06em`+,
  with tabular figures.
- **Do** draw structure with `1px solid var(--rule)`, and open a structure with
  `--rule-bright`.
- **Do** keep `object-fit: contain` on every render and every canvas. Cropping
  geometry defeats the site's whole claim.
- **Do** give absence a composed treatment: a dashed plate, a part number, a
  dimmed title. An unissued slot is designed, not missing.
- **Do** keep the geometry in the first viewport at every breakpoint on any
  surface that has a specimen.
- **Do** transition finish-bound properties over `0.4s var(--ease-out)` so the
  retint reads as a single deliberate change across the whole page.

### Don't:

- **Don't** hardcode a dye hex outside the `:root` token block or a chip's own
  `--chip` declaration. That includes "just this once" for a new accent.
- **Don't** add a `border-radius` to any rectangular surface. Zero is the system.
- **Don't** use a shadow to separate UI from its background. Hairline and
  translucent ground; shadows are for objects that could be picked up.
- **Don't** introduce a third typeface, a third type register, or positive
  tracking on Archivo.
- **Don't** use red for anything except the uncontrolled-copy marker and the
  placeholder-mesh note.
- **Don't** turn the register into a card grid. Rows are read across; tiles are
  the anti-reference.
- **Don't** let a static render stand in for geometry that could be shown live.
  The poster is a fallback and a first paint, never the destination.
- **Don't** apply `backdrop-filter` to anything that is not genuinely over the
  moving viewer. Three surfaces earn it; a fourth is decoration.
- **Don't** animate anything beyond the `.seat` arrival and state feedback. The
  specimen is the moving thing on this site.
