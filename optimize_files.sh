#!/bin/bash

# Script to optimize HTML files by removing duplicate CSS/JS and adding common resources

# Function to update vocabulary files
update_vocabulary_file() {
    local file="$1"
    echo "Processing vocabulary file: $file"
    
    # Add common CSS references
    sed -i '' 's|<link rel="manifest" href="../../manifest.json">|<link rel="manifest" href="../../manifest.json">\n    \n    <!-- Common Styles -->\n    <link rel="stylesheet" href="../../assets/css/common.css">\n    <link rel="stylesheet" href="../../assets/css/vocabulary.css">|' "$file"
    
    # Find and remove CSS block
    local style_start=$(grep -n "<style>" "$file" | head -1 | cut -d: -f1)
    local style_end=$(grep -n "</style>" "$file" | head -1 | cut -d: -f1)
    
    if [ ! -z "$style_start" ] && [ ! -z "$style_end" ]; then
        sed -i '' "${style_start},${style_end}d" "$file"
    fi
    
    # Find and replace script block
    local script_start=$(grep -n "<script>" "$file" | head -1 | cut -d: -f1)
    local script_end=$(grep -n "</script>" "$file" | head -1 | cut -d: -f1)
    
    if [ ! -z "$script_start" ] && [ ! -z "$script_end" ]; then
        sed -i '' "${script_start},${script_end}c\\
    <!-- Common JavaScript -->\\
    <script src=\"../../assets/js/common.js\"></script>" "$file"
    fi
}

# Function to update grammar files
update_grammar_file() {
    local file="$1"
    echo "Processing grammar file: $file"
    
    # Add common CSS references
    sed -i '' 's|<link rel="manifest" href="../../manifest.json">|<link rel="manifest" href="../../manifest.json">\n    \n    <!-- Common Styles -->\n    <link rel="stylesheet" href="../../assets/css/common.css">\n    <link rel="stylesheet" href="../../assets/css/grammar.css">|' "$file"
    
    # Find and remove CSS block
    local style_start=$(grep -n "<style>" "$file" | head -1 | cut -d: -f1)
    local style_end=$(grep -n "</style>" "$file" | head -1 | cut -d: -f1)
    
    if [ ! -z "$style_start" ] && [ ! -z "$style_end" ]; then
        sed -i '' "${style_start},${style_end}d" "$file"
    fi
    
    # Find and replace script block
    local script_start=$(grep -n "<script>" "$file" | head -1 | cut -d: -f1)
    local script_end=$(grep -n "</script>" "$file" | head -1 | cut -d: -f1)
    
    if [ ! -z "$script_start" ] && [ ! -z "$script_end" ]; then
        sed -i '' "${script_start},${script_end}c\\
    <!-- Common JavaScript -->\\
    <script src=\"../../assets/js/common.js\"></script>" "$file"
    fi
}

# Process all vocabulary files
echo "Processing vocabulary files..."
for file in /Users/subhankarbhattacharjee/workspaces/code/mein-german-lerner/content/vocabulary/*.html; do
    if [ -f "$file" ] && [ "$(basename "$file")" != "index.html" ]; then
        update_vocabulary_file "$file"
    fi
done

# Process all grammar files  
echo "Processing grammar files..."
for file in /Users/subhankarbhattacharjee/workspaces/code/mein-german-lerner/content/grammar/*.html; do
    if [ -f "$file" ] && [ "$(basename "$file")" != "index.html" ]; then
        update_grammar_file "$file"
    fi
done

echo "Optimization complete!"