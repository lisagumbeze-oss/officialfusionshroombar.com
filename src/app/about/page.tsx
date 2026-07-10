import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/metadata-utils';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import {
    FlaskConical,
    Sparkles,
    Truck,
    ShieldCheck,
    Leaf,
    Award,
    Package,
} from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
    const fallback: Metadata = {
        title: 'About Official Fusion Shroom Bars | Our Story & Standards',
        description:
            'Learn the authentic story of Fusion Shroom Bars. Discover our commitment to precision science, artisanal craftsmanship, and the industry standard for psilocybin wellness.',
    };
    return await getPageMetadata('/about', fallback);
}

const VALUES = [
    {
        icon: FlaskConical,
        title: 'Lab tested',
        desc: 'Every batch is verified for purity, potency, and safety before it ships.',
    },
    {
        icon: Sparkles,
        title: 'Precise dosing',
        desc: 'Scored squares deliver consistent experiences you can trust.',
    },
    {
        icon: Leaf,
        title: 'Organic extract',
        desc: '100% organic psilocybin extract — no raw mushroom chitin, no nausea.',
    },
    {
        icon: Award,
        title: 'Belgian chocolate',
        desc: 'Responsibly sourced cacao for a smooth, gourmet finish.',
    },
    {
        icon: Package,
        title: 'Discreet shipping',
        desc: 'Plain, unmarked packaging with tracked worldwide delivery.',
    },
    {
        icon: ShieldCheck,
        title: 'Authentic source',
        desc: 'Official retailer — no counterfeits, no synthetic substitutes.',
    },
];

const MILESTONES = [
    { value: '2021', label: 'Founded' },
    { value: '50K+', label: 'Happy customers' },
    { value: '100%', label: 'Lab-tested batches' },
    { value: '24/7', label: 'Support available' },
];

const PROCESS_STEPS = [
    {
        step: '01',
        title: 'Organic extraction',
        desc: 'Psilocybin is distilled from organic fruiting bodies to eliminate chitin while preserving the full alkaloid spectrum.',
    },
    {
        step: '02',
        title: 'Precision infusion',
        desc: 'Extract is homogenized into Belgian chocolate at our facility for even distribution across every scored square.',
    },
    {
        step: '03',
        title: 'Third-party testing',
        desc: 'Independent labs verify potency, heavy metals, and mycotoxins before any batch is approved for sale.',
    },
    {
        step: '04',
        title: 'Discreet fulfillment',
        desc: 'Orders are vacuum-sealed and shipped in plain packaging with full tracking to your door.',
    },
];

export default function AboutPage() {
    return (
        <div className={styles.aboutPage}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <Reveal delay={0.1}>
                        <span className="section-label">Our story</span>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <h1>Premium psychedelic edibles, built on science</h1>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className={styles.heroText}>
                            Fusion Shroom Bars began in 2021 with a simple mission: marry world-class Belgian
                            confectionery with advanced herbal extraction to create the industry standard in
                            psilocybin wellness.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <div className={styles.heroActions}>
                            <Link href="/shop" className="btn btn-primary btn-mobile-full">
                                Shop collection
                            </Link>
                            <Link href="/faq" className="btn btn-secondary btn-mobile-full">
                                Read FAQ
                            </Link>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.2}>
                    <div className={styles.heroVisual}>
                        <Image
                            src="/images/fusion-boxes.jpg"
                            alt="Fusion Shroom Bars collection — premium Belgian psilocybin mushroom chocolate"
                            fill
                            className={styles.heroImg}
                            sizes="(max-width: 968px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </Reveal>
            </section>

            {/* Quick answer */}
            <section id="answer" aria-label="Quick answer" className={styles.answerCapsule}>
                <div className={styles.answerInner}>
                    <strong>Who we are:</strong> Fusion Shroom Bars is the official source for lab-tested
                    psilocybin mushroom chocolate — combining Belgian confectionery craft with precision
                    extraction science since 2021.
                </div>
            </section>

            {/* Milestones */}
            <section className={styles.milestones}>
                <div className={styles.container}>
                    <div className={styles.milestoneGrid}>
                        {MILESTONES.map((item, i) => (
                            <Reveal key={item.label} delay={i * 0.08}>
                                <div className={styles.milestoneItem}>
                                    <div className={styles.milestoneValue}>{item.value}</div>
                                    <div className={styles.milestoneLabel}>{item.label}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className={styles.storySection}>
                <div className={styles.container}>
                    <div className={styles.storyGrid}>
                        <div className={styles.storyImage}>
                            <Reveal fill>
                                <Image
                                    src="/images/fusion-bars-hand.jpg"
                                    alt="Fusion shroom bars held in hand"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 968px) 100vw, 50vw"
                                />
                            </Reveal>
                        </div>
                        <div className={styles.storyText}>
                            <Reveal delay={0.1}>
                                <span className="section-label">Our legacy</span>
                                <h2>A legacy of innovation</h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <p>
                                    Fusion Shroom Bars began with a vision to revolutionize the psychedelic
                                    experience. By marrying world-class Belgian confectionery with advanced
                                    herbal extraction techniques, we created a product that stands alone at the
                                    intersection of luxury and consciousness.
                                </p>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p>
                                    Our team consists of master chocolatiers and mycological experts dedicated
                                    to the highest standards of safety and purity. We don&apos;t just sell
                                    edibles — we facilitate journeys.
                                </p>
                            </Reveal>
                        </div>
                    </div>

                    <div className={`${styles.storyGrid} ${styles.storyGridReverse}`}>
                        <div className={styles.storyText}>
                            <Reveal delay={0.1}>
                                <span className="section-label">Our craft</span>
                                <h2>Precision science meets artisanal craft</h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <p>
                                    At our state-of-the-art facility, every Fusion bar undergoes a rigorous
                                    infusion process. We use 100% organic{' '}
                                    <a
                                        href="https://en.wikipedia.org/wiki/Psilocybin"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        psilocybin
                                    </a>{' '}
                                    extract, distilled to eliminate the nausea-inducing chitin found in raw
                                    mushrooms while preserving the full spectrum of beneficial compounds.
                                </p>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p>
                                    The result is a predictable, fast-acting, and exceptionally delicious
                                    experience that lets you focus on what matters: the journey ahead.
                                </p>
                            </Reveal>
                        </div>
                        <div className={styles.storyImage}>
                            <Reveal fill>
                                <Image
                                    src="/images/hero-fusion.webp"
                                    alt="Fusion shroom bars — premium mushroom chocolate"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 968px) 100vw, 50vw"
                                />
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className={styles.processSection}>
                <div className={styles.container}>
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <div>
                                <span className="section-label">How we make it</span>
                                <h2>From extract to your door</h2>
                            </div>
                        </div>
                    </Reveal>
                    <div className={styles.processGrid}>
                        {PROCESS_STEPS.map((step, i) => (
                            <Reveal key={step.step} delay={i * 0.1}>
                                <div className={styles.processCard}>
                                    <span className={styles.processStep}>{step.step}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className={styles.valuesStrip}>
                <div className={styles.container}>
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <div>
                                <span className="section-label">Why Fusion</span>
                                <h2>Built on trust, tested for quality</h2>
                            </div>
                        </div>
                    </Reveal>
                    <div className={styles.valuesGrid}>
                        {VALUES.map((item, i) => (
                            <Reveal key={item.title} delay={i * 0.08}>
                                <div className={styles.valueCard}>
                                    <div className={styles.valueIcon}>
                                        <item.icon size={18} />
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
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
                        <h2>Ready to start your journey?</h2>
                        <p>
                            Authentic fusion mushroom chocolate, lab-tested and shipped discreetly to your
                            door. Explore our full collection or reach out — we&apos;re here 24/7.
                        </p>
                        <Link href="/shop" className="btn btn-primary">
                            Explore the shop
                        </Link>
                    </div>
                </section>
            </Reveal>

            <section className="cross-links" style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
                <h3>Learn more</h3>
                <p>Browse helpful resources before you order.</p>
                <div className="link-pills">
                    <Link href="/faq" className="link-pill">
                        FAQ
                    </Link>
                    <Link href="/contact" className="link-pill">
                        Contact us 24/7
                    </Link>
                    <Link href="/blog" className="link-pill">
                        Visit the blog
                    </Link>
                    <Link href="/microdosing-chocolate" className="link-pill">
                        Dosing guide
                    </Link>
                </div>
                <p className={styles.disclaimer}>
                    Our products use organic{' '}
                    <a
                        href="https://en.wikipedia.org/wiki/Psilocybin"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        psilocybin
                    </a>{' '}
                    extract, precision-infused into world-class{' '}
                    <a
                        href="https://en.wikipedia.org/wiki/Belgian_chocolate"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Belgian chocolate
                    </a>
                    .
                </p>
            </section>
        </div>
    );
}
