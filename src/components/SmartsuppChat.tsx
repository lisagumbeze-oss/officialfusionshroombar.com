'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

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

const MOBILE_NAV_QUERY = '(max-width: 1023px)';
const CHAT_GAP = 12;
const DESKTOP_OFFSET = 16;

function getBottomNavHeight(): number {
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;bottom:0;left:0;width:0;height:var(--bottom-nav-offset);visibility:hidden;pointer-events:none';
  document.body.appendChild(probe);
  const height = probe.offsetHeight;
  document.body.removeChild(probe);
  return height;
}

function getChatOffsetY(): number {
  const isMobile = window.matchMedia(MOBILE_NAV_QUERY).matches;
  if (!isMobile) return DESKTOP_OFFSET;
  return getBottomNavHeight() + CHAT_GAP;
}

function applyChatOffset() {
  const offsetY = getChatOffsetY();

  if (window._smartsupp) {
    window._smartsupp.offsetY = offsetY;
  }

  const bottom = offsetY > DESKTOP_OFFSET ? `${offsetY}px` : `${DESKTOP_OFFSET}px`;

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

  useEffect(() => {
    if (isAdmin) return;

    applyChatOffset();

    const onResize = () => applyChatOffset();
    window.addEventListener('resize', onResize);

    const observer = new MutationObserver(applyChatOffset);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', onResize);
      observer.disconnect();
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

  return (
    <Script id="smartsupp-chat" strategy="afterInteractive">
      {`
        var _smartsupp = _smartsupp || {};
        _smartsupp.key = 'a817f55a37a06d176f7b4cd7ffa8a1dd9f5deb51';
        _smartsupp.accentColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#a78bfa';
        _smartsupp.offsetY = window.matchMedia('(max-width: 1023px)').matches ? 68 : 16;
        window.smartsupp||(function(d) {
          var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
          s=d.getElementsByTagName('script')[0];c=d.createElement('script');
          c.type='text/javascript';c.charset='utf-8';c.async=true;
          c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
        })(document);
      `}
    </Script>
  );
}
