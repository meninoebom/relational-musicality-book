# Technologies of Remembering — Web Book

## What This Is

A short web book by Brandon Brown exploring Afro-diasporic choreo-musical practices as uniquely integrative "technologies of remembering." Built with Astro + MDX.

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
