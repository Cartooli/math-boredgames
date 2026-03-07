#!/usr/bin/env node
/**
 * Build number-theory.html from source curriculum HTML: inject deeperLinks,
 * wrap with site header/footer, use site styles + wine theme, add persistence.
 */
const fs = require('fs');
const path = require('path');

const srcPath = process.env.NUMBER_THEORY_SOURCE || '/Users/robn/Downloads/number-theory-curriculum.html';
const outPath = path.join(__dirname, 'number-theory.html');

const deeperLinks = [
  [{ label: 'Divisibility', url: 'math/divisibility/walkthrough.html' }, { label: 'Division Algorithm', url: 'math/division-algorithm/walkthrough.html' }],
  [{ label: 'Greatest Common Divisor', url: 'math/greatest-common-divisor/walkthrough.html' }, { label: 'Euclidean Algorithm', url: 'math/euclidean-algorithm/walkthrough.html' }],
  [{ label: 'Prime Numbers', url: 'math/prime-numbers/walkthrough.html' }, { label: 'Prime Factorization', url: 'math/prime-factorization/walkthrough.html' }],
  [{ label: 'Modular Arithmetic', url: 'math/modular-arithmetic/walkthrough.html' }],
  [{ label: 'Linear Congruences', url: 'math/linear-congruences/walkthrough.html' }, { label: 'Chinese Remainder Theorem', url: 'math/chinese-remainder-theorem/walkthrough.html' }],
  [{ label: "Fermat's Little Theorem", url: 'math/fermats-little-theorem/walkthrough.html' }, { label: "Euler's Theorem", url: 'math/eulers-theorem/walkthrough.html' }],
  [{ label: 'Multiplicative Functions', url: 'math/multiplicative-functions/walkthrough.html' }, { label: 'Perfect Numbers', url: 'math/perfect-numbers/walkthrough.html' }],
  [{ label: 'Primitive Roots', url: 'math/primitive-roots/walkthrough.html' }, { label: 'Discrete Logarithm', url: 'math/discrete-logarithm/walkthrough.html' }],
  [{ label: 'Quadratic Residues', url: 'math/quadratic-residues/walkthrough.html' }, { label: 'Legendre Symbol', url: 'math/legendre-symbol/walkthrough.html' }],
  [{ label: 'Quadratic Reciprocity', url: 'math/quadratic-reciprocity/walkthrough.html' }],
  [{ label: 'Continued Fractions', url: 'math/continued-fractions/walkthrough.html' }, { label: 'Diophantine Equations', url: 'math/diophantine-equations/walkthrough.html' }],
  [{ label: 'RSA Encryption', url: 'math/rsa-encryption/walkthrough.html' }, { label: 'Diffie-Hellman', url: 'math/diffie-hellman/walkthrough.html' }]
];

const src = fs.readFileSync(srcPath, 'utf8');
const arrayStart = src.indexOf('const D=[') + 8;
const arrayEnd = src.indexOf('\n];', arrayStart) + 3;
let arrStr = src.slice(arrayStart, arrayEnd);

// Inject deeperLinks: units 1-11 end with ]},\n// ═══════════ (8 equals)
let unitIndex = 0;
arrStr = arrStr.replace(/\]\},\n(\/\/ ═══════════[^\n]*)/g, (match, comment) => {
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
<title>Number Theory — Complete Curriculum | MathBored</title>
<meta name="description" content="Complete Number Theory course: 12 units from divisibility through primes, modular arithmetic, quadratic reciprocity, and cryptography. Free interactive lessons, practice, and quizzes.">
<meta name="keywords" content="Number theory, primes, modular arithmetic, GCD, RSA, quadratic reciprocity, math, free, college">
<link rel="canonical" href="https://math.boredgames.site/number-theory.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://math.boredgames.site/number-theory.html">
<meta property="og:title" content="Number Theory — Complete Curriculum | MathBored">
<meta property="og:description" content="Complete Number Theory course: 12 units from divisibility through primes, modular arithmetic, and cryptography.">
<meta property="og:image" content="https://math.boredgames.site/og-image.png">
<meta property="og:site_name" content="MathBored">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Course","name":"Number Theory — Complete Curriculum","description":"Complete Number Theory course: 12 units from divisibility through primes, modular arithmetic, quadratic reciprocity, and cryptography.","provider":{"@type":"Organization","name":"MathBored","url":"https://math.boredgames.site"},"educationalLevel":"College","learningResourceType":"Course","inLanguage":"en","isAccessibleForFree":true}
</script>
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="stylesheet" href="styles.css">
<style>
/* Number Theory — local styles (wine theme) */
.nt-app { max-width: 960px; margin: 0 auto; padding: 20px; }
.back-link { display: inline-block; margin-bottom: 20px; color: #7a2e3a; text-decoration: none; font-weight: 600; }
.back-link:hover { opacity: 0.9; }
.nt-hero { background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary)); border: 1px solid var(--border); border-radius: 20px; padding: 48px 28px 40px; text-align: center; margin-bottom: 32px; }
.nt-hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; color: #5e2230; margin-bottom: 8px; }
.nt-hero .sub { font-size: 0.9rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
.nt-stats { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
.nt-stat { background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 12px; padding: 14px 24px; }
.nt-stat-num { font-size: 1.8rem; font-weight: 800; display: block; color: var(--text-primary); }
.nt-stat-lbl { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.08em; }
.nt-progress { background: var(--bg-secondary); border: 2px solid var(--border); border-radius: 14px; padding: 20px 24px; margin-bottom: 28px; }
.nt-progress-bar { background: var(--bg-tertiary); border-radius: 20px; height: 10px; overflow: hidden; margin: 10px 0 6px; }
.nt-progress-fill { height: 100%; background: linear-gradient(90deg, #5e2230, #7a2e3a); border-radius: 20px; transition: width 0.5s ease; }
.nt-nav { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px; padding: 14px; background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border); }
.nt-nav button { font-family: inherit; font-size: 0.75rem; font-weight: 700; padding: 6px 12px; border: 1px solid var(--border); border-radius: 6px; background: transparent; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
.nt-nav button:hover { border-color: #7a2e3a; color: var(--text-primary); }
.nt-nav button.on { background: #7a2e3a; color: #fff; border-color: #7a2e3a; }
.nt-nav button.ok { border-color: var(--success); color: var(--success); }
.nt-uhdr { margin-bottom: 22px; }
.nt-unum { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: #7a2e3a; font-weight: 700; }
.nt-utitle { font-size: clamp(1.4rem, 3.5vw, 2.2rem); font-weight: 800; margin: 4px 0 8px; }
.nt-uobj { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.75; }
.nt-deeper { background: var(--bg-secondary); border: 1px solid var(--border); border-left: 3px solid #7a2e3a; border-radius: 10px; padding: 14px 18px; margin-bottom: 20px; font-size: 0.86rem; }
.nt-deeper .lbl { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: #7a2e3a; font-weight: 700; margin-bottom: 8px; }
.nt-deeper a { display: inline-block; margin: 2px 6px 2px 0; padding: 4px 12px; border-radius: 6px; border: 1px solid var(--border); color: var(--text-secondary); text-decoration: none; font-size: 0.8rem; font-weight: 600; transition: all 0.2s; }
.nt-deeper a:hover { border-color: #7a2e3a; color: #7a2e3a; background: rgba(122,46,58,0.1); }
.nt-tabs { display: flex; gap: 4px; margin-bottom: 20px; border-bottom: 1px solid var(--border); }
.nt-tb { font-family: inherit; font-size: 0.86rem; font-weight: 700; padding: 10px 20px; border: none; background: transparent; color: var(--text-secondary); cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
.nt-tb:hover { color: var(--text-primary); }
.nt-tb.on { color: #7a2e3a; border-bottom-color: #7a2e3a; }
.nt-lcard { background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px; padding: 24px 26px; margin-bottom: 14px; }
.nt-lcard h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; color: #7a2e3a; }
.nt-lcard p { font-size: 0.9rem; margin-bottom: 8px; line-height: 1.7; }
.nt-fm { background: var(--bg-tertiary); border-left: 3px solid #7a2e3a; border-radius: 6px; padding: 10px 14px; margin: 10px 0; font-family: var(--font-mono); font-size: 0.84rem; color: #a34a5a; overflow-x: auto; }
.nt-wex { background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; margin: 12px 0; }
.nt-wex .wl { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--warning); font-weight: 700; margin-bottom: 6px; }
.nt-wex .wp { font-weight: 600; margin-bottom: 4px; font-size: 0.88rem; }
.nt-wex .ws { color: var(--text-secondary); font-size: 0.82rem; margin-bottom: 2px; }
.nt-prbox { background: rgba(74,94,122,0.08); border: 1px solid rgba(74,94,122,0.2); border-left: 3px solid #4a5e7a; border-radius: 8px; padding: 12px 16px; margin: 12px 0; font-size: 0.84rem; }
.nt-prbox .prt { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.15em; color: #4a5e7a; font-weight: 700; margin-bottom: 6px; }
.nt-prbox p { color: var(--text-secondary); margin-bottom: 4px; }
.nt-dtag { display: inline-block; font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; padding: 2px 8px; border-radius: 4px; margin-bottom: 8px; }
.nt-de { background: rgba(16,185,129,0.12); color: var(--success); border: 1px solid rgba(16,185,129,0.25); }
.nt-dm { background: rgba(245,158,11,0.12); color: var(--warning); border: 1px solid rgba(245,158,11,0.25); }
.nt-dh { background: rgba(239,68,68,0.12); color: var(--error); border: 1px solid rgba(239,68,68,0.25); }
.nt-qc { background: var(--bg-secondary); border: 2px solid var(--border); border-radius: 10px; padding: 18px 20px; margin-bottom: 12px; transition: border-color 0.3s; }
.nt-qc.gc { border-color: var(--success); }
.nt-qc.bc { border-color: var(--error); }
.nt-qt { font-size: 0.9rem; margin-bottom: 12px; font-weight: 600; line-height: 1.6; }
.nt-os { display: flex; flex-direction: column; gap: 6px; }
.nt-ob { font-family: inherit; font-size: 0.86rem; text-align: left; padding: 10px 14px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-tertiary); color: var(--text-primary); cursor: pointer; transition: all 0.2s; }
.nt-ob:hover:not(.lk) { border-color: #7a2e3a; background: rgba(122,46,58,0.08); }
.nt-ob.sc { border-color: var(--success); background: rgba(16,185,129,0.12); color: var(--success); font-weight: 600; }
.nt-ob.sw { border-color: var(--error); background: rgba(239,68,68,0.12); color: var(--error); }
.nt-ob.rv { border-color: var(--success); background: rgba(16,185,129,0.08); }
.nt-ob.lk { cursor: default; opacity: 0.75; }
.nt-ob.qs { border-color: #7a2e3a; background: rgba(122,46,58,0.1); font-weight: 600; }
.nt-ex { margin-top: 10px; padding: 10px 14px; background: var(--bg-tertiary); border-radius: 6px; font-size: 0.82rem; color: var(--text-secondary); border-left: 3px solid #7a2e3a; animation: ntFade 0.3s ease; }
@keyframes ntFade { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
.nt-qhd { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.nt-qct { font-family: var(--font-mono); font-size: 0.84rem; color: #7a2e3a; font-weight: 700; }
.nt-qres { text-align: center; padding: 36px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px; margin-top: 18px; }
.nt-sbig { font-size: 3rem; font-weight: 800; color: #7a2e3a; line-height: 1; margin-bottom: 4px; }
.nt-ssub { color: var(--text-secondary); font-size: 0.88rem; }
.nt-btn { font-family: inherit; font-size: 0.84rem; font-weight: 700; padding: 10px 22px; border: 1px solid #7a2e3a; border-radius: 8px; background: transparent; color: #7a2e3a; cursor: pointer; margin-top: 14px; transition: all 0.2s; }
.nt-btn:hover { background: #7a2e3a; color: #fff; }
.nt-bf { background: #7a2e3a; color: #fff; }
.nt-bf:hover { background: #5e2230; }
.nt-fns { margin-top: 32px; padding-top: 18px; border-top: 1px solid var(--border); }
.nt-fns h4 { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.18em; color: #4a5e7a; margin-bottom: 10px; font-weight: 700; }
.nt-fni { font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px; padding-left: 14px; }
.nt-fnm { color: #4a5e7a; font-weight: 700; }
@media (max-width: 640px) { .nt-app { padding: 12px; } .nt-lcard, .nt-qc { padding: 16px; } .nt-nav button { font-size: 0.68rem; padding: 4px 8px; } }
</style>
</head>
<body>
<header>
  <div class="container">
    <div class="header-content">
      <div>
        <h1>🎯 MathBored</h1>
        <div class="tagline">Number Theory — Complete Curriculum</div>
      </div>
    </div>
  </div>
</header>

<div class="nt-app">
  <a href="index.html" class="back-link">← Back to Main App</a>

  <div class="nt-hero">
    <h1>∞ Number Theory</h1>
    <p class="sub">Complete Curriculum · 12 Units · Practice &amp; Quizzes</p>
    <div class="nt-stats">
      <div class="nt-stat"><span class="nt-stat-num">12</span><span class="nt-stat-lbl">Units</span></div>
      <div class="nt-stat"><span class="nt-stat-num">24</span><span class="nt-stat-lbl">Lessons</span></div>
      <div class="nt-stat"><span class="nt-stat-num">84</span><span class="nt-stat-lbl">Practice Qs</span></div>
      <div class="nt-stat"><span class="nt-stat-num">60</span><span class="nt-stat-lbl">Quiz Qs</span></div>
    </div>
  </div>

  <div class="nt-progress">
    <h2 style="margin:0 0 6px;font-size:1.1rem;font-weight:700;">Your Progress</h2>
    <p style="color:var(--text-secondary);font-size:0.88rem;margin:0;">
      <span id="ntCompletedUnits">0</span> of 12 units completed · <span id="ntProgressPct">0</span>% done
    </p>
    <div class="nt-progress-bar">
      <div class="nt-progress-fill" id="ntProgressBar" style="width:0%"></div>
    </div>
  </div>

  <div id="ntApp"></div>
</div>

<footer>
  <div class="container">
    <p>MathBored @ math.boredgames.site • Free forever • Community-driven development</p>
  </div>
</footer>

<script>
const NUMBER_THEORY_CURRICULUM = ${arrStr};

const STATE = { currentUnit: 0, currentTab: 'lesson', answers: {}, quizSubmitted: {}, completedUnits: new Set() };

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('number-theory-progress') || '{}');
    if (saved.answers) STATE.answers = saved.answers;
    if (saved.quizSubmitted) STATE.quizSubmitted = saved.quizSubmitted;
    if (saved.completedUnits) STATE.completedUnits = new Set(saved.completedUnits);
  } catch (e) {}
}

function saveProgress() {
  try {
    localStorage.setItem('number-theory-progress', JSON.stringify({
      answers: STATE.answers,
      quizSubmitted: STATE.quizSubmitted,
      completedUnits: Array.from(STATE.completedUnits)
    }));
  } catch (e) {}
}

function updateOverallProgress() {
  const count = STATE.completedUnits.size;
  const pct = Math.round((count / NUMBER_THEORY_CURRICULUM.length) * 100);
  document.getElementById('ntCompletedUnits').textContent = count;
  document.getElementById('ntProgressPct').textContent = pct;
  document.getElementById('ntProgressBar').style.width = pct + '%';
}

function render() {
  const D = NUMBER_THEORY_CURRICULUM;
  const u = D[STATE.currentUnit];
  const app = document.getElementById('ntApp');

  const navBtns = D.map((c, i) => {
    const on = i === STATE.currentUnit ? ' on' : '';
    const ok = STATE.completedUnits.has(i) ? ' ok' : '';
    return \`<button class="\${on}\${ok}" onclick="selectUnit(\${i})">\${STATE.completedUnits.has(i) ? '✓ ' : ''}U\${c.id}</button>\`;
  }).join('');

  const deeperHtml = (u.deeperLinks && u.deeperLinks.length) ? \`
    <div class="nt-deeper">
      <div class="lbl">Go Deeper →</div>
      \${u.deeperLinks.map(l => \`<a href="\${l.url}">\${l.label}</a>\`).join('')}
    </div>\` : '';

  app.innerHTML = \`
    <div class="nt-nav">\${navBtns}</div>
    <div class="nt-uhdr">
      <div class="nt-unum">Unit \${u.id} of 12</div>
      <div class="nt-utitle">\${u.title}</div>
      <div class="nt-uobj">\${u.obj}</div>
    </div>
    \${deeperHtml}
    <div class="nt-tabs">
      <button class="nt-tb \${STATE.currentTab === 'lesson' ? 'on' : ''}" onclick="setTab('lesson')">Lessons</button>
      <button class="nt-tb \${STATE.currentTab === 'practice' ? 'on' : ''}" onclick="setTab('practice')">Practice</button>
      <button class="nt-tb \${STATE.currentTab === 'quiz' ? 'on' : ''}" onclick="setTab('quiz')">Unit Quiz</button>
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
    <div class="nt-lcard">
      <h3>\${l.t}</h3>
      <p>\${l.c}</p>
      \${l.f.map(f => \`<div class="nt-fm">\${f}</div>\`).join('')}
      \${l.ex ? \`<div class="nt-wex"><div class="wl">Worked Example</div><div class="wp">\${l.ex.p}</div>\${l.ex.s.map(s => \`<div class="ws">→ \${s}</div>\`).join('')}</div>\` : ''}
    </div>\`).join('') + \`
    <div class="nt-prbox"><div class="prt">Prerequisite Knowledge</div>\${u.prs.map(p => \`<p><b>[\${p.id}]</b> \${p.text}</p>\`).join('')}</div>\`;
}

function renderPractice(u) {
  return ['easy','medium','hard'].map(d => {
    const qs = u.pr.filter(q => q.d === d);
    if (!qs.length) return '';
    const cls = d === 'easy' ? 'nt-de' : d === 'medium' ? 'nt-dm' : 'nt-dh';
    return \`<div style="margin-bottom:8px"><span class="nt-dtag \${cls}">\${d}</span></div>
      \${qs.map(q => renderQ(q, \`\${STATE.currentUnit}-p-\${u.pr.indexOf(q)}\`, false)).join('')}\`;
  }).join('');
}

function renderQuiz(u) {
  const key = \`\${STATE.currentUnit}-qz\`;
  const sub = STATE.quizSubmitted[key];
  let sc = 0;
  if (sub) u.qz.forEach((q, i) => { if (STATE.answers[\`\${STATE.currentUnit}-q-\${i}\`] === q.c) sc++; });
  return \`
    <div class="nt-qhd">
      <h3 style="font-size:1.15rem;font-weight:700;">Unit \${u.id} Quiz</h3>
      <div class="nt-qct">\${sub ? sc + '/' + u.qz.length : u.qz.length + ' questions'}</div>
    </div>
    \${u.qz.map((q, i) => renderQ(q, \`\${STATE.currentUnit}-q-\${i}\`, sub)).join('')}
    \${!sub ? \`<button class="nt-btn nt-bf" onclick="submitQuiz()">Submit Quiz</button>\` : ''}
    \${sub ? \`<div class="nt-qres"><div class="nt-sbig">\${Math.round(sc/u.qz.length*100)}%</div><div class="nt-ssub">\${sc} of \${u.qz.length} correct</div><button class="nt-btn" onclick="retakeQuiz()">Retake</button></div>\` : ''}\`;
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
    let c = 'nt-ob';
    if (show) { c += ' lk'; if (i === sel && cor) c += ' sc'; else if (i === sel && !cor) c += ' sw'; if (i === correct && !cor) c += ' rv'; }
    else if (unsub && i === sel) c += ' qs'; else if (sel !== undefined && !unsub) c += ' lk';
    return \`<button class="\${c}" onclick="answerQ('\${key}',\${i})" \${(show || (sel !== undefined && !unsub)) ? 'disabled' : ''}>\${o}</button>\`;
  }).join('');
  return \`<div class="nt-qc \${show ? (cor ? 'gc' : 'bc') : ''}"><div class="nt-qt">\${text}</div><div class="nt-os">\${optsHtml}</div>\${show && expl ? \`<div class="nt-ex">\${expl}</div>\` : ''}</div>\`;
}

function renderFootnotes(u) {
  if (!u.prs || !u.prs.length) return '';
  return \`<div class="nt-fns"><h4>Prerequisite Footnotes</h4>\${u.prs.map(p => \`<div class="nt-fni"><span class="nt-fnm">[\${p.id}]</span> \${p.text}</div>\`).join('')}</div>\`;
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
  const u = NUMBER_THEORY_CURRICULUM[STATE.currentUnit];
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
  const u = NUMBER_THEORY_CURRICULUM[STATE.currentUnit];
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
