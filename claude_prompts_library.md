# German Learning Hub - Claude Code Prompt Library

This file contains standardized prompts for managing and expanding the German Learning Hub PWA using Claude Code.

## 🚀 Project Setup Commands

### Initialize New Vocabulary Section
```bash
# Add a new vocabulary category
claude-code "Create a new vocabulary page for [CATEGORY_NAME] following the same structure as professions.html. Include:
- Consistent header navigation with breadcrumbs
- Responsive table with horizontal scroll for desktop
- Mobile accordion with expandable rows
- Download Excel functionality
- 20+ vocabulary items with German word, pronunciation, English meaning
- Category: [CATEGORY_NAME] (e.g., Animals, Colors, Family Members)
- Save as content/vocabulary/[category-name].html"
```

### Add Grammar Section
```bash
# Create new grammar topic page
claude-code "Create a grammar page for [GRAMMAR_TOPIC] following the app's design patterns:
- Consistent navigation and breadcrumbs
- Educational content with examples
- Interactive elements where appropriate
- Mobile-responsive design
- Category: [GRAMMAR_TOPIC] (e.g., Adjectives, Prepositions, Modal Verbs)
- Save as content/grammar/[topic-name].html"
```

## 📚 Content Management

### Update Vocabulary Data
```bash
# Update existing vocabulary with new words
claude-code "Update content/vocabulary/[CATEGORY].html by adding these new German words:
[WORD_LIST]
Maintain the existing table structure and mobile accordion. Update the Excel download function with new data."
```

### Generate Excel Data
```bash
# Create CSV content for new vocabulary
claude-code "Generate CSV content for German [CATEGORY] vocabulary with these columns:
German Word, English Meaning, Article (der/die/das), Pronunciation, Category, Example Sentence
Include 30+ items for [CATEGORY]"
```

## 🎨 Design & Layout

### Update Navigation
```bash
# Add new section to navigation
claude-code "Update all navigation menus across the app to include new section: [SECTION_NAME]
Update files: index.html, content/vocabulary/index.html, content/grammar/index.html, content/practice/index.html
Maintain consistent styling and active states"
```

### Mobile Optimization
```bash
# Improve mobile responsiveness
claude-code "Review and enhance mobile responsiveness for [PAGE_NAME]:
- Optimize table horizontal scrolling
- Improve accordion interactions
- Ensure touch-friendly button sizes
- Test navigation on small screens"
```

## 🔧 Feature Enhancement

### Add Practice Features
```bash
# Create quiz functionality
claude-code "Create an interactive quiz page for [VOCABULARY_CATEGORY]:
- Multiple choice questions
- Pronunciation practice
- Progress tracking
- Score display
- Responsive design matching app theme
- Save as content/practice/[category]-quiz.html"
```

### PWA Improvements
```bash
# Enhance PWA functionality
claude-code "Improve PWA features:
- Update service worker cache strategy
- Add offline indicators
- Enhance install prompts
- Add app shortcuts for new sections
- Update manifest.json with new content"
```

## 📊 Data Operations

### Bulk Content Import
```bash
# Import vocabulary from Excel/CSV
claude-code "Convert this CSV data into a German vocabulary page:
[CSV_DATA]
Create responsive table and mobile accordion following app patterns. Include download functionality."
```

### Generate Pronunciation Guides
```bash
# Add pronunciation to existing content
claude-code "Add pronunciation guides to all German words in [CATEGORY] using IPA or simplified phonetic notation. Update both table and accordion versions."
```

## 🏗️ Project Structure

### Create New Hub Page
```bash
# Create category hub (like vocabulary/index.html)
claude-code "Create a hub page for [CATEGORY] following vocabulary/index.html structure:
- Overview cards for subcategories
- Statistics section
- Download options for each subcategory
- Consistent navigation
- Mobile-responsive grid layout"
```

### File Organization
```bash
# Reorganize content structure
claude-code "Reorganize project files according to this new structure:
[NEW_STRUCTURE]
Update all internal links and navigation paths. Maintain PWA functionality."
```

## 🎯 Testing & Validation

### Cross-Platform Testing
```bash
# Test app functionality
claude-code "Create a testing checklist for the German Learning Hub:
- PWA installation on different devices
- Offline functionality test
- Navigation flow validation
- Table responsiveness across screen sizes
- Excel download functionality
- Mobile accordion interactions"
```

### Performance Optimization
```bash
# Optimize app performance
claude-code "Analyze and optimize the German Learning Hub for:
- Faster loading times
- Reduced bundle size
- Better caching strategies
- Improved mobile performance
- Efficient service worker updates"
```

## 📱 Deployment

### GitHub Pages Setup
```bash
# Deploy to GitHub Pages
claude-code "Set up GitHub Pages deployment for the German Learning Hub:
- Configure repository settings
- Create deployment workflow
- Set up custom domain (if needed)
- Ensure PWA functionality works on GitHub Pages
- Test all features in production environment"
```

### Version Management
```bash
# Update app version
claude-code "Update app version to [VERSION_NUMBER]:
- Update manifest.json version
- Update service worker cache name
- Update package.json (if exists)
- Create changelog entry
- Test cache invalidation"
```

## 🛠️ Common Maintenance Tasks

### Regular Updates
```bash
# Monthly content review
claude-code "Review and update German Learning Hub content:
- Check for outdated vocabulary
- Verify pronunciation accuracy
- Update cultural references
- Test all download functions
- Validate mobile responsiveness"
```

### Bug Fixes
```bash
# Fix specific issues
claude-code "Fix the following issue in German Learning Hub: [ISSUE_DESCRIPTION]
Maintain app consistency and test across different devices."
```

## 📝 Content Templates

### Vocabulary Page Template
Use this structure for new vocabulary pages:
- Header with navigation
- Breadcrumb navigation
- Page header with download button
- Desktop responsive table
- Mobile accordion
- Information/tips section
- JavaScript for interactions and downloads

### Grammar Page Template
Use this structure for new grammar pages:
- Header with navigation
- Breadcrumb navigation
- Educational content sections
- Examples and exercises
- Mobile-responsive design
- Interactive elements where appropriate

## 🎨 Style Guidelines

### Consistent Styling
- Use app's color scheme: #667eea to #764ba2 gradient
- Maintain glassmorphism effects with backdrop-filter
- Consistent border-radius: 8px-20px
- Box shadows: 0 15px 40px rgba(0,0,0,0.1)
- Typography: 'Segoe UI' font family

### Component Patterns
- Cards with hover effects
- Gradient buttons with transform animations
- Responsive tables with horizontal scroll
- Mobile accordion with smooth transitions
- Breadcrumb navigation
- Success notifications for downloads

---

## 🚀 Quick Start Examples

### Add Food & Drinks Vocabulary
```bash
claude-code "Create content/vocabulary/food-drinks.html with 40+ German food and drink items. Include fruits, vegetables, meals, beverages. Follow the app's design patterns with responsive table and mobile accordion."
```

### Create City Locations Page
```bash
claude-code "Create content/vocabulary/city-locations.html based on the provided german_nouns_mobile.md document. Organize by German articles (der/die/das) with responsive tables and mobile accordions."
```

### Add Grammar Hub
```bash
claude-code "Create content/grammar/index.html as a hub page for German grammar topics. Include cards for Articles, Verb Conjugation, Cases, and Word Order. Follow the vocabulary hub design pattern."
```

This prompt library ensures consistent development and easy expansion of the German Learning Hub PWA.