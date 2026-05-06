# Living Book Workshop

Working layer for *Technologies of Remembering*. The published book lives in `src/chapters/`. This is where ideas arrive, get triaged, and find their home in the argument before they become prose.

## The four orienting files (read at session start)

- **`claims.md`** — the argument spine. Each claim has a stable ID (`C-NN`). This is the structural truth of the book; chapters are organization.
- **`project-state.md`** — current thesis, flat outline, last-session note. Rewritten end-of-session.
- **`glossary.md`** — book-specific terms with their load-bearing definitions.
- **`not-this-book.md`** — what the book refuses to be. Drawn often.

Plus `AGENT.md` — the standing instruction for the AI agent. Paste at session open.

## The directories

- **`inbox/`** — raw captures (voice memos, typed fragments, citations). Frontmatter: `type`, `status: unprocessed`. No triage at capture time.
- **`fragments/`** — triaged captures. Tagged to claim IDs. Body is line-prefixed `VERBATIM:` / `PARA:` / `MINE:`.

## The loop

```
capture → inbox/        (one input, no decision)
         ↓
triage  → fragments/    (agent proposes claim tags; author confirms)
         ↓
surface → drafting       (given claim ID, return all fragments)
         ↓
draft   → src/chapters/  (author writes prose; agent reviews structure not language)
```

## The rules

1. **Tag by claim, never by chapter.** Chapters reorganize; claims persist.
2. **Capture is friction by design.** Cooling period (advisory, ~14 days) filters novelty-enthusiasm.
3. **The agent never writes prose.** It names logical relationships, surfaces fragments, pushes back. Voice and sentences are the author's. Always.

## `decision-log.md`

Append-only. Date + decision + one-sentence why. The agent reads this to know not just what is, but why.
