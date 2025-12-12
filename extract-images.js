#!/usr/bin/env node

/**
 * Image Extraction Script for Math Olympiad Problems
 * 
 * This script extracts base64 encoded PNG images from the markdown file
 * and saves them as individual files for OCR processing.
 * 
 * Usage:
 *   node extract-images.js
 * 
 * Output:
 *   Creates /olympiad-images/ directory with numbered PNG files
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    markdownFile: 'Copy of Problem of the Week - Master Sheet.md',
    outputDir: 'olympiad-images',
    metadataFile: 'olympiad-metadata.json'
};

class ImageExtractor {
    constructor() {
        this.images = [];
        this.metadata = [];
    }
    
    /**
     * Main extraction process
     */
    async extract() {
        console.log('🏆 Math Olympiad Image Extractor');
        console.log('================================\n');
        
        try {
            // Read markdown file
            console.log('📖 Reading markdown file...');
            const markdown = fs.readFileSync(CONFIG.markdownFile, 'utf8');
            
            // Parse questions and images
            console.log('🔍 Parsing questions and images...');
            this.parseMarkdown(markdown);
            
            // Create output directory
            if (!fs.existsSync(CONFIG.outputDir)) {
                fs.mkdirSync(CONFIG.outputDir);
                console.log(`📁 Created directory: ${CONFIG.outputDir}`);
            }
            
            // Extract and save images
            console.log('\n💾 Extracting images...');
            await this.saveImages();
            
            // Save metadata
            console.log('\n📊 Saving metadata...');
            this.saveMetadata();
            
            // Print summary
            this.printSummary();
            
        } catch (error) {
            console.error('❌ Error:', error.message);
            process.exit(1);
        }
    }
    
    /**
     * Parse markdown to find questions and image references
     */
    parseMarkdown(text) {
        const lines = text.split('\n');
        const questions = [];
        let currentDate = null;
        
        // First pass: collect date-image pairs
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Match date headers
            const dateMatch = line.match(/^##\s+(.+)$/);
            if (dateMatch) {
                const dateStr = dateMatch[1].trim();
                if (dateStr && !dateStr.startsWith('![') && dateStr.length > 3 && /[a-zA-Z0-9]/.test(dateStr)) {
                    currentDate = dateStr;
                }
            }
            
            // Match image references
            const imageMatch = line.match(/!\[.*?\]\[(image\d+)\]/);
            if (imageMatch && currentDate) {
                questions.push({
                    id: questions.length + 1,
                    date: currentDate,
                    imageRef: imageMatch[1]
                });
                currentDate = null;
            }
        }
        
        // Second pass: collect base64 image data
        const imageData = {};
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Match image data: [imageX]: <data:image/png;base64,...>
            const imageDataMatch = line.match(/\[(image\d+)\]:\s*<(data:image\/([^;]+);base64,([^>]+))>/);
            if (imageDataMatch) {
                const imageRef = imageDataMatch[1];
                const mimeType = imageDataMatch[3];
                const base64Data = imageDataMatch[4];
                
                imageData[imageRef] = {
                    mimeType,
                    base64: base64Data
                };
            }
        }
        
        // Combine questions with image data
        this.metadata = questions.map(q => ({
            ...q,
            imageData: imageData[q.imageRef],
            filename: `problem_${String(q.id).padStart(3, '0')}.png`,
            ocrText: null,
            solution: null,
            verified: false
        }));
        
        console.log(`✅ Found ${this.metadata.length} questions with images`);
    }
    
    /**
     * Save all images to disk
     */
    async saveImages() {
        let saved = 0;
        let skipped = 0;
        
        for (const item of this.metadata) {
            if (!item.imageData) {
                console.log(`⚠️  Problem #${item.id}: No image data found`);
                skipped++;
                continue;
            }
            
            const filepath = path.join(CONFIG.outputDir, item.filename);
            
            try {
                // Convert base64 to buffer
                const buffer = Buffer.from(item.imageData.base64, 'base64');
                
                // Save to file
                fs.writeFileSync(filepath, buffer);
                
                saved++;
                if (saved % 10 === 0) {
                    console.log(`  ✓ Saved ${saved} images...`);
                }
            } catch (error) {
                console.error(`  ❌ Problem #${item.id}: ${error.message}`);
                skipped++;
            }
        }
        
        console.log(`\n✅ Saved ${saved} images, ${skipped} skipped`);
    }
    
    /**
     * Save metadata JSON for tracking
     */
    saveMetadata() {
        const metadata = this.metadata.map(item => ({
            id: item.id,
            date: item.date,
            imageRef: item.imageRef,
            filename: item.filename,
            filepath: path.join(CONFIG.outputDir, item.filename),
            ocrText: item.ocrText,
            solution: item.solution,
            verified: item.verified
        }));
        
        fs.writeFileSync(
            CONFIG.metadataFile,
            JSON.stringify(metadata, null, 2)
        );
        
        console.log(`✅ Saved metadata to ${CONFIG.metadataFile}`);
    }
    
    /**
     * Print summary statistics
     */
    printSummary() {
        console.log('\n' + '='.repeat(50));
        console.log('📊 EXTRACTION SUMMARY');
        console.log('='.repeat(50));
        console.log(`Total Questions: ${this.metadata.length}`);
        console.log(`Images Extracted: ${fs.readdirSync(CONFIG.outputDir).length}`);
        console.log(`Output Directory: ${CONFIG.outputDir}/`);
        console.log(`Metadata File: ${CONFIG.metadataFile}`);
        console.log('\n✨ Next Steps:');
        console.log('  1. Run OCR on images (see ocr-workflow.md)');
        console.log('  2. Review OCR results');
        console.log('  3. Add solutions via solution-entry.html');
        console.log('  4. Verify solutions');
        console.log('='.repeat(50) + '\n');
    }
}

// Run if called directly
if (require.main === module) {
    const extractor = new ImageExtractor();
    extractor.extract().catch(console.error);
}

module.exports = ImageExtractor;

