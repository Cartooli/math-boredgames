# GitHub Discussions Setup Guide

## Step 1: Enable GitHub Discussions

1. Go to your repository: https://github.com/Cartooli/math-boredgames
2. Click **Settings** (top navigation)
3. Scroll down to **Features** section
4. Check the box next to **Discussions**
5. Click **Set up discussions**

## Step 2: Create Discussion Categories

After enabling discussions, create these categories:

### Feature Requests
- **Name:** Feature Requests
- **Description:** Vote on and discuss upcoming features
- **Format:** Announcement (allows reactions/voting)
- **Emoji:** 💡

### Ideas
- **Name:** Ideas
- **Description:** Suggest new features and improvements
- **Format:** Open discussion
- **Emoji:** ✨

### Q&A
- **Name:** Q&A
- **Description:** Questions about using MathBored
- **Format:** Question/Answer
- **Emoji:** ❓

### Bug Reports
- **Name:** Bug Reports
- **Description:** Report issues and bugs
- **Format:** Open discussion
- **Emoji:** 🐛

## Step 3: Create Initial Feature Request Discussions

Create a discussion for each roadmap item:

### High Priority Features

#### 1. Complete Problem Generators (35 Topics)
**Category:** Feature Requests

**Title:** 📚 Complete Problem Generators (35 Topics)

**Body:**
```markdown
## Overview
Currently only 9 of 44 topics have custom problem generators. Users can't practice advanced topics like Trigonometry, Calculus, Matrices, Logarithms, and more.

## Impact
- 🎯 Critical for high school students (Grades 9-12)
- 💪 Affects Practice Mode functionality
- 📊 Blocks learning for 35 important topics

## Needed Generators
- Trigonometry (sin, cos, tan)
- Calculus (derivatives, integrals)
- Matrices operations
- Logarithms
- Exponential functions
- Law of Sines/Cosines
- Sequences and Series
- Standard Deviation
- And 27+ more topics

## Vote
👍 this discussion if you want this feature!
```

#### 2. Comprehensive Lessons (32 Topics)
**Category:** Feature Requests

**Title:** 📖 Comprehensive Lessons (32 Topics)

**Body:**
```markdown
## Overview
Only 12 topics have fully-written lessons. Remaining 32 topics use generic templates with minimal content.

## Impact
- 📝 Affects Lesson Mode quality
- 🎓 All grade levels affected
- 📚 Students need better explanations

## What's Needed
- Detailed explanations for each concept
- More worked examples
- Real-world applications
- Visual examples
- Step-by-step breakdowns

## Vote
👍 this discussion if you want this feature!
```

### Medium Priority Features

Create discussions for:
- 🎨 Interactive Visualizations
- 💡 Progressive Hint System
- 🎚️ Difficulty Levels (Easy/Medium/Hard)
- 📊 Graph Plotting Tool

### Low Priority Features

Create discussions for:
- ⏱️ Timed Challenges & Speed Rounds
- 🖨️ Print-Friendly Worksheets
- 💾 Export/Import Progress

## Step 4: Create Pinned Voting Instructions

Create a pinned announcement explaining how to vote:

**Category:** Announcements (create this category if needed)

**Title:** "How to Vote on Features 👍"

**Body:**
```markdown
## Welcome to MathBored Feature Voting! 🎯

### How to Vote
1. Browse the discussions below
2. Click 👍 (thumbs up) on features you want most
3. Click into the discussion to add comments
4. Features with most 👍 reactions get prioritized!

### Suggesting New Features
1. Click "New discussion"
2. Select "Ideas" category  
3. Describe your feature request
4. Community will discuss and vote

### Privacy Note
Voting requires a GitHub account. If you prefer anonymous feedback, use our [Google Form](https://forms.gle/EgVZZT9ybtyJXHscA).

### Development Status
Check the [Feature Roadmap](https://math.boredgames.site/roadmap.html) to see current priorities and progress.

---

Let's build the future of MathBored together! 🚀

**Made with ❤️ for students everywhere**
```

**Then:** Pin this discussion to the top.

## Step 5: Update Repository Settings

1. Go to **Settings** → **General**
2. Under **Features**, ensure these are enabled:
   - ✅ Discussions
   - ✅ Issues (for bug reports)
   - ✅ Wikis (optional, for documentation)
3. Save changes

## Step 6: Add Discussion Link to README

Update your README.md to include:

```markdown
## 💬 Feedback & Community

### Feature Voting
Visit our [Feature Roadmap](https://math.boredgames.site/roadmap.html) to see what's being built and vote on features you want!

- 🗳️ [Vote on Features](https://github.com/Cartooli/math-boredgames/discussions)
- 💡 [Suggest Ideas](https://github.com/Cartooli/math-boredgames/discussions/new?category=ideas)
- 🐛 [Report Bugs](https://github.com/Cartooli/math-boredgames/discussions/new?category=bug-reports)

### Anonymous Feedback
Prefer to stay anonymous? Use our [feedback form](https://forms.gle/EgVZZT9ybtyJXHscA) (no login required).
```

## Step 7: Optional - GitHub Actions for Auto-Updates

Create `.github/workflows/update-roadmap.yml` to auto-sync votes:

```yaml
name: Update Roadmap Votes

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
  workflow_dispatch:  # Manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Fetch GitHub Discussions
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # Fetch discussion data via GitHub API
          curl -H "Authorization: token $GITHUB_TOKEN" \
               -H "Accept: application/vnd.github.v3+json" \
               https://api.github.com/repos/Cartooli/math-boredgames/discussions \
               > discussions.json
          
          # Process and update roadmap.html
          # (This would need a script to parse JSON and update HTML)
      
      - name: Commit changes
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git diff --quiet || (git add roadmap.html && git commit -m "Update roadmap vote counts")
          git push
```

**Note:** This is optional and requires additional scripting to parse JSON and update HTML.

## Step 8: Promote Your Roadmap

Once set up:

1. **Tweet/Share:** "Help shape MathBored! Vote on features: https://math.boredgames.site/roadmap.html"
2. **Add to App:** The feedback menu already links to the roadmap
3. **Update Docs:** Mention in CONTRIBUTING.md and README.md
4. **Pin Discussions:** Pin top 3-5 features to keep visible

## Testing Your Setup

1. Visit: https://github.com/Cartooli/math-boredgames/discussions
2. Verify all categories exist
3. Check that voting instructions are pinned
4. Test creating a new discussion
5. Test voting with 👍 reaction
6. Visit roadmap.html and click "Vote on GitHub" - should work

## Complete! 🎉

Your community can now democratically vote on MathBored features!

### Next Steps
- Monitor discussions regularly
- Respond to feature requests
- Update roadmap when features are implemented
- Thank contributors and voters!

---

**Questions?** Open a discussion in Q&A category or use the anonymous feedback form.

