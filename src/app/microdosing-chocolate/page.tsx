import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { PAGE_SEO } from '@/lib/keywords';
import { Reveal } from '@/components/Reveal';
import {
    Brain,
    Sparkles,
    Heart,
    Users,
    Zap,
    Calendar,
    FlaskConical,
    Scale,
} from 'lucide-react';

export const revalidate = 3600;

const seo = PAGE_SEO['/microdosing-chocolate'];

export const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
        canonical: 'https://officialfusionshroombar.com/microdosing-chocolate',
    },
};

const DOSAGE_STATS = [
    { value: '0.1–0.3g', label: 'Standard microdose' },
    { value: '1 square', label: 'Per Fusion bar dose' },
    { value: '1 on / 2 off', label: 'Fadiman protocol' },
    { value: '15 squares', label: 'Per 4000mg bar' },
];

const BENEFITS = [
    {
        icon: Brain,
        title: 'Enhanced neuroplasticity',
        desc: 'Promotes new neural pathways, helping break rigid negative thought loops linked to depression and OCD.',
    },
    {
        icon: Zap,
        title: 'Focus & flow states',
        desc: 'A non-jittery alternative to stimulants for deep, sustained productivity and creative work.',
    },
    {
        icon: Heart,
        title: 'Mood stabilization',
        desc: 'Gently lifts mild depression and dysthymia, making space for gratitude and emotional resilience.',
    },
    {
        icon: Users,
        title: 'Empathy & sociability',
        desc: 'Helps overcome social anxiety and connect more authentically in everyday settings.',
    },
    {
        icon: Sparkles,
        title: 'Physical vitality',
        desc: 'Cleaner, brighter energy without the mid-afternoon crash associated with caffeine or stimulants.',
    },
];

const PROTOCOLS = [
    {
        icon: Calendar,
        title: 'The Fadiman Protocol',
        subtitle: 'Best for beginners',
        schedule: '1 day on, 2 days off',
        desc: 'Developed by Dr. James Fadiman, this is the most popular protocol. Take one square on Monday morning, rest Tuesday and Wednesday, then dose again Thursday.',
    },
    {
        icon: FlaskConical,
        title: 'The Stamets Stack',
        subtitle: 'Advanced synergy',
        schedule: '4 days on, 3 days off',
        desc: 'Paul Stamets combines psilocybin with Lion\'s Mane and Niacin (B3). The stack is theorized to push neurogenic benefits throughout the nervous system.',
    },
];

export default function MicrodosingChocolateLanding() {
    return (
        <div className={styles.guidePage}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <Reveal delay={0.1}>
                        <span className="section-label">Dosing guide</span>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <h1>Chocolate dosing &amp; microdosing guide</h1>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className={styles.lead}>
                            A precise, delicious way to tap into the cognitive benefits of psilocybin —
                            without a full hallucinogenic trip.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <div className={styles.heroActions}>
                            <Link href="/shop" className="btn btn-primary btn-mobile-full">
                                Shop Fusion bars
                            </Link>
                            <Link href="/faq" className="btn btn-secondary btn-mobile-full">
                                Read FAQ
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Quick answer */}
            <section id="answer" aria-label="Quick answer" className={styles.answerCapsule}>
                <div className={styles.answerInner}>
                    <strong>Quick answer:</strong> Chocolate dosing is consuming precisely measured
                    psilocybin via scored mushroom chocolate squares. A standard microdose is 0.1–0.3g
                    dried mushroom equivalent — typically one square of a fusion shroom bar — taken on
                    a structured protocol for focus and wellness.
                </div>
            </section>

            {/* Dosage stats */}
            <section className={styles.statsStrip}>
                <div className={styles.container}>
                    <div className={styles.statsGrid}>
                        {DOSAGE_STATS.map((item, i) => (
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
                                A quiet revolution is happening across the world, from Silicon Valley
                                boardrooms to quiet suburban homes. The ancient stigmas surrounding
                                psychedelics are melting away, replaced by profound scientific curiosity
                                and remarkable therapeutic results. At the center of this revolution is{' '}
                                <strong>microdosing chocolate</strong> — an elegant, precise, and
                                delicious way to tap into the cognitive benefits of{' '}
                                <a
                                    href="https://en.wikipedia.org/wiki/Psilocybin"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    psilocybin
                                </a>{' '}
                                without experiencing a full hallucinogenic trip.
                            </p>
                            <p>
                                Whether you are deeply entrenched in the psychedelic community or
                                completely new to plant medicine, understanding the mechanics, protocols,
                                and benefits of{' '}
                                <Link href="/shop">microdosing magic mushrooms</Link> via precisely dosed
                                chocolate bars can fundamentally alter your approach to mental wellness
                                and productivity.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* What is microdosing */}
            <section className={styles.splitSection}>
                <div className={styles.container}>
                    <div className={styles.splitGrid}>
                        <div className={styles.splitImage}>
                            <Reveal fill>
                                <Image
                                    src="/images/fusion-bars-hand.jpg"
                                    alt="Fusion shroom bars for microdosing"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 968px) 100vw, 50vw"
                                />
                            </Reveal>
                        </div>
                        <div className={styles.splitText}>
                            <Reveal delay={0.1}>
                                <span className="section-label">The basics</span>
                                <h2>What exactly is microdosing?</h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <div className={styles.prose}>
                                    <p>
                                        Microdosing involves consuming a sub-perceptual amount of a
                                        psychedelic substance. &ldquo;Sub-perceptual&rdquo; is the key
                                        phrase: the goal is <em>not</em> to see fractals or feel highly
                                        intoxicated. If you feel visually stimulated, you have taken too
                                        much.
                                    </p>
                                    <p>
                                        A true microdose works in the background of your consciousness —
                                        often presenting as a &ldquo;good day&rdquo; where you feel more
                                        present, less anxious, and more capable of connecting ideas. With{' '}
                                        <strong>microdosing chocolate</strong>, you achieve consistency
                                        because the active compound is homogenized throughout the cocoa
                                        matrix.
                                    </p>
                                    <p>
                                        For psilocybin, a standard microdose ranges between 0.1g and 0.3g
                                        of dried mushroom equivalent. Our{' '}
                                        <Link href="/">Official Fusion Shroom Bars</Link>, with 4g total
                                        divided into 15 squares, yield roughly 266mg per square — the
                                        perfect microdose.
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className={styles.benefitsSection}>
                <div className={styles.container}>
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <span className="section-label">Benefits</span>
                            <h2>The proven benefits of microdosing psilocybin</h2>
                            <p className={styles.sectionDesc}>
                                Anecdotal reports from tens of thousands of users are increasingly backed
                                by clinical studies from Johns Hopkins University and Imperial College
                                London.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.benefitsGrid}>
                        {BENEFITS.map((item, i) => (
                            <Reveal key={item.title} delay={i * 0.08}>
                                <div className={styles.benefitCard}>
                                    <div className={styles.benefitIcon}>
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

            {/* Protocols */}
            <section className={styles.protocolSection}>
                <div className={styles.container}>
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <span className="section-label">Protocols</span>
                            <h2>Establishing a microdosing protocol</h2>
                            <p className={styles.sectionDesc}>
                                Do not microdose every day. Scheduled protocols prevent tolerance
                                buildup and keep the experience potent over the long term.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.protocolGrid}>
                        {PROTOCOLS.map((item, i) => (
                            <Reveal key={item.title} delay={i * 0.1}>
                                <div className={styles.protocolCard}>
                                    <div className={styles.protocolIcon}>
                                        <item.icon size={18} />
                                    </div>
                                    <span className={styles.protocolSubtitle}>{item.subtitle}</span>
                                    <h3>{item.title}</h3>
                                    <div className={styles.protocolSchedule}>{item.schedule}</div>
                                    <p>{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why chocolate */}
            <section className={styles.contentSection}>
                <div className={styles.containerNarrow}>
                    <Reveal>
                        <span className="section-label">Why chocolate</span>
                        <h2>Why chocolate is the ultimate vehicle</h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className={styles.prose}>
                            <p>
                                For decades, microdosing required a digital jeweler&apos;s scale,
                                manually grinding dried mushrooms, and packing gel capsules. Not only was
                                this tedious, but highly inaccurate — cap potency varies wildly from stem
                                potency.
                            </p>
                            <p>
                                <strong>Microdosing chocolate</strong> solves this completely. Pure
                                psilocybin extract is homogenized into heated cocoa butter, ensuring
                                every millimeter has identical molecular density of the active compound.
                            </p>
                            <p>
                                The rich fats in{' '}
                                <a
                                    href="https://en.wikipedia.org/wiki/Belgian_chocolate"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Belgian chocolate
                                </a>{' '}
                                slow digestion for a smooth, gradual onset instead of a rapid spike. For
                                more on mushroom chocolate science, see our{' '}
                                <Link href="/faq">Frequently Asked Questions</Link>.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.25}>
                        <div className={styles.callout}>
                            <div className={styles.calloutIcon}>
                                <Scale size={18} />
                            </div>
                            <div>
                                <h3>Precision matters</h3>
                                <p>
                                    Every Fusion bar is scored into equal squares with lab-verified
                                    potency — no scale, no guesswork, no inconsistent doses.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CTA */}
            <Reveal>
                <section className={styles.finalCta}>
                    <div className={styles.ctaContent}>
                        <h2>Start your microdosing journey</h2>
                        <p>
                            Precision dosing meets gourmet flavor. Explore our collection of premium,
                            perfectly-scored Fusion mushroom chocolate bars designed for safe and
                            consistent microdosing.
                        </p>
                        <Link href="/shop" className="btn btn-primary">
                            Shop Fusion bars
                        </Link>
                    </div>
                </section>
            </Reveal>

            <section className="cross-links" style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
                <h3>Explore more</h3>
                <p>Helpful resources for your microdosing journey.</p>
                <div className="link-pills">
                    <Link href="/shop" className="link-pill">
                        Browse products
                    </Link>
                    <Link href="/faq" className="link-pill">
                        FAQ
                    </Link>
                    <Link href="/about" className="link-pill">
                        About Fusion
                    </Link>
                    <Link href="/blog" className="link-pill">
                        Read the blog
                    </Link>
                    <Link href="/contact" className="link-pill">
                        Contact support
                    </Link>
                </div>
            </section>
        </div>
    );
}
