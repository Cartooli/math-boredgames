# MAP Math Prep — Standalone Specification

## 1. Overview

**Purpose:** Endless MAP-style math practice for MAP Growth assessment prep.  
**Entry point:** `map-prep.html`  
**Data source:** Inline `MAP_MATH_QUESTIONS` array in `map-prep.html` (lines ~660–2462).

---

## 2. Data Model

### 2.1 Question object

Each item in `MAP_MATH_QUESTIONS` has:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique id, e.g. `'m1'` … `'m150'`. |
| `difficulty` | string | `'easy'` \| `'medium'` \| `'hard'`. |
| `question` | string | Question text; supports `**bold**` (rendered as `<strong>`). |
| `answerOptions` | array | 4 items: `{ text: string, isCorrect: boolean }`. |
| `hint` | string | Shown on "Show Hint". |

**Count:** 150 questions. No `topic` or category field in the current data.

### 2.2 Session / persisted stats

**In-memory (session):**

- `questions` — shuffled copy of `MAP_MATH_QUESTIONS`.
- `currentIndex` — index of current question.
- `answered` — whether current question has been answered (blocks double-submit).
- `sessionQuestions` — number of questions shown this session (used for progress display).

**Persisted (`localStorage` key `mapPrepStats`):**

- `totalAnswered` — total questions ever answered.
- `correct` — total correct answers.
- `currentStreak` — consecutive correct in current session (reset on wrong or skip).
- `bestStreak` — highest streak ever.

No recording of which questions were missed, by id, difficulty, or topic.

---

## 3. Grading Logic

**Handler:** `mapPrep.selectAnswer(button)`.

1. **Guard:** If `this.answered === true`, return (no double grade).
2. **Correctness:** `isCorrect = (button.dataset.correct === 'true')`.
3. **UI state:** Disable all answer buttons (add `disabled` class).
4. **If correct:**
   - Add class `correct` to chosen button.
   - Increment `stats.correct`, `stats.currentStreak`.
   - If `currentStreak > bestStreak`, set `bestStreak = currentStreak`.
   - If `currentStreak` is a multiple of 5 and > 0, show streak popup.
   - Call `showFeedback(true, "✓ Correct! Great job!")`.
5. **If incorrect:**
   - Add class `incorrect` to chosen button.
   - Set `stats.currentStreak = 0`.
   - Find option with `data-correct === 'true'`, add class `show-correct`.
   - Call `showFeedback(false, "✗ Not quite. See the correct answer above.")`.
6. **Always:** Increment `stats.totalAnswered`, `sessionQuestions`; call `saveStats()`, `updateStatsDisplay()`; enable Next button.

**Answer options:** Rendered with `data-correct="true"` or `"false"`; options are shuffled per question; grading is solely by the clicked button's `data-correct`.

---

## 4. Feedback to the Tester

### 4.1 Immediate feedback

- **Correct:** Message "✓ Correct! Great job!"; chosen option styled as correct (e.g. green).
- **Incorrect:** Message "✗ Not quite. See the correct answer above."; chosen option styled as wrong; correct option revealed with `show-correct` styling.

**Implementation:** `showFeedback(isCorrect, message)` sets `#feedbackMessage` text and classes `visible` + `correct` or `incorrect`.

### 4.2 Hint

- Toggle "Show Hint" / "Hide Hint" reveals `question.hint` in `#hintContent`.
- Hint is per-question only; not used for grading or analytics.

### 4.3 Stats display

**Elements:** `#totalAnswered`, `#currentStreak`, `#bestStreak`, `#accuracy`.

**Accuracy:**  
`totalAnswered > 0` → `Math.round((correct / totalAnswered) * 100)`; else display `--%`.

**When updated:** After each `selectAnswer()` and after skip (for streak only).

### 4.4 Progress

- Progress bar and "X / 50" count are based on `sessionQuestions % 50` (resets every 50 questions).
- Does not represent "correct vs incorrect" or topic.

---

## 5. Navigation and Flow

- **Next:** `nextQuestion()` advances `currentIndex`; if past end of array, reset to 0 and reshuffle full `MAP_MATH_QUESTIONS` (endless loop).
- **Skip:** `skipQuestion()` resets `currentStreak`, increments `sessionQuestions`, then calls `nextQuestion()` (no grade, not recorded as wrong).
- **Initial load:** `init()` loads stats from `mapPrepStats`, shuffles questions, displays first question, updates stats and theme.

---

## 6. Out of Scope (Current Behavior)

- **Struggle analytics:** No tracking of wrong answers by question id, difficulty, or topic. No "areas of struggle" or recommendations.
- **Topic/category:** Questions have no `topic` field; no breakdown by concept.
- **History:** No list of missed questions or wrong-answer history.
- **Adaptivity:** Question order is shuffle + sequential; no difficulty or topic-based selection.
- **Persistence of answers:** Only aggregate counts and streaks are persisted, not which items were missed.

---

## 7. File and Entry Points

| Item | Location |
|------|----------|
| Page + data + engine | `map-prep.html` |
| Question data | `const MAP_MATH_QUESTIONS` (~lines 660–2462) |
| Engine | `const mapPrep` (~lines 2466–2713) |
| Grading | `mapPrep.selectAnswer` |
| Feedback | `mapPrep.showFeedback`, `#feedbackMessage`, `.show-correct` |
| Persistence | `mapPrep.saveStats` / `loadStats`, key `mapPrepStats` |

---

## 8. Optional Future: Struggle Tracking (Not Spec'd In Code)

If "what the tester struggles with" is added later, a minimal spec could include:

- **Record:** On each graded answer, store `{ questionId, difficulty, correct }` (and optionally `topic` once added to data).
- **Persist:** e.g. `mapPrepHistory` in `localStorage` or server.
- **Aggregate:** By `questionId` or `topic` or `difficulty`: count wrong vs total.
- **Feedback:** e.g. "Focus on: Algebra, Fractions" or "You miss more on Hard questions" and/or a list of recommended question ids.

This section is descriptive only; current code does not implement it.
