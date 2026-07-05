import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/metadata-utils';
import { PAGE_SEO } from '@/lib/keywords';
import Image from 'next/image';
import styles from './page.module.css';
export const revalidate = 3600;

import Link from 'next/link';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Reveal } from '@/components/Reveal';
import { FlaskConical, Truck, ShieldCheck, Sparkles } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const seo = PAGE_SEO['/'];
  const fallback: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: 'Fusion Shroom Bars | Official Premium Mushroom Chocolate',
      description: 'Shop authentic fusion shroom bars — premium Belgian psilocybin mushroom chocolate with precise dosing and discreet worldwide shipping.',
      images: ['/images/hero-fusion.png'],
    },
  };

  return await getPageMetadata('/', fallback);
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Official Fusion Shroom Bars',
  description: 'The official source for fusion shroom bars — premium psilocybin mushroom chocolate bars with lab-tested dosing.',
  url: 'https://officialfusionshroombar.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://officialfusionshroombar.com/shop?query={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const TRUST_ITEMS = [
  { icon: FlaskConical, title: 'Lab tested', desc: 'Every batch verified for purity and potency.' },
  { icon: Sparkles, title: 'Precise dosing', desc: 'Scored squares for consistent experiences.' },
  { icon: Truck, title: 'Discreet shipping', desc: 'Plain packaging worldwide to USA, UK & more.' },
  { icon: ShieldCheck, title: 'Authentic source', desc: 'Official retailer — no counterfeits.' },
];

const EXPLORE_LINKS = [
  { href: '/blog', title: 'Fusion Blog', desc: 'Psilocybin science, microdosing guides, and wellness insights.' },
  { href: '/microdosing-chocolate', title: 'Chocolate dosing guide', desc: 'Protocols, dosage, and microdosing best practices.' },
  { href: '/buy-shroom-bars', title: 'Where to buy shroom bars', desc: 'Safe online ordering with lab-tested authenticity.' },
  { href: '/faq', title: 'FAQ', desc: 'Shipping, dosing, and product questions answered.' },
];

const REVIEWS = [
  {
    text: "The most consistent bars I've tried. Dosage is incredibly precise and the Belgian chocolate actually tastes gourmet.",
    author: 'Michael T.',
    meta: 'Verified buyer · Los Angeles, CA',
  },
  {
    text: 'Life-changing for my microdosing routine. 1–2 squares a day has done more for my focus than anything else.',
    author: 'Sarah L.',
    meta: 'Verified buyer · Austin, TX',
  },
  {
    text: "Cleanest experience I've ever had — zero stomach issues. Fast stealth shipping and great support.",
    author: 'David K.',
    meta: 'Verified buyer · New York, NY',
  },
];

export default async function Home() {
  let bestsellers: any[] = [];
  try {
    bestsellers = await (prisma as any).product.findMany({
      where: { isActive: true },
      take: 8,
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('[Home] Failed to fetch bestsellers:', error);
  }

  return (
    <div className={styles.home}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <Reveal delay={0.1}>
            <span className={styles.eyebrow}>Official fusion shroom bars</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className={`${styles.title} text-gradient`}>Premium mushroom chocolate, precisely dosed</h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className={styles.heroText}>
              <strong>Fusion shroom bars</strong> combine Belgian confectionery with lab-tested psilocybin extract.
              Shop authentic fusion mushroom chocolate bars with discreet worldwide shipping.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className={styles.buttons}>
              <Link href="/shop" className="btn btn-primary btn-mobile-full">Browse collection</Link>
              <Link href="/about" className="btn btn-secondary btn-mobile-full">Our story</Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div style={{ position: 'relative' }}>
            <div className={styles.heroVisualGlow} />
            <div className={styles.heroVisual}>
            <Image
              src="/images/hero-fusion.png"
              alt="Fusion Shroom Bars — premium psilocybin mushroom chocolate"
              fill
              className={styles.heroImg}
              priority
              fetchPriority="high"
              quality={80}
              sizes="(max-width: 968px) 100vw, 50vw"
            />
            </div>
          </div>
        </Reveal>
      </section>

      {/* GEO Answer */}
      <section id="answer" aria-label="Quick Answer" className={styles.answerCapsule}>
        <div className={styles.answerInner}>
          <strong>Quick answer:</strong> Fusion shroom bars are premium Belgian chocolate infused with lab-tested psilocybin,
          available in 4000mg and 6000mg variants. Official Fusion Shroom Bars is the authentic source with discreet worldwide shipping.
        </div>
      </section>

      {/* Trust strip */}
      <section className={styles.trustStrip}>
        <div className={styles.trustInner}>
          {TRUST_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <item.icon size={18} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section className={styles.aboutTeaser}>
        <div className={styles.container}>
          <div className={styles.teaserGrid}>
            <div className={styles.teaserImage}>
              <Reveal>
                <Image
                  src="/images/fusion-bars-hand.jpg"
                  alt="Fusion shroom bars in hand"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Reveal>
            </div>
            <div className={styles.teaserText}>
              <Reveal delay={0.1}>
                <span className="section-label">Why Fusion</span>
                <h2>Masterful fusion shroom bars, crafted with care</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  Each bar is a blend of{' '}
                  <a href="https://en.wikipedia.org/wiki/Belgian_chocolate" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'underline' }}>
                    Belgian confectionery
                  </a>{' '}
                  expertise and modern extraction science — safe, consistent, and undeniably delicious.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <ul className={styles.featureList}>
                  <li>Organic psilocybin extract</li>
                  <li>4000mg &amp; 6000mg variants</li>
                  <li>Precise dosage breakdown</li>
                  <li>100% discreet shipping</li>
                </ul>
                <Link href="/about" className={styles.learnMore}>Discover our lab process →</Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className={styles.bestsellers}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <div className={styles.headerTitle}>
                <span className="section-label">Shop the best</span>
                <h2>Bestsellers</h2>
              </div>
              <Link href="/shop" className={styles.browseAll}>View all →</Link>
            </div>
          </Reveal>

          <div className={styles.productGrid}>
            {bestsellers.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className={styles.bestsellers} style={{ paddingTop: 0 }}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <div className={styles.headerTitle}>
                <span className="section-label">Learn more</span>
                <h2>Explore Fusion</h2>
              </div>
            </div>
          </Reveal>
          <div className={styles.exploreGrid}>
            {EXPLORE_LINKS.map((link, i) => (
              <Reveal key={link.href} delay={i * 0.08}>
                <Link href={link.href} className={styles.exploreCard}>
                  <h3>{link.title}</h3>
                  <p>{link.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className={styles.bestsellers} style={{ paddingTop: 0 }}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <div className={styles.headerTitle}>
                <span className="section-label">Trusted worldwide</span>
                <h2>What customers say</h2>
              </div>
            </div>
          </Reveal>
          <div className={styles.reviewsGrid}>
            {REVIEWS.map((review, i) => (
              <Reveal key={review.author} delay={i * 0.1}>
                <div className={styles.reviewCard}>
                  <div className={styles.reviewStars}>★★★★★</div>
                  <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
                  <div className={styles.reviewAuthor}>{review.author}</div>
                  <div className={styles.reviewMeta}>{review.meta}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Reveal>
        <section className={styles.finalCta}>
          <div className={styles.ctaContent}>
            <h2>Ready to try fusion shroom bars?</h2>
            <p>Browse our full collection of fusion mushroom bars, shroom chocolate, and premium gummies.</p>
            <Link href="/shop" className="btn btn-primary">Start your order</Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
