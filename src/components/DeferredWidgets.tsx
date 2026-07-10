'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const BackToTop = dynamic(() => import('@/components/BackToTop/BackToTop'), { ssr: false });
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton/WhatsAppButton'), { ssr: false });
const SmartsuppChat = dynamic(() => import('@/components/SmartsuppChat'), { ssr: false });

export default function DeferredWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(enable, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(enable, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <>
      <BackToTop />
      <WhatsAppButton />
      <SmartsuppChat />
    </>
  );
}
