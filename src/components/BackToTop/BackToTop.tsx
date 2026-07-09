'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronUp } from 'lucide-react';
import {
  FLOATING_BUTTON_SIZE,
  FLOATING_SIDE,
  FLOATING_WIDGETS_CHANGE,
  getBackToTopBottom,
  notifyFloatingWidgetsChange,
} from '@/lib/floating-widgets';
import styles from './BackToTop.module.css';

const SCROLL_THRESHOLD = 320;

export default function BackToTop() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const [visible, setVisible] = useState(false);
  const [bottom, setBottom] = useState(84);

  const updatePosition = useCallback(() => {
    setBottom(getBackToTopBottom());
  }, []);

  useEffect(() => {
    if (isAdmin) return;

    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    const onLayoutChange = () => updatePosition();

    onScroll();
    updatePosition();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onLayoutChange, { passive: true });
    window.addEventListener(FLOATING_WIDGETS_CHANGE, onLayoutChange);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onLayoutChange);
      window.removeEventListener(FLOATING_WIDGETS_CHANGE, onLayoutChange);
      delete document.documentElement.dataset.backToTop;
      notifyFloatingWidgetsChange();
    };
  }, [isAdmin, updatePosition]);

  useEffect(() => {
    if (isAdmin) return;

    document.documentElement.dataset.backToTop = visible ? 'true' : 'false';
    updatePosition();
    notifyFloatingWidgetsChange();
  }, [visible, isAdmin, updatePosition]);

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
          bottom: `${bottom}px`,
          '--floating-button-size': `${FLOATING_BUTTON_SIZE}px`,
          '--floating-side': `${FLOATING_SIDE}px`,
        } as React.CSSProperties
      }
    >
      <ChevronUp className={styles.icon} size={24} strokeWidth={2.5} aria-hidden />
    </button>
  );
}
