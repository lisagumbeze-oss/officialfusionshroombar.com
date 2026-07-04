/**
 * SEO Utility for Official Fusion Shroom Bars
 * Handles automatic generation of keywords, alt text, and meta fields.
 */

import { GLOBAL_KEYWORDS, SITE_PRIMARY_KEYWORD } from './keywords';

export interface SEOContent {
  targetKeyword: string;
  seoKeywords: string;
  seoTitle: string;
  seoDescription: string;
  imageAlt: string;
}

export function generateSEO(name: string, description: string, category: string): SEOContent {
  const cleanName = name.replace(/Official|Fusion|Shroom|Bar|Chocolate/gi, '').trim();
  const targetKeyword = `${name} | ${SITE_PRIMARY_KEYWORD}`;
  
  const keywordSet = new Set([
    name.toLowerCase(),
    category.toLowerCase(),
    SITE_PRIMARY_KEYWORD,
    'fusion mushroom bars',
    'fusion shroom bar',
    'fusion mushroom chocolate bars',
    'fusion chocolate mushroom',
    'fusion bars mushroom',
    'neau tropics',
    'psilocybin edibles',
    ...GLOBAL_KEYWORDS.slice(0, 12),
  ]);

  if (cleanName) {
    keywordSet.add(`${cleanName.toLowerCase()} fusion shroom bars`);
    keywordSet.add(`buy ${cleanName.toLowerCase()}`);
  }

  const seoTitle = `${name} | Fusion Shroom Bars`;
  const seoDescription = description.length > 155 
    ? description.substring(0, 152) + "..." 
    : description;
    
  const imageAlt = `${name} - Fusion Shroom Bars ${category}`;

  return {
    targetKeyword,
    seoKeywords: Array.from(keywordSet).join(', '),
    seoTitle,
    seoDescription,
    imageAlt
  };
}
