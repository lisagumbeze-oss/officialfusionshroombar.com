'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import LegalModal from '../Legal/LegalModal';

export default function Footer() {
    const [legalType, setLegalType] = useState<'terms' | 'privacy' | 'refund' | null>(null);

    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.brand}>
                    <h3>Fusion Shroom Bars</h3>
                    <p>Official fusion shroom bars — premium psilocybin mushroom chocolate with lab-tested dosing and discreet worldwide shipping.</p>
                </div>

                <div className={styles.linksGrid}>
                    <div className={styles.column}>
                        <h4>Shop</h4>
                        <Link href="/shop">All products</Link>
                        <Link href="/track">Track order</Link>
                        <Link href="/wishlist">Wishlist</Link>
                    </div>
                    <div className={styles.column}>
                        <h4>Company</h4>
                        <Link href="/about">About</Link>
                        <Link href="/blog">Blog</Link>
                        <Link href="/faq">FAQ</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                    <div className={styles.column}>
                        <h4>Guides</h4>
                        <Link href="/microdosing-chocolate">Microdosing guide</Link>
                        <Link href="/mushroom-chocolate-bars">Edibles guide</Link>
                        <Link href="/buy-shroom-bars">Where to buy</Link>
                        <Link href="/neau-tropics">Neau Tropics</Link>
                    </div>
                    <div className={styles.column}>
                        <h4>Legal</h4>
                        <button type="button" onClick={() => setLegalType('terms')} className={styles.legalBtn}>Terms</button>
                        <button type="button" onClick={() => setLegalType('privacy')} className={styles.legalBtn}>Privacy</button>
                        <button type="button" onClick={() => setLegalType('refund')} className={styles.legalBtn}>Refunds</button>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} Fusion Shroom Bars. All rights reserved.</p>
                <div className={styles.payments}>
                    <span>BTC</span>
                    <span>Apple Cash</span>
                    <span>Zelle</span>
                    <span>Cash App</span>
                    <span>Venmo</span>
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
