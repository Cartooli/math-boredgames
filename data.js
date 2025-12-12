// Math concepts data parsed from K12_Math_Concepts_Structure.csv
const mathConcepts = [
    {
        concept: "Counting and Cardinality",
        keyFormulas: "",
        keyConcepts: "Counting objects, comparing quantities",
        relatedOperations: "Counting",
        relatedTopics: "Number recognition",
        gradeLevel: "K"
    },
    {
        concept: "Number Recognition",
        keyFormulas: "",
        keyConcepts: "Identifying numerals 0–20",
        relatedOperations: "Counting objects",
        relatedTopics: "Number sense",
        gradeLevel: "K"
    },
    {
        concept: "Addition",
        keyFormulas: "+",
        keyConcepts: "Combining two groups to make a whole",
        relatedOperations: "Counting on",
        relatedTopics: "Subtraction",
        gradeLevel: "K"
    },
    {
        concept: "Subtraction",
        keyFormulas: "-",
        keyConcepts: "Taking away from a whole",
        relatedOperations: "Counting back",
        relatedTopics: "Addition",
        gradeLevel: "K"
    },
    {
        concept: "Basic Shapes",
        keyFormulas: "",
        keyConcepts: "Identifying circles, squares, triangles, rectangles",
        relatedOperations: "Counting sides",
        relatedTopics: "Geometry",
        gradeLevel: "K"
    },
    {
        concept: "Measurement Comparison",
        keyFormulas: "",
        keyConcepts: "Longer/shorter, heavier/lighter concepts",
        relatedOperations: "Comparing",
        relatedTopics: "Measurement",
        gradeLevel: "K"
    },
    {
        concept: "Patterns",
        keyFormulas: "",
        keyConcepts: "Recognizing and extending patterns",
        relatedOperations: "Sequencing",
        relatedTopics: "Number sense",
        gradeLevel: "K"
    },
    {
        concept: "Ordinal Numbers",
        keyFormulas: "",
        keyConcepts: "First, second, third positions",
        relatedOperations: "Counting",
        relatedTopics: "Number recognition",
        gradeLevel: "K"
    },
    {
        concept: "Simple Data Collection",
        keyFormulas: "",
        keyConcepts: "Sorting and categorizing objects",
        relatedOperations: "Comparing",
        relatedTopics: "Data organization",
        gradeLevel: "K"
    },
    {
        concept: "Place Value",
        keyFormulas: "Decomposition by 10s",
        keyConcepts: "Understanding base-ten system",
        relatedOperations: "Addition",
        relatedTopics: "Subtraction",
        gradeLevel: "1"
    },
    {
        concept: "Two-Digit Addition",
        keyFormulas: "+",
        keyConcepts: "Adding numbers up to 100",
        relatedOperations: "Place value",
        relatedTopics: "Regrouping",
        gradeLevel: "1"
    },
    {
        concept: "Two-Digit Subtraction",
        keyFormulas: "-",
        keyConcepts: "Subtracting numbers up to 100",
        relatedOperations: "Place value",
        relatedTopics: "Regrouping",
        gradeLevel: "1"
    },
    {
        concept: "Comparing Numbers",
        keyFormulas: ">, <, =",
        keyConcepts: "Greater than, less than, equal to",
        relatedOperations: "Place value",
        relatedTopics: "Number sense",
        gradeLevel: "1"
    },
    {
        concept: "Telling Time",
        keyFormulas: "",
        keyConcepts: "Reading clocks to hour and half-hour",
        relatedOperations: "Counting",
        relatedTopics: "Measurement",
        gradeLevel: "1"
    },
    {
        concept: "Measurement (Length)",
        keyFormulas: "",
        keyConcepts: "Non-standard and standard units",
        relatedOperations: "Comparing",
        relatedTopics: "Measurement comparison",
        gradeLevel: "1"
    },
    {
        concept: "Basic Shapes and Attributes",
        keyFormulas: "",
        keyConcepts: "Defining and composing shapes",
        relatedOperations: "Counting sides",
        relatedTopics: "Basic shapes",
        gradeLevel: "1"
    },
    {
        concept: "Word Problems (Addition/Subtraction)",
        keyFormulas: "",
        keyConcepts: "Real-world applications",
        relatedOperations: "Addition",
        relatedTopics: "Subtraction",
        gradeLevel: "1"
    },
    {
        concept: "Data Organization",
        keyFormulas: "",
        keyConcepts: "Simple graphs and charts",
        relatedOperations: "Counting",
        relatedTopics: "Statistics",
        gradeLevel: "1"
    },
    {
        concept: "Number Bonds",
        keyFormulas: "",
        keyConcepts: "Part-part-whole relationships for numbers to 10",
        relatedOperations: "Addition",
        relatedTopics: "Subtraction",
        gradeLevel: "1"
    },
    {
        concept: "Fact Families",
        keyFormulas: "",
        keyConcepts: "Relating addition and subtraction",
        relatedOperations: "Addition",
        relatedTopics: "Subtraction",
        gradeLevel: "1"
    },
    {
        concept: "Even and Odd Numbers",
        keyFormulas: "",
        keyConcepts: "Classifying numbers",
        relatedOperations: "Division by 2",
        relatedTopics: "Patterns",
        gradeLevel: "2"
    },
    {
        concept: "Skip Counting",
        keyFormulas: "",
        keyConcepts: "Counting by multiples",
        relatedOperations: "Addition",
        relatedTopics: "Multiplication",
        gradeLevel: "2"
    },
    {
        concept: "Three-Digit Numbers",
        keyFormulas: "",
        keyConcepts: "Reading, writing, and comparing",
        relatedOperations: "Place value",
        relatedTopics: "Comparing numbers",
        gradeLevel: "2"
    },
    {
        concept: "Regrouping",
        keyFormulas: "",
        keyConcepts: "Carrying and borrowing",
        relatedOperations: "Addition",
        relatedTopics: "Subtraction",
        gradeLevel: "2"
    },
    {
        concept: "Money",
        keyFormulas: "$, ¢",
        keyConcepts: "Coins, dollars, and counting money",
        relatedOperations: "Addition",
        relatedTopics: "Decimals",
        gradeLevel: "2"
    },
    {
        concept: "Time to 5 Minutes",
        keyFormulas: "",
        keyConcepts: "Reading analog and digital clocks",
        relatedOperations: "Skip counting",
        relatedTopics: "Telling time",
        gradeLevel: "2"
    },
    {
        concept: "Bar Graphs and Picture Graphs",
        keyFormulas: "",
        keyConcepts: "Creating and interpreting data",
        relatedOperations: "Counting",
        relatedTopics: "Data organization",
        gradeLevel: "2"
    },
    {
        concept: "Measurement Units",
        keyFormulas: "in, ft, cm, m",
        keyConcepts: "Standard units of length",
        relatedOperations: "Measurement",
        relatedTopics: "Conversion",
        gradeLevel: "2"
    },
    {
        concept: "Arrays (Introduction)",
        keyFormulas: "",
        keyConcepts: "Equal groups in rows and columns",
        relatedOperations: "Addition",
        relatedTopics: "Multiplication",
        gradeLevel: "2"
    },
    {
        concept: "Estimating Quantities",
        keyFormulas: "",
        keyConcepts: "Reasonable estimates for small numbers",
        relatedOperations: "Rounding",
        relatedTopics: "Number sense",
        gradeLevel: "2"
    },
    {
        concept: "Multiplication",
        keyFormulas: "×",
        keyConcepts: "Repeated addition",
        relatedOperations: "Arrays",
        relatedTopics: "Division",
        gradeLevel: "3"
    },
    {
        concept: "Division",
        keyFormulas: "÷",
        keyConcepts: "Repeated subtraction",
        relatedOperations: "Multiplication",
        relatedTopics: "Factors and multiples",
        gradeLevel: "3"
    },
    {
        concept: "Fractions",
        keyFormulas: "a/b",
        keyConcepts: "Part-to-whole relationships",
        relatedOperations: "Division",
        relatedTopics: "Decimals",
        gradeLevel: "3"
    },
    {
        concept: "Area and Perimeter",
        keyFormulas: "P=2l+2w, A=lw",
        keyConcepts: "Measuring rectangles and squares",
        relatedOperations: "Multiplication",
        relatedTopics: "Measurement",
        gradeLevel: "3"
    },
    {
        concept: "Telling Time to the Minute",
        keyFormulas: "",
        keyConcepts: "Reading clocks and elapsed time",
        relatedOperations: "Addition",
        relatedTopics: "Time to 5 minutes",
        gradeLevel: "3"
    },
    {
        concept: "Measurement Conversions",
        keyFormulas: "",
        keyConcepts: "Converting within same system",
        relatedOperations: "Multiplication",
        relatedTopics: "Measurement units",
        gradeLevel: "3"
    },
    {
        concept: "Rounding",
        keyFormulas: "",
        keyConcepts: "To nearest 10 and 100",
        relatedOperations: "Place value",
        relatedTopics: "Estimation",
        gradeLevel: "3"
    },
    {
        concept: "Properties of Multiplication",
        keyFormulas: "Commutative, Associative, Distributive",
        keyConcepts: "Understanding multiplication properties",
        relatedOperations: "Multiplication",
        relatedTopics: "Addition",
        gradeLevel: "3"
    },
    {
        concept: "Factors and Multiples (Basic)",
        keyFormulas: "",
        keyConcepts: "Finding factors of numbers up to 100",
        relatedOperations: "Division",
        relatedTopics: "Multiplication",
        gradeLevel: "3"
    },
    {
        concept: "Data Interpretation",
        keyFormulas: "",
        keyConcepts: "Reading and creating scaled graphs",
        relatedOperations: "Multiplication",
        relatedTopics: "Bar graphs and picture graphs",
        gradeLevel: "3"
    },
    {
        concept: "Equivalent Fractions",
        keyFormulas: "a/b = c/d",
        keyConcepts: "Simplifying fractions",
        relatedOperations: "Multiplication",
        relatedTopics: "Ratio",
        gradeLevel: "4"
    },
    {
        concept: "Mixed Numbers",
        keyFormulas: "a b/c",
        keyConcepts: "Whole + fractional parts",
        relatedOperations: "Addition",
        relatedTopics: "Improper fractions",
        gradeLevel: "4"
    },
    {
        concept: "Decimals",
        keyFormulas: "Place value tenths, hundredths",
        keyConcepts: "Relationship to fractions",
        relatedOperations: "Addition",
        relatedTopics: "Money",
        gradeLevel: "4"
    },
    {
        concept: "Rounding and Estimation",
        keyFormulas: "≈",
        keyConcepts: "Approximation to nearest place",
        relatedOperations: "Addition",
        relatedTopics: "Subtraction",
        gradeLevel: "4"
    },
    {
        concept: "Angle Measurement",
        keyFormulas: "°",
        keyConcepts: "Measuring angles with protractor",
        relatedOperations: "Addition",
        relatedTopics: "Geometry",
        gradeLevel: "4"
    },
    {
        concept: "Line Plots",
        keyFormulas: "",
        keyConcepts: "Creating and interpreting data",
        relatedOperations: "Fractions",
        relatedTopics: "Statistics",
        gradeLevel: "4"
    },
    {
        concept: "Factors and Divisibility",
        keyFormulas: "",
        keyConcepts: "Divisibility rules and factor pairs",
        relatedOperations: "Division",
        relatedTopics: "Prime numbers",
        gradeLevel: "4"
    },
    {
        concept: "Multiples and Least Common Multiple",
        keyFormulas: "LCM",
        keyConcepts: "Finding least common multiple",
        relatedOperations: "Multiplication",
        relatedTopics: "Fractions",
        gradeLevel: "4"
    },
    {
        concept: "Greatest Common Factor",
        keyFormulas: "GCF",
        keyConcepts: "Finding greatest common factor",
        relatedOperations: "Division",
        relatedTopics: "Factors and divisibility",
        gradeLevel: "4"
    },
    {
        concept: "Two-Dimensional Figures",
        keyFormulas: "",
        keyConcepts: "Properties of quadrilaterals and triangles",
        relatedOperations: "Classification",
        relatedTopics: "Geometry",
        gradeLevel: "4"
    },
    {
        concept: "Prime Numbers",
        keyFormulas: "",
        keyConcepts: "Numbers divisible only by 1 and itself",
        relatedOperations: "Division",
        relatedTopics: "Composite numbers",
        gradeLevel: "5"
    },
    {
        concept: "Order of Operations",
        keyFormulas: "PEMDAS",
        keyConcepts: "Sequence of operations",
        relatedOperations: "Multiplication",
        relatedTopics: "Parentheses",
        gradeLevel: "5"
    },
    {
        concept: "Fraction Addition and Subtraction",
        keyFormulas: "a/b ± c/d",
        keyConcepts: "Adding and subtracting unlike denominators",
        relatedOperations: "Multiplication",
        relatedTopics: "Equivalent fractions",
        gradeLevel: "5"
    },
    {
        concept: "Fraction Multiplication and Division",
        keyFormulas: "(a/b) × (c/d), (a/b) ÷ (c/d)",
        keyConcepts: "Multiplying and dividing fractions",
        relatedOperations: "Multiplication",
        relatedTopics: "Fractions",
        gradeLevel: "5"
    },
    {
        concept: "Fraction Word Problems",
        keyFormulas: "Part = Fraction × Whole, Whole = Part ÷ Fraction",
        keyConcepts: "Solving real-world problems with fractions",
        relatedOperations: "All operations",
        relatedTopics: "Fractions, Word problems",
        gradeLevel: "5"
    },
    {
        concept: "Coordinate Graphing",
        keyFormulas: "(x,y)",
        keyConcepts: "Plotting in first quadrant",
        relatedOperations: "Ordered pairs",
        relatedTopics: "Coordinate plane",
        gradeLevel: "5"
    },
    {
        concept: "Volume of Rectangular Prisms",
        keyFormulas: "V = l × w × h",
        keyConcepts: "Three-dimensional measurement",
        relatedOperations: "Multiplication",
        relatedTopics: "Volume",
        gradeLevel: "5"
    },
    {
        concept: "Measurement Conversion",
        keyFormulas: "",
        keyConcepts: "Converting between different units",
        relatedOperations: "Multiplication",
        relatedTopics: "Measurement conversions",
        gradeLevel: "5"
    },
    {
        concept: "Decimal Operations",
        keyFormulas: "+, -, ×, ÷",
        keyConcepts: "Operations with decimals",
        relatedOperations: "Place value",
        relatedTopics: "Decimals",
        gradeLevel: "5"
    },
    {
        concept: "Exponents (Introduction)",
        keyFormulas: "10ⁿ",
        keyConcepts: "Powers of 10 and basic exponent notation",
        relatedOperations: "Multiplication",
        relatedTopics: "Place value",
        gradeLevel: "5"
    },
    {
        concept: "Expressions",
        keyFormulas: "",
        keyConcepts: "Writing and evaluating numerical expressions",
        relatedOperations: "Order of operations",
        relatedTopics: "Variables",
        gradeLevel: "5"
    },
    {
        concept: "Data and Graphs",
        keyFormulas: "",
        keyConcepts: "Histograms, line graphs, stem-and-leaf plots",
        relatedOperations: "Data interpretation",
        relatedTopics: "Statistics",
        gradeLevel: "5"
    },
    {
        concept: "Integers",
        keyFormulas: "",
        keyConcepts: "Positive and negative numbers",
        relatedOperations: "Addition",
        relatedTopics: "Absolute value",
        gradeLevel: "6"
    },
    {
        concept: "Ratios and Proportions",
        keyFormulas: "a:b = c:d",
        keyConcepts: "Comparing quantities",
        relatedOperations: "Division",
        relatedTopics: "Percentages",
        gradeLevel: "6"
    },
    {
        concept: "Percentages",
        keyFormulas: "% = part/whole × 100",
        keyConcepts: "Per hundred relationships",
        relatedOperations: "Division",
        relatedTopics: "Decimals",
        gradeLevel: "6"
    },
    {
        concept: "Coordinate Plane",
        keyFormulas: "(x,y)",
        keyConcepts: "Plotting points",
        relatedOperations: "Addition",
        relatedTopics: "Geometry",
        gradeLevel: "6"
    },
    {
        concept: "Absolute Value",
        keyFormulas: "|x|",
        keyConcepts: "Distance from zero",
        relatedOperations: "Integers",
        relatedTopics: "Number line",
        gradeLevel: "6"
    },
    {
        concept: "Statistical Questions",
        keyFormulas: "mean, median, mode, range",
        keyConcepts: "Analyzing data distributions",
        relatedOperations: "Addition",
        relatedTopics: "Statistics",
        gradeLevel: "6"
    },
    {
        concept: "Rate and Unit Rate",
        keyFormulas: "rate = distance/time",
        keyConcepts: "Speed, cost per unit, unit conversion",
        relatedOperations: "Division",
        relatedTopics: "Ratios and proportions",
        gradeLevel: "6"
    },
    {
        concept: "Expressions and Variables",
        keyFormulas: "",
        keyConcepts: "Writing and evaluating algebraic expressions",
        relatedOperations: "Substitution",
        relatedTopics: "Order of operations",
        gradeLevel: "6"
    },
    {
        concept: "One-Step Equations",
        keyFormulas: "x + a = b, ax = b",
        keyConcepts: "Solving simple equations",
        relatedOperations: "Inverse operations",
        relatedTopics: "Variables",
        gradeLevel: "6"
    },
    {
        concept: "Area of Triangles and Polygons",
        keyFormulas: "A = ½bh",
        keyConcepts: "Area of triangles and composite shapes",
        relatedOperations: "Multiplication",
        relatedTopics: "Area and perimeter",
        gradeLevel: "6"
    },
    {
        concept: "Surface Area",
        keyFormulas: "SA = 2lw + 2lh + 2wh",
        keyConcepts: "Nets and surface area of prisms",
        relatedOperations: "Addition",
        relatedTopics: "Volume",
        gradeLevel: "6"
    },
    {
        concept: "Expressions and Equations",
        keyFormulas: "y = mx + b",
        keyConcepts: "Using variables",
        relatedOperations: "Addition",
        relatedTopics: "Algebraic manipulation",
        gradeLevel: "7"
    },
    {
        concept: "Inequalities",
        keyFormulas: "x > y",
        keyConcepts: "Comparing values",
        relatedOperations: "Subtraction",
        relatedTopics: "Number lines",
        gradeLevel: "7"
    },
    {
        concept: "Area",
        keyFormulas: "A=lw, A=πr²",
        keyConcepts: "2D measurement",
        relatedOperations: "Multiplication",
        relatedTopics: "Perimeter",
        gradeLevel: "7"
    },
    {
        concept: "Angles and Triangles",
        keyFormulas: "Sum of angles = 180°",
        keyConcepts: "Triangle properties and angle relationships",
        relatedOperations: "Addition",
        relatedTopics: "Geometry",
        gradeLevel: "7"
    },
    {
        concept: "Circles",
        keyFormulas: "C=2πr, A=πr²",
        keyConcepts: "Circumference and area",
        relatedOperations: "Multiplication",
        relatedTopics: "Pi",
        gradeLevel: "7"
    },
    {
        concept: "Scale Drawings",
        keyFormulas: "scale factor",
        keyConcepts: "Proportional reasoning",
        relatedOperations: "Multiplication",
        relatedTopics: "Ratios and proportions",
        gradeLevel: "7"
    },
    {
        concept: "Probability Basics",
        keyFormulas: "P(A) = favorable/total",
        keyConcepts: "Simple probability concepts",
        relatedOperations: "Division",
        relatedTopics: "Fractions",
        gradeLevel: "7"
    },
    {
        concept: "Proportional Relationships",
        keyFormulas: "y = kx",
        keyConcepts: "Direct proportion and constant of proportionality",
        relatedOperations: "Multiplication",
        relatedTopics: "Ratios and proportions",
        gradeLevel: "7"
    },
    {
        concept: "Percent Applications",
        keyFormulas: "",
        keyConcepts: "Tax, tip, discount, markup",
        relatedOperations: "Multiplication",
        relatedTopics: "Percentages",
        gradeLevel: "7"
    },
    {
        concept: "Two-Step Equations",
        keyFormulas: "ax + b = c",
        keyConcepts: "Solving multi-step equations",
        relatedOperations: "Inverse operations",
        relatedTopics: "One-step equations",
        gradeLevel: "7"
    },
    {
        concept: "Volume",
        keyFormulas: "V=lwh",
        keyConcepts: "3D measurement",
        relatedOperations: "Multiplication",
        relatedTopics: "Surface area",
        gradeLevel: "8"
    },
    {
        concept: "Pythagorean Theorem",
        keyFormulas: "a²+b²=c²",
        keyConcepts: "Right triangle relationships",
        relatedOperations: "Square root",
        relatedTopics: "Distance formula",
        gradeLevel: "8"
    },
    {
        concept: "Slope",
        keyFormulas: "m=(y₂−y₁)/(x₂−x₁)",
        keyConcepts: "Rate of change",
        relatedOperations: "Division",
        relatedTopics: "Linear equations",
        gradeLevel: "8"
    },
    {
        concept: "Exponents",
        keyFormulas: "aⁿ",
        keyConcepts: "Repeated multiplication",
        relatedOperations: "Multiplication",
        relatedTopics: "Powers",
        gradeLevel: "8"
    },
    {
        concept: "Systems of Equations",
        keyFormulas: "y = mx + b",
        keyConcepts: "Solving linear systems",
        relatedOperations: "Substitution",
        relatedTopics: "Equations",
        gradeLevel: "8"
    },
    {
        concept: "Scientific Notation",
        keyFormulas: "a × 10ⁿ",
        keyConcepts: "Working with very large and small numbers",
        relatedOperations: "Multiplication",
        relatedTopics: "Exponents",
        gradeLevel: "8"
    },
    {
        concept: "Transformations",
        keyFormulas: "",
        keyConcepts: "Translations, rotations, reflections, dilations",
        relatedOperations: "Coordinate plane",
        relatedTopics: "Geometry",
        gradeLevel: "8"
    },
    {
        concept: "Functions (Introduction)",
        keyFormulas: "y = f(x)",
        keyConcepts: "Linear vs non-linear functions",
        relatedOperations: "Graphing",
        relatedTopics: "Slope",
        gradeLevel: "8"
    },
    {
        concept: "Scatter Plots",
        keyFormulas: "",
        keyConcepts: "Correlation and trend lines",
        relatedOperations: "Graphing",
        relatedTopics: "Statistics",
        gradeLevel: "8"
    },
    {
        concept: "Polynomials",
        keyFormulas: "ax²+bx+c",
        keyConcepts: "Combining like terms",
        relatedOperations: "Addition",
        relatedTopics: "Factoring",
        gradeLevel: "9"
    },
    {
        concept: "Quadratic Equations",
        keyFormulas: "ax²+bx+c=0",
        keyConcepts: "Parabolic relationships",
        relatedOperations: "Square roots",
        relatedTopics: "Vertex form",
        gradeLevel: "9"
    },
    {
        concept: "Functions",
        keyFormulas: "f(x)",
        keyConcepts: "Input-output mapping",
        relatedOperations: "Substitution",
        relatedTopics: "Domain/range",
        gradeLevel: "9"
    },
    {
        concept: "Factoring",
        keyFormulas: "x²+bx+c=(x+m)(x+n)",
        keyConcepts: "Breaking down expressions",
        relatedOperations: "Multiplication",
        relatedTopics: "Quadratics",
        gradeLevel: "9"
    },
    {
        concept: "Radical Expressions",
        keyFormulas: "√x, ∛x",
        keyConcepts: "Simplifying and operations with radicals",
        relatedOperations: "Multiplication",
        relatedTopics: "Exponents",
        gradeLevel: "9"
    },
    {
        concept: "Rational Expressions",
        keyFormulas: "a/b",
        keyConcepts: "Simplifying rational expressions",
        relatedOperations: "Division",
        relatedTopics: "Fractions",
        gradeLevel: "9"
    },
    {
        concept: "Linear Systems (Methods)",
        keyFormulas: "",
        keyConcepts: "Substitution, elimination, graphing methods",
        relatedOperations: "Systems of equations",
        relatedTopics: "Linear equations",
        gradeLevel: "9"
    },
    {
        concept: "Absolute Value Equations",
        keyFormulas: "|x| = a",
        keyConcepts: "Solving equations with absolute value",
        relatedOperations: "Absolute value",
        relatedTopics: "Equations",
        gradeLevel: "9"
    },
    {
        concept: "Square Root Functions",
        keyFormulas: "y = √x",
        keyConcepts: "Graphing and properties",
        relatedOperations: "Square roots",
        relatedTopics: "Functions",
        gradeLevel: "9"
    },
    {
        concept: "Exponential Growth and Decay",
        keyFormulas: "y = a(1±r)ᵗ",
        keyConcepts: "Real-world exponential problems",
        relatedOperations: "Exponents",
        relatedTopics: "Exponential functions",
        gradeLevel: "9"
    },
    {
        concept: "Trigonometry",
        keyFormulas: "sinθ, cosθ, tanθ",
        keyConcepts: "Ratios of sides in right triangles",
        relatedOperations: "Division",
        relatedTopics: "Unit circle",
        gradeLevel: "10"
    },
    {
        concept: "Probability",
        keyFormulas: "P(A)=favorable/total",
        keyConcepts: "Chance of events",
        relatedOperations: "Multiplication",
        relatedTopics: "Statistics",
        gradeLevel: "10"
    },
    {
        concept: "Statistics",
        keyFormulas: "mean, median, mode",
        keyConcepts: "Analyzing data sets",
        relatedOperations: "Addition",
        relatedTopics: "Probability",
        gradeLevel: "10"
    },
    {
        concept: "Circles (Advanced)",
        keyFormulas: "arc length, sector area",
        keyConcepts: "Arcs, sectors, circle theorems",
        relatedOperations: "Multiplication",
        relatedTopics: "Circles",
        gradeLevel: "10"
    },
    {
        concept: "Combinations and Permutations",
        keyFormulas: "nCr, nPr",
        keyConcepts: "Counting principles",
        relatedOperations: "Multiplication",
        relatedTopics: "Probability",
        gradeLevel: "10"
    },
    {
        concept: "Systems of Inequalities",
        keyFormulas: "y > mx + b",
        keyConcepts: "Graphing and solving",
        relatedOperations: "Inequalities",
        relatedTopics: "Linear equations",
        gradeLevel: "10"
    },
    {
        concept: "Normal Distribution",
        keyFormulas: "z-score",
        keyConcepts: "Bell curves and standard scores",
        relatedOperations: "Statistics",
        relatedTopics: "Standard deviation",
        gradeLevel: "10"
    },
    {
        concept: "Conditional Probability",
        keyFormulas: "P(A|B) = P(A∩B)/P(B)",
        keyConcepts: "Probability given conditions",
        relatedOperations: "Division",
        relatedTopics: "Probability",
        gradeLevel: "10"
    },
    {
        concept: "Expected Value",
        keyFormulas: "E(X) = Σ(x·P(x))",
        keyConcepts: "Probability and expected outcomes",
        relatedOperations: "Multiplication",
        relatedTopics: "Probability",
        gradeLevel: "10"
    },
    {
        concept: "Circle Geometry",
        keyFormulas: "",
        keyConcepts: "Inscribed angles and tangent lines",
        relatedOperations: "Angles",
        relatedTopics: "Circles (Advanced)",
        gradeLevel: "10"
    },
    {
        concept: "Law of Sines",
        keyFormulas: "a/sinA=b/sinB",
        keyConcepts: "Triangle relationships",
        relatedOperations: "Division",
        relatedTopics: "Law of Cosines",
        gradeLevel: "11"
    },
    {
        concept: "Law of Cosines",
        keyFormulas: "c²=a²+b²−2abcosC",
        keyConcepts: "Non-right triangles",
        relatedOperations: "Multiplication",
        relatedTopics: "Trigonometry",
        gradeLevel: "11"
    },
    {
        concept: "Logarithms",
        keyFormulas: "logₐx=y ↔ aʸ=x",
        keyConcepts: "Inverse of exponents",
        relatedOperations: "Division",
        relatedTopics: "Exponential functions",
        gradeLevel: "11"
    },
    {
        concept: "Exponential Functions",
        keyFormulas: "y=a·bˣ",
        keyConcepts: "Growth and decay",
        relatedOperations: "Multiplication",
        relatedTopics: "Logarithms",
        gradeLevel: "11"
    },
    {
        concept: "Complex Numbers",
        keyFormulas: "a + bi",
        keyConcepts: "Operations with imaginary unit i",
        relatedOperations: "Addition",
        relatedTopics: "Quadratic equations",
        gradeLevel: "11"
    },
    {
        concept: "Conic Sections",
        keyFormulas: "parabola, ellipse, hyperbola",
        keyConcepts: "Equations of conic sections",
        relatedOperations: "Quadratics",
        relatedTopics: "Circles",
        gradeLevel: "11"
    },
    {
        concept: "Sequences (Arithmetic/Geometric)",
        keyFormulas: "aₙ = a₁ + (n-1)d, aₙ = a₁rⁿ⁻¹",
        keyConcepts: "nth term and recursive formulas",
        relatedOperations: "Patterns",
        relatedTopics: "Sequences and series",
        gradeLevel: "11"
    },
    {
        concept: "Series and Summation",
        keyFormulas: "Σ, Sₙ",
        keyConcepts: "Arithmetic and geometric series",
        relatedOperations: "Addition",
        relatedTopics: "Sequences",
        gradeLevel: "11"
    },
    {
        concept: "Inverse Functions",
        keyFormulas: "f⁻¹(x)",
        keyConcepts: "Finding and graphing inverses",
        relatedOperations: "Functions",
        relatedTopics: "Composition",
        gradeLevel: "11"
    },
    {
        concept: "Rational Exponents",
        keyFormulas: "x^(m/n) = ⁿ√(xᵐ)",
        keyConcepts: "Fractional exponents and radical form",
        relatedOperations: "Exponents",
        relatedTopics: "Radicals",
        gradeLevel: "11"
    },
    {
        concept: "Polynomial Division",
        keyFormulas: "",
        keyConcepts: "Long division and synthetic division",
        relatedOperations: "Division",
        relatedTopics: "Polynomials",
        gradeLevel: "11"
    },
    {
        concept: "Derivatives",
        keyFormulas: "dy/dx",
        keyConcepts: "Instantaneous rate of change",
        relatedOperations: "Subtraction",
        relatedTopics: "Calculus",
        gradeLevel: "12"
    },
    {
        concept: "Integrals",
        keyFormulas: "∫f(x)dx",
        keyConcepts: "Area under a curve",
        relatedOperations: "Addition",
        relatedTopics: "Antiderivatives",
        gradeLevel: "12"
    },
    {
        concept: "Sequences and Series",
        keyFormulas: "Σaₙ",
        keyConcepts: "Sum of patterns",
        relatedOperations: "Addition",
        relatedTopics: "Progressions",
        gradeLevel: "12"
    },
    {
        concept: "Matrices",
        keyFormulas: "[a b; c d]",
        keyConcepts: "Array operations",
        relatedOperations: "Addition",
        relatedTopics: "Linear algebra",
        gradeLevel: "12"
    },
    {
        concept: "Standard Deviation",
        keyFormulas: "σ=√Σ(x−μ)²/n",
        keyConcepts: "Measure of spread",
        relatedOperations: "Subtraction",
        relatedTopics: "Variance",
        gradeLevel: "12"
    },
    {
        concept: "Limits",
        keyFormulas: "lim(x→a) f(x)",
        keyConcepts: "Approaching values in calculus",
        relatedOperations: "Substitution",
        relatedTopics: "Derivatives",
        gradeLevel: "12"
    },
    {
        concept: "Vectors",
        keyFormulas: "⟨x,y,z⟩",
        keyConcepts: "Vector operations and applications",
        relatedOperations: "Addition",
        relatedTopics: "Linear algebra",
        gradeLevel: "12"
    },
    {
        concept: "Rational Functions",
        keyFormulas: "f(x) = p(x)/q(x)",
        keyConcepts: "Asymptotes and graphing",
        relatedOperations: "Division",
        relatedTopics: "Rational expressions",
        gradeLevel: "12"
    },
    {
        concept: "Parametric Equations",
        keyFormulas: "x = f(t), y = g(t)",
        keyConcepts: "Parametric curves and eliminating parameters",
        relatedOperations: "Substitution",
        relatedTopics: "Functions",
        gradeLevel: "12"
    },
    {
        concept: "Polar Coordinates",
        keyFormulas: "r, θ",
        keyConcepts: "Converting between polar and rectangular",
        relatedOperations: "Trigonometry",
        relatedTopics: "Coordinate plane",
        gradeLevel: "12"
    },
    {
        concept: "L'Hôpital's Rule",
        keyFormulas: "lim f/g = lim f'/g'",
        keyConcepts: "Evaluating limits of indeterminate forms",
        relatedOperations: "Limits",
        relatedTopics: "Derivatives",
        gradeLevel: "12"
    },
    // NEW ADDITIONS - K-6 FOUNDATIONAL TOPICS
    {
        concept: "Number Writing (0-20)",
        keyFormulas: "",
        keyConcepts: "Writing numerals correctly, number formation",
        relatedOperations: "Number recognition",
        relatedTopics: "Counting and cardinality",
        gradeLevel: "K"
    },
    {
        concept: "More/Less/Equal",
        keyFormulas: "",
        keyConcepts: "Comparing quantities using more, less, equal",
        relatedOperations: "Comparing",
        relatedTopics: "Number sense",
        gradeLevel: "K"
    },
    {
        concept: "Sorting and Classifying",
        keyFormulas: "",
        keyConcepts: "Categorizing objects by attributes",
        relatedOperations: "Grouping",
        relatedTopics: "Data organization",
        gradeLevel: "K"
    },
    {
        concept: "Position Words",
        keyFormulas: "",
        keyConcepts: "Above, below, beside, next to, in front, behind",
        relatedOperations: "Spatial reasoning",
        relatedTopics: "Geometry",
        gradeLevel: "K"
    },
    {
        concept: "Simple Addition Stories",
        keyFormulas: "+",
        keyConcepts: "Visual addition word problems within 5",
        relatedOperations: "Addition",
        relatedTopics: "Word problems",
        gradeLevel: "K"
    },
    {
        concept: "Calendar Skills",
        keyFormulas: "",
        keyConcepts: "Days of week, months, seasons",
        relatedOperations: "Time",
        relatedTopics: "Patterns",
        gradeLevel: "K"
    },
    {
        concept: "Three-Addend Addition",
        keyFormulas: "+",
        keyConcepts: "Adding three numbers together",
        relatedOperations: "Addition",
        relatedTopics: "Mental math",
        gradeLevel: "1"
    },
    {
        concept: "Missing Addends",
        keyFormulas: "+",
        keyConcepts: "Finding unknown in equations (5 + ? = 8)",
        relatedOperations: "Inverse operations",
        relatedTopics: "Fact families",
        gradeLevel: "1"
    },
    {
        concept: "Number Line Operations",
        keyFormulas: "+, -",
        keyConcepts: "Using number lines for addition and subtraction",
        relatedOperations: "Visual math",
        relatedTopics: "Addition, subtraction",
        gradeLevel: "1"
    },
    {
        concept: "Coin Recognition",
        keyFormulas: "",
        keyConcepts: "Identifying penny, nickel, dime, quarter",
        relatedOperations: "Money",
        relatedTopics: "Counting",
        gradeLevel: "1"
    },
    {
        concept: "Half Hour Time",
        keyFormulas: "",
        keyConcepts: "Reading clocks at half-past",
        relatedOperations: "Time",
        relatedTopics: "Telling time",
        gradeLevel: "1"
    },
    {
        concept: "Equal Parts",
        keyFormulas: "",
        keyConcepts: "Introduction to halves and fourths",
        relatedOperations: "Fractions",
        relatedTopics: "Division",
        gradeLevel: "1"
    },
    {
        concept: "Tally Marks",
        keyFormulas: "",
        keyConcepts: "Counting and organizing with tallies",
        relatedOperations: "Counting by 5s",
        relatedTopics: "Data organization",
        gradeLevel: "1"
    },
    {
        concept: "Greater Than/Less Than Symbols",
        keyFormulas: "<, >, =",
        keyConcepts: "Using comparison symbols correctly",
        relatedOperations: "Comparing numbers",
        relatedTopics: "Number sense",
        gradeLevel: "1"
    },
    {
        concept: "Place Value (Hundreds)",
        keyFormulas: "",
        keyConcepts: "Understanding 3-digit place value deeply",
        relatedOperations: "Decomposing numbers",
        relatedTopics: "Three-digit numbers",
        gradeLevel: "2"
    },
    {
        concept: "Mental Math Strategies",
        keyFormulas: "+, -",
        keyConcepts: "Adding 10, 100; subtracting 10 mentally",
        relatedOperations: "Place value",
        relatedTopics: "Number sense",
        gradeLevel: "2"
    },
    {
        concept: "Measurement (Inches/Centimeters)",
        keyFormulas: "",
        keyConcepts: "Using rulers to measure length",
        relatedOperations: "Measurement",
        relatedTopics: "Units",
        gradeLevel: "2"
    },
    {
        concept: "Repeated Addition",
        keyFormulas: "+",
        keyConcepts: "Foundation for multiplication",
        relatedOperations: "Addition",
        relatedTopics: "Multiplication",
        gradeLevel: "2"
    },
    {
        concept: "Equal Groups",
        keyFormulas: "÷",
        keyConcepts: "Division concept introduction",
        relatedOperations: "Division",
        relatedTopics: "Multiplication",
        gradeLevel: "2"
    },
    {
        concept: "Shapes (2D Properties)",
        keyFormulas: "",
        keyConcepts: "Understanding sides, vertices, angles",
        relatedOperations: "Counting",
        relatedTopics: "Geometry",
        gradeLevel: "2"
    },
    {
        concept: "Line Plots (Simple)",
        keyFormulas: "",
        keyConcepts: "Organizing measurement data on line plots",
        relatedOperations: "Data collection",
        relatedTopics: "Graphs",
        gradeLevel: "2"
    },
    {
        concept: "Counting Money",
        keyFormulas: "",
        keyConcepts: "Mixed coins (calculating totals)",
        relatedOperations: "Addition",
        relatedTopics: "Money",
        gradeLevel: "2"
    },
    {
        concept: "Quarter Hours",
        keyFormulas: "",
        keyConcepts: "Time to 15-minute intervals",
        relatedOperations: "Time",
        relatedTopics: "Telling time",
        gradeLevel: "2"
    },
    {
        concept: "Number Patterns (100s chart)",
        keyFormulas: "",
        keyConcepts: "Patterns in 100s chart",
        relatedOperations: "Skip counting",
        relatedTopics: "Patterns",
        gradeLevel: "2"
    },
    {
        concept: "Multiplication Tables (Focus)",
        keyFormulas: "×",
        keyConcepts: "Fluency with 0-12 multiplication tables",
        relatedOperations: "Multiplication",
        relatedTopics: "Division",
        gradeLevel: "3"
    },
    {
        concept: "Division with Remainders",
        keyFormulas: "÷",
        keyConcepts: "Understanding and calculating remainders",
        relatedOperations: "Division",
        relatedTopics: "Multiplication",
        gradeLevel: "3"
    },
    {
        concept: "Fraction Comparison",
        keyFormulas: "<, >, =",
        keyConcepts: "Comparing fractions to determine which is larger",
        relatedOperations: "Fractions",
        relatedTopics: "Equivalent fractions",
        gradeLevel: "3"
    },
    {
        concept: "Unit Fractions",
        keyFormulas: "1/n",
        keyConcepts: "Understanding 1/2, 1/3, 1/4, etc.",
        relatedOperations: "Fractions",
        relatedTopics: "Equal parts",
        gradeLevel: "3"
    },
    {
        concept: "Liquid Measurement",
        keyFormulas: "",
        keyConcepts: "Cups, pints, quarts, gallons",
        relatedOperations: "Measurement",
        relatedTopics: "Units",
        gradeLevel: "3"
    },
    {
        concept: "Weight Measurement",
        keyFormulas: "",
        keyConcepts: "Ounces, pounds, grams, kilograms",
        relatedOperations: "Measurement",
        relatedTopics: "Units",
        gradeLevel: "3"
    },
    {
        concept: "Perimeter of Polygons",
        keyFormulas: "P = sum of all sides",
        keyConcepts: "Finding perimeter of various shapes",
        relatedOperations: "Addition",
        relatedTopics: "Area and perimeter",
        gradeLevel: "3"
    },
    {
        concept: "Scaled Picture Graphs",
        keyFormulas: "",
        keyConcepts: "Each symbol represents multiple units",
        relatedOperations: "Multiplication",
        relatedTopics: "Data interpretation",
        gradeLevel: "3"
    },
    {
        concept: "Scaled Bar Graphs",
        keyFormulas: "",
        keyConcepts: "Interpreting scales on bar graphs",
        relatedOperations: "Multiplication",
        relatedTopics: "Data interpretation",
        gradeLevel: "3"
    },
    {
        concept: "Frequency Tables",
        keyFormulas: "",
        keyConcepts: "Organizing categorical data",
        relatedOperations: "Counting",
        relatedTopics: "Data organization",
        gradeLevel: "3"
    },
    {
        concept: "Elapsed Time",
        keyFormulas: "",
        keyConcepts: "Time intervals and duration",
        relatedOperations: "Subtraction",
        relatedTopics: "Time",
        gradeLevel: "3"
    },
    {
        concept: "Temperature",
        keyFormulas: "",
        keyConcepts: "Reading thermometers, Fahrenheit/Celsius",
        relatedOperations: "Measurement",
        relatedTopics: "Units",
        gradeLevel: "3"
    },
    {
        concept: "Multi-Digit Multiplication",
        keyFormulas: "×",
        keyConcepts: "2-digit × 2-digit multiplication",
        relatedOperations: "Multiplication",
        relatedTopics: "Place value",
        gradeLevel: "4"
    },
    {
        concept: "Long Division",
        keyFormulas: "÷",
        keyConcepts: "Multi-digit divisors",
        relatedOperations: "Division",
        relatedTopics: "Multiplication",
        gradeLevel: "4"
    },
    {
        concept: "Fraction Ordering",
        keyFormulas: "<, >, =",
        keyConcepts: "Ordering multiple fractions",
        relatedOperations: "Comparison",
        relatedTopics: "Equivalent fractions",
        gradeLevel: "4"
    },
    {
        concept: "Fraction Models",
        keyFormulas: "",
        keyConcepts: "Visual representations (number lines, area)",
        relatedOperations: "Fractions",
        relatedTopics: "Equivalent fractions",
        gradeLevel: "4"
    },
    {
        concept: "Decimal Place Value",
        keyFormulas: "",
        keyConcepts: "Understanding tenths and hundredths",
        relatedOperations: "Place value",
        relatedTopics: "Decimals",
        gradeLevel: "4"
    },
    {
        concept: "Decimal Comparison",
        keyFormulas: "<, >, =",
        keyConcepts: "Comparing decimal values",
        relatedOperations: "Comparison",
        relatedTopics: "Place value",
        gradeLevel: "4"
    },
    {
        concept: "Protractor Use",
        keyFormulas: "",
        keyConcepts: "Measuring angles with protractor",
        relatedOperations: "Measurement",
        relatedTopics: "Angles",
        gradeLevel: "4"
    },
    {
        concept: "Symmetry",
        keyFormulas: "",
        keyConcepts: "Lines of symmetry in figures",
        relatedOperations: "Geometry",
        relatedTopics: "Shapes",
        gradeLevel: "4"
    },
    {
        concept: "Classifying Triangles",
        keyFormulas: "",
        keyConcepts: "By angles (acute, right, obtuse) and sides (equilateral, isosceles, scalene)",
        relatedOperations: "Classification",
        relatedTopics: "Geometry",
        gradeLevel: "4"
    },
    {
        concept: "Coordinate Grids (First Quadrant)",
        keyFormulas: "(x, y)",
        keyConcepts: "Plotting points in first quadrant",
        relatedOperations: "Ordered pairs",
        relatedTopics: "Coordinate plane",
        gradeLevel: "4"
    },
    {
        concept: "Division of Decimals",
        keyFormulas: "÷",
        keyConcepts: "Dividing with decimal divisors",
        relatedOperations: "Division",
        relatedTopics: "Decimal operations",
        gradeLevel: "5"
    },
    {
        concept: "Powers of 10",
        keyFormulas: "10^n",
        keyConcepts: "Multiplying/dividing by powers of 10",
        relatedOperations: "Place value",
        relatedTopics: "Exponents",
        gradeLevel: "5"
    },
    {
        concept: "Fraction to Decimal Conversion",
        keyFormulas: "÷",
        keyConcepts: "Converting between fractions and decimals",
        relatedOperations: "Division",
        relatedTopics: "Fractions, decimals",
        gradeLevel: "5"
    },
    {
        concept: "Percentage Basics",
        keyFormulas: "%",
        keyConcepts: "Understanding percent as per hundred",
        relatedOperations: "Fractions",
        relatedTopics: "Decimals",
        gradeLevel: "5"
    },
    {
        concept: "Three-Dimensional Figures",
        keyFormulas: "",
        keyConcepts: "Identifying prisms, pyramids, cylinders, cones, spheres",
        relatedOperations: "Classification",
        relatedTopics: "Geometry",
        gradeLevel: "5"
    },
    {
        concept: "Cubic Units",
        keyFormulas: "units³",
        keyConcepts: "Understanding volume units",
        relatedOperations: "Volume",
        relatedTopics: "Measurement",
        gradeLevel: "5"
    },
    {
        concept: "Order of Operations (PEMDAS)",
        keyFormulas: "PEMDAS",
        keyConcepts: "Parentheses, exponents, multiplication/division, addition/subtraction",
        relatedOperations: "All operations",
        relatedTopics: "Expressions",
        gradeLevel: "5"
    },
    {
        concept: "Numerical Patterns",
        keyFormulas: "",
        keyConcepts: "Identifying rules and sequences",
        relatedOperations: "Patterns",
        relatedTopics: "Sequences",
        gradeLevel: "5"
    },
    {
        concept: "Mean (Average)",
        keyFormulas: "sum ÷ count",
        keyConcepts: "Calculating and interpreting mean",
        relatedOperations: "Division",
        relatedTopics: "Statistics",
        gradeLevel: "5"
    },
    {
        concept: "Line Graphs",
        keyFormulas: "",
        keyConcepts: "Creating and interpreting trends over time",
        relatedOperations: "Data analysis",
        relatedTopics: "Graphs",
        gradeLevel: "5"
    },
    {
        concept: "Dividing Fractions",
        keyFormulas: "÷, reciprocal",
        keyConcepts: "Using reciprocals to divide fractions",
        relatedOperations: "Division",
        relatedTopics: "Multiplication of fractions",
        gradeLevel: "6"
    },
    {
        concept: "Negative Numbers",
        keyFormulas: "",
        keyConcepts: "Number line with negative values",
        relatedOperations: "Integers",
        relatedTopics: "Absolute value",
        gradeLevel: "6"
    },
    {
        concept: "Operations with Integers",
        keyFormulas: "+, -, ×, ÷",
        keyConcepts: "All four operations with positive and negative numbers",
        relatedOperations: "Integer rules",
        relatedTopics: "Number sense",
        gradeLevel: "6"
    },
    {
        concept: "GCF Applications",
        keyFormulas: "GCF",
        keyConcepts: "Using GCF to simplify fractions",
        relatedOperations: "Simplification",
        relatedTopics: "Greatest common factor",
        gradeLevel: "6"
    },
    {
        concept: "LCM Applications",
        keyFormulas: "LCM",
        keyConcepts: "Using LCM for adding fractions",
        relatedOperations: "Fraction addition",
        relatedTopics: "Least common multiple",
        gradeLevel: "6"
    },
    {
        concept: "Ratio Tables",
        keyFormulas: "a:b",
        keyConcepts: "Equivalent ratios in table format",
        relatedOperations: "Multiplication",
        relatedTopics: "Ratios and proportions",
        gradeLevel: "6"
    },
    {
        concept: "Double Number Lines",
        keyFormulas: "",
        keyConcepts: "Visual representation for ratios and proportions",
        relatedOperations: "Ratios",
        relatedTopics: "Proportional relationships",
        gradeLevel: "6"
    },
    {
        concept: "Percent of a Number",
        keyFormulas: "% × n",
        keyConcepts: "Finding percentages of quantities",
        relatedOperations: "Multiplication",
        relatedTopics: "Percentages",
        gradeLevel: "6"
    },
    {
        concept: "Box Plots",
        keyFormulas: "",
        keyConcepts: "Reading and creating box-and-whisker plots",
        relatedOperations: "Data analysis",
        relatedTopics: "Statistics",
        gradeLevel: "6"
    },
    {
        concept: "Histograms",
        keyFormulas: "",
        keyConcepts: "Frequency distributions with intervals",
        relatedOperations: "Data analysis",
        relatedTopics: "Bar graphs",
        gradeLevel: "6"
    },
    {
        concept: "Median and Mode",
        keyFormulas: "",
        keyConcepts: "Additional measures of center",
        relatedOperations: "Statistics",
        relatedTopics: "Mean",
        gradeLevel: "6"
    },
    {
        concept: "Interquartile Range (IQR)",
        keyFormulas: "Q3 - Q1",
        keyConcepts: "Understanding spread in data",
        relatedOperations: "Subtraction",
        relatedTopics: "Box plots",
        gradeLevel: "6"
    },
    // GRADE 7-8 ADDITIONS
    {
        concept: "Multi-Step Equations",
        keyFormulas: "",
        keyConcepts: "Solving complex algebraic equations with multiple operations",
        relatedOperations: "All operations",
        relatedTopics: "Two-step equations",
        gradeLevel: "7"
    },
    {
        concept: "Combining Like Terms",
        keyFormulas: "",
        keyConcepts: "Simplifying expressions by combining terms",
        relatedOperations: "Addition, subtraction",
        relatedTopics: "Expressions",
        gradeLevel: "7"
    },
    {
        concept: "Distributive Property",
        keyFormulas: "a(b + c) = ab + ac",
        keyConcepts: "Expanding expressions using distribution",
        relatedOperations: "Multiplication",
        relatedTopics: "Properties of operations",
        gradeLevel: "7"
    },
    {
        concept: "Simple Interest",
        keyFormulas: "I = PRT",
        keyConcepts: "Principal, rate, time calculations",
        relatedOperations: "Multiplication",
        relatedTopics: "Percentages",
        gradeLevel: "7"
    },
    {
        concept: "Percent Change",
        keyFormulas: "(new - old)/old × 100%",
        keyConcepts: "Percent increase and decrease",
        relatedOperations: "Percentages",
        relatedTopics: "Percent applications",
        gradeLevel: "7"
    },
    {
        concept: "Complementary and Supplementary Angles",
        keyFormulas: "90°, 180°",
        keyConcepts: "Angle relationships and pairs",
        relatedOperations: "Subtraction",
        relatedTopics: "Angles",
        gradeLevel: "7"
    },
    {
        concept: "Volume of Cylinders",
        keyFormulas: "V = πr²h",
        keyConcepts: "Circular base volume calculations",
        relatedOperations: "Multiplication",
        relatedTopics: "Volume",
        gradeLevel: "7"
    },
    {
        concept: "Sample Space",
        keyFormulas: "",
        keyConcepts: "Listing all possible outcomes",
        relatedOperations: "Counting",
        relatedTopics: "Probability",
        gradeLevel: "7"
    },
    {
        concept: "Simultaneous Equations (Graphing)",
        keyFormulas: "",
        keyConcepts: "Visual solution method for systems",
        relatedOperations: "Graphing",
        relatedTopics: "Systems of equations",
        gradeLevel: "8"
    },
    {
        concept: "Distance Formula",
        keyFormulas: "d = √[(x₂-x₁)² + (y₂-y₁)²]",
        keyConcepts: "Finding distance between two points",
        relatedOperations: "Square roots",
        relatedTopics: "Pythagorean theorem",
        gradeLevel: "8"
    },
    {
        concept: "Volume of Cones and Spheres",
        keyFormulas: "V = (1/3)πr²h, V = (4/3)πr³",
        keyConcepts: "Advanced 3D geometry volume",
        relatedOperations: "Multiplication",
        relatedTopics: "Volume",
        gradeLevel: "8"
    },
    {
        concept: "Bivariate Data",
        keyFormulas: "",
        keyConcepts: "Two-variable relationships and correlation",
        relatedOperations: "Data analysis",
        relatedTopics: "Scatter plots",
        gradeLevel: "8"
    },
    {
        concept: "Linear vs Non-Linear Functions",
        keyFormulas: "",
        keyConcepts: "Identifying function types from tables/graphs",
        relatedOperations: "Pattern recognition",
        relatedTopics: "Functions",
        gradeLevel: "8"
    },
    {
        concept: "Roots and Radicals",
        keyFormulas: "³√, ⁴√",
        keyConcepts: "Cube roots and higher-order roots",
        relatedOperations: "Radicals",
        relatedTopics: "Exponents",
        gradeLevel: "8"
    },
    {
        concept: "Rational vs Irrational Numbers",
        keyFormulas: "",
        keyConcepts: "Number classification and properties",
        relatedOperations: "Number theory",
        relatedTopics: "Real numbers",
        gradeLevel: "8"
    },
    {
        concept: "Frequency Tables (Two-Way)",
        keyFormulas: "",
        keyConcepts: "Categorical data with two variables",
        relatedOperations: "Data analysis",
        relatedTopics: "Statistics",
        gradeLevel: "8"
    },
    // GRADE 9-12 ADDITIONS
    {
        concept: "Completing the Square",
        keyFormulas: "x² + bx + (b/2)²",
        keyConcepts: "Quadratic solving method",
        relatedOperations: "Algebra",
        relatedTopics: "Quadratic equations",
        gradeLevel: "9"
    },
    {
        concept: "Quadratic Formula",
        keyFormulas: "x = [-b ± √(b²-4ac)]/2a",
        keyConcepts: "Using formula to solve quadratics",
        relatedOperations: "Substitution",
        relatedTopics: "Quadratic equations",
        gradeLevel: "9"
    },
    {
        concept: "Parent Functions",
        keyFormulas: "",
        keyConcepts: "Basic function families (linear, quadratic, etc.)",
        relatedOperations: "Function analysis",
        relatedTopics: "Functions",
        gradeLevel: "9"
    },
    {
        concept: "Function Transformations",
        keyFormulas: "f(x) + k, f(x + h), af(x)",
        keyConcepts: "Shifts, stretches, reflections of functions",
        relatedOperations: "Graphing",
        relatedTopics: "Functions",
        gradeLevel: "9"
    },
    {
        concept: "Regression Lines",
        keyFormulas: "y = mx + b",
        keyConcepts: "Line of best fit for data",
        relatedOperations: "Statistics",
        relatedTopics: "Scatter plots",
        gradeLevel: "10"
    },
    {
        concept: "Standard Form to Slope-Intercept",
        keyFormulas: "Ax + By = C → y = mx + b",
        keyConcepts: "Converting between linear equation forms",
        relatedOperations: "Algebra",
        relatedTopics: "Linear equations",
        gradeLevel: "10"
    },
    {
        concept: "Unit Circle",
        keyFormulas: "x² + y² = 1",
        keyConcepts: "Trigonometry on the unit circle",
        relatedOperations: "Trig functions",
        relatedTopics: "Trigonometry",
        gradeLevel: "11"
    },
    {
        concept: "Trig Identities",
        keyFormulas: "sin²θ + cos²θ = 1",
        keyConcepts: "Pythagorean and reciprocal identities",
        relatedOperations: "Trigonometry",
        relatedTopics: "Trig functions",
        gradeLevel: "11"
    },
    {
        concept: "Arc Length and Sector Area",
        keyFormulas: "s = rθ, A = (1/2)r²θ",
        keyConcepts: "Circle calculations with radians",
        relatedOperations: "Multiplication",
        relatedTopics: "Circles",
        gradeLevel: "11"
    },
    {
        concept: "Asymptotes",
        keyFormulas: "",
        keyConcepts: "Vertical, horizontal, and oblique asymptotes",
        relatedOperations: "Limits",
        relatedTopics: "Rational functions",
        gradeLevel: "12"
    },
    {
        concept: "Continuity",
        keyFormulas: "",
        keyConcepts: "Function continuity concepts and definitions",
        relatedOperations: "Limits",
        relatedTopics: "Calculus",
        gradeLevel: "12"
    },
    {
        concept: "Chain Rule",
        keyFormulas: "dy/dx = dy/du × du/dx",
        keyConcepts: "Composite function derivatives",
        relatedOperations: "Differentiation",
        relatedTopics: "Derivatives",
        gradeLevel: "12"
    }
];

// Get topics by grade level
function getTopicsByGrade(grade) {
    return mathConcepts.filter(concept => concept.gradeLevel === grade.toString());
}

// Get concept data by name
function getConceptByName(name) {
    return mathConcepts.find(concept => 
        concept.concept.toLowerCase() === name.toLowerCase()
    );
}

// Explicitly expose functions globally to prevent any scoping issues
window.getTopicsByGrade = getTopicsByGrade;
window.getConceptByName = getConceptByName;
window.mathConcepts = mathConcepts;

console.log('✅ Math data loaded:', mathConcepts.length, 'concepts');

