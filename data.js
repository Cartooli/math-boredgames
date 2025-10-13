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
        concept: "Place Value",
        keyFormulas: "Decomposition by 10s",
        keyConcepts: "Understanding base-ten system",
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

