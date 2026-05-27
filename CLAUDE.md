# Relational Musicality — Web Book

## What This Is

A short web book by Brandon Brown titled *Relational Musicality: A Technology of Remembering*. The argument: there is a category of practices called *technologies of remembering* that re-integrate what modern civilization fragments; relational musicality (embodied, rhythmic, collective coordination in shared time) is one such technology, refined with particular sophistication in Afro-diasporic forms (capoeira, the social dance floor, jazz, rumba, bomba). Built with Astro + MDX.

## Stack

- **Astro 5.x** static site generator
- **@astrojs/mdx** for content
- **@fontsource-variable** for Literata + Inter fonts
- Zero other dependencies

## Architecture

| Layer | Pattern |
|-------|---------|
| Content | MDX files in `src/chapters/`, loaded via glob content collections |
| Routing | Dynamic `[...slug].astro` with `getStaticPaths` |
| Layout | BaseLayout (shell + ViewTransitions + AudioPlayer) → ChapterLayout (header, nav, progress) |
| Audio | Web Audio API with GainNode crossfade, persisted via `transition:persist` |
| Charts | Server-rendered SVG (RadarChartSVG, SmallMultiples) + client-side interactive (ComparisonChart via JSON script tag) |
| Animations | CSS keyframes for chapter headers, Intersection Observer for scroll reveals, CSS `animation-timeline: view()` for section dividers |

## Key Decisions

- **Web Audio API, not setInterval** for audio crossfades (sample-accurate, no background tab drift)
- **JSON script tag, not `define:vars`** for passing data to ComparisonChart (preserves bundling, imports, TypeScript)
- **`astro:page-load`** for non-persisted components, **`astro:after-swap`** for persisted AudioPlayer
- **Literata** (variable, optical sizing) for body — designed for screen reading, dark background safe
- **Softened dark theme** (#141414 bg, #c8c8c8 text) — reduces luminance fatigue vs pure black/white
- **Differentiated animation**: prose gets opacity-only, landmarks get opacity+translateY, cover gets blur-to-sharp

## Writing Voice

When writing or editing chapter prose, follow Brandon's actual voice — not generic "good writing" and not Claude's defaults.

### How the prose moves

1. **Observe before claiming.** Start with something concrete — a scene, a thing you notice, a situation. Arrive at what it means. The abstraction is earned through accumulation, not announced up front.

2. **Questions do real work.** Questions aren't rhetorical setups for answers. They're genuine openings that the reader sits inside. "What would change if we took this seriously?" is a destination, not a springboard.

3. **Stack examples, then name the pattern.** The roda does this, the dance floor does this, jazz does this — *then*: here's what recurs. The reader arrives at the insight through concrete details, not from a definition.

4. **Short declarative sentences as landing points — after exploration.** "These systems don't break." "Music can function as infrastructure." These hit hard because they come after the thinking, not before it.

5. **Incremental specificity, not definition.** Get more precise as you go, circling closer. Not "here's the definition, now here's the evidence" — more "here's what I'm noticing, and if I look closer, and closer still..."

6. **Name what you're doing intellectually.** "The claim is..." "The question is..." "Call this..." — be transparent about the move being made. Invite the reader to evaluate, not just receive.

### What to avoid

- **"Not X; it's Y" as a standalone rhetorical jab.** A short sentence whose only work is correcting what the reader presumably thought ("This isn't a conspiracy. It's a worldview.") is Claude's default rhetoric. Brandon's mode is "look at this with me, and notice what becomes visible." That said, *not-X-but-Y* inside a longer sentence doing genuine analytical work is fine — the test is whether you can imagine a serious nonfiction writer like Greg Grandin, Barbara Ehrenreich, Chimamanda Adichie, or Yuval Noah Harari writing it. If you can't, restructure. Twitter-jab cheapness without grappling with complexity is what gets cut.

- **Triplet anaphora.** "It does not need X. It does not need Y. It does not need Z." Three identical sentence openings in a row, used to insist rather than to list. Either vary the rhythm or collapse into a single sentence with commas.

- **Staccato fragment closes.** "Three orientations. We are developed in the first. Rediscovering the second. Illiterate in the third." A chain of short fragments at a section's end, used to land a punch. Short declarative landings are fine and Brandon uses them, but they come *after* exploration and they don't stack four-deep. Flow these into a single sentence.

- **Em dashes as rhythm.** Em dashes that set up a pause-then-deliver beat ("The sound shifts — and the room knows it") are an AI cadence. Use commas, colons, parentheses, or restructure the sentence. Genuine parentheticals are okay but rare. Em dashes in titles and metadata are unconstrained.

- **Competitive framing.** Don't rank practices, don't impugn alternatives. The goal is understanding what is distinctive, not what is better.

- **Front-loaded thesis.** Don't open a section with the conclusion. Open with observation, build through description, arrive at the point.

- **Excessive distinguishing.** The "this is X and not Y, this is Y and not Z" pattern creates a definitional feel. Prefer describing what something IS with enough specificity that the reader understands what it isn't without being told.

### The underlying stance

Brandon writes as someone who is **trying to understand**, not someone who has figured it out. The reader is invited into the inquiry. Individual sentences can be confident, but the arc is exploratory. "I'm showing you how I arrived at these claims and inviting you to evaluate them."

### Accessibility aspiration

The book aims for the readability of Yuval Noah Harari or Jared Diamond: complex ideas in plain language, accessible to readers who do not already share the author's vocabulary. Coined or specialist terms (*relational musicality*, *technologies of remembering*, *agonistic reappropriation*, *co-regulated music*, *musicking*) should be introduced with a definition the reader can hold immediately on first encounter. Watch jargon. Trust the reader to follow without needing to be impressed by sophisticated framing.

### Calibrating voice work

When revising prose across multiple chapters:

1. Pick one chapter as the calibration piece. Don't rewrite all of them blind.
2. Before applying changes, show before/after on two or three representative passages with the rule each rewrite is applying.
3. Get author signoff on the calibration before proceeding to the rest.
4. Verify the build (`npx astro build`) after each chapter rewrite.

This avoids the failure mode where a 3,000-word rewrite arrives cold and the author has to redline every move without knowing what rules were being applied.

## Content Source

Chapter content drawn from writing project at `~/writing/relational-musicality/`:
- `01-manifesto.md` — voice, argument structure
- `02-technologies-of-remembering.md` — framework text
- `04-case-studies.md` — five forms content

## Development Workflow

Use judgment to plan appropriately for the task:
- Simple changes: just implement directly.
- Larger changes: think through the approach before coding.
- Always verify with `npx astro build` before committing.

## Commands

```bash
npm run dev     # Dev server at localhost:4321
npm run build   # Static build to dist/
npm run preview # Preview production build
```
