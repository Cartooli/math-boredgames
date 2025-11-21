// MathBored Application Logic

class MathBoredApp {
    constructor() {
        this.currentGrade = '5';
        this.currentTopic = null;
        this.currentMode = 'lesson';
        this.currentProblem = null;
        this.currentAnswer = null;
        this.difficulty = 'medium';
        
        // Stats tracking
        this.stats = {
            streak: 0,
            score: 0,
            totalAttempts: 0,
            correctAnswers: 0
        };
        
        this.loadStats();
        this.init();
    }
    
    showError(message) {
        const contentArea = document.getElementById('contentArea');
        if (contentArea) {
            contentArea.innerHTML = `
                <div class="lesson-content" style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">⚠️</div>
                    <h2 style="color: var(--error); margin-bottom: 20px;">Oops! Something went wrong</h2>
                    <p style="font-size: 1.2rem; margin-bottom: 30px;">${message}</p>
                    <button class="btn-submit" onclick="window.location.reload()" style="margin-top: 20px;">
                        🔄 Refresh Page
                    </button>
                </div>
            `;
        }
    }
    
    init() {
        try {
            console.log('🎯 MathBored initializing...');
            
            // Verify data.js functions are available
            if (typeof getTopicsByGrade !== 'function') {
                console.error('❌ ERROR: getTopicsByGrade function not found! Check that data.js loaded correctly.');
                this.showError('Math data failed to load. Please try refreshing the page.');
                return;
            }
            
            if (typeof getConceptByName !== 'function') {
                console.error('❌ ERROR: getConceptByName function not found!');
                this.showError('Math data failed to load. Please try refreshing the page.');
                return;
            }
            
            console.log('✅ Data functions verified');
            
            this.setupEventListeners();
            console.log('✅ Event listeners set up');
            
            this.loadTheme();
            console.log('✅ Theme loaded');
            
            this.updateTopics();
            console.log('✅ Topics updated for grade:', this.currentGrade);
            
            this.updateStatsDisplay();
            console.log('✅ Stats display updated');
            
            console.log('🎯 MathBored initialized successfully!');
        } catch (error) {
            console.error('❌ FATAL ERROR during initialization:', error);
            this.showError('Failed to initialize MathBored. Please try refreshing the page.<br><small style="opacity: 0.7;">Error: ' + error.message + '</small>');
        }
    }
    
    setupEventListeners() {
        try {
            // Grade selection
            const gradeSelect = document.getElementById('gradeSelect');
            if (!gradeSelect) {
                console.error('❌ ERROR: Grade select element not found!');
                return;
            }
            
            gradeSelect.addEventListener('change', (e) => {
                console.log('📊 Grade changed to:', e.target.value);
                this.currentGrade = e.target.value;
                this.updateTopics();
            });
            
            // Topic selection
            const topicSelect = document.getElementById('topicSelect');
            if (!topicSelect) {
                console.error('❌ ERROR: Topic select element not found!');
                return;
            }
            
            topicSelect.addEventListener('change', (e) => {
                console.log('📖 Topic changed to:', e.target.value);
                this.currentTopic = e.target.value;
                this.render();
            });
            
            // Mode tabs
            const modeTabs = document.querySelectorAll('.mode-tab');
            if (modeTabs.length === 0) {
                console.warn('⚠️ WARNING: No mode tabs found!');
            }
            
            modeTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    console.log('🎮 Mode changed to:', e.target.dataset.mode);
                    document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
                    e.target.classList.add('active');
                    this.currentMode = e.target.dataset.mode;
                    this.render();
                });
            });
            
            // Theme selector
            const themeButtons = document.querySelectorAll('.theme-btn');
            if (themeButtons.length === 0) {
                console.warn('⚠️ WARNING: No theme buttons found!');
            }
            
            themeButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const theme = e.target.dataset.theme;
                    console.log('🎨 Theme changed to:', theme || 'default');
                    this.setTheme(theme);
                });
            });
        } catch (error) {
            console.error('❌ ERROR in setupEventListeners:', error);
        }
    }
    
    setTheme(theme) {
        const themes = ['ocean', 'forest', 'sunset', 'purple', 'light'];
        themes.forEach(t => document.body.classList.remove(`theme-${t}`));
        
        if (theme) {
            document.body.classList.add(`theme-${theme}`);
        }
        
        // Update active button state
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === (theme || '')) {
                btn.classList.add('active');
            }
        });
        
        localStorage.setItem('mathbored-theme', theme || '');
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('mathbored-theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        }
    }
    
    updateTopics() {
        try {
            console.log('📚 Updating topics for grade:', this.currentGrade);
            console.log('📚 getTopicsByGrade function type:', typeof getTopicsByGrade);
            console.log('📚 mathConcepts available:', typeof mathConcepts !== 'undefined' ? mathConcepts.length : 'undefined');
            
            const topics = getTopicsByGrade(this.currentGrade);
            console.log(`📚 Found ${topics.length} topics for grade ${this.currentGrade}`);
            if (topics.length > 0) {
                console.log('📚 First few topics:', topics.slice(0, 3).map(t => t.concept));
            }
            
            const topicSelect = document.getElementById('topicSelect');
            
            if (!topicSelect) {
                console.error('❌ ERROR: Topic select element not found!');
                return;
            }
            
            console.log('📚 Clearing topic dropdown...');
            topicSelect.innerHTML = '';
            
            if (topics.length > 0) {
                console.log('📚 Adding', topics.length, 'options to dropdown...');
                topics.forEach((topic, index) => {
                    const option = document.createElement('option');
                    option.value = topic.concept;
                    option.textContent = topic.concept;
                    topicSelect.appendChild(option);
                    if (index < 3) {
                        console.log(`  Added option ${index + 1}:`, topic.concept);
                    }
                });
                
                // Set the internal state and explicitly set the dropdown value
                this.currentTopic = topics[0].concept;
                topicSelect.value = this.currentTopic;
                console.log('✅ Set current topic to:', this.currentTopic);
                console.log('✅ Dropdown now has', topicSelect.options.length, 'options');
            } else {
                // Handle case where no topics are available for this grade
                console.warn('⚠️ No topics found for grade:', this.currentGrade);
                this.currentTopic = null;
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'No topics available';
                topicSelect.appendChild(option);
            }
            
            this.render();
        } catch (error) {
            console.error('❌ ERROR in updateTopics:', error);
            console.error('❌ Error stack:', error.stack);
            this.showError('Error loading topics. Please try refreshing the page.<br><small style="opacity: 0.7;">Error: ' + error.message + '</small>');
        }
    }
    
    render() {
        const contentArea = document.getElementById('contentArea');
        
        switch(this.currentMode) {
            case 'lesson':
                this.renderLesson(contentArea);
                break;
            case 'walkthrough':
                this.renderWalkthrough(contentArea);
                break;
            case 'practice':
                this.renderPractice(contentArea);
                break;
        }
    }
    
    renderLesson(container) {
        if (!this.currentTopic) {
            container.innerHTML = '<div class="loading">Please select a topic to view the lesson.</div>';
            return;
        }
        
        const conceptData = getConceptByName(this.currentTopic);
        if (!conceptData) {
            container.innerHTML = '<div class="loading">Topic data not found. Please select another topic.</div>';
            return;
        }
        
        const lessonHTML = this.generateLessonContent(conceptData);
        container.innerHTML = `<div class="lesson-content">${lessonHTML}</div>`;
    }
    
    generateLessonContent(concept) {
        const lessons = {
            "Counting and Cardinality": `
                <h2>Counting and Cardinality</h2>
                <p>Welcome to the wonderful world of numbers! Counting is one of the first and most important skills in mathematics.</p>
                
                <h3>What is Counting?</h3>
                <p>Counting means saying number names in order while pointing to objects. Each object gets exactly one number.</p>
                
                <div class="example">
                    <div class="example-title">Example: Counting Apples</div>
                    <p>🍎 🍎 🍎</p>
                    <p>Point to each apple and count: 1, 2, 3. There are <strong>3 apples</strong>!</p>
                </div>
                
                <h3>Cardinality</h3>
                <p>Cardinality is understanding that the last number you say tells you <strong>how many</strong> objects there are in total.</p>
                
                <div class="example">
                    <div class="example-title">Example: Understanding How Many</div>
                    <p>If you count 1, 2, 3, 4, 5 stars, there are <strong>5 stars</strong> total.</p>
                    <p>⭐ ⭐ ⭐ ⭐ ⭐</p>
                </div>
                
                <h3>Key Skills</h3>
                <ul>
                    <li>Count to 20 and beyond</li>
                    <li>Count objects accurately</li>
                    <li>Understand "how many"</li>
                    <li>Compare quantities (more, less, same)</li>
                </ul>
            `,
            
            "Number Recognition": `
                <h2>Number Recognition</h2>
                <p>Number recognition is the ability to identify and name written numerals. It's like learning to read, but with numbers!</p>
                
                <h3>Learning Numerals 0-20</h3>
                <p>Each number has a special symbol (numeral) that represents it:</p>
                
                <div class="example">
                    <div class="example-title">Numbers and Their Symbols</div>
                    <p><strong>0</strong> zero • <strong>1</strong> one • <strong>2</strong> two • <strong>3</strong> three • <strong>4</strong> four • <strong>5</strong> five</p>
                    <p><strong>6</strong> six • <strong>7</strong> seven • <strong>8</strong> eight • <strong>9</strong> nine • <strong>10</strong> ten</p>
                </div>
                
                <h3>Why is This Important?</h3>
                <p>Recognizing numbers quickly helps you:</p>
                <ul>
                    <li>Read phone numbers and addresses</li>
                    <li>Tell time</li>
                    <li>Count money</li>
                    <li>Do math faster</li>
                </ul>
                
                <div class="example">
                    <div class="example-title">Practice Tip</div>
                    <p>Look for numbers everywhere! On signs, in books, on clocks. The more you see them, the better you'll recognize them!</p>
                </div>
            `,
            
            "Addition": `
                <h2>Addition: Putting Things Together</h2>
                <p>Addition is combining two or more numbers to find their total sum. It's one of the most fundamental operations in mathematics!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Understanding Addition</h3>
                <p>When we add numbers, we're putting groups together. The numbers being added are called <strong>addends</strong>, and the result is called the <strong>sum</strong>.</p>
                
                <div class="example">
                    <div class="example-title">Example 1: Basic Addition</div>
                    <p><strong>5 + 3 = 8</strong></p>
                    <p>• 5 and 3 are the addends</p>
                    <p>• 8 is the sum</p>
                    <p>Think of it as: 5 apples plus 3 more apples gives us 8 apples total!</p>
                </div>
                
                <h3>Properties of Addition</h3>
                <p><strong>Commutative Property:</strong> The order doesn't matter.</p>
                <div class="example">3 + 5 = 5 + 3 = 8</div>
                
                <p><strong>Associative Property:</strong> Grouping doesn't matter.</p>
                <div class="example">(2 + 3) + 4 = 2 + (3 + 4) = 9</div>
                
                <p><strong>Identity Property:</strong> Adding zero doesn't change the number.</p>
                <div class="example">7 + 0 = 7</div>
                
                <div class="example">
                    <div class="example-title">Example 2: Multi-digit Addition</div>
                    <p>When adding larger numbers, align the place values and add column by column:</p>
                    <pre>   47
+ 38
─────
   85</pre>
                    <p>Add ones: 7 + 8 = 15 (write 5, carry 1)</p>
                    <p>Add tens: 4 + 3 + 1 = 8</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li>Shopping: Finding the total cost of items</li>
                    <li>Cooking: Combining ingredients</li>
                    <li>Gaming: Adding up scores</li>
                    <li>Time: Calculating durations</li>
                </ul>
            `,
            
            "Subtraction": `
                <h2>Subtraction: Taking Away</h2>
                <p>Subtraction is finding the difference between two numbers. It tells us how many are left when we take some away, or how much more one number is than another.</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Understanding Subtraction</h3>
                <p>In subtraction, we start with a <strong>minuend</strong>, subtract the <strong>subtrahend</strong>, and get the <strong>difference</strong>.</p>
                
                <div class="example">
                    <div class="example-title">Example 1: Basic Subtraction</div>
                    <p><strong>9 - 4 = 5</strong></p>
                    <p>• 9 is the minuend (what we start with)</p>
                    <p>• 4 is the subtrahend (what we take away)</p>
                    <p>• 5 is the difference (what's left)</p>
                </div>
                
                <h3>Important Rules</h3>
                <p>Unlike addition, subtraction is <strong>not commutative</strong>. The order matters!</p>
                <div class="example">9 - 4 = 5, but 4 - 9 = -5 (different answers!)</div>
                
                <p>Subtracting zero leaves the number unchanged:</p>
                <div class="example">7 - 0 = 7</div>
                
                <div class="example">
                    <div class="example-title">Example 2: Subtraction with Borrowing</div>
                    <p>When the top digit is smaller than the bottom digit, we borrow from the next place value:</p>
                    <pre>   52
- 27
─────
   25</pre>
                    <p>Can't subtract 7 from 2, so borrow 1 ten (10 ones)</p>
                    <p>Now: 12 - 7 = 5 (ones place)</p>
                    <p>And: 4 - 2 = 2 (tens place)</p>
                </div>
                
                <h3>Three Ways to Think About Subtraction</h3>
                <ul>
                    <li><strong>Take Away:</strong> I have 10 cookies and eat 3. How many are left?</li>
                    <li><strong>Comparison:</strong> I have 10 cookies, you have 7. How many more do I have?</li>
                    <li><strong>Missing Addend:</strong> I have 7 cookies. How many more do I need to have 10?</li>
                </ul>
            `,
            
            "Multiplication": `
                <h2>Multiplication: Groups of Numbers</h2>
                <p>Multiplication is repeated addition. It's a faster way to add the same number multiple times!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Understanding Multiplication</h3>
                <p>In multiplication, we have <strong>factors</strong> that we multiply together to get a <strong>product</strong>.</p>
                
                <div class="example">
                    <div class="example-title">Example 1: What is Multiplication?</div>
                    <p><strong>4 × 3 = 12</strong></p>
                    <p>This means "4 groups of 3" or 3 + 3 + 3 + 3 = 12</p>
                    <p>🍎🍎🍎 | 🍎🍎🍎 | 🍎🍎🍎 | 🍎🍎🍎 = 12 apples</p>
                </div>
                
                <h3>Properties of Multiplication</h3>
                <p><strong>Commutative Property:</strong> Order doesn't matter</p>
                <div class="example">4 × 3 = 3 × 4 = 12</div>
                
                <p><strong>Associative Property:</strong> Grouping doesn't matter</p>
                <div class="example">(2 × 3) × 4 = 2 × (3 × 4) = 24</div>
                
                <p><strong>Identity Property:</strong> Multiplying by 1 doesn't change the number</p>
                <div class="example">7 × 1 = 7</div>
                
                <p><strong>Zero Property:</strong> Multiplying by 0 always gives 0</p>
                <div class="example">7 × 0 = 0</div>
                
                <div class="example">
                    <div class="example-title">Example 2: Using Arrays</div>
                    <p>Arrays help us visualize multiplication:</p>
                    <pre>⭐ ⭐ ⭐ ⭐ ⭐
⭐ ⭐ ⭐ ⭐ ⭐
⭐ ⭐ ⭐ ⭐ ⭐</pre>
                    <p>3 rows of 5 stars = 3 × 5 = 15 stars</p>
                </div>
                
                <h3>Multiplication Tables</h3>
                <p>Learning multiplication tables (times tables) helps you solve problems quickly. Start with the easier ones:</p>
                <ul>
                    <li>1× table (always gives the same number)</li>
                    <li>2× table (doubles)</li>
                    <li>5× table (counts by fives)</li>
                    <li>10× table (adds a zero)</li>
                </ul>
            `,
            
            "Division": `
                <h2>Division: Splitting into Equal Groups</h2>
                <p>Division is splitting a number into equal groups. It's the inverse (opposite) operation of multiplication!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Understanding Division</h3>
                <p>In division, we start with the <strong>dividend</strong>, divide by the <strong>divisor</strong>, and get the <strong>quotient</strong>.</p>
                
                <div class="example">
                    <div class="example-title">Example 1: Basic Division</div>
                    <p><strong>12 ÷ 3 = 4</strong></p>
                    <p>• 12 is the dividend (what we're dividing)</p>
                    <p>• 3 is the divisor (how many groups)</p>
                    <p>• 4 is the quotient (how many in each group)</p>
                    <p>Think: "How many groups of 3 are in 12?" Answer: 4 groups!</p>
                </div>
                
                <h3>Two Ways to Think About Division</h3>
                <p><strong>1. Equal Groups:</strong> 12 cookies divided among 3 people = 4 cookies each</p>
                <p><strong>2. Repeated Subtraction:</strong> How many times can you subtract 3 from 12?</p>
                <div class="example">12 - 3 = 9, 9 - 3 = 6, 6 - 3 = 3, 3 - 3 = 0 (4 times!)</div>
                
                <h3>Important Rules</h3>
                <p>Division is <strong>not commutative</strong>. Order matters!</p>
                <div class="example">12 ÷ 3 = 4, but 3 ÷ 12 = 0.25 (different!)</div>
                
                <p>Dividing by 1 leaves the number unchanged:</p>
                <div class="example">7 ÷ 1 = 7</div>
                
                <p>Dividing a number by itself always gives 1:</p>
                <div class="example">7 ÷ 7 = 1</div>
                
                <p><strong>⚠️ Important:</strong> Division by zero is undefined (impossible)!</p>
                
                <div class="example">
                    <div class="example-title">Example 2: Division with Remainders</div>
                    <p><strong>17 ÷ 5 = 3 R2</strong></p>
                    <p>5 goes into 17 three times (5 × 3 = 15), with 2 left over.</p>
                    <p>The remainder is 2.</p>
                </div>
            `,
            
            "Fractions": `
                <h2>Fractions: Parts of a Whole</h2>
                <p>A fraction represents part of a whole or part of a group. It's like slicing a pizza!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Understanding Fractions</h3>
                <p>A fraction has two parts:</p>
                <ul>
                    <li><strong>Numerator</strong> (top number): How many parts we have</li>
                    <li><strong>Denominator</strong> (bottom number): How many equal parts in the whole</li>
                </ul>
                
                <div class="example">
                    <div class="example-title">Example: Pizza Fractions</div>
                    <p><strong>3/4</strong> means:</p>
                    <p>• The pizza is cut into 4 equal slices (denominator)</p>
                    <p>• We have 3 of those slices (numerator)</p>
                    <p>🍕🍕🍕◻️ (3 out of 4 slices)</p>
                </div>
                
                <h3>Types of Fractions</h3>
                <p><strong>Proper Fraction:</strong> Numerator < Denominator (3/4, 1/2)</p>
                <p><strong>Improper Fraction:</strong> Numerator ≥ Denominator (5/4, 7/3)</p>
                <p><strong>Unit Fraction:</strong> Numerator is 1 (1/2, 1/4, 1/8)</p>
                
                <div class="example">
                    <div class="example-title">Comparing Fractions</div>
                    <p>With the same denominator, compare numerators:</p>
                    <p><strong>3/8 < 5/8</strong> (3 pieces vs 5 pieces of the same size)</p>
                    <p>With the same numerator, larger denominator means smaller pieces:</p>
                    <p><strong>1/4 > 1/8</strong> (one-fourth is bigger than one-eighth)</p>
                </div>
                
                <h3>Real-World Fractions</h3>
                <ul>
                    <li>Cooking: 1/2 cup of sugar</li>
                    <li>Time: 1/4 of an hour = 15 minutes</li>
                    <li>Money: 1/4 of a dollar = 25 cents</li>
                    <li>Sports: 3/4 of the game completed</li>
                </ul>
            `,
            
            "Decimals": `
                <h2>Decimals: Another Way to Show Parts</h2>
                <p>Decimals are another way to represent fractions and parts of a whole, using place value.</p>
                
                <h3>Understanding Decimal Place Values</h3>
                <p>The decimal point separates whole numbers from parts less than one:</p>
                
                <div class="formula-box">12.345</div>
                
                <div class="example">
                    <div class="example-title">Place Value Breakdown</div>
                    <p><strong>12.345</strong> means:</p>
                    <ul>
                        <li>1 ten (10)</li>
                        <li>2 ones (2)</li>
                        <li>3 tenths (0.3)</li>
                        <li>4 hundredths (0.04)</li>
                        <li>5 thousandths (0.005)</li>
                    </ul>
                </div>
                
                <h3>Decimals and Fractions</h3>
                <p>Decimals and fractions are connected!</p>
                
                <div class="example">
                    <div class="example-title">Common Equivalents</div>
                    <p>0.5 = 1/2 (five tenths = one half)</p>
                    <p>0.25 = 1/4 (twenty-five hundredths = one quarter)</p>
                    <p>0.75 = 3/4 (seventy-five hundredths)</p>
                    <p>0.1 = 1/10 (one tenth)</p>
                </div>
                
                <h3>Comparing Decimals</h3>
                <p>Line up the decimal points and compare digit by digit from left to right:</p>
                
                <div class="example">
                    <div class="example-title">Which is Larger?</div>
                    <p>Compare 3.45 and 3.5:</p>
                    <p>3.45 has 4 tenths, 3.5 has 5 tenths</p>
                    <p>Therefore: <strong>3.5 > 3.45</strong></p>
                </div>
                
                <h3>Using Decimals</h3>
                <ul>
                    <li><strong>Money:</strong> $12.99 (12 dollars and 99 cents)</li>
                    <li><strong>Measurements:</strong> 5.75 meters</li>
                    <li><strong>Scores:</strong> 9.8 out of 10</li>
                    <li><strong>Statistics:</strong> Batting average of .325</li>
                </ul>
            `,
            
            "Integers": `
                <h2>Integers: Positive and Negative Numbers</h2>
                <p>Integers include all positive whole numbers, negative whole numbers, and zero. They extend the number line in both directions!</p>
                
                <h3>The Integer Number Line</h3>
                <div class="formula-box">... -3, -2, -1, 0, 1, 2, 3 ...</div>
                
                <p>Negative numbers are to the left of zero, positive numbers are to the right.</p>
                
                <div class="example">
                    <div class="example-title">Real-World Examples</div>
                    <ul>
                        <li><strong>Temperature:</strong> -5°F (5 degrees below zero)</li>
                        <li><strong>Elevation:</strong> -50 meters (50 meters below sea level)</li>
                        <li><strong>Bank Account:</strong> -$20 (owing $20, or overdrawn)</li>
                        <li><strong>Time:</strong> -2 means 2 years ago</li>
                    </ul>
                </div>
                
                <h3>Operations with Integers</h3>
                
                <p><strong>Adding Integers:</strong></p>
                <div class="example">
                    <p>Same signs: Add and keep the sign</p>
                    <p>5 + 3 = 8 and -5 + (-3) = -8</p>
                    <p>Different signs: Subtract and use sign of larger</p>
                    <p>5 + (-3) = 2 and -5 + 3 = -2</p>
                </div>
                
                <p><strong>Subtracting Integers:</strong></p>
                <div class="example">
                    <p>Keep-Change-Change: Keep first, change minus to plus, change sign of second</p>
                    <p>5 - 3 = 5 + (-3) = 2</p>
                    <p>5 - (-3) = 5 + 3 = 8</p>
                </div>
                
                <p><strong>Multiplying & Dividing:</strong></p>
                <div class="example">
                    <p>Same signs → Positive result</p>
                    <p>3 × 4 = 12 and -3 × (-4) = 12</p>
                    <p>Different signs → Negative result</p>
                    <p>3 × (-4) = -12 and -3 × 4 = -12</p>
                </div>
                
                <h3>Absolute Value</h3>
                <p>The absolute value of a number is its distance from zero (always positive):</p>
                <div class="formula-box">|5| = 5 and |-5| = 5</div>
            `,
            
            "Percentages": `
                <h2>Percentages: Parts per Hundred</h2>
                <p>A percentage is a ratio that compares a number to 100. "Percent" means "per hundred."</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Understanding Percentages</h3>
                <p>The symbol % means "out of 100". So 25% means 25 out of 100.</p>
                
                <div class="example">
                    <div class="example-title">Converting Between Forms</div>
                    <p><strong>25%</strong> can be written as:</p>
                    <ul>
                        <li>Fraction: 25/100 = 1/4</li>
                        <li>Decimal: 0.25</li>
                        <li>Percent: 25%</li>
                    </ul>
                </div>
                
                <h3>Common Percentages</h3>
                <div class="example">
                    <p>100% = the whole thing</p>
                    <p>50% = half (1/2 = 0.5)</p>
                    <p>25% = one quarter (1/4 = 0.25)</p>
                    <p>75% = three quarters (3/4 = 0.75)</p>
                    <p>10% = one tenth (1/10 = 0.1)</p>
                </div>
                
                <h3>Calculating Percentages</h3>
                
                <p><strong>Finding a Percentage of a Number:</strong></p>
                <div class="example">
                    <div class="example-title">What is 20% of 80?</div>
                    <p>Method 1: 20% = 0.20, so 0.20 × 80 = 16</p>
                    <p>Method 2: 20/100 × 80 = 1,600/100 = 16</p>
                </div>
                
                <p><strong>Finding What Percent:</strong></p>
                <div class="example">
                    <div class="example-title">15 is what percent of 60?</div>
                    <p>15/60 = 0.25 = 25%</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Shopping:</strong> "20% off" means pay 80% of the price</li>
                    <li><strong>Grades:</strong> Scored 85 out of 100 = 85%</li>
                    <li><strong>Statistics:</strong> 60% of students prefer pizza</li>
                    <li><strong>Finance:</strong> 5% interest rate on savings</li>
                </ul>
            `,
            
            "Pythagorean Theorem": `
                <h2>Pythagorean Theorem</h2>
                <p>One of the most famous theorems in mathematics! It describes the relationship between the sides of a right triangle.</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Understanding the Theorem</h3>
                <p>In a right triangle:</p>
                <ul>
                    <li><strong>a</strong> and <strong>b</strong> are the lengths of the two legs (sides forming the right angle)</li>
                    <li><strong>c</strong> is the length of the hypotenuse (longest side, opposite the right angle)</li>
                </ul>
                
                <div class="example">
                    <div class="example-title">Example: Finding the Hypotenuse</div>
                    <p>A right triangle has legs of length 3 and 4. Find the hypotenuse.</p>
                    <p>a² + b² = c²</p>
                    <p>3² + 4² = c²</p>
                    <p>9 + 16 = c²</p>
                    <p>25 = c²</p>
                    <p>c = √25 = 5</p>
                    <p><strong>The hypotenuse is 5 units long!</strong></p>
                </div>
                
                <h3>Pythagorean Triples</h3>
                <p>These are sets of three integers that satisfy the theorem:</p>
                <div class="example">
                    <p>(3, 4, 5) - The most common</p>
                    <p>(5, 12, 13)</p>
                    <p>(8, 15, 17)</p>
                    <p>(7, 24, 25)</p>
                </div>
                
                <h3>Real-World Applications</h3>
                <ul>
                    <li><strong>Construction:</strong> Ensuring corners are square</li>
                    <li><strong>Navigation:</strong> Finding shortest distance</li>
                    <li><strong>Architecture:</strong> Designing roofs and ramps</li>
                    <li><strong>Computer Graphics:</strong> Calculating distances</li>
                </ul>
                
                <div class="hint-box">
                    <div class="hint-title">💡 Pro Tip</div>
                    <p>The Pythagorean Theorem ONLY works for right triangles (triangles with a 90° angle)!</p>
                </div>
            `,
            
            "Quadratic Equations": `
                <h2>Quadratic Equations</h2>
                <p>Quadratic equations are polynomial equations of degree 2. They form beautiful U-shaped curves called parabolas!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Standard Form</h3>
                <p>A quadratic equation has the form ax² + bx + c = 0, where:</p>
                <ul>
                    <li><strong>a</strong> is the coefficient of x² (a ≠ 0)</li>
                    <li><strong>b</strong> is the coefficient of x</li>
                    <li><strong>c</strong> is the constant term</li>
                </ul>
                
                <h3>Solving Quadratic Equations</h3>
                
                <p><strong>1. Factoring Method:</strong></p>
                <div class="example">
                    <div class="example-title">Solve x² + 5x + 6 = 0</div>
                    <p>Factor: (x + 2)(x + 3) = 0</p>
                    <p>Set each factor to zero:</p>
                    <p>x + 2 = 0 → x = -2</p>
                    <p>x + 3 = 0 → x = -3</p>
                    <p><strong>Solutions: x = -2 or x = -3</strong></p>
                </div>
                
                <p><strong>2. Quadratic Formula:</strong></p>
                <div class="formula-box">x = (-b ± √(b² - 4ac)) / (2a)</div>
                
                <div class="example">
                    <div class="example-title">Solve 2x² + 5x + 2 = 0</div>
                    <p>a = 2, b = 5, c = 2</p>
                    <p>x = (-5 ± √(25 - 16)) / 4</p>
                    <p>x = (-5 ± √9) / 4</p>
                    <p>x = (-5 ± 3) / 4</p>
                    <p><strong>x = -1/2 or x = -2</strong></p>
                </div>
                
                <h3>The Discriminant</h3>
                <p>The discriminant (b² - 4ac) tells us about the solutions:</p>
                <div class="example">
                    <p>b² - 4ac > 0: Two real solutions</p>
                    <p>b² - 4ac = 0: One real solution</p>
                    <p>b² - 4ac < 0: No real solutions (two complex solutions)</p>
                </div>
                
                <h3>Real-World Applications</h3>
                <ul>
                    <li><strong>Physics:</strong> Projectile motion</li>
                    <li><strong>Engineering:</strong> Bridge design</li>
                    <li><strong>Economics:</strong> Profit maximization</li>
                    <li><strong>Sports:</strong> Trajectory of a ball</li>
                </ul>
            `,

            "Basic Shapes": `
                <h2>Basic Shapes</h2>
                <p>Shapes are all around us! Learning to identify and name shapes is an important early math skill.</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>The Four Basic Shapes</h3>
                
                <div class="example">
                    <div class="example-title">Circle ⭕</div>
                    <p>A circle is round with no corners or sides.</p>
                    <p><strong>Examples:</strong> Wheels, coins, plates, the sun</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Square ⬜</div>
                    <p>A square has 4 equal sides and 4 corners.</p>
                    <p><strong>Examples:</strong> Windows, crackers, tiles</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Triangle 🔺</div>
                    <p>A triangle has 3 sides and 3 corners.</p>
                    <p><strong>Examples:</strong> Slices of pizza, road signs, roofs</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Rectangle ▭</div>
                    <p>A rectangle has 4 sides (2 long, 2 short) and 4 corners.</p>
                    <p><strong>Examples:</strong> Doors, books, phones</p>
                </div>
                
                <h3>Shape Hunt Activity</h3>
                <p>Look around your room! Can you find examples of each shape?</p>
                <ul>
                    <li>Find 3 circles</li>
                    <li>Find 3 squares</li>
                    <li>Find 3 triangles</li>
                    <li>Find 3 rectangles</li>
                </ul>
                
                <h3>Counting Sides and Corners</h3>
                <ul>
                    <li><strong>Circle:</strong> 0 sides, 0 corners</li>
                    <li><strong>Triangle:</strong> 3 sides, 3 corners</li>
                    <li><strong>Square:</strong> 4 sides, 4 corners</li>
                    <li><strong>Rectangle:</strong> 4 sides, 4 corners</li>
                </ul>
            `,

            "Measurement Comparison": `
                <h2>Measurement Comparison</h2>
                <p>Comparing means finding out which object is bigger, smaller, heavier, or lighter!</p>
                
                <h3>Length Comparison</h3>
                <div class="example">
                    <div class="example-title">Longer and Shorter</div>
                    <p>A pencil is <strong>longer</strong> than a crayon.</p>
                    <p>A crayon is <strong>shorter</strong> than a pencil.</p>
                    <p>📏 (pencil) vs 🖍️ (crayon)</p>
                </div>
                
                <h3>Weight Comparison</h3>
                <div class="example">
                    <div class="example-title">Heavier and Lighter</div>
                    <p>A book is <strong>heavier</strong> than a feather.</p>
                    <p>A feather is <strong>lighter</strong> than a book.</p>
                    <p>📚 (heavy) vs 🪶 (light)</p>
                </div>
                
                <h3>Height Comparison</h3>
                <div class="example">
                    <div class="example-title">Taller and Shorter</div>
                    <p>A tree is <strong>taller</strong> than a flower.</p>
                    <p>A flower is <strong>shorter</strong> than a tree.</p>
                    <p>🌳 (tall) vs 🌸 (short)</p>
                </div>
                
                <h3>Comparison Words</h3>
                <ul>
                    <li><strong>Longer/Shorter:</strong> For length</li>
                    <li><strong>Taller/Shorter:</strong> For height</li>
                    <li><strong>Heavier/Lighter:</strong> For weight</li>
                    <li><strong>More/Less:</strong> For amounts</li>
                </ul>
                
                <h3>Practice</h3>
                <p>Compare these objects in your classroom:</p>
                <ul>
                    <li>Which is longer: a ruler or a pencil?</li>
                    <li>Which is heavier: a book or a piece of paper?</li>
                    <li>Which is taller: your desk or your chair?</li>
                </ul>
            `,

            "Patterns": `
                <h2>Patterns</h2>
                <p>Patterns are things that repeat in a predictable way. Finding and making patterns helps develop important math thinking skills!</p>
                
                <h3>What is a Pattern?</h3>
                <p>A pattern is when something happens over and over in the same order.</p>
                
                <div class="example">
                    <div class="example-title">Color Pattern</div>
                    <p>🔴 🔵 🔴 🔵 🔴 🔵</p>
                    <p>This pattern is: <strong>red, blue, red, blue...</strong></p>
                    <p>What comes next? <strong>Red!</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Shape Pattern</div>
                    <p>⭐ ⭕ ⭐ ⭕ ⭐ ⭕</p>
                    <p>This pattern is: <strong>star, circle, star, circle...</strong></p>
                    <p>What comes next? <strong>Star!</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Number Pattern</div>
                    <p>1, 2, 1, 2, 1, 2...</p>
                    <p>What comes next? <strong>1!</strong></p>
                </div>
                
                <h3>Types of Patterns</h3>
                <ul>
                    <li><strong>AB Pattern:</strong> Two things repeating (🔴🔵🔴🔵)</li>
                    <li><strong>ABC Pattern:</strong> Three things repeating (🔴🔵🟢🔴🔵🟢)</li>
                    <li><strong>ABB Pattern:</strong> One then two (🔴🔵🔵🔴🔵🔵)</li>
                </ul>
                
                <h3>Patterns in Real Life</h3>
                <p>Patterns are everywhere!</p>
                <ul>
                    <li>Days of the week repeat</li>
                    <li>Seasons repeat: Spring, Summer, Fall, Winter</li>
                    <li>Stripes on clothes</li>
                    <li>Tiles on floors</li>
                </ul>
                
                <h3>Make Your Own Pattern</h3>
                <p>Try creating patterns with:</p>
                <ul>
                    <li>Blocks or toys</li>
                    <li>Crayons or markers</li>
                    <li>Movements (clap, stomp, clap, stomp)</li>
                    <li>Sounds (beep, boop, beep, boop)</li>
                </ul>
            `,

            "Ordinal Numbers": `
                <h2>Ordinal Numbers</h2>
                <p>Ordinal numbers tell us the position or order of things. They help us describe where something is in a line or sequence!</p>
                
                <h3>The First Ten Ordinal Numbers</h3>
                <div class="example">
                    <div class="example-title">Ordinal Numbers 1-10</div>
                    <ul>
                        <li><strong>1st</strong> - First</li>
                        <li><strong>2nd</strong> - Second</li>
                        <li><strong>3rd</strong> - Third</li>
                        <li><strong>4th</strong> - Fourth</li>
                        <li><strong>5th</strong> - Fifth</li>
                        <li><strong>6th</strong> - Sixth</li>
                        <li><strong>7th</strong> - Seventh</li>
                        <li><strong>8th</strong> - Eighth</li>
                        <li><strong>9th</strong> - Ninth</li>
                        <li><strong>10th</strong> - Tenth</li>
                    </ul>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: Race Positions</div>
                    <p>🏃 🏃 🏃 🏃 🏃</p>
                    <p>The person in front is in <strong>first</strong> place.</p>
                    <p>The next person is in <strong>second</strong> place.</p>
                    <p>Who won the race? The person who finished <strong>first</strong>!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: Days of the Week</div>
                    <p>Monday is the <strong>first</strong> day of the school week.</p>
                    <p>Tuesday is the <strong>second</strong> day.</p>
                    <p>What is the <strong>third</strong> day? <strong>Wednesday!</strong></p>
                </div>
                
                <h3>Ordinal vs Cardinal</h3>
                <ul>
                    <li><strong>Cardinal:</strong> How many? (1, 2, 3) "I have 3 apples"</li>
                    <li><strong>Ordinal:</strong> What position? (1st, 2nd, 3rd) "I'm 3rd in line"</li>
                </ul>
                
                <h3>Where We Use Ordinal Numbers</h3>
                <ul>
                    <li>Race positions (1st place, 2nd place)</li>
                    <li>Floors in buildings (1st floor, 2nd floor)</li>
                    <li>Steps in recipes (First, mix eggs. Second, add flour.)</li>
                    <li>Waiting in line</li>
                </ul>
            `,

            "Simple Data Collection": `
                <h2>Simple Data Collection</h2>
                <p>Data collection means gathering information and organizing it. Even young mathematicians can collect and sort data!</p>
                
                <h3>What is Data?</h3>
                <p>Data is information we collect. It can be about anything - favorite colors, types of pets, or what we had for snack!</p>
                
                <div class="example">
                    <div class="example-title">Example: Favorite Fruit Survey</div>
                    <p>We asked 10 friends: "What's your favorite fruit?"</p>
                    <p>🍎 🍎 🍎 🍎 (4 picked apples)</p>
                    <p>🍌 🍌 🍌 (3 picked bananas)</p>
                    <p>🍊 🍊 (2 picked oranges)</p>
                    <p>🍇 (1 picked grapes)</p>
                    <p><strong>Result:</strong> Apples are the most popular!</p>
                </div>
                
                <h3>Ways to Organize Data</h3>
                
                <div class="example">
                    <div class="example-title">Sorting by Category</div>
                    <p>We can sort things into groups:</p>
                    <ul>
                        <li><strong>Animals:</strong> 🐕 🐈 🐦</li>
                        <li><strong>Food:</strong> 🍎 🍕 🍪</li>
                        <li><strong>Toys:</strong> 🧸 ⚽ 🎮</li>
                    </ul>
                </div>
                
                <div class="example">
                    <div class="example-title">Using Tally Marks</div>
                    <p>Tally marks help us count quickly:</p>
                    <p><strong>Dogs:</strong> |||| (4 dogs)</p>
                    <p><strong>Cats:</strong> ||| (3 cats)</p>
                </div>
                
                <h3>Data Collection Activities</h3>
                <ul>
                    <li>Survey classmates about their favorite color</li>
                    <li>Count different types of vehicles that pass by</li>
                    <li>Track the weather for a week</li>
                    <li>Count different shapes in your classroom</li>
                </ul>
                
                <h3>Why Collect Data?</h3>
                <ul>
                    <li>To answer questions</li>
                    <li>To make decisions</li>
                    <li>To see patterns</li>
                    <li>To compare things</li>
                </ul>
            `,
            
            // === GRADE 1 LESSONS (19 topics) ===
            
            "Place Value": `
                <h2>Place Value</h2>
                <p>Place value is understanding what each digit in a number means based on its position. It's the foundation of our number system!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Understanding Ones and Tens</h3>
                <p>Every number has different places, and each place has a different value:</p>
                
                <div class="example">
                    <div class="example-title">The Number 23</div>
                    <p><strong>2</strong> is in the <strong>tens place</strong> = 2 tens = 20</p>
                    <p><strong>3</strong> is in the <strong>ones place</strong> = 3 ones = 3</p>
                    <p>Together: 20 + 3 = <strong>23</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Visual Representation</div>
                    <p>We can show 23 using base-ten blocks:</p>
                    <p>📦📦 🔷🔷🔷 (2 tens and 3 ones)</p>
                    <p>Each box 📦 = 10, Each diamond 🔷 = 1</p>
                </div>
                
                <h3>Breaking Numbers Apart</h3>
                <p>We can decompose (break apart) numbers to see their place values:</p>
                
                <div class="example">
                    <div class="example-title">Number 47</div>
                    <p>47 = <strong>4 tens + 7 ones</strong></p>
                    <p>47 = <strong>40 + 7</strong></p>
                    <p>📦📦📦📦 🔷🔷🔷🔷🔷🔷🔷</p>
                </div>
                
                <h3>Why Place Value Matters</h3>
                <ul>
                    <li>Helps us read and write numbers correctly</li>
                    <li>Essential for adding and subtracting</li>
                    <li>Makes understanding larger numbers easier</li>
                    <li>Used in real life (money, addresses, etc.)</li>
                </ul>
                
                <h3>Practice</h3>
                <p>Look at the number 56:</p>
                <ul>
                    <li>What digit is in the tens place? <strong>5</strong></li>
                    <li>What does that 5 mean? <strong>5 tens = 50</strong></li>
                    <li>What digit is in the ones place? <strong>6</strong></li>
                    <li>So 56 = <strong>50 + 6</strong></li>
                </ul>
            `,

            "Two-Digit Addition": `
                <h2>Two-Digit Addition</h2>
                <p>Two-digit addition means adding numbers from 10 to 99. Once you understand place value, adding bigger numbers becomes much easier!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Adding Without Regrouping</h3>
                <p>When the ones add up to less than 10, it's straightforward:</p>
                
                <div class="example">
                    <div class="example-title">Example: 23 + 45</div>
                    <pre>  23
+ 45
----
  68</pre>
                    <p><strong>Step 1:</strong> Add the ones: 3 + 5 = 8</p>
                    <p><strong>Step 2:</strong> Add the tens: 20 + 40 = 60</p>
                    <p><strong>Answer:</strong> 60 + 8 = <strong>68</strong></p>
                </div>
                
                <h3>Adding With Regrouping (Carrying)</h3>
                <p>When ones add up to 10 or more, we need to regroup:</p>
                
                <div class="example">
                    <div class="example-title">Example: 27 + 15</div>
                    <pre>  ¹27
+ 15
----
  42</pre>
                    <p><strong>Step 1:</strong> Add the ones: 7 + 5 = 12</p>
                    <p>That's 1 ten and 2 ones! Write 2, carry the 1 ten.</p>
                    <p><strong>Step 2:</strong> Add the tens: 1 + 2 + 1 = 4 tens</p>
                    <p><strong>Answer:</strong> <strong>42</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Visual Method</div>
                    <p>27 + 15 using base-ten blocks:</p>
                    <p>27: 📦📦 🔷🔷🔷🔷🔷🔷🔷</p>
                    <p>15: 📦 🔷🔷🔷🔷🔷</p>
                    <p>Combine: 📦📦📦 🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷</p>
                    <p>That's 12 ones! Trade 10 ones for 1 ten:</p>
                    <p>📦📦📦📦 🔷🔷 = <strong>42</strong></p>
                </div>
                
                <h3>Tips for Success</h3>
                <ul>
                    <li>Always line up the ones and tens columns</li>
                    <li>Start by adding the ones place first</li>
                    <li>Remember: 10 ones = 1 ten</li>
                    <li>Check your work by estimating first</li>
                </ul>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li>Adding scores in games</li>
                    <li>Counting money</li>
                    <li>Finding totals when shopping</li>
                    <li>Adding up collections</li>
                </ul>
            `,

            "Two-Digit Subtraction": `
                <h2>Two-Digit Subtraction</h2>
                <p>Subtraction means taking away or finding the difference. With two-digit numbers, we use place value to make it easier!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Subtracting Without Regrouping</h3>
                <p>When each digit in the first number is bigger, subtraction is simple:</p>
                
                <div class="example">
                    <div class="example-title">Example: 48 − 23</div>
                    <pre>  48
− 23
----
  25</pre>
                    <p><strong>Step 1:</strong> Subtract the ones: 8 − 3 = 5</p>
                    <p><strong>Step 2:</strong> Subtract the tens: 4 − 2 = 2 tens = 20</p>
                    <p><strong>Answer:</strong> <strong>25</strong></p>
                </div>
                
                <h3>Subtracting With Regrouping (Borrowing)</h3>
                <p>When the bottom ones digit is bigger, we need to regroup:</p>
                
                <div class="example">
                    <div class="example-title">Example: 52 − 27</div>
                    <pre>  ⁴¹52
− 27
----
  25</pre>
                    <p><strong>Step 1:</strong> Can't do 2 − 7, so borrow!</p>
                    <p>Borrow 1 ten from 5 tens → 4 tens and 12 ones</p>
                    <p><strong>Step 2:</strong> Now: 12 − 7 = 5 ones</p>
                    <p><strong>Step 3:</strong> And: 4 − 2 = 2 tens</p>
                    <p><strong>Answer:</strong> <strong>25</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Visual Method</div>
                    <p>52 − 27 using base-ten blocks:</p>
                    <p>Start with: 📦📦📦📦📦 🔷🔷</p>
                    <p>Need to take away 7 ones, but only have 2!</p>
                    <p>Trade 1 ten for 10 ones:</p>
                    <p>📦📦📦📦 🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷</p>
                    <p>Now take away 27 (2 tens and 7 ones):</p>
                    <p>📦📦 🔷🔷🔷🔷🔷 = <strong>25</strong></p>
                </div>
                
                <h3>Steps to Remember</h3>
                <ol>
                    <li>Line up the places correctly</li>
                    <li>Start with the ones place</li>
                    <li>If needed, borrow from the tens</li>
                    <li>Subtract the tens place</li>
                </ol>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li>Finding how much change you get</li>
                    <li>Calculating age differences</li>
                    <li>Figuring out how many more you need</li>
                    <li>Finding scores in games</li>
                </ul>
            `,

            "Comparing Numbers": `
                <h2>Comparing Numbers</h2>
                <p>Comparing numbers means figuring out which is greater, which is less, or if they're equal. We use special symbols to show comparisons!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>The Three Comparison Symbols</h3>
                
                <div class="example">
                    <div class="example-title">Greater Than (>)</div>
                    <p><strong>25 > 18</strong></p>
                    <p>25 is <strong>greater than</strong> 18</p>
                    <p>Think of it like a hungry alligator eating the bigger number! 🐊</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Less Than (<)</div>
                    <p><strong>15 < 22</strong></p>
                    <p>15 is <strong>less than</strong> 22</p>
                    <p>The alligator wants to eat 22 (the bigger number)! 🐊</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Equal To (=)</div>
                    <p><strong>20 = 20</strong></p>
                    <p>20 is <strong>equal to</strong> 20</p>
                    <p>The numbers are the same!</p>
                </div>
                
                <h3>How to Compare Two-Digit Numbers</h3>
                
                <div class="example">
                    <div class="example-title">Step-by-Step: Compare 47 and 52</div>
                    <p><strong>Step 1:</strong> Compare the tens place first</p>
                    <p>47 has 4 tens, 52 has 5 tens</p>
                    <p>5 tens > 4 tens, so 52 > 47</p>
                    <p><strong>Answer: 47 < 52</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Step-by-Step: Compare 34 and 38</div>
                    <p><strong>Step 1:</strong> Compare the tens place</p>
                    <p>Both have 3 tens (they're the same!)</p>
                    <p><strong>Step 2:</strong> Compare the ones place</p>
                    <p>4 ones < 8 ones</p>
                    <p><strong>Answer: 34 < 38</strong></p>
                </div>
                
                <h3>The Alligator Trick</h3>
                <p>Remember: The alligator's mouth always opens toward the BIGGER number!</p>
                <ul>
                    <li>35 🐊 28 means 35 > 28</li>
                    <li>15 🐊 42 means 15 < 42</li>
                    <li>The open mouth eats the bigger number!</li>
                </ul>
                
                <h3>Practice Tips</h3>
                <ul>
                    <li>Always compare tens place first</li>
                    <li>If tens are equal, compare ones place</li>
                    <li>Use number lines to visualize</li>
                    <li>Remember: greater means "more than"</li>
                </ul>
            `,

            "Telling Time": `
                <h2>Telling Time</h2>
                <p>Learning to tell time helps you know when things happen during the day. Let's learn to read both analog (clock with hands) and digital clocks!</p>
                
                <h3>Parts of a Clock</h3>
                <div class="example">
                    <div class="example-title">Clock Basics</div>
                    <ul>
                        <li><strong>Hour Hand:</strong> The short hand (shows the hour)</li>
                        <li><strong>Minute Hand:</strong> The long hand (shows the minutes)</li>
                        <li><strong>Numbers:</strong> 1 through 12 around the clock</li>
                    </ul>
                </div>
                
                <h3>Telling Time to the Hour</h3>
                <div class="example">
                    <div class="example-title">On the Hour</div>
                    <p>When the minute hand points to 12:</p>
                    <p>⏰ If the hour hand points to 3, it's <strong>3:00</strong> (3 o'clock)</p>
                    <p>⏰ If the hour hand points to 7, it's <strong>7:00</strong> (7 o'clock)</p>
                    <p>⏰ If the hour hand points to 12, it's <strong>12:00</strong> (12 o'clock)</p>
                </div>
                
                <h3>Telling Time to the Half Hour</h3>
                <div class="example">
                    <div class="example-title">Half Past the Hour</div>
                    <p>When the minute hand points to 6:</p>
                    <p>⏰ If the hour hand is halfway between 2 and 3, it's <strong>2:30</strong> (half past 2)</p>
                    <p>⏰ If the hour hand is halfway between 5 and 6, it's <strong>5:30</strong> (half past 5)</p>
                    <p>The minute hand at 6 means <strong>30 minutes</strong>!</p>
                </div>
                
                <h3>Digital vs Analog</h3>
                <div class="example">
                    <div class="example-title">Same Time, Different Display</div>
                    <p><strong>Analog Clock:</strong> Shows 4 o'clock with hands</p>
                    <p><strong>Digital Clock:</strong> Shows <strong>4:00</strong> with numbers</p>
                    <p>Both mean the same time!</p>
                </div>
                
                <h3>Times of Day</h3>
                <ul>
                    <li><strong>Morning:</strong> When you wake up (7:00, 8:00, 9:00)</li>
                    <li><strong>Afternoon:</strong> After lunch (1:00, 2:00, 3:00)</li>
                    <li><strong>Evening:</strong> Before bed (6:00, 7:00, 8:00)</li>
                    <li><strong>Night:</strong> When it's dark (9:00, 10:00, 11:00)</li>
                </ul>
                
                <h3>Real-Life Time</h3>
                <ul>
                    <li>School starts at 8:00</li>
                    <li>Lunch might be at 12:00</li>
                    <li>Bedtime might be at 8:00 or 8:30</li>
                    <li>Your favorite show comes on at a certain time!</li>
                </ul>
            `,

            "Measurement (Length)": `
                <h2>Measurement (Length)</h2>
                <p>Measurement tells us how long, tall, or wide something is. We can measure using different tools and units!</p>
                
                <h3>Non-Standard Units</h3>
                <p>Before learning inches and centimeters, we can measure with everyday objects:</p>
                
                <div class="example">
                    <div class="example-title">Measuring with Paper Clips</div>
                    <p>📎📎📎📎📎</p>
                    <p>This pencil is <strong>5 paper clips long</strong></p>
                    <p>We line up paper clips end-to-end to measure!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Other Non-Standard Units</div>
                    <ul>
                        <li>Cubes: "The book is 8 cubes wide"</li>
                        <li>Hands: "The desk is 4 hands high"</li>
                        <li>Footsteps: "The room is 12 steps across"</li>
                    </ul>
                </div>
                
                <h3>Standard Units</h3>
                <p>Standard units are the same for everyone:</p>
                
                <div class="example">
                    <div class="example-title">Inches (in)</div>
                    <p>An inch is about as long as your thumb! 👍</p>
                    <p>We use a <strong>ruler</strong> to measure inches</p>
                    <p>12 inches = 1 foot</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Centimeters (cm)</div>
                    <p>A centimeter is smaller than an inch</p>
                    <p>About the width of your pinky finger</p>
                    <p>We also use a ruler to measure centimeters</p>
                </div>
                
                <h3>Using a Ruler</h3>
                <div class="example">
                    <div class="example-title">How to Measure</div>
                    <ol>
                        <li>Line up one end of the object with the 0 on the ruler</li>
                        <li>Look at where the other end reaches</li>
                        <li>Read the number - that's the length!</li>
                        <li>Don't forget to say the unit (inches or centimeters)</li>
                    </ol>
                </div>
                
                <h3>Which Tool to Use?</h3>
                <ul>
                    <li><strong>Ruler:</strong> For small things (pencils, books, hands)</li>
                    <li><strong>Yardstick:</strong> For medium things (desks, doors)</li>
                    <li><strong>Tape Measure:</strong> For big things (rooms, people's height)</li>
                </ul>
                
                <h3>Practice Ideas</h3>
                <p>Measure things around you!</p>
                <ul>
                    <li>How long is your pencil?</li>
                    <li>How wide is your desk?</li>
                    <li>How tall are you?</li>
                    <li>How long is your shoe?</li>
                </ul>
            `,

            "Basic Shapes and Attributes": `
                <h2>Basic Shapes and Attributes</h2>
                <p>Shapes have special features called attributes. Let's explore what makes each shape unique!</p>
                
                <h3>Shape Attributes</h3>
                <p><strong>Attributes</strong> are special features of shapes:</p>
                <ul>
                    <li><strong>Sides:</strong> The straight edges of a shape</li>
                    <li><strong>Vertices (corners):</strong> Where two sides meet</li>
                    <li><strong>Size:</strong> How big or small</li>
                    <li><strong>Color:</strong> What color it is</li>
                </ul>
                
                <h3>Triangle Attributes</h3>
                <div class="example">
                    <div class="example-title">Triangle 🔺</div>
                    <ul>
                        <li><strong>Sides:</strong> 3 straight sides</li>
                        <li><strong>Vertices:</strong> 3 corners</li>
                        <li><strong>Special feature:</strong> Always has 3 sides, no matter the size!</li>
                    </ul>
                    <p>All these are triangles: 🔺 ▲ △</p>
                </div>
                
                <h3>Square Attributes</h3>
                <div class="example">
                    <div class="example-title">Square ⬜</div>
                    <ul>
                        <li><strong>Sides:</strong> 4 equal sides (all the same length!)</li>
                        <li><strong>Vertices:</strong> 4 corners (all square corners)</li>
                        <li><strong>Special feature:</strong> All sides must be equal</li>
                    </ul>
                </div>
                
                <h3>Rectangle Attributes</h3>
                <div class="example">
                    <div class="example-title">Rectangle ▭</div>
                    <ul>
                        <li><strong>Sides:</strong> 4 sides (2 long, 2 short)</li>
                        <li><strong>Vertices:</strong> 4 square corners</li>
                        <li><strong>Special feature:</strong> Opposite sides are equal</li>
                    </ul>
                    <p>A square is a special type of rectangle!</p>
                </div>
                
                <h3>Circle Attributes</h3>
                <div class="example">
                    <div class="example-title">Circle ⭕</div>
                    <ul>
                        <li><strong>Sides:</strong> 0 sides (it's curved!)</li>
                        <li><strong>Vertices:</strong> 0 corners</li>
                        <li><strong>Special feature:</strong> Perfectly round, every point on the edge is the same distance from the center</li>
                    </ul>
                </div>
                
                <h3>Composing Shapes</h3>
                <p>We can make new shapes by putting shapes together!</p>
                <div class="example">
                    <div class="example-title">Making New Shapes</div>
                    <p>Two triangles 🔺🔺 → Can make a square!</p>
                    <p>Two squares ⬜⬜ → Can make a rectangle!</p>
                    <p>Three triangles 🔺🔺🔺 → Can make a trapezoid!</p>
                </div>
                
                <h3>Shape Detective</h3>
                <p>Look around you! Can you find:</p>
                <ul>
                    <li>3 triangles in your room?</li>
                    <li>5 rectangles?</li>
                    <li>2 circles?</li>
                    <li>Any shapes made from other shapes?</li>
                </ul>
            `,

            "Word Problems (Addition/Subtraction)": `
                <h2>Word Problems (Addition/Subtraction)</h2>
                <p>Word problems are math stories! They describe real situations where we need to use math to find an answer.</p>
                
                <h3>Steps to Solve Word Problems</h3>
                <div class="example">
                    <div class="example-title">The Four Steps</div>
                    <ol>
                        <li><strong>Read</strong> the problem carefully</li>
                        <li><strong>Understand</strong> what it's asking</li>
                        <li><strong>Solve</strong> using addition or subtraction</li>
                        <li><strong>Check</strong> if your answer makes sense</li>
                    </ol>
                </div>
                
                <h3>Addition Word Problems</h3>
                <p>Look for words like: <strong>total, altogether, in all, combined</strong></p>
                
                <div class="example">
                    <div class="example-title">Example 1: Adding Together</div>
                    <p><strong>Problem:</strong> Sarah has 5 apples. Her friend gives her 3 more apples. How many apples does Sarah have now?</p>
                    <p><strong>Step 1:</strong> What do we know? Sarah starts with 5, gets 3 more</p>
                    <p><strong>Step 2:</strong> What do we find? How many <strong>in all</strong></p>
                    <p><strong>Step 3:</strong> 5 + 3 = 8</p>
                    <p><strong>Answer:</strong> Sarah has <strong>8 apples</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example 2: Combining</div>
                    <p><strong>Problem:</strong> There are 7 birds in a tree and 4 birds on the ground. How many birds are there altogether?</p>
                    <p><strong>Solution:</strong> 7 + 4 = <strong>11 birds</strong></p>
                </div>
                
                <h3>Subtraction Word Problems</h3>
                <p>Look for words like: <strong>left, remain, how many more, difference</strong></p>
                
                <div class="example">
                    <div class="example-title">Example 3: Taking Away</div>
                    <p><strong>Problem:</strong> Jake had 9 crayons. He gave 4 to his sister. How many crayons does Jake have left?</p>
                    <p><strong>Step 1:</strong> What do we know? Starts with 9, gives away 4</p>
                    <p><strong>Step 2:</strong> What do we find? How many <strong>left</strong></p>
                    <p><strong>Step 3:</strong> 9 − 4 = 5</p>
                    <p><strong>Answer:</strong> Jake has <strong>5 crayons</strong> left</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example 4: Comparison</div>
                    <p><strong>Problem:</strong> Emma has 12 stickers. Ben has 7 stickers. How many more stickers does Emma have?</p>
                    <p><strong>Solution:</strong> 12 − 7 = <strong>5 more stickers</strong></p>
                </div>
                
                <h3>Key Words to Watch For</h3>
                <ul>
                    <li><strong>Addition:</strong> total, sum, altogether, in all, combined, both</li>
                    <li><strong>Subtraction:</strong> left, remain, difference, how many more, take away</li>
                </ul>
                
                <h3>Drawing Pictures Helps!</h3>
                <p>Draw circles, stars, or boxes to represent the objects in the problem. It makes the math easier to see!</p>
            `,

            "Data Organization": `
                <h2>Data Organization</h2>
                <p>Organizing data means arranging information so it's easy to see and understand. Graphs and charts help us do this!</p>
                
                <h3>Picture Graphs</h3>
                <p>Picture graphs use pictures or symbols to show data:</p>
                
                <div class="example">
                    <div class="example-title">Favorite Pets</div>
                    <p><strong>Dogs:</strong> 🐕🐕🐕🐕🐕 (5 students)</p>
                    <p><strong>Cats:</strong> 🐈🐈🐈 (3 students)</p>
                    <p><strong>Fish:</strong> 🐠🐠 (2 students)</p>
                    <p><strong>What do we learn?</strong> More students prefer dogs!</p>
                </div>
                
                <h3>Simple Bar Graphs</h3>
                <p>Bar graphs use bars to show amounts:</p>
                
                <div class="example">
                    <div class="example-title">Favorite Colors</div>
                    <p>Each square = 1 student</p>
                    <p><strong>Red:</strong> ⬜⬜⬜⬜ (4 students)</p>
                    <p><strong>Blue:</strong> ⬜⬜⬜⬜⬜⬜ (6 students)</p>
                    <p><strong>Green:</strong> ⬜⬜ (2 students)</p>
                    <p><strong>What's most popular?</strong> Blue!</p>
                </div>
                
                <h3>Tally Charts</h3>
                <p>Tally charts use marks to count:</p>
                
                <div class="example">
                    <div class="example-title">Weather This Week</div>
                    <p><strong>Sunny:</strong> |||| (4 days)</p>
                    <p><strong>Rainy:</strong> || (2 days)</p>
                    <p><strong>Cloudy:</strong> | (1 day)</p>
                    <p>Remember: |||| means 5</p>
                </div>
                
                <h3>Reading Graphs</h3>
                <p>When you look at a graph, ask:</p>
                <ul>
                    <li>What is the graph about? (Read the title)</li>
                    <li>What do the pictures/bars represent?</li>
                    <li>Which has the most?</li>
                    <li>Which has the least?</li>
                    <li>How many altogether?</li>
                </ul>
                
                <h3>Making Your Own Graph</h3>
                <div class="example">
                    <div class="example-title">Steps to Create a Graph</div>
                    <ol>
                        <li>Collect your data (survey friends, count objects)</li>
                        <li>Choose your graph type (picture or bar)</li>
                        <li>Draw and label your graph</li>
                        <li>Add a title</li>
                        <li>Share what you learned!</li>
                    </ol>
                </div>
                
                <h3>Why Organize Data?</h3>
                <ul>
                    <li>Makes information easy to understand</li>
                    <li>Helps us compare different things</li>
                    <li>Shows patterns we might not notice otherwise</li>
                    <li>Helps us make decisions</li>
                </ul>
            `,

            "Number Bonds": `
                <h2>Number Bonds</h2>
                <p>Number bonds show how numbers can be broken into parts. They help us understand how numbers work together!</p>
                
                <h3>What is a Number Bond?</h3>
                <p>A number bond shows a whole number and its parts:</p>
                
                <div class="example">
                    <div class="example-title">Number Bond for 5</div>
                    <p>The number 5 can be made from different parts:</p>
                    <p><strong>5 = 2 + 3</strong></p>
                    <p><strong>5 = 1 + 4</strong></p>
                    <p><strong>5 = 0 + 5</strong></p>
                    <p>We draw this like a tree: 5 at the top, parts at the bottom</p>
                </div>
                
                <h3>Part-Part-Whole</h3>
                <div class="example">
                    <div class="example-title">Understanding the Relationship</div>
                    <p><strong>Whole:</strong> The total number (8)</p>
                    <p><strong>Part:</strong> One piece of the whole (5)</p>
                    <p><strong>Part:</strong> The other piece (3)</p>
                    <p>Together: 5 + 3 = 8</p>
                </div>
                
                <h3>Number Bonds for 10</h3>
                <p>The number 10 is very important! Here are all the bonds for 10:</p>
                
                <div class="example">
                    <div class="example-title">All the Ways to Make 10</div>
                    <ul>
                        <li>10 = <strong>0 + 10</strong></li>
                        <li>10 = <strong>1 + 9</strong></li>
                        <li>10 = <strong>2 + 8</strong></li>
                        <li>10 = <strong>3 + 7</strong></li>
                        <li>10 = <strong>4 + 6</strong></li>
                        <li>10 = <strong>5 + 5</strong></li>
                    </ul>
                    <p>Memorizing these helps with mental math!</p>
                </div>
                
                <h3>Using Number Bonds</h3>
                <div class="example">
                    <div class="example-title">Example: Missing Part</div>
                    <p><strong>Problem:</strong> The whole is 7. One part is 4. What's the other part?</p>
                    <p><strong>Think:</strong> 4 + ? = 7</p>
                    <p><strong>Solution:</strong> 4 + <strong>3</strong> = 7</p>
                    <p>The missing part is <strong>3</strong>!</p>
                </div>
                
                <h3>Real-Life Number Bonds</h3>
                <ul>
                    <li>You have 8 toys total. 5 are cars, 3 are trucks.</li>
                    <li>A pizza has 10 slices. You eat 3, there are 7 left.</li>
                    <li>Your class has 6 boys and 4 girls, that's 10 students total.</li>
                </ul>
                
                <h3>Why Number Bonds Matter</h3>
                <ul>
                    <li>Helps with addition and subtraction</li>
                    <li>Makes mental math easier</li>
                    <li>Shows how numbers relate to each other</li>
                    <li>Foundation for algebra later on!</li>
                </ul>
            `,

            "Fact Families": `
                <h2>Fact Families</h2>
                <p>Fact families are groups of related addition and subtraction facts that use the same numbers. They show how addition and subtraction are connected!</p>
                
                <h3>What is a Fact Family?</h3>
                <p>A fact family uses the same 3 numbers to make 4 different equations:</p>
                
                <div class="example">
                    <div class="example-title">Fact Family: 2, 3, and 5</div>
                    <p><strong>Addition Facts:</strong></p>
                    <p>2 + 3 = 5</p>
                    <p>3 + 2 = 5</p>
                    <p><strong>Subtraction Facts:</strong></p>
                    <p>5 − 2 = 3</p>
                    <p>5 − 3 = 2</p>
                    <p>All four use the numbers 2, 3, and 5!</p>
                </div>
                
                <h3>How Fact Families Work</h3>
                <div class="example">
                    <div class="example-title">The Connection</div>
                    <p>If you know <strong>4 + 5 = 9</strong>, then you also know:</p>
                    <ul>
                        <li>5 + 4 = 9 (addition is commutative!)</li>
                        <li>9 − 4 = 5 (subtraction is the opposite)</li>
                        <li>9 − 5 = 4 (subtraction is the opposite)</li>
                    </ul>
                    <p><strong>One fact helps you know four facts!</strong></p>
                </div>
                
                <h3>Building a Fact Family</h3>
                <div class="example">
                    <div class="example-title">Example: Numbers 3, 6, and 9</div>
                    <p><strong>Step 1:</strong> Start with the smallest numbers</p>
                    <p>3 + 6 = 9</p>
                    <p><strong>Step 2:</strong> Flip the addition</p>
                    <p>6 + 3 = 9</p>
                    <p><strong>Step 3:</strong> Write the subtraction facts</p>
                    <p>9 − 3 = 6</p>
                    <p>9 − 6 = 3</p>
                </div>
                
                <h3>Special Fact Families</h3>
                <div class="example">
                    <div class="example-title">Doubles: 4, 4, and 8</div>
                    <p>When two numbers are the same:</p>
                    <p>4 + 4 = 8</p>
                    <p>8 − 4 = 4</p>
                    <p>Only 2 facts instead of 4!</p>
                </div>
                
                <h3>Why Fact Families Are Useful</h3>
                <ul>
                    <li>Shows addition and subtraction are related</li>
                    <li>Helps you check your work</li>
                    <li>Makes memorizing facts easier (know 1, get 4!)</li>
                    <li>Builds number sense</li>
                </ul>
                
                <h3>Practice Activity</h3>
                <p>Try making fact families for these numbers:</p>
                <ul>
                    <li>2, 5, 7</li>
                    <li>4, 3, 7</li>
                    <li>1, 8, 9</li>
                </ul>
                
                <h3>Real-World Connection</h3>
                <p>You have 7 crayons. 3 are red, 4 are blue.</p>
                <ul>
                    <li>3 + 4 = 7 (total crayons)</li>
                    <li>7 − 3 = 4 (blue crayons left if you remove red)</li>
                </ul>
            `,

            "Three-Addend Addition": `
                <h2>Three-Addend Addition</h2>
                <p>Sometimes we need to add THREE numbers together! The good news is, we already know how to do this - we just add step by step.</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Adding Three Numbers</h3>
                <p>When adding three numbers, add any two first, then add the third:</p>
                
                <div class="example">
                    <div class="example-title">Example: 4 + 3 + 2</div>
                    <p><strong>Method 1: Add left to right</strong></p>
                    <p>Step 1: 4 + 3 = 7</p>
                    <p>Step 2: 7 + 2 = <strong>9</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Same Problem, Different Strategy</div>
                    <p><strong>Method 2: Look for a 10!</strong></p>
                    <p>4 + 3 + 2</p>
                    <p>Notice: 3 + 2 = 5, and 4 + 5 is easy!</p>
                    <p>Or better: 4 + 2 = 6, then 6 + 3 = 9!</p>
                </div>
                
                <h3>Making Tens Strategy</h3>
                <p>Looking for numbers that make 10 makes adding easier:</p>
                
                <div class="example">
                    <div class="example-title">Example: 7 + 8 + 3</div>
                    <p>Look! 7 + 3 = 10 (that's easy!)</p>
                    <p>Then: 10 + 8 = <strong>18</strong></p>
                    <p>Much easier than 7 + 8 first!</p>
                </div>
                
                <h3>Doubles Strategy</h3>
                <div class="example">
                    <div class="example-title">Example: 5 + 5 + 2</div>
                    <p>I know my doubles! 5 + 5 = 10</p>
                    <p>Then: 10 + 2 = <strong>12</strong></p>
                </div>
                
                <h3>Any Order Works!</h3>
                <p>Remember the commutative property? You can add in ANY order:</p>
                <ul>
                    <li>2 + 3 + 5 = 10</li>
                    <li>3 + 5 + 2 = 10</li>
                    <li>5 + 2 + 3 = 10</li>
                    <li>All the same answer!</li>
                </ul>
                
                <h3>Real-Life Examples</h3>
                <ul>
                    <li>You have 3 red marbles, 4 blue marbles, and 2 green marbles. How many total? 3 + 4 + 2 = 9</li>
                    <li>Three friends bring cookies: 5, 3, and 4. How many cookies? 5 + 3 + 4 = 12</li>
                </ul>
            `,

            "Missing Addends": `
                <h2>Missing Addends</h2>
                <p>Sometimes in addition problems, one number is missing! We need to be detectives and figure out what it is.</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is a Missing Addend?</h3>
                <p>A missing addend is the unknown number in an addition problem:</p>
                
                <div class="example">
                    <div class="example-title">Example: 5 + ? = 8</div>
                    <p>We know: One addend is 5, the sum is 8</p>
                    <p>We need to find: The missing addend</p>
                    <p><strong>Question:</strong> 5 plus what equals 8?</p>
                    <p><strong>Answer:</strong> 5 + <strong>3</strong> = 8</p>
                </div>
                
                <h3>Strategies to Find Missing Addends</h3>
                
                <div class="example">
                    <div class="example-title">Strategy 1: Count Up</div>
                    <p>Problem: 6 + ? = 10</p>
                    <p>Start at 6 and count up to 10:</p>
                    <p>6... 7, 8, 9, 10</p>
                    <p>That's 4 jumps! 6 + <strong>4</strong> = 10</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Strategy 2: Use Subtraction</div>
                    <p>Problem: 7 + ? = 12</p>
                    <p><strong>Think:</strong> This is related to subtraction!</p>
                    <p>12 − 7 = 5</p>
                    <p>So: 7 + <strong>5</strong> = 12</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Strategy 3: Use Number Bonds</div>
                    <p>Problem: 4 + ? = 9</p>
                    <p>Think of 9 broken into parts: 4 and ?</p>
                    <p>9 = 4 + 5</p>
                    <p>The missing part is <strong>5</strong>!</p>
                </div>
                
                <h3>Missing Addend in Different Positions</h3>
                <p>The mystery number can be anywhere:</p>
                <ul>
                    <li>? + 3 = 7 (missing first addend: <strong>4</strong>)</li>
                    <li>5 + ? = 8 (missing second addend: <strong>3</strong>)</li>
                    <li>Both work the same way!</li>
                </ul>
                
                <h3>Real-World Problems</h3>
                <div class="example">
                    <div class="example-title">Story Problem</div>
                    <p>Emma has some stickers. Her friend gives her 3 more. Now she has 10 stickers. How many did Emma start with?</p>
                    <p><strong>Equation:</strong> ? + 3 = 10</p>
                    <p><strong>Solution:</strong> 10 − 3 = 7</p>
                    <p>Emma started with <strong>7 stickers</strong></p>
                </div>
            `,

            "Number Line Operations": `
                <h2>Number Line Operations</h2>
                <p>A number line is like a math road! It helps us see addition and subtraction as jumps forward and backward.</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is a Number Line?</h3>
                <p>A number line shows numbers in order on a line:</p>
                <div class="example">
                    <div class="example-title">A Simple Number Line</div>
                    <p>0 ── 1 ── 2 ── 3 ── 4 ── 5 ── 6 ── 7 ── 8 ── 9 ── 10</p>
                    <p>Numbers get bigger as you move right →</p>
                    <p>Numbers get smaller as you move left ←</p>
                </div>
                
                <h3>Addition on a Number Line</h3>
                <p>Addition means jumping FORWARD (to the right):</p>
                
                <div class="example">
                    <div class="example-title">Example: 3 + 4</div>
                    <p><strong>Step 1:</strong> Start at 3</p>
                    <p><strong>Step 2:</strong> Jump forward 4 times</p>
                    <p>3 → 4 → 5 → 6 → 7</p>
                    <p><strong>Answer:</strong> 3 + 4 = <strong>7</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Showing Jumps</div>
                    <p>0 ── 1 ── 2 ── 3 →→→→ 7</p>
                    <p>Start at 3, jump forward 4, land on 7!</p>
                </div>
                
                <h3>Subtraction on a Number Line</h3>
                <p>Subtraction means jumping BACKWARD (to the left):</p>
                
                <div class="example">
                    <div class="example-title">Example: 8 − 3</div>
                    <p><strong>Step 1:</strong> Start at 8</p>
                    <p><strong>Step 2:</strong> Jump backward 3 times</p>
                    <p>8 → 7 → 6 → 5</p>
                    <p><strong>Answer:</strong> 8 − 3 = <strong>5</strong></p>
                </div>
                
                <h3>Why Use Number Lines?</h3>
                <ul>
                    <li>Makes addition and subtraction visual</li>
                    <li>Helps you see how numbers relate</li>
                    <li>Easy to check your work</li>
                    <li>Great for mental math practice</li>
                </ul>
                
                <h3>Practice Tip</h3>
                <p>Make your own number line!</p>
                <ul>
                    <li>Draw a line on paper</li>
                    <li>Mark numbers 0 to 20</li>
                    <li>Use your finger to jump</li>
                    <li>Practice both addition and subtraction!</li>
                </ul>
            `,

            "Coin Recognition": `
                <h2>Coin Recognition</h2>
                <p>Money is an important part of everyday life! Let's learn to recognize the four most common coins and their values.</p>
                
                <h3>The Four Main Coins</h3>
                
                <div class="example">
                    <div class="example-title">Penny 🪙</div>
                    <p><strong>Value:</strong> 1 cent (1¢)</p>
                    <p><strong>Color:</strong> Brown/copper</p>
                    <p><strong>Front:</strong> Abraham Lincoln</p>
                    <p><strong>Back:</strong> Lincoln Memorial or shield</p>
                    <p><strong>Remember:</strong> "A penny for your thoughts" = 1 cent</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Nickel 🪙</div>
                    <p><strong>Value:</strong> 5 cents (5¢)</p>
                    <p><strong>Color:</strong> Silver</p>
                    <p><strong>Front:</strong> Thomas Jefferson</p>
                    <p><strong>Size:</strong> Bigger than a penny</p>
                    <p><strong>Remember:</strong> <strong>Nick</strong>el = <strong>5</strong> (both have 5 letters!)</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Dime 🪙</div>
                    <p><strong>Value:</strong> 10 cents (10¢)</p>
                    <p><strong>Color:</strong> Silver</p>
                    <p><strong>Front:</strong> Franklin D. Roosevelt</p>
                    <p><strong>Size:</strong> Smallest coin!</p>
                    <p><strong>Remember:</strong> <strong>D</strong>ime = <strong>D</strong>ecade = <strong>10</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Quarter 🪙</div>
                    <p><strong>Value:</strong> 25 cents (25¢)</p>
                    <p><strong>Color:</strong> Silver</p>
                    <p><strong>Front:</strong> George Washington</p>
                    <p><strong>Size:</strong> Biggest silver coin</p>
                    <p><strong>Remember:</strong> <strong>Quarter</strong> = 1/4 of a dollar (100¢ ÷ 4 = 25¢)</p>
                </div>
                
                <h3>Comparing Coin Values</h3>
                <ul>
                    <li>1 nickel = 5 pennies</li>
                    <li>1 dime = 10 pennies = 2 nickels</li>
                    <li>1 quarter = 25 pennies = 5 nickels = 2 dimes + 1 nickel</li>
                </ul>
                
                <h3>Coin Recognition Tips</h3>
                <ul>
                    <li><strong>Size:</strong> Dime is smallest, quarter is biggest</li>
                    <li><strong>Color:</strong> Only penny is brown, others are silver</li>
                    <li><strong>Edges:</strong> Pennies and nickels are smooth, dimes and quarters have ridges</li>
                </ul>
                
                <h3>Practice Activity</h3>
                <p>Look at the coins in your house!</p>
                <ul>
                    <li>Can you name each coin?</li>
                    <li>Can you tell how much each is worth?</li>
                    <li>Can you put them in order from least to greatest value?</li>
                </ul>
            `,

            "Half Hour Time": `
                <h2>Half Hour Time</h2>
                <p>You've learned to tell time on the hour (3:00, 4:00). Now let's learn half-hour time - when the minute hand points to 6!</p>
                
                <h3>Understanding "Half Past"</h3>
                <p>Half past means 30 minutes after the hour - halfway to the next hour!</p>
                
                <div class="example">
                    <div class="example-title">The Minute Hand at 6</div>
                    <p>When the <strong>minute hand (long hand)</strong> points straight down at the 6:</p>
                    <p>It means <strong>30 minutes</strong> have passed</p>
                    <p>This is called "half past" because 30 minutes is half of 60 minutes!</p>
                </div>
                
                <h3>Reading Half-Hour Time</h3>
                
                <div class="example">
                    <div class="example-title">3:30 (Half Past 3)</div>
                    <p>⏰ <strong>Hour hand:</strong> Halfway between 3 and 4</p>
                    <p>⏰ <strong>Minute hand:</strong> Points to 6</p>
                    <p><strong>We say:</strong> "Three thirty" or "Half past three"</p>
                    <p><strong>We write:</strong> 3:30</p>
                </div>
                
                <div class="example">
                    <div class="example-title">7:30 (Half Past 7)</div>
                    <p>⏰ <strong>Hour hand:</strong> Halfway between 7 and 8</p>
                    <p>⏰ <strong>Minute hand:</strong> Points to 6</p>
                    <p><strong>We say:</strong> "Seven thirty" or "Half past seven"</p>
                    <p><strong>We write:</strong> 7:30</p>
                </div>
                
                <h3>Important: Where's the Hour Hand?</h3>
                <p>At half-hour times, the hour hand is <strong>between</strong> two numbers!</p>
                <ul>
                    <li>At 2:00, hour hand points to 2</li>
                    <li>At 2:30, hour hand is halfway between 2 and 3</li>
                    <li>At 3:00, hour hand points to 3</li>
                </ul>
                
                <h3>Digital vs Analog</h3>
                <div class="example">
                    <div class="example-title">Same Time, Two Ways</div>
                    <p><strong>Analog (clock with hands):</strong></p>
                    <p>Hour hand between 4 and 5, minute hand at 6</p>
                    <p><strong>Digital:</strong> 4:30</p>
                    <p><strong>In words:</strong> Half past four OR Four thirty</p>
                </div>
                
                <h3>Real-Life Half Hours</h3>
                <ul>
                    <li>School might start at 8:30</li>
                    <li>Lunch might be at 12:30</li>
                    <li>Your favorite show might come on at 3:30</li>
                    <li>Dinner might be at 6:30</li>
                </ul>
                
                <h3>Practice Tip</h3>
                <p>Remember: The minute hand at 6 always means :30!</p>
            `,

            "Equal Parts": `
                <h2>Equal Parts</h2>
                <p>Equal parts means dividing something into pieces that are exactly the same size. This is the beginning of understanding fractions!</p>
                
                <h3>What Does Equal Mean?</h3>
                <p>Equal means <strong>exactly the same</strong> - same size, same amount.</p>
                
                <div class="example">
                    <div class="example-title">Equal vs Not Equal</div>
                    <p><strong>Equal Parts:</strong> ▭ ▭ (two parts the same size)</p>
                    <p><strong>Not Equal:</strong> ▭ ▭▭ (parts are different sizes)</p>
                </div>
                
                <h3>Halves: Dividing into 2 Equal Parts</h3>
                <div class="example">
                    <div class="example-title">Understanding Halves</div>
                    <p>When we cut something into <strong>2 equal parts</strong>, each part is called a <strong>half</strong></p>
                    <p>🍕 cut into 2 equal pieces → Each piece is <strong>1/2</strong> (one half)</p>
                    <p>Both halves together make one whole!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Real-Life Halves</div>
                    <ul>
                        <li>Half an apple: 🍎 cut into 2 equal parts</li>
                        <li>Half a sandwich: cut down the middle</li>
                        <li>Half a cookie: shared equally with a friend</li>
                    </ul>
                </div>
                
                <h3>Fourths: Dividing into 4 Equal Parts</h3>
                <div class="example">
                    <div class="example-title">Understanding Fourths</div>
                    <p>When we cut something into <strong>4 equal parts</strong>, each part is called a <strong>fourth</strong> or a <strong>quarter</strong></p>
                    <p>🍕 cut into 4 equal pieces → Each piece is <strong>1/4</strong> (one fourth)</p>
                    <p>All four fourths together make one whole!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Real-Life Fourths</div>
                    <ul>
                        <li>Quarter of a pizza: pizza cut into 4 equal parts</li>
                        <li>Quarter of a dollar: 25 cents (100¢ ÷ 4 = 25¢)</li>
                        <li>Quarter of an hour: 15 minutes (60 min ÷ 4 = 15 min)</li>
                    </ul>
                </div>
                
                <h3>Important Rules for Equal Parts</h3>
                <ul>
                    <li>All pieces must be <strong>exactly the same size</strong></li>
                    <li>It doesn't matter what shape they are</li>
                    <li>Equal parts add up to make one whole</li>
                </ul>
                
                <h3>Comparing Halves and Fourths</h3>
                <div class="example">
                    <div class="example-title">Which is Bigger?</div>
                    <p>Imagine a pizza cut two ways:</p>
                    <p>Cut into 2 pieces: Each piece is 1/2 (BIGGER!)</p>
                    <p>Cut into 4 pieces: Each piece is 1/4 (smaller)</p>
                    <p><strong>Remember:</strong> Fewer pieces = bigger pieces!</p>
                </div>
            `,

            "Tally Marks": `
                <h2>Tally Marks</h2>
                <p>Tally marks are a quick way to count and keep track of things. They're like a shorthand for counting!</p>
                
                <h3>How Tally Marks Work</h3>
                <p>We make one mark for each thing we count:</p>
                
                <div class="example">
                    <div class="example-title">Counting with Tallies</div>
                    <p>| = 1</p>
                    <p>|| = 2</p>
                    <p>||| = 3</p>
                    <p>|||| = 4</p>
                    <p><strong>||||</strong> = 5 (We draw the fifth tally across the first four!)</p>
                </div>
                
                <h3>Why Group by 5?</h3>
                <p>Grouping by 5 makes counting faster and easier!</p>
                
                <div class="example">
                    <div class="example-title">Counting Larger Numbers</div>
                    <p>|||| |||| |||| ||</p>
                    <p>Count by 5s: 5, 10, 15... plus 2 = <strong>17</strong></p>
                    <p>Much easier than counting 17 single marks!</p>
                </div>
                
                <h3>Using Tally Marks</h3>
                <div class="example">
                    <div class="example-title">Example: Favorite Colors Survey</div>
                    <p><strong>Red:</strong> |||| |||| (10 students)</p>
                    <p><strong>Blue:</strong> |||| |||| ||| (13 students)</p>
                    <p><strong>Green:</strong> |||| || (7 students)</p>
                    <p>We can quickly see blue is most popular!</p>
                </div>
                
                <h3>When to Use Tally Marks</h3>
                <ul>
                    <li>Taking surveys or polls</li>
                    <li>Counting things as they happen (cars passing by, birds at a feeder)</li>
                    <li>Keeping score in games</li>
                    <li>Organizing data before making a graph</li>
                </ul>
                
                <h3>Reading Tally Marks</h3>
                <div class="example">
                    <div class="example-title">Practice Reading</div>
                    <p>|||| |||| |||| ||||</p>
                    <p><strong>Count:</strong> 5, 10, 15, 20!</p>
                    <p>Four groups of 5 = <strong>20</strong></p>
                </div>
                
                <h3>Tally Marks vs Numbers</h3>
                <ul>
                    <li><strong>Tally Marks:</strong> Good for counting as you go</li>
                    <li><strong>Numbers:</strong> Good for final totals</li>
                    <li>Often we use tallies to count, then write the number!</li>
                </ul>
                
                <h3>Fun Fact</h3>
                <p>People have used tally marks for thousands of years - even before written numbers were invented!</p>
            `,

            "Greater Than/Less Than Symbols": `
                <h2>Greater Than/Less Than Symbols</h2>
                <p>These special symbols (> and <) help us compare numbers in a quick, mathematical way!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>The Three Symbols</h3>
                <div class="example">
                    <div class="example-title">What Each Symbol Means</div>
                    <p><strong>></strong> Greater than (bigger)</p>
                    <p><strong><</strong> Less than (smaller)</p>
                    <p><strong>=</strong> Equal to (same)</p>
                </div>
                
                <h3>The Alligator Trick</h3>
                <p>Think of the symbol as an alligator's mouth - it always wants to eat the BIGGER number!</p>
                
                <div class="example">
                    <div class="example-title">Hungry Alligator 🐊</div>
                    <p><strong>8 > 3</strong></p>
                    <p>The alligator's mouth opens toward 8 (the bigger number)</p>
                    <p>We read this: "8 is greater than 3"</p>
                    <p><strong>3 < 8</strong></p>
                    <p>The alligator's mouth still opens toward 8!</p>
                    <p>We read this: "3 is less than 8"</p>
                </div>
                
                <h3>Using > (Greater Than)</h3>
                <div class="example">
                    <div class="example-title">Examples</div>
                    <p>9 > 7 (9 is greater than 7)</p>
                    <p>15 > 10 (15 is greater than 10)</p>
                    <p>20 > 19 (20 is greater than 19)</p>
                    <p>The mouth opens toward the FIRST number (the bigger one)</p>
                </div>
                
                <h3>Using < (Less Than)</h3>
                <div class="example">
                    <div class="example-title">Examples</div>
                    <p>4 < 7 (4 is less than 7)</p>
                    <p>12 < 18 (12 is less than 18)</p>
                    <p>6 < 10 (6 is less than 10)</p>
                    <p>The mouth opens toward the SECOND number (the bigger one)</p>
                </div>
                
                <h3>Easy Tricks to Remember</h3>
                <ul>
                    <li><strong>Alligator trick:</strong> The mouth eats the bigger number 🐊</li>
                    <li><strong>Arrow trick:</strong> The point aims at the smaller number →</li>
                    <li><strong>L trick:</strong> < looks like an L, and L is for "Less than"</li>
                </ul>
                
                <h3>Practice</h3>
                <p>Which symbol goes in each blank?</p>
                <ul>
                    <li>5 ___ 8 (Answer: 5 < 8)</li>
                    <li>10 ___ 7 (Answer: 10 > 7)</li>
                    <li>3 ___ 3 (Answer: 3 = 3)</li>
                </ul>
                
                <h3>Real-World Use</h3>
                <p>We use these symbols to show:</p>
                <ul>
                    <li>Who scored more points in a game</li>
                    <li>Which item costs more</li>
                    <li>Who is taller or older</li>
                    <li>Which group has more items</li>
                </ul>
            `,
            
            // === GRADE 5 LESSONS (21 topics) ===
            
            "Fraction Addition and Subtraction": `
                <h2>Fraction Addition and Subtraction</h2>
                <p>Adding and subtracting fractions is like combining or separating pieces of a whole. The key is making sure the pieces are the same size!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Adding Fractions with Same Denominators</h3>
                <p>When fractions have the same denominator (bottom number), just add the numerators!</p>
                
                <div class="example">
                    <div class="example-title">Example: 2/5 + 1/5</div>
                    <p><strong>Step 1:</strong> Check denominators - both are 5 ✓</p>
                    <p><strong>Step 2:</strong> Add numerators: 2 + 1 = 3</p>
                    <p><strong>Step 3:</strong> Keep denominator: /5</p>
                    <p><strong>Answer:</strong> 2/5 + 1/5 = <strong>3/5</strong></p>
                    <p>Think: 2 fifths + 1 fifth = 3 fifths</p>
                </div>
                
                <h3>Adding Fractions with Different Denominators</h3>
                <p>When denominators are different, we need to find a common denominator first!</p>
                
                <div class="example">
                    <div class="example-title">Example: 1/2 + 1/4</div>
                    <p><strong>Step 1:</strong> Find common denominator (4 works for both)</p>
                    <p><strong>Step 2:</strong> Convert: 1/2 = 2/4</p>
                    <p><strong>Step 3:</strong> Now add: 2/4 + 1/4 = 3/4</p>
                    <p><strong>Answer:</strong> 1/2 + 1/4 = <strong>3/4</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: 1/3 + 1/6</div>
                    <p><strong>Step 1:</strong> Common denominator is 6</p>
                    <p><strong>Step 2:</strong> Convert: 1/3 = 2/6</p>
                    <p><strong>Step 3:</strong> Add: 2/6 + 1/6 = 3/6</p>
                    <p><strong>Step 4:</strong> Simplify: 3/6 = <strong>1/2</strong></p>
                </div>
                
                <h3>Subtracting Fractions</h3>
                <p>Subtraction works the same way as addition!</p>
                
                <div class="example">
                    <div class="example-title">Same Denominators: 5/8 − 2/8</div>
                    <p>Subtract numerators: 5 − 2 = 3</p>
                    <p>Keep denominator: /8</p>
                    <p><strong>Answer:</strong> <strong>3/8</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Different Denominators: 3/4 − 1/2</div>
                    <p><strong>Step 1:</strong> Common denominator is 4</p>
                    <p><strong>Step 2:</strong> Convert: 1/2 = 2/4</p>
                    <p><strong>Step 3:</strong> Subtract: 3/4 − 2/4 = <strong>1/4</strong></p>
                </div>
                
                <h3>Finding Common Denominators</h3>
                <ul>
                    <li><strong>List multiples:</strong> Find multiples of each denominator</li>
                    <li><strong>Find smallest common:</strong> Pick the LCM (Least Common Multiple)</li>
                    <li><strong>Convert both:</strong> Make equivalent fractions</li>
                    <li><strong>Add or subtract:</strong> Work with numerators only</li>
                </ul>
                
                <h3>Remember to Simplify!</h3>
                <p>Always check if your answer can be simplified:</p>
                <ul>
                    <li>4/8 = 1/2</li>
                    <li>6/9 = 2/3</li>
                    <li>10/15 = 2/3</li>
                </ul>
                
                <h3>Real-World Applications</h3>
                <ul>
                    <li><strong>Cooking:</strong> Adding 1/4 cup + 1/2 cup of flour</li>
                    <li><strong>Time:</strong> 1/2 hour + 1/4 hour = 3/4 hour (45 minutes)</li>
                    <li><strong>Distance:</strong> Walking 2/3 mile then 1/6 mile more</li>
                </ul>
            `,

            "Fraction Multiplication and Division": `
                <h2>Fraction Multiplication and Division</h2>
                <p>Multiplying and dividing fractions follows different rules than addition! Let's learn these powerful operations.</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Multiplying Fractions</h3>
                <p>To multiply fractions: multiply numerators together, then multiply denominators together!</p>
                
                <div class="example">
                    <div class="example-title">Example: 2/3 × 3/4</div>
                    <p><strong>Step 1:</strong> Multiply numerators: 2 × 3 = 6</p>
                    <p><strong>Step 2:</strong> Multiply denominators: 3 × 4 = 12</p>
                    <p><strong>Step 3:</strong> Result: 6/12</p>
                    <p><strong>Step 4:</strong> Simplify: 6/12 = <strong>1/2</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Multiply Across - Easy!</div>
                    <pre>  2   ×   3   =   2×3   =   6    =  1
  3       4       3×4      12      2</pre>
                </div>
                
                <h3>Multiplying with Whole Numbers</h3>
                <div class="example">
                    <div class="example-title">Example: 3 × 2/5</div>
                    <p><strong>Step 1:</strong> Write whole number as fraction: 3 = 3/1</p>
                    <p><strong>Step 2:</strong> Multiply: (3/1) × (2/5) = 6/5</p>
                    <p><strong>Step 3:</strong> Convert to mixed number: <strong>1 1/5</strong></p>
                </div>
                
                <h3>Dividing Fractions: Flip and Multiply!</h3>
                <p>To divide by a fraction, multiply by its reciprocal (flip it!):</p>
                
                <div class="example">
                    <div class="example-title">Example: 1/2 ÷ 1/4</div>
                    <p><strong>Step 1:</strong> Flip the second fraction: 1/4 becomes 4/1</p>
                    <p><strong>Step 2:</strong> Change ÷ to ×: 1/2 × 4/1</p>
                    <p><strong>Step 3:</strong> Multiply: 1×4 / 2×1 = 4/2</p>
                    <p><strong>Step 4:</strong> Simplify: 4/2 = <strong>2</strong></p>
                    <p><strong>Makes sense:</strong> How many quarters fit in a half? 2!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: 3/4 ÷ 2/3</div>
                    <p><strong>Step 1:</strong> Flip 2/3 to get 3/2</p>
                    <p><strong>Step 2:</strong> Multiply: 3/4 × 3/2</p>
                    <p><strong>Step 3:</strong> Calculate: (3×3)/(4×2) = 9/8</p>
                    <p><strong>Step 4:</strong> Mixed number: <strong>1 1/8</strong></p>
                </div>
                
                <h3>Remember: KCF Method for Division</h3>
                <ul>
                    <li><strong>K</strong>eep the first fraction</li>
                    <li><strong>C</strong>hange division to multiplication</li>
                    <li><strong>F</strong>lip the second fraction (reciprocal)</li>
                </ul>
                
                <h3>Real-World Applications</h3>
                <ul>
                    <li><strong>Recipes:</strong> Making 1/2 of a recipe that calls for 2/3 cup: 1/2 × 2/3 = 1/3 cup</li>
                    <li><strong>Sharing:</strong> Dividing 3/4 pizza among 3 friends: (3/4) ÷ 3</li>
                    <li><strong>Measurement:</strong> How many 1/4 inch pieces in a 3 inch board?</li>
                </ul>
            `,

            "Coordinate Graphing": `
                <h2>Coordinate Graphing</h2>
                <p>Coordinate graphing lets us show points and shapes on a grid. It's like a treasure map for math!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Understanding the Coordinate Plane</h3>
                <p>The coordinate plane has two number lines that cross:</p>
                
                <div class="example">
                    <div class="example-title">The Axes</div>
                    <ul>
                        <li><strong>X-axis:</strong> The horizontal line (left-right) →</li>
                        <li><strong>Y-axis:</strong> The vertical line (up-down) ↑</li>
                        <li><strong>Origin:</strong> Where they cross (0, 0)</li>
                    </ul>
                </div>
                
                <h3>Reading Coordinates (x, y)</h3>
                <p>Every point is described by an <strong>ordered pair</strong> (x, y):</p>
                
                <div class="example">
                    <div class="example-title">The Point (3, 4)</div>
                    <p><strong>x-coordinate:</strong> 3 (move 3 units RIGHT from origin)</p>
                    <p><strong>y-coordinate:</strong> 4 (move 4 units UP)</p>
                    <p><strong>Remember:</strong> x comes first (alphabetical order!)</p>
                    <p>Think: "Walk before you fly" - go sideways (x) before going up (y)</p>
                </div>
                
                <h3>Plotting Points Step-by-Step</h3>
                <div class="example">
                    <div class="example-title">Plot (5, 2)</div>
                    <p><strong>Step 1:</strong> Start at origin (0, 0)</p>
                    <p><strong>Step 2:</strong> Move 5 units RIGHT (x = 5)</p>
                    <p><strong>Step 3:</strong> Move 2 units UP (y = 2)</p>
                    <p><strong>Step 4:</strong> Mark the point!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Different Points</div>
                    <p>(0, 0) = Origin (starting point)</p>
                    <p>(4, 0) = On the x-axis (4 right, 0 up)</p>
                    <p>(0, 5) = On the y-axis (0 right, 5 up)</p>
                    <p>(3, 3) = Diagonal from origin</p>
                </div>
                
                <h3>The First Quadrant</h3>
                <p>In 5th grade, we focus on the first quadrant where both x and y are positive (0 and greater).</p>
                
                <h3>Connecting Points</h3>
                <p>When we connect points in order, we can make shapes!</p>
                <div class="example">
                    <div class="example-title">Making a Rectangle</div>
                    <p>Connect these points: (1,1), (5,1), (5,3), (1,3)</p>
                    <p>You've drawn a rectangle on the coordinate plane!</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Maps:</strong> Finding locations using coordinates</li>
                    <li><strong>Video Games:</strong> Character positions on screen</li>
                    <li><strong>GPS:</strong> Latitude and longitude</li>
                    <li><strong>Battleship:</strong> The game uses coordinates!</li>
                </ul>
            `,

            "Volume of Rectangular Prisms": `
                <h2>Volume of Rectangular Prisms</h2>
                <p>Volume measures how much space a 3D object takes up. Think of it as how much water could fill a box!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is Volume?</h3>
                <p>Volume is the amount of 3D space inside an object. We measure it in <strong>cubic units</strong> (like cubic inches or cubic centimeters).</p>
                
                <h3>Understanding Rectangular Prisms</h3>
                <div class="example">
                    <div class="example-title">What's a Rectangular Prism?</div>
                    <p>A 3D shape that looks like a box:</p>
                    <ul>
                        <li>6 faces (all rectangles)</li>
                        <li>8 vertices (corners)</li>
                        <li>12 edges</li>
                    </ul>
                    <p><strong>Examples:</strong> Shoe boxes, books, refrigerators, rooms</p>
                </div>
                
                <h3>The Volume Formula</h3>
                <p><strong>V = length × width × height</strong></p>
                
                <div class="example">
                    <div class="example-title">Example: Box that is 5 cm × 3 cm × 4 cm</div>
                    <p><strong>Length:</strong> 5 cm</p>
                    <p><strong>Width:</strong> 3 cm</p>
                    <p><strong>Height:</strong> 4 cm</p>
                    <p><strong>Calculate:</strong> V = 5 × 3 × 4</p>
                    <p>V = 15 × 4</p>
                    <p>V = <strong>60 cubic centimeters (cm³)</strong></p>
                </div>
                
                <h3>Why We Multiply All Three</h3>
                <div class="example">
                    <div class="example-title">Think of Layers</div>
                    <p>Imagine stacking cubes:</p>
                    <p><strong>Bottom layer:</strong> 5 × 3 = 15 cubes</p>
                    <p><strong>How many layers?</strong> 4 layers tall</p>
                    <p><strong>Total cubes:</strong> 15 × 4 = 60 cubes</p>
                    <p>Each cube = 1 cm³, so total volume = 60 cm³</p>
                </div>
                
                <h3>Units for Volume</h3>
                <ul>
                    <li><strong>Cubic inches</strong> (in³) - small objects</li>
                    <li><strong>Cubic feet</strong> (ft³) - medium objects</li>
                    <li><strong>Cubic meters</strong> (m³) - large objects</li>
                    <li><strong>Cubic centimeters</strong> (cm³) - metric small</li>
                </ul>
                
                <div class="example">
                    <div class="example-title">Practice Problem</div>
                    <p>A storage box is 8 inches long, 6 inches wide, and 5 inches tall.</p>
                    <p>V = 8 × 6 × 5 = <strong>240 in³</strong></p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li>Finding how much a container can hold</li>
                    <li>Calculating space in a moving truck</li>
                    <li>Determining fish tank capacity</li>
                    <li>Figuring out if furniture fits in a room</li>
                </ul>
            `,

            "Measurement Conversion": `
                <h2>Measurement Conversion</h2>
                <p>Converting between units means changing from one measurement to another. It's essential for real-world problem solving!</p>
                
                <h3>Length Conversions (US Customary)</h3>
                <div class="example">
                    <div class="example-title">Common Length Conversions</div>
                    <ul>
                        <li>1 foot = <strong>12 inches</strong></li>
                        <li>1 yard = <strong>3 feet</strong> = 36 inches</li>
                        <li>1 mile = <strong>5,280 feet</strong></li>
                    </ul>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: Convert 4 feet to inches</div>
                    <p><strong>What we know:</strong> 1 foot = 12 inches</p>
                    <p><strong>Calculate:</strong> 4 feet × 12 inches/foot = 48 inches</p>
                    <p><strong>Answer:</strong> 4 feet = <strong>48 inches</strong></p>
                </div>
                
                <h3>Length Conversions (Metric)</h3>
                <div class="example">
                    <div class="example-title">Metric Length</div>
                    <ul>
                        <li>1 meter = <strong>100 centimeters</strong></li>
                        <li>1 meter = <strong>1,000 millimeters</strong></li>
                        <li>1 kilometer = <strong>1,000 meters</strong></li>
                    </ul>
                </div>
                
                <h3>Weight/Mass Conversions</h3>
                <div class="example">
                    <div class="example-title">US Customary Weight</div>
                    <ul>
                        <li>1 pound = <strong>16 ounces</strong></li>
                        <li>1 ton = <strong>2,000 pounds</strong></li>
                    </ul>
                </div>
                
                <div class="example">
                    <div class="example-title">Metric Mass</div>
                    <ul>
                        <li>1 kilogram = <strong>1,000 grams</strong></li>
                        <li>1 metric ton = <strong>1,000 kilograms</strong></li>
                    </ul>
                </div>
                
                <h3>Capacity/Volume Conversions</h3>
                <div class="example">
                    <div class="example-title">Liquid Measurement (US)</div>
                    <ul>
                        <li>1 cup = <strong>8 fluid ounces</strong></li>
                        <li>1 pint = <strong>2 cups</strong></li>
                        <li>1 quart = <strong>2 pints</strong> = 4 cups</li>
                        <li>1 gallon = <strong>4 quarts</strong> = 16 cups</li>
                    </ul>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: Gallons to Quarts</div>
                    <p>Convert 3 gallons to quarts</p>
                    <p>1 gallon = 4 quarts</p>
                    <p>3 gallons × 4 = <strong>12 quarts</strong></p>
                </div>
                
                <h3>Conversion Strategy</h3>
                <p><strong>Larger to Smaller:</strong> Multiply</p>
                <ul>
                    <li>5 feet to inches: 5 × 12 = 60 inches</li>
                </ul>
                
                <p><strong>Smaller to Larger:</strong> Divide</p>
                <ul>
                    <li>24 inches to feet: 24 ÷ 12 = 2 feet</li>
                </ul>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Cooking:</strong> Converting tablespoons to cups</li>
                    <li><strong>Construction:</strong> Converting feet to inches for precise cuts</li>
                    <li><strong>Travel:</strong> Understanding kilometers vs miles</li>
                    <li><strong>Science:</strong> Converting grams to kilograms</li>
                </ul>
            `,

            "Decimal Operations": `
                <h2>Decimal Operations</h2>
                <p>Decimals let us work with parts of whole numbers. We can add, subtract, multiply, and divide them just like whole numbers, with some special rules!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Adding and Subtracting Decimals</h3>
                <p>The key is to <strong>line up the decimal points</strong>!</p>
                
                <div class="example">
                    <div class="example-title">Example: 3.45 + 2.8</div>
                    <pre>  3.45
+ 2.80  (add zero as placeholder)
------
  6.25</pre>
                    <p><strong>Key Steps:</strong></p>
                    <ol>
                        <li>Write numbers vertically</li>
                        <li>Line up decimal points</li>
                        <li>Add zeros as placeholders if needed</li>
                        <li>Add normally, bringing down the decimal point</li>
                    </ol>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: 7.2 − 3.47</div>
                    <pre>  7.20
− 3.47
------
  3.73</pre>
                    <p>Add zero to make 7.20, then subtract normally!</p>
                </div>
                
                <h3>Multiplying Decimals</h3>
                <p>Multiply as if they're whole numbers, then count decimal places!</p>
                
                <div class="example">
                    <div class="example-title">Example: 2.5 × 3.2</div>
                    <p><strong>Step 1:</strong> Ignore decimals temporarily: 25 × 32 = 800</p>
                    <p><strong>Step 2:</strong> Count total decimal places: 1 + 1 = 2 places</p>
                    <p><strong>Step 3:</strong> Put decimal in answer: <strong>8.00 = 8</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: 4.6 × 0.3</div>
                    <p>46 × 3 = 138</p>
                    <p>Count places: 1 + 1 = 2</p>
                    <p>Answer: <strong>1.38</strong></p>
                </div>
                
                <h3>Dividing Decimals</h3>
                <p>Make the divisor a whole number by moving decimal points!</p>
                
                <div class="example">
                    <div class="example-title">Example: 6.4 ÷ 0.2</div>
                    <p><strong>Step 1:</strong> Move decimal in 0.2 one place right → 2</p>
                    <p><strong>Step 2:</strong> Move decimal in 6.4 one place right → 64</p>
                    <p><strong>Step 3:</strong> Now divide: 64 ÷ 2 = <strong>32</strong></p>
                </div>
                
                <h3>Quick Tips</h3>
                <ul>
                    <li><strong>Add/Subtract:</strong> Line up decimal points!</li>
                    <li><strong>Multiply:</strong> Count total decimal places</li>
                    <li><strong>Divide:</strong> Move decimals to make divisor whole</li>
                    <li><strong>Always:</strong> Estimate first to check if answer makes sense</li>
                </ul>
                
                <h3>Real-World Applications</h3>
                <ul>
                    <li><strong>Money:</strong> $3.50 + $2.75 = $6.25</li>
                    <li><strong>Measurements:</strong> 2.5 meters + 3.8 meters</li>
                    <li><strong>Grades:</strong> Calculating averages (87.5, 92.3)</li>
                    <li><strong>Science:</strong> Precise measurements in experiments</li>
                </ul>
            `,

            "Exponents (Introduction)": `
                <h2>Exponents (Introduction)</h2>
                <p>Exponents are a shorthand way to show repeated multiplication. They're super powerful in math!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is an Exponent?</h3>
                <p>An exponent tells us how many times to multiply a number by itself:</p>
                
                <div class="example">
                    <div class="example-title">Understanding 10³</div>
                    <p>10³ means "10 × 10 × 10"</p>
                    <ul>
                        <li><strong>Base:</strong> 10 (the number being multiplied)</li>
                        <li><strong>Exponent:</strong> 3 (how many times to multiply)</li>
                        <li><strong>Value:</strong> 10 × 10 × 10 = <strong>1,000</strong></li>
                    </ul>
                    <p>We say: "10 to the 3rd power" or "10 cubed"</p>
                </div>
                
                <h3>Powers of 10</h3>
                <p>Powers of 10 are especially important - they're the foundation of our number system!</p>
                
                <div class="example">
                    <div class="example-title">Powers of 10 Chart</div>
                    <ul>
                        <li>10⁰ = <strong>1</strong></li>
                        <li>10¹ = <strong>10</strong></li>
                        <li>10² = <strong>100</strong> (10 × 10)</li>
                        <li>10³ = <strong>1,000</strong> (10 × 10 × 10)</li>
                        <li>10⁴ = <strong>10,000</strong> (10 × 10 × 10 × 10)</li>
                    </ul>
                    <p><strong>Pattern:</strong> The exponent tells you how many zeros!</p>
                </div>
                
                <h3>Other Examples</h3>
                <div class="example">
                    <div class="example-title">Different Bases</div>
                    <p>2³ = 2 × 2 × 2 = <strong>8</strong></p>
                    <p>5² = 5 × 5 = <strong>25</strong></p>
                    <p>3⁴ = 3 × 3 × 3 × 3 = <strong>81</strong></p>
                </div>
                
                <h3>Special Exponent Names</h3>
                <ul>
                    <li><strong>x² :</strong> "x squared" (forms a square when visualized)</li>
                    <li><strong>x³ :</strong> "x cubed" (forms a cube in 3D)</li>
                    <li><strong>x⁴ :</strong> "x to the fourth power"</li>
                </ul>
                
                <h3>Multiplying by Powers of 10</h3>
                <div class="example">
                    <div class="example-title">Quick Trick</div>
                    <p>To multiply by 10ⁿ, move the decimal point n places RIGHT:</p>
                    <p>4.5 × 10² = 4.5 × 100 = <strong>450</strong> (move 2 places right)</p>
                    <p>2.36 × 10³ = 2.36 × 1,000 = <strong>2,360</strong> (move 3 places)</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Large numbers:</strong> Population, distances in space</li>
                    <li><strong>Scientific notation:</strong> 3 × 10⁸ meters/second (speed of light)</li>
                    <li><strong>Computer memory:</strong> 2¹⁰ = 1,024 (kilobyte)</li>
                    <li><strong>Growth:</strong> Compound interest, population growth</li>
                </ul>
            `,

            "Expressions": `
                <h2>Expressions</h2>
                <p>Mathematical expressions are like sentences made with numbers and operations. They show a value but don't have an equals sign!</p>
                
                <h3>What is an Expression?</h3>
                <p>An expression is a mathematical phrase that can contain:</p>
                <ul>
                    <li><strong>Numbers:</strong> 5, 12, 3.7</li>
                    <li><strong>Operations:</strong> +, −, ×, ÷</li>
                    <li><strong>Grouping symbols:</strong> ( ), [ ], { }</li>
                    <li><strong>Variables (later):</strong> x, y, n</li>
                </ul>
                
                <div class="example">
                    <div class="example-title">Expression vs Equation</div>
                    <p><strong>Expression:</strong> 3 + 5 × 2 (just shows a value)</p>
                    <p><strong>Equation:</strong> 3 + 5 × 2 = 13 (has an equals sign)</p>
                </div>
                
                <h3>Evaluating Expressions</h3>
                <p>To evaluate means to find the value:</p>
                
                <div class="example">
                    <div class="example-title">Example: Evaluate 4 + 6 × 2</div>
                    <p><strong>Remember Order of Operations!</strong></p>
                    <p><strong>Step 1:</strong> Do multiplication first: 6 × 2 = 12</p>
                    <p><strong>Step 2:</strong> Then add: 4 + 12 = 16</p>
                    <p><strong>Value:</strong> <strong>16</strong></p>
                </div>
                
                <h3>Expressions with Parentheses</h3>
                <div class="example">
                    <div class="example-title">Example: (8 + 2) × 3</div>
                    <p><strong>Step 1:</strong> Parentheses first: 8 + 2 = 10</p>
                    <p><strong>Step 2:</strong> Then multiply: 10 × 3 = 30</p>
                    <p><strong>Value:</strong> <strong>30</strong></p>
                    <p><strong>Compare:</strong> 8 + 2 × 3 = 8 + 6 = 14 (different!)</p>
                </div>
                
                <h3>Writing Expressions from Words</h3>
                <div class="example">
                    <div class="example-title">Translating to Math</div>
                    <p><strong>"5 more than 3":</strong> 3 + 5</p>
                    <p><strong>"The product of 4 and 6":</strong> 4 × 6</p>
                    <p><strong>"8 decreased by 3":</strong> 8 − 3</p>
                    <p><strong>"Twice 7":</strong> 2 × 7</p>
                    <p><strong>"10 divided by 2":</strong> 10 ÷ 2</p>
                </div>
                
                <h3>Parts of an Expression</h3>
                <div class="example">
                    <div class="example-title">In the expression: 3 + 5 × 2 − 4</div>
                    <ul>
                        <li><strong>Terms:</strong> Parts separated by + or − (3, 5×2, 4)</li>
                        <li><strong>Operations:</strong> +, ×, −</li>
                        <li><strong>Factors:</strong> Numbers being multiplied (5 and 2)</li>
                    </ul>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Shopping:</strong> (3 × $4.50) + (2 × $6.00) for buying items</li>
                    <li><strong>Perimeter:</strong> 2 × (length + width)</li>
                    <li><strong>Recipes:</strong> 2 × (3 cups + 1 cup) when doubling</li>
                </ul>
            `,

            "Data and Graphs": `
                <h2>Data and Graphs</h2>
                <p>Data and graphs help us organize, display, and understand information. In 5th grade, we work with more advanced types of graphs!</p>
                
                <h3>Types of Graphs</h3>
                
                <div class="example">
                    <div class="example-title">1. Histograms</div>
                    <p>Histograms show data grouped into ranges (intervals):</p>
                    <p><strong>Example:</strong> Test scores by range</p>
                    <p>60-69: ▮▮▮ (3 students)</p>
                    <p>70-79: ▮▮▮▮▮▮▮ (7 students)</p>
                    <p>80-89: ▮▮▮▮▮ (5 students)</p>
                    <p>90-100: ▮▮▮▮ (4 students)</p>
                </div>
                
                <div class="example">
                    <div class="example-title">2. Line Graphs</div>
                    <p>Line graphs show changes over time:</p>
                    <p><strong>Use for:</strong> Temperature changes, growth over months, stock prices</p>
                    <p><strong>Shows:</strong> Trends (going up, down, staying same)</p>
                </div>
                
                <div class="example">
                    <div class="example-title">3. Stem-and-Leaf Plots</div>
                    <p>Shows data using place value:</p>
                    <p><strong>Data:</strong> 23, 25, 27, 31, 33, 35, 38</p>
                    <p><strong>Stem | Leaf</strong></p>
                    <p>2 | 3 5 7</p>
                    <p>3 | 1 3 5 8</p>
                    <p>Stem = tens, Leaf = ones</p>
                </div>
                
                <h3>Analyzing Graphs</h3>
                <p>When reading any graph, ask:</p>
                <ul>
                    <li><strong>What</strong> does it show? (Read title and labels)</li>
                    <li><strong>What's the trend?</strong> (Going up? Down? Patterns?)</li>
                    <li><strong>What's the range?</strong> (Highest and lowest values)</li>
                    <li><strong>What can we conclude?</strong> (What does the data tell us?)</li>
                </ul>
                
                <div class="example">
                    <div class="example-title">Reading a Line Graph</div>
                    <p><strong>Title:</strong> "Temperature Throughout the Day"</p>
                    <p><strong>X-axis:</strong> Time (hours)</p>
                    <p><strong>Y-axis:</strong> Temperature (°F)</p>
                    <p><strong>Observation:</strong> Temperature rises from morning to afternoon, then falls</p>
                    <p><strong>Conclusion:</strong> Hottest time is around 3 PM</p>
                </div>
                
                <h3>Creating Graphs</h3>
                <ol>
                    <li>Collect your data</li>
                    <li>Choose appropriate graph type</li>
                    <li>Draw and label axes</li>
                    <li>Plot data accurately</li>
                    <li>Add title and any necessary labels</li>
                </ol>
                
                <h3>Which Graph to Use?</h3>
                <ul>
                    <li><strong>Bar graph:</strong> Comparing categories</li>
                    <li><strong>Line graph:</strong> Changes over time</li>
                    <li><strong>Histogram:</strong> Data in intervals</li>
                    <li><strong>Circle graph:</strong> Parts of a whole (pie chart)</li>
                </ul>
            `,

            "Division of Decimals": `
                <h2>Division of Decimals</h2>
                <p>Dividing with decimals might seem tricky, but it's just like regular division once we move the decimal points!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>The Key Rule</h3>
                <p>Make the divisor (the number you're dividing BY) a whole number!</p>
                
                <div class="example">
                    <div class="example-title">Example: 8.4 ÷ 0.4</div>
                    <p><strong>Step 1:</strong> The divisor is 0.4 (has 1 decimal place)</p>
                    <p><strong>Step 2:</strong> Move decimal 1 place right in BOTH numbers:</p>
                    <p>0.4 → 4 and 8.4 → 84</p>
                    <p><strong>Step 3:</strong> Now divide: 84 ÷ 4 = <strong>21</strong></p>
                </div>
                
                <h3>Dividing by Whole Numbers</h3>
                <div class="example">
                    <div class="example-title">Example: 6.8 ÷ 2</div>
                    <p>The divisor is already whole, so just divide!</p>
                    <p>6.8 ÷ 2 = <strong>3.4</strong></p>
                    <p><strong>Tip:</strong> Keep the decimal point aligned in your answer</p>
                </div>
                
                <h3>More Complex Example</h3>
                <div class="example">
                    <div class="example-title">Example: 12.6 ÷ 0.03</div>
                    <p><strong>Step 1:</strong> Divisor 0.03 has 2 decimal places</p>
                    <p><strong>Step 2:</strong> Move decimal 2 places right in both:</p>
                    <p>0.03 → 3 and 12.6 → 1260</p>
                    <p><strong>Step 3:</strong> Divide: 1260 ÷ 3 = <strong>420</strong></p>
                </div>
                
                <h3>Step-by-Step Process</h3>
                <ol>
                    <li>Count decimal places in divisor</li>
                    <li>Move decimal that many places RIGHT in both numbers</li>
                    <li>Divide as you would with whole numbers</li>
                    <li>Place decimal point in answer carefully</li>
                </ol>
                
                <h3>Why This Works</h3>
                <p>Moving the decimal the same amount in both numbers doesn't change the answer!</p>
                <div class="example">
                    <div class="example-title">Same Result</div>
                    <p>6 ÷ 2 = 3</p>
                    <p>60 ÷ 20 = 3</p>
                    <p>600 ÷ 200 = 3</p>
                    <p>All equal because we multiplied both by the same amount!</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Money:</strong> Splitting $12.50 among 5 people</li>
                    <li><strong>Recipes:</strong> Dividing 2.5 cups into 5 portions</li>
                    <li><strong>Measurement:</strong> How many 0.5 meter pieces from 4.5 meters?</li>
                    <li><strong>Gas mileage:</strong> 234.6 miles ÷ 12.3 gallons</li>
                </ul>
            `,

            "Powers of 10": `
                <h2>Powers of 10</h2>
                <p>Powers of 10 are the backbone of our number system! Understanding them makes working with large numbers and decimals much easier.</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What are Powers of 10?</h3>
                <p>Powers of 10 show how many times we multiply 10 by itself:</p>
                
                <div class="example">
                    <div class="example-title">Powers of 10 Table</div>
                    <ul>
                        <li>10⁰ = <strong>1</strong> (any number to the 0 power is 1!)</li>
                        <li>10¹ = <strong>10</strong></li>
                        <li>10² = <strong>100</strong> (10 × 10)</li>
                        <li>10³ = <strong>1,000</strong> (10 × 10 × 10)</li>
                        <li>10⁴ = <strong>10,000</strong> (10 × 10 × 10 × 10)</li>
                        <li>10⁵ = <strong>100,000</strong></li>
                        <li>10⁶ = <strong>1,000,000</strong> (one million!)</li>
                    </ul>
                    <p><strong>Pattern:</strong> The exponent tells you how many zeros!</p>
                </div>
                
                <h3>Multiplying by Powers of 10</h3>
                <p>Moving the decimal point makes multiplication super easy!</p>
                
                <div class="example">
                    <div class="example-title">Example: 4.5 × 10²</div>
                    <p><strong>Exponent is 2:</strong> Move decimal 2 places RIGHT</p>
                    <p>4.5 → 4<strong>5</strong>.0 → 45<strong>0</strong></p>
                    <p><strong>Answer:</strong> 4.5 × 100 = <strong>450</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: 0.72 × 10³</div>
                    <p><strong>Exponent is 3:</strong> Move decimal 3 places RIGHT</p>
                    <p>0.72 → 0.7<strong>2</strong>0 → 07<strong>2</strong>0 → <strong>720</strong></p>
                    <p><strong>Answer:</strong> 0.72 × 1,000 = <strong>720</strong></p>
                </div>
                
                <h3>Dividing by Powers of 10</h3>
                <p>Division moves the decimal point LEFT!</p>
                
                <div class="example">
                    <div class="example-title">Example: 350 ÷ 10²</div>
                    <p><strong>Exponent is 2:</strong> Move decimal 2 places LEFT</p>
                    <p>350.0 → 3<strong>5</strong>0.0 → <strong>3.50</strong> = 3.5</p>
                    <p><strong>Answer:</strong> 350 ÷ 100 = <strong>3.5</strong></p>
                </div>
                
                <h3>Quick Rules</h3>
                <ul>
                    <li><strong>Multiply by 10ⁿ:</strong> Move decimal n places RIGHT</li>
                    <li><strong>Divide by 10ⁿ:</strong> Move decimal n places LEFT</li>
                    <li><strong>Add zeros:</strong> If needed as placeholders</li>
                </ul>
                
                <h3>Place Value Connection</h3>
                <p>Our number system IS based on powers of 10!</p>
                <div class="example">
                    <div class="example-title">The Number 3,456</div>
                    <p>3 × 10³ = 3,000</p>
                    <p>4 × 10² = 400</p>
                    <p>5 × 10¹ = 50</p>
                    <p>6 × 10⁰ = 6</p>
                    <p><strong>Total:</strong> 3,000 + 400 + 50 + 6 = 3,456</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Money:</strong> $100 bills, $10 bills, $1 bills</li>
                    <li><strong>Measurement:</strong> Converting meters to centimeters (×100)</li>
                    <li><strong>Population:</strong> Millions (10⁶), billions (10⁹)</li>
                    <li><strong>Technology:</strong> Kilobytes, megabytes, gigabytes</li>
                </ul>
            `,

            "Fraction to Decimal Conversion": `
                <h2>Fraction to Decimal Conversion</h2>
                <p>Fractions and decimals are two ways to show the same thing - parts of a whole! Let's learn how to convert between them.</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Fraction to Decimal: Just Divide!</h3>
                <p>To convert a fraction to a decimal, divide the numerator by the denominator:</p>
                
                <div class="example">
                    <div class="example-title">Example: 1/2 to decimal</div>
                    <p><strong>Think:</strong> 1 ÷ 2</p>
                    <p><strong>Calculate:</strong> 1 ÷ 2 = <strong>0.5</strong></p>
                    <p>So 1/2 = 0.5</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: 3/4 to decimal</div>
                    <p><strong>Divide:</strong> 3 ÷ 4 = <strong>0.75</strong></p>
                    <p>So 3/4 = 0.75</p>
                </div>
                
                <h3>Common Fraction-Decimal Pairs</h3>
                <p>Memorizing these makes conversions faster!</p>
                <div class="example">
                    <div class="example-title">Useful Equivalents</div>
                    <ul>
                        <li>1/2 = <strong>0.5</strong></li>
                        <li>1/4 = <strong>0.25</strong>, 3/4 = <strong>0.75</strong></li>
                        <li>1/5 = <strong>0.2</strong>, 2/5 = <strong>0.4</strong></li>
                        <li>1/10 = <strong>0.1</strong>, 3/10 = <strong>0.3</strong></li>
                        <li>1/100 = <strong>0.01</strong></li>
                    </ul>
                </div>
                
                <h3>Decimal to Fraction</h3>
                <p>Read the decimal, then write it as a fraction!</p>
                
                <div class="example">
                    <div class="example-title">Example: 0.6 to fraction</div>
                    <p><strong>Read it:</strong> "six tenths"</p>
                    <p><strong>Write it:</strong> 6/10</p>
                    <p><strong>Simplify:</strong> 6/10 = <strong>3/5</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: 0.25 to fraction</div>
                    <p><strong>Read it:</strong> "twenty-five hundredths"</p>
                    <p><strong>Write it:</strong> 25/100</p>
                    <p><strong>Simplify:</strong> 25/100 = <strong>1/4</strong></p>
                </div>
                
                <h3>Place Value Helps!</h3>
                <ul>
                    <li><strong>One decimal place:</strong> Tenths (0.3 = 3/10)</li>
                    <li><strong>Two decimal places:</strong> Hundredths (0.45 = 45/100)</li>
                    <li><strong>Three decimal places:</strong> Thousandths (0.125 = 125/1000)</li>
                </ul>
                
                <h3>Repeating and Terminating Decimals</h3>
                <div class="example">
                    <div class="example-title">Types of Decimals</div>
                    <p><strong>Terminating:</strong> Ends (1/2 = 0.5)</p>
                    <p><strong>Repeating:</strong> Repeats forever (1/3 = 0.333...)</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Money:</strong> $0.50 = 1/2 dollar</li>
                    <li><strong>Measurement:</strong> 0.5 meters = 1/2 meter</li>
                    <li><strong>Sports:</strong> Batting average .250 = 1/4</li>
                    <li><strong>Cooking:</strong> 0.25 cup = 1/4 cup</li>
                </ul>
            `,

            "Percentage Basics": `
                <h2>Percentage Basics</h2>
                <p>Percent means "per hundred" - it's another way to show parts of a whole, just like fractions and decimals!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is a Percent?</h3>
                <p>Percent (%) means "out of 100":</p>
                
                <div class="example">
                    <div class="example-title">Understanding 25%</div>
                    <p>25% means <strong>25 out of 100</strong></p>
                    <p>25% = 25/100 = 1/4 = 0.25</p>
                    <p>All four mean the same thing!</p>
                </div>
                
                <h3>Percent-Decimal-Fraction Connections</h3>
                <div class="example">
                    <div class="example-title">Converting Between Forms</div>
                    <p><strong>50%</strong> (percent)</p>
                    <p>= 50/100 = <strong>1/2</strong> (fraction)</p>
                    <p>= <strong>0.50 = 0.5</strong> (decimal)</p>
                </div>
                
                <h3>Percent to Decimal: Drop % and Move Point</h3>
                <div class="example">
                    <div class="example-title">Examples</div>
                    <p>75% → Move decimal 2 places LEFT → <strong>0.75</strong></p>
                    <p>20% → <strong>0.20 = 0.2</strong></p>
                    <p>5% → <strong>0.05</strong></p>
                    <p>100% → <strong>1.00 = 1</strong> (the whole!)</p>
                </div>
                
                <h3>Decimal to Percent: Move Point and Add %</h3>
                <div class="example">
                    <div class="example-title">Examples</div>
                    <p>0.8 → Move decimal 2 places RIGHT → <strong>80%</strong></p>
                    <p>0.45 → <strong>45%</strong></p>
                    <p>0.03 → <strong>3%</strong></p>
                    <p>1.5 → <strong>150%</strong> (more than the whole!)</p>
                </div>
                
                <h3>Fraction to Percent</h3>
                <div class="example">
                    <div class="example-title">Method 1: Convert to Decimal First</div>
                    <p>1/4 → 1 ÷ 4 = 0.25 → <strong>25%</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Method 2: Make Denominator 100</div>
                    <p>1/5 = ?/100</p>
                    <p>1/5 = 20/100 = <strong>20%</strong></p>
                </div>
                
                <h3>Common Percents to Know</h3>
                <ul>
                    <li>100% = 1 (the whole thing)</li>
                    <li>50% = 1/2 = 0.5 (half)</li>
                    <li>25% = 1/4 = 0.25 (quarter)</li>
                    <li>75% = 3/4 = 0.75</li>
                    <li>10% = 1/10 = 0.1</li>
                    <li>1% = 1/100 = 0.01</li>
                </ul>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Tests:</strong> Scoring 18 out of 20 = 90%</li>
                    <li><strong>Sales:</strong> "25% off!" discount</li>
                    <li><strong>Phones:</strong> Battery at 75%</li>
                    <li><strong>Weather:</strong> 30% chance of rain</li>
                </ul>
            `,

            "Three-Dimensional Figures": `
                <h2>Three-Dimensional Figures</h2>
                <p>3D figures have length, width, AND height - they take up real space! Let's learn to identify and describe them.</p>
                
                <h3>What is 3D?</h3>
                <p>Three-dimensional means having three dimensions:</p>
                <ul>
                    <li><strong>Length:</strong> How long</li>
                    <li><strong>Width:</strong> How wide</li>
                    <li><strong>Height:</strong> How tall/deep</li>
                </ul>
                <p>You can hold 3D objects - they're real!</p>
                
                <h3>Types of 3D Figures</h3>
                
                <div class="example">
                    <div class="example-title">Rectangular Prism (Box)</div>
                    <ul>
                        <li><strong>Faces:</strong> 6 rectangular faces</li>
                        <li><strong>Edges:</strong> 12 edges</li>
                        <li><strong>Vertices:</strong> 8 corners</li>
                    </ul>
                    <p><strong>Examples:</strong> Books, boxes, bricks, rooms</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Cube (Special Box)</div>
                    <ul>
                        <li><strong>Faces:</strong> 6 square faces (all equal!)</li>
                        <li><strong>Edges:</strong> 12 equal edges</li>
                        <li><strong>Vertices:</strong> 8 corners</li>
                    </ul>
                    <p><strong>Examples:</strong> Dice, Rubik's cube, sugar cubes</p>
                    <p>A cube is a special rectangular prism where all edges are equal!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Cylinder</div>
                    <ul>
                        <li><strong>Faces:</strong> 2 circular faces (top and bottom)</li>
                        <li><strong>Curved surface:</strong> 1 curved surface connecting the circles</li>
                        <li><strong>Edges:</strong> 2 circular edges</li>
                    </ul>
                    <p><strong>Examples:</strong> Cans, drums, pipes, water bottles</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Cone</div>
                    <ul>
                        <li><strong>Base:</strong> 1 circular base</li>
                        <li><strong>Vertex:</strong> 1 point at the top</li>
                        <li><strong>Curved surface:</strong> Connects base to vertex</li>
                    </ul>
                    <p><strong>Examples:</strong> Ice cream cones, traffic cones, funnels</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Sphere</div>
                    <ul>
                        <li><strong>Surface:</strong> One continuous curved surface</li>
                        <li><strong>No edges or vertices!</strong></li>
                        <li><strong>Special property:</strong> Every point on surface is same distance from center</li>
                    </ul>
                    <p><strong>Examples:</strong> Balls, planets, oranges, bubbles</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Pyramid</div>
                    <ul>
                        <li><strong>Base:</strong> Can be any polygon (triangle, square, etc.)</li>
                        <li><strong>Faces:</strong> Triangular sides meeting at a point</li>
                        <li><strong>Vertex:</strong> 1 point at the top (apex)</li>
                    </ul>
                    <p><strong>Examples:</strong> Egyptian pyramids, tent, roof</p>
                </div>
                
                <h3>Faces, Edges, and Vertices</h3>
                <ul>
                    <li><strong>Face:</strong> A flat surface</li>
                    <li><strong>Edge:</strong> Where two faces meet</li>
                    <li><strong>Vertex:</strong> A corner where edges meet</li>
                </ul>
                
                <h3>2D vs 3D</h3>
                <div class="example">
                    <div class="example-title">Comparison</div>
                    <p><strong>2D (flat):</strong> Circle, square, triangle</p>
                    <p><strong>3D (solid):</strong> Sphere, cube, pyramid</p>
                </div>
                
                <h3>Real-World Identification</h3>
                <p>Look around - what 3D shapes do you see?</p>
                <ul>
                    <li>Your pencil is a <strong>cylinder</strong></li>
                    <li>A die is a <strong>cube</strong></li>
                    <li>A basketball is a <strong>sphere</strong></li>
                    <li>Your room is a <strong>rectangular prism</strong></li>
                </ul>
            `,

            "Cubic Units": `
                <h2>Cubic Units</h2>
                <p>Cubic units measure volume - the amount of 3D space something takes up. Understanding cubic units helps us measure the real world!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is a Cubic Unit?</h3>
                <p>A cubic unit is a cube with sides that are 1 unit long:</p>
                
                <div class="example">
                    <div class="example-title">1 Cubic Centimeter (1 cm³)</div>
                    <p>A tiny cube where each edge is 1 cm</p>
                    <p><strong>Volume:</strong> 1 cm × 1 cm × 1 cm = 1 cm³</p>
                    <p><strong>Size:</strong> About the size of a sugar cube</p>
                </div>
                
                <div class="example">
                    <div class="example-title">1 Cubic Inch (1 in³)</div>
                    <p>A small cube where each edge is 1 inch</p>
                    <p><strong>Volume:</strong> 1 in × 1 in × 1 in = 1 in³</p>
                    <p><strong>Size:</strong> About the size of a large die</p>
                </div>
                
                <h3>Why "Cubic"?</h3>
                <p>We call them cubic because they come from cubes!</p>
                <div class="example">
                    <div class="example-title">Building with Unit Cubes</div>
                    <p>If you fill a box with unit cubes:</p>
                    <p>📦📦📦 (3 cubes)</p>
                    <p>📦📦📦 (3 cubes)</p>
                    <p>That's 2 layers × 3 cubes = 6 cubic units</p>
                    <p>The volume is <strong>6 cubic units</strong></p>
                </div>
                
                <h3>Common Cubic Units</h3>
                <div class="example">
                    <div class="example-title">US Customary</div>
                    <ul>
                        <li><strong>Cubic inches (in³):</strong> Small objects (phone, book)</li>
                        <li><strong>Cubic feet (ft³):</strong> Medium objects (suitcase, box)</li>
                        <li><strong>Cubic yards (yd³):</strong> Large amounts (dirt, concrete)</li>
                    </ul>
                </div>
                
                <div class="example">
                    <div class="example-title">Metric</div>
                    <ul>
                        <li><strong>Cubic centimeters (cm³):</strong> Small (dice, erasers)</li>
                        <li><strong>Cubic meters (m³):</strong> Large (rooms, pools)</li>
                    </ul>
                </div>
                
                <h3>Volume Conversions</h3>
                <div class="example">
                    <div class="example-title">Important Relationships</div>
                    <p>1 cubic foot = <strong>1,728 cubic inches</strong> (12 × 12 × 12)</p>
                    <p>1 cubic yard = <strong>27 cubic feet</strong> (3 × 3 × 3)</p>
                    <p>1 cubic meter = <strong>1,000,000 cm³</strong> (100 × 100 × 100)</p>
                </div>
                
                <h3>Why We Use Cubic Units</h3>
                <ul>
                    <li>Measure how much a container holds</li>
                    <li>Calculate space for storage</li>
                    <li>Determine amount of material needed</li>
                    <li>Find capacity of aquariums, pools</li>
                </ul>
                
                <h3>Remember the Symbol</h3>
                <p>The small ³ means cubic!</p>
                <ul>
                    <li>5 cm³ = 5 cubic centimeters</li>
                    <li>20 in³ = 20 cubic inches</li>
                    <li>100 ft³ = 100 cubic feet</li>
                </ul>
            `,

            "Order of Operations (PEMDAS)": `
                <h2>Order of Operations (PEMDAS)</h2>
                <p>When we have multiple operations in one problem, we need to know which to do first. That's where PEMDAS comes in!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is PEMDAS?</h3>
                <p>PEMDAS is an acronym that tells us the order to solve operations:</p>
                
                <div class="example">
                    <div class="example-title">PEMDAS Breakdown</div>
                    <ul>
                        <li><strong>P</strong> - Parentheses ( )</li>
                        <li><strong>E</strong> - Exponents (powers) x²</li>
                        <li><strong>M</strong> - Multiplication ×</li>
                        <li><strong>D</strong> - Division ÷</li>
                        <li><strong>A</strong> - Addition +</li>
                        <li><strong>S</strong> - Subtraction −</li>
                    </ul>
                    <p><strong>Memory trick:</strong> "Please Excuse My Dear Aunt Sally"</p>
                </div>
                
                <h3>Important: M/D and A/S Are Equal!</h3>
                <p>Multiplication and Division are done LEFT TO RIGHT (whichever comes first)</p>
                <p>Addition and Subtraction are done LEFT TO RIGHT (whichever comes first)</p>
                
                <div class="example">
                    <div class="example-title">Example: 3 + 4 × 2</div>
                    <p><strong>WRONG:</strong> 3 + 4 = 7, then 7 × 2 = 14 ✗</p>
                    <p><strong>RIGHT:</strong> 4 × 2 = 8 first (multiplication before addition)</p>
                    <p>Then: 3 + 8 = <strong>11</strong> ✓</p>
                </div>
                
                <h3>With Parentheses</h3>
                <div class="example">
                    <div class="example-title">Example: (3 + 4) × 2</div>
                    <p><strong>Step 1:</strong> Parentheses first! 3 + 4 = 7</p>
                    <p><strong>Step 2:</strong> Then multiply: 7 × 2 = <strong>14</strong></p>
                    <p><strong>Notice:</strong> Parentheses changed the answer! (11 vs 14)</p>
                </div>
                
                <h3>Step-by-Step Practice</h3>
                <div class="example">
                    <div class="example-title">Example: 20 − 3 × 2 + 8 ÷ 4</div>
                    <p><strong>Step 1:</strong> Multiply: 3 × 2 = 6</p>
                    <p>Now: 20 − 6 + 8 ÷ 4</p>
                    <p><strong>Step 2:</strong> Divide: 8 ÷ 4 = 2</p>
                    <p>Now: 20 − 6 + 2</p>
                    <p><strong>Step 3:</strong> Left to right: 20 − 6 = 14</p>
                    <p><strong>Step 4:</strong> Then: 14 + 2 = <strong>16</strong></p>
                </div>
                
                <h3>With Exponents</h3>
                <div class="example">
                    <div class="example-title">Example: 2 + 3²  × 4</div>
                    <p><strong>Step 1:</strong> Exponent first: 3² = 9</p>
                    <p>Now: 2 + 9 × 4</p>
                    <p><strong>Step 2:</strong> Multiply: 9 × 4 = 36</p>
                    <p><strong>Step 3:</strong> Add: 2 + 36 = <strong>38</strong></p>
                </div>
                
                <h3>Common Mistakes to Avoid</h3>
                <ul>
                    <li>❌ Don't just go left to right!</li>
                    <li>❌ Don't add before multiplying (unless in parentheses)</li>
                    <li>✓ Always do multiplication/division before addition/subtraction</li>
                    <li>✓ Always start with parentheses and exponents</li>
                </ul>
                
                <h3>Real-World Importance</h3>
                <p>PEMDAS ensures everyone gets the same answer!</p>
                <ul>
                    <li><strong>Calculators</strong> follow PEMDAS</li>
                    <li><strong>Computer programming</strong> uses these rules</li>
                    <li><strong>Engineering calculations</strong> must be precise</li>
                </ul>
            `,

            "Numerical Patterns": `
                <h2>Numerical Patterns</h2>
                <p>Number patterns follow rules! Finding and extending patterns develops critical thinking and prepares you for algebra.</p>
                
                <h3>What is a Numerical Pattern?</h3>
                <p>A sequence of numbers that follows a rule:</p>
                
                <div class="example">
                    <div class="example-title">Pattern: 2, 4, 6, 8, 10...</div>
                    <p><strong>Rule:</strong> Add 2 each time</p>
                    <p><strong>Next number:</strong> 10 + 2 = <strong>12</strong></p>
                </div>
                
                <h3>Types of Patterns</h3>
                
                <div class="example">
                    <div class="example-title">Addition Pattern (Arithmetic)</div>
                    <p>5, 8, 11, 14, 17...</p>
                    <p><strong>Rule:</strong> +3 each time</p>
                    <p><strong>Next:</strong> 17 + 3 = <strong>20</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Multiplication Pattern (Geometric)</div>
                    <p>2, 6, 18, 54...</p>
                    <p><strong>Rule:</strong> ×3 each time</p>
                    <p><strong>Next:</strong> 54 × 3 = <strong>162</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Mixed Operation Pattern</div>
                    <p>1, 3, 9, 27...</p>
                    <p><strong>Look closely:</strong> 1 × 3 = 3, 3 × 3 = 9, 9 × 3 = 27</p>
                    <p><strong>Rule:</strong> Multiply by 3</p>
                    <p><strong>Next:</strong> 27 × 3 = <strong>81</strong></p>
                </div>
                
                <h3>Finding the Rule</h3>
                <p>Steps to find a pattern's rule:</p>
                <ol>
                    <li><strong>Compare consecutive numbers:</strong> Look at the difference or ratio</li>
                    <li><strong>Check if it's consistent:</strong> Does the same rule work for all?</li>
                    <li><strong>State the rule:</strong> "Add 5" or "Multiply by 2"</li>
                    <li><strong>Test it:</strong> Use the rule to find the next number</li>
                </ol>
                
                <div class="example">
                    <div class="example-title">Practice: Find the Rule</div>
                    <p>Pattern: 100, 90, 80, 70...</p>
                    <p><strong>Analysis:</strong> 100 − 90 = 10, 90 − 80 = 10</p>
                    <p><strong>Rule:</strong> Subtract 10</p>
                    <p><strong>Next numbers:</strong> 60, 50, 40...</p>
                </div>
                
                <h3>Growing Patterns</h3>
                <div class="example">
                    <div class="example-title">Position and Value</div>
                    <p>Position 1: 5</p>
                    <p>Position 2: 10</p>
                    <p>Position 3: 15</p>
                    <p><strong>Rule:</strong> Position × 5 = Value</p>
                    <p>Position 10 would be: 10 × 5 = <strong>50</strong></p>
                </div>
                
                <h3>Real-World Patterns</h3>
                <ul>
                    <li><strong>Counting by 5s:</strong> Nickels (5¢, 10¢, 15¢...)</li>
                    <li><strong>Doubling:</strong> Cell division (1, 2, 4, 8, 16...)</li>
                    <li><strong>Skip counting:</strong> Multiplication tables</li>
                    <li><strong>Sequences:</strong> Years (2020, 2021, 2022...)</li>
                </ul>
            `,

            "Mean (Average)": `
                <h2>Mean (Average)</h2>
                <p>The mean, also called the average, tells us the "typical" value in a set of numbers. It's one of the most useful statistics!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is the Mean?</h3>
                <p>The mean is found by adding all numbers and dividing by how many numbers there are:</p>
                
                <div class="example">
                    <div class="example-title">Formula</div>
                    <p><strong>Mean = (sum of all values) ÷ (count of values)</strong></p>
                </div>
                
                <h3>Calculating the Mean</h3>
                <div class="example">
                    <div class="example-title">Example: Test Scores</div>
                    <p><strong>Scores:</strong> 85, 90, 78, 92, 80</p>
                    <p><strong>Step 1:</strong> Add all scores:</p>
                    <p>85 + 90 + 78 + 92 + 80 = 425</p>
                    <p><strong>Step 2:</strong> Count how many scores: 5 scores</p>
                    <p><strong>Step 3:</strong> Divide sum by count:</p>
                    <p>425 ÷ 5 = <strong>85</strong></p>
                    <p><strong>Mean score:</strong> 85</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: Daily Temperatures</div>
                    <p><strong>Temperatures:</strong> 72°, 75°, 68°, 70°</p>
                    <p><strong>Sum:</strong> 72 + 75 + 68 + 70 = 285</p>
                    <p><strong>Count:</strong> 4 days</p>
                    <p><strong>Mean:</strong> 285 ÷ 4 = <strong>71.25°</strong></p>
                </div>
                
                <h3>What the Mean Tells Us</h3>
                <p>The mean gives us a single number that represents the whole group:</p>
                <ul>
                    <li>It's the "balance point" of the data</li>
                    <li>Half the values might be above it, half below</li>
                    <li>It's sensitive to very high or very low values</li>
                </ul>
                
                <h3>Mean vs Median vs Mode</h3>
                <div class="example">
                    <div class="example-title">Data Set: 3, 5, 5, 8, 9</div>
                    <p><strong>Mean:</strong> (3+5+5+8+9) ÷ 5 = 30 ÷ 5 = <strong>6</strong></p>
                    <p><strong>Median:</strong> The middle value = <strong>5</strong></p>
                    <p><strong>Mode:</strong> The most frequent = <strong>5</strong> (appears twice)</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>School:</strong> Grade averages (GPA)</li>
                    <li><strong>Sports:</strong> Batting average, points per game</li>
                    <li><strong>Weather:</strong> Average temperature for the month</li>
                    <li><strong>Money:</strong> Average spending per day</li>
                    <li><strong>Health:</strong> Average heart rate, weight</li>
                </ul>
                
                <h3>Practice Tip</h3>
                <p>Always check: Does your mean make sense?</p>
                <ul>
                    <li>It should be between the smallest and largest values</li>
                    <li>It should be close to the middle of your data</li>
                </ul>
            `,

            "Line Graphs": `
                <h2>Line Graphs</h2>
                <p>Line graphs show how data changes over time. They help us see trends and make predictions!</p>
                
                <h3>When to Use Line Graphs</h3>
                <p>Use line graphs to show:</p>
                <ul>
                    <li>Changes over time</li>
                    <li>Continuous data (temperature, height, speed)</li>
                    <li>Trends (going up, down, or staying the same)</li>
                </ul>
                
                <h3>Parts of a Line Graph</h3>
                <div class="example">
                    <div class="example-title">Components</div>
                    <ul>
                        <li><strong>Title:</strong> What the graph shows</li>
                        <li><strong>X-axis:</strong> Usually time (days, months, years)</li>
                        <li><strong>Y-axis:</strong> The measurement (temperature, growth, etc.)</li>
                        <li><strong>Data points:</strong> Dots showing values</li>
                        <li><strong>Line:</strong> Connecting the dots to show the trend</li>
                    </ul>
                </div>
                
                <h3>Reading a Line Graph</h3>
                <div class="example">
                    <div class="example-title">Example: Plant Growth Over Time</div>
                    <p><strong>X-axis:</strong> Weeks (1, 2, 3, 4)</p>
                    <p><strong>Y-axis:</strong> Height in cm</p>
                    <p><strong>Data points:</strong></p>
                    <ul>
                        <li>Week 1: 2 cm</li>
                        <li>Week 2: 5 cm</li>
                        <li>Week 3: 9 cm</li>
                        <li>Week 4: 14 cm</li>
                    </ul>
                    <p><strong>Observation:</strong> The plant is growing faster each week (steeper slope)</p>
                </div>
                
                <h3>Identifying Trends</h3>
                <div class="example">
                    <div class="example-title">What the Line Shows</div>
                    <p><strong>Line going UP:</strong> Values are increasing</p>
                    <p><strong>Line going DOWN:</strong> Values are decreasing</p>
                    <p><strong>Flat/horizontal line:</strong> Values staying the same</p>
                    <p><strong>Steep line:</strong> Changing quickly</p>
                    <p><strong>Gentle slope:</strong> Changing slowly</p>
                </div>
                
                <h3>Making Predictions</h3>
                <p>Line graphs help us predict future values!</p>
                <div class="example">
                    <div class="example-title">Example</div>
                    <p>If a line shows steady growth, we can estimate where it will go next</p>
                    <p>If temperature rose 5° each hour for 3 hours, we might predict it will rise 5° more in the next hour</p>
                </div>
                
                <h3>Creating a Line Graph</h3>
                <ol>
                    <li>Draw and label both axes</li>
                    <li>Choose appropriate scales</li>
                    <li>Plot each data point</li>
                    <li>Connect points with a line</li>
                    <li>Add title and labels</li>
                </ol>
                
                <h3>Real-World Examples</h3>
                <ul>
                    <li><strong>Weather:</strong> Temperature throughout the day</li>
                    <li><strong>Stocks:</strong> Stock prices over time</li>
                    <li><strong>Health:</strong> Weight or height tracking</li>
                    <li><strong>Science:</strong> Experiment results over time</li>
                    <li><strong>Sports:</strong> Performance improvement</li>
                </ul>
            `,
            
            // === GRADE 2 LESSONS (20 topics) ===
            
            "Even and Odd Numbers": `
                <h2>Even and Odd Numbers</h2>
                <p>All whole numbers are either even or odd. Understanding this helps with patterns, skip counting, and division!</p>
                
                <h3>What are Even Numbers?</h3>
                <p>Even numbers can be divided into 2 equal groups with nothing left over:</p>
                
                <div class="example">
                    <div class="example-title">Even Number: 8</div>
                    <p>🔷🔷🔷🔷 | 🔷🔷🔷🔷</p>
                    <p>8 divided into 2 groups = 4 and 4 (equal!)</p>
                    <p>8 ÷ 2 = 4 (no remainder)</p>
                    <p><strong>8 is EVEN</strong></p>
                </div>
                
                <h3>Even Numbers Pattern</h3>
                <div class="example">
                    <div class="example-title">Even Numbers 0-20</div>
                    <p>0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20...</p>
                    <p><strong>Pattern:</strong> They all end in 0, 2, 4, 6, or 8</p>
                    <p><strong>Quick check:</strong> Look at the last digit!</p>
                </div>
                
                <h3>What are Odd Numbers?</h3>
                <p>Odd numbers CANNOT be divided into 2 equal groups - there's always 1 left over:</p>
                
                <div class="example">
                    <div class="example-title">Odd Number: 7</div>
                    <p>🔷🔷🔷🔷 | 🔷🔷🔷</p>
                    <p>7 divided into 2 groups = 3 and 4 (NOT equal!)</p>
                    <p>Or: 🔷🔷🔷 | 🔷🔷🔷 | 🔷 (1 left over)</p>
                    <p>7 ÷ 2 = 3 remainder 1</p>
                    <p><strong>7 is ODD</strong></p>
                </div>
                
                <h3>Odd Numbers Pattern</h3>
                <div class="example">
                    <div class="example-title">Odd Numbers 1-19</div>
                    <p>1, 3, 5, 7, 9, 11, 13, 15, 17, 19...</p>
                    <p><strong>Pattern:</strong> They all end in 1, 3, 5, 7, or 9</p>
                    <p><strong>Quick check:</strong> Look at the last digit!</p>
                </div>
                
                <h3>Quick Rules</h3>
                <ul>
                    <li><strong>Even:</strong> Ends in 0, 2, 4, 6, or 8</li>
                    <li><strong>Odd:</strong> Ends in 1, 3, 5, 7, or 9</li>
                    <li><strong>Even ± Even</strong> = Even (4 + 6 = 10)</li>
                    <li><strong>Odd ± Odd</strong> = Even (5 + 7 = 12)</li>
                    <li><strong>Even ± Odd</strong> = Odd (4 + 5 = 9)</li>
                </ul>
                
                <h3>Real-World Examples</h3>
                <ul>
                    <li><strong>Pairing up:</strong> Even numbers can make perfect pairs</li>
                    <li><strong>House numbers:</strong> Often even on one side, odd on the other</li>
                    <li><strong>Sharing:</strong> Even numbers share equally between 2 people</li>
                </ul>
                
                <h3>Fun Facts</h3>
                <ul>
                    <li>0 is EVEN (0 ÷ 2 = 0)</li>
                    <li>2 is the only even prime number!</li>
                    <li>The pattern continues forever: even, odd, even, odd...</li>
                </ul>
            `,

            "Skip Counting": `
                <h2>Skip Counting</h2>
                <p>Skip counting means counting by numbers other than 1. It's faster than counting one by one and is the foundation for multiplication!</p>
                
                <h3>Counting by 2s</h3>
                <div class="example">
                    <div class="example-title">Skip Count by 2</div>
                    <p>2, 4, 6, 8, 10, 12, 14, 16, 18, 20...</p>
                    <p><strong>Notice:</strong> These are all even numbers!</p>
                    <p><strong>Use for:</strong> Counting pairs (shoes, gloves)</p>
                </div>
                
                <h3>Counting by 5s</h3>
                <div class="example">
                    <div class="example-title">Skip Count by 5</div>
                    <p>5, 10, 15, 20, 25, 30, 35, 40, 45, 50...</p>
                    <p><strong>Pattern:</strong> Ends in 5 or 0</p>
                    <p><strong>Use for:</strong> Counting nickels (5¢ each), telling time (5-minute marks)</p>
                </div>
                
                <h3>Counting by 10s</h3>
                <div class="example">
                    <div class="example-title">Skip Count by 10</div>
                    <p>10, 20, 30, 40, 50, 60, 70, 80, 90, 100...</p>
                    <p><strong>Pattern:</strong> Ones place stays 0, tens place goes up</p>
                    <p><strong>Use for:</strong> Counting dimes (10¢ each), understanding place value</p>
                </div>
                
                <h3>Why Skip Counting Matters</h3>
                <p>Skip counting is really just repeated addition!</p>
                <div class="example">
                    <div class="example-title">Connection to Multiplication</div>
                    <p>Counting by 5s six times:</p>
                    <p>5, 10, 15, 20, 25, 30</p>
                    <p>This is the same as: <strong>6 × 5 = 30</strong></p>
                </div>
                
                <h3>Counting Backward</h3>
                <p>We can also skip count backward!</p>
                <div class="example">
                    <div class="example-title">Backward by 10s</div>
                    <p>100, 90, 80, 70, 60, 50...</p>
                    <p><strong>Use for:</strong> Countdown, subtraction practice</p>
                </div>
                
                <h3>Practice Different Numbers</h3>
                <ul>
                    <li><strong>By 2s:</strong> 2, 4, 6, 8...</li>
                    <li><strong>By 5s:</strong> 5, 10, 15, 20...</li>
                    <li><strong>By 10s:</strong> 10, 20, 30, 40...</li>
                    <li><strong>By 100s:</strong> 100, 200, 300, 400...</li>
                </ul>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Money:</strong> Counting coins (nickels by 5, dimes by 10)</li>
                    <li><strong>Time:</strong> Minutes on a clock (5, 10, 15, 20...)</li>
                    <li><strong>Groups:</strong> Counting pairs, groups of 5 or 10</li>
                </ul>
            `,

            "Three-Digit Numbers": `
                <h2>Three-Digit Numbers</h2>
                <p>Three-digit numbers range from 100 to 999. They have hundreds, tens, and ones places!</p>
                
                <h3>Understanding Three Digits</h3>
                <p>Every three-digit number has three place values:</p>
                
                <div class="example">
                    <div class="example-title">The Number 347</div>
                    <p><strong>3</strong> is in the <strong>hundreds place</strong> = 3 hundreds = 300</p>
                    <p><strong>4</strong> is in the <strong>tens place</strong> = 4 tens = 40</p>
                    <p><strong>7</strong> is in the <strong>ones place</strong> = 7 ones = 7</p>
                    <p><strong>Together:</strong> 300 + 40 + 7 = <strong>347</strong></p>
                </div>
                
                <h3>Reading Three-Digit Numbers</h3>
                <div class="example">
                    <div class="example-title">How to Say It</div>
                    <p>523 = "Five hundred twenty-three"</p>
                    <p>608 = "Six hundred eight" (no tens!)</p>
                    <p>900 = "Nine hundred" (just hundreds!)</p>
                </div>
                
                <h3>Writing in Expanded Form</h3>
                <div class="example">
                    <div class="example-title">Different Ways to Write 456</div>
                    <p><strong>Standard form:</strong> 456</p>
                    <p><strong>Expanded form:</strong> 400 + 50 + 6</p>
                    <p><strong>Word form:</strong> Four hundred fifty-six</p>
                    <p><strong>Place value:</strong> 4 hundreds, 5 tens, 6 ones</p>
                </div>
                
                <h3>Comparing Three-Digit Numbers</h3>
                <p>Compare from left to right, starting with hundreds:</p>
                <div class="example">
                    <div class="example-title">Compare 567 and 589</div>
                    <p><strong>Step 1:</strong> Compare hundreds: both have 5 (same!)</p>
                    <p><strong>Step 2:</strong> Compare tens: 6 vs 8</p>
                    <p>8 > 6, so 589 > 567</p>
                    <p><strong>Answer:</strong> 567 < 589</p>
                </div>
                
                <h3>Number Patterns</h3>
                <ul>
                    <li><strong>100-199:</strong> "One hundred something"</li>
                    <li><strong>200-299:</strong> "Two hundred something"</li>
                    <li><strong>500:</strong> Exactly five hundred (no tens or ones)</li>
                    <li><strong>999:</strong> Largest three-digit number!</li>
                    <li><strong>1000:</strong> First four-digit number!</li>
                </ul>
                
                <h3>Real-World Three-Digit Numbers</h3>
                <ul>
                    <li><strong>Money:</strong> $145, $278</li>
                    <li><strong>Pages:</strong> Page 234 in a book</li>
                    <li><strong>Scores:</strong> 487 points in a game</li>
                    <li><strong>Distance:</strong> 523 miles</li>
                </ul>
            `,

            "Regrouping": `
                <h2>Regrouping</h2>
                <p>Regrouping (also called carrying and borrowing) helps us add and subtract larger numbers by trading between place values!</p>
                
                <h3>What is Regrouping?</h3>
                <p>Regrouping means trading 10 of one place value for 1 of the next higher place:</p>
                <ul>
                    <li>10 ones = 1 ten</li>
                    <li>10 tens = 1 hundred</li>
                    <li>And so on!</li>
                </ul>
                
                <h3>Regrouping in Addition (Carrying)</h3>
                <p>When a column adds to 10 or more, we carry to the next column:</p>
                
                <div class="example">
                    <div class="example-title">Example: 47 + 36</div>
                    <pre>  ¹47
+ 36
----
  83</pre>
                    <p><strong>Step 1:</strong> Add ones: 7 + 6 = 13</p>
                    <p>That's 1 ten and 3 ones!</p>
                    <p><strong>Step 2:</strong> Write 3, carry the 1 ten to tens column</p>
                    <p><strong>Step 3:</strong> Add tens: 1 + 4 + 3 = 8 tens</p>
                    <p><strong>Answer:</strong> <strong>83</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Visual: Trading Up</div>
                    <p>13 ones: 🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷</p>
                    <p>Trade 10 ones for 1 ten:</p>
                    <p>📦 🔷🔷🔷 = 1 ten and 3 ones</p>
                </div>
                
                <h3>Regrouping in Subtraction (Borrowing)</h3>
                <p>When we can't subtract, we borrow from the next column:</p>
                
                <div class="example">
                    <div class="example-title">Example: 63 − 28</div>
                    <pre>  ⁵¹63
− 28
----
  35</pre>
                    <p><strong>Step 1:</strong> Can't do 3 − 8, so borrow!</p>
                    <p>Borrow 1 ten from 6 tens → 5 tens and 13 ones</p>
                    <p><strong>Step 2:</strong> Now: 13 − 8 = 5 ones</p>
                    <p><strong>Step 3:</strong> Then: 5 tens − 2 tens = 3 tens</p>
                    <p><strong>Answer:</strong> <strong>35</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Visual: Trading Down</div>
                    <p>1 ten = 📦</p>
                    <p>Trade for 10 ones: 🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷</p>
                    <p>Now you have more ones to subtract!</p>
                </div>
                
                <h3>When Do We Regroup?</h3>
                <p><strong>In Addition:</strong> When a column sum is 10 or more → Carry</p>
                <p><strong>In Subtraction:</strong> When top digit is smaller → Borrow</p>
                
                <h3>Multiple Regrouping</h3>
                <div class="example">
                    <div class="example-title">Example: 67 + 85</div>
                    <pre>  ¹¹67
+ 85
----
 152</pre>
                    <p>Ones: 7 + 5 = 12 (carry 1)</p>
                    <p>Tens: 1 + 6 + 8 = 15 (carry 1)</p>
                    <p>Hundreds: 1</p>
                    <p><strong>Answer:</strong> <strong>152</strong></p>
                </div>
                
                <h3>Practice Tips</h3>
                <ul>
                    <li>Always write numbers neatly in columns</li>
                    <li>Start with the ones place</li>
                    <li>Mark your carried or borrowed numbers small above</li>
                    <li>Check your work by estimating first</li>
                </ul>
            `,

            "Money": `
                <h2>Money</h2>
                <p>Money is how we buy things! Understanding coins and bills helps you in everyday life.</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Understanding Dollars and Cents</h3>
                <p>Money in the US uses dollars ($) and cents (¢):</p>
                <ul>
                    <li>1 dollar = <strong>100 cents</strong></li>
                    <li>$1.00 = 100¢</li>
                </ul>
                
                <h3>The Four Main Coins</h3>
                <div class="example">
                    <div class="example-title">Coin Values</div>
                    <p>🪙 <strong>Penny:</strong> 1¢</p>
                    <p>🪙 <strong>Nickel:</strong> 5¢ = 5 pennies</p>
                    <p>🪙 <strong>Dime:</strong> 10¢ = 10 pennies = 2 nickels</p>
                    <p>🪙 <strong>Quarter:</strong> 25¢ = 25 pennies = 5 nickels = 2½ dimes</p>
                </div>
                
                <h3>Counting Mixed Coins</h3>
                <p>Start with the largest value coins and count up!</p>
                
                <div class="example">
                    <div class="example-title">Example: 2 quarters, 1 dime, 1 nickel</div>
                    <p><strong>Quarters first:</strong> 25¢, 50¢ (count by 25s)</p>
                    <p><strong>Add dime:</strong> 50¢ + 10¢ = 60¢</p>
                    <p><strong>Add nickel:</strong> 60¢ + 5¢ = <strong>65¢</strong></p>
                </div>
                
                <h3>Dollar Bills</h3>
                <div class="example">
                    <div class="example-title">Common Bills</div>
                    <ul>
                        <li><strong>$1 bill:</strong> One dollar = 100¢</li>
                        <li><strong>$5 bill:</strong> Five dollars = 500¢</li>
                        <li><strong>$10 bill:</strong> Ten dollars = 1,000¢</li>
                        <li><strong>$20 bill:</strong> Twenty dollars = 2,000¢</li>
                    </ul>
                </div>
                
                <h3>Writing Money Amounts</h3>
                <div class="example">
                    <div class="example-title">Money Notation</div>
                    <p><strong>Cents only:</strong> 45¢ or $0.45</p>
                    <p><strong>Dollars and cents:</strong> $3.50 (3 dollars and 50 cents)</p>
                    <p><strong>Whole dollars:</strong> $5.00 or $5</p>
                </div>
                
                <h3>Making Change</h3>
                <div class="example">
                    <div class="example-title">Example: Buy item for 35¢ with 50¢</div>
                    <p><strong>Cost:</strong> 35¢</p>
                    <p><strong>Paid:</strong> 50¢</p>
                    <p><strong>Change:</strong> 50¢ − 35¢ = <strong>15¢</strong></p>
                    <p>Could be: 1 dime + 1 nickel</p>
                </div>
                
                <h3>Real-World Money Skills</h3>
                <ul>
                    <li>Counting your savings</li>
                    <li>Buying items at a store</li>
                    <li>Getting correct change</li>
                    <li>Comparing prices</li>
                </ul>
            `,

            "Time to 5 Minutes": `
                <h2>Time to 5 Minutes</h2>
                <p>Now that you can tell time by the hour and half-hour, let's learn to read time to every 5 minutes!</p>
                
                <h3>Understanding the Clock</h3>
                <p>The minute hand points to numbers, but each number represents 5 minutes!</p>
                
                <div class="example">
                    <div class="example-title">The 5-Minute Marks</div>
                    <ul>
                        <li>At <strong>1</strong>: 5 minutes</li>
                        <li>At <strong>2</strong>: 10 minutes</li>
                        <li>At <strong>3</strong>: 15 minutes</li>
                        <li>At <strong>4</strong>: 20 minutes</li>
                        <li>At <strong>5</strong>: 25 minutes</li>
                        <li>At <strong>6</strong>: 30 minutes</li>
                        <li>At <strong>7</strong>: 35 minutes</li>
                        <li>At <strong>8</strong>: 40 minutes</li>
                        <li>At <strong>9</strong>: 45 minutes</li>
                        <li>At <strong>10</strong>: 50 minutes</li>
                        <li>At <strong>11</strong>: 55 minutes</li>
                        <li>At <strong>12</strong>: 60 minutes (00)</li>
                    </ul>
                </div>
                
                <h3>Reading the Time</h3>
                <div class="example">
                    <div class="example-title">Example: 4:15</div>
                    <p>⏰ <strong>Hour hand:</strong> Between 4 and 5</p>
                    <p>⏰ <strong>Minute hand:</strong> Points to 3</p>
                    <p><strong>Think:</strong> 3 × 5 = 15 minutes</p>
                    <p><strong>Time:</strong> 4:15 (four fifteen)</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: 7:45</div>
                    <p>⏰ <strong>Hour hand:</strong> Between 7 and 8 (almost to 8!)</p>
                    <p>⏰ <strong>Minute hand:</strong> Points to 9</p>
                    <p><strong>Think:</strong> 9 × 5 = 45 minutes</p>
                    <p><strong>Time:</strong> 7:45 (seven forty-five)</p>
                </div>
                
                <h3>Special Time Names</h3>
                <ul>
                    <li><strong>:00</strong> - "o'clock" (2:00 = 2 o'clock)</li>
                    <li><strong>:15</strong> - "quarter past" (3:15 = quarter past 3)</li>
                    <li><strong>:30</strong> - "half past" (5:30 = half past 5)</li>
                    <li><strong>:45</strong> - "quarter to" (6:45 = quarter to 7)</li>
                </ul>
                
                <h3>Skip Counting Connection</h3>
                <p>Reading minutes uses skip counting by 5!</p>
                <div class="example">
                    <div class="example-title">Count Around the Clock</div>
                    <p>Starting at 12, count by 5s:</p>
                    <p>12=0, 1=5, 2=10, 3=15, 4=20, 5=25, 6=30...</p>
                </div>
                
                <h3>Practice Tips</h3>
                <ul>
                    <li>Learn to skip count by 5s first</li>
                    <li>Remember which hand is which (short = hours, long = minutes)</li>
                    <li>The hour hand moves gradually as minutes pass</li>
                </ul>
                
                <h3>Real-Life Times</h3>
                <ul>
                    <li>School starts at 8:15</li>
                    <li>Recess at 10:30</li>
                    <li>Lunch at 12:15</li>
                    <li>Home at 3:20</li>
                </ul>
            `,

            "Bar Graphs and Picture Graphs": `
                <h2>Bar Graphs and Picture Graphs</h2>
                <p>Graphs help us see data in a visual way! Bar graphs and picture graphs make it easy to compare information.</p>
                
                <h3>Picture Graphs</h3>
                <p>Picture graphs use pictures or symbols to show data:</p>
                
                <div class="example">
                    <div class="example-title">Favorite Sports</div>
                    <p><strong>Soccer:</strong> ⚽⚽⚽⚽⚽⚽ (6 students)</p>
                    <p><strong>Basketball:</strong> 🏀🏀🏀🏀 (4 students)</p>
                    <p><strong>Baseball:</strong> ⚾⚾⚾⚾⚾⚾⚾ (7 students)</p>
                    <p><strong>Each symbol = 1 student</strong></p>
                    <p><strong>Most popular:</strong> Baseball!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Reading a Picture Graph</div>
                    <p>Ask yourself:</p>
                    <ul>
                        <li>What does each picture represent?</li>
                        <li>How many pictures are in each row?</li>
                        <li>Which has the most/least?</li>
                        <li>How many altogether?</li>
                    </ul>
                </div>
                
                <h3>Bar Graphs</h3>
                <p>Bar graphs use bars to show amounts:</p>
                
                <div class="example">
                    <div class="example-title">Books Read This Month</div>
                    <p><strong>Week 1:</strong> ▮▮▮▮ (4 books)</p>
                    <p><strong>Week 2:</strong> ▮▮▮ (3 books)</p>
                    <p><strong>Week 3:</strong> ▮▮▮▮▮▮ (6 books)</p>
                    <p><strong>Week 4:</strong> ▮▮▮▮▮ (5 books)</p>
                    <p><strong>Total:</strong> 4 + 3 + 6 + 5 = 18 books!</p>
                </div>
                
                <h3>Creating a Bar Graph</h3>
                <ol>
                    <li>Draw a horizontal line (x-axis) and vertical line (y-axis)</li>
                    <li>Label what you're comparing (x-axis)</li>
                    <li>Label the scale/numbers (y-axis)</li>
                    <li>Draw bars to show amounts</li>
                    <li>Add a title</li>
                </ol>
                
                <h3>Picture Graph vs Bar Graph</h3>
                <div class="example">
                    <div class="example-title">When to Use Each</div>
                    <p><strong>Picture graphs:</strong> Fun, visual, good for small numbers</p>
                    <p><strong>Bar graphs:</strong> Clearer for larger numbers, easier to compare</p>
                    <p>Both show the same information!</p>
                </div>
                
                <h3>Reading Graphs</h3>
                <p>Important questions to ask:</p>
                <ul>
                    <li>What is the title?</li>
                    <li>What is being counted?</li>
                    <li>Which category has the most?</li>
                    <li>Which has the least?</li>
                    <li>What's the difference between highest and lowest?</li>
                </ul>
                
                <h3>Real-World Graphs</h3>
                <ul>
                    <li>Comparing heights of classmates</li>
                    <li>Tracking favorite foods</li>
                    <li>Showing weather data</li>
                    <li>Displaying test results</li>
                </ul>
            `,

            "Measurement Units": `
                <h2>Measurement Units</h2>
                <p>Units tell us HOW we're measuring. Using the right unit helps us measure accurately!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>US Customary Length Units</h3>
                <div class="example">
                    <div class="example-title">From Smallest to Largest</div>
                    <ul>
                        <li><strong>Inch (in):</strong> About your thumb width</li>
                        <li><strong>Foot (ft):</strong> 12 inches, about your foot length</li>
                        <li><strong>Yard (yd):</strong> 3 feet, about one big step</li>
                        <li><strong>Mile (mi):</strong> 5,280 feet, for long distances</li>
                    </ul>
                </div>
                
                <h3>Metric Length Units</h3>
                <div class="example">
                    <div class="example-title">Metric System</div>
                    <ul>
                        <li><strong>Centimeter (cm):</strong> Width of your pinky</li>
                        <li><strong>Meter (m):</strong> 100 cm, about a big step</li>
                        <li><strong>Kilometer (km):</strong> 1,000 m, for long distances</li>
                    </ul>
                </div>
                
                <h3>Choosing the Right Unit</h3>
                <div class="example">
                    <div class="example-title">What to Use When</div>
                    <p><strong>Inches/Centimeters:</strong> Small things (pencils, hands, books)</p>
                    <p><strong>Feet/Meters:</strong> Medium things (people, rooms, cars)</p>
                    <p><strong>Miles/Kilometers:</strong> Long distances (trips, races)</p>
                </div>
                
                <h3>Comparing Measurements</h3>
                <div class="example">
                    <div class="example-title">Which is Longer?</div>
                    <p>5 inches or 1 foot?</p>
                    <p><strong>Think:</strong> 1 foot = 12 inches</p>
                    <p>12 inches > 5 inches</p>
                    <p><strong>Answer:</strong> 1 foot is longer!</p>
                </div>
                
                <h3>Tools for Measuring</h3>
                <ul>
                    <li><strong>Ruler:</strong> Measures in inches or centimeters (small)</li>
                    <li><strong>Yardstick/Meter stick:</strong> Longer measurements</li>
                    <li><strong>Tape measure:</strong> Flexible, for any shape</li>
                </ul>
                
                <h3>Practice Activity</h3>
                <p>Measure objects and choose the best unit:</p>
                <ul>
                    <li>Your desk width: <strong>feet or meters</strong></li>
                    <li>Your pencil length: <strong>inches or centimeters</strong></li>
                    <li>Distance to school: <strong>miles or kilometers</strong></li>
                </ul>
            `,

            "Arrays (Introduction)": `
                <h2>Arrays (Introduction)</h2>
                <p>An array is a way to arrange objects in equal rows and columns. Arrays help us see multiplication!</p>
                
                <h3>What is an Array?</h3>
                <p>An array is objects arranged in rows and columns, like a grid:</p>
                
                <div class="example">
                    <div class="example-title">Array of Stars</div>
                    <p>⭐⭐⭐⭐</p>
                    <p>⭐⭐⭐⭐</p>
                    <p>⭐⭐⭐⭐</p>
                    <p><strong>3 rows</strong> and <strong>4 columns</strong></p>
                    <p>Total stars: 3 × 4 = <strong>12 stars</strong></p>
                </div>
                
                <h3>Rows and Columns</h3>
                <div class="example">
                    <div class="example-title">Understanding the Grid</div>
                    <p><strong>Rows:</strong> Go across (horizontal) →</p>
                    <p><strong>Columns:</strong> Go up and down (vertical) ↑</p>
                    <p>Think: Rows are like rows of seats, columns like pillars!</p>
                </div>
                
                <h3>Counting with Arrays</h3>
                <p>There are three ways to count an array:</p>
                
                <div class="example">
                    <div class="example-title">Array: 4 rows × 5 columns</div>
                    <p><strong>Method 1: Count all:</strong> 1, 2, 3, 4, 5... 20</p>
                    <p><strong>Method 2: Add rows:</strong> 5 + 5 + 5 + 5 = 20</p>
                    <p><strong>Method 3: Multiply:</strong> 4 × 5 = 20</p>
                    <p>All give the same answer: <strong>20</strong></p>
                </div>
                
                <h3>Arrays Show Multiplication</h3>
                <div class="example">
                    <div class="example-title">Connection to Multiplication</div>
                    <p>🔷🔷🔷</p>
                    <p>🔷🔷🔷</p>
                    <p><strong>2 rows of 3</strong> = 2 × 3 = 6</p>
                    <p>OR</p>
                    <p><strong>3 columns of 2</strong> = 3 × 2 = 6</p>
                    <p>Same array, same answer!</p>
                </div>
                
                <h3>Commutative Property</h3>
                <p>You can turn an array and the total stays the same:</p>
                <div class="example">
                    <div class="example-title">Rotating an Array</div>
                    <p>3 rows × 4 columns = 12</p>
                    <p>4 rows × 3 columns = 12</p>
                    <p>3 × 4 = 4 × 3 ✓</p>
                </div>
                
                <h3>Real-World Arrays</h3>
                <ul>
                    <li><strong>Egg cartons:</strong> 2 rows × 6 = 12 eggs</li>
                    <li><strong>Muffin tins:</strong> 3 rows × 4 = 12 muffins</li>
                    <li><strong>Classroom desks:</strong> 5 rows × 4 = 20 desks</li>
                    <li><strong>Checkerboard:</strong> 8 rows × 8 = 64 squares</li>
                </ul>
                
                <h3>Making Your Own Arrays</h3>
                <p>Try arranging objects (coins, buttons, blocks) into arrays!</p>
                <ul>
                    <li>Can you make a 2 × 5 array?</li>
                    <li>How about a 3 × 3 array?</li>
                    <li>What numbers can you NOT make into equal arrays? (odd numbers!)</li>
                </ul>
            `,

            "Estimating Quantities": `
                <h2>Estimating Quantities</h2>
                <p>Estimating means making a good guess about "about how many." It helps us check if our answers make sense!</p>
                
                <h3>What is an Estimate?</h3>
                <p>An estimate is an educated guess that's close to the real answer:</p>
                <ul>
                    <li><strong>Not exact</strong> - but close enough to be useful</li>
                    <li><strong>Quick to do</strong> - faster than counting</li>
                    <li><strong>Helps you check</strong> - if exact answer is way off, you made a mistake!</li>
                </ul>
                
                <div class="example">
                    <div class="example-title">Example: Estimate Jelly Beans</div>
                    <p>🫘🫘🫘🫘🫘🫘🫘🫘🫘🫘🫘🫘🫘🫘🫘🫘🫘</p>
                    <p><strong>Too many to count quickly!</strong></p>
                    <p><strong>Estimate:</strong> "About 15 or 20"</p>
                    <p><strong>Actual count:</strong> 17 (our estimate was close!)</p>
                </div>
                
                <h3>Estimation Strategies</h3>
                
                <div class="example">
                    <div class="example-title">Strategy 1: Group and Count</div>
                    <p>Group items by 5s or 10s, then count groups</p>
                    <p>|||| |||| |||| (3 groups of 5 = about 15)</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Strategy 2: Round to Nearby Number</div>
                    <p>48 is close to <strong>50</strong></p>
                    <p>23 is close to <strong>20</strong></p>
                    <p>To estimate 48 + 23: 50 + 20 = <strong>about 70</strong></p>
                    <p>(Actual: 71 - very close!)</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Strategy 3: Use Reference Points</div>
                    <p>Compare to something you know:</p>
                    <p>"This pile has about twice as many as that pile"</p>
                    <p>"This looks like about 10, so this must be about 30"</p>
                </div>
                
                <h3>When to Estimate</h3>
                <ul>
                    <li><strong>Too many to count:</strong> Crowd size, grains of sand</li>
                    <li><strong>Quick check needed:</strong> Does $47.89 + $23.12 ≈ $71? Yes!</li>
                    <li><strong>No exact count needed:</strong> "About how long will this take?"</li>
                </ul>
                
                <h3>Estimation Words</h3>
                <p>These words mean we're estimating:</p>
                <ul>
                    <li><strong>About</strong> - about 30 people</li>
                    <li><strong>Approximately</strong> - approximately 50 miles</li>
                    <li><strong>Around</strong> - around 100 students</li>
                    <li><strong>Nearly</strong> - nearly 20 minutes</li>
                    <li><strong>Close to</strong> - close to $5</li>
                </ul>
                
                <h3>Checking Your Work</h3>
                <div class="example">
                    <div class="example-title">Using Estimation to Check</div>
                    <p><strong>Problem:</strong> 52 + 38 = ?</p>
                    <p><strong>Your answer:</strong> 810</p>
                    <p><strong>Estimate:</strong> 50 + 40 = 90</p>
                    <p><strong>Check:</strong> 810 is WAY different from 90 - there's a mistake!</p>
                    <p><strong>Correct answer:</strong> 90 (the estimate was right!)</p>
                </div>
                
                <h3>Practice Estimating</h3>
                <ul>
                    <li>Estimate how many books are on a shelf</li>
                    <li>Estimate how many students in your class</li>
                    <li>Estimate how many steps from your desk to the door</li>
                </ul>
            `,

            "Place Value (Hundreds)": `
                <h2>Place Value (Hundreds)</h2>
                <p>Now we're working with three-digit numbers! Understanding hundreds place makes big numbers easier to work with.</p>
                
                <h3>The Three Places</h3>
                <p>Every three-digit number has hundreds, tens, and ones:</p>
                
                <div class="example">
                    <div class="example-title">The Number 456</div>
                    <p><strong>4</strong> is in the <strong>hundreds place</strong> = 4 hundreds = 400</p>
                    <p><strong>5</strong> is in the <strong>tens place</strong> = 5 tens = 50</p>
                    <p><strong>6</strong> is in the <strong>ones place</strong> = 6 ones = 6</p>
                    <p><strong>Total:</strong> 400 + 50 + 6 = <strong>456</strong></p>
                </div>
                
                <h3>Visual Representation</h3>
                <div class="example">
                    <div class="example-title">Using Base-Ten Blocks</div>
                    <p>For 234:</p>
                    <p>📊📊 (2 hundreds flats = 200)</p>
                    <p>📦📦📦 (3 tens rods = 30)</p>
                    <p>🔷🔷🔷🔷 (4 ones cubes = 4)</p>
                    <p><strong>Total:</strong> 234</p>
                </div>
                
                <h3>Expanded Form</h3>
                <div class="example">
                    <div class="example-title">Writing 583 Different Ways</div>
                    <p><strong>Standard:</strong> 583</p>
                    <p><strong>Expanded:</strong> 500 + 80 + 3</p>
                    <p><strong>Word form:</strong> Five hundred eighty-three</p>
                    <p><strong>Place value:</strong> 5 hundreds, 8 tens, 3 ones</p>
                </div>
                
                <h3>Comparing Three-Digit Numbers</h3>
                <p>Always start with the biggest place value!</p>
                <div class="example">
                    <div class="example-title">Which is Greater: 647 or 652?</div>
                    <p><strong>Hundreds:</strong> Both have 6 (same!)</p>
                    <p><strong>Tens:</strong> 4 vs 5 → 5 is greater</p>
                    <p><strong>Answer:</strong> 652 > 647</p>
                </div>
                
                <h3>Important Numbers</h3>
                <ul>
                    <li><strong>100:</strong> One hundred (smallest 3-digit number)</li>
                    <li><strong>500:</strong> Five hundred (halfway to 1000)</li>
                    <li><strong>999:</strong> Nine hundred ninety-nine (largest 3-digit)</li>
                    <li><strong>1000:</strong> One thousand (first 4-digit number!)</li>
                </ul>
                
                <h3>Real-World Examples</h3>
                <ul>
                    <li><strong>Money:</strong> $347 = 3 hundred-dollar bills, 4 tens, 7 ones</li>
                    <li><strong>Pages:</strong> Page 582 in a thick book</li>
                    <li><strong>Addresses:</strong> 729 Main Street</li>
                </ul>
            `,

            "Mental Math Strategies": `
                <h2>Mental Math Strategies</h2>
                <p>Mental math means solving problems in your head without writing them down. These strategies make it faster and easier!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Adding 10 or 100</h3>
                <p>Adding 10 or 100 is super easy - just change one digit!</p>
                
                <div class="example">
                    <div class="example-title">Adding 10</div>
                    <p>45 + 10 = <strong>55</strong> (tens place goes up by 1)</p>
                    <p>82 + 10 = <strong>92</strong></p>
                    <p>127 + 10 = <strong>137</strong></p>
                    <p><strong>Trick:</strong> Only the tens digit changes!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Adding 100</div>
                    <p>234 + 100 = <strong>334</strong> (hundreds place goes up by 1)</p>
                    <p>567 + 100 = <strong>667</strong></p>
                    <p><strong>Trick:</strong> Only the hundreds digit changes!</p>
                </div>
                
                <h3>Subtracting 10 or 100</h3>
                <div class="example">
                    <div class="example-title">Subtracting 10</div>
                    <p>68 − 10 = <strong>58</strong> (tens place goes down by 1)</p>
                    <p>91 − 10 = <strong>81</strong></p>
                    <p>145 − 10 = <strong>135</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Subtracting 100</div>
                    <p>456 − 100 = <strong>356</strong> (hundreds place goes down by 1)</p>
                    <p>723 − 100 = <strong>623</strong></p>
                </div>
                
                <h3>Making Tens Strategy</h3>
                <p>Look for numbers that make 10 to make addition easier:</p>
                <div class="example">
                    <div class="example-title">Example: 8 + 7</div>
                    <p><strong>Think:</strong> 8 + 2 = 10, and I have 5 more</p>
                    <p>So: 10 + 5 = <strong>15</strong></p>
                    <p>Or: 7 + 3 = 10, and I have 5 more, so 10 + 5 = 15</p>
                </div>
                
                <h3>Doubles and Near Doubles</h3>
                <div class="example">
                    <div class="example-title">Doubles</div>
                    <p>5 + 5 = 10 (easy!)</p>
                    <p>7 + 7 = 14</p>
                    <p>9 + 9 = 18</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Near Doubles</div>
                    <p>6 + 7 = ?</p>
                    <p><strong>Think:</strong> 6 + 6 = 12, plus 1 more = <strong>13</strong></p>
                </div>
                
                <h3>Counting On/Back</h3>
                <p>For small differences, just count!</p>
                <div class="example">
                    <div class="example-title">Example</div>
                    <p>47 + 3: Start at 47, count up: 48, 49, 50</p>
                    <p>50 − 3: Start at 50, count back: 49, 48, 47</p>
                </div>
                
                <h3>Why Mental Math Matters</h3>
                <ul>
                    <li>Faster than writing</li>
                    <li>Builds number sense</li>
                    <li>Useful in everyday life (shopping, time)</li>
                    <li>Strengthens your brain!</li>
                </ul>
            `,

            "Measurement (Inches/Centimeters)": `
                <h2>Measurement (Inches/Centimeters)</h2>
                <p>Learning to use a ruler precisely is an important skill! Let's master measuring in inches and centimeters.</p>
                
                <h3>Parts of a Ruler</h3>
                <div class="example">
                    <div class="example-title">Reading a Ruler</div>
                    <ul>
                        <li><strong>Inches side:</strong> Usually on top, marked 1, 2, 3...</li>
                        <li><strong>Centimeters side:</strong> Usually on bottom, marked 1, 2, 3...</li>
                        <li><strong>Start:</strong> Always begins at 0</li>
                        <li><strong>Lines:</strong> Small marks show parts of an inch/cm</li>
                    </ul>
                </div>
                
                <h3>Measuring in Inches</h3>
                <div class="example">
                    <div class="example-title">How to Measure</div>
                    <p><strong>Step 1:</strong> Line up one end with 0</p>
                    <p><strong>Step 2:</strong> Look where the other end reaches</p>
                    <p><strong>Step 3:</strong> Read the number</p>
                    <p><strong>Step 4:</strong> Say the unit: "inches" or write "in"</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: Measuring a Crayon</div>
                    <p>Start at 0, end at 3</p>
                    <p><strong>Length:</strong> 3 inches</p>
                </div>
                
                <h3>Measuring in Centimeters</h3>
                <div class="example">
                    <div class="example-title">Centimeter Basics</div>
                    <p>Centimeters are smaller than inches:</p>
                    <p>1 inch ≈ 2.5 centimeters</p>
                    <p>The process is exactly the same - start at 0 and read where it ends!</p>
                </div>
                
                <h3>Half Inches and Half Centimeters</h3>
                <p>Sometimes objects land between two numbers:</p>
                <div class="example">
                    <div class="example-title">Between Numbers</div>
                    <p>If something reaches halfway between 2 and 3:</p>
                    <p><strong>Inches:</strong> 2½ inches or 2.5 inches</p>
                    <p><strong>Centimeters:</strong> 2.5 cm</p>
                </div>
                
                <h3>Being Accurate</h3>
                <ul>
                    <li>Always start at 0, not at the edge!</li>
                    <li>Keep the ruler straight and flat</li>
                    <li>Read at eye level (not from an angle)</li>
                    <li>Be as precise as you can</li>
                </ul>
                
                <h3>Comparing Inches and Centimeters</h3>
                <div class="example">
                    <div class="example-title">Same Object, Different Units</div>
                    <p>A pencil might be:</p>
                    <p><strong>7 inches</strong> long</p>
                    <p>OR</p>
                    <p><strong>18 centimeters</strong> long</p>
                    <p>Same pencil, different units!</p>
                </div>
                
                <h3>Practice Activity</h3>
                <p>Find and measure these objects:</p>
                <ul>
                    <li>Your pencil (in inches AND centimeters)</li>
                    <li>A book width</li>
                    <li>Your hand span</li>
                    <li>A piece of paper</li>
                </ul>
            `,

            "Repeated Addition": `
                <h2>Repeated Addition</h2>
                <p>Repeated addition is adding the same number over and over. It's the foundation for understanding multiplication!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is Repeated Addition?</h3>
                <p>When you add the same number multiple times:</p>
                
                <div class="example">
                    <div class="example-title">Adding 5 Three Times</div>
                    <p>5 + 5 + 5 = <strong>15</strong></p>
                    <p>We added 5 three times!</p>
                </div>
                
                <h3>Visual Repeated Addition</h3>
                <div class="example">
                    <div class="example-title">Groups of 4</div>
                    <p>🔷🔷🔷🔷 + 🔷🔷🔷🔷 + 🔷🔷🔷🔷</p>
                    <p>Three groups of 4</p>
                    <p>4 + 4 + 4 = <strong>12</strong></p>
                </div>
                
                <h3>Connection to Multiplication</h3>
                <p>Repeated addition is what multiplication means!</p>
                
                <div class="example">
                    <div class="example-title">Two Ways to Write It</div>
                    <p><strong>Repeated addition:</strong> 3 + 3 + 3 + 3 + 3 = 15</p>
                    <p><strong>Multiplication:</strong> 5 × 3 = 15</p>
                    <p>Both mean "5 groups of 3"!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Reading Multiplication</div>
                    <p><strong>4 × 6</strong> means:</p>
                    <ul>
                        <li>"4 groups of 6" → 6 + 6 + 6 + 6</li>
                        <li>"6 added 4 times" → 6 + 6 + 6 + 6</li>
                        <li>Answer: <strong>24</strong></li>
                    </ul>
                </div>
                
                <h3>Real-World Examples</h3>
                <div class="example">
                    <div class="example-title">Story: Bags of Apples</div>
                    <p>You have 5 bags. Each bag has 3 apples.</p>
                    <p><strong>Repeated addition:</strong> 3 + 3 + 3 + 3 + 3 = 15</p>
                    <p><strong>Multiplication:</strong> 5 × 3 = 15</p>
                    <p><strong>Total apples:</strong> 15</p>
                </div>
                
                <h3>Building Multiplication Tables</h3>
                <p>Repeated addition helps you learn multiplication facts:</p>
                <ul>
                    <li>2 + 2 + 2 = 6, so 3 × 2 = 6</li>
                    <li>4 + 4 + 4 + 4 = 16, so 4 × 4 = 16</li>
                    <li>5 + 5 = 10, so 2 × 5 = 10</li>
                </ul>
                
                <h3>Practice</h3>
                <p>Write these as repeated addition AND multiplication:</p>
                <ul>
                    <li>4 groups of 7</li>
                    <li>2 added 6 times</li>
                    <li>5 groups of 5</li>
                </ul>
            `,

            "Equal Groups": `
                <h2>Equal Groups</h2>
                <p>Equal groups are sets that have the same number of items. Understanding equal groups helps with both multiplication and division!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What are Equal Groups?</h3>
                <p>Equal groups have the exact same amount in each group:</p>
                
                <div class="example">
                    <div class="example-title">Example: 3 Equal Groups</div>
                    <p>🍎🍎🍎🍎 | 🍎🍎🍎🍎 | 🍎🍎🍎🍎</p>
                    <p><strong>3 groups</strong> of <strong>4 apples</strong> each</p>
                    <p><strong>Total:</strong> 3 × 4 = 12 apples</p>
                </div>
                
                <h3>Equal Groups and Multiplication</h3>
                <div class="example">
                    <div class="example-title">Groups Show Multiplication</div>
                    <p>If you have <strong>5 boxes</strong> with <strong>3 toys</strong> in each box:</p>
                    <p>🎁🎁🎁 | 🎁🎁🎁 | 🎁🎁🎁 | 🎁🎁🎁 | 🎁🎁🎁</p>
                    <p><strong>Number of groups:</strong> 5</p>
                    <p><strong>Size of each group:</strong> 3</p>
                    <p><strong>Total:</strong> 5 × 3 = 15 toys</p>
                </div>
                
                <h3>Equal Groups and Division</h3>
                <p>Division splits a total into equal groups!</p>
                
                <div class="example">
                    <div class="example-title">Two Types of Division Problems</div>
                    <p><strong>Type 1: How many groups?</strong></p>
                    <p>12 cookies, put 3 in each bag. How many bags?</p>
                    <p>12 ÷ 3 = <strong>4 bags</strong></p>
                    
                    <p><strong>Type 2: How many in each group?</strong></p>
                    <p>12 cookies, split into 4 bags. How many in each?</p>
                    <p>12 ÷ 4 = <strong>3 in each bag</strong></p>
                </div>
                
                <h3>Making Equal Groups</h3>
                <div class="example">
                    <div class="example-title">Activity: 15 Items</div>
                    <p>Can you make equal groups?</p>
                    <ul>
                        <li><strong>3 groups:</strong> 15 ÷ 3 = 5 in each ✓</li>
                        <li><strong>5 groups:</strong> 15 ÷ 5 = 3 in each ✓</li>
                        <li><strong>2 groups:</strong> 15 ÷ 2 = 7 R1 (not equal!)</li>
                    </ul>
                </div>
                
                <h3>Unequal vs Equal</h3>
                <div class="example">
                    <div class="example-title">Compare</div>
                    <p><strong>Unequal:</strong> 🔷🔷🔷 | 🔷🔷 | 🔷🔷🔷🔷 (3, 2, 4)</p>
                    <p><strong>Equal:</strong> 🔷🔷🔷 | 🔷🔷🔷 | 🔷🔷🔷 (3, 3, 3)</p>
                    <p>Only the second set has equal groups!</p>
                </div>
                
                <h3>Real-World Equal Groups</h3>
                <ul>
                    <li><strong>Sharing fairly:</strong> 20 candies among 4 friends = 5 each</li>
                    <li><strong>Packing:</strong> 24 cookies in boxes of 6 = 4 boxes</li>
                    <li><strong>Teams:</strong> 18 players in teams of 6 = 3 teams</li>
                </ul>
            `,

            "Shapes (2D Properties)": `
                <h2>Shapes (2D Properties)</h2>
                <p>Two-dimensional shapes are flat and have special properties. Let's explore sides, vertices (corners), and angles!</p>
                
                <h3>Properties of Shapes</h3>
                <p>Every 2D shape has these features:</p>
                <ul>
                    <li><strong>Sides:</strong> The straight or curved edges</li>
                    <li><strong>Vertices:</strong> The corners (where sides meet)</li>
                    <li><strong>Angles:</strong> The space where two sides meet</li>
                </ul>
                
                <h3>Triangle Properties</h3>
                <div class="example">
                    <div class="example-title">Triangle 🔺</div>
                    <ul>
                        <li><strong>Sides:</strong> 3 straight sides</li>
                        <li><strong>Vertices:</strong> 3 corners</li>
                        <li><strong>Angles:</strong> 3 angles</li>
                    </ul>
                    <p><strong>Types:</strong> Can be big, small, pointy, or wide - still a triangle!</p>
                </div>
                
                <h3>Quadrilateral Properties</h3>
                <p>Quadrilaterals are shapes with 4 sides:</p>
                
                <div class="example">
                    <div class="example-title">Square ⬜</div>
                    <ul>
                        <li><strong>Sides:</strong> 4 equal sides</li>
                        <li><strong>Vertices:</strong> 4 square corners (90° angles)</li>
                        <li><strong>Special:</strong> All sides MUST be the same length</li>
                    </ul>
                </div>
                
                <div class="example">
                    <div class="example-title">Rectangle ▭</div>
                    <ul>
                        <li><strong>Sides:</strong> 4 sides (opposite sides equal)</li>
                        <li><strong>Vertices:</strong> 4 square corners</li>
                        <li><strong>Special:</strong> 2 long sides, 2 short sides</li>
                    </ul>
                    <p>Note: A square is a special rectangle!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Trapezoid</div>
                    <ul>
                        <li><strong>Sides:</strong> 4 sides</li>
                        <li><strong>Special:</strong> At least 2 sides are parallel (go same direction)</li>
                    </ul>
                </div>
                
                <h3>Pentagon, Hexagon, Octagon</h3>
                <div class="example">
                    <div class="example-title">More Shapes</div>
                    <p><strong>Pentagon:</strong> 5 sides, 5 vertices</p>
                    <p><strong>Hexagon:</strong> 6 sides, 6 vertices (like a honeycomb!)</p>
                    <p><strong>Octagon:</strong> 8 sides, 8 vertices (like a stop sign!)</p>
                </div>
                
                <h3>Circle is Different</h3>
                <div class="example">
                    <div class="example-title">Circle ⭕</div>
                    <ul>
                        <li><strong>Sides:</strong> 0 (it's curved!)</li>
                        <li><strong>Vertices:</strong> 0 corners</li>
                        <li><strong>Special:</strong> Every point is the same distance from center</li>
                    </ul>
                </div>
                
                <h3>Counting Sides and Vertices</h3>
                <p><strong>Pattern:</strong> Most shapes have the same number of sides and vertices!</p>
                <ul>
                    <li>Triangle: 3 sides, 3 vertices</li>
                    <li>Square: 4 sides, 4 vertices</li>
                    <li>Pentagon: 5 sides, 5 vertices</li>
                </ul>
                
                <h3>Shape Hunt</h3>
                <p>Find these shapes around you:</p>
                <ul>
                    <li>Windows (rectangles)</li>
                    <li>Doors (rectangles)</li>
                    <li>Pizza slices (triangles)</li>
                    <li>Stop signs (octagons)</li>
                    <li>Coins (circles)</li>
                </ul>
            `,

            "Line Plots (Simple)": `
                <h2>Line Plots (Simple)</h2>
                <p>Line plots organize measurement data on a number line. They help us see all our data at once and find patterns!</p>
                
                <h3>What is a Line Plot?</h3>
                <p>A line plot shows data above a number line using X's or dots:</p>
                
                <div class="example">
                    <div class="example-title">Example: Pencil Lengths (in inches)</div>
                    <p style="font-family: monospace;">
                    <strong>X</strong><br>
                    <strong>X  X</strong><br>
                    <strong>X  X  X</strong><br>
                    4  5  6  7  inches
                    </p>
                    <p><strong>Data shown:</strong> 1 pencil is 4 inches, 2 are 5 inches, 3 are 6 inches</p>
                </div>
                
                <h3>Creating a Line Plot</h3>
                <ol>
                    <li><strong>Draw a number line:</strong> Include all values from your data</li>
                    <li><strong>Label it:</strong> Write what you're measuring and the unit</li>
                    <li><strong>Mark each data point:</strong> Put an X above the number for each measurement</li>
                    <li><strong>Stack X's:</strong> If multiple items have same measurement, stack the X's</li>
                </ol>
                
                <div class="example">
                    <div class="example-title">Example: Shoe Lengths</div>
                    <p><strong>Data:</strong> 6, 7, 6, 8, 7, 7, 6</p>
                    <p style="font-family: monospace;">
                    <strong>   X</strong><br>
                    <strong>X  X  X</strong><br>
                    <strong>X  X  X</strong><br>
                    6  7  8  inches
                    </p>
                    <p><strong>We see:</strong> 3 shoes are 6 inches, 3 are 7 inches, 1 is 8 inches</p>
                    <p><strong>Most common:</strong> 6 and 7 inches (mode)</p>
                </div>
                
                <h3>Reading a Line Plot</h3>
                <p>When you see a line plot, ask:</p>
                <ul>
                    <li><strong>What's being measured?</strong> (Read the label)</li>
                    <li><strong>What's the range?</strong> (Smallest to largest value)</li>
                    <li><strong>What's most common?</strong> (Tallest column of X's)</li>
                    <li><strong>How many total?</strong> (Count all X's)</li>
                </ul>
                
                <h3>Why Use Line Plots?</h3>
                <ul>
                    <li>Shows ALL the data at once</li>
                    <li>Easy to see patterns</li>
                    <li>Shows gaps (values with no X's)</li>
                    <li>Simple to create</li>
                </ul>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li>Measuring plant heights over time</li>
                    <li>Recording daily temperatures</li>
                    <li>Tracking how long tasks take</li>
                    <li>Comparing lengths or weights</li>
                </ul>
            `,

            "Counting Money": `
                <h2>Counting Money</h2>
                <p>Counting mixed coins is an important real-world skill! Let's learn to count combinations of pennies, nickels, dimes, and quarters.</p>
                
                <h3>The Strategy: Start with Largest</h3>
                <p>Always count largest value coins first, then work down to smallest!</p>
                
                <div class="example">
                    <div class="example-title">Example: Mixed Coins</div>
                    <p><strong>Coins:</strong> 3 quarters, 2 dimes, 1 nickel, 3 pennies</p>
                    <p><strong>Step 1 - Quarters (25¢):</strong> 25¢, 50¢, 75¢</p>
                    <p><strong>Step 2 - Dimes (10¢):</strong> 75¢ + 10¢ = 85¢, 85¢ + 10¢ = 95¢</p>
                    <p><strong>Step 3 - Nickels (5¢):</strong> 95¢ + 5¢ = $1.00</p>
                    <p><strong>Step 4 - Pennies (1¢):</strong> $1.00, $1.01, $1.02, $1.03</p>
                    <p><strong>Total:</strong> <strong>$1.03</strong> or <strong>103¢</strong></p>
                </div>
                
                <h3>Skip Counting with Coins</h3>
                <div class="example">
                    <div class="example-title">Counting 5 Nickels</div>
                    <p>Skip count by 5: 5¢, 10¢, 15¢, 20¢, 25¢</p>
                    <p><strong>Total:</strong> 25¢ (same as 1 quarter!)</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Counting 4 Dimes</div>
                    <p>Skip count by 10: 10¢, 20¢, 30¢, 40¢</p>
                    <p><strong>Total:</strong> 40¢</p>
                </div>
                
                <h3>Making a Dollar</h3>
                <p>There are many ways to make $1.00 (100¢):</p>
                <ul>
                    <li>100 pennies</li>
                    <li>20 nickels (20 × 5¢)</li>
                    <li>10 dimes (10 × 10¢)</li>
                    <li>4 quarters (4 × 25¢)</li>
                    <li>Combinations: 3 quarters + 2 dimes + 1 nickel = 100¢</li>
                </ul>
                
                <h3>Writing Money Amounts</h3>
                <div class="example">
                    <div class="example-title">Two Ways</div>
                    <p><strong>Using ¢:</strong> 47¢</p>
                    <p><strong>Using $:</strong> $0.47</p>
                    <p>Both mean forty-seven cents!</p>
                    <p><strong>Dollars and cents:</strong> $2.35 = 2 dollars and 35 cents</p>
                </div>
                
                <h3>Practice Tips</h3>
                <ul>
                    <li>Group same coins together</li>
                    <li>Count largest values first</li>
                    <li>Use skip counting for speed</li>
                    <li>Double-check by counting again</li>
                </ul>
                
                <h3>Real-Life Money Counting</h3>
                <ul>
                    <li>Counting your piggy bank</li>
                    <li>Paying for items at a store</li>
                    <li>Making sure you have enough money</li>
                    <li>Figuring out change</li>
                </ul>
            `,

            "Quarter Hours": `
                <h2>Quarter Hours</h2>
                <p>Quarter hours divide the clock into 4 equal parts. Understanding them helps with reading time more precisely!</p>
                
                <h3>What is a Quarter Hour?</h3>
                <p>A quarter hour is 15 minutes - one quarter (1/4) of an hour:</p>
                <ul>
                    <li>1 hour = 60 minutes</li>
                    <li>60 ÷ 4 = <strong>15 minutes</strong></li>
                    <li>So 1/4 hour = 15 minutes</li>
                </ul>
                
                <h3>The Four Quarter Hours</h3>
                <div class="example">
                    <div class="example-title">Dividing the Hour</div>
                    <p><strong>:00</strong> - On the hour (12 at top)</p>
                    <p><strong>:15</strong> - Quarter past (3 on right)</p>
                    <p><strong>:30</strong> - Half past (6 at bottom)</p>
                    <p><strong>:45</strong> - Quarter to next hour (9 on left)</p>
                </div>
                
                <h3>Reading Quarter Hours</h3>
                <div class="example">
                    <div class="example-title">3:15 (Quarter Past 3)</div>
                    <p>⏰ <strong>Minute hand:</strong> Points to 3</p>
                    <p>⏰ <strong>Hour hand:</strong> Just past 3</p>
                    <p><strong>We say:</strong> "Three fifteen" or "Quarter past three"</p>
                </div>
                
                <div class="example">
                    <div class="example-title">5:45 (Quarter to 6)</div>
                    <p>⏰ <strong>Minute hand:</strong> Points to 9</p>
                    <p>⏰ <strong>Hour hand:</strong> Almost at 6</p>
                    <p><strong>We say:</strong> "Five forty-five" or "Quarter to six"</p>
                    <p>It's 15 minutes before 6:00!</p>
                </div>
                
                <h3>Understanding "Quarter To"</h3>
                <p>When the minute hand points to 9, it's 15 minutes BEFORE the next hour:</p>
                <div class="example">
                    <div class="example-title">Quarter To Examples</div>
                    <p>2:45 = Quarter to 3 (15 minutes until 3:00)</p>
                    <p>8:45 = Quarter to 9 (15 minutes until 9:00)</p>
                </div>
                
                <h3>All Four Positions on the Clock</h3>
                <ul>
                    <li><strong>12 (top):</strong> :00 - on the hour</li>
                    <li><strong>3 (right):</strong> :15 - quarter past</li>
                    <li><strong>6 (bottom):</strong> :30 - half past</li>
                    <li><strong>9 (left):</strong> :45 - quarter to</li>
                </ul>
                
                <h3>Practice</h3>
                <p>What time is shown?</p>
                <ul>
                    <li>Minute hand at 3, hour hand past 7: <strong>7:15</strong></li>
                    <li>Minute hand at 9, hour hand almost at 4: <strong>3:45</strong></li>
                    <li>Minute hand at 6, hour hand between 2 and 3: <strong>2:30</strong></li>
                </ul>
            `,

            "Number Patterns (100s chart)": `
                <h2>Number Patterns (100s chart)</h2>
                <p>The hundreds chart shows numbers 1-100 in a grid. It reveals amazing patterns and helps with skip counting!</p>
                
                <h3>What is a Hundreds Chart?</h3>
                <p>A hundreds chart is a 10 × 10 grid showing numbers 1 to 100:</p>
                <div class="example">
                    <div class="example-title">The Chart Layout</div>
                    <p style="font-family: monospace; line-height: 1.2;">
                    1   2   3   4   5   6   7   8   9  10<br>
                    11  12  13  14  15  16  17  18  19  20<br>
                    21  22  23  24  25  26  27  28  29  30<br>
                    ...(continues to 100)
                    </p>
                    <p>Each row has 10 numbers!</p>
                </div>
                
                <h3>Vertical Patterns (Down)</h3>
                <div class="example">
                    <div class="example-title">Going Down Adds 10</div>
                    <p>Start at 5:</p>
                    <p>5 → 15 → 25 → 35 → 45 → 55...</p>
                    <p><strong>Pattern:</strong> Each number down adds 10</p>
                    <p><strong>Ones digit:</strong> Stays the same! (all end in 5)</p>
                </div>
                
                <h3>Horizontal Patterns (Across)</h3>
                <div class="example">
                    <div class="example-title">Going Right Adds 1</div>
                    <p>Start at 23:</p>
                    <p>23 → 24 → 25 → 26 → 27 → 28 → 29 → 30</p>
                    <p><strong>Pattern:</strong> Counting by 1s</p>
                </div>
                
                <h3>Diagonal Patterns</h3>
                <div class="example">
                    <div class="example-title">Diagonal Down-Right</div>
                    <p>1 → 12 → 23 → 34 → 45...</p>
                    <p><strong>Pattern:</strong> Add 11 each time</p>
                </div>
                
                <h3>Even and Odd Patterns</h3>
                <div class="example">
                    <div class="example-title">Visual Patterns</div>
                    <p><strong>Even numbers:</strong> Make vertical columns ending in 0, 2, 4, 6, 8</p>
                    <p><strong>Odd numbers:</strong> Make vertical columns ending in 1, 3, 5, 7, 9</p>
                    <p>They alternate like a checkerboard!</p>
                </div>
                
                <h3>Skip Counting Patterns</h3>
                <div class="example">
                    <div class="example-title">Count by 5s</div>
                    <p>Shade 5, 10, 15, 20, 25, 30... on the chart</p>
                    <p><strong>Pattern:</strong> Makes a diagonal path!</p>
                    <p>All end in 5 or 0</p>
                </div>
                
                <h3>Using the Chart</h3>
                <p>The hundreds chart helps you:</p>
                <ul>
                    <li><strong>Add 10:</strong> Just go down one row</li>
                    <li><strong>Subtract 10:</strong> Go up one row</li>
                    <li><strong>Add 1:</strong> Go right one space</li>
                    <li><strong>Subtract 1:</strong> Go left one space</li>
                </ul>
                
                <h3>Fun Patterns to Find</h3>
                <ul>
                    <li>All multiples of 10 are in the last column</li>
                    <li>Numbers ending in 5 are in the middle column</li>
                    <li>Each row starts with a different tens digit</li>
                </ul>
            `,
            
            // === GRADE 6 LESSONS (23 topics) ===
            
            "Ratios and Proportions": `
                <h2>Ratios and Proportions</h2>
                <p>Ratios compare two quantities, and proportions show that two ratios are equal. These are powerful tools for solving real-world problems!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is a Ratio?</h3>
                <p>A ratio compares two quantities. We write ratios three ways:</p>
                
                <div class="example">
                    <div class="example-title">Example: 3 Cats to 5 Dogs</div>
                    <p><strong>With colon:</strong> 3:5</p>
                    <p><strong>With "to":</strong> 3 to 5</p>
                    <p><strong>As fraction:</strong> 3/5</p>
                    <p>All three mean the same thing!</p>
                </div>
                
                <h3>Understanding Ratios</h3>
                <div class="example">
                    <div class="example-title">Real-Life Ratio</div>
                    <p>A recipe needs 2 cups flour to 1 cup sugar</p>
                    <p><strong>Ratio:</strong> 2:1 (flour to sugar)</p>
                    <p>For every 2 cups flour, you need 1 cup sugar</p>
                </div>
                
                <h3>Equivalent Ratios</h3>
                <p>Equivalent ratios have the same relationship, just like equivalent fractions!</p>
                
                <div class="example">
                    <div class="example-title">Doubling a Recipe</div>
                    <p><strong>Original ratio:</strong> 2:1 (flour:sugar)</p>
                    <p><strong>Double it:</strong> 4:2 (still 2:1 ratio!)</p>
                    <p><strong>Triple it:</strong> 6:3 (still 2:1 ratio!)</p>
                    <p>2:1 = 4:2 = 6:3 (all equivalent!)</p>
                </div>
                
                <h3>What is a Proportion?</h3>
                <p>A proportion is an equation showing two ratios are equal:</p>
                
                <div class="example">
                    <div class="example-title">Proportion Example</div>
                    <p>2/3 = 4/6</p>
                    <p>Or: 2:3 = 4:6</p>
                    <p>We read: "2 is to 3 as 4 is to 6"</p>
                </div>
                
                <h3>Solving Proportions: Cross Multiply</h3>
                <div class="example">
                    <div class="example-title">Find the Missing Number</div>
                    <p>3/4 = x/12</p>
                    <p><strong>Step 1: Cross multiply:</strong> 3 × 12 = 4 × x</p>
                    <p><strong>Step 2: Calculate:</strong> 36 = 4x</p>
                    <p><strong>Step 3: Divide:</strong> x = 36 ÷ 4 = <strong>9</strong></p>
                    <p><strong>Check:</strong> 3/4 = 9/12 ✓ (both = 0.75)</p>
                </div>
                
                <h3>Real-World Applications</h3>
                <ul>
                    <li><strong>Cooking:</strong> Scaling recipes up or down</li>
                    <li><strong>Maps:</strong> 1 inch = 50 miles (scale)</li>
                    <li><strong>Shopping:</strong> Unit prices ($3 for 2 cans, how much for 10?)</li>
                    <li><strong>Art:</strong> Maintaining proportions when resizing</li>
                </ul>
            `,

            "Coordinate Plane": `
                <h2>Coordinate Plane</h2>
                <p>The coordinate plane extends our coordinate system to include all four quadrants, including negative numbers!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Four Quadrants</h3>
                <p>The coordinate plane is divided into 4 sections by the x and y axes:</p>
                
                <div class="example">
                    <div class="example-title">The Quadrants</div>
                    <p><strong>Quadrant I (top right):</strong> (+x, +y) Both positive</p>
                    <p><strong>Quadrant II (top left):</strong> (−x, +y) x negative, y positive</p>
                    <p><strong>Quadrant III (bottom left):</strong> (−x, −y) Both negative</p>
                    <p><strong>Quadrant IV (bottom right):</strong> (+x, −y) x positive, y negative</p>
                </div>
                
                <h3>Plotting Points with Negatives</h3>
                <div class="example">
                    <div class="example-title">Example: Plot (−3, 4)</div>
                    <p><strong>Step 1:</strong> Start at origin (0, 0)</p>
                    <p><strong>Step 2:</strong> Move 3 units LEFT (x = −3)</p>
                    <p><strong>Step 3:</strong> Move 4 units UP (y = 4)</p>
                    <p><strong>Location:</strong> Quadrant II</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: Plot (2, −5)</div>
                    <p><strong>x = 2:</strong> Move 2 units RIGHT</p>
                    <p><strong>y = −5:</strong> Move 5 units DOWN</p>
                    <p><strong>Location:</strong> Quadrant IV</p>
                </div>
                
                <h3>The Axes</h3>
                <ul>
                    <li><strong>X-axis:</strong> Horizontal line (y = 0)</li>
                    <li><strong>Y-axis:</strong> Vertical line (x = 0)</li>
                    <li><strong>Origin:</strong> (0, 0) where axes meet</li>
                </ul>
                
                <h3>Special Points</h3>
                <div class="example">
                    <div class="example-title">Points on the Axes</div>
                    <p>(5, 0) - On x-axis (y is 0)</p>
                    <p>(0, −3) - On y-axis (x is 0)</p>
                    <p>(0, 0) - Origin (both are 0)</p>
                </div>
                
                <h3>Reflections and Symmetry</h3>
                <div class="example">
                    <div class="example-title">Opposite Points</div>
                    <p>(3, 4) and (−3, −4) are opposites through origin</p>
                    <p>(3, 4) and (3, −4) are reflections across x-axis</p>
                    <p>(3, 4) and (−3, 4) are reflections across y-axis</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>GPS:</strong> Latitude and longitude coordinates</li>
                    <li><strong>Video games:</strong> Character positions (x, y)</li>
                    <li><strong>Graphing data:</strong> Positive and negative values</li>
                    <li><strong>Navigation:</strong> Maps and directions</li>
                </ul>
            `,

            "Absolute Value": `
                <h2>Absolute Value</h2>
                <p>Absolute value is the distance a number is from zero. Distance is always positive, even if the number is negative!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is Absolute Value?</h3>
                <p>Absolute value measures how far a number is from 0 on the number line:</p>
                
                <div class="example">
                    <div class="example-title">Understanding Distance</div>
                    <p>|5| = <strong>5</strong> (5 is 5 units from zero)</p>
                    <p>|−5| = <strong>5</strong> (−5 is also 5 units from zero!)</p>
                    <p>|0| = <strong>0</strong> (0 is 0 units from zero)</p>
                </div>
                
                <h3>Visualizing on Number Line</h3>
                <div class="example">
                    <div class="example-title">Number Line</div>
                    <p>... −5 −4 −3 −2 −1  0  1  2  3  4  5 ...</p>
                    <p><strong>−5 to 0:</strong> 5 steps → |−5| = 5</p>
                    <p><strong>0 to 5:</strong> 5 steps → |5| = 5</p>
                    <p>Both are the same distance from zero!</p>
                </div>
                
                <h3>Absolute Value Rules</h3>
                <ul>
                    <li>Absolute value is <strong>never negative</strong></li>
                    <li>|positive number| = the same number</li>
                    <li>|negative number| = the opposite (positive version)</li>
                    <li>|0| = 0</li>
                </ul>
                
                <div class="example">
                    <div class="example-title">More Examples</div>
                    <p>|12| = <strong>12</strong></p>
                    <p>|−8| = <strong>8</strong></p>
                    <p>|−100| = <strong>100</strong></p>
                    <p>|3.5| = <strong>3.5</strong></p>
                </div>
                
                <h3>Comparing with Absolute Values</h3>
                <div class="example">
                    <div class="example-title">Which is Greater?</div>
                    <p>Compare: −7 and 3</p>
                    <p><strong>Actual values:</strong> −7 < 3 (3 is greater)</p>
                    <p><strong>Absolute values:</strong> |−7| = 7, |3| = 3</p>
                    <p>7 > 3, so |−7| > |3|</p>
                    <p>−7 is farther from zero!</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Temperature:</strong> Change from 30° to 20° = |20−30| = 10° change</li>
                    <li><strong>Elevation:</strong> Both 50ft above and 50ft below sea level are 50ft away</li>
                    <li><strong>Distance:</strong> Whether you walk 5 blocks east or west, you walked |5| = 5 blocks</li>
                    <li><strong>Money:</strong> $50 debt has magnitude of |−50| = $50</li>
                </ul>
            `,

            "Statistical Questions": `
                <h2>Statistical Questions</h2>
                <p>Statistical questions require collecting data that varies. They help us understand groups and make predictions!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What Makes a Question Statistical?</h3>
                <p>A statistical question expects variability in the answers - not just one answer!</p>
                
                <div class="example">
                    <div class="example-title">Statistical vs Non-Statistical</div>
                    <p><strong>NOT Statistical:</strong> "How old is John?" (One answer: 12)</p>
                    <p><strong>Statistical:</strong> "How old are students in 6th grade?" (Many answers: 11, 12, 13)</p>
                    
                    <p><strong>NOT Statistical:</strong> "What's 5 + 7?" (One answer: 12)</p>
                    <p><strong>Statistical:</strong> "How many siblings do students have?" (Varies: 0, 1, 2, 3...)</p>
                </div>
                
                <h3>Measures of Center</h3>
                
                <div class="example">
                    <div class="example-title">Mean (Average)</div>
                    <p><strong>Formula:</strong> Sum of all values ÷ count of values</p>
                    <p><strong>Example:</strong> Test scores: 85, 90, 78, 92, 80</p>
                    <p>Mean = (85+90+78+92+80) ÷ 5 = 425 ÷ 5 = <strong>85</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Median (Middle Value)</div>
                    <p><strong>How to find:</strong> Put data in order, pick the middle</p>
                    <p><strong>Example:</strong> 3, 7, 12, 15, 20</p>
                    <p>Median = <strong>12</strong> (middle number)</p>
                    <p>If even count: average the two middle numbers</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Mode (Most Frequent)</div>
                    <p><strong>Definition:</strong> The value that appears most often</p>
                    <p><strong>Example:</strong> 5, 7, 7, 8, 7, 9</p>
                    <p>Mode = <strong>7</strong> (appears 3 times)</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Range (Spread)</div>
                    <p><strong>Formula:</strong> Maximum − Minimum</p>
                    <p><strong>Example:</strong> Data: 12, 18, 15, 25, 20</p>
                    <p>Range = 25 − 12 = <strong>13</strong></p>
                    <p>Shows how spread out the data is</p>
                </div>
                
                <h3>Analyzing Data Distributions</h3>
                <p>When you have statistical data:</p>
                <ol>
                    <li><strong>Organize:</strong> Put in order or make a graph</li>
                    <li><strong>Calculate:</strong> Find mean, median, mode, range</li>
                    <li><strong>Interpret:</strong> What does the data tell us?</li>
                    <li><strong>Conclude:</strong> Answer the statistical question!</li>
                </ol>
                
                <h3>Real-World Statistical Questions</h3>
                <ul>
                    <li>"How tall are 6th graders?" (collect heights, find average)</li>
                    <li>"What time do students go to bed?" (survey, analyze results)</li>
                    <li>"How many books do students read per month?" (varies by student)</li>
                </ul>
            `,

            "Rate and Unit Rate": `
                <h2>Rate and Unit Rate</h2>
                <p>Rates compare two different kinds of quantities, like miles per hour or cost per item. Unit rates make comparisons easy!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is a Rate?</h3>
                <p>A rate compares two different types of measurements:</p>
                
                <div class="example">
                    <div class="example-title">Common Rates</div>
                    <ul>
                        <li><strong>Speed:</strong> 60 miles per hour (60 miles/hour)</li>
                        <li><strong>Price:</strong> $3 for 2 pounds ($3/2 pounds)</li>
                        <li><strong>Typing:</strong> 40 words per minute (40 words/minute)</li>
                        <li><strong>Heartbeat:</strong> 72 beats per minute</li>
                    </ul>
                </div>
                
                <h3>What is a Unit Rate?</h3>
                <p>A unit rate has a denominator of 1 - it shows the rate for ONE unit:</p>
                
                <div class="example">
                    <div class="example-title">Finding Unit Rate</div>
                    <p><strong>Rate:</strong> $6 for 3 pounds</p>
                    <p><strong>Unit rate:</strong> $6 ÷ 3 = <strong>$2 per 1 pound</strong></p>
                    <p>Or simply: <strong>$2/pound</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Speed Example</div>
                    <p><strong>Rate:</strong> 150 miles in 3 hours</p>
                    <p><strong>Unit rate:</strong> 150 ÷ 3 = <strong>50 miles per hour</strong></p>
                    <p>This tells us the speed for ONE hour</p>
                </div>
                
                <h3>Why Unit Rates are Useful</h3>
                <p>Unit rates make it easy to compare options!</p>
                
                <div class="example">
                    <div class="example-title">Comparing Prices</div>
                    <p><strong>Store A:</strong> $8 for 4 apples = $2 per apple</p>
                    <p><strong>Store B:</strong> $9 for 3 apples = $3 per apple</p>
                    <p><strong>Better deal:</strong> Store A!</p>
                </div>
                
                <h3>Calculating Unit Rates</h3>
                <p><strong>Formula:</strong> Divide the first quantity by the second</p>
                
                <div class="example">
                    <div class="example-title">Step-by-Step</div>
                    <p><strong>Problem:</strong> 200 words in 5 minutes</p>
                    <p><strong>Divide:</strong> 200 ÷ 5 = 40</p>
                    <p><strong>Unit rate:</strong> <strong>40 words per minute</strong></p>
                </div>
                
                <h3>Using Unit Rates</h3>
                <div class="example">
                    <div class="example-title">Scaling Up</div>
                    <p>If you type 40 words/minute, how many in 8 minutes?</p>
                    <p>40 × 8 = <strong>320 words</strong></p>
                </div>
                
                <h3>Real-World Applications</h3>
                <ul>
                    <li><strong>Shopping:</strong> Price per ounce to find best deal</li>
                    <li><strong>Travel:</strong> Miles per gallon for fuel efficiency</li>
                    <li><strong>Work:</strong> Dollars per hour (hourly wage)</li>
                    <li><strong>Sports:</strong> Points per game average</li>
                </ul>
            `,

            "Expressions and Variables": `
                <h2>Expressions and Variables</h2>
                <p>Variables are letters that represent unknown numbers. Using variables opens up the power of algebra!</p>
                
                <h3>What is a Variable?</h3>
                <p>A variable is a letter (like x, y, n) that stands for a number we don't know yet:</p>
                
                <div class="example">
                    <div class="example-title">Understanding Variables</div>
                    <p><strong>x + 5</strong> means "some number plus 5"</p>
                    <p>If x = 3, then x + 5 = 3 + 5 = 8</p>
                    <p>If x = 10, then x + 5 = 10 + 5 = 15</p>
                    <p>The value of the expression changes based on x!</p>
                </div>
                
                <h3>Writing Algebraic Expressions</h3>
                <p>Translating words into algebra:</p>
                
                <div class="example">
                    <div class="example-title">Word Phrases to Expressions</div>
                    <p><strong>"5 more than n":</strong> n + 5</p>
                    <p><strong>"3 times x":</strong> 3x or 3 × x</p>
                    <p><strong>"y decreased by 7":</strong> y − 7</p>
                    <p><strong>"Half of m":</strong> m/2 or ½m</p>
                    <p><strong>"The product of 4 and n":</strong> 4n</p>
                </div>
                
                <h3>Evaluating Expressions</h3>
                <p>To evaluate, substitute the variable's value and calculate:</p>
                
                <div class="example">
                    <div class="example-title">Example: Evaluate 3x + 7 when x = 4</div>
                    <p><strong>Step 1:</strong> Substitute: 3(4) + 7</p>
                    <p><strong>Step 2:</strong> Multiply: 12 + 7</p>
                    <p><strong>Step 3:</strong> Add: <strong>19</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: Evaluate 2y − 5 when y = 8</div>
                    <p><strong>Substitute:</strong> 2(8) − 5</p>
                    <p><strong>Calculate:</strong> 16 − 5 = <strong>11</strong></p>
                </div>
                
                <h3>Order of Operations with Variables</h3>
                <p>PEMDAS still applies!</p>
                
                <div class="example">
                    <div class="example-title">Example: x² + 2x − 3 when x = 5</div>
                    <p><strong>Substitute:</strong> 5² + 2(5) − 3</p>
                    <p><strong>Exponent first:</strong> 25 + 2(5) − 3</p>
                    <p><strong>Multiply:</strong> 25 + 10 − 3</p>
                    <p><strong>Add/Subtract left to right:</strong> 35 − 3 = <strong>32</strong></p>
                </div>
                
                <h3>Multiple Variables</h3>
                <div class="example">
                    <div class="example-title">Example: 2x + 3y when x = 4, y = 2</div>
                    <p><strong>Substitute both:</strong> 2(4) + 3(2)</p>
                    <p><strong>Calculate:</strong> 8 + 6 = <strong>14</strong></p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Formulas:</strong> Distance = speed × time (d = st)</li>
                    <li><strong>Perimeter:</strong> P = 2l + 2w (l and w are variables)</li>
                    <li><strong>Money:</strong> Total cost = price × quantity (c = pq)</li>
                    <li><strong>Age:</strong> "In n years, I'll be 12 + n"</li>
                </ul>
            `,

            "One-Step Equations": `
                <h2>One-Step Equations</h2>
                <p>Equations are like puzzles - we solve them to find the unknown value! One-step equations need just one operation to solve.</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is an Equation?</h3>
                <p>An equation has an equals sign (=) and shows two expressions are equal:</p>
                
                <div class="example">
                    <div class="example-title">Parts of an Equation</div>
                    <p><strong>x + 5 = 12</strong></p>
                    <p>Left side: x + 5</p>
                    <p>Right side: 12</p>
                    <p>They're equal!</p>
                </div>
                
                <h3>Solving by Using Inverse Operations</h3>
                <p>To isolate the variable, do the OPPOSITE operation:</p>
                
                <div class="example">
                    <div class="example-title">Addition → Use Subtraction</div>
                    <p><strong>Equation:</strong> x + 7 = 15</p>
                    <p><strong>Think:</strong> "What plus 7 equals 15?"</p>
                    <p><strong>Solve:</strong> Subtract 7 from both sides</p>
                    <p>x + 7 − 7 = 15 − 7</p>
                    <p>x = <strong>8</strong></p>
                    <p><strong>Check:</strong> 8 + 7 = 15 ✓</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Subtraction → Use Addition</div>
                    <p><strong>Equation:</strong> x − 4 = 9</p>
                    <p><strong>Solve:</strong> Add 4 to both sides</p>
                    <p>x − 4 + 4 = 9 + 4</p>
                    <p>x = <strong>13</strong></p>
                    <p><strong>Check:</strong> 13 − 4 = 9 ✓</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Multiplication → Use Division</div>
                    <p><strong>Equation:</strong> 5x = 30</p>
                    <p><strong>Solve:</strong> Divide both sides by 5</p>
                    <p>5x ÷ 5 = 30 ÷ 5</p>
                    <p>x = <strong>6</strong></p>
                    <p><strong>Check:</strong> 5 × 6 = 30 ✓</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Division → Use Multiplication</div>
                    <p><strong>Equation:</strong> x/3 = 7</p>
                    <p><strong>Solve:</strong> Multiply both sides by 3</p>
                    <p>x/3 × 3 = 7 × 3</p>
                    <p>x = <strong>21</strong></p>
                    <p><strong>Check:</strong> 21/3 = 7 ✓</p>
                </div>
                
                <h3>The Balance Method</h3>
                <p>Think of equations like a balanced scale:</p>
                <ul>
                    <li>What you do to one side, do to the other</li>
                    <li>This keeps the equation balanced</li>
                    <li>Goal: Get the variable alone on one side</li>
                </ul>
                
                <h3>Always Check Your Answer!</h3>
                <p>Substitute your answer back into the original equation to verify</p>
                
                <h3>Real-World Equation Problems</h3>
                <ul>
                    <li>"I have some money. I earn $12 more and now have $35. How much did I start with?" → x + 12 = 35</li>
                    <li>"5 friends equally split a bill of $45. How much does each pay?" → 5x = 45</li>
                </ul>
            `,

            "Area of Triangles and Polygons": `
                <h2>Area of Triangles and Polygons</h2>
                <p>Finding the area of triangles and other polygons helps us measure all kinds of shapes, not just rectangles!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Area of a Triangle</h3>
                <p><strong>Formula: A = ½bh</strong> (half of base times height)</p>
                
                <div class="example">
                    <div class="example-title">Understanding the Formula</div>
                    <p><strong>Base (b):</strong> Any side of the triangle</p>
                    <p><strong>Height (h):</strong> Perpendicular distance from base to opposite vertex</p>
                    <p><strong>Why ½?</strong> A triangle is half of a rectangle!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: Triangle with base = 8 cm, height = 5 cm</div>
                    <p><strong>Step 1:</strong> Write formula: A = ½bh</p>
                    <p><strong>Step 2:</strong> Substitute: A = ½ × 8 × 5</p>
                    <p><strong>Step 3:</strong> Calculate: A = ½ × 40 = <strong>20 cm²</strong></p>
                    <p>Or: A = (8 × 5) ÷ 2 = 40 ÷ 2 = 20 cm²</p>
                </div>
                
                <h3>Why Half of a Rectangle?</h3>
                <div class="example">
                    <div class="example-title">Visual Proof</div>
                    <p>Draw a rectangle 8 × 5 = 40 square units</p>
                    <p>Draw a diagonal - it splits into 2 triangles</p>
                    <p>Each triangle = 40 ÷ 2 = <strong>20 square units</strong></p>
                </div>
                
                <h3>Area of Composite Shapes</h3>
                <p>Break complex shapes into simpler ones!</p>
                
                <div class="example">
                    <div class="example-title">Example: L-Shaped Figure</div>
                    <p><strong>Strategy:</strong> Break into 2 rectangles</p>
                    <p>Rectangle 1: 4 × 3 = 12 sq units</p>
                    <p>Rectangle 2: 2 × 5 = 10 sq units</p>
                    <p><strong>Total area:</strong> 12 + 10 = <strong>22 sq units</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: House Shape (Rectangle + Triangle)</div>
                    <p>Rectangle (walls): 10 × 8 = 80 sq ft</p>
                    <p>Triangle (roof): ½ × 10 × 4 = 20 sq ft</p>
                    <p><strong>Total:</strong> 80 + 20 = <strong>100 sq ft</strong></p>
                </div>
                
                <h3>Area of Parallelograms</h3>
                <div class="example">
                    <div class="example-title">Parallelogram Formula</div>
                    <p><strong>A = bh</strong> (base times height)</p>
                    <p>Note: Height is PERPENDICULAR to base!</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Flooring:</strong> Calculate tile needed for a room</li>
                    <li><strong>Painting:</strong> How much paint for walls?</li>
                    <li><strong>Gardening:</strong> Size of triangular garden bed</li>
                    <li><strong>Construction:</strong> Roof area for shingles</li>
                </ul>
            `,

            "Surface Area": `
                <h2>Surface Area</h2>
                <p>Surface area is the total area of all faces of a 3D object. It tells us how much material we need to cover something!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is Surface Area?</h3>
                <p>Surface area is the sum of the areas of all faces (surfaces) of a 3D shape:</p>
                
                <h3>Surface Area of Rectangular Prisms</h3>
                <p>A rectangular prism (box) has 6 faces!</p>
                
                <div class="example">
                    <div class="example-title">The 6 Faces</div>
                    <p>A box has:</p>
                    <ul>
                        <li>2 front/back faces (length × height)</li>
                        <li>2 left/right faces (width × height)</li>
                        <li>2 top/bottom faces (length × width)</li>
                    </ul>
                </div>
                
                <div class="example">
                    <div class="example-title">Formula: SA = 2lw + 2lh + 2wh</div>
                    <p><strong>l</strong> = length, <strong>w</strong> = width, <strong>h</strong> = height</p>
                    <p>Or think: 2(lw + lh + wh)</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: Box 5 cm × 3 cm × 4 cm</div>
                    <p><strong>Top/Bottom:</strong> 2(5 × 3) = 2(15) = 30 cm²</p>
                    <p><strong>Front/Back:</strong> 2(5 × 4) = 2(20) = 40 cm²</p>
                    <p><strong>Sides:</strong> 2(3 × 4) = 2(12) = 24 cm²</p>
                    <p><strong>Total SA:</strong> 30 + 40 + 24 = <strong>94 cm²</strong></p>
                </div>
                
                <h3>Using Nets</h3>
                <p>A net is a flat pattern that folds into a 3D shape:</p>
                
                <div class="example">
                    <div class="example-title">Box Net</div>
                    <p>If you unfold a box, you see all 6 faces laid flat</p>
                    <p>Find area of each face, then add them all!</p>
                </div>
                
                <h3>Surface Area vs Volume</h3>
                <ul>
                    <li><strong>Surface Area:</strong> Outside covering (measured in square units)</li>
                    <li><strong>Volume:</strong> Space inside (measured in cubic units)</li>
                </ul>
                
                <h3>Real-World Applications</h3>
                <ul>
                    <li><strong>Wrapping gifts:</strong> How much paper needed?</li>
                    <li><strong>Painting:</strong> How much paint for all walls?</li>
                    <li><strong>Construction:</strong> Material for building exterior</li>
                    <li><strong>Packaging:</strong> Cardboard needed for a box</li>
                </ul>
            `,

            "Dividing Fractions": `
                <h2>Dividing Fractions</h2>
                <p>Dividing fractions uses a clever trick: Keep, Change, Flip! Once you know this method, fraction division becomes easy.</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>The KCF Method</h3>
                <p>Three simple steps to divide any fractions:</p>
                
                <div class="example">
                    <div class="example-title">K-C-F Strategy</div>
                    <ul>
                        <li><strong>K</strong>eep the first fraction the same</li>
                        <li><strong>C</strong>hange ÷ to ×</li>
                        <li><strong>F</strong>lip the second fraction (reciprocal)</li>
                    </ul>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: 2/3 ÷ 1/4</div>
                    <p><strong>Keep:</strong> 2/3</p>
                    <p><strong>Change:</strong> ÷ becomes ×</p>
                    <p><strong>Flip:</strong> 1/4 becomes 4/1</p>
                    <p><strong>New problem:</strong> 2/3 × 4/1</p>
                    <p><strong>Multiply:</strong> (2×4)/(3×1) = 8/3</p>
                    <p><strong>Mixed number:</strong> <strong>2 2/3</strong></p>
                </div>
                
                <h3>Understanding Why It Works</h3>
                <div class="example">
                    <div class="example-title">Example: 1/2 ÷ 1/4</div>
                    <p><strong>Question:</strong> How many 1/4s fit in 1/2?</p>
                    <p>🍕 Half a pizza vs 🍕 Quarter of pizza</p>
                    <p><strong>Answer:</strong> 2 quarters fit in 1 half</p>
                    <p><strong>Math:</strong> 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = <strong>2</strong> ✓</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example: 3/5 ÷ 2/3</div>
                    <p><strong>Step 1:</strong> Keep 3/5</p>
                    <p><strong>Step 2:</strong> Change to multiply</p>
                    <p><strong>Step 3:</strong> Flip 2/3 to 3/2</p>
                    <p><strong>Calculate:</strong> 3/5 × 3/2 = 9/10</p>
                </div>
                
                <h3>Dividing with Whole Numbers</h3>
                <div class="example">
                    <div class="example-title">Fraction ÷ Whole Number</div>
                    <p>3/4 ÷ 2 = ?</p>
                    <p><strong>Write 2 as fraction:</strong> 2/1</p>
                    <p><strong>K-C-F:</strong> 3/4 × 1/2 = 3/8</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Whole Number ÷ Fraction</div>
                    <p>6 ÷ 1/3 = ?</p>
                    <p><strong>Write 6 as fraction:</strong> 6/1</p>
                    <p><strong>K-C-F:</strong> 6/1 × 3/1 = 18/1 = <strong>18</strong></p>
                    <p><strong>Makes sense:</strong> How many thirds in 6? 18!</p>
                </div>
                
                <h3>Real-World Applications</h3>
                <ul>
                    <li><strong>Recipes:</strong> How many 1/4 cup servings in 2 cups?</li>
                    <li><strong>Wood cutting:</strong> How many 1/2 foot pieces from 6 feet?</li>
                    <li><strong>Fabric:</strong> How many 2/3 yard pieces from 4 yards?</li>
                </ul>
            `,

            "Negative Numbers": `
                <h2>Negative Numbers</h2>
                <p>Negative numbers are less than zero. They help us describe opposites like debt, below zero, and going backward!</p>
                
                <h3>Understanding Negative Numbers</h3>
                <p>The number line extends in both directions from zero:</p>
                
                <div class="example">
                    <div class="example-title">Extended Number Line</div>
                    <p>... −5, −4, −3, −2, −1, 0, 1, 2, 3, 4, 5 ...</p>
                    <p><strong>Positive numbers:</strong> Right of zero (greater than 0)</p>
                    <p><strong>Negative numbers:</strong> Left of zero (less than 0)</p>
                    <p><strong>Zero:</strong> Neither positive nor negative</p>
                </div>
                
                <h3>Reading Negative Numbers</h3>
                <div class="example">
                    <div class="example-title">How to Say Them</div>
                    <p>−5 = "negative 5" or "minus 5"</p>
                    <p>−12 = "negative twelve"</p>
                    <p>−0.5 = "negative zero point five"</p>
                </div>
                
                <h3>Comparing Negative Numbers</h3>
                <p>The farther left on the number line, the SMALLER the number:</p>
                
                <div class="example">
                    <div class="example-title">Which is Greater?</div>
                    <p>−3 vs −7</p>
                    <p>On number line: ... −7 ... −3 ... 0 ...</p>
                    <p>−3 is closer to zero (to the right)</p>
                    <p><strong>Answer:</strong> −3 > −7</p>
                    <p><strong>Remember:</strong> −3 is GREATER than −7!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">More Comparisons</div>
                    <p>−2 > −5 (−2 is closer to zero)</p>
                    <p>−10 < −1 (−10 is farther from zero)</p>
                    <p>0 > −100 (any positive/zero > any negative)</p>
                </div>
                
                <h3>Opposites</h3>
                <div class="example">
                    <div class="example-title">Opposites on Number Line</div>
                    <p>5 and −5 are <strong>opposites</strong></p>
                    <p>They're the same distance from zero, just in opposite directions</p>
                    <p>The opposite of −3 is 3</p>
                    <p>The opposite of 7 is −7</p>
                </div>
                
                <h3>Real-World Negative Numbers</h3>
                <ul>
                    <li><strong>Temperature:</strong> −10°F (below zero)</li>
                    <li><strong>Money:</strong> −$50 (debt, you owe money)</li>
                    <li><strong>Elevation:</strong> −200 feet (below sea level)</li>
                    <li><strong>Time:</strong> 5 BC (before year 0)</li>
                    <li><strong>Golf:</strong> −3 (3 under par)</li>
                </ul>
                
                <h3>Ordering Negative Numbers</h3>
                <div class="example">
                    <div class="example-title">Order from Least to Greatest</div>
                    <p><strong>Numbers:</strong> 3, −2, 0, −5, 1</p>
                    <p><strong>Ordered:</strong> −5, −2, 0, 1, 3</p>
                    <p>Move left to right on number line!</p>
                </div>
            `,

            "Operations with Integers": `
                <h2>Operations with Integers</h2>
                <p>Integers include all positive and negative whole numbers, plus zero. Let's learn how to add, subtract, multiply, and divide them!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Integer Rules Summary</h3>
                <div class="example">
                    <div class="example-title">Quick Reference</div>
                    <p><strong>Same signs → Add, keep sign</strong></p>
                    <p><strong>Different signs → Subtract, keep sign of larger</strong></p>
                </div>
                
                <h3>Adding Integers</h3>
                
                <div class="example">
                    <div class="example-title">Same Signs: Add</div>
                    <p><strong>Positive + Positive:</strong> 5 + 3 = <strong>8</strong> (move right)</p>
                    <p><strong>Negative + Negative:</strong> −5 + (−3) = <strong>−8</strong> (move left)</p>
                    <p>Add the numbers, keep the sign!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Different Signs: Subtract</div>
                    <p><strong>Positive + Negative:</strong> 8 + (−3)</p>
                    <p>Think: 8 − 3 = <strong>5</strong> (larger was positive)</p>
                    
                    <p><strong>Negative + Positive:</strong> −8 + 3</p>
                    <p>Think: 8 − 3 = 5, but larger was negative: <strong>−5</strong></p>
                </div>
                
                <h3>Subtracting Integers</h3>
                <p>Change subtraction to "add the opposite"!</p>
                
                <div class="example">
                    <div class="example-title">Change to Adding Opposite</div>
                    <p>5 − 8 = 5 + (−8) = <strong>−3</strong></p>
                    <p>−3 − 5 = −3 + (−5) = <strong>−8</strong></p>
                    <p>−4 − (−7) = −4 + 7 = <strong>3</strong></p>
                    <p>6 − (−2) = 6 + 2 = <strong>8</strong></p>
                </div>
                
                <h3>Multiplying and Dividing Integers</h3>
                
                <div class="example">
                    <div class="example-title">Sign Rules</div>
                    <p><strong>Same signs → Positive result</strong></p>
                    <p>3 × 4 = <strong>12</strong> (both positive)</p>
                    <p>−3 × −4 = <strong>12</strong> (both negative)</p>
                    
                    <p><strong>Different signs → Negative result</strong></p>
                    <p>3 × −4 = <strong>−12</strong></p>
                    <p>−3 × 4 = <strong>−12</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Division Works the Same</div>
                    <p>12 ÷ 3 = <strong>4</strong> (same signs → positive)</p>
                    <p>−12 ÷ −3 = <strong>4</strong> (same signs → positive)</p>
                    <p>−12 ÷ 3 = <strong>−4</strong> (different signs → negative)</p>
                    <p>12 ÷ −3 = <strong>−4</strong> (different signs → negative)</p>
                </div>
                
                <h3>Memory Tricks</h3>
                <ul>
                    <li><strong>"Two negatives make a positive"</strong> (−3 × −4 = +12)</li>
                    <li><strong>"A positive and negative make a negative"</strong> (3 × −4 = −12)</li>
                </ul>
                
                <h3>Real-World Applications</h3>
                <ul>
                    <li><strong>Temperature changes:</strong> Rising and falling temps</li>
                    <li><strong>Money:</strong> Earnings (+) and spending (−)</li>
                    <li><strong>Elevation:</strong> Above and below sea level</li>
                    <li><strong>Directions:</strong> Forward/backward, up/down</li>
                </ul>
            `,

            "GCF Applications": `
                <h2>GCF Applications</h2>
                <p>The Greatest Common Factor (GCF) has many practical uses, especially for simplifying fractions and solving real-world problems!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Review: What is GCF?</h3>
                <p>The GCF is the largest number that divides evenly into two or more numbers:</p>
                
                <div class="example">
                    <div class="example-title">Example: GCF of 12 and 18</div>
                    <p><strong>Factors of 12:</strong> 1, 2, 3, 4, 6, 12</p>
                    <p><strong>Factors of 18:</strong> 1, 2, 3, 6, 9, 18</p>
                    <p><strong>Common factors:</strong> 1, 2, 3, 6</p>
                    <p><strong>GCF:</strong> <strong>6</strong> (the greatest one)</p>
                </div>
                
                <h3>Application 1: Simplifying Fractions</h3>
                <p>Use GCF to reduce fractions to simplest form!</p>
                
                <div class="example">
                    <div class="example-title">Simplify 24/36</div>
                    <p><strong>Step 1:</strong> Find GCF of 24 and 36</p>
                    <p>GCF = 12</p>
                    <p><strong>Step 2:</strong> Divide both by GCF</p>
                    <p>24 ÷ 12 = 2</p>
                    <p>36 ÷ 12 = 3</p>
                    <p><strong>Simplified:</strong> 24/36 = <strong>2/3</strong></p>
                </div>
                
                <h3>Application 2: Equal Groups</h3>
                <div class="example">
                    <div class="example-title">Real-World Problem</div>
                    <p><strong>Problem:</strong> You have 20 pencils and 15 erasers. You want to make identical gift bags with no items left over. What's the greatest number of bags you can make?</p>
                    <p><strong>Solution:</strong> Find GCF of 20 and 15</p>
                    <p>GCF = 5</p>
                    <p><strong>Answer:</strong> <strong>5 bags</strong></p>
                    <p>Each bag: 4 pencils, 3 erasers</p>
                </div>
                
                <h3>Application 3: Tiling Problems</h3>
                <div class="example">
                    <div class="example-title">Square Tiles</div>
                    <p><strong>Problem:</strong> Cover a 24 in × 30 in rectangle with largest square tiles possible. What size?</p>
                    <p><strong>Solution:</strong> GCF of 24 and 30</p>
                    <p>GCF = 6</p>
                    <p><strong>Answer:</strong> <strong>6 in × 6 in tiles</strong></p>
                </div>
                
                <h3>Finding GCF Methods</h3>
                <div class="example">
                    <div class="example-title">Method 1: List Factors</div>
                    <p>List all factors, circle common ones, pick greatest</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Method 2: Prime Factorization</div>
                    <p>24 = 2³ × 3</p>
                    <p>36 = 2² × 3²</p>
                    <p>GCF = 2² × 3 = 4 × 3 = <strong>12</strong></p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li>Simplifying fractions in recipes</li>
                    <li>Making equal groups or teams</li>
                    <li>Tiling floors or walls</li>
                    <li>Cutting materials into largest equal pieces</li>
                </ul>
            `,

            "LCM Applications": `
                <h2>LCM Applications</h2>
                <p>The Least Common Multiple (LCM) helps us find when things happen together and add fractions with different denominators!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>Review: What is LCM?</h3>
                <p>The LCM is the smallest number that is a multiple of two or more numbers:</p>
                
                <div class="example">
                    <div class="example-title">Example: LCM of 4 and 6</div>
                    <p><strong>Multiples of 4:</strong> 4, 8, 12, 16, 20, 24...</p>
                    <p><strong>Multiples of 6:</strong> 6, 12, 18, 24, 30...</p>
                    <p><strong>Common multiples:</strong> 12, 24, 36...</p>
                    <p><strong>LCM:</strong> <strong>12</strong> (the least/smallest one)</p>
                </div>
                
                <h3>Application 1: Adding Fractions</h3>
                <p>LCM gives us the Least Common Denominator!</p>
                
                <div class="example">
                    <div class="example-title">Add 1/4 + 1/6</div>
                    <p><strong>Step 1:</strong> Find LCM of 4 and 6 = 12</p>
                    <p><strong>Step 2:</strong> Convert both fractions:</p>
                    <p>1/4 = 3/12 (multiply by 3/3)</p>
                    <p>1/6 = 2/12 (multiply by 2/2)</p>
                    <p><strong>Step 3:</strong> Add: 3/12 + 2/12 = <strong>5/12</strong></p>
                </div>
                
                <h3>Application 2: Repeating Events</h3>
                <div class="example">
                    <div class="example-title">Real-World Problem</div>
                    <p><strong>Problem:</strong> Bus A comes every 6 minutes. Bus B comes every 8 minutes. If both just left, when will they both be here again?</p>
                    <p><strong>Solution:</strong> Find LCM of 6 and 8</p>
                    <p>LCM = 24</p>
                    <p><strong>Answer:</strong> In <strong>24 minutes</strong></p>
                </div>
                
                <h3>Application 3: Scheduling</h3>
                <div class="example">
                    <div class="example-title">Calendar Problem</div>
                    <p><strong>Problem:</strong> You exercise every 3 days and volunteer every 5 days. If you do both today, when's the next time you do both on the same day?</p>
                    <p><strong>Solution:</strong> LCM of 3 and 5 = 15</p>
                    <p><strong>Answer:</strong> In <strong>15 days</strong></p>
                </div>
                
                <h3>Finding LCM Methods</h3>
                <div class="example">
                    <div class="example-title">Method 1: List Multiples</div>
                    <p>List multiples until you find the smallest common one</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Method 2: Prime Factorization</div>
                    <p>12 = 2² × 3</p>
                    <p>18 = 2 × 3²</p>
                    <p>LCM = 2² × 3² = 4 × 9 = <strong>36</strong></p>
                    <p>Take highest power of each prime</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li>Finding common denominators</li>
                    <li>Scheduling repeating events</li>
                    <li>Ordering materials that come in different package sizes</li>
                    <li>Music: Finding when beats align</li>
                </ul>
            `,

            "Ratio Tables": `
                <h2>Ratio Tables</h2>
                <p>Ratio tables organize equivalent ratios in rows and columns, making it easy to find missing values and see patterns!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is a Ratio Table?</h3>
                <p>A ratio table shows equivalent ratios organized in a table:</p>
                
                <div class="example">
                    <div class="example-title">Example: Recipe Ratio 2:3</div>
                    <p style="font-family: monospace;">
                    Flour  | 2  | 4  | 6  | 8  |<br>
                    Sugar  | 3  | 6  | 9  | 12 |
                    </p>
                    <p>Each column shows an equivalent ratio!</p>
                    <p>2:3 = 4:6 = 6:9 = 8:12</p>
                </div>
                
                <h3>Building a Ratio Table</h3>
                <div class="example">
                    <div class="example-title">Ratio: 3 apples cost $5</div>
                    <p style="font-family: monospace;">
                    Apples | 3  | 6  | 9  | 12 | 15 |<br>
                    Cost   | $5 |$10 |$15 | $20| $25|
                    </p>
                    <p><strong>Pattern:</strong> Multiply both quantities by the same number</p>
                </div>
                
                <h3>Finding Missing Values</h3>
                <div class="example">
                    <div class="example-title">Example: Complete the Table</div>
                    <p style="font-family: monospace;">
                    Miles | 30 | 60 | ? | 120 |<br>
                    Hours | 1  | 2  | 3 | 4   |
                    </p>
                    <p><strong>Pattern:</strong> Ratio is 30:1</p>
                    <p><strong>Missing value:</strong> 30 × 3 = <strong>90 miles</strong></p>
                </div>
                
                <h3>Using Ratio Tables to Solve</h3>
                <div class="example">
                    <div class="example-title">Problem</div>
                    <p><strong>Question:</strong> If 5 books cost $35, how much do 8 books cost?</p>
                    <p style="font-family: monospace;">
                    Books | 5  | 8  |<br>
                    Cost  |$35 | ?  |
                    </p>
                    <p><strong>Find unit rate:</strong> $35 ÷ 5 = $7 per book</p>
                    <p><strong>Calculate:</strong> 8 × $7 = <strong>$56</strong></p>
                </div>
                
                <h3>Advantages of Ratio Tables</h3>
                <ul>
                    <li>Makes patterns visible</li>
                    <li>Easy to find equivalent ratios</li>
                    <li>Helps solve proportion problems</li>
                    <li>Shows relationship clearly</li>
                </ul>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Recipes:</strong> Scaling ingredients</li>
                    <li><strong>Shopping:</strong> Comparing bulk prices</li>
                    <li><strong>Travel:</strong> Distance vs time tables</li>
                    <li><strong>Currency:</strong> Exchange rate tables</li>
                </ul>
            `,

            "Double Number Lines": `
                <h2>Double Number Lines</h2>
                <p>Double number lines use two parallel number lines to show equivalent ratios visually. They're great for solving ratio and proportion problems!</p>
                
                <h3>What are Double Number Lines?</h3>
                <p>Two number lines aligned to show corresponding values:</p>
                
                <div class="example">
                    <div class="example-title">Example: Miles and Hours</div>
                    <p style="font-family: monospace;">
                    Miles  |--|--|--|--|--|<br>
                           0 50 100 150 200<br>
                    <br>
                    Hours  |--|--|--|--|--|<br>
                           0  1  2  3  4
                    </p>
                    <p><strong>Shows:</strong> 50 miles per hour</p>
                    <p>2 hours = 100 miles, 3 hours = 150 miles</p>
                </div>
                
                <h3>Creating a Double Number Line</h3>
                <ol>
                    <li>Draw two parallel number lines</li>
                    <li>Mark 0 on both (align them!)</li>
                    <li>Use the ratio to mark corresponding points</li>
                    <li>Extend to find more equivalent ratios</li>
                </ol>
                
                <div class="example">
                    <div class="example-title">Example: 3 pounds cost $12</div>
                    <p style="font-family: monospace;">
                    Pounds |--|--|--|--|<br>
                           0  3  6  9 12<br>
                    <br>
                    Dollars|--|--|--|--|<br>
                           0 12 24 36 48
                    </p>
                    <p><strong>Ratio:</strong> 3 pounds:$12</p>
                    <p><strong>Unit rate:</strong> 1 pound = $4</p>
                </div>
                
                <h3>Solving Problems with Double Number Lines</h3>
                <div class="example">
                    <div class="example-title">Problem</div>
                    <p><strong>Question:</strong> A car travels 120 miles in 2 hours. How far in 5 hours?</p>
                    <p style="font-family: monospace;">
                    Hours |--|--|--|--|--|<br>
                          0  1  2  3  4  5<br>
                    <br>
                    Miles |--|--|--|--|--|<br>
                          0 60 120 180 240 300
                    </p>
                    <p><strong>Answer:</strong> <strong>300 miles</strong></p>
                </div>
                
                <h3>Advantages</h3>
                <ul>
                    <li>Visual representation of ratios</li>
                    <li>Easy to see patterns</li>
                    <li>Great for proportional reasoning</li>
                    <li>Helps understand unit rates</li>
                </ul>
                
                <h3>Real-World Applications</h3>
                <ul>
                    <li><strong>Recipes:</strong> Scaling up or down</li>
                    <li><strong>Speed:</strong> Distance over time</li>
                    <li><strong>Unit pricing:</strong> Cost per item</li>
                    <li><strong>Conversions:</strong> Inches to feet, km to miles</li>
                </ul>
            `,

            "Percent of a Number": `
                <h2>Percent of a Number</h2>
                <p>Finding a percent of a number is one of the most useful math skills! It's used in sales, taxes, tips, and more.</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>The Formula</h3>
                <p><strong>Percent of a number = (percent ÷ 100) × number</strong></p>
                <p>Or: <strong>Convert percent to decimal, then multiply</strong></p>
                
                <h3>Method 1: Convert to Decimal</h3>
                <div class="example">
                    <div class="example-title">Example: 25% of 80</div>
                    <p><strong>Step 1:</strong> Convert 25% to decimal</p>
                    <p>25% = 25/100 = 0.25</p>
                    <p><strong>Step 2:</strong> Multiply</p>
                    <p>0.25 × 80 = <strong>20</strong></p>
                    <p>So 25% of 80 = 20</p>
                </div>
                
                <h3>Method 2: Use Fraction</h3>
                <div class="example">
                    <div class="example-title">Example: 30% of 50</div>
                    <p><strong>Step 1:</strong> Write as fraction</p>
                    <p>30% = 30/100 = 3/10</p>
                    <p><strong>Step 2:</strong> Multiply</p>
                    <p>3/10 × 50 = 150/10 = <strong>15</strong></p>
                </div>
                
                <h3>Easy Percents to Know</h3>
                <div class="example">
                    <div class="example-title">Mental Math Shortcuts</div>
                    <p><strong>50% of any number:</strong> Divide by 2</p>
                    <p>50% of 60 = 60 ÷ 2 = <strong>30</strong></p>
                    
                    <p><strong>25% of any number:</strong> Divide by 4</p>
                    <p>25% of 80 = 80 ÷ 4 = <strong>20</strong></p>
                    
                    <p><strong>10% of any number:</strong> Divide by 10</p>
                    <p>10% of 70 = 70 ÷ 10 = <strong>7</strong></p>
                    
                    <p><strong>1% of any number:</strong> Divide by 100</p>
                    <p>1% of 200 = 200 ÷ 100 = <strong>2</strong></p>
                </div>
                
                <h3>Building from 10%</h3>
                <div class="example">
                    <div class="example-title">Using 10% to Find Others</div>
                    <p>Find 30% of 60:</p>
                    <p><strong>10% of 60 = 6</strong></p>
                    <p>30% = 3 × 10%, so: 3 × 6 = <strong>18</strong></p>
                </div>
                
                <h3>Real-World Applications</h3>
                <div class="example">
                    <div class="example-title">Sales Tax</div>
                    <p>Item costs $40, tax is 8%</p>
                    <p>Tax = 0.08 × $40 = <strong>$3.20</strong></p>
                    <p>Total cost = $40 + $3.20 = $43.20</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Tip at Restaurant</div>
                    <p>Bill is $25, you want to tip 20%</p>
                    <p>Tip = 0.20 × $25 = <strong>$5</strong></p>
                </div>
                
                <h3>Common Uses</h3>
                <ul>
                    <li><strong>Sales:</strong> "20% off $50 = save $10"</li>
                    <li><strong>Grades:</strong> "Got 85% on a 40-point test = 34 points"</li>
                    <li><strong>Growth:</strong> "Population increased 15%"</li>
                    <li><strong>Discounts:</strong> "30% off means pay 70%"</li>
                </ul>
            `,

            "Box Plots": `
                <h2>Box Plots</h2>
                <p>Box plots (also called box-and-whisker plots) show how data is spread out. They display the five-number summary in a visual way!</p>
                
                <h3>The Five-Number Summary</h3>
                <p>Every box plot shows these 5 key values:</p>
                
                <div class="example">
                    <div class="example-title">The Five Numbers</div>
                    <ol>
                        <li><strong>Minimum:</strong> Smallest value</li>
                        <li><strong>Q1 (First Quartile):</strong> 25% of data is below this</li>
                        <li><strong>Median (Q2):</strong> Middle value (50%)</li>
                        <li><strong>Q3 (Third Quartile):</strong> 75% of data is below this</li>
                        <li><strong>Maximum:</strong> Largest value</li>
                    </ol>
                </div>
                
                <h3>Reading a Box Plot</h3>
                <div class="example">
                    <div class="example-title">Box Plot Structure</div>
                    <p style="font-family: monospace;">
                    Min Q1  Med  Q3  Max<br>
                     |   [   |   ]   |<br>
                     ●───┤───┼───├───●<br>
                    whisker box  whisker
                    </p>
                    <p><strong>Box:</strong> Contains middle 50% of data (Q1 to Q3)</p>
                    <p><strong>Line in box:</strong> Median</p>
                    <p><strong>Whiskers:</strong> Extend to min and max</p>
                </div>
                
                <h3>Creating a Box Plot</h3>
                <p><strong>Data:</strong> 12, 15, 18, 20, 22, 25, 28, 30, 35</p>
                
                <div class="example">
                    <div class="example-title">Step-by-Step</div>
                    <p><strong>Step 1:</strong> Order data (already done)</p>
                    <p><strong>Step 2:</strong> Find five-number summary:</p>
                    <ul>
                        <li>Min = 12</li>
                        <li>Q1 = 18 (median of lower half: 12,15,18,20)</li>
                        <li>Median = 22 (middle value)</li>
                        <li>Q3 = 28 (median of upper half: 25,28,30,35)</li>
                        <li>Max = 35</li>
                    </ul>
                    <p><strong>Step 3:</strong> Draw number line and plot the 5 values</p>
                    <p><strong>Step 4:</strong> Draw box from Q1 to Q3, mark median, add whiskers</p>
                </div>
                
                <h3>What Box Plots Tell Us</h3>
                <ul>
                    <li><strong>Spread:</strong> Long whiskers = data spread out</li>
                    <li><strong>Skewness:</strong> Box closer to one side = skewed</li>
                    <li><strong>Median position:</strong> Line in middle of box = symmetric</li>
                    <li><strong>IQR:</strong> Box width shows middle 50% spread</li>
                </ul>
                
                <h3>Comparing Data Sets</h3>
                <p>Box plots make it easy to compare two groups!</p>
                <div class="example">
                    <div class="example-title">Example</div>
                    <p>Compare test scores for Class A vs Class B</p>
                    <p>Draw both box plots above same number line</p>
                    <p>Higher median? Better average performance</p>
                    <p>Smaller IQR? More consistent scores</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li>Comparing test scores between classes</li>
                    <li>Analyzing sports statistics</li>
                    <li>Understanding income distributions</li>
                    <li>Weather data analysis</li>
                </ul>
            `,

            "Histograms": `
                <h2>Histograms</h2>
                <p>Histograms display data by grouping values into intervals (bins). They show the shape and distribution of data!</p>
                
                <h3>What is a Histogram?</h3>
                <p>A histogram looks like a bar graph, but shows data grouped into ranges:</p>
                
                <div class="example">
                    <div class="example-title">Histogram vs Bar Graph</div>
                    <p><strong>Bar Graph:</strong> Each bar = one category (apples, oranges)</p>
                    <p><strong>Histogram:</strong> Each bar = a range of values (60-69, 70-79)</p>
                    <p><strong>Histogram bars touch!</strong> (continuous data)</p>
                </div>
                
                <h3>Reading a Histogram</h3>
                <div class="example">
                    <div class="example-title">Test Scores Histogram</div>
                    <p><strong>Intervals (bins):</strong></p>
                    <p>60-69: ▮▮▮ (3 students)</p>
                    <p>70-79: ▮▮▮▮▮▮▮ (7 students)</p>
                    <p>80-89: ▮▮▮▮▮ (5 students)</p>
                    <p>90-100: ▮▮▮▮ (4 students)</p>
                    <p><strong>Total students:</strong> 3+7+5+4 = 19</p>
                    <p><strong>Most common range:</strong> 70-79</p>
                </div>
                
                <h3>Frequency</h3>
                <p>Frequency means "how many" fall in each interval:</p>
                <div class="example">
                    <div class="example-title">Frequency Table</div>
                    <p>Interval | Frequency</p>
                    <p>0-9      | 2</p>
                    <p>10-19    | 5</p>
                    <p>20-29    | 8</p>
                    <p>30-39    | 3</p>
                </div>
                
                <h3>Creating a Histogram</h3>
                <ol>
                    <li><strong>Organize data:</strong> Decide on intervals (equal width!)</li>
                    <li><strong>Tally frequency:</strong> Count how many in each interval</li>
                    <li><strong>Draw axes:</strong> X-axis = intervals, Y-axis = frequency</li>
                    <li><strong>Draw bars:</strong> Height = frequency, bars touch!</li>
                    <li><strong>Label:</strong> Title, axes labels</li>
                </ol>
                
                <h3>Analyzing Histograms</h3>
                <p>Shape tells us about the data:</p>
                <ul>
                    <li><strong>Symmetric:</strong> Both sides similar (bell-shaped)</li>
                    <li><strong>Skewed right:</strong> Tail on right side</li>
                    <li><strong>Skewed left:</strong> Tail on left side</li>
                    <li><strong>Uniform:</strong> All bars about same height</li>
                </ul>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Test scores:</strong> Grade distributions</li>
                    <li><strong>Heights:</strong> Class height ranges</li>
                    <li><strong>Ages:</strong> Population age groups</li>
                    <li><strong>Sales:</strong> Product sales by price range</li>
                </ul>
            `,

            "Median and Mode": `
                <h2>Median and Mode</h2>
                <p>Along with the mean, median and mode help us understand data. They're different ways to find the "typical" value!</p>
                
                <h3>The Median (Middle Value)</h3>
                <p>The median is the middle number when data is ordered:</p>
                
                <div class="example">
                    <div class="example-title">Finding Median (Odd Count)</div>
                    <p><strong>Data:</strong> 3, 7, 12, 15, 20</p>
                    <p><strong>Already ordered!</strong></p>
                    <p><strong>Middle value:</strong> <strong>12</strong></p>
                    <p>Median = 12 (exactly in the middle)</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Finding Median (Even Count)</div>
                    <p><strong>Data:</strong> 4, 8, 12, 15, 18, 22</p>
                    <p><strong>Two middle values:</strong> 12 and 15</p>
                    <p><strong>Average them:</strong> (12 + 15) ÷ 2 = 27 ÷ 2 = <strong>13.5</strong></p>
                    <p>Median = 13.5</p>
                </div>
                
                <h3>The Mode (Most Frequent)</h3>
                <p>The mode is the value that appears most often:</p>
                
                <div class="example">
                    <div class="example-title">Finding Mode</div>
                    <p><strong>Data:</strong> 5, 7, 7, 8, 7, 9, 10</p>
                    <p><strong>Count frequency:</strong></p>
                    <p>5 appears 1 time</p>
                    <p>7 appears <strong>3 times</strong> ← most!</p>
                    <p>8, 9, 10 appear 1 time each</p>
                    <p><strong>Mode = 7</strong></p>
                </div>
                
                <div class="example">
                    <div class="example-title">Special Cases</div>
                    <p><strong>No mode:</strong> All values appear once (1, 2, 3, 4, 5)</p>
                    <p><strong>Bimodal:</strong> Two modes (2, 3, 3, 5, 5, 7 → modes are 3 and 5)</p>
                    <p><strong>Multimodal:</strong> More than two modes</p>
                </div>
                
                <h3>Mean vs Median vs Mode</h3>
                <div class="example">
                    <div class="example-title">Compare All Three</div>
                    <p><strong>Data:</strong> 3, 5, 5, 8, 9, 100</p>
                    <p><strong>Mean:</strong> (3+5+5+8+9+100) ÷ 6 = 130 ÷ 6 = 21.7</p>
                    <p><strong>Median:</strong> (5 + 8) ÷ 2 = 6.5</p>
                    <p><strong>Mode:</strong> 5 (appears twice)</p>
                    <p><strong>Note:</strong> 100 is an outlier - affects mean but not median/mode!</p>
                </div>
                
                <h3>When to Use Each</h3>
                <ul>
                    <li><strong>Mean:</strong> When data has no extreme outliers</li>
                    <li><strong>Median:</strong> When there are outliers (home prices, income)</li>
                    <li><strong>Mode:</strong> For categorical data (favorite color, most popular size)</li>
                </ul>
                
                <h3>Real-World Examples</h3>
                <ul>
                    <li><strong>Test scores:</strong> Find typical score (median)</li>
                    <li><strong>Shoe sizes:</strong> Most common size (mode)</li>
                    <li><strong>House prices:</strong> Median better than mean (outliers!)</li>
                    <li><strong>Survey results:</strong> Mode shows most popular choice</li>
                </ul>
            `,

            "Interquartile Range (IQR)": `
                <h2>Interquartile Range (IQR)</h2>
                <p>The IQR measures the spread of the middle 50% of data. It's less affected by outliers than the range!</p>
                
                ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
                
                <h3>What is IQR?</h3>
                <p><strong>IQR = Q3 − Q1</strong> (Third quartile minus First quartile)</p>
                <p>It shows how spread out the middle half of data is</p>
                
                <h3>Understanding Quartiles</h3>
                <p>Quartiles divide ordered data into four equal parts:</p>
                
                <div class="example">
                    <div class="example-title">The Four Quarters</div>
                    <p>Imagine data divided into 4 equal groups:</p>
                    <ul>
                        <li><strong>Q1:</strong> 25% of data below, 75% above</li>
                        <li><strong>Q2 (Median):</strong> 50% below, 50% above</li>
                        <li><strong>Q3:</strong> 75% below, 25% above</li>
                    </ul>
                </div>
                
                <h3>Finding IQR Step-by-Step</h3>
                <div class="example">
                    <div class="example-title">Data: 10, 12, 15, 18, 20, 22, 25, 28, 30</div>
                    <p><strong>Step 1:</strong> Data already ordered</p>
                    <p><strong>Step 2:</strong> Find median (Q2) = 20</p>
                    <p><strong>Step 3:</strong> Find Q1 (median of lower half)</p>
                    <p>Lower half: 10, 12, 15, 18</p>
                    <p>Q1 = (12 + 15) ÷ 2 = <strong>13.5</strong></p>
                    <p><strong>Step 4:</strong> Find Q3 (median of upper half)</p>
                    <p>Upper half: 22, 25, 28, 30</p>
                    <p>Q3 = (25 + 28) ÷ 2 = <strong>26.5</strong></p>
                    <p><strong>Step 5:</strong> Calculate IQR</p>
                    <p>IQR = Q3 − Q1 = 26.5 − 13.5 = <strong>13</strong></p>
                </div>
                
                <h3>What IQR Tells Us</h3>
                <ul>
                    <li><strong>Small IQR:</strong> Data is clustered/consistent</li>
                    <li><strong>Large IQR:</strong> Data is spread out/variable</li>
                    <li><strong>Ignores extremes:</strong> Not affected by outliers</li>
                </ul>
                
                <h3>IQR vs Range</h3>
                <div class="example">
                    <div class="example-title">Comparing Measures of Spread</div>
                    <p><strong>Range:</strong> Max − Min (includes ALL data)</p>
                    <p><strong>IQR:</strong> Q3 − Q1 (middle 50% only)</p>
                    <p>IQR is more reliable when outliers exist!</p>
                </div>
                
                <div class="example">
                    <div class="example-title">Example with Outlier</div>
                    <p>Data: 10, 12, 13, 15, 16, 100</p>
                    <p><strong>Range:</strong> 100 − 10 = 90 (huge!)</p>
                    <p><strong>IQR:</strong> 16 − 12 = 4 (more reasonable)</p>
                    <p>IQR ignores the outlier (100)</p>
                </div>
                
                <h3>Real-World Uses</h3>
                <ul>
                    <li><strong>Test scores:</strong> Measure consistency</li>
                    <li><strong>Income data:</strong> Middle class spread</li>
                    <li><strong>Sports:</strong> Player consistency</li>
                    <li><strong>Quality control:</strong> Product variation</li>
                </ul>
            `
        };
        
        // Return custom lesson if available, otherwise generate generic one
        return lessons[concept.concept] || this.generateGenericLesson(concept);
    }
    
    generateGenericLesson(concept) {
        return `
            <h2>${concept.concept}</h2>
            <p>${concept.keyConcepts}</p>
            
            ${concept.keyFormulas ? `<div class="formula-box">${concept.keyFormulas}</div>` : ''}
            
            <h3>Key Concepts</h3>
            <p>${concept.keyConcepts}</p>
            
            <h3>Related Operations</h3>
            <p>This topic involves: ${concept.relatedOperations}</p>
            
            <h3>Related Topics</h3>
            <p>Once you master this, you can explore: ${concept.relatedTopics}</p>
            
            <div class="example">
                <div class="example-title">Why is this important?</div>
                <p>Understanding ${concept.concept} builds a strong foundation for more advanced mathematical concepts!</p>
            </div>
            
            <div class="hint-box">
                <div class="hint-title">💡 Learning Tip</div>
                <p>Practice regularly and don't rush! Math skills build on each other, so take your time to understand each concept fully.</p>
            </div>
        `;
    }
    
    renderWalkthrough(container) {
        this.generateProblem();
        const steps = this.generateWalkthroughSteps();
        
        container.innerHTML = `
            <div class="lesson-content">
                <h2>Step-by-Step Walkthrough</h2>
                <div class="problem-display">${this.currentProblem.display}</div>
                ${steps}
                <div class="example">
                    <div class="example-title">✓ Final Answer</div>
                    <p style="font-size: 2rem; text-align: center; color: var(--success);">${this.formatAnswer(this.currentAnswer)}</p>
                </div>
                <button class="btn-new" onclick="app.renderWalkthrough(document.getElementById('contentArea'))">
                    Show Another Example
                </button>
            </div>
        `;
    }
    
    generateWalkthroughSteps() {
        if (!this.currentTopic) return '<p class="loading">Please select a topic to view the walkthrough.</p>';
        
        const concept = getConceptByName(this.currentTopic);
        if (!concept) return '<p class="loading">Topic data not found. Please select another topic.</p>';
        
        const walkthroughs = {
            "Addition": () => {
                const {a, b} = this.currentProblem;
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Identify the numbers:</strong> We need to add ${a} and ${b}.
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Understand what we're doing:</strong> Addition means combining quantities. We're putting ${a} and ${b} together.
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Calculate:</strong> ${a} + ${b} = ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Subtraction": () => {
                const {a, b} = this.currentProblem;
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Identify the numbers:</strong> We're subtracting ${b} from ${a}.
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Understand the operation:</strong> Subtraction means taking away. We start with ${a} and remove ${b}.
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Calculate:</strong> ${a} - ${b} = ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Multiplication": () => {
                const {a, b} = this.currentProblem;
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Identify the factors:</strong> We're multiplying ${a} and ${b}.
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Think of repeated addition:</strong> ${a} × ${b} means "${a} groups of ${b}" or adding ${b} to itself ${a} times.
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Calculate:</strong> ${a} × ${b} = ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Division": () => {
                const {a, b} = this.currentProblem;
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Identify the numbers:</strong> We're dividing ${a} by ${b}.
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Ask the question:</strong> "How many groups of ${b} fit into ${a}?" or "If we split ${a} into ${b} equal groups, how many in each?"
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Calculate:</strong> ${a} ÷ ${b} = ${this.currentAnswer}
                        ${this.currentProblem.remainder ? `<p style="margin-top: 10px;">Remainder: ${this.currentProblem.remainder}</p>` : ''}
                    </div>
                `;
            },
            
            "Fractions": () => {
                const {a, b, c, d, operation} = this.currentProblem;
                if (operation === 'simplify') {
                    return `
                        <div class="walkthrough-step">
                            <span class="step-number">1</span>
                            <strong>Find the GCF:</strong> Find the greatest common factor of ${a} and ${b}.
                        </div>
                        <div class="walkthrough-step">
                            <span class="step-number">2</span>
                            <strong>Divide both parts:</strong> Divide numerator and denominator by the GCF.
                        </div>
                        <div class="walkthrough-step">
                            <span class="step-number">3</span>
                            <strong>Simplified form:</strong> ${a}/${b} = ${this.currentAnswer}
                        </div>
                    `;
                }
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Identify the fractions:</strong> ${a}/${b} and ${c}/${d}
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Find common denominator or apply operation rules.</strong>
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Result:</strong> ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Percentages": () => {
                const {value, percent, total} = this.currentProblem;
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Convert percentage to decimal:</strong> ${percent}% = ${percent/100}
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Multiply:</strong> ${percent/100} × ${total} = ${this.currentAnswer}
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Answer:</strong> ${percent}% of ${total} is ${this.currentAnswer}
                    </div>
                `;
            },
            
            // Walkthrough generators for all major topics
            "Integers": () => {
                const {a, b, op} = this.currentProblem;
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Identify the numbers and operation:</strong> We have ${a} ${op} ${b}
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Apply integer rules:</strong> ${op === '+' ? 
                            'Same signs add and keep sign. Different signs subtract and keep sign of larger.' : 
                            'Change subtraction to adding the opposite, then follow addition rules.'}
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Calculate:</strong> ${a} ${op} ${b} = ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Decimals": () => {
                const {a, b, operation} = this.currentProblem;
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Line up the decimal points:</strong> Make sure decimals are aligned
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Perform the operation:</strong> ${a} ${operation} ${b}
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Answer:</strong> ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Pythagorean Theorem": () => {
                const {a, b} = this.currentProblem;
                const c = this.currentAnswer;
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Write the formula:</strong> a² + b² = c² (where c is the hypotenuse)
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Substitute values:</strong> ${a}² + ${b}² = ${a*a} + ${b*b} = ${a*a + b*b}
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Take the square root:</strong> c = √${a*a + b*b} = ${c.toFixed(2)}
                    </div>
                `;
            },
            
            "Quadratic Equations": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Identify the coefficients:</strong> In ax² + bx + c = 0, identify a, b, and c
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Apply quadratic formula:</strong> x = (-b ± √(b² - 4ac)) / 2a
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Calculate both solutions:</strong> Solve for + and - to get both roots
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">4</span>
                        <strong>Answer:</strong> x = ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Order of Operations": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Remember PEMDAS:</strong> Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right)
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Work through each step:</strong> Follow the order carefully
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Final answer:</strong> ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Slope": () => {
                const {x1, y1, x2, y2} = this.currentProblem;
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Slope formula:</strong> m = (y₂ - y₁) / (x₂ - x₁)
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Substitute points:</strong> m = (${y2} - ${y1}) / (${x2} - ${x1}) = ${y2-y1} / ${x2-x1}
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Simplify:</strong> m = ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Exponents": () => {
                const {base, exp} = this.currentProblem;
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Understand the notation:</strong> ${base}^${exp} means multiply ${base} by itself ${exp} times
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Calculate:</strong> ${base} × ${base}${exp > 2 ? ` × ${base}`.repeat(exp-2) : ''} = ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Scientific Notation": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Form: a × 10^n</strong> where 1 ≤ a < 10 and n is an integer
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Move decimal point:</strong> Count how many places to move
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Write in form:</strong> ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Place Value": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Identify each digit's place:</strong> Each position has a different value
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Break apart the number:</strong> Decompose into tens and ones
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Answer:</strong> ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Comparing Numbers": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Compare place values:</strong> Start with the biggest place value
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Use symbols:</strong> > (greater than), < (less than), = (equal)
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Answer:</strong> ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Area and Perimeter": () => {
                const {length, width} = this.currentProblem;
                const isArea = this.currentProblem.display.includes('area');
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>${isArea ? 'Area formula:' : 'Perimeter formula:'}</strong> ${isArea ? `A = length × width` : `P = 2(length + width)`}
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Substitute values:</strong> ${isArea ? `A = ${length} × ${width}` : `P = 2(${length} + ${width})`}
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Calculate:</strong> ${this.currentAnswer} ${isArea ? 'square units' : 'units'}
                    </div>
                `;
            },
            
            "Ratios and Proportions": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Set up the proportion:</strong> a/b = c/d
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Cross multiply:</strong> a × d = b × c
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Solve for unknown:</strong> ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Probability": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Probability formula:</strong> P = (favorable outcomes) / (total outcomes)
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Count outcomes:</strong> Identify favorable and total outcomes
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Calculate:</strong> P = ${this.currentAnswer}
                    </div>
                `;
            },
            
            // Additional walkthroughs for Grade 1-5 topics
            "Two-Digit Addition": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Line up the numbers:</strong> Write the numbers vertically, aligning ones and tens places
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Add the ones place first:</strong> If the sum is 10 or more, regroup (carry) 1 ten
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Add the tens place:</strong> Don't forget to add any regrouped tens
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">4</span>
                        <strong>Answer:</strong> ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Two-Digit Subtraction": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Line up the numbers:</strong> Write vertically with places aligned
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Subtract the ones:</strong> If top digit is smaller, borrow 1 ten (regroup)
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Subtract the tens:</strong> Remember to subtract 1 if you borrowed
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">4</span>
                        <strong>Answer:</strong> ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Prime Numbers": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Definition:</strong> A prime number has exactly 2 factors: 1 and itself
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Check divisibility:</strong> Try dividing by small numbers (2, 3, 5, 7...)
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Determine:</strong> If no whole divisors exist (except 1 and the number), it's prime
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">4</span>
                        <strong>Answer:</strong> ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Volume": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Volume formula:</strong> V = length × width × height (for rectangular prisms)
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Identify dimensions:</strong> Find l, w, and h from the problem
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Multiply:</strong> Calculate l × w × h
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">4</span>
                        <strong>Answer:</strong> ${this.currentAnswer} cubic units
                    </div>
                `;
            },
            
            "Coordinate Plane": () => {
                const {x, y} = this.currentProblem;
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Understand coordinates:</strong> Points are written as (x, y)
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Plot the point:</strong> Start at origin (0,0), move ${x} units horizontally, then ${y} units vertically
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Mark the location:</strong> This is point (${x}, ${y})
                    </div>
                `;
            },
            
            "One-Step Equations": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Identify the operation:</strong> What's being done to the variable?
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Use inverse operation:</strong> Do the opposite to isolate the variable
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Solve:</strong> x = ${this.currentAnswer}
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">4</span>
                        <strong>Check:</strong> Substitute back to verify your answer
                    </div>
                `;
            },
            
            "Two-Step Equations": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Undo addition/subtraction first:</strong> Get the term with the variable by itself
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Undo multiplication/division:</strong> Isolate the variable completely
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Simplify:</strong> x = ${this.currentAnswer}
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">4</span>
                        <strong>Verify:</strong> Check by substituting back into the original equation
                    </div>
                `;
            },
            
            "Systems of Equations": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Choose a method:</strong> Substitution, elimination, or graphing
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Solve for one variable:</strong> Use your chosen method
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Find the other variable:</strong> Substitute back to find the second value
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">4</span>
                        <strong>Solution:</strong> (x, y) = ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Polynomials": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Identify like terms:</strong> Terms with the same variable and exponent
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Combine coefficients:</strong> Add or subtract the numbers in front
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Simplified form:</strong> ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Factoring": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Find two numbers:</strong> That multiply to c and add to b (in x² + bx + c)
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Write factors:</strong> (x + m)(x + n)
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Verify:</strong> Multiply back to check
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">4</span>
                        <strong>Factored form:</strong> ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Trigonometry": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Identify the ratio:</strong> SOH-CAH-TOA (sin = opp/hyp, cos = adj/hyp, tan = opp/adj)
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Find the sides:</strong> Label opposite, adjacent, and hypotenuse
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Calculate the ratio:</strong> Divide the appropriate sides
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">4</span>
                        <strong>Result:</strong> ${this.formatAnswer(this.currentAnswer)}
                    </div>
                `;
            },
            
            "Logarithms": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Understand the relationship:</strong> log_a(x) = y means a^y = x
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Convert to exponential form:</strong> Rewrite as needed
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Solve:</strong> ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Derivatives": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Identify the function type:</strong> Polynomial, trig, exponential, etc.
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Apply derivative rules:</strong> Power rule, product rule, chain rule as needed
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Simplify:</strong> f'(x) = ${this.currentAnswer}
                    </div>
                `;
            },
            
            "Integrals": () => {
                return `
                    <div class="walkthrough-step">
                        <span class="step-number">1</span>
                        <strong>Identify the integrand:</strong> What function are we integrating?
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">2</span>
                        <strong>Apply integration rules:</strong> Power rule, u-substitution as needed
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">3</span>
                        <strong>Don't forget +C:</strong> Add the constant of integration
                    </div>
                    <div class="walkthrough-step">
                        <span class="step-number">4</span>
                        <strong>Answer:</strong> ${this.currentAnswer} + C
                    </div>
                `;
            }
        };
        
        // Return specific walkthrough or generic one
        const walkthroughFn = walkthroughs[concept.concept];
        return walkthroughFn ? walkthroughFn() : this.generateGenericWalkthrough();
    }
    
    generateGenericWalkthrough() {
        const concept = getConceptByName(this.currentTopic);
        const conceptName = concept ? concept.concept : this.currentTopic;
        const keyFormulas = concept ? concept.keyFormulas : '';
        const keyConcepts = concept ? concept.keyConcepts : '';
        const relatedOps = concept ? concept.relatedOperations : '';
        
        return `
            <div class="walkthrough-step">
                <span class="step-number">1</span>
                <strong>Understand the problem:</strong> ${this.currentProblem.display}
                ${keyConcepts ? `<p style="margin-top: 8px; color: var(--text-secondary);">This topic involves: ${keyConcepts}</p>` : ''}
            </div>
            <div class="walkthrough-step">
                <span class="step-number">2</span>
                <strong>Apply the concept:</strong> ${conceptName} - ${relatedOps || 'Use the rules and formulas for this topic'}
                ${keyFormulas ? `<p style="margin-top: 8px;"><strong>Formula:</strong> ${keyFormulas}</p>` : ''}
            </div>
            <div class="walkthrough-step">
                <span class="step-number">3</span>
                <strong>Work through the solution:</strong> Follow the steps systematically and check your work.
            </div>
            <div class="walkthrough-step">
                <span class="step-number">4</span>
                <strong>Final answer:</strong> <span style="font-size: 1.3rem; color: var(--accent);">${this.formatAnswer(this.currentAnswer)}</span>
            </div>
        `;
    }
    
    renderPractice(container) {
        this.generateProblem();
        
        container.innerHTML = `
            <div class="lesson-content">
                <h2>Practice Problem</h2>
                <div class="problem-display">${this.currentProblem.display}</div>
                <div class="answer-input">
                    <input type="text" id="answerInput" placeholder="Your answer" 
                           onkeypress="if(event.key==='Enter') app.checkAnswer()">
                    <button class="btn-submit" onclick="app.checkAnswer()">Submit</button>
                </div>
                <div id="feedback"></div>
            </div>
        `;
        
        setTimeout(() => document.getElementById('answerInput')?.focus(), 100);
    }
    
    // Helper methods for problem generation
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    randomFrom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    generateProblem() {
        if (!this.currentTopic) {
            // No topic selected, cannot generate problem
            this.currentProblem = { display: 'Please select a topic to practice.' };
            this.currentAnswer = null;
            return;
        }
        
        const concept = getConceptByName(this.currentTopic);
        if (!concept) {
            // Topic not found in data
            this.currentProblem = { display: 'Topic data not found. Please select another topic.' };
            this.currentAnswer = null;
            return;
        }
        
        const gradeNum = this.currentGrade === 'K' ? 0 : parseInt(this.currentGrade);
        const maxNum = Math.min(20 + gradeNum * 15, 200);
        
        const generators = {
            // ========== KINDERGARTEN TOPICS ==========
            "Counting and Cardinality": () => {
                const count = this.randomInt(1, 20);
                const emoji = this.randomFrom(['⭐', '🍎', '🎈', '🎯', '🌟']);
                return {
                    display: `How many ${emoji} are there?<br><div style="font-size: 2rem; margin: 20px 0;">${emoji.repeat(count)}</div>`,
                    answer: count
                };
            },
            
            "Number Recognition": () => {
                const num = this.randomInt(0, 20);
                const words = ['zero','one','two','three','four','five','six','seven','eight','nine','ten',
                              'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
                return {
                    display: `What number is this?<br><div style="font-size: 4rem; margin: 20px 0; font-weight: bold;">${num}</div>`,
                    answer: words[num],
                    numericAnswer: num
                };
            },
            
            "Basic Shapes": () => {
                const shapes = [
                    {name: 'circle', sides: 0},
                    {name: 'triangle', sides: 3},
                    {name: 'square', sides: 4},
                    {name: 'rectangle', sides: 4},
                    {name: 'pentagon', sides: 5},
                    {name: 'hexagon', sides: 6}
                ];
                const shape = this.randomFrom(shapes);
                return {
                    display: `How many sides does a ${shape.name} have?`,
                    answer: shape.sides
                };
            },
            
            "Measurement Comparison": () => {
                const a = this.randomInt(5, 20);
                const b = this.randomInt(5, 20);
                const unit = this.randomFrom(['inches', 'centimeters', 'feet']);
                if (a > b) {
                    return {
                        display: `Which is longer: ${a} ${unit} or ${b} ${unit}?`,
                        answer: a,
                        acceptedAnswers: [a, `${a}`, `${a} ${unit}`]
                    };
                } else {
                    return {
                        display: `Which is longer: ${a} ${unit} or ${b} ${unit}?`,
                        answer: b,
                        acceptedAnswers: [b, `${b}`, `${b} ${unit}`]
                    };
                }
            },
            
            "Patterns": () => {
                const patterns = [
                    {seq: [1,2,1,2,1], ans: 2},
                    {seq: ['🔴','🔵','🔴','🔵','🔴'], ans: '🔵'},
                    {seq: ['A','B','C','A','B'], ans: 'C'}
                ];
                const pattern = this.randomFrom(patterns);
                return {
                    display: `What comes next in the pattern?<br><div style="font-size: 1.5rem; margin: 15px 0;">${pattern.seq.join(' ')}, ?</div>`,
                    answer: pattern.ans
                };
            },
            
            "Ordinal Numbers": () => {
                const pos = this.randomInt(1, 10);
                const ordinals = ['','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'];
                return {
                    display: `What is the ordinal number for position ${pos}?`,
                    answer: ordinals[pos]
                };
            },
            
            "Simple Data Collection": () => {
                const colors = ['red', 'blue', 'green', 'yellow'];
                const color = this.randomFrom(colors);
                const count = this.randomInt(3, 8);
                return {
                    display: `If we sorted ${count} ${color} balls into a group, how many ${color} balls do we have?`,
                    answer: count
                };
            },
            
            // ========== GRADE 1 TOPICS ==========
            "Place Value": () => {
                const tens = this.randomInt(1, 9);
                const ones = this.randomInt(0, 9);
                const num = tens * 10 + ones;
                return {
                    display: `How many tens are in ${num}?`,
                    answer: tens
                };
            },
            
            "Two-Digit Addition": () => {
                const a = this.randomInt(10, 99);
                const b = this.randomInt(10, 99);
                return {
                    display: `${a} + ${b} = ?`,
                    answer: a + b
                };
            },
            
            "Two-Digit Subtraction": () => {
                const a = this.randomInt(20, 99);
                const b = this.randomInt(10, a);
                return {
                    display: `${a} - ${b} = ?`,
                    answer: a - b
                };
            },
            
            "Comparing Numbers": () => {
                const a = this.randomInt(1, 100);
                const b = this.randomInt(1, 100);
                const symbol = a > b ? '>' : a < b ? '<' : '=';
                return {
                    display: `${a} ___ ${b}<br><small>Enter >, <, or =</small>`,
                    answer: symbol
                };
            },
            
            "Telling Time": () => {
                const hour = this.randomInt(1, 12);
                const minute = this.randomFrom([0, 30]);
                const time = minute === 0 ? `${hour}:00` : `${hour}:30`;
                return {
                    display: `What time is shown: ${time}?<br><small>Answer like "1 o'clock" or "1 thirty"</small>`,
                    answer: minute === 0 ? `${hour} o'clock` : `${hour} thirty`,
                    acceptedAnswers: [time, `${hour}:${minute === 0 ? '00' : '30'}`, `${hour} o'clock`, `${hour} thirty`]
                };
            },
            
            "Measurement (Length)": () => {
                const length = this.randomInt(5, 20);
                const unit = this.randomFrom(['inches', 'feet', 'centimeters']);
                return {
                    display: `A pencil is ${length} ${unit} long. How many ${unit}?`,
                    answer: length
                };
            },
            
            "Basic Shapes and Attributes": () => {
                const shapes = [{name: 'triangle', vertices: 3}, {name: 'square', vertices: 4}, {name: 'rectangle', vertices: 4}];
                const shape = this.randomFrom(shapes);
                return {
                    display: `How many vertices (corners) does a ${shape.name} have?`,
                    answer: shape.vertices
                };
            },
            
            "Word Problems (Addition/Subtraction)": () => {
                const a = this.randomInt(5, 20);
                const b = this.randomInt(1, 15);
                const op = this.randomFrom(['+', '-']);
                if (op === '+') {
                    return {
                        display: `Sam has ${a} apples. He gets ${b} more. How many does he have now?`,
                        answer: a + b
                    };
                } else {
                    return {
                        display: `Sara has ${a} cookies. She eats ${b}. How many are left?`,
                        answer: a - b
                    };
                }
            },
            
            "Data Organization": () => {
                const count = this.randomInt(5, 15);
                return {
                    display: `If a bar graph shows ${count} students like pizza, how many students is that?`,
                    answer: count
                };
            },
            
            "Number Bonds": () => {
                const total = this.randomInt(5, 10);
                const part = this.randomInt(1, total - 1);
                return {
                    display: `${total} = ${part} + ?`,
                    answer: total - part
                };
            },
            
            "Fact Families": () => {
                const a = this.randomInt(2, 9);
                const b = this.randomInt(1, 9);
                const sum = a + b;
                return {
                    display: `If ${a} + ${b} = ${sum}, then ${sum} - ${a} = ?`,
                    answer: b
                };
            },
            
            // ========== GRADE 2 TOPICS ==========
            "Even and Odd Numbers": () => {
                const num = this.randomInt(1, 50);
                return {
                    display: `Is ${num} even or odd?`,
                    answer: num % 2 === 0 ? 'even' : 'odd'
                };
            },
            
            "Skip Counting": () => {
                const skip = this.randomFrom([2, 5, 10]);
                const start = skip;
                const seq = [start, start + skip, start + 2*skip];
                return {
                    display: `Skip count by ${skip}: ${seq.join(', ')}, ?`,
                    answer: start + 3*skip
                };
            },
            
            "Three-Digit Numbers": () => {
                const num = this.randomInt(100, 999);
                const hundreds = Math.floor(num / 100);
                return {
                    display: `How many hundreds are in ${num}?`,
                    answer: hundreds
                };
            },
            
            "Regrouping": () => {
                const a = this.randomInt(25, 99);
                const b = this.randomInt(15, 99);
                return {
                    display: `${a} + ${b} = ?<br><small>(You may need to regroup!)</small>`,
                    answer: a + b
                };
            },
            
            "Money": () => {
                const quarters = this.randomInt(1, 4);
                const dimes = this.randomInt(0, 5);
                const nickels = this.randomInt(0, 4);
                const cents = quarters * 25 + dimes * 10 + nickels * 5;
                return {
                    display: `${quarters} quarter(s), ${dimes} dime(s), ${nickels} nickel(s) = ? cents`,
                    answer: cents
                };
            },
            
            "Time to 5 Minutes": () => {
                const hour = this.randomInt(1, 12);
                const minute = this.randomInt(0, 11) * 5;
                return {
                    display: `What time is ${hour}:${minute.toString().padStart(2, '0')}?<br><small>Answer in minutes past the hour</small>`,
                    answer: minute,
                    acceptedAnswers: [minute, `${minute}`, `${hour}:${minute.toString().padStart(2, '0')}`]
                };
            },
            
            "Bar Graphs and Picture Graphs": () => {
                const count = this.randomInt(5, 20);
                return {
                    display: `A bar graph shows ${count} votes for pizza. How many votes?`,
                    answer: count
                };
            },
            
            "Measurement Units": () => {
                const feet = this.randomInt(1, 5);
                return {
                    display: `${feet} feet = ? inches`,
                    answer: feet * 12
                };
            },
            
            "Arrays (Introduction)": () => {
                const rows = this.randomInt(2, 5);
                const cols = this.randomInt(2, 5);
                return {
                    display: `An array has ${rows} rows and ${cols} columns. How many items total?`,
                    answer: rows * cols
                };
            },
            
            "Estimating Quantities": () => {
                const actual = this.randomInt(20, 50);
                const estimates = [
                    Math.floor(actual / 10) * 10,
                    Math.round(actual / 10) * 10,
                    Math.ceil(actual / 10) * 10
                ];
                return {
                    display: `Round ${actual} to the nearest 10`,
                    answer: Math.round(actual / 10) * 10
                };
            },
            // ========== CORE OPERATIONS ==========
            "Addition": () => {
                const a = Math.floor(Math.random() * maxNum) + 1;
                const b = Math.floor(Math.random() * maxNum) + 1;
                return {
                    a, b,
                    display: `${a} + ${b} = ?`,
                    answer: a + b
                };
            },
            
            "Subtraction": () => {
                const a = Math.floor(Math.random() * maxNum) + 1;
                const b = Math.floor(Math.random() * a) + 1;
                return {
                    a, b,
                    display: `${a} - ${b} = ?`,
                    answer: a - b
                };
            },
            
            "Multiplication": () => {
                const a = Math.floor(Math.random() * 12) + 1;
                const b = Math.floor(Math.random() * 12) + 1;
                return {
                    a, b,
                    display: `${a} × ${b} = ?`,
                    answer: a * b
                };
            },
            
            "Division": () => {
                const b = Math.floor(Math.random() * 12) + 1; // Ensures b is at least 1
                const answer = Math.floor(Math.random() * 12) + 1;
                const a = b * answer;
                
                // Safety check: prevent division by zero (should never happen with above logic)
                if (b === 0) {
                    console.error('❌ Division by zero prevented');
                    return this.generateProblem(); // Regenerate
                }
                
                return {
                    a, b,
                    display: `${a} ÷ ${b} = ?`,
                    answer: answer
                };
            },
            
            // ========== GRADE 3 TOPICS ==========
            "Area and Perimeter": () => {
                const length = this.randomInt(3, 15);
                const width = this.randomInt(2, 12);
                const which = this.randomFrom(['area', 'perimeter']);
                if (which === 'area') {
                    return {
                        display: `A rectangle is ${length} cm long and ${width} cm wide. What is the area?`,
                        answer: length * width
                    };
                } else {
                    return {
                        display: `A rectangle is ${length} cm long and ${width} cm wide. What is the perimeter?`,
                        answer: 2 * (length + width)
                    };
                }
            },
            
            "Telling Time to the Minute": () => {
                const hour = this.randomInt(1, 12);
                const minute = this.randomInt(0, 59);
                return {
                    display: `How many minutes after ${hour} o'clock is ${hour}:${minute.toString().padStart(2, '0')}?`,
                    answer: minute
                };
            },
            
            "Measurement Conversions": () => {
                const conversions = [
                    {q: 'feet to inches', mult: 12, unit: 'inches'},
                    {q: 'yards to feet', mult: 3, unit: 'feet'},
                    {q: 'meters to centimeters', mult: 100, unit: 'centimeters'}
                ];
                const conv = this.randomFrom(conversions);
                const val = this.randomInt(2, 10);
                return {
                    display: `${val} ${conv.q.split(' to ')[0]} = ? ${conv.unit}`,
                    answer: val * conv.mult
                };
            },
            
            "Rounding": () => {
                const num = this.randomInt(15, 95);
                const to = this.randomFrom([10, 100]);
                return {
                    display: `Round ${num} to the nearest ${to}`,
                    answer: Math.round(num / to) * to
                };
            },
            
            "Properties of Multiplication": () => {
                const a = this.randomInt(2, 9);
                const b = this.randomInt(2, 9);
                return {
                    display: `If ${a} × ${b} = ${a * b}, then ${b} × ${a} = ?<br><small>(Commutative Property)</small>`,
                    answer: a * b
                };
            },
            
            "Factors and Multiples (Basic)": () => {
                const num = this.randomInt(6, 24);
                const factors = [];
                for (let i = 1; i <= num; i++) {
                    if (num % i === 0) factors.push(i);
                }
                return {
                    display: `How many factors does ${num} have?`,
                    answer: factors.length
                };
            },
            
            "Data Interpretation": () => {
                const scale = this.randomFrom([2, 5, 10]);
                const bars = this.randomInt(3, 8);
                return {
                    display: `On a bar graph with scale ${scale}, a bar shows ${bars} units. What is the value?`,
                    answer: bars * scale
                };
            },
            
            // ========== GRADE 4 TOPICS ==========
            "Equivalent Fractions": () => {
                const num = this.randomInt(1, 6);
                const den = this.randomInt(num + 1, 12);
                const mult = this.randomInt(2, 4);
                return {
                    display: `${num}/${den} = ?/${den * mult}`,
                    answer: num * mult
                };
            },
            
            "Mixed Numbers": () => {
                const whole = this.randomInt(1, 5);
                const num = this.randomInt(1, 7);
                const den = this.randomInt(num + 1, 8);
                const improper = whole * den + num;
                return {
                    display: `Convert ${improper}/${den} to a mixed number. What is the whole number part?`,
                    answer: whole
                };
            },
            
            "Rounding and Estimation": () => {
                const a = this.randomInt(23, 87);
                const b = this.randomInt(15, 78);
                const rounded_a = Math.round(a / 10) * 10;
                const rounded_b = Math.round(b / 10) * 10;
                return {
                    display: `Estimate ${a} + ${b} by rounding to nearest 10`,
                    answer: rounded_a + rounded_b
                };
            },
            
            "Angle Measurement": () => {
                const angle = this.randomFrom([30, 45, 60, 90, 120, 135, 150, 180]);
                const type = angle < 90 ? 'acute' : angle === 90 ? 'right' : angle < 180 ? 'obtuse' : 'straight';
                return {
                    display: `A ${angle}° angle is what type?<br><small>(acute, right, obtuse, or straight)</small>`,
                    answer: type
                };
            },
            
            "Line Plots": () => {
                const values = [1, 2, 2, 3, 3, 3, 4, 4, 5];
                const mode = 3;
                return {
                    display: `On a line plot, which value appears most: 1(×1), 2(×2), 3(×3), 4(×2), 5(×1)?`,
                    answer: mode
                };
            },
            
            "Factors and Divisibility": () => {
                const nums = [12, 15, 18, 20, 24, 30];
                const num = this.randomFrom(nums);
                return {
                    display: `Is ${num} divisible by 3?<br><small>(yes or no)</small>`,
                    answer: num % 3 === 0 ? 'yes' : 'no'
                };
            },
            
            "Multiples and Least Common Multiple": () => {
                const a = this.randomFrom([2, 3, 4, 5, 6]);
                const b = this.randomFrom([2, 3, 4, 5, 6]);
                const lcm = (a * b) / this.gcd(a, b);
                return {
                    display: `What is the LCM of ${a} and ${b}?`,
                    answer: lcm
                };
            },
            
            "Greatest Common Factor": () => {
                const pairs = [[12, 18], [20, 30], [15, 25], [24, 36]];
                const pair = this.randomFrom(pairs);
                const gcd = this.gcd(pair[0], pair[1]);
                return {
                    display: `What is the GCF of ${pair[0]} and ${pair[1]}?`,
                    answer: gcd
                };
            },
            
            "Two-Dimensional Figures": () => {
                const figures = [
                    {name: 'square', sides: 4, angles: 4},
                    {name: 'rectangle', sides: 4, angles: 4},
                    {name: 'triangle', sides: 3, angles: 3},
                    {name: 'pentagon', sides: 5, angles: 5}
                ];
                const fig = this.randomFrom(figures);
                return {
                    display: `How many sides does a ${fig.name} have?`,
                    answer: fig.sides
                };
            },
            
            "Fractions": () => {
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 10) + 2;
                const gcd = this.gcd(a, b);
                return {
                    a, b,
                    display: `Simplify: ${a}/${b}`,
                    answer: `${a/gcd}/${b/gcd}`,
                    operation: 'simplify'
                };
            },
            
            "Decimals": () => {
                const a = (Math.random() * 10).toFixed(2);
                const b = (Math.random() * 10).toFixed(2);
                const result = (parseFloat(a) + parseFloat(b)).toFixed(2);
                return {
                    a, b,
                    display: `${a} + ${b} = ?`,
                    answer: result
                };
            },
            
            //========== GRADE 5 TOPICS ==========
            "Prime Numbers": () => {
                const nums = [7, 11, 13, 17, 19, 23, 29, 31, 37, 12, 15, 18, 21, 24, 27, 30];
                const num = this.randomFrom(nums);
                const isPrime = num > 1 && ![...Array(num).keys()].slice(2, num).some(i => num % i === 0);
                return {
                    display: `Is ${num} prime?<br><small>(yes or no)</small>`,
                    answer: isPrime ? 'yes' : 'no'
                };
            },
            
            "Order of Operations": () => {
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                const c = Math.floor(Math.random() * 10) + 1;
                const answer = a + b * c;
                return {
                    display: `${a} + ${b} × ${c} = ?`,
                    answer: answer
                };
            },
            
            "Fraction Addition and Subtraction": () => {
                const a = this.randomInt(1, 5);
                const b = this.randomInt(1, 5);
                const den = this.randomFrom([6, 8, 10, 12]);
                const sum = a + b;
                return {
                    display: `${a}/${den} + ${b}/${den} = ?/${den}`,
                    answer: sum
                };
            },
            
            "Fraction Multiplication and Division": () => {
                const a = this.randomInt(1, 6);
                const b = this.randomInt(2, 8);
                const c = this.randomInt(1, 6);
                const d = this.randomInt(2, 8);
                const result = (a * c) / (b * d);
                return {
                    display: `${a}/${b} × ${c}/${d} = ?<br><small>(Answer as decimal, rounded to 2 places)</small>`,
                    answer: parseFloat(result.toFixed(2))
                };
            },
            
            "Coordinate Graphing": () => {
                const x = this.randomInt(1, 10);
                const y = this.randomInt(1, 10);
                return {
                    display: `What is the y-coordinate of point (${x}, ${y})?`,
                    answer: y
                };
            },
            
            "Volume of Rectangular Prisms": () => {
                const l = this.randomInt(2, 10);
                const w = this.randomInt(2, 8);
                const h = this.randomInt(2, 6);
                return {
                    display: `Volume = ${l} × ${w} × ${h} = ?`,
                    answer: l * w * h
                };
            },
            
            "Measurement Conversion": () => {
                const convs = [{from: 'km', to: 'm', mult: 1000}, {from: 'kg', to: 'g', mult: 1000}, {from: 'L', to: 'mL', mult: 1000}];
                const conv = this.randomFrom(convs);
                const val = this.randomInt(1, 5);
                return {
                    display: `${val} ${conv.from} = ? ${conv.to}`,
                    answer: val * conv.mult
                };
            },
            
            "Decimal Operations": () => {
                const a = (Math.random() * 10).toFixed(1);
                const b = (Math.random() * 10).toFixed(1);
                const op = this.randomFrom(['+', '-', '×']);
                let answer;
                if (op === '+') answer = (parseFloat(a) + parseFloat(b)).toFixed(2);
                else if (op === '-') answer = (parseFloat(a) - parseFloat(b)).toFixed(2);
                else answer = (parseFloat(a) * parseFloat(b)).toFixed(2);
                return {
                    display: `${a} ${op} ${b} = ?`,
                    answer: parseFloat(answer)
                };
            },
            
            "Exponents (Introduction)": () => {
                const exp = this.randomInt(1, 4);
                return {
                    display: `10^${exp} = ?`,
                    answer: Math.pow(10, exp)
                };
            },
            
            "Expressions": () => {
                const x = this.randomInt(1, 10);
                const a = this.randomInt(2, 9);
                const b = this.randomInt(1, 15);
                return {
                    display: `Evaluate ${a}x + ${b} when x = ${x}`,
                    answer: a * x + b
                };
            },
            
            "Data and Graphs": () => {
                const values = [12, 15, 18, 22, 25];
                const range = Math.max(...values) - Math.min(...values);
                return {
                    display: `Data set: ${values.join(', ')}. What is the range?`,
                    answer: range
                };
            },
            
            // ========== GRADE 6 TOPICS ==========
            "Integers": () => {
                const a = Math.floor(Math.random() * 20) - 10;
                const b = Math.floor(Math.random() * 20) - 10;
                return {
                    a, b,
                    display: `${a} + (${b}) = ?`,
                    answer: a + b
                };
            },
            
            "Ratios and Proportions": () => {
                const a = this.randomInt(2, 9);
                const b = this.randomInt(2, 9);
                const mult = this.randomInt(2, 5);
                return {
                    display: `If ${a}:${b} = ?:${b * mult}, what is the missing value?`,
                    answer: a * mult
                };
            },
            
            "Percentages": () => {
                const percent = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)];
                const total = Math.floor(Math.random() * 100) + 10;
                const answer = (total * percent / 100);
                return {
                    percent, total,
                    display: `What is ${percent}% of ${total}?`,
                    answer: answer
                };
            },
            
            "Coordinate Plane": () => {
                const x = this.randomInt(-10, 10);
                const y = this.randomInt(-10, 10);
                const quadrant = x > 0 && y > 0 ? 'I' : x < 0 && y > 0 ? 'II' : x < 0 && y < 0 ? 'III' : 'IV';
                return {
                    display: `Point (${x}, ${y}) is in which quadrant?<br><small>(I, II, III, or IV)</small>`,
                    answer: quadrant
                };
            },
            
            "Absolute Value": () => {
                const num = this.randomInt(-20, 20);
                return {
                    display: `|${num}| = ?`,
                    answer: Math.abs(num)
                };
            },
            
            "Statistical Questions": () => {
                const data = [12, 15, 18, 20, 25];
                const mean = data.reduce((a, b) => a + b) / data.length;
                return {
                    display: `Mean of ${data.join(', ')} = ?`,
                    answer: mean
                };
            },
            
            "Rate and Unit Rate": () => {
                const distance = this.randomInt(100, 500);
                const time = this.randomFrom([2, 4, 5, 10]);
                return {
                    display: `${distance} miles in ${time} hours = ? miles per hour`,
                    answer: distance / time
                };
            },
            
            "Expressions and Variables": () => {
                const a = this.randomInt(2, 9);
                const b = this.randomInt(1, 15);
                const x = this.randomInt(1, 10);
                return {
                    display: `Evaluate ${a}x + ${b} when x = ${x}`,
                    answer: a * x + b
                };
            },
            
            "One-Step Equations": () => {
                const x = this.randomInt(1, 20);
                const a = this.randomInt(2, 10);
                const b = a * x;
                return {
                    display: `Solve: ${a}x = ${b}`,
                    answer: x
                };
            },
            
            "Area of Triangles and Polygons": () => {
                const base = this.randomInt(4, 20);
                const height = this.randomInt(3, 15);
                return {
                    display: `Triangle with base ${base} and height ${height}. Area = ?`,
                    answer: (base * height) / 2
                };
            },
            
            "Surface Area": () => {
                const l = this.randomInt(2, 8);
                const w = this.randomInt(2, 6);
                const h = this.randomInt(2, 5);
                const sa = 2 * (l * w + l * h + w * h);
                return {
                    display: `Rectangular prism: ${l}×${w}×${h}. Surface area = ?`,
                    answer: sa
                };
            },
            
            // ========== GRADE 7+ TOPICS ==========
            "Expressions and Equations": () => {
                const m = this.randomInt(2, 8);
                const b = this.randomInt(-10, 10);
                const x = this.randomInt(1, 5);
                const y = m * x + b;
                return {
                    display: `If y = ${m}x + ${b}, find y when x = ${x}`,
                    answer: y
                };
            },
            
            "Inequalities": () => {
                const x = this.randomInt(1, 20);
                const a = this.randomInt(1, 5);
                const b = a * x + this.randomInt(1, 10);
                return {
                    display: `Solve for x: ${a}x < ${b}`,
                    answer: `x < ${Math.floor(b/a)}`,
                    acceptedAnswers: [`x < ${Math.floor(b/a)}`, `x<${Math.floor(b/a)}`]
                };
            },
            
            "Area": () => {
                const r = this.randomInt(3, 10);
                const area = parseFloat((Math.PI * r * r).toFixed(2));
                return {
                    display: `Circle with radius ${r}. Area = ? (use π ≈ 3.14)`,
                    answer: area
                };
            },
            
            "Angles and Triangles": () => {
                const a = this.randomInt(30, 80);
                const b = this.randomInt(30, 80);
                const c = 180 - a - b;
                return {
                    display: `In a triangle, two angles are ${a}° and ${b}°. The third angle is ?°`,
                    answer: c
                };
            },
            
            "Circles": () => {
                const r = this.randomInt(3, 12);
                const circumference = parseFloat((2 * Math.PI * r).toFixed(2));
                return {
                    display: `Circle with radius ${r}. Circumference = ? (use π ≈ 3.14)`,
                    answer: circumference
                };
            },
            
            "Scale Drawings": () => {
                const scale = this.randomInt(2, 5);
                const actual = this.randomInt(10, 50);
                return {
                    display: `If 1 cm = ${scale} m, then ${actual} m = ? cm`,
                    answer: actual / scale
                };
            },
            
            "Probability Basics": () => {
                const favorable = this.randomInt(1, 5);
                const total = this.randomInt(favorable + 2, 12);
                const prob = parseFloat((favorable / total).toFixed(2));
                return {
                    display: `${favorable} favorable outcomes out of ${total} total. Probability = ? (as decimal)`,
                    answer: prob
                };
            },
            
            "Proportional Relationships": () => {
                const k = this.randomInt(2, 8);
                const x = this.randomInt(1, 10);
                return {
                    display: `If y = ${k}x, find y when x = ${x}`,
                    answer: k * x
                };
            },
            
            "Percent Applications": () => {
                const price = this.randomInt(20, 100);
                const discount = this.randomFrom([10, 15, 20, 25]);
                const savings = price * discount / 100;
                return {
                    display: `$${price} item with ${discount}% discount. How much do you save?`,
                    answer: savings
                };
            },
            
            "Two-Step Equations": () => {
                const x = this.randomInt(1, 15);
                const a = this.randomInt(2, 8);
                const b = this.randomInt(1, 10);
                const c = a * x + b;
                return {
                    display: `Solve: ${a}x + ${b} = ${c}`,
                    answer: x
                };
            },
            
            // Grade 8+
            "Volume": () => {
                const l = this.randomInt(2, 10);
                const w = this.randomInt(2, 8);
                const h = this.randomInt(2, 6);
                return {
                    display: `Volume of ${l} × ${w} × ${h} box = ?`,
                    answer: l * w * h
                };
            },
            
            "Pythagorean Theorem": () => {
                const triples = [[3,4,5], [5,12,13], [8,15,17], [7,24,25]];
                const triple = this.randomFrom(triples);
                return {
                    display: `Right triangle with legs ${triple[0]} and ${triple[1]}. Hypotenuse = ?`,
                    answer: triple[2]
                };
            },
            
            "Slope": () => {
                const x1 = this.randomInt(1, 5);
                const y1 = this.randomInt(1, 5);
                const x2 = this.randomInt(6, 10);
                const y2 = this.randomInt(6, 10);
                const slope = parseFloat(((y2 - y1) / (x2 - x1)).toFixed(2));
                return {
                    display: `Slope between (${x1},${y1}) and (${x2},${y2}) = ?`,
                    answer: slope
                };
            },
            
            "Exponents": () => {
                const base = this.randomInt(2, 6);
                const exp = this.randomInt(2, 4);
                return {
                    display: `${base}^${exp} = ?`,
                    answer: Math.pow(base, exp)
                };
            },
            
            "Systems of Equations": () => {
                const x = this.randomInt(1, 5);
                const y = this.randomInt(1, 5);
                const a = this.randomInt(2, 5);
                const sum = x + y;
                return {
                    display: `If x + y = ${sum} and x = ${x}, then y = ?`,
                    answer: y
                };
            },
            
            "Scientific Notation": () => {
                const coef = this.randomInt(1, 9) + Math.random().toFixed(1);
                const exp = this.randomInt(2, 6);
                const value = parseFloat(coef) * Math.pow(10, exp);
                return {
                    display: `${coef} × 10^${exp} = ?`,
                    answer: value
                };
            },
            
            "Transformations": () => {
                const x = this.randomInt(1, 8);
                const y = this.randomInt(1, 8);
                const dx = this.randomInt(1, 5);
                return {
                    display: `Point (${x},${y}) translated ${dx} units right. New x-coordinate = ?`,
                    answer: x + dx
                };
            },
            
            "Functions (Introduction)": () => {
                const a = this.randomInt(2, 8);
                const b = this.randomInt(-5, 5);
                const x = this.randomInt(1, 10);
                return {
                    display: `f(x) = ${a}x + ${b}. Find f(${x})`,
                    answer: a * x + b
                };
            },
            
            "Scatter Plots": () => {
                const correlation = this.randomFrom(['positive', 'negative', 'none']);
                return {
                    display: `Points trending upward from left to right show what correlation?`,
                    answer: 'positive'
                };
            },
            
            // Grade 9+
            "Polynomials": () => {
                const a = this.randomInt(1, 5);
                const b = this.randomInt(1, 10);
                const x = this.randomInt(1, 5);
                const result = a * x * x + b;
                return {
                    display: `Evaluate ${a}x² + ${b} when x = ${x}`,
                    answer: result
                };
            },
            
            "Quadratic Equations": () => {
                const solutions = [[1, 2], [2, 3], [1, 5], [-2, 3]];
                const sol = this.randomFrom(solutions);
                const b = -(sol[0] + sol[1]);
                const c = sol[0] * sol[1];
                return {
                    display: `x² + ${b}x + ${c} = 0. One solution is x = ${sol[0]}. The other is ?`,
                    answer: sol[1]
                };
            },
            
            "Functions": () => {
                const a = this.randomInt(2, 8);
                const x = this.randomInt(1, 10);
                return {
                    display: `f(x) = ${a}x². Find f(${x})`,
                    answer: a * x * x
                };
            },
            
            "Factoring": () => {
                const a = this.randomInt(2, 6);
                const b = this.randomInt(2, 6);
                const sum = a + b;
                const product = a * b;
                return {
                    display: `Factor x² + ${sum}x + ${product}. What are the two numbers? (enter smaller number)`,
                    answer: Math.min(a, b)
                };
            },
            
            "Radical Expressions": () => {
                const squares = [4, 9, 16, 25, 36, 49, 64, 81, 100];
                const num = this.randomFrom(squares);
                return {
                    display: `√${num} = ?`,
                    answer: Math.sqrt(num)
                };
            },
            
            "Rational Expressions": () => {
                const num = this.randomInt(2, 12);
                const den = this.randomInt(2, 12);
                const gcd = this.gcd(num, den);
                return {
                    display: `Simplify ${num}/${den}. Numerator after simplifying = ?`,
                    answer: num / gcd
                };
            },
            
            "Linear Systems (Methods)": () => {
                const x = this.randomInt(1, 8);
                const y = this.randomInt(1, 8);
                const a = this.randomInt(2, 5);
                const b = this.randomInt(2, 5);
                const c = a * x + b * y;
                return {
                    display: `${a}x + ${b}y = ${c}. If x = ${x}, then y = ?`,
                    answer: y
                };
            },
            
            "Absolute Value Equations": () => {
                const a = this.randomInt(3, 15);
                return {
                    display: `|x| = ${a}. What is the positive solution?`,
                    answer: a
                };
            },
            
            "Square Root Functions": () => {
                const x = this.randomFrom([4, 9, 16, 25, 36]);
                return {
                    display: `f(x) = √x. Find f(${x})`,
                    answer: Math.sqrt(x)
                };
            },
            
            "Exponential Growth and Decay": () => {
                const initial = this.randomInt(100, 1000);
                const rate = this.randomFrom([0.05, 0.1, 0.15]);
                const years = this.randomFrom([1, 2, 3]);
                const result = initial * Math.pow(1 + rate, years);
                return {
                    display: `$${initial} growing at ${rate * 100}% per year for ${years} years ≈ ?<br><small>(round to nearest dollar)</small>`,
                    answer: Math.round(result)
                };
            },
            
            // Grade 10+
            "Trigonometry": () => {
                const angles = [{angle: 30, sin: 0.5}, {angle: 45, sin: 0.707}, {angle: 60, sin: 0.866}];
                const a = this.randomFrom(angles);
                return {
                    display: `sin(${a.angle}°) ≈ ?<br><small>(round to 2 decimals)</small>`,
                    answer: a.sin
                };
            },
            
            "Probability": () => {
                const favorable = this.randomInt(1, 6);
                const total = this.randomInt(favorable + 3, 15);
                const prob = parseFloat((favorable / total).toFixed(3));
                return {
                    display: `P(A) = ${favorable}/${total}. As decimal = ?`,
                    answer: prob
                };
            },
            
            "Statistics": () => {
                const data = [10, 15, 20, 25, 30];
                const median = data[2];
                return {
                    display: `Data: ${data.join(', ')}. Median = ?`,
                    answer: median
                };
            },
            
            "Circles (Advanced)": () => {
                const r = this.randomInt(5, 15);
                const degrees = this.randomFrom([60, 90, 120, 180]);
                const arcLength = parseFloat((2 * Math.PI * r * degrees / 360).toFixed(2));
                return {
                    display: `Circle radius ${r}, arc of ${degrees}°. Arc length ≈ ? (π ≈ 3.14)`,
                    answer: arcLength
                };
            },
            
            "Combinations and Permutations": () => {
                const n = this.randomInt(4, 8);
                const r = 2;
                const nPr = n * (n - 1);
                return {
                    display: `How many ways to arrange ${r} items from ${n}? (Permutation, order matters)`,
                    answer: nPr
                };
            },
            
            "Systems of Inequalities": () => {
                const a = this.randomInt(5, 20);
                return {
                    display: `If x > ${a}, what is the smallest integer value of x?`,
                    answer: a + 1
                };
            },
            
            "Normal Distribution": () => {
                const mean = this.randomInt(50, 100);
                const value = mean + this.randomInt(0, 20);
                return {
                    display: `Mean = ${mean}. Is ${value} above or below the mean?`,
                    answer: value > mean ? 'above' : value < mean ? 'below' : 'equal'
                };
            },
            
            "Conditional Probability": () => {
                const pA = 0.5;
                const pB = 0.4;
                const pAandB = 0.2;
                const pAgivenB = pAandB / pB;
                return {
                    display: `P(A∩B) = 0.2, P(B) = 0.4. P(A|B) = ?`,
                    answer: pAgivenB
                };
            },
            
            "Expected Value": () => {
                const values = [10, 20, 30];
                const probs = [0.5, 0.3, 0.2];
                const ev = values.reduce((sum, val, i) => sum + val * probs[i], 0);
                return {
                    display: `Win $10 (50%), $20 (30%), or $30 (20%). Expected value = ?`,
                    answer: ev
                };
            },
            
            "Circle Geometry": () => {
                const inscribed = this.randomInt(30, 80);
                const central = inscribed * 2;
                return {
                    display: `Inscribed angle = ${inscribed}°. Central angle = ?°`,
                    answer: central
                };
            },
            
            // Grade 11+
            "Law of Sines": () => {
                const a = this.randomInt(5, 15);
                const A = 30;
                const B = 60;
                const b = parseFloat((a * Math.sin(B * Math.PI / 180) / Math.sin(A * Math.PI / 180)).toFixed(2));
                return {
                    display: `a/${Math.sin(A * Math.PI / 180).toFixed(3)} = b/${Math.sin(B * Math.PI / 180).toFixed(3)}. If a = ${a}, b ≈ ?`,
                    answer: b
                };
            },
            
            "Law of Cosines": () => {
                const a = 5;
                const b = 7;
                const C = 60;
                const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * Math.PI / 180));
                return {
                    display: `Triangle: a=5, b=7, C=60°. c ≈ ?<br><small>(round to 1 decimal)</small>`,
                    answer: parseFloat(c.toFixed(1))
                };
            },
            
            "Logarithms": () => {
                const base = this.randomFrom([2, 10]);
                const exponent = this.randomInt(2, 4);
                const value = Math.pow(base, exponent);
                return {
                    display: `log₁₀(${Math.pow(10, exponent)}) = ?`,
                    answer: exponent
                };
            },
            
            "Exponential Functions": () => {
                const a = this.randomInt(2, 10);
                const b = 2;
                const x = this.randomInt(1, 4);
                const y = a * Math.pow(b, x);
                return {
                    display: `y = ${a}(2)^x. Find y when x = ${x}`,
                    answer: y
                };
            },
            
            "Complex Numbers": () => {
                const a = this.randomInt(1, 5);
                const b = this.randomInt(1, 5);
                return {
                    display: `(${a} + 2i) + (3 + ${b}i). Real part = ?`,
                    answer: a + 3
                };
            },
            
            "Conic Sections": () => {
                const a = this.randomInt(2, 8);
                return {
                    display: `Equation x² + y² = ${a * a}. This is a circle with radius ?`,
                    answer: a
                };
            },
            
            "Sequences (Arithmetic/Geometric)": () => {
                const a1 = this.randomInt(2, 10);
                const d = this.randomInt(2, 5);
                const n = this.randomInt(5, 10);
                const an = a1 + (n - 1) * d;
                return {
                    display: `Arithmetic: a₁ = ${a1}, d = ${d}. Find a${n}`,
                    answer: an
                };
            },
            
            "Series and Summation": () => {
                const n = this.randomInt(5, 10);
                const sum = n * (n + 1) / 2;
                return {
                    display: `Sum of 1 + 2 + 3 + ... + ${n} = ?`,
                    answer: sum
                };
            },
            
            "Inverse Functions": () => {
                const a = this.randomInt(2, 8);
                const b = this.randomInt(1, 10);
                const y = this.randomInt(10, 50);
                const x = (y - b) / a;
                return {
                    display: `If f(x) = ${a}x + ${b}, find x when f(x) = ${y}`,
                    answer: x
                };
            },
            
            "Rational Exponents": () => {
                const base = this.randomFrom([4, 8, 16, 27]);
                const exp = base === 27 ? 1/3 : 1/2;
                const result = Math.pow(base, exp);
                return {
                    display: `${base}^(1/${exp === 1/2 ? 2 : 3}) = ?`,
                    answer: result
                };
            },
            
            "Polynomial Division": () => {
                const divisor = this.randomInt(2, 5);
                const quotient = this.randomInt(3, 10);
                const dividend = divisor * quotient;
                return {
                    display: `(${dividend}x) ÷ (${divisor}x) = ?`,
                    answer: quotient
                };
            },
            
            // Grade 12
            "Derivatives": () => {
                const a = this.randomInt(2, 10);
                const x = this.randomInt(1, 5);
                const derivative = 2 * a * x;
                return {
                    display: `If f(x) = ${a}x², then f'(${x}) = ?`,
                    answer: derivative
                };
            },
            
            "Integrals": () => {
                const a = this.randomInt(2, 8);
                return {
                    display: `∫${a}dx = ?<br><small>(ignore constant of integration, answer like "${a}x")</small>`,
                    answer: `${a}x`,
                    acceptedAnswers: [`${a}x`, `${a} x`]
                };
            },
            
            "Sequences and Series": () => {
                const n = this.randomInt(5, 15);
                const sum = n * (n + 1) / 2;
                return {
                    display: `Σ(i=1 to ${n}) i = ?`,
                    answer: sum
                };
            },
            
            "Matrices": () => {
                const a = this.randomInt(1, 5);
                const b = this.randomInt(1, 5);
                const c = this.randomInt(1, 5);
                const d = this.randomInt(1, 5);
                return {
                    display: `Add matrices: [${a} ${b}] + [${c} ${d}]. First element = ?`,
                    answer: a + c
                };
            },
            
            "Standard Deviation": () => {
                const data = [10, 20, 30];
                const mean = 20;
                return {
                    display: `Data: ${data.join(', ')}. Mean = ${mean}. What is the mean?`,
                    answer: mean
                };
            },
            
            "Limits": () => {
                const a = this.randomInt(2, 8);
                const x = this.randomInt(1, 5);
                const limit = a * x;
                return {
                    display: `lim(x→${x}) ${a}x = ?`,
                    answer: limit
                };
            },
            
            "Vectors": () => {
                const x1 = this.randomInt(1, 5);
                const y1 = this.randomInt(1, 5);
                const x2 = this.randomInt(1, 5);
                const y2 = this.randomInt(1, 5);
                return {
                    display: `⟨${x1},${y1}⟩ + ⟨${x2},${y2}⟩ = ⟨?,?⟩. First component = ?`,
                    answer: x1 + x2
                };
            },
            
            "Rational Functions": () => {
                const x = this.randomInt(1, 5);
                const a = this.randomInt(2, 10);
                const b = this.randomInt(1, 10);
                const result = parseFloat((a / (x + b)).toFixed(2));
                return {
                    display: `f(x) = ${a}/(x + ${b}). Find f(${x})`,
                    answer: result
                };
            },
            
            "Parametric Equations": () => {
                const t = this.randomInt(1, 5);
                const a = this.randomInt(2, 8);
                const x = a * t;
                return {
                    display: `x = ${a}t, y = t². When t = ${t}, x = ?`,
                    answer: x
                };
            },
            
            "Polar Coordinates": () => {
                const r = this.randomInt(3, 10);
                const theta = 90;
                return {
                    display: `Point (${r}, 90°) in polar. r = ?`,
                    answer: r
                };
            },
            
            "L'Hôpital's Rule": () => {
                const a = this.randomInt(2, 8);
                return {
                    display: `lim(x→0) ${a}x/x = ?`,
                    answer: a
                };
            },
            
            // ========== NEW 96 TOPICS GENERATORS ==========
            // KINDERGARTEN NEW TOPICS
            "Number Writing (0-20)": () => {
                const problemTypes = [
                    // Word to numeral
                    () => {
                        const num = this.randomInt(0, 20);
                        const words = ['zero','one','two','three','four','five','six','seven','eight','nine','ten',
                                      'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
                        return {
                            display: `Write the number for: <strong>${words[num]}</strong>`,
                            answer: num
                        };
                    },
                    // Visual counting
                    () => {
                        const count = this.randomInt(1, 20);
                        const emoji = this.randomFrom(['🍎', '⭐', '🎈', '🎯']);
                        return {
                            display: `Count and write the number:<br><div style="font-size: 1.5rem; margin: 10px 0;">${emoji.repeat(count)}</div>`,
                            answer: count
                        };
                    },
                    // Number sequence
                    () => {
                        const num = this.randomInt(1, 19);
                        return {
                            display: `What number comes after ${num}?`,
                            answer: num + 1
                        };
                    },
                    // Missing number
                    () => {
                        const num = this.randomInt(2, 18);
                        return {
                            display: `Fill in the blank: ${num - 1}, ${num}, ___, ${num + 2}`,
                            answer: num + 1
                        };
                    }
                ];
                return this.randomFrom(problemTypes)();
            },
            
            "More/Less/Equal": () => {
                const a = this.randomInt(1, 20);
                const b = this.randomInt(1, 20);
                const questions = [
                    {q: `Which has more: ${a} or ${b}?`, ans: Math.max(a, b)},
                    {q: `Which has less: ${a} or ${b}?`, ans: Math.min(a, b)},
                    {q: `${a} is ${a > b ? 'more' : a < b ? 'less' : 'equal'} than ${b}. True or false?`, ans: 'true'}
                ];
                const question = this.randomFrom(questions);
                return {
                    display: question.q,
                    answer: question.ans
                };
            },
            
            "Sorting and Classifying": () => {
                const categories = ['shapes', 'colors', 'sizes'];
                const category = this.randomFrom(categories);
                if (category === 'shapes') {
                    return {
                        display: `How many categories of shapes are there: circle, square, circle, triangle, square?`,
                        answer: 3
                    };
                } else if (category === 'colors') {
                    const colors = ['red', 'blue', 'green'];
                    const color = this.randomFrom(colors);
                    return {
                        display: `If we sort items by color (red, blue, green, red, blue), how many red items?`,
                        answer: 2
                    };
                } else {
                    return {
                        display: `We sort by size: big, small, big, big, small. How many big items?`,
                        answer: 3
                    };
                }
            },
            
            "Position Words": () => {
                const positions = ['above', 'below', 'beside', 'next to', 'in front of', 'behind'];
                const position = this.randomFrom(positions);
                return {
                    display: `If the cat is ${position} the box, where is the cat?`,
                    answer: position.replace(' of', ''),
                    acceptedAnswers: [position, position.replace(' of', ''), position.replace('next to', 'beside')]
                };
            },
            
            "Simple Addition Stories": () => {
                const a = this.randomInt(1, 5);
                const b = this.randomInt(1, 5 - a);
                return {
                    display: `Sam has ${a} apples. He gets ${b} more. How many apples does he have?`,
                    answer: a + b
                };
            },
            
            "Calendar Skills": () => {
                const types = [
                    () => {
                        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        const idx = this.randomInt(0, 6);
                        return {
                            display: `What day comes after ${days[idx]}?`,
                            answer: days[(idx + 1) % 7].toLowerCase()
                        };
                    },
                    () => {
                        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                                       'July', 'August', 'September', 'October', 'November', 'December'];
                        return {
                            display: `How many months are in a year?`,
                            answer: 12
                        };
                    },
                    () => {
                        return {
                            display: `How many days are in a week?`,
                            answer: 7
                        };
                    }
                ];
                return this.randomFrom(types)();
            },
            
            // GRADE 1 NEW TOPICS
            "Three-Addend Addition": () => {
                const a = this.randomInt(1, 10);
                const b = this.randomInt(1, 10);
                const c = this.randomInt(1, 10);
                return {
                    display: `${a} + ${b} + ${c} = ?`,
                    answer: a + b + c
                };
            },
            
            "Missing Addends": () => {
                const sum = this.randomInt(5, 15);
                const a = this.randomInt(1, sum - 1);
                return {
                    display: `${a} + ? = ${sum}`,
                    answer: sum - a
                };
            },
            
            "Number Line Operations": () => {
                const start = this.randomInt(1, 20);
                const jump = this.randomInt(1, 10);
                const op = this.randomFrom(['+', '-']);
                if (op === '+') {
                    return {
                        display: `On a number line, start at ${start} and jump ${jump} spaces forward. Where do you land?`,
                        answer: start + jump
                    };
                } else {
                    return {
                        display: `On a number line, start at ${start} and jump ${jump} spaces backward. Where do you land?`,
                        answer: start - jump
                    };
                }
            },
            
            "Coin Recognition": () => {
                const coins = [
                    {name: 'penny', value: 1, emoji: '🪙'},
                    {name: 'nickel', value: 5, emoji: '🪙'},
                    {name: 'dime', value: 10, emoji: '🪙'},
                    {name: 'quarter', value: 25, emoji: '🪙'}
                ];
                const coin = this.randomFrom(coins);
                return {
                    display: `How many cents is a ${coin.name} worth?`,
                    answer: coin.value
                };
            },
            
            "Half Hour Time": () => {
                const hour = this.randomInt(1, 12);
                return {
                    display: `What time is ${hour}:30?<br><small>Answer like "${hour}:30" or "half past ${hour}"</small>`,
                    answer: `${hour}:30`,
                    acceptedAnswers: [`${hour}:30`, `half past ${hour}`, `${hour} thirty`]
                };
            },
            
            "Equal Parts": () => {
                const types = [
                    {shape: 'circle', parts: 2, name: 'halves'},
                    {shape: 'rectangle', parts: 2, name: 'halves'},
                    {shape: 'square', parts: 4, name: 'fourths'},
                    {shape: 'pizza', parts: 4, name: 'fourths'}
                ];
                const type = this.randomFrom(types);
                return {
                    display: `A ${type.shape} is divided into ${type.name}. How many equal parts?`,
                    answer: type.parts
                };
            },
            
            "Tally Marks": () => {
                const count = this.randomInt(5, 25);
                const fives = Math.floor(count / 5);
                const ones = count % 5;
                const tally = '𝍸 '.repeat(fives) + '| '.repeat(ones);
                return {
                    display: `Count the tally marks: ${tally}<br>How many total?`,
                    answer: count
                };
            },
            
            "Greater Than/Less Than Symbols": () => {
                const a = this.randomInt(1, 50);
                const b = this.randomInt(1, 50);
                const symbol = a > b ? '>' : a < b ? '<' : '=';
                return {
                    display: `${a} ___ ${b}<br><small>What symbol goes in the blank? (>, <, or =)</small>`,
                    answer: symbol
                };
            },
            
            // GRADE 2 NEW TOPICS
            "Place Value (Hundreds)": () => {
                const num = this.randomInt(100, 999);
                const questions = [
                    {q: 'hundreds', ans: Math.floor(num / 100)},
                    {q: 'tens', ans: Math.floor((num % 100) / 10)},
                    {q: 'ones', ans: num % 10}
                ];
                const question = this.randomFrom(questions);
                return {
                    display: `In the number ${num}, what digit is in the ${question.q} place?`,
                    answer: question.ans
                };
            },
            
            "Mental Math Strategies": () => {
                const strategies = [
                    () => {
                        const num = this.randomInt(10, 90);
                        return {
                            display: `${num} + 10 = ?<br><small>(Add mentally!)</small>`,
                            answer: num + 10
                        };
                    },
                    () => {
                        const num = this.randomInt(20, 99);
                        return {
                            display: `${num} - 10 = ?<br><small>(Subtract mentally!)</small>`,
                            answer: num - 10
                        };
                    },
                    () => {
                        const num = this.randomInt(100, 500);
                        return {
                            display: `${num} + 100 = ?<br><small>(Add mentally!)</small>`,
                            answer: num + 100
                        };
                    }
                ];
                return this.randomFrom(strategies)();
            },
            
            "Measurement (Inches/Centimeters)": () => {
                const length = this.randomInt(1, 12);
                const unit = this.randomFrom(['inches', 'centimeters']);
                return {
                    display: `A pencil measures ${length} ${unit}. How many ${unit}?`,
                    answer: length
                };
            },
            
            "Repeated Addition": () => {
                const addend = this.randomInt(2, 10);
                const times = this.randomInt(2, 5);
                return {
                    display: `${addend} + ${addend}` + ` + ${addend}`.repeat(times - 2) + ` = ?<br><small>(This is repeated addition!)</small>`,
                    answer: addend * times
                };
            },
            
            "Equal Groups": () => {
                const total = this.randomInt(6, 24);
                const groups = this.randomFrom([2, 3, 4, 6]);
                if (total % groups === 0) {
                    return {
                        display: `${total} items divided into ${groups} equal groups. How many in each group?`,
                        answer: total / groups
                    };
                } else {
                    const newTotal = Math.floor(total / groups) * groups;
                    return {
                        display: `${newTotal} items divided into ${groups} equal groups. How many in each group?`,
                        answer: newTotal / groups
                    };
                }
            },
            
            "Shapes (2D Properties)": () => {
                const shapes = [
                    {name: 'triangle', sides: 3, vertices: 3},
                    {name: 'square', sides: 4, vertices: 4},
                    {name: 'rectangle', sides: 4, vertices: 4},
                    {name: 'pentagon', sides: 5, vertices: 5},
                    {name: 'hexagon', sides: 6, vertices: 6}
                ];
                const shape = this.randomFrom(shapes);
                const question = this.randomFrom(['sides', 'vertices']);
                return {
                    display: `How many ${question} does a ${shape.name} have?`,
                    answer: question === 'sides' ? shape.sides : shape.vertices
                };
            },
            
            "Line Plots (Simple)": () => {
                const values = [2, 3, 3, 4, 4, 4, 5, 5];
                const mode = 4;
                return {
                    display: `Data: 2, 3, 3, 4, 4, 4, 5, 5. Which value appears most?`,
                    answer: mode
                };
            },
            
            "Counting Money": () => {
                const quarters = this.randomInt(0, 3);
                const dimes = this.randomInt(0, 4);
                const nickels = this.randomInt(0, 3);
                const pennies = this.randomInt(0, 4);
                const total = quarters * 25 + dimes * 10 + nickels * 5 + pennies;
                return {
                    display: `${quarters} quarter(s), ${dimes} dime(s), ${nickels} nickel(s), ${pennies} penn${pennies === 1 ? 'y' : 'ies'} = ? cents`,
                    answer: total
                };
            },
            
            "Quarter Hours": () => {
                const hour = this.randomInt(1, 12);
                const minute = this.randomFrom([0, 15, 30, 45]);
                return {
                    display: `What time is ${hour}:${minute.toString().padStart(2, '0')}?<br><small>Answer as minutes (e.g., 15, 30, 45)</small>`,
                    answer: minute
                };
            },
            
            "Number Patterns (100s chart)": () => {
                const start = this.randomInt(1, 80);
                const pattern = this.randomFrom([1, 10, 2, 5]);
                return {
                    display: `Pattern: ${start}, ${start + pattern}, ${start + 2*pattern}, ?<br><small>What comes next?</small>`,
                    answer: start + 3*pattern
                };
            },
            
            // GRADE 3 NEW TOPICS
            "Multiplication Tables (Focus)": () => {
                const a = this.randomInt(0, 12);
                const b = this.randomInt(0, 12);
                return {
                    display: `${a} × ${b} = ?`,
                    answer: a * b
                };
            },
            
            "Division with Remainders": () => {
                const divisor = this.randomInt(2, 9);
                const quotient = this.randomInt(2, 10);
                const remainder = this.randomInt(1, divisor - 1);
                const dividend = divisor * quotient + remainder;
                return {
                    display: `${dividend} ÷ ${divisor} = ? R ?<br><small>Enter just the remainder</small>`,
                    answer: remainder
                };
            },
            
            "Fraction Comparison": () => {
                const fractions = [
                    {a: 1, b: 2, c: 1, d: 3, larger: '1/2'},
                    {a: 1, b: 4, c: 1, d: 2, larger: '1/2'},
                    {a: 2, b: 3, c: 1, d: 3, larger: '2/3'},
                    {a: 3, b: 4, c: 1, d: 4, larger: '3/4'}
                ];
                const f = this.randomFrom(fractions);
                return {
                    display: `Which is larger: ${f.a}/${f.b} or ${f.c}/${f.d}?<br><small>Answer like "1/2"</small>`,
                    answer: f.larger
                };
            },
            
            "Unit Fractions": () => {
                const denominator = this.randomInt(2, 10);
                return {
                    display: `A whole is divided into ${denominator} equal parts. What is one part?<br><small>Answer like "1/2"</small>`,
                    answer: `1/${denominator}`
                };
            },
            
            "Liquid Measurement": () => {
                const conversions = [
                    {from: 'cups', to: 'pint', mult: 2, q: 'cups in a pint'},
                    {from: 'pints', to: 'quart', mult: 2, q: 'pints in a quart'},
                    {from: 'quarts', to: 'gallon', mult: 4, q: 'quarts in a gallon'}
                ];
                const conv = this.randomFrom(conversions);
                return {
                    display: `How many ${conv.from} are in one ${conv.to}?`,
                    answer: conv.mult
                };
            },
            
            "Weight Measurement": () => {
                const conversions = [
                    {q: 'ounces in a pound', ans: 16},
                    {q: 'grams in a kilogram', ans: 1000},
                    {q: 'pounds in a ton', ans: 2000}
                ];
                const conv = this.randomFrom(conversions);
                return {
                    display: `How many ${conv.q}?`,
                    answer: conv.ans
                };
            },
            
            "Perimeter of Polygons": () => {
                const sides = this.randomInt(3, 6);
                const length = this.randomInt(3, 12);
                return {
                    display: `A regular ${sides}-sided polygon has sides of ${length} units. Perimeter = ?`,
                    answer: sides * length
                };
            },
            
            "Scaled Picture Graphs": () => {
                const scale = this.randomFrom([2, 5, 10]);
                const symbols = this.randomInt(2, 8);
                return {
                    display: `On a picture graph, each symbol = ${scale} items. There are ${symbols} symbols. Total items = ?`,
                    answer: scale * symbols
                };
            },
            
            "Scaled Bar Graphs": () => {
                const scale = this.randomFrom([2, 5, 10]);
                const bars = this.randomInt(3, 10);
                return {
                    display: `On a bar graph with scale ${scale}, a bar reaches ${bars} marks. Value = ?`,
                    answer: scale * bars
                };
            },
            
            "Frequency Tables": () => {
                const data = {red: 5, blue: 8, green: 3};
                return {
                    display: `Frequency: Red=5, Blue=8, Green=3. Which color appears most?`,
                    answer: 'blue'
                };
            },
            
            "Elapsed Time": () => {
                const start = this.randomInt(1, 10);
                const duration = this.randomInt(1, 5);
                return {
                    display: `Movie starts at ${start}:00 and lasts ${duration} hour(s). What time does it end?`,
                    answer: start + duration
                };
            },
            
            "Temperature": () => {
                const temp = this.randomInt(32, 100);
                return {
                    display: `The thermometer reads ${temp}°F. What is the temperature?`,
                    answer: temp
                };
            },
            
            // GRADE 4 NEW TOPICS
            "Multi-Digit Multiplication": () => {
                const a = this.randomInt(11, 99);
                const b = this.randomInt(11, 99);
                return {
                    display: `${a} × ${b} = ?`,
                    answer: a * b
                };
            },
            
            "Long Division": () => {
                const divisor = this.randomInt(11, 25);
                const quotient = this.randomInt(3, 15);
                const dividend = divisor * quotient;
                return {
                    display: `${dividend} ÷ ${divisor} = ?`,
                    answer: quotient
                };
            },
            
            "Fraction Ordering": () => {
                return {
                    display: `Order from smallest to largest: 1/2, 1/4, 3/4<br><small>Which is smallest?</small>`,
                    answer: '1/4'
                };
            },
            
            "Fraction Models": () => {
                const num = this.randomInt(1, 7);
                const den = this.randomInt(num + 1, 10);
                return {
                    display: `On a number line from 0 to 1, where does ${num}/${den} fall?<br><small>Closer to 0, 1/2, or 1?</small>`,
                    answer: num / den < 0.35 ? '0' : num / den > 0.65 ? '1' : '1/2'
                };
            },
            
            "Decimal Place Value": () => {
                const whole = this.randomInt(1, 50);
                const tenths = this.randomInt(0, 9);
                const hundredths = this.randomInt(0, 9);
                const num = `${whole}.${tenths}${hundredths}`;
                const question = this.randomFrom(['tenths', 'hundredths']);
                return {
                    display: `In ${num}, what digit is in the ${question} place?`,
                    answer: question === 'tenths' ? tenths : hundredths
                };
            },
            
            "Decimal Comparison": () => {
                const a = (Math.random() * 10).toFixed(2);
                const b = (Math.random() * 10).toFixed(2);
                const symbol = parseFloat(a) > parseFloat(b) ? '>' : parseFloat(a) < parseFloat(b) ? '<' : '=';
                return {
                    display: `${a} ___ ${b}<br><small>What symbol? (>, <, =)</small>`,
                    answer: symbol
                };
            },
            
            "Protractor Use": () => {
                const angle = this.randomFrom([30, 45, 60, 90, 120, 135, 150]);
                return {
                    display: `An angle measures ${angle}°. What is the measurement?`,
                    answer: angle
                };
            },
            
            "Symmetry": () => {
                const shapes = [
                    {name: 'square', lines: 4},
                    {name: 'rectangle', lines: 2},
                    {name: 'equilateral triangle', lines: 3},
                    {name: 'circle', lines: 'infinite'}
                ];
                const shape = this.randomFrom(shapes.filter(s => typeof s.lines === 'number'));
                return {
                    display: `How many lines of symmetry does a ${shape.name} have?`,
                    answer: shape.lines
                };
            },
            
            "Classifying Triangles": () => {
                const triangles = [
                    {angles: '60°, 60°, 60°', type: 'equilateral'},
                    {angles: '90°, 45°, 45°', type: 'right'},
                    {angles: '100°, 40°, 40°', type: 'obtuse'},
                    {angles: '70°, 60°, 50°', type: 'acute'}
                ];
                const tri = this.randomFrom(triangles);
                return {
                    display: `Triangle with angles ${tri.angles}. What type?<br><small>(acute, right, obtuse, or equilateral)</small>`,
                    answer: tri.type
                };
            },
            
            "Coordinate Grids (First Quadrant)": () => {
                const x = this.randomInt(1, 10);
                const y = this.randomInt(1, 10);
                const question = this.randomFrom(['x', 'y']);
                return {
                    display: `Point (${x}, ${y}). What is the ${question}-coordinate?`,
                    answer: question === 'x' ? x : y
                };
            },
            
            // GRADE 5 NEW TOPICS
            "Division of Decimals": () => {
                const dividend = (Math.random() * 50 + 10).toFixed(1);
                const divisor = this.randomFrom([2, 5, 10]);
                const answer = (parseFloat(dividend) / divisor).toFixed(2);
                return {
                    display: `${dividend} ÷ ${divisor} = ?`,
                    answer: parseFloat(answer)
                };
            },
            
            "Powers of 10": () => {
                const num = Math.random() * 100;
                const power = this.randomFrom([10, 100, 1000]);
                const op = this.randomFrom(['×', '÷']);
                if (op === '×') {
                    return {
                        display: `${num.toFixed(2)} × ${power} = ?`,
                        answer: parseFloat((num * power).toFixed(2))
                    };
                } else {
                    return {
                        display: `${num.toFixed(2)} ÷ ${power} = ?`,
                        answer: parseFloat((num / power).toFixed(4))
                    };
                }
            },
            
            "Fraction to Decimal Conversion": () => {
                const fractions = [{n: 1, d: 2, dec: 0.5}, {n: 1, d: 4, dec: 0.25}, {n: 3, d: 4, dec: 0.75}, {n: 1, d: 5, dec: 0.2}];
                const frac = this.randomFrom(fractions);
                return {
                    display: `Convert ${frac.n}/${frac.d} to a decimal`,
                    answer: frac.dec
                };
            },
            
            "Percentage Basics": () => {
                const percent = this.randomInt(1, 100);
                return {
                    display: `${percent}% means ${percent} out of how many?`,
                    answer: 100
                };
            },
            
            "Three-Dimensional Figures": () => {
                const figures = ['prism', 'pyramid', 'cylinder', 'cone', 'sphere'];
                const figure = this.randomFrom(figures);
                const bases = {prism: 2, pyramid: 1, cylinder: 2, cone: 1, sphere: 0};
                return {
                    display: `How many bases does a ${figure} have?`,
                    answer: bases[figure]
                };
            },
            
            "Cubic Units": () => {
                const side = this.randomInt(2, 5);
                return {
                    display: `A cube has sides of ${side} units. Volume = ? cubic units`,
                    answer: side * side * side
                };
            },
            
            "Order of Operations (PEMDAS)": () => {
                const a = this.randomInt(2, 8);
                const b = this.randomInt(2, 8);
                const c = this.randomInt(1, 5);
                return {
                    display: `${a} + ${b} × ${c} = ?<br><small>(Remember PEMDAS!)</small>`,
                    answer: a + (b * c)
                };
            },
            
            "Numerical Patterns": () => {
                const start = this.randomInt(2, 10);
                const rule = this.randomFrom([2, 3, 5]);
                return {
                    display: `Pattern: ${start}, ${start * rule}, ${start * rule * rule}. What's the rule?<br><small>(multiply by ?)</small>`,
                    answer: rule
                };
            },
            
            "Mean (Average)": () => {
                const data = [this.randomInt(10, 30), this.randomInt(10, 30), this.randomInt(10, 30), this.randomInt(10, 30)];
                
                // Safety check: ensure we have data
                if (data.length === 0) {
                    console.error('❌ Empty data array prevented');
                    return this.generateProblem(); // Regenerate
                }
                
                const mean = data.reduce((a, b) => a + b) / data.length;
                return {
                    display: `Data: ${data.join(', ')}. Mean = ?`,
                    answer: parseFloat(mean.toFixed(1))
                };
            },
            
            "Line Graphs": () => {
                const values = [10, 15, 12, 18, 20];
                return {
                    display: `Line graph shows: Day 1: 10, Day 2: 15, Day 3: 12, Day 4: 18, Day 5: 20. Highest value?`,
                    answer: 20
                };
            },
            
            // GRADE 6 NEW TOPICS
            "Dividing Fractions": () => {
                const a = this.randomInt(1, 4);
                const b = this.randomInt(2, 6);
                const c = this.randomInt(1, 4);
                const d = this.randomInt(2, 6);
                
                // Safety check: prevent division by zero
                if (b === 0 || c === 0 || d === 0) {
                    console.error('❌ Division by zero prevented in Dividing Fractions generator');
                    return this.generateProblem(); // Regenerate
                }
                
                const result = (a / b) / (c / d);
                return {
                    display: `${a}/${b} ÷ ${c}/${d} = ?<br><small>(Answer as decimal)</small>`,
                    answer: parseFloat(result.toFixed(2))
                };
            },
            
            "Negative Numbers": () => {
                const num = this.randomInt(-20, 20);
                return {
                    display: `On a number line, where is ${num}?<br><small>(left of 0, right of 0, or at 0)</small>`,
                    answer: num < 0 ? 'left' : num > 0 ? 'right' : 'at',
                    acceptedAnswers: [num < 0 ? 'left' : num > 0 ? 'right' : 'at', num < 0 ? 'left of 0' : num > 0 ? 'right of 0' : 'at 0']
                };
            },
            
            "Operations with Integers": () => {
                const a = this.randomInt(-10, 10);
                const b = this.randomInt(-10, 10);
                const op = this.randomFrom(['+', '-', '×']);
                let answer;
                if (op === '+') answer = a + b;
                else if (op === '-') answer = a - b;
                else answer = a * b;
                return {
                    display: `${a} ${op} ${b} = ?`,
                    answer: answer
                };
            },
            
            "GCF Applications": () => {
                const pairs = [[12, 18], [20, 30], [15, 25], [24, 36]];
                const pair = this.randomFrom(pairs);
                const gcd = this.gcd(pair[0], pair[1]);
                const simplified_num = pair[0] / gcd;
                const simplified_den = pair[1] / gcd;
                return {
                    display: `Simplify ${pair[0]}/${pair[1]} using GCF. Numerator after simplifying?`,
                    answer: simplified_num
                };
            },
            
            "LCM Applications": () => {
                const pairs = [[2, 3], [3, 4], [4, 6], [2, 5]];
                const pair = this.randomFrom(pairs);
                const lcm = (pair[0] * pair[1]) / this.gcd(pair[0], pair[1]);
                return {
                    display: `To add 1/${pair[0]} + 1/${pair[1]}, find LCM of denominators. LCM = ?`,
                    answer: lcm
                };
            },
            
            "Ratio Tables": () => {
                const a = this.randomInt(2, 8);
                const b = this.randomInt(2, 8);
                const mult = this.randomInt(2, 5);
                return {
                    display: `Ratio table: ${a}:${b} = ${a * mult}:?`,
                    answer: b * mult
                };
            },
            
            "Double Number Lines": () => {
                const rate = this.randomInt(2, 10);
                const quantity = this.randomInt(3, 8);
                return {
                    display: `If 1 unit costs $${rate}, then ${quantity} units cost $?`,
                    answer: rate * quantity
                };
            },
            
            "Percent of a Number": () => {
                const percent = this.randomFrom([10, 20, 25, 50]);
                const number = this.randomInt(20, 100);
                return {
                    display: `${percent}% of ${number} = ?`,
                    answer: (percent / 100) * number
                };
            },
            
            "Box Plots": () => {
                return {
                    display: `Box plot shows: Min=10, Q1=15, Median=20, Q3=25, Max=30. What is the median?`,
                    answer: 20
                };
            },
            
            "Histograms": () => {
                return {
                    display: `Histogram: 0-10 (5 people), 10-20 (8 people), 20-30 (3 people). Which interval has most?`,
                    answer: '10-20',
                    acceptedAnswers: ['10-20', '10 to 20', '10-20']
                };
            },
            
            "Median and Mode": () => {
                const data = [5, 7, 7, 9, 12];
                return {
                    display: `Data: ${data.join(', ')}. What is the mode?`,
                    answer: 7
                };
            },
            
            "Interquartile Range (IQR)": () => {
                const q1 = this.randomInt(10, 30);
                const q3 = q1 + this.randomInt(10, 30);
                return {
                    display: `Q1 = ${q1}, Q3 = ${q3}. IQR = ?`,
                    answer: q3 - q1
                };
            },
            
            // GRADE 7-8 NEW TOPICS
            "Multi-Step Equations": () => {
                const x = this.randomInt(1, 10);
                const a = this.randomInt(2, 5);
                const b = this.randomInt(1, 10);
                const c = this.randomInt(1, 10);
                const result = a * x + b - c;
                return {
                    display: `Solve: ${a}x + ${b} - ${c} = ${result}`,
                    answer: x
                };
            },
            
            "Combining Like Terms": () => {
                const a = this.randomInt(2, 8);
                const b = this.randomInt(2, 8);
                return {
                    display: `Simplify: ${a}x + ${b}x<br><small>Coefficient of x?</small>`,
                    answer: a + b
                };
            },
            
            "Distributive Property": () => {
                const a = this.randomInt(2, 8);
                const b = this.randomInt(2, 8);
                const c = this.randomInt(2, 8);
                return {
                    display: `Expand: ${a}(${b} + ${c})<br><small>What is the result?</small>`,
                    answer: a * (b + c)
                };
            },
            
            "Simple Interest": () => {
                const p = this.randomInt(100, 1000);
                const r = this.randomFrom([0.05, 0.10, 0.15]);
                const t = this.randomInt(1, 5);
                const interest = p * r * t;
                return {
                    display: `P = $${p}, R = ${r * 100}%, T = ${t} years. Simple Interest = ?`,
                    answer: parseFloat(interest.toFixed(2))
                };
            },
            
            "Percent Change": () => {
                const old_val = this.randomInt(50, 200);
                const new_val = old_val + this.randomInt(10, 50);
                const change = ((new_val - old_val) / old_val) * 100;
                return {
                    display: `Price changed from $${old_val} to $${new_val}. Percent increase?<br><small>(Round to nearest whole %)</small>`,
                    answer: Math.round(change)
                };
            },
            
            "Complementary and Supplementary Angles": () => {
                const type = this.randomFrom(['complementary', 'supplementary']);
                const angle = type === 'complementary' ? this.randomInt(20, 70) : this.randomInt(40, 140);
                const complement = type === 'complementary' ? 90 - angle : 180 - angle;
                return {
                    display: `Two angles are ${type}. One is ${angle}°. The other is ?°`,
                    answer: complement
                };
            },
            
            "Volume of Cylinders": () => {
                const r = this.randomInt(2, 8);
                const h = this.randomInt(3, 10);
                const volume = Math.PI * r * r * h;
                return {
                    display: `Cylinder: radius = ${r}, height = ${h}. Volume ≈ ?<br><small>(Use π ≈ 3.14, round to nearest whole)</small>`,
                    answer: Math.round(volume)
                };
            },
            
            "Sample Space": () => {
                const coins = this.randomInt(1, 3);
                const outcomes = Math.pow(2, coins);
                return {
                    display: `Flipping ${coins} coin(s). How many possible outcomes?`,
                    answer: outcomes
                };
            },
            
            "Simultaneous Equations (Graphing)": () => {
                const x = this.randomInt(1, 5);
                const y = this.randomInt(1, 5);
                return {
                    display: `Two lines intersect at (${x}, ${y}). What is the x-coordinate of the solution?`,
                    answer: x
                };
            },
            
            "Distance Formula": () => {
                const x1 = this.randomInt(0, 5);
                const y1 = this.randomInt(0, 5);
                const x2 = x1 + this.randomInt(3, 5);
                const y2 = y1 + this.randomInt(3, 5);
                const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                return {
                    display: `Distance between (${x1},${y1}) and (${x2},${y2}) ≈ ?<br><small>(Round to 1 decimal)</small>`,
                    answer: parseFloat(distance.toFixed(1))
                };
            },
            
            "Volume of Cones and Spheres": () => {
                const type = this.randomFrom(['cone', 'sphere']);
                const r = this.randomInt(3, 8);
                if (type === 'cone') {
                    const h = this.randomInt(5, 12);
                    const volume = (1/3) * Math.PI * r * r * h;
                    return {
                        display: `Cone: r = ${r}, h = ${h}. Volume ≈ ?<br><small>(Use π ≈ 3.14, round to nearest whole)</small>`,
                        answer: Math.round(volume)
                    };
                } else {
                    const volume = (4/3) * Math.PI * r * r * r;
                    return {
                        display: `Sphere: r = ${r}. Volume ≈ ?<br><small>(Use π ≈ 3.14, round to nearest whole)</small>`,
                        answer: Math.round(volume)
                    };
                }
            },
            
            "Bivariate Data": () => {
                return {
                    display: `Scatter plot shows points trending upward. What type of correlation?`,
                    answer: 'positive'
                };
            },
            
            "Linear vs Non-Linear Functions": () => {
                const types = [
                    {desc: 'y = 2x + 3', type: 'linear'},
                    {desc: 'y = x²', type: 'non-linear'},
                    {desc: 'y = 5x - 1', type: 'linear'},
                    {desc: 'y = 3x² + 2', type: 'non-linear'}
                ];
                const func = this.randomFrom(types);
                return {
                    display: `${func.desc} is what type of function?`,
                    answer: func.type,
                    acceptedAnswers: [func.type, func.type.replace('-', ' '), func.type === 'non-linear' ? 'nonlinear' : 'linear']
                };
            },
            
            "Roots and Radicals": () => {
                const cubes = [8, 27, 64, 125];
                const num = this.randomFrom(cubes);
                return {
                    display: `³√${num} = ?`,
                    answer: Math.cbrt(num)
                };
            },
            
            "Rational vs Irrational Numbers": () => {
                const numbers = [
                    {n: '0.5', type: 'rational'},
                    {n: '√2', type: 'irrational'},
                    {n: '3/4', type: 'rational'},
                    {n: 'π', type: 'irrational'},
                    {n: '7', type: 'rational'}
                ];
                const num = this.randomFrom(numbers);
                return {
                    display: `Is ${num.n} rational or irrational?`,
                    answer: num.type
                };
            },
            
            "Frequency Tables (Two-Way)": () => {
                return {
                    display: `Table: Boys-Soccer=10, Girls-Soccer=8, Boys-Tennis=5, Girls-Tennis=12. Total girls?`,
                    answer: 20
                };
            },
            
            // GRADE 9-12 NEW TOPICS
            "Completing the Square": () => {
                const b = this.randomInt(2, 10) * 2;  // Make it even for easier math
                const toAdd = (b / 2) ** 2;
                return {
                    display: `To complete the square for x² + ${b}x, add ?`,
                    answer: toAdd
                };
            },
            
            "Quadratic Formula": () => {
                const solutions = [[1, 2], [2, 3], [1, 5], [-2, 3]];
                const sol = this.randomFrom(solutions);
                const b = -(sol[0] + sol[1]);
                const c = sol[0] * sol[1];
                return {
                    display: `x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0<br>One solution: x = ${sol[0]}. Other solution?`,
                    answer: sol[1]
                };
            },
            
            "Parent Functions": () => {
                const functions = [
                    {name: 'linear', form: 'y = x'},
                    {name: 'quadratic', form: 'y = x²'},
                    {name: 'absolute value', form: 'y = |x|'},
                    {name: 'exponential', form: 'y = 2^x'}
                ];
                const func = this.randomFrom(functions);
                return {
                    display: `What is the parent function for ${func.name} functions?<br><small>Answer like "y = x"</small>`,
                    answer: func.form
                };
            },
            
            "Function Transformations": () => {
                const k = this.randomInt(2, 8);
                const dir = this.randomFrom(['up', 'down', 'left', 'right']);
                return {
                    display: `f(x) + ${k} shifts the graph ${k} units which direction?`,
                    answer: 'up'
                };
            },
            
            "Regression Lines": () => {
                const m = this.randomInt(2, 8);
                const b = this.randomInt(1, 10);
                const x = this.randomInt(1, 5);
                return {
                    display: `Line of best fit: y = ${m}x + ${b}. When x = ${x}, y = ?`,
                    answer: m * x + b
                };
            },
            
            "Standard Form to Slope-Intercept": () => {
                const a = this.randomInt(1, 5);
                const b = this.randomInt(1, 5);
                const c = this.randomInt(5, 20);
                return {
                    display: `Convert ${a}x + ${b}y = ${c} to slope-intercept. What is the y-intercept?`,
                    answer: parseFloat((c / b).toFixed(2))
                };
            },
            
            "Unit Circle": () => {
                const angles = [
                    {deg: 0, cos: 1, sin: 0},
                    {deg: 90, cos: 0, sin: 1},
                    {deg: 180, cos: -1, sin: 0},
                    {deg: 270, cos: 0, sin: -1}
                ];
                const angle = this.randomFrom(angles);
                return {
                    display: `On unit circle, cos(${angle.deg}°) = ?`,
                    answer: angle.cos
                };
            },
            
            "Trig Identities": () => {
                const angle = this.randomInt(20, 70);
                return {
                    display: `If sin²(${angle}°) = 0.25, then cos²(${angle}°) = ?<br><small>(sin² + cos² = 1)</small>`,
                    answer: 0.75
                };
            },
            
            "Arc Length and Sector Area": () => {
                const r = this.randomInt(4, 10);
                const theta = this.randomFrom([30, 45, 60, 90]);
                const arcLength = 2 * Math.PI * r * (theta / 360);
                return {
                    display: `Circle radius ${r}, arc ${theta}°. Arc length ≈ ?<br><small>(Use π ≈ 3.14, round to 1 decimal)</small>`,
                    answer: parseFloat(arcLength.toFixed(1))
                };
            },
            
            "Asymptotes": () => {
                const a = this.randomInt(1, 5);
                const h = this.randomInt(1, 5);
                return {
                    display: `f(x) = ${a}/(x - ${h}). What is the vertical asymptote?<br><small>Answer like "x = 3"</small>`,
                    answer: `x = ${h}`,
                    acceptedAnswers: [`x = ${h}`, `x=${h}`, `${h}`]
                };
            },
            
            "Continuity": () => {
                return {
                    display: `Is f(x) = x² continuous at x = 0?<br><small>(yes or no)</small>`,
                    answer: 'yes'
                };
            },
            
            "Chain Rule": () => {
                const outer = this.randomInt(2, 5);
                const inner = this.randomInt(2, 5);
                return {
                    display: `If f(x) = (${inner}x)², what is f'(1)?<br><small>(Use chain rule)</small>`,
                    answer: 2 * inner * inner
                };
            }
        };
        
        // Fallback to Addition if generator doesn't exist
        const generator = generators[concept.concept] || generators["Addition"];
        const problem = generator();
        
        this.currentProblem = problem;
        this.currentAnswer = problem.answer;
    }
    
    checkAnswer() {
        const userInput = document.getElementById('answerInput').value.trim().toLowerCase();
        const feedbackDiv = document.getElementById('feedback');
        
        if (!userInput) {
            feedbackDiv.innerHTML = '<div class="feedback incorrect">Please enter an answer!</div>';
            return;
        }
        
        // Validate that problem and answer exist
        if (!this.currentProblem || this.currentAnswer === null || this.currentAnswer === undefined) {
            feedbackDiv.innerHTML = '<div class="feedback incorrect">Problem generation failed. Please try a new problem.</div>';
            console.error('❌ ERROR: No valid problem or answer generated');
            return;
        }
        
        // Check if problem has acceptedAnswers array
        const acceptedAnswers = this.currentProblem.acceptedAnswers || [];
        const expectedAnswer = String(this.currentAnswer).toLowerCase();
        
        // Check against accepted answers first
        let isCorrect = false;
        if (acceptedAnswers.length > 0) {
            isCorrect = acceptedAnswers.some(ans => 
                String(ans).toLowerCase() === userInput || 
                String(ans).toLowerCase().replace(/\s/g, '') === userInput.replace(/\s/g, '')
            );
        }
        
        // If not in accepted answers, try standard matching
        if (!isCorrect) {
            // For numeric answers
            if (!isNaN(parseFloat(userInput)) && !isNaN(parseFloat(expectedAnswer))) {
                const userAnswer = parseFloat(userInput);
                const expected = parseFloat(expectedAnswer);
                
                // Use relative tolerance for better accuracy with large numbers
                // For numbers close to 0, use absolute tolerance
                if (Math.abs(expected) < 0.1) {
                    isCorrect = Math.abs(userAnswer - expected) < 0.01;
                } else {
                    // Use 0.1% relative tolerance for larger numbers
                    const relativeTolerance = Math.abs(expected) * 0.001;
                    isCorrect = Math.abs(userAnswer - expected) <= relativeTolerance;
                }
            } else {
                // For text answers (case-insensitive, ignore extra spaces)
                const cleanUser = userInput.replace(/\s+/g, ' ').trim();
                const cleanExpected = expectedAnswer.replace(/\s+/g, ' ').trim();
                isCorrect = cleanUser === cleanExpected;
            }
        }
        
        this.stats.totalAttempts++;
        
        if (isCorrect) {
            this.stats.correctAnswers++;
            this.stats.streak++;
            this.stats.score += 10;
            this.saveStats();
            this.updateStatsDisplay();
            
            feedbackDiv.innerHTML = `
                <div class="feedback correct">
                    ✓ Excellent! That's correct! 🎉
                    <p style="margin-top: 10px; font-size: 1rem;">+10 points • ${this.stats.streak} streak!</p>
                </div>
                <button class="btn-new" onclick="app.renderPractice(document.getElementById('contentArea'))">
                    Next Problem
                </button>
            `;
        } else {
            this.stats.streak = 0;
            this.saveStats();
            this.updateStatsDisplay();
            
            feedbackDiv.innerHTML = `
                <div class="feedback incorrect">
                    ✗ Not quite. Try again or see the solution below.
                </div>
                <div class="solution">
                    <div class="solution-title">💡 Solution:</div>
                    <p style="font-size: 1.3rem; margin: 15px 0;">The correct answer is <strong>${this.formatAnswer(this.currentAnswer)}</strong></p>
                    <p>${this.getSolutionExplanation()}</p>
                </div>
                <button class="btn-new" onclick="app.renderPractice(document.getElementById('contentArea'))">
                    Try Another Problem
                </button>
            `;
        }
    }
    
    getSolutionExplanation() {
        if (!this.currentTopic) return 'Please select a topic to practice.';
        
        const concept = getConceptByName(this.currentTopic);
        if (!concept) return 'Topic data not found.';
        
        const explanations = {
            "Addition": () => `When we add ${this.currentProblem.a} and ${this.currentProblem.b}, we get ${this.currentAnswer}.`,
            "Subtraction": () => `When we subtract ${this.currentProblem.b} from ${this.currentProblem.a}, we get ${this.currentAnswer}.`,
            "Multiplication": () => `${this.currentProblem.a} groups of ${this.currentProblem.b} equals ${this.currentAnswer}.`,
            "Division": () => `${this.currentProblem.a} divided by ${this.currentProblem.b} equals ${this.currentAnswer}.`,
            "Percentages": () => `${this.currentProblem.percent}% of ${this.currentProblem.total} = ${this.currentProblem.percent/100} × ${this.currentProblem.total} = ${this.currentAnswer}`,
        };
        
        const explainFn = explanations[concept.concept];
        return explainFn ? explainFn() : 'Review the lesson and walkthrough to understand this concept better!';
    }
    
    formatAnswer(answer) {
        if (typeof answer === 'number') {
            return Number.isInteger(answer) ? answer : answer.toFixed(2);
        }
        return answer;
    }
    
    gcd(a, b) {
        return b === 0 ? a : this.gcd(b, a % b);
    }
    
    updateStatsDisplay() {
        document.getElementById('streakCount').textContent = this.stats.streak;
        document.getElementById('scoreCount').textContent = this.stats.score;
        
        const accuracy = this.stats.totalAttempts > 0 
            ? Math.round((this.stats.correctAnswers / this.stats.totalAttempts) * 100)
            : 0;
        document.getElementById('accuracyPercent').textContent = accuracy + '%';
    }
    
    saveStats() {
        localStorage.setItem('mathbored-stats', JSON.stringify(this.stats));
    }
    
    loadStats() {
        try {
            const saved = localStorage.getItem('mathbored-stats');
            if (saved) {
                const parsedStats = JSON.parse(saved);
                
                // Validate stats structure and values
                if (parsedStats && typeof parsedStats === 'object') {
                    this.stats = {
                        streak: Math.max(0, parseInt(parsedStats.streak) || 0),
                        score: Math.max(0, parseInt(parsedStats.score) || 0),
                        totalAttempts: Math.max(0, parseInt(parsedStats.totalAttempts) || 0),
                        correctAnswers: Math.max(0, parseInt(parsedStats.correctAnswers) || 0)
                    };
                    
                    // Ensure correctAnswers doesn't exceed totalAttempts
                    if (this.stats.correctAnswers > this.stats.totalAttempts) {
                        this.stats.correctAnswers = this.stats.totalAttempts;
                    }
                    
                    console.log('✅ Stats loaded successfully:', this.stats);
                } else {
                    console.warn('⚠️ Invalid stats format, using defaults');
                }
            }
        } catch (error) {
            console.error('❌ Error loading stats, using defaults:', error);
            // Stats already initialized with defaults in constructor
        }
    }
    
    resetStats() {
        // Confirm before resetting
        if (confirm('Are you sure you want to reset all your statistics? This cannot be undone.')) {
            // Reset stats to defaults
            this.stats = {
                streak: 0,
                score: 0,
                totalAttempts: 0,
                correctAnswers: 0
            };
            
            // Save and update display
            this.saveStats();
            this.updateStatsDisplay();
            
            // Show confirmation
            const resetBtn = document.getElementById('resetBtn');
            const originalText = resetBtn.textContent;
            resetBtn.textContent = '✓ Stats Reset!';
            resetBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                resetBtn.textContent = originalText;
                resetBtn.style.background = '';
            }, 2000);
            
            console.log('✅ Stats reset successfully');
        }
    }
    
    async shareStats() {
        const shareBtn = document.getElementById('shareBtn');
        
        // Disable button during share
        shareBtn.disabled = true;
        
        // Calculate accuracy
        const accuracy = this.stats.totalAttempts > 0 
            ? Math.round((this.stats.correctAnswers / this.stats.totalAttempts) * 100)
            : 0;
        
        // Get grade display name
        const gradeNames = {
            'K': 'Kindergarten',
            '1': '1st Grade', '2': '2nd Grade', '3': '3rd Grade',
            '4': '4th Grade', '5': '5th Grade', '6': '6th Grade',
            '7': '7th Grade', '8': '8th Grade', '9': '9th Grade',
            '10': '10th Grade', '11': '11th Grade', '12': '12th Grade'
        };
        const gradeName = gradeNames[this.currentGrade] || `Grade ${this.currentGrade}`;
        
        // Create share text
        const shareText = `📚 Just practiced math on MathBored! 🎯

Topic: ${this.currentTopic || 'Math Practice'}
Grade: ${gradeName}

✓ ${this.stats.correctAnswers}/${this.stats.totalAttempts} correct (${accuracy}%)
🔥 ${this.stats.streak} problem streak
📊 ${this.stats.score} points

Never be bored with math again!
math.boredgames.site`;
        
        try {
            // Try native Web Share API first (mobile)
            if (navigator.share) {
                await navigator.share({
                    title: 'My MathBored Progress',
                    text: shareText
                });
                
                // Show success feedback
                shareBtn.textContent = '✓ Shared!';
                shareBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
            } else {
                // Fallback to clipboard (desktop)
                await navigator.clipboard.writeText(shareText);
                
                // Show success feedback
                shareBtn.textContent = '✓ Copied to Clipboard!';
                shareBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            }
            
            // Reset button after 2 seconds
            setTimeout(() => {
                shareBtn.textContent = '📤 Share Progress';
                shareBtn.style.background = '';
                shareBtn.disabled = false;
            }, 2000);
            
        } catch (err) {
            // User cancelled or error occurred
            console.log('Share cancelled or failed:', err);
            
            // Reset button immediately on error
            shareBtn.textContent = '📤 Share Progress';
            shareBtn.style.background = '';
            shareBtn.disabled = false;
        }
    }
}

// Initialize app when DOM is ready
let app;

function initializeApp() {
    console.log('🚀 Initializing MathBored App...');
    console.log('DOM ready:', document.readyState);
    console.log('getTopicsByGrade available:', typeof getTopicsByGrade);
    console.log('mathConcepts available:', typeof mathConcepts);
    
    // Ensure data.js has loaded
    if (typeof getTopicsByGrade === 'undefined' || typeof mathConcepts === 'undefined') {
        console.warn('⚠️ Data not ready yet, retrying in 100ms...');
        setTimeout(initializeApp, 100);
        return;
    }
    
    app = new MathBoredApp();
    
    // Register service worker for PWA support
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('✅ ServiceWorker registered:', registration);
                
                // Check for updates every time the page loads
                registration.update();
                
                // Listen for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('🔄 New service worker found, installing...');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'activated') {
                            console.log('✅ New service worker activated!');
                            // Optionally reload the page to use new version
                            if (confirm('A new version is available! Reload to update?')) {
                                window.location.reload();
                            }
                        }
                    });
                });
            })
            .catch(error => {
                console.log('❌ ServiceWorker registration failed:', error);
            });
    }
}

// Try to initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already ready, initialize immediately
    initializeApp();
}

