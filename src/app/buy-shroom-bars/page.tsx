import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { PAGE_SEO } from '@/lib/keywords';
import { Reveal } from '@/components/Reveal';
import {
    ShieldCheck,
    FlaskConical,
    Headphones,
    Truck,
    Bitcoin,
    Smartphone,
    Wallet,
    AlertTriangle,
    QrCode,
    Factory,
    Lock,
} from 'lucide-react';

export const revalidate = 3600;

const seo = PAGE_SEO['/buy-shroom-bars'];

export const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
        canonical: 'https://officialfusionshroombar.com/buy-shroom-bars',
    },
};

const STATS = [
    { value: 'Official', label: 'Authorized retailer' },
    { value: 'Lab tested', label: 'Every batch verified' },
    { value: 'Discreet', label: 'Plain packaging' },
    { value: 'Worldwide', label: 'Tracked shipping' },
];

const TRUST_INDICATORS = [
    {
        icon: FlaskConical,
        title: 'Readily available lab tests',
        desc: 'Third-party testing for psilocybin potency, heavy metals, and mycotoxins on every batch.',
    },
    {
        icon: Headphones,
        title: 'Responsive customer support',
        desc: 'Real human support via email with clear shipping protocols.',
        link: { href: '/contact', label: 'Contact us' },
    },
    {
        icon: Truck,
        title: 'Secure, tracked shipping',
        desc: 'Discreet vacuum-sealed Mylar packaging with delivery tracking and stealth protocols.',
    },
];

const PAYMENT_METHODS = [
    {
        icon: Bitcoin,
        title: 'Cryptocurrency',
        subtitle: 'Bitcoin, Ethereum, USDT',
        desc: 'The gold standard for discrete psychedelic commerce — cryptographic privacy for buyer and seller.',
    },
    {
        icon: Smartphone,
        title: 'CashApp & Zelle',
        subtitle: 'Instant transfers',
        desc: 'Extremely popular for stateside buyers, offering fast and secure peer-to-peer payments.',
    },
    {
        icon: Wallet,
        title: 'Apple Pay & Chime',
        subtitle: 'P2P applications',
        desc: 'Bypass traditional high-risk gateway fees with trusted mobile payment platforms.',
    },
];

const COUNTERFEIT_WARNINGS = [
    'Empty branded boxes sold in bulk and filled with cheap chocolate',
    'Synthetic 4-AcO-DMT instead of real psilocybin extract',
    'No holographic seals, QR codes, or lab verification',
];

export default function BuyShroomBarsLanding() {
    return (
        <div className={styles.guidePage}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <Reveal delay={0.1}>
                        <span className="section-label">Buying guide</span>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <h1>Where to buy shroom bars online</h1>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className={styles.lead}>
                            Avoid counterfeits, sketchy vendors, and scam payment pages. Here&apos;s how
                            to buy authentic, lab-tested fusion shroom bars safely.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <div className={styles.heroActions}>
                            <Link href="/shop" className="btn btn-primary btn-mobile-full">
                                Shop official store
                            </Link>
                            <Link href="/about" className="btn btn-secondary btn-mobile-full">
                                Our story
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Quick answer */}
            <section id="answer" aria-label="Quick answer" className={styles.answerCapsule}>
                <div className={styles.answerInner}>
                    <strong>Quick answer:</strong> The safest place to buy shroom bars online is directly
                    from officialfusionshroombar.com — the authorized retailer for fusion shroom bars
                    with lab-tested psilocybin, secure checkout, and discreet worldwide delivery.
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
                                If you are searching the internet trying to figure out how to{' '}
                                <strong>buy shroom bars online</strong>, you have likely encountered a
                                web of confusing vendors, sketchy payment methods, and questionable
                                products. The psychedelic renaissance has brought immense healing and joy
                                to millions, but it has also attracted bad actors capitalizing on demand
                                for psilocybin chocolate.
                            </p>
                            <p>
                                This guide educates you on purchasing{' '}
                                <a
                                    href="https://en.wikipedia.org/wiki/Psilocybin"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    psilocybin
                                </a>{' '}
                                edibles online. Whether you want our legendary{' '}
                                <Link href="/shop">Fusion Shroom Bars</Link> or are evaluating other
                                options, understanding the landscape is critical for your safety.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Counterfeits */}
            <section className={styles.splitSection}>
                <div className={styles.container}>
                    <div className={styles.splitGrid}>
                        <div className={styles.splitText}>
                            <Reveal delay={0.1}>
                                <span className="section-label">Stay safe</span>
                                <h2>The surge in counterfeit shroom bars</h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <div className={styles.prose}>
                                    <p>
                                        The number one issue when you try to{' '}
                                        <strong>buy shroom bars online</strong> is counterfeit products.
                                        As brands like Fusion gained popularity, overseas manufacturers
                                        began producing thousands of identical empty packaging boxes
                                        filled with cheap, gas-station-quality chocolate.
                                    </p>
                                    <p>
                                        These counterfeiters rarely use actual psilocybe mushrooms. They
                                        often lace chocolate with 4-AcO-DMT — a synthetic research chemical
                                        that lacks the entourage effect of whole-fungus alkaloids. The
                                        resulting experience feels synthetic, not grounded.
                                    </p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <ul className={styles.warningList}>
                                    {COUNTERFEIT_WARNINGS.map((warning) => (
                                        <li key={warning}>
                                            <AlertTriangle size={16} />
                                            <span>{warning}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        </div>
                        <div className={styles.splitImage}>
                            <Reveal fill>
                                <Image
                                    src="/images/hero-fusion.webp"
                                    alt="Authentic Fusion shroom bars — buy from official source only"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 968px) 100vw, 50vw"
                                />
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust indicators */}
            <section className={styles.trustSection}>
                <div className={styles.container}>
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <span className="section-label">What to look for</span>
                            <h2>Key indicators of a trustworthy vendor</h2>
                            <p className={styles.sectionDesc}>
                                Premium psychedelic e-commerce should feel as professional as buying
                                high-end supplements. Evaluate vendors on these criteria.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.trustGrid}>
                        {TRUST_INDICATORS.map((item, i) => (
                            <Reveal key={item.title} delay={i * 0.1}>
                                <div className={styles.trustCard}>
                                    <div className={styles.trustIcon}>
                                        <item.icon size={18} />
                                    </div>
                                    <h3>{item.title}</h3>
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
                    <Reveal delay={0.3}>
                        <div className={styles.callout}>
                            <QrCode size={18} />
                            <p>
                                True manufacturers use holographic seals, proprietary chocolate stamping,
                                and verified QR codes linking to a transparent official domain.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Payment methods */}
            <section className={styles.paymentSection}>
                <div className={styles.container}>
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <span className="section-label">Checkout</span>
                            <h2>Understanding payment methods</h2>
                            <p className={styles.sectionDesc}>
                                Traditional credit card processors ban psilocybin vendors. If a site
                                offers standard Stripe or PayPal checkout, proceed with extreme caution —
                                it may be a scam to steal card information.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.paymentGrid}>
                        {PAYMENT_METHODS.map((item, i) => (
                            <Reveal key={item.title} delay={i * 0.1}>
                                <div className={styles.paymentCard}>
                                    <div className={styles.paymentIcon}>
                                        <item.icon size={18} />
                                    </div>
                                    <span className={styles.paymentSubtitle}>{item.subtitle}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Buy direct */}
            <section className={styles.contentSection}>
                <div className={styles.containerNarrow}>
                    <Reveal>
                        <span className="section-label">Official source</span>
                        <h2>Why buying directly matters</h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className={styles.prose}>
                            <p>
                                Cutting out the middleman is the safest way to procure your chocolate.
                                Resellers on Telegram and Instagram are notorious for exit scams — taking
                                your money and blocking you immediately.
                            </p>
                            <p>
                                By ordering through an official verified website, you eliminate the
                                man-in-the-middle risk. We control manufacturing from spawn to sale:
                                mycologists extract psilocybin, chocolatiers temper Belgian chocolate,
                                and fulfillment vacuum-seals every package.
                            </p>
                            <p>
                                Read more about our safety standards and brand history on our{' '}
                                <Link href="/about">about page</Link>.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.25}>
                        <div className={styles.directBadges}>
                            <div className={styles.badge}>
                                <Factory size={18} />
                                <span>Spawn to sale</span>
                            </div>
                            <div className={styles.badge}>
                                <Lock size={18} />
                                <span>Secure checkout</span>
                            </div>
                            <div className={styles.badge}>
                                <ShieldCheck size={18} />
                                <span>Verified authentic</span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CTA */}
            <Reveal>
                <section className={styles.finalCta}>
                    <div className={styles.ctaContent}>
                        <h2>Ready to order safely?</h2>
                        <p>
                            Avoid the fakes. Skip the scammers. Buy authentic, lab-tested mushroom
                            chocolate directly from the premier manufacturer with discreet worldwide
                            shipping.
                        </p>
                        <Link href="/shop" className="btn btn-primary">
                            Browse our shop
                        </Link>
                    </div>
                </section>
            </Reveal>

            <section className="cross-links" style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
                <h3>Explore more</h3>
                <p>Helpful resources before you buy.</p>
                <div className="link-pills">
                    <Link href="/shop" className="link-pill">
                        Browse products
                    </Link>
                    <Link href="/mushroom-chocolate-bars" className="link-pill">
                        Product guide
                    </Link>
                    <Link href="/faq" className="link-pill">
                        FAQ
                    </Link>
                    <Link href="/contact" className="link-pill">
                        Contact support
                    </Link>
                    <Link href="/about" className="link-pill">
                        About Fusion
                    </Link>
                </div>
            </section>
        </div>
    );
}
