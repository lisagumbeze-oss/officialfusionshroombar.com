'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import LegalModal from '../Legal/LegalModal';

export default function Footer() {
    const [legalType, setLegalType] = useState<'terms' | 'privacy' | 'refund' | null>(null);

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3>FUSION<span>SHROOMBARS</span></h3>
                    <p>Official Fusion Shroom Bars. Gourmet psychedelic edibles infused with high-quality magic mushrooms.</p>
                </div>
                <div className={styles.column}>
                    <h4>LEGAL</h4>
                    <button onClick={() => setLegalType('terms')} className={styles.legalBtn}>Terms & Conditions</button>
                    <button onClick={() => setLegalType('privacy')} className={styles.legalBtn}>Privacy Policy</button>
                    <button onClick={() => setLegalType('refund')} className={styles.legalBtn}>Refund Policy</button>
                </div>
                <div className={styles.column}>
                    <h4>SUPPORT</h4>
                    <Link href="/faq" className={styles.footerLink}>Frequently Asked Questions</Link>
                    <p>order@officialfusionshroombar.com</p>
                    <p>23563 Baxter Rd, Wildomar, CA, 92595</p>
                </div>
                <div className={styles.column}>
                    <h4>NEWSLETTER</h4>
                    <p>Join the future of psychedelics.</p>
                    <form className={styles.newsletter} action="https://formspree.io/f/mqakvjnd" method="POST">
                        <input type="email" name="email" placeholder="Email address" required />
                        <button type="submit" className="premium-gradient">JOIN</button>
                    </form>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} Official Fusion Mushroom Bars. All rights reserved.</p>
                <div className={styles.payments}>
                    <span>BTC</span> <span>APPLE CASH</span> <span>CHIME</span> <span>ZELLE</span> <span>CASHAPP</span> <span>VENMO</span>
                </div>
            </div>

            <LegalModal 
                isOpen={legalType !== null} 
                onClose={() => setLegalType(null)} 
                type={legalType || 'terms'} 
            />
        </footer>
    );
}
