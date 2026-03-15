import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/metadata-utils';
import styles from './faq.module.css';
import { faqData } from './faq-data';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Reveal } from '@/components/Reveal';

export async function generateMetadata(): Promise<Metadata> {
    const fallback: Metadata = {
        title: 'Frequently Asked Questions | Official Fusion Shroom Bars',
        description: 'Find answers to common questions about Fusion Shroom Bars, shipping, product ingredients, and authenticity. Everything you need to know about the gold standard of edibles.',
    };
    return await getPageMetadata("/faq", fallback);
}

export default function FAQPage() {
    return (
        <div className={styles.faqPage}>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <Reveal>
                        <p className={styles.subtitle}>HELP CENTER</p>
                        <h1>FREQUENTLY ASKED QUESTIONS</h1>
                    </Reveal>
                </div>
            </section>

            <section className={styles.faqSection}>
                <div className={styles.container}>
                    {faqData.map((category, idx) => (
                        <div key={idx} className={styles.categoryBlock}>
                            <Reveal delay={0.1 * idx}>
                                <h2 className={styles.categoryTitle}>{category.category}</h2>
                            </Reveal>
                            <div className={styles.accordionList}>
                                {category.questions.map((item, qIdx) => (
                                    <Reveal key={qIdx} delay={0.1 * qIdx}>
                                        <FAQAccordion question={item.question} answer={item.answer} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
