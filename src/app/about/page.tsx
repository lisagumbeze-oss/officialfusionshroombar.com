import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/metadata-utils';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

export async function generateMetadata(): Promise<Metadata> {
    const fallback: Metadata = {
        title: 'About Official Fusion Shroom Bars | Our Story & Standards',
        description: 'Learn the authentic story of Fusion Shroom Bars. Discover our commitment to precision science, artisanal craftsmanship, and the industry standard for psilocybin wellness.',
    };
    return await getPageMetadata("/about", fallback);
}

export default function AboutPage() {
    return (
        <div className={styles.aboutPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <Reveal>
                        <h1>ABOUT FUSION SHROOM BARS</h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className={styles.lead}>Leading the industry in premium psychedelic edibles since 2021.</p>
                    </Reveal>
                </div>
            </section>

            {/* Content Section */}
            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        <div className={styles.textBlock}>
                            <Reveal>
                                <h2>A Legacy of Innovation</h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <p>
                                    Fusion Shroom Bars began with a vision to revolutionize the psychedelic experience. By marrying world-class Belgian confectionery with advanced herbal extraction techniques, we've created a product that stands alone at the intersection of luxury and consciousness.
                                </p>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p>
                                    Our team consists of master chocolatiers and mycological experts dedicated to the highest standards of safety and purity. We don't just sell edibles; we facilitate journeys.
                                </p>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <h2>Precision Science Meets Artisanal Craft</h2>
                            </Reveal>
                            <Reveal delay={0.5}>
                                <p>
                                    At our state-of-the-art facility, every Fusion bar undergoes a rigorous infusion process. We use 100% organic psilocybin extract, distilled to eliminate the nausea-inducing chitin found in raw mushrooms while preserving the full spectrum of beneficial compounds.
                                </p>
                            </Reveal>
                            <Reveal delay={0.6}>
                                <p>
                                    The result? A predictable, fast-acting, and exceptionally delicious experience that allows you to focus on what matters: the journey ahead.
                                </p>
                            </Reveal>
                        </div>
                        <div className={styles.imageBlock}>
                            <Reveal delay={0.3}>
                                <Image 
                                    src="/images/fusion-boxes.jpg" 
                                    alt="Fusion Shroom Bars Collection - Premium Belgian Psilocybin Mushroom Chocolate Bars and Gummies" 
                                    width={600} 
                                    height={600} 
                                    style={{ objectFit: 'cover', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} 
                                />

                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Fusion */}
            <section className={styles.values}>
                <div className={styles.container}>
                    <Reveal>
                        <h2 className={styles.centeredTitle}>WHY CHOOSE FUSION?</h2>
                    </Reveal>
                    <div className={styles.valuesGrid}>
                        <Reveal delay={0.2}>
                            <div className={styles.valueCard}>
                                <div className={styles.icon}>🔬</div>
                                <h3>Lab Tested</h3>
                                <p>Every batch is tested for purity and potency to ensure your safety and experience.</p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <div className={styles.valueCard}>
                                <div className={styles.icon}>🍫</div>
                                <h3>Belgian Chocolate</h3>
                                <p>We use only the finest responsibly sourced cacao for a smooth, rich finish.</p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.6}>
                            <div className={styles.valueCard}>
                                <div className={styles.icon}>📦</div>
                                <h3>Discreet Shipping</h3>
                                <p>Your privacy is our priority. All orders are packed in plain, unmarked boxes.</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <Reveal>
                <section className={styles.cta}>
                    <div className={styles.container}>
                        <h2>Ready to start your journey?</h2>
                        <Link href="/shop" className="premium-gradient">EXPLORE THE SHOP</Link>
                        <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                            <Link href="/faq" style={{ color: '#c9a44a', textDecoration: 'underline', fontSize: '0.9rem' }}>Read our FAQ</Link>
                            <Link href="/contact" style={{ color: '#c9a44a', textDecoration: 'underline', fontSize: '0.9rem' }}>Contact Us 24/7</Link>
                            <Link href="/blog" style={{ color: '#c9a44a', textDecoration: 'underline', fontSize: '0.9rem' }}>Visit the Blog</Link>
                        </div>
                        <p style={{ marginTop: '1.5rem', color: '#888', fontSize: '0.8rem', maxWidth: '600px', margin: '1.5rem auto 0', lineHeight: 1.6 }}>
                            Our products use organic <a href="https://en.wikipedia.org/wiki/Psilocybin" target="_blank" rel="noopener noreferrer" style={{ color: '#c9a44a' }}>psilocybin</a> extract, precision-infused into world-class <a href="https://en.wikipedia.org/wiki/Belgian_chocolate" target="_blank" rel="noopener noreferrer" style={{ color: '#c9a44a' }}>Belgian chocolate</a>.
                        </p>
                    </div>
                </section>
            </Reveal>
        </div>
    );
}
