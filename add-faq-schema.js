#!/usr/bin/env node

/**
 * Add FAQ Schema (JSON-LD) to competitions.html
 * This enables rich snippets in Google search results
 * 
 * Usage: node add-faq-schema.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Adding FAQ Schema to competitions.html\n');
console.log('═══════════════════════════════════════════════════════\n');

const competitionsPath = path.join(__dirname, 'competitions.html');

if (!fs.existsSync(competitionsPath)) {
    console.error('❌ ERROR: competitions.html not found');
    process.exit(1);
}

let html = fs.readFileSync(competitionsPath, 'utf8');

// Check if FAQ schema already exists
if (html.includes('"@type": "FAQPage"')) {
    console.log('✓ FAQ Schema already exists in competitions.html');
    process.exit(0);
}

// Extract FAQ questions and answers from HTML
const faqMatches = html.matchAll(
    /<div class="faq-question"[^>]*>\s*<span>([^<]+)<\/span>/g
);

const faqItems = [];
for (const match of faqMatches) {
    const question = match[1].trim();
    
    // Find the corresponding answer
    const questionIndex = html.indexOf(match[0]);
    const answerMatch = html.substring(questionIndex).match(
        /<div class="faq-answer-content">\s*([^<]+(?:\s*<[^>]+>[^<]*<\/[^>]+>)*[^<]+)\s*<\/div>/
    );
    
    if (answerMatch) {
        // Clean HTML from answer
        let answer = answerMatch[1]
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        faqItems.push({ question, answer });
    }
}

if (faqItems.length === 0) {
    console.error('❌ ERROR: No FAQ items found in competitions.html');
    process.exit(1);
}

console.log(`✓ Found ${faqItems.length} FAQ items\n`);

// Generate FAQPage schema
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
        }
    }))
};

const schemaScript = `
    <!-- FAQ Schema (JSON-LD) for Rich Snippets -->
    <script type="application/ld+json">
${JSON.stringify(faqSchema, null, 4)}
    </script>`;

// Find where to insert the schema (before closing </head> tag)
const headEndIndex = html.indexOf('</head>');
if (headEndIndex === -1) {
    console.error('❌ ERROR: Could not find </head> tag');
    process.exit(1);
}

// Insert schema before </head>
html = html.slice(0, headEndIndex) + schemaScript + '\n    ' + html.slice(headEndIndex);

// Write updated file
fs.writeFileSync(competitionsPath, html, 'utf8');

console.log('✅ FAQ Schema added successfully!');
console.log(`   Added ${faqItems.length} questions to FAQPage schema\n`);
console.log('📝 Next steps:');
console.log('   1. Test the schema at: https://search.google.com/test/rich-results');
console.log('   2. Submit updated sitemap to Google Search Console');
console.log('   3. Monitor for FAQ rich snippets in search results\n');

