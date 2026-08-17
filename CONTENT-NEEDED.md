# Content needed from Christopher

Everything below is **authored placeholder** currently live at
<https://josephbousaada.github.io/Christopher-Bou-Saada/>, covered by the red
`UNCONTROLLED COPY — NOT FOR ISSUE` strip.

Fill in the **Real** column. Anything left blank should be deleted from the site
rather than shipped — an absent row is better than an invented one.

**Already real, nothing needed:** name, email, location, LinkedIn, résumé PDF,
the three model files, all three envelopes, all three mesh counts.

---

## A. About Christopher

| Where | Placeholder now | Real |
|---|---|---|
| Nameplate, every page | `Mechanical design` | |
| Title block, home | `Available for mechanical design work and full-time engineering roles.` | Confirm true, reword, or delete |
| Not on site yet | Career status: student / recent graduate / years of experience | |

---

## B. Capability section

### Modelling & manufacture

| Row | Placeholder now | Real |
|---|---|---|
| CAD | `SolidWorks, Fusion 360` | **Contradicts the A320, which was exported from Onshape** |
| Modelling | `Parts, assemblies, weldments, sheet metal` | |
| Drawings | `ISO / ASME Y14.5, GD&T, tolerance stacks` | |
| Processes | `3- and 4-axis milling, turning, brake forming, laser` | |
| Materials | `6061, 7075, 5052, mild and stainless steel, engineering plastics` | |
| Finishes | `Anodize Type II & III, powder coat, bead blast, passivation` | |

### "How a part gets issued"

Five invented stages describing a working method Christopher never described.
Either replace all five or delete the table.

| Stage | Placeholder now | Real |
|---|---|---|
| 01 | `Requirement and envelope agreed in writing before geometry exists` | |
| 02 | `Concept model, checked against the mating parts it has to live with` | |
| 03 | `Manufacturability review: tool access, setups, standard stock` | |
| 04 | `Detail model with the tolerances that actually matter called out` | |
| 05 | `Drawing, STEP, and a mesh export a shop can quote from` | |

---

## C. The three coupons

Each coupon needs **16 items**: 4 spec rows, 3 prose paragraphs, 5 constraints,
4 revisions. Envelope and mesh are already correct — leave them.

### C1. WH-0784 — "A320 main wheel half"

Part number, title and default finish (violet / AN-2V) were all assigned, not supplied.

| Field | Placeholder now | Real |
|---|---|---|
| Material | `2014-T6 forging` | |
| Process | `CNC turn, 5-axis mill` | |
| Mass | `4.18 kg` | |
| Key tolerance | `⌀140 H6 bearing register` | |
| Envelope | `⌀262 × 177 mm` | ✅ measured |
| Mesh | `10 868 triangles · 241 KB` | ✅ measured |

Constraints — `⌀262 × 177 mm inside the brake stack` · `⌀140 H6 for the bearing cup` ·
`12 × M12 tie bolts on ⌀206 PCD` · `Perpendicular to the bore within 0.02 mm` ·
`Must not require the halves to be matched at assembly`

Revisions — A `Solid web, bosses blended into the flange` · B `Web scalloped` ·
C `Joint face reworked` · D `Released for quote`

Prose — 3 paragraphs about the joint face and scalloped web. **All invented.**

**Also confirm:** is this his own design, or a study/replica of an Airbus part?
It changes how it should be framed.

### C2. PS-0891 — "Piston"

| Field | Placeholder now | Real |
|---|---|---|
| Material | `4032-T6` | |
| Process | `CNC turn, mill` | |
| Mass | `242 g` | |
| Key tolerance | `Gudgeon bore to skirt axis` | |
| Envelope | `⌀70 × 40 mm` | ✅ measured |
| Mesh | `10 292 triangles · 503 KB` | ✅ measured |

Constraints — `⌀70 × 40 mm` · `Skirt outside diameter, cut before the pin bore` ·
`Lands concentric to the skirt within one setup` · `Crown faced last` ·
`Must not require a second chucking to locate the pin bore`

Revisions — A `Pin bore located from the blank` · B `Datum moved to the skirt` ·
C `Lands cut with the OD` · D `Released for quote`

Prose — 3 paragraphs about datums and compression height. **All invented.**

### C3. CR-0964 — "Connecting rod"

| Field | Placeholder now | Real |
|---|---|---|
| Material | `2618-T61 forging` | |
| Process | `CNC mill, bores honed` | |
| Mass | `612 g` | |
| Key tolerance | `⌀54 H6 big-end bore` | |
| Envelope | `190 × 81 × 23 mm` | ⚠ **assumes a 10× file scale — confirm** |
| Mesh | `15 722 triangles · 768 KB` | ✅ measured |

Constraints — `155 mm between centres` · `⌀54 H6 big end, honed with the cap torqued` ·
`⌀22 H6 small end` · `Fully reversing load` ·
`Must not allow a cap to be fitted to a different rod`

Revisions — A `Fracture-split cap` · B `Cap bolted and dowelled` ·
C `Bore honed after assembly` · D `Released for quote`

Prose — 3 paragraphs about the big end and I-beam shank. **All invented.**

**Note:** the raw export bounding box is 1902 × 806 × 229. A 1.9 m rod would not
pair with a 70 mm piston, so the file is assumed to be at 10× scale. Confirm the
export units.

---

## D. Assigned, not supplied

| Thing | Assigned | Confirm or change |
|---|---|---|
| Part numbers | `WH-0784`, `PS-0891`, `CR-0964` | The whole numbering scheme was invented |
| Titles | `A320 main wheel half`, `Piston`, `Connecting rod` | Read off the filenames and the geometry |
| Default finishes | violet, hardcoat black, clear anodize | Picked for visual spread across the rack |
| Drawing metadata | `Sheet 1 of 1 · Rev A`, every coupon at `Rev D` | Invented |

---

## E. Order of impact

1. **CAD row** — one line, and it removes a contradiction anyone can catch by
   opening the model.
2. **Availability claim** — a factual statement about his employment status.
3. **Revision histories** — 12 entries that read as lived engineering judgement.
   The most implied authority per word on the site, and entirely fabricated.
4. **Constraints and specs** — 27 further items.
5. **Prose** — 9 paragraphs.

When all of it is real, delete the `issue-strip` block from all 4 pages (README
has the exact snippet) and this file with it.
