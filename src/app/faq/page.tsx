import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/metadata-utils';
import { PAGE_SEO } from '@/lib/keywords';
import styles from './faq.module.css';
import { faqData } from './faq-data';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Reveal } from '@/components/Reveal';
import Link from 'next/link';
import { Clock, Mail, ShieldCheck, Package, Truck, Info } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
    const seo = PAGE_SEO['/faq'];
    const fallback: Metadata = {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
    };
    return await getPageMetadata('/faq', fallback);
}

const CATEGORY_ICONS: Record<string, typeof Info> = {
    'General Information': ShieldCheck,
    'Product Details': Package,
    'Shipping & Returns': Truck,
};

const SUPPORT_ITEMS = [
    {
        icon: Clock,
        title: '24/7 support',
        desc: 'Our team is available around the clock to help with orders and questions.',
    },
    {
        icon: Mail,
        title: 'order@officialfusionshroombar.com',
        desc: 'Email us anytime — we typically respond within a few hours.',
    },
    {
        icon: ShieldCheck,
        title: 'Secure & discreet',
        desc: 'Encrypted checkout and plain packaging on every order.',
    },
];

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.flatMap((category) =>
        category.questions.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer,
            },
        }))
    ),
};

function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function FAQPage() {
    return (
        <div className={styles.faqPage}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <Reveal delay={0.1}>
                        <span className="section-label">Help center</span>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <h1>Frequently asked questions</h1>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className={styles.lead}>
                            Everything you need to know about ordering, dosing, shipping, and
                            authentic Fusion Shroom Bars.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <div className={styles.topicPills}>
                            {faqData.map((category) => (
                                <a
                                    key={category.category}
                                    href={`#${slugify(category.category)}`}
                                    className={styles.topicPill}
                                >
                                    {category.category}
                                </a>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Quick answer */}
            <section id="answer" aria-label="Quick answer" className={styles.answerCapsule}>
                <div className={styles.answerInner}>
                    <strong>Quick answer:</strong> Official Fusion Shroom Bars ships lab-tested
                    psilocybin chocolate discreetly worldwide. Orders are encrypted, tracked, and
                    backed by 24/7 support — shop only at officialfusionshroombar.com.
                </div>
            </section>

            {/* Support strip */}
            <section className={styles.supportStrip}>
                <div className={styles.container}>
                    <div className={styles.supportGrid}>
                        {SUPPORT_ITEMS.map((item, i) => (
                            <Reveal key={item.title} delay={i * 0.08}>
                                <div className={styles.supportItem}>
                                    <div className={styles.supportIcon}>
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
                </div>
            </section>

            {/* FAQ categories */}
            <section className={styles.faqSection}>
                <div className={styles.container}>
                    {faqData.map((category, idx) => {
                        const Icon = CATEGORY_ICONS[category.category] ?? Info;
                        const categoryId = slugify(category.category);

                        return (
                            <div key={categoryId} id={categoryId} className={styles.categoryBlock}>
                                <Reveal delay={0.1 * idx}>
                                    <div className={styles.categoryHeader}>
                                        <div className={styles.categoryIcon}>
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <span className="section-label">
                                                {category.questions.length} questions
                                            </span>
                                            <h2 className={styles.categoryTitle}>{category.category}</h2>
                                        </div>
                                    </div>
                                </Reveal>
                                <div className={styles.accordionList}>
                                    {category.questions.map((item, qIdx) => (
                                        <Reveal key={qIdx} delay={0.08 * qIdx}>
                                            <FAQAccordion
                                                question={item.question}
                                                answer={item.answer}
                                            />
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <Reveal>
                <section className={styles.finalCta}>
                    <div className={styles.ctaContent}>
                        <h2>Still have questions?</h2>
                        <p>
                            Our support team is available around the clock. Reach out anytime or
                            browse the shop for lab-tested fusion mushroom chocolate.
                        </p>
                        <Link href="/contact" className="btn btn-primary">
                            Contact us 24/7
                        </Link>
                    </div>
                </section>
            </Reveal>

            <section className="cross-links" style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
                <h3>Explore more</h3>
                <p>Helpful resources before you order.</p>
                <div className="link-pills">
                    <Link href="/shop" className="link-pill">
                        Browse products
                    </Link>
                    <Link href="/blog" className="link-pill">
                        Read our blog
                    </Link>
                    <Link href="/about" className="link-pill">
                        About Fusion
                    </Link>
                    <Link href="/microdosing-chocolate" className="link-pill">
                        Dosing guide
                    </Link>
                </div>
            </section>
        </div>
    );
}
