'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import CartDropdown from './CartDropdown';
import HeaderNav from './HeaderNav';
import BottomNav from '@/components/BottomNav/BottomNav';
import { useWishlist } from '@/context/WishlistContext';
import { HEADER_NAV, isNavActive } from '@/lib/nav';
import { ChevronDown, Heart } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { wishlist } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileGuidesOpen, setMobileGuidesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    if (!isMobileMenuOpen) setMobileGuidesOpen(false);
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className={styles.announcement}>
        <span className={styles.announcementFull}>Free discreet shipping on orders over $150</span>
        <span className={styles.announcementShort}>Free shipping over $150</span>
        <Link href="/shop">Shop now →</Link>
      </div>

      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <button
            type="button"
            className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.mobileMenuBtnOpen : ''}`}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-main-nav"
          >
            <span className={styles.hamburger} aria-hidden>
              <span />
              <span />
              <span />
            </span>
          </button>

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

          <HeaderNav />

          <div className={styles.actions}>
            <Link href="/wishlist" className={styles.wishlistLink}>Wishlist</Link>
            <Link
              href="/wishlist"
              className={styles.wishlistIconBtn}
              aria-label={wishlist.length > 0 ? `Wishlist, ${wishlist.length} items` : 'Wishlist'}
            >
              <Heart size={22} strokeWidth={2} aria-hidden />
              {wishlist.length > 0 && (
                <span className={styles.wishlistBadge} aria-hidden>
                  {wishlist.length > 9 ? '9+' : wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/shop" className={styles.shopCta}>Shop all</Link>
            <CartDropdown />
          </div>
        </div>
      </header>

      <div
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.mobileOverlayOpen : ''}`}
        aria-hidden={!isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <nav
          id="mobile-main-nav"
          className={styles.mobileNav}
          aria-label="Mobile navigation"
          onClick={(event) => event.stopPropagation()}
        >
          {HEADER_NAV.map((item) =>
            item.children?.length ? (
              <div
                key={item.href}
                className={`${styles.mobileNavGroup} ${mobileGuidesOpen ? styles.mobileNavGroupOpen : ''}`}
              >
                <button
                  type="button"
                  className={`${styles.mobileNavGroupTrigger} ${isNavActive(pathname, item.href, item.children) ? styles.mobileNavGroupTriggerActive : ''}`}
                  onClick={() => setMobileGuidesOpen((open) => !open)}
                  aria-expanded={mobileGuidesOpen}
                >
                  <span>{item.label}</span>
                  <ChevronDown size={18} className={styles.mobileNavGroupIcon} aria-hidden />
                </button>
                <div className={`${styles.mobileNavSubmenu} ${mobileGuidesOpen ? styles.mobileNavSubmenuOpen : ''}`}>
                  <div className={styles.mobileNavSubmenuInner}>
                    <div className={styles.mobileNavSubmenuList}>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`${styles.mobileNavChild} ${isNavActive(pathname, child.href) ? styles.mobileNavActive : ''}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>{child.label}</span>
                          {child.description ? (
                            <span className={styles.mobileNavChildDesc}>{child.description}</span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={isNavActive(pathname, item.href) ? styles.mobileNavActive : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          <Link href="/wishlist" className={styles.mobileNavSecondary} onClick={() => setIsMobileMenuOpen(false)}>
            Wishlist
          </Link>
          <Link href="/shop" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
            Browse collection
          </Link>
        </nav>
      </div>

      <BottomNav />
    </>
  );
}
