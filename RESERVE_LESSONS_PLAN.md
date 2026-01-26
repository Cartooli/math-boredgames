# Reserve Lessons Topic Plan (R49-R75)

## Overview

The Essential Math Primer includes 27 reserve lesson slots (R49-R75) designed for curriculum expansion. These lessons cover **advanced topics**, **real-world applications**, **common misconceptions**, and **specialized content** to deepen understanding beyond the core K-12 curriculum (lessons 1-48).

## Implementation Status

✅ **Infrastructure Complete** (as of January 2026)
- Reserve lessons defined in `primer-curriculum.json` as "Reserve & Extensions" grade band
- All 27 slots have titles, descriptions, key concepts, and prerequisites
- Placeholder pages generated with "Coming Soon" content
- Navigation and progress tracking working
- SEO and sitemap integration complete

🚧 **Content Development** (In Progress)
- Individual lessons will be authored incrementally using `LESSON_TEMPLATE.md`
- Each lesson requires ~15 minutes of focused learning content
- Community feedback will guide content priorities

## Topic Breakdown by Category

### Advanced Topics (15 lessons)
Building mathematical sophistication and advanced techniques

| Lesson | Title | Prerequisites | Key Concepts |
|--------|-------|--------------|--------------|
| R49 | Scientific Notation | M23, M16 | powers of 10, standard form, order of magnitude |
| R50 | Introduction to Inequalities | M21, M19 | inequality symbols, number line, solving |
| R54 | Distance Formula | M25, H29, M24 | coordinate plane, Pythagorean theorem |
| R59 | Absolute Value Equations | M19, M21 | distance interpretation, two solutions |
| R60 | Line of Best Fit & Linear Regression | H29, H47, H48 | trend lines, prediction, correlation |
| R61 | Combinations & Permutations | H46, E11 | counting principles, nCr, nPr, factorial |
| R62 | Conditional Probability | H46 | P(A\|B), dependent events |
| R64 | Function Transformations | H29, H34, H45 | shifts, stretches, reflections |
| R65 | Rational Functions & Asymptotes | H40, H35 | asymptotic behavior, domain restrictions |
| R66 | Rational Exponents | M23, M24 | fractional exponents, nth roots |
| R67 | Introduction to Complex Numbers | H35 | imaginary unit i, complex operations |
| R68 | Law of Sines | H43, H44 | non-right triangles, ambiguous case |
| R69 | Law of Cosines | H43, R68 | generalized Pythagorean theorem, SAS/SSS |
| R70 | Arc Length & Sector Area | H44, E09 | radians, circle geometry |
| R71 | Sigma Notation & Finite Series | H41, H42 | summation, arithmetic/geometric series |

### Applications (3 lessons)
Real-world contexts and practical uses

| Lesson | Title | Prerequisites | Key Concepts |
|--------|-------|--------------|--------------|
| R51 | Percent Applications | M17 | tax, tip, discount, markup |
| R56 | Simple Interest | M17, M20 | I = PRT, financial literacy |
| R57 | Compound Interest | H38, M17 | exponential growth, compounding periods |

### Common Misconceptions (5 lessons)
Addressing frequent errors and building conceptual clarity

| Lesson | Title | Prerequisites | Key Concepts |
|--------|-------|--------------|--------------|
| R52 | Why Division by Zero is Undefined | E05, M21 | mathematical reasoning, limits |
| R53 | Why We 'Flip and Multiply' for Fraction Division | M15 | reciprocal, multiplicative inverse |
| R58 | PEMDAS Pitfalls | M22 | order of operations, implicit grouping |
| R63 | Mean vs Median: When to Use Which | H47, E12 | outliers, skewed data, interpretation |
| R74 | Area vs Perimeter Confusion | E09 | units, dimensional analysis |

### Specialized Topics (3 lessons)
Tools and techniques for mathematical problem-solving

| Lesson | Title | Prerequisites | Key Concepts |
|--------|-------|--------------|--------------|
| R55 | Combining Like Terms & Distributive Property | M20, M22 | algebraic manipulation, simplification |
| R72 | Estimation & Reasonableness | E08, M16, M17 | number sense, mental math, approximation |
| R73 | Box Plots & Interquartile Range | H47 | five-number summary, quartiles, outliers |

### Community-Driven (1 lesson)
Reserved for highest-priority community requests

| Lesson | Title | Prerequisites | Key Concepts |
|--------|-------|--------------|--------------|
| R75 | Community Choice Topic | TBD | to be determined based on feedback |

## Curriculum Integration

### Grade Band Structure

The reserve lessons are organized as a fourth grade band in `primer-curriculum.json`:

```json
{
  "band": "Reserve & Extensions",
  "grade_span": "K-12",
  "lesson_count": 27,
  "lessons": [...]
}
```

### Prerequisites Graph

All reserve lessons build on the core curriculum (E01-E12, M13-M27, H28-H48). Key prerequisite chains:

- **Number Systems:** E01 → M19 → R50, R59
- **Fractions/Decimals:** E06 → M13-M17 → R51, R52, R53, R56, R57
- **Algebra:** M20-M22 → R55, R58 → H28-H35 → R54, R59, R64, R65
- **Functions:** M26-M27 → H28-H48 → R60, R64, R65
- **Geometry:** E09 → H43-H45 → R68, R69, R70
- **Data/Probability:** E12 → H46-H48 → R60, R61, R62, R63, R73

### Completion Tracking

- Progress bar tracks **48 core lessons** (E01-H48) for 100% completion
- Reserve lessons counted separately as bonus/extension content
- Individual completion status stored in `localStorage` for each lesson

## Content Development Workflow

### To Fill a Single Reserve Slot

1. **Choose the lesson** (e.g., R49: Scientific Notation)
2. **Update the lesson in curriculum** (if needed):
   - Verify title, description, key_concepts, prerequisites are accurate
   - Set `is_reserve: false` in the curriculum data (optional flag)
3. **Author the content** following `LESSON_TEMPLATE.md`:
   - Hook & Context (2 min)
   - Core Concept Explanation (5-6 min)
   - Worked Examples (4-5 min)
   - Practice Problems (2-3 min)
   - Key Takeaways (1 min)
   - Looking Ahead (1 min)
4. **Edit the HTML file** (`primer/R49.html`):
   - Replace the "Coming Soon" section with full lesson content
   - Keep header, navigation, and structure intact
5. **Regenerate if using generator**:
   - If content is in curriculum JSON: `node generate-primer-pages.js`
   - If custom HTML: manual edit is fine
6. **Update sitemap**: `node update-sitemap-primer.js`
7. **Test the lesson** in browser

### Bulk Generation

To regenerate all primer pages (including reserves) from the curriculum:

```bash
node generate-primer-pages.js
```

This will:
- Read all 75 lessons from `primer-curriculum.json`
- Generate HTML files for each lesson
- Preserve reserve status (shows "Coming Soon" for reserves)
- Update navigation between lessons

## File Dependencies

### Core Files

| File | Purpose | Contains Reserve Data? |
|------|---------|----------------------|
| `primer-curriculum.json` | **Source of truth** for all lessons | ✅ Yes - all 27 reserves defined |
| `primer-curriculum.js` | Loads curriculum for client-side | ✅ Reads from JSON |
| `generate-primer-pages.js` | Generates HTML files | ✅ Reads from JSON |
| `add-seo-to-existing-lessons.js` | Adds SEO tags | ✅ Reads from JSON |
| `update-sitemap-primer.js` | Updates sitemap | ✅ Reads from JSON |

### Generated Files

- `primer/R49.html` through `primer/R75.html` - individual lesson pages
- `sitemap.xml` - includes all primer URLs
- `primer.html` - overview page with all 75 lessons

## Design Rationale

### Why These Topics?

The 27 reserve topics were chosen to:

1. **Fill K-12 gaps** not covered in core 48 lessons (e.g., scientific notation, inequalities, complex numbers)
2. **Address misconceptions** that commonly block student progress (division by zero, PEMDAS pitfalls, area vs perimeter)
3. **Provide real-world context** through applications (interest calculations, percent applications)
4. **Deepen understanding** with conceptual explanations (why "flip and multiply," mean vs median)
5. **Extend to advanced topics** for motivated learners (laws of sines/cosines, sigma notation, function transformations)

### Topic Distribution

- **Advanced topics:** 56% (15/27) - for students ready to go deeper
- **Misconceptions:** 19% (5/27) - high-impact clarifications
- **Applications:** 11% (3/27) - real-world relevance
- **Specialized:** 11% (3/27) - problem-solving tools
- **Community:** 4% (1/27) - responsive to feedback

### Sequencing Strategy

Lessons are numbered R49-R75 to:
- Maintain clear progression after H48
- Allow flexible fill order (e.g., R51 before R49 is fine)
- Preserve URL structure even as content evolves
- Signal "extension" status distinct from core curriculum

## Future Enhancements

### Short-term
- Author 3-5 high-priority lessons based on community requests
- Add interactive visualizations for key concepts
- Create practice problem banks for each lesson

### Long-term
- Expand to 100 lessons if demand warrants
- Add video explanations for complex topics
- Build adaptive pathways based on student progress
- Integrate with external resources and tools

## Community Feedback

To request a specific topic or suggest content for R75 (Community Choice):
- Open an issue on the project repository
- Use the feedback form on the website
- Vote on proposed topics in discussions

Priority will be given to:
1. Most-requested topics from users
2. Misconceptions causing frequent errors
3. Topics that bridge to advanced coursework
4. Applications with broad real-world relevance

## Maintenance

### Updating Reserve Lessons

All changes should be made in `primer-curriculum.json` as the single source of truth. After editing:

```bash
# Regenerate lesson pages
node generate-primer-pages.js

# Update sitemap
node update-sitemap-primer.js

# Add SEO tags if needed
node add-seo-to-existing-lessons.js
```

### Adding New Reserve Topics Beyond R75

To expand beyond 75 lessons:

1. Add new lesson objects to "Reserve & Extensions" band in curriculum
2. Assign sequential IDs (R76, R77, etc.)
3. Update `total_with_reserves` count in curriculum
4. Regenerate pages and sitemap

## Summary

The Reserve Lessons (R49-R75) provide a structured expansion path for the Essential Math Primer, covering advanced topics, applications, misconceptions, and specialized content. All 27 slots are defined with clear titles, descriptions, and prerequisites, ready for incremental content authoring as community needs and priorities emerge.

**Status:** Infrastructure complete, content development in progress.

**Next Steps:** Author individual lesson content using `LESSON_TEMPLATE.md`, starting with highest-priority topics.
