#!/usr/bin/env node
/**
 * Primer Lesson Generator
 * Reads curriculum JSON + content modules, produces all 105 lesson HTML files.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PRIMER_DIR = path.join(ROOT, 'primer');
const curriculum = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'primer-curriculum.json'), 'utf8')
);

/* ── Band order defines the full lesson sequence ── */
const BAND_ORDER = [
  'Elementary Foundations',
  'K-2 Foundations',
  'Upper Elementary',
  'Middle School Bridge',
  'Middle School Geometry & Data',
  'High School Essentials',
  'High School Advanced',
  'Reserve & Extensions',
];

const allLessons = [];
for (const bandName of BAND_ORDER) {
  const band = curriculum.grade_bands.find((b) => b.band === bandName);
  if (!band) { console.error(`Band not found: ${bandName}`); process.exit(1); }
  for (const lesson of band.lessons) {
    allLessons.push({ ...lesson, bandName: band.band, gradeSpan: band.grade_span });
  }
}
console.log(`Total lessons in sequence: ${allLessons.length}`);

/* ── Load content modules ── */
const CONTENT_FILES = [
  'primer-content-elementary.js',
  'primer-content-k2-upper.js',
  'primer-content-middle.js',
  'primer-content-geo.js',
  'primer-content-high1.js',
  'primer-content-high2.js',
  'primer-content-advanced.js',
  'primer-content-reserve-a.js',
  'primer-content-reserve-b.js',
];

const content = {};
for (const file of CONTENT_FILES) {
  const fp = path.join(__dirname, file);
  if (fs.existsSync(fp)) {
    Object.assign(content, require(fp));
    console.log(`  loaded ${file}`);
  } else {
    console.warn(`  MISSING ${file}`);
  }
}

/* ── Ensure output dir ── */
if (!fs.existsSync(PRIMER_DIR)) fs.mkdirSync(PRIMER_DIR, { recursive: true });

/* ── Shared CSS (embedded in every page) ── */
const CSS_BLOCK = `
        .lesson-header {
            background:
                radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(139,92,246,0.12) 0%, transparent 50%),
                linear-gradient(135deg, var(--accent), var(--accent-hover));
            color: white; padding: 40px 24px; border-radius: 20px;
            margin-bottom: 30px; position: relative; overflow: hidden;
        }
        .lesson-header::before {
            content: ''; position: absolute; inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            opacity: 0.3; pointer-events: none;
        }
        .lesson-header > * { position: relative; z-index: 1; }
        .lesson-id-badge {
            display: inline-block; background: rgba(255,255,255,0.2);
            padding: 9px 20px; border-radius: 20px; font-size: 0.95rem;
            margin-bottom: 18px; border: 1px solid rgba(255,255,255,0.3);
            font-weight: 700; letter-spacing: 0.02em;
        }
        .lesson-content {
            background: var(--bg-secondary); border: 2px solid var(--border);
            border-radius: 12px; padding: 40px; margin-bottom: 30px;
            line-height: 1.75; font-size: 1.05rem;
        }
        .lesson-content h2 { font-size:1.75rem; font-weight:700; line-height:1.4; margin-top:35px; margin-bottom:20px; color:var(--text); letter-spacing:-0.01em; }
        .lesson-content h3 { font-size:1.4rem; font-weight:700; line-height:1.5; margin-top:28px; margin-bottom:16px; color:var(--text); }
        .lesson-content h4 { font-size:1.2rem; font-weight:600; line-height:1.5; margin-top:24px; margin-bottom:12px; color:var(--text); }
        .lesson-content p  { font-size:1.05rem; line-height:1.8; margin-bottom:18px; color:var(--text); }
        .lesson-content ul, .lesson-content ol { line-height:1.9; margin-bottom:20px; padding-left:28px; }
        .lesson-content li { margin-bottom:8px; font-size:1.05rem; line-height:1.8; }
        .lesson-nav { display:grid; grid-template-columns:1fr auto 1fr; gap:15px; margin-top:40px; }
        .nav-btn {
            padding:16px 24px; border-radius:10px; text-decoration:none;
            text-align:center; font-weight:bold; transition:all 0.3s ease;
            display:flex; align-items:center; justify-content:center; gap:8px;
        }
        .nav-btn.prev { background:var(--bg-tertiary); color:var(--text); border:2px solid var(--border); }
        .nav-btn.next { background:var(--accent); color:white; border:2px solid var(--accent); }
        .nav-btn.overview { background:var(--bg-secondary); color:var(--text); border:2px solid var(--border); }
        .nav-btn:hover:not(.disabled) { transform:translateY(-2px); box-shadow:0 4px 12px rgba(0,0,0,0.1); }
        .nav-btn.prev:hover:not(.disabled) { border-color:var(--accent); }
        .nav-btn.next:hover:not(.disabled) { background:var(--accent-hover); }
        .nav-btn.disabled { opacity:0.4; cursor:not-allowed; pointer-events:none; }
        .key-concepts { background:var(--bg-tertiary); padding:25px; border-radius:10px; margin:25px 0; border-left:4px solid var(--accent); }
        .key-concepts h3 { margin-top:0; color:var(--accent); font-size:1.3rem; font-weight:700; line-height:1.4; margin-bottom:16px; }
        .key-concepts ul { margin:15px 0 0 0; padding-left:28px; line-height:1.9; }
        .key-concepts li { font-size:1.05rem; line-height:1.8; margin-bottom:8px; }
        .prereq-bar { background:var(--bg-tertiary); padding:15px; border-radius:8px; margin-bottom:20px; }
        .prereq-link { color:var(--accent); font-weight:500; text-decoration:none; }
        .prereq-link:hover { text-decoration:underline; }
        .complete-btn {
            background:var(--success); color:white; padding:16px 32px;
            border-radius:10px; border:none; font-weight:700; font-size:1.1rem;
            cursor:pointer; transition:all 0.3s ease; display:inline-flex;
            align-items:center; gap:10px; margin:30px 0; line-height:1.5; letter-spacing:-0.01em;
        }
        .complete-btn:hover { transform:translateY(-2px); box-shadow:0 4px 12px rgba(16,185,129,0.3); }
        .complete-btn.completed { background:var(--bg-tertiary); color:var(--text-secondary); cursor:default; }
        .example-box {
            background:var(--bg-tertiary); border-left:4px solid var(--accent);
            border-radius:0 12px 12px 0; padding:20px 24px; margin:24px 0;
        }
        .example-box h4 { color:var(--accent); margin-top:0; }
        .warning-box {
            background:rgba(239,68,68,0.08); border-left:4px solid #ef4444;
            border-radius:0 12px 12px 0; padding:20px 24px; margin:24px 0;
        }
        .warning-box h4 { color:#ef4444; margin-top:0; }
        .tip-box {
            background:rgba(16,185,129,0.08); border-left:4px solid var(--success);
            border-radius:0 12px 12px 0; padding:20px 24px; margin:24px 0;
        }
        .tip-box h4 { color:var(--success); margin-top:0; }
        .math-display {
            text-align:center; font-size:1.25rem;
            font-family:'Georgia','Times New Roman',serif;
            margin:20px 0; padding:16px; background:var(--bg-tertiary);
            border-radius:8px; overflow-x:auto;
        }
        .practice-problems {
            background:var(--bg-tertiary); border:2px dashed var(--border);
            border-radius:12px; padding:24px; margin:24px 0;
        }
        .practice-problems h3 { margin-top:0; }
        .practice-problems ol { margin-bottom:16px; }
        details.solution { margin-top:8px; padding:12px 16px; background:var(--bg-secondary); border-radius:8px; }
        details.solution summary { cursor:pointer; color:var(--accent); font-weight:600; padding:4px 0; }
        details.solution[open] summary { margin-bottom:8px; }
        .vocab-table { width:100%; border-collapse:collapse; margin:16px 0; }
        .vocab-table th, .vocab-table td { text-align:left; padding:10px 14px; border-bottom:1px solid var(--border); }
        .vocab-table th { font-weight:700; background:var(--bg-tertiary); }
        .step-list { counter-reset:step; list-style:none; padding-left:0; }
        .step-list li { counter-increment:step; padding:8px 0 8px 40px; position:relative; }
        .step-list li::before {
            content:counter(step); position:absolute; left:0; top:8px;
            width:28px; height:28px; background:var(--accent); color:white;
            border-radius:50%; text-align:center; line-height:28px;
            font-weight:700; font-size:0.85rem;
        }
        .columns-2 { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        @media (max-width:768px) {
            .lesson-nav { grid-template-columns:1fr; }
            .lesson-content { padding:28px; font-size:1rem; }
            .lesson-content h2 { font-size:1.5rem; }
            .lesson-content h3 { font-size:1.25rem; }
            .lesson-content h4 { font-size:1.1rem; }
            .lesson-content p  { font-size:1rem; }
            .columns-2 { grid-template-columns:1fr; }
        }`;

/* ────────────────────── HTML builder ────────────────────── */

function buildHTML({ lesson, seqNum, total, prev, next, body }) {
  const prereqHTML = lesson.prerequisites && lesson.prerequisites.length
    ? `\n            <div class="prereq-bar"><strong>Prerequisites:</strong> ${lesson.prerequisites.map((p) => `<a href="${p}.html" class="prereq-link">${p}</a>`).join(', ')}</div>`
    : '';

  const kcHTML = lesson.key_concepts && lesson.key_concepts.length
    ? `\n            <div class="key-concepts"><h3>Key Concepts</h3><ul>${lesson.key_concepts.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></div>`
    : '';

  const prevBtn = prev
    ? `<a href="${prev.id}.html" class="nav-btn prev">&larr; ${esc(prev.title)}</a>`
    : `<span class="nav-btn prev disabled">&larr; Previous</span>`;

  const nextBtn = next
    ? `<a href="${next.id}.html" class="nav-btn next">${esc(next.title)} &rarr;</a>`
    : `<span class="nav-btn next disabled">Next &rarr;</span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(lesson.title)} - Essential Math Primer | MathBored</title>
    <meta name="description" content="${attr(lesson.description)}">
    <meta name="keywords" content="math, education, learning, ${attr(lesson.bandName)}, ${attr(lesson.key_concepts.join(', '))}, K-12, free">
    <link rel="canonical" href="https://math.boredgames.site/primer/${lesson.id}.html">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://math.boredgames.site/primer/${lesson.id}.html">
    <meta property="og:title" content="${attr(lesson.title)} - Essential Math Primer | MathBored">
    <meta property="og:description" content="${attr(lesson.description)}">
    <meta property="og:image" content="https://math.boredgames.site/og-image.png">
    <meta property="og:site_name" content="MathBored">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://math.boredgames.site/primer/${lesson.id}.html">
    <meta property="twitter:title" content="${attr(lesson.title)} - Essential Math Primer | MathBored">
    <meta property="twitter:description" content="${attr(lesson.description)}">
    <meta property="twitter:image" content="https://math.boredgames.site/og-image.png">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": ${JSON.stringify(lesson.title)},
        "description": ${JSON.stringify(lesson.description)},
        "provider": {"@type":"Organization","name":"MathBored","url":"https://math.boredgames.site"},
        "educationalLevel": ${JSON.stringify(lesson.gradeSpan)},
        "learningResourceType": "Lesson",
        "timeRequired": "PT15M",
        "inLanguage": "en",
        "isPartOf": {"@type":"Course","name":"Essential Math Primer","url":"https://math.boredgames.site/primer.html"},
        "hasCourseInstance": {"@type":"CourseInstance","courseMode":"online","courseWorkload":"PT15M"},
        "teaches": ${JSON.stringify(lesson.key_concepts)}
    }
    </script>
    <link rel="stylesheet" href="/styles.css">
    <link rel="icon" type="image/svg+xml" href="/icon.svg">
    <style>
${CSS_BLOCK}
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <div>
                    <h1>MathBored</h1>
                    <div class="tagline">Essential Math Primer</div>
                </div>
            </div>
        </div>
    </header>

    <div class="container">
        <a href="/primer.html" class="back-link">&larr; Back to Primer Overview</a>

        <div class="lesson-header">
            <span class="lesson-id-badge">${lesson.id} &bull; Lesson ${seqNum} of ${total}</span>
            <h1 style="margin:18px 0;font-size:2.4rem;font-weight:700;line-height:1.3;letter-spacing:-0.02em;">${esc(lesson.title)}</h1>
            <p style="opacity:0.95;font-size:1.2rem;margin:12px 0;line-height:1.6;font-weight:500;">${esc(lesson.description)}</p>
            <p style="margin-top:18px;opacity:0.9;font-size:1rem;font-weight:500;line-height:1.5;">${esc(lesson.bandName)} &bull; ${esc(lesson.gradeSpan)}</p>
        </div>

        <div class="lesson-content">${prereqHTML}${kcHTML}

${body}

            <div style="text-align:center;margin-top:40px;">
                <button id="completeBtn" class="complete-btn" onclick="markComplete()">
                    <span>&#10003;</span> Mark Lesson as Complete
                </button>
            </div>
        </div>

        <div class="lesson-nav">
            ${prevBtn}
            <a href="/primer.html" class="nav-btn overview">Overview</a>
            ${nextBtn}
        </div>
    </div>

    <footer>
        <div class="container">
            <p>MathBored @ math.boredgames.site &bull; Free forever &bull; Community-driven development</p>
        </div>
    </footer>

    <script>
        const savedTheme = localStorage.getItem('mathbored-theme');
        if (savedTheme) document.body.className = savedTheme;

        function checkComplete() {
            const done = JSON.parse(localStorage.getItem('primer-completed') || '[]');
            const btn = document.getElementById('completeBtn');
            if (btn && done.includes('${lesson.id}')) {
                btn.classList.add('completed');
                btn.innerHTML = '<span>&#10003;</span> Completed';
                btn.disabled = true;
            }
        }

        function markComplete() {
            const done = JSON.parse(localStorage.getItem('primer-completed') || '[]');
            if (!done.includes('${lesson.id}')) {
                done.push('${lesson.id}');
                localStorage.setItem('primer-completed', JSON.stringify(done));
                const btn = document.getElementById('completeBtn');
                btn.classList.add('completed');
                btn.innerHTML = '<span>&#10003;</span> Completed';
                btn.disabled = true;
                const msg = document.createElement('div');
                msg.style.cssText = 'position:fixed;top:20px;right:20px;background:var(--success);color:white;padding:15px 25px;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.2);z-index:1000;animation:slideIn 0.3s ease;';
                msg.textContent = 'Lesson completed!';
                document.body.appendChild(msg);
                setTimeout(() => { msg.style.animation = 'slideOut 0.3s ease'; setTimeout(() => msg.remove(), 300); }, 2000);
            }
        }
        checkComplete();
    </script>
</body>
</html>`;
}

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function attr(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

/* ── Generate ── */
let generated = 0, skipped = 0;
for (let i = 0; i < allLessons.length; i++) {
  const lesson = allLessons[i];
  const seqNum = i + 1;
  const total = allLessons.length;
  const prev = i > 0 ? allLessons[i - 1] : null;
  const next = i < allLessons.length - 1 ? allLessons[i + 1] : null;
  const body = content[lesson.id];
  if (!body) { console.warn(`  SKIP ${lesson.id} (no content)`); skipped++; continue; }
  const html = buildHTML({ lesson, seqNum, total, prev, next, body });
  fs.writeFileSync(path.join(PRIMER_DIR, `${lesson.id}.html`), html);
  generated++;
}
console.log(`\nDone. generated=${generated}  skipped=${skipped}`);
