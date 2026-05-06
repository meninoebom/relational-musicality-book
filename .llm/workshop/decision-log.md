# Decision Log

*Append-only. Date + decision + one-sentence why. The agent reads this to know why things are the way they are, not just what they are.*

---

**2026-05-05** — Adopted claims-first architecture (claims.md as spine, chapters as organization).
*Why:* fragments tagged to claim IDs survive chapter reorganization; tagging by chapter number couples capture to a structure that will move.

**2026-05-05** — Workshop lives in `.llm/workshop/` inside the book repo, not a sibling directory.
*Why:* one git history, one place to look, agent can see fragments and finished prose in one workspace.

**2026-05-05** — Cooling period (~14 days from inbox → fragments) is advisory, not enforced.
*Why:* mechanical gating gets worked around within a week; the discipline that matters is whether the fragment ties to a real claim, not time-in-quarantine.

**2026-05-05** — `claims.md` seeded via agent-assisted pass over `~/writing/relational-musicality/` source docs.
*Why:* starting from a blank claims register is friction without payoff when there's substantial existing material to mine.

**2026-05-05** — Standing rule: agent does not write prose. Ever.
*Why:* the book's voice is the author's most distinctive asset; agent prose homogenizes toward Claude defaults; constraint must be enforced as a rule, not an intention.
