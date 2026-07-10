import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { Reveal } from '@/components/Reveal';
import {
    ShieldCheck,
    AlertTriangle,
    Brain,
    Eye,
    Rocket,
    Leaf,
    Cookie,
    Cherry,
    Droplets,
    CircleDot,
} from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'Neau Tropics Mushroom Chocolates | Buy Neau Tropics Online',
    description:
        'Learn why Neau Tropics mushroom chocolates have become the most sought-after artisanal psilocybin edibles. Discover their unique flavor pairings, dosage precision, and how to verify authenticity.',
    alternates: {
        canonical: 'https://officialfusionshroombar.com/neau-tropics',
    },
};

const STATS = [
    { value: 'Boutique', label: 'Artisanal craft' },
    { value: '4000mg', label: 'Per bar potency' },
    { value: 'Lab tested', label: 'Verified batches' },
    { value: '5+ flavors', label: 'Unique profiles' },
];

const FLAVORS = [
    {
        icon: Leaf,
        name: 'Matcha Yuzu',
        tag: 'Vegan',
        desc: 'Earthy Japanese matcha with bright, tart yuzu citrus. Bitterness masks mushroom flavor while citrus provides an uplifting sensory cue.',
    },
    {
        icon: Cookie,
        name: 'Cookies & Cream',
        tag: 'Classic',
        desc: 'Crushed organic chocolate cookies folded into rich white chocolate that melts effortlessly on the tongue.',
    },
    {
        icon: Cherry,
        name: 'Strawberry Shortcake',
        tag: 'Fruity',
        desc: 'Freeze-dried organic strawberries for satisfying crunch against a smooth white chocolate matrix.',
    },
    {
        icon: Droplets,
        name: 'Sea Salt Caramel',
        tag: 'Savory-sweet',
        desc: 'Dark chocolate with caramel ribbons and coarse sea salt flakes that burst with complex flavor.',
    },
    {
        icon: CircleDot,
        name: 'Classic Dark 72%',
        tag: 'Purist',
        desc: 'Dark cacao acts as a mild natural MAOI, potentially deepening and stabilizing the psilocybin experience.',
    },
];

const DOSAGE_TIERS = [
    {
        icon: Brain,
        tier: 'Microdose',
        range: '1–2 squares',
        desc: 'Sub-perceptual effects for daily integration. Work, code, or socialize comfortably with a lifted mood and quieter inner critic.',
        link: { href: '/microdosing-chocolate', label: 'Microdosing guide' },
    },
    {
        icon: Eye,
        tier: 'Museum dose',
        range: '4–6 squares',
        desc: 'The sweet spot for recreation. Vibrant colors, enhanced tactile sensations, euphoria and giggling — ideal for nature walks or gatherings.',
    },
    {
        icon: Rocket,
        tier: 'Deep dive',
        range: '7+ squares',
        desc: 'A profound classical psychedelic journey with closed-eye visuals, deep introspection, and intense temporal shifts. Experienced users only.',
    },
];

const COUNTERFEIT_WARNINGS = [
    'Identical wrappers sold empty and filled with cheap chocolate',
    'Synthetic 4-AcO-DMT sprayed instead of real psilocybin',
    'Sold on Telegram/Instagram without verifiable lab results',
];

export default function NeauTropicsLanding() {
    return (
        <div className={styles.guidePage}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <Reveal delay={0.1}>
                        <span className="section-label">Brand guide</span>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <h1>Neau Tropics mushroom chocolates</h1>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className={styles.lead}>
                            Artisanal psilocybin edibles at the apex of culinary artistry — boutique
                            flavor pairings, precise dosing, and a sensory ritual from start to finish.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <div className={styles.heroActions}>
                            <Link
                                href="/shop?category=Neau%20Tropics"
                                className="btn btn-primary btn-mobile-full"
                            >
                                Shop Neau Tropics
                            </Link>
                            <Link href="/shop" className="btn btn-secondary btn-mobile-full">
                                All products
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Quick answer */}
            <section id="answer" aria-label="Quick answer" className={styles.answerCapsule}>
                <div className={styles.answerInner}>
                    <strong>Quick answer:</strong> Neau Tropics are boutique, artisanal psilocybin
                    mushroom chocolates known for unique flavor profiles and liquid-extraction precision
                    dosing. Buy authentic Neau Tropics from verified retailers with lab-tested batches.
                </div>
            </section>

            {/* Stats */}
            <section className={styles.statsStrip}>
                <div className={styles.container}>
                    <div className={styles.statsGrid}>
                        {STATS.map((item, i) => (
                            <Reveal key={item.label} delay={i * 0.08}>
                                <div className={styles.statItem}>
                                    <div className={styles.statValue}>{item.value}</div>
                                    <div className={styles.statLabel}>{item.label}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className={styles.contentSection}>
                <div className={styles.containerNarrow}>
                    <Reveal>
                        <div className={styles.prose}>
                            <p>
                                In the rapidly expanding universe of premium psychedelic edibles, one
                                name consistently emerges at the apex of culinary artistry:{' '}
                                <Link href="/shop?category=Neau%20Tropics">Neau Tropics</Link>. Born
                                from deep reverence for mycological science and passion for high-end
                                confectionery,{' '}
                                <a
                                    href="https://en.wikipedia.org/wiki/Belgian_chocolate"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Belgian chocolate
                                </a>
                                -infused mushroom bars have redefined what a trip can taste and feel like.
                            </p>
                            <p>
                                While <Link href="/shop">Fusion Shroom Bars</Link> set the industry
                                standard for mass-scale precision and accessibility,{' '}
                                <strong>Neau Tropics</strong> carve out a boutique niche for the
                                psychonaut who views plant medicine as an aesthetic and sensory ritual.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* What makes special */}
            <section className={styles.splitSection}>
                <div className={styles.container}>
                    <div className={styles.splitGrid}>
                        <div className={styles.splitImage}>
                            <Reveal fill>
                                <Image
                                    src="/images/fusion-boxes.jpg"
                                    alt="Premium Neau Tropics mushroom chocolate bars"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 968px) 100vw, 50vw"
                                />
                            </Reveal>
                        </div>
                        <div className={styles.splitText}>
                            <Reveal delay={0.1}>
                                <span className="section-label">The craft</span>
                                <h2>What makes Neau Tropics special?</h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <div className={styles.prose}>
                                    <p>
                                        Every aspect is designed to elevate the psychedelic experience —
                                        from sleek minimalist packaging to an incredible array of flavor
                                        profiles. They have cracked the code on gourmet psilocybin delivery.
                                    </p>
                                    <p>
                                        What separates a <strong>Neau Tropics mushroom chocolate</strong>{' '}
                                        is proprietary homogenization. Raw mushroom grinding creates hot
                                        spots where one square does nothing and the next sends you into
                                        the stratosphere.
                                    </p>
                                    <p>
                                        Neau Tropics uses advanced liquid extraction — stripping chitin and
                                        blending pure psilocybin seamlessly into cocoa butter so every
                                        square contains identical micro-milligram dosage.
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Flavors */}
            <section className={styles.flavorSection}>
                <div className={styles.container}>
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <span className="section-label">Flavors</span>
                            <h2>Exploring Neau Tropics flavor profiles</h2>
                            <p className={styles.sectionDesc}>
                                Beyond basic milk and dark chocolate — complex, multi-layered culinary
                                profiles that push the boundaries of psychedelic confectionery.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.flavorGrid}>
                        {FLAVORS.map((item, i) => (
                            <Reveal key={item.name} delay={i * 0.08}>
                                <div className={styles.flavorCard}>
                                    <div className={styles.flavorHeader}>
                                        <div className={styles.flavorIcon}>
                                            <item.icon size={18} />
                                        </div>
                                        <span className={styles.flavorTag}>{item.tag}</span>
                                    </div>
                                    <h3>{item.name}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.3}>
                        <p className={styles.flavorNote}>
                            Dark chocolate&apos;s natural MAOI properties are covered in our{' '}
                            <Link href="/mushroom-chocolate-bars">mushroom chocolate guide</Link>.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Dosing */}
            <section className={styles.dosingSection}>
                <div className={styles.container}>
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <span className="section-label">Dosage</span>
                            <h2>How to safely dose Neau Tropics</h2>
                            <p className={styles.sectionDesc}>
                                A standard Neau Tropics bar contains 4 grams (4,000mg) of active
                                psilocybin extract, divided into equal squares.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.dosingGrid}>
                        {DOSAGE_TIERS.map((item, i) => (
                            <Reveal key={item.tier} delay={i * 0.1}>
                                <div className={styles.dosingCard}>
                                    <div className={styles.dosingIcon}>
                                        <item.icon size={18} />
                                    </div>
                                    <span className={styles.dosingRange}>{item.range}</span>
                                    <h3>{item.tier}</h3>
                                    <p>
                                        {item.desc}
                                        {'link' in item && item.link && (
                                            <>
                                                {' '}
                                                <Link href={item.link.href}>{item.link.label}</Link>.
                                            </>
                                        )}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Counterfeits */}
            <section className={styles.warningSection}>
                <div className={styles.containerNarrow}>
                    <Reveal>
                        <span className="section-label">Stay safe</span>
                        <h2>Beware of counterfeit Neau Tropics</h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className={styles.prose}>
                            <p>
                                The immense popularity of <strong>Neau Tropics</strong> has led to
                                massive counterfeiting. Manufacturers flood marketplaces with identical
                                wrappers filled with low-quality chocolate sprayed with synthetic
                                4-AcO-DMT.
                            </p>
                            <p>
                                Vendors on Telegram or Instagram selling at suspiciously cheap prices
                                without lab results are almost certainly dangerous fakes. Genuine products
                                use heavy cardstock, high-fidelity foil stamping, and verifiable security
                                tags.
                            </p>
                            <p>
                                When Neau Tropics are out of stock, many connoisseurs turn to{' '}
                                <Link href="/shop">Fusion Shroom Bars</Link> as a highly consistent
                                premium alternative.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.25}>
                        <ul className={styles.warningList}>
                            {COUNTERFEIT_WARNINGS.map((warning) => (
                                <li key={warning}>
                                    <AlertTriangle size={16} />
                                    <span>{warning}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal delay={0.35}>
                        <div className={styles.callout}>
                            <ShieldCheck size={18} />
                            <p>
                                Shop only from verified retailers. Authentic Neau Tropics and Fusion
                                products are available with third-party lab testing at our official store.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CTA */}
            <Reveal>
                <section className={styles.finalCta}>
                    <div className={styles.ctaContent}>
                        <h2>Ready to experience artisanal edibles?</h2>
                        <p>
                            Explore our curated collection of guaranteed authentic, third-party
                            lab-tested Neau Tropics and Fusion products with secure, discreet worldwide
                            shipping.
                        </p>
                        <Link href="/shop?category=Neau%20Tropics" className="btn btn-primary">
                            Shop authentic edibles
                        </Link>
                    </div>
                </section>
            </Reveal>

            <section className="cross-links" style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
                <h3>Explore more</h3>
                <p>Helpful resources for Neau Tropics and psilocybin chocolate.</p>
                <div className="link-pills">
                    <Link href="/shop" className="link-pill">
                        Browse all products
                    </Link>
                    <Link href="/mushroom-chocolate-bars" className="link-pill">
                        Product guide
                    </Link>
                    <Link href="/microdosing-chocolate" className="link-pill">
                        Dosing guide
                    </Link>
                    <Link href="/buy-shroom-bars" className="link-pill">
                        Where to buy
                    </Link>
                    <Link href="/faq" className="link-pill">
                        FAQ
                    </Link>
                </div>
            </section>
        </div>
    );
}
