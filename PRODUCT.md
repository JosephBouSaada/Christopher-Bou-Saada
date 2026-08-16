# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain static HTML/CSS/JS, chosen by the user. No build step, no framework, no
package manager required to deploy. Constraint that drove the choice: hosting is
GitHub Pages, and the client must be able to add a project by editing files and
pushing.

Third-party runtime dependency: **three.js** (ES modules, loaded from a pinned
CDN or vendored into `/vendor`) for the interactive 3D viewer. This is the one
accepted exception to the zero-dependency rule because the viewer is the
product's differentiator.

## Users

Two audiences, both evaluating the same evidence, in the same short session:

1. **Hiring managers and technical recruiters** in mechanical / product design
   engineering. Situation: scanning many candidate portfolios quickly, often
   from a link in an application or a LinkedIn profile, frequently on a phone.
   Job: decide within roughly a minute whether Christopher can actually model,
   constrain, and think through a mechanical design well enough to warrant an
   interview.
2. **Prospective freelance clients** who might commission paid CAD work.
   Situation: they have a part or product they need modelled and are comparing
   options. Job: judge whether the work is credible and professional, then find
   a way to make contact.

Both audiences want proof of capability before they want biography.

## Product Purpose

A portfolio site that showcases Christopher's CAD projects — mechanical parts
and assemblies — and converts a visit into either an interview request or a
project inquiry.

Success: a visitor who arrives from a link inspects at least one model closely,
comes away with a concrete sense of Christopher's modelling ability, and has an
obvious, low-friction way to contact him.

## Positioning

The visitor can **rotate the actual geometry**, not just look at a picture of
it. Most CAD portfolios are a grid of static renders, which are indistinguishable
from renders someone else made or downloaded. Real, inspectable geometry loaded
in the browser is a claim that a static-render portfolio cannot truthfully copy,
and it lets a technically literate evaluator check form, proportion, fillets, and
assembly relationships for themselves.

## Operating Context

- Christopher authors models in desktop CAD (SolidWorks / Fusion-class tools).
  Native `.SLDPRT` / `.SLDASM` / `.STEP` files cannot be read by a browser
  without a heavy converter, so **each showcased model must be exported by
  Christopher to a web format** before it can appear on the site.
- Accepted web formats: **STL** (universally exportable from any CAD package;
  geometry only, no materials) and **GLB/glTF** (carries materials and colour;
  native in Fusion 360, requires a plugin or Blender round-trip from
  SolidWorks). The site must support both and detect format by file extension.
- Because STL carries no material data, the site's material and lighting are
  art-directed by the site itself, giving every project a consistent presented
  finish regardless of source package.
- Visitors arrive largely from links (application, résumé, LinkedIn, DM). Mobile
  share is high. Some visitors are on constrained networks; a multi-megabyte
  mesh must never be the thing that blocks first paint.
- Recruiters commonly skim, then forward the link to an engineer who looks
  harder. The site must reward both passes.

## Capabilities and Constraints

**Confirmed capabilities**

- Interactive 3D model viewer: orbit, zoom, reset. Present in the first
  viewport of the home page, and on every project detail page. The 3D is the
  hero, not a secondary tab.
- Loader supports `.stl` and `.glb`/`.gltf`, selected by file extension.
- Structure: one home page showcasing the work, plus a dedicated detail page per
  project for deeper process and multiple images.
- Static rendered images act as the poster/fallback for every model, shown
  before the mesh loads and in place of it when WebGL is unavailable or the user
  prefers reduced motion.

**Constraints**

- Must deploy to GitHub Pages from a repository with no server-side code and no
  mandatory build step.
- Must work when JavaScript fails or WebGL is absent: the portfolio's content
  and contact path remain fully usable, with images standing in for models.
- Model files are large relative to a normal web asset. Loading must be
  deferred and explicit enough that no visitor pays for a mesh they never look
  at.
- Adding a project must not require touching application logic.

**Explicitly undecided / not yet supplied**

- Christopher's real name spelling, current status (student, recent graduate, or
  years of experience), location, CAD software list, email address, LinkedIn or
  GrabCAD profile, and whether a CV will be linked.
- The project set: titles, count, context, constraints solved, materials, and
  outcomes.
- Whether any work is under NDA or otherwise cannot be shown.

## Brand Commitments

None established. The client has supplied no logo, wordmark, palette,
typography, tagline, or voice guidance. Nothing about the identity is inherited
or binding.

## Evidence on Hand

**None.** No renders, no model files, no project write-ups, no bio, no
testimonials, no employer or client names, no résumé.

Every project, credential, client, metric, and biographical fact on the built
site is therefore a clearly-marked placeholder awaiting Christopher's input. No
testimonial, employer, client name, award, certification, years-of-experience
figure, or performance claim may be invented to fill space. Placeholder content
must be visibly identifiable as placeholder so it can never ship by accident.

## Product Principles

1. **The geometry is the argument.** Proof of modelling ability comes first;
   biography, philosophy, and process copy are supporting evidence.
2. **Never fabricate credibility.** Absent facts stay marked as absent. A
   portfolio that invents a client is worse than one with fewer projects.
3. **Respect the one-minute skim and the ten-minute inspection equally.** The
   page must resolve at a glance and hold up to a close technical read.
4. **The client maintains this alone.** Adding a project is dropping in files and
   editing one obvious data block — no framework, no build, no code changes.
5. **Weight is a feature that must be paid for deliberately.** Heavy meshes load
   on intent, behind a lightweight poster, never as a blocking cost.

## Accessibility & Inclusion

No client-specific standard was established, so the site targets WCAG 2.2 AA as
a baseline. Product-specific requirements that follow from the above:

- The 3D viewer is keyboard-operable and never the only path to the content;
  every model has an equivalent static image and text description.
- Continuous auto-rotation respects `prefers-reduced-motion`.
- The site remains legible and navigable without JavaScript.
