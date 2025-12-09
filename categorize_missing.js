const fs = require('fs');

// Read data.js and extract grade levels
const dataContent = fs.readFileSync('data.js', 'utf8');
const missing = [
  "Scaled Picture Graphs", "Scaled Bar Graphs", "Frequency Tables", "Elapsed Time", "Temperature",
  "Multi-Digit Multiplication", "Long Division", "Fraction Ordering", "Fraction Models",
  "Decimal Place Value", "Decimal Comparison", "Protractor Use", "Symmetry",
  "Classifying Triangles", "Coordinate Grids (First Quadrant)", "Prime Numbers",
  "Exponents", "Proportional Relationships", "Scale Drawings", "Percent Applications",
  "Two-Step Equations", "Scatter Plots", "Statistics", "Probability Basics",
  "Circles", "Angles and Triangles", "Simultaneous Equations (Graphing)",
  "Linear Systems (Methods)", "Absolute Value Equations", "Square Root Functions",
  "Exponential Growth and Decay", "Systems of Inequalities", "Normal Distribution",
  "Conditional Probability", "Expected Value", "Circle Geometry", "Systems of Equations",
  "Functions", "Complex Numbers", "Conic Sections", "Sequences (Arithmetic/Geometric)",
  "Series and Summation", "Inverse Functions", "Rational Exponents",
  "Polynomial Division", "Integrals", "Sequences and Series", "Standard Deviation",
  "Limits", "Vectors", "Rational Functions", "Parametric Equations",
  "Polar Coordinates", "L'Hôpital's Rule", "Circles (Advanced)", "Combinations and Permutations",
  "Law of Sines", "Law of Cosines"
];

const byGrade = { K: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [] };

missing.forEach(topic => {
  const regex = new RegExp(`concept: "${topic.replace(/[()]/g, '\\$&')}",[^}]*gradeLevel: "(\\w+)"`, 'ms');
  const match = dataContent.match(regex);
  if (match) {
    const grade = match[1];
    byGrade[grade].push(topic);
  }
});

console.log('Missing topics by grade:');
Object.entries(byGrade).forEach(([grade, topics]) => {
  if (topics.length > 0) {
    console.log(`\n${grade} (${topics.length} topics):`);
    topics.forEach(t => console.log(`  - ${t}`));
  }
});

// Count totals
const elementary = (byGrade.K.length + byGrade['1'].length + byGrade['2'].length + byGrade['3'].length + byGrade['4'].length + byGrade['5'].length);
const middle = (byGrade['6'].length + byGrade['7'].length + byGrade['8'].length);
const high = (byGrade['9'].length + byGrade['10'].length + byGrade['11'].length + byGrade['12'].length);

console.log(`\n\nSummary:`);
console.log(`Elementary (K-5): ${elementary}`);
console.log(`Middle (6-8): ${middle}`);
console.log(`High (9-12): ${high}`);
console.log(`Total: ${missing.length}`);
