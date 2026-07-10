'use client';

import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import {
  applyFloatingWidgetCssVars,
  FLOATING_SIDE,
  FLOATING_WIDGETS_CHANGE,
  notifyFloatingWidgetsChange,
} from '@/lib/floating-widgets';
import styles from './LiveChatButton.module.css';

declare global {
  interface Window {
    smartsupp?: (...args: unknown[]) => void;
  }
}

export default function LiveChatButton() {
  useEffect(() => {
    const onLayoutChange = () => notifyFloatingWidgetsChange();
    const onWidgetsChange = () => applyFloatingWidgetCssVars();

    notifyFloatingWidgetsChange();

    window.addEventListener('resize', onLayoutChange, { passive: true });
    window.addEventListener(FLOATING_WIDGETS_CHANGE, onWidgetsChange);

    return () => {
      window.removeEventListener('resize', onLayoutChange);
      window.removeEventListener(FLOATING_WIDGETS_CHANGE, onWidgetsChange);
    };
  }, []);

  const openChat = () => {
    if (typeof window.smartsupp === 'function') {
      window.smartsupp('chat:open');
    }
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={openChat}
      aria-label="Open live chat"
      style={
        {
          '--floating-side': `${FLOATING_SIDE}px`,
        } as React.CSSProperties
      }
    >
      <span className={styles.statusDot} aria-hidden />
      <span>Chat</span>
      <MessageCircle className={styles.icon} size={20} strokeWidth={2.25} aria-hidden />
    </button>
  );
}
