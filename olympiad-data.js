// Math Olympiad Questions Data
// Parses the markdown file and creates a random indexed list

const olympiadData = {
    questions: [],
    randomIndex: [],
    imageData: {},
    initialized: false,
    
    // Initialize: Parse markdown and create random index
    async init() {
        console.log('🏆 Initializing Olympiad Data...');
        
        try {
            // Try to load from localStorage first for faster loading
            const cached = this.loadFromStorage();
            if (cached) {
                console.log('✅ Loaded from cache:', this.questions.length, 'questions');
                this.initialized = true;
                return true;
            }
            
            // Fetch the markdown file
            console.log('📥 Fetching markdown file...');
            const response = await fetch('Copy of Problem of the Week - Master Sheet.md');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const text = await response.text();
            console.log('📄 Markdown file loaded, size:', text.length, 'chars');
            
            // Parse questions from markdown
            this.parseMarkdown(text);
            console.log('✅ Parsed', this.questions.length, 'questions');
            
            // Create random indexed list
            this.createRandomIndex();
            
            // Save to localStorage for future use
            this.saveToStorage();
            
            this.initialized = true;
            console.log('✅ Olympiad Data initialized successfully!');
            return true;
        } catch (error) {
            console.error('❌ Error loading questions:', error);
            this.initialized = false;
            return false;
        }
    },
    
    parseMarkdown(text) {
        const lines = text.split('\n');
        const questions = [];
        let currentDate = null;
        let currentImageRef = null;
        
        // First pass: collect date-image pairs
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Match date headers (## Date format)
            const dateMatch = line.match(/^##\s+(.+)$/);
            if (dateMatch) {
                const dateStr = dateMatch[1].trim();
                // Only process if it looks like a date (has letters/numbers, not just symbols)
                if (dateStr && !dateStr.startsWith('![') && dateStr.length > 3 && /[a-zA-Z0-9]/.test(dateStr)) {
                    currentDate = dateStr;
                }
            }
            
            // Match image references ![][imageX]
            const imageMatch = line.match(/!\[.*?\]\[(image\d+)\]/);
            if (imageMatch && currentDate) {
                currentImageRef = imageMatch[1];
                
                questions.push({
                    id: questions.length + 1,
                    date: currentDate,
                    imageRef: currentImageRef,
                    title: `Problem from ${currentDate}`
                });
                
                // Reset for next question
                currentDate = null;
            }
        }
        
        // Second pass: collect base64 image data
        console.log('📸 Extracting image data...');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Match image data: [imageX]: <data:image/png;base64,...>
            const imageDataMatch = line.match(/\[(image\d+)\]:\s*<(data:image\/[^;]+;base64,[^>]+)>/);
            if (imageDataMatch) {
                const imageRef = imageDataMatch[1];
                const imageData = imageDataMatch[2];
                this.imageData[imageRef] = imageData;
            }
        }
        
        console.log('✅ Found', Object.keys(this.imageData).length, 'images');
        this.questions = questions;
    },
    
    createRandomIndex() {
        // Create array of indices
        const indices = Array.from({ length: this.questions.length }, (_, i) => i);
        
        // Check if we have a saved seed
        const savedSeed = localStorage.getItem('olympiadRandomSeed');
        let seed;
        
        if (savedSeed) {
            seed = parseInt(savedSeed);
            console.log('Using saved seed:', seed);
        } else {
            seed = Date.now();
            localStorage.setItem('olympiadRandomSeed', seed.toString());
            console.log('Generated new seed:', seed);
        }
        
        // Fisher-Yates shuffle for true randomness
        // Using a simple pseudo-random function based on the seed
        const random = (function() {
            let s = seed;
            return function() {
                s = (s * 9301 + 49297) % 233280;
                return s / 233280;
            };
        })();
        
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        
        this.randomIndex = indices;
        console.log('🔀 Created randomized index');
    },
    
    getQuestionForDay(dayOffset = 0) {
        if (!this.initialized || this.questions.length === 0) {
            return null;
        }
        
        // Get today's date as a consistent index
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
        const adjustedDay = daysSinceEpoch + dayOffset;
        
        // Ensure we cycle through all questions
        const questionIndex = adjustedDay % this.randomIndex.length;
        const actualIndex = this.randomIndex[Math.abs(questionIndex)];
        
        const question = this.questions[actualIndex];
        
        // Attach image data URL if available
        if (question && question.imageRef && this.imageData[question.imageRef]) {
            question.imageDataUrl = this.imageData[question.imageRef];
        }
        
        return {
            question: question,
            dayNumber: Math.abs(questionIndex) + 1,
            totalQuestions: this.questions.length
        };
    },
    
    saveToStorage() {
        try {
            const data = {
                questions: this.questions,
                randomIndex: this.randomIndex,
                imageData: this.imageData,
                timestamp: Date.now()
            };
            localStorage.setItem('olympiadData', JSON.stringify(data));
            console.log('💾 Saved to localStorage');
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },
    
    loadFromStorage() {
        try {
            const saved = localStorage.getItem('olympiadData');
            if (!saved) return false;
            
            const data = JSON.parse(saved);
            
            // Check if data is recent (within 7 days)
            const age = Date.now() - data.timestamp;
            const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
            
            if (age > maxAge) {
                console.log('Cached data is old, reloading...');
                return false;
            }
            
            this.questions = data.questions || [];
            this.randomIndex = data.randomIndex || [];
            this.imageData = data.imageData || {};
            
            return this.questions.length > 0;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return false;
        }
    },
    
    getTotalCount() {
        return this.questions.length;
    }
};

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
    // Initialize asynchronously
    olympiadData.init().then(success => {
        if (success) {
            // Dispatch event to notify app
            window.dispatchEvent(new CustomEvent('olympiadDataReady'));
        }
    });
}

