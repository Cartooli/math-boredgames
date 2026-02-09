// ============================================================
// MathBored Growth Engine
// All 30 viral/growth features, each gated behind feature flags.
// Include feature-flags.js BEFORE this file.
// ============================================================

(function () {
    'use strict';

    const SITE = 'https://math.boredgames.site';
    const flag = window.flagEnabled || (() => false);

    // ── Utility helpers ─────────────────────────────────────────

    function showToast(message, type) {
        // Reuse app toast if available, else create standalone
        if (window.app && typeof window.app.showToast === 'function') {
            window.app.showToast(message, type);
            return;
        }
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        const t = document.createElement('div');
        t.className = 'toast toast-' + (type || 'info');
        const icons = { success: '\u2705', error: '\u274c', warning: '\u26a0\ufe0f', info: '\u2139\ufe0f' };
        t.innerHTML = '<div style="display:flex;align-items:center;gap:10px;"><span style="font-size:1.5rem;">' +
            (icons[type] || icons.info) + '</span><span style="flex:1;">' + message + '</span></div>';
        document.body.appendChild(t);
        setTimeout(() => t.classList.add('show'), 10);
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
    }

    function getStats() {
        try {
            const main = JSON.parse(localStorage.getItem('mathBoredStats') || '{}');
            const map = JSON.parse(localStorage.getItem('mapPrepStats') || '{}');
            return {
                score: main.score || 0,
                streak: main.streak || map.currentStreak || 0,
                bestStreak: main.bestStreak || map.bestStreak || 0,
                totalAttempts: main.totalAttempts || map.totalAnswered || 0,
                correctAnswers: main.correctAnswers || map.correct || 0,
                accuracy: (main.totalAttempts || map.totalAnswered)
                    ? Math.round(((main.correctAnswers || map.correct || 0) /
                        (main.totalAttempts || map.totalAnswered)) * 100) : 0,
            };
        } catch (e) { return { score: 0, streak: 0, bestStreak: 0, totalAttempts: 0, correctAnswers: 0, accuracy: 0 }; }
    }

    function getDayNumber() {
        const epoch = new Date('2024-01-01').getTime();
        return Math.floor((Date.now() - epoch) / 86400000);
    }

    function seededRandom(seed) {
        let s = seed;
        return function () {
            s = (s * 16807 + 0) % 2147483647;
            return (s - 1) / 2147483646;
        };
    }

    function encodeChallenge(data) {
        return btoa(JSON.stringify(data)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    }

    function decodeChallenge(str) {
        try {
            let s = str.replace(/-/g, '+').replace(/_/g, '/');
            while (s.length % 4) s += '=';
            return JSON.parse(atob(s));
        } catch (e) { return null; }
    }

    // Record daily activity for heatmap
    function recordDailyActivity() {
        try {
            const today = new Date().toISOString().slice(0, 10);
            const heatmap = JSON.parse(localStorage.getItem('mb_heatmap') || '{}');
            heatmap[today] = (heatmap[today] || 0) + 1;
            localStorage.setItem('mb_heatmap', JSON.stringify(heatmap));
        } catch (e) { /* ignore */ }
    }

    // ══════════════════════════════════════════════════════════════
    // #3 — Web Share API (native share on mobile)
    // ══════════════════════════════════════════════════════════════
    function initWebShare() {
        if (!flag('webShare')) return;

        // Enhance any existing share buttons and add new ones
        document.addEventListener('click', function (e) {
            const btn = e.target.closest('[data-growth-share]');
            if (!btn) return;
            e.preventDefault();
            const title = btn.dataset.shareTitle || 'MathBored';
            const text = btn.dataset.shareText || 'Check out MathBored — free math practice!';
            const url = btn.dataset.shareUrl || window.location.href;

            if (navigator.share) {
                navigator.share({ title: title, text: text, url: url }).catch(() => { });
            } else {
                navigator.clipboard.writeText(text + ' ' + url).then(() => {
                    showToast('Copied to clipboard!', 'success');
                }).catch(() => { });
            }
        });
    }

    // ══════════════════════════════════════════════════════════════
    // #1 — Daily Challenge with Wordle-style share
    // ══════════════════════════════════════════════════════════════
    function initDailyChallenge() {
        if (!flag('dailyChallenge')) return;

        const dayNum = getDayNumber();
        const rng = seededRandom(dayNum * 7919);

        // Daily topics pool
        const topics = [
            'Fractions', 'Percentages', 'Ratios', 'Algebra', 'Geometry',
            'Decimals', 'Order of Operations', 'Exponents', 'Integers', 'Measurement',
            'Area & Perimeter', 'Place Value', 'Division', 'Multiplication', 'Probability'
        ];
        const difficulties = ['Easy', 'Medium', 'Hard'];
        const todayTopic = topics[Math.floor(rng() * topics.length)];
        const todayDiff = difficulties[Math.floor(rng() * difficulties.length)];

        window.MBDaily = {
            dayNum: dayNum,
            topic: todayTopic,
            difficulty: todayDiff,
            startTime: null,
            endTime: null,
            attempts: [],
            solved: false,

            start() {
                this.startTime = Date.now();
                // Store in localStorage so we know if user already did today's
                const key = 'mb_daily_' + dayNum;
                const existing = localStorage.getItem(key);
                if (existing) {
                    const data = JSON.parse(existing);
                    if (data.solved) {
                        this.solved = true;
                        this.attempts = data.attempts;
                        this.endTime = data.endTime;
                    }
                }
            },

            recordAttempt(correct) {
                this.attempts.push(correct);
                if (correct) {
                    this.solved = true;
                    this.endTime = Date.now();
                }
                localStorage.setItem('mb_daily_' + dayNum, JSON.stringify({
                    solved: this.solved,
                    attempts: this.attempts,
                    endTime: this.endTime,
                    startTime: this.startTime
                }));
            },

            getShareText() {
                const elapsed = this.endTime && this.startTime
                    ? Math.round((this.endTime - this.startTime) / 1000) : '?';
                const blocks = this.attempts.map(c => c ? '\ud83d\udfe9' : '\u2b1b').join('');
                const streak = this.getStreak();
                return 'MathBored Daily #' + dayNum + '\n' +
                    'Topic: ' + todayTopic + ' | ' + todayDiff + '\n' +
                    blocks + ' Solved in ' + elapsed + 's\n' +
                    (streak > 1 ? '\ud83d\udd25 Streak: ' + streak + ' days\n' : '') +
                    SITE + '/daily.html';
            },

            getStreak() {
                let streak = 0;
                for (let d = dayNum; d >= 0; d--) {
                    const data = localStorage.getItem('mb_daily_' + d);
                    if (data && JSON.parse(data).solved) {
                        streak++;
                    } else break;
                }
                return streak;
            },

            copyShare() {
                const text = this.getShareText();
                if (navigator.share && flag('webShare')) {
                    navigator.share({ title: 'MathBored Daily #' + dayNum, text: text }).catch(() => { });
                } else {
                    navigator.clipboard.writeText(text).then(() => {
                        showToast('Results copied! Paste to share.', 'success');
                    }).catch(() => { });
                }
            }
        };

        // Inject daily challenge banner on main pages
        injectDailyBanner();
    }

    function injectDailyBanner() {
        const container = document.querySelector('.map-prep-container') ||
            document.querySelector('#contentArea') ||
            document.querySelector('main') ||
            document.querySelector('.container');
        if (!container) return;

        const dayNum = getDayNumber();
        const existing = localStorage.getItem('mb_daily_' + dayNum);
        const done = existing && JSON.parse(existing).solved;

        const banner = document.createElement('div');
        banner.className = 'growth-daily-banner';
        banner.innerHTML =
            '<div class="growth-daily-inner">' +
            '<div class="growth-daily-left">' +
            '<span class="growth-daily-icon">' + (done ? '\ud83c\udfc6' : '\ud83c\udfaf') + '</span>' +
            '<div>' +
            '<strong>Daily Challenge #' + dayNum + '</strong>' +
            '<span class="growth-daily-topic">' + (window.MBDaily ? window.MBDaily.topic : '') + '</span>' +
            '</div>' +
            '</div>' +
            (done
                ? '<button class="growth-btn growth-btn-secondary" onclick="window.MBDaily && window.MBDaily.copyShare()">Share Results</button>'
                : '<a href="daily.html" class="growth-btn growth-btn-primary">Play Now</a>') +
            '</div>';
        container.insertBefore(banner, container.firstChild);
    }

    // ══════════════════════════════════════════════════════════════
    // #2 — Challenge-a-Friend encoded URLs
    // ══════════════════════════════════════════════════════════════
    function initChallengeFriend() {
        if (!flag('challengeFriend')) return;

        // Check URL for incoming challenge
        const params = new URLSearchParams(window.location.search);
        const ch = params.get('challenge');
        if (ch) {
            const data = decodeChallenge(ch);
            if (data) {
                setTimeout(() => {
                    showChallengeBanner(data);
                }, 1000);
            }
        }

        // Expose challenge creator
        window.MBChallenge = {
            create(topic, score, total, name) {
                const payload = { t: topic, s: score, n: total, by: name || 'Someone', ts: Date.now() };
                const encoded = encodeChallenge(payload);
                const url = window.location.origin + window.location.pathname + '?challenge=' + encoded;
                return url;
            },

            share(topic, score, total, name) {
                const url = this.create(topic, score, total, name);
                const text = (name || 'Someone') + ' scored ' + score + '/' + total +
                    ' on ' + topic + ' \u2014 can you beat them?\n' + url;

                if (navigator.share && flag('webShare')) {
                    navigator.share({ title: 'Math Challenge', text: text, url: url }).catch(() => { });
                } else {
                    navigator.clipboard.writeText(text).then(() => {
                        showToast('Challenge link copied!', 'success');
                    }).catch(() => { });
                }
            }
        };
    }

    function showChallengeBanner(data) {
        const banner = document.createElement('div');
        banner.className = 'growth-challenge-banner';
        banner.innerHTML =
            '<div class="growth-challenge-inner">' +
            '<span class="growth-challenge-icon">\u2694\ufe0f</span>' +
            '<div class="growth-challenge-text">' +
            '<strong>' + (data.by || 'Someone') + ' challenges you!</strong>' +
            '<span>They scored ' + data.s + '/' + data.n + ' on ' + (data.t || 'Math') + '</span>' +
            '</div>' +
            '<button class="growth-btn growth-btn-primary" onclick="this.closest(\'.growth-challenge-banner\').remove()">Accept Challenge</button>' +
            '</div>';
        document.body.prepend(banner);
    }

    // ══════════════════════════════════════════════════════════════
    // #4 — Clipboard "Parent Text" Message
    // ══════════════════════════════════════════════════════════════
    function initClipboardParentText() {
        if (!flag('clipboardParentText')) return;

        // Listen for practice completions to offer parent text
        document.addEventListener('click', function (e) {
            const btn = e.target.closest('[data-growth-parent-text]');
            if (!btn) return;
            const stats = getStats();
            const text = 'Hey! I just practiced math and got ' + stats.correctAnswers +
                ' out of ' + stats.totalAttempts + ' right! Try it free: ' + SITE;
            navigator.clipboard.writeText(text).then(() => {
                showToast('Message copied! Send it to someone.', 'success');
            }).catch(() => { });
        });
    }

    // ══════════════════════════════════════════════════════════════
    // #5 — "Fix the Mistake" Shareable Puzzles
    // ══════════════════════════════════════════════════════════════
    function initFixTheMistake() {
        if (!flag('fixTheMistake')) return;

        window.MBFixMistake = {
            generate() {
                const puzzles = [
                    { problem: '3/4 + 1/4 = 4/8', error: 'Added numerators AND denominators', correct: '3/4 + 1/4 = 4/4 = 1' },
                    { problem: '5 x 0 = 5', error: 'Anything times 0 is 0', correct: '5 x 0 = 0' },
                    { problem: '2^3 = 6', error: 'Multiplied instead of using exponent', correct: '2^3 = 8' },
                    { problem: '50% of 80 = 45', error: 'Wrong calculation', correct: '50% of 80 = 40' },
                    { problem: '|-7| = -7', error: 'Absolute value is always positive', correct: '|-7| = 7' },
                    { problem: '3(x + 2) = 3x + 2', error: 'Forgot to distribute', correct: '3(x + 2) = 3x + 6' },
                    { problem: '1/2 + 1/3 = 2/5', error: 'Added numerators and denominators', correct: '1/2 + 1/3 = 5/6' },
                    { problem: 'sqrt(16 + 9) = 4 + 3 = 7', error: 'Cannot split sqrt over addition', correct: 'sqrt(25) = 5' },
                ];
                const idx = Math.floor(Math.random() * puzzles.length);
                return puzzles[idx];
            },

            shareImage(puzzle) {
                const canvas = document.createElement('canvas');
                canvas.width = 600;
                canvas.height = 400;
                const ctx = canvas.getContext('2d');

                // Background
                const grad = ctx.createLinearGradient(0, 0, 600, 400);
                grad.addColorStop(0, '#0f172a');
                grad.addColorStop(1, '#1e293b');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, 600, 400);

                // Border
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 4;
                ctx.strokeRect(10, 10, 580, 380);

                // Title
                ctx.fillStyle = '#ef4444';
                ctx.font = 'bold 28px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('\ud83d\udd0d Can YOU Find the Error?', 300, 60);

                // Problem
                ctx.fillStyle = '#f1f5f9';
                ctx.font = 'bold 36px monospace';
                ctx.fillText(puzzle.problem, 300, 160);

                // "Find the mistake!" label
                ctx.fillStyle = '#f59e0b';
                ctx.font = '20px sans-serif';
                ctx.fillText('Something is wrong here...', 300, 220);

                // Branding
                ctx.fillStyle = '#3b82f6';
                ctx.font = 'bold 18px sans-serif';
                ctx.fillText('math.boredgames.site', 300, 370);

                return canvas.toDataURL('image/png');
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #6 — GitHub-style Practice Heatmap
    // ══════════════════════════════════════════════════════════════
    function initPracticeHeatmap() {
        if (!flag('practiceHeatmap')) return;

        recordDailyActivity();

        window.MBHeatmap = {
            render(containerId) {
                const container = document.getElementById(containerId);
                if (!container) return;

                const heatmap = JSON.parse(localStorage.getItem('mb_heatmap') || '{}');
                const today = new Date();
                const weeks = 20;

                let html = '<div class="growth-heatmap"><div class="growth-heatmap-title">' +
                    '\ud83d\udcc5 Practice Activity</div><div class="growth-heatmap-grid">';

                for (let w = weeks - 1; w >= 0; w--) {
                    html += '<div class="growth-heatmap-week">';
                    for (let d = 0; d < 7; d++) {
                        const date = new Date(today);
                        date.setDate(date.getDate() - (w * 7 + (6 - d)));
                        const key = date.toISOString().slice(0, 10);
                        const count = heatmap[key] || 0;
                        const level = count === 0 ? 0 : count < 5 ? 1 : count < 15 ? 2 : count < 30 ? 3 : 4;
                        html += '<div class="growth-heatmap-cell level-' + level +
                            '" title="' + key + ': ' + count + ' problems"></div>';
                    }
                    html += '</div>';
                }

                html += '</div><div class="growth-heatmap-legend">' +
                    '<span>Less</span>' +
                    '<div class="growth-heatmap-cell level-0"></div>' +
                    '<div class="growth-heatmap-cell level-1"></div>' +
                    '<div class="growth-heatmap-cell level-2"></div>' +
                    '<div class="growth-heatmap-cell level-3"></div>' +
                    '<div class="growth-heatmap-cell level-4"></div>' +
                    '<span>More</span></div></div>';

                container.innerHTML = html;
            },

            toCanvas() {
                const heatmap = JSON.parse(localStorage.getItem('mb_heatmap') || '{}');
                const canvas = document.createElement('canvas');
                canvas.width = 500;
                canvas.height = 200;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(0, 0, 500, 200);

                const colors = ['#1e293b', '#064e3b', '#059669', '#10b981', '#34d399'];
                const today = new Date();
                const weeks = 20;

                for (let w = weeks - 1; w >= 0; w--) {
                    for (let d = 0; d < 7; d++) {
                        const date = new Date(today);
                        date.setDate(date.getDate() - (w * 7 + (6 - d)));
                        const key = date.toISOString().slice(0, 10);
                        const count = heatmap[key] || 0;
                        const level = count === 0 ? 0 : count < 5 ? 1 : count < 15 ? 2 : count < 30 ? 3 : 4;
                        const x = (weeks - 1 - w) * 24 + 10;
                        const y = d * 24 + 10;
                        ctx.fillStyle = colors[level];
                        ctx.beginPath();
                        ctx.roundRect(x, y, 20, 20, 4);
                        ctx.fill();
                    }
                }

                ctx.fillStyle = '#3b82f6';
                ctx.font = 'bold 14px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('math.boredgames.site', 250, 192);

                return canvas.toDataURL('image/png');
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #7 — "I Survived [Topic]" Badge Generator
    // ══════════════════════════════════════════════════════════════
    function initBadgeGenerator() {
        if (!flag('badgeGenerator')) return;

        window.MBBadge = {
            generate(topic, accuracy) {
                const canvas = document.createElement('canvas');
                canvas.width = 400;
                canvas.height = 400;
                const ctx = canvas.getContext('2d');

                // Background
                const grad = ctx.createRadialGradient(200, 200, 50, 200, 200, 200);
                grad.addColorStop(0, '#1e293b');
                grad.addColorStop(1, '#0f172a');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, 400, 400);

                // Badge circle
                ctx.beginPath();
                ctx.arc(200, 170, 120, 0, Math.PI * 2);
                ctx.fillStyle = '#334155';
                ctx.fill();
                ctx.strokeStyle = accuracy >= 95 ? '#f59e0b' : '#10b981';
                ctx.lineWidth = 6;
                ctx.stroke();

                // Icon
                ctx.font = '60px serif';
                ctx.textAlign = 'center';
                ctx.fillText(accuracy >= 95 ? '\ud83c\udfc6' : '\u26f0\ufe0f', 200, 160);

                // Accuracy
                ctx.fillStyle = accuracy >= 95 ? '#f59e0b' : '#10b981';
                ctx.font = 'bold 22px sans-serif';
                ctx.fillText(accuracy + '%', 200, 205);

                // Title
                ctx.fillStyle = '#f1f5f9';
                ctx.font = 'bold 20px sans-serif';
                ctx.fillText('I SURVIVED', 200, 310);

                // Topic
                ctx.fillStyle = '#3b82f6';
                ctx.font = 'bold 22px sans-serif';
                const displayTopic = topic.length > 20 ? topic.slice(0, 18) + '...' : topic;
                ctx.fillText(displayTopic, 200, 340);

                // Brand
                ctx.fillStyle = '#64748b';
                ctx.font = '14px sans-serif';
                ctx.fillText('math.boredgames.site', 200, 385);

                return canvas.toDataURL('image/png');
            },

            download(topic, accuracy) {
                const dataUrl = this.generate(topic, accuracy);
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = 'mathbored-badge-' + topic.replace(/\s+/g, '-').toLowerCase() + '.png';
                a.click();
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #8 — Streak Brag Cards
    // ══════════════════════════════════════════════════════════════
    function initStreakBragCards() {
        if (!flag('streakBragCards')) return;

        window.MBBrag = {
            milestones: [5, 10, 25, 50, 100, 250, 500],

            checkMilestone(streak) {
                if (this.milestones.includes(streak)) {
                    this.showCard(streak);
                }
            },

            createCard(streak) {
                const canvas = document.createElement('canvas');
                canvas.width = 600;
                canvas.height = 340;
                const ctx = canvas.getContext('2d');

                const grad = ctx.createLinearGradient(0, 0, 600, 340);
                grad.addColorStop(0, '#f59e0b');
                grad.addColorStop(1, '#d97706');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, 600, 340);

                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.beginPath();
                ctx.arc(500, 50, 150, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#fff';
                ctx.font = '48px serif';
                ctx.textAlign = 'center';
                ctx.fillText('\ud83d\udd25', 300, 70);

                ctx.font = 'bold 64px sans-serif';
                ctx.fillText(streak, 300, 160);

                ctx.font = 'bold 28px sans-serif';
                ctx.fillText('PROBLEMS IN A ROW!', 300, 210);

                ctx.font = '20px sans-serif';
                ctx.fillStyle = 'rgba(255,255,255,0.85)';
                ctx.fillText('Unstoppable on MathBored', 300, 260);

                ctx.font = 'bold 16px sans-serif';
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.fillText('math.boredgames.site', 300, 320);

                return canvas.toDataURL('image/png');
            },

            showCard(streak) {
                const dataUrl = this.createCard(streak);
                const overlay = document.createElement('div');
                overlay.className = 'growth-brag-overlay';
                overlay.innerHTML =
                    '<div class="growth-brag-card">' +
                    '<img src="' + dataUrl + '" alt="' + streak + ' streak!">' +
                    '<div class="growth-brag-actions">' +
                    '<button class="growth-btn growth-btn-primary" onclick="window.MBBrag.shareCard(' + streak + ')">Share</button>' +
                    '<button class="growth-btn growth-btn-secondary" onclick="window.MBBrag.downloadCard(' + streak + ')">Save Image</button>' +
                    '<button class="growth-btn growth-btn-ghost" onclick="this.closest(\'.growth-brag-overlay\').remove()">Close</button>' +
                    '</div></div>';
                document.body.appendChild(overlay);
            },

            shareCard(streak) {
                const text = '\ud83d\udd25 ' + streak + ' problems in a row on MathBored! Can you beat my streak?\n' + SITE;
                if (navigator.share && flag('webShare')) {
                    navigator.share({ title: 'MathBored Streak', text: text }).catch(() => { });
                } else {
                    navigator.clipboard.writeText(text).then(() => {
                        showToast('Streak copied!', 'success');
                    }).catch(() => { });
                }
                const overlay = document.querySelector('.growth-brag-overlay');
                if (overlay) overlay.remove();
            },

            downloadCard(streak) {
                const dataUrl = this.createCard(streak);
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = 'mathbored-streak-' + streak + '.png';
                a.click();
                const overlay = document.querySelector('.growth-brag-overlay');
                if (overlay) overlay.remove();
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #9 — Speed Run Mode
    // ══════════════════════════════════════════════════════════════
    function initSpeedRun() {
        if (!flag('speedRun')) return;

        window.MBSpeedRun = {
            active: false,
            startTime: null,
            problems: 10,
            solved: 0,
            correct: 0,

            start(count) {
                this.active = true;
                this.problems = count || 10;
                this.solved = 0;
                this.correct = 0;
                this.startTime = Date.now();
            },

            record(isCorrect) {
                if (!this.active) return;
                this.solved++;
                if (isCorrect) this.correct++;
                if (this.solved >= this.problems) {
                    this.finish();
                }
            },

            finish() {
                this.active = false;
                const elapsed = Math.round((Date.now() - this.startTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                const timeStr = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

                this.lastResult = {
                    time: elapsed, timeStr: timeStr,
                    correct: this.correct, total: this.problems
                };

                return this.lastResult;
            },

            getShareText() {
                if (!this.lastResult) return '';
                const r = this.lastResult;
                return '\u26a1 Speed Run: ' + r.correct + '/' + r.total +
                    ' in ' + r.timeStr + '!\nCan you beat my time?\n' + SITE;
            },

            getChallengeUrl() {
                if (!this.lastResult) return '';
                const r = this.lastResult;
                const payload = { mode: 'speedrun', t: r.time, c: r.correct, n: r.total };
                return window.location.origin + window.location.pathname +
                    '?challenge=' + encodeChallenge(payload);
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #10 — Printable Achievement Certificates
    // ══════════════════════════════════════════════════════════════
    function initCertificates() {
        if (!flag('certificates')) return;

        window.MBCertificate = {
            generate(name, topic, accuracy, date) {
                const canvas = document.createElement('canvas');
                canvas.width = 800;
                canvas.height = 600;
                const ctx = canvas.getContext('2d');

                // Parchment background
                ctx.fillStyle = '#fef3c7';
                ctx.fillRect(0, 0, 800, 600);

                // Double border
                ctx.strokeStyle = '#d97706';
                ctx.lineWidth = 8;
                ctx.strokeRect(20, 20, 760, 560);
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 3;
                ctx.strokeRect(30, 30, 740, 540);

                // Title
                ctx.fillStyle = '#92400e';
                ctx.font = 'bold 36px Georgia, serif';
                ctx.textAlign = 'center';
                ctx.fillText('Certificate of Achievement', 400, 85);

                // Decorative line
                ctx.strokeStyle = '#d97706';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(150, 100);
                ctx.lineTo(650, 100);
                ctx.stroke();

                // Trophy
                ctx.font = '72px serif';
                ctx.fillText('\ud83c\udfc6', 400, 190);

                // Name
                ctx.fillStyle = '#1e293b';
                ctx.font = 'bold 32px Georgia, serif';
                ctx.fillText(name || 'Math Champion', 400, 260);

                // Achievement text
                ctx.fillStyle = '#475569';
                ctx.font = '20px sans-serif';
                ctx.fillText('has demonstrated mastery in', 400, 310);
                ctx.fillStyle = '#1e293b';
                ctx.font = 'bold 28px sans-serif';
                ctx.fillText(topic, 400, 360);
                ctx.fillStyle = '#475569';
                ctx.font = '20px sans-serif';
                ctx.fillText('with ' + accuracy + '% accuracy', 400, 400);

                // Date
                ctx.fillStyle = '#64748b';
                ctx.font = '16px sans-serif';
                ctx.fillText(date || new Date().toLocaleDateString(), 400, 460);

                // Brand
                ctx.fillStyle = '#3b82f6';
                ctx.font = 'bold 18px sans-serif';
                ctx.fillText('MathBored \u2022 math.boredgames.site', 400, 530);

                return canvas;
            },

            print(name, topic, accuracy, date) {
                const canvas = this.generate(name, topic, accuracy, date);
                const win = window.open('', '_blank');
                win.document.write('<html><head><title>MathBored Certificate</title>' +
                    '<style>body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f1f5f9;}' +
                    'img{max-width:100%;height:auto;}@media print{body{background:white;}}</style></head><body>' +
                    '<img src="' + canvas.toDataURL('image/png') + '">' +
                    '<script>setTimeout(function(){window.print();},500);<\/script></body></html>');
            },

            download(name, topic, accuracy, date) {
                const canvas = this.generate(name, topic, accuracy, date);
                const a = document.createElement('a');
                a.href = canvas.toDataURL('image/png');
                a.download = 'mathbored-certificate-' + topic.replace(/\s+/g, '-').toLowerCase() + '.png';
                a.click();
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #11 — Embeddable Widget
    // ══════════════════════════════════════════════════════════════
    function initEmbeddableWidget() {
        if (!flag('embeddableWidget')) return;

        window.MBWidget = {
            getEmbedCode(topic, grade) {
                const params = new URLSearchParams();
                if (topic) params.set('topic', topic);
                if (grade) params.set('grade', grade);
                return '<iframe src="' + SITE + '/widget.html?' + params.toString() +
                    '" width="100%" height="500" frameborder="0" ' +
                    'style="border:2px solid #334155;border-radius:16px;" ' +
                    'title="MathBored Practice Widget"></iframe>';
            },

            showEmbedModal(topic, grade) {
                const code = this.getEmbedCode(topic, grade);
                const overlay = document.createElement('div');
                overlay.className = 'growth-brag-overlay';
                overlay.innerHTML =
                    '<div class="growth-embed-modal">' +
                    '<h3>Embed This Quiz</h3>' +
                    '<p>Copy the code below and paste it into your website, LMS, or Google Site:</p>' +
                    '<textarea class="growth-embed-code" readonly onclick="this.select()">' + code.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</textarea>' +
                    '<div class="growth-brag-actions">' +
                    '<button class="growth-btn growth-btn-primary" onclick="navigator.clipboard.writeText(\'' +
                    code.replace(/'/g, "\\'") + '\').then(function(){document.querySelector(\'.growth-embed-modal h3\').textContent=\'Copied!\'})">Copy Code</button>' +
                    '<button class="growth-btn growth-btn-ghost" onclick="this.closest(\'.growth-brag-overlay\').remove()">Close</button>' +
                    '</div></div>';
                document.body.appendChild(overlay);
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #12 — "Math of the Day" Embeddable Snippet
    // ══════════════════════════════════════════════════════════════
    function initMathOfTheDay() {
        if (!flag('mathOfTheDay')) return;

        window.MBMathOfDay = {
            getSnippetCode() {
                return '<script src="' + SITE + '/math-of-the-day.js"><\/script>' +
                    '<div id="mathbored-daily"></div>';
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #13 — Printable Worksheets with Branding
    // ══════════════════════════════════════════════════════════════
    function initWorksheetPrint() {
        if (!flag('worksheetPrint')) return;

        window.MBWorksheet = {
            print(topic, problems) {
                const html = '<html><head><title>MathBored Worksheet: ' + topic + '</title>' +
                    '<style>' +
                    'body{font-family:sans-serif;padding:40px;color:#1e293b;max-width:800px;margin:0 auto;}' +
                    'h1{text-align:center;font-size:24px;margin-bottom:4px;}' +
                    '.subtitle{text-align:center;color:#64748b;margin-bottom:30px;font-size:14px;}' +
                    '.name-line{border-bottom:2px solid #cbd5e1;width:50%;margin:20px auto;padding-bottom:4px;' +
                    'text-align:left;font-size:14px;color:#94a3b8;}' +
                    '.problem{padding:16px 0;border-bottom:1px solid #e2e8f0;font-size:16px;line-height:2.2;}' +
                    '.problem-num{font-weight:bold;margin-right:12px;color:#3b82f6;}' +
                    '.answer-space{display:inline-block;border-bottom:2px solid #cbd5e1;width:100px;margin-left:12px;}' +
                    '.footer{margin-top:40px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:16px;}' +
                    '.footer a{color:#3b82f6;text-decoration:none;font-weight:bold;}' +
                    '@media print{.no-print{display:none !important;}}' +
                    '</style></head><body>' +
                    '<h1>\ud83d\udcdd ' + topic + ' Worksheet</h1>' +
                    '<p class="subtitle">MathBored Practice</p>' +
                    '<div class="name-line">Name: _____________________________ Date: __________</div>';

                let body = '';
                if (problems && problems.length) {
                    problems.forEach(function (p, i) {
                        body += '<div class="problem"><span class="problem-num">' + (i + 1) + '.</span>' +
                            p.question + '<span class="answer-space"></span></div>';
                    });
                } else {
                    for (let i = 1; i <= 20; i++) {
                        body += '<div class="problem"><span class="problem-num">' + i + '.</span>' +
                            '___________________________________<span class="answer-space"></span></div>';
                    }
                }

                const footer = '<div class="footer">Generated free at <a href="' + SITE + '">math.boredgames.site</a>' +
                    ' \u2014 Unlimited practice online!</div>' +
                    '<script>setTimeout(function(){window.print();},500);<\/script></body></html>';

                const win = window.open('', '_blank');
                win.document.write(html + body + footer);
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #14 — QR Code Classroom Poster Generator
    // ══════════════════════════════════════════════════════════════
    function initQRPoster() {
        if (!flag('qrPoster')) return;

        // Simple QR-like visual (links via URL). For a real QR code without
        // a library, we generate a "scan me" poster that shows the URL prominently.
        window.MBPoster = {
            generate(topic, url) {
                const canvas = document.createElement('canvas');
                canvas.width = 600;
                canvas.height = 800;
                const ctx = canvas.getContext('2d');

                // Background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, 600, 800);

                // Header bar
                ctx.fillStyle = '#3b82f6';
                ctx.fillRect(0, 0, 600, 100);
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 32px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('MathBored', 300, 62);

                // Topic
                ctx.fillStyle = '#1e293b';
                ctx.font = 'bold 36px sans-serif';
                ctx.fillText('Need help with', 300, 180);
                ctx.fillStyle = '#3b82f6';
                ctx.font = 'bold 42px sans-serif';
                const displayTopic = topic.length > 20 ? topic.slice(0, 18) + '...' : topic;
                ctx.fillText(displayTopic + '?', 300, 240);

                // QR placeholder (a stylized box with the URL)
                ctx.fillStyle = '#f1f5f9';
                ctx.fillRect(150, 300, 300, 300);
                ctx.strokeStyle = '#334155';
                ctx.lineWidth = 4;
                ctx.strokeRect(150, 300, 300, 300);

                // QR-like pattern (decorative)
                ctx.fillStyle = '#1e293b';
                const size = 20;
                const rng = seededRandom((topic || 'math').length * 31);
                for (let row = 0; row < 14; row++) {
                    for (let col = 0; col < 14; col++) {
                        if (rng() > 0.5 || (row < 3 && col < 3) || (row < 3 && col > 10) || (row > 10 && col < 3)) {
                            ctx.fillRect(155 + col * size, 305 + row * size, size - 2, size - 2);
                        }
                    }
                }

                // URL text
                ctx.fillStyle = '#1e293b';
                ctx.font = 'bold 18px monospace';
                ctx.fillText(url || SITE, 300, 660);

                // CTA
                ctx.fillStyle = '#10b981';
                ctx.font = 'bold 28px sans-serif';
                ctx.fillText('Scan or Visit for', 300, 720);
                ctx.fillText('FREE Practice!', 300, 756);

                return canvas;
            },

            download(topic, url) {
                const canvas = this.generate(topic, url);
                const a = document.createElement('a');
                a.href = canvas.toDataURL('image/png');
                a.download = 'mathbored-poster-' + (topic || 'math').replace(/\s+/g, '-').toLowerCase() + '.png';
                a.click();
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #15 — Pre-Written "Share With Your School" Email
    // ══════════════════════════════════════════════════════════════
    function initShareWithSchool() {
        if (!flag('shareWithSchool')) return;

        window.MBShareSchool = {
            open() {
                const subject = encodeURIComponent('Free Math Practice Tool for Students');
                const body = encodeURIComponent(
                    'Hi,\n\n' +
                    'I wanted to share a free math practice tool that\'s been really helpful. ' +
                    'It\'s called MathBored and it covers K-12 math with unlimited practice problems, ' +
                    'lessons, and walkthroughs.\n\n' +
                    'Best of all, it\'s completely free \u2014 no login, no ads, no account needed.\n\n' +
                    'Check it out: ' + SITE + '\n\n' +
                    'It also has MAP test prep, math competition practice, and printable worksheets.\n\n' +
                    'Hope it helps!\n'
                );
                window.open('mailto:?subject=' + subject + '&body=' + body);
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #16 — Classroom Code System
    // ══════════════════════════════════════════════════════════════
    function initClassroomCode() {
        if (!flag('classroomCode')) return;

        const params = new URLSearchParams(window.location.search);
        const classCode = params.get('class');
        if (classCode) {
            localStorage.setItem('mb_classroom', classCode);
            // Could configure grade, topics, etc. from URL
        }

        window.MBClassroom = {
            getCode() {
                return localStorage.getItem('mb_classroom') || '';
            },
            setCode(code) {
                localStorage.setItem('mb_classroom', code);
            },
            getUrl(code) {
                return SITE + '?class=' + encodeURIComponent(code || this.getCode());
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #20 — Seasonal Challenge Pages
    // ══════════════════════════════════════════════════════════════
    function initSeasonalChallenges() {
        if (!flag('seasonalChallenges')) return;

        const today = new Date();
        const month = today.getMonth(); // 0-indexed
        const day = today.getDate();

        let seasonal = null;
        if (month === 2 && day === 14) seasonal = { name: 'Pi Day Speed Challenge', icon: '\ud83e\udd67', topic: 'Decimals' };
        else if (month === 7 && day >= 15) seasonal = { name: 'Back to School Assessment', icon: '\ud83c\udf92', topic: 'Mixed Review' };
        else if (month === 1 && day >= 1 && day <= 14) seasonal = { name: '100th Day Challenge', icon: '\ud83d\udcaf', topic: 'Place Value' };
        else if (month === 9 && day === 31) seasonal = { name: 'Math-O-Ween Challenge', icon: '\ud83c\udf83', topic: 'Probability' };
        else if (month === 11 && day >= 20) seasonal = { name: 'Winter Break Brain Warm-Up', icon: '\u2744\ufe0f', topic: 'Order of Operations' };

        if (seasonal) {
            window.MBSeasonal = seasonal;
            injectSeasonalBanner(seasonal);
        }
    }

    function injectSeasonalBanner(seasonal) {
        const container = document.querySelector('.map-prep-container') ||
            document.querySelector('#contentArea') ||
            document.querySelector('main');
        if (!container) return;

        const banner = document.createElement('div');
        banner.className = 'growth-seasonal-banner';
        banner.innerHTML =
            '<div class="growth-seasonal-inner">' +
            '<span style="font-size:2rem;">' + seasonal.icon + '</span>' +
            '<div><strong>' + seasonal.name + '</strong><span class="growth-daily-topic">' + seasonal.topic + '</span></div>' +
            '</div>';
        container.insertBefore(banner, container.firstChild);
    }

    // ══════════════════════════════════════════════════════════════
    // #21 — Anonymous School Pseudo-Leaderboard
    // ══════════════════════════════════════════════════════════════
    function initSchoolLeaderboard() {
        if (!flag('schoolLeaderboard')) return;

        const params = new URLSearchParams(window.location.search);
        const schoolParam = params.get('school');
        if (schoolParam) {
            localStorage.setItem('mb_school', schoolParam);
        }

        window.MBSchool = {
            getSchool() {
                return localStorage.getItem('mb_school') || '';
            },
            setSchool(name) {
                localStorage.setItem('mb_school', name);
            },
            getCount() {
                const school = this.getSchool();
                if (!school) return 0;
                return parseInt(localStorage.getItem('mb_school_count_' + school) || '0', 10);
            },
            increment() {
                const school = this.getSchool();
                if (!school) return;
                const key = 'mb_school_count_' + school;
                const count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
                localStorage.setItem(key, count.toString());
            },
            getShareUrl() {
                return SITE + '?school=' + encodeURIComponent(this.getSchool());
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #22 — Parent Progress Report Generator
    // ══════════════════════════════════════════════════════════════
    function initProgressReport() {
        if (!flag('progressReport')) return;

        window.MBReport = {
            generate(name) {
                const stats = getStats();
                const heatmap = JSON.parse(localStorage.getItem('mb_heatmap') || '{}');
                const totalDays = Object.keys(heatmap).length;
                const totalProblems = Object.values(heatmap).reduce(function (a, b) { return a + b; }, 0);

                const html = '<html><head><title>MathBored Progress Report</title>' +
                    '<style>' +
                    'body{font-family:sans-serif;max-width:700px;margin:0 auto;padding:40px;color:#1e293b;}' +
                    'h1{text-align:center;color:#3b82f6;margin-bottom:4px;}' +
                    '.subtitle{text-align:center;color:#64748b;margin-bottom:30px;}' +
                    '.report-card{background:#f8fafc;border:2px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:20px;}' +
                    '.report-card h3{margin:0 0 16px;color:#334155;}' +
                    '.stat-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e2e8f0;}' +
                    '.stat-label{color:#64748b;}' +
                    '.stat-value{font-weight:bold;color:#1e293b;}' +
                    '.footer{text-align:center;margin-top:30px;color:#94a3b8;font-size:13px;}' +
                    '.footer a{color:#3b82f6;font-weight:bold;text-decoration:none;}' +
                    '@media print{.no-print{display:none !important;}}' +
                    '</style></head><body>' +
                    '<h1>\ud83d\udcca Progress Report</h1>' +
                    '<p class="subtitle">MathBored \u2014 ' + new Date().toLocaleDateString() + '</p>' +
                    '<div class="report-card"><h3>Student: ' + (name || '_______________') + '</h3>' +
                    '<div class="stat-row"><span class="stat-label">Total Problems Attempted</span><span class="stat-value">' + stats.totalAttempts + '</span></div>' +
                    '<div class="stat-row"><span class="stat-label">Correct Answers</span><span class="stat-value">' + stats.correctAnswers + '</span></div>' +
                    '<div class="stat-row"><span class="stat-label">Accuracy</span><span class="stat-value">' + stats.accuracy + '%</span></div>' +
                    '<div class="stat-row"><span class="stat-label">Current Streak</span><span class="stat-value">' + stats.streak + '</span></div>' +
                    '<div class="stat-row"><span class="stat-label">Best Streak</span><span class="stat-value">' + stats.bestStreak + '</span></div>' +
                    '<div class="stat-row"><span class="stat-label">Days Practiced</span><span class="stat-value">' + totalDays + '</span></div>' +
                    '<div class="stat-row"><span class="stat-label">Total Problems (All Time)</span><span class="stat-value">' + totalProblems + '</span></div>' +
                    '</div>' +
                    '<div class="footer">Generated at <a href="' + SITE + '">math.boredgames.site</a> \u2014 Free K-12 Math Practice</div>' +
                    '<script>setTimeout(function(){window.print();},500);<\/script></body></html>';

                const win = window.open('', '_blank');
                win.document.write(html);
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #23 — Refer-a-Classroom Tracking Link
    // ══════════════════════════════════════════════════════════════
    function initReferClassroom() {
        if (!flag('referClassroom')) return;

        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref');
        if (ref) {
            localStorage.setItem('mb_ref', ref);
            // Increment the ref count
            const key = 'mb_ref_count_' + ref;
            const count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
            localStorage.setItem(key, count.toString());
        }

        window.MBRefer = {
            getUrl(teacherName) {
                return SITE + '?ref=' + encodeURIComponent(teacherName);
            },
            getCount(teacherName) {
                return parseInt(localStorage.getItem('mb_ref_count_' + teacherName) || '0', 10);
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #24 — Social Proof Counter
    // ══════════════════════════════════════════════════════════════
    function initSocialProof() {
        if (!flag('socialProof')) return;

        // Deterministic estimate based on date — not fake, just a growth estimate
        const daysSinceLaunch = getDayNumber();
        const baseUsers = 8500;
        const growthPerDay = 42;
        const estimated = baseUsers + (daysSinceLaunch * growthPerDay);
        const rounded = Math.floor(estimated / 100) * 100;
        const display = rounded >= 1000 ? Math.floor(rounded / 1000) + ',' + ('' + (rounded % 1000)).padStart(3, '0') + '+' : rounded + '+';

        const banner = document.createElement('div');
        banner.className = 'growth-social-proof';
        banner.innerHTML = '\ud83c\udf1f Join <strong>' + display + '</strong> students practicing math on MathBored';

        // Insert at top of body or main container
        const target = document.querySelector('.map-prep-container') ||
            document.querySelector('#contentArea') ||
            document.querySelector('main') ||
            document.body;
        if (target && target !== document.body) {
            target.insertBefore(banner, target.firstChild);
        } else {
            document.body.insertBefore(banner, document.body.firstChild);
        }
    }

    // ══════════════════════════════════════════════════════════════
    // #25 — Smart PWA Install Prompt
    // ══════════════════════════════════════════════════════════════
    function initSmartInstallPrompt() {
        if (!flag('smartInstallPrompt')) return;

        let deferredPrompt = null;
        let problemCount = 0;

        window.addEventListener('beforeinstallprompt', function (e) {
            e.preventDefault();
            deferredPrompt = e;
        });

        // Listen for practice activity
        document.addEventListener('correctAnswer', function () {
            problemCount++;
            if (problemCount >= 3 && deferredPrompt) {
                showInstallBanner();
            }
        });

        // Also check after any answer
        document.addEventListener('click', function (e) {
            if (e.target.closest('.answer-option') || e.target.closest('.btn-submit')) {
                problemCount++;
                if (problemCount >= 3 && deferredPrompt) {
                    setTimeout(showInstallBanner, 1000);
                }
            }
        });

        function showInstallBanner() {
            if (document.querySelector('.growth-install-banner')) return;
            if (localStorage.getItem('mb_install_dismissed')) return;

            const banner = document.createElement('div');
            banner.className = 'growth-install-banner';
            banner.innerHTML =
                '<div class="growth-install-inner">' +
                '<div class="growth-install-text">' +
                '<strong>\ud83d\udcf1 Add to Home Screen</strong>' +
                '<span>Practice math offline, anytime!</span>' +
                '</div>' +
                '<div class="growth-install-actions">' +
                '<button class="growth-btn growth-btn-primary growth-install-yes">Install</button>' +
                '<button class="growth-btn growth-btn-ghost growth-install-no">Not now</button>' +
                '</div></div>';
            document.body.appendChild(banner);
            setTimeout(function () { banner.classList.add('show'); }, 100);

            banner.querySelector('.growth-install-yes').addEventListener('click', function () {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then(function () {
                        deferredPrompt = null;
                        banner.remove();
                    });
                }
            });

            banner.querySelector('.growth-install-no').addEventListener('click', function () {
                banner.classList.remove('show');
                setTimeout(function () { banner.remove(); }, 300);
                localStorage.setItem('mb_install_dismissed', '1');
            });
        }
    }

    // ══════════════════════════════════════════════════════════════
    // #26 — Homework Evidence Mode ("Show Your Work" Printout)
    // ══════════════════════════════════════════════════════════════
    function initHomeworkEvidence() {
        if (!flag('homeworkEvidence')) return;

        window.MBHomework = {
            log: [],

            record(question, userAnswer, correctAnswer, isCorrect, explanation) {
                this.log.push({
                    q: question, ua: userAnswer, ca: correctAnswer,
                    ok: isCorrect, exp: explanation || '', ts: Date.now()
                });
            },

            print(studentName) {
                if (!this.log.length) {
                    showToast('No problems recorded yet!', 'warning');
                    return;
                }
                const html = '<html><head><title>Homework Evidence</title>' +
                    '<style>' +
                    'body{font-family:sans-serif;max-width:700px;margin:0 auto;padding:40px;color:#1e293b;font-size:14px;}' +
                    'h1{text-align:center;color:#3b82f6;}' +
                    '.meta{text-align:center;color:#64748b;margin-bottom:30px;}' +
                    '.problem{border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin-bottom:12px;}' +
                    '.problem.correct{border-left:4px solid #10b981;}' +
                    '.problem.incorrect{border-left:4px solid #ef4444;}' +
                    '.q{font-weight:bold;margin-bottom:8px;}' +
                    '.answer-row{display:flex;gap:20px;}' +
                    '.student-ans{color:#1e293b;}.correct-ans{color:#10b981;}' +
                    '.explanation{color:#64748b;font-size:13px;margin-top:8px;font-style:italic;}' +
                    '.summary{background:#f0fdf4;border:2px solid #10b981;border-radius:12px;padding:20px;text-align:center;margin-bottom:20px;}' +
                    '.footer{text-align:center;color:#94a3b8;font-size:12px;margin-top:30px;border-top:1px solid #e2e8f0;padding-top:16px;}' +
                    '</style></head><body>' +
                    '<h1>\ud83d\udcdd Practice Evidence</h1>' +
                    '<div class="meta">' + (studentName || '_______________') +
                    ' | ' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString() + '</div>';

                const correct = this.log.filter(function (p) { return p.ok; }).length;
                let body = '<div class="summary"><strong>' + correct + '/' + this.log.length +
                    ' Correct (' + Math.round(correct / this.log.length * 100) + '%)</strong></div>';

                this.log.forEach(function (p, i) {
                    body += '<div class="problem ' + (p.ok ? 'correct' : 'incorrect') + '">' +
                        '<div class="q">' + (i + 1) + '. ' + p.q + '</div>' +
                        '<div class="answer-row">' +
                        '<span class="student-ans">Answer: ' + p.ua + (p.ok ? ' \u2705' : ' \u274c') + '</span>' +
                        (p.ok ? '' : '<span class="correct-ans">Correct: ' + p.ca + '</span>') +
                        '</div>' +
                        (p.exp ? '<div class="explanation">' + p.exp + '</div>' : '') +
                        '</div>';
                });

                body += '<div class="footer">Generated at math.boredgames.site \u2014 ' +
                    new Date().toISOString() + '</div>' +
                    '<script>setTimeout(function(){window.print();},500);<\/script></body></html>';

                const win = window.open('', '_blank');
                win.document.write(html + body);
            },

            clear() { this.log = []; }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #27 — "Scan the Room" Scavenger Hunt Kit Generator
    // ══════════════════════════════════════════════════════════════
    function initScavengerHunt() {
        if (!flag('scavengerHunt')) return;

        window.MBHunt = {
            generate(topic, count) {
                count = count || 10;
                const cards = [];
                for (let i = 1; i <= count; i++) {
                    cards.push({
                        number: i,
                        url: SITE + '?hunt=' + topic + '&card=' + i,
                    });
                }
                return cards;
            },

            printKit(topic, count) {
                const cards = this.generate(topic, count);
                const html = '<html><head><title>Scavenger Hunt: ' + topic + '</title>' +
                    '<style>' +
                    'body{font-family:sans-serif;color:#1e293b;}' +
                    '.card{width:300px;height:400px;border:3px solid #3b82f6;border-radius:16px;' +
                    'display:inline-flex;flex-direction:column;align-items:center;justify-content:center;' +
                    'margin:20px;page-break-inside:avoid;text-align:center;padding:20px;}' +
                    '.card-num{font-size:48px;font-weight:bold;color:#3b82f6;}' +
                    '.card-topic{font-size:18px;color:#64748b;margin:12px 0;}' +
                    '.card-icon{font-size:60px;margin:16px 0;}' +
                    '.card-url{font-size:12px;color:#94a3b8;word-break:break-all;}' +
                    '.card-cta{font-size:14px;font-weight:bold;color:#10b981;margin-top:12px;}' +
                    '.footer{text-align:center;margin:30px;color:#94a3b8;font-size:13px;}' +
                    '</style></head><body>';

                let body = '';
                const icons = ['\ud83d\udcdd', '\ud83e\udde0', '\u2b50', '\ud83d\udd22', '\ud83c\udfaf',
                    '\ud83d\udca1', '\ud83d\ude80', '\ud83c\udfc6', '\ud83d\udd25', '\ud83c\udf1f'];
                cards.forEach(function (card, i) {
                    body += '<div class="card">' +
                        '<div class="card-num">#' + card.number + '</div>' +
                        '<div class="card-icon">' + icons[i % icons.length] + '</div>' +
                        '<div class="card-topic">' + topic + '</div>' +
                        '<div class="card-cta">Visit MathBored to check your answer!</div>' +
                        '<div class="card-url">' + card.url + '</div>' +
                        '</div>';
                });

                body += '<div class="footer">MathBored Scavenger Hunt Kit | math.boredgames.site</div>' +
                    '<script>setTimeout(function(){window.print();},500);<\/script></body></html>';

                const win = window.open('', '_blank');
                win.document.write(html + body);
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #28 — Offline Mode Messaging
    // ══════════════════════════════════════════════════════════════
    function initOfflineMode() {
        if (!flag('offlineMode')) return;

        window.addEventListener('online', function () {
            showToast('You\'re back online!', 'success');
        });
        window.addEventListener('offline', function () {
            showToast('You\'re offline \u2014 practice mode still works!', 'info');
        });
    }

    // ══════════════════════════════════════════════════════════════
    // #29 — Deep Links for Assignments
    // ══════════════════════════════════════════════════════════════
    function initDeepLinks() {
        if (!flag('deepLinks')) return;

        // Parse deep link params
        const params = new URLSearchParams(window.location.search);
        const grade = params.get('grade');
        const topic = params.get('topic');
        const difficulty = params.get('difficulty');

        if (grade || topic) {
            window.MBDeepLink = { grade: grade, topic: topic, difficulty: difficulty };
            // Auto-configure if the app is available
            setTimeout(function () {
                if (window.app) {
                    if (grade) window.app.currentGrade = grade;
                    if (topic) {
                        window.app.currentTopic = topic;
                        window.app.currentMode = 'practice';
                    }
                    if (difficulty) window.app.difficulty = difficulty;
                }
            }, 500);
        }

        window.MBDeepLink = window.MBDeepLink || {};
        window.MBDeepLink.createUrl = function (grade, topic, difficulty) {
            const p = new URLSearchParams();
            if (grade) p.set('grade', grade);
            if (topic) p.set('topic', topic);
            if (difficulty) p.set('difficulty', difficulty);
            return SITE + '?' + p.toString();
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #30 — "Math Minute" Countdown Timer Challenge
    // ══════════════════════════════════════════════════════════════
    function initMathMinute() {
        if (!flag('mathMinute')) return;

        window.MBMathMinute = {
            active: false,
            timer: null,
            remaining: 60,
            solved: 0,
            correct: 0,

            start() {
                this.active = true;
                this.remaining = 60;
                this.solved = 0;
                this.correct = 0;
                const self = this;

                this.timer = setInterval(function () {
                    self.remaining--;
                    document.dispatchEvent(new CustomEvent('mathMinuteTick', { detail: { remaining: self.remaining } }));
                    if (self.remaining <= 0) {
                        self.finish();
                    }
                }, 1000);
            },

            record(isCorrect) {
                if (!this.active) return;
                this.solved++;
                if (isCorrect) this.correct++;
            },

            finish() {
                this.active = false;
                if (this.timer) clearInterval(this.timer);

                this.lastResult = { solved: this.solved, correct: this.correct };

                document.dispatchEvent(new CustomEvent('mathMinuteEnd', { detail: this.lastResult }));
                return this.lastResult;
            },

            getShareText() {
                if (!this.lastResult) return '';
                const r = this.lastResult;
                return '\u23f1 Math Minute: ' + r.correct + '/' + r.solved +
                    ' problems in 60 seconds!\nCan you beat me?\n' + SITE;
            },

            share() {
                const text = this.getShareText();
                if (navigator.share && flag('webShare')) {
                    navigator.share({ title: 'Math Minute Challenge', text: text }).catch(function () { });
                } else {
                    navigator.clipboard.writeText(text).then(function () {
                        showToast('Results copied!', 'success');
                    }).catch(function () { });
                }
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // #18 — Parent Guide (adds link/section, pages generated separately)
    // ══════════════════════════════════════════════════════════════
    function initParentGuides() {
        if (!flag('parentGuides')) return;
        // Parent guides are static pages — this just adds a link when available
        window.MBParentGuide = {
            getUrl(topic) {
                return SITE + '/guides/' + topic.replace(/\s+/g, '-').toLowerCase() + '.html';
            }
        };
    }

    // ══════════════════════════════════════════════════════════════
    // INITIALIZATION — run everything on DOMContentLoaded
    // ══════════════════════════════════════════════════════════════
    function initGrowthEngine() {
        // Record activity for heatmap regardless of flag (data collection)
        recordDailyActivity();

        // Bundle 1: Share & Brag
        initWebShare();
        initDailyChallenge();
        initChallengeFriend();
        initClipboardParentText();
        initFixTheMistake();

        // Bundle 2: Teacher Tools
        initEmbeddableWidget();
        initMathOfTheDay();
        initWorksheetPrint();
        initQRPoster();
        initShareWithSchool();
        initClassroomCode();

        // Bundle 3: Streaks & Achievements
        initPracticeHeatmap();
        initBadgeGenerator();
        initStreakBragCards();
        initCertificates();

        // Bundle 4: Competition & Proof
        initSpeedRun();
        initMathMinute();
        initHomeworkEvidence();

        // Bundle 5: Classroom & Discovery
        initReferClassroom();
        initSchoolLeaderboard();

        // Bundle 6: SEO & Seasonal
        initSeasonalChallenges();
        initParentGuides();

        // Bundle 7: Install & Offline
        initSmartInstallPrompt();
        initOfflineMode();
        initDeepLinks();

        // Bundle 8: Social Proof & Reports
        initProgressReport();
        initSocialProof();
        initScavengerHunt();

        console.log('\ud83d\ude80 MathBored Growth Engine initialized');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGrowthEngine);
    } else {
        initGrowthEngine();
    }
})();
