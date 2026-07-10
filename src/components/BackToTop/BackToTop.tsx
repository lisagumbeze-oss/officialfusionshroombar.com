'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronUp } from 'lucide-react';
import {
  applyFloatingWidgetCssVars,
  FLOATING_BUTTON_SIZE,
  FLOATING_SIDE,
  FLOATING_WIDGETS_CHANGE,
  notifyFloatingWidgetsChange,
} from '@/lib/floating-widgets';
import styles from './BackToTop.module.css';

const SCROLL_THRESHOLD = 320;

export default function BackToTop() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isAdmin) return;

    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    const onLayoutChange = () => notifyFloatingWidgetsChange();
    const onWidgetsChange = () => applyFloatingWidgetCssVars();

    onScroll();
    notifyFloatingWidgetsChange();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onLayoutChange, { passive: true });
    window.addEventListener(FLOATING_WIDGETS_CHANGE, onWidgetsChange);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onLayoutChange);
      window.removeEventListener(FLOATING_WIDGETS_CHANGE, onWidgetsChange);
    };
  }, [isAdmin]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isAdmin) {
    return null;
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      style={
        {
          '--floating-button-size': `${FLOATING_BUTTON_SIZE}px`,
          '--floating-side': `${FLOATING_SIDE}px`,
        } as React.CSSProperties
      }
    >
      <ChevronUp className={styles.icon} size={24} strokeWidth={2.5} aria-hidden />
    </button>
  );
}
