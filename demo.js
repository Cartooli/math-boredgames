// MathBored Demo - Simple 10-problem progression

class MathDemo {
    constructor() {
        this.currentProblem = 0;
        this.totalProblems = 10;
        this.correctAnswers = 0;
        this.problems = [];
        this.currentAnswer = null;
        
        this.init();
    }
    
    init() {
        // Generate 10 simple problems
        this.generateProblems();
        
        // Setup event listeners
        this.setupEventListeners();
        
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
                    num1 = num2 * answer; // Ensure clean division
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
        
        // Calculate accuracy
        const accuracy = Math.round((this.correctAnswers / this.totalProblems) * 100);
        
        // Update stats
        finalScore.textContent = `${this.correctAnswers}/${this.totalProblems}`;
        finalAccuracy.textContent = `${accuracy}%`;
        
        // Show completion screen
        setTimeout(() => {
            completionScreen.classList.add('show');
        }, 500);
    }
    
    restart() {
        // Hide completion screen
        const completionScreen = document.getElementById('completionScreen');
        completionScreen.classList.remove('show');
        
        // Reset state
        this.currentProblem = 0;
        this.correctAnswers = 0;
        this.problems = [];
        
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

