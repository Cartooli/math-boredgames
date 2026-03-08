module.exports = {

'H28': `
<h2>Linear Equations</h2>
<p>Linear equations are the foundation of algebra and appear everywhere -- from calculating costs and predicting trends to engineering and economics. A linear equation describes a straight line, and mastering the three standard ways to write one gives you the flexibility to tackle any problem involving linear relationships.</p>

<h3>Slope-Intercept Form: y = mx + b</h3>
<p>This is the most commonly used form because it immediately tells you two critical pieces of information:</p>
<div class="vocab-table">
  <table>
    <tr><th>Component</th><th>Meaning</th><th>Example in y = 3x - 2</th></tr>
    <tr><td>m</td><td>Slope (steepness and direction)</td><td>m = 3 (rises 3 for every 1 right)</td></tr>
    <tr><td>b</td><td>y-intercept (where the line crosses the y-axis)</td><td>b = -2 (crosses at (0, -2))</td></tr>
  </table>
</div>
<p>Given a slope and a y-intercept, you can write the equation instantly. For example, a line with slope -4 that crosses the y-axis at 7 is simply y = -4x + 7.</p>

<h3>Point-Slope Form: y - y<sub>1</sub> = m(x - x<sub>1</sub>)</h3>
<p>When you know the slope <strong>m</strong> and any single point (x<sub>1</sub>, y<sub>1</sub>) on the line, point-slope form is the fastest route to an equation. You plug the point and slope directly in -- no need to solve for b first.</p>

<div class="example-box">
  <h4>Worked Example 1 -- Writing Point-Slope Form</h4>
  <p>Write the equation of the line through (2, 5) with slope m = -3.</p>
  <ol class="step-list">
    <li>Identify (x<sub>1</sub>, y<sub>1</sub>) = (2, 5) and m = -3.</li>
    <li>Substitute into point-slope form: y - 5 = -3(x - 2).</li>
    <li>To convert to slope-intercept, distribute: y - 5 = -3x + 6, so y = -3x + 11.</li>
  </ol>
</div>

<h3>Standard Form: Ax + By = C</h3>
<p>Standard form uses integer coefficients with A &ge; 0 (and A, B not both zero). It is especially useful for finding intercepts quickly and for solving systems of equations.</p>
<p>To find intercepts from standard form:</p>
<ul>
  <li><strong>x-intercept:</strong> set y = 0 and solve for x.</li>
  <li><strong>y-intercept:</strong> set x = 0 and solve for y.</li>
</ul>

<div class="example-box">
  <h4>Worked Example 2 -- Converting Slope-Intercept to Standard Form</h4>
  <p>Convert y = (2/3)x - 4 to standard form.</p>
  <ol class="step-list">
    <li>Multiply every term by 3 to eliminate fractions: 3y = 2x - 12.</li>
    <li>Rearrange so both variable terms are on the left: -2x + 3y = -12.</li>
    <li>Multiply by -1 so A is positive: 2x - 3y = 12.</li>
  </ol>
  <p>The standard form is <strong>2x - 3y = 12</strong>.</p>
</div>

<div class="example-box">
  <h4>Worked Example 3 -- Converting Standard Form to Slope-Intercept</h4>
  <p>Convert 5x + 2y = 10 to slope-intercept form.</p>
  <ol class="step-list">
    <li>Isolate y: 2y = -5x + 10.</li>
    <li>Divide by 2: y = (-5/2)x + 5.</li>
  </ol>
  <p>The slope is -5/2 and the y-intercept is 5.</p>
</div>

<div class="warning-box">
  <h4>Common Mistake: Sign Errors When Converting</h4>
  <p>When moving terms across the equals sign, students often forget to change the sign. If you have y - 5 = -3(x - 2), distributing the -3 gives -3x + 6, <em>not</em> -3x - 6. Always distribute carefully before simplifying.</p>
</div>

<div class="tip-box">
  <h4>Choosing the Right Form</h4>
  <p>Use <strong>slope-intercept</strong> when you need to graph quickly or know the slope and y-intercept. Use <strong>point-slope</strong> when given a point and a slope (or two points). Use <strong>standard form</strong> when working with systems of equations or when the problem asks for integer coefficients.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Write the equation of the line with slope 4 and y-intercept -1 in slope-intercept form.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>y = 4x - 1. Plug m = 4 and b = -1 directly into y = mx + b.</p>
  </details>

  <p><strong>2.</strong> Write the equation of the line through (-1, 3) with slope 2 in point-slope form, then convert to slope-intercept form.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Point-slope: y - 3 = 2(x - (-1)), which simplifies to y - 3 = 2(x + 1).</p>
    <p>Slope-intercept: y - 3 = 2x + 2, so y = 2x + 5.</p>
  </details>

  <p><strong>3.</strong> Convert y = -3x + 9 to standard form.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Move -3x to the left: 3x + y = 9. This is already in standard form with A = 3, B = 1, C = 9.</p>
  </details>

  <p><strong>4.</strong> Convert 4x - 6y = 24 to slope-intercept form.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>-6y = -4x + 24. Divide by -6: y = (2/3)x - 4. The slope is 2/3 and the y-intercept is -4.</p>
  </details>

  <p><strong>5.</strong> A line passes through (3, -2) and (6, 7). Find the equation in slope-intercept form.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>First find the slope: m = (7 - (-2)) / (6 - 3) = 9/3 = 3.</p>
    <p>Use point-slope with (3, -2): y - (-2) = 3(x - 3), so y + 2 = 3x - 9, giving y = 3x - 11.</p>
  </details>
</div>

<h3>Summary</h3>
<p>Linear equations can be expressed in three forms: slope-intercept (y = mx + b), point-slope (y - y<sub>1</sub> = m(x - x<sub>1</sub>)), and standard form (Ax + By = C). Each form has strategic advantages. Converting between them requires careful algebraic manipulation -- distribute, combine like terms, and keep track of signs. Mastering all three forms prepares you for graphing, systems, and real-world modeling.</p>
`,

'H29': `
<h2>Graphing Linear Functions</h2>
<p>A graph transforms an abstract equation into a visual picture, revealing patterns and relationships at a glance. Graphing linear functions is one of the most important skills in algebra -- it connects the algebraic and geometric representations of straight lines and builds intuition for more complex functions later.</p>

<h3>Graphing from Slope-Intercept Form</h3>
<p>When an equation is in y = mx + b form, graphing is straightforward:</p>
<ol class="step-list">
  <li>Plot the y-intercept (0, b) on the y-axis.</li>
  <li>From that point, use the slope m = rise/run to find a second point. Move "rise" units vertically and "run" units horizontally.</li>
  <li>Draw a straight line through both points and extend it in both directions with arrows.</li>
</ol>

<div class="example-box">
  <h4>Worked Example 1 -- Graphing y = (2/3)x - 1</h4>
  <ol class="step-list">
    <li>The y-intercept is (0, -1). Plot this point.</li>
    <li>The slope is 2/3, meaning rise = 2, run = 3. From (0, -1), move up 2 and right 3 to reach (3, 1).</li>
    <li>Plot (3, 1) and draw the line through both points.</li>
  </ol>
  <p>You can verify: when x = 3, y = (2/3)(3) - 1 = 2 - 1 = 1. Correct.</p>
</div>

<h3>Interpreting Slope as Rise over Run</h3>
<p>The slope m tells you exactly how the line behaves:</p>
<div class="vocab-table">
  <table>
    <tr><th>Slope Value</th><th>Line Behavior</th><th>Visual</th></tr>
    <tr><td>Positive (m &gt; 0)</td><td>Rises from left to right</td><td>Goes uphill</td></tr>
    <tr><td>Negative (m &lt; 0)</td><td>Falls from left to right</td><td>Goes downhill</td></tr>
    <tr><td>Zero (m = 0)</td><td>Perfectly horizontal</td><td>Flat line (y = b)</td></tr>
    <tr><td>Undefined</td><td>Perfectly vertical</td><td>Vertical line (x = a)</td></tr>
  </table>
</div>
<p>A slope of -3 means for every 1 unit you move right, the line drops 3 units. A slope of 1/4 means for every 4 units right, the line rises 1 unit -- a very gentle incline.</p>

<h3>Finding and Using Intercepts</h3>
<p>Every non-vertical line has a y-intercept, and every non-horizontal line has an x-intercept:</p>
<ul>
  <li><strong>y-intercept:</strong> Set x = 0 and solve for y. The point is (0, y).</li>
  <li><strong>x-intercept:</strong> Set y = 0 and solve for x. The point is (x, 0).</li>
</ul>
<p>Plotting both intercepts gives you two points -- enough to draw the entire line. This technique is especially efficient when the equation is in standard form.</p>

<div class="example-box">
  <h4>Worked Example 2 -- Graphing Using Intercepts</h4>
  <p>Graph the line 3x + 4y = 12.</p>
  <ol class="step-list">
    <li>x-intercept: set y = 0. Then 3x = 12, so x = 4. Point: (4, 0).</li>
    <li>y-intercept: set x = 0. Then 4y = 12, so y = 3. Point: (0, 3).</li>
    <li>Plot (4, 0) and (0, 3), then draw the line through them.</li>
  </ol>
</div>

<h3>Transformations of Linear Functions</h3>
<p>Starting from a base function like y = x, transformations shift or stretch the graph:</p>
<ul>
  <li><strong>Changing m</strong> changes the steepness. Larger |m| makes the line steeper; smaller |m| makes it flatter. A negative m reflects the line across the x-axis.</li>
  <li><strong>Changing b</strong> shifts the line vertically. Increasing b moves the line up; decreasing b moves it down.</li>
  <li><strong>y = m(x - h) + k</strong> shifts the line so it passes through (h, k) with slope m.</li>
</ul>

<div class="example-box">
  <h4>Worked Example 3 -- Comparing Transformed Lines</h4>
  <p>Describe how y = 2x + 5 differs from y = 2x - 1.</p>
  <p>Both lines have slope 2, so they are <strong>parallel</strong> (same steepness and direction). The first has y-intercept 5 and the second has y-intercept -1, so y = 2x + 5 is shifted 6 units up from y = 2x - 1.</p>
</div>

<div class="warning-box">
  <h4>Common Mistake: Reversing Rise and Run</h4>
  <p>For slope 3/4, rise is 3 (vertical) and run is 4 (horizontal). Students sometimes move 4 up and 3 right -- that gives slope 4/3 instead. Remember: slope = rise / run, and rise is always the vertical (up/down) movement.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Graph y = -2x + 3. State the slope and y-intercept.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Slope = -2, y-intercept = (0, 3). Start at (0, 3). From there, move down 2 and right 1 to get (1, 1). Draw the line. It falls from left to right.</p>
  </details>

  <p><strong>2.</strong> Find the x-intercept and y-intercept of 5x - 2y = 10, and use them to graph the line.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>x-intercept: set y = 0, get 5x = 10, x = 2. Point: (2, 0).</p>
    <p>y-intercept: set x = 0, get -2y = 10, y = -5. Point: (0, -5).</p>
    <p>Plot both points and draw the line through them.</p>
  </details>

  <p><strong>3.</strong> A line has slope -1/2 and passes through (0, 4). Write the equation and identify one other point on the line.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>y = (-1/2)x + 4. From (0, 4), move down 1 and right 2 to get (2, 3). Verify: y = (-1/2)(2) + 4 = -1 + 4 = 3.</p>
  </details>

  <p><strong>4.</strong> How do the graphs of y = x, y = 3x, and y = (1/3)x compare?</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>All three pass through the origin (0, 0). y = 3x is the steepest (rises fastest). y = x has a 45-degree angle. y = (1/3)x is the flattest. All rise from left to right since all slopes are positive.</p>
  </details>

  <p><strong>5.</strong> Write the equation of a horizontal line through (5, -3) and a vertical line through (5, -3).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Horizontal line: y = -3 (slope is 0, all points have y-coordinate -3).</p>
    <p>Vertical line: x = 5 (undefined slope, all points have x-coordinate 5). Note: x = 5 is not a function.</p>
  </details>
</div>

<h3>Summary</h3>
<p>Graphing linear functions connects equations to visual representations. From slope-intercept form, plot the y-intercept and use slope as rise/run. From standard form, find both intercepts. Slope determines direction and steepness: positive slopes rise, negative slopes fall, zero gives a horizontal line, and undefined gives a vertical line. Transformations to m and b change steepness and vertical position respectively.</p>
`,

'H30': `
<h2>Systems of Linear Equations</h2>
<p>What happens when two conditions must be satisfied at the same time? Systems of linear equations model exactly this: two or more equations that share the same variables, and we need to find values that make all equations true simultaneously. Applications range from comparing phone plans to balancing chemical reactions.</p>

<h3>Graphical Method</h3>
<p>When you graph two linear equations on the same coordinate plane, the solution to the system is the point where the lines intersect. This method gives a visual understanding but can be imprecise when the intersection does not fall on grid points.</p>
<div class="vocab-table">
  <table>
    <tr><th>Graph Result</th><th>Number of Solutions</th><th>System Type</th></tr>
    <tr><td>Lines intersect at one point</td><td>Exactly one solution</td><td>Independent (consistent)</td></tr>
    <tr><td>Lines are parallel (never meet)</td><td>No solution</td><td>Inconsistent</td></tr>
    <tr><td>Lines are identical (overlap completely)</td><td>Infinitely many solutions</td><td>Dependent (consistent)</td></tr>
  </table>
</div>

<h3>Substitution Method</h3>
<p>Substitution works best when one equation is already solved for a variable (or can be easily solved for one).</p>
<ol class="step-list">
  <li>Solve one equation for one variable.</li>
  <li>Substitute that expression into the other equation.</li>
  <li>Solve the resulting single-variable equation.</li>
  <li>Back-substitute to find the other variable.</li>
</ol>

<div class="example-box">
  <h4>Worked Example 1 -- Substitution</h4>
  <p>Solve the system: y = 2x + 1 and 3x + y = 11.</p>
  <ol class="step-list">
    <li>The first equation already gives y = 2x + 1.</li>
    <li>Substitute into the second: 3x + (2x + 1) = 11.</li>
    <li>Simplify: 5x + 1 = 11, so 5x = 10, giving x = 2.</li>
    <li>Back-substitute: y = 2(2) + 1 = 5.</li>
  </ol>
  <p>The solution is <strong>(2, 5)</strong>. Check in both equations: 5 = 2(2) + 1 = 5, and 3(2) + 5 = 11. Both true.</p>
</div>

<h3>Elimination Method</h3>
<p>Elimination (also called the addition method) works by adding or subtracting equations to eliminate one variable. It is especially efficient when both equations are in standard form.</p>
<ol class="step-list">
  <li>Align the equations vertically by variable.</li>
  <li>Multiply one or both equations by constants so that one variable has equal and opposite coefficients.</li>
  <li>Add the equations to eliminate that variable.</li>
  <li>Solve for the remaining variable, then back-substitute.</li>
</ol>

<div class="example-box">
  <h4>Worked Example 2 -- Elimination</h4>
  <p>Solve: 2x + 3y = 12 and 4x - 3y = 6.</p>
  <ol class="step-list">
    <li>The y-coefficients are already opposites (+3 and -3).</li>
    <li>Add the equations: (2x + 4x) + (3y - 3y) = 12 + 6, giving 6x = 18.</li>
    <li>Solve: x = 3.</li>
    <li>Substitute x = 3 into the first equation: 2(3) + 3y = 12, so 6 + 3y = 12, giving 3y = 6, y = 2.</li>
  </ol>
  <p>The solution is <strong>(3, 2)</strong>.</p>
</div>

<div class="example-box">
  <h4>Worked Example 3 -- No Solution (Inconsistent System)</h4>
  <p>Solve: x + 2y = 4 and 2x + 4y = 5.</p>
  <ol class="step-list">
    <li>Multiply the first equation by -2: -2x - 4y = -8.</li>
    <li>Add to the second equation: (2x - 2x) + (4y - 4y) = 5 + (-8), giving 0 = -3.</li>
    <li>This is a contradiction. The system has <strong>no solution</strong>.</li>
  </ol>
  <p>Graphically, these lines are parallel (same slope, different intercepts).</p>
</div>

<div class="warning-box">
  <h4>Common Mistake: Forgetting to Multiply ALL Terms</h4>
  <p>When multiplying an equation by a constant to set up elimination, you must multiply every term -- including the constant on the right side. For example, multiplying x + 2y = 4 by -2 gives -2x - 4y = -8, not -2x - 4y = 4.</p>
</div>

<div class="tip-box">
  <h4>Which Method to Choose?</h4>
  <p>Use <strong>graphing</strong> for a visual estimate or to understand the geometry. Use <strong>substitution</strong> when one variable is already isolated. Use <strong>elimination</strong> when both equations are in standard form and coefficients align conveniently. All three methods yield the same answer for a given system.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Solve by substitution: y = x - 3 and 2x + y = 9.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Substitute y = x - 3 into the second equation: 2x + (x - 3) = 9, so 3x - 3 = 9, giving 3x = 12, x = 4. Then y = 4 - 3 = 1. Solution: (4, 1).</p>
  </details>

  <p><strong>2.</strong> Solve by elimination: 3x + 2y = 16 and 3x - 2y = 8.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Add the equations: 6x = 24, so x = 4. Substitute into the first: 3(4) + 2y = 16, so 12 + 2y = 16, 2y = 4, y = 2. Solution: (4, 2).</p>
  </details>

  <p><strong>3.</strong> Solve: 2x + y = 7 and 4x + 2y = 14.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Notice the second equation is exactly 2 times the first. These are the same line. The system has <strong>infinitely many solutions</strong>. Any point on y = -2x + 7 is a solution.</p>
  </details>

  <p><strong>4.</strong> Solve by substitution: x = 3y + 2 and 5x - 15y = 4.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Substitute x = 3y + 2 into the second: 5(3y + 2) - 15y = 4, so 15y + 10 - 15y = 4, giving 10 = 4. This is a contradiction -- <strong>no solution</strong>.</p>
  </details>

  <p><strong>5.</strong> Two pizzas and three salads cost $27. One pizza and two salads cost $16. Find the cost of each item.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Let p = pizza cost, s = salad cost. System: 2p + 3s = 27 and p + 2s = 16.</p>
    <p>Multiply the second equation by -2: -2p - 4s = -32. Add to the first: -s = -5, so s = 5. Then p + 2(5) = 16, giving p = 6.</p>
    <p>A pizza costs $6 and a salad costs $5.</p>
  </details>
</div>

<h3>Summary</h3>
<p>A system of linear equations can have one solution (intersecting lines), no solution (parallel lines), or infinitely many solutions (identical lines). The three solving methods -- graphing, substitution, and elimination -- each have strategic advantages depending on the form of the equations. Always verify your solution by substituting back into both original equations.</p>
`,

'H31': `
<h2>Slope &amp; Rate of Change</h2>
<p>Slope is more than a number -- it is a measure of how one quantity changes relative to another. Every time you hear "per" -- dollars per hour, miles per gallon, degrees per minute -- you are dealing with a rate of change. Understanding slope in this broader sense unlocks the ability to interpret real-world data and make predictions.</p>

<h3>Slope as a Rate of Change</h3>
<p>The slope between two points (x<sub>1</sub>, y<sub>1</sub>) and (x<sub>2</sub>, y<sub>2</sub>) is:</p>
<div class="math-display">m = (y<sub>2</sub> - y<sub>1</sub>) / (x<sub>2</sub> - x<sub>1</sub>) = change in y / change in x</div>
<p>In context, this formula tells you how much the output (dependent variable) changes for each unit increase in the input (independent variable). If a car travels 150 miles in 3 hours, the rate of change is 150/3 = 50 miles per hour.</p>

<h3>Average Rate of Change</h3>
<p>For any function (not just linear ones), the <strong>average rate of change</strong> over an interval [a, b] is:</p>
<div class="math-display">Average rate of change = [f(b) - f(a)] / (b - a)</div>
<p>This is geometrically the slope of the <strong>secant line</strong> connecting the points (a, f(a)) and (b, f(b)). For linear functions, the average rate of change is the same no matter which interval you choose -- that is precisely what makes a function linear.</p>

<div class="example-box">
  <h4>Worked Example 1 -- Average Rate of Change</h4>
  <p>The temperature at 8 AM was 54 degrees F and at 2 PM was 78 degrees F. Find the average rate of change.</p>
  <ol class="step-list">
    <li>Identify the two data points: (8, 54) and (14, 78), using hours in 24-hour time.</li>
    <li>Apply the formula: (78 - 54) / (14 - 8) = 24 / 6 = 4.</li>
    <li>Interpret: the temperature increased at an average rate of <strong>4 degrees F per hour</strong>.</li>
  </ol>
</div>

<h3>Interpreting Slope in Context</h3>
<p>When you calculate a slope from real-world data, always state your interpretation using the units of both variables and the direction of change:</p>
<ul>
  <li>"For every additional year of experience, the salary increases by $2,500." (positive slope)</li>
  <li>"For every mile driven, the fuel remaining decreases by 0.04 gallons." (negative slope)</li>
  <li>"The water level remains constant regardless of time." (zero slope)</li>
</ul>

<div class="example-box">
  <h4>Worked Example 2 -- Contextual Interpretation</h4>
  <p>A gym membership costs $25 per month plus a $50 sign-up fee. The cost function is C(m) = 25m + 50.</p>
  <ol class="step-list">
    <li>The slope is 25. This means the total cost increases by <strong>$25 for each additional month</strong> of membership.</li>
    <li>The y-intercept is 50. This represents the <strong>initial sign-up fee</strong> -- the cost when m = 0 months of actual membership have passed.</li>
  </ol>
</div>

<h3>Types of Slope</h3>
<div class="vocab-table">
  <table>
    <tr><th>Slope Type</th><th>Value</th><th>Graph</th><th>Real-World Example</th></tr>
    <tr><td>Positive</td><td>m &gt; 0</td><td>Line rises left to right</td><td>Income increasing over time</td></tr>
    <tr><td>Negative</td><td>m &lt; 0</td><td>Line falls left to right</td><td>Battery charge draining</td></tr>
    <tr><td>Zero</td><td>m = 0</td><td>Horizontal line</td><td>Constant temperature</td></tr>
    <tr><td>Undefined</td><td>Division by zero</td><td>Vertical line</td><td>Instantaneous event (all outputs at one input)</td></tr>
  </table>
</div>

<div class="example-box">
  <h4>Worked Example 3 -- Determining Slope Type from a Table</h4>
  <p>Given the data: (1, 10), (3, 10), (5, 10), (7, 10), what is the slope?</p>
  <ol class="step-list">
    <li>Pick any two points: m = (10 - 10) / (3 - 1) = 0/2 = 0.</li>
    <li>The slope is <strong>zero</strong>. The y-value never changes, so the graph is a horizontal line at y = 10.</li>
  </ol>
</div>

<div class="warning-box">
  <h4>Common Mistake: Confusing Zero and Undefined Slope</h4>
  <p>A <strong>horizontal</strong> line has slope = 0 (the numerator is zero). A <strong>vertical</strong> line has <strong>undefined</strong> slope (the denominator is zero). They are not the same thing. "No slope" is ambiguous -- always say "zero slope" or "undefined slope" to be precise.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Find the slope between (-2, 7) and (4, -5).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>m = (-5 - 7) / (4 - (-2)) = -12 / 6 = -2. The slope is -2.</p>
  </details>

  <p><strong>2.</strong> A plant was 3 cm tall on day 5 and 15 cm tall on day 20. Find and interpret the average rate of change.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Average rate = (15 - 3) / (20 - 5) = 12 / 15 = 0.8 cm per day. The plant grew an average of 0.8 cm each day.</p>
  </details>

  <p><strong>3.</strong> A taxi charges a $3 flat fee plus $2.50 per mile. Write the cost function and interpret the slope.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>C(m) = 2.50m + 3. The slope is 2.50, meaning the fare increases by $2.50 for each additional mile driven. The y-intercept of 3 is the base fare before any distance is traveled.</p>
  </details>

  <p><strong>4.</strong> Classify the slope of a line through (4, 9) and (4, -3).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>m = (-3 - 9) / (4 - 4) = -12 / 0, which is <strong>undefined</strong>. This is a vertical line at x = 4.</p>
  </details>

  <p><strong>5.</strong> A function has f(2) = 10 and f(8) = 10. What does this tell you about the average rate of change on [2, 8]?</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Average rate = (10 - 10) / (8 - 2) = 0/6 = 0. The function's output did not change on average over this interval. Note: the function could still vary between these points -- the average rate only captures net change.</p>
  </details>
</div>

<h3>Summary</h3>
<p>Slope measures rate of change -- how much y changes per unit change in x. Positive slope indicates increase, negative slope indicates decrease, zero slope means no change, and undefined slope corresponds to a vertical line. The average rate of change formula generalizes slope to any function over an interval. Always interpret slope with units and context for real-world problems.</p>
`,

'H32': `
<h2>Polynomials &amp; Terminology</h2>
<p>Polynomials are the building blocks of algebra. From the simple expression 3x + 1 to the complex equation modeling a rocket's trajectory, polynomials appear throughout mathematics and science. This lesson establishes the vocabulary and foundational operations you need to work with them confidently.</p>

<h3>What Is a Polynomial?</h3>
<p>A <strong>polynomial</strong> is an expression consisting of variables and coefficients, combined using addition, subtraction, and multiplication, where all exponents on the variables are <strong>whole numbers</strong> (0, 1, 2, 3, ...).</p>
<div class="columns-2">
  <div>
    <p><strong>These ARE polynomials:</strong></p>
    <ul>
      <li>5x<sup>3</sup> - 2x + 7</li>
      <li>4y</li>
      <li>-9</li>
      <li>x<sup>2</sup>y + 3xy<sup>2</sup></li>
    </ul>
  </div>
  <div>
    <p><strong>These are NOT polynomials:</strong></p>
    <ul>
      <li>3x<sup>-2</sup> + 1 (negative exponent)</li>
      <li>5/x (variable in denominator = x<sup>-1</sup>)</li>
      <li>2<sup>x</sup> (variable in the exponent)</li>
      <li>4x<sup>1/2</sup> (fractional exponent)</li>
    </ul>
  </div>
</div>

<h3>Classification by Number of Terms</h3>
<div class="vocab-table">
  <table>
    <tr><th>Name</th><th>Number of Terms</th><th>Examples</th></tr>
    <tr><td>Monomial</td><td>1 term</td><td>7x<sup>2</sup>, -3, 4ab</td></tr>
    <tr><td>Binomial</td><td>2 terms</td><td>x + 5, 3y<sup>2</sup> - 2y</td></tr>
    <tr><td>Trinomial</td><td>3 terms</td><td>x<sup>2</sup> + 3x - 4</td></tr>
    <tr><td>Polynomial</td><td>4+ terms (or general)</td><td>x<sup>3</sup> - 2x<sup>2</sup> + x - 1</td></tr>
  </table>
</div>

<h3>Degree and Standard Form</h3>
<p>The <strong>degree</strong> of a term is the sum of the exponents on its variables. The <strong>degree of a polynomial</strong> is the highest degree among all its terms.</p>
<p><strong>Standard form</strong> means writing terms in descending order of degree, from highest to lowest.</p>

<div class="example-box">
  <h4>Worked Example 1 -- Identifying Degree and Standard Form</h4>
  <p>Write 7 - 2x + 5x<sup>3</sup> - x<sup>2</sup> in standard form and state its degree.</p>
  <ol class="step-list">
    <li>Identify the degree of each term: 5x<sup>3</sup> (degree 3), -x<sup>2</sup> (degree 2), -2x (degree 1), 7 (degree 0).</li>
    <li>Arrange in descending order: <strong>5x<sup>3</sup> - x<sup>2</sup> - 2x + 7</strong>.</li>
    <li>The degree of the polynomial is <strong>3</strong> (the highest term degree).</li>
  </ol>
  <p>This is a <strong>polynomial of degree 3</strong> (also called a cubic) with 4 terms.</p>
</div>

<h3>Adding and Subtracting Polynomials</h3>
<p>To add or subtract polynomials, <strong>combine like terms</strong> -- terms with exactly the same variable(s) raised to exactly the same power(s).</p>

<div class="example-box">
  <h4>Worked Example 2 -- Adding Polynomials</h4>
  <p>Add (3x<sup>2</sup> + 5x - 4) + (2x<sup>2</sup> - 3x + 7).</p>
  <ol class="step-list">
    <li>Group like terms: (3x<sup>2</sup> + 2x<sup>2</sup>) + (5x + (-3x)) + (-4 + 7).</li>
    <li>Combine: 5x<sup>2</sup> + 2x + 3.</li>
  </ol>
</div>

<div class="example-box">
  <h4>Worked Example 3 -- Subtracting Polynomials</h4>
  <p>Subtract (4x<sup>3</sup> - x + 6) - (2x<sup>3</sup> + 3x<sup>2</sup> - x + 1).</p>
  <ol class="step-list">
    <li>Distribute the negative sign to every term of the second polynomial: 4x<sup>3</sup> - x + 6 - 2x<sup>3</sup> - 3x<sup>2</sup> + x - 1.</li>
    <li>Group like terms: (4x<sup>3</sup> - 2x<sup>3</sup>) + (-3x<sup>2</sup>) + (-x + x) + (6 - 1).</li>
    <li>Combine: <strong>2x<sup>3</sup> - 3x<sup>2</sup> + 5</strong>.</li>
  </ol>
</div>

<div class="warning-box">
  <h4>Common Mistake: Forgetting to Distribute the Negative</h4>
  <p>When subtracting polynomials, the subtraction sign applies to <em>every</em> term in the second polynomial. A frequent error is changing only the first term's sign. For (A) - (B - C), the result is A - B + C, not A - B - C.</p>
</div>

<div class="tip-box">
  <h4>Quick Degree Check</h4>
  <p>When adding or subtracting polynomials, the degree of the result is at most the highest degree among the inputs -- but it could be lower if the leading terms cancel. For example, (3x<sup>2</sup> + x) - (3x<sup>2</sup> - 4) = x + 4, which has degree 1, not 2.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Classify 4x<sup>2</sup> - 9 by number of terms and state its degree.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>It has 2 terms, so it is a <strong>binomial</strong>. The highest exponent is 2, so the degree is <strong>2</strong>.</p>
  </details>

  <p><strong>2.</strong> Write 8 + 3x<sup>4</sup> - x<sup>2</sup> + 2x in standard form.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Arrange by descending degree: <strong>3x<sup>4</sup> - x<sup>2</sup> + 2x + 8</strong>.</p>
  </details>

  <p><strong>3.</strong> Add (6x<sup>2</sup> - 3x + 1) + (-2x<sup>2</sup> + 7x - 5).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>(6x<sup>2</sup> - 2x<sup>2</sup>) + (-3x + 7x) + (1 - 5) = <strong>4x<sup>2</sup> + 4x - 4</strong>.</p>
  </details>

  <p><strong>4.</strong> Subtract (5x<sup>3</sup> + 2x - 8) - (5x<sup>3</sup> - x<sup>2</sup> + 2x + 3).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Distribute: 5x<sup>3</sup> + 2x - 8 - 5x<sup>3</sup> + x<sup>2</sup> - 2x - 3. Combine: <strong>x<sup>2</sup> - 11</strong>.</p>
  </details>

  <p><strong>5.</strong> Is 3x<sup>2</sup> + 2/x a polynomial? Explain.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p><strong>No.</strong> The term 2/x = 2x<sup>-1</sup> has a negative exponent. Polynomials require all exponents to be non-negative whole numbers.</p>
  </details>
</div>

<h3>Summary</h3>
<p>Polynomials are expressions with variables raised to whole-number exponents. They are classified by number of terms (monomial, binomial, trinomial) and by degree (the highest exponent). Standard form lists terms from highest to lowest degree. Adding and subtracting polynomials requires combining like terms, with special care to distribute negatives when subtracting.</p>
`,

'H33': `
<h2>Factoring Techniques</h2>
<p>Factoring is the reverse of multiplication -- it breaks an expression into a product of simpler factors. This skill is essential for solving quadratic equations, simplifying rational expressions, and analyzing functions. Think of factoring as "un-distributing" or finding what was multiplied together to produce the expression you see.</p>

<h3>Greatest Common Factor (GCF)</h3>
<p>Always start by checking for a GCF. The GCF is the largest factor that divides evenly into every term of the polynomial.</p>

<div class="example-box">
  <h4>Worked Example 1 -- GCF Factoring</h4>
  <p>Factor 12x<sup>3</sup> - 8x<sup>2</sup> + 4x.</p>
  <ol class="step-list">
    <li>Find the GCF of the coefficients: GCF(12, 8, 4) = 4.</li>
    <li>Find the lowest power of x present in all terms: x<sup>1</sup>.</li>
    <li>Factor out 4x: 4x(3x<sup>2</sup> - 2x + 1).</li>
  </ol>
  <p>Verify by distributing: 4x(3x<sup>2</sup>) - 4x(2x) + 4x(1) = 12x<sup>3</sup> - 8x<sup>2</sup> + 4x.</p>
</div>

<h3>Factoring x<sup>2</sup> + bx + c (Leading Coefficient 1)</h3>
<p>For trinomials where the leading coefficient is 1, find two numbers that:</p>
<ul>
  <li><strong>Multiply</strong> to give c (the constant term)</li>
  <li><strong>Add</strong> to give b (the coefficient of x)</li>
</ul>
<p>Then write: (x + first number)(x + second number).</p>

<div class="example-box">
  <h4>Worked Example 2 -- Factoring x<sup>2</sup> + bx + c</h4>
  <p>Factor x<sup>2</sup> + 7x + 12.</p>
  <ol class="step-list">
    <li>We need two numbers that multiply to 12 and add to 7.</li>
    <li>Factor pairs of 12: (1, 12), (2, 6), (3, 4). Check sums: 1+12=13, 2+6=8, 3+4=7.</li>
    <li>The pair (3, 4) works. So x<sup>2</sup> + 7x + 12 = <strong>(x + 3)(x + 4)</strong>.</li>
  </ol>
</div>

<h3>Factoring ax<sup>2</sup> + bx + c (Leading Coefficient not 1)</h3>
<p>When a is not 1, use the <strong>AC method</strong>:</p>
<ol class="step-list">
  <li>Multiply a and c to get the product AC.</li>
  <li>Find two numbers that multiply to AC and add to b.</li>
  <li>Rewrite the middle term using those two numbers.</li>
  <li>Factor by grouping.</li>
</ol>

<div class="example-box">
  <h4>Worked Example 3 -- AC Method</h4>
  <p>Factor 6x<sup>2</sup> + 11x + 4.</p>
  <ol class="step-list">
    <li>AC = 6 * 4 = 24. Find two numbers that multiply to 24 and add to 11.</li>
    <li>The pair is (3, 8): 3 * 8 = 24 and 3 + 8 = 11.</li>
    <li>Rewrite: 6x<sup>2</sup> + 3x + 8x + 4.</li>
    <li>Group and factor: 3x(2x + 1) + 4(2x + 1) = <strong>(3x + 4)(2x + 1)</strong>.</li>
  </ol>
  <p>Verify: (3x + 4)(2x + 1) = 6x<sup>2</sup> + 3x + 8x + 4 = 6x<sup>2</sup> + 11x + 4.</p>
</div>

<h3>Special Patterns</h3>
<div class="vocab-table">
  <table>
    <tr><th>Pattern</th><th>Formula</th><th>Example</th></tr>
    <tr><td>Difference of Squares</td><td>a<sup>2</sup> - b<sup>2</sup> = (a + b)(a - b)</td><td>x<sup>2</sup> - 25 = (x + 5)(x - 5)</td></tr>
    <tr><td>Perfect Square (sum)</td><td>a<sup>2</sup> + 2ab + b<sup>2</sup> = (a + b)<sup>2</sup></td><td>x<sup>2</sup> + 6x + 9 = (x + 3)<sup>2</sup></td></tr>
    <tr><td>Perfect Square (diff)</td><td>a<sup>2</sup> - 2ab + b<sup>2</sup> = (a - b)<sup>2</sup></td><td>x<sup>2</sup> - 10x + 25 = (x - 5)<sup>2</sup></td></tr>
  </table>
</div>
<p>For difference of squares, recognize that both terms must be perfect squares, and they must be subtracted. The sum of two squares (a<sup>2</sup> + b<sup>2</sup>) does <strong>not</strong> factor over the real numbers.</p>

<div class="warning-box">
  <h4>Common Mistake: Forgetting to Factor Completely</h4>
  <p>Always check if the factors themselves can be factored further. For example, 2x<sup>2</sup> - 8 = 2(x<sup>2</sup> - 4) is not fully factored. Since x<sup>2</sup> - 4 is a difference of squares, the complete factorization is <strong>2(x + 2)(x - 2)</strong>.</p>
</div>

<div class="tip-box">
  <h4>Factoring Strategy Checklist</h4>
  <p>When facing any polynomial to factor, follow this order: (1) Factor out the GCF first. (2) Count the terms. Two terms -- check for difference of squares. Three terms -- try trinomial factoring or special patterns. Four terms -- try grouping. (3) Check that each factor is fully factored.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Factor 15x<sup>2</sup> - 10x.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>GCF is 5x. Factor: <strong>5x(3x - 2)</strong>.</p>
  </details>

  <p><strong>2.</strong> Factor x<sup>2</sup> - 5x - 14.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Find two numbers that multiply to -14 and add to -5. The pair is (-7, 2): (-7)(2) = -14 and -7 + 2 = -5. Answer: <strong>(x - 7)(x + 2)</strong>.</p>
  </details>

  <p><strong>3.</strong> Factor 4x<sup>2</sup> - 49.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>This is a difference of squares: (2x)<sup>2</sup> - 7<sup>2</sup> = <strong>(2x + 7)(2x - 7)</strong>.</p>
  </details>

  <p><strong>4.</strong> Factor 2x<sup>2</sup> + 7x + 3.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>AC = 2 * 3 = 6. Two numbers that multiply to 6 and add to 7: (1, 6). Rewrite: 2x<sup>2</sup> + x + 6x + 3. Group: x(2x + 1) + 3(2x + 1) = <strong>(x + 3)(2x + 1)</strong>.</p>
  </details>

  <p><strong>5.</strong> Factor completely: 3x<sup>3</sup> - 12x.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>GCF is 3x: 3x(x<sup>2</sup> - 4). Then x<sup>2</sup> - 4 is a difference of squares: 3x(x + 2)(x - 2). Final answer: <strong>3x(x + 2)(x - 2)</strong>.</p>
  </details>
</div>

<h3>Summary</h3>
<p>Factoring reverses multiplication to express polynomials as products. Always begin with the GCF. For trinomials with leading coefficient 1, find two numbers that multiply to c and add to b. For leading coefficient not 1, use the AC method and factor by grouping. Recognize the difference of squares pattern (a<sup>2</sup> - b<sup>2</sup>) and perfect square trinomials. Always verify by multiplying your factors back together.</p>
`,

'H34': `
<h2>Quadratic Equations -- Conceptual</h2>
<p>Quadratic equations -- equations of the form ax<sup>2</sup> + bx + c = 0 where a is not 0 -- produce one of the most recognizable curves in mathematics: the parabola. From the arc of a basketball to the shape of satellite dishes, parabolas appear throughout the natural and engineered world. This lesson builds your conceptual understanding of quadratics before diving into solving techniques.</p>

<h3>The Parabola</h3>
<p>The graph of y = ax<sup>2</sup> + bx + c is always a <strong>parabola</strong> -- a smooth, symmetric, U-shaped curve. The coefficient a determines two fundamental properties:</p>
<div class="columns-2">
  <div>
    <p><strong>If a &gt; 0:</strong></p>
    <ul>
      <li>Parabola opens <strong>upward</strong></li>
      <li>Has a <strong>minimum</strong> value at the vertex</li>
      <li>Shaped like a cup</li>
    </ul>
  </div>
  <div>
    <p><strong>If a &lt; 0:</strong></p>
    <ul>
      <li>Parabola opens <strong>downward</strong></li>
      <li>Has a <strong>maximum</strong> value at the vertex</li>
      <li>Shaped like a cap</li>
    </ul>
  </div>
</div>
<p>The magnitude |a| controls the width: larger |a| makes the parabola narrower (steeper), while smaller |a| makes it wider (flatter). Compare y = 5x<sup>2</sup> (very narrow) to y = 0.2x<sup>2</sup> (very wide).</p>

<h3>Key Features of a Parabola</h3>
<div class="vocab-table">
  <table>
    <tr><th>Feature</th><th>Description</th><th>How to Find</th></tr>
    <tr><td>Vertex</td><td>The highest or lowest point</td><td>x = -b/(2a), then find y</td></tr>
    <tr><td>Axis of Symmetry</td><td>Vertical line through the vertex</td><td>x = -b/(2a)</td></tr>
    <tr><td>Roots / Zeros</td><td>Where the parabola crosses the x-axis</td><td>Set y = 0 and solve</td></tr>
    <tr><td>y-intercept</td><td>Where the parabola crosses the y-axis</td><td>Set x = 0; it equals c</td></tr>
  </table>
</div>

<div class="example-box">
  <h4>Worked Example 1 -- Finding the Vertex and Axis of Symmetry</h4>
  <p>Find the vertex and axis of symmetry of y = 2x<sup>2</sup> - 8x + 3.</p>
  <ol class="step-list">
    <li>Identify a = 2, b = -8, c = 3.</li>
    <li>Axis of symmetry: x = -b/(2a) = -(-8)/(2 * 2) = 8/4 = 2.</li>
    <li>Find the y-coordinate of the vertex: y = 2(2)<sup>2</sup> - 8(2) + 3 = 8 - 16 + 3 = -5.</li>
    <li>Vertex: <strong>(2, -5)</strong>. Axis of symmetry: <strong>x = 2</strong>.</li>
  </ol>
  <p>Since a = 2 &gt; 0, the parabola opens upward and (2, -5) is the minimum point.</p>
</div>

<h3>Roots, Zeros, and the Discriminant</h3>
<p>The <strong>roots</strong> (also called zeros, solutions, or x-intercepts) are where the parabola meets the x-axis. The <strong>discriminant</strong>, defined as D = b<sup>2</sup> - 4ac, tells you how many real roots exist without actually solving:</p>
<div class="vocab-table">
  <table>
    <tr><th>Discriminant Value</th><th>Number of Real Roots</th><th>Graph Behavior</th></tr>
    <tr><td>D &gt; 0</td><td>Two distinct real roots</td><td>Parabola crosses x-axis twice</td></tr>
    <tr><td>D = 0</td><td>One repeated real root</td><td>Parabola touches x-axis at vertex</td></tr>
    <tr><td>D &lt; 0</td><td>No real roots</td><td>Parabola does not reach x-axis</td></tr>
  </table>
</div>

<div class="example-box">
  <h4>Worked Example 2 -- Using the Discriminant</h4>
  <p>How many real solutions does 3x<sup>2</sup> - 4x + 5 = 0 have?</p>
  <ol class="step-list">
    <li>Identify a = 3, b = -4, c = 5.</li>
    <li>Calculate the discriminant: D = (-4)<sup>2</sup> - 4(3)(5) = 16 - 60 = -44.</li>
    <li>Since D = -44 &lt; 0, the equation has <strong>no real solutions</strong>.</li>
  </ol>
  <p>The parabola y = 3x<sup>2</sup> - 4x + 5 lies entirely above the x-axis.</p>
</div>

<div class="example-box">
  <h4>Worked Example 3 -- Interpreting a Parabola in Context</h4>
  <p>A ball is thrown upward. Its height in feet after t seconds is h(t) = -16t<sup>2</sup> + 48t + 5. Describe the key features.</p>
  <ol class="step-list">
    <li>Since a = -16 &lt; 0, the parabola opens downward -- the ball goes up then comes down.</li>
    <li>Vertex time: t = -48/(2 * -16) = -48/(-32) = 1.5 seconds.</li>
    <li>Maximum height: h(1.5) = -16(2.25) + 48(1.5) + 5 = -36 + 72 + 5 = 41 feet.</li>
    <li>The y-intercept h(0) = 5 means the ball was thrown from a height of 5 feet.</li>
  </ol>
</div>

<div class="warning-box">
  <h4>Common Mistake: Sign Error in the Vertex Formula</h4>
  <p>The formula is x = <strong>-b</strong>/(2a). Do not forget the negative sign in front of b. For y = x<sup>2</sup> + 6x + 8, the axis of symmetry is x = -6/(2*1) = -3, not x = 3.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> For y = -x<sup>2</sup> + 4x - 1, does the parabola open up or down? Find the vertex.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>a = -1 &lt; 0, so it opens <strong>downward</strong>. Vertex x-coordinate: x = -4/(2*(-1)) = -4/(-2) = 2. Then y = -(2)<sup>2</sup> + 4(2) - 1 = -4 + 8 - 1 = 3. Vertex: <strong>(2, 3)</strong>, which is the maximum point.</p>
  </details>

  <p><strong>2.</strong> Find the discriminant of x<sup>2</sup> + 6x + 9 = 0 and determine the number of real solutions.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>D = 6<sup>2</sup> - 4(1)(9) = 36 - 36 = 0. There is exactly <strong>one repeated real solution</strong>. (The parabola touches the x-axis at its vertex, x = -3.)</p>
  </details>

  <p><strong>3.</strong> What is the y-intercept of y = 5x<sup>2</sup> - 3x + 7?</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Set x = 0: y = 5(0) - 3(0) + 7 = 7. The y-intercept is <strong>(0, 7)</strong>.</p>
  </details>

  <p><strong>4.</strong> A parabola has vertex (3, -2) and opens upward. Can it have zero x-intercepts? Explain.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p><strong>No.</strong> Since the vertex is at y = -2 (below the x-axis) and the parabola opens upward, it must eventually cross the x-axis on both sides. It will have <strong>two</strong> x-intercepts.</p>
  </details>

  <p><strong>5.</strong> Compare the widths of y = 4x<sup>2</sup>, y = x<sup>2</sup>, and y = 0.25x<sup>2</sup>.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>All open upward. y = 4x<sup>2</sup> is the <strong>narrowest</strong> (steepest). y = x<sup>2</sup> is the standard width. y = 0.25x<sup>2</sup> is the <strong>widest</strong> (flattest). Larger |a| means narrower; smaller |a| means wider.</p>
  </details>
</div>

<h3>Summary</h3>
<p>Quadratic functions produce parabolas. The sign of a determines direction (up or down), and |a| controls width. The vertex (-b/(2a), f(-b/(2a))) is the extreme point, and the axis of symmetry is the vertical line through it. The discriminant b<sup>2</sup> - 4ac reveals how many times the parabola crosses the x-axis: twice, once, or never. Understanding these features lets you analyze any quadratic before solving it.</p>
`,

'H35': `
<h2>Solving Quadratics</h2>
<p>Now that you understand what quadratic equations look like and how their graphs behave, it is time to learn how to solve them. Solving ax<sup>2</sup> + bx + c = 0 means finding the values of x that make the equation true -- the roots, zeros, or x-intercepts. You have three primary tools: factoring, the quadratic formula, and completing the square.</p>

<h3>Method 1: Solving by Factoring</h3>
<p>If you can factor the quadratic, this is often the fastest method. It relies on the <strong>Zero Product Property</strong>: if AB = 0, then A = 0 or B = 0.</p>

<div class="example-box">
  <h4>Worked Example 1 -- Solving by Factoring</h4>
  <p>Solve x<sup>2</sup> - 5x + 6 = 0.</p>
  <ol class="step-list">
    <li>Factor: find two numbers that multiply to 6 and add to -5. Those are -2 and -3.</li>
    <li>Write as (x - 2)(x - 3) = 0.</li>
    <li>Apply the Zero Product Property: x - 2 = 0 or x - 3 = 0.</li>
    <li>Solve: <strong>x = 2 or x = 3</strong>.</li>
  </ol>
  <p>Check: 2<sup>2</sup> - 5(2) + 6 = 4 - 10 + 6 = 0. And 3<sup>2</sup> - 5(3) + 6 = 9 - 15 + 6 = 0. Both check out.</p>
</div>

<h3>Method 2: The Quadratic Formula</h3>
<p>The quadratic formula works for <strong>every</strong> quadratic equation, whether or not it factors neatly:</p>
<div class="math-display">x = [-b &plusmn; sqrt(b<sup>2</sup> - 4ac)] / (2a)</div>
<p>The expression under the square root, b<sup>2</sup> - 4ac, is the discriminant, which tells you the nature of the solutions.</p>

<div class="example-box">
  <h4>Worked Example 2 -- Quadratic Formula</h4>
  <p>Solve 2x<sup>2</sup> + 3x - 5 = 0.</p>
  <ol class="step-list">
    <li>Identify a = 2, b = 3, c = -5.</li>
    <li>Calculate the discriminant: D = 3<sup>2</sup> - 4(2)(-5) = 9 + 40 = 49.</li>
    <li>Apply the formula: x = [-3 &plusmn; sqrt(49)] / (2 * 2) = (-3 &plusmn; 7) / 4.</li>
    <li>Two solutions: x = (-3 + 7)/4 = 4/4 = 1 and x = (-3 - 7)/4 = -10/4 = -5/2.</li>
  </ol>
  <p>Solutions: <strong>x = 1 or x = -5/2</strong>.</p>
</div>

<h3>Method 3: Completing the Square</h3>
<p>This method transforms ax<sup>2</sup> + bx + c = 0 into the form (x + p)<sup>2</sup> = q, making x easy to isolate.</p>
<ol class="step-list">
  <li>Move the constant to the right side.</li>
  <li>If a is not 1, divide every term by a.</li>
  <li>Take half of the x-coefficient, square it, and add it to both sides.</li>
  <li>Factor the left side as a perfect square.</li>
  <li>Take the square root of both sides (do not forget the &plusmn;).</li>
  <li>Solve for x.</li>
</ol>

<div class="example-box">
  <h4>Worked Example 3 -- Completing the Square</h4>
  <p>Solve x<sup>2</sup> + 8x + 5 = 0.</p>
  <ol class="step-list">
    <li>Move the constant: x<sup>2</sup> + 8x = -5.</li>
    <li>Half of 8 is 4; 4<sup>2</sup> = 16. Add 16 to both sides: x<sup>2</sup> + 8x + 16 = -5 + 16 = 11.</li>
    <li>Factor the left side: (x + 4)<sup>2</sup> = 11.</li>
    <li>Take square roots: x + 4 = &plusmn;sqrt(11).</li>
    <li>Solve: x = -4 &plusmn; sqrt(11).</li>
  </ol>
  <p>The exact solutions are <strong>x = -4 + sqrt(11)</strong> and <strong>x = -4 - sqrt(11)</strong>, approximately x &approx; -0.68 and x &approx; -7.32.</p>
</div>

<div class="tip-box">
  <h4>Choosing the Best Method</h4>
  <p><strong>Factoring:</strong> Use when the quadratic factors easily over the integers. Fastest when it works, but not all quadratics factor neatly.</p>
  <p><strong>Quadratic formula:</strong> The universal method. Always works. Use it when factoring is not obvious or when you need exact answers with radicals.</p>
  <p><strong>Completing the square:</strong> Most useful when you need vertex form or when b is even (making the arithmetic cleaner). Also needed to derive the quadratic formula itself.</p>
</div>

<div class="warning-box">
  <h4>Common Mistake: Forgetting the &plusmn;</h4>
  <p>When taking the square root of both sides, you must include both the positive and negative roots. Writing (x + 4)<sup>2</sup> = 11 and then x + 4 = sqrt(11) gives you only one solution. The correct step is x + 4 = &plusmn;sqrt(11).</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Solve by factoring: x<sup>2</sup> + x - 12 = 0.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Factor: (x + 4)(x - 3) = 0. Solutions: <strong>x = -4 or x = 3</strong>.</p>
  </details>

  <p><strong>2.</strong> Solve using the quadratic formula: x<sup>2</sup> - 6x + 2 = 0.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>a = 1, b = -6, c = 2. D = 36 - 8 = 28. x = (6 &plusmn; sqrt(28)) / 2 = (6 &plusmn; 2sqrt(7)) / 2 = <strong>3 &plusmn; sqrt(7)</strong>. Approximately x &approx; 5.65 or x &approx; 0.35.</p>
  </details>

  <p><strong>3.</strong> Solve by completing the square: x<sup>2</sup> - 10x + 21 = 0.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>x<sup>2</sup> - 10x = -21. Half of -10 is -5; (-5)<sup>2</sup> = 25. Add 25: x<sup>2</sup> - 10x + 25 = 4. Factor: (x - 5)<sup>2</sup> = 4. Take roots: x - 5 = &plusmn;2. So <strong>x = 7 or x = 3</strong>.</p>
  </details>

  <p><strong>4.</strong> Solve: 3x<sup>2</sup> + 6x = 0.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Factor out 3x: 3x(x + 2) = 0. By the Zero Product Property: 3x = 0 or x + 2 = 0. So <strong>x = 0 or x = -2</strong>.</p>
  </details>

  <p><strong>5.</strong> How many real solutions does 4x<sup>2</sup> - 4x + 1 = 0 have? Solve it.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>D = (-4)<sup>2</sup> - 4(4)(1) = 16 - 16 = 0. One repeated real solution. Using the formula: x = 4/(2*4) = 4/8 = 1/2. Or factor: (2x - 1)<sup>2</sup> = 0, so <strong>x = 1/2</strong>.</p>
  </details>
</div>

<h3>Summary</h3>
<p>Three methods solve quadratic equations: factoring (fastest when possible), the quadratic formula (always works), and completing the square (useful for exact form and deriving vertex form). The discriminant b<sup>2</sup> - 4ac predicts the number and type of solutions. Always check your solutions by substituting them back into the original equation, and never forget the &plusmn; when taking square roots.</p>
`,

'H36': `
<h2>Function Notation &amp; Composition</h2>
<p>Functions are the language of mathematics. The notation f(x) -- read "f of x" -- is far more than a label; it precisely communicates which function is being used, what the input is, and what the output will be. This lesson covers how to read, evaluate, and combine functions, laying the groundwork for all of higher mathematics.</p>

<h3>Understanding f(x) Notation</h3>
<p>When we write f(x) = 2x + 3, we are defining a <strong>rule</strong> named f that takes any input x and produces the output 2x + 3. The notation f(x) does <em>not</em> mean "f times x." It means "the output of function f when the input is x."</p>
<p>We can use any letter for the function name (f, g, h, etc.) and any variable for the input. The expression f(5) means "evaluate the function f at x = 5."</p>

<div class="example-box">
  <h4>Worked Example 1 -- Evaluating Functions</h4>
  <p>Given f(x) = x<sup>2</sup> - 4x + 1, find f(3), f(-2), and f(a + 1).</p>
  <ol class="step-list">
    <li>f(3) = (3)<sup>2</sup> - 4(3) + 1 = 9 - 12 + 1 = <strong>-2</strong>.</li>
    <li>f(-2) = (-2)<sup>2</sup> - 4(-2) + 1 = 4 + 8 + 1 = <strong>13</strong>.</li>
    <li>f(a + 1) = (a + 1)<sup>2</sup> - 4(a + 1) + 1 = a<sup>2</sup> + 2a + 1 - 4a - 4 + 1 = <strong>a<sup>2</sup> - 2a - 2</strong>.</li>
  </ol>
  <p>Notice that for f(a + 1), you replace every x with the entire expression (a + 1), using parentheses to ensure correct evaluation.</p>
</div>

<h3>Domain and Range</h3>
<p>The <strong>domain</strong> is the set of all valid inputs. The <strong>range</strong> is the set of all possible outputs.</p>
<div class="vocab-table">
  <table>
    <tr><th>Function Type</th><th>Domain Restriction</th><th>Example</th></tr>
    <tr><td>Polynomial</td><td>All real numbers</td><td>f(x) = x<sup>2</sup> + 1</td></tr>
    <tr><td>Rational</td><td>Denominator cannot equal 0</td><td>g(x) = 1/(x - 3), domain: x is not 3</td></tr>
    <tr><td>Square root</td><td>Expression under radical must be &ge; 0</td><td>h(x) = sqrt(x - 2), domain: x &ge; 2</td></tr>
  </table>
</div>

<div class="example-box">
  <h4>Worked Example 2 -- Finding Domain</h4>
  <p>Find the domain of g(x) = sqrt(5 - x).</p>
  <ol class="step-list">
    <li>The expression under the square root must be non-negative: 5 - x &ge; 0.</li>
    <li>Solve: -x &ge; -5, so x &le; 5.</li>
    <li>Domain: <strong>all real numbers x such that x &le; 5</strong>, or in interval notation: (-infinity, 5].</li>
  </ol>
</div>

<h3>Function Composition</h3>
<p>Composition chains two functions together: the output of one becomes the input of the other. The notation (f &compfn; g)(x) or f(g(x)) means "first apply g to x, then apply f to the result."</p>
<p>Think of it as a two-step process: g processes the input first, producing g(x). Then f takes that result and produces f(g(x)).</p>

<div class="example-box">
  <h4>Worked Example 3 -- Composing Functions</h4>
  <p>Let f(x) = 3x + 1 and g(x) = x<sup>2</sup> - 2. Find f(g(x)) and g(f(x)).</p>
  <p><strong>f(g(x)):</strong> Replace x in f with g(x):</p>
  <ol class="step-list">
    <li>f(g(x)) = 3[g(x)] + 1 = 3(x<sup>2</sup> - 2) + 1 = 3x<sup>2</sup> - 6 + 1 = <strong>3x<sup>2</sup> - 5</strong>.</li>
  </ol>
  <p><strong>g(f(x)):</strong> Replace x in g with f(x):</p>
  <ol class="step-list">
    <li>g(f(x)) = [f(x)]<sup>2</sup> - 2 = (3x + 1)<sup>2</sup> - 2 = 9x<sup>2</sup> + 6x + 1 - 2 = <strong>9x<sup>2</sup> + 6x - 1</strong>.</li>
  </ol>
  <p>Notice that f(g(x)) is not equal to g(f(x)). Composition is <strong>not commutative</strong> -- order matters.</p>
</div>

<div class="warning-box">
  <h4>Common Mistake: Treating f(x) as Multiplication</h4>
  <p>f(x) = x + 3 does not mean f * x = x + 3. The notation f(2) means "substitute 2 for x," giving 2 + 3 = 5. Similarly, f(a + b) means substitute (a + b) for x, not f * a + f * b.</p>
</div>

<div class="tip-box">
  <h4>Evaluating Composition Step by Step</h4>
  <p>When computing f(g(2)), work from the inside out. First find g(2), then plug that number into f. This avoids errors from trying to substitute entire expressions at once.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> If f(x) = 2x - 7, find f(4) and f(-3).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>f(4) = 2(4) - 7 = 8 - 7 = <strong>1</strong>. f(-3) = 2(-3) - 7 = -6 - 7 = <strong>-13</strong>.</p>
  </details>

  <p><strong>2.</strong> Find the domain of h(x) = 1 / (x<sup>2</sup> - 9).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>The denominator cannot equal zero: x<sup>2</sup> - 9 = 0 gives x = 3 or x = -3. Domain: <strong>all real numbers except x = 3 and x = -3</strong>.</p>
  </details>

  <p><strong>3.</strong> Let f(x) = x + 4 and g(x) = 2x. Find f(g(3)) and g(f(3)).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>f(g(3)): first g(3) = 2(3) = 6. Then f(6) = 6 + 4 = <strong>10</strong>.</p>
    <p>g(f(3)): first f(3) = 3 + 4 = 7. Then g(7) = 2(7) = <strong>14</strong>.</p>
  </details>

  <p><strong>4.</strong> Let f(x) = x<sup>2</sup> and g(x) = x - 5. Write a formula for f(g(x)) and g(f(x)).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>f(g(x)) = (x - 5)<sup>2</sup> = <strong>x<sup>2</sup> - 10x + 25</strong>.</p>
    <p>g(f(x)) = x<sup>2</sup> - 5 = <strong>x<sup>2</sup> - 5</strong>.</p>
  </details>

  <p><strong>5.</strong> If f(x) = 3x + 2, find f(x + h) - f(x) and simplify. (This is related to the difference quotient.)</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>f(x + h) = 3(x + h) + 2 = 3x + 3h + 2. Then f(x + h) - f(x) = (3x + 3h + 2) - (3x + 2) = <strong>3h</strong>.</p>
  </details>
</div>

<h3>Summary</h3>
<p>Function notation f(x) precisely identifies a function and its input. Evaluating a function means substituting the input value for x everywhere it appears. Domain is the set of allowable inputs; range is the set of resulting outputs. Composition f(g(x)) applies g first, then f to the result -- and the order matters because composition is not commutative. These concepts are foundational for calculus, where functions and their combinations are analyzed in depth.</p>
`,

'H37': `
<h2>Inverse Functions</h2>
<p>If a function f takes an input and produces an output, the <strong>inverse function</strong> f<sup>-1</sup> reverses the process: it takes the output and recovers the original input. Inverse functions appear throughout mathematics -- from solving equations to converting between units -- and understanding them deepens your grasp of what functions truly do.</p>

<h3>The Inverse Concept</h3>
<p>Function f takes x to y: f(x) = y. The inverse function f<sup>-1</sup> takes y back to x: f<sup>-1</sup>(y) = x. In other words:</p>
<div class="math-display">f(f<sup>-1</sup>(x)) = x and f<sup>-1</sup>(f(x)) = x</div>
<p>These two equations are the <strong>defining properties</strong> of inverse functions. They "undo" each other completely.</p>
<p>Think of real-world examples: if f converts Celsius to Fahrenheit using f(C) = (9/5)C + 32, then f<sup>-1</sup> converts Fahrenheit back to Celsius.</p>

<div class="tip-box">
  <h4>Important Notation Clarification</h4>
  <p>f<sup>-1</sup>(x) does <strong>not</strong> mean 1/f(x). The superscript -1 here denotes the inverse function, not a reciprocal. This is a common source of confusion. If you want the reciprocal of f(x), write [f(x)]<sup>-1</sup> or 1/f(x).</p>
</div>

<h3>One-to-One Functions and the Horizontal Line Test</h3>
<p>Not every function has an inverse. A function has an inverse if and only if it is <strong>one-to-one</strong> (injective): each output value comes from exactly one input value. If two different inputs produce the same output, the function cannot be reversed (which input would the inverse return?).</p>
<p>The <strong>Horizontal Line Test</strong> provides a visual check: if every horizontal line intersects the graph at most once, the function is one-to-one and has an inverse.</p>

<div class="columns-2">
  <div>
    <p><strong>One-to-one (has inverse):</strong></p>
    <ul>
      <li>f(x) = 2x + 3 (linear, non-zero slope)</li>
      <li>f(x) = x<sup>3</sup> (always increasing)</li>
      <li>f(x) = sqrt(x) for x &ge; 0</li>
    </ul>
  </div>
  <div>
    <p><strong>NOT one-to-one (no inverse):</strong></p>
    <ul>
      <li>f(x) = x<sup>2</sup> (f(3) = f(-3) = 9)</li>
      <li>f(x) = |x| (f(2) = f(-2) = 2)</li>
      <li>f(x) = sin(x) without restriction</li>
    </ul>
  </div>
</div>

<h3>Finding Inverses Algebraically</h3>
<p>To find the inverse of a one-to-one function:</p>
<ol class="step-list">
  <li>Replace f(x) with y.</li>
  <li>Swap x and y -- this reverses the input-output relationship.</li>
  <li>Solve for y.</li>
  <li>Write the result as f<sup>-1</sup>(x) = [your expression].</li>
</ol>

<div class="example-box">
  <h4>Worked Example 1 -- Finding the Inverse of a Linear Function</h4>
  <p>Find the inverse of f(x) = 4x - 7.</p>
  <ol class="step-list">
    <li>Write y = 4x - 7.</li>
    <li>Swap x and y: x = 4y - 7.</li>
    <li>Solve for y: x + 7 = 4y, so y = (x + 7)/4.</li>
    <li>f<sup>-1</sup>(x) = <strong>(x + 7)/4</strong>.</li>
  </ol>
  <p>Verify: f(f<sup>-1</sup>(x)) = 4 * [(x + 7)/4] - 7 = (x + 7) - 7 = x. Confirmed.</p>
</div>

<div class="example-box">
  <h4>Worked Example 2 -- Finding the Inverse of a Rational Function</h4>
  <p>Find the inverse of f(x) = (2x + 1) / (x - 3), where x is not 3.</p>
  <ol class="step-list">
    <li>Write y = (2x + 1) / (x - 3).</li>
    <li>Swap: x = (2y + 1) / (y - 3).</li>
    <li>Multiply both sides by (y - 3): x(y - 3) = 2y + 1.</li>
    <li>Distribute: xy - 3x = 2y + 1.</li>
    <li>Collect y-terms: xy - 2y = 3x + 1.</li>
    <li>Factor out y: y(x - 2) = 3x + 1.</li>
    <li>Solve: y = (3x + 1) / (x - 2).</li>
  </ol>
  <p>f<sup>-1</sup>(x) = <strong>(3x + 1) / (x - 2)</strong>, where x is not 2.</p>
</div>

<h3>Graphical Relationship</h3>
<p>The graph of f<sup>-1</sup> is the <strong>reflection</strong> of the graph of f over the line y = x. This makes geometric sense: swapping x and y in the equation is equivalent to reflecting across y = x.</p>
<p>To visualize: if (a, b) is on the graph of f, then (b, a) is on the graph of f<sup>-1</sup>. For example, if f(2) = 5, then f<sup>-1</sup>(5) = 2.</p>

<div class="example-box">
  <h4>Worked Example 3 -- Using the Graphical Relationship</h4>
  <p>The function f passes through the points (1, 4), (2, 7), and (3, 10). Find three points on f<sup>-1</sup>.</p>
  <ol class="step-list">
    <li>Swap coordinates: (4, 1), (7, 2), and (10, 3) are on f<sup>-1</sup>.</li>
    <li>If you graphed both, f<sup>-1</sup> would be the reflection of f over the line y = x.</li>
  </ol>
</div>

<div class="warning-box">
  <h4>Common Mistake: Assuming Every Function Has an Inverse</h4>
  <p>The function f(x) = x<sup>2</sup> is not one-to-one on all real numbers because f(3) = f(-3) = 9. It does <em>not</em> have an inverse unless you restrict the domain. For example, f(x) = x<sup>2</sup> for x &ge; 0 is one-to-one, and its inverse is f<sup>-1</sup>(x) = sqrt(x). Always check that the function passes the horizontal line test before finding an inverse.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>1.</strong> Find the inverse of f(x) = 5x + 2.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>y = 5x + 2. Swap: x = 5y + 2. Solve: y = (x - 2)/5. So <strong>f<sup>-1</sup>(x) = (x - 2)/5</strong>.</p>
  </details>

  <p><strong>2.</strong> Verify that f(x) = 3x - 9 and g(x) = (x + 9)/3 are inverses.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>f(g(x)) = 3 * [(x + 9)/3] - 9 = (x + 9) - 9 = x.</p>
    <p>g(f(x)) = (3x - 9 + 9)/3 = 3x/3 = x.</p>
    <p>Since both compositions equal x, they are <strong>inverses</strong>.</p>
  </details>

  <p><strong>3.</strong> Does f(x) = x<sup>2</sup> - 4 (all real numbers) have an inverse? Why or why not?</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p><strong>No.</strong> f is not one-to-one: f(2) = 0 and f(-2) = 0. Two different inputs give the same output. It fails the horizontal line test.</p>
  </details>

  <p><strong>4.</strong> Find the inverse of f(x) = (x - 1)<sup>3</sup> + 2.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>y = (x - 1)<sup>3</sup> + 2. Swap: x = (y - 1)<sup>3</sup> + 2. Then x - 2 = (y - 1)<sup>3</sup>. Take the cube root: y - 1 = (x - 2)<sup>1/3</sup>. So <strong>f<sup>-1</sup>(x) = (x - 2)<sup>1/3</sup> + 1</strong>.</p>
  </details>

  <p><strong>5.</strong> If the point (6, -1) is on the graph of f, what point must be on the graph of f<sup>-1</sup>?</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Swap the coordinates: <strong>(-1, 6)</strong> is on the graph of f<sup>-1</sup>.</p>
  </details>
</div>

<h3>Summary</h3>
<p>An inverse function reverses the input-output mapping of the original function. Only one-to-one functions (those passing the horizontal line test) have inverses. To find an inverse algebraically, swap x and y and solve for y. Graphically, f and f<sup>-1</sup> are reflections over the line y = x. The compositions f(f<sup>-1</sup>(x)) and f<sup>-1</sup>(f(x)) both equal x, serving as the verification test for inverses. Remember that f<sup>-1</sup>(x) is notation for the inverse function, not the reciprocal.</p>
`

};
