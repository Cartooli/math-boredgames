# 🔄 Clear Cache Instructions

If you're not seeing the latest updates on [https://math.boredgames.site/](https://math.boredgames.site/), follow these steps:

## Quick Fix (Recommended)

### Chrome/Edge/Brave
1. Press `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
2. This performs a hard refresh and bypasses cache

### Firefox
1. Press `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
2. Or press `Ctrl + F5`

### Safari
1. Press `Cmd + Option + R`
2. Or hold `Shift` and click the refresh button

---

## Full Cache Clear (If Quick Fix Doesn't Work)

### Chrome/Edge/Brave
1. Press `F12` (Windows/Linux) or `Cmd + Option + I` (Mac) to open Developer Tools
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

**OR**

1. Go to `chrome://settings/clearBrowserData`
2. Select "Cached images and files"
3. Click "Clear data"

### Firefox
1. Press `Ctrl + Shift + Delete`
2. Select "Cache"
3. Click "Clear Now"

### Safari
1. Go to Safari → Preferences → Advanced
2. Check "Show Develop menu in menu bar"
3. Develop → Empty Caches

---

## Clear Service Worker (Advanced)

If the above doesn't work, clear the service worker:

1. Open Developer Tools:
   - **Windows/Linux:** Press `F12`
   - **Mac:** Press `Cmd + Option + I`
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Click "Service Workers" in the left sidebar
4. Click "Unregister" next to the MathBored service worker
5. Refresh the page

---

## Why This Happens

The app uses a Service Worker for offline functionality (PWA). This caches files for faster loading and offline access. When we push updates, your browser might still use the cached version.

**We've implemented:**
- ✅ Network-first caching strategy
- ✅ Cache version bumping (v3)
- ✅ Query parameters on JS files (?v=3)
- ✅ Cache-control meta tags

These changes will help future updates deploy faster!

---

## Verify You Have Latest Version

After clearing cache, open the browser console:
- **Windows/Linux:** Press `F12`
- **Mac:** Press `Cmd + Option + I`

Then look for:
```
🚀 Initializing MathBored App...
DOM ready: complete
getTopicsByGrade available: function
mathConcepts available: object
```

If you see these messages, you have the latest version with the dropdown fix!
