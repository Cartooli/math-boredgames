# MathBored Demo Page

## Overview
A beautiful, minimal, full-screen demo experience showcasing MathBored's core functionality through 10 simple math problems.

## Access
- **URL**: `/demo.html` or `https://math.boredgames.site/demo`
- **From Main App**: Click "Try Demo" link in the tagline

## Features

### 🎨 World-Class Design
- **Full viewport height**: Immersive, distraction-free experience
- **Minimal UI**: Focus on the problem, nothing else
- **Progressive disclosure**: Information appears only when needed
- **Smooth animations**: Polished transitions between states

### 📱 Responsive Design
- Works beautifully on all screen sizes
- Touch-optimized for mobile devices
- Adaptive typography using `clamp()` for fluid scaling

### 🎯 User Experience

#### Above the Fold
- **Single math problem**: Large, centered, impossible to miss
- **Minimal text**: Just the problem and answer field
- **No distractions**: Clean, focused interface

#### Progressive Disclosure Elements
1. **Progress indicator** (top-right): Shows current problem (1/10)
2. **Navigation hint** (top-left): Subtle back link to main app
3. **Action hint**: Appears after user starts typing
4. **Feedback**: Shows after answer submission
5. **Footer**: Fades in after 2 seconds with info about full app

### 🔢 Problem Types
- **Single-digit operations**: Addition, subtraction, multiplication, division
- **10 random problems**: New set each session
- **Clean division**: Division problems always result in whole numbers
- **Varied difficulty**: Mixed operations for engagement

### ✨ Key Interactions
1. **Type answer**: Number input with large, centered text
2. **Press Enter or click Submit**: Check answer
3. **Instant feedback**: ✓ Correct or ✗ Incorrect with correct answer
4. **Auto-progression**: Moves to next problem after 1.5 seconds
5. **Completion screen**: Shows score and accuracy

### 🎉 Completion Experience
- **Celebration animation**: Bouncing emoji and scale effect
- **Stats display**: Correct answers and accuracy percentage
- **Two CTAs**:
  - "Try Again": Restart with new problems
  - "Explore Full App": Navigate to main application

## Technical Details

### Files
- `demo.html` - Clean, semantic HTML structure
- `demo-styles.css` - World-class CSS with progressive disclosure
- `demo.js` - Problem generation and interaction logic

### Design Principles
1. **Mobile-first**: Base styles optimized for small screens
2. **Progressive enhancement**: Additional features for larger screens
3. **Accessibility**: Proper focus states, keyboard navigation
4. **Performance**: Lightweight, no dependencies, instant load

### CSS Highlights
- CSS custom properties for theming
- Fluid typography with `clamp()`
- Hardware-accelerated animations
- Print styles included

### JavaScript Features
- Class-based architecture
- Random problem generation
- State management
- Event delegation
- Smooth transitions

## Navigation Flow

```
Main App (index.html)
    ↓ "Try Demo" link
Demo Page (demo.html)
    ↓ Complete 10 problems
Completion Screen
    ↓ "Try Again" → Restart Demo
    ↓ "Explore Full App" → Main App
    ↓ "← MathBored" (nav) → Main App
```

## Performance
- **Zero dependencies**: Pure vanilla JavaScript
- **Small footprint**: ~20KB total (HTML + CSS + JS)
- **Instant load**: No external resources
- **Smooth animations**: 60fps transitions

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Android)
- Progressive enhancement for older browsers

## Future Enhancements
- [ ] Difficulty selection
- [ ] Timer mode
- [ ] Sound effects toggle
- [ ] Share results
- [ ] Dark/light theme toggle

