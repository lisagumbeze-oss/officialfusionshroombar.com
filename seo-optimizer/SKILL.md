---
name: seo-optimizer
description: Analyze a competitor's website or target keyword, identify on-page and off-page SEO gaps, and proactively optimize the user's codebase, generate a CSV of keyword gaps, and draft backlink outreach emails. Use whenever a user asks to improve their SEO, optimize their website for search engines, or perform competitor analysis.
compatibility:
  python: ">=3.8"
---

# SEO Optimizer

A skill for completely auditing and optimizing a website's SEO presence, both on-page and off-page.

## When to Use This Skill
Use this skill whenever the user asks to:
- Optimize their website for SEO
- Improve search engine rankings
- Perform competitor SEO analysis
- Identify keyword gaps
- Fix technical SEO issues in their codebase
- Draft backlink outreach emails

## How it Works

The SEO Optimizer follows a specific 4-step workflow:

1. **Information Gathering**: Use the provided Python scripts to scrape the target competitor URL or keyword, and analyze the user's local codebase to establish a baseline.
2. **Analysis**: Synthesize the scraped competitor data and local codebase analysis to identify gaps in keywords, meta tags, and content structure.
3. **Proactive Optimization (On-Page)**: Automatically apply the recommended SEO fixes directly to the user's codebase. This includes updating or creating `<title>`, `<meta name="description">`, `<h1>` tags, semantic HTML tags, and image `alt` attributes.
4. **Outreach & Reporting (Off-Page)**: Generate a comprehensive Markdown report of the changes, a CSV file containing keyword gaps, and draft backlink outreach templates tailored to the user's niche.

## Step-by-Step Instructions

### Step 1: Information Gathering
You will need to gather data using the provided Python scripts in the `scripts/` directory.

- Ensure you understand the user's request. Identify the target URL (competitor) or the specific keywords they want to rank for.
- Also, identify the path to the user's local codebase (e.g., `src/app/`, `public/`, or `index.html`).

First, run the competitor scraping script:
```bash
python scripts/scrape_competitor.py <competitor_url_or_keyword> > .tmp/competitor_data.json
```
If the user didn't explicitly provide a competitor URL, use a tool like `search_web` to find top competitors for their target keyword, and scrape them.

Next, run the on-page analysis script on their codebase:
```bash
python scripts/analyze_onpage.py <path_to_codebase> > .tmp/onpage_analysis.json
```

### Step 2: Analysis
Read the contents of `.tmp/competitor_data.json` and `.tmp/onpage_analysis.json`. Compare the two.
Identify what the competitor is doing well that the user's codebase is lacking. Specifically look for:
- Missing or weak meta descriptions
- Missing or duplicate `H1` tags
- Poor keyword density or missing primary keywords (Keyword Gaps)
- Missing `alt` tags on images

### Step 3: Proactive Optimization (On-Page)
This is a critical step. Do not just tell the user what to do; **do it for them**.
Using your file editing tools (`replace_file_content`, `multi_replace_file_content`), directly modify the user's codebase to fix the issues identified in Step 2.
- Write compelling `<title>` and `<meta name="description">` tags that include the target keywords.
- Ensure proper heading hierarchy (`H1` -> `H2` -> `H3`).
- Add descriptive `alt` text to images.
*Important: Ensure your edits respect the framework the user is using (e.g., React `className` instead of `class`, Next.js `Metadata` API if applicable).*

### Step 4: Outreach & Reporting (Off-Page)
Generate the final deliverables for the user.

**1. Markdown Report:** Create a file named `seo_report.md` summarizing the actions taken, the reasoning behind the code edits, and recommendations for future content.

**2. Keyword Gap CSV:** Create a file named `keyword_gaps.csv` containing the keywords the competitor ranks for but the user's site does not. Format it as:
```csv
Keyword,Competitor Frequency,User Relevance,Suggested Action
seo strategy,15,High,Add to H2 in about page
...
```

**3. Backlink Outreach Emails:** Create a file named `backlink_outreach.md` containing 2-3 tailored email templates the user can send to industry blogs or directories to request a backlink. The templates should be customized based on the user's website niche (inferred from their codebase).

## Important Considerations
- **Safety First:** When making proactive code edits, ensure you do not break existing functionality or layout drastically. Focus on semantic HTML and meta tags.
- **Explain the "Why":** In your final report, explain *why* you made specific changes. SEO can seem like a black box; explaining the reasoning builds trust.
- **Tone:** Be professional, encouraging, and clear.
