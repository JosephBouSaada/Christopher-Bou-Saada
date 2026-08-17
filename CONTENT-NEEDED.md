# Content checklist

Every authored placeholder currently live at
<https://josephbousaada.github.io/Christopher-Bou-Saada/>, covered by the red
`UNCONTROLLED COPY — NOT FOR ISSUE` strip. Tick each box as its real value lands.
Anything that stays blank should be **deleted** from the site, not shipped — an
absent row beats an invented one.

Progress: **0 / 65** content items (+ 3 ship steps)

**Already real, do not touch:** name, email, location, LinkedIn, résumé PDF, the
three model files, all three envelopes, all three mesh counts.

---

## A. About Christopher — 3

- [ ] Nameplate discipline line (every page) — now: `Mechanical design`
- [ ] Availability claim (home title block) — now: `Available for mechanical design work and full-time engineering roles.` → confirm true, reword, or delete
- [ ] Career status — student / recent graduate / years of experience (not on site yet)

---

## B. Capability — 11

### Modelling & manufacture — 6

- [ ] CAD — now: `SolidWorks, Fusion 360` — ⚠ **contradicts the A320, exported from Onshape**
- [ ] Modelling — now: `Parts, assemblies, weldments, sheet metal`
- [ ] Drawings — now: `ISO / ASME Y14.5, GD&T, tolerance stacks`
- [ ] Processes — now: `3- and 4-axis milling, turning, brake forming, laser`
- [ ] Materials — now: `6061, 7075, 5052, mild and stainless steel, engineering plastics`
- [ ] Finishes — now: `Anodize Type II & III, powder coat, bead blast, passivation`

### "How a part gets issued" — 5 (replace all, or delete the table)

- [ ] Stage 01 — now: `Requirement and envelope agreed in writing before geometry exists`
- [ ] Stage 02 — now: `Concept model, checked against the mating parts it has to live with`
- [ ] Stage 03 — now: `Manufacturability review: tool access, setups, standard stock`
- [ ] Stage 04 — now: `Detail model with the tolerances that actually matter called out`
- [ ] Stage 05 — now: `Drawing, STEP, and a mesh export a shop can quote from`

---

## C1. WH-0784 — "A320 main wheel half" — 16

Envelope and mesh are measured — leave them.

- [ ] Is this his own design, or a study/replica of an Airbus part? (changes the framing)

Specs:

- [ ] Material — now: `2014-T6 forging`
- [ ] Process — now: `CNC turn, 5-axis mill`
- [ ] Mass — now: `4.18 kg`
- [ ] Key tolerance — now: `⌀140 H6 bearing register`

Constraints:

- [ ] `⌀262 × 177 mm inside the brake stack`
- [ ] `⌀140 H6 for the bearing cup`
- [ ] `12 × M12 tie bolts on ⌀206 PCD`
- [ ] `Perpendicular to the bore within 0.02 mm`
- [ ] `Must not require the halves to be matched at assembly`

Revisions:

- [ ] A — `Solid web, bosses blended into the flange`
- [ ] B — `Web scalloped`
- [ ] C — `Joint face reworked`
- [ ] D — `Released for quote`

Prose:

- [ ] 3 paragraphs (joint face / scalloped web) — all invented

---

## C2. PS-0891 — "Piston" — 15

Specs:

- [ ] Material — now: `4032-T6`
- [ ] Process — now: `CNC turn, mill`
- [ ] Mass — now: `242 g`
- [ ] Key tolerance — now: `Gudgeon bore to skirt axis`

Constraints:

- [ ] `⌀70 × 40 mm`
- [ ] `Skirt outside diameter, cut before the pin bore`
- [ ] `Lands concentric to the skirt within one setup`
- [ ] `Crown faced last`
- [ ] `Must not require a second chucking to locate the pin bore`

Revisions:

- [ ] A — `Pin bore located from the blank`
- [ ] B — `Datum moved to the skirt`
- [ ] C — `Lands cut with the OD`
- [ ] D — `Released for quote`

Prose:

- [ ] 3 paragraphs (datums / compression height) — all invented

---

## C3. CR-0964 — "Connecting rod" — 16

- [ ] Confirm export units — envelope `190 × 81 × 23 mm` assumes a 10× file scale (raw box is 1902 × 806 × 229; a 1.9 m rod cannot pair with a 70 mm piston)

Specs:

- [ ] Material — now: `2618-T61 forging`
- [ ] Process — now: `CNC mill, bores honed`
- [ ] Mass — now: `612 g`
- [ ] Key tolerance — now: `⌀54 H6 big-end bore`

Constraints:

- [ ] `155 mm between centres`
- [ ] `⌀54 H6 big end, honed with the cap torqued`
- [ ] `⌀22 H6 small end`
- [ ] `Fully reversing load`
- [ ] `Must not allow a cap to be fitted to a different rod`

Revisions:

- [ ] A — `Fracture-split cap`
- [ ] B — `Cap bolted and dowelled`
- [ ] C — `Bore honed after assembly`
- [ ] D — `Released for quote`

Prose:

- [ ] 3 paragraphs (big end / I-beam shank) — all invented

---

## D. Assigned, not supplied — 4

- [ ] Part numbers — `WH-0784`, `PS-0891`, `CR-0964` (whole scheme invented)
- [ ] Titles — `A320 main wheel half`, `Piston`, `Connecting rod` (read off filenames + geometry)
- [ ] Default finishes — violet, hardcoat black, clear anodize (picked for visual spread)
- [ ] Drawing metadata — `Sheet 1 of 1 · Rev A`, every coupon at `Rev D`

---

## E. Ship

- [ ] All boxes above ticked or their rows deleted
- [ ] Delete the `issue-strip` block from all 4 pages (snippet in README)
- [ ] Delete this file

---

### Order of impact

1. **CAD row** (B) — one line, kills a contradiction anyone can catch by opening the model.
2. **Availability claim** (A) — a factual statement about his employment status.
3. **Revision histories** (C1–C3) — 12 entries reading as lived engineering judgement; most implied authority per word, entirely fabricated.
4. **Constraints + specs** (C1–C3) — 27 further items.
5. **Prose** (C1–C3) — 9 paragraphs.
