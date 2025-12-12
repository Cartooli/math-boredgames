/**
 * Math Olympiad Solutions Data Structure
 * 
 * This file manages solutions for Math Olympiad problems.
 * Solutions can be added manually or imported from external sources.
 */

const olympiadSolutions = {
    solutions: {},
    
    /**
     * Initialize solutions from localStorage or create empty structure
     */
    init() {
        this.loadFromStorage();
        console.log('📝 Solutions initialized:', Object.keys(this.solutions).length, 'solutions loaded');
    },
    
    /**
     * Get solution for a specific question
     */
    getSolution(questionId) {
        return this.solutions[questionId] || null;
    },
    
    /**
     * Add or update a solution
     */
    setSolution(questionId, solutionData) {
        const solution = {
            questionId: questionId,
            answer: solutionData.answer || null,
            answerType: solutionData.answerType || 'numeric', // numeric, text, multiple_choice, proof
            steps: solutionData.steps || [],
            explanation: solutionData.explanation || '',
            method: solutionData.method || '', // algebraic, geometric, logical, etc.
            hints: solutionData.hints || [],
            verified: solutionData.verified || false,
            verifiedBy: solutionData.verifiedBy || 'manual', // manual, external_source, peer_review, ai_assisted
            verificationDate: solutionData.verificationDate || new Date().toISOString(),
            sourceUrl: solutionData.sourceUrl || null,
            difficulty: solutionData.difficulty || null,
            tags: solutionData.tags || [],
            lastModified: new Date().toISOString()
        };
        
        this.solutions[questionId] = solution;
        this.saveToStorage();
        
        return solution;
    },
    
    /**
     * Delete a solution
     */
    deleteSolution(questionId) {
        if (this.solutions[questionId]) {
            delete this.solutions[questionId];
            this.saveToStorage();
            return true;
        }
        return false;
    },
    
    /**
     * Get all solutions
     */
    getAllSolutions() {
        return { ...this.solutions };
    },
    
    /**
     * Get solutions statistics
     */
    getStats() {
        const total = Object.keys(this.solutions).length;
        const verified = Object.values(this.solutions).filter(s => s.verified).length;
        const byType = Object.values(this.solutions).reduce((acc, s) => {
            acc[s.answerType] = (acc[s.answerType] || 0) + 1;
            return acc;
        }, {});
        
        return {
            total,
            verified,
            unverified: total - verified,
            byType,
            verificationRate: total > 0 ? (verified / total * 100).toFixed(1) : 0
        };
    },
    
    /**
     * Import solutions from JSON
     */
    importSolutions(jsonData) {
        try {
            const imported = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            
            let count = 0;
            for (const [questionId, solution] of Object.entries(imported)) {
                this.setSolution(questionId, solution);
                count++;
            }
            
            console.log(`✅ Imported ${count} solutions`);
            return { success: true, count };
        } catch (error) {
            console.error('❌ Import failed:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Export solutions to JSON
     */
    exportSolutions() {
        return JSON.stringify(this.solutions, null, 2);
    },
    
    /**
     * Search solutions
     */
    searchSolutions(query) {
        const lowerQuery = query.toLowerCase();
        return Object.values(this.solutions).filter(solution => {
            return (
                (solution.answer && solution.answer.toString().toLowerCase().includes(lowerQuery)) ||
                (solution.explanation && solution.explanation.toLowerCase().includes(lowerQuery)) ||
                (solution.method && solution.method.toLowerCase().includes(lowerQuery)) ||
                (solution.tags && solution.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
            );
        });
    },
    
    /**
     * Load from localStorage
     */
    loadFromStorage() {
        try {
            const saved = localStorage.getItem('olympiadSolutions');
            if (saved) {
                this.solutions = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading solutions:', error);
        }
    },
    
    /**
     * Save to localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem('olympiadSolutions', JSON.stringify(this.solutions));
        } catch (error) {
            console.error('Error saving solutions:', error);
        }
    },
    
    /**
     * Clear all solutions (with confirmation)
     */
    clearAll() {
        if (confirm('⚠️ Are you sure you want to delete ALL solutions? This cannot be undone!')) {
            this.solutions = {};
            this.saveToStorage();
            return true;
        }
        return false;
    }
};

// Auto-initialize
if (typeof window !== 'undefined') {
    olympiadSolutions.init();
}

