// Script to extract MAP questions from HTML and convert to CSV
const fs = require('fs');

// Read the HTML file
const html = fs.readFileSync('map-prep.html', 'utf8');

// Extract the questions array using regex
const questionsMatch = html.match(/const MAP_MATH_QUESTIONS = \[([\s\S]*?)\n    \];/);
if (!questionsMatch) {
    console.error('Could not find questions array');
    process.exit(1);
}

// Parse the JavaScript object array
const questionsStr = '[' + questionsMatch[1] + '\n    ]';
const questions = eval(questionsStr);

// CSV header
const csvRows = [];
csvRows.push('ID,Difficulty,Question,Option A,Option B,Option C,Option D,Correct Answer,Hint');

// Convert each question to CSV row
questions.forEach(q => {
    const options = q.answerOptions;
    const correctAnswer = options.find(opt => opt.isCorrect).text;
    
    // Escape and format fields for CSV
    const escapeCSV = (str) => {
        if (!str) return '';
        // Remove ** bold markers
        str = str.replace(/\*\*/g, '');
        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
    };
    
    const row = [
        q.id,
        q.difficulty,
        escapeCSV(q.question),
        escapeCSV(options[0].text),
        escapeCSV(options[1].text),
        escapeCSV(options[2].text),
        escapeCSV(options[3].text),
        escapeCSV(correctAnswer),
        escapeCSV(q.hint)
    ];
    
    csvRows.push(row.join(','));
});

// Write to CSV file
fs.writeFileSync('map-questions.csv', csvRows.join('\n'), 'utf8');
console.log(`✓ Successfully extracted ${questions.length} questions to map-questions.csv`);
