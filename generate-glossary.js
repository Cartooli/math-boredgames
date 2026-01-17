#!/usr/bin/env node

/**
 * Glossary Generator for MathBored
 * 
 * Generates:
 * - /glossary.html (main index with search and filters)
 * - /glossary/[term-slug].html (individual term pages)
 * 
 * Only includes terms that have existing lesson pages to ensure quality.
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
    console.log(`✅ Successfully loaded ${mathConcepts.length} math concepts\n`);
} catch (error) {
    console.error('❌ ERROR: Failed to parse mathConcepts array');
    console.error('   ', error.message);
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
 * Check if lesson page exists for a term
 */
function lessonPageExists(slug) {
    const lessonPath = path.join(__dirname, 'math', slug, 'lesson.html');
    return fs.existsSync(lessonPath);
}

/**
 * Generate a comprehensive definition for a term
 */
function generateDefinition(concept) {
    let definition = '';
    
    // Start with key concepts as the foundation
    if (concept.keyConcepts) {
        definition = concept.keyConcepts;
    } else {
        definition = `${concept.concept} is a fundamental mathematical concept`;
    }
    
    // Expand based on concept type
    const conceptLower = concept.concept.toLowerCase();
    
    // Add formula if available
    if (concept.keyFormulas && concept.keyFormulas.trim()) {
        definition += `. The key formula is ${concept.keyFormulas}`;
    }
    
    // Add context based on grade level
    const gradeLabel = getGradeLabel(concept.gradeLevel);
    definition += `. This concept is typically introduced in ${gradeLabel}`;
    
    // Add related operations context
    if (concept.relatedOperations) {
        definition += ` and involves ${concept.relatedOperations.toLowerCase()}`;
    }
    
    // Add more context for specific concept types
    if (conceptLower.includes('addition')) {
        definition += '. Addition is the process of combining two or more numbers to find their total.';
    } else if (conceptLower.includes('subtraction')) {
        definition += '. Subtraction is the process of taking away one number from another to find the difference.';
    } else if (conceptLower.includes('multiplication')) {
        definition += '. Multiplication is repeated addition, used to find the total of equal groups.';
    } else if (conceptLower.includes('division')) {
        definition += '. Division is the process of splitting a number into equal parts or groups.';
    } else if (conceptLower.includes('fraction')) {
        definition += '. Fractions represent parts of a whole, written as a ratio of two numbers.';
    } else if (conceptLower.includes('decimal')) {
        definition += '. Decimals are numbers that represent parts of a whole using a decimal point.';
    } else if (conceptLower.includes('percentage')) {
        definition += '. Percentages represent parts per hundred, useful for comparing quantities.';
    } else if (conceptLower.includes('equation')) {
        definition += '. Equations are mathematical statements showing that two expressions are equal.';
    } else if (conceptLower.includes('geometry') || conceptLower.includes('shape') || conceptLower.includes('angle')) {
        definition += '. This geometric concept helps students understand shapes, space, and relationships.';
    } else if (conceptLower.includes('graph') || conceptLower.includes('data')) {
        definition += '. This concept helps students organize, interpret, and visualize information.';
    } else if (conceptLower.includes('measurement')) {
        definition += '. Measurement concepts help students quantify and compare physical properties.';
    } else if (conceptLower.includes('probability') || conceptLower.includes('statistics')) {
        definition += '. This statistical concept helps students understand chance, data analysis, and predictions.';
    } else if (conceptLower.includes('function') || conceptLower.includes('algebra')) {
        definition += '. This algebraic concept helps students understand relationships and patterns in mathematics.';
    } else if (conceptLower.includes('calculus') || conceptLower.includes('derivative') || conceptLower.includes('integral')) {
        definition += '. This advanced calculus concept explores rates of change and accumulation.';
    } else {
        definition += '. Understanding this concept builds a strong foundation for more advanced mathematics.';
    }
    
    // Ensure minimum length
    if (definition.length < 150) {
        definition += ' Students learn to apply this concept through practice problems and real-world applications.';
    }
    
    return definition;
}

/**
 * Generate a short preview (1-2 sentences) for index cards
 */
function generatePreview(concept) {
    let preview = '';
    
    if (concept.keyConcepts) {
        preview = concept.keyConcepts;
    } else {
        preview = `${concept.concept} is a mathematical concept`;
    }
    
    // Add formula if short
    if (concept.keyFormulas && concept.keyFormulas.trim() && concept.keyFormulas.length < 30) {
        preview += ` (${concept.keyFormulas})`;
    }
    
    // Ensure it's 1-2 sentences max
    const sentences = preview.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length > 2) {
        preview = sentences.slice(0, 2).join('. ') + '.';
    }
    
    return preview.length > 150 ? preview.substring(0, 147) + '...' : preview;
}

/**
 * Get related terms from data.js
 */
function getRelatedTerms(concept, allConcepts) {
    const related = [];
    
    if (concept.relatedTopics) {
        const relatedNames = concept.relatedTopics.split(',').map(t => t.trim());
        relatedNames.forEach(name => {
            const found = allConcepts.find(c => 
                c.concept.toLowerCase() === name.toLowerCase() ||
                c.concept.toLowerCase().includes(name.toLowerCase()) ||
                name.toLowerCase().includes(c.concept.toLowerCase())
            );
            if (found && found.concept !== concept.concept) {
                related.push(found);
            }
        });
    }
    
    // Also find concepts in same grade level
    const sameGrade = allConcepts.filter(c => 
        c.gradeLevel === concept.gradeLevel && 
        c.concept !== concept.concept
    ).slice(0, 3);
    
    related.push(...sameGrade);
    
    // Remove duplicates
    const unique = [];
    const seen = new Set();
    related.forEach(c => {
        if (!seen.has(c.concept)) {
            seen.add(c.concept);
            unique.push(c);
        }
    });
    
    return unique.slice(0, 5);
}

/**
 * Generate DefinedTerm schema for a term page
 */
function generateDefinedTermSchema(concept, slug) {
    const definition = generateDefinition(concept);
    const gradeLabel = getGradeLabel(concept.gradeLevel);
    
    return {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "name": concept.concept,
        "description": definition,
        "inDefinedTermSet": {
            "@type": "DefinedTermSet",
            "name": "MathBored Math Glossary",
            "url": "https://math.boredgames.site/glossary.html"
        },
        "educationalLevel": gradeLabel,
        "url": `https://math.boredgames.site/glossary/${slug}.html`
    };
}

/**
 * Generate individual term page HTML
 */
function generateTermPage(concept, allConcepts) {
    const slug = toSlug(concept.concept);
    const gradeLabel = getGradeLabel(concept.gradeLevel);
    const definition = generateDefinition(concept);
    const preview = generatePreview(concept);
    const relatedTerms = getRelatedTerms(concept, allConcepts);
    const lessonUrl = `/math/${slug}/lesson.html`;
    
    const definedTermSchema = generateDefinedTermSchema(concept, slug);
    
    // Breadcrumb schema
    const breadcrumbSchema = {
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
                "name": "Glossary",
                "item": "https://math.boredgames.site/glossary.html"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": concept.concept,
                "item": `https://math.boredgames.site/glossary/${slug}.html`
            }
        ]
    };
    
    const relatedTermsHTML = relatedTerms.length > 0 ? `
        <div class="glossary-related">
            <h3>Related Terms</h3>
            <div class="glossary-related-grid">
                ${relatedTerms.map(related => {
                    const relatedSlug = toSlug(related.concept);
                    return `
                        <a href="/glossary/${relatedSlug}.html" class="glossary-related-card">
                            <div class="glossary-related-name">${related.concept}</div>
                            <div class="glossary-related-grade">${getGradeLabel(related.gradeLevel)}</div>
                        </a>
                    `;
                }).join('')}
            </div>
        </div>
    ` : '';
    
    const formulaHTML = concept.keyFormulas && concept.keyFormulas.trim() ? `
        <div class="glossary-formula">
            <h3>Key Formula</h3>
            <div class="formula-display">${concept.keyFormulas}</div>
        </div>
    ` : '';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>What is ${concept.concept}? - ${gradeLabel} Math Definition | MathBored</title>
    <meta name="description" content="${preview} Learn more about ${concept.concept} with our comprehensive ${gradeLabel} math glossary.">
    <meta name="keywords" content="${concept.concept}, ${gradeLabel}, math definition, math glossary, ${concept.keyConcepts || ''}">
    <meta name="robots" content="index, follow">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://math.boredgames.site/glossary/${slug}.html">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://math.boredgames.site/glossary/${slug}.html">
    <meta property="og:title" content="What is ${concept.concept}? - Math Definition">
    <meta property="og:description" content="${preview}">
    <meta property="og:image" content="https://math.boredgames.site/og-image.png">
    <meta property="og:site_name" content="MathBored">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://math.boredgames.site/glossary/${slug}.html">
    <meta property="twitter:title" content="What is ${concept.concept}? - Math Definition">
    <meta property="twitter:description" content="${preview}">
    <meta property="twitter:image" content="https://math.boredgames.site/og-image.png">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
${JSON.stringify(definedTermSchema, null, 2)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>
    
    <!-- PWA & Icons -->
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/svg+xml" href="/icon.svg">
    <meta name="theme-color" content="#3b82f6">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/styles.css">
    
    <style>
        .glossary-term-page {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        .glossary-term-header {
            margin-bottom: 30px;
        }
        
        .glossary-term-header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            color: var(--text-primary);
        }
        
        .glossary-term-meta {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .glossary-grade-badge {
            display: inline-block;
            padding: 6px 12px;
            background: var(--accent);
            color: white;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 600;
        }
        
        .glossary-definition {
            background: var(--card-bg);
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 30px;
            border: 1px solid var(--border);
            line-height: 1.8;
            font-size: 1.1rem;
        }
        
        .glossary-definition p {
            margin-bottom: 15px;
        }
        
        .glossary-definition p:last-child {
            margin-bottom: 0;
        }
        
        .glossary-formula {
            background: var(--bg-secondary);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
            border: 1px solid var(--border);
        }
        
        .glossary-formula h3 {
            margin-bottom: 15px;
            color: var(--text-primary);
        }
        
        .formula-display {
            font-family: 'Courier New', monospace;
            font-size: 1.5rem;
            background: var(--bg-primary);
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            color: var(--accent);
            font-weight: bold;
        }
        
        .glossary-actions {
            display: flex;
            gap: 15px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        
        .glossary-btn {
            padding: 12px 24px;
            background: var(--accent);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.2s ease;
            display: inline-block;
        }
        
        .glossary-btn:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
        }
        
        .glossary-btn-secondary {
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 1px solid var(--border);
        }
        
        .glossary-btn-secondary:hover {
            background: var(--bg-tertiary);
        }
        
        .glossary-related {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 2px solid var(--border);
        }
        
        .glossary-related h3 {
            margin-bottom: 20px;
            color: var(--text-primary);
        }
        
        .glossary-related-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .glossary-related-card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 15px;
            text-decoration: none;
            color: var(--text-primary);
            transition: all 0.2s ease;
        }
        
        .glossary-related-card:hover {
            background: var(--bg-secondary);
            transform: translateY(-2px);
            border-color: var(--accent);
        }
        
        .glossary-related-name {
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .glossary-related-grade {
            font-size: 0.85rem;
            color: var(--text-secondary);
        }
        
        .glossary-breadcrumb {
            margin-bottom: 20px;
            font-size: 0.9rem;
        }
        
        .glossary-breadcrumb a {
            color: var(--accent);
            text-decoration: none;
        }
        
        .glossary-breadcrumb a:hover {
            text-decoration: underline;
        }
        
        .share-buttons {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        
        .share-btn {
            padding: 8px 16px;
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 6px;
            color: var(--text-primary);
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.2s ease;
        }
        
        .share-btn:hover {
            background: var(--bg-tertiary);
            border-color: var(--accent);
        }
    </style>
</head>
<body>
    <div class="glossary-term-page">
        <nav class="glossary-breadcrumb">
            <a href="/">Home</a> / 
            <a href="/glossary.html">Glossary</a> / 
            <span>${concept.concept}</span>
        </nav>
        
        <div class="glossary-term-header">
            <h1>What is ${concept.concept}?</h1>
            <div class="glossary-term-meta">
                <span class="glossary-grade-badge">${gradeLabel}</span>
                ${concept.keyFormulas && concept.keyFormulas.trim() ? `<span class="glossary-grade-badge" style="background: var(--success);">Formula Available</span>` : ''}
            </div>
        </div>
        
        <div class="glossary-definition">
            <p>${definition}</p>
        </div>
        
        ${formulaHTML}
        
        <div class="glossary-actions">
            <a href="${lessonUrl}" class="glossary-btn">📚 View Full Lesson</a>
            <a href="/glossary.html" class="glossary-btn glossary-btn-secondary">← Back to Glossary</a>
        </div>
        
        <div class="share-buttons">
            <button class="share-btn" onclick="navigator.share ? navigator.share({title: '${concept.concept}', text: '${preview}', url: window.location.href}) : navigator.clipboard.writeText(window.location.href).then(() => alert('Link copied!'))">
                📤 Share
            </button>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`What is ${concept.concept}? ${preview}`)}&url=${encodeURIComponent(`https://math.boredgames.site/glossary/${slug}.html`)}" target="_blank" class="share-btn">
                🐦 Tweet
            </a>
        </div>
        
        ${relatedTermsHTML}
    </div>
</body>
</html>`;
}

/**
 * Generate main glossary index page
 */
function generateGlossaryIndex(validConcepts) {
    // Group by grade
    const byGrade = {};
    validConcepts.forEach(concept => {
        if (!byGrade[concept.gradeLevel]) {
            byGrade[concept.gradeLevel] = [];
        }
        byGrade[concept.gradeLevel].push(concept);
    });
    
    // Sort concepts alphabetically within each grade
    Object.keys(byGrade).forEach(grade => {
        byGrade[grade].sort((a, b) => a.concept.localeCompare(b.concept));
    });
    
    // Generate grade sections
    const gradeSections = Object.keys(byGrade).sort((a, b) => {
        if (a === 'K') return -1;
        if (b === 'K') return 1;
        return parseInt(a) - parseInt(b);
    }).map(grade => {
        const concepts = byGrade[grade];
        const gradeLabel = getGradeLabel(grade);
        return `
            <div class="glossary-grade-section" data-grade="${grade}">
                <h2 class="glossary-grade-header">
                    <span>${gradeLabel}</span>
                    <span class="glossary-count">${concepts.length} terms</span>
                </h2>
                <div class="glossary-grid">
                    ${concepts.map(concept => {
                        const slug = toSlug(concept.concept);
                        const preview = generatePreview(concept);
                        return `
                            <a href="/glossary/${slug}.html" class="glossary-card" data-grade="${grade}">
                                <div class="glossary-card-header">
                                    <h3 class="glossary-card-title">${concept.concept}</h3>
                                    <span class="glossary-card-grade">${gradeLabel}</span>
                                </div>
                                <p class="glossary-card-preview">${preview}</p>
                                ${concept.keyFormulas && concept.keyFormulas.trim() ? `<div class="glossary-card-formula">${concept.keyFormulas}</div>` : ''}
                            </a>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    // Generate ItemList schema
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "MathBored Math Glossary",
        "description": "Comprehensive glossary of K-12 math terms and definitions",
        "numberOfItems": validConcepts.length,
        "itemListElement": validConcepts.map((concept, index) => {
            const slug = toSlug(concept.concept);
            return {
                "@type": "ListItem",
                "position": index + 1,
                "name": concept.concept,
                "url": `https://math.boredgames.site/glossary/${slug}.html`
            };
        })
    };
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Math Glossary - 200+ K-12 Math Terms & Definitions | MathBored</title>
    <meta name="description" content="Comprehensive math glossary with ${validConcepts.length}+ K-12 math terms, definitions, and examples. Perfect for students, parents, and teachers. Free forever.">
    <meta name="keywords" content="math glossary, math dictionary, math terms, math definitions, K-12 math, algebra glossary, geometry glossary">
    <meta name="robots" content="index, follow">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://math.boredgames.site/glossary.html">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://math.boredgames.site/glossary.html">
    <meta property="og:title" content="Math Glossary - 200+ K-12 Math Terms & Definitions">
    <meta property="og:description" content="Comprehensive math glossary with ${validConcepts.length}+ K-12 math terms, definitions, and examples. Perfect for students, parents, and teachers.">
    <meta property="og:image" content="https://math.boredgames.site/og-image.png">
    <meta property="og:site_name" content="MathBored">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://math.boredgames.site/glossary.html">
    <meta property="twitter:title" content="Math Glossary - 200+ K-12 Math Terms & Definitions">
    <meta property="twitter:description" content="Comprehensive math glossary with ${validConcepts.length}+ K-12 math terms, definitions, and examples.">
    <meta property="twitter:image" content="https://math.boredgames.site/og-image.png">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
${JSON.stringify(itemListSchema, null, 2)}
    </script>
    
    <!-- PWA & Icons -->
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/svg+xml" href="/icon.svg">
    <meta name="theme-color" content="#3b82f6">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/styles.css">
    
    <style>
        .glossary-page {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        .glossary-header {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .glossary-header h1 {
            font-size: 3rem;
            margin-bottom: 15px;
            color: var(--text-primary);
        }
        
        .glossary-header p {
            font-size: 1.2rem;
            color: var(--text-secondary);
            max-width: 700px;
            margin: 0 auto;
        }
        
        .glossary-controls {
            background: var(--card-bg);
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 30px;
            border: 1px solid var(--border);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .glossary-search-wrapper {
            margin-bottom: 20px;
        }
        
        .glossary-search-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-secondary);
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .glossary-search {
            position: relative;
            width: 100%;
        }
        
        .glossary-search-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.2rem;
            color: var(--text-secondary);
            pointer-events: none;
            z-index: 1;
        }
        
        .glossary-search input {
            width: 100%;
            padding: 14px 48px 14px 48px;
            background: var(--bg-primary);
            border: 2px solid var(--border);
            border-radius: 12px;
            color: var(--text-primary);
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .glossary-search input:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
        }
        
        .glossary-search input::placeholder {
            color: var(--text-muted);
        }
        
        .glossary-search-clear {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: var(--bg-secondary);
            border: none;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: var(--text-secondary);
            font-size: 1.2rem;
            transition: all 0.2s ease;
            opacity: 0;
            pointer-events: none;
            z-index: 2;
        }
        
        .glossary-search-clear.visible {
            opacity: 1;
            pointer-events: all;
        }
        
        .glossary-search-clear:hover {
            background: var(--bg-tertiary);
            color: var(--text-primary);
            transform: translateY(-50%) scale(1.1);
        }
        
        .glossary-filters-wrapper {
            margin-top: 20px;
        }
        
        .glossary-filters-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-secondary);
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .glossary-filters {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            align-items: center;
        }
        
        .glossary-filters-scroll {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 4px;
            scrollbar-width: thin;
            scrollbar-color: var(--border) transparent;
            -webkit-overflow-scrolling: touch;
        }
        
        .glossary-filters-scroll::-webkit-scrollbar {
            height: 6px;
        }
        
        .glossary-filters-scroll::-webkit-scrollbar-track {
            background: transparent;
        }
        
        .glossary-filters-scroll::-webkit-scrollbar-thumb {
            background: var(--border);
            border-radius: 3px;
        }
        
        .glossary-filter-btn {
            padding: 10px 18px;
            background: var(--bg-secondary);
            border: 2px solid var(--border);
            border-radius: 20px;
            color: var(--text-primary);
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 0.9rem;
            font-weight: 500;
            white-space: nowrap;
            position: relative;
            overflow: hidden;
        }
        
        .glossary-filter-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s ease;
        }
        
        .glossary-filter-btn:hover::before {
            left: 100%;
        }
        
        .glossary-filter-btn:hover {
            background: var(--bg-tertiary);
            border-color: var(--accent);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(59, 130, 246, 0.15);
        }
        
        .glossary-filter-btn.active {
            background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
            border-color: var(--accent);
            color: white;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            transform: translateY(-2px);
        }
        
        .glossary-filter-btn.active:hover {
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
            transform: translateY(-3px);
        }
        
        .glossary-stats {
            text-align: center;
            margin-bottom: 30px;
            padding: 12px 20px;
            background: var(--bg-secondary);
            border-radius: 10px;
            color: var(--text-secondary);
            font-size: 0.95rem;
            font-weight: 500;
            border: 1px solid var(--border);
        }
        
        .glossary-stats strong {
            color: var(--accent);
            font-weight: 600;
        }
        
        @media (max-width: 768px) {
            .glossary-controls {
                padding: 20px 16px;
            }
            
            .glossary-filters {
                flex-wrap: nowrap;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: thin;
                padding-bottom: 8px;
            }
            
            .glossary-filter-btn {
                padding: 8px 16px;
                font-size: 0.85rem;
            }
            
            .glossary-search input {
                padding: 12px 14px 12px 44px;
                font-size: 0.95rem;
            }
        }
        
        .glossary-grade-section {
            margin-bottom: 50px;
        }
        
        .glossary-grade-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--border);
            color: var(--text-primary);
        }
        
        .glossary-count {
            font-size: 0.9rem;
            color: var(--text-secondary);
            font-weight: normal;
        }
        
        .glossary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }
        
        .glossary-card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 20px;
            text-decoration: none;
            color: var(--text-primary);
            transition: all 0.2s ease;
            display: block;
        }
        
        .glossary-card:hover {
            background: var(--bg-secondary);
            transform: translateY(-2px);
            border-color: var(--accent);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }
        
        .glossary-card-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 10px;
        }
        
        .glossary-card-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0;
            color: var(--text-primary);
        }
        
        .glossary-card-grade {
            font-size: 0.75rem;
            padding: 4px 8px;
            background: var(--accent);
            color: white;
            border-radius: 4px;
            white-space: nowrap;
        }
        
        .glossary-card-preview {
            color: var(--text-secondary);
            font-size: 0.95rem;
            line-height: 1.6;
            margin: 0;
        }
        
        .glossary-card-formula {
            margin-top: 10px;
            padding: 8px;
            background: var(--bg-primary);
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            color: var(--accent);
            text-align: center;
        }
        
        .glossary-no-results {
            text-align: center;
            padding: 60px 20px;
            color: var(--text-secondary);
        }
        
        .glossary-no-results h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="glossary-page">
        <div class="glossary-header">
            <h1>📖 Math Glossary</h1>
            <p>Comprehensive definitions for ${validConcepts.length}+ K-12 math terms. Perfect for students, parents, and teachers.</p>
        </div>
        
        <div class="glossary-controls">
            <div class="glossary-search-wrapper">
                <label for="glossarySearch" class="glossary-search-label">Search Terms</label>
                <div class="glossary-search">
                    <span class="glossary-search-icon">🔍</span>
                    <input type="text" id="glossarySearch" placeholder="Type to search math terms..." autocomplete="off">
                    <button class="glossary-search-clear" id="glossarySearchClear" aria-label="Clear search">×</button>
                </div>
            </div>
            
            <div class="glossary-filters-wrapper">
                <label class="glossary-filters-label">Filter by Grade</label>
                <div class="glossary-filters-scroll">
                    <button class="glossary-filter-btn active" data-grade="all">All Grades</button>
                    <button class="glossary-filter-btn" data-grade="K">Kindergarten</button>
                    <button class="glossary-filter-btn" data-grade="1">1st Grade</button>
                    <button class="glossary-filter-btn" data-grade="2">2nd Grade</button>
                    <button class="glossary-filter-btn" data-grade="3">3rd Grade</button>
                    <button class="glossary-filter-btn" data-grade="4">4th Grade</button>
                    <button class="glossary-filter-btn" data-grade="5">5th Grade</button>
                    <button class="glossary-filter-btn" data-grade="6">6th Grade</button>
                    <button class="glossary-filter-btn" data-grade="7">7th Grade</button>
                    <button class="glossary-filter-btn" data-grade="8">8th Grade</button>
                    <button class="glossary-filter-btn" data-grade="9">9th Grade</button>
                    <button class="glossary-filter-btn" data-grade="10">10th Grade</button>
                    <button class="glossary-filter-btn" data-grade="11">11th Grade</button>
                    <button class="glossary-filter-btn" data-grade="12">12th Grade</button>
                </div>
            </div>
        </div>
        
        <div class="glossary-stats">
            <span id="glossaryStats"><strong>${validConcepts.length}</strong> terms available</span>
        </div>
        
        <div id="glossaryResults">
            ${gradeSections}
        </div>
        
        <div id="glossaryNoResults" class="glossary-no-results" style="display: none;">
            <h3>No terms found</h3>
            <p>Try adjusting your search or filters</p>
        </div>
    </div>
    
    <script>
        // Search and filter functionality
        const searchInput = document.getElementById('glossarySearch');
        const filterButtons = document.querySelectorAll('.glossary-filter-btn');
        const cards = document.querySelectorAll('.glossary-card');
        const gradeSections = document.querySelectorAll('.glossary-grade-section');
        const statsEl = document.getElementById('glossaryStats');
        const noResultsEl = document.getElementById('glossaryNoResults');
        const resultsEl = document.getElementById('glossaryResults');
        
        let currentGrade = 'all';
        let currentSearch = '';
        
        function updateDisplay() {
            let visibleCount = 0;
            let hasVisibleSection = false;
            
            gradeSections.forEach(section => {
                const sectionGrade = section.dataset.grade;
                const sectionCards = section.querySelectorAll('.glossary-card');
                let sectionVisible = false;
                
                sectionCards.forEach(card => {
                    const cardGrade = card.dataset.grade;
                    const cardText = card.textContent.toLowerCase();
                    const title = card.querySelector('.glossary-card-title').textContent.toLowerCase();
                    
                    const matchesGrade = currentGrade === 'all' || cardGrade === currentGrade;
                    const matchesSearch = currentSearch === '' || 
                        title.includes(currentSearch.toLowerCase()) || 
                        cardText.includes(currentSearch.toLowerCase());
                    
                    if (matchesGrade && matchesSearch) {
                        card.style.display = 'block';
                        sectionVisible = true;
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                if (sectionVisible) {
                    section.style.display = 'block';
                    hasVisibleSection = true;
                } else {
                    section.style.display = 'none';
                }
            });
            
            statsEl.innerHTML = \`<strong>\${visibleCount}</strong> term\${visibleCount !== 1 ? 's' : ''} \${currentSearch || currentGrade !== 'all' ? 'found' : 'available'}\`;
            
            if (visibleCount === 0) {
                resultsEl.style.display = 'none';
                noResultsEl.style.display = 'block';
            } else {
                resultsEl.style.display = 'block';
                noResultsEl.style.display = 'none';
            }
        }
        
        // Search input handler
        const searchClearBtn = document.getElementById('glossarySearchClear');
        
        function updateSearchClear() {
            if (searchInput.value.trim()) {
                searchClearBtn.classList.add('visible');
            } else {
                searchClearBtn.classList.remove('visible');
            }
        }
        
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            updateSearchClear();
            updateDisplay();
        });
        
        // Clear search handler
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearch = '';
            updateSearchClear();
            updateDisplay();
            searchInput.focus();
        });
        
        // Filter button handlers
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentGrade = btn.dataset.grade;
                updateDisplay();
            });
        });
        
        // Initial display
        updateDisplay();
    </script>
</body>
</html>`;
}

/**
 * Main generation function
 */
function generateGlossary() {
    console.log('📖 Starting glossary generation...\n');
    
    // Filter concepts that have lesson pages
    console.log('🔍 Checking for existing lesson pages...');
    const validConcepts = [];
    
    mathConcepts.forEach((concept, index) => {
        const slug = toSlug(concept.concept);
        if (lessonPageExists(slug)) {
            validConcepts.push(concept);
        }
        
        if ((index + 1) % 50 === 0 || index === mathConcepts.length - 1) {
            console.log(`   ✓ Checked ${index + 1}/${mathConcepts.length} concepts (${validConcepts.length} valid)`);
        }
    });
    
    console.log(`\n✅ Found ${validConcepts.length} terms with lesson pages\n`);
    
    if (validConcepts.length === 0) {
        console.error('❌ ERROR: No valid terms found. Make sure lesson pages exist.');
        process.exit(1);
    }
    
    // Create glossary directory
    const glossaryDir = path.join(__dirname, 'glossary');
    if (!fs.existsSync(glossaryDir)) {
        fs.mkdirSync(glossaryDir, { recursive: true });
        console.log('📁 Created directory: glossary/\n');
    }
    
    // Generate main glossary index
    console.log('📝 Generating glossary index page...');
    const indexHTML = generateGlossaryIndex(validConcepts);
    fs.writeFileSync(path.join(__dirname, 'glossary.html'), indexHTML, 'utf8');
    console.log('   ✓ Created glossary.html\n');
    
    // Generate individual term pages
    console.log('📝 Generating individual term pages...');
    let generatedCount = 0;
    
    validConcepts.forEach((concept, index) => {
        const slug = toSlug(concept.concept);
        const termHTML = generateTermPage(concept, validConcepts);
        const termPath = path.join(glossaryDir, `${slug}.html`);
        
        fs.writeFileSync(termPath, termHTML, 'utf8');
        generatedCount++;
        
        if ((index + 1) % 20 === 0 || index === validConcepts.length - 1) {
            console.log(`   ✓ Generated ${index + 1}/${validConcepts.length} term pages`);
        }
    });
    
    console.log(`\n✅ All glossary pages generated!\n`);
    console.log(`📊 Summary:`);
    console.log(`   - Main index: glossary.html`);
    console.log(`   - Term pages: ${generatedCount} pages in glossary/`);
    console.log(`   - Total terms: ${validConcepts.length}\n`);
    console.log('🎉 Glossary generation complete!');
    console.log('\n💡 Next steps:');
    console.log('   1. Add glossary link to header: <a href="glossary.html">📖 Glossary</a>');
    console.log('   2. Run: node update-sitemap-glossary.js (to update sitemap)');
    console.log('   3. Test pages in browser');
    console.log('   4. Submit to Google Search Console\n');
}

// Run if called directly
if (require.main === module) {
    generateGlossary();
}

module.exports = { generateGlossary, toSlug, getGradeLabel };
