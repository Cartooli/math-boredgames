# Olympiad Data Setup Guide

The Olympiad feature supports multiple data sources with automatic fallback:

1. **localStorage cache** (fastest - used first if available)
2. **Private URL** (configurable - for hosting data separately)
3. **Embedded data** (fallback - data embedded in code)

## Option 1: Use Embedded Data (Recommended for GitHub Pages)

This embeds the data directly in `olympiad-data.js`, so it works without external files.

### Steps:

1. **Get your markdown file** (keep it locally, not in git)
   - Place `Copy of Problem of the Week - Master Sheet.md` in the project directory

2. **Run the conversion script:**
   ```bash
   node convert-olympiad-data.js "Copy of Problem of the Week - Master Sheet.md"
   ```

3. **Copy the generated data:**
   - Open `olympiad-data-embedded.js`
   - Copy the entire `EMBEDDED_OLYMPIAD_DATA` object
   - Paste it into `olympiad-data.js`, replacing the empty one

4. **Clean up:**
   ```bash
   rm olympiad-data-embedded.js
   ```

5. **Verify:**
   - Open `olympiad.html` in your browser
   - Check the console - you should see "✅ Olympiad Data initialized from embedded data!"

## Option 2: Use Private URL

If you want to host the data on a private server:

1. **Upload your markdown file** to a private server/CDN
   - Ensure it requires authentication or is not publicly accessible
   - Get the full URL

2. **Update the configuration in `olympiad-data.js`:**
   ```javascript
   const OLYMPIAD_DATA_URL = 'https://your-private-server.com/potw-data.md';
   ```

3. **Verify:**
   - Open `olympiad.html` in your browser
   - Check the console - you should see "✅ Olympiad Data initialized from private URL!"

## Option 3: Keep File Locally (Development Only)

For local development, you can keep the file in the project directory (but add it to `.gitignore`):

1. The file is already in `.gitignore`
2. Place `Copy of Problem of the Week - Master Sheet.md` in the project root
3. Update `OLYMPIAD_DATA_URL` in `olympiad-data.js` to point to the local file:
   ```javascript
   const OLYMPIAD_DATA_URL = './Copy of Problem of the Week - Master Sheet.md';
   ```

**Note:** This only works for local development. For production (GitHub Pages), use Option 1 or 2.

## Troubleshooting

### "No olympiad data available from any source"

- Check that you've either:
  - Embedded the data in `olympiad-data.js` (Option 1), OR
  - Configured `OLYMPIAD_DATA_URL` correctly (Option 2)
- Check the browser console for detailed error messages

### "Failed to fetch from private URL"

- Verify the URL is correct and accessible
- Check CORS settings if hosting on a different domain
- The system will automatically fall back to embedded data if available

### Data not updating

- Clear localStorage: Open browser console and run:
  ```javascript
  localStorage.removeItem('olympiadData');
  localStorage.removeItem('olympiadRandomSeed');
  ```
- Refresh the page

## Data Structure

The embedded data should have this structure:

```javascript
const EMBEDDED_OLYMPIAD_DATA = {
    questions: [
        {
            id: 1,
            date: "12/08/2025",
            imageRef: "image1",
            title: "Problem from 12/08/2025"
        },
        // ... more questions
    ],
    imageData: {
        "image1": "data:image/png;base64,iVBORw0KG...",
        // ... more images
    }
};
```



