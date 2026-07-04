'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, ShoppingCart, Heart, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './BottomNav.module.css';

type BottomNavProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

const ITEMS = [
  { type: 'link' as const, href: '/', label: 'Home', icon: Home, exact: true },
  { type: 'link' as const, href: '/shop', label: 'Shop', icon: ShoppingBag },
  { type: 'link' as const, href: '/cart', label: 'Cart', icon: ShoppingCart, badge: 'cart' as const },
  { type: 'link' as const, href: '/wishlist', label: 'Saved', icon: Heart, badge: 'wishlist' as const },
  { type: 'menu' as const, label: 'Menu', icon: Menu },
];

export default function BottomNav({ isMenuOpen, onMenuToggle }: BottomNavProps) {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const getBadge = (badge?: 'cart' | 'wishlist') => {
    if (badge === 'cart' && cartCount > 0) return cartCount;
    if (badge === 'wishlist' && wishlist.length > 0) return wishlist.length;
    return 0;
  };

  return (
    <nav className={styles.bottomNav} aria-label="Mobile navigation">
      {ITEMS.map((item) => {
        if (item.type === 'menu') {
          return (
            <button
              key="menu"
              type="button"
              className={`${styles.item} ${isMenuOpen ? styles.active : ''}`}
              onClick={onMenuToggle}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <item.icon size={22} strokeWidth={isMenuOpen ? 2.25 : 2} />
              <span>{item.label}</span>
            </button>
          );
        }

        const active = isActive(item.href, item.exact);
        const badge = getBadge(item.badge);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.item} ${active ? styles.active : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <span className={styles.iconWrap}>
              <item.icon size={22} strokeWidth={active ? 2.25 : 2} />
              {badge > 0 && (
                <span className={styles.badge} aria-label={`${badge} items`}>
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
