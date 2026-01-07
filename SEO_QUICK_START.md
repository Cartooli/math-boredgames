# SEO Quick Start Guide

This guide helps you implement the highest-impact SEO improvements quickly.

## 🚀 Quick Start (30 minutes)

### Step 1: Add FAQ Schema to Competitions Page (5 minutes)

```bash
node add-faq-schema.js
```

This adds FAQPage structured data to `competitions.html`, enabling rich snippets in Google search results.

**What it does:**
- Extracts FAQ questions/answers from the page
- Generates FAQPage JSON-LD schema
- Inserts schema into the page

**Expected result:** FAQ rich snippets may appear in search results within 1-2 weeks.

---

### Step 2: Generate FAQ Pages (10 minutes)

```bash
node generate-faq-pages.js
```

This creates dedicated FAQ pages targeting common math questions.

**What it creates:**
- `/faq.html` - General FAQ
- `/faq/algebra.html` - Algebra questions
- `/faq/geometry.html` - Geometry questions
- `/faq/calculus.html` - Calculus questions

**Expected result:** These pages target long-tail "how to" and "what is" queries.

---

### Step 3: Add Breadcrumb Schema (10 minutes)

```bash
node add-breadcrumb-schema.js
```

This adds BreadcrumbList schema to all topic pages.

**What it does:**
- Adds breadcrumb structured data to all lesson/walkthrough/practice pages
- Helps Google understand site hierarchy
- Enables breadcrumb rich snippets

**Expected result:** Better navigation understanding, possible breadcrumb snippets.

---

### Step 4: Update Sitemap (5 minutes)

After generating FAQ pages, update your sitemap:

```bash
# Run the SEO page generator to update sitemap
node generate-seo-pages.js
```

Or manually add FAQ pages to `sitemap.xml`:

```xml
<url>
  <loc>https://math.boredgames.site/faq.html</loc>
  <lastmod>2025-12-12</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
<url>
  <loc>https://math.boredgames.site/faq/algebra.html</loc>
  <lastmod>2025-12-12</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
<!-- Add other FAQ pages -->
```

---

## 📊 Verify Your Changes

### 1. Test Structured Data

Visit [Google Rich Results Test](https://search.google.com/test/rich-results) and test:
- Your homepage
- A topic page (e.g., `/math/pythagorean-theorem/lesson.html`)
- The competitions page (for FAQ schema)
- A FAQ page

### 2. Check Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Submit your updated sitemap
3. Monitor for:
   - Rich snippet eligibility
   - Indexing status
   - Search performance

### 3. Monitor Results

Check these metrics weekly:
- **Impressions** - Are you appearing in more searches?
- **Click-through rate (CTR)** - Are rich snippets improving clicks?
- **Average position** - Are rankings improving?
- **Featured snippets** - Are you appearing in answer boxes?

---

## 🎯 Next Steps (Week 2-4)

### 1. Create Comprehensive Guides

Create 2-3 in-depth guides (2000+ words):
- "Complete Algebra 1 Study Guide"
- "Geometry Formulas and Theorems Reference"
- "Calculus for Beginners"

**Template:**
- Introduction (200 words)
- Table of contents
- Comprehensive content (1500+ words)
- Examples and practice problems
- Links to related lessons
- Conclusion with next steps

### 2. Optimize for Answer Boxes

Review your content and:
- Add clear, concise answers to common questions
- Use bullet points and numbered lists
- Place answers near the top of pages
- Format: Question → Answer → Explanation

### 3. Improve Internal Linking

- Add "Related Topics" section to each lesson
- Create topic hub pages
- Link related concepts together
- Use descriptive anchor text

---

## 📈 Measuring Success

### Key Metrics to Track

1. **Organic Traffic**
   - Baseline: [Your current monthly traffic]
   - Target: +25% in 3 months, +50% in 6 months

2. **Keyword Rankings**
   - Track 20-30 target keywords
   - Monitor weekly for improvements

3. **Rich Snippets**
   - Count how many pages have rich snippets
   - Target: 10+ pages with rich snippets in 3 months

4. **Click-Through Rate**
   - Baseline: [Your current CTR]
   - Target: +15-20% improvement

### Tools to Use

- **Google Search Console** - Free, essential
- **Google Analytics** - Track traffic
- **Google Rich Results Test** - Test structured data
- **Schema.org Validator** - Validate JSON-LD

---

## 🐛 Troubleshooting

### FAQ Schema Not Showing

- Wait 1-2 weeks for Google to re-crawl
- Verify schema is valid using Rich Results Test
- Check that FAQ content is visible in HTML (not hidden)

### Pages Not Indexing

- Submit sitemap to Google Search Console
- Check robots.txt isn't blocking pages
- Ensure pages have unique, descriptive content
- Add internal links to new pages

### No Rich Snippets Yet

- Rich snippets can take 2-4 weeks to appear
- Ensure schema is valid and properly formatted
- Content must be high-quality and relevant
- Check Google Search Console for errors

---

## 📚 Additional Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central Blog](https://developers.google.com/search/blog)
- [Rich Results Test](https://search.google.com/test/rich-results)

---

## ✅ Checklist

- [ ] Run `add-faq-schema.js`
- [ ] Run `generate-faq-pages.js`
- [ ] Run `add-breadcrumb-schema.js`
- [ ] Update sitemap.xml
- [ ] Submit sitemap to Google Search Console
- [ ] Test structured data with Rich Results Test
- [ ] Set up Google Analytics (if not already)
- [ ] Monitor Search Console weekly
- [ ] Create 2-3 comprehensive guides
- [ ] Optimize content for answer boxes
- [ ] Improve internal linking

---

**Remember:** SEO is a long-term strategy. Results typically appear 2-4 weeks after implementation, with significant improvements over 3-6 months. Be patient and consistent!

