#!/usr/bin/env node

/**
 * Update sitemap.xml with glossary pages
 * 
 * This script adds glossary pages to the existing sitemap.xml
 * Run this after generate-glossary.js
 */

const fs = require('fs');
const path = require('path');

// Read data.js to get math concepts
const dataJs = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');
const mathConceptsMatch = dataJs.match(/const mathConcepts = (\[[\s\S]*?\n\];)/);
if (!mathConceptsMatch) {
    console.error('❌ ERROR: Could not parse mathConcepts from data.js');
    process.exit(1);
}

let mathConcepts;
try {
    mathConcepts = eval(mathConceptsMatch[1]);
} catch (error) {
    console.error('❌ ERROR: Failed to parse mathConcepts array');
    process.exit(1);
}

/**
 * Convert topic name to URL-friendly slug
 */
function toSlug(topic) {
    return topic
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Check if lesson page exists for a term
 */
function lessonPageExists(slug) {
    const lessonPath = path.join(__dirname, 'math', slug, 'lesson.html');
    return fs.existsSync(lessonPath);
}

/**
 * Check if glossary term page exists
 */
function glossaryPageExists(slug) {
    const glossaryPath = path.join(__dirname, 'glossary', `${slug}.html`);
    return fs.existsSync(glossaryPath);
}

/**
 * Generate sitemap entry for a glossary page
 */
function generateSitemapEntry(concept) {
    const slug = toSlug(concept.concept);
    const today = new Date().toISOString().split('T')[0];
    
    return `  <url>
    <loc>https://math.boredgames.site/glossary/${slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
}

/**
 * Update sitemap.xml with glossary entries
 */
function updateSitemap() {
    console.log('🗺️  Updating sitemap.xml with glossary pages...\n');
    
    const sitemapPath = path.join(__dirname, 'sitemap.xml');
    
    if (!fs.existsSync(sitemapPath)) {
        console.error('❌ ERROR: sitemap.xml not found');
        process.exit(1);
    }
    
    // Read existing sitemap
    let sitemap = fs.readFileSync(sitemapPath, 'utf8');
    
    // Check if glossary entries already exist
    if (sitemap.includes('math.boredgames.site/glossary.html')) {
        console.log('⚠️  Glossary entries already exist in sitemap.xml');
        console.log('   Skipping update to avoid duplicates.\n');
        return;
    }
    
    // Filter valid concepts (have lesson pages and glossary pages)
    const validConcepts = mathConcepts.filter(concept => {
        const slug = toSlug(concept.concept);
        return lessonPageExists(slug) && glossaryPageExists(slug);
    });
    
    console.log(`✅ Found ${validConcepts.length} glossary pages to add\n`);
    
    if (validConcepts.length === 0) {
        console.log('⚠️  No glossary pages found. Run generate-glossary.js first.\n');
        return;
    }
    
    // Generate glossary entries
    const today = new Date().toISOString().split('T')[0];
    const glossaryEntries = [
        `  <!-- Glossary Pages -->`,
        `  <url>`,
        `    <loc>https://math.boredgames.site/glossary.html</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>weekly</changefreq>`,
        `    <priority>0.8</priority>`,
        `  </url>`,
        ...validConcepts.map(concept => generateSitemapEntry(concept))
    ].join('\n');
    
    // Find the closing </urlset> tag and insert before it
    const urlsetClose = '</urlset>';
    if (!sitemap.includes(urlsetClose)) {
        console.error('❌ ERROR: Could not find </urlset> tag in sitemap.xml');
        process.exit(1);
    }
    
    // Insert glossary entries before closing tag
    sitemap = sitemap.replace(urlsetClose, glossaryEntries + '\n' + urlsetClose);
    
    // Write updated sitemap
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    
    console.log(`✅ Added ${validConcepts.length + 1} glossary entries to sitemap.xml`);
    console.log(`   - Main glossary: glossary.html`);
    console.log(`   - Term pages: ${validConcepts.length} pages\n`);
    console.log('🎉 Sitemap update complete!\n');
}

// Run if called directly
if (require.main === module) {
    updateSitemap();
}

module.exports = { updateSitemap };
