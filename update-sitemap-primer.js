#!/usr/bin/env node

/**
 * Update sitemap.xml to include Essential Math Primer pages
 * Adds primer.html and all 75 lesson pages (E01-E12, M13-M27, H28-H48, R49-R75)
 * 
 * Usage: node update-sitemap-primer.js
 */

const fs = require('fs');
const path = require('path');

console.log('🗺️  Sitemap Updater for Essential Math Primer\n');
console.log('═══════════════════════════════════════════════════════\n');

const sitemapPath = path.join(__dirname, 'sitemap.xml');
const curriculumPath = path.join(__dirname, 'primer-curriculum.json');

if (!fs.existsSync(sitemapPath)) {
    console.error('❌ ERROR: sitemap.xml not found');
    process.exit(1);
}

if (!fs.existsSync(curriculumPath)) {
    console.error('❌ ERROR: primer-curriculum.json not found');
    process.exit(1);
}

// Read curriculum to get all lesson IDs
const curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));
const allLessonIds = [];

// Collect all core lesson IDs
curriculum.grade_bands.forEach(band => {
    band.lessons.forEach(lesson => {
        allLessonIds.push(lesson.id);
    });
});

// Add reserve slots
for (let i = 49; i <= 75; i++) {
    allLessonIds.push(`R${i.toString().padStart(2, '0')}`);
}

console.log(`📚 Found ${allLessonIds.length} lesson pages to add`);

// Read existing sitemap
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Check if primer pages already exist in sitemap
const hasPrimerPages = sitemap.includes('<loc>https://math.boredgames.site/primer.html</loc>');

if (hasPrimerPages) {
    console.log('\n⚠️  Primer pages already exist in sitemap');
    console.log('   Removing old entries before adding new ones...');
    
    // Remove all primer-related entries
    sitemap = sitemap.replace(/<url>\s*<loc>https:\/\/math\.boredgames\.site\/primer\.html<\/loc>.*?<\/url>/gs, '');
    sitemap = sitemap.replace(/<url>\s*<loc>https:\/\/math\.boredgames\.site\/primer\/[^<]+<\/loc>.*?<\/url>/gs, '');
}

// Generate primer page entries
const today = new Date().toISOString().split('T')[0];
let primerEntries = '';

// Add main primer.html page
primerEntries += `
    <url>
        <loc>https://math.boredgames.site/primer.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>`;

// Add all lesson pages
allLessonIds.forEach(lessonId => {
    primerEntries += `
    <url>
        <loc>https://math.boredgames.site/primer/${lessonId}.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`;
});

// Insert before closing </urlset> tag
sitemap = sitemap.replace('</urlset>', primerEntries + '\n</urlset>');

// Write updated sitemap
fs.writeFileSync(sitemapPath, sitemap, 'utf8');

console.log(`\n✅ Successfully updated sitemap.xml`);
console.log(`   Added: 1 overview page + ${allLessonIds.length} lesson pages`);
console.log(`   Total primer entries: ${allLessonIds.length + 1}`);
console.log('\n📝 Next steps:');
console.log('   1. Review sitemap.xml to ensure correctness');
console.log('   2. Commit and push changes');
console.log('   3. Submit updated sitemap to Google Search Console');
console.log('\n✨ Done!\n');










