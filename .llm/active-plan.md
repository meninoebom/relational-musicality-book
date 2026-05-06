# Active Plan: Living Book Workshop
Last updated: 2026-05-05

## Problem Statement
New ideas arrive constantly (podcasts, voice memos, journals, conversations) and have no home — so they either get lost, or capturing them becomes a separate project from writing the book. There is no shared scaffold the author and agent can both work against.

## Solution
A claims-first workshop layer in `.llm/workshop/` of the book repo. The argument spine (`claims.md`) is the structural truth; chapters are organization. Every incoming idea is captured to a dated inbox, triaged against claims with the agent's help, and filed as a fragment tagged by claim ID and labeled VERBATIM / PARA / MINE. The agent's role is scaffolding — surfacing, placing, pushing back, naming logical moves — never drafting prose.

## Out of Scope
- No prose drafting by the agent. Ever. Not transitions, not topic sentences.
- No automated chapter-claim sync. Manual reference by ID in chapter comments.
- No web UI / dashboard. Markdown files + agent commands only.
- No multi-author support. Solo only.
- No external service integrations (Zotero, Readwise, etc).
- No automatic claim renumbering. IDs are stable; gaps are fine.
- No enforcement of cooling period. Advisory only.

## User Stories

### MVP
1. As Author, I want to dump a voice-memo transcript into `inbox/` with one command, so that capturing doesn't require deciding where it goes.
2. As Author, I want the agent to read my inbox and propose claim-tags + placement for each item, so that triage is conversational and fast.
3. As Author, I want every fragment tagged to one or more claim IDs (not chapter numbers), so that reorganizing chapters never breaks the index.
4. As Author, I want VERBATIM / PARA / MINE prefixes on every note, so that months later I know what's mine, what's borrowed, and what needs verification.
5. As Author, I want a single command that surfaces all fragments tagged to a given claim, so that drafting starts with the relevant material in front of me, not buried.
6. As Returning Author, I want to open the repo after weeks away and re-anchor in under five minutes by reading `project-state.md`, so that no session starts cold.
7. As Returning Author, I want the agent to load only `project-state.md`, `claims.md`, `glossary.md`, and `not-this-book.md` by default — not the whole book — so that conversations stay sharp and cheap.
8. As Author, I want the agent's standing instruction to forbid prose-drafting and require it to name logical relationships instead, so that the book's voice stays mine.

### Later
9. As Author, I want a "claim health" view that shows which claims have evidence, which are naked assertions, and which are contradicted by fragments, so that I can see structural gaps.
10. As Future Author, I want to clone this workshop layer to a new book repo with one command and a fresh `claims.md`, so that the rig ports without rebuilding.
11. As Author, I want a weekly digest of inbox items that have aged past 14 days and not been triaged, so that nothing rots silently.
12. As Author, when revising existing chapter prose, I want the agent to check claims referenced by the chapter against `claims.md` and flag drift or new claims that should be promoted, so that revision strengthens the spine instead of fraying it.

## Features

### F1: Capture & Inbox
Stories: 1
Acceptance criteria:
- [ ] One command takes raw text (or filepath) and writes `inbox/YYYY-MM-DD-slug.md`
- [ ] Frontmatter includes `type` and `status: unprocessed`
- [ ] No triage happens at capture time

### F2: Triage Loop
Stories: 2, 3, 4
Acceptance criteria:
- [ ] Agent reads all items in `inbox/` and reads `claims.md`
- [ ] For each item, agent proposes: claim IDs, VERBATIM/PARA/MINE classification, one-sentence tension
- [ ] Author confirms or edits; item moves to `fragments/` with claim tags in frontmatter
- [ ] Body content is line-prefixed with VERBATIM/PARA/MINE markers

### F3: Claim-Indexed Retrieval
Stories: 5
Acceptance criteria:
- [ ] Given a claim ID, return all fragments tagged to it, ordered by date
- [ ] Surfaced output fits in a single agent response

### F4: Session Anchor
Stories: 6, 7
Acceptance criteria:
- [ ] `project-state.md` is rewritten end-of-session (~200 words)
- [ ] Session-open ritual loads only the four orienting files
- [ ] Cold-open re-anchor in under 5 minutes

### F5: Voice Guardrail
Stories: 8
Acceptance criteria:
- [ ] `AGENT.md` exists with standing instruction forbidding prose drafting
- [ ] Instruction is short enough to paste at session start without friction
- [ ] Agent declines drafting requests and offers logical-relationship suggestions instead

### F6: Bootstrap & Port
Stories: 10
Acceptance criteria:
- [ ] Workshop layer is template-shaped — copy `.llm/workshop/` minus `inbox/`, `fragments/`, and book-specific seeds, and the rig works
- [ ] `claims.md` for this book is seeded via agent-assisted pass over existing source material in `~/writing/relational-musicality/`

### F7: Spine Health (Later)
Stories: 9, 11, 12
Deferred until F1-F6 are in steady use.

## Domain Model

### Entities

#### Claim
- `id`: `C-NN` (stable, never renumbered)
- `statement`: one-sentence declarative
- `status`: `proposed | active | retired`
- `created`: ISO date
- Lives as a section in `claims.md`.

#### InboxItem
- `filename`: `YYYY-MM-DD-slug.md`
- `type`: `fragment | citation | claim-candidate | question`
- `status`: `unprocessed | triaged`
- `source`: optional origin (voice memo, podcast title, article URL)
- `body`: raw content
- Lives in `inbox/`.

#### Fragment
- `filename`: `YYYY-MM-DD-slug.md` (preserved from inbox)
- `claims`: list of claim IDs (`[C-03, C-07]`)
- `kind`: `VERBATIM | PARA | MINE` (mixed allowed; body is line-prefixed)
- `source`: full citation if applicable
- `tension`: one-sentence note on what claim this complicates or supports
- `body`: prefixed content
- Lives in `fragments/`.

#### ProjectState
- `thesis`: one paragraph
- `outline`: flat list (chapter titles only, no nesting)
- `last-session`: one paragraph
- Lives as `project-state.md`. Single doc, rewritten end-of-session.

#### Decision
- `date`: ISO date
- `decision`: one sentence
- `why`: one sentence
- Lives as a line in `decision-log.md`. Append-only.

#### GlossaryTerm
- `term`, `definition`: one line each in `glossary.md`.

#### Exclusion
- `statement`: one sentence in `not-this-book.md`.

### Relationships
- Fragment ↔ Claim: many-to-many (fragments tag multiple claims; claims accumulate many fragments)
- InboxItem → Fragment: one-to-one transformation (same filename moves; status changes)
- Claim ↔ Chapter: soft reference only (chapters cite claim IDs in MDX comments; no enforced sync)

## Key Modules

### capture
- Interface: one input (text or filepath) → writes `inbox/YYYY-MM-DD-slug.md`.
- Hides: date prefixing, slug generation, frontmatter scaffolding.
- Deep? Yes — single funnel for all capture paths.
- Testable in isolation: yes.

### triage
- Interface: agent ritual — "process inbox." Reads `inbox/*.md` + `claims.md`. For each item, proposes claim tags, kind classification, tension sentence. Author confirms. Item moves to `fragments/`.
- Hides: matching incoming material to existing claims; detecting claim-candidates; prompting for tension.
- Deep? Yes — most-used agent surface; complexity here is load-bearing.
- Testable in isolation: partially. Reproducible prompting; non-reproducible judgment.

### surface
- Interface: given claim ID, return all fragments tagged to it (date-ordered).
- Hides: grep + frontmatter parse + ordering.
- Deep? Medium. The bridge between capture and drafting; without it, the index is dead weight.
- Testable in isolation: yes.

### Standing agent instruction (`AGENT.md`)
- Short paragraph prepended to every workshop session.
- Forbids prose drafting; requires naming of logical relationships; permits surfacing, placing, pushback.

### Session bookend
- Open: paste `project-state.md` first.
- Close: rewrite `project-state.md`; append to `decision-log.md` if anything load-bearing changed.

## Polishing Requirements
- [ ] First real voice-memo capture → triage → fragment cycle completes in under 10 minutes.
- [ ] Session re-anchor (cold open) under 5 minutes via `project-state.md`.
- [ ] Claim ID format chosen and documented (`C-NN` proposed).
- [ ] `AGENT.md` instruction short enough to paste without thinking.
- [ ] Workshop README documents the capture → triage → surface → draft loop in one page.
- [ ] First seeded `claims.md` has 6-12 claims (not 30, not 3).
- [ ] `not-this-book.md` exists and is honest (names things the author feels pulled toward).

## Validation
- Story 1 → InboxItem entity + `capture` module ✓
- Story 2 → `triage` module + Fragment entity ✓
- Story 3 → Fragment.claims field ✓
- Story 4 → Fragment.kind field ✓
- Story 5 → `surface` module ✓
- Story 6 → ProjectState entity + Session bookend ✓
- Story 7 → AGENT.md + four orienting files ✓
- Story 8 → Voice Guardrail / AGENT.md ✓

All MVP stories covered. No orphan entities.

## Bootstrap Decisions (locked)
- `claims.md` seeded via agent-assisted pass over `~/writing/relational-musicality/` source docs (manifesto, technologies-of-remembering, case-studies). Author edits aggressively after.
- Cooling period is advisory, not enforced.

## Next Step
Run `/workflow:issues` to decompose into GitHub issues — or skip issue tracking and run a single setup session to scaffold `.llm/workshop/` directly, since this is solo work in a small repo.
