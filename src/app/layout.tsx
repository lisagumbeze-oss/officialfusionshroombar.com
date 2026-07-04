import type { Metadata } from "next";
import { GLOBAL_KEYWORDS, SITE_PRIMARY_KEYWORD, BRAND_NAME } from '@/lib/keywords';
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import LayoutWrapper from "@/components/LayoutWrapper";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SmartsuppChat from '@/components/SmartsuppChat';

export const metadata: Metadata = {
  metadataBase: new URL("https://officialfusionshroombar.com"),
  manifest: '/manifest.json',
  title: {
    default: `Fusion Shroom Bars | ${BRAND_NAME}`,
    template: `%s | ${BRAND_NAME}`
  },
  description: `Fusion Shroom Bars — the official home for premium fusion mushroom chocolate bars and psilocybin edibles. Shop authentic fusion shroom bars with lab-tested dosing and discreet worldwide shipping.`,
  keywords: GLOBAL_KEYWORDS,
  authors: [{ name: "Fusion Team" }],
  creator: "Fusion Shroom Bars",
  publisher: "Fusion Shroom Bars",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://officialfusionshroombar.com",
    siteName: "Official Fusion Shroom Bars",
    title: `Fusion Shroom Bars | Premium Mushroom Chocolate & Gummies`,
    description: `Shop fusion shroom bars — the gold standard in fusion mushroom chocolate bars and psilocybin gummies. Authentic, lab-tested fusion shroom bars with worldwide shipping.`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Official Fusion Shroom Bars",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Fusion Shroom Bars | Premium Mushroom Chocolate`,
    description: `Fusion shroom bars and premium psilocybin mushroom chocolate. Discreet worldwide shipping.`,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://officialfusionshroombar.com',
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": BRAND_NAME,
  "url": "https://officialfusionshroombar.com",
  "logo": "https://officialfusionshroombar.com/logo.png", // Assuming logo.png exists
  "sameAs": [
    "https://twitter.com/fusionshroombar", // Placeholders
    "https://instagram.com/officialfusionshroombar"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "",
    "contactType": "customer service",
    "email": "support@officialfusionshroombar.com"
  }
};

import { ToastProvider } from "@/context/ToastContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-background-dark text-white" data-build="2026-07-05">
        <GoogleAnalytics ga_id="G-403953413" />
        <ToastProvider>
          <RecentlyViewedProvider>
            <WishlistProvider>
              <CartProvider>
                <LayoutWrapper>
                  {children}
                </LayoutWrapper>
              </CartProvider>
            </WishlistProvider>
          </RecentlyViewedProvider>
        </ToastProvider>
        
        <SmartsuppChat />
      </body>
    </html>
  );
}
