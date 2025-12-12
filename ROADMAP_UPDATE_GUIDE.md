# Roadmap HTML Update Guide

## Overview

After creating GitHub Discussions, you need to update `roadmap.html` to link each feature to its specific discussion thread.

## Step 1: Create Discussions & Note Their Numbers

After enabling discussions and creating each thread, GitHub will assign them sequential numbers. You'll see URLs like:
- `https://github.com/Cartooli/math-boredgames/discussions/1`
- `https://github.com/Cartooli/math-boredgames/discussions/2`
- etc.

**Create discussions in this order** to match the mapping below:

1. 📚 Complete Problem Generators (35 Topics)
2. 📖 Comprehensive Lessons (32 Topics)
3. 🎨 Interactive Visualizations
4. 💡 Progressive Hint System
5. 🎚️ Difficulty Levels (Easy/Medium/Hard)
6. 📊 Graph Plotting Tool
7. ⏱️ Timed Challenges & Speed Rounds
8. 🖨️ Print-Friendly Worksheets
9. 💾 Export/Import Progress

## Step 2: Update roadmap.html

### Method A: Use the Pre-Built File (Easiest)

A ready-to-use version of `roadmap.html` with all URLs updated is saved as:
- `roadmap-with-discussions.html`

**After creating your discussions:**
1. Open `roadmap-with-discussions.html`
2. Verify the discussion numbers match (1-9)
3. Rename `roadmap.html` to `roadmap-old.html` (backup)
4. Rename `roadmap-with-discussions.html` to `roadmap.html`
5. Test the links

### Method B: Manual Search & Replace

If discussion numbers don't match 1-9, use find-and-replace:

#### Changes Needed (18 total link updates):

**Feature 1: Complete Problem Generators**
- Find: `<a href="https://github.com/Cartooli/math-boredgames/discussions" target="_blank" class="btn-vote">`
- Replace with: `<a href="https://github.com/Cartooli/math-boredgames/discussions/1" target="_blank" class="btn-vote">`
- Location: Lines ~335 and ~338 (vote and discuss buttons)

**Feature 2: Comprehensive Lessons**
- Replace discussion URLs on lines ~364 and ~367
- New URL: `.../discussions/2`

**Feature 3: Interactive Visualizations**
- Replace discussion URLs on lines ~401 and ~404
- New URL: `.../discussions/3`

**Feature 4: Progressive Hint System**
- Replace discussion URLs on lines ~430 and ~433
- New URL: `.../discussions/4`

**Feature 5: Difficulty Levels**
- Replace discussion URLs on lines ~459 and ~462
- New URL: `.../discussions/5`

**Feature 6: Graph Plotting Tool**
- Replace discussion URLs on lines ~488 and ~491
- New URL: `.../discussions/6`

**Feature 7: Timed Challenges**
- Replace discussion URLs on lines ~525 and ~528
- New URL: `.../discussions/7`

**Feature 8: Print-Friendly Worksheets**
- Replace discussion URLs on lines ~554 and ~557
- New URL: `.../discussions/8`

**Feature 9: Export/Import Progress**
- Replace discussion URLs on lines ~583 and ~586
- New URL: `.../discussions/9`

**Feature Suggestion Button**
- Line ~597: Already correctly links to `/discussions/new?category=ideas`
- No change needed

## Step 3: Optional - Auto-Sync Vote Counts

Currently, vote counts are hardcoded in the HTML:
```html
<span id="votes-generators">42</span>
```

### Option A: Keep Static (Simple)
- Update manually when you check discussions
- Low maintenance, but requires periodic updates

### Option B: Dynamic Loading (Advanced)
Add this JavaScript at the end of `roadmap.html` (before `</body>`):

```javascript
// Fetch real vote counts from GitHub API
async function updateVoteCounts() {
    const REPO = 'Cartooli/math-boredgames';
    const discussionIds = {
        'votes-generators': 1,
        'votes-lessons': 2,
        'votes-visualizations': 3,
        'votes-hints': 4,
        'votes-difficulty': 5,
        'votes-graphing': 6,
        'votes-timed': 7,
        'votes-print': 8,
        'votes-export': 9
    };

    for (const [elementId, discussionNumber] of Object.entries(discussionIds)) {
        try {
            const response = await fetch(
                `https://api.github.com/repos/${REPO}/discussions/${discussionNumber}/reactions`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );
            
            if (response.ok) {
                const reactions = await response.json();
                const thumbsUpCount = reactions.filter(r => r.content === '+1').length;
                
                const element = document.getElementById(elementId);
                if (element) {
                    element.textContent = thumbsUpCount;
                }
            }
        } catch (error) {
            console.log(`Could not fetch votes for ${elementId}:`, error);
        }
    }
}

// Update counts on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateVoteCounts);
} else {
    updateVoteCounts();
}
```

**Note:** GitHub API has rate limits (60 requests/hour unauthenticated). For most traffic, this is fine.

## Step 4: Test Everything

### Pre-Deployment Checklist

Open `roadmap.html` locally and verify:

- [ ] All 9 "Vote on GitHub" buttons have unique URLs
- [ ] All 9 "Discuss" buttons have unique URLs  
- [ ] "Suggest a Feature" button works
- [ ] No duplicate discussion links
- [ ] No remaining generic `/discussions` URLs (except suggest feature)

### Post-Deployment Testing

After deploying to https://math.boredgames.site/roadmap.html:

1. **Test Each Vote Button:**
   - [ ] Click "Vote on GitHub" for Problem Generators → Goes to discussion #1
   - [ ] Click "Vote on GitHub" for Lessons → Goes to discussion #2
   - [ ] Click "Vote on GitHub" for Visualizations → Goes to discussion #3
   - [ ] Click "Vote on GitHub" for Hint System → Goes to discussion #4
   - [ ] Click "Vote on GitHub" for Difficulty Levels → Goes to discussion #5
   - [ ] Click "Vote on GitHub" for Graph Tool → Goes to discussion #6
   - [ ] Click "Vote on GitHub" for Timed Challenges → Goes to discussion #7
   - [ ] Click "Vote on GitHub" for Worksheets → Goes to discussion #8
   - [ ] Click "Vote on GitHub" for Export/Import → Goes to discussion #9

2. **Test Each Discuss Button:**
   - [ ] All 9 "Discuss" buttons go to their respective discussions
   
3. **Test Suggest Feature:**
   - [ ] "Suggest a Feature" button opens new discussion form with "Ideas" category

4. **Test Voting:**
   - [ ] Click 👍 on a discussion (requires GitHub login)
   - [ ] Verify reaction appears
   - [ ] Check if vote count updates (if using dynamic loading)

5. **Mobile Testing:**
   - [ ] Test on phone/tablet
   - [ ] Verify buttons are tappable
   - [ ] Links work correctly

## Quick Reference: URL Pattern

```
Base URL: https://github.com/Cartooli/math-boredgames/discussions/

Vote/Discuss URLs:
- Problem Generators:    /discussions/1
- Lessons:               /discussions/2
- Visualizations:        /discussions/3
- Hint System:           /discussions/4
- Difficulty Levels:     /discussions/5
- Graph Tool:            /discussions/6
- Timed Challenges:      /discussions/7
- Worksheets:            /discussions/8
- Export/Import:         /discussions/9

New Feature Suggestion:
/discussions/new?category=ideas
```

## Troubleshooting

### Links go to wrong discussions
**Solution:** Check the order you created discussions. GitHub assigns numbers sequentially. You may need to adjust the numbers in the HTML.

### Vote counts don't update
**Solution:** If using dynamic loading, check browser console for errors. Verify discussion IDs are correct.

### Getting rate limited
**Solution:** If many users visit at once, GitHub may rate limit. Consider caching or using static counts.

### Discussion shows as closed/locked
**Solution:** Make sure discussions are in "Announcement" format (for voting) or "Open discussion" format.

## Next Steps

1. ✅ Enable GitHub Discussions
2. ✅ Create 9 discussion threads (use templates from GITHUB_SETUP.md)
3. ✅ Note the discussion numbers
4. ✅ Update roadmap.html using Method A or B
5. ✅ Test locally
6. ✅ Deploy to production
7. ✅ Test live site
8. ✅ Share roadmap link on social media!

---

**Questions?** Refer to `GITHUB_SETUP.md` for detailed discussion creation templates.








