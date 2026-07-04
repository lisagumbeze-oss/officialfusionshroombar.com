'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import CartDropdown from './CartDropdown';
import BottomNav from '@/components/BottomNav/BottomNav';
import { Menu, X } from 'lucide-react';

const NAV = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className={styles.announcement}>
        <span>Free discreet shipping on orders over $150</span>
        <Link href="/shop">Shop now →</Link>
      </div>

      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logoWrapper} onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/images.png"
              alt="Fusion Shroom Bars"
              width={160}
              height={40}
              className={styles.brandLogo}
              priority
            />
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link href="/shop" className={styles.shopCta}>Shop all</Link>
            <CartDropdown />
            <button
              type="button"
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.mobileOverlayOpen : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className={styles.mobileNav}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/shop" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
            Browse collection
          </Link>
        </nav>
      </div>

      <BottomNav />
    </>
  );
}
