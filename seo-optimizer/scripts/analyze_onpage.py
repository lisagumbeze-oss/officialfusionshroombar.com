import os
import json
import sys
import re
from pathlib import Path

def analyze_onpage(directory_path):
    root_dir = Path(directory_path)
    if not root_dir.exists() or not root_dir.is_dir():
        print(json.dumps({"error": f"Invalid directory path: {directory_path}"}))
        sys.exit(1)
        
    analysis_results = {
        "files_analyzed": 0,
        "issues_found": []
    }
    
    # Target common web file types
    extensions_to_check = ['.html', '.htm', '.jsx', '.tsx', '.js', '.ts']
    
    for ext in extensions_to_check:
        for file_path in root_dir.rglob(f"*{ext}"):
            try:
                # Skip node_modules and hidden folders
                if 'node_modules' in file_path.parts or any(p.startswith('.') for p in file_path.parts):
                    continue
                    
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                analysis_results["files_analyzed"] += 1
                file_issues = []
                
                # Check for basic HTML elements (crude regex matching for both HTML and JSX/TSX)
                # Next.js App Router metadata is handled differently, making it harder to detect via simple regex,
                # but we'll check for generic missing tags or explicit <title> definitions.
                has_title = re.search(r'<title>.*?</title>|title:\s*[\'"].*?[\'"]|metadata\s*[:=]\s*\{', content, re.IGNORECASE | re.DOTALL)
                has_meta_desc = re.search(r'<meta.*?name=["\']description["\'].*?>|description:\s*[\'"].*?[\'"]', content, re.IGNORECASE)
                has_h1 = re.search(r'<h1.*?>.*?</h1>', content, re.IGNORECASE | re.DOTALL)
                
                # Check images for alt text
                images = re.findall(r'<img[^>]+>', content, re.IGNORECASE)
                images_without_alt = [img for img in images if 'alt=' not in img.lower()]
                
                if not has_title:
                    file_issues.append("Missing <title> tag or metadata object")
                if not has_meta_desc:
                    file_issues.append("Missing meta description")
                if not has_h1:
                    file_issues.append("Missing <h1> tag")
                if images_without_alt:
                    file_issues.append(f"Found {len(images_without_alt)} `<img>` tags missing `alt` attributes")
                    
                if file_issues:
                    analysis_results["issues_found"].append({
                        "file": str(file_path.relative_to(root_dir)),
                        "issues": file_issues
                    })
                    
            except Exception as e:
                 # Silently skip files that can't be read
                continue
                
    print(json.dumps(analysis_results, indent=2))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Please provide a directory path to analyze."}))
        sys.exit(1)
        
    target_dir = sys.argv[1]
    analyze_onpage(target_dir)
