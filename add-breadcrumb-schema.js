#!/usr/bin/env node

/**
 * Add BreadcrumbList Schema to SEO pages
 * Helps Google understand site hierarchy and enables breadcrumb rich snippets
 * 
 * Usage: node add-breadcrumb-schema.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Adding Breadcrumb Schema to SEO pages\n');
console.log('═══════════════════════════════════════════════════════\n');

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
 * Get human-readable grade label
 */
function getGradeLabel(grade) {
    const labels = {
        'K': 'Kindergarten',
        '1': '1st Grade',
        '2': '2nd Grade',
        '3': '3rd Grade',
        '4': '4th Grade',
        '5': '5th Grade',
        '6': '6th Grade',
        '7': '7th Grade',
        '8': '8th Grade',
        '9': '9th Grade (Algebra I)',
        '10': '10th Grade (Geometry)',
        '11': '11th Grade (Algebra II)',
        '12': '12th Grade (Pre-Calculus/Calculus)'
    };
    return labels[grade] || `Grade ${grade}`;
}

/**
 * Generate breadcrumb schema for a topic/mode page
 */
function generateBreadcrumbSchema(topic, mode, grade) {
    const slug = toSlug(topic.concept);
    const modeLabels = {
        'lesson': 'Lesson',
        'walkthrough': 'Walkthrough',
        'practice': 'Practice'
    };
    
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://math.boredgames.site/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": getGradeLabel(grade),
                "item": `https://math.boredgames.site/grade/${grade}.html`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": topic.concept,
                "item": `https://math.boredgames.site/math/${slug}/`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": modeLabels[mode],
                "item": `https://math.boredgames.site/math/${slug}/${mode}.html`
            }
        ]
    };
}

/**
 * Add breadcrumb schema to a page
 */
function addBreadcrumbToPage(filePath, topic, mode, grade) {
    if (!fs.existsSync(filePath)) {
        return false;
    }
    
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Check if breadcrumb schema already exists
    if (html.includes('"@type": "BreadcrumbList"')) {
        return false; // Already has breadcrumb
    }
    
    const schema = generateBreadcrumbSchema(topic, mode, grade);
    const schemaScript = `
    <!-- Breadcrumb Schema (JSON-LD) for Rich Snippets -->
    <script type="application/ld+json">
${JSON.stringify(schema, null, 4)}
    </script>`;
    
    // Find where to insert (before closing </head> tag)
    const headEndIndex = html.indexOf('</head>');
    if (headEndIndex === -1) {
        return false;
    }
    
    // Insert schema before </head>
    html = html.slice(0, headEndIndex) + schemaScript + '\n    ' + html.slice(headEndIndex);
    
    // Write updated file
    fs.writeFileSync(filePath, html, 'utf8');
    return true;
}

// Process all topic pages
const mathDir = path.join(__dirname, 'math');
const modes = ['lesson', 'walkthrough', 'practice'];
let updated = 0;
let skipped = 0;

console.log('📝 Processing topic pages...\n');

mathConcepts.forEach((topic, index) => {
    const slug = toSlug(topic.concept);
    
    modes.forEach(mode => {
        const filePath = path.join(mathDir, slug, `${mode}.html`);
        if (addBreadcrumbToPage(filePath, topic, mode, topic.gradeLevel)) {
            updated++;
        } else {
            skipped++;
        }
    });
    
    // Progress indicator
    if ((index + 1) % 20 === 0 || index === mathConcepts.length - 1) {
        console.log(`   Processed ${index + 1} topics (${updated} updated, ${skipped} skipped)`);
    }
});

console.log('\n✅ Breadcrumb Schema addition complete!');
console.log(`   Updated: ${updated} files`);
console.log(`   Skipped: ${skipped} files (already had schema or file not found)\n`);
console.log('📝 Next steps:');
console.log('   1. Test schema at: https://search.google.com/test/rich-results');
console.log('   2. Monitor for breadcrumb rich snippets in search results\n');

