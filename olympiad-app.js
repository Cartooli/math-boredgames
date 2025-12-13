// Math Olympiad Application Logic

const olympiadApp = {
    currentQuestion: null,
    currentDayOffset: 0,
    currentQuestionId: null,
    stats: {
        totalViewed: 0,
        daysActive: 0,
        currentStreak: 0,
        lastVisitDate: null
    },
    ratings: {}, // questionId -> {rating, count, sum}
    notes: {}, // questionId -> noteText
    
    init() {
        console.log('🎯 Initializing Olympiad App...');
        this.loadStats();
        this.loadRatings();
        this.loadNotes();
        this.setupEventListeners();
        
        // Wait for data to be ready
        if (olympiadData.initialized) {
            this.onDataReady();
        } else {
            window.addEventListener('olympiadDataReady', () => this.onDataReady());
        }
    },
    
    onDataReady() {
        console.log('✅ Data ready, loading question...');
        this.updateStats();
        this.showTodaysQuestion();
    },
    
    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.showPrevious();
            } else if (e.key === 'ArrowRight') {
                this.showNext();
            } else if (e.key === 'Enter' && e.target.id === 'searchInput') {
                this.performSearch();
            }
        });
    },
    
    showTodaysQuestion(dayOffset = 0) {
        if (!olympiadData.initialized) {
            console.log('Waiting for data...');
            return;
        }
        
        this.currentDayOffset = dayOffset;
        const questionData = olympiadData.getQuestionForDay(dayOffset);
        
        if (!questionData || !questionData.question) {
            this.showError('Failed to load question. Please refresh the page.');
            return;
        }
        
        this.currentQuestion = questionData;
        this.currentQuestionId = questionData.question.id;
        this.renderQuestion(questionData);
        this.updateDailyInfo(dayOffset);
        this.recordView();
    },
    
    renderQuestion(questionData) {
        const { question, dayNumber, totalQuestions } = questionData;
        const questionId = question.id;
        
        // Get rating data
        const ratingData = this.ratings[questionId] || { rating: 0, count: 0 };
        const avgRating = ratingData.count > 0 ? (ratingData.sum / ratingData.count).toFixed(1) : 0;
        
        // Get notes
        const savedNotes = this.notes[questionId] || '';
        
        // Get solution if available (requires olympiad-solutions.js)
        const solution = typeof olympiadSolutions !== 'undefined' ? olympiadSolutions.getSolution(questionId) : null;
        
        const html = `
            <div class="question-header">
                <div>
                    <div class="question-number">Problem #${dayNumber} of ${totalQuestions}</div>
                </div>
                <div class="question-date">${this.escapeHtml(question.date)}</div>
            </div>
            
            <!-- Difficulty Rating -->
            <div class="difficulty-rating">
                <div class="difficulty-label">Rate the difficulty:</div>
                <div class="star-rating" id="starRating">
                    ${[1, 2, 3, 4, 5].map(star => `
                        <span class="star ${star <= Math.round(avgRating) ? 'filled' : ''}" 
                              data-rating="${star}"
                              onmouseover="olympiadApp.hoverStar(${star})"
                              onmouseout="olympiadApp.resetStars()"
                              onclick="olympiadApp.rateQuestion(${star})">★</span>
                    `).join('')}
                </div>
                <div class="rating-info">
                    ${ratingData.count > 0 ? `Average: ${avgRating} / 5 (${ratingData.count} rating${ratingData.count > 1 ? 's' : ''})` : 'No ratings yet'}
                </div>
            </div>
            
            <!-- Share Section -->
            <div class="share-section">
                <div class="share-label">Share this problem:</div>
                <div class="share-buttons">
                    ${navigator.share ? `
                        <button class="share-btn native" onclick="olympiadApp.shareNative()">
                            📱 Share
                        </button>
                    ` : ''}
                    <button class="share-btn twitter" onclick="olympiadApp.shareTwitter()">
                        🐦 Twitter
                    </button>
                    <button class="share-btn facebook" onclick="olympiadApp.shareFacebook()">
                        👍 Facebook
                    </button>
                    <button class="share-btn copy" onclick="olympiadApp.copyLink()">
                        📋 Copy Link
                    </button>
                </div>
            </div>
            
            <div class="question-content">
                ${question.imageDataUrl ? 
                    `<img src="${question.imageDataUrl}" alt="Math Problem" class="question-image" />` :
                    `<div style="padding: 40px; text-align: center; color: var(--text-secondary);">
                        <p>📐 Problem from ${this.escapeHtml(question.date)}</p>
                        <p><em>Image: ${question.imageRef}</em></p>
                    </div>`
                }
            </div>
            
            <div class="progressive-disclosure">
                <div class="disclosure-section">
                    <div class="disclosure-header" onclick="olympiadApp.toggleSection('hints')">
                        <div class="disclosure-title">
                            💡 Hints
                        </div>
                        <div class="disclosure-icon">▼</div>
                    </div>
                    <div class="disclosure-content" id="hintsContent">
                        ${solution && solution.hints && solution.hints.length > 0 ? `
                            <p><em>Problem-specific hints:</em></p>
                            <ul class="hint-list">
                                ${solution.hints.map((hint, i) => `
                                    <li><span class="hint-number">${i + 1}</span>${this.escapeHtml(hint)}</li>
                                `).join('')}
                            </ul>
                        ` : `
                            <p><em>Think about the problem carefully. Consider:</em></p>
                            <ul class="hint-list">
                                <li><span class="hint-number">1</span>What is the problem really asking?</li>
                                <li><span class="hint-number">2</span>Can you break it into smaller parts?</li>
                                <li><span class="hint-number">3</span>Are there any patterns or symmetries?</li>
                                <li><span class="hint-number">4</span>Could working backwards help?</li>
                            </ul>
                        `}
                    </div>
                </div>
                
                <div class="disclosure-section">
                    <div class="disclosure-header" onclick="olympiadApp.toggleSection('solution')">
                        <div class="disclosure-title">
                            ${solution ? '✅ Solution' : '✅ Approach'}
                            ${solution && solution.verified ? '<span style="margin-left: 10px; font-size: 0.85em;">✓ Verified</span>' : ''}
                        </div>
                        <div class="disclosure-icon">▼</div>
                    </div>
                    <div class="disclosure-content" id="solutionContent">
                        ${solution ? `
                            ${(() => {
                                // Get voting stats if olympiadSolutions is available
                                const voteStats = typeof olympiadSolutions !== 'undefined' ? olympiadSolutions.getVoteStats(questionId) : null;
                                let voteIndicator = '';
                                
                                if (voteStats) {
                                    const badges = [];
                                    if (voteStats.userVote === 'up') badges.push('<span style="background: var(--success); color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; margin-right: 8px;">👍 You upvoted</span>');
                                    if (voteStats.userVote === 'down') badges.push('<span style="background: var(--error); color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; margin-right: 8px;">👎 You downvoted</span>');
                                    if (voteStats.userVerified) badges.push('<span style="background: var(--accent); color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem;">✓ You verified</span>');
                                    
                                    if (badges.length > 0) {
                                        voteIndicator = `<div style="margin-bottom: 15px;">${badges.join('')}</div>`;
                                    }
                                }
                                
                                return voteIndicator;
                            })()}
                            
                            <div style="background: var(--success-bg, rgba(34, 197, 94, 0.1)); padding: 20px; border-radius: 8px; border-left: 4px solid var(--success); margin-bottom: 20px;">
                                <p style="margin: 0;"><strong>Answer:</strong> ${this.escapeHtml(solution.answer)}</p>
                                ${solution.method ? `<p style="margin: 5px 0 0 0;"><em>Method: ${this.escapeHtml(solution.method)}</em></p>` : ''}
                            </div>
                            
                            ${solution.steps && solution.steps.length > 0 ? `
                                <p><strong>Step-by-Step Solution:</strong></p>
                                <ol style="padding-left: 20px;">
                                    ${solution.steps.map(step => `
                                        <li style="margin-bottom: 10px;">${this.escapeHtml(step)}</li>
                                    `).join('')}
                                </ol>
                            ` : ''}
                            
                            ${solution.explanation ? `
                                <p><strong>Explanation:</strong></p>
                                <p style="line-height: 1.7;">${this.escapeHtml(solution.explanation)}</p>
                            ` : ''}
                            
                            ${solution.sourceUrl ? `
                                <p style="margin-top: 20px;">
                                    <strong>Source:</strong> <a href="${this.escapeHtml(solution.sourceUrl)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(solution.sourceUrl)}</a>
                                </p>
                            ` : ''}
                            
                            <p style="margin-top: 20px; font-size: 0.9em; opacity: 0.8;">
                                <em>Last verified: ${new Date(solution.verificationDate).toLocaleDateString()}</em>
                            </p>
                            
                            <div style="margin-top: 20px; padding: 15px; background: var(--bg-secondary); border-radius: 8px; border-left: 3px solid var(--accent);">
                                <strong>💬 Have feedback?</strong><br>
                                <small>Visit <a href="solution-entry.html" style="color: var(--accent); font-weight: 600;">Solution Entry</a> to upvote, downvote, or verify this solution.</small>
                            </div>
                        ` : `
                            <p><strong>Problem-Solving Approach:</strong></p>
                            <ol style="padding-left: 20px;">
                                <li style="margin-bottom: 10px;">Read the problem carefully and identify what is given.</li>
                                <li style="margin-bottom: 10px;">Determine what you need to find.</li>
                                <li style="margin-bottom: 10px;">Draw a diagram if helpful.</li>
                                <li style="margin-bottom: 10px;">Try different strategies: look for patterns, work backwards, solve a simpler problem first.</li>
                                <li style="margin-bottom: 10px;">Check your answer to make sure it makes sense.</li>
                            </ol>
                            <p style="margin-top: 20px;"><em>Original problem from: ${this.escapeHtml(question.date)}</em></p>
                            <p style="margin-top: 15px; padding: 15px; background: var(--bg-secondary); border-radius: 8px;">
                                <strong>📝 Solution not yet available</strong><br>
                                <small>Solutions are being added incrementally. Check back later or contribute via <a href="solution-entry.html">solution entry</a>.</small>
                            </p>
                        `}
                    </div>
                </div>
                
                <!-- Notes Section -->
                <div class="disclosure-section">
                    <div class="disclosure-header" onclick="olympiadApp.toggleSection('notes')">
                        <div class="disclosure-title">
                            📝 My Notes
                        </div>
                        <div class="disclosure-icon">▼</div>
                    </div>
                    <div class="disclosure-content" id="notesContent">
                        <textarea 
                            class="notes-textarea" 
                            id="notesTextarea" 
                            placeholder="Write your thoughts, solution attempts, or notes here..."
                        >${this.escapeHtml(savedNotes)}</textarea>
                        <div class="notes-actions">
                            <button class="save-notes-btn" onclick="olympiadApp.saveNotes()">
                                💾 Save Notes
                            </button>
                            <div class="notes-status" id="notesStatus"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="navigation-buttons">
                <button class="btn-nav" onclick="olympiadApp.showPrevious()" id="prevBtn">
                    ← Previous
                </button>
                <button class="btn-nav" onclick="olympiadApp.showNext()" id="nextBtn">
                    Next →
                </button>
            </div>
        `;
        
        document.getElementById('questionCard').innerHTML = html;
    },
    
    // Rating System
    hoverStar(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('hover');
            } else {
                star.classList.remove('hover');
            }
        });
    },
    
    resetStars() {
        const ratingData = this.ratings[this.currentQuestionId] || { rating: 0, count: 0 };
        const avgRating = ratingData.count > 0 ? Math.round(ratingData.sum / ratingData.count) : 0;
        
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.classList.remove('hover');
            if (index < avgRating) {
                star.classList.add('filled');
            } else {
                star.classList.remove('filled');
            }
        });
    },
    
    rateQuestion(rating) {
        if (!this.currentQuestionId) return;
        
        const questionId = this.currentQuestionId;
        
        if (!this.ratings[questionId]) {
            this.ratings[questionId] = { sum: 0, count: 0 };
        }
        
        this.ratings[questionId].sum += rating;
        this.ratings[questionId].count += 1;
        
        this.saveRatings();
        
        const avgRating = (this.ratings[questionId].sum / this.ratings[questionId].count).toFixed(1);
        
        // Update display
        document.querySelector('.rating-info').textContent = 
            `Average: ${avgRating} / 5 (${this.ratings[questionId].count} rating${this.ratings[questionId].count > 1 ? 's' : ''})`;
        
        this.resetStars();
        this.showToast(`Rated ${rating} star${rating > 1 ? 's' : ''}! Thank you!`);
    },
    
    loadRatings() {
        try {
            const saved = localStorage.getItem('olympiadRatings');
            if (saved) {
                this.ratings = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading ratings:', error);
        }
    },
    
    saveRatings() {
        try {
            localStorage.setItem('olympiadRatings', JSON.stringify(this.ratings));
        } catch (error) {
            console.error('Error saving ratings:', error);
        }
    },
    
    // Notes System
    saveNotes() {
        const textarea = document.getElementById('notesTextarea');
        if (!textarea || !this.currentQuestionId) return;
        
        const notes = textarea.value;
        this.notes[this.currentQuestionId] = notes;
        
        try {
            localStorage.setItem('olympiadNotes', JSON.stringify(this.notes));
            this.showToast('Notes saved successfully!');
            
            const status = document.getElementById('notesStatus');
            if (status) {
                status.textContent = '✓ Saved';
                setTimeout(() => {
                    status.textContent = '';
                }, 2000);
            }
        } catch (error) {
            console.error('Error saving notes:', error);
            this.showToast('Failed to save notes. Please try again.');
        }
    },
    
    loadNotes() {
        try {
            const saved = localStorage.getItem('olympiadNotes');
            if (saved) {
                this.notes = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading notes:', error);
        }
    },
    
    // Social Sharing
    async shareNative() {
        const question = this.currentQuestion?.question;
        if (!question) return;
        
        const shareData = {
            title: `Math Olympiad Problem #${this.currentQuestion.dayNumber}`,
            text: `Check out this Math Olympiad problem from ${question.date}!`,
            url: `${window.location.origin}/olympiad.html?problem=${this.currentQuestion.dayNumber}`
        };
        
        try {
            await navigator.share(shareData);
            this.showToast('Shared successfully!');
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error sharing:', error);
            }
        }
    },
    
    shareTwitter() {
        const question = this.currentQuestion?.question;
        if (!question) return;
        
        const text = `Check out Math Olympiad Problem #${this.currentQuestion.dayNumber} from ${question.date}!`;
        const url = `${window.location.origin}/olympiad.html?problem=${this.currentQuestion.dayNumber}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        
        window.open(twitterUrl, '_blank', 'width=550,height=420');
    },
    
    shareFacebook() {
        const url = `${window.location.origin}/olympiad.html?problem=${this.currentQuestion.dayNumber}`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        
        window.open(facebookUrl, '_blank', 'width=550,height=420');
    },
    
    async copyLink() {
        const url = `${window.location.origin}/olympiad.html?problem=${this.currentQuestion.dayNumber}`;
        
        try {
            await navigator.clipboard.writeText(url);
            this.showToast('Link copied to clipboard!');
        } catch (error) {
            console.error('Error copying link:', error);
            
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = url;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                this.showToast('Link copied to clipboard!');
            } catch (err) {
                this.showToast('Failed to copy link. Please copy manually.');
            }
            
            document.body.removeChild(textarea);
        }
    },
    
    // Search/Filter
    performSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (!searchTerm) {
            this.showToast('Please enter a search term');
            return;
        }
        
        if (!olympiadData.initialized || olympiadData.questions.length === 0) {
            this.showToast('Questions not loaded yet');
            return;
        }
        
        // Search by question number first
        const questionNum = parseInt(searchTerm);
        if (!isNaN(questionNum) && questionNum > 0 && questionNum <= olympiadData.questions.length) {
            // Show that question
            const randomIndex = olympiadData.randomIndex[questionNum - 1];
            const question = olympiadData.questions[randomIndex];
            
            if (question) {
                // Calculate day offset to show this question
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
                const targetDay = (questionNum - 1) - (daysSinceEpoch % olympiadData.randomIndex.length);
                
                this.showTodaysQuestion(targetDay);
                this.showToast(`Showing Problem #${questionNum}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
        }
        
        // Search by date
        const foundQuestion = olympiadData.questions.find(q => 
            q.date.toLowerCase().includes(searchTerm)
        );
        
        if (foundQuestion) {
            // Find which position this is in the random index
            const actualIndex = foundQuestion.id - 1;
            const randomPosition = olympiadData.randomIndex.indexOf(actualIndex);
            
            if (randomPosition >= 0) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
                const targetDay = randomPosition - (daysSinceEpoch % olympiadData.randomIndex.length);
                
                this.showTodaysQuestion(targetDay);
                this.showToast(`Found: ${foundQuestion.date}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
        }
        
        this.showToast('No matching problem found');
    },
    
    clearSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        this.showTodaysQuestion(0);
        this.showToast('Showing today\'s problem');
    },
    
    // UI Helper Methods
    toggleSection(sectionName) {
        const content = document.getElementById(sectionName + 'Content');
        if (!content) return;
        
        const header = content.previousElementSibling;
        
        if (content.classList.contains('visible')) {
            content.classList.remove('visible');
            header.classList.remove('active');
        } else {
            content.classList.add('visible');
            header.classList.add('active');
        }
    },
    
    showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    },
    
    updateDailyInfo(dayOffset) {
        const infoText = document.getElementById('dailyInfoText');
        
        if (dayOffset === 0) {
            infoText.textContent = `This is today's problem. Come back tomorrow for a new challenge!`;
        } else if (dayOffset < 0) {
            const days = Math.abs(dayOffset);
            infoText.textContent = `Viewing a previous problem (${days} day${days > 1 ? 's' : ''} ago).`;
        } else {
            infoText.textContent = `Previewing a future problem (${dayOffset} day${dayOffset > 1 ? 's' : ''} ahead).`;
        }
    },
    
    showPrevious() {
        this.showTodaysQuestion(this.currentDayOffset - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    showNext() {
        this.showTodaysQuestion(this.currentDayOffset + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    loadStats() {
        try {
            const saved = localStorage.getItem('olympiadStats');
            if (saved) {
                this.stats = { ...this.stats, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    },
    
    saveStats() {
        try {
            localStorage.setItem('olympiadStats', JSON.stringify(this.stats));
        } catch (error) {
            console.error('Error saving stats:', error);
        }
    },
    
    recordView() {
        // Only record if viewing today's problem
        if (this.currentDayOffset !== 0) {
            return;
        }
        
        const today = new Date().toDateString();
        
        // Update streak
        if (this.stats.lastVisitDate !== today) {
            const lastVisit = this.stats.lastVisitDate ? new Date(this.stats.lastVisitDate) : null;
            
            if (lastVisit) {
                const lastDate = new Date(lastVisit);
                const todayDate = new Date(today);
                const daysDiff = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
                
                if (daysDiff === 1) {
                    // Consecutive day
                    this.stats.currentStreak++;
                } else if (daysDiff > 1) {
                    // Streak broken
                    this.stats.currentStreak = 1;
                }
            } else {
                // First visit
                this.stats.currentStreak = 1;
            }
            
            this.stats.lastVisitDate = today;
            this.stats.daysActive++;
        }
        
        this.saveStats();
        this.updateStats();
    },
    
    updateStats() {
        document.getElementById('totalQuestions').textContent = olympiadData.getTotalCount() || '-';
        document.getElementById('daysActive').textContent = this.stats.daysActive;
        document.getElementById('currentStreak').textContent = this.stats.currentStreak;
    },
    
    showError(message) {
        document.getElementById('questionCard').innerHTML = `
            <div class="loading-message">
                <div class="icon">⚠️</div>
                <h2>Oops!</h2>
                <p>${this.escapeHtml(message)}</p>
                <button class="btn-nav" onclick="location.reload()" style="margin-top: 20px;">
                    🔄 Refresh Page
                </button>
            </div>
        `;
    },
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => olympiadApp.init());
} else {
    olympiadApp.init();
}
