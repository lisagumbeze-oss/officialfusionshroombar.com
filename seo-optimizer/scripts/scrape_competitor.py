import requests
from bs4 import BeautifulSoup
import json
import sys
import re
from collections import Counter

def scrape_competitor(url):
    try:
        if not url.startswith('http'):
            url = f"https://{url}"
            
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract basic SEO metadata
        title = soup.title.string if soup.title else ""
        meta_description = ""
        desc_tag = soup.find('meta', attrs={'name': 'description'})
        if desc_tag:
            meta_description = desc_tag.get('content', '')
            
        # Extract headings
        h1s = [h1.get_text(strip=True) for h1 in soup.find_all('h1')]
        h2s = [h2.get_text(strip=True) for h2 in soup.find_all('h2')]
        h3s = [h3.get_text(strip=True) for h3 in soup.find_all('h3')]
        
        # Simple keyword extraction (word frequency)
        text = soup.get_text(" ", strip=True)
        words = re.findall(r'\b[a-zA-Z]{4,}\b', text.lower())
        
        # Filter out common stop words
        stop_words = {'that', 'this', 'with', 'from', 'your', 'have', 'what', 'about', 'which', 'their', 'there', 'they', 'will', 'would', 'could', 'should', 'these', 'those'}
        words = [w for w in words if w not in stop_words]
        
        word_counts = Counter(words)
        top_keywords = [{'keyword': w, 'frequency': c} for w, c in word_counts.most_common(20)]
        
        data = {
            'url': url,
            'title': title,
            'meta_description': meta_description,
            'headings': {
                'h1': h1s,
                'h2': h2s,
                'h3': h3s
            },
            'top_keywords': top_keywords
        }
        
        print(json.dumps(data, indent=2))
        
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'Please provide a URL to scrape.'}))
        sys.exit(1)
        
    target_url = sys.argv[1]
    scrape_competitor(target_url)
