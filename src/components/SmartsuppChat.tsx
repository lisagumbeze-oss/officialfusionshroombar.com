'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import LiveChatButton from '@/components/LiveChatButton/LiveChatButton';
import {
  applyFloatingWidgetCssVars,
  BRAND_PRIMARY_FALLBACK,
  FLOATING_SIDE,
  FLOATING_WIDGETS_CHANGE,
  getBrandPrimaryColor,
  getChatOffsetY,
  MOBILE_NAV_QUERY,
} from '@/lib/floating-widgets';
import {
  closeSmartsuppChat,
  registerSmartsuppChatListeners,
  setSmartsuppChatOpen,
  syncSmartsuppPointerEvents,
} from '@/lib/smartsupp-widget';

declare global {
  interface Window {
    smartsupp?: (...args: unknown[]) => void;
    _smartsupp?: {
      key?: string;
      color?: string;
      hideBanner?: boolean;
      offsetY?: number;
      offsetX?: number;
    };
  }
}

function applyBrandColor() {
  const brandColor = getBrandPrimaryColor();

  if (window._smartsupp) {
    window._smartsupp.color = brandColor;
    window._smartsupp.hideBanner = true;
  }
}

function applyChatOffset() {
  applyFloatingWidgetCssVars();
  applyBrandColor();

  if (window._smartsupp) {
    window._smartsupp.offsetY = getChatOffsetY();
    window._smartsupp.offsetX = FLOATING_SIDE;
    window._smartsupp.hideBanner = true;
  }

  syncSmartsuppPointerEvents();
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
    setSmartsuppChatOpen(false);
    registerSmartsuppChatListeners();

    const colorRetries = [0, 400, 1000, 2500, 5000].map((ms) =>
      setTimeout(() => {
        applyBrandColor();
      }, ms)
    );

    window.addEventListener('resize', scheduleApply, { passive: true });
    window.addEventListener(FLOATING_WIDGETS_CHANGE, scheduleApply);

    let observer: MutationObserver | null = null;
    let disconnectTimer: ReturnType<typeof setTimeout> | null = null;

    const connectObserver = () => {
      if (observer) return;
      const target =
        document.getElementById('smartsupp-widget-container') ??
        document.getElementById('smartsupp-widget');
      if (!target) return;

      observer = new MutationObserver(scheduleApply);
      observer.observe(target, { childList: true, attributes: true, attributeFilter: ['style'] });
      disconnectTimer = setTimeout(() => {
        observer?.disconnect();
        observer = null;
      }, 12000);
    };

    connectObserver();
    const observerRetries = [300, 1000, 2500].map((ms) => setTimeout(connectObserver, ms));

    return () => {
      window.removeEventListener('resize', scheduleApply);
      window.removeEventListener(FLOATING_WIDGETS_CHANGE, scheduleApply);
      observer?.disconnect();
      observerRetries.forEach(clearTimeout);
      if (disconnectTimer) clearTimeout(disconnectTimer);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      colorRetries.forEach(clearTimeout);
    };
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;

    hideSmartsuppWidget();

    const observer = new MutationObserver(hideSmartsuppWidget);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) return;
    closeSmartsuppChat();
  }, [pathname, isAdmin]);

  if (isAdmin) {
    return null;
  }

  return (
    <>
      <Script
        id="smartsupp-chat"
        strategy="lazyOnload"
        onLoad={() => {
          applyBrandColor();
          applyChatOffset();
          setTimeout(applyBrandColor, 500);
          setTimeout(applyChatOffset, 500);
          setTimeout(applyBrandColor, 2000);
          setTimeout(applyChatOffset, 2000);
        }}
      >
        {`
          var _smartsupp = _smartsupp || {};
          _smartsupp.key = '066c33c30d5a0cddcfb7a8750f96fe6b77709e72';
          _smartsupp.color = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '${BRAND_PRIMARY_FALLBACK}';
          _smartsupp.hideBanner = true;
          _smartsupp.offsetX = ${FLOATING_SIDE};
          _smartsupp.offsetY = window.matchMedia('${MOBILE_NAV_QUERY}').matches ? 68 : ${16};
          window.smartsupp||(function(d) {
            var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
            s=d.getElementsByTagName('script')[0];c=d.createElement('script');
            c.type='text/javascript';c.charset='utf-8';c.async=true;
            c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
          })(document);
        `}
      </Script>
      <LiveChatButton />
      <noscript>
        Powered by{' '}
        <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">
          Smartsupp
        </a>
      </noscript>
    </>
  );
}
