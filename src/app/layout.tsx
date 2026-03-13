import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://officialfusionshroombar.com"),
  title: "Official Fusion Shroom Bars | Premium Magic Mushroom Chocolate",
  description: "Experience the future of psychedelics with Fusion Shroom Bars. Gourmet mushroom-infused chocolate bars and gummies. Worldwide shipping available.",
  keywords: ["fusion shroom bars", "magic mushroom chocolate", "psilocybin edibles", "mushroom gummies", "buy shroom bars online"],
  openGraph: {
    title: "Official Fusion Shroom Bars",
    description: "Premium Magic Mushroom Chocolate & Gummies",
    images: ["/og-image.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background-dark text-white">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        
        {/* Smartsupp Live Chat script */}
        <Script id="smartsupp-chat" strategy="afterInteractive">
          {`
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = '066c33c30d5a0cddcfb7a8750f96fe6b77709e72';
            window.smartsupp||(function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            })(document);
          `}
        </Script>
      </body>
    </html>
  );
}
