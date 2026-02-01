/**
 * Math Olympiad Data
 *
 * Loads questions from:
 * 1. EMBEDDED_OLYMPIAD_DATA (paste from convert-olympiad-data.js output)
 * 2. Optional: OLYMPIAD_DATA_URL (fetch from URL)
 * 3. Built-in default archive (if neither above is set)
 *
 * See OLYMPIAD_DATA_SETUP.md for how to add your own data.
 */

(function () {
    const STORAGE_KEY = 'olympiadData';
    const RANDOM_SEED_KEY = 'olympiadRandomSeed';
    const ROTATION_START_DAY_KEY = 'olympiadRotationStartDay';

    // Optional: set to a URL to fetch data from (e.g. private host or local file in dev)
    const OLYMPIAD_DATA_URL = null; // e.g. 'https://example.com/potw-data.md' or './potw.md'

    // Placeholder image for default archive (no Master Sheet data yet). Simple SVG so problem area displays.
    var PLACEHOLDER_IMAGE_SVG = 'data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">' +
        '<rect width="400" height="200" fill="%231e293b" stroke="%23334155" stroke-width="2" rx="8"/>' +
        '<text x="200" y="95" text-anchor="middle" fill="%2394a3b8" font-family="system-ui,sans-serif" font-size="18">Daily problem</text>' +
        '<text x="200" y="120" text-anchor="middle" fill="%23647b8b" font-family="system-ui,sans-serif" font-size="14">Add your Master Sheet data for real problem images</text>' +
        '<text x="200" y="155" text-anchor="middle" fill="%233b82f6" font-family="system-ui,sans-serif" font-size="12">See OLYMPIAD_DATA_SETUP.md</text>' +
        '</svg>'
    );

    // Built-in default archive: ~90 days of placeholder problems so the app works out of the box.
    // Replace with EMBEDDED_OLYMPIAD_DATA from convert-olympiad-data.js for your real Master Sheet.
    function getDefaultArchive() {
        const questions = [];
        const start = new Date(2024, 0, 1); // Jan 1, 2024
        const n = 90;
        const imageData = {};
        for (let i = 0; i < n; i++) {
            const d = new Date(start);
            d.setDate(d.getDate() + i);
            const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            questions.push({
                id: i + 1,
                date: dateStr,
                imageRef: 'image' + (i + 1),
                title: 'Problem from ' + dateStr
            });
            imageData['image' + (i + 1)] = PLACEHOLDER_IMAGE_SVG;
        }
        return { questions, imageData };
    }

    const olympiadData = {
        initialized: false,
        questions: [],
        randomIndex: [],
        imageData: {},

        init() {
            if (typeof EMBEDDED_OLYMPIAD_DATA !== 'undefined' && EMBEDDED_OLYMPIAD_DATA.questions && EMBEDDED_OLYMPIAD_DATA.questions.length > 0) {
                this._initFromEmbedded(EMBEDDED_OLYMPIAD_DATA);
                return;
            }
            if (OLYMPIAD_DATA_URL) {
                this._fetchFromUrl(OLYMPIAD_DATA_URL);
                return;
            }
            // Use built-in default archive so the rotation works; replace with your data when ready
            const defaultData = getDefaultArchive();
            this._initFromEmbedded(defaultData);
            console.log('✅ Olympiad Data: using built-in archive (' + defaultData.questions.length + ' problems). Add your own via OLYMPIAD_DATA_SETUP.md');
        },

        _initFromEmbedded(data) {
            this.questions = (data.questions || []).map((q) => ({
                ...q,
                imageDataUrl: (data.imageData || {})[q.imageRef] || null
            }));
            this.imageData = data.imageData || {};
            this._buildRandomIndex();
            this.initialized = true;
            console.log('✅ Olympiad Data initialized from embedded data!', this.questions.length, 'questions');
            this._dispatchReady();
        },

        _buildRandomIndex() {
            const n = this.questions.length;
            if (n === 0) {
                this.randomIndex = [];
                return;
            }
            let seed = null;
            try {
                seed = localStorage.getItem(RANDOM_SEED_KEY);
            } catch (e) {}
            if (!seed) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                seed = String(Math.floor(today.getTime() / (1000 * 60 * 60 * 24)));
                try {
                    localStorage.setItem(RANDOM_SEED_KEY, seed);
                } catch (e) {}
            }
            const seededRandom = (s) => {
                s = Math.sin(s) * 10000;
                return s - Math.floor(s);
            };
            const indices = Array.from({ length: n }, (_, i) => i);
            let s = parseInt(seed, 10) || 0;
            for (let i = n - 1; i > 0; i--) {
                s = (s * 9301 + 49297) % 233280;
                const j = Math.floor(seededRandom(s) * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }
            this.randomIndex = indices;
        },

        _fetchFromUrl(url) {
            fetch(url)
                .then((r) => (r.ok ? r.text() : Promise.reject(new Error(r.statusText))))
                .then((text) => {
                    const { questions, imageData } = this._parseMarkdown(text);
                    this.questions = questions.map((q) => ({
                        ...q,
                        imageDataUrl: imageData[q.imageRef] || null
                    }));
                    this.imageData = imageData;
                    this._buildRandomIndex();
                    this.initialized = true;
                    console.log('✅ Olympiad Data initialized from URL!', this.questions.length, 'questions');
                    this._dispatchReady();
                })
                .catch((err) => {
                    console.error('Olympiad: fetch failed', err);
                    if (typeof EMBEDDED_OLYMPIAD_DATA !== 'undefined' && EMBEDDED_OLYMPIAD_DATA.questions && EMBEDDED_OLYMPIAD_DATA.questions.length > 0) {
                        this._initFromEmbedded(EMBEDDED_OLYMPIAD_DATA);
                    } else {
                        this.questions = [];
                        this.randomIndex = [];
                        this.initialized = true;
                        this._dispatchReady();
                    }
                });
        },

        _parseMarkdown(text) {
            const lines = text.split('\n');
            const questions = [];
            const imageData = {};
            let currentDate = null;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                const dateMatch = line.match(/^##\s+(.+)$/);
                if (dateMatch) {
                    const dateStr = dateMatch[1].trim();
                    if (dateStr && dateStr.length > 3 && /[a-zA-Z0-9]/.test(dateStr)) {
                        currentDate = dateStr;
                    }
                }
                const imageMatch = line.match(/!\[.*?\]\[(image\d+)\]/);
                if (imageMatch && currentDate) {
                    const ref = imageMatch[1];
                    questions.push({
                        id: questions.length + 1,
                        date: currentDate,
                        imageRef: ref,
                        title: 'Problem from ' + currentDate
                    });
                    currentDate = null;
                }
            }
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                const m = line.match(/\[(image\d+)\]:\s*<(data:image\/[^;]+;base64,[^>]+)>/);
                if (m) imageData[m[1]] = m[2];
            }
            return { questions, imageData };
        },

        _dispatchReady() {
            window.dispatchEvent(new CustomEvent('olympiadDataReady'));
        },

        getQuestionForDay(dayOffset) {
            if (!this.initialized || this.randomIndex.length === 0) {
                return null;
            }
            const n = this.randomIndex.length;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
            let rotationStart = 0;
            try {
                const stored = localStorage.getItem(ROTATION_START_DAY_KEY);
                if (stored) rotationStart = parseInt(stored, 10) || 0;
            } catch (e) {}
            // Day index in rotation: 0 = first day after reset
            const dayIndex = daysSinceEpoch - rotationStart + dayOffset;
            const position = ((dayIndex % n) + n) % n;
            const index = this.randomIndex[position];
            const question = this.questions[index];
            if (!question) return null;
            return {
                question,
                dayNumber: position + 1,
                totalQuestions: n
            };
        },

        getTotalCount() {
            return this.questions.length;
        },

        /** Reset the daily rotation so today becomes problem #1 again. */
        resetRotation() {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
            try {
                localStorage.setItem(ROTATION_START_DAY_KEY, String(daysSinceEpoch));
                return true;
            } catch (e) {
                return false;
            }
        }
    };

    window.olympiadData = olympiadData;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => olympiadData.init());
    } else {
        olympiadData.init();
    }
})();
