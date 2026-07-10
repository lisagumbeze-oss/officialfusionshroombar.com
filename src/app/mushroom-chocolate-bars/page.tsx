import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { PAGE_SEO } from '@/lib/keywords';
import { Reveal } from '@/components/Reveal';
import {
    ShieldCheck,
    Sparkles,
    Brain,
    Palette,
    Mountain,
    Star,
    QrCode,
    Nfc,
    Package,
    FileCheck,
} from 'lucide-react';

export const revalidate = 3600;

const seo = PAGE_SEO['/mushroom-chocolate-bars'];

export const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
        canonical: 'https://officialfusionshroombar.com/mushroom-chocolate-bars',
    },
};

const STATS = [
    { value: 'Lab tested', label: 'Every batch verified' },
    { value: '4000mg+', label: 'Precise potency' },
    { value: 'Belgian', label: 'Premium chocolate' },
    { value: 'Worldwide', label: 'Discreet shipping' },
];

const DOSAGE_TIERS = [
    {
        icon: Brain,
        tier: 'Microdose',
        range: '0.1g – 0.3g',
        squares: '1–2 squares',
        desc: 'Sub-perceptual dose for enhanced focus, lateral thinking, and reduced anxiety. Popular with creatives and those managing treatment-resistant depression.',
    },
    {
        icon: Palette,
        tier: 'Creative / social',
        range: '0.8g – 1.5g',
        squares: '3–6 squares',
        desc: 'Hyper-saturated colors, deeper music appreciation, and spontaneous laughter. Ideal for hiking, concerts, and connecting with close friends.',
    },
    {
        icon: Mountain,
        tier: 'Macrodose',
        range: '2.0g – 3.5g',
        squares: 'Half to full bar',
        desc: 'Full psychedelic experience requiring preparation, comfortable set and setting, and ideally a sober trip sitter. Expect visual hallucinations and deep introspection.',
    },
    {
        icon: Star,
        tier: 'Heroic dose',
        range: '4.0g – 5.0g+',
        squares: 'Full bar+',
        desc: 'Reserved strictly for experienced psychonauts seeking mystical experiences, ego dissolution, and deep spiritual recalibration. Exercise extreme caution.',
    },
];

const QUALITY_CHECKS = [
    {
        icon: QrCode,
        title: 'Verified QR codes',
        desc: 'Link directly to the official manufacturer website for batch authentication.',
    },
    {
        icon: Nfc,
        title: 'NFC tags',
        desc: 'Embedded Near Field Communication tags inside premium packaging.',
    },
    {
        icon: Package,
        title: 'Clean foil wrapping',
        desc: 'Professional inner foil — never cheap plastic wrap found on counterfeits.',
    },
    {
        icon: FileCheck,
        title: 'Transparent lab results',
        desc: 'Heavy metal testing and exact alkaloid profiles published for every batch.',
    },
];

export default function MushroomChocolateBarsLanding() {
    return (
        <div className={styles.guidePage}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <Reveal delay={0.1}>
                        <span className="section-label">Product guide</span>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <h1>Psychedelic mushroom edibles &amp; chocolate bars</h1>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className={styles.lead}>
                            Lab-tested psilocybin infused into premium Belgian chocolate — precise,
                            delicious, and free from the nausea of raw mushrooms.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <div className={styles.heroActions}>
                            <Link href="/shop" className="btn btn-primary btn-mobile-full">
                                Shop collection
                            </Link>
                            <Link href="/microdosing-chocolate" className="btn btn-secondary btn-mobile-full">
                                Dosing guide
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Quick answer */}
            <section id="answer" aria-label="Quick answer" className={styles.answerCapsule}>
                <div className={styles.answerInner}>
                    <strong>Quick answer:</strong> Psychedelic mushroom edibles are psilocybin-infused
                    food products — most commonly chocolate bars — that deliver precise, lab-tested doses
                    of psilocybin. Fusion shroom bars are among the most trusted psilocybin edible
                    products available online.
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
                                The world of psychedelic wellness is rapidly evolving, and at the
                                forefront of this revolution are <strong>mushroom chocolate bars</strong>.
                                For decades, those seeking the profound benefits of psilocybin had to
                                endure the earthy taste of raw dried mushrooms, which frequently caused
                                gastrointestinal distress and nausea. Today, modern extraction techniques
                                combined with artisanal confectionery have entirely transformed the
                                experience.
                            </p>
                            <p>
                                Premium products like our{' '}
                                <Link href="/shop">Fusion Shroom Bars</Link> seamlessly blend precisely
                                dosed psilocybin extract with high-quality{' '}
                                <a
                                    href="https://en.wikipedia.org/wiki/Belgian_chocolate"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Belgian chocolate
                                </a>
                                . This fusion creates an incredibly delicious delivery mechanism with
                                unparalleled consistency and safety.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Science */}
            <section className={styles.splitSection}>
                <div className={styles.container}>
                    <div className={styles.splitGrid}>
                        <div className={styles.splitImage}>
                            <Reveal fill>
                                <Image
                                    src="/images/fusion-boxes.jpg"
                                    alt="Fusion mushroom chocolate bars collection"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 968px) 100vw, 50vw"
                                />
                            </Reveal>
                        </div>
                        <div className={styles.splitText}>
                            <Reveal delay={0.1}>
                                <span className="section-label">The science</span>
                                <h2>Why cocoa and psilocybin pair perfectly</h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <div className={styles.prose}>
                                    <p>
                                        The ancient Aztecs called magic mushrooms &ldquo;Teonanácatl&rdquo;
                                        (flesh of the gods) and consumed them alongside bitter cacao. Modern
                                        science confirms what they knew: cocoa is a mild MAO inhibitor that
                                        slows psilocybin breakdown in the stomach.
                                    </p>
                                    <p>
                                        Chocolate&apos;s natural lipids act as a smooth buffer, allowing
                                        alkaloids to enter the bloodstream steadily rather than
                                        aggressively — reducing the harsh come-up anxiety of raw shrooms.
                                    </p>
                                    <p>
                                        Premium extract-based bars also remove chitin, the rigid polymer in
                                        fungal cell walls that causes stomach cramps. Brands like{' '}
                                        <Link href="/shop">Fusion</Link> eliminate this problem entirely
                                        through liquid extraction.
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dosing */}
            <section className={styles.dosingSection}>
                <div className={styles.container}>
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <span className="section-label">Dosage</span>
                            <h2>How to safely dose mushroom chocolate bars</h2>
                            <p className={styles.sectionDesc}>
                                Lab-tested bars with exact potency eliminate the dangerous guesswork of
                                raw mushrooms. Always start low and go slow — effects take 30–90 minutes
                                to onset.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.dosingGrid}>
                        {DOSAGE_TIERS.map((item, i) => (
                            <Reveal key={item.tier} delay={i * 0.08}>
                                <div className={styles.dosingCard}>
                                    <div className={styles.dosingIcon}>
                                        <item.icon size={18} />
                                    </div>
                                    <div className={styles.dosingMeta}>
                                        <span className={styles.dosingRange}>{item.range}</span>
                                        <span className={styles.dosingSquares}>{item.squares}</span>
                                    </div>
                                    <h3>{item.tier}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.3}>
                        <div className={styles.goldenRule}>
                            <Sparkles size={18} />
                            <p>
                                <strong>Golden rule:</strong> Wait at least 90 minutes before considering
                                more. For microdosing protocols, see our{' '}
                                <Link href="/microdosing-chocolate">dosing guide</Link>.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Quality */}
            <section className={styles.qualitySection}>
                <div className={styles.container}>
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <span className="section-label">Authenticity</span>
                            <h2>Identifying real quality</h2>
                            <p className={styles.sectionDesc}>
                                As mushroom chocolate bars surge in popularity, a dangerous black market
                                has emerged. Unscrupulous operators fill counterfeit packaging with
                                synthetic 4-AcO-DMT instead of real psilocybin.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.qualityGrid}>
                        {QUALITY_CHECKS.map((item, i) => (
                            <Reveal key={item.title} delay={i * 0.08}>
                                <div className={styles.qualityCard}>
                                    <div className={styles.qualityIcon}>
                                        <item.icon size={18} />
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.3}>
                        <div className={styles.callout}>
                            <ShieldCheck size={18} />
                            <p>
                                Fusion takes the guesswork out of the equation. Shop only at{' '}
                                <strong>officialfusionshroombar.com</strong> — the authorized source
                                for authentic, lab-tested mushroom chocolate bars.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Flavors */}
            <section className={styles.contentSection}>
                <div className={styles.containerNarrow}>
                    <Reveal>
                        <span className="section-label">Flavors</span>
                        <h2>Exploring flavor profiles</h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className={styles.prose}>
                            <p>
                                Blending gourmet chocolate with psilocybin opens an infinite array of
                                flavor profiles. The earthy undertones of magic mushrooms pair beautifully
                                with specific culinary elements.
                            </p>
                            <p>
                                Dark chocolate (70% cocoa or above) remains the preferred base due to its
                                natural MAOI properties, but the industry has seen massive innovation —
                                from creamy milk chocolate and salted caramel to vegan matcha and strawberry
                                profiles. The best brands ensure properly tempered chocolate with a
                                satisfying snap when broken.
                            </p>
                            <p>
                                To dive deeper into psilocybin wellness,{' '}
                                <Link href="/blog">read our blog</Link> for microdosing protocols, new
                                scientific studies, and product reviews.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CTA */}
            <Reveal>
                <section className={styles.finalCta}>
                    <div className={styles.ctaContent}>
                        <h2>Ready to elevate your mind?</h2>
                        <p>
                            Explore the official collection of ultra-premium, lab-tested mushroom chocolate
                            bars. We proudly ship safely, securely, and discreetly worldwide.
                        </p>
                        <Link href="/shop" className="btn btn-primary">
                            Shop premium bars
                        </Link>
                    </div>
                </section>
            </Reveal>

            <section className="cross-links" style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
                <h3>Explore more</h3>
                <p>Helpful resources for mushroom chocolate bars.</p>
                <div className="link-pills">
                    <Link href="/shop" className="link-pill">
                        Browse products
                    </Link>
                    <Link href="/microdosing-chocolate" className="link-pill">
                        Dosing guide
                    </Link>
                    <Link href="/faq" className="link-pill">
                        FAQ
                    </Link>
                    <Link href="/about" className="link-pill">
                        About Fusion
                    </Link>
                    <Link href="/buy-shroom-bars" className="link-pill">
                        Where to buy
                    </Link>
                </div>
            </section>
        </div>
    );
}
