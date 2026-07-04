/**
 * Tune Semrush-ranking blog posts with optimized SEO metadata and content.
 * Run: npx tsx scripts/tune-ranking-blog-posts.ts
 */
import { PrismaClient } from '@prisma/client';
import { BLOG_POST_SEO } from '../src/lib/keywords';

const prisma = new PrismaClient();

const POST_UPDATES: Record<
  string,
  {
    title: string;
    excerpt: string;
    targetKeyword: string;
    introHtml: string;
  }
> = {
  'how-to-microdose-with-mushroom-chocolate': {
    title: 'Microdose Mushroom Chocolate: Dosage & Chocolate Dosing Guide',
    targetKeyword: 'microdose mushroom chocolate',
    excerpt:
      'Master microdose mushroom chocolate with precise mushroom chocolate dosage, chocolate dosing protocols, and microdosing mushroom chocolate schedules using lab-tested fusion shroom bars.',
    introHtml: `
        <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
            <strong>Microdose mushroom chocolate</strong> is the most precise way to practice <strong>microdosing mushroom chocolate</strong> without scales or guesswork. This guide covers <strong>mushroom chocolate dosage</strong>, <strong>chocolate dosing</strong> protocols, and how <strong>microdose chocolate mushrooms</strong> can support focus and wellness when used responsibly.
        </p>
        <p style="margin-bottom: 2rem;">
            Whether you are new to <strong>microdosing chocolate mushrooms</strong> or refining your <strong>microdosing chocolate</strong> routine, scored fusion shroom bars make every square a consistent sub-perceptual dose. Read our companion guide on <a href="/microdosing-chocolate" style="color: #c9a44a; text-decoration: underline;">chocolate dosing</a> or <a href="/shop" style="color: #c9a44a; text-decoration: underline;">shop fusion shroom bars</a> from the official store.
        </p>
        <h2 style="font-size: 2rem; color: #fff; margin-top: 2rem; margin-bottom: 1.5rem; font-weight: 800;">Mushroom chocolate dosage: how much is a microdose?</h2>
        <p style="margin-bottom: 1.5rem;">
            A standard <strong>mushroom chocolate dosage</strong> for microdosing is 0.1–0.3 grams dried mushroom equivalent (roughly 100–300mg psilocybin extract). On fusion shroom bars divided into 15 squares, one square (~266mg) is an ideal starting <strong>chocolate dosing</strong> amount for most adults.
        </p>
        <p style="margin-bottom: 1.5rem;">
            <strong>Microdosing mushroom chocolate</strong> works best on a schedule — not daily. The Fadiman protocol (1 day on, 2 days off) prevents tolerance and keeps <strong>microdose mushroom chocolate</strong> effects subtle and sustainable.
        </p>
    `,
  },
  'magic-mushroom-edibles-guide': {
    title: 'Psychedelic Mushroom Edibles & Magic Mushroom Edibles Guide',
    targetKeyword: 'psychedelic mushroom edible',
    excerpt:
      'Your complete guide to psychedelic mushroom edibles, magic mushrooms edible safety, and psilocybin edible dosing — plus how to choose lab-tested fusion shroom bars.',
    introHtml: `
        <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
            <strong>Psychedelic mushroom edibles</strong> have become the preferred entry point for newcomers and experienced users alike. Unlike raw fungi, a quality <strong>magic mushrooms edible</strong> product delivers predictable potency, better taste, and gentler digestion — especially premium <strong>psilocybin edible</strong> chocolate bars.
        </p>
        <p style="margin-bottom: 2rem;">
            This <strong>magic mushroom edibles</strong> guide covers set and setting, first-time dosing, and how to verify authenticity. For dosing specifics, see our <a href="/mushroom-chocolate-bars" style="color: #c9a44a; text-decoration: underline;">mushroom chocolate bars guide</a> or browse <a href="/shop" style="color: #c9a44a; text-decoration: underline;">official fusion shroom bars</a>.
        </p>
        <h2 style="font-size: 2rem; color: #fff; margin-top: 2rem; margin-bottom: 1.5rem; font-weight: 800;">What are psychedelic mushroom edibles?</h2>
        <p style="margin-bottom: 1.5rem;">
            A <strong>psychedelic mushroom edible</strong> is any food infused with psilocybin extract — chocolate bars, gummies, or capsules. The best <strong>psilocybin edible</strong> products use homogenized extract so every piece contains the same dose, eliminating the variability of dried mushrooms.
        </p>
        <p style="margin-bottom: 1.5rem;">
            When choosing a <strong>magic mushrooms edible</strong>, prioritize lab-tested brands with Certificates of Analysis. Counterfeit products are widespread; buying fusion shroom bars directly from the official site is the safest path.
        </p>
    `,
  },
};

function stripOldIntro(content: string): string {
  // Remove generic SEO intro paragraphs and first specific h2 block (will be replaced)
  return content
    .replace(
      /<p style="font-size: 1\.1rem; margin-bottom: 2rem;">[\s\S]*?<\/p>\s*<p style="margin-bottom: 2rem;">[\s\S]*?<\/p>/,
      ''
    )
    .replace(
      /<h2 style="font-size: 2rem; color: #fff; margin-top: 3rem; margin-bottom: 1\.5rem; font-weight: 800;">Understanding how to microdose[\s\S]*?<\/p>\s*<p style="margin-bottom: 1\.5rem;">[\s\S]*?<\/p>/,
      ''
    )
    .replace(
      /<h2 style="font-size: 2rem; color: #fff; margin-top: 3rem; margin-bottom: 1\.5rem; font-weight: 800;">Your foundational magic mushroom edibles guide<\/h2>[\s\S]*?<p style="margin-bottom: 1\.5rem;">[\s\S]*?<\/p>/,
      ''
    );
}

function injectIntro(content: string, introHtml: string): string {
  const stripped = stripOldIntro(content);
  if (stripped.includes('<div style="font-family: sans-serif')) {
    return stripped.replace(
      /<div style="font-family: sans-serif[^"]*">/,
      `<div style="font-family: sans-serif; line-height: 1.8; color: #eee;">${introHtml}`
    );
  }
  return `<div style="font-family: sans-serif; line-height: 1.8; color: #eee;">${introHtml}${stripped}</div>`;
}

async function main() {
  for (const slug of Object.keys(POST_UPDATES)) {
    const update = POST_UPDATES[slug];
    const tuned = BLOG_POST_SEO[slug];
    if (!tuned) continue;

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (!existing) {
      console.warn(`Post not found: ${slug}`);
      continue;
    }

    const newContent = injectIntro(existing.content, update.introHtml);

    await prisma.blogPost.update({
      where: { slug },
      data: {
        title: update.title,
        excerpt: update.excerpt,
        targetKeyword: update.targetKeyword,
        seoTitle: tuned.title,
        seoDescription: tuned.description,
        seoKeywords: tuned.keywords.join(', '),
        content: newContent,
        updatedAt: new Date(),
      },
    });

    console.log(`✓ Tuned: /blog/${slug}`);
    console.log(`  Primary keyword: ${update.targetKeyword}`);
    console.log(`  Title tag: ${tuned.title}`);
  }

  console.log('\nDone. Revalidate blog pages or wait for ISR (1h).');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
