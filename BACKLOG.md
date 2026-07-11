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
**Status:** Ready

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
**Status:** Spec needed

### T3 — Queen movement rules
`PiecesRules.js` hardcodes `validMove = true` for the queen — no validation at
all. Needs real rules (rook + bishop movement combined) with path-blocking.
**Status:** Spec needed

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
