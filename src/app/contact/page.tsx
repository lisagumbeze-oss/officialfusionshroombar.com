import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import ContactForm from './ContactForm';
import styles from './page.module.css';
import { Clock, Mail, MapPin, ShieldCheck } from 'lucide-react';

const CONTACT_ITEMS = [
    {
        icon: Mail,
        label: 'Email us',
        value: 'order@officialfusionshroombar.com',
        href: 'mailto:order@officialfusionshroombar.com',
    },
    {
        icon: MapPin,
        label: 'Visit us',
        value: '23563 Baxter Rd, Wildomar, CA 92595',
    },
    {
        icon: Clock,
        label: 'Support hours',
        value: 'Monday – Sunday: 24/7 online support',
    },
];

const SUPPORT_STRIP = [
    {
        icon: Clock,
        title: '24/7 support',
        desc: 'Our team is available around the clock for orders and product questions.',
    },
    {
        icon: ShieldCheck,
        title: 'Secure messaging',
        desc: 'All inquiries are handled privately with encrypted communication.',
    },
    {
        icon: Mail,
        title: 'Fast response',
        desc: 'We typically reply within a few hours — often much sooner.',
    },
];

export default function ContactPage() {
    return (
        <div className={styles.contactPage}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <Reveal delay={0.1}>
                        <span className="section-label">Get in touch</span>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <h1>Contact us</h1>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className={styles.lead}>
                            Have questions about your order or our products? We&apos;re here 24/7
                            to help with shipping, dosing, and anything else you need.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Quick answer */}
            <section id="answer" aria-label="Quick answer" className={styles.answerCapsule}>
                <div className={styles.answerInner}>
                    <strong>Need help?</strong> Email{' '}
                    <a href="mailto:order@officialfusionshroombar.com">
                        order@officialfusionshroombar.com
                    </a>{' '}
                    or use the form below. Our support team responds around the clock with discreet,
                    secure assistance.
                </div>
            </section>

            {/* Support strip */}
            <section className={styles.supportStrip}>
                <div className={styles.containerWide}>
                    <div className={styles.supportGrid}>
                        {SUPPORT_STRIP.map((item, i) => (
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

            {/* Contact grid */}
            <section className={styles.contactSection}>
                <div className={styles.containerWide}>
                    <div className={styles.contactGrid}>
                        <div className={styles.contactInfo}>
                            <Reveal delay={0.1}>
                                <span className="section-label">Contact details</span>
                                <h2 className={styles.infoHeading}>How to reach us</h2>
                            </Reveal>
                            <div className={styles.infoCards}>
                                {CONTACT_ITEMS.map((item, i) => (
                                    <Reveal key={item.label} delay={0.15 + i * 0.08}>
                                        <div className={styles.infoCard}>
                                            <div className={styles.infoIcon}>
                                                <item.icon size={18} />
                                            </div>
                                            <div>
                                                <h3>{item.label}</h3>
                                                {item.href ? (
                                                    <a href={item.href} className={styles.infoValue}>
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className={styles.infoValue}>{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>

                        <Reveal delay={0.2}>
                            <div className={styles.formSection}>
                                <span className="section-label">Send a message</span>
                                <h2 className={styles.formHeading}>We&apos;ll get back to you</h2>
                                <ContactForm />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Cross-links */}
            <Reveal>
                <section className="cross-links" style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
                    <h3>Looking for something else?</h3>
                    <p>Check out these helpful resources before reaching out.</p>
                    <div className="link-pills">
                        <Link href="/faq" className="link-pill">
                            FAQ
                        </Link>
                        <Link href="/shop" className="link-pill">
                            Shop products
                        </Link>
                        <Link href="/blog" className="link-pill">
                            Read the blog
                        </Link>
                        <Link href="/about" className="link-pill">
                            About us
                        </Link>
                        <Link href="/microdosing-chocolate" className="link-pill">
                            Dosing guide
                        </Link>
                    </div>
                </section>
            </Reveal>
        </div>
    );
}
