# Contributing to MathBored

Thank you for your interest in contributing to MathBored! This project is 100% free and open source, and we welcome contributions from everyone.

## 🎯 Ways to Contribute

### 1. **Report Bugs**
- Check if the bug has already been reported
- Open a new issue with a clear title and description
- Include steps to reproduce the bug
- Mention your browser and operating system

### 2. **Suggest Enhancements**
- Open an issue describing your idea
- Explain why this would be useful
- Be open to discussion and feedback

### 3. **Improve Documentation**
- Fix typos or unclear explanations
- Add examples to existing lessons
- Translate content (future feature)
- Improve README or other docs

### 4. **Add Content**
- Write new lesson content
- Create more example problems
- Add visual diagrams or illustrations
- Expand walkthrough explanations

### 5. **Code Contributions**
- Fix bugs
- Implement new features
- Improve performance
- Enhance accessibility

## 🚀 Getting Started

### Prerequisites
- A text editor (VS Code, Sublime, etc.)
- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript

### Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/math-boredgames.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test locally (just open `index.html` in a browser)
6. Commit: `git commit -m "Add your descriptive message"`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

## 📝 Code Style

### JavaScript
- Use `const` and `let`, not `var`
- Use camelCase for variables and functions
- Add comments for complex logic
- Keep functions small and focused

```javascript
// Good
const calculateArea = (width, height) => {
    return width * height;
};

// Avoid
function calc(w,h){return w*h}
```

### CSS
- Use meaningful class names
- Follow the existing pattern
- Use CSS variables for colors
- Keep selectors specific but not overly complex

```css
/* Good */
.lesson-content h2 {
    color: var(--accent);
    margin-bottom: 20px;
}

/* Avoid */
div div div h2 { color: blue; }
```

### HTML
- Use semantic HTML5 elements
- Keep it accessible (ARIA labels where needed)
- Maintain consistent indentation

## 📚 Adding Lesson Content

To add or improve lesson content, edit the `generateLessonContent()` method in `app.js`:

```javascript
const lessons = {
    "Your Topic Name": `
        <h2>Topic Title</h2>
        <p>Introduction...</p>
        
        <h3>Key Concepts</h3>
        <p>Explanation...</p>
        
        <div class="example">
            <div class="example-title">Example</div>
            <p>Your example here...</p>
        </div>
    `
};
```

### Content Guidelines
- Start with a clear introduction
- Use examples to illustrate concepts
- Include real-world applications
- Keep language clear and grade-appropriate
- Use proper mathematical notation
- Break complex topics into smaller sections

## 🧪 Testing

### Before Submitting
1. **Visual Check**: Open the app in multiple browsers
2. **Functionality**: Test all three modes (Lesson, Walkthrough, Practice)
3. **Responsive**: Check on mobile/tablet sizes
4. **Console**: Ensure no JavaScript errors
5. **Themes**: Verify your changes work with all themes

### Test Checklist
- [ ] Grade level selection works
- [ ] Topic selection updates correctly
- [ ] All three modes display properly
- [ ] Practice problems generate correctly
- [ ] Answer checking works
- [ ] Stats update properly
- [ ] Theme switching works
- [ ] Responsive on mobile
- [ ] No console errors

## 🎨 Design Principles

### User Experience
- **Simplicity**: Keep the interface clean and uncluttered
- **Feedback**: Provide immediate visual feedback for actions
- **Accessibility**: Ensure everyone can use the app
- **Performance**: Keep it fast and responsive

### Educational Philosophy
- **Clear Explanations**: Use simple, precise language
- **Progressive Difficulty**: Start easy, build complexity
- **Positive Reinforcement**: Encourage learning
- **Multiple Approaches**: Show different ways to solve problems

## 📐 Adding New Topics

To add a new math topic:

1. **Add to data.js**:
```javascript
{
    concept: "Your New Topic",
    keyFormulas: "formula here",
    keyConcepts: "key concepts",
    relatedOperations: "operations",
    relatedTopics: "related topics",
    gradeLevel: "7"
}
```

2. **Add lesson content in app.js**
3. **Add problem generator in app.js**
4. **Add walkthrough logic in app.js**
5. **Test thoroughly**

## 🐛 Reporting Issues

### Good Bug Report
```
**Title**: Practice mode doesn't work for fractions

**Description**: When I select Fractions and switch to Practice mode,
no problems are generated.

**Steps to Reproduce**:
1. Select Grade 3
2. Select "Fractions" topic
3. Click "Practice" mode
4. Page shows empty

**Expected**: Should show a fraction problem

**Browser**: Chrome 120, Windows 11
```

### Not Helpful
```
"it doesn't work"
```

## 💬 Communication

- Be respectful and constructive
- Ask questions if anything is unclear
- Provide context for your suggestions
- Be open to feedback on your contributions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

All contributors will be recognized in the project. We appreciate every contribution, no matter how small!

## ❓ Questions?

Feel free to:
- Open an issue for questions
- Reach out to maintainers
- Join discussions in pull requests

---

**Thank you for helping make math education free and accessible to everyone! 🎉**

