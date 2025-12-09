# Roadmap HTML Changes - Visual Comparison

## Summary of Changes

**Files:**
- Original: `roadmap.html` (current, broken links)
- Updated: `roadmap-with-discussions.html` (fixed links)

**Changes Made:** 18 URL updates (2 per feature × 9 features)

---

## Before vs After

### Feature 1: Complete Problem Generators

**BEFORE (line 335-340):**
```html
<a href="https://github.com/Cartooli/math-boredgames/discussions" target="_blank" class="btn-vote">
    👍 Vote on GitHub
</a>
<a href="https://github.com/Cartooli/math-boredgames/discussions" target="_blank" class="btn-discuss">
    💬 Discuss
</a>
```

**AFTER:**
```html
<a href="https://github.com/Cartooli/math-boredgames/discussions/1" target="_blank" class="btn-vote">
    👍 Vote on GitHub
</a>
<a href="https://github.com/Cartooli/math-boredgames/discussions/1" target="_blank" class="btn-discuss">
    💬 Discuss
</a>
```

---

### Feature 2: Comprehensive Lessons

**BEFORE (line 364-369):**
```html
<a href="https://github.com/Cartooli/math-boredgames/discussions" target="_blank" class="btn-vote">
    👍 Vote on GitHub
</a>
<a href="https://github.com/Cartooli/math-boredgames/discussions" target="_blank" class="btn-discuss">
    💬 Discuss
</a>
```

**AFTER:**
```html
<a href="https://github.com/Cartooli/math-boredgames/discussions/2" target="_blank" class="btn-vote">
    👍 Vote on GitHub
</a>
<a href="https://github.com/Cartooli/math-boredgames/discussions/2" target="_blank" class="btn-discuss">
    💬 Discuss
</a>
```

---

### Feature 3: Interactive Visualizations

**BEFORE → AFTER:**
```
/discussions  →  /discussions/3
```

---

### Feature 4: Progressive Hint System

**BEFORE → AFTER:**
```
/discussions  →  /discussions/4
```

---

### Feature 5: Difficulty Levels

**BEFORE → AFTER:**
```
/discussions  →  /discussions/5
```

---

### Feature 6: Graph Plotting Tool

**BEFORE → AFTER:**
```
/discussions  →  /discussions/6
```

---

### Feature 7: Timed Challenges

**BEFORE → AFTER:**
```
/discussions  →  /discussions/7
```

---

### Feature 8: Print-Friendly Worksheets

**BEFORE → AFTER:**
```
/discussions  →  /discussions/8
```

---

### Feature 9: Export/Import Progress

**BEFORE → AFTER:**
```
/discussions  →  /discussions/9
```

---

## Quick Reference Table

| Feature | Old URL | New URL | Change |
|---------|---------|---------|--------|
| Problem Generators | `/discussions` | `/discussions/1` | ✅ Added `/1` |
| Lessons | `/discussions` | `/discussions/2` | ✅ Added `/2` |
| Visualizations | `/discussions` | `/discussions/3` | ✅ Added `/3` |
| Hint System | `/discussions` | `/discussions/4` | ✅ Added `/4` |
| Difficulty Levels | `/discussions` | `/discussions/5` | ✅ Added `/5` |
| Graph Tool | `/discussions` | `/discussions/6` | ✅ Added `/6` |
| Timed Challenges | `/discussions` | `/discussions/7` | ✅ Added `/7` |
| Worksheets | `/discussions` | `/discussions/8` | ✅ Added `/8` |
| Export/Import | `/discussions` | `/discussions/9` | ✅ Added `/9` |

---

## Lines Changed in HTML

| Feature | Vote Button Line | Discuss Button Line |
|---------|------------------|---------------------|
| Problem Generators | 335 | 338 |
| Lessons | 364 | 367 |
| Visualizations | 401 | 404 |
| Hint System | 430 | 433 |
| Difficulty Levels | 459 | 462 |
| Graph Tool | 488 | 491 |
| Timed Challenges | 525 | 528 |
| Worksheets | 554 | 557 |
| Export/Import | 583 | 586 |

**Total Lines Changed:** 18

---

## Files Overview

### roadmap.html (Current - Broken)
```
Line 335: href="/discussions"     ❌ Generic link
Line 338: href="/discussions"     ❌ Generic link
Line 364: href="/discussions"     ❌ Generic link
Line 367: href="/discussions"     ❌ Generic link
... (14 more generic links)
```

### roadmap-with-discussions.html (Fixed)
```
Line 335: href="/discussions/1"   ✅ Specific discussion
Line 338: href="/discussions/1"   ✅ Specific discussion
Line 364: href="/discussions/2"   ✅ Specific discussion
Line 367: href="/discussions/2"   ✅ Specific discussion
... (14 more specific links)
```

---

## What Didn't Change

These parts remain the same:
- ✅ All CSS styling
- ✅ All HTML structure
- ✅ All text content
- ✅ All vote counts (still hardcoded)
- ✅ Feature descriptions
- ✅ Priority sections
- ✅ "Suggest a Feature" link (line 597)
- ✅ Theme switching script
- ✅ Footer content

**Only the 18 discussion URLs changed.**

---

## Verification Method

After updating, search the file for:
```
href="https://github.com/Cartooli/math-boredgames/discussions"
```

**Expected Result:**
- ✅ Should find only 0 matches (except in comments)
- ✅ All buttons should have `/discussions/[1-9]`

**If you find generic `/discussions` links:**
- ❌ Update missed some URLs
- ❌ Need to fix manually

---

## Testing Pattern

For each feature (1-9):
1. Click "Vote on GitHub" button
2. Should open: `github.com/.../discussions/[N]`
3. Should see the specific feature discussion
4. Should NOT see a 404 error
5. Should NOT see the generic discussions homepage

Where `[N]` matches the feature number (1-9).

---

## Summary

**What:** Changed 18 URLs from generic to specific  
**Why:** So each feature links to its own discussion thread  
**How:** Added discussion number (1-9) to each URL  
**Files:** Created `roadmap-with-discussions.html` as replacement  
**Next:** Enable Discussions → Create threads → Swap files → Test

---

**Ready to use!** The updated file is waiting for you: `roadmap-with-discussions.html`



