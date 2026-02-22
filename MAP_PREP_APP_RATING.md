# MAP Math Prep — App Rating (Tutoring Replacement)

**Context:** Rate the app as a potential replacement for ~$500/mo private math tutoring, math classes, etc., for **deliberate practice** (MAP Growth prep).  
**Method:** Full in-browser testing (load, scroll, UI inspection) + code/spec review.  
**Scale:** 1–10 per dimension; 10 = “fully replaces tutoring on this dimension.”

---

## 1. **Deliberate practice structure** — **6/10**

- **Strengths:** Endless MAP-style questions (150), clear correct/incorrect feedback, optional hints, difficulty badges (easy/medium/hard), session progress (0/50), streaks and accuracy. Good for repeated, focused practice.
- **Gaps:** No spaced repetition, no targeting of weak areas, no “practice until mastery” on a topic. Order is shuffle-then-sequential (no adaptivity). Progress resets every 50 (no long-term “syllabus” or topic path). Deliberate practice is partly there but not structured by concept or by what the learner gets wrong.

**Vs. tutoring:** A tutor would target weak spots and assign follow-up; the app does not yet do that.

---

## 2. **Feedback & learning from errors** — **5/10**

- **Strengths:** Immediate correctness, correct answer revealed on wrong choice, short positive/negative messages, optional per-question hints that teach (e.g. “Range = max − min…”).
- **Gaps:** No record of *which* questions were missed (spec: “No recording of which questions were missed, by id, difficulty, or topic”). No “review my mistakes” list, no explanation beyond the hint, no follow-up questions on the same concept. Wrong answers don’t drive what appears next.

**Vs. tutoring:** A tutor would revisit and re-explain; the app only shows the right answer and a hint once.

---

## 3. **Content quality & coverage** — **7/10**

- **Strengths:** 150 questions, mix of arithmetic, fractions, decimals, ratios, basic algebra, coordinate geometry, volume/perimeter, stats (e.g. range), some harder algebra (axis of symmetry, inverse function). Hints are instructional and often give a strategy (e.g. “keep, change, flip”). **Bold** terms in questions (e.g. **ratio**, **unit rate**) support vocabulary. Aligns with MAP-style topics.
- **Gaps:** No topic/category field, so no way to “practice only fractions” or “only algebra.” No difficulty calibration to RIT or grade band. Coverage is good but not labeled by strand for targeted practice.

**Vs. tutoring:** Comparable to a solid worksheet set; tutoring would add live explanation and customization by topic.

---

## 4. **Engagement & motivation** — **7/10**

- **Strengths:** Streaks (current + best), streak popup every 5 correct, accuracy %, session progress 0/50, theme switcher (6 options). Clear “Answered / Streak / Accuracy / Best Streak” panel. Skip and Next keep flow moving. No login lowers friction.
- **Gaps:** No goals (e.g. “10/day”), no badges or levels, no long-term “course” or topic completion. Progress resets every 50 so no visible “I’ve done 200 questions this month.” Good for short sessions; less built-in for sustained habit.

**Vs. tutoring:** Better than a static PDF; less structured than a tutor setting weekly goals and celebrating progress.

---

## 5. **Usability & accessibility** — **8/10**

- **Strengths:** Single-file app (map-prep.html), loads quickly, no backend. Clear hierarchy: hero → stats → progress → question → options → hint → feedback → Next/Skip. Buttons are large (answer options, Skip, Next), good touch targets. Responsive (e.g. 768px, 480px breakpoints in CSS). Theme persistence (localStorage). No console errors observed.
- **Gaps:** No explicit ARIA or screen-reader audit; hint toggle and feedback could be announced. No visible “keyboard-only” flow documented.

**Vs. tutoring:** Ease of use is a clear advantage over scheduling and cost of a tutor.

---

## 6. **Persistence & progress visibility** — **5/10**

- **Strengths:** `mapPrepStats` in localStorage: totalAnswered, correct, currentStreak, bestStreak. Accuracy derived and shown. Survives refresh.
- **Gaps:** No history of sessions, no “last 10 wrong” or “questions I missed,” no export. Progress bar resets every 50; no “all-time” or “this week” view. Parent/guardian cannot see breakdown by topic or difficulty.

**Vs. tutoring:** A tutor would report “we worked on fractions and ratios”; the app does not yet provide that kind of report.

---

## 7. **Adaptivity & personalization** — **3/10**

- **Strengths:** Difficulty shown per question; user can skip.
- **Gaps:** No adaptivity: question order is random then sequential, not based on right/wrong or difficulty. No “focus on my weak topics,” no “easier/harder” mode, no RIT or grade level. Same experience for every user.

**Vs. tutoring:** This is the biggest gap; a tutor constantly adapts to the student.

---

## 8. **Value for money (vs. $500/mo tutoring)** — **6/10**

- **Strengths:** Free, no signup, 150 questions with hints, immediate feedback, streaks, MAP-aligned. Good for low-stakes, daily practice and familiarity with MAP-style items. Can replace *some* drill that a tutor would assign.
- **Gaps:** Cannot replace explanation, dialogue, or targeted remediation. Best as a **supplement**: practice engine + optional tutor for concepts the app doesn’t teach (only hints). No struggle analytics or “what to work on next” limits its role as a full substitute.

**Summary:** Strong as a **practice companion**; not yet a **full tutoring replacement** without struggle tracking, topic targeting, and adaptive sequencing.

---

## Overall score (average of dimensions)

| Dimension                    | Score |
|-----------------------------|-------|
| Deliberate practice structure| 6/10 |
| Feedback & learning from errors | 5/10 |
| Content quality & coverage   | 7/10 |
| Engagement & motivation      | 7/10 |
| Usability & accessibility   | 8/10 |
| Persistence & progress visibility | 5/10 |
| Adaptivity & personalization | 3/10 |
| Value for money (vs. tutoring) | 6/10 |
| **Average**                  | **5.9/10** |

---

## Top 3 improvements to better replace tutoring

1. **Struggle tracking + “focus areas”**  
   Record wrong answers by question id (and, when added, by topic/difficulty). Persist and show “You often miss: [topic/difficulty]” and prioritize or suggest those questions. (Spec §8 outlines this.)

2. **Topic/category + topic-based practice**  
   Add a `topic` (or category) field to each question. Allow “Practice only: Fractions” or “Practice only: Algebra.” Combine with (1) to drive “practice what you get wrong.”

3. **Adaptive or difficulty-aware sequencing**  
   Use correctness and difficulty to choose next question (e.g. more “medium” after a wrong “easy,” or repeat a topic after a miss). Even simple rules would move the app toward tutor-like targeting.

---

## Verdict

- **As a deliberate-practice MAP prep tool:** **6/10** — Good question bank and feedback; structure and targeting are limited.
- **As a full replacement for $500/mo tutoring:** **4/10** — Strong on practice and usability; weak on explanation, adaptation, and “what to work on next.” Best positioned as a **free practice layer** alongside occasional tutoring or classroom instruction, with the above improvements raising it toward a stronger standalone alternative.
