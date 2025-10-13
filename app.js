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
    
    init() {
        this.setupEventListeners();
        this.updateTopics();
        this.updateStatsDisplay();
    }
    
    setupEventListeners() {
        // Grade selection
        document.getElementById('gradeSelect').addEventListener('change', (e) => {
            this.currentGrade = e.target.value;
            this.updateTopics();
        });
        
        // Topic selection
        document.getElementById('topicSelect').addEventListener('change', (e) => {
            this.currentTopic = e.target.value;
            this.render();
        });
        
        // Mode tabs
        document.querySelectorAll('.mode-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.currentMode = e.target.dataset.mode;
                this.render();
            });
        });
        
        // Theme selector
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.target.dataset.theme;
                this.setTheme(theme);
            });
        });
    }
    
    setTheme(theme) {
        const themes = ['ocean', 'forest', 'sunset', 'purple', 'light'];
        themes.forEach(t => document.body.classList.remove(`theme-${t}`));
        
        if (theme) {
            document.body.classList.add(`theme-${theme}`);
        }
        
        document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        localStorage.setItem('mathbored-theme', theme);
    }
    
    updateTopics() {
        const topics = getTopicsByGrade(this.currentGrade);
        const topicSelect = document.getElementById('topicSelect');
        
        topicSelect.innerHTML = '';
        topics.forEach(topic => {
            const option = document.createElement('option');
            option.value = topic.concept;
            option.textContent = topic.concept;
            topicSelect.appendChild(option);
        });
        
        if (topics.length > 0) {
            this.currentTopic = topics[0].concept;
        }
        
        this.render();
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
        const conceptData = getConceptByName(this.currentTopic);
        if (!conceptData) {
            container.innerHTML = '<div class="loading">Loading lesson...</div>';
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
        const concept = getConceptByName(this.currentTopic);
        if (!concept) return '<p>Loading steps...</p>';
        
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
            }
        };
        
        // Return specific walkthrough or generic one
        const walkthroughFn = walkthroughs[concept.concept];
        return walkthroughFn ? walkthroughFn() : this.generateGenericWalkthrough();
    }
    
    generateGenericWalkthrough() {
        return `
            <div class="walkthrough-step">
                <span class="step-number">1</span>
                <strong>Identify what we're solving:</strong> Look at the problem and identify the key information.
            </div>
            <div class="walkthrough-step">
                <span class="step-number">2</span>
                <strong>Apply the concept:</strong> Use the rules and formulas for this topic.
            </div>
            <div class="walkthrough-step">
                <span class="step-number">3</span>
                <strong>Calculate:</strong> Work through the steps carefully.
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
    
    generateProblem() {
        const concept = getConceptByName(this.currentTopic);
        if (!concept) return;
        
        const gradeNum = this.currentGrade === 'K' ? 0 : parseInt(this.currentGrade);
        const maxNum = Math.min(20 + gradeNum * 15, 200);
        
        const generators = {
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
                const b = Math.floor(Math.random() * 12) + 1;
                const answer = Math.floor(Math.random() * 12) + 1;
                const a = b * answer;
                return {
                    a, b,
                    display: `${a} ÷ ${b} = ?`,
                    answer: answer
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
            
            "Integers": () => {
                const a = Math.floor(Math.random() * 20) - 10;
                const b = Math.floor(Math.random() * 20) - 10;
                return {
                    a, b,
                    display: `${a} + (${b}) = ?`,
                    answer: a + b
                };
            },
            
            "Exponents": () => {
                const base = Math.floor(Math.random() * 8) + 2;
                const exp = Math.floor(Math.random() * 4) + 2;
                return {
                    base, exp,
                    display: `${base}^${exp} = ?`,
                    answer: Math.pow(base, exp)
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
            }
        };
        
        const generator = generators[concept.concept] || generators["Addition"];
        const problem = generator();
        
        this.currentProblem = problem;
        this.currentAnswer = problem.answer;
    }
    
    checkAnswer() {
        const userInput = document.getElementById('answerInput').value.trim();
        const feedbackDiv = document.getElementById('feedback');
        
        if (!userInput) {
            feedbackDiv.innerHTML = '<div class="feedback incorrect">Please enter an answer!</div>';
            return;
        }
        
        // Parse user answer (handle different formats)
        let userAnswer = userInput;
        const expectedAnswer = String(this.currentAnswer);
        
        // For numeric answers
        if (!isNaN(parseFloat(userInput))) {
            userAnswer = parseFloat(userInput);
            const isCorrect = Math.abs(userAnswer - parseFloat(expectedAnswer)) < 0.01;
            
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
        } else {
            // For non-numeric answers (like fractions)
            const isCorrect = userAnswer === expectedAnswer;
            this.stats.totalAttempts++;
            
            if (isCorrect) {
                this.stats.correctAnswers++;
                this.stats.streak++;
                this.stats.score += 10;
                this.saveStats();
                this.updateStatsDisplay();
                
                feedbackDiv.innerHTML = `
                    <div class="feedback correct">
                        ✓ Perfect! That's the right answer! 🎉
                        <p style="margin-top: 10px;">+10 points • ${this.stats.streak} streak!</p>
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
                        ✗ Not quite right. See the solution below!
                    </div>
                    <div class="solution">
                        <div class="solution-title">💡 Solution:</div>
                        <p style="font-size: 1.3rem;">The correct answer is <strong>${this.formatAnswer(this.currentAnswer)}</strong></p>
                    </div>
                    <button class="btn-new" onclick="app.renderPractice(document.getElementById('contentArea'))">
                        Try Another Problem
                    </button>
                `;
            }
        }
    }
    
    getSolutionExplanation() {
        const concept = getConceptByName(this.currentTopic);
        if (!concept) return '';
        
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
        const saved = localStorage.getItem('mathbored-stats');
        if (saved) {
            this.stats = JSON.parse(saved);
        }
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MathBoredApp();
    
    // Register service worker for PWA support
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    }
});

