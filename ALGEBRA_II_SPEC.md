# Algebra II — Standalone Curriculum Spec

## 1. Overview

**Purpose:** A self-contained, standalone Algebra II course with structured lesson plans, guided practice, and unit quizzes.  
**Entry point:** `algebra-ii.html`  
**Data source:** Inline `ALGEBRA2_CURRICULUM` array in `algebra-ii.html`.  
**Relation to other offerings:**

| Offering | Type | Entry Point |
|---|---|---|
| Essential Math Primer | Sequential K–12 lessons (15 min each) | `primer.html` |
| MAP Test Prep | Endless MAP-style MCQ practice | `map-prep.html` |
| Algebra I Curriculum | Full course: 11 units | `algebra-i.html` |
| **Algebra II Curriculum** | Full course: 12 units, lessons + practice + quiz | `algebra-ii.html` |
| Topic Library | Individual topic lessons/walkthroughs/practice | `math/<topic>/` |

---

## 2. Data Model

### 2.1 Unit object

Each item in `ALGEBRA2_CURRICULUM` has:

| Field | Type | Description |
|---|---|---|
| `id` | number | Unit number 1–12 |
| `title` | string | Unit title |
| `objectives` | string | Learning objectives summary |
| `deeperLinks` | array | `{ label, url }` — cross-links to `math/<topic>/` and `glossary/<topic>.html` pages |
| `prereqs` | array | `{ id, text }` — prerequisite background notes |
| `lessons` | array | See §2.2 |
| `practice` | array | See §2.3 |
| `quiz` | array | See §2.4 |

### 2.2 Lesson object

| Field | Type | Description |
|---|---|---|
| `title` | string | Lesson heading |
| `content` | string | HTML lesson content |
| `formulas` | string[] | Monospace formula strings |
| `example` | object | `{ problem: string, steps: string[] }` |

### 2.3 Practice question object

| Field | Type | Description |
|---|---|---|
| `difficulty` | string | `'easy'` \| `'medium'` \| `'hard'` |
| `question` | string | Question text |
| `options` | string[4] | Answer options |
| `correct` | number | Index of correct option (0–3) |
| `explanation` | string | Shown immediately after answering (practice) or on quiz submit |

### 2.4 Quiz question object

Same shape as practice minus `difficulty`; explanation shown only after quiz submission.

---

## 3. Units

| # | Unit Title | Lessons | Practice Qs | Quiz Qs |
|---|---|---|---|---|
| 1 | Equations & Inequalities Review | 3 | 9 | 5 |
| 2 | Linear Functions & Systems (Advanced) | 3 | 9 | 5 |
| 3 | Quadratic Functions & Complex Numbers | 3 | 9 | 5 |
| 4 | Polynomial Functions | 3 | 9 | 5 |
| 5 | Rational Functions & Expressions | 3 | 9 | 5 |
| 6 | Radical Functions & Rational Exponents | 3 | 9 | 5 |
| 7 | Exponential & Logarithmic Functions | 3 | 9 | 5 |
| 8 | Sequences & Series | 3 | 9 | 5 |
| 9 | Conic Sections | 3 | 9 | 5 |
| 10 | Probability & Combinatorics | 3 | 9 | 5 |
| 11 | Introduction to Matrices | 3 | 9 | 5 |
| 12 | Introduction to Trigonometry | 3 | 9 | 5 |
| **Total** | | **36** | **108** | **60** |

---

## 4. App State

### 4.1 In-memory (session)

- `STATE.currentUnit` — index of the currently displayed unit (0–11).
- `STATE.currentTab` — `'lesson'` | `'practice'` | `'quiz'`.
- `STATE.answers` — `{ [key]: optionIndex }`. Key format: `"<unitIndex>-p-<qi>"` for practice, `"<unitIndex>-q-<qi>"` for quiz.
- `STATE.quizSubmitted` — `{ "<unitIndex>-qz": true }`.
- `STATE.completedUnits` — `Set<number>` of unit indices that passed the quiz.

### 4.2 Persisted

**`localStorage` key:** `algebraII-progress`  
**Shape:**
```json
{
  "answers": { "<unitIndex>-p-<qi>": 0, "<unitIndex>-q-<qi>": 2, ... },
  "quizSubmitted": { "<unitIndex>-qz": true, ... },
  "completedUnits": [0, 3, 7]
}
```
Loaded on init, saved after every answer and quiz submission.

---

## 5. Grading Logic

### 5.1 Practice

- `answerQ(key, option)`: records answer; re-renders showing explanation and styling immediately.
- Guard: if `STATE.answers[key] !== undefined` (and not an unsubmitted quiz), return early.

### 5.2 Quiz

- Quiz answers are highlighted (`.quiz-sel`) but **explanations are hidden** until `submitQuiz()`.
- `submitQuiz()`: requires all questions answered. On submit, records `STATE.quizSubmitted["<unitIndex>-qz"] = true`.
- Score ≥ 60% → unit added to `STATE.completedUnits` (nav shows `✓ U<n>`).
- `retakeQuiz()`: clears quiz answers, submission, and completion for the current unit.

---

## 6. Quiz vs Practice Key Difference

The quiz uses key suffix `-q-<i>` and checks `STATE.quizSubmitted["<unitIndex>-qz"]` to decide whether to show feedback. Practice uses key suffix `-p-<i>` and always shows feedback immediately. The `renderQuestion()` function handles both via the `isQuizUnsubmitted` flag.

---

## 7. Navigation & UI

- **Unit nav bar** (U1–U12): `active` = current unit, `completed` = passed quiz (green border + ✓).
- **Tabs**: Lessons · Practice · Quiz.
- **Overall progress bar**: completed units / 12 units.
- **"Go Deeper" panel**: cross-links to existing `math/<topic>/walkthrough.html` and `glossary/<topic>.html` pages.
- **Footnotes section**: prerequisite notes for the current unit.
- **Back link**: `← Back to Main App` → `index.html`.

---

## 8. Cross-Links to Topic Library

| Unit | Deep Links |
|---|---|
| 1 | absolute-value-equations, systems-of-inequalities, one-step-equations |
| 2 | functions, functions-introduction, systems-of-equations, linear-vs-non-linear-functions |
| 3 | quadratic-equations, completing-the-square, complex-numbers, quadratic-formula (lesson) |
| 4 | polynomials, polynomial-division, factoring |
| 5 | rational-functions, factoring |
| 6 | radical-expressions, roots-and-radicals, rational-functions |
| 7 | exponential-growth-and-decay, logarithms |
| 8 | sequences-and-series |
| 9 | conic-sections, circles, completing-the-square |
| 10 | combinations-and-permutations, conditional-probability |
| 11 | glossary/matrices |
| 12 | unit-circle, parent-functions, pythagorean-theorem |

---

## 9. Integration Points

- `primer.html`: "Also Try" section includes Algebra II card linking to `algebra-ii.html`.
- `index.html` header tagline: includes `<a href="algebra-ii.html">𝑥² Algebra II</a>`.
- `algebra-i.html`: future enhancement — "Next Course" link to Algebra II could be added.
- SEO: title, meta description, canonical URL, and JSON-LD Course schema in `algebra-ii.html`.

---

## 10. Relation to Algebra I (`algebra-i.html`)

| Aspect | Algebra I | Algebra II |
|---|---|---|
| Entry point | `algebra-i.html` | `algebra-ii.html` |
| localStorage key | `algebraI-progress` | `algebraII-progress` |
| Units | 11 | 12 |
| Accent color | `var(--accent)` blue | `#a855f7` purple |
| Quiz submit key | `<unit>-quiz` | `<unit>-qz` |
| Quiz selected styling | none (answered immediately) | `.quiz-sel` (highlighted before submit) |
| Progress bar color | blue | purple gradient |

The Algebra II quiz has a **"quiz-selected" pre-submit highlight** behavior (matching the original source HTML), whereas Algebra I shows feedback immediately. Both persist to localStorage and follow the same overall architecture.

---

## 11. Out of Scope (Current Implementation)

- No server-side persistence.
- No adaptive question ordering.
- No per-question wrong-answer history.
- No "Algebra I → Algebra II" automatic progress carry-over.
- No print/export.
