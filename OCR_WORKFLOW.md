## 🔬 OCR & Solution Extraction Workflow

Complete guide for extracting, processing, and verifying Math Olympiad solutions.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Extract Images](#step-1-extract-images)
3. [Step 2: OCR Processing](#step-2-ocr-processing)
4. [Step 3: Manual Review](#step-3-manual-review)
5. [Step 4: Solution Entry](#step-4-solution-entry)
6. [Step 5: Verification](#step-5-verification)
7. [Batch Processing Tips](#batch-processing-tips)
8. [Quality Assurance](#quality-assurance)

---

## Prerequisites

### Required Tools
- Node.js (for image extraction script)
- OCR tool (choose one):
  - **MathPix API** (recommended for math) - [mathpix.com](https://mathpix.com)
  - **Google Cloud Vision API** - [cloud.google.com/vision](https://cloud.google.com/vision)
  - **Tesseract OCR** (free, lower accuracy) - [github.com/tesseract-ocr](https://github.com/tesseract-ocr/tesseract)

### Optional Tools
- Image editing software (for problem verification)
- LaTeX editor (for formatting math notation)
- Spreadsheet software (for tracking progress)

---

## Step 1: Extract Images

### Run the extraction script:

```bash
cd /path/to/math-boredgames
node extract-images.js
```

###Output:
```
olympiad-images/
  ├── problem_001.png
  ├── problem_002.png
  ├── problem_003.png
  └── ...
olympiad-metadata.json
```

### Verify extraction:
- Check that images are readable
- Verify count matches expected questions
- Note any missing or corrupted images

---

## Step 2: OCR Processing

### Option A: MathPix API (Recommended)

**Cost:** ~$0.004 per image = ~$0.68 for 170 images

**Setup:**
```bash
# Install MathPix CLI (optional)
npm install -g mathpix-cli

# Get API key from https://mathpix.com
```

**Process images:**
```bash
# Single image
mathpix ocr olympiad-images/problem_001.png > ocr-results/problem_001.txt

# Batch process (bash script)
for img in olympiad-images/*.png; do
  mathpix ocr "$img" > "ocr-results/$(basename "$img" .png).txt"
done
```

**Python batch script:**
```python
import os
import requests
import base64

API_KEY = 'your_api_key_here'
API_URL = 'https://api.mathpix.com/v3/text'

def ocr_image(image_path):
    with open(image_path, 'rb') as f:
        image_data = base64.b64encode(f.read()).decode()
    
    response = requests.post(
        API_URL,
        headers={'app_id': API_KEY, 'app_key': 'your_app_key'},
        json={
            'src': f'data:image/png;base64,{image_data}',
            'formats': ['text', 'latex_simplified']
        }
    )
    
    return response.json()

# Process all images
for filename in os.listdir('olympiad-images'):
    if filename.endswith('.png'):
        result = ocr_image(f'olympiad-images/{filename}')
        # Save result
        with open(f'ocr-results/{filename}.json', 'w') as f:
            json.dump(result, f, indent=2)
```

### Option B: Google Cloud Vision API

**Cost:** Free tier: 1,000 images/month

**Setup:**
```bash
# Install Google Cloud CLI
pip install google-cloud-vision

# Authenticate
gcloud auth application-default login
```

**Batch process:**
```python
from google.cloud import vision
import io

client = vision.ImageAnnotatorClient()

for filename in os.listdir('olympiad-images'):
    with io.open(f'olympiad-images/{filename}', 'rb') as f:
        content = f.read()
    
    image = vision.Image(content=content)
    response = client.text_detection(image=image)
    
    with open(f'ocr-results/{filename}.txt', 'w') as out:
        out.write(response.text_annotations[0].description)
```

### Option C: Tesseract OCR (Free)

**Install:**
```bash
# Mac
brew install tesseract

# Ubuntu/Debian
sudo apt-get install tesseract-ocr

# Windows
# Download from https://github.com/UB-Mannheim/tesseract/wiki
```

**Batch process:**
```bash
for img in olympiad-images/*.png; do
  tesseract "$img" "ocr-results/$(basename "$img" .png)" --psm 6
done
```

**Note:** Tesseract has lower accuracy for mathematical notation. Manual review is critical.

---

## Step 3: Manual Review

### Review OCR output for each problem:

1. **Open image side-by-side with OCR text**
2. **Correct errors:**
   - Math notation (fractions → `a/b`, exponents → `x^2`)
   - Special symbols (√, π, ∑, ∫)
   - Greek letters (α, β, θ)
   - Variable names (distinguish O vs 0, l vs 1)

3. **Format consistently:**
   ```
   Problem: [exact problem statement]
   Given: [what's provided]
   Find: [what to solve for]
   ```

4. **Save corrected version:**
   ```
   ocr-results-reviewed/
     ├── problem_001_reviewed.txt
     └── ...
   ```

### Quality checklist per problem:
- [ ] Problem statement complete
- [ ] Math notation correct
- [ ] Numbers accurate
- [ ] Diagrams described (if applicable)
- [ ] Special conditions noted

---

## Step 4: Solution Entry

### Use the solution entry interface:

1. **Open:** `solution-entry.html` in browser
2. **Select question** from list
3. **Enter solution data:**
   - Answer
   - Step-by-step solution
   - Explanation
   - Method used
   - Hints

4. **Save** and **move to next**

### Batch entry tips:
- Process 10-20 problems per session
- Take breaks to maintain accuracy
- Use keyboard shortcuts (Tab, Enter)
- Save frequently

### Solution format example:
```json
{
  "answer": "42",
  "answerType": "numeric",
  "steps": [
    "Identify the given information: a=3, b=7",
    "Apply the formula: answer = 6(a+b)",
    "Calculate: answer = 6(3+7) = 6(10) = 60",
    "Wait, recalculate: actually 42"
  ],
  "explanation": "This is a classic problem involving...",
  "method": "algebraic",
  "hints": [
    "Think about what formula applies",
    "Remember to distribute correctly"
  ]
}
```

---

## Step 5: Verification

### Verification methods:

#### Self-verification:
- Solve problem independently
- Compare with entered solution
- Check answer makes sense

#### External verification:
- Search Art of Problem Solving forums
- Check competition solution keys
- Consult math olympiad books

#### Peer review:
- Have another person verify
- Use solution-entry.html review mode
- Mark as verified only when confident

### Verification checklist:
- [ ] Answer is correct
- [ ] Steps are logical and complete
- [ ] No arithmetic errors
- [ ] Explanation is clear
- [ ] Hints don't give away answer
- [ ] Source cited (if applicable)

---

## Batch Processing Tips

### Efficient workflow:

**Session structure** (2-hour block):
```
10 problems per session × 12 sessions = 120 problems
Remaining 50 = 5 more sessions

Total: ~34 hours for 170 problems
```

**Per problem timeline:**
- OCR review: 3-5 minutes
- Solution entry: 10-15 minutes
- Verification: 5-10 minutes
- **Total: ~20 minutes/problem**

### Productivity tips:
1. **Batch similar problems** (same topic/difficulty)
2. **Use templates** for common problem types
3. **Set daily goals** (e.g., 10 problems/day)
4. **Track progress** in spreadsheet
5. **Take breaks** every 45 minutes
6. **Verify in separate session** (fresh eyes)

### Progress tracking spreadsheet:
```
| ID | Date | OCR Done | Solution Done | Verified | Notes |
|----|------|----------|---------------|----------|-------|
| 1  | May  | ✓        | ✓             | ✓        |       |
| 2  | May  | ✓        | ✓             | ✗        | Check step 3 |
...
```

---

## Quality Assurance

### Error prevention:
- **Double-check arithmetic** in solutions
- **Verify units** (if applicable)
- **Test edge cases** in explanations
- **Read hints** to ensure they help but don't spoil

### Common errors to watch for:
- Typos in numbers (6 vs 9, 3 vs 8)
- Missing negative signs
- Incorrect order of operations
- Dropped exponents
- Misread fractions

### Quality metrics:
- **Target: 95%+ accuracy**
- Sample 10% of solutions for audit
- Re-verify any flagged problems
- Update verification status in metadata

---

## Automation Scripts

### Python helper to merge OCR + solutions:
```python
import json
import os

# Load metadata
with open('olympiad-metadata.json') as f:
    metadata = json.load(f)

# Load solutions
with open('solutions.json') as f:
    solutions = json.load(f)

# Merge OCR text with solutions
for item in metadata:
    qid = str(item['id'])
    
    # Load OCR text
    ocr_file = f'ocr-results-reviewed/problem_{qid:03d}_reviewed.txt'
    if os.path.exists(ocr_file):
        with open(ocr_file) as f:
            item['problemText'] = f.read()
    
    # Add solution if exists
    if qid in solutions:
        item['solution'] = solutions[qid]

# Save merged data
with open('olympiad-complete.json', 'w') as f:
    json.dump(metadata, f, indent=2)
```

---

## Next Steps

After completing OCR and solution entry:

1. **Update olympiad-app.js** to display solutions
2. **Add solution toggle** to UI
3. **Enable solution search**
4. **Add difficulty tagging** based on solutions
5. **Create solution quality report**

---

## Resources

### Math OCR Services:
- **MathPix:** https://mathpix.com
- **Google Cloud Vision:** https://cloud.google.com/vision
- **Tesseract:** https://github.com/tesseract-ocr/tesseract

### Solution Sources:
- **Art of Problem Solving:** https://artofproblemsolving.com
- **Math Stack Exchange:** https://math.stackexchange.com
- **IMO Official:** https://www.imo-official.org

### LaTeX Help:
- **Overleaf:** https://www.overleaf.com/learn
- **Detexify:** http://detexify.kirelabs.org/classify.html

---

## Support

Questions or issues?
- Check `solution-entry.html` for inline help
- Review `olympiad-solutions.js` API documentation
- Open GitHub issue for technical problems

Good luck with the solution extraction! 🎯

