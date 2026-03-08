module.exports = {

'A01': `
<h2>Geometric Proof Foundations</h2>
<p>Mathematics is built on logical reasoning, and geometry is where that reasoning becomes visual and tangible. In this lesson, you will learn to construct rigorous geometric proofs -- arguments that demonstrate <strong>why</strong> a statement must be true, not just that it appears to be true. Proof is the backbone of all mathematics: once something is proven, it is certain forever.</p>

<h3>Axioms, Postulates, and Theorems</h3>
<p>Every logical system begins with statements accepted without proof. In geometry, these foundational truths are called <strong>axioms</strong> (or <strong>postulates</strong>). From axioms, we derive <strong>theorems</strong> -- statements proven true using logical deduction.</p>

<div class="vocab-table">
  <table>
    <tr><th>Term</th><th>Definition</th></tr>
    <tr><td>Axiom / Postulate</td><td>A statement accepted as true without proof; the starting point of a logical system.</td></tr>
    <tr><td>Theorem</td><td>A statement proven true by logical reasoning from axioms and previously proven theorems.</td></tr>
    <tr><td>Corollary</td><td>A theorem that follows directly and easily from another theorem.</td></tr>
    <tr><td>Lemma</td><td>A helper theorem proven in order to prove a larger theorem.</td></tr>
  </table>
</div>

<p>Key postulates you will use repeatedly:</p>
<ul>
  <li><strong>Segment Addition Postulate:</strong> If B is between A and C, then AB + BC = AC.</li>
  <li><strong>Angle Addition Postulate:</strong> If ray BD is in the interior of angle ABC, then m&ang;ABD + m&ang;DBC = m&ang;ABC.</li>
  <li><strong>Through any two points, there is exactly one line.</strong></li>
</ul>

<h3>Properties of Equality and Congruence</h3>
<p>Proofs rely on algebraic properties that let us manipulate equations and congruence statements. These properties are your <em>permitted moves</em> in a proof.</p>

<div class="vocab-table">
  <table>
    <tr><th>Property</th><th>Equality Version</th><th>Congruence Version</th></tr>
    <tr><td>Reflexive</td><td>a = a</td><td>Segment AB is congruent to segment AB</td></tr>
    <tr><td>Symmetric</td><td>If a = b, then b = a</td><td>If AB &cong; CD, then CD &cong; AB</td></tr>
    <tr><td>Transitive</td><td>If a = b and b = c, then a = c</td><td>If AB &cong; CD and CD &cong; EF, then AB &cong; EF</td></tr>
    <tr><td>Substitution</td><td>If a = b, then a can replace b in any expression</td><td>--</td></tr>
  </table>
</div>

<p>Additional properties used in proofs: the <strong>Addition Property</strong> (add the same quantity to both sides), <strong>Subtraction Property</strong>, <strong>Multiplication Property</strong>, and <strong>Division Property</strong> of equality.</p>

<h3>Angle Relationships: Vertical Angles and Linear Pairs</h3>
<p>When two lines intersect, they create two important angle relationships:</p>
<ul>
  <li><strong>Vertical Angles:</strong> The non-adjacent angles formed by two intersecting lines. Vertical angles are always congruent. This is a <em>theorem</em> (provable), not a postulate.</li>
  <li><strong>Linear Pair:</strong> Two adjacent angles whose non-common sides form a straight line. Linear pairs are supplementary (their measures sum to 180 degrees).</li>
</ul>

<h3>Parallel Line Angle Theorems</h3>
<p>When a transversal crosses two parallel lines, several angle pair relationships arise:</p>
<ul>
  <li><strong>Corresponding Angles Postulate:</strong> Corresponding angles are congruent.</li>
  <li><strong>Alternate Interior Angles Theorem:</strong> Alternate interior angles are congruent.</li>
  <li><strong>Alternate Exterior Angles Theorem:</strong> Alternate exterior angles are congruent.</li>
  <li><strong>Co-Interior (Same-Side Interior) Angles Theorem:</strong> Same-side interior angles are supplementary.</li>
</ul>

<h3>Types of Proof</h3>
<p>There are several proof formats, each with its own strengths:</p>

<p><strong>Two-Column Proof:</strong> The most structured format. The left column lists <em>statements</em> and the right column lists <em>reasons</em>. Every statement must be justified by an axiom, postulate, theorem, definition, or given information.</p>

<p><strong>Paragraph Proof:</strong> A proof written in complete sentences, weaving statements and reasons together in flowing prose. More flexible but requires careful organization.</p>

<p><strong>Proof by Contradiction (Indirect Proof):</strong> Assume the opposite of what you want to prove, then show this assumption leads to a logical impossibility. The contradiction forces the original statement to be true.</p>

<div class="example-box">
  <h4>Worked Example 1: Two-Column Proof (Vertical Angles Are Congruent)</h4>
  <p><strong>Given:</strong> Lines AB and CD intersect at point E.<br>
  <strong>Prove:</strong> &ang;AEC &cong; &ang;BED</p>
  <table>
    <tr><th>Statement</th><th>Reason</th></tr>
    <tr><td>1. Lines AB and CD intersect at E</td><td>Given</td></tr>
    <tr><td>2. &ang;AEC and &ang;AED form a linear pair</td><td>Definition of linear pair</td></tr>
    <tr><td>3. m&ang;AEC + m&ang;AED = 180&deg;</td><td>Linear Pair Postulate</td></tr>
    <tr><td>4. &ang;BED and &ang;AED form a linear pair</td><td>Definition of linear pair</td></tr>
    <tr><td>5. m&ang;BED + m&ang;AED = 180&deg;</td><td>Linear Pair Postulate</td></tr>
    <tr><td>6. m&ang;AEC + m&ang;AED = m&ang;BED + m&ang;AED</td><td>Transitive Property (both equal 180&deg;)</td></tr>
    <tr><td>7. m&ang;AEC = m&ang;BED</td><td>Subtraction Property of Equality</td></tr>
    <tr><td>8. &ang;AEC &cong; &ang;BED</td><td>Definition of congruent angles</td></tr>
  </table>
</div>

<div class="example-box">
  <h4>Worked Example 2: Proof by Contradiction</h4>
  <p><strong>Prove:</strong> A triangle cannot have two obtuse angles.</p>
  <p><strong>Proof:</strong> Assume, for contradiction, that triangle ABC has two obtuse angles: m&ang;A &gt; 90&deg; and m&ang;B &gt; 90&deg;.</p>
  <p>Then m&ang;A + m&ang;B &gt; 90&deg; + 90&deg; = 180&deg;.</p>
  <p>But by the Triangle Angle Sum Theorem, m&ang;A + m&ang;B + m&ang;C = 180&deg;, which means m&ang;C = 180&deg; - (m&ang;A + m&ang;B) &lt; 0&deg;.</p>
  <p>An angle cannot have a negative measure. This is a contradiction.</p>
  <p>Therefore, our assumption was false, and a triangle cannot have two obtuse angles. <strong>QED</strong></p>
</div>

<div class="example-box">
  <h4>Worked Example 3: Parallel Lines Proof</h4>
  <p><strong>Given:</strong> Line m is parallel to line n, transversal t crosses both. &ang;1 and &ang;2 are alternate interior angles.<br>
  <strong>Prove:</strong> &ang;1 &cong; &ang;2</p>
  <table>
    <tr><th>Statement</th><th>Reason</th></tr>
    <tr><td>1. m &parallel; n, transversal t</td><td>Given</td></tr>
    <tr><td>2. &ang;1 and &ang;3 are corresponding angles</td><td>Definition (same side of transversal, same position)</td></tr>
    <tr><td>3. &ang;1 &cong; &ang;3</td><td>Corresponding Angles Postulate</td></tr>
    <tr><td>4. &ang;3 and &ang;2 are vertical angles</td><td>Definition of vertical angles</td></tr>
    <tr><td>5. &ang;3 &cong; &ang;2</td><td>Vertical Angles Theorem</td></tr>
    <tr><td>6. &ang;1 &cong; &ang;2</td><td>Transitive Property of Congruence</td></tr>
  </table>
</div>

<div class="warning-box">
  <h4>Common Mistakes in Proofs</h4>
  <ul>
    <li><strong>Circular reasoning:</strong> Using the statement you are trying to prove as a reason within the proof. Every reason must be independent of the conclusion.</li>
    <li><strong>Skipping steps:</strong> Each statement must follow logically from previous statements and a cited reason. Do not jump to conclusions.</li>
    <li><strong>Confusing equality and congruence:</strong> Numbers are <em>equal</em>; geometric figures are <em>congruent</em>. Write m&ang;A = m&ang;B (measures are equal) or &ang;A &cong; &ang;B (angles are congruent), but not &ang;A = &ang;B.</li>
  </ul>
</div>

<div class="tip-box">
  <h4>Strategy for Writing Proofs</h4>
  <p>Work <strong>both directions</strong>. Start from the Given and ask "what can I deduce?" Also start from the Prove statement and ask "what would I need to show?" When the two chains of reasoning meet in the middle, you have your proof. Then rewrite it in order from Given to Prove.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>Problem 1:</strong> If m&ang;1 = 3x + 10 and m&ang;2 = 5x - 20, and &ang;1 and &ang;2 are vertical angles, find x and the measure of each angle.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Vertical angles are congruent, so m&ang;1 = m&ang;2.</p>
    <p>3x + 10 = 5x - 20</p>
    <p>30 = 2x</p>
    <p>x = 15</p>
    <p>m&ang;1 = 3(15) + 10 = 55&deg;, and m&ang;2 = 5(15) - 20 = 55&deg;. Both angles measure 55&deg;.</p>
  </details>

  <p><strong>Problem 2:</strong> Two parallel lines are cut by a transversal. One of the alternate exterior angles measures (4x + 5)&deg; and the other measures (6x - 35)&deg;. Find x and the angle measures.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Alternate exterior angles are congruent when lines are parallel.</p>
    <p>4x + 5 = 6x - 35</p>
    <p>40 = 2x</p>
    <p>x = 20</p>
    <p>Each angle measures 4(20) + 5 = 85&deg;.</p>
  </details>

  <p><strong>Problem 3:</strong> Write a two-column proof. Given: &ang;A and &ang;B are supplementary; &ang;B and &ang;C are supplementary. Prove: &ang;A &cong; &ang;C.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <table>
      <tr><th>Statement</th><th>Reason</th></tr>
      <tr><td>1. &ang;A and &ang;B are supplementary</td><td>Given</td></tr>
      <tr><td>2. m&ang;A + m&ang;B = 180&deg;</td><td>Definition of supplementary</td></tr>
      <tr><td>3. &ang;B and &ang;C are supplementary</td><td>Given</td></tr>
      <tr><td>4. m&ang;B + m&ang;C = 180&deg;</td><td>Definition of supplementary</td></tr>
      <tr><td>5. m&ang;A + m&ang;B = m&ang;B + m&ang;C</td><td>Transitive Property (both = 180&deg;)</td></tr>
      <tr><td>6. m&ang;A = m&ang;C</td><td>Subtraction Property of Equality</td></tr>
      <tr><td>7. &ang;A &cong; &ang;C</td><td>Definition of congruent angles</td></tr>
    </table>
  </details>

  <p><strong>Problem 4:</strong> Use proof by contradiction to show: If two angles of a triangle are congruent, the sides opposite them cannot have different lengths. (Hint: assume the sides have different lengths and consider what that implies.)</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Assume, for contradiction, that in triangle ABC, &ang;A &cong; &ang;B but BC &ne; AC (the sides opposite those angles).</p>
    <p>If BC &gt; AC, then by the theorem "the longer side is opposite the larger angle," m&ang;A &gt; m&ang;B. But we are given &ang;A &cong; &ang;B, so m&ang;A = m&ang;B. Contradiction.</p>
    <p>Similarly, if BC &lt; AC, then m&ang;A &lt; m&ang;B, again contradicting m&ang;A = m&ang;B.</p>
    <p>Therefore BC = AC, meaning the opposite sides must be equal in length. QED</p>
  </details>

  <p><strong>Problem 5:</strong> Lines p and q are cut by transversal r. The co-interior (same-side interior) angles measure (3x + 15)&deg; and (2x + 40)&deg;. If p &parallel; q, find x. Are the lines truly parallel if x turns out to be valid?</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Co-interior angles are supplementary when lines are parallel:</p>
    <p>(3x + 15) + (2x + 40) = 180</p>
    <p>5x + 55 = 180</p>
    <p>5x = 125</p>
    <p>x = 25</p>
    <p>The angles measure 3(25) + 15 = 90&deg; and 2(25) + 40 = 90&deg;. They sum to 180&deg;, confirming the lines are parallel with the transversal perpendicular to both.</p>
  </details>
</div>

<h3>Summary</h3>
<p>Geometric proofs transform intuition into certainty. You learned the distinction between axioms (accepted truths) and theorems (proven truths), and practiced three proof formats: two-column, paragraph, and proof by contradiction. The properties of equality and congruence are your logical tools, while vertical angles, linear pairs, and parallel line theorems provide the geometric facts you chain together. Mastering proof means mastering logical thinking itself.</p>
`,

'A02': `
<h2>Coordinate Geometry Proofs</h2>
<p>Coordinate geometry proofs bridge algebra and geometry by placing figures on the coordinate plane and using algebraic formulas to establish geometric properties. Instead of relying on angle-chasing and congruence postulates, you can <em>calculate</em> distances, slopes, and midpoints to prove that shapes have specific properties. This is one of the most powerful techniques in mathematics.</p>

<h3>Essential Formulas</h3>
<p>Every coordinate geometry proof depends on these fundamental tools:</p>

<div class="vocab-table">
  <table>
    <tr><th>Formula</th><th>Expression</th><th>Purpose</th></tr>
    <tr><td>Distance Formula</td><td>d = &radic;[(x&#8322; - x&#8321;)&sup2; + (y&#8322; - y&#8321;)&sup2;]</td><td>Find the length of a segment</td></tr>
    <tr><td>Midpoint Formula</td><td>M = ((x&#8321; + x&#8322;)/2, (y&#8321; + y&#8322;)/2)</td><td>Find the center of a segment</td></tr>
    <tr><td>Slope Formula</td><td>m = (y&#8322; - y&#8321;) / (x&#8322; - x&#8321;)</td><td>Measure steepness / direction</td></tr>
  </table>
</div>

<h3>Slope Criteria for Parallel and Perpendicular Lines</h3>
<p>These slope relationships are central to coordinate proofs:</p>
<ul>
  <li><strong>Parallel lines</strong> have <strong>equal slopes</strong>: m&#8321; = m&#8322;. They never intersect and run in the same direction.</li>
  <li><strong>Perpendicular lines</strong> have slopes that are <strong>negative reciprocals</strong>: m&#8321; &middot; m&#8322; = -1. Equivalently, m&#8322; = -1/m&#8321;. If one line has slope 3, a perpendicular line has slope -1/3.</li>
  <li><strong>Special case:</strong> A horizontal line (slope 0) is perpendicular to a vertical line (undefined slope).</li>
</ul>

<h3>Proving Quadrilateral Classifications</h3>
<p>To prove a quadrilateral is a specific type, you verify the defining properties using coordinate tools:</p>

<div class="vocab-table">
  <table>
    <tr><th>Shape</th><th>What to Prove</th><th>Tools</th></tr>
    <tr><td>Parallelogram</td><td>Both pairs of opposite sides are parallel</td><td>Show equal slopes for opposite sides</td></tr>
    <tr><td>Rectangle</td><td>Parallelogram with a right angle</td><td>Equal slopes for opposite sides; perpendicular slopes for adjacent sides</td></tr>
    <tr><td>Rhombus</td><td>Parallelogram with all sides equal</td><td>Equal slopes for opposite sides; all four side lengths equal (distance formula)</td></tr>
    <tr><td>Square</td><td>Rectangle with all sides equal</td><td>All four conditions: equal opposite slopes, perpendicular adjacent slopes, four equal side lengths</td></tr>
    <tr><td>Trapezoid</td><td>Exactly one pair of parallel sides</td><td>One pair of equal slopes, other pair of different slopes</td></tr>
    <tr><td>Isosceles Trapezoid</td><td>Trapezoid with equal non-parallel sides (legs)</td><td>Slopes + equal leg lengths via distance formula</td></tr>
  </table>
</div>

<div class="tip-box">
  <h4>Strategic Placement</h4>
  <p>When setting up a coordinate proof, place the figure to minimize computation. Put one vertex at the origin and align a side along the x-axis. For symmetric figures, center them at the origin. Using variables (a, b, c) instead of specific numbers makes your proof <strong>general</strong> -- it applies to all figures of that type, not just one specific case.</p>
</div>

<div class="example-box">
  <h4>Worked Example 1: Proving a Parallelogram</h4>
  <p><strong>Problem:</strong> Show that A(1, 2), B(5, 4), C(7, 8), D(3, 6) form a parallelogram.</p>
  <p><strong>Solution:</strong> Compute slopes of all four sides:</p>
  <div class="math-display">Slope of AB = (4 - 2)/(5 - 1) = 2/4 = 1/2</div>
  <div class="math-display">Slope of DC = (8 - 6)/(7 - 3) = 2/4 = 1/2</div>
  <div class="math-display">Slope of BC = (8 - 4)/(7 - 5) = 4/2 = 2</div>
  <div class="math-display">Slope of AD = (6 - 2)/(3 - 1) = 4/2 = 2</div>
  <p>AB &parallel; DC (both have slope 1/2) and BC &parallel; AD (both have slope 2). Both pairs of opposite sides are parallel, so ABCD is a parallelogram.</p>
</div>

<div class="example-box">
  <h4>Worked Example 2: Is It a Rectangle?</h4>
  <p><strong>Problem:</strong> Given the parallelogram from Example 1, determine whether ABCD is a rectangle.</p>
  <p><strong>Solution:</strong> A parallelogram is a rectangle if adjacent sides are perpendicular. Check whether AB is perpendicular to BC:</p>
  <div class="math-display">Slope of AB = 1/2, Slope of BC = 2</div>
  <div class="math-display">(1/2) &times; 2 = 1 &ne; -1</div>
  <p>The product of slopes is 1, not -1, so the sides are <strong>not</strong> perpendicular. ABCD is a parallelogram but <strong>not</strong> a rectangle.</p>
</div>

<div class="example-box">
  <h4>Worked Example 3: Proving the Diagonals of a Rectangle Bisect Each Other</h4>
  <p><strong>Problem:</strong> Let rectangle PQRS have vertices P(0, 0), Q(a, 0), R(a, b), S(0, b). Prove the diagonals bisect each other.</p>
  <p><strong>Solution:</strong> The diagonals are PR and QS. Find each midpoint:</p>
  <div class="math-display">Midpoint of PR = ((0 + a)/2, (0 + b)/2) = (a/2, b/2)</div>
  <div class="math-display">Midpoint of QS = ((a + 0)/2, (0 + b)/2) = (a/2, b/2)</div>
  <p>Both diagonals share the same midpoint (a/2, b/2), so they bisect each other. Because we used variables, this proof applies to <strong>every</strong> rectangle, not just a specific one.</p>
</div>

<div class="warning-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li><strong>Forgetting to check all conditions:</strong> To prove a square, you must show it is both a rectangle AND a rhombus. Showing four equal sides alone only proves a rhombus.</li>
    <li><strong>Slope with vertical lines:</strong> If x&#8322; = x&#8321;, the slope is undefined (vertical line). Two vertical lines are parallel to each other. Do not write 0 for a vertical slope.</li>
    <li><strong>Distance formula sign errors:</strong> Differences are squared, so the sign does not affect the distance. But be careful with slope -- the sign matters there.</li>
  </ul>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>Problem 1:</strong> Find the midpoint and distance between A(-3, 7) and B(5, 1).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Midpoint = ((-3 + 5)/2, (7 + 1)/2) = (1, 4)</p>
    <p>Distance = &radic;[(5 - (-3))&sup2; + (1 - 7)&sup2;] = &radic;[64 + 36] = &radic;100 = 10</p>
  </details>

  <p><strong>Problem 2:</strong> Determine whether A(2, 3), B(6, 5), C(8, 1), D(4, -1) form a parallelogram, rectangle, rhombus, or square.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Slopes: AB = (5-3)/(6-2) = 1/2, DC = (1-(-1))/(8-4) = 1/2, BC = (1-5)/(8-6) = -2, AD = (-1-3)/(4-2) = -2.</p>
    <p>AB &parallel; DC and BC &parallel; AD, so it is a parallelogram.</p>
    <p>Check perpendicularity: (1/2)(-2) = -1. Yes! Adjacent sides are perpendicular, so it is a rectangle.</p>
    <p>Side lengths: AB = &radic;(16+4) = &radic;20, BC = &radic;(4+16) = &radic;20. All sides equal &radic;20.</p>
    <p>It is a rectangle with all equal sides: it is a <strong>square</strong>.</p>
  </details>

  <p><strong>Problem 3:</strong> Line segment AB has endpoints A(1, -2) and B(7, 6). Point C is the midpoint of AB. Find the equation of the line through C perpendicular to AB.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>C = ((1+7)/2, (-2+6)/2) = (4, 2)</p>
    <p>Slope of AB = (6-(-2))/(7-1) = 8/6 = 4/3</p>
    <p>Perpendicular slope = -3/4</p>
    <p>Line through C: y - 2 = (-3/4)(x - 4), which gives y = (-3/4)x + 5.</p>
    <p>This line is the <strong>perpendicular bisector</strong> of AB.</p>
  </details>

  <p><strong>Problem 4:</strong> Prove that the quadrilateral with vertices P(0, 0), Q(5, 0), R(7, 3), S(2, 3) is a parallelogram using the midpoint method (show diagonals bisect each other).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Diagonals are PR and QS.</p>
    <p>Midpoint of PR = ((0+7)/2, (0+3)/2) = (3.5, 1.5)</p>
    <p>Midpoint of QS = ((5+2)/2, (0+3)/2) = (3.5, 1.5)</p>
    <p>The diagonals have the same midpoint, so they bisect each other. A quadrilateral whose diagonals bisect each other is a parallelogram. QED</p>
  </details>

  <p><strong>Problem 5:</strong> Triangle ABC has vertices A(0, 0), B(6, 0), C(2, 4). Find the length of the segment connecting the midpoints of AC and BC. Compare it to AB.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Midpoint of AC: M = ((0+2)/2, (0+4)/2) = (1, 2)</p>
    <p>Midpoint of BC: N = ((6+2)/2, (0+4)/2) = (4, 2)</p>
    <p>MN = &radic;[(4-1)&sup2; + (2-2)&sup2;] = &radic;9 = 3</p>
    <p>AB = &radic;[(6-0)&sup2; + 0&sup2;] = 6</p>
    <p>MN = 3 = AB/2. The midsegment is exactly half the length of the parallel side. This illustrates the <strong>Triangle Midsegment Theorem</strong>.</p>
  </details>
</div>

<h3>Summary</h3>
<p>Coordinate geometry proofs convert geometric questions into algebraic calculations. The distance formula measures lengths, the midpoint formula locates centers, and the slope formula determines direction. Parallel lines share the same slope; perpendicular lines have slopes whose product is -1. By computing these values for the sides and diagonals of a figure, you can classify quadrilaterals and prove geometric properties with algebraic certainty.</p>
`,

'A03': `
<h2>Similarity and Proportionality</h2>
<p>Two figures are <strong>similar</strong> if they have the same shape but not necessarily the same size. Similarity is one of the most far-reaching concepts in geometry: it underlies trigonometry, scale drawings, fractal geometry, and countless real-world applications from architecture to astronomy. In this lesson, you will learn to prove triangles similar, work with proportions in similar figures, and apply the geometric mean.</p>

<h3>What Is Similarity?</h3>
<p>Two polygons are similar (written with the symbol ~) if and only if:</p>
<ol>
  <li>All corresponding angles are congruent, AND</li>
  <li>All corresponding sides are proportional (their ratios are equal).</li>
</ol>
<p>The common ratio of corresponding sides is called the <strong>scale factor</strong>, often denoted k. If triangle ABC ~ triangle DEF with scale factor k = 2, then every side of DEF is twice the corresponding side of ABC.</p>

<div class="math-display">If ABC ~ DEF with scale factor k, then DE/AB = EF/BC = DF/AC = k</div>

<h3>Triangle Similarity Criteria</h3>
<p>Unlike congruence (which requires more information), triangle similarity can be established with surprisingly little data:</p>

<div class="vocab-table">
  <table>
    <tr><th>Criterion</th><th>What to Show</th><th>Why It Works</th></tr>
    <tr><td>AA (Angle-Angle)</td><td>Two pairs of corresponding angles are congruent</td><td>The third pair must also be congruent (angle sum = 180&deg;), which forces proportional sides</td></tr>
    <tr><td>SAS (Side-Angle-Side)</td><td>Two pairs of corresponding sides are proportional AND the included angles are congruent</td><td>The proportional sides and fixed angle lock in the shape</td></tr>
    <tr><td>SSS (Side-Side-Side)</td><td>All three pairs of corresponding sides are proportional</td><td>Equal ratios force equal angles</td></tr>
  </table>
</div>

<p><strong>AA is by far the most commonly used criterion.</strong> Because triangles have exactly 180 degrees, showing two angles match automatically guarantees the third matches as well.</p>

<h3>The Triangle Proportionality Theorem</h3>
<p>This theorem connects parallel lines and proportional segments within a triangle:</p>
<div class="math-display">If a line parallel to one side of a triangle intersects the other two sides, then it divides those sides proportionally.</div>
<p>In triangle ABC, if line DE is parallel to BC with D on AB and E on AC, then:</p>
<div class="math-display">AD/DB = AE/EC</div>
<p>The converse is also true: if a line divides two sides of a triangle proportionally, then it is parallel to the third side.</p>

<h3>The Geometric Mean</h3>
<p>The <strong>geometric mean</strong> of two positive numbers a and b is:</p>
<div class="math-display">geometric mean = &radic;(a &times; b)</div>
<p>The geometric mean appears naturally in similar triangles. When an altitude is drawn from the right angle to the hypotenuse of a right triangle, it creates two smaller triangles, each similar to the original and to each other. The altitude is the geometric mean of the two segments of the hypotenuse:</p>
<div class="math-display">h = &radic;(p &times; q)</div>
<p>where p and q are the two segments of the hypotenuse.</p>

<p>Additionally, each leg of the original right triangle is the geometric mean of the hypotenuse and the adjacent hypotenuse segment:</p>
<div class="math-display">a = &radic;(c &times; p) and b = &radic;(c &times; q)</div>

<div class="example-box">
  <h4>Worked Example 1: Proving Triangles Similar (AA)</h4>
  <p><strong>Problem:</strong> In triangle PQR, angle P = 50&deg; and angle Q = 70&deg;. In triangle XYZ, angle X = 50&deg; and angle Z = 60&deg;. Are the triangles similar?</p>
  <p><strong>Solution:</strong></p>
  <p>In triangle PQR: &ang;R = 180&deg; - 50&deg; - 70&deg; = 60&deg;.</p>
  <p>In triangle XYZ: &ang;Y = 180&deg; - 50&deg; - 60&deg; = 70&deg;.</p>
  <p>Comparing: &ang;P = &ang;X = 50&deg;, &ang;Q = &ang;Y = 70&deg;, &ang;R = &ang;Z = 60&deg;.</p>
  <p>Two pairs of angles are congruent (in fact all three are), so by <strong>AA Similarity</strong>, triangle PQR ~ triangle XYZ.</p>
</div>

<div class="example-box">
  <h4>Worked Example 2: Using Proportional Sides</h4>
  <p><strong>Problem:</strong> Triangle ABC ~ triangle DEF with AB = 6, BC = 8, AC = 10, and DE = 9. Find EF and DF.</p>
  <p><strong>Solution:</strong> The scale factor is k = DE/AB = 9/6 = 3/2.</p>
  <p>EF = BC &times; k = 8 &times; 3/2 = 12</p>
  <p>DF = AC &times; k = 10 &times; 3/2 = 15</p>
  <p>We can verify: the sides 9, 12, 15 are a 3-4-5 right triangle scaled by 3, and 6, 8, 10 are a 3-4-5 right triangle scaled by 2. The ratio 3/2 checks out.</p>
</div>

<div class="example-box">
  <h4>Worked Example 3: Geometric Mean and Right Triangle Altitude</h4>
  <p><strong>Problem:</strong> In right triangle ABC (right angle at C), the altitude from C to hypotenuse AB meets AB at point D. If AD = 4 and DB = 9, find the altitude CD and both legs AC and BC.</p>
  <p><strong>Solution:</strong></p>
  <p>The hypotenuse AB = AD + DB = 4 + 9 = 13.</p>
  <p>The altitude is the geometric mean of the hypotenuse segments:</p>
  <div class="math-display">CD = &radic;(AD &times; DB) = &radic;(4 &times; 9) = &radic;36 = 6</div>
  <p>Each leg is the geometric mean of the hypotenuse and the adjacent segment:</p>
  <div class="math-display">AC = &radic;(AB &times; AD) = &radic;(13 &times; 4) = &radic;52 = 2&radic;13</div>
  <div class="math-display">BC = &radic;(AB &times; DB) = &radic;(13 &times; 9) = &radic;117 = 3&radic;13</div>
</div>

<div class="warning-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li><strong>Mismatching corresponding vertices:</strong> When writing ABC ~ DEF, vertex A corresponds to D, B to E, C to F. The order of letters matters. Always set up proportions using corresponding sides.</li>
    <li><strong>Confusing similarity and congruence:</strong> Similar triangles have equal angles and proportional sides. Congruent triangles are the special case where the scale factor is 1.</li>
    <li><strong>Arithmetic mean vs. geometric mean:</strong> The arithmetic mean of 4 and 9 is (4+9)/2 = 6.5. The geometric mean is &radic;(4 &times; 9) = 6. These are different values; do not confuse them.</li>
  </ul>
</div>

<div class="tip-box">
  <h4>Real-World Application: Indirect Measurement</h4>
  <p>Similarity lets you measure objects you cannot reach. If you know a flagpole and a person cast shadows at the same time, the triangles formed (person-shadow-sun ray and pole-shadow-sun ray) are similar by AA. Measure the person's height and both shadow lengths, then set up a proportion to find the flagpole's height. Surveyors, astronomers, and engineers use this principle constantly.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>Problem 1:</strong> Determine whether the triangles with sides 5, 12, 13 and 10, 24, 26 are similar. If so, state the scale factor.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Check ratios: 10/5 = 2, 24/12 = 2, 26/13 = 2. All ratios are equal, so the triangles are similar by SSS Similarity with scale factor k = 2.</p>
  </details>

  <p><strong>Problem 2:</strong> In triangle ABC, DE is parallel to BC with D on AB and E on AC. If AD = 6, DB = 4, and AE = 9, find EC.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>By the Triangle Proportionality Theorem: AD/DB = AE/EC</p>
    <p>6/4 = 9/EC</p>
    <p>EC = 9 &times; 4/6 = 6</p>
  </details>

  <p><strong>Problem 3:</strong> A 5-foot-tall person casts a 3-foot shadow. At the same time, a nearby tree casts a 15-foot shadow. How tall is the tree?</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>The sun rays create similar triangles (AA: both have a right angle at the ground and the same sun angle).</p>
    <p>person height / person shadow = tree height / tree shadow</p>
    <p>5/3 = h/15</p>
    <p>h = 5 &times; 15/3 = 25 feet.</p>
  </details>

  <p><strong>Problem 4:</strong> Find the geometric mean of 8 and 18. Then verify by setting up a proportion.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Geometric mean = &radic;(8 &times; 18) = &radic;144 = 12.</p>
    <p>Verification: 8/12 = 12/18. Both simplify to 2/3. The geometric mean is the value x such that a/x = x/b.</p>
  </details>

  <p><strong>Problem 5:</strong> Right triangle ABC has the right angle at C. The altitude from C to hypotenuse AB creates segments AD = 3 and DB = 12 on the hypotenuse. Find the altitude CD and both legs.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>AB = 3 + 12 = 15</p>
    <p>CD = &radic;(3 &times; 12) = &radic;36 = 6</p>
    <p>AC = &radic;(15 &times; 3) = &radic;45 = 3&radic;5</p>
    <p>BC = &radic;(15 &times; 12) = &radic;180 = 6&radic;5</p>
    <p>Check: AC&sup2; + BC&sup2; = 45 + 180 = 225 = 15&sup2; = AB&sup2;. Confirmed by the Pythagorean Theorem.</p>
  </details>
</div>

<h3>Summary</h3>
<p>Similar figures share the same shape but differ in size. Triangle similarity can be established using AA, SAS, or SSS criteria, with AA being the most efficient. The Triangle Proportionality Theorem shows that a line parallel to one side of a triangle divides the other two sides proportionally. The geometric mean connects the altitude of a right triangle to the segments of its hypotenuse. Together, these tools let you solve problems from indirect measurement to complex geometric reasoning.</p>
`,

'A04': `
<h2>Circle Theorems</h2>
<p>Circles are arguably the most elegant objects in geometry, and the theorems governing them are among the most beautiful results in all of mathematics. In this lesson, you will explore the deep relationships between arcs, chords, central angles, and inscribed angles. These theorems have been known since the time of Euclid and Thales, and they remain essential in modern mathematics, engineering, and physics.</p>

<h3>Key Definitions</h3>
<div class="vocab-table">
  <table>
    <tr><th>Term</th><th>Definition</th></tr>
    <tr><td>Central Angle</td><td>An angle whose vertex is the center of the circle. Its measure equals the measure of its intercepted arc.</td></tr>
    <tr><td>Inscribed Angle</td><td>An angle whose vertex is on the circle and whose sides are chords of the circle.</td></tr>
    <tr><td>Intercepted Arc</td><td>The arc that lies in the interior of an angle and has endpoints on the angle's sides.</td></tr>
    <tr><td>Chord</td><td>A segment whose endpoints are both on the circle.</td></tr>
    <tr><td>Tangent</td><td>A line that touches the circle at exactly one point (the point of tangency).</td></tr>
    <tr><td>Secant</td><td>A line that intersects the circle at two points.</td></tr>
  </table>
</div>

<h3>Arc, Chord, and Central Angle Relationships</h3>
<p>A central angle and its intercepted arc have the same measure in degrees. This is actually the <em>definition</em> of arc measure. From this starting point:</p>
<ul>
  <li><strong>Equal chords subtend equal arcs</strong> (and vice versa) in the same circle or congruent circles.</li>
  <li><strong>Equal central angles subtend equal chords and equal arcs.</strong></li>
  <li>A diameter (or any chord through the center) subtends a semicircular arc of 180&deg;.</li>
  <li>The total arc of a full circle is 360&deg;.</li>
</ul>

<h3>The Inscribed Angle Theorem</h3>
<p>This is the crown jewel of circle theorems:</p>
<div class="math-display">An inscribed angle is equal to half the measure of its intercepted arc.</div>
<p>Equivalently, an inscribed angle is half the central angle that subtends the same arc. If the intercepted arc measures 80&deg;, the inscribed angle measures 40&deg;.</p>

<p><strong>Corollaries of the Inscribed Angle Theorem:</strong></p>
<ol>
  <li><strong>Inscribed angles subtending the same arc are congruent.</strong> No matter where you place the vertex on the major arc, the inscribed angle looking at the same chord has the same measure.</li>
  <li><strong>An inscribed angle in a semicircle is a right angle.</strong> This is Thales' Theorem (below).</li>
  <li><strong>Opposite angles of an inscribed quadrilateral are supplementary</strong> (they sum to 180&deg;).</li>
</ol>

<h3>Thales' Theorem</h3>
<p>If AB is a diameter of a circle and C is any point on the circle (other than A or B), then angle ACB = 90&deg;.</p>
<p><strong>Why?</strong> The arc AB intercepted by the inscribed angle ACB is a semicircle (180&deg;). By the Inscribed Angle Theorem, the inscribed angle is half of 180&deg; = 90&deg;.</p>
<p>This theorem is attributed to Thales of Miletus (circa 600 BCE) and is considered one of the first proven theorems in history.</p>

<h3>Tangent Theorems</h3>
<p><strong>Tangent-Radius Perpendicularity:</strong> A tangent line to a circle is perpendicular to the radius drawn to the point of tangency. This gives us a right angle every time a tangent meets a radius.</p>

<p><strong>Two-Tangent Theorem:</strong> If two tangent lines are drawn to a circle from the same external point, then:</p>
<ul>
  <li>The two tangent segments are equal in length.</li>
  <li>The line from the external point to the center bisects the angle between the tangents.</li>
</ul>

<div class="example-box">
  <h4>Worked Example 1: Inscribed Angle Theorem</h4>
  <p><strong>Problem:</strong> In circle O, central angle AOB = 110&deg;. Point C is on the major arc AB. Find the measure of inscribed angle ACB.</p>
  <p><strong>Solution:</strong></p>
  <p>The central angle AOB intercepts minor arc AB, which measures 110&deg;.</p>
  <p>The inscribed angle ACB also intercepts minor arc AB (since C is on the major arc).</p>
  <p>By the Inscribed Angle Theorem:</p>
  <div class="math-display">m&ang;ACB = (1/2) &times; m(arc AB) = (1/2) &times; 110&deg; = 55&deg;</div>
</div>

<div class="example-box">
  <h4>Worked Example 2: Thales' Theorem Application</h4>
  <p><strong>Problem:</strong> AB is a diameter of circle O with radius 5. Point C is on the circle such that AC = 6. Find BC.</p>
  <p><strong>Solution:</strong></p>
  <p>By Thales' Theorem, angle ACB = 90&deg; (angle inscribed in a semicircle).</p>
  <p>The diameter AB = 2 &times; 5 = 10.</p>
  <p>By the Pythagorean Theorem in right triangle ACB:</p>
  <div class="math-display">AC&sup2; + BC&sup2; = AB&sup2;</div>
  <div class="math-display">36 + BC&sup2; = 100</div>
  <div class="math-display">BC&sup2; = 64, so BC = 8</div>
</div>

<div class="example-box">
  <h4>Worked Example 3: Two-Tangent Theorem</h4>
  <p><strong>Problem:</strong> From external point P, two tangent lines are drawn to circle O (radius 5), touching at points A and B. If PA = 12, find the distance from P to center O.</p>
  <p><strong>Solution:</strong></p>
  <p>By the tangent-radius theorem, OA is perpendicular to PA, creating right angle OAP.</p>
  <p>In right triangle OAP: OA = 5 (radius), PA = 12 (tangent segment).</p>
  <div class="math-display">OP&sup2; = OA&sup2; + PA&sup2; = 25 + 144 = 169</div>
  <div class="math-display">OP = 13</div>
  <p>Note: By the Two-Tangent Theorem, PB = PA = 12 as well.</p>
</div>

<div class="warning-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li><strong>Doubling instead of halving:</strong> The inscribed angle is <em>half</em> the arc, not double. The central angle equals the arc; the inscribed angle is half the arc. If the arc is 80&deg;, the inscribed angle is 40&deg;, not 160&deg;.</li>
    <li><strong>Wrong arc:</strong> An inscribed angle intercepts the arc on the opposite side of the chord from the vertex. Make sure you identify the correct intercepted arc.</li>
    <li><strong>Tangent angle assumption:</strong> A tangent is perpendicular to the radius at the point of tangency only -- not to any other line through the center.</li>
  </ul>
</div>

<div class="tip-box">
  <h4>Inscribed Quadrilateral Shortcut</h4>
  <p>When a quadrilateral is inscribed in a circle (all four vertices on the circle), opposite angles are supplementary. This means if you know three angles of an inscribed quadrilateral, the fourth is determined. This property is unique to cyclic quadrilaterals and can be used to prove that a quadrilateral is or is not inscribable in a circle.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>Problem 1:</strong> In circle O, inscribed angle ABC intercepts arc AC = 140&deg;. Find m&ang;ABC.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>By the Inscribed Angle Theorem: m&ang;ABC = (1/2)(140&deg;) = 70&deg;.</p>
  </details>

  <p><strong>Problem 2:</strong> Quadrilateral PQRS is inscribed in a circle. If &ang;P = 85&deg; and &ang;Q = 110&deg;, find &ang;R and &ang;S.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Opposite angles of an inscribed quadrilateral are supplementary.</p>
    <p>&ang;R = 180&deg; - &ang;P = 180&deg; - 85&deg; = 95&deg;</p>
    <p>&ang;S = 180&deg; - &ang;Q = 180&deg; - 110&deg; = 70&deg;</p>
    <p>Check: 85 + 110 + 95 + 70 = 360&deg;. Confirmed.</p>
  </details>

  <p><strong>Problem 3:</strong> AB is a diameter of a circle with radius 13. C is a point on the circle with BC = 10. Find AC.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>By Thales' Theorem, &ang;ACB = 90&deg;. AB = 26 (diameter).</p>
    <p>AC&sup2; + BC&sup2; = AB&sup2;</p>
    <p>AC&sup2; + 100 = 676</p>
    <p>AC&sup2; = 576, so AC = 24.</p>
  </details>

  <p><strong>Problem 4:</strong> From an external point P, a tangent PA and a secant PBC are drawn to circle O. If PA = 8 and PB = 4, find PC. (Use the tangent-secant theorem: PA&sup2; = PB &times; PC.)</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>By the tangent-secant theorem: PA&sup2; = PB &times; PC</p>
    <p>64 = 4 &times; PC</p>
    <p>PC = 16</p>
    <p>So the chord BC has length PC - PB = 16 - 4 = 12.</p>
  </details>

  <p><strong>Problem 5:</strong> Two chords AB and CD intersect inside circle O at point E. If AE = 3, EB = 8, and CE = 4, find ED. (Use the intersecting chords theorem: AE &times; EB = CE &times; ED.)</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>By the intersecting chords theorem: AE &times; EB = CE &times; ED</p>
    <p>3 &times; 8 = 4 &times; ED</p>
    <p>24 = 4 &times; ED</p>
    <p>ED = 6</p>
  </details>
</div>

<h3>Summary</h3>
<p>Circle theorems reveal the elegant internal structure of circles. The Inscribed Angle Theorem -- that an inscribed angle equals half its intercepted arc -- is the foundation from which Thales' Theorem and the inscribed quadrilateral property follow. The tangent-radius perpendicularity gives you right angles whenever a tangent meets a radius, and the Two-Tangent Theorem ensures equal tangent segments from any external point. These theorems work together to solve problems involving arcs, chords, angles, and tangent lines.</p>
`,

'A05': `
<h2>Polynomial Functions Beyond Quadratics</h2>
<p>You have already mastered linear and quadratic functions. Now we venture into the richer world of higher-degree polynomials: cubics, quartics, and beyond. These functions model phenomena that simpler functions cannot -- from the shape of roller coasters to the behavior of economic models. Understanding their structure requires new tools: the Rational Root Theorem, synthetic division, and the Fundamental Theorem of Algebra.</p>

<h3>Polynomial Basics</h3>
<p>A polynomial function of degree n has the form:</p>
<div class="math-display">f(x) = a_n x^n + a_(n-1) x^(n-1) + ... + a_1 x + a_0</div>
<p>where a_n (the <strong>leading coefficient</strong>) is nonzero and n is a nonnegative integer. The degree determines the function's fundamental behavior.</p>

<div class="vocab-table">
  <table>
    <tr><th>Degree</th><th>Name</th><th>Max Turning Points</th><th>Max Real Zeros</th></tr>
    <tr><td>1</td><td>Linear</td><td>0</td><td>1</td></tr>
    <tr><td>2</td><td>Quadratic</td><td>1</td><td>2</td></tr>
    <tr><td>3</td><td>Cubic</td><td>2</td><td>3</td></tr>
    <tr><td>4</td><td>Quartic</td><td>3</td><td>4</td></tr>
    <tr><td>n</td><td>nth degree</td><td>n - 1</td><td>n</td></tr>
  </table>
</div>

<h3>End Behavior</h3>
<p>The <strong>end behavior</strong> of a polynomial is controlled entirely by its leading term a_n x^n. As x approaches positive or negative infinity, the leading term dominates all others.</p>

<div class="vocab-table">
  <table>
    <tr><th>Degree</th><th>Leading Coefficient</th><th>As x &rarr; +&infin;</th><th>As x &rarr; -&infin;</th></tr>
    <tr><td>Even</td><td>Positive</td><td>f(x) &rarr; +&infin;</td><td>f(x) &rarr; +&infin;</td></tr>
    <tr><td>Even</td><td>Negative</td><td>f(x) &rarr; -&infin;</td><td>f(x) &rarr; -&infin;</td></tr>
    <tr><td>Odd</td><td>Positive</td><td>f(x) &rarr; +&infin;</td><td>f(x) &rarr; -&infin;</td></tr>
    <tr><td>Odd</td><td>Negative</td><td>f(x) &rarr; -&infin;</td><td>f(x) &rarr; +&infin;</td></tr>
  </table>
</div>

<p>Think of it this way: even-degree polynomials have "matching" ends (both up or both down), while odd-degree polynomials have "opposite" ends (one up, one down).</p>

<h3>Finding Zeros: The Rational Root Theorem</h3>
<p>The <strong>Rational Root Theorem</strong> narrows the search for rational zeros of a polynomial with integer coefficients:</p>
<div class="math-display">If p/q is a rational zero of f(x) = a_n x^n + ... + a_0, then p divides a_0 and q divides a_n.</div>
<p>This gives you a finite list of <strong>candidates</strong> to test. Not all candidates will be actual zeros -- you must verify each one.</p>

<h3>Synthetic Division</h3>
<p>Synthetic division is a streamlined way to divide a polynomial by (x - c). It is faster than long division and simultaneously tells you the quotient and remainder.</p>

<div class="step-list">
  <ol>
    <li>Write c (the value being tested) on the left. Write the coefficients of the polynomial in order, using 0 for missing terms.</li>
    <li>Bring down the first coefficient.</li>
    <li>Multiply the value just written by c, and write the result under the next coefficient.</li>
    <li>Add the column and write the sum below the line.</li>
    <li>Repeat steps 3-4 until all coefficients are processed.</li>
    <li>The last number is the remainder. If the remainder is 0, then (x - c) is a factor and c is a zero.</li>
  </ol>
</div>

<h3>Multiplicity of Roots</h3>
<p>When a factor (x - r) appears k times in the factorization, we say the zero r has <strong>multiplicity k</strong>. Multiplicity affects the graph:</p>
<ul>
  <li><strong>Odd multiplicity</strong> (1, 3, 5, ...): The graph <strong>crosses</strong> the x-axis at that zero.</li>
  <li><strong>Even multiplicity</strong> (2, 4, 6, ...): The graph <strong>touches</strong> the x-axis and turns around (is tangent to the axis) at that zero.</li>
</ul>

<h3>The Fundamental Theorem of Algebra</h3>
<p>This profound theorem, proven by Gauss, states:</p>
<div class="math-display">Every polynomial of degree n &ge; 1 has exactly n zeros in the complex numbers (counting multiplicity).</div>
<p>Consequences: A cubic has exactly 3 zeros (some may be complex). A degree-5 polynomial has exactly 5 zeros. Complex zeros of polynomials with real coefficients always come in conjugate pairs: if 2 + 3i is a zero, then 2 - 3i is also a zero.</p>

<div class="example-box">
  <h4>Worked Example 1: End Behavior</h4>
  <p><strong>Problem:</strong> Describe the end behavior of f(x) = -2x^5 + 3x^3 - x + 7.</p>
  <p><strong>Solution:</strong> The leading term is -2x^5. Degree 5 is odd, and the leading coefficient is negative.</p>
  <p>As x &rarr; +&infin;, f(x) &rarr; -&infin; (negative coefficient pulls down on the right).</p>
  <p>As x &rarr; -&infin;, f(x) &rarr; +&infin; (odd degree flips the direction on the left).</p>
  <p>The graph rises to the left and falls to the right.</p>
</div>

<div class="example-box">
  <h4>Worked Example 2: Rational Root Theorem + Synthetic Division</h4>
  <p><strong>Problem:</strong> Factor f(x) = 2x^3 - 3x^2 - 11x + 6 completely.</p>
  <p><strong>Solution:</strong></p>
  <p>By the Rational Root Theorem, possible rational zeros are &plusmn;{1, 2, 3, 6, 1/2, 3/2}.</p>
  <p>Test x = 3 using synthetic division:</p>
  <div class="math-display">
    3 | 2  -3  -11   6<br>
    &nbsp; |     6    9  -6<br>
    &nbsp; | 2   3   -2   0
  </div>
  <p>Remainder is 0, so x = 3 is a zero and (x - 3) is a factor.</p>
  <p>The quotient is 2x^2 + 3x - 2. Factor this quadratic:</p>
  <p>2x^2 + 3x - 2 = (2x - 1)(x + 2)</p>
  <p>Complete factorization: f(x) = (x - 3)(2x - 1)(x + 2)</p>
  <p>Zeros: x = 3, x = 1/2, x = -2 (all multiplicity 1, all crossing the x-axis).</p>
</div>

<div class="example-box">
  <h4>Worked Example 3: Multiplicity and Graph Behavior</h4>
  <p><strong>Problem:</strong> Sketch the key features of g(x) = (x + 1)^2 (x - 2)^3.</p>
  <p><strong>Solution:</strong></p>
  <p>Zeros: x = -1 (multiplicity 2) and x = 2 (multiplicity 3).</p>
  <p>At x = -1: even multiplicity, so the graph <strong>touches</strong> the x-axis and bounces back.</p>
  <p>At x = 2: odd multiplicity, so the graph <strong>crosses</strong> the x-axis (with a flattening due to multiplicity 3).</p>
  <p>Degree: 2 + 3 = 5. Leading coefficient: 1 (positive). Odd degree, positive leading coefficient.</p>
  <p>End behavior: falls left, rises right.</p>
  <p>The graph enters from below on the left, crosses or touches the x-axis at -1 (bouncing), dips down, then crosses at 2 (with an inflection-like flattening), and rises to the right.</p>
</div>

<div class="warning-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li><strong>Missing terms in synthetic division:</strong> If the polynomial is x^3 + 5x - 2 (no x^2 term), you must use 0 as the coefficient for x^2: write 1, 0, 5, -2.</li>
    <li><strong>Rational Root Theorem gives candidates, not roots:</strong> You must test each candidate. Most will not be actual zeros.</li>
    <li><strong>Forgetting complex zeros:</strong> A cubic with only one real root still has three zeros total -- the other two are complex conjugates.</li>
  </ul>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>Problem 1:</strong> Describe the end behavior of f(x) = 4x^4 - x^3 + 2x - 5.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Leading term: 4x^4. Even degree, positive coefficient.</p>
    <p>As x &rarr; +&infin;, f(x) &rarr; +&infin;. As x &rarr; -&infin;, f(x) &rarr; +&infin;.</p>
    <p>Both ends rise (like a wide U-shape).</p>
  </details>

  <p><strong>Problem 2:</strong> List all possible rational zeros of f(x) = 3x^3 - x^2 + 2x - 8.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>p divides 8: &plusmn;1, &plusmn;2, &plusmn;4, &plusmn;8</p>
    <p>q divides 3: &plusmn;1, &plusmn;3</p>
    <p>Possible rational zeros: &plusmn;1, &plusmn;2, &plusmn;4, &plusmn;8, &plusmn;1/3, &plusmn;2/3, &plusmn;4/3, &plusmn;8/3</p>
  </details>

  <p><strong>Problem 3:</strong> Use synthetic division to determine whether x = -2 is a zero of f(x) = x^3 + 6x^2 + 11x + 6. If so, factor completely.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Synthetic division with c = -2:</p>
    <p>-2 | 1  6  11  6</p>
    <p>&nbsp;&nbsp; |   -2  -8  -6</p>
    <p>&nbsp;&nbsp; | 1  4   3   0</p>
    <p>Remainder = 0, so x = -2 is a zero. Quotient: x^2 + 4x + 3 = (x + 1)(x + 3).</p>
    <p>f(x) = (x + 2)(x + 1)(x + 3). Zeros: x = -2, -1, -3.</p>
  </details>

  <p><strong>Problem 4:</strong> A polynomial has zeros at x = 1 (multiplicity 2), x = -3 (multiplicity 1), and x = 4 (multiplicity 1). What is its minimum degree? Describe the graph behavior at each zero.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Minimum degree = 2 + 1 + 1 = 4.</p>
    <p>At x = 1 (mult. 2): graph touches the x-axis and bounces (tangent).</p>
    <p>At x = -3 (mult. 1): graph crosses the x-axis.</p>
    <p>At x = 4 (mult. 1): graph crosses the x-axis.</p>
  </details>

  <p><strong>Problem 5:</strong> f(x) = x^4 - 5x^2 + 4. Factor completely, find all zeros, and describe the graph's end behavior.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Let u = x^2: u^2 - 5u + 4 = (u - 1)(u - 4) = (x^2 - 1)(x^2 - 4) = (x-1)(x+1)(x-2)(x+2).</p>
    <p>Zeros: x = 1, -1, 2, -2 (all multiplicity 1, all crossing the x-axis).</p>
    <p>Degree 4, positive leading coefficient: both ends rise (f(x) &rarr; +&infin; as x &rarr; &plusmn;&infin;).</p>
    <p>The graph crosses the x-axis four times and has three turning points.</p>
  </details>
</div>

<h3>Summary</h3>
<p>Higher-degree polynomials extend the patterns you know from quadratics. End behavior is determined by the leading term: even-degree polynomials have matching ends, odd-degree have opposite ends. The Rational Root Theorem provides a finite list of possible rational zeros to test via synthetic division. The multiplicity of each zero determines whether the graph crosses or bounces at the x-axis. And the Fundamental Theorem of Algebra guarantees that a degree-n polynomial has exactly n zeros in the complex numbers, ensuring that the algebraic story is always complete.</p>
`,

'A06': `
<h2>Piecewise and Absolute Value Functions</h2>
<p>Not every real-world relationship follows a single smooth formula. Tax brackets, shipping costs, speed limits -- many quantities are defined by different rules on different intervals. <strong>Piecewise functions</strong> capture this reality by stitching together multiple formulas, each governing a specific domain. The absolute value function, one of the most important functions in mathematics, turns out to be a piecewise function in disguise.</p>

<h3>Piecewise Function Notation</h3>
<p>A piecewise function is defined using a brace that groups several formulas, each with a domain restriction:</p>

<div class="math-display">
f(x) = { 2x + 1, &nbsp; if x &lt; 0<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; x^2, &nbsp;&nbsp;&nbsp;&nbsp; if x &ge; 0
</div>

<p>To evaluate a piecewise function at a specific input, first determine <strong>which piece</strong> the input belongs to, then use that formula:</p>

<div class="step-list">
  <ol>
    <li>Identify the value of x you are evaluating.</li>
    <li>Check which domain condition x satisfies.</li>
    <li>Substitute x into the corresponding formula.</li>
    <li>Compute the result.</li>
  </ol>
</div>

<h3>Graphing Piecewise Functions</h3>
<p>Graph each piece on its specified interval. Pay close attention to the endpoints:</p>
<ul>
  <li>Use a <strong>filled circle</strong> (closed dot) at an endpoint if the inequality includes that value (&le; or &ge;).</li>
  <li>Use an <strong>open circle</strong> (hollow dot) if the inequality is strict (&lt; or &gt;).</li>
</ul>
<p>At a boundary between pieces, there may be a <em>jump</em> (the two pieces do not meet), a <em>corner</em> (they meet but at different slopes), or a <em>smooth connection</em> (they meet with the same slope).</p>

<h3>Continuity at Boundary Points</h3>
<p>A function is <strong>continuous at a boundary point</strong> x = c if the left-hand piece and the right-hand piece give the same output at x = c. Formally:</p>
<div class="math-display">The limit from the left = the limit from the right = the function value at c</div>
<p>If these are not all equal, the function has a <strong>discontinuity</strong> (a jump or hole) at that point.</p>

<h3>Absolute Value as a Piecewise Function</h3>
<p>The absolute value function |x| can be written as:</p>
<div class="math-display">
|x| = { x, &nbsp;&nbsp; if x &ge; 0<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -x, &nbsp; if x &lt; 0
</div>

<p>This means: if x is nonnegative, leave it alone; if x is negative, negate it (making it positive). The graph is a V-shape with vertex at the origin, symmetric about the y-axis.</p>

<h3>Transformations of Absolute Value Functions</h3>
<p>The general absolute value function is:</p>
<div class="math-display">f(x) = a|x - h| + k</div>
<ul>
  <li><strong>h</strong> shifts the vertex horizontally (right if h &gt; 0, left if h &lt; 0).</li>
  <li><strong>k</strong> shifts the vertex vertically (up if k &gt; 0, down if k &lt; 0).</li>
  <li><strong>a</strong> controls the opening: if |a| &gt; 1, the V is narrower (steeper); if |a| &lt; 1, the V is wider.</li>
  <li>If a &lt; 0, the V opens <strong>downward</strong> (inverted).</li>
</ul>
<p>The vertex of f(x) = a|x - h| + k is at the point (h, k).</p>

<h3>Solving Absolute Value Equations</h3>
<p>The equation |expression| = c (where c &ge; 0) splits into two cases:</p>
<div class="math-display">expression = c &nbsp;&nbsp; OR &nbsp;&nbsp; expression = -c</div>
<p>If c &lt; 0, the equation has <strong>no solution</strong> (absolute value is never negative).</p>

<h3>Solving Absolute Value Inequalities</h3>
<p>These require careful treatment:</p>
<ul>
  <li><strong>|expression| &lt; c</strong> (where c &gt; 0): means -c &lt; expression &lt; c. This is a <strong>conjunction</strong> (AND).</li>
  <li><strong>|expression| &gt; c</strong> (where c &gt; 0): means expression &gt; c OR expression &lt; -c. This is a <strong>disjunction</strong> (OR).</li>
</ul>

<div class="example-box">
  <h4>Worked Example 1: Evaluating a Piecewise Function</h4>
  <p><strong>Problem:</strong> Given f(x) = { 3x - 1 if x &lt; 2; x^2 + 1 if x &ge; 2 }, find f(-1), f(2), and f(5).</p>
  <p><strong>Solution:</strong></p>
  <p>f(-1): Since -1 &lt; 2, use the first piece: f(-1) = 3(-1) - 1 = -4.</p>
  <p>f(2): Since 2 &ge; 2, use the second piece: f(2) = 2^2 + 1 = 5.</p>
  <p>f(5): Since 5 &ge; 2, use the second piece: f(5) = 5^2 + 1 = 26.</p>
  <p><strong>Continuity check at x = 2:</strong> Left piece gives 3(2) - 1 = 5. Right piece gives 2^2 + 1 = 5. Both give 5, so f is continuous at x = 2.</p>
</div>

<div class="example-box">
  <h4>Worked Example 2: Solving an Absolute Value Equation</h4>
  <p><strong>Problem:</strong> Solve |2x - 5| = 9.</p>
  <p><strong>Solution:</strong> Split into two cases:</p>
  <p><strong>Case 1:</strong> 2x - 5 = 9 &rarr; 2x = 14 &rarr; x = 7</p>
  <p><strong>Case 2:</strong> 2x - 5 = -9 &rarr; 2x = -4 &rarr; x = -2</p>
  <p>Check: |2(7) - 5| = |9| = 9. |2(-2) - 5| = |-9| = 9. Both check out.</p>
  <p>Solutions: x = 7 and x = -2.</p>
</div>

<div class="example-box">
  <h4>Worked Example 3: Absolute Value Inequality</h4>
  <p><strong>Problem:</strong> Solve |3x + 1| &le; 8.</p>
  <p><strong>Solution:</strong> Since this is a "less than or equal to" inequality:</p>
  <div class="math-display">-8 &le; 3x + 1 &le; 8</div>
  <p>Subtract 1 from all parts: -9 &le; 3x &le; 7</p>
  <p>Divide by 3: -3 &le; x &le; 7/3</p>
  <p>Solution: x is in the interval [-3, 7/3].</p>
</div>

<div class="warning-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li><strong>Using the wrong piece:</strong> Always check which condition x satisfies <em>before</em> substituting. At boundary points, use the piece whose domain includes that boundary (check &le; vs. &lt;).</li>
    <li><strong>Forgetting that |expression| = negative has no solution:</strong> If you get |x - 3| = -2, stop. There is no solution.</li>
    <li><strong>Flipping the inequality incorrectly:</strong> For |expression| &gt; c, the solution is a disjunction (OR), not a single compound inequality. Do not write -c &gt; expression &gt; c -- that is nonsensical.</li>
    <li><strong>Continuity confusion:</strong> A piecewise function can be defined at a boundary point yet still be discontinuous if the left and right limits disagree.</li>
  </ul>
</div>

<div class="tip-box">
  <h4>Real-World Piecewise Functions</h4>
  <p>Tax brackets are a perfect example. If you earn $0-$10,000, you pay 10%. If you earn $10,001-$40,000, you pay 12% on the amount over $10,000 (plus the fixed tax on the first bracket). Each bracket is a different "piece" of the tax function. Shipping costs, phone plans, and overtime pay all work similarly.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>Problem 1:</strong> Given g(x) = { -2x + 3 if x &le; 1; x^2 - 2 if x &gt; 1 }, find g(-2), g(1), and g(3). Is g continuous at x = 1?</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>g(-2): -2 &le; 1, so g(-2) = -2(-2) + 3 = 7.</p>
    <p>g(1): 1 &le; 1, so g(1) = -2(1) + 3 = 1.</p>
    <p>g(3): 3 &gt; 1, so g(3) = 3^2 - 2 = 7.</p>
    <p>Continuity at x = 1: Left piece gives -2(1) + 3 = 1. Right piece as x approaches 1 from the right gives 1^2 - 2 = -1. Since 1 &ne; -1, g is <strong>not continuous</strong> at x = 1 (there is a jump).</p>
  </details>

  <p><strong>Problem 2:</strong> Solve |4x - 3| = 11.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Case 1: 4x - 3 = 11 &rarr; 4x = 14 &rarr; x = 7/2</p>
    <p>Case 2: 4x - 3 = -11 &rarr; 4x = -8 &rarr; x = -2</p>
    <p>Solutions: x = 7/2 and x = -2.</p>
  </details>

  <p><strong>Problem 3:</strong> Solve |2x + 5| &gt; 3.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>This is a "greater than" inequality, so it splits into a disjunction:</p>
    <p>2x + 5 &gt; 3 &rarr; 2x &gt; -2 &rarr; x &gt; -1</p>
    <p>OR</p>
    <p>2x + 5 &lt; -3 &rarr; 2x &lt; -8 &rarr; x &lt; -4</p>
    <p>Solution: x &lt; -4 or x &gt; -1, which is (-&infin;, -4) &cup; (-1, &infin;).</p>
  </details>

  <p><strong>Problem 4:</strong> Describe the transformations and vertex of f(x) = -3|x + 2| + 5.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Rewrite in standard form: f(x) = -3|x - (-2)| + 5.</p>
    <p>h = -2 (shift left 2), k = 5 (shift up 5). Vertex: (-2, 5).</p>
    <p>a = -3: The V opens downward (a is negative) and is steeper than the basic |x| (stretched by factor 3).</p>
    <p>The maximum value of f is 5, occurring at x = -2.</p>
  </details>

  <p><strong>Problem 5:</strong> Write a piecewise function for the following: a parking garage charges $5 for the first hour, $3 for each additional hour up to 5 hours total, and $20 flat for anything beyond 5 hours. Let C(t) represent cost as a function of time t (in hours, t &gt; 0).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>C(t) = { 5 if 0 &lt; t &le; 1; 5 + 3(t - 1) if 1 &lt; t &le; 5; 20 if t &gt; 5 }</p>
    <p>Simplifying the middle piece: C(t) = 3t + 2 for 1 &lt; t &le; 5.</p>
    <p>Check continuity: At t = 1: both give $5. At t = 5: middle piece gives 3(5) + 2 = 17, third piece gives 20. There is a jump at t = 5 -- the price jumps from $17 to $20. (This is realistic: the garage would likely charge $20 as soon as you exceed 5 hours.)</p>
  </details>
</div>

<h3>Summary</h3>
<p>Piecewise functions define different rules on different intervals, modeling real-world situations where behavior changes at boundary points. The absolute value function is a fundamental piecewise function, expressed as |x| = x when x &ge; 0 and -x when x &lt; 0. Transformations of absolute value follow the same shift-stretch-reflect rules as other function families. Absolute value equations split into two cases, while inequalities split into conjunctions (less than) or disjunctions (greater than). Checking continuity at boundary points is essential: the pieces must agree at shared endpoints for the function to be continuous.</p>
`,

'A07': `
<h2>Introduction to Limits</h2>
<p>The concept of a <strong>limit</strong> is the gateway to calculus and one of the most profound ideas in all of mathematics. Limits formalize the intuition of "approaching" a value. They answer the question: What value does a function <em>get closer and closer to</em> as the input gets closer and closer to some target? Remarkably, the function does not need to actually reach or even be defined at that target -- what matters is the <em>trend</em>.</p>

<h3>The Informal Definition of a Limit</h3>
<p>We write:</p>
<div class="math-display">lim (x &rarr; c) f(x) = L</div>
<p>and read this as "the limit of f(x) as x approaches c equals L." This means: as x gets arbitrarily close to c (from both sides), f(x) gets arbitrarily close to L.</p>

<p>Critical insight: <strong>the limit depends on what happens near c, not at c.</strong> The function f(c) might not exist, or it might exist but differ from L. The limit only cares about the trend as x approaches c.</p>

<h3>Evaluating Limits from Tables</h3>
<p>To estimate a limit numerically, compute f(x) for values of x approaching c from both sides:</p>

<div class="vocab-table">
  <table>
    <tr><th>x</th><th>1.9</th><th>1.99</th><th>1.999</th><th>&rarr; 2 &larr;</th><th>2.001</th><th>2.01</th><th>2.1</th></tr>
    <tr><td>f(x)</td><td>3.61</td><td>3.9601</td><td>3.996</td><td>?</td><td>4.004</td><td>4.0401</td><td>4.41</td></tr>
  </table>
</div>

<p>If f(x) = x^2, the table shows f(x) approaching 4 as x approaches 2 from both sides. We conclude lim (x &rarr; 2) x^2 = 4.</p>

<h3>Evaluating Limits from Graphs</h3>
<p>On a graph, the limit as x &rarr; c is the y-value that the curve approaches as you trace along it toward x = c. Look at the curve's behavior <em>near</em> c, not the dot (or hole) at c itself. A filled dot at a different height than the curve indicates f(c) differs from the limit.</p>

<h3>One-Sided Limits</h3>
<p>Sometimes the function approaches different values from the left and right:</p>
<div class="math-display">lim (x &rarr; c&minus;) f(x) = L &nbsp;&nbsp; (left-hand limit: x approaches c from below)</div>
<div class="math-display">lim (x &rarr; c&plus;) f(x) = M &nbsp;&nbsp; (right-hand limit: x approaches c from above)</div>

<p><strong>The two-sided limit exists if and only if both one-sided limits exist and are equal:</strong></p>
<div class="math-display">lim (x &rarr; c) f(x) = L &nbsp; if and only if &nbsp; lim (x &rarr; c&minus;) f(x) = lim (x &rarr; c&plus;) f(x) = L</div>

<h3>Limits at Infinity</h3>
<p>We can also ask what happens as x grows without bound:</p>
<div class="math-display">lim (x &rarr; &infin;) f(x) = L</div>
<p>This means f(x) approaches L as x becomes very large. If such a limit L exists (and is finite), the line y = L is a <strong>horizontal asymptote</strong>.</p>

<p>For rational functions (ratios of polynomials), limits at infinity depend on the degrees of the numerator and denominator:</p>
<ul>
  <li>If degree of numerator &lt; degree of denominator: limit is 0.</li>
  <li>If degree of numerator = degree of denominator: limit is the ratio of leading coefficients.</li>
  <li>If degree of numerator &gt; degree of denominator: no finite limit (goes to &plusmn;&infin;).</li>
</ul>

<h3>When Limits Do Not Exist</h3>
<p>A limit fails to exist in three main situations:</p>
<ol>
  <li><strong>Left and right limits are different:</strong> lim (x &rarr; c&minus;) f(x) &ne; lim (x &rarr; c&plus;) f(x). Example: a step function with a jump at c.</li>
  <li><strong>Unbounded behavior:</strong> f(x) &rarr; &plusmn;&infin; as x &rarr; c. This indicates a vertical asymptote, not a finite limit.</li>
  <li><strong>Oscillation:</strong> f(x) oscillates infinitely often near c without settling. Example: sin(1/x) as x &rarr; 0.</li>
</ol>

<div class="example-box">
  <h4>Worked Example 1: Limit via Algebraic Simplification</h4>
  <p><strong>Problem:</strong> Find lim (x &rarr; 3) (x^2 - 9)/(x - 3).</p>
  <p><strong>Solution:</strong> Direct substitution gives 0/0, which is indeterminate. Factor the numerator:</p>
  <div class="math-display">(x^2 - 9)/(x - 3) = (x - 3)(x + 3)/(x - 3) = x + 3 &nbsp; (for x &ne; 3)</div>
  <p>Now the limit is straightforward:</p>
  <div class="math-display">lim (x &rarr; 3) (x + 3) = 6</div>
  <p>The function is not defined at x = 3 (there is a hole), but the limit exists and equals 6.</p>
</div>

<div class="example-box">
  <h4>Worked Example 2: One-Sided Limits</h4>
  <p><strong>Problem:</strong> For the function f(x) = { x + 1 if x &lt; 2; 5 if x = 2; 2x - 1 if x &gt; 2 }, find the one-sided limits and determine if the two-sided limit exists at x = 2.</p>
  <p><strong>Solution:</strong></p>
  <p>Left-hand limit: lim (x &rarr; 2&minus;) (x + 1) = 3</p>
  <p>Right-hand limit: lim (x &rarr; 2&plus;) (2x - 1) = 3</p>
  <p>Both one-sided limits equal 3, so lim (x &rarr; 2) f(x) = 3.</p>
  <p>Note: f(2) = 5 &ne; 3. The limit exists but does not equal the function value. The function is discontinuous at x = 2.</p>
</div>

<div class="example-box">
  <h4>Worked Example 3: Limit at Infinity</h4>
  <p><strong>Problem:</strong> Find lim (x &rarr; &infin;) (3x^2 + 5x)/(2x^2 - 1).</p>
  <p><strong>Solution:</strong> The degrees of numerator and denominator are both 2 (equal). The limit is the ratio of leading coefficients:</p>
  <div class="math-display">lim (x &rarr; &infin;) (3x^2 + 5x)/(2x^2 - 1) = 3/2</div>
  <p>To see why, divide every term by x^2 (the highest power):</p>
  <div class="math-display">(3 + 5/x)/(2 - 1/x^2) &rarr; (3 + 0)/(2 - 0) = 3/2 as x &rarr; &infin;</div>
  <p>The horizontal asymptote is y = 3/2.</p>
</div>

<div class="warning-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li><strong>Confusing f(c) with the limit:</strong> The limit as x &rarr; c does not care about f(c). A function can have a hole at x = c yet have a perfectly well-defined limit there.</li>
    <li><strong>Treating 0/0 as zero or undefined:</strong> The expression 0/0 is <em>indeterminate</em>, meaning the limit could be any value. You must simplify (factor, rationalize, etc.) to find the actual limit.</li>
    <li><strong>Forgetting to check both sides:</strong> Even if the left-hand limit exists, the two-sided limit does not exist unless the right-hand limit matches.</li>
  </ul>
</div>

<div class="tip-box">
  <h4>Why Limits Matter</h4>
  <p>Limits are not just a theoretical curiosity. The entire edifice of calculus rests on two limits: the <strong>derivative</strong> (a limit of difference quotients, measuring instantaneous rate of change) and the <strong>integral</strong> (a limit of Riemann sums, measuring accumulated area). Understanding limits now will prepare you for the most powerful mathematical tools ever developed.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>Problem 1:</strong> Find lim (x &rarr; 5) (x^2 - 25)/(x - 5).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Factor: (x^2 - 25)/(x - 5) = (x - 5)(x + 5)/(x - 5) = x + 5 for x &ne; 5.</p>
    <p>lim (x &rarr; 5) (x + 5) = 10.</p>
  </details>

  <p><strong>Problem 2:</strong> Find lim (x &rarr; &infin;) (5x + 3)/(2x^2 + 1).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Degree of numerator (1) &lt; degree of denominator (2), so the limit is 0.</p>
    <p>Alternatively, divide by x^2: (5/x + 3/x^2)/(2 + 1/x^2) &rarr; (0 + 0)/(2 + 0) = 0.</p>
  </details>

  <p><strong>Problem 3:</strong> For f(x) = { 2x if x &lt; 1; 4 - x if x &ge; 1 }, find lim (x &rarr; 1) f(x) and determine if f is continuous at x = 1.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Left-hand limit: lim (x &rarr; 1&minus;) 2x = 2.</p>
    <p>Right-hand limit: lim (x &rarr; 1&plus;) (4 - x) = 3.</p>
    <p>Since 2 &ne; 3, the two-sided limit does not exist. Therefore f is not continuous at x = 1.</p>
  </details>

  <p><strong>Problem 4:</strong> Does lim (x &rarr; 0) 1/x^2 exist? Explain.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>As x &rarr; 0 from either side, 1/x^2 grows without bound (goes to +&infin;).</p>
    <p>Since the function does not approach a finite value, the limit <strong>does not exist</strong>. We can write lim (x &rarr; 0) 1/x^2 = +&infin; (informally), but this means the limit fails to exist in the finite sense. There is a vertical asymptote at x = 0.</p>
  </details>

  <p><strong>Problem 5:</strong> Find lim (x &rarr; -2) (x^2 + 5x + 6)/(x + 2).</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Factor: x^2 + 5x + 6 = (x + 2)(x + 3).</p>
    <p>(x + 2)(x + 3)/(x + 2) = x + 3 for x &ne; -2.</p>
    <p>lim (x &rarr; -2) (x + 3) = 1.</p>
  </details>
</div>

<h3>Summary</h3>
<p>A limit describes the value a function approaches as the input approaches a target, regardless of the function's actual value (or existence) at that target. One-sided limits examine the approach from a single direction, and the two-sided limit exists only when both one-sided limits agree. Limits at infinity reveal horizontal asymptotes. Limits fail to exist when one-sided limits disagree, when the function grows unboundedly, or when it oscillates without settling. Mastering limits opens the door to calculus and the precise study of change and accumulation.</p>
`,

'A08': `
<h2>Parametric Equations and Polar Coordinates Introduction</h2>
<p>Until now, you have described curves as y = f(x), where y is explicitly a function of x. But many curves cannot be expressed this way -- a full circle, for instance, fails the vertical line test. <strong>Parametric equations</strong> and <strong>polar coordinates</strong> offer two powerful alternatives. Parametric equations describe motion by letting both x and y depend on a third variable (time). Polar coordinates describe position by distance and direction rather than horizontal and vertical displacement. Together, they vastly expand what you can describe and analyze.</p>

<h3>Parametric Equations</h3>
<p>A parametric curve is defined by a pair of equations:</p>
<div class="math-display">x = f(t), &nbsp; y = g(t)</div>
<p>where t is the <strong>parameter</strong> (often representing time). As t varies, the point (x, y) traces out a curve in the plane. The parameter gives you something Cartesian equations do not: a sense of <em>direction and speed</em> along the curve.</p>

<h3>Common Parametric Curves</h3>

<div class="vocab-table">
  <table>
    <tr><th>Curve</th><th>Parametric Equations</th><th>Parameter Range</th></tr>
    <tr><td>Line through (x_0, y_0) with direction (a, b)</td><td>x = x_0 + at, &nbsp; y = y_0 + bt</td><td>all real t</td></tr>
    <tr><td>Circle centered at origin, radius r</td><td>x = r cos(t), &nbsp; y = r sin(t)</td><td>0 &le; t &lt; 2&pi;</td></tr>
    <tr><td>Ellipse with semi-axes a, b</td><td>x = a cos(t), &nbsp; y = b sin(t)</td><td>0 &le; t &lt; 2&pi;</td></tr>
    <tr><td>Projectile (initial velocity v_0, angle &alpha;)</td><td>x = v_0 cos(&alpha;) t, &nbsp; y = v_0 sin(&alpha;) t - (1/2)g t^2</td><td>t &ge; 0</td></tr>
  </table>
</div>

<h3>Eliminating the Parameter</h3>
<p>To convert parametric equations to a single Cartesian equation, solve one parametric equation for t and substitute into the other.</p>

<div class="step-list">
  <ol>
    <li>Choose the simpler parametric equation and solve for t in terms of x or y.</li>
    <li>Substitute this expression for t into the other equation.</li>
    <li>Simplify to get y in terms of x (or a relation between x and y).</li>
  </ol>
</div>

<p>For trigonometric parametrizations, use the Pythagorean identity sin^2(t) + cos^2(t) = 1 instead.</p>

<h3>Polar Coordinates</h3>
<p>Polar coordinates describe a point by its <strong>distance from the origin</strong> (r) and <strong>angle from the positive x-axis</strong> (&theta;):</p>
<div class="math-display">Point: (r, &theta;)</div>
<p>Unlike Cartesian coordinates, the same point can have multiple polar representations (by adding 2&pi; to &theta;, or by using negative r with a shifted angle).</p>

<h3>Converting Between Polar and Cartesian</h3>

<div class="columns-2">
  <div>
    <strong>Polar to Cartesian:</strong>
    <div class="math-display">x = r cos(&theta;)</div>
    <div class="math-display">y = r sin(&theta;)</div>
  </div>
  <div>
    <strong>Cartesian to Polar:</strong>
    <div class="math-display">r = &radic;(x^2 + y^2)</div>
    <div class="math-display">&theta; = arctan(y/x)</div>
    <p>(Adjust &theta; for the correct quadrant.)</p>
  </div>
</div>

<h3>Basic Polar Curves</h3>
<p>Some standard polar curves and their equations:</p>
<ul>
  <li><strong>Circle centered at origin:</strong> r = a (constant). All points at distance a from the origin.</li>
  <li><strong>Line through origin:</strong> &theta; = c (constant). All points at angle c, any distance.</li>
  <li><strong>Circle through origin:</strong> r = 2a cos(&theta;) (circle of radius a, centered at (a, 0)).</li>
  <li><strong>Cardioid:</strong> r = a(1 + cos(&theta;)) or r = a(1 + sin(&theta;)). A heart-shaped curve.</li>
  <li><strong>Rose curves:</strong> r = a cos(n&theta;). If n is odd, there are n petals; if n is even, there are 2n petals.</li>
</ul>

<div class="example-box">
  <h4>Worked Example 1: Eliminating the Parameter (Linear)</h4>
  <p><strong>Problem:</strong> Eliminate the parameter from x = 2t + 1, y = 3t - 4.</p>
  <p><strong>Solution:</strong> Solve the first equation for t:</p>
  <div class="math-display">x = 2t + 1 &rarr; t = (x - 1)/2</div>
  <p>Substitute into the second equation:</p>
  <div class="math-display">y = 3 &middot; (x - 1)/2 - 4 = (3x - 3)/2 - 4 = (3x - 3 - 8)/2 = (3x - 11)/2</div>
  <p>Cartesian equation: y = (3/2)x - 11/2. This is a line with slope 3/2.</p>
</div>

<div class="example-box">
  <h4>Worked Example 2: Eliminating the Parameter (Circle)</h4>
  <p><strong>Problem:</strong> Eliminate the parameter from x = 5 cos(t), y = 5 sin(t).</p>
  <p><strong>Solution:</strong> From the equations: cos(t) = x/5 and sin(t) = y/5.</p>
  <p>Use the Pythagorean identity:</p>
  <div class="math-display">cos^2(t) + sin^2(t) = 1</div>
  <div class="math-display">(x/5)^2 + (y/5)^2 = 1</div>
  <div class="math-display">x^2 + y^2 = 25</div>
  <p>This is a circle of radius 5 centered at the origin.</p>
</div>

<div class="example-box">
  <h4>Worked Example 3: Polar-Cartesian Conversion</h4>
  <p><strong>Problem:</strong> (a) Convert the polar point (4, &pi;/3) to Cartesian. (b) Convert the Cartesian point (-3, 3) to polar.</p>
  <p><strong>Solution (a):</strong></p>
  <div class="math-display">x = 4 cos(&pi;/3) = 4 &middot; (1/2) = 2</div>
  <div class="math-display">y = 4 sin(&pi;/3) = 4 &middot; (&radic;3/2) = 2&radic;3</div>
  <p>Cartesian point: (2, 2&radic;3).</p>

  <p><strong>Solution (b):</strong></p>
  <div class="math-display">r = &radic;((-3)^2 + 3^2) = &radic;(9 + 9) = &radic;18 = 3&radic;2</div>
  <div class="math-display">&theta; = arctan(3/(-3)) = arctan(-1)</div>
  <p>Since the point is in Quadrant II (x &lt; 0, y &gt; 0), &theta; = &pi; - &pi;/4 = 3&pi;/4.</p>
  <p>Polar point: (3&radic;2, 3&pi;/4).</p>
</div>

<div class="warning-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li><strong>Wrong quadrant for &theta;:</strong> The arctan function only gives values in (-&pi;/2, &pi;/2). If the point is in Quadrant II or III, you must add &pi; to the arctan result. Always check which quadrant (x, y) is in.</li>
    <li><strong>Losing direction when eliminating the parameter:</strong> The Cartesian equation x^2 + y^2 = 25 does not tell you that the circle is traced counterclockwise starting at (5, 0). Parametric form carries directional information that Cartesian form loses.</li>
    <li><strong>Restricting r to positive values:</strong> In polar coordinates, r can be negative. The point (-r, &theta;) is the same as (r, &theta; + &pi;) -- it reflects through the origin.</li>
  </ul>
</div>

<div class="tip-box">
  <h4>Why Parametric and Polar?</h4>
  <p>Parametric equations are indispensable in physics and computer graphics. Every animation, every simulated trajectory, every robot path is described parametrically. Polar coordinates simplify problems with circular or rotational symmetry -- radar systems, orbital mechanics, and antenna radiation patterns all use polar coordinates naturally. Mastering both systems gives you the flexibility to choose the best tool for each problem.</p>
</div>

<div class="practice-problems">
  <h3>Practice Problems</h3>

  <p><strong>Problem 1:</strong> Eliminate the parameter from x = t^2, y = 2t + 1. What type of curve is this?</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>From y = 2t + 1: t = (y - 1)/2.</p>
    <p>Substitute: x = ((y - 1)/2)^2 = (y - 1)^2/4.</p>
    <p>Rewrite: 4x = (y - 1)^2, or equivalently x = (1/4)(y - 1)^2.</p>
    <p>This is a <strong>parabola</strong> opening to the right with vertex at (0, 1).</p>
  </details>

  <p><strong>Problem 2:</strong> Convert the polar point (6, 5&pi;/6) to Cartesian coordinates.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>x = 6 cos(5&pi;/6) = 6 &middot; (-&radic;3/2) = -3&radic;3</p>
    <p>y = 6 sin(5&pi;/6) = 6 &middot; (1/2) = 3</p>
    <p>Cartesian point: (-3&radic;3, 3).</p>
  </details>

  <p><strong>Problem 3:</strong> Convert the Cartesian equation x^2 + y^2 = 16 to polar form.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>Since x^2 + y^2 = r^2 in polar coordinates:</p>
    <p>r^2 = 16, so r = 4.</p>
    <p>The polar equation is simply r = 4 (a circle of radius 4 centered at the origin).</p>
  </details>

  <p><strong>Problem 4:</strong> A projectile is launched at 30 m/s at an angle of 60 degrees above horizontal (g = 10 m/s^2). Write parametric equations for its position. How long is it in the air, and how far does it travel horizontally?</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>x = 30 cos(60&deg;) t = 30(1/2)t = 15t</p>
    <p>y = 30 sin(60&deg;) t - (1/2)(10)t^2 = 15&radic;3 t - 5t^2</p>
    <p>The projectile lands when y = 0: 15&radic;3 t - 5t^2 = 0 &rarr; t(15&radic;3 - 5t) = 0.</p>
    <p>t = 0 (launch) or t = 3&radic;3 seconds (landing).</p>
    <p>Horizontal distance: x = 15 &middot; 3&radic;3 = 45&radic;3 &approx; 77.9 meters.</p>
  </details>

  <p><strong>Problem 5:</strong> Describe the polar curve r = 3(1 + cos(&theta;)). Identify the type of curve and find the value of r at &theta; = 0, &pi;/2, &pi;, and 3&pi;/2.</p>
  <details class="solution">
    <summary>Show Solution</summary>
    <p>This is a <strong>cardioid</strong> (heart-shaped curve) with a = 3.</p>
    <p>&theta; = 0: r = 3(1 + cos(0)) = 3(1 + 1) = 6 (farthest from origin)</p>
    <p>&theta; = &pi;/2: r = 3(1 + cos(&pi;/2)) = 3(1 + 0) = 3</p>
    <p>&theta; = &pi;: r = 3(1 + cos(&pi;)) = 3(1 + (-1)) = 0 (curve passes through origin)</p>
    <p>&theta; = 3&pi;/2: r = 3(1 + cos(3&pi;/2)) = 3(1 + 0) = 3</p>
    <p>The cardioid is symmetric about the x-axis (the polar axis), extends from r = 0 to r = 6, and has its cusp at the origin when &theta; = &pi;.</p>
  </details>
</div>

<h3>Summary</h3>
<p>Parametric equations define curves by expressing x and y each as functions of a parameter t, capturing not just shape but direction and timing. Eliminating the parameter recovers a Cartesian equation but loses directional information. Polar coordinates (r, &theta;) describe points by distance and angle, offering an elegant framework for curves with rotational symmetry. Converting between polar and Cartesian uses x = r cos(&theta;), y = r sin(&theta;), r = &radic;(x^2 + y^2), and &theta; = arctan(y/x) (with quadrant adjustment). These coordinate systems complement Cartesian coordinates and are essential tools in physics, engineering, and advanced mathematics.</p>
`

};
