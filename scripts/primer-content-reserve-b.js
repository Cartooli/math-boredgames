module.exports = {

'R63': `
<h2>Mean vs Median: When to Use Which</h2>

<p>The <strong>mean</strong> and <strong>median</strong> are both measures of center, but they tell different stories about data. Choosing the wrong one can be misleading -- and in real life, this matters more than you might think.</p>

<h3>The Mean: Adding and Dividing</h3>

<p>The <strong>mean</strong> (arithmetic average) is the sum of all values divided by the count:</p>

<div class="math-display">Mean = (x<sub>1</sub> + x<sub>2</sub> + ... + x<sub>n</sub>) / n</div>

<p>The mean uses every data point in its calculation. This is a strength when data is symmetric, but a weakness when extreme values (outliers) are present.</p>

<h3>The Median: The Middle Value</h3>

<p>The <strong>median</strong> is the middle value when data is arranged in order. For an even number of values, it is the average of the two middle values.</p>

<p>The median is <strong>resistant</strong> to outliers -- extreme values barely affect it.</p>

<div class="example-box">
<h4>Worked Example 1: Outlier Impact</h4>
<p>Five friends earn these hourly wages: $12, $13, $14, $15, $16.</p>
<p><strong>Mean:</strong> (12 + 13 + 14 + 15 + 16) / 5 = 70 / 5 = <strong>$14</strong></p>
<p><strong>Median:</strong> The middle value is <strong>$14</strong>.</p>
<p>Both agree. Now suppose one friend gets a raise to $50:</p>
<p>Data: $12, $13, $14, $15, $50.</p>
<p><strong>Mean:</strong> (12 + 13 + 14 + 15 + 50) / 5 = 104 / 5 = <strong>$20.80</strong></p>
<p><strong>Median:</strong> The middle value is still <strong>$14</strong>.</p>
<p>The mean jumped by $6.80 because of one outlier. The median barely moved. If you want to describe what a "typical" friend earns, the median is more honest here.</p>
</div>

<h3>Skewed Data: The Key Decision Factor</h3>

<p>When data is <strong>skewed</strong> (pulled in one direction), the mean gets dragged toward the tail while the median stays near the bulk of the data.</p>

<div class="columns-2">
<div>
<strong>Right-Skewed (Use Median)</strong>
<ul>
<li>Household incomes</li>
<li>Home prices</li>
<li>Company sizes</li>
<li>Medical costs</li>
</ul>
</div>
<div>
<strong>Symmetric (Mean is Fine)</strong>
<ul>
<li>Test scores (often)</li>
<li>Heights of adults</li>
<li>Measurement errors</li>
<li>Temperatures</li>
</ul>
</div>
</div>

<div class="example-box">
<h4>Worked Example 2: Housing Prices</h4>
<p>A neighborhood has these home prices (in thousands): $180, $195, $200, $210, $220, $230, $1,500.</p>
<p><strong>Mean:</strong> (180 + 195 + 200 + 210 + 220 + 230 + 1500) / 7 = 2735 / 7 = <strong>$390,714</strong></p>
<p><strong>Median:</strong> Ordered middle value = <strong>$210,000</strong></p>
<p>The mean suggests homes cost nearly $400K, but 6 out of 7 homes are under $230K. The one mansion skews the mean. News reports use <strong>median home price</strong> for exactly this reason.</p>
</div>

<div class="example-box">
<h4>Worked Example 3: When the Mean Is Better</h4>
<p>A teacher wants to calculate final grades from five equally weighted tests. Scores: 78, 82, 85, 90, 80.</p>
<p>Here the <strong>mean</strong> is appropriate: (78 + 82 + 85 + 90 + 80) / 5 = 83. Every test should contribute equally to the final grade -- no score is an "outlier" to ignore.</p>
</div>

<div class="warning-box">
<h4>Common Mistake</h4>
<p>Saying "average income in the U.S. is $X" using the mean is misleading. Because a small number of very high earners pull the mean up, the <strong>median</strong> income is a much better representation of what a typical person earns. The mean U.S. income is significantly higher than the median.</p>
</div>

<div class="tip-box">
<h4>Quick Decision Rule</h4>
<p>Ask: "Could there be extreme values or is the data lopsided?" If yes, use the median. If the data is roughly symmetric with no wild outliers, the mean works well. When in doubt, report both.</p>
</div>

<div class="practice-problems">
<h3>Practice Problems</h3>

<p><strong>1.</strong> Find the mean and median: 3, 5, 7, 9, 11.</p>
<details class="solution"><summary>Solution</summary>
<p>Mean = (3 + 5 + 7 + 9 + 11) / 5 = 35 / 5 = 7. Median = 7 (middle value). They are equal because the data is symmetric.</p>
</details>

<p><strong>2.</strong> Find the mean and median: 3, 5, 7, 9, 100.</p>
<details class="solution"><summary>Solution</summary>
<p>Mean = (3 + 5 + 7 + 9 + 100) / 5 = 124 / 5 = 24.8. Median = 7. The outlier (100) drags the mean far above the typical values.</p>
</details>

<p><strong>3.</strong> A company reports its employees' "average salary" as $95,000. But most employees earn between $40,000 and $60,000, while the CEO earns $5,000,000. Which measure did the company likely use, and which would be more informative?</p>
<details class="solution"><summary>Solution</summary>
<p>The company likely used the <strong>mean</strong>, which is inflated by the CEO's salary. The <strong>median</strong> would be more informative since it better represents what a typical employee earns.</p>
</details>

<p><strong>4.</strong> A student scores 88, 91, 85, 90, 87 on five quizzes. Should the teacher use mean or median to compute the grade? Why?</p>
<details class="solution"><summary>Solution</summary>
<p>Use the <strong>mean</strong>. The scores are close together with no outliers, and every quiz should count equally toward the grade. Mean = (88 + 91 + 85 + 90 + 87) / 5 = 441 / 5 = 88.2.</p>
</details>

<p><strong>5.</strong> Data set A: 10, 20, 30, 40, 50. Data set B: 10, 20, 30, 40, 500. For each, state mean and median, and which measure of center you would report.</p>
<details class="solution"><summary>Solution</summary>
<p>Set A: Mean = 30, Median = 30. Either works (symmetric data). Set B: Mean = 120, Median = 30. Report the median -- the value 500 is an outlier that makes the mean unrepresentative.</p>
</details>
</div>

<h3>Summary</h3>
<ul>
<li>The <strong>mean</strong> uses every value and is sensitive to outliers.</li>
<li>The <strong>median</strong> is resistant to outliers and better for skewed data.</li>
<li>For symmetric data without outliers, the mean and median are similar -- use either.</li>
<li>Real-world reports (income, housing) typically use the median for accuracy.</li>
</ul>
`,

'R64': `
<h2>Function Transformations</h2>

<p>Once you know the shape of a basic function -- such as y = x<sup>2</sup>, y = |x|, or y = sqrt(x) -- you can shift, stretch, compress, and reflect it to create an entire family of related graphs. Understanding transformations lets you graph complex functions quickly without plotting dozens of points.</p>

<h3>Vertical and Horizontal Shifts</h3>

<p>A <strong>vertical shift</strong> moves the graph up or down:</p>
<div class="math-display">y = f(x) + k &rarr; shifts UP by k (if k &gt; 0) or DOWN by |k| (if k &lt; 0)</div>

<p>A <strong>horizontal shift</strong> moves the graph left or right:</p>
<div class="math-display">y = f(x &minus; h) &rarr; shifts RIGHT by h (if h &gt; 0) or LEFT by |h| (if h &lt; 0)</div>

<div class="warning-box">
<h4>Common Mistake: Horizontal Shift Direction</h4>
<p>The horizontal shift goes the <strong>opposite</strong> direction of the sign inside the parentheses. y = (x &minus; 3)<sup>2</sup> shifts RIGHT 3 (not left). y = (x + 5)<sup>2</sup> shifts LEFT 5 (not right). Think of it as: the value that makes the inside zero is where the new center lands.</p>
</div>

<div class="example-box">
<h4>Worked Example 1: Combining Shifts</h4>
<p>Describe the transformation: y = |x + 2| &minus; 4</p>
<p>Start with the parent function y = |x|, whose vertex is at (0, 0).</p>
<ol class="step-list">
<li>x + 2 = x &minus; (&minus;2), so shift LEFT 2.</li>
<li>The &minus;4 outside shifts DOWN 4.</li>
</ol>
<p>The new vertex is at <strong>(&minus;2, &minus;4)</strong>. The V-shape is unchanged.</p>
</div>

<h3>Vertical Stretch and Compression</h3>

<div class="math-display">y = a &middot; f(x)</div>

<ul>
<li>If |a| &gt; 1: the graph is <strong>stretched vertically</strong> (taller, narrower-looking).</li>
<li>If 0 &lt; |a| &lt; 1: the graph is <strong>compressed vertically</strong> (shorter, wider-looking).</li>
</ul>

<div class="example-box">
<h4>Worked Example 2: Stretching a Parabola</h4>
<p>Compare y = x<sup>2</sup>, y = 3x<sup>2</sup>, and y = (1/2)x<sup>2</sup>.</p>
<p>At x = 2: y = 4, y = 12, and y = 2, respectively.</p>
<p>y = 3x<sup>2</sup> is <strong>3 times as tall</strong> at every point (vertical stretch by factor 3).</p>
<p>y = (1/2)x<sup>2</sup> is <strong>half as tall</strong> at every point (vertical compression by factor 1/2).</p>
</div>

<h3>Reflections</h3>

<div class="columns-2">
<div>
<strong>Reflection over x-axis</strong>
<div class="math-display">y = &minus;f(x)</div>
<p>Flip the graph upside-down. Every y-value becomes its opposite.</p>
</div>
<div>
<strong>Reflection over y-axis</strong>
<div class="math-display">y = f(&minus;x)</div>
<p>Flip the graph left-to-right. Every x-value becomes its opposite.</p>
</div>
</div>

<div class="example-box">
<h4>Worked Example 3: Combining Transformations</h4>
<p>Describe all transformations: y = &minus;2(x &minus; 1)<sup>2</sup> + 5</p>
<p>Parent function: y = x<sup>2</sup></p>
<ol class="step-list">
<li><strong>Horizontal shift:</strong> right 1 (from x &minus; 1).</li>
<li><strong>Vertical stretch:</strong> by factor 2 (the coefficient 2).</li>
<li><strong>Reflection:</strong> over x-axis (the negative sign).</li>
<li><strong>Vertical shift:</strong> up 5 (the +5).</li>
</ol>
<p>The vertex moves from (0, 0) to <strong>(1, 5)</strong>, the parabola opens <strong>downward</strong>, and it is <strong>narrower</strong> than the standard parabola.</p>
</div>

<div class="tip-box">
<h4>Order of Transformations</h4>
<p>Apply transformations in this order: (1) Horizontal shift, (2) Horizontal stretch/reflection, (3) Vertical stretch/reflection, (4) Vertical shift. Alternatively, work "inside out" -- deal with what is happening to x first, then what is happening to y.</p>
</div>

<div class="practice-problems">
<h3>Practice Problems</h3>

<p><strong>1.</strong> Describe the transformation from y = x<sup>2</sup> to y = (x &minus; 4)<sup>2</sup> + 7.</p>
<details class="solution"><summary>Solution</summary>
<p>Shift right 4, shift up 7. The vertex moves from (0, 0) to (4, 7).</p>
</details>

<p><strong>2.</strong> Write the equation if y = sqrt(x) is reflected over the x-axis and shifted left 3.</p>
<details class="solution"><summary>Solution</summary>
<p>Reflect over x-axis: y = &minus;sqrt(x). Shift left 3: replace x with (x + 3). Result: <strong>y = &minus;sqrt(x + 3)</strong>.</p>
</details>

<p><strong>3.</strong> For y = 4|x + 1| &minus; 2, identify the parent function, all transformations, and the vertex.</p>
<details class="solution"><summary>Solution</summary>
<p>Parent: y = |x|. Transformations: shift left 1, vertical stretch by factor 4, shift down 2. Vertex: (&minus;1, &minus;2).</p>
</details>

<p><strong>4.</strong> How does y = f(&minus;x) differ from y = &minus;f(x)? Give a specific example using f(x) = x<sup>3</sup>.</p>
<details class="solution"><summary>Solution</summary>
<p>y = f(&minus;x) = (&minus;x)<sup>3</sup> = &minus;x<sup>3</sup> reflects over the y-axis. y = &minus;f(x) = &minus;x<sup>3</sup> reflects over the x-axis. For odd functions like x<sup>3</sup>, these happen to look the same, but in general they are different. For example, with f(x) = x<sup>2</sup> + x: f(&minus;x) = x<sup>2</sup> &minus; x, while &minus;f(x) = &minus;x<sup>2</sup> &minus; x -- these are different graphs.</p>
</details>

<p><strong>5.</strong> Starting with y = x<sup>2</sup>, write the equation of a parabola that opens downward, is vertically compressed by 1/3, and has its vertex at (&minus;2, 6).</p>
<details class="solution"><summary>Solution</summary>
<p>Open downward: negative coefficient. Compressed by 1/3: |a| = 1/3. Vertex at (&minus;2, 6): shift left 2 and up 6. Equation: <strong>y = &minus;(1/3)(x + 2)<sup>2</sup> + 6</strong>.</p>
</details>
</div>

<h3>Summary</h3>
<ul>
<li>f(x) + k shifts vertically; f(x &minus; h) shifts horizontally (opposite sign!).</li>
<li>a &middot; f(x) stretches (|a| &gt; 1) or compresses (|a| &lt; 1) vertically.</li>
<li>&minus;f(x) reflects over the x-axis; f(&minus;x) reflects over the y-axis.</li>
<li>Transformations can be combined -- apply them systematically.</li>
</ul>
`,

'R65': `
<h2>Rational Functions and Asymptotes</h2>

<p>A <strong>rational function</strong> is a ratio of two polynomials:</p>
<div class="math-display">f(x) = p(x) / q(x)</div>

<p>These functions have fascinating behavior near values where the denominator equals zero, producing vertical lines the graph approaches but never crosses, and horizontal lines the graph settles toward for very large x.</p>

<h3>Domain Restrictions</h3>

<p>Since division by zero is undefined, the domain of a rational function excludes all x-values where q(x) = 0.</p>

<div class="example-box">
<h4>Worked Example 1: Finding the Domain</h4>
<p>Find the domain of f(x) = (x + 3) / (x<sup>2</sup> &minus; 4).</p>
<p>Set the denominator equal to zero: x<sup>2</sup> &minus; 4 = 0, so x<sup>2</sup> = 4, giving x = 2 or x = &minus;2.</p>
<p><strong>Domain:</strong> all real numbers except x = 2 and x = &minus;2.</p>
</div>

<h3>Vertical Asymptotes</h3>

<p>A <strong>vertical asymptote</strong> occurs at x = a if the denominator is zero at x = a but the numerator is not. The graph shoots toward positive or negative infinity near x = a.</p>

<div class="math-display">If q(a) = 0 and p(a) &ne; 0, then x = a is a vertical asymptote.</div>

<h3>Holes (Removable Discontinuities)</h3>

<p>If <em>both</em> the numerator and denominator are zero at x = a, the common factor cancels, leaving a <strong>hole</strong> -- a single missing point in the graph.</p>

<div class="example-box">
<h4>Worked Example 2: Asymptote vs. Hole</h4>
<p>Analyze f(x) = (x<sup>2</sup> &minus; 1) / (x<sup>2</sup> &minus; x &minus; 2).</p>
<p>Factor: f(x) = (x &minus; 1)(x + 1) / [(x &minus; 2)(x + 1)]</p>
<p>The factor (x + 1) appears in both numerator and denominator, so x = &minus;1 produces a <strong>hole</strong>, not an asymptote. Cancel to get f(x) = (x &minus; 1)/(x &minus; 2), with the note that x &ne; &minus;1.</p>
<p>The remaining denominator zero is x = 2 (numerator is 2 &minus; 1 = 1 &ne; 0), so <strong>x = 2 is a vertical asymptote</strong>.</p>
<p>The hole is at x = &minus;1. Plugging into the simplified form: y = (&minus;1 &minus; 1)/(&minus;1 &minus; 2) = &minus;2/&minus;3 = 2/3. The hole is at <strong>(&minus;1, 2/3)</strong>.</p>
</div>

<h3>Horizontal Asymptotes</h3>

<p>The horizontal asymptote describes the end behavior -- what happens as x grows very large (positive or negative).</p>

<div class="vocab-table">
<table>
<tr><th>Degree of Numerator vs. Denominator</th><th>Horizontal Asymptote</th></tr>
<tr><td>Numerator degree &lt; Denominator degree</td><td>y = 0</td></tr>
<tr><td>Numerator degree = Denominator degree</td><td>y = (leading coefficient of p) / (leading coefficient of q)</td></tr>
<tr><td>Numerator degree &gt; Denominator degree</td><td>No horizontal asymptote (slant or other end behavior)</td></tr>
</table>
</div>

<div class="example-box">
<h4>Worked Example 3: Full Analysis</h4>
<p>Analyze and sketch key features of f(x) = 2x / (x &minus; 3).</p>
<ol class="step-list">
<li><strong>Domain:</strong> x &ne; 3.</li>
<li><strong>Vertical asymptote:</strong> x = 3 (denominator zero, numerator = 6 &ne; 0).</li>
<li><strong>Horizontal asymptote:</strong> degrees are equal (both 1), so y = 2/1 = 2.</li>
<li><strong>x-intercept:</strong> set numerator = 0: 2x = 0, so x = 0. Point: (0, 0).</li>
<li><strong>y-intercept:</strong> f(0) = 0/&minus;3 = 0. Point: (0, 0).</li>
</ol>
<p>The graph approaches x = 3 vertically and settles toward y = 2 horizontally.</p>
</div>

<div class="warning-box">
<h4>Common Mistake</h4>
<p>A vertical asymptote is NOT just "denominator = 0." You must check that the numerator is non-zero at that point. If both are zero, you have a hole, not an asymptote. Always factor first.</p>
</div>

<div class="tip-box">
<h4>Graphing Strategy</h4>
<p>To sketch a rational function: (1) Factor fully. (2) Find domain restrictions. (3) Identify asymptotes and holes. (4) Find intercepts. (5) Test a point in each region between vertical asymptotes. (6) Draw the curve approaching asymptotes.</p>
</div>

<div class="practice-problems">
<h3>Practice Problems</h3>

<p><strong>1.</strong> Find the vertical asymptote(s) and horizontal asymptote of f(x) = 5 / (x + 2).</p>
<details class="solution"><summary>Solution</summary>
<p>Vertical asymptote: x = &minus;2 (denominator zero). Horizontal asymptote: degree of numerator (0) &lt; degree of denominator (1), so y = 0.</p>
</details>

<p><strong>2.</strong> Find and classify all discontinuities of f(x) = (x<sup>2</sup> &minus; 9) / (x &minus; 3).</p>
<details class="solution"><summary>Solution</summary>
<p>Factor: (x &minus; 3)(x + 3) / (x &minus; 3). Both are zero at x = 3, so there is a <strong>hole</strong> at x = 3. Simplified: f(x) = x + 3 (x &ne; 3). The hole is at (3, 6). No vertical asymptotes.</p>
</details>

<p><strong>3.</strong> Find the horizontal asymptote of f(x) = (3x<sup>2</sup> + 1) / (5x<sup>2</sup> &minus; 2).</p>
<details class="solution"><summary>Solution</summary>
<p>Same degree (both 2). Horizontal asymptote: y = 3/5.</p>
</details>

<p><strong>4.</strong> Determine all asymptotes and intercepts of f(x) = (x + 1) / (x<sup>2</sup> &minus; x &minus; 6).</p>
<details class="solution"><summary>Solution</summary>
<p>Factor denominator: (x &minus; 3)(x + 2). No common factors with numerator. Vertical asymptotes: x = 3 and x = &minus;2. Horizontal asymptote: degree 1 &lt; degree 2, so y = 0. x-intercept: x = &minus;1 (set numerator = 0). y-intercept: f(0) = 1/(&minus;6) = &minus;1/6.</p>
</details>

<p><strong>5.</strong> Does f(x) = x<sup>2</sup> / (x + 1) have a horizontal asymptote? Explain.</p>
<details class="solution"><summary>Solution</summary>
<p>No. The degree of the numerator (2) is greater than the degree of the denominator (1). There is no horizontal asymptote. Instead, there is a slant (oblique) asymptote, found by polynomial long division: y = x &minus; 1.</p>
</details>
</div>

<h3>Summary</h3>
<ul>
<li>Rational functions are ratios of polynomials; domain excludes denominator zeros.</li>
<li>Vertical asymptotes occur where the denominator (but not numerator) is zero.</li>
<li>Holes occur where both are zero -- factor and cancel.</li>
<li>Horizontal asymptotes depend on comparing the degrees of numerator and denominator.</li>
</ul>
`,

'R66': `
<h2>Rational Exponents</h2>

<p>Rational exponents provide an elegant alternative notation for roots, unifying the rules of exponents and radicals into one system. Instead of juggling separate rules for exponents and roots, rational exponents let you use a single set of exponent rules for everything.</p>

<h3>The Fundamental Definition</h3>

<div class="math-display">x<sup>1/n</sup> = <sup>n</sup>&radic;x &nbsp;&nbsp;&nbsp; (the nth root of x)</div>

<p>This means: "What number, raised to the nth power, gives x?"</p>

<div class="columns-2">
<div>
<strong>Examples:</strong>
<ul>
<li>9<sup>1/2</sup> = &radic;9 = 3</li>
<li>8<sup>1/3</sup> = <sup>3</sup>&radic;8 = 2</li>
<li>16<sup>1/4</sup> = <sup>4</sup>&radic;16 = 2</li>
<li>32<sup>1/5</sup> = <sup>5</sup>&radic;32 = 2</li>
</ul>
</div>
<div>
<strong>Why it works:</strong>
<p>If x<sup>1/2</sup> means &radic;x, then (x<sup>1/2</sup>)<sup>2</sup> = x<sup>(1/2)(2)</sup> = x<sup>1</sup> = x. Squaring the square root returns x. The exponent rule (a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup> forces this definition.</p>
</div>
</div>

<h3>The General Rational Exponent</h3>

<div class="math-display">x<sup>m/n</sup> = (<sup>n</sup>&radic;x)<sup>m</sup> = <sup>n</sup>&radic;(x<sup>m</sup>)</div>

<p>The denominator is the root; the numerator is the power. You can apply them in either order.</p>

<div class="example-box">
<h4>Worked Example 1: Evaluating Rational Exponents</h4>
<p>Evaluate 8<sup>2/3</sup>.</p>
<p><strong>Method 1 (root first):</strong> 8<sup>2/3</sup> = (<sup>3</sup>&radic;8)<sup>2</sup> = 2<sup>2</sup> = <strong>4</strong></p>
<p><strong>Method 2 (power first):</strong> 8<sup>2/3</sup> = <sup>3</sup>&radic;(8<sup>2</sup>) = <sup>3</sup>&radic;64 = <strong>4</strong></p>
<p>Root first is usually easier -- smaller numbers to work with.</p>
</div>

<div class="example-box">
<h4>Worked Example 2: Converting Between Forms</h4>
<p>Rewrite each expression:</p>
<p><strong>Radical to exponent:</strong> <sup>3</sup>&radic;(x<sup>5</sup>) = x<sup>5/3</sup></p>
<p><strong>Exponent to radical:</strong> y<sup>-3/4</sup> = 1 / y<sup>3/4</sup> = 1 / (<sup>4</sup>&radic;y)<sup>3</sup></p>
<p><strong>Simplify:</strong> &radic;(x<sup>3</sup>) = x<sup>3/2</sup></p>
</div>

<h3>Simplifying with Exponent Rules</h3>

<p>All the standard exponent rules apply to rational exponents:</p>

<div class="vocab-table">
<table>
<tr><th>Rule</th><th>Example</th></tr>
<tr><td>a<sup>m</sup> &middot; a<sup>n</sup> = a<sup>m+n</sup></td><td>x<sup>1/2</sup> &middot; x<sup>1/3</sup> = x<sup>5/6</sup></td></tr>
<tr><td>a<sup>m</sup> / a<sup>n</sup> = a<sup>m&minus;n</sup></td><td>x<sup>3/4</sup> / x<sup>1/4</sup> = x<sup>1/2</sup></td></tr>
<tr><td>(a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup></td><td>(x<sup>2/3</sup>)<sup>6</sup> = x<sup>4</sup></td></tr>
<tr><td>(ab)<sup>n</sup> = a<sup>n</sup> &middot; b<sup>n</sup></td><td>(4x)<sup>1/2</sup> = 2x<sup>1/2</sup></td></tr>
</table>
</div>

<div class="example-box">
<h4>Worked Example 3: Simplifying Expressions</h4>
<p>Simplify: (x<sup>1/3</sup> &middot; x<sup>3/4</sup>) / x<sup>1/6</sup></p>
<ol class="step-list">
<li>Multiply in the numerator: x<sup>1/3 + 3/4</sup> = x<sup>4/12 + 9/12</sup> = x<sup>13/12</sup></li>
<li>Divide: x<sup>13/12 &minus; 1/6</sup> = x<sup>13/12 &minus; 2/12</sup> = x<sup>11/12</sup></li>
</ol>
<p>Result: <strong>x<sup>11/12</sup></strong></p>
</div>

<div class="warning-box">
<h4>Common Mistake</h4>
<p>Students often confuse which part is the root and which is the power. In x<sup>m/n</sup>, the <strong>denominator n is the root</strong> and the <strong>numerator m is the power</strong>. Think: "Denominator is Down in the radical." So x<sup>2/3</sup> is the cube root (3 is the root) raised to the 2nd power -- not the other way around.</p>
</div>

<div class="tip-box">
<h4>Negative Rational Exponents</h4>
<p>A negative exponent means reciprocal: x<sup>&minus;m/n</sup> = 1/x<sup>m/n</sup>. For example, 27<sup>&minus;2/3</sup> = 1/27<sup>2/3</sup> = 1/(<sup>3</sup>&radic;27)<sup>2</sup> = 1/9.</p>
</div>

<div class="practice-problems">
<h3>Practice Problems</h3>

<p><strong>1.</strong> Evaluate: 16<sup>3/4</sup></p>
<details class="solution"><summary>Solution</summary>
<p>(<sup>4</sup>&radic;16)<sup>3</sup> = 2<sup>3</sup> = <strong>8</strong></p>
</details>

<p><strong>2.</strong> Evaluate: 25<sup>&minus;1/2</sup></p>
<details class="solution"><summary>Solution</summary>
<p>1 / 25<sup>1/2</sup> = 1 / 5 = <strong>1/5</strong></p>
</details>

<p><strong>3.</strong> Rewrite using rational exponents: <sup>5</sup>&radic;(a<sup>3</sup>b<sup>2</sup>)</p>
<details class="solution"><summary>Solution</summary>
<p>(a<sup>3</sup>b<sup>2</sup>)<sup>1/5</sup> = <strong>a<sup>3/5</sup> b<sup>2/5</sup></strong></p>
</details>

<p><strong>4.</strong> Simplify: x<sup>2/3</sup> &middot; x<sup>5/6</sup></p>
<details class="solution"><summary>Solution</summary>
<p>x<sup>2/3 + 5/6</sup> = x<sup>4/6 + 5/6</sup> = <strong>x<sup>3/2</sup></strong></p>
</details>

<p><strong>5.</strong> Simplify: (8x<sup>6</sup>)<sup>2/3</sup></p>
<details class="solution"><summary>Solution</summary>
<p>8<sup>2/3</sup> &middot; (x<sup>6</sup>)<sup>2/3</sup> = (<sup>3</sup>&radic;8)<sup>2</sup> &middot; x<sup>4</sup> = 4 &middot; x<sup>4</sup> = <strong>4x<sup>4</sup></strong></p>
</details>
</div>

<h3>Summary</h3>
<ul>
<li>x<sup>1/n</sup> = <sup>n</sup>&radic;x; x<sup>m/n</sup> = (<sup>n</sup>&radic;x)<sup>m</sup>.</li>
<li>The denominator of the exponent is the root index; the numerator is the power.</li>
<li>All exponent rules (product, quotient, power) work with rational exponents.</li>
<li>Take the root first for easier computation with specific numbers.</li>
</ul>
`,

'R67': `
<h2>Introduction to Complex Numbers</h2>

<p>For centuries, mathematicians dismissed the square root of negative numbers as impossible. Then they asked: "What if we just <em>invented</em> a number whose square is &minus;1?" That invention -- the imaginary unit <strong>i</strong> -- unlocked an entire new number system that now powers electrical engineering, quantum physics, and signal processing.</p>

<h3>The Imaginary Unit</h3>

<div class="math-display">i = &radic;(&minus;1) &nbsp;&nbsp;&nbsp; so &nbsp;&nbsp;&nbsp; i<sup>2</sup> = &minus;1</div>

<p>With this definition, we can now take the square root of any negative number:</p>
<div class="math-display">&radic;(&minus;a) = i&radic;a &nbsp;&nbsp; (for a &gt; 0)</div>

<p>Examples: &radic;(&minus;9) = 3i, &nbsp; &radic;(&minus;7) = i&radic;7, &nbsp; &radic;(&minus;16) = 4i.</p>

<h3>Complex Number Form</h3>

<p>A <strong>complex number</strong> has the form:</p>
<div class="math-display">a + bi</div>
<p>where <strong>a</strong> is the <em>real part</em> and <strong>b</strong> is the <em>imaginary part</em> (both are real numbers).</p>

<div class="vocab-table">
<table>
<tr><th>Complex Number</th><th>Real Part (a)</th><th>Imaginary Part (b)</th></tr>
<tr><td>3 + 2i</td><td>3</td><td>2</td></tr>
<tr><td>&minus;4i</td><td>0</td><td>&minus;4</td></tr>
<tr><td>7</td><td>7</td><td>0</td></tr>
<tr><td>&minus;1 + i</td><td>&minus;1</td><td>1</td></tr>
</table>
</div>

<p>Notice that every real number is a complex number (with b = 0).</p>

<h3>Arithmetic with Complex Numbers</h3>

<p><strong>Adding/Subtracting:</strong> Combine real parts and imaginary parts separately.</p>

<div class="example-box">
<h4>Worked Example 1: Addition and Subtraction</h4>
<p>(3 + 4i) + (2 &minus; 7i) = (3 + 2) + (4 &minus; 7)i = <strong>5 &minus; 3i</strong></p>
<p>(6 &minus; i) &minus; (2 + 5i) = (6 &minus; 2) + (&minus;1 &minus; 5)i = <strong>4 &minus; 6i</strong></p>
</div>

<p><strong>Multiplying:</strong> Use FOIL, then replace i<sup>2</sup> with &minus;1.</p>

<div class="example-box">
<h4>Worked Example 2: Multiplication</h4>
<p>(3 + 2i)(1 &minus; 4i)</p>
<p>= 3(1) + 3(&minus;4i) + 2i(1) + 2i(&minus;4i)</p>
<p>= 3 &minus; 12i + 2i &minus; 8i<sup>2</sup></p>
<p>= 3 &minus; 10i &minus; 8(&minus;1)</p>
<p>= 3 &minus; 10i + 8</p>
<p>= <strong>11 &minus; 10i</strong></p>
</div>

<h3>Complex Conjugates</h3>

<p>The <strong>conjugate</strong> of a + bi is a &minus; bi. Multiplying a complex number by its conjugate always produces a real number:</p>

<div class="math-display">(a + bi)(a &minus; bi) = a<sup>2</sup> + b<sup>2</sup></div>

<div class="example-box">
<h4>Worked Example 3: Solving x<sup>2</sup> + 1 = 0</h4>
<p>x<sup>2</sup> + 1 = 0</p>
<p>x<sup>2</sup> = &minus;1</p>
<p>x = &plusmn;&radic;(&minus;1) = &plusmn;i</p>
<p>The solutions are <strong>x = i</strong> and <strong>x = &minus;i</strong>. Notice these are conjugates of each other. Complex solutions to polynomial equations with real coefficients always come in conjugate pairs.</p>
</div>

<div class="warning-box">
<h4>Common Mistake</h4>
<p>Never write &radic;(&minus;4) &middot; &radic;(&minus;9) = &radic;36) = 6. The rule &radic;a &middot; &radic;b = &radic;(ab) only works when a and b are non-negative. Instead: &radic;(&minus;4) &middot; &radic;(&minus;9) = 2i &middot; 3i = 6i<sup>2</sup> = &minus;6.</p>
</div>

<div class="tip-box">
<h4>Powers of i Cycle</h4>
<p>i<sup>1</sup> = i, &nbsp; i<sup>2</sup> = &minus;1, &nbsp; i<sup>3</sup> = &minus;i, &nbsp; i<sup>4</sup> = 1, &nbsp; i<sup>5</sup> = i, &nbsp; ... The pattern repeats every 4. To find i<sup>n</sup>, divide n by 4 and use the remainder: remainder 0 gives 1, remainder 1 gives i, remainder 2 gives &minus;1, remainder 3 gives &minus;i.</p>
</div>

<div class="practice-problems">
<h3>Practice Problems</h3>

<p><strong>1.</strong> Simplify: &radic;(&minus;50)</p>
<details class="solution"><summary>Solution</summary>
<p>&radic;(&minus;50) = i&radic;50 = i &middot; 5&radic;2 = <strong>5i&radic;2</strong></p>
</details>

<p><strong>2.</strong> Compute: (5 + 3i) + (&minus;2 + 7i)</p>
<details class="solution"><summary>Solution</summary>
<p>(5 &minus; 2) + (3 + 7)i = <strong>3 + 10i</strong></p>
</details>

<p><strong>3.</strong> Multiply: (2 + i)(2 &minus; i)</p>
<details class="solution"><summary>Solution</summary>
<p>This is a conjugate pair: 2<sup>2</sup> + 1<sup>2</sup> = 4 + 1 = <strong>5</strong>. (A real number, as expected.)</p>
</details>

<p><strong>4.</strong> Simplify: i<sup>23</sup></p>
<details class="solution"><summary>Solution</summary>
<p>23 / 4 = 5 remainder 3. So i<sup>23</sup> = i<sup>3</sup> = <strong>&minus;i</strong>.</p>
</details>

<p><strong>5.</strong> Solve: x<sup>2</sup> + 9 = 0</p>
<details class="solution"><summary>Solution</summary>
<p>x<sup>2</sup> = &minus;9, so x = &plusmn;&radic;(&minus;9) = &plusmn;3i. Solutions: <strong>x = 3i and x = &minus;3i</strong>.</p>
</details>
</div>

<h3>Summary</h3>
<ul>
<li>i = &radic;(&minus;1) and i<sup>2</sup> = &minus;1.</li>
<li>Complex numbers have the form a + bi (real part + imaginary part).</li>
<li>Add/subtract by combining like parts; multiply using FOIL and i<sup>2</sup> = &minus;1.</li>
<li>Conjugate of a + bi is a &minus; bi; their product is always real: a<sup>2</sup> + b<sup>2</sup>.</li>
</ul>
`,

'R68': `
<h2>Law of Sines</h2>

<p>The Pythagorean theorem and SOH-CAH-TOA only work for right triangles. But most triangles in the real world are <em>not</em> right triangles. The <strong>Law of Sines</strong> lets you solve any triangle, as long as you know enough information.</p>

<h3>The Formula</h3>

<div class="math-display">sin(A) / a = sin(B) / b = sin(C) / c</div>

<p>Here A, B, C are the <strong>angles</strong> and a, b, c are the <strong>sides opposite</strong> those angles respectively. The law says: the ratio of the sine of an angle to its opposite side is the same for all three angle-side pairs.</p>

<h3>When to Use the Law of Sines</h3>

<div class="vocab-table">
<table>
<tr><th>Given Information</th><th>Case Name</th><th>Use Law of Sines?</th></tr>
<tr><td>Two angles and a side between them</td><td>ASA</td><td>Yes (find 3rd angle first)</td></tr>
<tr><td>Two angles and a non-included side</td><td>AAS</td><td>Yes</td></tr>
<tr><td>Two sides and an angle opposite one</td><td>SSA</td><td>Yes (ambiguous case -- careful!)</td></tr>
<tr><td>Two sides and the included angle</td><td>SAS</td><td>No -- use Law of Cosines</td></tr>
</table>
</div>

<div class="example-box">
<h4>Worked Example 1: AAS Case</h4>
<p>In triangle ABC, A = 40 degrees, B = 70 degrees, a = 10. Find side b.</p>
<ol class="step-list">
<li>Find angle C: C = 180 &minus; 40 &minus; 70 = 70 degrees.</li>
<li>Apply Law of Sines: sin(40)/10 = sin(70)/b</li>
<li>Solve: b = 10 &middot; sin(70) / sin(40) = 10 &middot; 0.9397 / 0.6428 = <strong>14.62</strong></li>
</ol>
</div>

<h3>The Ambiguous Case (SSA)</h3>

<p>When you know two sides and an angle opposite one of them (SSA), there may be <strong>zero, one, or two</strong> possible triangles. This is called the <strong>ambiguous case</strong>.</p>

<div class="example-box">
<h4>Worked Example 2: SSA -- Two Solutions</h4>
<p>Given: a = 8, b = 12, A = 30 degrees. Find angle B.</p>
<p>sin(30)/8 = sin(B)/12</p>
<p>sin(B) = 12 &middot; sin(30)/8 = 12 &middot; 0.5/8 = 0.75</p>
<p>B = arcsin(0.75) = 48.59 degrees</p>
<p>But wait -- sine is also positive in quadrant II: B could also be 180 &minus; 48.59 = 131.41 degrees.</p>
<p>Check: A + B = 30 + 131.41 = 161.41 &lt; 180. This works too!</p>
<p><strong>Two valid triangles:</strong> one with B = 48.59 degrees, another with B = 131.41 degrees.</p>
</div>

<h3>Triangle Area Formula</h3>

<p>The Law of Sines gives us a convenient area formula for any triangle:</p>
<div class="math-display">Area = (1/2) &middot; a &middot; b &middot; sin(C)</div>
<p>where a and b are two sides and C is the <strong>included</strong> angle between them.</p>

<div class="example-box">
<h4>Worked Example 3: Area</h4>
<p>Find the area of a triangle with sides a = 7, b = 10, and included angle C = 55 degrees.</p>
<p>Area = (1/2)(7)(10) sin(55) = 35 &middot; 0.8192 = <strong>28.67 square units</strong></p>
</div>

<div class="warning-box">
<h4>Common Mistake</h4>
<p>In the ambiguous case, students often forget to check whether the second possible angle (180 &minus; B) also forms a valid triangle. Always verify that the sum of all angles is less than 180 degrees before rejecting or accepting a solution.</p>
</div>

<div class="tip-box">
<h4>Matching Pairs</h4>
<p>Each ratio in the Law of Sines links an angle with its <strong>opposite</strong> side. Always double-check that you are pairing each angle with the side across from it in the triangle -- not the side adjacent to it.</p>
</div>

<div class="practice-problems">
<h3>Practice Problems</h3>

<p><strong>1.</strong> In triangle ABC, A = 50 degrees, B = 60 degrees, a = 15. Find b.</p>
<details class="solution"><summary>Solution</summary>
<p>sin(50)/15 = sin(60)/b. So b = 15 sin(60)/sin(50) = 15(0.8660)/0.7660 = <strong>16.96</strong>.</p>
</details>

<p><strong>2.</strong> In triangle ABC, A = 35 degrees, C = 85 degrees, c = 20. Find a.</p>
<details class="solution"><summary>Solution</summary>
<p>B = 180 &minus; 35 &minus; 85 = 60 degrees. sin(35)/a = sin(85)/20. So a = 20 sin(35)/sin(85) = 20(0.5736)/0.9962 = <strong>11.52</strong>.</p>
</details>

<p><strong>3.</strong> Given a = 10, b = 14, A = 42 degrees. How many triangles are possible?</p>
<details class="solution"><summary>Solution</summary>
<p>sin(B) = 14 sin(42)/10 = 14(0.6691)/10 = 0.9368. B = arcsin(0.9368) = 69.5 degrees. Second possibility: B = 110.5 degrees. Check: 42 + 110.5 = 152.5 &lt; 180. Both work. <strong>Two triangles</strong> are possible.</p>
</details>

<p><strong>4.</strong> Find the area of a triangle with sides 8 and 11, with an included angle of 40 degrees.</p>
<details class="solution"><summary>Solution</summary>
<p>Area = (1/2)(8)(11) sin(40) = 44(0.6428) = <strong>28.28 square units</strong>.</p>
</details>

<p><strong>5.</strong> In triangle ABC, a = 5, A = 30 degrees, b = 20. How many triangles are possible?</p>
<details class="solution"><summary>Solution</summary>
<p>sin(B) = 20 sin(30)/5 = 20(0.5)/5 = 2. Since sin(B) cannot exceed 1, <strong>no triangle</strong> is possible.</p>
</details>
</div>

<h3>Summary</h3>
<ul>
<li>Law of Sines: sin(A)/a = sin(B)/b = sin(C)/c.</li>
<li>Use for AAS, ASA, and SSA configurations.</li>
<li>The SSA case is ambiguous -- check for 0, 1, or 2 solutions.</li>
<li>Area = (1/2)ab sin(C) for any triangle using two sides and the included angle.</li>
</ul>
`,

'R69': `
<h2>Law of Cosines</h2>

<p>The <strong>Law of Cosines</strong> is the all-purpose tool for solving triangles. It works when the Law of Sines cannot (SAS and SSS cases), and it generalizes the Pythagorean theorem to <em>all</em> triangles -- not just right triangles.</p>

<h3>The Formula</h3>

<div class="math-display">c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> &minus; 2ab cos(C)</div>

<p>Here c is the side <strong>opposite</strong> angle C, and a, b are the other two sides. The formula can be rewritten for any side:</p>

<div class="math-display">a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup> &minus; 2bc cos(A)<br>
b<sup>2</sup> = a<sup>2</sup> + c<sup>2</sup> &minus; 2ac cos(B)</div>

<h3>Connection to the Pythagorean Theorem</h3>

<p>When C = 90 degrees, cos(90) = 0, so the &minus;2ab cos(C) term vanishes:</p>
<div class="math-display">c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> &minus; 2ab(0) = a<sup>2</sup> + b<sup>2</sup></div>
<p>The Pythagorean theorem is just a special case of the Law of Cosines.</p>

<div class="example-box">
<h4>Worked Example 1: SAS -- Finding a Side</h4>
<p>In triangle ABC, a = 8, b = 11, C = 37 degrees. Find side c.</p>
<ol class="step-list">
<li>Apply the formula: c<sup>2</sup> = 8<sup>2</sup> + 11<sup>2</sup> &minus; 2(8)(11) cos(37)</li>
<li>c<sup>2</sup> = 64 + 121 &minus; 176(0.7986)</li>
<li>c<sup>2</sup> = 185 &minus; 140.55 = 44.45</li>
<li>c = &radic;44.45 = <strong>6.67</strong></li>
</ol>
</div>

<h3>Finding an Angle (SSS Case)</h3>

<p>When you know all three sides, rearrange the formula to solve for an angle:</p>
<div class="math-display">cos(C) = (a<sup>2</sup> + b<sup>2</sup> &minus; c<sup>2</sup>) / (2ab)</div>

<div class="example-box">
<h4>Worked Example 2: SSS -- Finding an Angle</h4>
<p>A triangle has sides a = 5, b = 7, c = 9. Find angle C.</p>
<ol class="step-list">
<li>cos(C) = (5<sup>2</sup> + 7<sup>2</sup> &minus; 9<sup>2</sup>) / (2 &middot; 5 &middot; 7)</li>
<li>cos(C) = (25 + 49 &minus; 81) / 70 = &minus;7/70 = &minus;0.1</li>
<li>C = arccos(&minus;0.1) = <strong>95.74 degrees</strong></li>
</ol>
<p>The negative cosine tells us angle C is obtuse (greater than 90 degrees).</p>
</div>

<h3>Law of Sines vs. Law of Cosines</h3>

<div class="vocab-table">
<table>
<tr><th>Situation</th><th>Best Tool</th></tr>
<tr><td>AAS or ASA</td><td>Law of Sines</td></tr>
<tr><td>SSA (ambiguous)</td><td>Law of Sines (check for two solutions)</td></tr>
<tr><td>SAS</td><td>Law of Cosines</td></tr>
<tr><td>SSS</td><td>Law of Cosines</td></tr>
</table>
</div>

<div class="example-box">
<h4>Worked Example 3: Real-World Application</h4>
<p>Two boats leave a dock. Boat A travels 12 km on a bearing of 040 degrees, and Boat B travels 18 km on a bearing of 100 degrees. How far apart are the boats?</p>
<p>The angle between their paths is 100 &minus; 40 = 60 degrees. We have SAS: a = 12, b = 18, C = 60 degrees.</p>
<p>c<sup>2</sup> = 12<sup>2</sup> + 18<sup>2</sup> &minus; 2(12)(18) cos(60)</p>
<p>c<sup>2</sup> = 144 + 324 &minus; 432(0.5) = 468 &minus; 216 = 252</p>
<p>c = &radic;252 = <strong>15.87 km</strong></p>
</div>

<div class="warning-box">
<h4>Common Mistake</h4>
<p>When finding an angle using cos(C) = (a<sup>2</sup> + b<sup>2</sup> &minus; c<sup>2</sup>)/(2ab), make sure <strong>c is the side opposite angle C</strong>. The side you are "solving against" must be the one across from the angle. Mixing up which side is opposite which angle is the most frequent error.</p>
</div>

<div class="tip-box">
<h4>Checking Your Work</h4>
<p>After finding all angles, verify they sum to 180 degrees. After finding all sides, check that the largest side is opposite the largest angle. These quick checks catch most errors.</p>
</div>

<div class="practice-problems">
<h3>Practice Problems</h3>

<p><strong>1.</strong> Find side c: a = 6, b = 10, C = 50 degrees.</p>
<details class="solution"><summary>Solution</summary>
<p>c<sup>2</sup> = 36 + 100 &minus; 120 cos(50) = 136 &minus; 120(0.6428) = 136 &minus; 77.14 = 58.86. c = &radic;58.86 = <strong>7.67</strong>.</p>
</details>

<p><strong>2.</strong> Find angle A: a = 13, b = 8, c = 9.</p>
<details class="solution"><summary>Solution</summary>
<p>cos(A) = (64 + 81 &minus; 169)/(2 &middot; 8 &middot; 9) = &minus;24/144 = &minus;1/6. A = arccos(&minus;1/6) = <strong>99.59 degrees</strong>.</p>
</details>

<p><strong>3.</strong> A triangle has sides 4, 5, and 6. Find the largest angle.</p>
<details class="solution"><summary>Solution</summary>
<p>The largest angle is opposite the longest side (6). cos(C) = (16 + 25 &minus; 36)/(2 &middot; 4 &middot; 5) = 5/40 = 0.125. C = arccos(0.125) = <strong>82.82 degrees</strong>.</p>
</details>

<p><strong>4.</strong> Two hikers leave a trailhead. One walks 3 miles due north, the other walks 4 miles on a bearing of N 60 degrees E. How far apart are they?</p>
<details class="solution"><summary>Solution</summary>
<p>The angle between them is 60 degrees. d<sup>2</sup> = 9 + 16 &minus; 24 cos(60) = 25 &minus; 12 = 13. d = &radic;13 = <strong>3.61 miles</strong>.</p>
</details>

<p><strong>5.</strong> Verify: if a = 3, b = 4, C = 90 degrees, use the Law of Cosines to find c.</p>
<details class="solution"><summary>Solution</summary>
<p>c<sup>2</sup> = 9 + 16 &minus; 24 cos(90) = 25 &minus; 0 = 25. c = 5. This matches the 3-4-5 right triangle -- confirming the Law of Cosines reduces to the Pythagorean theorem when C = 90 degrees.</p>
</details>
</div>

<h3>Summary</h3>
<ul>
<li>Law of Cosines: c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> &minus; 2ab cos(C).</li>
<li>Use it for SAS (find a side) and SSS (find an angle).</li>
<li>It generalizes the Pythagorean theorem to all triangles.</li>
<li>Rearrange to cos(C) = (a<sup>2</sup> + b<sup>2</sup> &minus; c<sup>2</sup>)/(2ab) when solving for angles.</li>
</ul>
`,

'R70': `
<h2>Arc Length and Sector Area</h2>

<p>When you slice a pizza, you create a <strong>sector</strong> -- a "pie slice" shape bounded by two radii and an arc. The formulas for arc length and sector area are beautifully simple in radians, and they appear everywhere from engineering to satellite coverage calculations.</p>

<h3>Arc Length</h3>

<p>The <strong>arc length</strong> s is the distance along the curved edge of a sector:</p>

<div class="math-display">s = r &middot; &theta; &nbsp;&nbsp;&nbsp; (&theta; in radians)</div>

<p>This formula is actually the <em>definition</em> of a radian: an angle of 1 radian subtends an arc exactly equal to the radius.</p>

<p>If the angle is given in degrees, convert first:</p>
<div class="math-display">&theta; (radians) = &theta; (degrees) &times; &pi; / 180</div>

<div class="example-box">
<h4>Worked Example 1: Arc Length</h4>
<p>Find the arc length of a sector with radius 10 cm and central angle 2.5 radians.</p>
<p>s = r&theta; = 10 &times; 2.5 = <strong>25 cm</strong></p>
</div>

<div class="example-box">
<h4>Worked Example 2: Arc Length from Degrees</h4>
<p>Find the arc length of a sector with radius 6 inches and central angle 120 degrees.</p>
<ol class="step-list">
<li>Convert: &theta; = 120 &times; &pi;/180 = 2&pi;/3 radians.</li>
<li>s = 6 &times; 2&pi;/3 = 4&pi; = <strong>12.57 inches</strong>.</li>
</ol>
</div>

<h3>Sector Area</h3>

<p>The <strong>sector area</strong> is the area of the "pie slice":</p>

<div class="math-display">A = (1/2) r<sup>2</sup> &theta; &nbsp;&nbsp;&nbsp; (&theta; in radians)</div>

<p>Think of it as a fraction of the full circle's area: if the angle is &theta; out of a full rotation 2&pi;, then the fraction is &theta;/(2&pi;), and the area is (&theta;/(2&pi;)) &times; &pi;r<sup>2</sup> = (1/2)r<sup>2</sup>&theta;.</p>

<div class="example-box">
<h4>Worked Example 3: Sector Area and Arc Length Together</h4>
<p>A sprinkler waters a sector of a lawn with radius 15 feet and a central angle of 80 degrees. Find the arc length of the watered boundary and the total area watered.</p>
<ol class="step-list">
<li>Convert: &theta; = 80 &times; &pi;/180 = 4&pi;/9 radians.</li>
<li>Arc length: s = 15 &times; 4&pi;/9 = 60&pi;/9 = 20&pi;/3 = <strong>20.94 feet</strong>.</li>
<li>Area: A = (1/2)(15<sup>2</sup>)(4&pi;/9) = (1/2)(225)(4&pi;/9) = 450&pi;/9 = 50&pi; = <strong>157.08 sq ft</strong>.</li>
</ol>
</div>

<div class="warning-box">
<h4>Common Mistake</h4>
<p>These formulas require &theta; in <strong>radians</strong>. If you plug in degrees, your answer will be wildly wrong. A 90-degree angle is &pi;/2 = 1.571 radians. Using 90 instead of 1.571 gives an answer about 57 times too large.</p>
</div>

<div class="tip-box">
<h4>Quick Degree Formulas</h4>
<p>If you prefer to stay in degrees, the formulas become: Arc length = (d/360) &times; 2&pi;r and Sector area = (d/360) &times; &pi;r<sup>2</sup>, where d is the angle in degrees. But the radian formulas are simpler and more commonly used.</p>
</div>

<div class="practice-problems">
<h3>Practice Problems</h3>

<p><strong>1.</strong> Find the arc length: r = 8 m, &theta; = &pi;/4 radians.</p>
<details class="solution"><summary>Solution</summary>
<p>s = 8(&pi;/4) = 2&pi; = <strong>6.28 m</strong>.</p>
</details>

<p><strong>2.</strong> Find the sector area: r = 12 cm, &theta; = &pi;/3 radians.</p>
<details class="solution"><summary>Solution</summary>
<p>A = (1/2)(144)(&pi;/3) = 24&pi; = <strong>75.40 cm<sup>2</sup></strong>.</p>
</details>

<p><strong>3.</strong> A pizza has a 14-inch diameter. Each slice has a central angle of 45 degrees. Find the arc length (crust length) and area of one slice.</p>
<details class="solution"><summary>Solution</summary>
<p>Radius = 7 inches. &theta; = 45 &times; &pi;/180 = &pi;/4. Arc length = 7(&pi;/4) = 7&pi;/4 = <strong>5.50 inches</strong>. Area = (1/2)(49)(&pi;/4) = 49&pi;/8 = <strong>19.24 sq in</strong>.</p>
</details>

<p><strong>4.</strong> An arc is 10 cm long on a circle with radius 4 cm. Find the central angle in radians and degrees.</p>
<details class="solution"><summary>Solution</summary>
<p>&theta; = s/r = 10/4 = <strong>2.5 radians</strong>. In degrees: 2.5 &times; 180/&pi; = <strong>143.24 degrees</strong>.</p>
</details>

<p><strong>5.</strong> A windshield wiper is 18 inches long and sweeps through 110 degrees. What area does it clean?</p>
<details class="solution"><summary>Solution</summary>
<p>&theta; = 110 &times; &pi;/180 = 11&pi;/18. A = (1/2)(18<sup>2</sup>)(11&pi;/18) = (1/2)(324)(11&pi;/18) = 99&pi; = <strong>311.02 sq in</strong>.</p>
</details>
</div>

<h3>Summary</h3>
<ul>
<li>Arc length: s = r&theta; (angle must be in radians).</li>
<li>Sector area: A = (1/2)r<sup>2</sup>&theta; (angle must be in radians).</li>
<li>Convert degrees to radians: multiply by &pi;/180.</li>
<li>These formulas appear in real-world contexts from sprinklers to satellite dishes to windshield wipers.</li>
</ul>
`,

'R71': `
<h2>Sigma Notation and Finite Series</h2>

<p><strong>Sigma notation</strong> (also called summation notation) is a compact way to write the sum of many terms following a pattern. Instead of writing out dozens of terms, we use the Greek letter sigma -- &Sigma; -- to say "add all these up."</p>

<h3>Reading Sigma Notation</h3>

<div class="math-display">&Sigma;<sub>k=1</sub><sup>n</sup> a<sub>k</sub> = a<sub>1</sub> + a<sub>2</sub> + a<sub>3</sub> + ... + a<sub>n</sub></div>

<div class="vocab-table">
<table>
<tr><th>Component</th><th>Name</th><th>Role</th></tr>
<tr><td>&Sigma;</td><td>Sigma</td><td>Means "sum"</td></tr>
<tr><td>k</td><td>Index variable</td><td>Counter that changes each term</td></tr>
<tr><td>1</td><td>Lower limit</td><td>Starting value of k</td></tr>
<tr><td>n</td><td>Upper limit</td><td>Ending value of k</td></tr>
<tr><td>a<sub>k</sub></td><td>General term</td><td>Formula evaluated for each k</td></tr>
</table>
</div>

<div class="example-box">
<h4>Worked Example 1: Expanding Sigma Notation</h4>
<p>Write out and evaluate: &Sigma;<sub>k=1</sub><sup>5</sup> (2k + 1)</p>
<p>Substitute k = 1, 2, 3, 4, 5:</p>
<p>(2(1)+1) + (2(2)+1) + (2(3)+1) + (2(4)+1) + (2(5)+1)</p>
<p>= 3 + 5 + 7 + 9 + 11 = <strong>35</strong></p>
</div>

<h3>Writing Series in Sigma Form</h3>

<p>To convert a series into sigma notation, identify the <strong>pattern</strong> in terms of the index variable.</p>

<div class="example-box">
<h4>Worked Example 2: Creating Sigma Notation</h4>
<p>Write in sigma notation: 4 + 8 + 12 + 16 + 20 + 24</p>
<p>Each term is 4k where k goes from 1 to 6.</p>
<p><strong>&Sigma;<sub>k=1</sub><sup>6</sup> 4k</strong></p>
<p>Alternatively: 4 &middot; &Sigma;<sub>k=1</sub><sup>6</sup> k (factoring out the constant).</p>
</div>

<h3>Arithmetic Series Sum</h3>

<p>An <strong>arithmetic series</strong> has a constant difference between consecutive terms. Its sum is:</p>
<div class="math-display">S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>) / 2</div>
<p>where n is the number of terms, a<sub>1</sub> is the first term, and a<sub>n</sub> is the last term.</p>

<p>The famous special case: &Sigma;<sub>k=1</sub><sup>n</sup> k = n(n+1)/2.</p>

<h3>Geometric Series Sum</h3>

<p>A <strong>geometric series</strong> has a constant ratio between consecutive terms. Its sum is:</p>
<div class="math-display">S<sub>n</sub> = a<sub>1</sub>(1 &minus; r<sup>n</sup>) / (1 &minus; r) &nbsp;&nbsp;&nbsp; (r &ne; 1)</div>
<p>where a<sub>1</sub> is the first term and r is the common ratio.</p>

<div class="example-box">
<h4>Worked Example 3: Applying Sum Formulas</h4>
<p><strong>Arithmetic:</strong> Find &Sigma;<sub>k=1</sub><sup>100</sup> k.</p>
<p>S = 100(101)/2 = <strong>5050</strong></p>
<p>(This is the sum Gauss famously computed as a child.)</p>

<p><strong>Geometric:</strong> Find &Sigma;<sub>k=0</sub><sup>5</sup> 3(2<sup>k</sup>).</p>
<p>Here a<sub>1</sub> = 3, r = 2, n = 6 terms (k = 0 through 5).</p>
<p>S = 3(1 &minus; 2<sup>6</sup>)/(1 &minus; 2) = 3(1 &minus; 64)/(&minus;1) = 3(63) = <strong>189</strong></p>
<p>Check: 3 + 6 + 12 + 24 + 48 + 96 = 189.</p>
</div>

<h3>Telescoping Series</h3>

<p>In a <strong>telescoping series</strong>, most terms cancel when the sum is expanded, leaving only a few terms from the beginning and end.</p>

<p>Example: &Sigma;<sub>k=1</sub><sup>n</sup> [1/k &minus; 1/(k+1)] = (1 &minus; 1/2) + (1/2 &minus; 1/3) + ... + (1/n &minus; 1/(n+1)) = 1 &minus; 1/(n+1) = n/(n+1).</p>

<div class="warning-box">
<h4>Common Mistake</h4>
<p>Watch the lower limit carefully. &Sigma;<sub>k=0</sub><sup>4</sup> has 5 terms (k = 0, 1, 2, 3, 4), not 4. The number of terms is (upper limit &minus; lower limit + 1). Getting this wrong leads to incorrect sums.</p>
</div>

<div class="tip-box">
<h4>Useful Sigma Properties</h4>
<p>&Sigma;(ca<sub>k</sub>) = c &middot; &Sigma;a<sub>k</sub> (constants factor out). &Sigma;(a<sub>k</sub> + b<sub>k</sub>) = &Sigma;a<sub>k</sub> + &Sigma;b<sub>k</sub> (sums split). These let you break complex sums into simpler pieces.</p>
</div>

<div class="practice-problems">
<h3>Practice Problems</h3>

<p><strong>1.</strong> Expand and evaluate: &Sigma;<sub>k=1</sub><sup>4</sup> k<sup>2</sup></p>
<details class="solution"><summary>Solution</summary>
<p>1<sup>2</sup> + 2<sup>2</sup> + 3<sup>2</sup> + 4<sup>2</sup> = 1 + 4 + 9 + 16 = <strong>30</strong>.</p>
</details>

<p><strong>2.</strong> Write in sigma notation: 5 + 10 + 15 + 20 + ... + 100.</p>
<details class="solution"><summary>Solution</summary>
<p><strong>&Sigma;<sub>k=1</sub><sup>20</sup> 5k</strong>. There are 20 terms (100/5 = 20). Sum = 20(5 + 100)/2 = 1050.</p>
</details>

<p><strong>3.</strong> Find the sum: &Sigma;<sub>k=1</sub><sup>8</sup> 3 &middot; 2<sup>k&minus;1</sup></p>
<details class="solution"><summary>Solution</summary>
<p>Geometric series: a<sub>1</sub> = 3, r = 2, n = 8. S = 3(1 &minus; 256)/(1 &minus; 2) = 3(255) = <strong>765</strong>.</p>
</details>

<p><strong>4.</strong> Evaluate the telescoping sum: &Sigma;<sub>k=1</sub><sup>50</sup> [1/k &minus; 1/(k+1)]</p>
<details class="solution"><summary>Solution</summary>
<p>Most terms cancel. Sum = 1 &minus; 1/51 = <strong>50/51</strong>.</p>
</details>

<p><strong>5.</strong> Find: &Sigma;<sub>k=1</sub><sup>n</sup> (3k &minus; 1). Express your answer in terms of n.</p>
<details class="solution"><summary>Solution</summary>
<p>Split: 3&Sigma;k &minus; &Sigma;1 = 3 &middot; n(n+1)/2 &minus; n = 3n(n+1)/2 &minus; n = n[3(n+1)/2 &minus; 1] = n(3n+3&minus;2)/2 = <strong>n(3n+1)/2</strong>.</p>
</details>
</div>

<h3>Summary</h3>
<ul>
<li>Sigma notation compactly represents the sum of terms following a pattern.</li>
<li>Arithmetic series sum: S = n(a<sub>1</sub> + a<sub>n</sub>)/2.</li>
<li>Geometric series sum: S = a<sub>1</sub>(1 &minus; r<sup>n</sup>)/(1 &minus; r).</li>
<li>Telescoping series collapse to just a few surviving terms.</li>
</ul>
`,

'R72': `
<h2>Estimation and Reasonableness</h2>

<p>Not every math problem requires an exact answer. In everyday life -- shopping, cooking, budgeting, science -- quick estimates are often more useful than precise calculations. More importantly, estimation helps you catch errors: if your calculator says a $3.50 item costs $350.00 after tax, your number sense should set off alarm bells.</p>

<h3>Rounding Strategies</h3>

<p>The simplest estimation strategy: <strong>round</strong> numbers before computing.</p>

<div class="example-box">
<h4>Worked Example 1: Rounding to Estimate</h4>
<p>Estimate: 487 + 312 + 196</p>
<p>Round to the nearest hundred: 500 + 300 + 200 = <strong>1000</strong></p>
<p>Exact answer: 995. The estimate is very close.</p>
<p>Estimate: 38 &times; 52</p>
<p>Round: 40 &times; 50 = <strong>2000</strong></p>
<p>Exact answer: 1976. Again, close enough for a quick check.</p>
</div>

<h3>Front-End Estimation</h3>

<p><strong>Front-end estimation</strong> uses only the leading (leftmost) digits, then adjusts with the remaining digits.</p>

<ol class="step-list">
<li>Add the front-end digits (leftmost place value).</li>
<li>Estimate the sum of the remaining digits.</li>
<li>Combine the two estimates.</li>
</ol>

<div class="example-box">
<h4>Worked Example 2: Front-End Estimation</h4>
<p>Estimate: $3.87 + $5.42 + $2.19</p>
<p><strong>Front-end:</strong> $3 + $5 + $2 = $10</p>
<p><strong>Adjust:</strong> $0.87 + $0.42 + $0.19 is roughly $1.50</p>
<p><strong>Estimate:</strong> $10 + $1.50 = <strong>$11.50</strong></p>
<p>Exact: $11.48. Front-end estimation with adjustment is very accurate.</p>
</div>

<h3>Compatible Numbers</h3>

<p><strong>Compatible numbers</strong> are numbers that work well together -- they divide evenly, add to round numbers, or are easy to compute mentally.</p>

<p>To estimate 7,342 / 8, think: "What is close to 7,342 that divides nicely by 8?" Try 7,200: 7,200 / 8 = 900. Or 8,000 / 8 = 1,000. The exact answer (917.75) is between these estimates.</p>

<h3>Order of Magnitude</h3>

<p>An <strong>order of magnitude</strong> estimate tells you the general size -- is the answer in the tens, hundreds, thousands, or millions? This is the most basic reasonableness check.</p>

<div class="math-display">Order of magnitude = the nearest power of 10</div>

<p>The population of a city: order of magnitude 10<sup>5</sup> or 10<sup>6</sup>. Your height in millimeters: order of magnitude 10<sup>3</sup>.</p>

<h3>Fermi Problems</h3>

<p><strong>Fermi problems</strong> (named after physicist Enrico Fermi) ask you to estimate quantities that seem impossible to know, by breaking them into pieces you <em>can</em> estimate.</p>

<div class="example-box">
<h4>Worked Example 3: A Fermi Problem</h4>
<p>How many piano tuners are there in Chicago?</p>
<ol class="step-list">
<li><strong>Population of Chicago:</strong> about 2.7 million, so roughly 1 million households (2-3 people per household).</li>
<li><strong>Fraction with pianos:</strong> maybe 1 in 20 households = 50,000 pianos.</li>
<li><strong>Tuning frequency:</strong> each piano tuned about once per year = 50,000 tunings/year.</li>
<li><strong>Tuner capacity:</strong> a tuner can do about 4 pianos per day, 250 working days/year = 1,000 tunings/year.</li>
<li><strong>Number of tuners:</strong> 50,000 / 1,000 = <strong>about 50 piano tuners</strong>.</li>
</ol>
<p>The actual number is estimated at 100-200, so our order of magnitude (10<sup>1</sup> to 10<sup>2</sup>) is right.</p>
</div>

<div class="warning-box">
<h4>Common Mistake</h4>
<p>Students often think estimation means "guessing." It does not. Good estimation uses number sense, rounding, and logical reasoning. An estimate of 38 &times; 52 should be close to 2000 -- not "a few hundred" or "ten thousand." If your exact answer and your estimate are wildly different, one of them is wrong.</p>
</div>

<div class="tip-box">
<h4>The Reasonableness Check</h4>
<p>After solving any problem, ask: "Does this answer make sense?" If you calculated that a car traveling 60 mph covers 3 miles in 2 hours, something is wrong. If you found the area of a bedroom to be 50,000 square feet, that is a football field, not a bedroom. Always sanity-check your results.</p>
</div>

<div class="practice-problems">
<h3>Practice Problems</h3>

<p><strong>1.</strong> Estimate: 4,821 + 3,197 + 1,988</p>
<details class="solution"><summary>Solution</summary>
<p>Round: 5,000 + 3,000 + 2,000 = <strong>10,000</strong>. (Exact: 10,006.)</p>
</details>

<p><strong>2.</strong> Use compatible numbers to estimate: 6,391 / 7</p>
<details class="solution"><summary>Solution</summary>
<p>6,300 / 7 = <strong>900</strong>. (Exact: 913.)</p>
</details>

<p><strong>3.</strong> A store receipt shows: $12.95 + $4.50 + $8.99 + $3.25. Estimate the total before looking at the register.</p>
<details class="solution"><summary>Solution</summary>
<p>Round: $13 + $5 + $9 + $3 = <strong>$30</strong>. (Exact: $29.69.)</p>
</details>

<p><strong>4.</strong> Fermi problem: About how many words are in a typical 300-page novel?</p>
<details class="solution"><summary>Solution</summary>
<p>A page has roughly 250-300 words. Using 250: 300 &times; 250 = <strong>75,000 words</strong>. (Typical novels range from 60,000 to 100,000 words, so this is reasonable.)</p>
</details>

<p><strong>5.</strong> A student calculates the area of a rectangle 12 m by 8 m and gets 960 m<sup>2</sup>. Is this reasonable?</p>
<details class="solution"><summary>Solution</summary>
<p>No. Quick estimate: 10 &times; 8 = 80 m<sup>2</sup>. The correct answer is 12 &times; 8 = 96 m<sup>2</sup>. The student likely made an error (perhaps multiplying 12 &times; 80 instead of 12 &times; 8). Estimation caught the mistake.</p>
</details>
</div>

<h3>Summary</h3>
<ul>
<li>Rounding, front-end estimation, and compatible numbers are practical estimation tools.</li>
<li>Order of magnitude tells you the "ballpark" (tens, hundreds, thousands).</li>
<li>Fermi problems break impossible questions into estimable pieces.</li>
<li>Always check: "Does my answer make sense?" Estimation is your error detector.</li>
</ul>
`,

'R73': `
<h2>Box Plots and Interquartile Range</h2>

<p>A <strong>box plot</strong> (also called a box-and-whisker plot) gives you a visual snapshot of how data is spread out. In one compact diagram, you can see the center, spread, skewness, and outliers of a data set -- making it one of the most useful tools in statistics.</p>

<h3>The Five-Number Summary</h3>

<p>Every box plot is built from five key values:</p>

<div class="vocab-table">
<table>
<tr><th>Statistic</th><th>What It Is</th></tr>
<tr><td>Minimum</td><td>Smallest value (excluding outliers)</td></tr>
<tr><td>Q1 (First Quartile)</td><td>Median of the lower half (25th percentile)</td></tr>
<tr><td>Median (Q2)</td><td>Middle value (50th percentile)</td></tr>
<tr><td>Q3 (Third Quartile)</td><td>Median of the upper half (75th percentile)</td></tr>
<tr><td>Maximum</td><td>Largest value (excluding outliers)</td></tr>
</table>
</div>

<div class="example-box">
<h4>Worked Example 1: Finding the Five-Number Summary</h4>
<p>Data (already sorted): 2, 4, 5, 7, 8, 10, 11, 13, 15, 18, 20</p>
<p>There are 11 values.</p>
<ol class="step-list">
<li><strong>Minimum:</strong> 2</li>
<li><strong>Median (Q2):</strong> The 6th value = 10</li>
<li><strong>Q1:</strong> Median of the lower half (2, 4, 5, 7, 8) = 5</li>
<li><strong>Q3:</strong> Median of the upper half (11, 13, 15, 18, 20) = 15</li>
<li><strong>Maximum:</strong> 20</li>
</ol>
<p>Five-number summary: <strong>2, 5, 10, 15, 20</strong></p>
</div>

<h3>Interquartile Range (IQR)</h3>

<div class="math-display">IQR = Q3 &minus; Q1</div>

<p>The IQR measures the spread of the <strong>middle 50%</strong> of the data. It is not affected by extreme values, making it a more robust measure of spread than the range.</p>

<p>From Example 1: IQR = 15 &minus; 5 = <strong>10</strong>.</p>

<h3>Identifying Outliers: The 1.5 &times; IQR Rule</h3>

<p>A data point is an <strong>outlier</strong> if it falls:</p>
<div class="math-display">Below Q1 &minus; 1.5 &times; IQR &nbsp;&nbsp; or &nbsp;&nbsp; Above Q3 + 1.5 &times; IQR</div>

<div class="example-box">
<h4>Worked Example 2: Detecting Outliers</h4>
<p>Data: 3, 5, 7, 8, 9, 10, 11, 12, 14, 35</p>
<p>Q1 = 7, Q3 = 12, IQR = 5.</p>
<p>Lower fence: 7 &minus; 1.5(5) = 7 &minus; 7.5 = &minus;0.5</p>
<p>Upper fence: 12 + 1.5(5) = 12 + 7.5 = 19.5</p>
<p>Any value below &minus;0.5 or above 19.5 is an outlier. The value <strong>35 is an outlier</strong>.</p>
<p>On the box plot, the right whisker extends to 14 (the largest non-outlier), and 35 is plotted as a separate dot.</p>
</div>

<h3>Drawing a Box Plot</h3>

<ol class="step-list">
<li>Draw a number line covering the data range.</li>
<li>Draw a box from Q1 to Q3.</li>
<li>Draw a vertical line inside the box at the median.</li>
<li>Extend whiskers from Q1 to the minimum non-outlier and from Q3 to the maximum non-outlier.</li>
<li>Plot any outliers as individual dots beyond the whiskers.</li>
</ol>

<h3>Comparing Distributions</h3>

<div class="example-box">
<h4>Worked Example 3: Comparing Two Classes</h4>
<p><strong>Class A scores:</strong> Min=55, Q1=68, Median=75, Q3=84, Max=95</p>
<p><strong>Class B scores:</strong> Min=40, Q1=72, Median=80, Q3=88, Max=98</p>
<p>Comparing:</p>
<ul>
<li><strong>Center:</strong> Class B has a higher median (80 vs 75).</li>
<li><strong>Spread:</strong> Class A: IQR = 16. Class B: IQR = 16. Same middle spread.</li>
<li><strong>Range:</strong> Class A: 40. Class B: 58. Class B has more total variability.</li>
<li><strong>Skewness:</strong> In Class A, the median is closer to Q1, suggesting a slight right skew. In Class B, the long left whisker suggests left skew.</li>
</ul>
</div>

<div class="warning-box">
<h4>Common Mistake</h4>
<p>The whiskers do NOT always extend to the minimum and maximum of the data. If there are outliers, the whiskers stop at the most extreme non-outlier values. Outliers are shown as separate points. Many students draw whiskers to every data point, which defeats the purpose of outlier detection.</p>
</div>

<div class="tip-box">
<h4>Reading Box Plot Shape</h4>
<p>If the median line is closer to Q1, the data is right-skewed (tail stretches right). If closer to Q3, it is left-skewed. If roughly centered in the box, the data is approximately symmetric. Longer whiskers also indicate skewness in that direction.</p>
</div>

<div class="practice-problems">
<h3>Practice Problems</h3>

<p><strong>1.</strong> Find the five-number summary: 12, 15, 18, 22, 25, 28, 30, 35, 40.</p>
<details class="solution"><summary>Solution</summary>
<p>Min = 12. Q1 = (15+18)/2 = 16.5. Median = 25. Q3 = (30+35)/2 = 32.5. Max = 40. Five-number summary: <strong>12, 16.5, 25, 32.5, 40</strong>.</p>
</details>

<p><strong>2.</strong> For the data in Problem 1, find the IQR and determine if there are any outliers.</p>
<details class="solution"><summary>Solution</summary>
<p>IQR = 32.5 &minus; 16.5 = 16. Lower fence: 16.5 &minus; 24 = &minus;7.5. Upper fence: 32.5 + 24 = 56.5. All values are within these fences. <strong>No outliers.</strong></p>
</details>

<p><strong>3.</strong> Data: 1, 2, 3, 4, 5, 6, 7, 8, 9, 50. Find Q1, Q3, IQR, and identify outliers.</p>
<details class="solution"><summary>Solution</summary>
<p>Q1 = 3, Q3 = 8, IQR = 5. Upper fence: 8 + 7.5 = 15.5. The value 50 exceeds 15.5, so <strong>50 is an outlier</strong>.</p>
</details>

<p><strong>4.</strong> Two box plots show: Group X has IQR = 8 and Group Y has IQR = 20, but both have the same median. What does this tell you?</p>
<details class="solution"><summary>Solution</summary>
<p>Both groups have the same typical value (same center), but Group Y has much more variability in the middle 50% of its data. Group Y's scores are more spread out around the median.</p>
</details>

<p><strong>5.</strong> A box plot shows the median very close to Q3 and a long left whisker. Describe the shape of the distribution.</p>
<details class="solution"><summary>Solution</summary>
<p>The distribution is <strong>left-skewed</strong> (negatively skewed). Most data is concentrated at the higher end, with a long tail stretching toward lower values.</p>
</details>
</div>

<h3>Summary</h3>
<ul>
<li>Box plots display the five-number summary: Min, Q1, Median, Q3, Max.</li>
<li>IQR = Q3 &minus; Q1 measures the spread of the middle 50%.</li>
<li>Outliers are values beyond Q1 &minus; 1.5(IQR) or Q3 + 1.5(IQR).</li>
<li>Box plots excel at comparing distributions and spotting skewness.</li>
</ul>
`,

'R74': `
<h2>Area vs Perimeter Confusion</h2>

<p>Area and perimeter are two of the most fundamental measurements in geometry, yet they are among the most frequently confused. Understanding <em>what</em> each measures and <em>when</em> to use each is essential for real-world problem solving.</p>

<h3>What Each Measures</h3>

<div class="columns-2">
<div>
<strong>Perimeter</strong>
<ul>
<li>The distance <em>around</em> a shape</li>
<li>Measured in <strong>linear units</strong> (cm, m, ft)</li>
<li>Think: fence around a yard, frame around a picture, border around a garden</li>
</ul>
</div>
<div>
<strong>Area</strong>
<ul>
<li>The space <em>inside</em> a shape</li>
<li>Measured in <strong>square units</strong> (cm<sup>2</sup>, m<sup>2</sup>, ft<sup>2</sup>)</li>
<li>Think: carpet for a floor, paint for a wall, grass in a lawn</li>
</ul>
</div>
</div>

<div class="example-box">
<h4>Worked Example 1: Choosing the Right Measurement</h4>
<p>A rectangular room is 12 ft by 15 ft. You want to (a) install baseboards around the room and (b) buy carpet for the floor.</p>
<p><strong>(a) Baseboards = perimeter:</strong> P = 2(12) + 2(15) = 24 + 30 = <strong>54 feet</strong> of baseboard.</p>
<p><strong>(b) Carpet = area:</strong> A = 12 &times; 15 = <strong>180 square feet</strong> of carpet.</p>
<p>Notice the units: feet (linear) for baseboards, square feet for carpet.</p>
</div>

<h3>Same Perimeter, Different Area</h3>

<p>This is the concept that surprises many students: shapes with the <strong>same perimeter</strong> can have <strong>very different areas</strong>.</p>

<div class="example-box">
<h4>Worked Example 2: Fixed Perimeter, Varying Area</h4>
<p>You have 24 feet of fencing. What are the areas of different rectangular gardens you could make?</p>
<div class="vocab-table">
<table>
<tr><th>Dimensions</th><th>Perimeter</th><th>Area</th></tr>
<tr><td>1 ft &times; 11 ft</td><td>24 ft</td><td>11 ft<sup>2</sup></td></tr>
<tr><td>2 ft &times; 10 ft</td><td>24 ft</td><td>20 ft<sup>2</sup></td></tr>
<tr><td>4 ft &times; 8 ft</td><td>24 ft</td><td>32 ft<sup>2</sup></td></tr>
<tr><td>6 ft &times; 6 ft</td><td>24 ft</td><td>36 ft<sup>2</sup></td></tr>
</table>
</div>
<p>All have perimeter 24 ft, but areas range from 11 to 36 ft<sup>2</sup>. The <strong>square</strong> (6 &times; 6) gives the maximum area for a given perimeter. This is a fundamental optimization principle.</p>
</div>

<h3>Same Area, Different Perimeter</h3>

<p>Similarly, shapes with the <strong>same area</strong> can have <strong>different perimeters</strong>.</p>

<div class="example-box">
<h4>Worked Example 3: Fixed Area, Varying Perimeter</h4>
<p>Each rectangle has an area of 36 ft<sup>2</sup>:</p>
<div class="vocab-table">
<table>
<tr><th>Dimensions</th><th>Area</th><th>Perimeter</th></tr>
<tr><td>1 ft &times; 36 ft</td><td>36 ft<sup>2</sup></td><td>74 ft</td></tr>
<tr><td>4 ft &times; 9 ft</td><td>36 ft<sup>2</sup></td><td>26 ft</td></tr>
<tr><td>6 ft &times; 6 ft</td><td>36 ft<sup>2</sup></td><td>24 ft</td></tr>
</table>
</div>
<p>The square has the <strong>smallest perimeter</strong> for a given area. Long, thin rectangles have much larger perimeters.</p>
</div>

<div class="warning-box">
<h4>Common Mistakes</h4>
<ul>
<li><strong>Wrong formula:</strong> Multiplying length &times; width when the problem asks for perimeter (that gives area).</li>
<li><strong>Wrong units:</strong> Writing "24 square feet" for a perimeter answer, or "180 feet" for an area answer.</li>
<li><strong>Assuming equal:</strong> Thinking that if two shapes have the same perimeter, they must have the same area (they do not).</li>
<li><strong>Forgetting all sides:</strong> For perimeter of irregular shapes, you must add ALL sides, including ones not labeled in a diagram.</li>
</ul>
</div>

<div class="tip-box">
<h4>Unit Check</h4>
<p>If your answer is in plain units (cm, m, ft, in), you found a <strong>perimeter or length</strong>. If your answer is in squared units (cm<sup>2</sup>, m<sup>2</sup>, ft<sup>2</sup>), you found an <strong>area</strong>. Always include units -- they tell you whether you solved the right problem.</p>
</div>

<div class="practice-problems">
<h3>Practice Problems</h3>

<p><strong>1.</strong> A square has a perimeter of 36 cm. What is its area?</p>
<details class="solution"><summary>Solution</summary>
<p>Side = 36/4 = 9 cm. Area = 9 &times; 9 = <strong>81 cm<sup>2</sup></strong>.</p>
</details>

<p><strong>2.</strong> You are painting a wall that is 10 ft wide and 8 ft tall. Should you calculate area or perimeter? Find the answer.</p>
<details class="solution"><summary>Solution</summary>
<p>Paint covers a surface, so you need <strong>area</strong>. A = 10 &times; 8 = <strong>80 ft<sup>2</sup></strong>.</p>
</details>

<p><strong>3.</strong> Two rectangles: one is 3 m &times; 12 m, the other is 6 m &times; 6 m. Compare their perimeters and areas.</p>
<details class="solution"><summary>Solution</summary>
<p>Rectangle: P = 30 m, A = 36 m<sup>2</sup>. Square: P = 24 m, A = 36 m<sup>2</sup>. Same area, but the square has a smaller perimeter.</p>
</details>

<p><strong>4.</strong> A farmer has 100 meters of fencing to make a rectangular pen. What dimensions maximize the area?</p>
<details class="solution"><summary>Solution</summary>
<p>The maximum area rectangle with a fixed perimeter is a <strong>square</strong>. Side = 100/4 = 25 m. Maximum area = 25 &times; 25 = <strong>625 m<sup>2</sup></strong>.</p>
</details>

<p><strong>5.</strong> For each situation, state whether you need area or perimeter: (a) buying ribbon for the edge of a tablecloth, (b) tiling a bathroom floor, (c) putting a border on a bulletin board, (d) buying sod for a lawn.</p>
<details class="solution"><summary>Solution</summary>
<p>(a) <strong>Perimeter</strong> -- ribbon goes around the edge. (b) <strong>Area</strong> -- tiles cover the surface. (c) <strong>Perimeter</strong> -- border goes around the edge. (d) <strong>Area</strong> -- sod covers the ground surface.</p>
</details>
</div>

<h3>Summary</h3>
<ul>
<li>Perimeter = distance around (linear units). Area = space inside (square units).</li>
<li>Same perimeter does NOT mean same area, and vice versa.</li>
<li>For a fixed perimeter, a square maximizes area. For a fixed area, a square minimizes perimeter.</li>
<li>Always check your units to confirm you answered the right question.</li>
</ul>
`,

'R75': `
<h2>Mathematical Problem-Solving Strategies</h2>

<p>Mathematics is not about memorizing formulas and plugging in numbers. It is about <strong>thinking</strong>. When you face a problem you have never seen before, you need strategies -- systematic approaches that give you a way in, even when the path is not obvious. These strategies, formalized by mathematician George Polya in 1945, remain the gold standard for problem solving.</p>

<h3>Polya's Four Steps</h3>

<ol class="step-list">
<li><strong>Understand the problem.</strong> What is given? What is asked? What are the conditions? Can you restate the problem in your own words?</li>
<li><strong>Devise a plan.</strong> Choose a strategy (see below). Have you seen a similar problem? Can you break it into parts?</li>
<li><strong>Carry out the plan.</strong> Execute your strategy carefully. Check each step as you go.</li>
<li><strong>Look back.</strong> Is the answer reasonable? Can you verify it? Could you solve it a different way? Can you generalize?</li>
</ol>

<h3>Strategy 1: Draw a Diagram</h3>

<p>Many problems become clearer -- sometimes trivially easy -- once you draw a picture.</p>

<div class="example-box">
<h4>Worked Example 1: Drawing a Diagram</h4>
<p><strong>Problem:</strong> A snail is at the bottom of a 30-foot well. Each day it climbs 3 feet, but each night it slides back 2 feet. How many days does it take to reach the top?</p>
<p><strong>Without a diagram,</strong> students often say: "Net progress = 1 foot per day, so 30 days." But draw it out:</p>
<p>After day 1: 3 ft up, slides to 1 ft. After day 2: up to 4, slides to 2. ... After day 27: up to 29, slides to 27. After day 28: climbs 3 to reach 30 -- at the top! No sliding back.</p>
<p><strong>Answer: 28 days.</strong> The diagram reveals that on the final day, the snail reaches the top during the climb and does not slide back.</p>
</div>

<h3>Strategy 2: Work Backwards</h3>

<p>When you know the <em>end result</em> and need to find the <em>starting point</em>, work from the answer back to the beginning.</p>

<div class="example-box">
<h4>Worked Example 2: Working Backwards</h4>
<p><strong>Problem:</strong> After doubling a number, adding 5, and then dividing by 3, you get 7. What was the original number?</p>
<p>Work backwards from 7:</p>
<ul>
<li>Before dividing by 3: 7 &times; 3 = 21</li>
<li>Before adding 5: 21 &minus; 5 = 16</li>
<li>Before doubling: 16 / 2 = 8</li>
</ul>
<p><strong>The original number is 8.</strong></p>
<p>Check: 2(8) = 16, 16 + 5 = 21, 21/3 = 7. Correct.</p>
</div>

<h3>Strategy 3: Look for Patterns</h3>

<p>Try several cases and look for a pattern that lets you jump to the answer.</p>

<div class="example-box">
<h4>Worked Example 3: Finding a Pattern</h4>
<p><strong>Problem:</strong> How many handshakes occur if 20 people each shake hands with every other person exactly once?</p>
<p>Start small:</p>
<div class="vocab-table">
<table>
<tr><th>People</th><th>Handshakes</th><th>Pattern</th></tr>
<tr><td>2</td><td>1</td><td>1</td></tr>
<tr><td>3</td><td>3</td><td>1 + 2</td></tr>
<tr><td>4</td><td>6</td><td>1 + 2 + 3</td></tr>
<tr><td>5</td><td>10</td><td>1 + 2 + 3 + 4</td></tr>
<tr><td>n</td><td>n(n&minus;1)/2</td><td>1 + 2 + ... + (n&minus;1)</td></tr>
</table>
</div>
<p>For 20 people: 20(19)/2 = <strong>190 handshakes</strong>.</p>
</div>

<h3>Strategy 4: Simplify the Problem</h3>

<p>If the problem is too complex, solve a simpler version first, then build up.</p>

<h3>Strategy 5: Guess and Check (Systematic)</h3>

<p>Make an educated guess, check it, and adjust. This is not random guessing -- each guess is informed by the previous result.</p>

<div class="tip-box">
<h4>Strategy Selection Guide</h4>
<ul>
<li><strong>Geometry or spatial:</strong> Draw a diagram.</li>
<li><strong>Know the end, find the start:</strong> Work backwards.</li>
<li><strong>Sequence or series:</strong> Look for patterns.</li>
<li><strong>Too many variables:</strong> Simplify to fewer first.</li>
<li><strong>Equations are hard to set up:</strong> Guess and check systematically.</li>
<li><strong>Stuck completely:</strong> Try a different strategy. Combine strategies.</li>
</ul>
</div>

<div class="warning-box">
<h4>Common Mistake</h4>
<p>The most common problem-solving failure is skipping Step 1 (understanding the problem). Students rush to compute without knowing what they are looking for. Spend time re-reading the problem, identifying what is given and what is asked. Circle key words. Restate the problem in your own words. This step alone prevents most errors.</p>
</div>

<div class="practice-problems">
<h3>Practice Problems</h3>

<p><strong>1.</strong> A frog is at the bottom of a 10-step staircase. It can jump 1 or 2 steps at a time. How many different ways can it reach the top? (Hint: look for a pattern starting with small numbers of steps.)</p>
<details class="solution"><summary>Solution</summary>
<p>Use "look for patterns." 1 step: 1 way. 2 steps: 2 ways (1+1 or 2). 3 steps: 3 ways. 4 steps: 5 ways. This is the Fibonacci sequence! Each number is the sum of the two before it: 1, 2, 3, 5, 8, 13, 21, 34, 55, <strong>89 ways</strong> for 10 steps.</p>
</details>

<p><strong>2.</strong> I am thinking of two numbers. Their sum is 25 and their product is 144. What are they? (Hint: guess and check.)</p>
<details class="solution"><summary>Solution</summary>
<p>Guess and check: try 12 and 13. Sum = 25. Product = 156 (too high). Try 9 and 16. Sum = 25. Product = 144. The numbers are <strong>9 and 16</strong>.</p>
</details>

<p><strong>3.</strong> After tripling a number and subtracting 8, you get 19. Find the number. (Hint: work backwards.)</p>
<details class="solution"><summary>Solution</summary>
<p>Work backwards from 19: before subtracting 8: 19 + 8 = 27. Before tripling: 27 / 3 = <strong>9</strong>. Check: 3(9) &minus; 8 = 27 &minus; 8 = 19.</p>
</details>

<p><strong>4.</strong> How many diagonals does a 10-sided polygon have? (Hint: start with simpler polygons and find a pattern.)</p>
<details class="solution"><summary>Solution</summary>
<p>Triangle: 0 diagonals. Quadrilateral: 2. Pentagon: 5. Hexagon: 9. Pattern: n(n&minus;3)/2. For n = 10: 10(7)/2 = <strong>35 diagonals</strong>.</p>
</details>

<p><strong>5.</strong> Three friends split a restaurant bill. The total after tax was $47.25. They want to leave a 20% tip on the pre-tax amount. Tax was 8%. How much does each person pay total? (Hint: work backwards to find the pre-tax amount.)</p>
<details class="solution"><summary>Solution</summary>
<p>Work backwards: $47.25 includes 8% tax, so pre-tax amount = 47.25 / 1.08 = $43.75. Tip = 20% of $43.75 = $8.75. Total = $47.25 + $8.75 = $56.00. Each person pays 56.00 / 3 = <strong>$18.67</strong> (rounding to nearest cent).</p>
</details>
</div>

<h3>Summary</h3>
<ul>
<li>Polya's four steps: Understand, Plan, Execute, Look Back.</li>
<li>Key strategies: draw a diagram, work backwards, look for patterns, simplify, guess-and-check.</li>
<li>The most important step is understanding the problem before attempting to solve it.</li>
<li>If one strategy does not work, try another -- flexibility is the hallmark of a good problem solver.</li>
</ul>
`

};
