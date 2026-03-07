#!/usr/bin/env node
/**
 * Build trigonometry.html from source curriculum HTML: inject deeperLinks,
 * wrap with site header/footer, use site styles + copper/amber theme, add persistence.
 */
const fs = require('fs');
const path = require('path');

const srcPath = process.env.TRIGONOMETRY_SOURCE || '/Users/robn/Downloads/trigonometry-curriculum.html';
const outPath = path.join(__dirname, 'trigonometry.html');

const deeperLinks = [
  [{ label: 'Pythagorean Theorem', url: 'math/pythagorean-theorem/walkthrough.html' }, { label: 'Right Triangle Trigonometry', url: 'math/right-triangle-trigonometry/walkthrough.html' }],
  [{ label: 'Unit Circle', url: 'math/unit-circle/walkthrough.html' }, { label: 'Radian Measure', url: 'math/radian-measure/walkthrough.html' }],
  [{ label: 'Function Transformations', url: 'math/function-transformations/walkthrough.html' }, { label: 'Parent Functions', url: 'math/parent-functions/walkthrough.html' }],
  [{ label: 'Trigonometric Identities', url: 'math/trigonometric-identities/walkthrough.html' }],
  [{ label: 'Sum and Difference Formulas', url: 'math/sum-and-difference-formulas/walkthrough.html' }, { label: 'Double-Angle Formulas', url: 'math/double-angle-formulas/walkthrough.html' }],
  [{ label: 'Inverse Functions', url: 'math/inverse-functions/walkthrough.html' }],
  [{ label: 'Solving Trigonometric Equations', url: 'math/solving-trigonometric-equations/walkthrough.html' }],
  [{ label: 'Law of Sines', url: 'math/law-of-sines/walkthrough.html' }, { label: 'Law of Cosines', url: 'math/law-of-cosines/walkthrough.html' }],
  [{ label: 'Complex Numbers', url: 'math/complex-numbers/walkthrough.html' }, { label: 'Coordinate Plane', url: 'math/coordinate-plane/walkthrough.html' }],
  [{ label: 'Vectors', url: 'math/vectors/walkthrough.html' }],
  [{ label: 'Parametric Equations', url: 'math/parametric-equations/walkthrough.html' }, { label: 'Polar Coordinates', url: 'math/polar-coordinates/walkthrough.html' }],
  [{ label: 'Modeling with Trigonometry', url: 'math/modeling-with-trigonometry/walkthrough.html' }]
];

const src = fs.readFileSync(srcPath, 'utf8');
const arrayStart = src.indexOf('const U=[') + 8;
const arrayEnd = src.indexOf('\n];', arrayStart) + 3;
let arrStr = src.slice(arrayStart, arrayEnd);

// Inject deeperLinks: units 1-11 end with ]\n},\n// ══════════════
let unitIndex = 0;
arrStr = arrStr.replace(/\n]\n\},\n\s*(\/\/ ══════════════[^\n]*)/g, (match, comment) => {
  const links = deeperLinks[unitIndex++] || [];
  return '\n],\n  deeperLinks: ' + JSON.stringify(links) + ',\n},\n' + comment;
});
// Last unit (12): ]\n}\n];
arrStr = arrStr.replace(/\n]\n\}\n\];\s*$/, () => {
  const links = deeperLinks[unitIndex++] || [];
  return '\n],\n  deeperLinks: ' + JSON.stringify(links) + '\n}\n];';
});

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Trigonometry — Complete Curriculum | MathBored</title>
<meta name="description" content="Complete Trigonometry course: 12 units from right triangles through applications. Free interactive lessons, practice, and quizzes.">
<meta name="keywords" content="Trigonometry, unit circle, trig identities, law of sines, law of cosines, polar coordinates, vectors, math, free, K-12">
<link rel="canonical" href="https://math.boredgames.site/trigonometry.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://math.boredgames.site/trigonometry.html">
<meta property="og:title" content="Trigonometry — Complete Curriculum | MathBored">
<meta property="og:description" content="Complete Trigonometry course: 12 units from right triangles through applications and modeling.">
<meta property="og:image" content="https://math.boredgames.site/og-image.png">
<meta property="og:site_name" content="MathBored">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Course","name":"Trigonometry — Complete Curriculum","description":"Complete Trigonometry course: 12 units from right triangles through applications and modeling.","provider":{"@type":"Organization","name":"MathBored","url":"https://math.boredgames.site"},"educationalLevel":"11th Grade","learningResourceType":"Course","inLanguage":"en","isAccessibleForFree":true}
</script>
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="stylesheet" href="styles.css">
<style>
/* Trigonometry — local styles (copper/amber theme) */
.trig-app { max-width: 960px; margin: 0 auto; padding: 20px; }
.back-link { display: inline-block; margin-bottom: 20px; color: #d97706; text-decoration: none; font-weight: 600; }
.back-link:hover { opacity: 0.9; }
.trig-hero { background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary)); border: 1px solid var(--border); border-radius: 20px; padding: 48px 28px 40px; text-align: center; margin-bottom: 32px; }
.trig-hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; color: #b45309; margin-bottom: 8px; }
.trig-hero .sub { font-size: 0.9rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
.trig-stats { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
.trig-stat { background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 12px; padding: 14px 24px; }
.trig-stat-num { font-size: 1.8rem; font-weight: 800; display: block; color: var(--text-primary); }
.trig-stat-lbl { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.08em; }
.trig-progress { background: var(--bg-secondary); border: 2px solid var(--border); border-radius: 14px; padding: 20px 24px; margin-bottom: 28px; }
.trig-progress-bar { background: var(--bg-tertiary); border-radius: 20px; height: 10px; overflow: hidden; margin: 10px 0 6px; }
.trig-progress-fill { height: 100%; background: linear-gradient(90deg, #b45309, #d97706); border-radius: 20px; transition: width 0.5s ease; }
.trig-nav { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px; padding: 14px; background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border); }
.trig-nav button { font-family: inherit; font-size: 0.75rem; font-weight: 700; padding: 6px 12px; border: 1px solid var(--border); border-radius: 6px; background: transparent; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
.trig-nav button:hover { border-color: #d97706; color: var(--text-primary); }
.trig-nav button.on { background: #d97706; color: #fff; border-color: #d97706; }
.trig-nav button.ok { border-color: var(--success); color: var(--success); }
.trig-uhdr { margin-bottom: 22px; }
.trig-unum { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: #d97706; font-weight: 700; }
.trig-utitle { font-size: clamp(1.4rem, 3.5vw, 2.2rem); font-weight: 800; margin: 4px 0 8px; }
.trig-uobj { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.75; }
.trig-deeper { background: var(--bg-secondary); border: 1px solid var(--border); border-left: 3px solid #d97706; border-radius: 10px; padding: 14px 18px; margin-bottom: 20px; font-size: 0.86rem; }
.trig-deeper .lbl { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: #d97706; font-weight: 700; margin-bottom: 8px; }
.trig-deeper a { display: inline-block; margin: 2px 6px 2px 0; padding: 4px 12px; border-radius: 6px; border: 1px solid var(--border); color: var(--text-secondary); text-decoration: none; font-size: 0.8rem; font-weight: 600; transition: all 0.2s; }
.trig-deeper a:hover { border-color: #d97706; color: #d97706; background: rgba(217,119,6,0.1); }
.trig-tabs { display: flex; gap: 4px; margin-bottom: 20px; border-bottom: 1px solid var(--border); }
.trig-tb { font-family: inherit; font-size: 0.86rem; font-weight: 700; padding: 10px 20px; border: none; background: transparent; color: var(--text-secondary); cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
.trig-tb:hover { color: var(--text-primary); }
.trig-tb.on { color: #d97706; border-bottom-color: #d97706; }
.trig-lcard { background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px; padding: 24px 26px; margin-bottom: 14px; }
.trig-lcard h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; color: #d97706; }
.trig-lcard p { font-size: 0.9rem; margin-bottom: 8px; line-height: 1.7; }
.trig-fm { background: var(--bg-tertiary); border-left: 3px solid #d97706; border-radius: 6px; padding: 10px 14px; margin: 10px 0; font-family: var(--font-mono); font-size: 0.84rem; color: #f59e0b; overflow-x: auto; }
.trig-wex { background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; margin: 12px 0; }
.trig-wex .wl { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--warning); font-weight: 700; margin-bottom: 6px; }
.trig-wex .wp { font-weight: 600; margin-bottom: 4px; font-size: 0.88rem; }
.trig-wex .ws { color: var(--text-secondary); font-size: 0.82rem; margin-bottom: 2px; }
.trig-prbox { background: rgba(167,139,250,0.08); border: 1px solid rgba(167,139,250,0.2); border-left: 3px solid #7a5ba0; border-radius: 8px; padding: 12px 16px; margin: 12px 0; font-size: 0.84rem; }
.trig-prbox .prt { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.15em; color: #7a5ba0; font-weight: 700; margin-bottom: 6px; }
.trig-prbox p { color: var(--text-secondary); margin-bottom: 4px; }
.trig-dtag { display: inline-block; font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; padding: 2px 8px; border-radius: 4px; margin-bottom: 8px; }
.trig-de { background: rgba(16,185,129,0.12); color: var(--success); border: 1px solid rgba(16,185,129,0.25); }
.trig-dm { background: rgba(245,158,11,0.12); color: var(--warning); border: 1px solid rgba(245,158,11,0.25); }
.trig-dh { background: rgba(239,68,68,0.12); color: var(--error); border: 1px solid rgba(239,68,68,0.25); }
.trig-qc { background: var(--bg-secondary); border: 2px solid var(--border); border-radius: 10px; padding: 18px 20px; margin-bottom: 12px; transition: border-color 0.3s; }
.trig-qc.gc { border-color: var(--success); }
.trig-qc.bc { border-color: var(--error); }
.trig-qt { font-size: 0.9rem; margin-bottom: 12px; font-weight: 600; line-height: 1.6; }
.trig-os { display: flex; flex-direction: column; gap: 6px; }
.trig-ob { font-family: inherit; font-size: 0.86rem; text-align: left; padding: 10px 14px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-tertiary); color: var(--text-primary); cursor: pointer; transition: all 0.2s; }
.trig-ob:hover:not(.lk) { border-color: #d97706; background: rgba(217,119,6,0.08); }
.trig-ob.sc { border-color: var(--success); background: rgba(16,185,129,0.12); color: var(--success); font-weight: 600; }
.trig-ob.sw { border-color: var(--error); background: rgba(239,68,68,0.12); color: var(--error); }
.trig-ob.rv { border-color: var(--success); background: rgba(16,185,129,0.08); }
.trig-ob.lk { cursor: default; opacity: 0.75; }
.trig-ob.qs { border-color: #d97706; background: rgba(217,119,6,0.1); font-weight: 600; }
.trig-ex { margin-top: 10px; padding: 10px 14px; background: var(--bg-tertiary); border-radius: 6px; font-size: 0.82rem; color: var(--text-secondary); border-left: 3px solid #d97706; animation: trigFade 0.3s ease; }
@keyframes trigFade { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
.trig-qhd { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.trig-qct { font-family: var(--font-mono); font-size: 0.84rem; color: #d97706; font-weight: 700; }
.trig-qres { text-align: center; padding: 36px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px; margin-top: 18px; }
.trig-sbig { font-size: 3rem; font-weight: 800; color: #d97706; line-height: 1; margin-bottom: 4px; }
.trig-ssub { color: var(--text-secondary); font-size: 0.88rem; }
.trig-btn { font-family: inherit; font-size: 0.84rem; font-weight: 700; padding: 10px 22px; border: 1px solid #d97706; border-radius: 8px; background: transparent; color: #d97706; cursor: pointer; margin-top: 14px; transition: all 0.2s; }
.trig-btn:hover { background: #d97706; color: #fff; }
.trig-bf { background: #d97706; color: #fff; }
.trig-bf:hover { background: #b45309; }
.trig-fns { margin-top: 32px; padding-top: 18px; border-top: 1px solid var(--border); }
.trig-fns h4 { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.18em; color: #7a5ba0; margin-bottom: 10px; font-weight: 700; }
.trig-fni { font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px; padding-left: 14px; }
.trig-fnm { color: #7a5ba0; font-weight: 700; }
@media (max-width: 640px) { .trig-app { padding: 12px; } .trig-lcard, .trig-qc { padding: 16px; } .trig-nav button { font-size: 0.68rem; padding: 4px 8px; } }
</style>
</head>
<body>
<header>
  <div class="container">
    <div class="header-content">
      <div>
        <h1>🎯 MathBored</h1>
        <div class="tagline">Trigonometry — Complete Curriculum</div>
      </div>
    </div>
  </div>
</header>

<div class="trig-app">
  <a href="index.html" class="back-link">← Back to Main App</a>

  <div class="trig-hero">
    <h1>∿ Trigonometry</h1>
    <p class="sub">Complete Curriculum · 12 Units · Practice &amp; Quizzes</p>
    <div class="trig-stats">
      <div class="trig-stat"><span class="trig-stat-num">12</span><span class="trig-stat-lbl">Units</span></div>
      <div class="trig-stat"><span class="trig-stat-num">26</span><span class="trig-stat-lbl">Lessons</span></div>
      <div class="trig-stat"><span class="trig-stat-num">91</span><span class="trig-stat-lbl">Practice Qs</span></div>
      <div class="trig-stat"><span class="trig-stat-num">60</span><span class="trig-stat-lbl">Quiz Qs</span></div>
    </div>
  </div>

  <div class="trig-progress">
    <h2 style="margin:0 0 6px;font-size:1.1rem;font-weight:700;">Your Progress</h2>
    <p style="color:var(--text-secondary);font-size:0.88rem;margin:0;">
      <span id="trigCompletedUnits">0</span> of 12 units completed · <span id="trigProgressPct">0</span>% done
    </p>
    <div class="trig-progress-bar">
      <div class="trig-progress-fill" id="trigProgressBar" style="width:0%"></div>
    </div>
  </div>

  <div id="trigApp"></div>
</div>

<footer>
  <div class="container">
    <p>MathBored @ math.boredgames.site • Free forever • Community-driven development</p>
  </div>
</footer>

<script>
const TRIGONOMETRY_CURRICULUM = ${arrStr};

const STATE = { currentUnit: 0, currentTab: 'lesson', answers: {}, quizSubmitted: {}, completedUnits: new Set() };

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('trigonometry-progress') || '{}');
    if (saved.answers) STATE.answers = saved.answers;
    if (saved.quizSubmitted) STATE.quizSubmitted = saved.quizSubmitted;
    if (saved.completedUnits) STATE.completedUnits = new Set(saved.completedUnits);
  } catch (e) {}
}

function saveProgress() {
  try {
    localStorage.setItem('trigonometry-progress', JSON.stringify({
      answers: STATE.answers,
      quizSubmitted: STATE.quizSubmitted,
      completedUnits: Array.from(STATE.completedUnits)
    }));
  } catch (e) {}
}

function updateOverallProgress() {
  const count = STATE.completedUnits.size;
  const pct = Math.round((count / TRIGONOMETRY_CURRICULUM.length) * 100);
  document.getElementById('trigCompletedUnits').textContent = count;
  document.getElementById('trigProgressPct').textContent = pct;
  document.getElementById('trigProgressBar').style.width = pct + '%';
}

function render() {
  const D = TRIGONOMETRY_CURRICULUM;
  const u = D[STATE.currentUnit];
  const app = document.getElementById('trigApp');

  const navBtns = D.map((c, i) => {
    const on = i === STATE.currentUnit ? ' on' : '';
    const ok = STATE.completedUnits.has(i) ? ' ok' : '';
    return \`<button class="\${on}\${ok}" onclick="selectUnit(\${i})">\${STATE.completedUnits.has(i) ? '✓ ' : ''}U\${c.id}</button>\`;
  }).join('');

  const deeperHtml = (u.deeperLinks && u.deeperLinks.length) ? \`
    <div class="trig-deeper">
      <div class="lbl">Go Deeper →</div>
      \${u.deeperLinks.map(l => \`<a href="\${l.url}">\${l.label}</a>\`).join('')}
    </div>\` : '';

  app.innerHTML = \`
    <div class="trig-nav">\${navBtns}</div>
    <div class="trig-uhdr">
      <div class="trig-unum">Unit \${u.id} of 12</div>
      <div class="trig-utitle">\${u.title}</div>
      <div class="trig-uobj">\${u.obj}</div>
    </div>
    \${deeperHtml}
    <div class="trig-tabs">
      <button class="trig-tb \${STATE.currentTab === 'lesson' ? 'on' : ''}" onclick="setTab('lesson')">Lessons</button>
      <button class="trig-tb \${STATE.currentTab === 'practice' ? 'on' : ''}" onclick="setTab('practice')">Practice</button>
      <button class="trig-tb \${STATE.currentTab === 'quiz' ? 'on' : ''}" onclick="setTab('quiz')">Unit Quiz</button>
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
    <div class="trig-lcard">
      <h3>\${l.t}</h3>
      <p>\${l.c}</p>
      \${l.f.map(f => \`<div class="trig-fm">\${f}</div>\`).join('')}
      \${l.ex ? \`<div class="trig-wex"><div class="wl">Worked Example</div><div class="wp">\${l.ex.p}</div>\${l.ex.s.map(s => \`<div class="ws">→ \${s}</div>\`).join('')}</div>\` : ''}
    </div>\`).join('') + \`
    <div class="trig-prbox"><div class="prt">Prerequisite Knowledge</div>\${u.prs.map(p => \`<p><b>[\${p.id}]</b> \${p.text}</p>\`).join('')}</div>\`;
}

function renderPractice(u) {
  return ['easy','medium','hard'].map(d => {
    const qs = u.pr.filter(q => q.d === d);
    if (!qs.length) return '';
    const cls = d === 'easy' ? 'trig-de' : d === 'medium' ? 'trig-dm' : 'trig-dh';
    return \`<div style="margin-bottom:8px"><span class="trig-dtag \${cls}">\${d}</span></div>
      \${qs.map(q => renderQ(q, \`\${STATE.currentUnit}-p-\${u.pr.indexOf(q)}\`, false)).join('')}\`;
  }).join('');
}

function renderQuiz(u) {
  const key = \`\${STATE.currentUnit}-qz\`;
  const sub = STATE.quizSubmitted[key];
  let sc = 0;
  if (sub) u.qz.forEach((q, i) => { if (STATE.answers[\`\${STATE.currentUnit}-q-\${i}\`] === q.c) sc++; });
  return \`
    <div class="trig-qhd">
      <h3 style="font-size:1.15rem;font-weight:700;">Unit \${u.id} Quiz</h3>
      <div class="trig-qct">\${sub ? sc + '/' + u.qz.length : u.qz.length + ' questions'}</div>
    </div>
    \${u.qz.map((q, i) => renderQ(q, \`\${STATE.currentUnit}-q-\${i}\`, sub)).join('')}
    \${!sub ? \`<button class="trig-btn trig-bf" onclick="submitQuiz()">Submit Quiz</button>\` : ''}
    \${sub ? \`<div class="trig-qres"><div class="trig-sbig">\${Math.round(sc/u.qz.length*100)}%</div><div class="trig-ssub">\${sc} of \${u.qz.length} correct</div><button class="trig-btn" onclick="retakeQuiz()">Retake</button></div>\` : ''}\`;
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
    let c = 'trig-ob';
    if (show) { c += ' lk'; if (i === sel && cor) c += ' sc'; else if (i === sel && !cor) c += ' sw'; if (i === correct && !cor) c += ' rv'; }
    else if (unsub && i === sel) c += ' qs'; else if (sel !== undefined && !unsub) c += ' lk';
    return \`<button class="\${c}" onclick="answerQ('\${key}',\${i})" \${(show || (sel !== undefined && !unsub)) ? 'disabled' : ''}>\${o}</button>\`;
  }).join('');
  return \`<div class="trig-qc \${show ? (cor ? 'gc' : 'bc') : ''}"><div class="trig-qt">\${text}</div><div class="trig-os">\${optsHtml}</div>\${show && expl ? \`<div class="trig-ex">\${expl}</div>\` : ''}</div>\`;
}

function renderFootnotes(u) {
  if (!u.prs || !u.prs.length) return '';
  return \`<div class="trig-fns"><h4>Prerequisite Footnotes</h4>\${u.prs.map(p => \`<div class="trig-fni"><span class="trig-fnm">[\${p.id}]</span> \${p.text}</div>\`).join('')}</div>\`;
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
  const u = TRIGONOMETRY_CURRICULUM[STATE.currentUnit];
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
  const u = TRIGONOMETRY_CURRICULUM[STATE.currentUnit];
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
