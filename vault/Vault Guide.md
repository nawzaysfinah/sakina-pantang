---
type: meta
---

# Vault Guide

This vault is the **source of truth** for Sakina's traditional-knowledge content — the herbs, practices, rationale, and safety notes behind the 44-day postpartum journey and the 3rd-trimester prep weeks. It replaces hand-written prose duplicated across `data/*.js` with a linked graph of atomic notes, following Andrej Karpathy's approach to Obsidian:

- **No folders as taxonomy.** Every note lives flat in the vault root. Structure comes from `[[wikilinks]]` and backlinks, not directories. The only reason you'd ever see a subfolder here is a non-conceptual one (e.g. build scaffolding), never "categories."
- **One note per concept, named exactly what it is.** `Kunyit (Turmeric).md`, not `herb-003.md`. The title is the identifier.
- **Link the moment you mention something worth revisiting.** Don't pre-plan the taxonomy — link liberally as you write, even to notes that don't exist yet (Obsidian shows these as unresolved links; create the note later when you have something to say).
- **Backlinks are the index.** Open `Kunyit (Turmeric).md` and its backlinks panel shows you every phase, day, and safety note that touches turmeric — for free, with zero manual upkeep. Compare to today's `rationale.js`, where turmeric's benefits are re-explained from scratch in three different phase objects.
- **MOC notes, not folders, for navigation.** A "Map of Content" is just a note that curates links (often via a live Dataview query so it never goes stale). See `MOC - *.md` notes.
- **Frontmatter = data. Body = knowledge graph.** This is the one addition to Karpathy's method needed to make this vault double as the app's CMS — see below.

## The frontmatter / body split

Every note that feeds the live app has YAML frontmatter holding **exact values the app needs verbatim** (day numbers, meal names, a safety note's short summary). The **body** holds prose, rationale, and every `[[wikilink]]` — this is the graph. The build script (`scripts/build-vault.mjs`) reads frontmatter directly and parses body sections by `## heading`, resolving `[[Target|Display]]` → `Display` as it goes.

This split matters because it means editing content is still just... writing Obsidian notes and linking things. The app-facing data is a byproduct of the graph, not a separate thing you maintain twice.

## Note types (frontmatter `type:` field)

| type | count (target) | feeds | example |
|---|---|---|---|
| `tradition` | 2 | overview/context only | `Malay Pantang.md` |
| `rationale` | 6 (3 malay + 3 chinese phases) | `data/rationale.js` | `Malay Rationale — Phase 1 (Days 1-7).md` |
| `chinese-practice` | 3 (phases) | `data/chinesePractices.js` | `Chinese Practices — Phase 1 (Week 1).md` |
| `day` | 44 | `data/meals.js`, `data/chineseMeals.js`, `data/jamu.js` | `Day 01.md` |
| `week` | 13 | `data/trimester3.js` | `Week 28.md` |
| `safety` | grows over time | inlined into whichever rationale/practice note links it | `Jamu & Breastfeeding Jaundice Risk.md` |
| `concept` | grows over time | not directly emitted — link targets that give the graph its value | `Kunyit (Turmeric).md` |
| `moc` | a handful | navigation only, not built | `MOC - Postpartum Journey.md` |

## Why this fixes a real problem

The safety note you asked me to add earlier had to be **copy-pasted into three separate `malayRationale` phase objects** because the old data model has no way to reference a shared idea — every phase is an island. In this vault it's one note, `Jamu & Breastfeeding Jaundice Risk.md`, linked from all three phase notes. Edit it once, every phase that references it updates.

Same story with ginger: `malayRationale` and `chineseRationale` each independently re-explain old ginger's warming properties, in two different files, with zero connection — despite it being the literal same ingredient (Halia Tua / 老姜) used the same way in both traditions. In the vault, `Ginger (Halia Tua · 老姜).md` is a single note that both traditions' phase notes link to. Opening it and looking at backlinks is the first time this app's knowledge base actually shows that connection.

## Build pipeline

```
vault/*.md  --[scripts/build-vault.mjs]-->  vault-build/data/*.js  (generated, gitignored)
```

`build-vault.mjs` groups notes by `type`, resolves wikilinks in body sections to plain display text, and emits the exact object shapes `SakinaApp.jsx` / `BirthPlanMode.jsx` already import — so once the full vault is ported, cutting the app over is just pointing imports at the generated files (or having the script write directly into `data/`). Until then, output goes to a separate folder so the live app is never at risk from a partial port.

Recommended Obsidian plugins (optional, authoring-only, not required by the build script): **Dataview** for live MOC queries, and the built-in **Graph View** to see the structure emerge.
