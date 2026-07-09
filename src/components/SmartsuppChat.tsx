'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import {
  FLOATING_WIDGETS_CHANGE,
  getBrandPrimaryColor,
  getChatOffsetY,
  MOBILE_NAV_QUERY,
} from '@/lib/floating-widgets';

declare global {
  interface Window {
    smartsupp?: (...args: unknown[]) => void;
    _smartsupp?: {
      key?: string;
      accentColor?: string;
      offsetY?: number;
    };
  }
}

function applyChatOffset() {
  const offsetY = getChatOffsetY();
  const accentColor = getBrandPrimaryColor();

  if (window._smartsupp) {
    window._smartsupp.offsetY = offsetY;
    window._smartsupp.accentColor = accentColor;
  }

  const bottom = `${offsetY}px`;

  document
    .querySelectorAll(
      '#smartsupp-widget-container, #smartsupp-widget, [id^="smartsupp"], iframe[src*="smartsupp"]'
    )
    .forEach((el) => {
      const node = el as HTMLElement;
      if (node.closest('[data-chat-hidden="true"]')) return;
      node.style.setProperty('bottom', bottom, 'important');
    });
}

function hideSmartsuppWidget() {
  if (typeof window.smartsupp === 'function') {
    window.smartsupp('chat:hide');
  }

  document
    .querySelectorAll('iframe[src*="smartsupp"], [id*="smartsupp"], [class*="smartsupp"]')
    .forEach((el) => {
      const node = el as HTMLElement;
      node.dataset.chatHidden = 'true';
      node.style.setProperty('display', 'none', 'important');
    });
}

export default function SmartsuppChat() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isAdmin) return;

    const scheduleApply = () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(applyChatOffset, 150);
    };

    applyChatOffset();

    window.addEventListener('resize', scheduleApply, { passive: true });
    window.addEventListener(FLOATING_WIDGETS_CHANGE, scheduleApply);

    const observer = new MutationObserver(scheduleApply);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', scheduleApply);
      window.removeEventListener(FLOATING_WIDGETS_CHANGE, scheduleApply);
      observer.disconnect();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;

    hideSmartsuppWidget();

    const observer = new MutationObserver(hideSmartsuppWidget);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isAdmin]);

  if (isAdmin) {
    return null;
  }

  const initialOffset = 68;
  const initialAccent = '#a78bfa';

  return (
    <>
      <Script id="smartsupp-chat" strategy="lazyOnload">
        {`
          var _smartsupp = _smartsupp || {};
          _smartsupp.key = '066c33c30d5a0cddcfb7a8750f96fe6b77709e72';
          _smartsupp.accentColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '${initialAccent}';
          _smartsupp.offsetY = window.matchMedia('${MOBILE_NAV_QUERY}').matches ? ${initialOffset} : 16;
          window.smartsupp||(function(d) {
            var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
            s=d.getElementsByTagName('script')[0];c=d.createElement('script');
            c.type='text/javascript';c.charset='utf-8';c.async=true;
            c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
          })(document);
        `}
      </Script>
      <noscript>
        Powered by{' '}
        <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">
          Smartsupp
        </a>
      </noscript>
    </>
  );
}
