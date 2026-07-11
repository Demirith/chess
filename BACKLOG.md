# Backlog

Tracking the work to bring this project to a rule-correct, tested "standard chess"
implementation.

## How we work this backlog

- Each ticket below gets its own branch and its own PR.
- **Spec owner:** the EM (repo owner) writes the Acceptance Criteria for a ticket
  before work starts. If AC is missing or ambiguous, the engineer (Claude) asks
  clarifying questions rather than guessing.
- **Definition of done**, applies to every ticket, not repeated per-ticket below:
  - Acceptance criteria met.
  - Unit tests covering the new/changed behavior (and updated existing tests
    that the change legitimately invalidates).
  - `npm test` passes.
  - No unrelated refactors bundled into the diff.
  - PR description explains what changed and why.
- Status values: `Not started` / `Spec needed` / `Ready` / `In progress` / `In review` / `Done`.

## Scope

Target: **Must + Should** tiers below constitute "done" for this pass. Castling,
en passant, and UI polish are explicitly out of scope for now (logged at the
bottom as a future "Could" tier, not committed to).

---

## Must (game-breaking bugs — the game does not follow chess rules without these)

### T1 — Turn enforcement
Right now either color can move any piece at any time. Need to track whose turn
it is and reject moves by the wrong color.
**Status:** Done

**Acceptance criteria:**
- A new game starts with white to move.
- Clicking/selecting a piece that does not belong to the player whose turn it
  is results in a silent no-op: no selection, no error, no state change.
- When a move by the correct-turn player is accepted by the existing move
  rules (`PiecesRules.js`), turn switches to the other color immediately
  after the piece's position updates.
- An illegal move attempt (already rejected today by move rules, e.g. a bad
  knight move) does not change whose turn it is.

**Out of scope:**
- Any visible UI indicator of whose turn it is — logic/state only this ticket.
- Any change to per-piece movement legality itself (queen rules, capture
  logic, etc. are separate tickets).

### T2 — Capture logic
Moving onto a square with an opposing piece doesn't remove that piece from the
board (both pieces end up overlapping). Moving onto a square with your own piece
is currently allowed and should be blocked.
**Status:** Ready

**Acceptance criteria:**
- Moving a piece onto a square occupied by an opponent's piece, where the move
  is otherwise legal for that piece type, removes the opponent's piece and the
  moving piece takes its place (no overlap).
- `rules()` rejects any move onto a square occupied by a piece of your own
  color, regardless of piece type. This is a defense-in-depth check inside
  `PiecesRules.js` itself (not just relying on the Board.js click-handling
  behavior from T1, which already avoids attempting such a move via
  reselection).
- Pawn rules are extended to allow capturing: a pawn may move one square
  diagonally forward (toward the opponent's side) only when an opponent's
  piece occupies that square. This is in addition to the existing
  straight-forward movement, which still never captures.
- A pawn may not move diagonally onto an empty square.
- Existing path-blocking behavior for rook/bishop is unaffected: the square
  being moved *to* is not itself checked as part of the blocked path (only
  squares strictly in between), so capturing at the end of a clear path
  continues to work.

**Out of scope:**
- En passant (already logged separately in the "Could" tier).
- Any change to check/checkmate detection.

### T3 — Queen movement rules
`PiecesRules.js` hardcodes `validMove = true` for the queen — no validation at
all. Needs real rules (rook + bishop movement combined) with path-blocking.
**Status:** Ready

**Acceptance criteria:**
- A queen move is legal if it satisfies rook movement rules (straight line)
  OR bishop movement rules (diagonal) — reusing `rookRules`/`bishopRules`
  directly rather than duplicating the logic.
- The path between the queen's current and destination square must be clear,
  reusing the existing `checkPath` function, same as rook/bishop.
- Queen moves are subject to the same same-color/capture handling as every
  other piece (from T2) — no queen-specific exception.

---

## Should (needed to honestly call this "standard chess")

### T4 — Piece/state model cleanup
`pieces` state is stored as an array wrapping a single array
(`setPieces([copyPiecesArrayWithNewPosition])`), read via
`pieces[pieces.length - 1]` everywhere. Flagged in the code itself as unclear
("why array with an array?"). Needs a clean single-array model before check
detection and later move-history-dependent rules build on top of it.
**Status:** Spec needed
**Depends on:** none, but blocks T5–T8 (cleaner to build check/checkmate logic
on the new model).

### T5 — Check detection
Determine whether a given king is currently in check, given a board position.
**Status:** Spec needed
**Depends on:** T4

### T6 — No moving into check
A move that would leave the moving player's own king in check must be rejected,
even if it's otherwise legal for that piece.
**Status:** Spec needed
**Depends on:** T5

### T7 — Checkmate detection
Game ends when the side to move is in check and has no legal move that escapes it.
**Status:** Spec needed
**Depends on:** T6

### T8 — Stalemate detection
Game is a draw when the side to move is not in check but has no legal move at all.
**Status:** Spec needed
**Depends on:** T6

### T9 — Pawn promotion
A pawn reaching the last rank must promote. Open question for the spec: choice
of piece, or auto-queen for now?
**Status:** Spec needed

### T10 — Docs pass
Update README to accurately describe the ruleset actually implemented once the
above land, so the repo doesn't overclaim or underclaim what it does.
**Status:** Not started (last ticket, after T1–T9)

---

## Could (explicitly out of scope for this pass — logged, not committed to)

- Castling
- En passant
- UI: turn indicator, legal-move highlighting, check/checkmate banner
- Move undo/redo (would build on T4's cleaner state model)

---

## Tech debt (tracked, not scheduled)

### TD1 — Dependency & tooling refresh
The project is old and unmaintained: GitHub/Dependabot currently flags 105
vulnerabilities on the default branch (5 critical, 48 high, 39 moderate, 13
low). `npm install` requires skipping the Cypress binary download to
succeed in this environment, and `react-scripts start` (dev server hot
reload) fails here on an unrelated `react-refresh` module-resolution error —
`npm run build` (production) compiles and runs fine, so this looks tooling/
environment-specific rather than a code problem, but it needs a real
investigation, not an assumption.

react-scripts (Create React App) itself has had no major release in years,
so "update dependencies" may not be a simple `npm audit fix` — it could mean
migrating off CRA (e.g., to Vite) to land on something still maintained.
Scope and approach need discovery before this becomes a real, sized ticket.

**Status:** Backlog — not scheduled this pass. Revisit if outdated tooling
starts actively blocking the Must/Should chess-rules work, or after that
scope is done.
