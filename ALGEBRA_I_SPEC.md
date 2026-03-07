# Algebra I — Standalone Curriculum Spec

## 1. Overview

**Purpose:** A self-contained, standalone Algebra I course with structured lesson plans, guided practice, and unit quizzes.  
**Entry point:** `algebra-i.html`  
**Data source:** Inline `ALGEBRA_CURRICULUM` array in `algebra-i.html`.  
**Relation to other offerings:**

| Offering | Type | Entry Point |
|---|---|---|
| Essential Math Primer | Sequential K–12 lessons (15 min each) | `primer.html` |
| MAP Test Prep | Endless MAP-style MCQ practice | `map-prep.html` |
| **Algebra I Curriculum** | Full course: 11 units, lessons + practice + quiz | `algebra-i.html` |
| Topic Library | Individual topic lessons/walkthroughs/practice | `math/<topic>/` |

---

## 2. Data Model

### 2.1 Unit object

Each item in `ALGEBRA_CURRICULUM` has:

| Field | Type | Description |
|---|---|---|
| `id` | number | Unit number 1–11 |
| `title` | string | Unit title |
| `objectives` | string | Learning objectives summary |
| `deeperLinks` | array | `{ label, url }` — cross-links to `math/<topic>/` pages |
| `prereqFootnotes` | array | `{ id, text }` — prerequisite background notes |
| `lessons` | array | See §2.2 |
| `practice` | array | See §2.3 |
| `quiz` | array | See §2.4 |

### 2.2 Lesson object

| Field | Type | Description |
|---|---|---|
| `title` | string | Lesson heading |
| `content` | string | HTML lesson content (may include `<b>`, `<sup>`) |
| `formulas` | string[] | Monospace formula strings |
| `example` | object | `{ problem: string, steps: string[] }` |

### 2.3 Practice question object

| Field | Type | Description |
|---|---|---|
| `difficulty` | string | `'easy'` \| `'medium'` \| `'hard'` |
| `question` | string | Question text |
| `options` | string[4] | Answer options |
| `correct` | number | Index of correct option (0–3) |
| `explanation` | string | Shown immediately after answering |

### 2.4 Quiz question object

Same shape as practice (`question`, `options`, `correct`, `explanation`); no `difficulty` field.

---

## 3. Units

| # | Unit Title | Lessons | Practice Qs | Quiz Qs |
|---|---|---|---|---|
| 1 | Foundations of Algebra | 3 | 9 | 5 |
| 2 | Solving Linear Equations | 3 | 9 | 5 |
| 3 | Solving Linear Inequalities | 2 | 6 | 4 |
| 4 | Introduction to Functions | 2 | 6 | 4 |
| 5 | Linear Functions & Graphing | 3 | 6 | 4 |
| 6 | Systems of Linear Equations | 3 | 6 | 4 |
| 7 | Exponents & Exponential Functions | 2 | 6 | 4 |
| 8 | Polynomials & Factoring | 3 | 6 | 4 |
| 9 | Quadratic Functions & Equations | 3 | 6 | 4 |
| 10 | Radicals & Rational Expressions | 2 | 6 | 4 |
| 11 | Data, Statistics & Probability | 2 | 6 | 4 |
| **Total** | | **28** | **78** | **46** |

---

## 4. App State

### 4.1 In-memory (session)

- `STATE.currentUnit` — index of the currently displayed unit (0–10).
- `STATE.currentTab` — `'lesson'` | `'practice'` | `'quiz'`.
- `STATE.answers` — `{ [key]: optionIndex }`. Key format: `"<unitIndex>-p-<questionIndex>"` for practice, `"<unitIndex>-q-<questionIndex>"` for quiz.
- `STATE.quizSubmitted` — `{ [key]: true }`. Key format: `"<unitIndex>-quiz"`.
- `STATE.completedUnits` — `Set<number>` of unit indices that passed the quiz.

### 4.2 Persisted

**`localStorage` key:** `algebraI-progress`  
**Shape:**
```json
{
  "answers": { "<unitIndex>-p-<qi>": 0, ... },
  "quizSubmitted": { "<unitIndex>-quiz": true, ... },
  "completedUnits": [0, 2, 4]
}
```
Loaded on init, saved after every answer and quiz submission.

---

## 5. Grading Logic

### 5.1 Practice

- `answerQ(key, option)`: called on button click.
- Guard: if `STATE.answers[key] !== undefined`, return (no double-grade).
- Sets `STATE.answers[key] = option`.
- Re-renders immediately, showing explanation and correct/incorrect styling.

### 5.2 Quiz

- Answers are recorded like practice but **explanation is not shown until submitted**.
- `submitQuiz()`: validates all questions answered; if not, shows alert.
- Sets `STATE.quizSubmitted["<unitIndex>-quiz"] = true`.
- Counts correct answers; if score ≥ 60%, adds unit index to `STATE.completedUnits` (marks nav button as completed ✓).
- `retakeQuiz()`: clears quiz answers and submission state for the current unit.

---

## 6. Navigation & UI

- **Unit nav bar**: compact buttons (U1–U11), `active` = current, `completed` = passed quiz.
- **Tabs**: Lessons · Practice · Quiz — re-renders the tab content area.
- **Overall progress bar** (top): completed units / 11 units, shown as `%`.
- **"Go Deeper" panel** (below unit header): cross-links to `math/<topic>/walkthrough.html` and `math/<topic>/lesson.html` pages in the topic library.
- **Footnotes section** (bottom of page): lists prerequisite notes for the current unit.
- **Back link**: `← Back to Main App` → `index.html`.

---

## 7. Cross-Links to Topic Library

Each unit includes `deeperLinks` pointing to relevant `math/` topic pages:

| Unit | Deep Links |
|---|---|
| 1 | expressions-and-variables, order-of-operations-pemdas, distributive-property, rational-vs-irrational-numbers, combining-like-terms |
| 2 | one-step-equations, two-step-equations, absolute-value-equations |
| 3 | systems-of-inequalities |
| 4 | functions-introduction, functions, linear-vs-non-linear-functions |
| 5 | standard-form-to-slope-intercept, coordinate-plane, coordinate-graphing |
| 6 | systems-of-equations, systems-of-inequalities |
| 7 | exponential-growth-and-decay, scientific-notation |
| 8 | polynomials, factoring, greatest-common-factor, combining-like-terms |
| 9 | quadratic-equations, completing-the-square, quadratic-formula (lesson) |
| 10 | radical-expressions, roots-and-radicals, rational-functions |
| 11 | normal-distribution, interquartile-range-iqr, bivariate-data, conditional-probability |

---

## 8. Integration Points

- `primer.html`: "Also Try" section links to `algebra-i.html`.
- `index.html` header tagline: includes `<a href="algebra-i.html">𝑥 Algebra I</a>`.
- SEO: `<title>`, `<meta description>`, canonical URL, and JSON-LD Course schema in `algebra-i.html`.

---

## 9. Out of Scope (Current Implementation)

- No server-side persistence — progress is localStorage only.
- No adaptive question selection (questions are in fixed order by difficulty group).
- No per-question wrong-answer history or "focus areas" recommendation.
- No print/export.
- No Algebra II or other course pages — separate files would follow this same spec pattern.

---

## 10. Future Extensions

- Extract `ALGEBRA_CURRICULUM` to `algebra-i-curriculum.json` (parallel to `primer-curriculum.json`) if data needs to be shared across tools.
- Add `topic` field to questions for struggle-tracking (parallel to MAP Prep spec §8).
- Add a "Recommended Next" section linking to the Primer lessons that prereq-chain into each unit (e.g., Unit 2 → `primer/M21.html`).
- Add an Algebra II course (`algebra-ii.html`) following the same spec.
