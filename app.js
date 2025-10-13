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
    
    // Helper methods for problem generation
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    randomFrom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    generateProblem() {
        const concept = getConceptByName(this.currentTopic);
        if (!concept) return;
        
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
                    {seq: [🔴,🔵,🔴,🔵,🔴], ans: '🔵'},
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
                const b = Math.floor(Math.random() * 12) + 1;
                const answer = Math.floor(Math.random() * 12) + 1;
                const a = b * answer;
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
                isCorrect = Math.abs(userAnswer - expected) < 0.01;
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
            shareBtn.disabled = false;
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

