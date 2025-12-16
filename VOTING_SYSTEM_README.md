# 📊 Math Olympiad Voting System

Personal voting and verification system for Math Olympiad solutions (Phase 1).

---

## Overview

The voting system allows users to provide feedback on solutions through upvotes, downvotes, and personal verification. This is **Phase 1**: personal voting, where each user's feedback is stored locally in their browser.

### Key Features

✅ **Upvote/Downvote** - Express quality of solutions  
✅ **Personal Verification** - Mark solutions you've independently verified  
✅ **Spam Prevention** - One vote per browser per solution  
✅ **Privacy-Friendly** - All data stored locally (localStorage)  
✅ **Export Capability** - Can export votes for future aggregation  

---

## How It Works

### Personal Voting (Phase 1)

- **Storage**: localStorage in your browser
- **Scope**: Your votes are personal to you
- **Purpose**: Track which solutions you trust
- **Display**: See your own voting status

### What You Can Do

1. **Upvote** (👍) - Solution is good/correct
2. **Downvote** (👎) - Solution has issues/errors  
3. **Verify** (✓) - You independently solved and confirmed
4. **Export** - Save your votes for backup

---

## Using the Voting System

### On Solution Entry Page

1. Go to `solution-entry.html`
2. Select a question with a solution
3. See voting section appear
4. Click buttons to vote:
   - **👍 Upvote** - Good solution
   - **👎 Downvote** - Problematic solution
   - **✓ I Verified This** - You confirmed it's correct

### Visual Feedback

**Active buttons** show your current votes:
- Green button = You upvoted
- Red button = You downvoted  
- Blue button = You verified

**Status message** shows:
- "👍 You upvoted this solution"
- "👎 You downvoted this solution"
- "✓ You verified this solution"
- Or combination of above

### On Olympiad Page

When viewing solutions on `olympiad.html`, you'll see badges:
- **👍 You upvoted** - Green badge
- **👎 You downvoted** - Red badge
- **✓ You verified** - Blue badge

Plus a link to go vote if you haven't yet.

---

## Technical Details

### Data Storage

**Votes stored in localStorage:**
```
olympiadVote_1 = "up"
olympiadVote_2 = "down"
olympiadVote_3 = null (no vote)
```

**Verifications stored in localStorage:**
```
olympiadVerified_1 = "true"
olympiadVerified_5 = "true"
```

### Storage Keys

| Key Pattern | Description | Example |
|-------------|-------------|---------|
| `olympiadVote_{questionId}` | User's vote | `olympiadVote_42 = "up"` |
| `olympiadVerified_{questionId}` | User verified | `olympiadVerified_42 = "true"` |

### Privacy & Security

- **Local only**: Data never leaves your browser
- **No tracking**: No analytics or external calls
- **Per-browser**: Each browser has independent votes
- **Can clear**: Clear browser data removes votes

---

## API Reference

### olympiadSolutions Methods

```javascript
// Get user's vote for a question
olympiadSolutions.getUserVote(questionId)
// Returns: 'up', 'down', or null

// Upvote a solution
olympiadSolutions.upvote(questionId)
// Returns: {action: 'voted'|'removed', vote: 'up'|null}

// Downvote a solution
olympiadSolutions.downvote(questionId)
// Returns: {action: 'voted'|'removed', vote: 'down'|null}

// Check if user verified
olympiadSolutions.isVerifiedByUser(questionId)
// Returns: true or false

// Toggle verification
olympiadSolutions.toggleVerification(questionId)
// Returns: {action: 'verified'|'removed', verified: true|false}

// Get all voting stats for a question
olympiadSolutions.getVoteStats(questionId)
// Returns: {userVote: 'up'|'down'|null, userVerified: boolean, hasVoted: boolean}

// Export all your votes
olympiadSolutions.exportUserVotes()
// Returns: {votes: {}, verifications: {}, exportDate: ISO, browser: string}

// Clear all your votes (with confirmation)
olympiadSolutions.clearUserVotes()
// Returns: true if cleared, false if cancelled
```

---

## Use Cases

### For Students

1. **Track trusted solutions**
   - Upvote solutions that helped you
   - Downvote confusing solutions
   - Verify solutions you've double-checked

2. **Personal quality tracking**
   - See which solutions you trust at a glance
   - Revisit and update votes as you learn more

### For Contributors

1. **Quality feedback**
   - Upvote well-written solutions
   - Downvote solutions with errors
   - Verify solutions after independent solving

2. **Build reputation**
   - Export your verifications
   - Share verification count in Phase 2
   - Contribute to community consensus

---

## Spam Prevention

### One Vote Per Browser

- localStorage prevents duplicate votes
- Click again to remove vote
- Can only have one vote type (up OR down)
- Verification is independent of vote

### Limitations

**Can be worked around:**
- Clear browser data removes votes
- Different browsers = different votes
- Incognito mode = separate state

**Why it's okay:**
- Most users won't game the system
- Phase 1 is for personal tracking
- Phase 2 will add aggregation with more checks

---

## Future Enhancements (Phase 2)

### Planned Features

1. **Community Aggregation**
   - Combine votes from all users
   - Show total upvotes/downvotes
   - Display verification count

2. **Verification Threshold**
   - Auto-mark as "Community Verified" at 5+ verifications
   - Distinguish admin vs community verification

3. **Export/Import Aggregation**
   - Users export their votes
   - Admin aggregates manually or via script
   - Update solution data with community totals

4. **Vote Display**
   - Question list shows net votes
   - Solution display shows vote counts
   - Ranking by vote score

### Long-term (Phase 3)

- GitHub-based vote storage
- Real-time vote aggregation
- User reputation system
- Vote-weighted verification

---

## FAQ

### Q: Do my votes affect other users?

**A: No (Phase 1).** Your votes are personal and stored only in your browser. Other users don't see your votes.

In Phase 2, we'll add optional aggregation where votes can be combined to show community consensus.

### Q: Can I vote on my own solutions?

**A: Yes.** You can upvote, downvote, or verify any solution, including ones you entered.

### Q: What happens if I clear my browser data?

**A: Your votes are lost.** Votes are stored in localStorage, so clearing browser data removes them. Export your votes regularly for backup.

### Q: Can I change my vote?

**A: Yes.** Click the same button to remove your vote, or click the opposite button to switch.

### Q: Why can't I see vote counts?

**A: Phase 1 is personal only.** Vote counts require aggregation (Phase 2). For now, you only see your own votes.

### Q: How is verification different from upvoting?

**A:** 
- **Upvote** = "This solution looks good"
- **Verify** = "I independently solved this and confirmed it's correct"

Verification is stronger evidence of quality.

### Q: Can I export my votes?

**A: Yes!** Use `olympiadSolutions.exportUserVotes()` in the browser console, or wait for the export button in Phase 2.

---

## For Developers

### Adding Voting to Custom UI

```javascript
// Get vote status
const voteStats = olympiadSolutions.getVoteStats(questionId);

// Update UI based on status
if (voteStats.userVote === 'up') {
    upvoteButton.classList.add('active');
}

if (voteStats.userVerified) {
    verifyButton.classList.add('active');
}

// Handle vote
function handleUpvote() {
    const result = olympiadSolutions.upvote(questionId);
    updateUI(); // Re-render
    showToast(result.action === 'voted' ? 'Upvoted!' : 'Vote removed');
}
```

### Accessing Vote Data

```javascript
// Get all votes from localStorage
const votes = {};
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('olympiadVote_')) {
        const qid = key.replace('olympiadVote_', '');
        votes[qid] = localStorage.getItem(key);
    }
}

console.log('User votes:', votes);
```

---

## Troubleshooting

### Votes not saving

**Check:**
1. localStorage is enabled in browser
2. Not in incognito/private mode
3. Storage quota not exceeded
4. No browser extensions blocking storage

**Fix:** Try different browser or check settings.

### Votes disappeared

**Likely causes:**
1. Cleared browser data
2. Different browser/device
3. Incognito mode closed

**Fix:** Export votes regularly for backup.

### Buttons not working

**Check:**
1. Console for JavaScript errors
2. `olympiad-solutions.js` loaded correctly
3. Browser compatibility (modern browser required)

**Fix:** Refresh page or try different browser.

---

## Summary

### Phase 1 Status: ✅ Complete

- Personal voting implemented
- Verification tracking added
- UI integrated on solution-entry.html
- Display added to olympiad.html
- localStorage-based storage
- Export capability included

### Confidence: 90%

The system works well for personal tracking and provides immediate value. Phase 2 (aggregation) can be added later without breaking changes.

### Next Steps

1. Use the system! Vote and verify solutions
2. Export your votes periodically
3. Provide feedback for improvements
4. Await Phase 2 for community features

---

**Version:** 1.0 (Phase 1)  
**Date:** December 2024  
**Status:** Production Ready  
**License:** MIT





