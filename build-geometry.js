#!/usr/bin/env node
/**
 * Build geometry.html from source curriculum HTML: inject deeperLinks,
 * wrap with site header/footer, use site styles + teal theme, add persistence.
 */
const fs = require('fs');
const path = require('path');

const srcPath = process.env.GEOMETRY_SOURCE || '/Users/robn/Downloads/geometry-curriculum.html';
const outPath = path.join(__dirname, 'geometry.html');

const deeperLinks = [
  [{ label: 'Distance Formula', url: 'math/distance-formula/walkthrough.html' }, { label: 'Coordinate Plane', url: 'math/coordinate-plane/walkthrough.html' }, { label: 'Basic Shapes', url: 'math/basic-shapes/walkthrough.html' }],
  [{ label: 'Angle Measurement', url: 'math/angle-measurement/walkthrough.html' }, { label: 'Protractor Use', url: 'math/protractor-use/walkthrough.html' }],
  [{ label: 'Slope', url: 'math/slope/walkthrough.html' }, { label: 'Standard Form to Slope-Intercept', url: 'math/standard-form-to-slope-intercept/walkthrough.html' }],
  [{ label: 'Area of Triangles and Polygons', url: 'math/area-of-triangles-and-polygons/walkthrough.html' }, { label: 'Basic Shapes and Attributes', url: 'math/basic-shapes-and-attributes/walkthrough.html' }],
  [{ label: 'Area of Triangles and Polygons', url: 'math/area-of-triangles-and-polygons/walkthrough.html' }, { label: 'Pythagorean Theorem', url: 'math/pythagorean-theorem/walkthrough.html' }],
  [{ label: 'Proportional Relationships', url: 'math/proportional-relationships/walkthrough.html' }, { label: 'Scale Drawings', url: 'math/scale-drawings/walkthrough.html' }],
  [{ label: 'Pythagorean Theorem', url: 'math/pythagorean-theorem/walkthrough.html' }, { label: 'Law of Sines', url: 'math/law-of-sines/walkthrough.html' }, { label: 'Law of Cosines', url: 'math/law-of-cosines/walkthrough.html' }],
  [{ label: 'Shapes 2D Properties', url: 'math/shapes-2d-properties/walkthrough.html' }, { label: 'Area', url: 'math/area/walkthrough.html' }],
  [{ label: 'Coordinate Plane', url: 'math/coordinate-plane/walkthrough.html' }, { label: 'Function Transformations', url: 'math/function-transformations/walkthrough.html' }],
  [{ label: 'Area and Perimeter', url: 'math/area-and-perimeter/walkthrough.html' }, { label: 'Area', url: 'math/area/walkthrough.html' }, { label: 'Perimeter of Polygons', url: 'math/perimeter-of-polygons/walkthrough.html' }],
  [{ label: 'Surface Area', url: 'math/surface-area/walkthrough.html' }],
  [{ label: 'Circles', url: 'math/circles/walkthrough.html' }],
  [{ label: 'Distance Formula', url: 'math/distance-formula/walkthrough.html' }, { label: 'Coordinate Plane', url: 'math/coordinate-plane/walkthrough.html' }, { label: 'Slope', url: 'math/slope/walkthrough.html' }]
];

const src = fs.readFileSync(srcPath, 'utf8');
const arrayStart = src.indexOf('const D=[') + 8;
const arrayEnd = src.indexOf('\n];', arrayStart) + 3;
let arrStr = src.slice(arrayStart, arrayEnd);

// Inject deeperLinks before each unit's closing "},"
// Units 1-12:  ]\n},\n// ══   ; Unit 13:  ]\n}\n];
let unitIndex = 0;
arrStr = arrStr.replace(/\n]\n\},\n\s*(\/\/ ══[^\n]*)/g, (match, comment) => {
  const links = deeperLinks[unitIndex++] || [];
  return '\n],\n  deeperLinks: ' + JSON.stringify(links) + ',\n},\n' + comment;
});
// Last unit (13)
arrStr = arrStr.replace(/\n]\n\}\n\];\s*$/, () => {
  const links = deeperLinks[unitIndex++] || [];
  return '\n],\n  deeperLinks: ' + JSON.stringify(links) + '\n}];';
});

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Geometry — Complete Curriculum | MathBored</title>
<meta name="description" content="Complete Geometry course: 13 units from foundations through circles and coordinate proofs. Free interactive lessons, practice, and quizzes.">
<meta name="keywords" content="Geometry, high school geometry, triangles, circles, proofs, area, volume, math, free, K-12">
<link rel="canonical" href="https://math.boredgames.site/geometry.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://math.boredgames.site/geometry.html">
<meta property="og:title" content="Geometry — Complete Curriculum | MathBored">
<meta property="og:description" content="Complete Geometry course: 13 units from foundations through circles and coordinate proofs.">
<meta property="og:image" content="https://math.boredgames.site/og-image.png">
<meta property="og:site_name" content="MathBored">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Course","name":"Geometry — Complete Curriculum","description":"Complete Geometry course: 13 units from foundations through circles and coordinate proofs.","provider":{"@type":"Organization","name":"MathBored","url":"https://math.boredgames.site"},"educationalLevel":"10th Grade","learningResourceType":"Course","inLanguage":"en","isAccessibleForFree":true}
</script>
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="stylesheet" href="styles.css">
<style>
/* Geometry — local styles (teal theme) */
.geo-app { max-width: 960px; margin: 0 auto; padding: 20px; }
.back-link { display: inline-block; margin-bottom: 20px; color: #14b8a6; text-decoration: none; font-weight: 600; }
.back-link:hover { opacity: 0.9; }
.geo-hero { background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary)); border: 1px solid var(--border); border-radius: 20px; padding: 48px 28px 40px; text-align: center; margin-bottom: 32px; }
.geo-hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; color: #0d9488; margin-bottom: 8px; }
.geo-hero .sub { font-size: 0.9rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
.geo-stats { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
.geo-stat { background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 12px; padding: 14px 24px; }
.geo-stat-num { font-size: 1.8rem; font-weight: 800; display: block; color: var(--text-primary); }
.geo-stat-lbl { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.08em; }
.geo-progress { background: var(--bg-secondary); border: 2px solid var(--border); border-radius: 14px; padding: 20px 24px; margin-bottom: 28px; }
.geo-progress-bar { background: var(--bg-tertiary); border-radius: 20px; height: 10px; overflow: hidden; margin: 10px 0 6px; }
.geo-progress-fill { height: 100%; background: linear-gradient(90deg, #0d9488, #14b8a6); border-radius: 20px; transition: width 0.5s ease; }
.geo-nav { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px; padding: 14px; background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border); }
.geo-nav button { font-family: inherit; font-size: 0.75rem; font-weight: 700; padding: 6px 12px; border: 1px solid var(--border); border-radius: 6px; background: transparent; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
.geo-nav button:hover { border-color: #0d9488; color: var(--text-primary); }
.geo-nav button.on { background: #0d9488; color: #fff; border-color: #0d9488; }
.geo-nav button.ok { border-color: var(--success); color: var(--success); }
.geo-uhdr { margin-bottom: 22px; }
.geo-unum { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: #0d9488; font-weight: 700; }
.geo-utitle { font-size: clamp(1.4rem, 3.5vw, 2.2rem); font-weight: 800; margin: 4px 0 8px; }
.geo-uobj { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.75; }
.geo-deeper { background: var(--bg-secondary); border: 1px solid var(--border); border-left: 3px solid #0d9488; border-radius: 10px; padding: 14px 18px; margin-bottom: 20px; font-size: 0.86rem; }
.geo-deeper .lbl { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: #0d9488; font-weight: 700; margin-bottom: 8px; }
.geo-deeper a { display: inline-block; margin: 2px 6px 2px 0; padding: 4px 12px; border-radius: 6px; border: 1px solid var(--border); color: var(--text-secondary); text-decoration: none; font-size: 0.8rem; font-weight: 600; transition: all 0.2s; }
.geo-deeper a:hover { border-color: #0d9488; color: #0d9488; background: rgba(13,148,136,0.1); }
.geo-tabs { display: flex; gap: 4px; margin-bottom: 20px; border-bottom: 1px solid var(--border); }
.geo-tb { font-family: inherit; font-size: 0.86rem; font-weight: 700; padding: 10px 20px; border: none; background: transparent; color: var(--text-secondary); cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
.geo-tb:hover { color: var(--text-primary); }
.geo-tb.on { color: #0d9488; border-bottom-color: #0d9488; }
.geo-lcard { background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px; padding: 24px 26px; margin-bottom: 14px; }
.geo-lcard h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; color: #0d9488; }
.geo-lcard p { font-size: 0.9rem; margin-bottom: 8px; line-height: 1.7; }
.geo-fm { background: var(--bg-tertiary); border-left: 3px solid #0d9488; border-radius: 6px; padding: 10px 14px; margin: 10px 0; font-family: var(--font-mono); font-size: 0.84rem; color: #14b8a6; overflow-x: auto; }
.geo-wex { background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; margin: 12px 0; }
.geo-wex .wl { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--warning); font-weight: 700; margin-bottom: 6px; }
.geo-wex .wp { font-weight: 600; margin-bottom: 4px; font-size: 0.88rem; }
.geo-wex .ws { color: var(--text-secondary); font-size: 0.82rem; margin-bottom: 2px; }
.geo-prbox { background: rgba(122,91,160,0.08); border: 1px solid rgba(122,91,160,0.2); border-left: 3px solid #7a5ba0; border-radius: 8px; padding: 12px 16px; margin: 12px 0; font-size: 0.84rem; }
.geo-prbox .prt { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.15em; color: #7a5ba0; font-weight: 700; margin-bottom: 6px; }
.geo-prbox p { color: var(--text-secondary); margin-bottom: 4px; }
.geo-dtag { display: inline-block; font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; padding: 2px 8px; border-radius: 4px; margin-bottom: 8px; }
.geo-de { background: rgba(16,185,129,0.12); color: var(--success); border: 1px solid rgba(16,185,129,0.25); }
.geo-dm { background: rgba(245,158,11,0.12); color: var(--warning); border: 1px solid rgba(245,158,11,0.25); }
.geo-dh { background: rgba(239,68,68,0.12); color: var(--error); border: 1px solid rgba(239,68,68,0.25); }
.geo-qc { background: var(--bg-secondary); border: 2px solid var(--border); border-radius: 10px; padding: 18px 20px; margin-bottom: 12px; transition: border-color 0.3s; }
.geo-qc.gc { border-color: var(--success); }
.geo-qc.bc { border-color: var(--error); }
.geo-qt { font-size: 0.9rem; margin-bottom: 12px; font-weight: 600; line-height: 1.6; }
.geo-os { display: flex; flex-direction: column; gap: 6px; }
.geo-ob { font-family: inherit; font-size: 0.86rem; text-align: left; padding: 10px 14px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-tertiary); color: var(--text-primary); cursor: pointer; transition: all 0.2s; }
.geo-ob:hover:not(.lk) { border-color: #0d9488; background: rgba(13,148,136,0.08); }
.geo-ob.sc { border-color: var(--success); background: rgba(16,185,129,0.12); color: var(--success); font-weight: 600; }
.geo-ob.sw { border-color: var(--error); background: rgba(239,68,68,0.12); color: var(--error); }
.geo-ob.rv { border-color: var(--success); background: rgba(16,185,129,0.08); }
.geo-ob.lk { cursor: default; opacity: 0.75; }
.geo-ob.qs { border-color: #0d9488; background: rgba(13,148,136,0.1); font-weight: 600; }
.geo-ex { margin-top: 10px; padding: 10px 14px; background: var(--bg-tertiary); border-radius: 6px; font-size: 0.82rem; color: var(--text-secondary); border-left: 3px solid #0d9488; animation: geoFade 0.3s ease; }
@keyframes geoFade { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
.geo-qhd { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.geo-qct { font-family: var(--font-mono); font-size: 0.84rem; color: #0d9488; font-weight: 700; }
.geo-qres { text-align: center; padding: 36px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px; margin-top: 18px; }
.geo-sbig { font-size: 3rem; font-weight: 800; color: #0d9488; line-height: 1; margin-bottom: 4px; }
.geo-ssub { color: var(--text-secondary); font-size: 0.88rem; }
.geo-btn { font-family: inherit; font-size: 0.84rem; font-weight: 700; padding: 10px 22px; border: 1px solid #0d9488; border-radius: 8px; background: transparent; color: #0d9488; cursor: pointer; margin-top: 14px; transition: all 0.2s; }
.geo-btn:hover { background: #0d9488; color: #fff; }
.geo-bf { background: #0d9488; color: #fff; }
.geo-bf:hover { background: #0f766e; }
.geo-fns { margin-top: 32px; padding-top: 18px; border-top: 1px solid var(--border); }
.geo-fns h4 { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.18em; color: #7a5ba0; margin-bottom: 10px; font-weight: 700; }
.geo-fni { font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px; padding-left: 14px; }
.geo-fnm { color: #7a5ba0; font-weight: 700; }
@media (max-width: 640px) { .geo-app { padding: 12px; } .geo-lcard, .geo-qc { padding: 16px; } .geo-nav button { font-size: 0.68rem; padding: 4px 8px; } }
</style>
</head>
<body>
<header>
  <div class="container">
    <div class="header-content">
      <div>
        <h1>🎯 MathBored</h1>
        <div class="tagline">Geometry — Complete Curriculum</div>
      </div>
    </div>
  </div>
</header>

<div class="geo-app">
  <a href="index.html" class="back-link">← Back to Main App</a>

  <div class="geo-hero">
    <h1>△ Geometry</h1>
    <p class="sub">Complete Curriculum · 13 Units · Practice &amp; Quizzes</p>
    <div class="geo-stats">
      <div class="geo-stat"><span class="geo-stat-num">13</span><span class="geo-stat-lbl">Units</span></div>
      <div class="geo-stat"><span class="geo-stat-num">26</span><span class="geo-stat-lbl">Lessons</span></div>
      <div class="geo-stat"><span class="geo-stat-num">91</span><span class="geo-stat-lbl">Practice Qs</span></div>
      <div class="geo-stat"><span class="geo-stat-num">65</span><span class="geo-stat-lbl">Quiz Qs</span></div>
    </div>
  </div>

  <div class="geo-progress">
    <h2 style="margin:0 0 6px;font-size:1.1rem;font-weight:700;">Your Progress</h2>
    <p style="color:var(--text-secondary);font-size:0.88rem;margin:0;">
      <span id="geoCompletedUnits">0</span> of 13 units completed · <span id="geoProgressPct">0</span>% done
    </p>
    <div class="geo-progress-bar">
      <div class="geo-progress-fill" id="geoProgressBar" style="width:0%"></div>
    </div>
  </div>

  <div id="geoApp"></div>
</div>

<footer>
  <div class="container">
    <p>MathBored @ math.boredgames.site • Free forever • Community-driven development</p>
  </div>
</footer>

<script>
const GEOMETRY_CURRICULUM = ${arrStr};

const STATE = { currentUnit: 0, currentTab: 'lesson', answers: {}, quizSubmitted: {}, completedUnits: new Set() };

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('geometry-progress') || '{}');
    if (saved.answers) STATE.answers = saved.answers;
    if (saved.quizSubmitted) STATE.quizSubmitted = saved.quizSubmitted;
    if (saved.completedUnits) STATE.completedUnits = new Set(saved.completedUnits);
  } catch (e) {}
}

function saveProgress() {
  try {
    localStorage.setItem('geometry-progress', JSON.stringify({
      answers: STATE.answers,
      quizSubmitted: STATE.quizSubmitted,
      completedUnits: Array.from(STATE.completedUnits)
    }));
  } catch (e) {}
}

function updateOverallProgress() {
  const count = STATE.completedUnits.size;
  const pct = Math.round((count / GEOMETRY_CURRICULUM.length) * 100);
  document.getElementById('geoCompletedUnits').textContent = count;
  document.getElementById('geoProgressPct').textContent = pct;
  document.getElementById('geoProgressBar').style.width = pct + '%';
}

function render() {
  const D = GEOMETRY_CURRICULUM;
  const u = D[STATE.currentUnit];
  const app = document.getElementById('geoApp');

  const navBtns = D.map((c, i) => {
    const on = i === STATE.currentUnit ? ' on' : '';
    const ok = STATE.completedUnits.has(i) ? ' ok' : '';
    return \`<button class="\${on}\${ok}" onclick="selectUnit(\${i})">\${STATE.completedUnits.has(i) ? '✓ ' : ''}U\${c.id}</button>\`;
  }).join('');

  const deeperHtml = (u.deeperLinks && u.deeperLinks.length) ? \`
    <div class="geo-deeper">
      <div class="lbl">Go Deeper →</div>
      \${u.deeperLinks.map(l => \`<a href="\${l.url}">\${l.label}</a>\`).join('')}
    </div>\` : '';

  app.innerHTML = \`
    <div class="geo-nav">\${navBtns}</div>
    <div class="geo-uhdr">
      <div class="geo-unum">Unit \${u.id} of 13</div>
      <div class="geo-utitle">\${u.title}</div>
      <div class="geo-uobj">\${u.obj}</div>
    </div>
    \${deeperHtml}
    <div class="geo-tabs">
      <button class="geo-tb \${STATE.currentTab === 'lesson' ? 'on' : ''}" onclick="setTab('lesson')">Lessons</button>
      <button class="geo-tb \${STATE.currentTab === 'practice' ? 'on' : ''}" onclick="setTab('practice')">Practice</button>
      <button class="geo-tb \${STATE.currentTab === 'quiz' ? 'on' : ''}" onclick="setTab('quiz')">Unit Quiz</button>
    </div>
    \${STATE.currentTab === 'lesson' ? renderLessons(u) : ''}
    \${STATE.currentTab === 'practice' ? renderPractice(u) : ''}
    \${STATE.currentTab === 'quiz' ? renderQuiz(u) : ''}
    \${renderFootnotes(u)}
  \`;
  updateOverallProgress();
}

function renderLessons(u) {
  return u.ls.map(l => \`
    <div class="geo-lcard">
      <h3>\${l.t}</h3>
      <p>\${l.c}</p>
      \${l.f.map(f => \`<div class="geo-fm">\${f}</div>\`).join('')}
      \${l.ex ? \`<div class="geo-wex"><div class="wl">Worked Example</div><div class="wp">\${l.ex.p}</div>\${l.ex.s.map(s => \`<div class="ws">→ \${s}</div>\`).join('')}</div>\` : ''}
    </div>\`).join('') + \`
    <div class="geo-prbox"><div class="prt">Prerequisite Knowledge</div>\${u.prs.map(p => \`<p><b>[\${p.id}]</b> \${p.text}</p>\`).join('')}</div>\`;
}

function renderPractice(u) {
  return ['easy','medium','hard'].map(d => {
    const qs = u.pr.filter(q => q.d === d);
    if (!qs.length) return '';
    const cls = d === 'easy' ? 'geo-de' : d === 'medium' ? 'geo-dm' : 'geo-dh';
    return \`<div style="margin-bottom:8px"><span class="geo-dtag \${cls}">\${d}</span></div>
      \${qs.map(q => renderQ(q, \`\${STATE.currentUnit}-p-\${u.pr.indexOf(q)}\`, false)).join('')}\`;
  }).join('');
}

function renderQuiz(u) {
  const key = \`\${STATE.currentUnit}-qz\`;
  const sub = STATE.quizSubmitted[key];
  let sc = 0;
  if (sub) u.qz.forEach((q, i) => { if (STATE.answers[\`\${STATE.currentUnit}-q-\${i}\`] === q.c) sc++; });
  return \`
    <div class="geo-qhd">
      <h3 style="font-size:1.15rem;font-weight:700;">Unit \${u.id} Quiz</h3>
      <div class="geo-qct">\${sub ? sc + '/' + u.qz.length : u.qz.length + ' questions'}</div>
    </div>
    \${u.qz.map((q, i) => renderQ(q, \`\${STATE.currentUnit}-q-\${i}\`, sub)).join('')}
    \${!sub ? \`<button class="geo-btn geo-bf" onclick="submitQuiz()">Submit Quiz</button>\` : ''}
    \${sub ? \`<div class="geo-qres"><div class="geo-sbig">\${Math.round(sc/u.qz.length*100)}%</div><div class="geo-ssub">\${sc} of \${u.qz.length} correct</div><button class="geo-btn" onclick="retakeQuiz()">Retake</button></div>\` : ''}\`;
}

function renderQ(q, key, forceShow) {
  const sel = STATE.answers[key];
  const isQuiz = key.includes('-q-');
  const unsub = isQuiz && !STATE.quizSubmitted[\`\${STATE.currentUnit}-qz\`];
  const show = (sel !== undefined && !unsub) || forceShow;
  const cor = sel === q.c;
  const text = q.q || q.question;
  const opts = q.o || q.options || [];
  const correct = q.c;
  const expl = q.x || q.explanation;
  const optsHtml = opts.map((o, i) => {
    let c = 'geo-ob';
    if (show) { c += ' lk'; if (i === sel && cor) c += ' sc'; else if (i === sel && !cor) c += ' sw'; if (i === correct && !cor) c += ' rv'; }
    else if (unsub && i === sel) c += ' qs'; else if (sel !== undefined && !unsub) c += ' lk';
    return \`<button class="\${c}" onclick="answerQ('\${key}',\${i})" \${(show || (sel !== undefined && !unsub)) ? 'disabled' : ''}>\${o}</button>\`;
  }).join('');
  return \`<div class="geo-qc \${show ? (cor ? 'gc' : 'bc') : ''}"><div class="geo-qt">\${text}</div><div class="geo-os">\${optsHtml}</div>\${show && expl ? \`<div class="geo-ex">\${expl}</div>\` : ''}</div>\`;
}

function renderFootnotes(u) {
  if (!u.prs || !u.prs.length) return '';
  return \`<div class="geo-fns"><h4>Prerequisite Footnotes</h4>\${u.prs.map(p => \`<div class="geo-fni"><span class="geo-fnm">[\${p.id}]</span> \${p.text}</div>\`).join('')}</div>\`;
}

function selectUnit(i) { STATE.currentUnit = i; STATE.currentTab = 'lesson'; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function setTab(t) { STATE.currentTab = t; render(); }

function answerQ(key, opt) {
  const unsub = key.includes('-q-') && !STATE.quizSubmitted[\`\${STATE.currentUnit}-qz\`];
  if (!unsub && STATE.answers[key] !== undefined) return;
  STATE.answers[key] = opt;
  saveProgress();
  render();
}

function submitQuiz() {
  const u = GEOMETRY_CURRICULUM[STATE.currentUnit];
  const all = u.qz.every((_, i) => STATE.answers[\`\${STATE.currentUnit}-q-\${i}\`] !== undefined);
  if (!all) { alert('Answer all questions first.'); return; }
  STATE.quizSubmitted[\`\${STATE.currentUnit}-qz\`] = true;
  let sc = 0;
  u.qz.forEach((q, i) => { if (STATE.answers[\`\${STATE.currentUnit}-q-\${i}\`] === q.c) sc++; });
  if (sc / u.qz.length >= 0.6) STATE.completedUnits.add(STATE.currentUnit);
  saveProgress();
  render();
}

function retakeQuiz() {
  const u = GEOMETRY_CURRICULUM[STATE.currentUnit];
  u.qz.forEach((_, i) => delete STATE.answers[\`\${STATE.currentUnit}-q-\${i}\`]);
  delete STATE.quizSubmitted[\`\${STATE.currentUnit}-qz\`];
  STATE.completedUnits.delete(STATE.currentUnit);
  saveProgress();
  render();
}

const savedTheme = localStorage.getItem('mathbored-theme');
if (savedTheme) document.body.className = savedTheme;
loadProgress();
render();
</script>
</body>
</html>
`;

fs.writeFileSync(outPath, html, 'utf8');
console.log('Wrote', outPath);
