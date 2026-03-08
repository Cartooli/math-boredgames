module.exports = {

'R49': `
<h2>Scientific Notation</h2>
<p>The distance from Earth to the Sun is about 150,000,000 kilometers. The diameter of a hydrogen atom is about 0.00000000012 meters. Writing out all those zeros is tedious and error-prone. <strong>Scientific notation</strong> gives us a compact, precise way to express very large and very small numbers.</p>

<h3>The Format</h3>
<p>A number in scientific notation has the form:</p>
<div class="math-display">a &times; 10<sup>n</sup></div>
<p>where <strong>a</strong> (the coefficient) satisfies 1 &le; a &lt; 10, and <strong>n</strong> (the exponent) is an integer.</p>

<table class="vocab-table">
  <tr><th>Component</th><th>Rule</th><th>Example</th></tr>
  <tr><td>Coefficient (a)</td><td>Must be at least 1 and less than 10</td><td>3.2, 7.08, 1.0</td></tr>
  <tr><td>Exponent (n)</td><td>Positive for large numbers, negative for small</td><td>10<sup>6</sup>, 10<sup>-4</sup></td></tr>
</table>

<h3>Converting Standard Form to Scientific Notation</h3>
<p>Move the decimal point until you have a number between 1 and 10. Count how many places you moved it:</p>
<ul>
  <li>Moved <strong>left</strong> &rarr; exponent is <strong>positive</strong> (number was large)</li>
  <li>Moved <strong>right</strong> &rarr; exponent is <strong>negative</strong> (number was small)</li>
</ul>

<div class="example-box">
  <h4>Worked Example 1: Large Number</h4>
  <p>Write 47,300,000 in scientific notation.</p>
  <ol class="step-list">
    <li>Place the decimal after the first non-zero digit: 4.7300000</li>
    <li>Count places moved: the decimal moved 7 places to the left.</li>
    <li>Write: 4.73 &times; 10<sup>7</sup></li>
  </ol>
</div>

<div class="example-box">
  <h4>Worked Example 2: Small Number</h4>
  <p>Write 0.000062 in scientific notation.</p>
  <ol class="step-list">
    <li>Place the decimal after the first non-zero digit: 6.2</li>
    <li>Count places moved: the decimal moved 5 places to the right.</li>
    <li>Since the original number was small, the exponent is negative: 6.2 &times; 10<sup>-5</sup></li>
  </ol>
</div>

<h3>Converting Scientific Notation to Standard Form</h3>
<p>Move the decimal point in the direction indicated by the exponent:</p>
<ul>
  <li>Positive exponent &rarr; move decimal <strong>right</strong> (number gets larger)</li>
  <li>Negative exponent &rarr; move decimal <strong>left</strong> (number gets smaller)</li>
</ul>

<div class="example-box">
  <h4>Worked Example 3: Back to Standard Form</h4>
  <p>Convert 8.04 &times; 10<sup>-3</sup> to standard form.</p>
  <ol class="step-list">
    <li>The exponent is -3, so move the decimal 3 places to the left.</li>
    <li>8.04 &rarr; 0.00804</li>
  </ol>
</div>

<h3>Multiplying and Dividing in Scientific Notation</h3>
<p>These operations are especially clean in scientific notation:</p>
<div class="columns-2">
  <div>
    <strong>Multiplication:</strong>
    <div class="math-display">(a &times; 10<sup>m</sup>) &times; (b &times; 10<sup>n</sup>) = (a &times; b) &times; 10<sup>m+n</sup></div>
    <p>Multiply the coefficients, add the exponents.</p>
  </div>
  <div>
    <strong>Division:</strong>
    <div class="math-display">(a &times; 10<sup>m</sup>) &divide; (b &times; 10<sup>n</sup>) = (a &divide; b) &times; 10<sup>m-n</sup></div>
    <p>Divide the coefficients, subtract the exponents.</p>
  </div>
</div>

<div class="example-box">
  <h4>Worked Example 4: Multiplication</h4>
  <p>(3.0 &times; 10<sup>4</sup>) &times; (2.5 &times; 10<sup>3</sup>)</p>
  <ol class="step-list">
    <li>Multiply coefficients: 3.0 &times; 2.5 = 7.5</li>
    <li>Add exponents: 4 + 3 = 7</li>
    <li>Result: 7.5 &times; 10<sup>7</sup></li>
  </ol>
</div>

<div class="tip-box">
  <h4>Order of Magnitude</h4>
  <p>The <strong>order of magnitude</strong> of a number is the power of 10 closest to it. For example, 7,500 is on the order of 10<sup>4</sup> (about 10,000). This is useful for quick comparisons: a million (10<sup>6</sup>) is three orders of magnitude larger than a thousand (10<sup>3</sup>).</p>
</div>

<div class="warning-box">
  <h4>Common Mistake: Coefficient Out of Range</h4>
  <p>If your multiplication gives a coefficient of 10 or more, adjust it. For example, (5 &times; 10<sup>3</sup>) &times; (4 &times; 10<sup>2</sup>) = 20 &times; 10<sup>5</sup>. Since 20 is not between 1 and 10, rewrite as 2.0 &times; 10<sup>6</sup>.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Write 93,000,000 in scientific notation.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Move the decimal 7 places left: 9.3 &times; 10<sup>7</sup></p>
  </details>

  <p><strong>2.</strong> Write 0.0000407 in scientific notation.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Move the decimal 5 places right: 4.07 &times; 10<sup>-5</sup></p>
  </details>

  <p><strong>3.</strong> Convert 6.1 &times; 10<sup>4</sup> to standard form.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Move the decimal 4 places right: 61,000</p>
  </details>

  <p><strong>4.</strong> Calculate (8 &times; 10<sup>5</sup>) &times; (3 &times; 10<sup>-2</sup>). Express in scientific notation.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Coefficients: 8 &times; 3 = 24. Exponents: 5 + (-2) = 3. So 24 &times; 10<sup>3</sup>. Adjust coefficient: 2.4 &times; 10<sup>4</sup>.</p>
  </details>

  <p><strong>5.</strong> Which is larger: 9.8 &times; 10<sup>7</sup> or 3.1 &times; 10<sup>8</sup>?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Compare exponents first. 10<sup>8</sup> &gt; 10<sup>7</sup>, so 3.1 &times; 10<sup>8</sup> (310,000,000) is larger than 9.8 &times; 10<sup>7</sup> (98,000,000).</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>Scientific notation: a &times; 10<sup>n</sup>, where 1 &le; a &lt; 10.</li>
  <li>Positive exponent = large number; negative exponent = small number.</li>
  <li>Multiply: multiply coefficients, add exponents. Divide: divide coefficients, subtract exponents.</li>
  <li>Always adjust the coefficient back into the range [1, 10) if needed.</li>
</ul>
`,

'R50': `
<h2>Introduction to Inequalities</h2>
<p>Not every mathematical relationship is about equality. When we say "you must be at least 48 inches tall to ride," we are describing an <strong>inequality</strong> -- a statement that one value is greater than, less than, or not equal to another.</p>

<h3>Inequality Symbols</h3>
<table class="vocab-table">
  <tr><th>Symbol</th><th>Meaning</th><th>Example</th></tr>
  <tr><td>&lt;</td><td>less than</td><td>3 &lt; 7</td></tr>
  <tr><td>&gt;</td><td>greater than</td><td>10 &gt; 4</td></tr>
  <tr><td>&le;</td><td>less than or equal to</td><td>x &le; 5 (x can be 5)</td></tr>
  <tr><td>&ge;</td><td>greater than or equal to</td><td>x &ge; -2 (x can be -2)</td></tr>
</table>

<div class="tip-box">
  <h4>Reading the Symbol</h4>
  <p>The symbol always "points" to the smaller value. Think of the arrow opening toward the larger side: 3 &lt; 7 means 3 is smaller, 7 is larger.</p>
</div>

<h3>Solving One-Step Inequalities</h3>
<p>Solving inequalities works almost exactly like solving equations. You can add, subtract, multiply, or divide both sides -- with one critical exception we will cover shortly.</p>

<div class="example-box">
  <h4>Worked Example 1: Addition/Subtraction</h4>
  <p>Solve x + 4 &gt; 11</p>
  <ol class="step-list">
    <li>Subtract 4 from both sides: x &gt; 11 - 4</li>
    <li>Simplify: x &gt; 7</li>
    <li>Solution: all numbers greater than 7 (not including 7)</li>
  </ol>
  <p>On a number line, use an <strong>open circle</strong> at 7 and shade to the right.</p>
</div>

<h3>Solving Two-Step Inequalities</h3>

<div class="example-box">
  <h4>Worked Example 2: Two Steps</h4>
  <p>Solve 3x - 5 &le; 10</p>
  <ol class="step-list">
    <li>Add 5 to both sides: 3x &le; 15</li>
    <li>Divide both sides by 3: x &le; 5</li>
    <li>Solution: all numbers less than or equal to 5</li>
  </ol>
  <p>On a number line, use a <strong>closed (filled) circle</strong> at 5 and shade to the left.</p>
</div>

<h3>The Critical Rule: Flipping the Sign</h3>
<p>When you <strong>multiply or divide both sides by a negative number</strong>, you must <strong>reverse the inequality symbol</strong>.</p>

<p>Why? Consider this: 2 &lt; 5 is true. Multiply both sides by -1: -2 and -5. But -2 &gt; -5. The order flipped!</p>

<div class="example-box">
  <h4>Worked Example 3: Flipping the Sign</h4>
  <p>Solve -4x &gt; 20</p>
  <ol class="step-list">
    <li>Divide both sides by -4. Since we are dividing by a negative, flip the inequality.</li>
    <li>x &lt; -5</li>
    <li>Solution: all numbers less than -5</li>
  </ol>
</div>

<div class="warning-box">
  <h4>The #1 Inequality Mistake</h4>
  <p>Forgetting to flip the inequality when multiplying or dividing by a negative is the most common error. Always ask yourself: "Am I multiplying or dividing by a negative?" If yes, reverse the sign.</p>
</div>

<h3>Number Line Representation</h3>
<div class="columns-2">
  <div>
    <p><strong>Open circle (&#9675;)</strong>: the endpoint is NOT included</p>
    <p>Used with &lt; and &gt;</p>
  </div>
  <div>
    <p><strong>Closed circle (&#9679;)</strong>: the endpoint IS included</p>
    <p>Used with &le; and &ge;</p>
  </div>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Solve: x - 3 &ge; 8</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Add 3 to both sides: x &ge; 11. Closed circle at 11, shade right.</p>
  </details>

  <p><strong>2.</strong> Solve: 2x + 1 &lt; 9</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Subtract 1: 2x &lt; 8. Divide by 2: x &lt; 4. Open circle at 4, shade left.</p>
  </details>

  <p><strong>3.</strong> Solve: -5x &le; 30</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Divide by -5 and flip the sign: x &ge; -6. Closed circle at -6, shade right.</p>
  </details>

  <p><strong>4.</strong> Solve: 7 - 2x &gt; 3</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Subtract 7: -2x &gt; -4. Divide by -2, flip: x &lt; 2. Open circle at 2, shade left.</p>
  </details>

  <p><strong>5.</strong> A parking garage charges $3 plus $2 per hour. You have $15. Write and solve an inequality for the number of hours you can park.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>3 + 2h &le; 15. Subtract 3: 2h &le; 12. Divide by 2: h &le; 6. You can park for at most 6 hours.</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>Inequalities use &lt;, &gt;, &le;, &ge; to compare values.</li>
  <li>Solve them like equations, but <strong>flip the inequality sign</strong> when multiplying or dividing by a negative.</li>
  <li>Open circles for strict inequalities (&lt;, &gt;); closed circles for inclusive (&le;, &ge;).</li>
  <li>The solution is a range of values, not a single number.</li>
</ul>
`,

'R51': `
<h2>Percent Applications</h2>
<p>Percentages show up everywhere in daily life -- sale prices, restaurant tips, tax bills, pay raises, and loan interest. Mastering percent calculations is one of the most practically useful math skills you can develop.</p>

<h3>Core Percent Formula</h3>
<div class="math-display">Part = Percent &times; Whole</div>
<p>This formula can be rearranged to find any of the three values:</p>
<table class="vocab-table">
  <tr><th>Find the...</th><th>Formula</th><th>Example</th></tr>
  <tr><td>Part</td><td>Percent &times; Whole</td><td>20% of 80 = 0.20 &times; 80 = 16</td></tr>
  <tr><td>Percent</td><td>Part &divide; Whole</td><td>16 out of 80 = 16 &divide; 80 = 0.20 = 20%</td></tr>
  <tr><td>Whole</td><td>Part &divide; Percent</td><td>16 is 20% of what? 16 &divide; 0.20 = 80</td></tr>
</table>

<h3>Tax, Tip, and Discount</h3>

<div class="example-box">
  <h4>Worked Example 1: Sales Tax</h4>
  <p>A jacket costs $65.00. Sales tax is 8%. What is the total cost?</p>
  <ol class="step-list">
    <li>Calculate tax: 0.08 &times; $65.00 = $5.20</li>
    <li>Add to price: $65.00 + $5.20 = $70.20</li>
  </ol>
  <p><strong>Shortcut:</strong> Multiply by 1.08 directly. $65.00 &times; 1.08 = $70.20</p>
</div>

<div class="example-box">
  <h4>Worked Example 2: Discount Then Tax</h4>
  <p>A $120 pair of shoes is 25% off. Sales tax is 6%. What do you pay?</p>
  <ol class="step-list">
    <li>Discount amount: 0.25 &times; $120 = $30</li>
    <li>Sale price: $120 - $30 = $90</li>
    <li>Tax on sale price: 0.06 &times; $90 = $5.40</li>
    <li>Total: $90 + $5.40 = $95.40</li>
  </ol>
</div>

<div class="tip-box">
  <h4>Tip: The Multiplier Shortcut</h4>
  <p>A 15% tip means you pay 100% + 15% = 115% of the bill. Multiply by 1.15. A 30% discount means you pay 100% - 30% = 70%. Multiply by 0.70. This one-step method is faster and reduces errors.</p>
</div>

<h3>Percent Increase and Decrease</h3>
<div class="math-display">Percent Change = (New - Original) &divide; Original &times; 100%</div>

<div class="example-box">
  <h4>Worked Example 3: Percent Increase</h4>
  <p>A town's population grew from 8,000 to 9,200. What was the percent increase?</p>
  <ol class="step-list">
    <li>Change: 9,200 - 8,000 = 1,200</li>
    <li>Percent change: 1,200 &divide; 8,000 = 0.15 = 15%</li>
    <li>The population increased by 15%.</li>
  </ol>
</div>

<h3>Finding the Whole from a Percent</h3>

<div class="example-box">
  <h4>Worked Example 4: Working Backwards</h4>
  <p>After a 20% discount, a TV costs $360. What was the original price?</p>
  <ol class="step-list">
    <li>After a 20% discount, you pay 80% of the original.</li>
    <li>Set up: 0.80 &times; Original = $360</li>
    <li>Solve: Original = $360 &divide; 0.80 = $450</li>
  </ol>
</div>

<div class="warning-box">
  <h4>Common Mistake: Percent Change Uses the ORIGINAL</h4>
  <p>Always divide by the <strong>original</strong> value, not the new value. If a price goes from $50 to $60, the increase is $10 &divide; $50 = 20%, not $10 &divide; $60.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> A meal costs $42.00. You want to leave a 20% tip. How much is the total including tip?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Tip: 0.20 &times; $42 = $8.40. Total: $42.00 + $8.40 = $50.40. Or: $42 &times; 1.20 = $50.40.</p>
  </details>

  <p><strong>2.</strong> A $250 bike is on sale for 30% off. Tax is 7%. What is the final price?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Sale price: $250 &times; 0.70 = $175. Tax: $175 &times; 0.07 = $12.25. Final: $175 + $12.25 = $187.25.</p>
  </details>

  <p><strong>3.</strong> A stock went from $80 to $68. What is the percent decrease?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Change: $80 - $68 = $12. Percent decrease: $12 &divide; $80 = 0.15 = 15%.</p>
  </details>

  <p><strong>4.</strong> 45 is 60% of what number?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Whole = Part &divide; Percent = 45 &divide; 0.60 = 75.</p>
  </details>

  <p><strong>5.</strong> A store marks up items by 40% from wholesale cost. If the retail price is $63, what was the wholesale cost?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Retail = 1.40 &times; Wholesale. Wholesale = $63 &divide; 1.40 = $45.</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>Part = Percent &times; Whole. Rearrange to find any missing piece.</li>
  <li>Use multiplier shortcuts: add percent for tax/tip (1.08), subtract for discount (0.70).</li>
  <li>Percent change always divides by the <strong>original</strong> amount.</li>
  <li>To find the original from a result, divide by the percent multiplier.</li>
</ul>
`,

'R52': `
<h2>Why Division by Zero is Undefined</h2>
<p>You have been told since elementary school: "You cannot divide by zero." But has anyone explained <em>why</em>? This lesson explores the deep mathematical reasons behind this rule, and why defining it would break the entire number system.</p>

<h3>Division as the Reverse of Multiplication</h3>
<p>Division and multiplication are inverse operations. When we write:</p>
<div class="math-display">12 &divide; 3 = 4</div>
<p>we are really asking: "What number times 3 equals 12?" The answer is 4, because 4 &times; 3 = 12.</p>
<p>So when we write:</p>
<div class="math-display">7 &divide; 0 = ?</div>
<p>we are asking: "What number times 0 equals 7?" In other words, ? &times; 0 = 7.</p>
<p>But any number times zero is zero. There is no number that, when multiplied by 0, gives 7. The question has <strong>no answer</strong>.</p>

<div class="example-box">
  <h4>Worked Example 1: Testing with Multiplication</h4>
  <p>Suppose someone claims 10 &divide; 0 = 5. Let us check:</p>
  <ol class="step-list">
    <li>If 10 &divide; 0 = 5, then 5 &times; 0 should equal 10.</li>
    <li>But 5 &times; 0 = 0, not 10.</li>
    <li>Contradiction. So 10 &divide; 0 cannot be 5.</li>
  </ol>
  <p>Try any number in place of 5 -- the result is always 0, never 10. No value works.</p>
</div>

<h3>The Special Case: 0 &divide; 0</h3>
<p>What about 0 &divide; 0? Now we ask: "What number times 0 equals 0?"</p>
<p>The answer is: <strong>every number</strong>. Since any number times 0 is 0, there are infinitely many "answers." When a question has infinitely many answers, it does not have a meaningful single answer. Mathematicians call this <strong>indeterminate</strong>.</p>

<div class="example-box">
  <h4>Worked Example 2: The Indeterminate Case</h4>
  <p>If 0 &divide; 0 = x, then x &times; 0 = 0.</p>
  <ol class="step-list">
    <li>x = 1? Check: 1 &times; 0 = 0. Works.</li>
    <li>x = 42? Check: 42 &times; 0 = 0. Works.</li>
    <li>x = -7? Check: -7 &times; 0 = 0. Works.</li>
  </ol>
  <p>Every number satisfies the equation, so no single answer can be chosen. This is why 0 &divide; 0 is called indeterminate.</p>
</div>

<h3>What Happens as the Divisor Approaches Zero?</h3>
<p>Let us examine a sequence of divisions and see what happens as we divide by smaller and smaller numbers:</p>

<table class="vocab-table">
  <tr><th>Expression</th><th>Result</th></tr>
  <tr><td>10 &divide; 1</td><td>10</td></tr>
  <tr><td>10 &divide; 0.1</td><td>100</td></tr>
  <tr><td>10 &divide; 0.01</td><td>1,000</td></tr>
  <tr><td>10 &divide; 0.001</td><td>10,000</td></tr>
  <tr><td>10 &divide; 0.0001</td><td>100,000</td></tr>
</table>

<p>As the divisor gets closer to zero, the result grows without bound -- it "blows up" toward infinity. But infinity is not a number, so we cannot assign a finite answer.</p>

<div class="example-box">
  <h4>Worked Example 3: Approaching from Both Sides</h4>
  <p>Consider 1 &divide; x as x approaches 0:</p>
  <ol class="step-list">
    <li>From the positive side: 1 &divide; 0.1 = 10, 1 &divide; 0.01 = 100, ... heading toward +infinity.</li>
    <li>From the negative side: 1 &divide; (-0.1) = -10, 1 &divide; (-0.01) = -100, ... heading toward -infinity.</li>
    <li>The two sides disagree -- one goes to positive infinity, the other to negative infinity.</li>
  </ol>
  <p>Since the limit is different from each side, there is no single value to assign to 1 &divide; 0.</p>
</div>

<div class="warning-box">
  <h4>Why Not Just Define It?</h4>
  <p>If we decided 1 &divide; 0 = "infinity," we would break basic algebra. For instance: if a &divide; 0 = infinity for any a, then 1 &divide; 0 = 2 &divide; 0, which would imply 1 = 2. The entire number system collapses. Leaving division by zero undefined protects the consistency of mathematics.</p>
</div>

<div class="tip-box">
  <h4>Calculators and Computers</h4>
  <p>When you try dividing by zero on a calculator, you get an "Error" or "Undefined" message. Programming languages either throw an error (for integers) or return a special value like "NaN" (Not a Number) or "Infinity" (for floating-point numbers). These are not real answers -- they are signals that something went wrong.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Explain, using multiplication, why 15 &divide; 0 has no answer.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>If 15 &divide; 0 = x, then x &times; 0 = 15. But any number times 0 equals 0, never 15. No such x exists.</p>
  </details>

  <p><strong>2.</strong> Why is 0 &divide; 0 different from 5 &divide; 0?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>For 5 &divide; 0, no number times 0 equals 5 (no solution). For 0 &divide; 0, every number times 0 equals 0 (infinitely many solutions). One has no answer; the other has too many.</p>
  </details>

  <p><strong>3.</strong> Calculate: 10 &divide; 0.0001. What pattern do you notice as the divisor shrinks toward zero?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>10 &divide; 0.0001 = 100,000. As the divisor approaches zero, the quotient grows without bound, suggesting it would "reach infinity" -- which is not a real number.</p>
  </details>

  <p><strong>4.</strong> If someone claims a &divide; 0 = 0 for all a, show why this leads to a contradiction when a = 6.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>If 6 &divide; 0 = 0, then 0 &times; 0 should equal 6. But 0 &times; 0 = 0, not 6. Contradiction.</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>Division by zero is undefined because no number times zero yields a non-zero result.</li>
  <li>0 &divide; 0 is indeterminate because every number times zero yields zero.</li>
  <li>As a divisor approaches zero, the quotient grows without bound.</li>
  <li>Defining division by zero would create contradictions that break arithmetic.</li>
</ul>
`,

'R53': `
<h2>Why We "Flip and Multiply" for Fraction Division</h2>
<p>When you were first taught to divide fractions, you learned a rule: "keep, change, flip" -- keep the first fraction, change division to multiplication, and flip the second fraction. But why does this work? This lesson reveals the mathematical reasoning behind the rule.</p>

<h3>What Division Really Asks</h3>
<p>The expression 6 &divide; 2 asks: "How many groups of 2 fit into 6?" The answer is 3. Fraction division asks the same kind of question:</p>
<div class="math-display">3/4 &divide; 1/8 means "How many 1/8s fit into 3/4?"</div>
<p>Since 3/4 = 6/8, the answer is 6. Let us see how "flip and multiply" gets us there.</p>

<div class="example-box">
  <h4>Worked Example 1: Seeing It Concretely</h4>
  <p>Calculate 3/4 &divide; 1/8 using "flip and multiply."</p>
  <ol class="step-list">
    <li>Keep the first fraction: 3/4</li>
    <li>Flip the second fraction: 1/8 becomes 8/1</li>
    <li>Multiply: (3/4) &times; (8/1) = 24/4 = 6</li>
  </ol>
  <p>Indeed, six copies of 1/8 make 6/8 = 3/4. The answer checks out.</p>
</div>

<h3>The Mathematical Proof</h3>
<p>Here is why the rule works, step by step:</p>

<p>Any division can be written as a fraction (a complex fraction):</p>
<div class="math-display">(a/b) &divide; (c/d) = (a/b) / (c/d)</div>

<p>To simplify a complex fraction, multiply the top and bottom by the same thing -- specifically, by the reciprocal of the denominator:</p>

<div class="example-box">
  <h4>Worked Example 2: The Proof in Action</h4>
  <p>Simplify (2/3) &divide; (4/5).</p>
  <ol class="step-list">
    <li>Write as a complex fraction: (2/3) / (4/5)</li>
    <li>Multiply numerator and denominator by the reciprocal of 4/5, which is 5/4:</li>
    <li>Numerator: (2/3) &times; (5/4) = 10/12 = 5/6</li>
    <li>Denominator: (4/5) &times; (5/4) = 20/20 = 1</li>
    <li>Result: (5/6) / 1 = 5/6</li>
  </ol>
  <p>Multiplying by the reciprocal always turns the denominator into 1, leaving just the numerator -- which is the first fraction times the flipped second fraction.</p>
</div>

<h3>Why the Reciprocal?</h3>
<p>The <strong>reciprocal</strong> of a number is what you multiply it by to get 1:</p>
<table class="vocab-table">
  <tr><th>Number</th><th>Reciprocal</th><th>Product</th></tr>
  <tr><td>3/4</td><td>4/3</td><td>(3/4) &times; (4/3) = 12/12 = 1</td></tr>
  <tr><td>5</td><td>1/5</td><td>5 &times; (1/5) = 1</td></tr>
  <tr><td>2/7</td><td>7/2</td><td>(2/7) &times; (7/2) = 14/14 = 1</td></tr>
</table>
<p>Division by a number is the same as multiplication by its reciprocal. This is true for all numbers, not just fractions: 10 &divide; 5 = 10 &times; (1/5) = 2.</p>

<div class="example-box">
  <h4>Worked Example 3: Complex Fraction Simplification</h4>
  <p>Simplify: (5/6) / (10/3)</p>
  <ol class="step-list">
    <li>Rewrite as multiplication by the reciprocal: (5/6) &times; (3/10)</li>
    <li>Multiply numerators: 5 &times; 3 = 15</li>
    <li>Multiply denominators: 6 &times; 10 = 60</li>
    <li>Simplify: 15/60 = 1/4</li>
  </ol>
</div>

<div class="tip-box">
  <h4>Cross-Canceling Saves Time</h4>
  <p>Before multiplying, you can simplify across the fractions. In (5/6) &times; (3/10), notice that 5 and 10 share a factor of 5, and 3 and 6 share a factor of 3. Cancel first: (1/2) &times; (1/2) = 1/4. Same answer, simpler arithmetic.</p>
</div>

<div class="warning-box">
  <h4>Common Mistake: Flipping the Wrong Fraction</h4>
  <p>Always flip the <strong>second</strong> fraction (the divisor), never the first. In (2/3) &divide; (4/5), flip 4/5 to get 5/4. Do not flip 2/3.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Calculate: (3/5) &divide; (2/3)</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>(3/5) &times; (3/2) = 9/10</p>
  </details>

  <p><strong>2.</strong> Calculate: (7/8) &divide; (7/4)</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>(7/8) &times; (4/7) = 28/56 = 1/2. (Cross-cancel the 7s and simplify 4/8 to get 1/2 directly.)</p>
  </details>

  <p><strong>3.</strong> Simplify the complex fraction: (1/2) / (3/4)</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>(1/2) &times; (4/3) = 4/6 = 2/3</p>
  </details>

  <p><strong>4.</strong> A recipe calls for 3/4 cup of sugar. Each scoop holds 1/8 cup. How many scoops do you need?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>(3/4) &divide; (1/8) = (3/4) &times; (8/1) = 24/4 = 6 scoops.</p>
  </details>

  <p><strong>5.</strong> Use the "multiply both sides by the reciprocal" method to show that (a/b) &divide; (c/d) = (ad)/(bc).</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Write as a complex fraction: (a/b) / (c/d). Multiply numerator and denominator by d/c. Numerator becomes (a/b)(d/c) = ad/(bc). Denominator becomes (c/d)(d/c) = 1. Result: ad/(bc).</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>Dividing by a fraction is equivalent to multiplying by its reciprocal.</li>
  <li>This works because multiplying by the reciprocal turns the divisor into 1.</li>
  <li>The rule (a/b) &divide; (c/d) = (a/b) &times; (d/c) = ad/(bc) follows from simplifying complex fractions.</li>
  <li>Always flip the divisor (second fraction), not the dividend (first fraction).</li>
</ul>
`,

'R54': `
<h2>Distance Formula</h2>
<p>How far is it between two points on a coordinate plane? You cannot simply measure along the x-axis or the y-axis -- in most cases the path is diagonal. The <strong>distance formula</strong> gives us the exact straight-line distance between any two points, and it comes directly from a theorem you already know: the Pythagorean theorem.</p>

<h3>Deriving the Formula</h3>
<p>Given two points (x<sub>1</sub>, y<sub>1</sub>) and (x<sub>2</sub>, y<sub>2</sub>), imagine drawing a right triangle where:</p>
<ul>
  <li>The horizontal leg has length |x<sub>2</sub> - x<sub>1</sub>|</li>
  <li>The vertical leg has length |y<sub>2</sub> - y<sub>1</sub>|</li>
  <li>The hypotenuse is the distance we want</li>
</ul>
<p>By the Pythagorean theorem (a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>):</p>
<div class="math-display">d = &radic;[(x<sub>2</sub> - x<sub>1</sub>)<sup>2</sup> + (y<sub>2</sub> - y<sub>1</sub>)<sup>2</sup>]</div>

<div class="example-box">
  <h4>Worked Example 1: Finding Distance</h4>
  <p>Find the distance between A(1, 2) and B(4, 6).</p>
  <ol class="step-list">
    <li>Identify coordinates: x<sub>1</sub> = 1, y<sub>1</sub> = 2, x<sub>2</sub> = 4, y<sub>2</sub> = 6</li>
    <li>Horizontal distance: 4 - 1 = 3</li>
    <li>Vertical distance: 6 - 2 = 4</li>
    <li>Apply formula: d = &radic;(3<sup>2</sup> + 4<sup>2</sup>) = &radic;(9 + 16) = &radic;25 = 5</li>
  </ol>
</div>

<div class="example-box">
  <h4>Worked Example 2: With Negative Coordinates</h4>
  <p>Find the distance between P(-3, 5) and Q(2, -7).</p>
  <ol class="step-list">
    <li>Horizontal: 2 - (-3) = 5</li>
    <li>Vertical: -7 - 5 = -12 (the square makes it positive)</li>
    <li>d = &radic;(5<sup>2</sup> + (-12)<sup>2</sup>) = &radic;(25 + 144) = &radic;169 = 13</li>
  </ol>
</div>

<div class="tip-box">
  <h4>Squaring Removes the Worry About Order</h4>
  <p>Since we square the differences, it does not matter which point you call (x<sub>1</sub>, y<sub>1</sub>) and which you call (x<sub>2</sub>, y<sub>2</sub>). The result is always the same.</p>
</div>

<h3>The Midpoint Formula</h3>
<p>The <strong>midpoint</strong> is the point exactly halfway between two given points. Simply average the x-coordinates and average the y-coordinates:</p>
<div class="math-display">Midpoint = ((x<sub>1</sub> + x<sub>2</sub>) / 2, (y<sub>1</sub> + y<sub>2</sub>) / 2)</div>

<div class="example-box">
  <h4>Worked Example 3: Finding the Midpoint</h4>
  <p>Find the midpoint of A(2, 8) and B(10, -4).</p>
  <ol class="step-list">
    <li>Average x-coordinates: (2 + 10) / 2 = 12 / 2 = 6</li>
    <li>Average y-coordinates: (8 + (-4)) / 2 = 4 / 2 = 2</li>
    <li>Midpoint: (6, 2)</li>
  </ol>
</div>

<h3>Applications</h3>
<p>The distance formula is used in navigation (GPS calculates distances between coordinates), computer graphics (collision detection in games), and physics (displacement calculations).</p>

<div class="warning-box">
  <h4>Common Mistake: Forgetting to Square</h4>
  <p>The formula is d = &radic;[(x<sub>2</sub> - x<sub>1</sub>)<sup>2</sup> + (y<sub>2</sub> - y<sub>1</sub>)<sup>2</sup>], not d = (x<sub>2</sub> - x<sub>1</sub>) + (y<sub>2</sub> - y<sub>1</sub>). Simply adding the differences gives the wrong answer.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Find the distance between (0, 0) and (5, 12).</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>d = &radic;(25 + 144) = &radic;169 = 13</p>
  </details>

  <p><strong>2.</strong> Find the distance between (-1, 3) and (3, 3).</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>d = &radic;(4<sup>2</sup> + 0<sup>2</sup>) = &radic;16 = 4. (These points share a y-coordinate, so the distance is purely horizontal.)</p>
  </details>

  <p><strong>3.</strong> Find the midpoint of (-6, 4) and (8, -2).</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Midpoint = ((-6 + 8)/2, (4 + (-2))/2) = (2/2, 2/2) = (1, 1)</p>
  </details>

  <p><strong>4.</strong> Find the distance between (2, -1) and (-3, 11).</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>d = &radic;[(-3 - 2)<sup>2</sup> + (11 - (-1))<sup>2</sup>] = &radic;[25 + 144] = &radic;169 = 13</p>
  </details>

  <p><strong>5.</strong> A phone shows you are at location (3, 7) on a grid map. A coffee shop is at (9, 15). Each grid unit represents 0.1 miles. How far away is the coffee shop?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>d = &radic;[(9-3)<sup>2</sup> + (15-7)<sup>2</sup>] = &radic;[36 + 64] = &radic;100 = 10 grid units. At 0.1 miles each: 10 &times; 0.1 = 1 mile.</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>The distance formula d = &radic;[(x<sub>2</sub> - x<sub>1</sub>)<sup>2</sup> + (y<sub>2</sub> - y<sub>1</sub>)<sup>2</sup>] is derived from the Pythagorean theorem.</li>
  <li>The midpoint formula averages the coordinates: ((x<sub>1</sub>+x<sub>2</sub>)/2, (y<sub>1</sub>+y<sub>2</sub>)/2).</li>
  <li>Order of the points does not matter because the differences are squared.</li>
</ul>
`,

'R55': `
<h2>Combining Like Terms &amp; Distributive Property</h2>
<p>Simplifying algebraic expressions is a fundamental skill you will use in every area of mathematics. Two of the most important tools for simplification are <strong>combining like terms</strong> and the <strong>distributive property</strong>.</p>

<h3>What Are Like Terms?</h3>
<p>Like terms are terms that have the <strong>same variable(s) raised to the same power(s)</strong>. Only the coefficients can differ.</p>

<table class="vocab-table">
  <tr><th>Like Terms</th><th>Not Like Terms</th></tr>
  <tr><td>3x and 7x</td><td>3x and 3x<sup>2</sup> (different powers)</td></tr>
  <tr><td>-2y<sup>2</sup> and 5y<sup>2</sup></td><td>4x and 4y (different variables)</td></tr>
  <tr><td>8 and -3 (both constants)</td><td>2xy and 2x (different variable sets)</td></tr>
</table>

<h3>Combining Like Terms</h3>
<p>To combine like terms, add or subtract their <strong>coefficients</strong> while keeping the variable part unchanged.</p>

<div class="example-box">
  <h4>Worked Example 1: Basic Combining</h4>
  <p>Simplify: 5x + 3y - 2x + 7y</p>
  <ol class="step-list">
    <li>Group like terms: (5x - 2x) + (3y + 7y)</li>
    <li>Combine coefficients: 3x + 10y</li>
  </ol>
</div>

<h3>The Distributive Property</h3>
<p>The distributive property states:</p>
<div class="math-display">a(b + c) = ab + ac</div>
<p>You multiply the factor outside the parentheses by <strong>each term</strong> inside.</p>

<div class="example-box">
  <h4>Worked Example 2: Distributing</h4>
  <p>Expand: 4(2x - 3)</p>
  <ol class="step-list">
    <li>Multiply 4 by the first term: 4 &times; 2x = 8x</li>
    <li>Multiply 4 by the second term: 4 &times; (-3) = -12</li>
    <li>Result: 8x - 12</li>
  </ol>
</div>

<div class="example-box">
  <h4>Worked Example 3: Distribute Then Combine</h4>
  <p>Simplify: 3(2x + 4) - 2(x - 5)</p>
  <ol class="step-list">
    <li>Distribute the 3: 6x + 12</li>
    <li>Distribute the -2: -2x + 10 (note: -2 times -5 is +10)</li>
    <li>Combine: 6x + 12 - 2x + 10</li>
    <li>Group like terms: (6x - 2x) + (12 + 10) = 4x + 22</li>
  </ol>
</div>

<div class="warning-box">
  <h4>Common Mistake: Forgetting to Distribute the Negative</h4>
  <p>In -(3x - 7), the negative sign distributes to BOTH terms: -3x + 7. A very common error is writing -3x - 7 by forgetting to change the sign of the second term.</p>
</div>

<div class="tip-box">
  <h4>Subtraction is Adding the Opposite</h4>
  <p>Think of 5x - 2x as 5x + (-2x). This makes it clear that you add the coefficients: 5 + (-2) = 3, giving 3x.</p>
</div>

<div class="example-box">
  <h4>Worked Example 4: Complex Expression</h4>
  <p>Simplify: 2(3x<sup>2</sup> - x + 4) + 5x - 3(x<sup>2</sup> + 2)</p>
  <ol class="step-list">
    <li>Distribute 2: 6x<sup>2</sup> - 2x + 8</li>
    <li>The 5x stays: + 5x</li>
    <li>Distribute -3: -3x<sup>2</sup> - 6</li>
    <li>Combine all: 6x<sup>2</sup> - 2x + 8 + 5x - 3x<sup>2</sup> - 6</li>
    <li>Group: (6x<sup>2</sup> - 3x<sup>2</sup>) + (-2x + 5x) + (8 - 6)</li>
    <li>Simplify: 3x<sup>2</sup> + 3x + 2</li>
  </ol>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Simplify: 8a + 3b - 5a + b</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>(8a - 5a) + (3b + b) = 3a + 4b</p>
  </details>

  <p><strong>2.</strong> Expand: -5(2x - 7)</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>-5(2x) + (-5)(-7) = -10x + 35</p>
  </details>

  <p><strong>3.</strong> Simplify: 4(x + 3) - 2(x - 1)</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>4x + 12 - 2x + 2 = 2x + 14</p>
  </details>

  <p><strong>4.</strong> Simplify: 7y - 3(2y - 4) + y</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>7y - 6y + 12 + y = 2y + 12</p>
  </details>

  <p><strong>5.</strong> Simplify: -(x<sup>2</sup> - 3x + 2) + 4x<sup>2</sup> - x</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>-x<sup>2</sup> + 3x - 2 + 4x<sup>2</sup> - x = 3x<sup>2</sup> + 2x - 2</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>Like terms share the same variable(s) and exponent(s). Combine them by adding coefficients.</li>
  <li>The distributive property: a(b + c) = ab + ac. Multiply by every term inside the parentheses.</li>
  <li>Watch out for distributing negative signs -- they affect every term.</li>
  <li>Strategy: distribute first, then combine like terms.</li>
</ul>
`,

'R56': `
<h2>Simple Interest</h2>
<p>When you borrow money or invest it, there is a cost or reward: <strong>interest</strong>. Simple interest is the most straightforward way to calculate that amount. Understanding it is a crucial step in financial literacy.</p>

<h3>The Formula</h3>
<div class="math-display">I = P &times; R &times; T</div>
<table class="vocab-table">
  <tr><th>Variable</th><th>Meaning</th><th>Example</th></tr>
  <tr><td>I</td><td>Interest earned or owed</td><td>$150</td></tr>
  <tr><td>P</td><td>Principal (starting amount)</td><td>$1,000</td></tr>
  <tr><td>R</td><td>Rate (annual, as a decimal)</td><td>5% = 0.05</td></tr>
  <tr><td>T</td><td>Time (in years)</td><td>3 years</td></tr>
</table>
<p>The total amount after interest is: <strong>A = P + I</strong>.</p>

<div class="example-box">
  <h4>Worked Example 1: Savings Account</h4>
  <p>You deposit $2,000 in an account earning 4% simple interest per year. How much interest do you earn in 5 years? What is the total balance?</p>
  <ol class="step-list">
    <li>Identify: P = $2,000, R = 0.04, T = 5</li>
    <li>Calculate interest: I = 2,000 &times; 0.04 &times; 5 = $400</li>
    <li>Total: A = $2,000 + $400 = $2,400</li>
  </ol>
</div>

<div class="example-box">
  <h4>Worked Example 2: Loan</h4>
  <p>You borrow $5,000 at 8% simple interest for 3 years. How much do you owe in total?</p>
  <ol class="step-list">
    <li>I = 5,000 &times; 0.08 &times; 3 = $1,200</li>
    <li>Total owed: A = $5,000 + $1,200 = $6,200</li>
  </ol>
</div>

<h3>Finding Other Variables</h3>
<p>You can rearrange I = PRT to solve for any variable:</p>
<div class="columns-2">
  <div>
    <div class="math-display">P = I / (R &times; T)</div>
    <div class="math-display">R = I / (P &times; T)</div>
  </div>
  <div>
    <div class="math-display">T = I / (P &times; R)</div>
  </div>
</div>

<div class="example-box">
  <h4>Worked Example 3: Finding the Rate</h4>
  <p>You invested $3,000 and earned $360 in interest over 2 years. What was the interest rate?</p>
  <ol class="step-list">
    <li>R = I / (P &times; T) = 360 / (3,000 &times; 2) = 360 / 6,000 = 0.06</li>
    <li>Convert to percent: 0.06 = 6%</li>
  </ol>
</div>

<h3>Comparing Loan Options</h3>

<div class="example-box">
  <h4>Worked Example 4: Which Loan is Cheaper?</h4>
  <p>Option A: $10,000 at 6% for 4 years. Option B: $10,000 at 5% for 5 years.</p>
  <ol class="step-list">
    <li>Option A interest: 10,000 &times; 0.06 &times; 4 = $2,400</li>
    <li>Option B interest: 10,000 &times; 0.05 &times; 5 = $2,500</li>
    <li>Option A costs less in total interest, despite the higher rate, because of the shorter term.</li>
  </ol>
</div>

<div class="tip-box">
  <h4>Time Must Be in Years</h4>
  <p>If time is given in months, convert to years by dividing by 12. For example, 18 months = 18/12 = 1.5 years. If in days, divide by 365.</p>
</div>

<div class="warning-box">
  <h4>Simple vs. Compound Interest</h4>
  <p>Simple interest is calculated only on the original principal. It does not grow on the interest already earned. This makes it "simple" but also less realistic for long-term investments. Most bank accounts and loans use compound interest (covered in the next lesson).</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Calculate the simple interest on $800 at 5% for 3 years.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>I = 800 &times; 0.05 &times; 3 = $120</p>
  </details>

  <p><strong>2.</strong> You borrow $1,500 at 9% simple interest for 2 years. What is the total amount you repay?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>I = 1,500 &times; 0.09 &times; 2 = $270. Total: $1,500 + $270 = $1,770.</p>
  </details>

  <p><strong>3.</strong> An investment earned $600 in interest over 4 years at 5% simple interest. What was the principal?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>P = I / (R &times; T) = 600 / (0.05 &times; 4) = 600 / 0.20 = $3,000</p>
  </details>

  <p><strong>4.</strong> You invest $4,000 at 3.5% simple interest. How many years until you earn $700 in interest?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>T = I / (P &times; R) = 700 / (4,000 &times; 0.035) = 700 / 140 = 5 years</p>
  </details>

  <p><strong>5.</strong> Loan A: $6,000 at 7% for 3 years. Loan B: $6,000 at 5.5% for 4 years. Which costs less interest?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Loan A: 6,000 &times; 0.07 &times; 3 = $1,260. Loan B: 6,000 &times; 0.055 &times; 4 = $1,320. Loan A costs less ($1,260 vs. $1,320).</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>Simple interest: I = P &times; R &times; T. Total amount: A = P + I.</li>
  <li>R must be a decimal; T must be in years.</li>
  <li>Rearrange the formula to find any unknown variable.</li>
  <li>When comparing loans, consider both the rate and the time period.</li>
</ul>
`,

'R57': `
<h2>Compound Interest</h2>
<p>Simple interest is calculated only on the original amount. <strong>Compound interest</strong> is calculated on the original amount <em>plus</em> any interest already earned. This "interest on interest" effect causes money to grow much faster over time -- and it is how most real-world savings, loans, and investments actually work.</p>

<h3>The Formula</h3>
<div class="math-display">A = P(1 + r/n)<sup>nt</sup></div>
<table class="vocab-table">
  <tr><th>Variable</th><th>Meaning</th></tr>
  <tr><td>A</td><td>Final amount (principal + interest)</td></tr>
  <tr><td>P</td><td>Principal (initial amount)</td></tr>
  <tr><td>r</td><td>Annual interest rate (as a decimal)</td></tr>
  <tr><td>n</td><td>Number of times interest compounds per year</td></tr>
  <tr><td>t</td><td>Time in years</td></tr>
</table>

<h3>Compounding Periods</h3>
<table class="vocab-table">
  <tr><th>Compounding Frequency</th><th>n value</th></tr>
  <tr><td>Annually</td><td>1</td></tr>
  <tr><td>Semi-annually</td><td>2</td></tr>
  <tr><td>Quarterly</td><td>4</td></tr>
  <tr><td>Monthly</td><td>12</td></tr>
  <tr><td>Daily</td><td>365</td></tr>
</table>

<div class="example-box">
  <h4>Worked Example 1: Annual Compounding</h4>
  <p>You invest $1,000 at 6% interest compounded annually for 3 years.</p>
  <ol class="step-list">
    <li>P = 1,000, r = 0.06, n = 1, t = 3</li>
    <li>A = 1,000(1 + 0.06/1)<sup>1&times;3</sup> = 1,000(1.06)<sup>3</sup></li>
    <li>A = 1,000 &times; 1.191016 = $1,191.02</li>
    <li>Interest earned: $1,191.02 - $1,000 = $191.02</li>
  </ol>
  <p>Compare with simple interest: I = 1,000 &times; 0.06 &times; 3 = $180. Compounding earned an extra $11.02.</p>
</div>

<div class="example-box">
  <h4>Worked Example 2: Monthly Compounding</h4>
  <p>You deposit $5,000 at 4.8% interest compounded monthly for 5 years.</p>
  <ol class="step-list">
    <li>P = 5,000, r = 0.048, n = 12, t = 5</li>
    <li>A = 5,000(1 + 0.048/12)<sup>12&times;5</sup> = 5,000(1 + 0.004)<sup>60</sup></li>
    <li>A = 5,000(1.004)<sup>60</sup> = 5,000 &times; 1.27048 = $6,352.40</li>
    <li>Interest earned: $1,352.40</li>
  </ol>
</div>

<h3>Compound vs. Simple Interest Over Time</h3>
<p>The difference between compound and simple interest grows dramatically with time. Here is $1,000 at 8%:</p>
<table class="vocab-table">
  <tr><th>Years</th><th>Simple Interest Total</th><th>Compound Interest Total</th><th>Difference</th></tr>
  <tr><td>5</td><td>$1,400</td><td>$1,469</td><td>$69</td></tr>
  <tr><td>10</td><td>$1,800</td><td>$2,159</td><td>$359</td></tr>
  <tr><td>20</td><td>$2,600</td><td>$4,661</td><td>$2,061</td></tr>
  <tr><td>30</td><td>$3,400</td><td>$10,063</td><td>$6,663</td></tr>
</table>

<div class="tip-box">
  <h4>The Rule of 72</h4>
  <p>To estimate how long it takes for money to double with compound interest, divide 72 by the interest rate (as a whole number):</p>
  <div class="math-display">Doubling Time &approx; 72 / rate</div>
  <p>At 6% interest: 72 / 6 = 12 years to double. At 9%: 72 / 9 = 8 years. This is a quick mental math tool, not an exact calculation.</p>
</div>

<div class="example-box">
  <h4>Worked Example 3: Rule of 72</h4>
  <p>At 4% annual interest, approximately how long to double your money?</p>
  <ol class="step-list">
    <li>72 / 4 = 18 years</li>
    <li>Check: $1,000 at 4% for 18 years: A = 1,000(1.04)<sup>18</sup> = $2,025.82. Very close to double.</li>
  </ol>
</div>

<div class="warning-box">
  <h4>Compound Interest on Debt</h4>
  <p>Compound interest works against you on loans and credit cards. A $5,000 credit card balance at 18% APR compounded monthly, left unpaid for 5 years, grows to over $12,000. The same power that builds wealth in savings destroys it in debt.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Calculate the final amount: $2,000 at 5% compounded annually for 4 years.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>A = 2,000(1.05)<sup>4</sup> = 2,000 &times; 1.21551 = $2,431.01</p>
  </details>

  <p><strong>2.</strong> You invest $3,000 at 6% compounded semi-annually for 3 years. How much do you have?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>A = 3,000(1 + 0.06/2)<sup>2&times;3</sup> = 3,000(1.03)<sup>6</sup> = 3,000 &times; 1.19405 = $3,582.16</p>
  </details>

  <p><strong>3.</strong> Using the Rule of 72, estimate the doubling time at 12% interest.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>72 / 12 = 6 years</p>
  </details>

  <p><strong>4.</strong> You invest $1,000 at 5% for 10 years. How much more do you earn with monthly compounding vs. simple interest?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Simple: I = 1,000 &times; 0.05 &times; 10 = $500. Total = $1,500. Compound: A = 1,000(1 + 0.05/12)<sup>120</sup> = 1,000(1.004167)<sup>120</sup> = $1,647.01. Difference: $1,647.01 - $1,500 = $147.01.</p>
  </details>

  <p><strong>5.</strong> A credit card has an 18% APR compounded monthly. If you owe $2,000 and make no payments, how much do you owe after 2 years?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>A = 2,000(1 + 0.18/12)<sup>24</sup> = 2,000(1.015)<sup>24</sup> = 2,000 &times; 1.42950 = $2,859.01</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>Compound interest formula: A = P(1 + r/n)<sup>nt</sup>.</li>
  <li>More frequent compounding produces slightly more interest.</li>
  <li>The Rule of 72: divide 72 by the rate to estimate doubling time.</li>
  <li>Compound interest is powerful for savings but dangerous for debt.</li>
</ul>
`,

'R58': `
<h2>PEMDAS Pitfalls</h2>
<p>You probably know PEMDAS: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction. But knowing the acronym and applying it correctly are two very different things. This lesson focuses on the tricky cases where even careful students make mistakes.</p>

<h3>Quick Review</h3>
<table class="vocab-table">
  <tr><th>Priority</th><th>Operations</th><th>Rule</th></tr>
  <tr><td>1st</td><td>Parentheses (and other grouping)</td><td>Innermost first</td></tr>
  <tr><td>2nd</td><td>Exponents</td><td>Evaluate powers and roots</td></tr>
  <tr><td>3rd</td><td>Multiplication and Division</td><td>Left to right (equal priority)</td></tr>
  <tr><td>4th</td><td>Addition and Subtraction</td><td>Left to right (equal priority)</td></tr>
</table>

<h3>Pitfall 1: Multiplication and Division Are EQUAL</h3>
<p>PEMDAS does not mean multiplication comes before division. They have <strong>equal priority</strong> and are performed <strong>left to right</strong>.</p>

<div class="example-box">
  <h4>Worked Example 1: Left-to-Right Matters</h4>
  <p>Evaluate: 24 &divide; 4 &times; 3</p>
  <ol class="step-list">
    <li>Work left to right: 24 &divide; 4 = 6</li>
    <li>Then: 6 &times; 3 = 18</li>
  </ol>
  <p><strong>Wrong approach:</strong> Doing multiplication first would give 24 &divide; 12 = 2. That is incorrect.</p>
</div>

<h3>Pitfall 2: Negatives and Exponents</h3>
<p>There is a critical difference between -3<sup>2</sup> and (-3)<sup>2</sup>:</p>
<div class="columns-2">
  <div>
    <div class="math-display">-3<sup>2</sup> = -(3<sup>2</sup>) = -9</div>
    <p>The exponent applies only to 3. The negative is applied after.</p>
  </div>
  <div>
    <div class="math-display">(-3)<sup>2</sup> = (-3)&times;(-3) = 9</div>
    <p>The parentheses make the negative part of the base.</p>
  </div>
</div>

<div class="example-box">
  <h4>Worked Example 2: Negative Exponent Trap</h4>
  <p>Evaluate: -5<sup>2</sup> + 10</p>
  <ol class="step-list">
    <li>Exponent first: 5<sup>2</sup> = 25</li>
    <li>Apply negative: -25</li>
    <li>Add: -25 + 10 = -15</li>
  </ol>
  <p><strong>Common wrong answer:</strong> 35 (from incorrectly computing (-5)<sup>2</sup> = 25, then 25 + 10).</p>
</div>

<h3>Pitfall 3: Fraction Bars as Grouping Symbols</h3>
<p>A fraction bar acts like parentheses around the entire numerator and the entire denominator.</p>

<div class="example-box">
  <h4>Worked Example 3: Fraction Bar Grouping</h4>
  <p>Evaluate: (8 + 4) / (2 + 1)</p>
  <ol class="step-list">
    <li>Evaluate the numerator: 8 + 4 = 12</li>
    <li>Evaluate the denominator: 2 + 1 = 3</li>
    <li>Divide: 12 / 3 = 4</li>
  </ol>
  <p>If you ignored grouping and wrote 8 + 4 / 2 + 1, you would get 8 + 2 + 1 = 11. Very different!</p>
</div>

<h3>Pitfall 4: Implicit Multiplication</h3>
<p>When you see 2(3 + 4), the multiplication between 2 and the parentheses is <strong>not</strong> given higher priority than other multiplication or division. It follows normal left-to-right rules.</p>

<div class="warning-box">
  <h4>The Viral Math Problem Trap</h4>
  <p>Expressions like "8 &divide; 2(2+2)" go viral because they are ambiguously written. In standard mathematical convention, multiplication and division are left to right: 8 &divide; 2 &times; 4 = 4 &times; 4 = 16. The real lesson: use parentheses to make your meaning clear. Good notation prevents confusion.</p>
</div>

<h3>Pitfall 5: Addition and Subtraction Are EQUAL</h3>

<div class="example-box">
  <h4>Worked Example 4: Subtraction Order</h4>
  <p>Evaluate: 10 - 3 + 2</p>
  <ol class="step-list">
    <li>Left to right: 10 - 3 = 7</li>
    <li>Then: 7 + 2 = 9</li>
  </ol>
  <p>Incorrect: doing addition first gives 10 - 5 = 5.</p>
</div>

<div class="tip-box">
  <h4>When in Doubt, Add Parentheses</h4>
  <p>If you are ever unsure about order of operations, add parentheses to force the order you intend. Clear notation is not a sign of weakness -- it is a sign of precision.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Evaluate: 18 &divide; 6 &times; 3</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Left to right: 18 &divide; 6 = 3, then 3 &times; 3 = 9.</p>
  </details>

  <p><strong>2.</strong> Evaluate: -4<sup>2</sup></p>
  <details class="solution"><summary>Show Solution</summary>
    <p>The exponent applies to 4 only: -(4<sup>2</sup>) = -16. (Not 16!)</p>
  </details>

  <p><strong>3.</strong> Evaluate: 3 + 4 &times; 2 - 1</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Multiplication first: 4 &times; 2 = 8. Then left to right: 3 + 8 - 1 = 10.</p>
  </details>

  <p><strong>4.</strong> Evaluate: (6 + 2)<sup>2</sup> &divide; 4 - 3</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Parentheses: 8. Exponent: 8<sup>2</sup> = 64. Division: 64 &divide; 4 = 16. Subtraction: 16 - 3 = 13.</p>
  </details>

  <p><strong>5.</strong> Evaluate: 2 &times; 3<sup>2</sup> - 4(5 - 2)</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Parentheses: 5 - 2 = 3. Exponent: 3<sup>2</sup> = 9. Multiplication: 2 &times; 9 = 18 and 4 &times; 3 = 12. Subtraction: 18 - 12 = 6.</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>Multiplication/division have <strong>equal</strong> priority -- go left to right.</li>
  <li>Addition/subtraction have <strong>equal</strong> priority -- go left to right.</li>
  <li>-x<sup>2</sup> means -(x<sup>2</sup>), not (-x)<sup>2</sup>, unless parentheses say otherwise.</li>
  <li>Fraction bars group the entire numerator and denominator.</li>
  <li>When in doubt, use parentheses to clarify.</li>
</ul>
`,

'R59': `
<h2>Absolute Value Equations</h2>
<p>Absolute value measures <strong>distance from zero</strong> on a number line. Since distance is always non-negative, absolute value strips away the sign of a number. This simple idea leads to equations with a surprising twist: they can produce two solutions.</p>

<h3>Review: What Is Absolute Value?</h3>
<div class="math-display">|x| = x if x &ge; 0, and |x| = -x if x &lt; 0</div>
<p>In simpler terms: |5| = 5 and |-5| = 5. Both 5 and -5 are a distance of 5 from zero.</p>

<h3>The Key Principle</h3>
<p>If |x| = a, where a &gt; 0, then:</p>
<div class="math-display">x = a &nbsp; or &nbsp; x = -a</div>
<p>There are always <strong>two solutions</strong> (when a &gt; 0), because two numbers on the number line have the same distance from zero.</p>

<div class="example-box">
  <h4>Worked Example 1: Simple Absolute Value</h4>
  <p>Solve: |x| = 7</p>
  <ol class="step-list">
    <li>Apply the principle: x = 7 or x = -7</li>
    <li>Check: |7| = 7 and |-7| = 7. Both work.</li>
  </ol>
</div>

<h3>Solving |expression| = value</h3>
<p>When the absolute value contains an expression, set up two equations:</p>

<div class="example-box">
  <h4>Worked Example 2: Expression Inside</h4>
  <p>Solve: |2x - 3| = 11</p>
  <ol class="step-list">
    <li>Set up two equations: 2x - 3 = 11 &nbsp; or &nbsp; 2x - 3 = -11</li>
    <li>Solve the first: 2x = 14, so x = 7</li>
    <li>Solve the second: 2x = -8, so x = -4</li>
    <li>Check: |2(7) - 3| = |11| = 11. |2(-4) - 3| = |-11| = 11. Both correct.</li>
  </ol>
</div>

<div class="example-box">
  <h4>Worked Example 3: Isolate First</h4>
  <p>Solve: |3x + 1| + 5 = 12</p>
  <ol class="step-list">
    <li>Isolate the absolute value: |3x + 1| = 12 - 5 = 7</li>
    <li>Set up: 3x + 1 = 7 &nbsp; or &nbsp; 3x + 1 = -7</li>
    <li>First equation: 3x = 6, x = 2</li>
    <li>Second equation: 3x = -8, x = -8/3</li>
    <li>Check both in the original equation to verify.</li>
  </ol>
</div>

<h3>Special Cases: No Solution</h3>

<div class="warning-box">
  <h4>Absolute Value Cannot Be Negative</h4>
  <p>If you isolate the absolute value and get |expression| = negative number, the equation has <strong>no solution</strong>. For example, |x + 2| = -3 has no solution because absolute value is never negative.</p>
</div>

<p>One more special case: |expression| = 0 has <strong>exactly one solution</strong>, because the only number with absolute value 0 is 0 itself.</p>

<div class="example-box">
  <h4>Worked Example 4: No-Solution Case</h4>
  <p>Solve: |4x - 1| + 6 = 2</p>
  <ol class="step-list">
    <li>Isolate: |4x - 1| = 2 - 6 = -4</li>
    <li>An absolute value cannot equal -4.</li>
    <li>No solution.</li>
  </ol>
</div>

<div class="tip-box">
  <h4>The Distance Interpretation</h4>
  <p>|x - 5| = 3 means "the distance between x and 5 is 3." On the number line, x is 3 units away from 5, so x = 8 or x = 2. This geometric view can help you set up equations quickly.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Solve: |x| = 12</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>x = 12 or x = -12</p>
  </details>

  <p><strong>2.</strong> Solve: |x + 4| = 9</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>x + 4 = 9 gives x = 5. x + 4 = -9 gives x = -13. Solutions: x = 5 or x = -13.</p>
  </details>

  <p><strong>3.</strong> Solve: |5x - 10| = 0</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>5x - 10 = 0, so 5x = 10, x = 2. One solution: x = 2.</p>
  </details>

  <p><strong>4.</strong> Solve: 2|x - 3| + 1 = 15</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Isolate: 2|x - 3| = 14, so |x - 3| = 7. Then x - 3 = 7 gives x = 10, and x - 3 = -7 gives x = -4. Solutions: x = 10 or x = -4.</p>
  </details>

  <p><strong>5.</strong> Solve: |2x + 6| = -5</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Absolute value cannot be negative. No solution.</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>|expression| = a (where a &gt; 0) gives two equations: expression = a or expression = -a.</li>
  <li>Always isolate the absolute value expression before splitting into two cases.</li>
  <li>If |expression| = negative, there is no solution.</li>
  <li>If |expression| = 0, there is exactly one solution.</li>
  <li>Absolute value represents distance from zero (or distance between values).</li>
</ul>
`,

'R60': `
<h2>Line of Best Fit &amp; Linear Regression</h2>
<p>When real-world data is plotted on a graph, it rarely falls perfectly on a line. But often there is a <strong>trend</strong> -- a general direction. A <strong>line of best fit</strong> (also called a regression line or trend line) is the straight line that best represents the overall pattern in a scatter plot.</p>

<h3>Scatter Plots</h3>
<p>A <strong>scatter plot</strong> displays data as individual points on a coordinate plane. Each point represents a pair of related values (for example, hours studied and test score).</p>

<p>Scatter plots can show different relationships:</p>
<table class="vocab-table">
  <tr><th>Pattern</th><th>Meaning</th><th>Example</th></tr>
  <tr><td>Positive correlation</td><td>As x increases, y tends to increase</td><td>Height vs. shoe size</td></tr>
  <tr><td>Negative correlation</td><td>As x increases, y tends to decrease</td><td>Price vs. demand</td></tr>
  <tr><td>No correlation</td><td>No apparent pattern</td><td>Birthday month vs. GPA</td></tr>
</table>

<h3>Drawing a Line of Best Fit</h3>
<p>When drawing a trend line by hand:</p>
<ul>
  <li>The line should follow the general direction of the data.</li>
  <li>Roughly equal numbers of points should fall above and below the line.</li>
  <li>The line should pass through the "middle" of the data cluster.</li>
  <li>The line does not need to pass through any particular data point.</li>
</ul>

<div class="example-box">
  <h4>Worked Example 1: Using a Line of Best Fit</h4>
  <p>A teacher records hours studied (x) and test scores (y) for 6 students: (1, 52), (2, 58), (3, 65), (4, 71), (5, 74), (6, 82). The line of best fit is approximately y = 5.6x + 47.</p>
  <ol class="step-list">
    <li>Slope interpretation: for each additional hour studied, the score increases by about 5.6 points.</li>
    <li>y-intercept interpretation: a student who studied 0 hours would score about 47 (the baseline).</li>
  </ol>
</div>

<h3>The Least Squares Method (Concept)</h3>
<p>The mathematically "best" line minimizes the total squared vertical distances from each data point to the line. This is called the <strong>least squares</strong> method.</p>
<p>For each data point, the vertical distance to the line is called a <strong>residual</strong>. The least squares line makes the sum of all squared residuals as small as possible. You will typically use a calculator or software to find this line exactly.</p>

<div class="example-box">
  <h4>Worked Example 2: Making a Prediction</h4>
  <p>Using the line y = 5.6x + 47, predict the test score for a student who studies 8 hours.</p>
  <ol class="step-list">
    <li>Substitute x = 8: y = 5.6(8) + 47 = 44.8 + 47 = 91.8</li>
    <li>Predicted score: about 92 points.</li>
  </ol>
</div>

<h3>Interpolation vs. Extrapolation</h3>
<div class="columns-2">
  <div>
    <strong>Interpolation:</strong> predicting within the range of your data. (If data covers x = 1 to 6, predicting at x = 3.5 is interpolation.) Generally reliable.
  </div>
  <div>
    <strong>Extrapolation:</strong> predicting beyond the range of your data. (Predicting at x = 15 from data covering 1-6.) Risky -- the trend may not continue.
  </div>
</div>

<div class="warning-box">
  <h4>Extrapolation Can Be Dangerous</h4>
  <p>Using y = 5.6x + 47 to predict a score for x = 20 hours gives y = 159 -- impossible on a 100-point test! The linear relationship breaks down beyond the data range. Always be cautious with extrapolation.</p>
</div>

<div class="example-box">
  <h4>Worked Example 3: Identifying Correlation</h4>
  <p>Data points: (10, 85), (20, 78), (30, 70), (40, 61), (50, 55). What type of correlation?</p>
  <ol class="step-list">
    <li>As x increases (10, 20, 30, ...), y decreases (85, 78, 70, ...).</li>
    <li>This is a <strong>negative correlation</strong>.</li>
    <li>A reasonable line of best fit: y = -0.75x + 93.</li>
  </ol>
</div>

<div class="tip-box">
  <h4>Correlation Does Not Imply Causation</h4>
  <p>Just because two variables are correlated does not mean one causes the other. Ice cream sales and drowning incidents are both correlated with hot weather, but ice cream does not cause drowning. Always consider whether there is a lurking variable.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> A line of best fit is y = 3x + 10. Predict y when x = 7.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>y = 3(7) + 10 = 21 + 10 = 31</p>
  </details>

  <p><strong>2.</strong> Data shows: as temperature increases, hot chocolate sales decrease. What type of correlation is this?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Negative correlation. As one variable goes up, the other goes down.</p>
  </details>

  <p><strong>3.</strong> A line of best fit is based on data from x = 5 to x = 30. Is predicting at x = 15 interpolation or extrapolation?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Interpolation, because x = 15 falls within the data range (5 to 30).</p>
  </details>

  <p><strong>4.</strong> A regression line has slope -2.5. Interpret this in context if x = advertising dollars (thousands) and y = unsold inventory.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>For every additional $1,000 spent on advertising, unsold inventory decreases by approximately 2.5 units.</p>
  </details>

  <p><strong>5.</strong> Why would predicting y at x = 100 be risky if the data only covers x = 0 to x = 20?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>This is extrapolation far beyond the data range. The linear trend observed between 0 and 20 may not hold at x = 100. The relationship could curve, plateau, or reverse.</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>A scatter plot shows the relationship between two variables as individual points.</li>
  <li>A line of best fit summarizes the trend; the least squares method finds the optimal line.</li>
  <li>The slope tells you the rate of change; the y-intercept is the predicted value when x = 0.</li>
  <li>Interpolation (within data range) is reliable; extrapolation (beyond it) is risky.</li>
  <li>Correlation does not imply causation.</li>
</ul>
`,

'R61': `
<h2>Combinations &amp; Permutations</h2>
<p>How many ways can you arrange a group of objects? How many ways can you choose a team? These questions are at the heart of <strong>counting</strong>, and the answers depend on one critical question: <strong>does order matter?</strong></p>

<h3>The Fundamental Counting Principle</h3>
<p>If one event has <strong>m</strong> outcomes and a second event has <strong>n</strong> outcomes, then together they have <strong>m &times; n</strong> possible outcomes.</p>

<div class="example-box">
  <h4>Worked Example 1: Counting Principle</h4>
  <p>A restaurant offers 4 appetizers, 6 entrees, and 3 desserts. How many different 3-course meals are possible?</p>
  <ol class="step-list">
    <li>Appetizer choices: 4</li>
    <li>Entree choices: 6</li>
    <li>Dessert choices: 3</li>
    <li>Total: 4 &times; 6 &times; 3 = 72 different meals</li>
  </ol>
</div>

<h3>Factorials</h3>
<p>The <strong>factorial</strong> of a positive integer n, written n!, is the product of all positive integers from 1 to n:</p>
<div class="math-display">n! = n &times; (n-1) &times; (n-2) &times; ... &times; 2 &times; 1</div>
<table class="vocab-table">
  <tr><th>n</th><th>n!</th></tr>
  <tr><td>0</td><td>1 (by definition)</td></tr>
  <tr><td>1</td><td>1</td></tr>
  <tr><td>3</td><td>6</td></tr>
  <tr><td>5</td><td>120</td></tr>
  <tr><td>7</td><td>5,040</td></tr>
  <tr><td>10</td><td>3,628,800</td></tr>
</table>

<h3>Permutations: Order Matters</h3>
<p>A <strong>permutation</strong> is an arrangement of objects where <strong>order matters</strong>. Choosing president, vice-president, and treasurer from a group is a permutation problem -- the same three people in different roles count as different outcomes.</p>
<div class="math-display">P(n, r) = n! / (n - r)!</div>
<p>This counts the number of ways to arrange r items chosen from n total items.</p>

<div class="example-box">
  <h4>Worked Example 2: Permutation</h4>
  <p>From 8 runners, how many ways can gold, silver, and bronze medals be awarded?</p>
  <ol class="step-list">
    <li>Order matters (gold is different from silver), so use permutations.</li>
    <li>P(8, 3) = 8! / (8-3)! = 8! / 5!</li>
    <li>= (8 &times; 7 &times; 6 &times; 5!) / 5! = 8 &times; 7 &times; 6 = 336</li>
  </ol>
</div>

<h3>Combinations: Order Does Not Matter</h3>
<p>A <strong>combination</strong> is a selection where <strong>order does not matter</strong>. Choosing 3 people for a committee (no specific roles) is a combination problem -- the same three people in any order form the same committee.</p>
<div class="math-display">C(n, r) = n! / [r! &times; (n - r)!]</div>

<div class="example-box">
  <h4>Worked Example 3: Combination</h4>
  <p>From 10 students, how many ways can a committee of 4 be formed?</p>
  <ol class="step-list">
    <li>Order does not matter, so use combinations.</li>
    <li>C(10, 4) = 10! / (4! &times; 6!)</li>
    <li>= (10 &times; 9 &times; 8 &times; 7) / (4 &times; 3 &times; 2 &times; 1) = 5,040 / 24 = 210</li>
  </ol>
</div>

<div class="tip-box">
  <h4>How to Decide: Permutation or Combination?</h4>
  <p>Ask: "If I rearrange the selected items, do I get a different outcome?" If <strong>yes</strong>, use permutations (order matters). If <strong>no</strong>, use combinations (order does not matter). Assigning roles = permutation. Choosing a group = combination.</p>
</div>

<div class="warning-box">
  <h4>Common Mistake: Forgetting to Divide for Combinations</h4>
  <p>The difference between P(n, r) and C(n, r) is dividing by r!. When order does not matter, many permutations represent the same group. Dividing by r! accounts for duplicate arrangements. Choosing A-B-C is the same committee as C-B-A; there are 3! = 6 ways to arrange 3 people, so we divide by 6.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> A lock has 3 dials, each with digits 0-9. How many possible codes are there?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Fundamental counting principle: 10 &times; 10 &times; 10 = 1,000 codes.</p>
  </details>

  <p><strong>2.</strong> How many ways can 5 books be arranged on a shelf?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>This is P(5, 5) = 5! = 120.</p>
  </details>

  <p><strong>3.</strong> From 12 players, a coach selects 5 starters. How many different starting lineups are possible?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Order does not matter (no assigned positions): C(12, 5) = 12! / (5! &times; 7!) = (12 &times; 11 &times; 10 &times; 9 &times; 8) / 120 = 792.</p>
  </details>

  <p><strong>4.</strong> How many 3-letter "words" (arrangements) can be made from the letters A, B, C, D, E with no repeats?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Order matters: P(5, 3) = 5 &times; 4 &times; 3 = 60.</p>
  </details>

  <p><strong>5.</strong> A pizza shop offers 8 toppings. How many 3-topping pizzas are possible?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Order does not matter: C(8, 3) = 8! / (3! &times; 5!) = (8 &times; 7 &times; 6) / 6 = 56.</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>Fundamental counting principle: multiply the number of options at each stage.</li>
  <li>n! = n &times; (n-1) &times; ... &times; 1, and 0! = 1.</li>
  <li>Permutations (order matters): P(n, r) = n! / (n-r)!</li>
  <li>Combinations (order does not matter): C(n, r) = n! / [r!(n-r)!]</li>
  <li>The key question: does rearranging the selection create a different outcome?</li>
</ul>
`,

'R62': `
<h2>Conditional Probability</h2>
<p>Sometimes the probability of an event changes when you learn new information. The chance of rain tomorrow might be 30% overall, but if you know a storm front is approaching, it might jump to 80%. <strong>Conditional probability</strong> formalizes this idea: what is the probability of event A, given that event B has already occurred?</p>

<h3>The Formula</h3>
<div class="math-display">P(A | B) = P(A and B) / P(B)</div>
<p>Read P(A | B) as "the probability of A given B." The vertical bar means "given that."</p>

<table class="vocab-table">
  <tr><th>Symbol</th><th>Meaning</th></tr>
  <tr><td>P(A | B)</td><td>Probability of A occurring, given B has occurred</td></tr>
  <tr><td>P(A and B)</td><td>Probability that both A and B occur</td></tr>
  <tr><td>P(B)</td><td>Probability of B occurring</td></tr>
</table>

<div class="example-box">
  <h4>Worked Example 1: Basic Conditional Probability</h4>
  <p>A standard deck of 52 cards. You draw one card. Given that it is red, what is the probability it is a heart?</p>
  <ol class="step-list">
    <li>Define events: A = heart, B = red card.</li>
    <li>P(A and B) = P(heart) = 13/52 (all hearts are red).</li>
    <li>P(B) = P(red) = 26/52.</li>
    <li>P(A | B) = (13/52) / (26/52) = 13/26 = 1/2.</li>
  </ol>
  <p>Given that a card is red, there is a 50% chance it is a heart. This makes sense -- half of red cards are hearts.</p>
</div>

<h3>Two-Way Tables</h3>
<p>Two-way tables are an excellent tool for organizing data and computing conditional probabilities.</p>

<div class="example-box">
  <h4>Worked Example 2: Using a Two-Way Table</h4>
  <p>A survey of 200 students asked about pet preferences:</p>
  <table class="vocab-table">
    <tr><th></th><th>Prefers Dogs</th><th>Prefers Cats</th><th>Total</th></tr>
    <tr><td>Boys</td><td>60</td><td>30</td><td>90</td></tr>
    <tr><td>Girls</td><td>50</td><td>60</td><td>110</td></tr>
    <tr><td>Total</td><td>110</td><td>90</td><td>200</td></tr>
  </table>
  <p>Find: P(prefers dogs | girl)</p>
  <ol class="step-list">
    <li>We are given the student is a girl, so the sample space shrinks to the 110 girls.</li>
    <li>Of those 110 girls, 50 prefer dogs.</li>
    <li>P(dogs | girl) = 50/110 = 5/11 &approx; 0.4545 or about 45.5%.</li>
  </ol>
</div>

<h3>Independent vs. Dependent Events</h3>
<p>Two events are <strong>independent</strong> if knowing one occurred does not change the probability of the other:</p>
<div class="math-display">A and B are independent if P(A | B) = P(A)</div>
<p>If P(A | B) differs from P(A), the events are <strong>dependent</strong>.</p>

<div class="example-box">
  <h4>Worked Example 3: Testing Independence</h4>
  <p>Using the pet survey above, is pet preference independent of gender?</p>
  <ol class="step-list">
    <li>P(dogs) = 110/200 = 0.55 (overall)</li>
    <li>P(dogs | girl) = 50/110 &approx; 0.4545</li>
    <li>P(dogs | boy) = 60/90 &approx; 0.6667</li>
    <li>Since 0.4545 and 0.6667 both differ from 0.55, pet preference is <strong>dependent</strong> on gender in this data.</li>
  </ol>
</div>

<h3>Tree Diagrams</h3>
<p>A <strong>tree diagram</strong> visually maps out sequences of events and their probabilities. Each branch represents a possible outcome, and you multiply along branches to find the probability of a path.</p>

<div class="example-box">
  <h4>Worked Example 4: Tree Diagram</h4>
  <p>A bag has 3 red and 2 blue marbles. You draw two without replacement. Find P(2nd is red | 1st was blue).</p>
  <ol class="step-list">
    <li>After drawing a blue marble first, 4 marbles remain: 3 red and 1 blue.</li>
    <li>P(2nd red | 1st blue) = 3/4.</li>
  </ol>
  <p>For the full tree: P(1st blue) = 2/5. Then P(2nd red | 1st blue) = 3/4. So P(blue then red) = (2/5)(3/4) = 6/20 = 3/10.</p>
</div>

<div class="warning-box">
  <h4>Common Mistake: Confusing P(A | B) with P(B | A)</h4>
  <p>P(A | B) and P(B | A) are generally NOT the same. P(rain | cloudy) is not the same as P(cloudy | rain). Most cloudy days do not produce rain, but most rainy days are cloudy. Always check which event is the "given."</p>
</div>

<div class="tip-box">
  <h4>Shrinking the Sample Space</h4>
  <p>A useful way to think about conditional probability: the "given" condition reduces your sample space. Instead of looking at all outcomes, you only look at those where B happened, then ask how many of those also have A.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> A die is rolled. Given that the result is even, what is the probability it is a 6?</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Even outcomes: {2, 4, 6}. Of these, one is a 6. P(6 | even) = 1/3.</p>
  </details>

  <p><strong>2.</strong> In a class of 30 students, 18 play sports and 12 do not. Of those who play sports, 10 have a GPA above 3.5. Of those who do not play sports, 8 have a GPA above 3.5. Find P(GPA &gt; 3.5 | plays sports).</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>Of the 18 who play sports, 10 have GPA &gt; 3.5. P = 10/18 = 5/9 &approx; 0.556.</p>
  </details>

  <p><strong>3.</strong> P(A and B) = 0.12, P(B) = 0.40. Find P(A | B).</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>P(A | B) = 0.12 / 0.40 = 0.30 or 30%.</p>
  </details>

  <p><strong>4.</strong> Are these events independent? P(A) = 0.5, P(B) = 0.3, P(A and B) = 0.15.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>If independent, P(A and B) should equal P(A) &times; P(B) = 0.5 &times; 0.3 = 0.15. It does! The events are independent.</p>
  </details>

  <p><strong>5.</strong> A box has 4 green and 6 yellow balls. Two are drawn without replacement. Find the probability both are green.</p>
  <details class="solution"><summary>Show Solution</summary>
    <p>P(1st green) = 4/10. P(2nd green | 1st green) = 3/9 = 1/3. P(both green) = (4/10)(1/3) = 4/30 = 2/15.</p>
  </details>
</div>

<h3>Lesson Summary</h3>
<ul>
  <li>Conditional probability: P(A | B) = P(A and B) / P(B).</li>
  <li>The "given" condition reduces the sample space.</li>
  <li>Independent events: P(A | B) = P(A). Dependent events: P(A | B) differs from P(A).</li>
  <li>Two-way tables and tree diagrams are effective tools for organizing conditional probability problems.</li>
  <li>P(A | B) is not the same as P(B | A).</li>
</ul>
`

};
