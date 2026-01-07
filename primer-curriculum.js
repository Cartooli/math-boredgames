// Essential Math Primer Curriculum Data Loader

// Load curriculum data
let primerCurriculum = null;
let allPrimerLessons = [];

// Fetch and parse the curriculum JSON
async function loadPrimerCurriculum() {
    try {
        const response = await fetch('primer-curriculum.json');
        primerCurriculum = await response.json();
        
        // Flatten all lessons into a single array for easy access
        primerCurriculum.grade_bands.forEach(band => {
            band.lessons.forEach(lesson => {
                allPrimerLessons.push({
                    ...lesson,
                    grade_band: band.band,
                    grade_span: band.grade_span,
                    is_reserve: false
                });
            });
        });
        
        // Add reserve slots (placeholders for future expansion)
        for (let i = 49; i <= 75; i++) {
            allPrimerLessons.push({
                id: `R${i.toString().padStart(2, '0')}`,
                sequence: i,
                title: `Reserve Lesson ${i}`,
                description: "Coming soon - Additional lesson content for curriculum expansion",
                key_concepts: [],
                prerequisites: [],
                grade_band: "Reserve",
                grade_span: "TBD",
                is_reserve: true
            });
        }
        
        console.log('✅ Loaded Essential Math Primer:', allPrimerLessons.length, 'lessons');
        return primerCurriculum;
    } catch (error) {
        console.error('❌ Failed to load primer curriculum:', error);
        return null;
    }
}

// Helper functions
function getLessonById(id) {
    return allPrimerLessons.find(lesson => lesson.id === id);
}

function getLessonBySequence(seq) {
    return allPrimerLessons.find(lesson => lesson.sequence === seq);
}

function getNextLesson(currentSequence) {
    if (currentSequence >= 75) return null;
    return getLessonBySequence(currentSequence + 1);
}

function getPreviousLesson(currentSequence) {
    if (currentSequence <= 1) return null;
    return getLessonBySequence(currentSequence - 1);
}

function getProgressPercentage() {
    const completed = parseInt(localStorage.getItem('primer-progress') || '0');
    return Math.round((completed / 48) * 100); // Based on 48 core lessons
}

function markLessonComplete(lessonId) {
    const completedLessons = JSON.parse(localStorage.getItem('primer-completed') || '[]');
    if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem('primer-completed', JSON.stringify(completedLessons));
        localStorage.setItem('primer-progress', completedLessons.length.toString());
    }
}

function isLessonComplete(lessonId) {
    const completedLessons = JSON.parse(localStorage.getItem('primer-completed') || '[]');
    return completedLessons.includes(lessonId);
}

// Expose functions globally
window.primerCurriculum = primerCurriculum;
window.allPrimerLessons = allPrimerLessons;
window.loadPrimerCurriculum = loadPrimerCurriculum;
window.getLessonById = getLessonById;
window.getLessonBySequence = getLessonBySequence;
window.getNextLesson = getNextLesson;
window.getPreviousLesson = getPreviousLesson;
window.getProgressPercentage = getProgressPercentage;
window.markLessonComplete = markLessonComplete;
window.isLessonComplete = isLessonComplete;










