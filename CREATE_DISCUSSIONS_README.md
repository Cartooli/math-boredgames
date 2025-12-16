# Create GitHub Discussions Script

This script automatically creates all 9 discussion threads from `DISCUSSION_TEMPLATES.md` using the GitHub GraphQL API.

## Prerequisites

1. **Node.js** (v14 or higher)
   - Check: `node --version`
   - Install: https://nodejs.org/

2. **GitHub Personal Access Token**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Name: "MathBored Discussion Creator"
   - Select scope: ✅ **public_repo**
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

3. **Discussions Enabled**
   - Go to: https://github.com/Cartooli/math-boredgames/settings
   - Enable **Discussions** feature
   - Create at least one category (e.g., "Feature Requests")

## Usage

### Option 1: Environment Variable (Recommended)

```bash
GITHUB_TOKEN=your_token_here node create-discussions.js
```

### Option 2: Export First

```bash
export GITHUB_TOKEN=your_token_here
node create-discussions.js
```

### Option 3: .env File (Optional)

Create a `.env` file (don't commit it!):
```
GITHUB_TOKEN=your_token_here
```

Then run:
```bash
node create-discussions.js
```

## What It Does

1. ✅ Reads `DISCUSSION_TEMPLATES.md`
2. ✅ Parses all 9 discussion templates
3. ✅ Connects to GitHub GraphQL API
4. ✅ Creates discussions in order (1-9)
5. ✅ Reports success/failure for each
6. ✅ Shows URLs of created discussions

## Output Example

```
🚀 Starting GitHub Discussions Creator

📖 Parsing DISCUSSION_TEMPLATES.md...
✅ Found 9 discussion templates

🔍 Getting repository information for Cartooli/math-boredgames...
✅ Repository found

📝 Creating discussions...

Creating #1: 📚 Complete Problem Generators (35 Topics)
  ✅ Created: https://github.com/Cartooli/math-boredgames/discussions/1

Creating #2: 📖 Comprehensive Lessons (32 Topics)
  ✅ Created: https://github.com/Cartooli/math-boredgames/discussions/2

...

============================================================
📊 Summary
============================================================
✅ Successfully created: 9/9
❌ Failed: 0/9

Created discussions:
  #1 → https://github.com/Cartooli/math-boredgames/discussions/1 (GitHub #1)
  #2 → https://github.com/Cartooli/math-boredgames/discussions/2 (GitHub #2)
  ...
```

## Important Notes

### Discussion Numbers

GitHub assigns discussion numbers sequentially. If:
- ✅ You create them in order (1-9) and no discussions exist yet → Numbers will match!
- ⚠️ Discussions already exist → Numbers may be different
- ⚠️ You create them out of order → Numbers won't match

**If numbers don't match 1-9:**
- The script will show the actual GitHub discussion numbers
- You'll need to update `roadmap.html` with the correct numbers
- Or delete existing discussions and re-run the script

### Rate Limiting

- The script includes a 1-second delay between creations
- GitHub allows 5,000 requests/hour for authenticated requests
- This script makes ~10 requests total (very safe)

### Error Handling

Common errors and solutions:

**"GITHUB_TOKEN environment variable is required"**
- Set the token: `GITHUB_TOKEN=your_token node create-discussions.js`

**"Repository not found"**
- Check: `REPO_OWNER` and `REPO_NAME` in the script
- Verify you have access to the repository

**"No discussion categories found"**
- Enable Discussions in repository settings
- Create at least one category

**"GraphQL Error: Resource not accessible by integration"**
- Your token needs `public_repo` scope
- Regenerate token with correct permissions

## Troubleshooting

### Script doesn't run

```bash
# Check Node.js version
node --version  # Should be v14+

# Make script executable (optional)
chmod +x create-discussions.js
```

### Discussions created but wrong numbers

1. Check the URLs in the script output
2. Update `roadmap.html` with correct numbers
3. Or delete all discussions and re-run

### Partial success

If some discussions fail:
- Check the error messages
- Fix the issue (usually token permissions)
- Re-run the script (it won't duplicate existing discussions)
- Or manually create the failed ones

## Security

⚠️ **Never commit your GitHub token!**

- Don't add `.env` to git
- Don't hardcode tokens in the script
- Use environment variables only
- Regenerate token if accidentally exposed

## Manual Alternative

If the script doesn't work, you can still create discussions manually:

1. Open `DISCUSSION_TEMPLATES.md`
2. Copy each template
3. Go to: https://github.com/Cartooli/math-boredgames/discussions/new
4. Paste and create each one
5. Note the discussion numbers
6. Update `roadmap.html` if numbers don't match 1-9

## Next Steps

After successfully creating discussions:

1. ✅ Verify all 9 discussions exist
2. ✅ Check that URLs match the numbers in `roadmap.html`
3. ✅ Test voting by clicking "Vote on GitHub" buttons
4. ✅ Pin important discussions (optional)
5. ✅ Share the roadmap link!

---

**Questions?** Check `VOTING_SETUP_SUMMARY.md` for complete setup guide.












