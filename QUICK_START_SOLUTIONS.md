# ⚡ Quick Start: Solution Extraction

Get started extracting Math Olympiad solutions in 5 minutes.

---

## Step 1: Extract Images (3 minutes)

```bash
cd /path/to/math-boredgames
node extract-images.js
```

**Result:** Creates `olympiad-images/` folder with 170 PNG files

---

## Step 2: Choose Your Path

### Path A: Full Automation (Recommended)
**Cost:** ~$1 | **Time:** ~40 hours | **Accuracy:** 95%+

1. Sign up for **Math Pix OCR:** https://mathpix.com
2. Get API key
3. Run batch OCR (see `OCR_WORKFLOW.md`)
4. Review OCR output (8-14 hours)
5. Enter solutions via `solution-entry.html` (28-42 hours)

### Path B: Manual Only
**Cost:** $0 | **Time:** ~60 hours | **Accuracy:** 98%+

1. Open `solution-entry.html`
2. For each problem:
   - View image
   - Solve problem
   - Enter solution
   - Mark verified

### Path C: Hybrid (Best Balance)
**Cost:** $0 | **Time:** ~45 hours | **Accuracy:** 95%+

1. Use free Google Cloud Vision OCR
2. Manual review and correction
3. Search external sources for known problems
4. Solve remaining manually

---

## Step 3: Enter First Solution (2 minutes)

1. Open `solution-entry.html` in browser
2. Click Problem #1
3. Fill in the form:
   - Answer: `42`
   - Steps: "Step 1: ...", "Step 2: ..."
   - Explanation: Brief description
   - Hints: Helpful nudges
4. Check "Mark as verified"
5. Click "Save Solution"

---

## Step 4: See It Live (30 seconds)

1. Open `olympiad.html`
2. Navigate to Problem #1
3. Click "✅ Solution" section
4. See your solution displayed!

---

## 💡 Pro Tips

1. **Start easy:** Begin with problems you can solve quickly
2. **Batch similar:** Group algebraic problems together
3. **Take breaks:** Quality > speed
4. **Export often:** Backup your work daily
5. **Verify later:** Can mark verified in second pass

---

## 📊 Progress Tracking

**Daily goal:** 10 problems = ~3 hours

| Day | Problems | Total | Hours |
|-----|----------|-------|-------|
| 1-2 | 20 | 20 | 6 |
| 3-4 | 20 | 40 | 12 |
| 5-6 | 20 | 60 | 18 |
| 7-8 | 20 | 80 | 24 |
| 9-10 | 20 | 100 | 30 |
| 11-13 | 30 | 130 | 39 |
| 14-17 | 40 | 170 | 51 |

**~17 days at 10 problems/day**

---

## 🎯 Quality Checklist

Before marking verified:
- [ ] Answer is correct
- [ ] Steps make sense
- [ ] No arithmetic errors
- [ ] Explanation is clear
- [ ] Hints help but don't spoil

---

## 🆘 Quick Troubleshooting

**Can't run extract-images.js?**
```bash
# Install Node.js first
brew install node  # Mac
# or download from nodejs.org
```

**Solutions not showing on olympiad.html?**
- Refresh the page
- Check browser console for errors
- Verify `olympiad-solutions.js` loaded

**Lost your work?**
- Click "Export All Solutions" regularly
- Save JSON files to cloud storage
- Import if needed to restore

---

## 📚 Full Documentation

- **System Overview:** `SOLUTION_SYSTEM_SUMMARY.md`
- **OCR Details:** `OCR_WORKFLOW.md`
- **Complete Guide:** `SOLUTION_EXTRACTION_README.md`
- **User Features:** `OLYMPIAD_FEATURES.md`

---

## ✅ You're Ready!

```bash
# Extract images
node extract-images.js

# Open entry interface
open solution-entry.html

# Start solving!
```

Good luck! 🚀





