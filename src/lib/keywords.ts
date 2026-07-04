/**
 * Semrush keyword map — updated July 2026
 * Primary site keyword: fusion shroom bars (720/mo)
 */

export const SITE_PRIMARY_KEYWORD = 'fusion shroom bars';
export const BRAND_NAME = 'Official Fusion Shroom Bars';
export const BASE_URL = 'https://officialfusionshroombar.com';

/** All tracked Semrush keywords sorted by search volume */
export const SEMRUSH_KEYWORDS = [
  { keyword: 'fusion shroom bars', volume: 720, intent: 'informational', page: '/' },
  { keyword: 'fusion mushroom bars', volume: 720, intent: 'navigational', page: '/shop' },
  { keyword: 'chocolate dosing', volume: 590, intent: 'informational', page: '/microdosing-chocolate' },
  { keyword: 'fusion shroom bar', volume: 260, intent: 'informational', page: '/' },
  { keyword: 'microdose mushroom chocolate', volume: 140, intent: 'informational', page: '/microdosing-chocolate' },
  { keyword: 'fusion.bars', volume: 110, intent: 'informational', page: '/' },
  { keyword: 'fusion mushroom chocolate bars', volume: 110, intent: 'commercial', page: '/' },
  { keyword: 'fusion chocolate mushroom', volume: 110, intent: 'informational', page: '/shop' },
  { keyword: 'fusion mushroom bar', volume: 110, intent: 'informational', page: '/' },
  { keyword: 'psychedelic mushroom edible', volume: 110, intent: 'informational', page: '/mushroom-chocolate-bars' },
  { keyword: 'fusion bars mushroom', volume: 90, intent: 'commercial', page: '/' },
  { keyword: 'mushroom chocolate dosage', volume: 70, intent: 'informational', page: '/microdosing-chocolate' },
  { keyword: 'microdosing mushroom chocolate', volume: 70, intent: 'informational', page: '/microdosing-chocolate' },
  { keyword: 'microdose chocolate mushrooms', volume: 70, intent: 'informational', page: '/microdosing-chocolate' },
  { keyword: 'fusion bar mushroom', volume: 50, intent: 'informational', page: '/shop' },
  { keyword: 'microdosing chocolate mushrooms', volume: 50, intent: 'informational', page: '/microdosing-chocolate' },
  { keyword: 'where to buy shroom bars', volume: 50, intent: 'transactional', page: '/buy-shroom-bars' },
  { keyword: 'fusion magic mushroom chocolate bars', volume: 40, intent: 'informational', page: '/' },
  { keyword: 'high tolerance x fusion mushroom bars', volume: 40, intent: 'commercial', page: '/' },
  { keyword: 'microdosing chocolate', volume: 40, intent: 'informational', page: '/microdosing-chocolate' },
  { keyword: 'fusion shroom chocolate', volume: 40, intent: 'commercial', page: '/' },
  { keyword: 'psilocybin edible', volume: 40, intent: 'informational', page: '/mushroom-chocolate-bars' },
  { keyword: 'magic mushrooms edible', volume: 30, intent: 'informational', page: '/mushroom-chocolate-bars' },
] as const;

export const GLOBAL_KEYWORDS = [
  SITE_PRIMARY_KEYWORD,
  'fusion mushroom bars',
  'fusion shroom bar',
  'fusion mushroom chocolate bars',
  'fusion chocolate mushroom',
  'fusion mushroom bar',
  'fusion bars mushroom',
  'fusion bar mushroom',
  'fusion shroom chocolate',
  'fusion magic mushroom chocolate bars',
  'fusion chocolate bar',
  'fusion chocolate bars',
  'fusion.bars',
  'where to buy shroom bars',
  'buy shroom bars online',
  'microdosing chocolate',
  'microdosing mushroom chocolate',
  'microdose mushroom chocolate',
  'microdose chocolate mushrooms',
  'mushroom chocolate dosage',
  'chocolate dosing',
  'psychedelic mushroom edible',
  'magic mushrooms edible',
  'psilocybin edible',
  'magic mushroom chocolate',
  'psilocybin edibles',
  'neau tropics',
  'high tolerance fusion mushroom bars',
];

export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  h1?: string;
}

export const PAGE_SEO: Record<string, PageSEO> = {
  '/': {
    title: 'Fusion Shroom Bars | Official Mushroom Chocolate',
    description:
      'Fusion Shroom Bars — the official source for premium psilocybin mushroom chocolate. Shop authentic fusion bars mushroom, fusion shroom chocolate & Neau Tropics with discreet worldwide shipping.',
    keywords: [
      SITE_PRIMARY_KEYWORD,
      'fusion shroom bar',
      'fusion mushroom bar',
      'fusion bars mushroom',
      'fusion mushroom chocolate bars',
      'fusion shroom chocolate',
      'fusion magic mushroom chocolate bars',
      'fusion.bars',
      'high tolerance fusion mushroom bars',
      'neau tropics',
    ],
    h1: 'Official Fusion Shroom Bars',
  },
  '/shop': {
    title: 'Fusion Mushroom Bars | Shop Official Collection',
    description:
      'Shop fusion mushroom bars, fusion chocolate mushroom & fusion bar mushroom online. Lab-tested Belgian psilocybin chocolate with precise dosing and discreet shipping worldwide.',
    keywords: [
      'fusion mushroom bars',
      'fusion chocolate mushroom',
      'fusion bar mushroom',
      'fusion mushroom chocolate bars',
      'buy fusion shroom bars',
      'fusion chocolate bars',
      'psilocybin edibles',
    ],
    h1: 'Shop Fusion Mushroom Bars & Mushroom Chocolate',
  },
  '/microdosing-chocolate': {
    title: 'Chocolate Dosing & Microdosing Chocolate Guide',
    description:
      'Complete guide to chocolate dosing and microdosing mushroom chocolate. Learn mushroom chocolate dosage, microdose protocols, and premium fusion shroom bars for daily wellness.',
    keywords: [
      'chocolate dosing',
      'microdose mushroom chocolate',
      'microdosing mushroom chocolate',
      'microdose chocolate mushrooms',
      'mushroom chocolate dosage',
      'microdosing chocolate mushrooms',
      'microdosing chocolate',
    ],
    h1: 'Chocolate Dosing & Microdosing Chocolate Guide',
  },
  '/buy-shroom-bars': {
    title: 'Where to Buy Shroom Bars Online | Fusion Shroom Bars',
    description:
      'Where to buy shroom bars online safely. Order authentic fusion shroom bars with lab-tested psilocybin, secure checkout, and discreet delivery to USA, UK, Canada & Australia.',
    keywords: [
      'where to buy shroom bars',
      'buy shroom bars online',
      'fusion shroom bars',
      'buy fusion mushroom bars',
    ],
    h1: 'Where to Buy Shroom Bars Online',
  },
  '/mushroom-chocolate-bars': {
    title: 'Psychedelic Mushroom Edibles & Chocolate Bars Guide',
    description:
      'Everything about psychedelic mushroom edibles and magic mushrooms edible products. Learn psilocybin edible dosing, benefits, and shop premium fusion shroom bars.',
    keywords: [
      'psychedelic mushroom edible',
      'magic mushrooms edible',
      'psilocybin edible',
      'mushroom chocolate bars',
      'fusion shroom bars',
    ],
    h1: 'Psychedelic Mushroom Edibles & Chocolate Bars',
  },
  '/blog': {
    title: 'Fusion Shroom Bars Blog | Microdosing & Edibles Guides',
    description:
      'Expert guides on microdosing chocolate, mushroom chocolate dosage, psychedelic mushroom edibles, and fusion shroom bars wellness insights from the Fusion team.',
    keywords: [
      'microdosing chocolate',
      'mushroom chocolate dosage',
      'psychedelic mushroom edible',
      'fusion shroom bars',
    ],
  },
  '/faq': {
    title: 'FAQ | Fusion Shroom Bars & Mushroom Chocolate',
    description:
      'Answers about fusion shroom bars, fusion mushroom bars, dosing, shipping, and authenticity. Your complete guide to official Fusion mushroom chocolate products.',
    keywords: [SITE_PRIMARY_KEYWORD, 'fusion mushroom bars', 'fusion shroom bar'],
  },
};

/** Per-post SEO overrides for high-ranking blog articles (Semrush July 2026) */
export const BLOG_POST_SEO: Record<string, PageSEO & { answerCapsule?: string }> = {
  'how-to-microdose-with-mushroom-chocolate': {
    title: 'Microdose Mushroom Chocolate Guide | Dosage & Dosing',
    description:
      'Learn microdose mushroom chocolate dosing, mushroom chocolate dosage, and chocolate dosing protocols. Complete guide to microdosing mushroom chocolate with fusion shroom bars.',
    keywords: [
      'microdose mushroom chocolate',
      'mushroom chocolate dosage',
      'microdosing mushroom chocolate',
      'microdose chocolate mushrooms',
      'microdosing chocolate mushrooms',
      'chocolate dosing',
      'microdosing chocolate',
      'fusion shroom bars',
    ],
    h1: 'Microdose Mushroom Chocolate: Dosage & Chocolate Dosing Guide',
    answerCapsule:
      'Microdose mushroom chocolate means consuming 0.1–0.3g dried mushroom equivalent via scored chocolate squares — typically one square of a fusion shroom bar — on a structured protocol (e.g. 1 day on, 2 days off) for sub-perceptual focus and wellness without a full trip.',
  },
  'magic-mushroom-edibles-guide': {
    title: 'Psychedelic Mushroom Edibles Guide | Psilocybin Edible',
    description:
      'Complete guide to psychedelic mushroom edibles and magic mushrooms edible products. Learn psilocybin edible safety, dosing, set & setting, and shop lab-tested fusion shroom bars.',
    keywords: [
      'psychedelic mushroom edible',
      'magic mushrooms edible',
      'psilocybin edible',
      'magic mushroom edibles',
      'fusion shroom bars',
      'mushroom chocolate bars',
    ],
    h1: 'Psychedelic Mushroom Edibles & Magic Mushroom Edibles Guide',
    answerCapsule:
      'Psychedelic mushroom edibles are psilocybin-infused foods — most commonly chocolate bars — that deliver precise, lab-tested doses. Magic mushrooms edible products like fusion shroom bars offer safer dosing than raw dried mushrooms when purchased from verified sources.',
  },
};
