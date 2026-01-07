#!/usr/bin/env node

/**
 * Generate FAQ pages targeting common math questions
 * These pages target "how to" and "what is" queries for better SEO
 * 
 * Usage: node generate-faq-pages.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 MathBored FAQ Page Generator\n');
console.log('═══════════════════════════════════════════════════════\n');

// FAQ data organized by topic
const faqData = {
    general: {
        title: 'MathBored FAQ - Frequently Asked Questions',
        description: 'Common questions about MathBored, free K-12 math learning, and how to use our platform.',
        slug: 'faq',
        faqs: [
            {
                question: 'Is MathBored really free?',
                answer: 'Yes! MathBored is 100% free forever. We believe education should be accessible to everyone, so there are no ads, no subscriptions, and no hidden costs. All features are available at no charge.'
            },
            {
                question: 'Do I need to create an account?',
                answer: 'No account required! You can start learning immediately without signing up. Your progress is saved locally in your browser, so you can track your streak and scores without any registration.'
            },
            {
                question: 'What grade levels does MathBored cover?',
                answer: 'MathBored covers all K-12 math topics, from kindergarten counting to calculus. You can filter content by grade level, and our system automatically adjusts difficulty based on your selected grade.'
            },
            {
                question: 'How do I use MathBored?',
                answer: 'Simply select your grade level, choose a math topic, and pick a learning mode (Lesson, Walkthrough, or Practice). Lessons teach concepts, walkthroughs show step-by-step solutions, and practice mode gives you unlimited problems with instant feedback.'
            },
            {
                question: 'Can I use MathBored on mobile devices?',
                answer: 'Yes! MathBored is fully responsive and works great on phones, tablets, and computers. The interface adapts to your screen size for the best learning experience.'
            },
            {
                question: 'Is MathBored aligned with curriculum standards?',
                answer: 'Yes, MathBored is aligned with Common Core State Standards for Mathematics (K-12). All topics are organized by grade level and cover the essential math concepts students need to master.'
            }
        ]
    },
    algebra: {
        title: 'Algebra FAQ - Common Questions About Algebra',
        description: 'Frequently asked questions about algebra, including how to solve equations, factor polynomials, and master algebraic concepts.',
        slug: 'faq/algebra',
        faqs: [
            {
                question: 'What is algebra?',
                answer: 'Algebra is a branch of mathematics that uses symbols and letters to represent numbers and quantities in equations and formulas. It helps solve problems where some values are unknown, using variables like x and y.'
            },
            {
                question: 'How do I solve linear equations?',
                answer: 'To solve a linear equation, isolate the variable by performing the same operations on both sides. For example, to solve 2x + 5 = 13, subtract 5 from both sides to get 2x = 8, then divide by 2 to get x = 4.'
            },
            {
                question: 'What is the quadratic formula?',
                answer: 'The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a, used to solve quadratic equations in the form ax² + bx + c = 0. It works for any quadratic equation and gives you the solutions (roots) of the equation.'
            },
            {
                question: 'How do I factor polynomials?',
                answer: 'Factoring polynomials involves finding expressions that multiply together to give the original polynomial. Common methods include finding the greatest common factor (GCF), using the difference of squares, or applying the AC method for trinomials.'
            },
            {
                question: 'What is the difference between an expression and an equation?',
                answer: 'An expression is a combination of numbers, variables, and operations (like 3x + 5), while an equation has an equals sign and shows that two expressions are equal (like 3x + 5 = 14). Equations can be solved, while expressions are simplified.'
            }
        ]
    },
    geometry: {
        title: 'Geometry FAQ - Common Questions About Geometry',
        description: 'Frequently asked questions about geometry, including formulas, theorems, and how to solve geometry problems.',
        slug: 'faq/geometry',
        faqs: [
            {
                question: 'What is the Pythagorean theorem?',
                answer: 'The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (longest side) equals the sum of squares of the other two sides: a² + b² = c². It\'s used to find missing side lengths in right triangles.'
            },
            {
                question: 'How do I find the area of a circle?',
                answer: 'The area of a circle is calculated using the formula A = πr², where r is the radius. If you know the diameter, divide it by 2 to get the radius first. π (pi) is approximately 3.14159.'
            },
            {
                question: 'What is the formula for the area of a triangle?',
                answer: 'The area of a triangle is A = (1/2) × base × height. The height must be perpendicular to the base. For right triangles, the two legs serve as base and height.'
            },
            {
                question: 'How do I find the volume of a cylinder?',
                answer: 'The volume of a cylinder is V = πr²h, where r is the radius of the circular base and h is the height. First find the area of the base (πr²), then multiply by the height.'
            },
            {
                question: 'What are complementary and supplementary angles?',
                answer: 'Complementary angles add up to 90 degrees, while supplementary angles add up to 180 degrees. For example, if one angle is 30°, its complement is 60° and its supplement is 150°.'
            }
        ]
    },
    calculus: {
        title: 'Calculus FAQ - Common Questions About Calculus',
        description: 'Frequently asked questions about calculus, including derivatives, integrals, and how to solve calculus problems.',
        slug: 'faq/calculus',
        faqs: [
            {
                question: 'What is calculus?',
                answer: 'Calculus is a branch of mathematics that studies rates of change (differential calculus) and accumulation of quantities (integral calculus). It\'s used to solve problems involving motion, optimization, and areas under curves.'
            },
            {
                question: 'What is a derivative?',
                answer: 'A derivative represents the rate of change of a function at a specific point. It tells you the slope of the tangent line to the function\'s graph. The derivative of f(x) is written as f\'(x) or df/dx.'
            },
            {
                question: 'What is an integral?',
                answer: 'An integral represents the area under a curve or the accumulation of a quantity. The definite integral calculates the area between a function and the x-axis over a specific interval, while the indefinite integral finds antiderivatives.'
            },
            {
                question: 'What is the chain rule?',
                answer: 'The chain rule is used to find the derivative of composite functions. If y = f(g(x)), then dy/dx = f\'(g(x)) × g\'(x). It\'s essential for differentiating functions within functions.'
            },
            {
                question: 'How do I find the limit of a function?',
                answer: 'A limit describes the value a function approaches as the input approaches a specific value. You can find limits by direct substitution, factoring, rationalizing, or using L\'Hôpital\'s rule for indeterminate forms.'
            }
        ]
    }
};

/**
 * Generate FAQ page HTML
 */
function generateFAQPage(data) {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title} | MathBored</title>
    <meta name="description" content="${data.description}">
    <meta name="keywords" content="math FAQ, math questions, ${data.slug.includes('algebra') ? 'algebra help' : data.slug.includes('geometry') ? 'geometry help' : data.slug.includes('calculus') ? 'calculus help' : 'math help'}, free math resources, K-12 math">
    <meta name="robots" content="index, follow">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://math.boredgames.site/${data.slug}.html">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://math.boredgames.site/${data.slug}.html">
    <meta property="og:title" content="${data.title}">
    <meta property="og:description" content="${data.description}">
    <meta property="og:image" content="https://math.boredgames.site/og-image.png">
    <meta property="og:site_name" content="MathBored">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://math.boredgames.site/${data.slug}.html">
    <meta property="twitter:title" content="${data.title}">
    <meta property="twitter:description" content="${data.description}">
    <meta property="twitter:image" content="https://math.boredgames.site/og-image.png">
    
    <!-- FAQ Schema (JSON-LD) for Rich Snippets -->
    <script type="application/ld+json">
${JSON.stringify(faqSchema, null, 4)}
    </script>
    
    <!-- PWA & Icons -->
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/svg+xml" href="/icon.svg">
    <meta name="theme-color" content="#3b82f6">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/styles.css">
    
    <style>
        .faq-page {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        .faq-header {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .faq-header h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--text);
        }
        
        .faq-header p {
            font-size: 1.2rem;
            color: var(--text-secondary);
        }
        
        .faq-item {
            background: var(--card-bg);
            border-radius: 12px;
            margin-bottom: 20px;
            overflow: hidden;
            border: 1px solid var(--border);
        }
        
        .faq-question {
            padding: 20px;
            font-weight: 600;
            font-size: 1.1rem;
            color: var(--text);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .faq-question:hover {
            background: var(--bg-secondary);
        }
        
        .faq-answer {
            padding: 0 20px 20px;
            color: var(--text-secondary);
            line-height: 1.7;
        }
        
        .back-link {
            display: inline-block;
            margin-top: 40px;
            color: var(--accent);
            text-decoration: none;
            font-weight: 600;
        }
        
        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="faq-page">
        <div class="faq-header">
            <h1>${data.title.replace(' | MathBored', '')}</h1>
            <p>${data.description}</p>
        </div>
        
        ${data.faqs.map(faq => `
        <div class="faq-item">
            <div class="faq-question">
                <span>${faq.question}</span>
            </div>
            <div class="faq-answer">
                ${faq.answer}
            </div>
        </div>
        `).join('\n')}
        
        <a href="/" class="back-link">← Back to MathBored Home</a>
    </div>
</body>
</html>`;
}

// Generate FAQ pages
const faqDir = path.join(__dirname);
let generated = 0;

console.log('📝 Generating FAQ pages...\n');

Object.entries(faqData).forEach(([key, data]) => {
    const html = generateFAQPage(data);
    const filePath = path.join(faqDir, `${data.slug}.html`);
    
    // Create directory if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, html, 'utf8');
    generated++;
    console.log(`   ✓ Generated ${data.slug}.html`);
});

console.log(`\n✅ Generated ${generated} FAQ pages!\n`);
console.log('📝 Next steps:');
console.log('   1. Update sitemap.xml to include FAQ pages');
console.log('   2. Test FAQ schema at: https://search.google.com/test/rich-results');
console.log('   3. Submit updated sitemap to Google Search Console');
console.log('   4. Monitor for FAQ rich snippets in search results\n');

