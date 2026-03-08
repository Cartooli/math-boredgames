/**
 * Primer Content – High School Essentials Part 2 (H38–H48)
 * Grades 9-12, 15-minute lessons
 */
module.exports = {

/* ════════════════════════════════════════════════════════════════
   H38 – Exponential Functions & Growth
   ════════════════════════════════════════════════════════════════ */
'H38': `
<h2>Exponential Functions &amp; Growth</h2>
<p>
  Linear functions grow by a constant <em>amount</em> each step. Exponential functions
  grow by a constant <em>factor</em> each step -- and that single difference changes
  everything. Populations explode, investments compound, and radioactive samples
  vanish, all following the same elegant pattern.
</p>

<h3>The Exponential Model</h3>
<p>An exponential function has the form:</p>
<div class="math-display">y = a &middot; b<sup>x</sup></div>
<table class="vocab-table">
  <tr><th>Symbol</th><th>Meaning</th></tr>
  <tr><td>a</td><td>Initial value (y-intercept, when x = 0)</td></tr>
  <tr><td>b</td><td>Base -- the constant multiplier each step</td></tr>
  <tr><td>x</td><td>Exponent (often time)</td></tr>
</table>

<h3>Growth vs. Decay</h3>
<div class="columns-2">
  <div>
    <h4>Growth (b &gt; 1)</h4>
    <p>Each step, the quantity <strong>multiplies</strong> by more than 1, so it increases.</p>
    <p>Example: b = 1.05 means 5% growth per period.</p>
  </div>
  <div>
    <h4>Decay (0 &lt; b &lt; 1)</h4>
    <p>Each step, the quantity <strong>multiplies</strong> by less than 1, so it shrinks.</p>
    <p>Example: b = 0.92 means 8% decay per period.</p>
  </div>
</div>

<div class="tip-box">
  <h4>Connecting Rate to Base</h4>
  <p>If the growth rate is r (as a decimal), then b = 1 + r for growth and b = 1 - r for decay.
  A 7% annual increase means b = 1.07. A 3% annual decrease means b = 0.97.</p>
</div>

<h3>The Number e</h3>
<p>
  The irrational constant <strong>e &asymp; 2.71828...</strong> appears naturally when compounding
  happens continuously. If you invest $1 at 100% interest compounded n times per year,
  the amount approaches e as n grows without bound:
</p>
<div class="math-display">e = lim (1 + 1/n)<sup>n</sup> &asymp; 2.71828</div>
<p>Continuous growth uses the model y = a &middot; e<sup>kt</sup>, where k is the continuous rate.</p>

<h3>Compound Growth</h3>
<p>The compound interest formula is a direct application:</p>
<div class="math-display">A = P(1 + r/n)<sup>nt</sup></div>
<p>
  P = principal, r = annual rate, n = compounding periods per year, t = years, A = final amount.
</p>

<div class="example-box">
  <h4>Worked Example 1 -- Investment</h4>
  <p>You invest $2,000 at 6% annual interest compounded monthly. How much after 5 years?</p>
  <ul class="step-list">
    <li>Identify values: P = 2000, r = 0.06, n = 12, t = 5.</li>
    <li>Substitute: A = 2000(1 + 0.06/12)<sup>12&middot;5</sup> = 2000(1.005)<sup>60</sup>.</li>
    <li>Compute: (1.005)<sup>60</sup> &asymp; 1.34885. So A &asymp; 2000 &times; 1.34885 &asymp; $2,697.70.</li>
  </ul>
</div>

<div class="example-box">
  <h4>Worked Example 2 -- Population</h4>
  <p>A town of 50,000 grows at 2% per year. Write a model and predict the population in 10 years.</p>
  <ul class="step-list">
    <li>Model: P(t) = 50000 &middot; 1.02<sup>t</sup>.</li>
    <li>At t = 10: P(10) = 50000 &middot; 1.02<sup>10</sup> &asymp; 50000 &times; 1.21899 &asymp; 60,950.</li>
  </ul>
</div>

<div class="example-box">
  <h4>Worked Example 3 -- Radioactive Decay</h4>
  <p>A 200 g sample decays at 4% per hour. How much remains after 6 hours?</p>
  <ul class="step-list">
    <li>Model: A(t) = 200 &middot; 0.96<sup>t</sup> (since decay of 4% means b = 1 - 0.04 = 0.96).</li>
    <li>A(6) = 200 &middot; 0.96<sup>6</sup> &asymp; 200 &times; 0.7828 &asymp; 156.6 g.</li>
  </ul>
</div>

<div class="warning-box">
  <h4>Common Mistake</h4>
  <p>Do not confuse the <em>rate</em> with the <em>base</em>. A 5% growth rate does <strong>not</strong>
  mean b = 5 or b = 0.05. It means b = 1.05. Always ask: "What do I multiply by each period?"</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>
  <ol>
    <li>
      Write an exponential model for a bacteria colony that starts at 300 and doubles every hour.
      <details class="solution"><summary>Show Solution</summary>
        <p>Doubling means b = 2. Model: N(t) = 300 &middot; 2<sup>t</sup>, where t is in hours.</p>
      </details>
    </li>
    <li>
      A car worth $25,000 depreciates 15% per year. What is it worth after 3 years?
      <details class="solution"><summary>Show Solution</summary>
        <p>b = 1 - 0.15 = 0.85. V(3) = 25000 &middot; 0.85<sup>3</sup> = 25000 &times; 0.614125 &asymp; $15,353.13.</p>
      </details>
    </li>
    <li>
      $5,000 is invested at 4% annual interest compounded quarterly. Find the amount after 10 years.
      <details class="solution"><summary>Show Solution</summary>
        <p>A = 5000(1 + 0.04/4)<sup>4&middot;10</sup> = 5000(1.01)<sup>40</sup> &asymp; 5000 &times; 1.48886 &asymp; $7,444.32.</p>
      </details>
    </li>
    <li>
      The function f(x) = 800 &middot; (0.75)<sup>x</sup> models a quantity. Is this growth or decay? What percentage change occurs each step?
      <details class="solution"><summary>Show Solution</summary>
        <p>Since b = 0.75 &lt; 1, this is <strong>decay</strong>. The quantity decreases by 25% each step (1 - 0.75 = 0.25).</p>
      </details>
    </li>
    <li>
      A population grows continuously at rate k = 0.03 per year from an initial size of 10,000.
      Find the population after 20 years using P = 10000 &middot; e<sup>0.03&middot;20</sup>.
      <details class="solution"><summary>Show Solution</summary>
        <p>P = 10000 &middot; e<sup>0.6</sup> &asymp; 10000 &times; 1.8221 &asymp; 18,221.</p>
      </details>
    </li>
  </ol>
</div>

<h3>Summary</h3>
<ul>
  <li>Exponential functions have the form y = a &middot; b<sup>x</sup>.</li>
  <li>b &gt; 1 gives growth; 0 &lt; b &lt; 1 gives decay.</li>
  <li>The number e &asymp; 2.718 arises from continuous compounding.</li>
  <li>Compound interest formula: A = P(1 + r/n)<sup>nt</sup>.</li>
</ul>
`,

/* ════════════════════════════════════════════════════════════════
   H39 – Logarithms
   ════════════════════════════════════════════════════════════════ */
'H39': `
<h2>Logarithms</h2>
<p>
  Exponents answer "what do I get when I raise b to a power?" Logarithms ask the
  reverse: "what power do I need?" This inverse relationship makes logarithms the
  essential tool for solving exponential equations.
</p>

<h3>Definition</h3>
<div class="math-display">log<sub>b</sub>(x) = y &nbsp;&nbsp; means &nbsp;&nbsp; b<sup>y</sup> = x</div>
<p>
  In words: "the logarithm base b of x is the exponent you put on b to get x."
</p>

<div class="example-box">
  <h4>Reading Logarithms</h4>
  <p>log<sub>2</sub>(8) = 3 &nbsp;because&nbsp; 2<sup>3</sup> = 8.</p>
  <p>log<sub>5</sub>(25) = 2 &nbsp;because&nbsp; 5<sup>2</sup> = 25.</p>
  <p>log<sub>10</sub>(1000) = 3 &nbsp;because&nbsp; 10<sup>3</sup> = 1000.</p>
</div>

<h3>Common Bases</h3>
<table class="vocab-table">
  <tr><th>Notation</th><th>Base</th><th>Name</th><th>Typical Use</th></tr>
  <tr><td>log(x)</td><td>10</td><td>Common logarithm</td><td>pH scale, decibels, Richter scale</td></tr>
  <tr><td>ln(x)</td><td>e &asymp; 2.718</td><td>Natural logarithm</td><td>Continuous growth, calculus</td></tr>
  <tr><td>log<sub>2</sub>(x)</td><td>2</td><td>Binary logarithm</td><td>Computer science</td></tr>
</table>

<h3>Properties of Logarithms</h3>
<p>These properties follow directly from the exponent rules:</p>
<table class="vocab-table">
  <tr><th>Property</th><th>Rule</th><th>Example</th></tr>
  <tr><td>Product Rule</td><td>log<sub>b</sub>(MN) = log<sub>b</sub>(M) + log<sub>b</sub>(N)</td><td>log(6) = log(2) + log(3)</td></tr>
  <tr><td>Quotient Rule</td><td>log<sub>b</sub>(M/N) = log<sub>b</sub>(M) - log<sub>b</sub>(N)</td><td>log(5) = log(10) - log(2)</td></tr>
  <tr><td>Power Rule</td><td>log<sub>b</sub>(M<sup>p</sup>) = p &middot; log<sub>b</sub>(M)</td><td>log(8) = 3 log(2)</td></tr>
  <tr><td>Identity</td><td>log<sub>b</sub>(b) = 1</td><td>ln(e) = 1</td></tr>
  <tr><td>Zero</td><td>log<sub>b</sub>(1) = 0</td><td>log(1) = 0</td></tr>
  <tr><td>Inverse</td><td>b<sup>log<sub>b</sub>(x)</sup> = x</td><td>10<sup>log(5)</sup> = 5</td></tr>
</table>

<div class="tip-box">
  <h4>Change of Base Formula</h4>
  <p>To evaluate a logarithm in any base using your calculator:</p>
  <div class="math-display">log<sub>b</sub>(x) = log(x) / log(b) = ln(x) / ln(b)</div>
  <p>Example: log<sub>3</sub>(20) = log(20) / log(3) &asymp; 1.3010 / 0.4771 &asymp; 2.727.</p>
</div>

<h3>Solving Exponential Equations</h3>
<p>The key strategy: <strong>take the logarithm of both sides</strong> to bring the exponent down.</p>

<div class="example-box">
  <h4>Worked Example 1</h4>
  <p>Solve: 3<sup>x</sup> = 81.</p>
  <ul class="step-list">
    <li>Recognize that 81 = 3<sup>4</sup>, so x = 4.</li>
  </ul>
  <p>Alternatively: take log of both sides. x &middot; log(3) = log(81), so x = log(81)/log(3) = 4.</p>
</div>

<div class="example-box">
  <h4>Worked Example 2</h4>
  <p>Solve: 5<sup>2x</sup> = 200.</p>
  <ul class="step-list">
    <li>Take the natural log of both sides: ln(5<sup>2x</sup>) = ln(200).</li>
    <li>Power rule: 2x &middot; ln(5) = ln(200).</li>
    <li>Solve: x = ln(200) / (2 ln(5)) &asymp; 5.2983 / (2 &times; 1.6094) &asymp; 5.2983 / 3.2189 &asymp; 1.645.</li>
  </ul>
</div>

<div class="example-box">
  <h4>Worked Example 3</h4>
  <p>How long to double an investment at 6% annual interest compounded yearly?</p>
  <ul class="step-list">
    <li>Set up: 2P = P &middot; 1.06<sup>t</sup>, so 2 = 1.06<sup>t</sup>.</li>
    <li>Take log: log(2) = t &middot; log(1.06).</li>
    <li>Solve: t = log(2) / log(1.06) &asymp; 0.3010 / 0.02531 &asymp; 11.9 years.</li>
  </ul>
</div>

<div class="warning-box">
  <h4>Common Mistake</h4>
  <p>log(a + b) is <strong>NOT</strong> equal to log(a) + log(b). The product rule says
  log(a &middot; b) = log(a) + log(b). There is no simple rule for the log of a sum.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>
  <ol>
    <li>
      Evaluate without a calculator: log<sub>4</sub>(64).
      <details class="solution"><summary>Show Solution</summary>
        <p>4<sup>3</sup> = 64, so log<sub>4</sub>(64) = 3.</p>
      </details>
    </li>
    <li>
      Use properties to expand: log<sub>2</sub>(8x<sup>3</sup>).
      <details class="solution"><summary>Show Solution</summary>
        <p>log<sub>2</sub>(8x<sup>3</sup>) = log<sub>2</sub>(8) + log<sub>2</sub>(x<sup>3</sup>) = 3 + 3 log<sub>2</sub>(x).</p>
      </details>
    </li>
    <li>
      Solve: 2<sup>x</sup> = 50.
      <details class="solution"><summary>Show Solution</summary>
        <p>x = log(50)/log(2) &asymp; 1.6990 / 0.3010 &asymp; 5.644.</p>
      </details>
    </li>
    <li>
      Condense to a single logarithm: 2 log(x) - log(y) + log(z).
      <details class="solution"><summary>Show Solution</summary>
        <p>= log(x<sup>2</sup>) - log(y) + log(z) = log(x<sup>2</sup>z / y).</p>
      </details>
    </li>
    <li>
      A bacteria culture triples every 4 hours. How long until it reaches 10 times its initial size?
      <details class="solution"><summary>Show Solution</summary>
        <p>Model: N = N<sub>0</sub> &middot; 3<sup>t/4</sup>. Set 10 = 3<sup>t/4</sup>.
        Take log: log(10) = (t/4) log(3). So t = 4 log(10)/log(3) = 4 &times; 1 / 0.4771 &asymp; 8.38 hours.</p>
      </details>
    </li>
  </ol>
</div>

<h3>Summary</h3>
<ul>
  <li>log<sub>b</sub>(x) = y means b<sup>y</sup> = x -- logarithms are inverse operations of exponents.</li>
  <li>Key properties: product, quotient, and power rules mirror exponent rules.</li>
  <li>To solve exponential equations, take the log of both sides and use the power rule.</li>
  <li>The change-of-base formula lets you compute any logarithm with a calculator.</li>
</ul>
`,

/* ════════════════════════════════════════════════════════════════
   H40 – Rational Expressions & Equations
   ════════════════════════════════════════════════════════════════ */
'H40': `
<h2>Rational Expressions &amp; Equations</h2>
<p>
  A rational expression is a fraction whose numerator and denominator are polynomials.
  Working with them is essentially working with fractions -- but with variables. The same
  rules you learned for numeric fractions (common denominators, canceling common factors)
  apply here, with one crucial addition: you must watch for values that make the
  denominator zero.
</p>

<h3>Simplifying Rational Expressions</h3>
<p>The strategy: <strong>factor, then cancel common factors</strong>.</p>

<div class="example-box">
  <h4>Worked Example 1 -- Simplifying</h4>
  <p>Simplify: (x<sup>2</sup> - 9) / (x<sup>2</sup> + 5x + 6).</p>
  <ul class="step-list">
    <li>Factor numerator: x<sup>2</sup> - 9 = (x - 3)(x + 3).</li>
    <li>Factor denominator: x<sup>2</sup> + 5x + 6 = (x + 2)(x + 3).</li>
    <li>Cancel the common factor (x + 3): result is (x - 3)/(x + 2), with x &ne; -3, x &ne; -2.</li>
  </ul>
</div>

<h3>Multiplying and Dividing</h3>
<p><strong>Multiplying:</strong> factor everything, cancel common factors across all numerators and denominators, then multiply what remains.</p>
<p><strong>Dividing:</strong> multiply by the reciprocal of the divisor, then proceed as above.</p>

<div class="example-box">
  <h4>Worked Example 2 -- Multiplying</h4>
  <p>Multiply: (x<sup>2</sup> - 4)/(x + 1) &middot; (x + 1)/(x + 2).</p>
  <ul class="step-list">
    <li>Factor: x<sup>2</sup> - 4 = (x - 2)(x + 2).</li>
    <li>Rewrite: [(x - 2)(x + 2)]/(x + 1) &middot; (x + 1)/(x + 2).</li>
    <li>Cancel (x + 1) and (x + 2): result is (x - 2).</li>
  </ul>
</div>

<h3>Adding and Subtracting</h3>
<p>Just like numeric fractions, you need a <strong>common denominator</strong>.</p>
<ul class="step-list">
  <li>Factor each denominator completely.</li>
  <li>Find the LCD (least common denominator): include each factor the maximum number of times it appears.</li>
  <li>Rewrite each fraction with the LCD.</li>
  <li>Combine numerators; simplify.</li>
</ul>

<div class="example-box">
  <h4>Worked Example 3 -- Adding</h4>
  <p>Add: 3/(x - 1) + 2/(x + 4).</p>
  <ul class="step-list">
    <li>LCD = (x - 1)(x + 4).</li>
    <li>Rewrite: 3(x + 4)/[(x - 1)(x + 4)] + 2(x - 1)/[(x - 1)(x + 4)].</li>
    <li>Combine: [3(x + 4) + 2(x - 1)] / [(x - 1)(x + 4)] = (3x + 12 + 2x - 2) / [(x - 1)(x + 4)].</li>
    <li>Simplify numerator: (5x + 10) / [(x - 1)(x + 4)] = 5(x + 2) / [(x - 1)(x + 4)].</li>
  </ul>
</div>

<h3>Solving Rational Equations</h3>
<p>To solve an equation involving rational expressions:</p>
<ul class="step-list">
  <li>Find the LCD of all denominators in the equation.</li>
  <li>Multiply every term on both sides by the LCD to clear all fractions.</li>
  <li>Solve the resulting polynomial equation.</li>
  <li><strong>Check for extraneous solutions</strong> -- any solution that makes a denominator zero must be rejected.</li>
</ul>

<div class="warning-box">
  <h4>Extraneous Solutions -- Do Not Skip This Step</h4>
  <p>When you multiply both sides by an expression containing a variable, you may introduce
  solutions that are not valid. Always substitute your answers back into the <em>original</em>
  equation and verify that no denominator equals zero.</p>
</div>

<div class="example-box">
  <h4>Worked Example 4 -- Solving a Rational Equation</h4>
  <p>Solve: x/(x - 2) = 4/(x - 2) + 1.</p>
  <ul class="step-list">
    <li>LCD = (x - 2). Multiply every term by (x - 2).</li>
    <li>x = 4 + (x - 2).</li>
    <li>x = 4 + x - 2 &rarr; x = x + 2 &rarr; 0 = 2.</li>
    <li>This is a contradiction -- there is <strong>no solution</strong>.</li>
  </ul>
  <p>Note: if we had gotten x = 2, we would reject it because x = 2 makes the denominator zero.</p>
</div>

<div class="tip-box">
  <h4>Factoring First Saves Time</h4>
  <p>Always factor every denominator before finding the LCD. This often reveals common factors
  that make the LCD smaller and the algebra simpler.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>
  <ol>
    <li>
      Simplify: (x<sup>2</sup> - x - 6) / (x<sup>2</sup> - 9).
      <details class="solution"><summary>Show Solution</summary>
        <p>Factor: (x - 3)(x + 2) / (x - 3)(x + 3). Cancel (x - 3): (x + 2)/(x + 3), x &ne; 3.</p>
      </details>
    </li>
    <li>
      Divide: (x<sup>2</sup> - 1)/(x + 3) &div; (x - 1)/(x + 3).
      <details class="solution"><summary>Show Solution</summary>
        <p>Multiply by reciprocal: [(x - 1)(x + 1)/(x + 3)] &middot; [(x + 3)/(x - 1)]. Cancel (x + 3) and (x - 1): result is x + 1.</p>
      </details>
    </li>
    <li>
      Add: 5/(x + 2) + 3/(x - 1).
      <details class="solution"><summary>Show Solution</summary>
        <p>LCD = (x + 2)(x - 1). Result: [5(x - 1) + 3(x + 2)] / [(x + 2)(x - 1)] = (8x + 1)/[(x + 2)(x - 1)].</p>
      </details>
    </li>
    <li>
      Solve: 2/x + 3/(x + 1) = 1.
      <details class="solution"><summary>Show Solution</summary>
        <p>LCD = x(x + 1). Multiply: 2(x + 1) + 3x = x(x + 1).
        2x + 2 + 3x = x<sup>2</sup> + x. So x<sup>2</sup> - 4x - 2 = 0.
        x = (4 &plusmn; &radic;24)/2 = 2 &plusmn; &radic;6. Both values are valid (neither makes a denominator zero).
        x &asymp; 4.449 or x &asymp; -0.449.</p>
      </details>
    </li>
  </ol>
</div>

<h3>Summary</h3>
<ul>
  <li>Factor and cancel to simplify rational expressions.</li>
  <li>Multiply straight across; divide by flipping the second fraction.</li>
  <li>Add and subtract by finding a common denominator.</li>
  <li>Solve rational equations by clearing denominators, then always check for extraneous solutions.</li>
</ul>
`,

/* ════════════════════════════════════════════════════════════════
   H41 – Sequences - Arithmetic
   ════════════════════════════════════════════════════════════════ */
'H41': `
<h2>Arithmetic Sequences</h2>
<p>
  An arithmetic sequence is a list of numbers where each term is obtained by adding the
  same fixed value -- called the <strong>common difference</strong> -- to the previous term.
  These sequences model situations with constant, steady change: saving $50 per week,
  climbing stairs of equal height, or counting by threes.
</p>

<h3>Identifying Arithmetic Sequences</h3>
<p>A sequence is arithmetic if the difference between consecutive terms is always the same.</p>

<div class="columns-2">
  <div>
    <h4>Arithmetic</h4>
    <p>3, 7, 11, 15, 19, ... (d = 4)</p>
    <p>20, 17, 14, 11, 8, ... (d = -3)</p>
  </div>
  <div>
    <h4>NOT Arithmetic</h4>
    <p>2, 4, 8, 16, 32, ... (differences double)</p>
    <p>1, 1, 2, 3, 5, 8, ... (Fibonacci)</p>
  </div>
</div>

<h3>Formulas</h3>
<table class="vocab-table">
  <tr><th>Formula</th><th>Expression</th><th>Use</th></tr>
  <tr><td>Explicit (nth term)</td><td>a<sub>n</sub> = a<sub>1</sub> + (n - 1)d</td><td>Jump directly to any term</td></tr>
  <tr><td>Recursive</td><td>a<sub>n</sub> = a<sub>n-1</sub> + d, with a<sub>1</sub> given</td><td>Define each term from the previous one</td></tr>
  <tr><td>Sum of n terms</td><td>S<sub>n</sub> = n/2 &middot; (a<sub>1</sub> + a<sub>n</sub>)</td><td>Total of the first n terms</td></tr>
</table>

<div class="tip-box">
  <h4>Sum Formula Intuition</h4>
  <p>The sum formula works by pairing the first and last terms (which add to the same value),
  then multiplying by the number of pairs. Gauss famously used this trick as a child to
  sum 1 + 2 + 3 + ... + 100 = 100/2 &times; (1 + 100) = 5,050.</p>
</div>

<div class="example-box">
  <h4>Worked Example 1 -- Finding the nth Term</h4>
  <p>Find the 20th term of the sequence 5, 9, 13, 17, ...</p>
  <ul class="step-list">
    <li>Identify: a<sub>1</sub> = 5, d = 9 - 5 = 4.</li>
    <li>Apply: a<sub>20</sub> = 5 + (20 - 1)(4) = 5 + 76 = 81.</li>
  </ul>
</div>

<div class="example-box">
  <h4>Worked Example 2 -- Finding d and a<sub>1</sub></h4>
  <p>An arithmetic sequence has a<sub>5</sub> = 22 and a<sub>12</sub> = 43. Find d and a<sub>1</sub>.</p>
  <ul class="step-list">
    <li>Use the explicit formula for both known terms:
      a<sub>5</sub> = a<sub>1</sub> + 4d = 22 and a<sub>12</sub> = a<sub>1</sub> + 11d = 43.</li>
    <li>Subtract the first equation from the second: 7d = 21, so d = 3.</li>
    <li>Substitute back: a<sub>1</sub> + 4(3) = 22, so a<sub>1</sub> = 10.</li>
  </ul>
</div>

<div class="example-box">
  <h4>Worked Example 3 -- Sum</h4>
  <p>Find the sum of the first 30 terms of the sequence 2, 5, 8, 11, ...</p>
  <ul class="step-list">
    <li>a<sub>1</sub> = 2, d = 3. Find a<sub>30</sub> = 2 + 29(3) = 89.</li>
    <li>S<sub>30</sub> = 30/2 &times; (2 + 89) = 15 &times; 91 = 1,365.</li>
  </ul>
</div>

<div class="warning-box">
  <h4>Common Mistake</h4>
  <p>In the formula a<sub>n</sub> = a<sub>1</sub> + (n - 1)d, note it is (n - 1), not n.
  The first term a<sub>1</sub> uses zero steps of d. A frequent error is writing
  a<sub>n</sub> = a<sub>1</sub> + nd, which gives you the (n+1)th term instead.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>
  <ol>
    <li>
      Find the 15th term of: -3, 1, 5, 9, ...
      <details class="solution"><summary>Show Solution</summary>
        <p>a<sub>1</sub> = -3, d = 4. a<sub>15</sub> = -3 + 14(4) = -3 + 56 = 53.</p>
      </details>
    </li>
    <li>
      Write the explicit formula for: 100, 93, 86, 79, ...
      <details class="solution"><summary>Show Solution</summary>
        <p>a<sub>1</sub> = 100, d = -7. a<sub>n</sub> = 100 + (n - 1)(-7) = 107 - 7n.</p>
      </details>
    </li>
    <li>
      How many terms are in the sequence 4, 11, 18, ..., 200?
      <details class="solution"><summary>Show Solution</summary>
        <p>a<sub>n</sub> = 4 + (n - 1)(7) = 200. So 7(n - 1) = 196, n - 1 = 28, n = 29.</p>
      </details>
    </li>
    <li>
      Find the sum: 1 + 2 + 3 + ... + 200.
      <details class="solution"><summary>Show Solution</summary>
        <p>S<sub>200</sub> = 200/2 &times; (1 + 200) = 100 &times; 201 = 20,100.</p>
      </details>
    </li>
    <li>
      An arithmetic sequence has a<sub>3</sub> = 14 and a<sub>7</sub> = 30. Find a<sub>10</sub>.
      <details class="solution"><summary>Show Solution</summary>
        <p>From a<sub>3</sub> to a<sub>7</sub>: 4 steps, difference = 30 - 14 = 16, so d = 4.
        a<sub>1</sub> = 14 - 2(4) = 6. a<sub>10</sub> = 6 + 9(4) = 42.</p>
      </details>
    </li>
  </ol>
</div>

<h3>Summary</h3>
<ul>
  <li>Arithmetic sequences have a constant common difference d.</li>
  <li>Explicit formula: a<sub>n</sub> = a<sub>1</sub> + (n - 1)d.</li>
  <li>Sum formula: S<sub>n</sub> = n/2 &middot; (a<sub>1</sub> + a<sub>n</sub>).</li>
  <li>Use two known terms to find d and a<sub>1</sub> via a system of equations.</li>
</ul>
`,

/* ════════════════════════════════════════════════════════════════
   H42 – Sequences - Geometric
   ════════════════════════════════════════════════════════════════ */
'H42': `
<h2>Geometric Sequences</h2>
<p>
  While arithmetic sequences grow by adding, geometric sequences grow by
  <strong>multiplying</strong>. Each term is obtained by multiplying the previous term
  by a fixed value called the <strong>common ratio</strong>. This multiplicative pattern
  appears in compound interest, population dynamics, fractal geometry, and signal
  processing.
</p>

<h3>Identifying Geometric Sequences</h3>
<p>A sequence is geometric if the ratio between consecutive terms is always the same:</p>
<div class="math-display">r = a<sub>n+1</sub> / a<sub>n</sub> &nbsp;(constant for all n)</div>

<div class="columns-2">
  <div>
    <h4>Geometric</h4>
    <p>3, 6, 12, 24, ... (r = 2)</p>
    <p>100, 50, 25, 12.5, ... (r = 0.5)</p>
  </div>
  <div>
    <h4>NOT Geometric</h4>
    <p>2, 5, 8, 11, ... (constant difference, not ratio)</p>
    <p>1, 4, 9, 16, ... (perfect squares)</p>
  </div>
</div>

<h3>Formulas</h3>
<table class="vocab-table">
  <tr><th>Formula</th><th>Expression</th><th>Use</th></tr>
  <tr><td>Explicit (nth term)</td><td>a<sub>n</sub> = a<sub>1</sub> &middot; r<sup>(n-1)</sup></td><td>Jump to any term</td></tr>
  <tr><td>Recursive</td><td>a<sub>n</sub> = a<sub>n-1</sub> &middot; r, with a<sub>1</sub> given</td><td>Each term from the previous</td></tr>
  <tr><td>Partial sum (r &ne; 1)</td><td>S<sub>n</sub> = a<sub>1</sub>(1 - r<sup>n</sup>) / (1 - r)</td><td>Sum of the first n terms</td></tr>
  <tr><td>Infinite sum (|r| &lt; 1)</td><td>S = a<sub>1</sub> / (1 - r)</td><td>Sum of all terms when series converges</td></tr>
</table>

<div class="example-box">
  <h4>Worked Example 1 -- Finding Terms</h4>
  <p>Find the 8th term of the sequence 5, 15, 45, 135, ...</p>
  <ul class="step-list">
    <li>Identify: a<sub>1</sub> = 5, r = 15/5 = 3.</li>
    <li>Apply: a<sub>8</sub> = 5 &middot; 3<sup>7</sup> = 5 &middot; 2187 = 10,935.</li>
  </ul>
</div>

<div class="example-box">
  <h4>Worked Example 2 -- Partial Sum</h4>
  <p>Find the sum of the first 6 terms of: 4, 12, 36, 108, ...</p>
  <ul class="step-list">
    <li>a<sub>1</sub> = 4, r = 3, n = 6.</li>
    <li>S<sub>6</sub> = 4(1 - 3<sup>6</sup>) / (1 - 3) = 4(1 - 729) / (-2) = 4(-728)/(-2) = 1,456.</li>
  </ul>
</div>

<div class="example-box">
  <h4>Worked Example 3 -- Infinite Series</h4>
  <p>Find the sum: 18 + 6 + 2 + 2/3 + ...</p>
  <ul class="step-list">
    <li>a<sub>1</sub> = 18, r = 6/18 = 1/3. Since |1/3| &lt; 1, the series converges.</li>
    <li>S = 18 / (1 - 1/3) = 18 / (2/3) = 18 &times; 3/2 = 27.</li>
  </ul>
</div>

<div class="tip-box">
  <h4>Repeating Decimals as Infinite Series</h4>
  <p>The repeating decimal 0.333... = 3/10 + 3/100 + 3/1000 + ... is an infinite geometric
  series with a<sub>1</sub> = 0.3 and r = 0.1. Sum = 0.3/(1 - 0.1) = 0.3/0.9 = 1/3. This technique
  proves that every repeating decimal is a fraction.</p>
</div>

<div class="warning-box">
  <h4>Common Mistake</h4>
  <p>The infinite sum formula S = a<sub>1</sub>/(1 - r) <strong>only works when |r| &lt; 1</strong>.
  If |r| &ge; 1, the terms do not shrink toward zero and the sum diverges -- it grows
  without bound.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>
  <ol>
    <li>
      Find the 6th term of: 2, -6, 18, -54, ...
      <details class="solution"><summary>Show Solution</summary>
        <p>a<sub>1</sub> = 2, r = -3. a<sub>6</sub> = 2 &middot; (-3)<sup>5</sup> = 2 &middot; (-243) = -486.</p>
      </details>
    </li>
    <li>
      Write the explicit formula for: 1000, 500, 250, 125, ...
      <details class="solution"><summary>Show Solution</summary>
        <p>a<sub>1</sub> = 1000, r = 0.5. a<sub>n</sub> = 1000 &middot; (0.5)<sup>n-1</sup>.</p>
      </details>
    </li>
    <li>
      Find the sum of the first 5 terms of: 1, 1/2, 1/4, 1/8, 1/16.
      <details class="solution"><summary>Show Solution</summary>
        <p>S<sub>5</sub> = 1(1 - (1/2)<sup>5</sup>) / (1 - 1/2) = (1 - 1/32)/(1/2) = (31/32)/(1/2) = 31/16 = 1.9375.</p>
      </details>
    </li>
    <li>
      Find the sum of the infinite series: 24 + 12 + 6 + 3 + ...
      <details class="solution"><summary>Show Solution</summary>
        <p>a<sub>1</sub> = 24, r = 1/2. S = 24/(1 - 1/2) = 24/(1/2) = 48.</p>
      </details>
    </li>
    <li>
      A ball is dropped from 80 feet and bounces to 60% of its previous height each time.
      What is the total distance it travels (up and down) before coming to rest?
      <details class="solution"><summary>Show Solution</summary>
        <p>Down distances: 80, 48, 28.8, ... (a<sub>1</sub> = 80, r = 0.6).
        Up distances: 48, 28.8, ... (a<sub>1</sub> = 48, r = 0.6).
        Total = 80/(1 - 0.6) + 48/(1 - 0.6) = 200 + 120 = 320 feet.
        Alternatively: first drop of 80, then twice each bounce: total = 80 + 2(48)/(1 - 0.6) = 80 + 240 = 320 feet.</p>
      </details>
    </li>
  </ol>
</div>

<h3>Summary</h3>
<ul>
  <li>Geometric sequences have a constant common ratio r.</li>
  <li>Explicit formula: a<sub>n</sub> = a<sub>1</sub> &middot; r<sup>n-1</sup>.</li>
  <li>Partial sum: S<sub>n</sub> = a<sub>1</sub>(1 - r<sup>n</sup>)/(1 - r).</li>
  <li>Infinite sum (|r| &lt; 1): S = a<sub>1</sub>/(1 - r).</li>
</ul>
`,

/* ════════════════════════════════════════════════════════════════
   H43 – Right Triangle Trigonometry
   ════════════════════════════════════════════════════════════════ */
'H43': `
<h2>Right Triangle Trigonometry</h2>
<p>
  Trigonometry begins with a simple idea: the ratios of sides in a right triangle depend
  only on the angles, not on the triangle's size. This insight lets you calculate distances
  you cannot measure directly -- the height of a building, the width of a canyon, or the
  distance to a star.
</p>

<h3>The Three Trigonometric Ratios</h3>
<p>For a right triangle with an acute angle &theta;:</p>

<div class="math-display">
  sin(&theta;) = opposite / hypotenuse &nbsp;&nbsp;&nbsp;
  cos(&theta;) = adjacent / hypotenuse &nbsp;&nbsp;&nbsp;
  tan(&theta;) = opposite / adjacent
</div>

<div class="tip-box">
  <h4>SOH-CAH-TOA</h4>
  <p>This mnemonic captures all three ratios:</p>
  <p><strong>S</strong>ine = <strong>O</strong>pposite / <strong>H</strong>ypotenuse,
     <strong>C</strong>osine = <strong>A</strong>djacent / <strong>H</strong>ypotenuse,
     <strong>T</strong>angent = <strong>O</strong>pposite / <strong>A</strong>djacent.</p>
  <p>"Opposite" and "adjacent" are always relative to the angle you are working with.
  The hypotenuse is always the longest side, opposite the right angle.</p>
</div>

<h3>Finding Missing Sides</h3>
<p>When you know one acute angle and one side, you can find any other side using the appropriate ratio.</p>

<div class="example-box">
  <h4>Worked Example 1 -- Finding a Side</h4>
  <p>A right triangle has an angle of 35&deg; and the hypotenuse is 20 cm. Find the side opposite the 35&deg; angle.</p>
  <ul class="step-list">
    <li>Identify: we want the opposite side, and we know the hypotenuse. Use sine.</li>
    <li>sin(35&deg;) = opposite / 20.</li>
    <li>opposite = 20 &middot; sin(35&deg;) &asymp; 20 &times; 0.5736 &asymp; 11.47 cm.</li>
  </ul>
</div>

<h3>Finding Missing Angles</h3>
<p>When you know two sides, use the <strong>inverse trigonometric functions</strong> (sin<sup>-1</sup>, cos<sup>-1</sup>, tan<sup>-1</sup>) to find the angle.</p>

<div class="example-box">
  <h4>Worked Example 2 -- Finding an Angle</h4>
  <p>A right triangle has legs of length 7 and 10. Find the angle opposite the side of length 7.</p>
  <ul class="step-list">
    <li>tan(&theta;) = opposite/adjacent = 7/10 = 0.7.</li>
    <li>&theta; = tan<sup>-1</sup>(0.7) &asymp; 34.99&deg; &asymp; 35.0&deg;.</li>
  </ul>
</div>

<h3>Real-World Applications</h3>
<div class="example-box">
  <h4>Worked Example 3 -- Height of a Tree</h4>
  <p>You stand 40 meters from the base of a tree. Looking up to the top, the angle of
  elevation is 28&deg;. How tall is the tree?</p>
  <ul class="step-list">
    <li>The 40 m distance is adjacent to the 28&deg; angle; the tree height is opposite.</li>
    <li>tan(28&deg;) = height / 40.</li>
    <li>height = 40 &middot; tan(28&deg;) &asymp; 40 &times; 0.5317 &asymp; 21.3 m.</li>
  </ul>
</div>

<h3>Special Right Triangles</h3>
<div class="columns-2">
  <div>
    <h4>45-45-90 Triangle</h4>
    <p>Sides in ratio 1 : 1 : &radic;2.</p>
    <p>sin(45&deg;) = cos(45&deg;) = &radic;2/2 &asymp; 0.707</p>
    <p>tan(45&deg;) = 1</p>
  </div>
  <div>
    <h4>30-60-90 Triangle</h4>
    <p>Sides in ratio 1 : &radic;3 : 2.</p>
    <p>sin(30&deg;) = 1/2, cos(30&deg;) = &radic;3/2</p>
    <p>sin(60&deg;) = &radic;3/2, cos(60&deg;) = 1/2</p>
  </div>
</div>

<div class="warning-box">
  <h4>Common Mistake</h4>
  <p>Mixing up "opposite" and "adjacent." These labels change depending on <em>which angle</em>
  you are working with. Always label the triangle from the perspective of your chosen angle
  before setting up the ratio.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>
  <ol>
    <li>
      A right triangle has a 50&deg; angle and the adjacent side is 12 cm. Find the opposite side.
      <details class="solution"><summary>Show Solution</summary>
        <p>tan(50&deg;) = opp/12. opp = 12 &middot; tan(50&deg;) &asymp; 12 &times; 1.1918 &asymp; 14.3 cm.</p>
      </details>
    </li>
    <li>
      A ladder 15 feet long leans against a wall at a 70&deg; angle with the ground. How high up the wall does it reach?
      <details class="solution"><summary>Show Solution</summary>
        <p>sin(70&deg;) = height/15. height = 15 sin(70&deg;) &asymp; 15 &times; 0.9397 &asymp; 14.1 feet.</p>
      </details>
    </li>
    <li>
      A right triangle has legs 5 and 12. Find all three angles.
      <details class="solution"><summary>Show Solution</summary>
        <p>Hypotenuse = &radic;(25 + 144) = 13. Angle opposite the 5: sin<sup>-1</sup>(5/13) &asymp; 22.6&deg;. Angle opposite the 12: sin<sup>-1</sup>(12/13) &asymp; 67.4&deg;. Third angle = 90&deg;.</p>
      </details>
    </li>
    <li>
      From the top of a 60 m cliff, the angle of depression to a boat is 22&deg;. How far is the boat from the base of the cliff?
      <details class="solution"><summary>Show Solution</summary>
        <p>The angle of depression equals the angle of elevation from the boat. tan(22&deg;) = 60/d. d = 60/tan(22&deg;) &asymp; 60/0.4040 &asymp; 148.5 m.</p>
      </details>
    </li>
  </ol>
</div>

<h3>Summary</h3>
<ul>
  <li>SOH-CAH-TOA defines sine, cosine, and tangent as ratios of sides in a right triangle.</li>
  <li>Use trig ratios to find missing sides when you know an angle and a side.</li>
  <li>Use inverse trig functions to find angles when you know two sides.</li>
  <li>Special triangles (30-60-90 and 45-45-90) give exact values for common angles.</li>
</ul>
`,

/* ════════════════════════════════════════════════════════════════
   H44 – Unit Circle & Angle Measure
   ════════════════════════════════════════════════════════════════ */
'H44': `
<h2>Unit Circle &amp; Angle Measure</h2>
<p>
  Right-triangle trigonometry is limited to angles between 0&deg; and 90&deg;. The
  <strong>unit circle</strong> extends sine and cosine to <em>all</em> angles, opening
  the door to modeling waves, rotations, and periodic phenomena.
</p>

<h3>The Unit Circle</h3>
<p>
  The unit circle is a circle of radius 1 centered at the origin. An angle &theta; is
  measured from the positive x-axis, counter-clockwise. The point where the terminal side
  of the angle meets the circle has coordinates:
</p>
<div class="math-display">(cos &theta;, sin &theta;)</div>
<p>
  This means: <strong>cos &theta; is the x-coordinate</strong> and <strong>sin &theta; is
  the y-coordinate</strong> of the point on the unit circle.
</p>

<h3>Radians vs. Degrees</h3>
<p>
  A <strong>radian</strong> measures angle by arc length: an angle of 1 radian subtends
  an arc of length 1 on the unit circle. Since the full circumference is 2&pi;, a full
  revolution is 2&pi; radians.
</p>

<div class="math-display">360&deg; = 2&pi; rad &nbsp;&nbsp;&nbsp; 180&deg; = &pi; rad</div>

<h4>Conversion Formulas</h4>
<div class="columns-2">
  <div>
    <p><strong>Degrees to Radians:</strong></p>
    <div class="math-display">radians = degrees &times; &pi;/180</div>
  </div>
  <div>
    <p><strong>Radians to Degrees:</strong></p>
    <div class="math-display">degrees = radians &times; 180/&pi;</div>
  </div>
</div>

<div class="example-box">
  <h4>Worked Example 1 -- Converting</h4>
  <p>Convert 150&deg; to radians and &pi;/3 to degrees.</p>
  <ul class="step-list">
    <li>150&deg; &times; &pi;/180 = 150&pi;/180 = 5&pi;/6 radians.</li>
    <li>&pi;/3 &times; 180/&pi; = 180/3 = 60&deg;.</li>
  </ul>
</div>

<h3>Key Angles on the Unit Circle</h3>
<table class="vocab-table">
  <tr><th>Degrees</th><th>Radians</th><th>cos &theta;</th><th>sin &theta;</th></tr>
  <tr><td>0&deg;</td><td>0</td><td>1</td><td>0</td></tr>
  <tr><td>30&deg;</td><td>&pi;/6</td><td>&radic;3/2</td><td>1/2</td></tr>
  <tr><td>45&deg;</td><td>&pi;/4</td><td>&radic;2/2</td><td>&radic;2/2</td></tr>
  <tr><td>60&deg;</td><td>&pi;/3</td><td>1/2</td><td>&radic;3/2</td></tr>
  <tr><td>90&deg;</td><td>&pi;/2</td><td>0</td><td>1</td></tr>
  <tr><td>180&deg;</td><td>&pi;</td><td>-1</td><td>0</td></tr>
  <tr><td>270&deg;</td><td>3&pi;/2</td><td>0</td><td>-1</td></tr>
  <tr><td>360&deg;</td><td>2&pi;</td><td>1</td><td>0</td></tr>
</table>

<div class="tip-box">
  <h4>Memorizing the First Quadrant</h4>
  <p>For angles 0&deg;, 30&deg;, 45&deg;, 60&deg;, 90&deg;, the sine values follow the pattern
  &radic;0/2, &radic;1/2, &radic;2/2, &radic;3/2, &radic;4/2 -- that is, 0, 1/2, &radic;2/2,
  &radic;3/2, 1. The cosine values are the same sequence in reverse order.</p>
</div>

<div class="example-box">
  <h4>Worked Example 2 -- Coordinates on the Unit Circle</h4>
  <p>Find the exact coordinates of the point at 225&deg; on the unit circle.</p>
  <ul class="step-list">
    <li>225&deg; = 180&deg; + 45&deg;, so the reference angle is 45&deg;. The point is in Quadrant III.</li>
    <li>In Q III, both x and y are negative: (cos 225&deg;, sin 225&deg;) = (-&radic;2/2, -&radic;2/2).</li>
  </ul>
</div>

<div class="example-box">
  <h4>Worked Example 3 -- Evaluating with the Unit Circle</h4>
  <p>Find sin(5&pi;/6) and cos(5&pi;/6).</p>
  <ul class="step-list">
    <li>5&pi;/6 radians = 150&deg;. Reference angle = 180&deg; - 150&deg; = 30&deg;. Quadrant II.</li>
    <li>sin(150&deg;) = sin(30&deg;) = 1/2 (positive in Q II).</li>
    <li>cos(150&deg;) = -cos(30&deg;) = -&radic;3/2 (negative in Q II).</li>
  </ul>
</div>

<div class="warning-box">
  <h4>Common Mistake</h4>
  <p>Forgetting to check the quadrant when using reference angles. The reference angle gives
  the <em>magnitude</em> of sin and cos, but the <em>sign</em> depends on the quadrant:
  All positive in Q I, Sine in Q II, Tangent in Q III, Cosine in Q IV (mnemonic: All Students Take Calculus).</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>
  <ol>
    <li>
      Convert 240&deg; to radians.
      <details class="solution"><summary>Show Solution</summary>
        <p>240 &times; &pi;/180 = 4&pi;/3 radians.</p>
      </details>
    </li>
    <li>
      Convert 7&pi;/4 to degrees.
      <details class="solution"><summary>Show Solution</summary>
        <p>7&pi;/4 &times; 180/&pi; = 7 &times; 45 = 315&deg;.</p>
      </details>
    </li>
    <li>
      Find sin(120&deg;) and cos(120&deg;) exactly.
      <details class="solution"><summary>Show Solution</summary>
        <p>Reference angle = 60&deg;, Q II. sin(120&deg;) = &radic;3/2, cos(120&deg;) = -1/2.</p>
      </details>
    </li>
    <li>
      What are the coordinates of the point at 3&pi;/4 on the unit circle?
      <details class="solution"><summary>Show Solution</summary>
        <p>3&pi;/4 = 135&deg;. Reference angle = 45&deg;, Q II. Coordinates: (-&radic;2/2, &radic;2/2).</p>
      </details>
    </li>
    <li>
      An angle of 2 radians -- is it larger or smaller than 90&deg;? Explain.
      <details class="solution"><summary>Show Solution</summary>
        <p>2 rad &times; 180/&pi; &asymp; 114.6&deg;. It is larger than 90&deg; -- the angle lies in Quadrant II.</p>
      </details>
    </li>
  </ol>
</div>

<h3>Summary</h3>
<ul>
  <li>The unit circle defines cos &theta; and sin &theta; as coordinates of a point.</li>
  <li>Radians measure angle by arc length; 180&deg; = &pi; radians.</li>
  <li>Key angles and their coordinates should be memorized.</li>
  <li>Reference angles + quadrant signs let you evaluate trig functions at any angle.</li>
</ul>
`,

/* ════════════════════════════════════════════════════════════════
   H45 – Basic Trigonometric Functions
   ════════════════════════════════════════════════════════════════ */
'H45': `
<h2>Basic Trigonometric Functions</h2>
<p>
  When you extend the unit circle idea and let the angle &theta; keep increasing (or
  decreasing), the sine and cosine values repeat in a beautiful, wave-like pattern. These
  are the <strong>trigonometric functions</strong> -- mathematical models for anything that
  cycles: sound waves, tides, heartbeats, seasons, alternating current.
</p>

<h3>Sine and Cosine as Functions</h3>
<p>The functions y = sin(x) and y = cos(x) have these key properties:</p>
<table class="vocab-table">
  <tr><th>Property</th><th>sin(x)</th><th>cos(x)</th></tr>
  <tr><td>Domain</td><td>All real numbers</td><td>All real numbers</td></tr>
  <tr><td>Range</td><td>[-1, 1]</td><td>[-1, 1]</td></tr>
  <tr><td>Period</td><td>2&pi;</td><td>2&pi;</td></tr>
  <tr><td>Amplitude</td><td>1</td><td>1</td></tr>
  <tr><td>y-intercept</td><td>0</td><td>1</td></tr>
  <tr><td>Symmetry</td><td>Odd: sin(-x) = -sin(x)</td><td>Even: cos(-x) = cos(x)</td></tr>
</table>

<h3>The Tangent Function</h3>
<p>tan(x) = sin(x)/cos(x). It is undefined wherever cos(x) = 0 (at x = &pi;/2 + n&pi;).</p>
<table class="vocab-table">
  <tr><th>Property</th><th>tan(x)</th></tr>
  <tr><td>Domain</td><td>All real numbers except x = &pi;/2 + n&pi;</td></tr>
  <tr><td>Range</td><td>All real numbers (-&infin;, +&infin;)</td></tr>
  <tr><td>Period</td><td>&pi;</td></tr>
  <tr><td>Vertical asymptotes</td><td>At x = &pi;/2 + n&pi;</td></tr>
</table>

<h3>Transformations: Amplitude, Period, Phase Shift</h3>
<p>The general sinusoidal function is:</p>
<div class="math-display">y = A sin(B(x - C)) + D &nbsp;&nbsp;or&nbsp;&nbsp; y = A cos(B(x - C)) + D</div>
<table class="vocab-table">
  <tr><th>Parameter</th><th>Effect</th></tr>
  <tr><td>A (amplitude)</td><td>Vertical stretch. The wave oscillates between D - |A| and D + |A|.</td></tr>
  <tr><td>B</td><td>Affects period: period = 2&pi;/|B|. Larger B means faster oscillation.</td></tr>
  <tr><td>C (phase shift)</td><td>Horizontal shift. Positive C shifts the graph right.</td></tr>
  <tr><td>D (vertical shift)</td><td>Moves the midline up (positive D) or down (negative D).</td></tr>
</table>

<div class="example-box">
  <h4>Worked Example 1 -- Reading a Graph</h4>
  <p>Identify the amplitude, period, and midline of y = 3 sin(2x) + 1.</p>
  <ul class="step-list">
    <li>Amplitude = |A| = 3. The wave extends 3 units above and below the midline.</li>
    <li>Period = 2&pi;/|B| = 2&pi;/2 = &pi;. One full cycle completes every &pi; units.</li>
    <li>Midline: y = D = 1. The wave oscillates between 1 - 3 = -2 and 1 + 3 = 4.</li>
  </ul>
</div>

<div class="example-box">
  <h4>Worked Example 2 -- Writing an Equation</h4>
  <p>A wave has amplitude 5, period 4&pi;, and is shifted up by 2. Write its equation using cosine.</p>
  <ul class="step-list">
    <li>A = 5, D = 2.</li>
    <li>Period = 2&pi;/B = 4&pi;, so B = 2&pi;/(4&pi;) = 1/2.</li>
    <li>No phase shift mentioned, so C = 0. Equation: y = 5 cos(x/2) + 2.</li>
  </ul>
</div>

<div class="example-box">
  <h4>Worked Example 3 -- Phase Shift</h4>
  <p>Describe the transformation from y = sin(x) to y = sin(x - &pi;/4).</p>
  <ul class="step-list">
    <li>This is a phase shift of &pi;/4 to the right. Every feature of the sine curve
    (peaks, zeros, troughs) moves &pi;/4 units to the right.</li>
  </ul>
</div>

<div class="tip-box">
  <h4>Connecting Sine and Cosine</h4>
  <p>Cosine is just sine shifted left by &pi;/2: cos(x) = sin(x + &pi;/2). They are the
  <em>same</em> wave at different starting points. When modeling real-world cycles, pick
  whichever makes your equation simpler.</p>
</div>

<div class="warning-box">
  <h4>Common Mistake</h4>
  <p>Confusing the "B" value with the period. The period is 2&pi;/<strong>divided by</strong> B,
  not multiplied. If B = 3, the period is 2&pi;/3 (shorter, faster oscillation), not 6&pi;.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>
  <ol>
    <li>
      State the amplitude, period, and midline of y = -2 cos(3x) - 4.
      <details class="solution"><summary>Show Solution</summary>
        <p>Amplitude = |-2| = 2. Period = 2&pi;/3. Midline: y = -4. Range: [-6, -2].</p>
      </details>
    </li>
    <li>
      Write the equation of a sine function with amplitude 4, period &pi;, and no vertical shift.
      <details class="solution"><summary>Show Solution</summary>
        <p>B = 2&pi;/&pi; = 2. Equation: y = 4 sin(2x).</p>
      </details>
    </li>
    <li>
      What is the period of y = tan(x/2)?
      <details class="solution"><summary>Show Solution</summary>
        <p>Period of tangent = &pi;/|B| = &pi;/(1/2) = 2&pi;.</p>
      </details>
    </li>
    <li>
      Sketch or describe one full cycle of y = sin(x) starting at x = 0. Where are the
      zeros, maximum, and minimum?
      <details class="solution"><summary>Show Solution</summary>
        <p>Zeros at x = 0, &pi;, 2&pi;. Maximum of 1 at x = &pi;/2. Minimum of -1 at x = 3&pi;/2.</p>
      </details>
    </li>
    <li>
      The function y = 3 sin(2(x - &pi;/6)) + 1 has what phase shift?
      <details class="solution"><summary>Show Solution</summary>
        <p>Phase shift = C = &pi;/6 to the right.</p>
      </details>
    </li>
  </ol>
</div>

<h3>Summary</h3>
<ul>
  <li>sin(x) and cos(x) are periodic functions with period 2&pi; and range [-1, 1].</li>
  <li>tan(x) has period &pi; and vertical asymptotes where cos(x) = 0.</li>
  <li>The general form y = A sin(B(x - C)) + D controls amplitude, period, phase shift, and vertical shift.</li>
  <li>Period = 2&pi;/|B| for sine and cosine; &pi;/|B| for tangent.</li>
</ul>
`,

/* ════════════════════════════════════════════════════════════════
   H46 – Probability Fundamentals
   ════════════════════════════════════════════════════════════════ */
'H46': `
<h2>Probability Fundamentals</h2>
<p>
  Probability is the mathematics of uncertainty. It gives us a precise language for
  reasoning about chance events -- from card games to weather forecasting to medical
  testing. Every probability is a number between 0 (impossible) and 1 (certain).
</p>

<h3>Core Definitions</h3>
<table class="vocab-table">
  <tr><th>Term</th><th>Definition</th><th>Example</th></tr>
  <tr><td>Experiment</td><td>A process with uncertain outcomes</td><td>Rolling a die</td></tr>
  <tr><td>Sample space (S)</td><td>The set of all possible outcomes</td><td>S = {1, 2, 3, 4, 5, 6}</td></tr>
  <tr><td>Event (A)</td><td>A subset of the sample space</td><td>A = "rolling even" = {2, 4, 6}</td></tr>
  <tr><td>P(A)</td><td>Probability of event A</td><td>P(A) = 3/6 = 1/2</td></tr>
</table>

<div class="math-display">P(A) = number of favorable outcomes / total number of outcomes</div>
<p>(This formula applies when all outcomes are equally likely.)</p>

<h3>Fundamental Rules</h3>

<h4>Complement Rule</h4>
<div class="math-display">P(not A) = 1 - P(A)</div>
<p>The probability something does NOT happen equals 1 minus the probability it does happen.</p>

<h4>Addition Rule (OR)</h4>
<div class="math-display">P(A or B) = P(A) + P(B) - P(A and B)</div>
<p>We subtract P(A and B) to avoid double-counting outcomes in both events.</p>
<p>If A and B are <strong>mutually exclusive</strong> (cannot happen simultaneously), then P(A and B) = 0:</p>
<div class="math-display">P(A or B) = P(A) + P(B) &nbsp;&nbsp;(mutually exclusive events)</div>

<h4>Multiplication Rule (AND)</h4>
<div class="math-display">P(A and B) = P(A) &times; P(B|A)</div>
<p>If A and B are <strong>independent</strong> (one does not affect the other), then P(B|A) = P(B):</p>
<div class="math-display">P(A and B) = P(A) &times; P(B) &nbsp;&nbsp;(independent events)</div>

<div class="tip-box">
  <h4>Independent vs. Dependent Events</h4>
  <p><strong>Independent:</strong> flipping a coin twice -- the second flip is not affected by the first.</p>
  <p><strong>Dependent:</strong> drawing two cards without replacement -- the second draw depends on the first.</p>
</div>

<h3>Counting Principle</h3>
<p>If one task can be done in m ways and a second task in n ways, the two tasks together
can be done in m &times; n ways.</p>

<div class="example-box">
  <h4>Worked Example 1 -- Basic Probability</h4>
  <p>A bag contains 4 red, 3 blue, and 5 green marbles. What is P(blue)?</p>
  <ul class="step-list">
    <li>Total marbles = 4 + 3 + 5 = 12.</li>
    <li>P(blue) = 3/12 = 1/4 = 0.25.</li>
  </ul>
</div>

<div class="example-box">
  <h4>Worked Example 2 -- Addition Rule</h4>
  <p>In a standard deck of 52 cards, what is P(heart or face card)?</p>
  <ul class="step-list">
    <li>P(heart) = 13/52. P(face card) = 12/52. P(heart AND face card) = 3/52 (J, Q, K of hearts).</li>
    <li>P(heart or face card) = 13/52 + 12/52 - 3/52 = 22/52 = 11/26 &asymp; 0.423.</li>
  </ul>
</div>

<div class="example-box">
  <h4>Worked Example 3 -- Independent Events</h4>
  <p>A fair coin is flipped 3 times. What is P(all heads)?</p>
  <ul class="step-list">
    <li>Each flip is independent with P(H) = 1/2.</li>
    <li>P(HHH) = 1/2 &times; 1/2 &times; 1/2 = 1/8 = 0.125.</li>
  </ul>
</div>

<div class="warning-box">
  <h4>Common Mistake</h4>
  <p>Adding probabilities for "or" without subtracting the overlap. If events can happen
  simultaneously, you must use P(A or B) = P(A) + P(B) - P(A and B). Skipping the subtraction
  leads to a probability that may exceed 1 -- which is always wrong.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>
  <ol>
    <li>
      A die is rolled. What is P(number greater than 4)?
      <details class="solution"><summary>Show Solution</summary>
        <p>Favorable outcomes: {5, 6}. P = 2/6 = 1/3.</p>
      </details>
    </li>
    <li>
      Two dice are rolled. How many outcomes are in the sample space?
      <details class="solution"><summary>Show Solution</summary>
        <p>By the counting principle: 6 &times; 6 = 36 outcomes.</p>
      </details>
    </li>
    <li>
      P(rain tomorrow) = 0.3. What is P(no rain tomorrow)?
      <details class="solution"><summary>Show Solution</summary>
        <p>P(no rain) = 1 - 0.3 = 0.7.</p>
      </details>
    </li>
    <li>
      A bag has 5 red and 7 blue marbles. You draw 2 without replacement. What is P(both red)?
      <details class="solution"><summary>Show Solution</summary>
        <p>P(1st red) = 5/12. P(2nd red | 1st red) = 4/11. P(both red) = (5/12)(4/11) = 20/132 = 5/33 &asymp; 0.152.</p>
      </details>
    </li>
    <li>
      A password is 3 digits (0-9). How many possible passwords are there? What is the probability of guessing correctly on one try?
      <details class="solution"><summary>Show Solution</summary>
        <p>10 &times; 10 &times; 10 = 1,000 passwords. P(correct) = 1/1000 = 0.001.</p>
      </details>
    </li>
  </ol>
</div>

<h3>Summary</h3>
<ul>
  <li>Probability ranges from 0 to 1: P(A) = favorable / total (equally likely outcomes).</li>
  <li>Complement rule: P(not A) = 1 - P(A).</li>
  <li>Addition rule: P(A or B) = P(A) + P(B) - P(A and B).</li>
  <li>Multiplication rule: P(A and B) = P(A) &times; P(B) for independent events.</li>
  <li>Counting principle: m &times; n total ways for sequential tasks.</li>
</ul>
`,

/* ════════════════════════════════════════════════════════════════
   H47 – Statistics & Distributions
   ════════════════════════════════════════════════════════════════ */
'H47': `
<h2>Statistics &amp; Distributions</h2>
<p>
  Statistics transforms raw data into meaningful insights. In this lesson we review
  measures of center, introduce the concept of spread through standard deviation, and
  explore the most important distribution in all of statistics: the normal distribution.
</p>

<h3>Measures of Center (Review)</h3>
<table class="vocab-table">
  <tr><th>Measure</th><th>Definition</th><th>Best Used When</th></tr>
  <tr><td>Mean</td><td>Sum of all values divided by the count</td><td>Data is symmetric, no extreme outliers</td></tr>
  <tr><td>Median</td><td>Middle value when data is ordered</td><td>Data is skewed or has outliers</td></tr>
  <tr><td>Mode</td><td>Most frequently occurring value</td><td>Categorical data or identifying peaks</td></tr>
</table>

<h3>Standard Deviation</h3>
<p>
  The <strong>standard deviation</strong> (denoted &sigma; for a population, s for a sample)
  measures how spread out data values are from the mean. A small standard deviation means
  data clusters tightly around the mean; a large one means data is widely scattered.
</p>
<p>To calculate standard deviation:</p>
<ul class="step-list">
  <li>Find the mean (&mu; or x&#772;).</li>
  <li>Subtract the mean from each value to get deviations.</li>
  <li>Square each deviation.</li>
  <li>Find the average of the squared deviations (variance).</li>
  <li>Take the square root of the variance.</li>
</ul>
<div class="math-display">&sigma; = &radic;[ &Sigma;(x<sub>i</sub> - &mu;)<sup>2</sup> / N ]</div>

<div class="example-box">
  <h4>Worked Example 1 -- Standard Deviation</h4>
  <p>Find the population standard deviation of: 4, 8, 6, 5, 7.</p>
  <ul class="step-list">
    <li>Mean = (4 + 8 + 6 + 5 + 7)/5 = 30/5 = 6.</li>
    <li>Deviations: -2, 2, 0, -1, 1. Squared: 4, 4, 0, 1, 1.</li>
    <li>Variance = (4 + 4 + 0 + 1 + 1)/5 = 10/5 = 2.</li>
    <li>&sigma; = &radic;2 &asymp; 1.414.</li>
  </ul>
</div>

<h3>The Normal Distribution</h3>
<p>
  The normal distribution (bell curve) is symmetric, centered at the mean &mu;, with spread
  determined by &sigma;. It arises naturally when many small, independent random effects
  combine -- heights, test scores, measurement errors, and countless other phenomena follow
  approximate normal distributions.
</p>

<h4>The Empirical Rule (68-95-99.7 Rule)</h4>
<p>For normally distributed data:</p>
<div class="columns-2">
  <div>
    <ul>
      <li><strong>68%</strong> of data falls within 1&sigma; of the mean.</li>
      <li><strong>95%</strong> of data falls within 2&sigma; of the mean.</li>
      <li><strong>99.7%</strong> of data falls within 3&sigma; of the mean.</li>
    </ul>
  </div>
  <div>
    <p>This means only 5% of data lies more than 2 standard deviations from the mean, and
    values beyond 3&sigma; are extremely rare (0.3%).</p>
  </div>
</div>

<div class="example-box">
  <h4>Worked Example 2 -- Empirical Rule</h4>
  <p>Test scores are normally distributed with mean 72 and standard deviation 8. What range contains 95% of scores?</p>
  <ul class="step-list">
    <li>95% falls within 2&sigma;: 72 - 2(8) to 72 + 2(8).</li>
    <li>Range: 56 to 88.</li>
  </ul>
</div>

<h3>Z-Scores</h3>
<p>A z-score tells you how many standard deviations a value is from the mean:</p>
<div class="math-display">z = (x - &mu;) / &sigma;</div>
<p>A z-score of 0 means the value equals the mean. Positive z-scores are above the mean;
negative z-scores are below.</p>

<div class="example-box">
  <h4>Worked Example 3 -- Z-Scores</h4>
  <p>In a class with mean score 80 and standard deviation 5, a student scores 92. What is her z-score?</p>
  <ul class="step-list">
    <li>z = (92 - 80)/5 = 12/5 = 2.4.</li>
    <li>Interpretation: her score is 2.4 standard deviations above the mean -- an exceptional result.</li>
  </ul>
</div>

<div class="tip-box">
  <h4>Comparing Across Different Scales</h4>
  <p>Z-scores let you compare values from different distributions. A z-score of 1.5 on a
  math test and a z-score of 2.0 on a reading test tell you the student performed relatively
  better on the reading test, even though the raw scores and scales are completely different.</p>
</div>

<div class="warning-box">
  <h4>Common Mistake</h4>
  <p>Applying the empirical rule to data that is not approximately normal. If the data is
  heavily skewed, bimodal, or has a very different shape, the 68-95-99.7 percentages will
  not apply. Always check that the distribution is roughly bell-shaped first.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>
  <ol>
    <li>
      Find the mean, median, and mode of: 3, 5, 7, 5, 9, 5, 11.
      <details class="solution"><summary>Show Solution</summary>
        <p>Mean = 45/7 &asymp; 6.43. Ordered: 3, 5, 5, 5, 7, 9, 11. Median = 5. Mode = 5.</p>
      </details>
    </li>
    <li>
      A data set has mean 50 and standard deviation 4. Find the z-score for x = 42.
      <details class="solution"><summary>Show Solution</summary>
        <p>z = (42 - 50)/4 = -8/4 = -2. The value is 2 standard deviations below the mean.</p>
      </details>
    </li>
    <li>
      Heights of adult males are normally distributed with mean 70 inches and standard deviation 3 inches.
      What percentage of males are between 64 and 76 inches tall?
      <details class="solution"><summary>Show Solution</summary>
        <p>64 = 70 - 2(3) and 76 = 70 + 2(3). This is within 2 standard deviations, so approximately 95%.</p>
      </details>
    </li>
    <li>
      Which is more unusual: a test score of 88 when the mean is 75 and &sigma; = 5, or a test
      score of 92 when the mean is 82 and &sigma; = 4?
      <details class="solution"><summary>Show Solution</summary>
        <p>First: z = (88 - 75)/5 = 2.6. Second: z = (92 - 82)/4 = 2.5. The first score (z = 2.6)
        is slightly more unusual.</p>
      </details>
    </li>
    <li>
      Using the empirical rule, approximately what percentage of data in a normal distribution
      falls above the value &mu; + &sigma;?
      <details class="solution"><summary>Show Solution</summary>
        <p>68% is within &plusmn;1&sigma;, so 32% is outside. By symmetry, 16% is above &mu; + &sigma;.</p>
      </details>
    </li>
  </ol>
</div>

<h3>Summary</h3>
<ul>
  <li>Mean, median, and mode measure center; standard deviation measures spread.</li>
  <li>The normal distribution is symmetric and bell-shaped, defined by &mu; and &sigma;.</li>
  <li>Empirical rule: 68% within 1&sigma;, 95% within 2&sigma;, 99.7% within 3&sigma;.</li>
  <li>Z-scores standardize values: z = (x - &mu;)/&sigma;.</li>
</ul>
`,

/* ════════════════════════════════════════════════════════════════
   H48 – Correlation vs. Causation
   ════════════════════════════════════════════════════════════════ */
'H48': `
<h2>Correlation vs. Causation</h2>
<p>
  "Ice cream sales and drowning deaths both increase in summer -- does ice cream cause
  drowning?" Of course not. Both are driven by a third factor: warm weather. Learning to
  distinguish correlation (two things move together) from causation (one thing
  <em>makes</em> the other happen) is one of the most important skills in data literacy.
</p>

<h3>Scatter Plots and Correlation</h3>
<p>
  A <strong>scatter plot</strong> displays paired data as points on a coordinate plane.
  The pattern reveals the relationship between the two variables.
</p>

<div class="columns-2">
  <div>
    <h4>Positive Correlation</h4>
    <p>As x increases, y tends to increase. Points trend upward from left to right.</p>
    <p>Example: study hours and test scores.</p>
  </div>
  <div>
    <h4>Negative Correlation</h4>
    <p>As x increases, y tends to decrease. Points trend downward.</p>
    <p>Example: price of a product and quantity demanded.</p>
  </div>
</div>
<p><strong>No correlation:</strong> no clear pattern. The points form a shapeless cloud.</p>

<h3>The Correlation Coefficient r</h3>
<p>
  The <strong>correlation coefficient r</strong> quantifies the strength and direction of a
  <em>linear</em> relationship between two variables.
</p>
<table class="vocab-table">
  <tr><th>Value of r</th><th>Interpretation</th></tr>
  <tr><td>r = 1</td><td>Perfect positive linear relationship</td></tr>
  <tr><td>r = -1</td><td>Perfect negative linear relationship</td></tr>
  <tr><td>r = 0</td><td>No linear relationship</td></tr>
  <tr><td>0.7 &le; |r| &le; 1</td><td>Strong linear association</td></tr>
  <tr><td>0.4 &le; |r| &lt; 0.7</td><td>Moderate linear association</td></tr>
  <tr><td>|r| &lt; 0.4</td><td>Weak linear association</td></tr>
</table>

<div class="tip-box">
  <h4>Key Property of r</h4>
  <p>The correlation coefficient r only measures <strong>linear</strong> relationships. A
  data set with a perfect U-shape pattern might have r &asymp; 0 even though there is a strong
  (non-linear) relationship. Always look at the scatter plot, not just the number.</p>
</div>

<h3>Why Correlation Does Not Imply Causation</h3>
<p>Even when two variables are strongly correlated, there are several possible explanations
besides direct causation:</p>
<table class="vocab-table">
  <tr><th>Explanation</th><th>Description</th><th>Example</th></tr>
  <tr><td>Confounding variable</td><td>A third variable causes both</td><td>Ice cream and drowning (both caused by summer heat)</td></tr>
  <tr><td>Reverse causation</td><td>The direction is opposite to what you assumed</td><td>Firefighters at fires -- more firefighters does not cause bigger fires</td></tr>
  <tr><td>Coincidence</td><td>Random chance produced a pattern</td><td>Correlation between Nicolas Cage films and pool drownings</td></tr>
</table>

<div class="example-box">
  <h4>Worked Example 1 -- Identifying Confounding Variables</h4>
  <p>Study finds: students who eat breakfast score higher on tests. Does breakfast cause better scores?</p>
  <ul class="step-list">
    <li>Possible confounders: families who provide breakfast may also provide a stable home, more sleep, better nutrition overall, and stronger academic support.</li>
    <li>Conclusion: we cannot conclude causation from this observational data alone. The correlation is real, but the cause may be the overall home environment, not breakfast itself.</li>
  </ul>
</div>

<h3>Observational vs. Experimental Studies</h3>
<div class="columns-2">
  <div>
    <h4>Observational Study</h4>
    <p>Researchers observe and record data without interfering. They can find correlations but
    <strong>cannot establish causation</strong> because confounders may be present.</p>
  </div>
  <div>
    <h4>Experiment (Randomized Controlled Trial)</h4>
    <p>Researchers randomly assign subjects to treatment and control groups. Randomization
    balances confounders across groups, so differences in outcomes <strong>can suggest
    causation</strong>.</p>
  </div>
</div>

<div class="example-box">
  <h4>Worked Example 2 -- Study Design</h4>
  <p>A researcher wants to know if a new fertilizer increases crop yield. Describe an experiment.</p>
  <ul class="step-list">
    <li>Randomly divide 100 identical plots into two groups of 50.</li>
    <li>Treatment group: apply the new fertilizer. Control group: no fertilizer (or a standard one).</li>
    <li>Keep all other conditions (water, sunlight, soil) the same.</li>
    <li>Compare average yields. If the treatment group yields significantly more, we have evidence the fertilizer caused the increase.</li>
  </ul>
</div>

<div class="example-box">
  <h4>Worked Example 3 -- Interpreting r</h4>
  <p>A study finds r = -0.82 between hours of TV watched per day and GPA. Interpret this.</p>
  <ul class="step-list">
    <li>The negative sign means as TV hours increase, GPA tends to decrease.</li>
    <li>|r| = 0.82 indicates a strong linear association.</li>
    <li>However, this is likely an observational study. We cannot conclude TV causes lower GPA.
    Confounders (motivation, time management, socioeconomic factors) may explain the pattern.</li>
  </ul>
</div>

<div class="warning-box">
  <h4>Common Mistake</h4>
  <p>Assuming that a large or statistically significant correlation proves causation. Even
  r = 0.95 does not prove that one variable causes the other. Only a well-designed
  experiment with randomization and controls can support causal claims.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>
  <ol>
    <li>
      A scatter plot shows points trending downward from left to right with moderate scatter.
      Estimate the correlation coefficient.
      <details class="solution"><summary>Show Solution</summary>
        <p>Negative direction with moderate scatter suggests r is somewhere around -0.5 to -0.7 (moderate negative correlation).</p>
      </details>
    </li>
    <li>
      "Countries that consume more chocolate win more Nobel Prizes." Name a likely confounding variable.
      <details class="solution"><summary>Show Solution</summary>
        <p>National wealth (GDP per capita). Wealthier countries can afford both more chocolate consumption and more research funding, which produces more Nobel laureates.</p>
      </details>
    </li>
    <li>
      Is the following an observational study or an experiment? "Researchers surveyed 500 people
      about their exercise habits and measured their blood pressure."
      <details class="solution"><summary>Show Solution</summary>
        <p>Observational study -- the researchers did not assign exercise habits; they simply recorded existing behavior.</p>
      </details>
    </li>
    <li>
      If r = 0.02 between shoe size and intelligence, what can you conclude?
      <details class="solution"><summary>Show Solution</summary>
        <p>There is essentially no linear relationship between shoe size and intelligence. The variables are not correlated.</p>
      </details>
    </li>
    <li>
      A randomized experiment finds that patients taking a new drug recover faster than those
      taking a placebo (p &lt; 0.01). Can we conclude the drug caused faster recovery? Explain.
      <details class="solution"><summary>Show Solution</summary>
        <p>Yes, cautiously. Because subjects were randomly assigned, confounders are balanced between groups.
        The statistically significant result (p &lt; 0.01) provides strong evidence that the drug, not some
        other factor, caused the improvement. Replication would strengthen the conclusion further.</p>
      </details>
    </li>
  </ol>
</div>

<h3>Summary</h3>
<ul>
  <li>Correlation measures how strongly two variables move together; it ranges from -1 to 1.</li>
  <li>Correlation does NOT imply causation -- confounders, reverse causation, and coincidence can all produce correlations.</li>
  <li>Only randomized controlled experiments can establish causation.</li>
  <li>Always look at the scatter plot, not just the correlation coefficient.</li>
</ul>
`

};
