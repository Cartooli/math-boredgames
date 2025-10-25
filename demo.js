// MathBored Demo - Simple 10-problem progression

class MathDemo {
    constructor() {
        this.currentProblem = 0;
        this.totalProblems = 10;
        this.correctAnswers = 0;
        this.problems = [];
        this.currentAnswer = null;
        this.difficulty = 'easy';
        this.completedDifficulties = [];
        
        this.init();
    }
    
    init() {
        // Generate 10 simple problems
        this.generateProblems();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Update progress indicator with difficulty
        this.updateProgressIndicator();
        
        // Show first problem
        this.showProblem();
        
        // Show footer after a delay (progressive disclosure)
        setTimeout(() => {
            document.querySelector('.demo-footer').classList.add('show');
        }, 2000);
    }
    
    generateProblems() {
        const operators = ['+', '-', '×', '÷'];
        
        for (let i = 0; i < this.totalProblems; i++) {
            const operator = operators[Math.floor(Math.random() * operators.length)];
            let num1, num2, answer;
            
            switch(this.difficulty) {
                case 'easy':
                    ({ num1, num2, answer } = this.generateEasyProblem(operator));
                    break;
                case 'medium':
                    ({ num1, num2, answer } = this.generateMediumProblem(operator));
                    break;
                case 'hard':
                    ({ num1, num2, answer } = this.generateHardProblem(operator));
                    break;
            }
            
            this.problems.push({
                num1,
                num2,
                operator,
                answer
            });
        }
    }
    
    generateEasyProblem(operator) {
        let num1, num2, answer;
        
        switch(operator) {
            case '+':
                num1 = this.randomInt(1, 9);
                num2 = this.randomInt(1, 9);
                answer = num1 + num2;
                break;
            case '-':
                num1 = this.randomInt(5, 9);
                num2 = this.randomInt(1, num1);
                answer = num1 - num2;
                break;
            case '×':
                num1 = this.randomInt(2, 9);
                num2 = this.randomInt(2, 9);
                answer = num1 * num2;
                break;
            case '÷':
                num2 = this.randomInt(2, 9);
                answer = this.randomInt(1, 9);
                num1 = num2 * answer;
                break;
        }
        
        return { num1, num2, answer };
    }
    
    generateMediumProblem(operator) {
        let num1, num2, answer;
        
        switch(operator) {
            case '+':
                num1 = this.randomInt(10, 99);
                num2 = this.randomInt(10, 99);
                answer = num1 + num2;
                break;
            case '-':
                num1 = this.randomInt(50, 99);
                num2 = this.randomInt(10, num1);
                answer = num1 - num2;
                break;
            case '×':
                num1 = this.randomInt(10, 20);
                num2 = this.randomInt(2, 9);
                answer = num1 * num2;
                break;
            case '÷':
                num2 = this.randomInt(2, 12);
                answer = this.randomInt(5, 20);
                num1 = num2 * answer;
                break;
        }
        
        return { num1, num2, answer };
    }
    
    generateHardProblem(operator) {
        let num1, num2, answer;
        
        switch(operator) {
            case '+':
                num1 = this.randomInt(100, 999);
                num2 = this.randomInt(100, 999);
                answer = num1 + num2;
                break;
            case '-':
                num1 = this.randomInt(500, 999);
                num2 = this.randomInt(100, num1);
                answer = num1 - num2;
                break;
            case '×':
                num1 = this.randomInt(20, 99);
                num2 = this.randomInt(10, 25);
                answer = num1 * num2;
                break;
            case '÷':
                num2 = this.randomInt(10, 25);
                answer = this.randomInt(10, 50);
                num1 = num2 * answer;
                break;
        }
        
        return { num1, num2, answer };
    }
    
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    setupEventListeners() {
        const answerInput = document.getElementById('answerInput');
        const submitBtn = document.getElementById('submitBtn');
        const restartBtn = document.getElementById('restartBtn');
        
        // Enter key to submit
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
        
        // Show hint when user starts typing
        answerInput.addEventListener('input', () => {
            const hint = document.getElementById('actionHint');
            if (answerInput.value && !hint.classList.contains('show')) {
                hint.classList.add('show');
            }
        });
        
        // Submit button
        submitBtn.addEventListener('click', () => {
            this.checkAnswer();
        });
        
        // Restart button
        restartBtn.addEventListener('click', () => {
            this.restart();
        });
        
        // Difficulty selection buttons (will be added dynamically)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.difficulty-option')) {
                const difficulty = e.target.closest('.difficulty-option').dataset.difficulty;
                this.startDifficulty(difficulty);
            }
        });
    }
    
    showProblem() {
        const problem = this.problems[this.currentProblem];
        const problemDisplay = document.getElementById('problemDisplay');
        const answerInput = document.getElementById('answerInput');
        const feedbackArea = document.getElementById('feedbackArea');
        const actionHint = document.getElementById('actionHint');
        
        // Update progress
        document.querySelector('.current-problem').textContent = this.currentProblem + 1;
        
        // Animate problem display
        const problemArea = document.querySelector('.problem-area');
        problemArea.classList.remove('fade-in');
        problemArea.classList.add('fade-out');
        
        setTimeout(() => {
            // Update problem
            problemDisplay.innerHTML = `
                <span class="operand">${problem.num1}</span>
                <span class="operator">${problem.operator}</span>
                <span class="operand">${problem.num2}</span>
            `;
            
            // Reset input and feedback
            answerInput.value = '';
            answerInput.focus();
            feedbackArea.classList.remove('show', 'correct', 'incorrect');
            feedbackArea.textContent = '';
            actionHint.classList.remove('show');
            
            // Fade in
            problemArea.classList.remove('fade-out');
            problemArea.classList.add('fade-in');
        }, this.currentProblem === 0 ? 0 : 300);
    }
    
    checkAnswer() {
        const answerInput = document.getElementById('answerInput');
        const feedbackArea = document.getElementById('feedbackArea');
        const userAnswer = parseInt(answerInput.value);
        
        // Validate input
        if (isNaN(userAnswer) || answerInput.value === '') {
            return;
        }
        
        const problem = this.problems[this.currentProblem];
        const isCorrect = userAnswer === problem.answer;
        
        // Update stats
        if (isCorrect) {
            this.correctAnswers++;
        }
        
        // Show feedback
        feedbackArea.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        feedbackArea.textContent = isCorrect ? 
            '✓ Correct!' : 
            `✗ Not quite. The answer is ${problem.answer}`;
        
        // Hide action hint
        document.getElementById('actionHint').classList.remove('show');
        
        // Move to next problem or complete
        setTimeout(() => {
            this.currentProblem++;
            
            if (this.currentProblem < this.totalProblems) {
                this.showProblem();
            } else {
                this.showCompletion();
            }
        }, 1500);
    }
    
    showCompletion() {
        const completionScreen = document.getElementById('completionScreen');
        const finalScore = document.getElementById('finalScore');
        const finalAccuracy = document.getElementById('finalAccuracy');
        const completionTitle = document.querySelector('.completion-title');
        const completionIcon = document.querySelector('.completion-icon');
        const difficultySelection = document.getElementById('difficultySelection');
        
        // Calculate accuracy
        const accuracy = Math.round((this.correctAnswers / this.totalProblems) * 100);
        const isPerfect = this.correctAnswers === this.totalProblems;
        
        // Update stats
        finalScore.textContent = `${this.correctAnswers}/${this.totalProblems}`;
        finalAccuracy.textContent = `${accuracy}%`;
        
        // Update title and icon based on performance
        if (isPerfect) {
            if (this.difficulty === 'hard') {
                completionTitle.textContent = 'Master! 🏆';
                completionIcon.textContent = '🏆';
            } else {
                completionTitle.textContent = 'Perfect Score!';
                completionIcon.textContent = '🎉';
            }
        } else {
            completionTitle.textContent = 'Great Job!';
            completionIcon.textContent = '👏';
        }
        
        // Show difficulty selection only if perfect score and not on hard difficulty
        if (isPerfect && this.difficulty !== 'hard') {
            difficultySelection.classList.add('show');
            this.updateDifficultyOptions();
        } else {
            difficultySelection.classList.remove('show');
        }
        
        // Show completion screen
        setTimeout(() => {
            completionScreen.classList.add('show');
        }, 500);
    }
    
    updateDifficultyOptions() {
        // Show appropriate difficulty options based on current level
        const mediumBtn = document.querySelector('.difficulty-option[data-difficulty="medium"]');
        const hardBtn = document.querySelector('.difficulty-option[data-difficulty="hard"]');
        
        if (this.difficulty === 'easy') {
            mediumBtn.style.display = 'flex';
            hardBtn.style.display = 'flex';
        } else if (this.difficulty === 'medium') {
            mediumBtn.style.display = 'none';
            hardBtn.style.display = 'flex';
        }
    }
    
    startDifficulty(difficulty) {
        // Hide completion screen
        const completionScreen = document.getElementById('completionScreen');
        completionScreen.classList.remove('show');
        
        // Update difficulty and reset
        this.difficulty = difficulty;
        this.currentProblem = 0;
        this.correctAnswers = 0;
        this.problems = [];
        
        // Track completed difficulty
        if (!this.completedDifficulties.includes(difficulty)) {
            this.completedDifficulties.push(difficulty);
        }
        
        // Update progress indicator with difficulty badge
        this.updateProgressIndicator();
        
        // Generate new problems
        this.generateProblems();
        
        // Show first problem
        setTimeout(() => {
            this.showProblem();
        }, 500);
    }
    
    updateProgressIndicator() {
        const progressIndicator = document.querySelector('.progress-indicator');
        const difficultyBadge = progressIndicator.querySelector('.difficulty-badge') || 
            document.createElement('span');
        
        if (!progressIndicator.querySelector('.difficulty-badge')) {
            difficultyBadge.className = 'difficulty-badge';
            progressIndicator.insertBefore(difficultyBadge, progressIndicator.firstChild);
        }
        
        const difficultyLabels = {
            'easy': '🟢 Easy',
            'medium': '🟡 Medium',
            'hard': '🔴 Hard'
        };
        
        difficultyBadge.textContent = difficultyLabels[this.difficulty];
    }
    
    restart() {
        // Hide completion screen
        const completionScreen = document.getElementById('completionScreen');
        completionScreen.classList.remove('show');
        
        // Reset state to easy difficulty
        this.currentProblem = 0;
        this.correctAnswers = 0;
        this.problems = [];
        this.difficulty = 'easy';
        this.completedDifficulties = [];
        
        // Update progress indicator
        this.updateProgressIndicator();
        
        // Generate new problems
        this.generateProblems();
        
        // Show first problem
        setTimeout(() => {
            this.showProblem();
        }, 500);
    }
}

// Initialize demo when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MathDemo();
});

