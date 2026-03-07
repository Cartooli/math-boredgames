#!/usr/bin/env node
/**
 * Build linear-algebra.html from source curriculum HTML: inject deeperLinks,
 * wrap with site header/footer, use site styles + sage/green theme, add persistence.
 */
const fs = require('fs');
const path = require('path');

const srcPath = process.env.LINEAR_ALGEBRA_SOURCE || '/Users/robn/Downloads/linear-algebra-curriculum.html';
const outPath = path.join(__dirname, 'linear-algebra.html');

const deeperLinks = [
  [{ label: 'Systems of Equations', url: 'math/systems-of-equations/walkthrough.html' }, { label: 'Matrices', url: 'math/matrices/walkthrough.html' }],
  [{ label: 'Vectors', url: 'math/vectors/walkthrough.html' }, { label: 'Linear Combinations', url: 'math/linear-combinations/walkthrough.html' }],
  [{ label: 'Matrix Multiplication', url: 'math/matrix-multiplication/walkthrough.html' }, { label: 'Matrix Transpose', url: 'math/matrix-transpose/walkthrough.html' }],
  [{ label: 'Determinants', url: 'math/determinants/walkthrough.html' }],
  [{ label: 'Matrix Inverses', url: 'math/matrix-inverses/walkthrough.html' }],
  [{ label: 'Vector Spaces', url: 'math/vector-spaces/walkthrough.html' }, { label: 'Null Space and Column Space', url: 'math/null-space-column-space/walkthrough.html' }],
  [{ label: 'Linear Independence', url: 'math/linear-independence/walkthrough.html' }, { label: 'Basis and Dimension', url: 'math/basis-and-dimension/walkthrough.html' }],
  [{ label: 'Linear Transformations', url: 'math/linear-transformations/walkthrough.html' }],
  [{ label: 'Eigenvalues and Eigenvectors', url: 'math/eigenvalues-eigenvectors/walkthrough.html' }],
  [{ label: 'Diagonalization', url: 'math/diagonalization/walkthrough.html' }],
  [{ label: 'Orthogonality', url: 'math/orthogonality/walkthrough.html' }, { label: 'Least Squares', url: 'math/least-squares/walkthrough.html' }],
  [{ label: 'Singular Value Decomposition', url: 'math/singular-value-decomposition/walkthrough.html' }]
];

const src = fs.readFileSync(srcPath, 'utf8');
const arrayStart = src.indexOf('const D=[') + 8;
const arrayEnd = src.indexOf('\n];', arrayStart) + 3;
let arrStr = src.slice(arrayStart, arrayEnd);

// Inject deeperLinks: units 1-11 end with ]},\n// ══════════════
let unitIndex = 0;
arrStr = arrStr.replace(/\]\},\n(\/\/ ══════════════[^\n]*)/g, (match, comment) => {
  const links = deeperLinks[unitIndex++] || [];
  return '],\n  deeperLinks: ' + JSON.stringify(links) + ',\n},\n' + comment;
});
// Last unit (12): ]}\n];
arrStr = arrStr.replace(/\]\}\n\];\s*$/, () => {
  const links = deeperLinks[unitIndex++] || [];
  return '],\n  deeperLinks: ' + JSON.stringify(links) + '\n}\n];';
});

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Linear Algebra — Complete Curriculum | MathBored</title>
<meta name="description" content="Complete Linear Algebra course: 12 units from systems and vectors through eigenvalues, diagonalization, and SVD. Free interactive lessons, practice, and quizzes.">
<meta name="keywords" content="Linear algebra, matrices, vectors, determinants, eigenvalues, diagonalization, SVD, math, free, college">
<link rel="canonical" href="https://math.boredgames.site/linear-algebra.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://math.boredgames.site/linear-algebra.html">
<meta property="og:title" content="Linear Algebra — Complete Curriculum | MathBored">
<meta property="og:description" content="Complete Linear Algebra course: 12 units from systems and vectors through eigenvalues and SVD.">
<meta property="og:image" content="https://math.boredgames.site/og-image.png">
<meta property="og:site_name" content="MathBored">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Course","name":"Linear Algebra — Complete Curriculum","description":"Complete Linear Algebra course: 12 units from systems and vectors through eigenvalues, diagonalization, and SVD.","provider":{"@type":"Organization","name":"MathBored","url":"https://math.boredgames.site"},"educationalLevel":"College","learningResourceType":"Course","inLanguage":"en","isAccessibleForFree":true}
</script>
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="stylesheet" href="styles.css">
<style>
/* Linear Algebra — local styles (sage/green theme) */
.la-app { max-width: 960px; margin: 0 auto; padding: 20px; }
.back-link { display: inline-block; margin-bottom: 20px; color: #4a7c59; text-decoration: none; font-weight: 600; }
.back-link:hover { opacity: 0.9; }
.la-hero { background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary)); border: 1px solid var(--border); border-radius: 20px; padding: 48px 28px 40px; text-align: center; margin-bottom: 32px; }
.la-hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; color: #3a6347; margin-bottom: 8px; }
.la-hero .sub { font-size: 0.9rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
.la-stats { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
.la-stat { background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 12px; padding: 14px 24px; }
.la-stat-num { font-size: 1.8rem; font-weight: 800; display: block; color: var(--text-primary); }
.la-stat-lbl { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.08em; }
.la-progress { background: var(--bg-secondary); border: 2px solid var(--border); border-radius: 14px; padding: 20px 24px; margin-bottom: 28px; }
.la-progress-bar { background: var(--bg-tertiary); border-radius: 20px; height: 10px; overflow: hidden; margin: 10px 0 6px; }
.la-progress-fill { height: 100%; background: linear-gradient(90deg, #3a6347, #4a7c59); border-radius: 20px; transition: width 0.5s ease; }
.la-nav { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px; padding: 14px; background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border); }
.la-nav button { font-family: inherit; font-size: 0.75rem; font-weight: 700; padding: 6px 12px; border: 1px solid var(--border); border-radius: 6px; background: transparent; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
.la-nav button:hover { border-color: #4a7c59; color: var(--text-primary); }
.la-nav button.on { background: #4a7c59; color: #fff; border-color: #4a7c59; }
.la-nav button.ok { border-color: var(--success); color: var(--success); }
.la-uhdr { margin-bottom: 22px; }
.la-unum { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: #4a7c59; font-weight: 700; }
.la-utitle { font-size: clamp(1.4rem, 3.5vw, 2.2rem); font-weight: 800; margin: 4px 0 8px; }
.la-uobj { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.75; }
.la-deeper { background: var(--bg-secondary); border: 1px solid var(--border); border-left: 3px solid #4a7c59; border-radius: 10px; padding: 14px 18px; margin-bottom: 20px; font-size: 0.86rem; }
.la-deeper .lbl { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: #4a7c59; font-weight: 700; margin-bottom: 8px; }
.la-deeper a { display: inline-block; margin: 2px 6px 2px 0; padding: 4px 12px; border-radius: 6px; border: 1px solid var(--border); color: var(--text-secondary); text-decoration: none; font-size: 0.8rem; font-weight: 600; transition: all 0.2s; }
.la-deeper a:hover { border-color: #4a7c59; color: #4a7c59; background: rgba(74,124,89,0.1); }
.la-tabs { display: flex; gap: 4px; margin-bottom: 20px; border-bottom: 1px solid var(--border); }
.la-tb { font-family: inherit; font-size: 0.86rem; font-weight: 700; padding: 10px 20px; border: none; background: transparent; color: var(--text-secondary); cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
.la-tb:hover { color: var(--text-primary); }
.la-tb.on { color: #4a7c59; border-bottom-color: #4a7c59; }
.la-lcard { background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px; padding: 24px 26px; margin-bottom: 14px; }
.la-lcard h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; color: #4a7c59; }
.la-lcard p { font-size: 0.9rem; margin-bottom: 8px; line-height: 1.7; }
.la-fm { background: var(--bg-tertiary); border-left: 3px solid #4a7c59; border-radius: 6px; padding: 10px 14px; margin: 10px 0; font-family: var(--font-mono); font-size: 0.84rem; color: #6a9e79; overflow-x: auto; }
.la-wex { background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; margin: 12px 0; }
.la-wex .wl { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--warning); font-weight: 700; margin-bottom: 6px; }
.la-wex .wp { font-weight: 600; margin-bottom: 4px; font-size: 0.88rem; }
.la-wex .ws { color: var(--text-secondary); font-size: 0.82rem; margin-bottom: 2px; }
.la-prbox { background: rgba(106,94,138,0.08); border: 1px solid rgba(106,94,138,0.2); border-left: 3px solid #6a5e8a; border-radius: 8px; padding: 12px 16px; margin: 12px 0; font-size: 0.84rem; }
.la-prbox .prt { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.15em; color: #6a5e8a; font-weight: 700; margin-bottom: 6px; }
.la-prbox p { color: var(--text-secondary); margin-bottom: 4px; }
.la-dtag { display: inline-block; font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; padding: 2px 8px; border-radius: 4px; margin-bottom: 8px; }
.la-de { background: rgba(16,185,129,0.12); color: var(--success); border: 1px solid rgba(16,185,129,0.25); }
.la-dm { background: rgba(245,158,11,0.12); color: var(--warning); border: 1px solid rgba(245,158,11,0.25); }
.la-dh { background: rgba(239,68,68,0.12); color: var(--error); border: 1px solid rgba(239,68,68,0.25); }
.la-qc { background: var(--bg-secondary); border: 2px solid var(--border); border-radius: 10px; padding: 18px 20px; margin-bottom: 12px; transition: border-color 0.3s; }
.la-qc.gc { border-color: var(--success); }
.la-qc.bc { border-color: var(--error); }
.la-qt { font-size: 0.9rem; margin-bottom: 12px; font-weight: 600; line-height: 1.6; }
.la-os { display: flex; flex-direction: column; gap: 6px; }
.la-ob { font-family: inherit; font-size: 0.86rem; text-align: left; padding: 10px 14px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-tertiary); color: var(--text-primary); cursor: pointer; transition: all 0.2s; }
.la-ob:hover:not(.lk) { border-color: #4a7c59; background: rgba(74,124,89,0.08); }
.la-ob.sc { border-color: var(--success); background: rgba(16,185,129,0.12); color: var(--success); font-weight: 600; }
.la-ob.sw { border-color: var(--error); background: rgba(239,68,68,0.12); color: var(--error); }
.la-ob.rv { border-color: var(--success); background: rgba(16,185,129,0.08); }
.la-ob.lk { cursor: default; opacity: 0.75; }
.la-ob.qs { border-color: #4a7c59; background: rgba(74,124,89,0.1); font-weight: 600; }
.la-ex { margin-top: 10px; padding: 10px 14px; background: var(--bg-tertiary); border-radius: 6px; font-size: 0.82rem; color: var(--text-secondary); border-left: 3px solid #4a7c59; animation: laFade 0.3s ease; }
@keyframes laFade { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
.la-qhd { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.la-qct { font-family: var(--font-mono); font-size: 0.84rem; color: #4a7c59; font-weight: 700; }
.la-qres { text-align: center; padding: 36px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px; margin-top: 18px; }
.la-sbig { font-size: 3rem; font-weight: 800; color: #4a7c59; line-height: 1; margin-bottom: 4px; }
.la-ssub { color: var(--text-secondary); font-size: 0.88rem; }
.la-btn { font-family: inherit; font-size: 0.84rem; font-weight: 700; padding: 10px 22px; border: 1px solid #4a7c59; border-radius: 8px; background: transparent; color: #4a7c59; cursor: pointer; margin-top: 14px; transition: all 0.2s; }
.la-btn:hover { background: #4a7c59; color: #fff; }
.la-bf { background: #4a7c59; color: #fff; }
.la-bf:hover { background: #3a6347; }
.la-fns { margin-top: 32px; padding-top: 18px; border-top: 1px solid var(--border); }
.la-fns h4 { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.18em; color: #6a5e8a; margin-bottom: 10px; font-weight: 700; }
.la-fni { font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px; padding-left: 14px; }
.la-fnm { color: #6a5e8a; font-weight: 700; }
@media (max-width: 640px) { .la-app { padding: 12px; } .la-lcard, .la-qc { padding: 16px; } .la-nav button { font-size: 0.68rem; padding: 4px 8px; } }
</style>
</head>
<body>
<header>
  <div class="container">
    <div class="header-content">
      <div>
        <h1>🎯 MathBored</h1>
        <div class="tagline">Linear Algebra — Complete Curriculum</div>
      </div>
    </div>
  </div>
</header>

<div class="la-app">
  <a href="index.html" class="back-link">← Back to Main App</a>

  <div class="la-hero">
    <h1>◫ Linear Algebra</h1>
    <p class="sub">Complete Curriculum · 12 Units · Practice &amp; Quizzes</p>
    <div class="la-stats">
      <div class="la-stat"><span class="la-stat-num">12</span><span class="la-stat-lbl">Units</span></div>
      <div class="la-stat"><span class="la-stat-num">24</span><span class="la-stat-lbl">Lessons</span></div>
      <div class="la-stat"><span class="la-stat-num">77</span><span class="la-stat-lbl">Practice Qs</span></div>
      <div class="la-stat"><span class="la-stat-num">60</span><span class="la-stat-lbl">Quiz Qs</span></div>
    </div>
  </div>

  <div class="la-progress">
    <h2 style="margin:0 0 6px;font-size:1.1rem;font-weight:700;">Your Progress</h2>
    <p style="color:var(--text-secondary);font-size:0.88rem;margin:0;">
      <span id="laCompletedUnits">0</span> of 12 units completed · <span id="laProgressPct">0</span>% done
    </p>
    <div class="la-progress-bar">
      <div class="la-progress-fill" id="laProgressBar" style="width:0%"></div>
    </div>
  </div>

  <div id="laApp"></div>
</div>

<footer>
  <div class="container">
    <p>MathBored @ math.boredgames.site • Free forever • Community-driven development</p>
  </div>
</footer>

<script>
const LINEAR_ALGEBRA_CURRICULUM = ${arrStr};

const STATE = { currentUnit: 0, currentTab: 'lesson', answers: {}, quizSubmitted: {}, completedUnits: new Set() };

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('linear-algebra-progress') || '{}');
    if (saved.answers) STATE.answers = saved.answers;
    if (saved.quizSubmitted) STATE.quizSubmitted = saved.quizSubmitted;
    if (saved.completedUnits) STATE.completedUnits = new Set(saved.completedUnits);
  } catch (e) {}
}

function saveProgress() {
  try {
    localStorage.setItem('linear-algebra-progress', JSON.stringify({
      answers: STATE.answers,
      quizSubmitted: STATE.quizSubmitted,
      completedUnits: Array.from(STATE.completedUnits)
    }));
  } catch (e) {}
}

function updateOverallProgress() {
  const count = STATE.completedUnits.size;
  const pct = Math.round((count / LINEAR_ALGEBRA_CURRICULUM.length) * 100);
  document.getElementById('laCompletedUnits').textContent = count;
  document.getElementById('laProgressPct').textContent = pct;
  document.getElementById('laProgressBar').style.width = pct + '%';
}

function render() {
  const D = LINEAR_ALGEBRA_CURRICULUM;
  const u = D[STATE.currentUnit];
  const app = document.getElementById('laApp');

  const navBtns = D.map((c, i) => {
    const on = i === STATE.currentUnit ? ' on' : '';
    const ok = STATE.completedUnits.has(i) ? ' ok' : '';
    return \`<button class="\${on}\${ok}" onclick="selectUnit(\${i})">\${STATE.completedUnits.has(i) ? '✓ ' : ''}U\${c.id}</button>\`;
  }).join('');

  const deeperHtml = (u.deeperLinks && u.deeperLinks.length) ? \`
    <div class="la-deeper">
      <div class="lbl">Go Deeper →</div>
      \${u.deeperLinks.map(l => \`<a href="\${l.url}">\${l.label}</a>\`).join('')}
    </div>\` : '';

  app.innerHTML = \`
    <div class="la-nav">\${navBtns}</div>
    <div class="la-uhdr">
      <div class="la-unum">Unit \${u.id} of 12</div>
      <div class="la-utitle">\${u.title}</div>
      <div class="la-uobj">\${u.obj}</div>
    </div>
    \${deeperHtml}
    <div class="la-tabs">
      <button class="la-tb \${STATE.currentTab === 'lesson' ? 'on' : ''}" onclick="setTab('lesson')">Lessons</button>
      <button class="la-tb \${STATE.currentTab === 'practice' ? 'on' : ''}" onclick="setTab('practice')">Practice</button>
      <button class="la-tb \${STATE.currentTab === 'quiz' ? 'on' : ''}" onclick="setTab('quiz')">Unit Quiz</button>
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
    <div class="la-lcard">
      <h3>\${l.t}</h3>
      <p>\${l.c}</p>
      \${l.f.map(f => \`<div class="la-fm">\${f}</div>\`).join('')}
      \${l.ex ? \`<div class="la-wex"><div class="wl">Worked Example</div><div class="wp">\${l.ex.p}</div>\${l.ex.s.map(s => \`<div class="ws">→ \${s}</div>\`).join('')}</div>\` : ''}
    </div>\`).join('') + \`
    <div class="la-prbox"><div class="prt">Prerequisite Knowledge</div>\${u.prs.map(p => \`<p><b>[\${p.id}]</b> \${p.text}</p>\`).join('')}</div>\`;
}

function renderPractice(u) {
  return ['easy','medium','hard'].map(d => {
    const qs = u.pr.filter(q => q.d === d);
    if (!qs.length) return '';
    const cls = d === 'easy' ? 'la-de' : d === 'medium' ? 'la-dm' : 'la-dh';
    return \`<div style="margin-bottom:8px"><span class="la-dtag \${cls}">\${d}</span></div>
      \${qs.map(q => renderQ(q, \`\${STATE.currentUnit}-p-\${u.pr.indexOf(q)}\`, false)).join('')}\`;
  }).join('');
}

function renderQuiz(u) {
  const key = \`\${STATE.currentUnit}-qz\`;
  const sub = STATE.quizSubmitted[key];
  let sc = 0;
  if (sub) u.qz.forEach((q, i) => { if (STATE.answers[\`\${STATE.currentUnit}-q-\${i}\`] === q.c) sc++; });
  return \`
    <div class="la-qhd">
      <h3 style="font-size:1.15rem;font-weight:700;">Unit \${u.id} Quiz</h3>
      <div class="la-qct">\${sub ? sc + '/' + u.qz.length : u.qz.length + ' questions'}</div>
    </div>
    \${u.qz.map((q, i) => renderQ(q, \`\${STATE.currentUnit}-q-\${i}\`, sub)).join('')}
    \${!sub ? \`<button class="la-btn la-bf" onclick="submitQuiz()">Submit Quiz</button>\` : ''}
    \${sub ? \`<div class="la-qres"><div class="la-sbig">\${Math.round(sc/u.qz.length*100)}%</div><div class="la-ssub">\${sc} of \${u.qz.length} correct</div><button class="la-btn" onclick="retakeQuiz()">Retake</button></div>\` : ''}\`;
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
    let c = 'la-ob';
    if (show) { c += ' lk'; if (i === sel && cor) c += ' sc'; else if (i === sel && !cor) c += ' sw'; if (i === correct && !cor) c += ' rv'; }
    else if (unsub && i === sel) c += ' qs'; else if (sel !== undefined && !unsub) c += ' lk';
    return \`<button class="\${c}" onclick="answerQ('\${key}',\${i})" \${(show || (sel !== undefined && !unsub)) ? 'disabled' : ''}>\${o}</button>\`;
  }).join('');
  return \`<div class="la-qc \${show ? (cor ? 'gc' : 'bc') : ''}"><div class="la-qt">\${text}</div><div class="la-os">\${optsHtml}</div>\${show && expl ? \`<div class="la-ex">\${expl}</div>\` : ''}</div>\`;
}

function renderFootnotes(u) {
  if (!u.prs || !u.prs.length) return '';
  return \`<div class="la-fns"><h4>Prerequisite Footnotes</h4>\${u.prs.map(p => \`<div class="la-fni"><span class="la-fnm">[\${p.id}]</span> \${p.text}</div>\`).join('')}</div>\`;
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
  const u = LINEAR_ALGEBRA_CURRICULUM[STATE.currentUnit];
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
  const u = LINEAR_ALGEBRA_CURRICULUM[STATE.currentUnit];
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
