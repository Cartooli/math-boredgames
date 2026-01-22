#!/usr/bin/env node

/**
 * Add SEO tags to existing primer lesson files WITHOUT overwriting content
 * Only modifies the <head> section to add:
 * - Canonical URL
 * - Open Graph tags
 * - Twitter tags
 * - Schema.org structured data
 * 
 * Usage: node add-seo-to-existing-lessons.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Adding SEO tags to existing primer lessons\n');
console.log('═══════════════════════════════════════════════════════\n');

const curriculumPath = path.join(__dirname, 'primer-curriculum.json');
const primerDir = path.join(__dirname, 'primer');

if (!fs.existsSync(curriculumPath)) {
    console.error('❌ ERROR: primer-curriculum.json not found');
    process.exit(1);
}

const curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));

// Flatten all lessons
const allLessons = [];
curriculum.grade_bands.forEach(band => {
    band.lessons.forEach(lesson => {
        allLessons.push({
            ...lesson,
            grade_band: band.band,
            grade_span: band.grade_span
        });
    });
});

// Add reserve slots
for (let i = 49; i <= 75; i++) {
    allLessons.push({
        id: `R${i.toString().padStart(2, '0')}`,
        sequence: i,
        title: `Reserve Lesson ${i}`,
        description: "Coming soon - Additional lesson content for curriculum expansion",
        key_concepts: [],
        grade_band: "Reserve",
        grade_span: "TBD"
    });
}

function addSEOTags(lesson) {
    const filePath = path.join(primerDir, `${lesson.id}.html`);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${lesson.id} - file not found`);
        return false;
    }
    
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Check if SEO tags already exist
    if (html.includes('rel="canonical"')) {
        console.log(`✓ ${lesson.id} - SEO tags already present`);
        return false;
    }
    
    const pageUrl = `https://math.boredgames.site/primer/${lesson.id}.html`;
    const pageTitle = `${lesson.title} - Essential Math Primer | MathBored`;
    const pageDescription = lesson.description;
    const imageUrl = "https://math.boredgames.site/og-image.png";
    
    // Build SEO tags
    const seoTags = `
    <meta name="keywords" content="math, education, learning, ${lesson.grade_band}, ${lesson.key_concepts.join(', ')}, K-12, free">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${pageUrl}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${pageDescription}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:site_name" content="MathBored">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${pageUrl}">
    <meta property="twitter:title" content="${pageTitle}">
    <meta property="twitter:description" content="${pageDescription}">
    <meta property="twitter:image" content="${imageUrl}">
    
    <!-- Structured Data (JSON-LD) for SEO -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "${lesson.title}",
        "description": "${pageDescription}",
        "provider": {
            "@type": "Organization",
            "name": "MathBored",
            "url": "https://math.boredgames.site"
        },
        "educationalLevel": "${lesson.grade_span}",
        "learningResourceType": "Lesson",
        "timeRequired": "PT15M",
        "inLanguage": "en",
        "isPartOf": {
            "@type": "Course",
            "name": "Essential Math Primer",
            "url": "https://math.boredgames.site/primer.html"
        },
        "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "online",
            "courseWorkload": "PT15M"
        }${lesson.key_concepts.length > 0 ? `,
        "teaches": ${JSON.stringify(lesson.key_concepts)}` : ''}
    }
    </script>
`;
    
    // Insert SEO tags after the description meta tag
    html = html.replace(
        /(<meta name="description" content="[^"]*">)/,
        `$1${seoTags}`
    );
    
    // Write updated file
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ ${lesson.id} - SEO tags added`);
    return true;
}

let updated = 0;
let skipped = 0;

allLessons.forEach(lesson => {
    if (addSEOTags(lesson)) {
        updated++;
    } else {
        skipped++;
    }
});

console.log(`\n✅ Complete!`);
console.log(`   Updated: ${updated} files`);
console.log(`   Skipped: ${skipped} files`);
console.log('\n✨ SEO tags added successfully!\n');












