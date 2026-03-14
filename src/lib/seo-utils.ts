/**
 * SEO Utility for Official Fusion Shroom Bars
 * Handles automatic generation of keywords, alt text, and meta fields.
 */

export interface SEOContent {
  targetKeyword: string;
  seoKeywords: string;
  seoTitle: string;
  seoDescription: string;
  imageAlt: string;
}

export function generateSEO(name: string, description: string, category: string): SEOContent {
  // Clean up name for keyword use
  const cleanName = name.replace(/Official|Fusion|Shroom|Bar|Chocolate/gi, '').trim();
  const targetKeyword = `${name} Fusion Bar`.trim();
  
  // Build keywords list
  const keywordSet = new Set([
    name.toLowerCase(),
    category.toLowerCase(),
    "fusion bars",
    "fusion shroom bars",
    "fusion mushroom bars",
    "neau tropics",
    "fusion chocolate bar",
    "magic mushroom chocolate",
    "psilocybin edibles"
  ]);

  if (cleanName) {
    keywordSet.add(`${cleanName.toLowerCase()} fusion`);
    keywordSet.add(`buy ${cleanName.toLowerCase()}`);
  }

  const seoTitle = `${name} | Official Fusion Shroom Bars`;
  const seoDescription = description.length > 155 
    ? description.substring(0, 152) + "..." 
    : description;
    
  const imageAlt = `${name} - Official Fusion Shroom Bar ${category} Image`;

  return {
    targetKeyword,
    seoKeywords: Array.from(keywordSet).join(', '),
    seoTitle,
    seoDescription,
    imageAlt
  };
}
