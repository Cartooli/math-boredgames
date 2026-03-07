#!/usr/bin/env node
/**
 * Build statistics.html from source curriculum HTML: inject deeperLinks,
 * wrap with site header/footer, use site styles + blue theme, add persistence.
 */
const fs = require('fs');
const path = require('path');

const srcPath = process.env.STATISTICS_SOURCE || '/Users/robn/Downloads/statistics-curriculum.html';
const outPath = path.join(__dirname, 'statistics.html');

const deeperLinks = [
  [{ label: 'Mean, Median, Mode', url: 'math/mean-average/walkthrough.html' }, { label: 'Standard Deviation', url: 'math/standard-deviation/walkthrough.html' }],
  [{ label: 'Histograms', url: 'math/histograms/walkthrough.html' }, { label: 'Box Plots', url: 'math/box-plots/walkthrough.html' }, { label: 'Scatter Plots', url: 'math/scatter-plots/walkthrough.html' }],
  [{ label: 'Probability Basics', url: 'math/probability-basics/walkthrough.html' }, { label: 'Conditional Probability', url: 'math/conditional-probability/walkthrough.html' }],
  [{ label: 'Expected Value', url: 'math/expected-value/walkthrough.html' }],
  [{ label: 'Normal Distribution', url: 'math/normal-distribution/walkthrough.html' }, { label: 'Binomial', url: 'math/combinations-and-permutations/walkthrough.html' }],
  [{ label: 'Central Limit Theorem', url: 'math/mean-average/walkthrough.html' }],
  [{ label: 'Confidence Intervals', url: 'math/mean-average/walkthrough.html' }],
  [{ label: 'Hypothesis Testing', url: 'math/statistical-questions/walkthrough.html' }],
  [{ label: 'Two-Sample t-Tests', url: 'math/statistics/walkthrough.html' }],
  [{ label: 'Chi-Square Tests', url: 'math/statistics/walkthrough.html' }],
  [{ label: 'ANOVA', url: 'math/statistics/walkthrough.html' }],
  [{ label: 'Regression & Correlation', url: 'math/regression-lines/walkthrough.html' }, { label: 'Scatter Plots', url: 'math/scatter-plots/walkthrough.html' }],
  [{ label: 'Nonparametric Tests', url: 'math/statistics/walkthrough.html' }, { label: 'Multiple Regression', url: 'math/regression-lines/walkthrough.html' }]
];

const src = fs.readFileSync(srcPath, 'utf8');
const arrayStart = src.indexOf('const D=[') + 8;
const arrayEnd = src.indexOf('\n];', arrayStart) + 3;
let arrStr = src.slice(arrayStart, arrayEnd);

// Inject deeperLinks: units 1-12 end with ]},\n// ═══════════ (8 equals)
let unitIndex = 0;
arrStr = arrStr.replace(/\]\},\n(\/\/ ═══════════[^\n]*)/g, (match, comment) => {
  const links = deeperLinks[unitIndex++] || [];
  return '],\n  deeperLinks: ' + JSON.stringify(links) + ',\n},\n' + comment;
});
// Last unit (13): ]}\n];
arrStr = arrStr.replace(/\]\}\n\];\s*$/, () => {
  const links = deeperLinks[unitIndex++] || [];
  return '],\n  deeperLinks: ' + JSON.stringify(links) + '\n}\n];';
});

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Statistics — Complete Curriculum | MathBored</title>
<meta name="description" content="Complete Statistics course: 13 units from descriptive statistics through probability, inference, regression, and nonparametric methods. Free interactive lessons, practice, and quizzes.">
<meta name="keywords" content="Statistics, probability, hypothesis testing, regression, ANOVA, confidence intervals, math, free, high school, college">
<link rel="canonical" href="https://math.boredgames.site/statistics.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://math.boredgames.site/statistics.html">
<meta property="og:title" content="Statistics — Complete Curriculum | MathBored">
<meta property="og:description" content="Complete Statistics course: 13 units from descriptive stats through inference, regression, and ANOVA.">
<meta property="og:image" content="https://math.boredgames.site/og-image.png">
<meta property="og:site_name" content="MathBored">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Course","name":"Statistics — Complete Curriculum","description":"Complete Statistics course: 13 units from descriptive statistics through probability, inference, regression, and nonparametric methods.","provider":{"@type":"Organization","name":"MathBored","url":"https://math.boredgames.site"},"educationalLevel":"High School, College","learningResourceType":"Course","inLanguage":"en","isAccessibleForFree":true}
</script>
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="stylesheet" href="styles.css">
<style>
/* Statistics — local styles (blue theme) */
.st-app { max-width: 960px; margin: 0 auto; padding: 20px; }
.st-back-link { display: inline-block; margin-bottom: 20px; color: #3d8ef0; text-decoration: none; font-weight: 600; }
.st-back-link:hover { opacity: 0.9; }
.st-hero { background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary)); border: 1px solid var(--border); border-radius: 20px; padding: 48px 28px 40px; text-align: center; margin-bottom: 32px; }
.st-hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; color: #2b6fc4; margin-bottom: 8px; }
.st-hero .sub { font-size: 0.9rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
.st-stats { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
.st-stat { background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 12px; padding: 14px 24px; }
.st-stat-num { font-size: 1.8rem; font-weight: 800; display: block; color: var(--text-primary); }
.st-stat-lbl { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.08em; }
.st-progress { background: var(--bg-secondary); border: 2px solid var(--border); border-radius: 14px; padding: 20px 24px; margin-bottom: 28px; }
.st-progress-bar { background: var(--bg-tertiary); border-radius: 20px; height: 10px; overflow: hidden; margin: 10px 0 6px; }
.st-progress-fill { height: 100%; background: linear-gradient(90deg, #2b6fc4, #3d8ef0); border-radius: 20px; transition: width 0.5s ease; }
.st-nav { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px; padding: 14px; background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border); }
.st-nav button { font-family: inherit; font-size: 0.75rem; font-weight: 700; padding: 6px 12px; border: 1px solid var(--border); border-radius: 6px; background: transparent; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
.st-nav button:hover { border-color: #3d8ef0; color: var(--text-primary); }
.st-nav button.on { background: #3d8ef0; color: #fff; border-color: #3d8ef0; }
.st-nav button.ok { border-color: var(--success); color: var(--success); }
.st-uhdr { margin-bottom: 22px; }
.st-unum { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: #3d8ef0; font-weight: 700; }
.st-utitle { font-size: clamp(1.4rem, 3.5vw, 2.2rem); font-weight: 800; margin: 4px 0 8px; }
.st-uobj { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.75; }
.st-deeper { background: var(--bg-secondary); border: 1px solid var(--border); border-left: 3px solid #3d8ef0; border-radius: 10px; padding: 14px 18px; margin-bottom: 20px; font-size: 0.86rem; }
.st-deeper .lbl { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: #3d8ef0; font-weight: 700; margin-bottom: 8px; }
.st-deeper a { display: inline-block; margin: 2px 6px 2px 0; padding: 4px 12px; border-radius: 6px; border: 1px solid var(--border); color: var(--text-secondary); text-decoration: none; font-size: 0.8rem; font-weight: 600; transition: all 0.2s; }
.st-deeper a:hover { border-color: #3d8ef0; color: #3d8ef0; background: rgba(61,142,240,0.1); }
.st-tabs { display: flex; gap: 4px; margin-bottom: 20px; border-bottom: 1px solid var(--border); }
.st-tb { font-family: inherit; font-size: 0.86rem; font-weight: 700; padding: 10px 20px; border: none; background: transparent; color: var(--text-secondary); cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
.st-tb:hover { color: var(--text-primary); }
.st-tb.on { color: #3d8ef0; border-bottom-color: #3d8ef0; }
.st-lcard { background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px; padding: 24px 26px; margin-bottom: 14px; }
.st-lcard h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; color: #3d8ef0; }
.st-lcard p { font-size: 0.9rem; margin-bottom: 8px; line-height: 1.7; }
.st-fm { background: var(--bg-tertiary); border-left: 3px solid #3d8ef0; border-radius: 6px; padding: 10px 14px; margin: 10px 0; font-family: var(--font-mono); font-size: 0.84rem; color: #5a9cf5; overflow-x: auto; }
.st-wex { background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; margin: 12px 0; }
.st-wex .wl { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--warning); font-weight: 700; margin-bottom: 6px; }
.st-wex .wp { font-weight: 600; margin-bottom: 4px; font-size: 0.88rem; }
.st-wex .ws { color: var(--text-secondary); font-size: 0.82rem; margin-bottom: 2px; }
.st-prbox { background: rgba(74,94,122,0.08); border: 1px solid rgba(74,94,122,0.2); border-left: 3px solid #4a5e7a; border-radius: 8px; padding: 12px 16px; margin: 12px 0; font-size: 0.84rem; }
.st-prbox .prt { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.15em; color: #4a5e7a; font-weight: 700; margin-bottom: 6px; }
.st-prbox p { color: var(--text-secondary); margin-bottom: 4px; }
.st-dtag { display: inline-block; font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; padding: 2px 8px; border-radius: 4px; margin-bottom: 8px; }
.st-de { background: rgba(16,185,129,0.12); color: var(--success); border: 1px solid rgba(16,185,129,0.25); }
.st-dm { background: rgba(245,158,11,0.12); color: var(--warning); border: 1px solid rgba(245,158,11,0.25); }
.st-dh { background: rgba(239,68,68,0.12); color: var(--error); border: 1px solid rgba(239,68,68,0.25); }
.st-qc { background: var(--bg-secondary); border: 2px solid var(--border); border-radius: 10px; padding: 18px 20px; margin-bottom: 12px; transition: border-color 0.3s; }
.st-qc.gc { border-color: var(--success); }
.st-qc.bc { border-color: var(--error); }
.st-qt { font-size: 0.9rem; margin-bottom: 12px; font-weight: 600; line-height: 1.6; }
.st-os { display: flex; flex-direction: column; gap: 6px; }
.st-ob { font-family: inherit; font-size: 0.86rem; text-align: left; padding: 10px 14px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-tertiary); color: var(--text-primary); cursor: pointer; transition: all 0.2s; }
.st-ob:hover:not(.lk) { border-color: #3d8ef0; background: rgba(61,142,240,0.08); }
.st-ob.sc { border-color: var(--success); background: rgba(16,185,129,0.12); color: var(--success); font-weight: 600; }
.st-ob.sw { border-color: var(--error); background: rgba(239,68,68,0.12); color: var(--error); }
.st-ob.rv { border-color: var(--success); background: rgba(16,185,129,0.08); }
.st-ob.lk { cursor: default; opacity: 0.75; }
.st-ob.qs { border-color: #3d8ef0; background: rgba(61,142,240,0.1); font-weight: 600; }
.st-ex { margin-top: 10px; padding: 10px 14px; background: var(--bg-tertiary); border-radius: 6px; font-size: 0.82rem; color: var(--text-secondary); border-left: 3px solid #3d8ef0; animation: stFade 0.3s ease; }
@keyframes stFade { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
.st-qhd { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.st-qct { font-family: var(--font-mono); font-size: 0.84rem; color: #3d8ef0; font-weight: 700; }
.st-qres { text-align: center; padding: 36px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px; margin-top: 18px; }
.st-sbig { font-size: 3rem; font-weight: 800; color: #3d8ef0; line-height: 1; margin-bottom: 4px; }
.st-ssub { color: var(--text-secondary); font-size: 0.88rem; }
.st-btn { font-family: inherit; font-size: 0.84rem; font-weight: 700; padding: 10px 22px; border: 1px solid #3d8ef0; border-radius: 8px; background: transparent; color: #3d8ef0; cursor: pointer; margin-top: 14px; transition: all 0.2s; }
.st-btn:hover { background: #3d8ef0; color: #fff; }
.st-bf { background: #3d8ef0; color: #fff; }
.st-bf:hover { background: #2b6fc4; }
.st-fns { margin-top: 32px; padding-top: 18px; border-top: 1px solid var(--border); }
.st-fns h4 { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.18em; color: #4a5e7a; margin-bottom: 10px; font-weight: 700; }
.st-fni { font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px; padding-left: 14px; }
.st-fnm { color: #4a5e7a; font-weight: 700; }
@media (max-width: 640px) { .st-app { padding: 12px; } .st-lcard, .st-qc { padding: 16px; } .st-nav button { font-size: 0.68rem; padding: 4px 8px; } }
</style>
</head>
<body>
<header>
  <div class="container">
    <div class="header-content">
      <div>
        <h1>🎯 MathBored</h1>
        <div class="tagline">Statistics — Complete Curriculum</div>
      </div>
    </div>
  </div>
</header>

<div class="st-app">
  <a href="index.html" class="st-back-link">← Back to Main App</a>

  <div class="st-hero">
    <h1>📊 Statistics</h1>
    <p class="sub">Complete Curriculum · 13 Units · Practice &amp; Quizzes</p>
    <div class="st-stats">
      <div class="st-stat"><span class="st-stat-num">13</span><span class="st-stat-lbl">Units</span></div>
      <div class="st-stat"><span class="st-stat-num">26</span><span class="st-stat-lbl">Lessons</span></div>
      <div class="st-stat"><span class="st-stat-num">81</span><span class="st-stat-lbl">Practice Qs</span></div>
      <div class="st-stat"><span class="st-stat-num">65</span><span class="st-stat-lbl">Quiz Qs</span></div>
    </div>
  </div>

  <div class="st-progress">
    <h2 style="margin:0 0 6px;font-size:1.1rem;font-weight:700;">Your Progress</h2>
    <p style="color:var(--text-secondary);font-size:0.88rem;margin:0;">
      <span id="stCompletedUnits">0</span> of 13 units completed · <span id="stProgressPct">0</span>% done
    </p>
    <div class="st-progress-bar">
      <div class="st-progress-fill" id="stProgressBar" style="width:0%"></div>
    </div>
  </div>

  <div id="stApp"></div>
</div>

<footer>
  <div class="container">
    <p>MathBored @ math.boredgames.site • Free forever • Community-driven development</p>
  </div>
</footer>

<script>
const STATISTICS_CURRICULUM = ${arrStr};

const STATE = { currentUnit: 0, currentTab: 'lesson', answers: {}, quizSubmitted: {}, completedUnits: new Set() };

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('statistics-progress') || '{}');
    if (saved.answers) STATE.answers = saved.answers;
    if (saved.quizSubmitted) STATE.quizSubmitted = saved.quizSubmitted;
    if (saved.completedUnits) STATE.completedUnits = new Set(saved.completedUnits);
  } catch (e) {}
}

function saveProgress() {
  try {
    localStorage.setItem('statistics-progress', JSON.stringify({
      answers: STATE.answers,
      quizSubmitted: STATE.quizSubmitted,
      completedUnits: Array.from(STATE.completedUnits)
    }));
  } catch (e) {}
}

function updateOverallProgress() {
  const count = STATE.completedUnits.size;
  const pct = Math.round((count / STATISTICS_CURRICULUM.length) * 100);
  document.getElementById('stCompletedUnits').textContent = count;
  document.getElementById('stProgressPct').textContent = pct;
  document.getElementById('stProgressBar').style.width = pct + '%';
}

function render() {
  const D = STATISTICS_CURRICULUM;
  const u = D[STATE.currentUnit];
  const app = document.getElementById('stApp');

  const navBtns = D.map((c, i) => {
    const on = i === STATE.currentUnit ? ' on' : '';
    const ok = STATE.completedUnits.has(i) ? ' ok' : '';
    return \`<button class="\${on}\${ok}" onclick="selectUnit(\${i})">\${STATE.completedUnits.has(i) ? '✓ ' : ''}U\${c.id}</button>\`;
  }).join('');

  const deeperHtml = (u.deeperLinks && u.deeperLinks.length) ? \`
    <div class="st-deeper">
      <div class="lbl">Go Deeper →</div>
      \${u.deeperLinks.map(l => \`<a href="\${l.url}">\${l.label}</a>\`).join('')}
    </div>\` : '';

  app.innerHTML = \`
    <div class="st-nav">\${navBtns}</div>
    <div class="st-uhdr">
      <div class="st-unum">Unit \${u.id} of 13</div>
      <div class="st-utitle">\${u.title}</div>
      <div class="st-uobj">\${u.obj}</div>
    </div>
    \${deeperHtml}
    <div class="st-tabs">
      <button class="st-tb \${STATE.currentTab === 'lesson' ? 'on' : ''}" onclick="setTab('lesson')">Lessons</button>
      <button class="st-tb \${STATE.currentTab === 'practice' ? 'on' : ''}" onclick="setTab('practice')">Practice</button>
      <button class="st-tb \${STATE.currentTab === 'quiz' ? 'on' : ''}" onclick="setTab('quiz')">Unit Quiz</button>
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
    <div class="st-lcard">
      <h3>\${l.t}</h3>
      <p>\${l.c}</p>
      \${l.f.map(f => \`<div class="st-fm">\${f}</div>\`).join('')}
      \${l.ex ? \`<div class="st-wex"><div class="wl">Worked Example</div><div class="wp">\${l.ex.p}</div>\${l.ex.s.map(s => \`<div class="ws">→ \${s}</div>\`).join('')}</div>\` : ''}
    </div>\`).join('') + \`
    <div class="st-prbox"><div class="prt">Prerequisite Knowledge</div>\${u.prs.map(p => \`<p><b>[\${p.id}]</b> \${p.text}</p>\`).join('')}</div>\`;
}

function renderPractice(u) {
  return ['easy','medium','hard'].map(d => {
    const qs = u.pr.filter(q => q.d === d);
    if (!qs.length) return '';
    const cls = d === 'easy' ? 'st-de' : d === 'medium' ? 'st-dm' : 'st-dh';
    return \`<div style="margin-bottom:8px"><span class="st-dtag \${cls}">\${d}</span></div>
      \${qs.map(q => renderQ(q, \`\${STATE.currentUnit}-p-\${u.pr.indexOf(q)}\`, false)).join('')}\`;
  }).join('');
}

function renderQuiz(u) {
  const key = \`\${STATE.currentUnit}-qz\`;
  const sub = STATE.quizSubmitted[key];
  let sc = 0;
  if (sub) u.qz.forEach((q, i) => { if (STATE.answers[\`\${STATE.currentUnit}-q-\${i}\`] === q.c) sc++; });
  return \`
    <div class="st-qhd">
      <h3 style="font-size:1.15rem;font-weight:700;">Unit \${u.id} Quiz</h3>
      <div class="st-qct">\${sub ? sc + '/' + u.qz.length : u.qz.length + ' questions'}</div>
    </div>
    \${u.qz.map((q, i) => renderQ(q, \`\${STATE.currentUnit}-q-\${i}\`, sub)).join('')}
    \${!sub ? \`<button class="st-btn st-bf" onclick="submitQuiz()">Submit Quiz</button>\` : ''}
    \${sub ? \`<div class="st-qres"><div class="st-sbig">\${Math.round(sc/u.qz.length*100)}%</div><div class="st-ssub">\${sc} of \${u.qz.length} correct</div><button class="st-btn" onclick="retakeQuiz()">Retake</button></div>\` : ''}\`;
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
    let c = 'st-ob';
    if (show) { c += ' lk'; if (i === sel && cor) c += ' sc'; else if (i === sel && !cor) c += ' sw'; if (i === correct && !cor) c += ' rv'; }
    else if (unsub && i === sel) c += ' qs'; else if (sel !== undefined && !unsub) c += ' lk';
    return \`<button class="\${c}" onclick="answerQ('\${key}',\${i})" \${(show || (sel !== undefined && !unsub)) ? 'disabled' : ''}>\${o}</button>\`;
  }).join('');
  return \`<div class="st-qc \${show ? (cor ? 'gc' : 'bc') : ''}"><div class="st-qt">\${text}</div><div class="st-os">\${optsHtml}</div>\${show && expl ? \`<div class="st-ex">\${expl}</div>\` : ''}</div>\`;
}

function renderFootnotes(u) {
  if (!u.prs || !u.prs.length) return '';
  return \`<div class="st-fns"><h4>Prerequisite Footnotes</h4>\${u.prs.map(p => \`<div class="st-fni"><span class="st-fnm">[\${p.id}]</span> \${p.text}</div>\`).join('')}</div>\`;
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
  const u = STATISTICS_CURRICULUM[STATE.currentUnit];
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
  const u = STATISTICS_CURRICULUM[STATE.currentUnit];
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
