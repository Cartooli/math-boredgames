#!/usr/bin/env node

/**
 * SEO-Friendly Static Page Generator for MathBored
 * 
 * Generates individual HTML pages for each topic and mode combination,
 * optimized for search engines with proper meta tags, structured data,
 * and automatic redirects to the main app.
 * 
 * Usage: node generate-seo-pages.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 MathBored SEO Page Generator\n');
console.log('═══════════════════════════════════════════════════════\n');

// Read and parse data.js to extract math concepts
console.log('📖 Reading math concepts from data.js...');
const dataJs = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');

// Extract mathConcepts array using regex
const mathConceptsMatch = dataJs.match(/const mathConcepts = (\[[\s\S]*?\n\];)/);
if (!mathConceptsMatch) {
    console.error('❌ ERROR: Could not parse mathConcepts from data.js');
    console.error('   Make sure data.js contains a valid mathConcepts array');
    process.exit(1);
}

// Safely evaluate the concepts array
let mathConcepts;
try {
    mathConcepts = eval(mathConceptsMatch[1]);
    console.log(`✅ Successfully loaded ${mathConcepts.length} math concepts\n`);
} catch (error) {
    console.error('❌ ERROR: Failed to parse mathConcepts array');
    console.error('   ', error.message);
    process.exit(1);
}

/**
 * Convert topic name to URL-friendly slug
 * Example: "Pythagorean Theorem" → "pythagorean-theorem"
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
 * Get mode descriptions for meta tags
 */
function getModeDescription(mode, topic, grade) {
    const gradeLabel = getGradeLabel(grade);
    const descriptions = {
        'lesson': `Learn ${topic} with comprehensive lessons and step-by-step explanations. Perfect for ${gradeLabel} students. Free math education with interactive examples and practice problems.`,
        'walkthrough': `Master ${topic} with detailed walkthroughs showing every step. Interactive ${gradeLabel} math learning with instant feedback and helpful hints.`,
        'practice': `Practice ${topic} with unlimited problems and instant feedback. Perfect for ${gradeLabel} students to build confidence and mastery. Free printable worksheets available.`
    };
    return descriptions[mode] || `Learn ${topic} - Free ${gradeLabel} math education`;
}

/**
 * Generate structured data (Schema.org JSON-LD) for better SEO
 */
function generateStructuredData(topic, mode, grade, slug) {
    const modeLabels = {
        'lesson': 'Lesson',
        'walkthrough': 'Walkthrough',
        'practice': 'Practice Problems'
    };
    
    return {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "name": `${topic.concept} - ${modeLabels[mode]}`,
        "description": getModeDescription(mode, topic.concept, grade),
        "educationalLevel": getGradeLabel(grade),
        "learningResourceType": modeLabels[mode],
        "teaches": topic.keyConcepts || topic.concept,
        "url": `https://math.boredgames.site/math/${slug}/${mode}.html`,
        "provider": {
            "@type": "Organization",
            "name": "MathBored",
            "url": "https://math.boredgames.site",
            "logo": "https://math.boredgames.site/icon.svg"
        },
        "inLanguage": "en-US",
        "isAccessibleForFree": true,
        "license": "https://opensource.org/licenses/MIT",
        "audience": {
            "@type": "EducationalAudience",
            "educationalRole": "student"
        }
    };
}

/**
 * Generate SEO-optimized HTML page for a topic/mode combination
 */
function generateTopicPage(topic, mode, grade) {
    const slug = toSlug(topic.concept);
    
    const modeLabels = {
        'lesson': 'Lesson',
        'walkthrough': 'Walkthrough',
        'practice': 'Practice Problems'
    };
    
    const modeIcons = {
        'lesson': '📝',
        'walkthrough': '🔍',
        'practice': '💪'
    };
    
    const title = `${topic.concept} ${modeLabels[mode]} - ${getGradeLabel(grade)} | MathBored`;
    const description = getModeDescription(mode, topic.concept, grade);
    const structuredData = generateStructuredData(topic, mode, grade, slug);
    
    // Generate related topics for internal linking
    const relatedTopics = topic.relatedTopics 
        ? topic.relatedTopics.split(',').map(t => t.trim()).filter(t => t).slice(0, 3)
        : [];
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">
    <meta name="keywords" content="${topic.concept}, ${getGradeLabel(grade)}, math ${mode}, free education, worksheet, practice problems, online learning">
    <meta name="author" content="MathBored Project">
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://math.boredgames.site/math/${slug}/${mode}.html">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="https://math.boredgames.site/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="MathBored">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://math.boredgames.site/math/${slug}/${mode}.html">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="https://math.boredgames.site/og-image.png">
    
    <!-- Structured Data (JSON-LD) for SEO -->
    <script type="application/ld+json">
${JSON.stringify(structuredData, null, 8)}
    </script>
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://math.boredgames.site/math/${slug}/${mode}.html">
    
    <!-- PWA & Icons -->
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/svg+xml" href="/icon.svg">
    <meta name="theme-color" content="#3b82f6">
    
    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://math.boredgames.site">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/styles.css">
    
    <style>
        /* Loading screen styles */
        .seo-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #f1f5f9;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            text-align: center;
            padding: 20px;
        }
        
        .seo-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
            animation: bounce 1s ease-in-out infinite;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        .seo-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .seo-subtitle {
            font-size: 1.2rem;
            color: #cbd5e1;
            margin-bottom: 2rem;
        }
        
        .seo-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(59, 130, 246, 0.1);
            border-top-color: #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .seo-content {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            background: rgba(30, 41, 59, 0.5);
            border-radius: 12px;
            border: 1px solid rgba(71, 85, 105, 0.5);
        }
        
        .seo-description {
            font-size: 1rem;
            line-height: 1.6;
            color: #cbd5e1;
            margin-bottom: 1.5rem;
        }
        
        .seo-keywords {
            font-size: 0.9rem;
            color: #94a3b8;
        }
        
        .seo-link {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 600;
        }
        
        .seo-link:hover {
            color: #2563eb;
            text-decoration: underline;
        }
        
        .seo-related {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(71, 85, 105, 0.5);
        }
        
        .seo-related-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        .seo-related-list {
            list-style: none;
            padding: 0;
        }
        
        .seo-related-item {
            margin-bottom: 0.5rem;
        }
    </style>
</head>
<body>
    <!-- SEO-friendly content (visible to search engines, hidden from users who have JS) -->
    <div class="seo-loading" id="seoContent">
        <div class="seo-icon">${modeIcons[mode]}</div>
        <h1 class="seo-title">${topic.concept}</h1>
        <p class="seo-subtitle">${modeLabels[mode]} • ${getGradeLabel(grade)}</p>
        <div class="seo-spinner"></div>
        
        <div class="seo-content">
            <p class="seo-description">${description}</p>
            
            ${topic.keyConcepts ? `<p class="seo-keywords"><strong>Key Concepts:</strong> ${topic.keyConcepts}</p>` : ''}
            ${topic.keyFormulas ? `<p class="seo-keywords"><strong>Formulas:</strong> ${topic.keyFormulas}</p>` : ''}
            
            <p style="margin-top: 1.5rem;">
                <a href="/" class="seo-link">← Back to MathBored Home</a>
            </p>
            
            ${relatedTopics.length > 0 ? `
            <div class="seo-related">
                <h2 class="seo-related-title">Related Topics</h2>
                <ul class="seo-related-list">
                    ${relatedTopics.map(rt => `<li class="seo-related-item">• ${rt}</li>`).join('\n                    ')}
                </ul>
            </div>
            ` : ''}
        </div>
    </div>
    
    <!-- Automatic redirect to main app (executes immediately) -->
    <script>
        (function() {
            // Redirect to main app with proper URL parameters
            const params = new URLSearchParams({
                topic: '${topic.concept.replace(/'/g, "\\'")}',
                mode: '${mode}',
                grade: '${grade}'
            });
            
            // Hide loading screen before redirect for better UX
            const seoContent = document.getElementById('seoContent');
            if (seoContent) {
                seoContent.style.opacity = '0';
                seoContent.style.transition = 'opacity 0.3s ease';
            }
            
            // Redirect after brief delay for smooth transition
            setTimeout(function() {
                window.location.replace('/?' + params.toString());
            }, 200);
        })();
    </script>
    
    <!-- Fallback for users with JavaScript disabled -->
    <noscript>
        <div style="padding: 40px; text-align: center; font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh;">
            <h1 style="color: #0f172a; margin-bottom: 1rem;">${topic.concept} - ${modeLabels[mode]}</h1>
            <p style="color: #475569; font-size: 1.1rem; margin-bottom: 2rem;">${description}</p>
            <p style="color: #64748b;">
                Please enable JavaScript to use MathBored's interactive features, or 
                <a href="/" style="color: #3b82f6; font-weight: 600;">visit the main app</a>.
            </p>
        </div>
    </noscript>
</body>
</html>`;
}

/**
 * Generate sitemap entry for a topic/mode page
 */
function generateSitemapEntry(topic, mode, grade) {
    const slug = toSlug(topic.concept);
    const today = new Date().toISOString().split('T')[0];
    
    return `  <url>
    <loc>https://math.boredgames.site/math/${slug}/${mode}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
}

/**
 * Main generation function
 */
function generateAllPages() {
    console.log('🎨 Starting page generation...\n');
    
    const modes = ['lesson', 'walkthrough', 'practice'];
    const pages = [];
    const sitemapEntries = [];
    let generatedCount = 0;
    
    // Create math directory
    const mathDir = path.join(__dirname, 'math');
    if (!fs.existsSync(mathDir)) {
        fs.mkdirSync(mathDir, { recursive: true });
        console.log('📁 Created directory: math/');
    }
    
    // Generate pages for each topic
    console.log('📝 Generating topic pages...\n');
    
    mathConcepts.forEach((topic, index) => {
        const slug = toSlug(topic.concept);
        const topicDir = path.join(mathDir, slug);
        
        // Create topic directory
        if (!fs.existsSync(topicDir)) {
            fs.mkdirSync(topicDir, { recursive: true });
        }
        
        // Generate page for each mode
        modes.forEach(mode => {
            const html = generateTopicPage(topic, mode, topic.gradeLevel);
            const filePath = path.join(topicDir, `${mode}.html`);
            
            fs.writeFileSync(filePath, html, 'utf8');
            
            pages.push({
                topic: topic.concept,
                mode,
                grade: topic.gradeLevel,
                slug,
                filePath: filePath.replace(__dirname + '/', '')
            });
            
            sitemapEntries.push(generateSitemapEntry(topic, mode, topic.gradeLevel));
            generatedCount++;
        });
        
        // Progress indicator
        if ((index + 1) % 20 === 0 || index === mathConcepts.length - 1) {
            console.log(`   ✓ Generated ${(index + 1)} topics (${generatedCount} pages)`);
        }
    });
    
    console.log('\n✅ All topic pages generated!\n');
    
    // Generate sitemap.xml
    console.log('🗺️  Generating sitemap.xml...');
    
    const today = new Date().toISOString().split('T')[0];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Main Pages -->
  <url>
    <loc>https://math.boredgames.site/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://math.boredgames.site/roadmap.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://math.boredgames.site/demo.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Topic Pages -->
${sitemapEntries.join('\n')}
</urlset>`;
    
    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf8');
    console.log('   ✓ sitemap.xml created with', sitemapEntries.length + 3, 'URLs\n');
    
    // Generate/update robots.txt
    console.log('🤖 Generating robots.txt...');
    
    const robotsPath = path.join(__dirname, 'robots.txt');
    const robots = `# MathBored - Free K-12 Math Education
# Welcome, search engines! 🎓

User-agent: *
Allow: /

# Sitemap
Sitemap: https://math.boredgames.site/sitemap.xml

# Crawl delay (be nice to our free hosting)
Crawl-delay: 1`;
    
    fs.writeFileSync(robotsPath, robots, 'utf8');
    console.log('   ✓ robots.txt created\n');
    
    // Generate summary report
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 GENERATION SUMMARY\n');
    console.log(`   Topics:          ${mathConcepts.length}`);
    console.log(`   Modes per topic: ${modes.length}`);
    console.log(`   Total pages:     ${generatedCount}`);
    console.log(`   Sitemap URLs:    ${sitemapEntries.length + 3}`);
    console.log(`   Directory:       math/`);
    console.log('\n✨ All SEO pages generated successfully!');
    console.log('═══════════════════════════════════════════════════════\n');
    
    return {
        pages,
        totalPages: generatedCount,
        totalTopics: mathConcepts.length,
        sitemapEntries: sitemapEntries.length + 3
    };
}

// Run if called directly
if (require.main === module) {
    try {
        generateAllPages();
        console.log('🎉 Done! Your SEO pages are ready to deploy.\n');
    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

module.exports = { generateAllPages, toSlug, getGradeLabel };

















