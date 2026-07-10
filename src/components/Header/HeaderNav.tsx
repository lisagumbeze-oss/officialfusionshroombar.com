'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  HelpCircle,
  Info,
  MapPin,
  MessageCircle,
  Newspaper,
  Package,
  Sparkles,
} from 'lucide-react';
import { HEADER_NAV, isNavActive, type NavItem, type NavLink } from '@/lib/nav';
import styles from './Header.module.css';

const GUIDE_ICONS: Record<string, typeof Sparkles> = {
  '/microdosing-chocolate': Sparkles,
  '/mushroom-chocolate-bars': BookOpen,
  '/buy-shroom-bars': MapPin,
  '/neau-tropics': Package,
};

const TOP_LEVEL_ICONS: Partial<Record<string, typeof Sparkles>> = {
  '/shop': Package,
  '/track': MapPin,
  '/about': Info,
  '/blog': Newspaper,
  '/faq': HelpCircle,
  '/contact': MessageCircle,
};

function NavAnchor({
  item,
  className,
  onNavigate,
}: {
  item: NavLink;
  className: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = isNavActive(pathname, item.href);
  const Icon = TOP_LEVEL_ICONS[item.href];

  return (
    <Link
      href={item.href}
      className={`${className} ${active ? styles.navLinkActive : ''}`}
      onClick={onNavigate}
    >
      {Icon ? <Icon size={15} className={styles.navLinkIcon} aria-hidden /> : null}
      <span>{item.label}</span>
    </Link>
  );
}

function GuidesMenu({
  item,
  open,
  onOpen,
  onClose,
}: {
  item: NavItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const menuId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = isNavActive(pathname, item.href, item.children);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    onOpen();
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(onClose, 120);
  };

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <div
      className={`${styles.navDropdown} ${open ? styles.navDropdownOpen : ''} ${active ? styles.navDropdownActive : ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className={`${styles.navLink} ${styles.navDropdownTrigger} ${active ? styles.navLinkActive : ''}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? onClose() : onOpen())}
      >
        <BookOpen size={15} className={styles.navLinkIcon} aria-hidden />
        <span>{item.label}</span>
        <ChevronDown size={14} className={styles.navDropdownIcon} aria-hidden />
      </button>

      <div
        id={menuId}
        className={styles.submenu}
        role="menu"
        aria-label={`${item.label} submenu`}
      >
        <div className={styles.submenuHeader}>
          <p className={styles.submenuEyebrow}>Resources</p>
          <p className={styles.submenuTitle}>{item.label}</p>
          {item.description ? <p className={styles.submenuDesc}>{item.description}</p> : null}
        </div>

        <div className={styles.submenuGrid}>
          {item.children?.map((child, index) => {
            const ChildIcon = GUIDE_ICONS[child.href] ?? BookOpen;
            const childActive = isNavActive(pathname, child.href);

            return (
              <Link
                key={child.href}
                href={child.href}
                className={`${styles.submenuLink} ${childActive ? styles.submenuLinkActive : ''}`}
                role="menuitem"
                style={{ animationDelay: `${index * 0.04}s` }}
                onClick={onClose}
              >
                <span className={styles.submenuIconWrap}>
                  <ChildIcon size={18} aria-hidden />
                </span>
                <span className={styles.submenuCopy}>
                  <span className={styles.submenuLinkTitle}>{child.label}</span>
                  {child.description ? (
                    <span className={styles.submenuLinkDesc}>{child.description}</span>
                  ) : null}
                </span>
                <ArrowRight size={16} className={styles.submenuArrow} aria-hidden />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function HeaderNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenDropdown(null);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Main navigation">
      <ul className={styles.navList}>
        {HEADER_NAV.map((item) => (
          <li key={item.href} className={styles.navListItem}>
            {item.children?.length ? (
              <GuidesMenu
                item={item}
                open={openDropdown === item.href}
                onOpen={() => setOpenDropdown(item.href)}
                onClose={() => setOpenDropdown(null)}
              />
            ) : (
              <NavAnchor item={item} className={styles.navLink} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
