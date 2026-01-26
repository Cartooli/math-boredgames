#!/usr/bin/env node

/**
 * Generator for Essential Math Primer lesson pages
 * Creates standalone HTML pages for each lesson with navigation
 * 
 * Usage: node generate-primer-pages.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Essential Math Primer Page Generator\n');
console.log('═══════════════════════════════════════════════════════\n');

// Read the curriculum JSON
console.log('📖 Reading curriculum from primer-curriculum.json...');
const curriculumPath = path.join(__dirname, 'primer-curriculum.json');

if (!fs.existsSync(curriculumPath)) {
    console.error('❌ ERROR: primer-curriculum.json not found');
    console.error('   Please ensure the curriculum file exists');
    process.exit(1);
}

const curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));
console.log(`✅ Loaded curriculum: ${curriculum.title}\n`);

// Flatten all lessons from curriculum
const allLessons = [];
curriculum.grade_bands.forEach(band => {
    band.lessons.forEach(lesson => {
        allLessons.push({
            ...lesson,
            grade_band: band.band,
            grade_span: band.grade_span,
            // Mark lessons in "Reserve & Extensions" band as reserve slots
            is_reserve: band.band === "Reserve & Extensions"
        });
    });
});

console.log(`📚 Total lessons to generate: ${allLessons.length}`);

// Create primer directory
const primerDir = path.join(__dirname, 'primer');
if (!fs.existsSync(primerDir)) {
    fs.mkdirSync(primerDir, { recursive: true });
    console.log(`📁 Created directory: primer/\n`);
} else {
    console.log(`📁 Using existing directory: primer/\n`);
}

/**
 * Generate HTML for a single lesson page
 */
function generateLessonPage(lesson, allLessons) {
    const nextLesson = allLessons.find(l => l.sequence === lesson.sequence + 1);
    const prevLesson = allLessons.find(l => l.sequence === lesson.sequence - 1);
    
    const concepts = lesson.key_concepts.length > 0
        ? lesson.key_concepts.map(c => `<li>${c}</li>`).join('')
        : '<li><em>To be developed</em></li>';
    
    const prerequisites = lesson.prerequisites.length > 0 
        ? `
            <div style="background: var(--bg-tertiary); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <strong>📋 Prerequisites:</strong> 
                ${lesson.prerequisites.map(p => `<span style="color: var(--accent); font-weight: 500;">${p}</span>`).join(', ')}
            </div>
        `
        : '';

    const reserveNotice = lesson.is_reserve ? `
        <div style="background: var(--warning); color: white; padding: 20px; border-radius: 12px; margin-bottom: 30px; text-align: center;">
            <strong>🔮 Reserve Slot</strong><br>
            This lesson is part of the curriculum expansion plan and will be developed based on community needs and feedback.
        </div>
    ` : '';

    const lessonContent = lesson.is_reserve ? `
        <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🚧</div>
            <h2>Coming Soon</h2>
            <p style="color: var(--text-secondary); max-width: 500px; margin: 20px auto;">
                This reserve lesson slot will be filled with additional content as the curriculum expands. 
                Topics may include advanced applications, common misconceptions, specialized content, or community-requested lessons.
            </p>
        </div>
    ` : `
        <div style="margin-top: 30px;">
            <h2>📖 Lesson Overview</h2>
            <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 30px;">
                This 15-minute lesson provides a focused introduction to ${lesson.title.toLowerCase()}. 
                You'll learn the essential concepts, see practical examples, and build a solid foundation for future learning.
            </p>

            <h3>What You'll Learn</h3>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">
                ${lesson.description}
            </p>

            <div style="background: var(--bg-tertiary); padding: 25px; border-radius: 12px; margin: 30px 0;">
                <h3 style="margin-top: 0;">🎯 Learning Objectives</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">By the end of this lesson, you will be able to:</p>
                <ul style="line-height: 2;">
                    <li>Understand the fundamental concepts of ${lesson.title.toLowerCase()}</li>
                    <li>Apply these concepts to solve basic problems</li>
                    <li>Connect this topic to other areas of mathematics</li>
                    <li>Build confidence for more advanced topics</li>
                </ul>
            </div>

            <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1)); padding: 25px; border-radius: 12px; border-left: 4px solid var(--accent); margin: 30px 0;">
                <h3 style="margin-top: 0;">📝 Lesson Content</h3>
                <p style="color: var(--text-secondary); font-style: italic;">
                    Detailed lesson content is currently being developed. This will include:
                </p>
                <ul style="color: var(--text-secondary); line-height: 2;">
                    <li>Clear explanations with visual aids</li>
                    <li>Step-by-step worked examples</li>
                    <li>Practice problems with solutions</li>
                    <li>Real-world applications</li>
                    <li>Common misconceptions and tips</li>
                </ul>
            </div>

            <div style="text-align: center; margin: 40px 0; padding: 30px; background: var(--bg-secondary); border-radius: 12px; border: 2px dashed var(--border);">
                <div style="font-size: 2rem; margin-bottom: 15px;">⏱️</div>
                <p style="font-size: 1.2rem; font-weight: bold; margin: 0;">Estimated Time: 15 minutes</p>
            </div>
        </div>
    `;

    const pageUrl = `https://math.boredgames.site/primer/${lesson.id}.html`;
    const pageTitle = `${lesson.title} - Essential Math Primer | MathBored`;
    const pageDescription = lesson.description;
    const imageUrl = "https://math.boredgames.site/og-image.png";
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <meta name="description" content="${pageDescription}">
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
    
    <link rel="stylesheet" href="/styles.css">
    <link rel="icon" type="image/svg+xml" href="/icon.svg">
    <style>
        .lesson-header {
            background: 
                radial-gradient(ellipse at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
                linear-gradient(135deg, var(--accent), var(--accent-hover));
            color: white;
            padding: 40px 24px;
            border-radius: 20px;
            margin-bottom: 30px;
            position: relative;
            overflow: hidden;
        }

        .lesson-header::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            opacity: 0.3;
            pointer-events: none;
        }

        .lesson-header > * {
            position: relative;
            z-index: 1;
        }

        .lesson-id-badge {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            padding: 9px 20px;
            border-radius: 20px;
            font-size: 0.95rem;
            margin-bottom: 18px;
            border: 1px solid rgba(255,255,255,0.3);
            font-weight: 700;
            letter-spacing: 0.02em;
        }

        .lesson-content {
            background: var(--bg-secondary);
            border: 2px solid var(--border);
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 30px;
            line-height: 1.75;
            font-size: 1.05rem;
        }
        
        .lesson-content h2 {
            font-size: 1.75rem;
            font-weight: 700;
            line-height: 1.4;
            margin-top: 35px;
            margin-bottom: 20px;
            color: var(--text);
            letter-spacing: -0.01em;
        }
        
        .lesson-content h3 {
            font-size: 1.4rem;
            font-weight: 700;
            line-height: 1.5;
            margin-top: 28px;
            margin-bottom: 16px;
            color: var(--text);
        }
        
        .lesson-content h4 {
            font-size: 1.2rem;
            font-weight: 600;
            line-height: 1.5;
            margin-top: 24px;
            margin-bottom: 12px;
            color: var(--text);
        }
        
        .lesson-content p {
            font-size: 1.05rem;
            line-height: 1.8;
            margin-bottom: 18px;
            color: var(--text);
        }
        
        .lesson-content ul, .lesson-content ol {
            line-height: 1.9;
            margin-bottom: 20px;
            padding-left: 28px;
        }
        
        .lesson-content li {
            margin-bottom: 8px;
            font-size: 1.05rem;
            line-height: 1.8;
        }

        .lesson-nav {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 15px;
            margin-top: 40px;
        }

        .nav-btn {
            padding: 16px 24px;
            border-radius: 10px;
            text-decoration: none;
            text-align: center;
            font-weight: bold;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .nav-btn.prev {
            background: var(--bg-tertiary);
            color: var(--text);
            border: 2px solid var(--border);
        }

        .nav-btn.next {
            background: var(--accent);
            color: white;
            border: 2px solid var(--accent);
        }

        .nav-btn.overview {
            background: var(--bg-secondary);
            color: var(--text);
            border: 2px solid var(--border);
        }

        .nav-btn:hover:not(.disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .nav-btn.prev:hover:not(.disabled) {
            border-color: var(--accent);
        }

        .nav-btn.next:hover:not(.disabled) {
            background: var(--accent-hover);
        }

        .nav-btn.disabled {
            opacity: 0.4;
            cursor: not-allowed;
            pointer-events: none;
        }

        .key-concepts {
            background: var(--bg-tertiary);
            padding: 25px;
            border-radius: 10px;
            margin: 25px 0;
            border-left: 4px solid var(--accent);
        }

        .key-concepts h3 {
            margin-top: 0;
            color: var(--accent);
            font-size: 1.3rem;
            font-weight: 700;
            line-height: 1.4;
            margin-bottom: 16px;
        }

        .key-concepts ul {
            margin: 15px 0 0 0;
            padding-left: 28px;
            line-height: 1.9;
        }
        
        .key-concepts li {
            font-size: 1.05rem;
            line-height: 1.8;
            margin-bottom: 8px;
        }

        .complete-btn {
            background: var(--success);
            color: white;
            padding: 16px 32px;
            border-radius: 10px;
            border: none;
            font-weight: 700;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin: 30px 0;
            line-height: 1.5;
            letter-spacing: -0.01em;
        }

        .complete-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .complete-btn.completed {
            background: var(--bg-tertiary);
            color: var(--text-secondary);
            cursor: default;
        }

        @media (max-width: 768px) {
            .lesson-nav {
                grid-template-columns: 1fr;
            }

            .lesson-content {
                padding: 28px;
                font-size: 1rem;
            }
            
            .lesson-content h2 {
                font-size: 1.5rem;
            }
            
            .lesson-content h3 {
                font-size: 1.25rem;
            }
            
            .lesson-content h4 {
                font-size: 1.1rem;
            }
            
            .lesson-content p {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <div>
                    <h1>🎯 MathBored</h1>
                    <div class="tagline">Essential Math Primer</div>
                </div>
            </div>
        </div>
    </header>

    <div class="container">
        <a href="/primer.html" class="back-link">← Back to Primer Overview</a>

        <div class="lesson-header">
            <span class="lesson-id-badge">${lesson.id} • Lesson ${lesson.sequence} of 75</span>
            <h1 style="margin: 18px 0; font-size: 2.4rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.02em;">${lesson.title}</h1>
            <p style="opacity: 0.95; font-size: 1.2rem; margin: 12px 0; line-height: 1.6; font-weight: 500;">${lesson.description}</p>
            <p style="margin-top: 18px; opacity: 0.9; font-size: 1rem; font-weight: 500; line-height: 1.5;">${lesson.grade_band} • ${lesson.grade_span}</p>
        </div>

        ${reserveNotice}

        <div class="lesson-content">
            ${prerequisites}
            
            <div class="key-concepts">
                <h3>🎯 Key Concepts</h3>
                <ul>${concepts}</ul>
            </div>

            ${lessonContent}

            ${!lesson.is_reserve ? `
            <div style="text-align: center; margin-top: 40px;">
                <button id="completeBtn" class="complete-btn" onclick="markComplete()">
                    <span>✓</span> Mark Lesson as Complete
                </button>
            </div>
            ` : ''}
        </div>

        <div class="lesson-nav">
            ${prevLesson 
                ? `<a href="${prevLesson.id}.html" class="nav-btn prev">← ${prevLesson.title}</a>`
                : '<span class="nav-btn prev disabled">← Previous</span>'
            }
            <a href="/primer.html" class="nav-btn overview">📚 Overview</a>
            ${nextLesson 
                ? `<a href="${nextLesson.id}.html" class="nav-btn next">${nextLesson.title} →</a>`
                : '<span class="nav-btn next disabled">Next →</span>'
            }
        </div>
    </div>

    <footer>
        <div class="container">
            <p>MathBored @ math.boredgames.site • Free forever • Community-driven development</p>
        </div>
    </footer>

    <script>
        // Load theme
        const savedTheme = localStorage.getItem('mathbored-theme');
        if (savedTheme) {
            document.body.className = savedTheme;
        }

        // Check if lesson is already completed
        function checkComplete() {
            const completedLessons = JSON.parse(localStorage.getItem('primer-completed') || '[]');
            const btn = document.getElementById('completeBtn');
            if (btn && completedLessons.includes('${lesson.id}')) {
                btn.classList.add('completed');
                btn.innerHTML = '<span>✓</span> Completed';
                btn.disabled = true;
            }
        }

        // Mark lesson as complete
        function markComplete() {
            const completedLessons = JSON.parse(localStorage.getItem('primer-completed') || '[]');
            if (!completedLessons.includes('${lesson.id}')) {
                completedLessons.push('${lesson.id}');
                localStorage.setItem('primer-completed', JSON.stringify(completedLessons));
                
                const btn = document.getElementById('completeBtn');
                btn.classList.add('completed');
                btn.innerHTML = '<span>✓</span> Completed';
                btn.disabled = true;
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: var(--success); color: white; padding: 15px 25px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 1000; animation: slideIn 0.3s ease;';
                successMsg.innerHTML = '✓ Lesson completed!';
                document.body.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => successMsg.remove(), 300);
                }, 2000);
            }
        }

        // Initialize
        checkComplete();
    </script>
</body>
</html>`;
}

// Generate all lesson pages
console.log('📝 Generating lesson pages...\n');

let generatedCount = 0;
let reserveCount = 0;

allLessons.forEach((lesson, index) => {
    const html = generateLessonPage(lesson, allLessons);
    const filePath = path.join(primerDir, `${lesson.id}.html`);
    fs.writeFileSync(filePath, html, 'utf8');
    
    if (lesson.is_reserve) {
        reserveCount++;
    } else {
        generatedCount++;
        console.log(`   ✓ ${lesson.id}: ${lesson.title}`);
    }
    
    // Progress indicator
    if ((index + 1) % 15 === 0 || index === allLessons.length - 1) {
        console.log(`   📊 Progress: ${index + 1}/${allLessons.length} pages\n`);
    }
});

console.log('═══════════════════════════════════════════════════════\n');
console.log(`✅ Successfully generated ${allLessons.length} lesson pages!`);
console.log(`   📚 Core lessons: ${generatedCount}`);
console.log(`   🔮 Reserve slots: ${reserveCount}`);
console.log(`   📁 Location: ${primerDir}`);
console.log('\n🎉 Essential Math Primer is ready to use!\n');

