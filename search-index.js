// MathBored Global Search Index
// Combines all searchable content: Math Topics, Primer Lessons, Glossary Terms

const searchIndex = {
    // Grade level display names
    gradeLabels: {
        'K': 'Kindergarten',
        '1': '1st Grade',
        '2': '2nd Grade',
        '3': '3rd Grade',
        '4': '4th Grade',
        '5': '5th Grade',
        '6': '6th Grade',
        '7': '7th Grade',
        '8': '8th Grade',
        '9': '9th Grade',
        '10': '10th Grade',
        '11': '11th Grade',
        '12': '12th Grade'
    },

    // Convert concept name to URL slug
    toSlug(name) {
        return name
            .toLowerCase()
            .replace(/[()]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    },

    // Build the complete search data array
    buildIndex() {
        const items = [];

        // 1. Add all math concepts from data.js
        if (typeof mathConcepts !== 'undefined') {
            mathConcepts.forEach(concept => {
                const slug = this.toSlug(concept.concept);
                items.push({
                    id: `topic-${slug}`,
                    type: 'topic',
                    title: concept.concept,
                    description: concept.keyConcepts,
                    keywords: [
                        concept.keyFormulas,
                        concept.relatedOperations,
                        concept.relatedTopics
                    ].filter(Boolean).join(' '),
                    grade: concept.gradeLevel,
                    gradeLabel: this.gradeLabels[concept.gradeLevel] || concept.gradeLevel,
                    links: {
                        lesson: `math/${slug}/lesson.html`,
                        practice: `math/${slug}/practice.html`,
                        walkthrough: `math/${slug}/walkthrough.html`
                    },
                    glossaryLink: `glossary/${slug}.html`
                });
            });
        }

        // 2. Add primer lessons
        const primerLessons = [
            { id: 'E01', title: 'What Numbers Are', description: 'Counting, place value foundation, number sense', keywords: 'counting numbers place value', grade: 'K-5' },
            { id: 'E02', title: 'Addition Basics', description: 'Strategies, mental math, building fluency', keywords: 'addition adding mental math', grade: 'K-5' },
            { id: 'E03', title: 'Subtraction & Inverse Relationships', description: 'Subtraction as inverse of addition, conceptual understanding', keywords: 'subtraction taking away inverse', grade: 'K-5' },
            { id: 'E04', title: 'Multiplication Concept', description: 'Arrays, repeated addition, foundational multiplication', keywords: 'multiplication multiply arrays times', grade: 'K-5' },
            { id: 'E05', title: 'Division & Fair Sharing', description: 'Division as inverse of multiplication, fair sharing concept', keywords: 'division divide sharing equal groups', grade: 'K-5' },
            { id: 'E06', title: 'Fractions as Parts', description: 'Halves, thirds, fourths, intuitive fraction understanding', keywords: 'fractions halves thirds fourths parts', grade: 'K-5' },
            { id: 'E07', title: 'Comparing & Ordering', description: 'Comparing numbers and fractions, ordering on number line', keywords: 'comparing ordering greater less than', grade: 'K-5' },
            { id: 'E08', title: 'Introduction to Measurement', description: 'Length, time, money, standard units', keywords: 'measurement length time money units', grade: 'K-5' },
            { id: 'E09', title: 'Basic Geometry', description: 'Shapes, properties, perimeter, area basics', keywords: 'geometry shapes perimeter area', grade: 'K-5' },
            { id: 'E10', title: 'Word Problems Strategy', description: 'Translating English to math, problem-solving approach', keywords: 'word problems solving strategy', grade: 'K-5' },
            { id: 'E11', title: 'Patterns & Sequences', description: 'Identifying and extending patterns, sequence basics', keywords: 'patterns sequences rules', grade: 'K-5' },
            { id: 'E12', title: 'Data & Basic Graphing', description: 'Collecting data, pictographs, bar graphs, interpretation', keywords: 'data graphs pictographs bar graphs', grade: 'K-5' },
            { id: 'M13', title: 'Equivalent Fractions & Simplification', description: 'Equivalent fractions, reducing to lowest terms', keywords: 'equivalent fractions simplifying reducing', grade: '6-8' },
            { id: 'M14', title: 'Adding & Subtracting Fractions', description: 'Common denominators, operations with fractions', keywords: 'adding fractions subtracting common denominator', grade: '6-8' },
            { id: 'M15', title: 'Multiplying & Dividing Fractions', description: 'Multiplication and division algorithms for fractions', keywords: 'multiplying fractions dividing reciprocals', grade: '6-8' },
            { id: 'M16', title: 'Decimals & Place Value', description: 'Decimal notation, operations, relationship to fractions', keywords: 'decimals decimal place value', grade: '6-8' },
            { id: 'M17', title: 'Percentages', description: 'Percent concept, conversions, calculations', keywords: 'percent percentage conversions', grade: '6-8' },
            { id: 'M18', title: 'Ratios & Proportional Reasoning', description: 'Ratios, rates, proportions, direct relationships', keywords: 'ratios proportions rates', grade: '6-8' },
            { id: 'M19', title: 'Integers & Operations with Negatives', description: 'Negative numbers, integer operations, number line', keywords: 'integers negative numbers operations', grade: '6-8' },
            { id: 'M20', title: 'Introduction to Variables', description: 'Variables as unknown quantities, basic notation', keywords: 'variables algebra expressions', grade: '6-8' },
            { id: 'M21', title: 'Solving Simple Equations', description: 'Two-step equations, inverse operations, balance method', keywords: 'equations solving algebra', grade: '6-8' },
            { id: 'M22', title: 'Order of Operations', description: 'PEMDAS, sequence of operations, evaluation', keywords: 'PEMDAS order operations', grade: '6-8' },
            { id: 'M23', title: 'Exponents & Powers', description: 'Exponential notation, properties of exponents, powers of 10', keywords: 'exponents powers notation', grade: '6-8' },
            { id: 'M24', title: 'Square Roots & Radicals', description: 'Square roots, radical notation, perfect squares intro', keywords: 'square roots radicals perfect squares', grade: '6-8' },
            { id: 'M25', title: 'Graphing Ordered Pairs', description: 'Coordinate plane, ordered pairs, plotting points', keywords: 'coordinate plane graphing plotting', grade: '6-8' },
            { id: 'M26', title: 'Introduction to Functions', description: 'Function concept, input-output, function notation', keywords: 'functions input output domain range', grade: '6-8' },
            { id: 'M27', title: 'Linear Relationships', description: 'Linear patterns, constant rate, introduction to linear functions', keywords: 'linear patterns rate change', grade: '6-8' },
            { id: 'H28', title: 'Linear Equations', description: 'Slope-intercept, point-slope, standard form', keywords: 'linear equations slope intercept', grade: '9-12' },
            { id: 'H29', title: 'Graphing Linear Functions', description: 'Graphing lines, slope interpretation, transformations', keywords: 'graphing linear slope', grade: '9-12' },
            { id: 'H30', title: 'Systems of Linear Equations', description: 'Solving systems, graphical and algebraic methods', keywords: 'systems equations elimination substitution', grade: '9-12' },
            { id: 'H31', title: 'Slope & Rate of Change', description: 'Slope concept, rate of change, secant lines', keywords: 'slope rate change', grade: '9-12' },
            { id: 'H32', title: 'Polynomials & Terminology', description: 'Polynomial definitions, degree, standard form', keywords: 'polynomials degree terms', grade: '9-12' },
            { id: 'H33', title: 'Factoring Techniques', description: 'GCF, trinomials, special products, factoring', keywords: 'factoring GCF trinomials', grade: '9-12' },
            { id: 'H34', title: 'Quadratic Equations - Conceptual', description: 'Quadratic concept, parabolas, roots, vertex', keywords: 'quadratic parabola roots vertex', grade: '9-12' },
            { id: 'H35', title: 'Solving Quadratics', description: 'Factoring, quadratic formula, completing the square', keywords: 'quadratic formula solving', grade: '9-12' },
            { id: 'H36', title: 'Function Notation & Composition', description: 'Function notation, evaluation, composition of functions', keywords: 'function notation composition', grade: '9-12' },
            { id: 'H37', title: 'Inverse Functions', description: 'Inverse concept, finding inverses, properties', keywords: 'inverse functions one-to-one', grade: '9-12' },
            { id: 'H38', title: 'Exponential Functions & Growth', description: 'Exponential models, exponential growth/decay, e', keywords: 'exponential growth decay', grade: '9-12' },
            { id: 'H39', title: 'Logarithms', description: 'Logarithms as inverse of exponentials, properties, evaluation', keywords: 'logarithms log properties', grade: '9-12' },
            { id: 'H40', title: 'Rational Expressions & Equations', description: 'Simplifying, operations, solving rational equations', keywords: 'rational expressions equations', grade: '9-12' },
            { id: 'H41', title: 'Sequences - Arithmetic', description: 'Arithmetic sequences, common difference, formulas', keywords: 'arithmetic sequences difference', grade: '9-12' },
            { id: 'H42', title: 'Sequences - Geometric', description: 'Geometric sequences, common ratio, formulas', keywords: 'geometric sequences ratio', grade: '9-12' },
            { id: 'H43', title: 'Right Triangle Trigonometry', description: 'Sine, cosine, tangent, right triangle applications', keywords: 'trigonometry sine cosine tangent SOH CAH TOA', grade: '9-12' },
            { id: 'H44', title: 'Unit Circle & Angle Measure', description: 'Unit circle, radians, degrees, angle measurement', keywords: 'unit circle radians degrees', grade: '9-12' },
            { id: 'H45', title: 'Basic Trigonometric Functions', description: 'Sine, cosine, tangent as functions, graphs, properties', keywords: 'trig functions graphs periodic', grade: '9-12' },
            { id: 'H46', title: 'Probability Fundamentals', description: 'Probability rules, independent/dependent events, counting', keywords: 'probability rules events', grade: '9-12' },
            { id: 'H47', title: 'Statistics & Distributions', description: 'Mean, median, mode, standard deviation, normal distribution', keywords: 'statistics mean median mode standard deviation', grade: '9-12' },
            { id: 'H48', title: 'Correlation vs. Causation', description: 'Relationship analysis, correlation coefficient, inference', keywords: 'correlation causation inference', grade: '9-12' }
        ];

        primerLessons.forEach(lesson => {
            items.push({
                id: `primer-${lesson.id}`,
                type: 'primer',
                title: lesson.title,
                description: lesson.description,
                keywords: lesson.keywords,
                grade: lesson.grade,
                gradeLabel: lesson.grade,
                lessonId: lesson.id,
                links: {
                    primer: `primer/${lesson.id}.html`
                }
            });
        });

        // 3. Add special content pages
        items.push({
            id: 'special-olympiad',
            type: 'olympiad',
            title: 'Daily Math Olympiad Problems',
            description: 'Challenging Math Olympiad problems to sharpen problem-solving skills',
            keywords: 'olympiad competition challenge advanced problems',
            grade: '6-12',
            gradeLabel: 'Middle to High School',
            links: {
                olympiad: 'olympiad.html'
            }
        });

        items.push({
            id: 'special-competitions',
            type: 'competitions',
            title: 'U.S. Math Competitions Guide',
            description: 'Discover nationwide math competitions: MATHCOUNTS, AMC 8, MOEMS and more',
            keywords: 'competitions MATHCOUNTS AMC MOEMS contests',
            grade: 'K-8',
            gradeLabel: 'K-8 Students',
            links: {
                competitions: 'competitions.html'
            }
        });

        items.push({
            id: 'special-glossary',
            type: 'reference',
            title: 'Math Glossary',
            description: 'Quick reference definitions for math terms and concepts',
            keywords: 'glossary definitions terms vocabulary',
            grade: 'K-12',
            gradeLabel: 'All Grades',
            links: {
                glossary: 'glossary.html'
            }
        });

        items.push({
            id: 'special-primer',
            type: 'reference',
            title: 'Essential Math Primer',
            description: '48 standalone 15-minute lessons covering K-12 math concepts sequentially',
            keywords: 'primer curriculum lessons sequential learning',
            grade: 'K-12',
            gradeLabel: 'All Grades',
            links: {
                primer: 'primer.html'
            }
        });

        return items;
    },

    // The actual search data (populated on load)
    data: [],

    // Initialize the index
    init() {
        this.data = this.buildIndex();
        console.log('✅ Search index initialized:', this.data.length, 'items');
    }
};

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => searchIndex.init());
} else {
    searchIndex.init();
}

// Expose globally
window.searchIndex = searchIndex;
