import Image from 'next/image';
import styles from './page.module.css';
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import prisma from '@/lib/prisma';
import AddToCartButton from '@/components/AddToCartButton';
import { Reveal } from '@/components/Reveal';

export default async function Home() {
  let bestsellers = [];
  try {
    const products = await (prisma as any).product.findMany({
      where: { isActive: true },
      take: 8,
      orderBy: { createdAt: 'desc' }
    });
    bestsellers = products;
  } catch (error) {
    console.error('[Home] Failed to fetch bestsellers:', error);
    // Keep bestsellers as empty array so page doesn't crash
  }

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image src="/images/hero-fusion.png" alt="Fusion Hero" fill style={{ objectFit: 'cover' }} className={styles.heroImg} />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <Reveal delay={0.2}>
            <p className={styles.subtitle}>FUSION MUSHROOM BARS OFFICIAL</p>
          </Reveal>
          <Reveal delay={0.4}>
            <h1 className={styles.title}>
              The Gold Standard of<br />Fusion Edibles
            </h1>
          </Reveal>
          <Reveal delay={0.6}>
            <p className={styles.heroText}>
              Fusion Shroom Bars are the highest quality Belgian chocolate psilocybin bars on the market. Experience a clean, pure, and elevated journey with our precisely dosed gourmet collection.
            </p>
          </Reveal>
          <Reveal delay={0.8}>
            <div className={styles.buttons}>
              <Link href="/shop" className={`${styles.button} ${styles.primaryBtn}`}>
                BROWSE COLLECTION
              </Link>
              <Link href="/about" className={`${styles.button} ${styles.secondaryBtn} glass-morphism`}>
                THE FUSION STORY
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust Badges */}
      <section className={styles.trustBadges}>
        <Reveal delay={0.2}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🔬</span>
            <h3>PURE PSILOCYBIN</h3>
            <p>Clean extraction for a pure experience.</p>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🍫</span>
            <h3>BELGIAN CHOCOLATE</h3>
            <p>Hand-crafted with gourmet ingredients.</p>
          </div>
        </Reveal>
        <Reveal delay={0.6}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🚀</span>
            <h3>ELEVATED JOURNEY</h3>
            <p>Perfect for micro or macro dosing.</p>
          </div>
        </Reveal>
      </section>

      {/* About Teaser */}
      <section className={styles.aboutTeaser}>
        <div className={styles.container}>
          <div className={styles.teaserGrid}>
            <div className={styles.teaserImage}>
               <Reveal>
                 <Image src="/images/fusion-bars-hand.jpg" alt="Fusion Bars" width={600} height={400} style={{ objectFit: 'cover', borderRadius: '15px' }} />
               </Reveal>
            </div>
            <div className={styles.teaserText}>
              <Reveal delay={0.2}>
                <h2>Masterful Fusion. Pure Perfection.</h2>
              </Reveal>
              <Reveal delay={0.4}>
                <p>
                  Our mission at Fusion is to provide a safe, consistent, and undeniably delicious way to explore the world of psilocybin. Each bar is a masterpiece of Belgian confectionery expertise and modern extraction science.
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <p>
                  Whether you seek spiritual growth, creative breakthroughs, or simply a refined weekend escape, Fusion Shroom Bars deliver the precision you deserve.
                </p>
              </Reveal>
              <Reveal delay={0.6}>
                <ul>
                  <li>✓ Organic Psilocybin Extract</li>
                  <li>✓ 4000mg & 6000mg Variants</li>
                  <li>✓ Precise Dosage Breakdown</li>
                  <li>✓ 100% Discrete Shipping</li>
                </ul>
              </Reveal>
              <Reveal delay={0.7}>
                <Link href="/about" className={styles.learnMore}>DISCOVER OUR LAB PROCESS &rarr;</Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className={styles.bestsellers}>
        <Reveal>
          <div className={styles.sectionHeader}>
            <div className={styles.headerTitle}>
              <p>SHOP THE BEST</p>
              <h2>OUR BESTSELLERS</h2>
            </div>
            <Link href="/shop" className={styles.browseAll}>View All <span>&rarr;</span></Link>
          </div>
        </Reveal>
        
        <div className={styles.productGrid}>
          {bestsellers.map((product: any, index: number) => (
            <Reveal key={product.id} delay={index * 0.1}>
              <div className={styles.productCard}>
                <div className={styles.productImageWrapper}>
                  <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} unoptimized />
                  {product.regularPrice && product.regularPrice > product.price && (
                    <span className={styles.saleTag}>SALE</span>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.categoryLabel}>{product.category}</div>
                  <h3 className={styles.productTitle}>{product.name}</h3>
                  <div className={styles.price}>
                    {product.regularPrice && (
                      <span className={styles.oldPrice}>${product.regularPrice.toFixed(2)}</span>
                    )}
                    <span className={styles.newPrice}>${product.price.toFixed(2)}</span>
                  </div>
                  <div className={styles.buttonGroup}>
                    <Link href={`/shop/${product.slug}`} className={`${styles.button} premium-gradient ${styles.viewBtn}`}>
                      VIEW
                    </Link>
                    <AddToCartButton product={product} className={styles.cartBtn} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <Reveal>
        <section className={styles.finalCta}>
           <div className={styles.ctaContent}>
              <h2>Join the Future of Psychedelics</h2>
              <p>Elevate your consciousness with Fusion. Browse our latest collection of world-class shroom bars and gummies.</p>
              <Link href="/shop" className="premium-gradient">START YOUR ORDER</Link>
           </div>
        </section>
      </Reveal>
    </div>
  );
}
