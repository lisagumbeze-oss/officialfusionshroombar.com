'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './BottomNav.module.css';

const ITEMS = [
  { href: '/', label: 'Home', icon: Home, exact: true },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/cart', label: 'Cart', icon: ShoppingCart, badge: 'cart' as const },
  { href: '/contact', label: 'Contact', icon: MessageCircle },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const getBadge = (badge?: 'cart') => {
    if (badge === 'cart' && cartCount > 0) return cartCount;
    return 0;
  };

  return (
    <nav className={styles.bottomNav} aria-label="Mobile navigation">
      {ITEMS.map((item) => {
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
