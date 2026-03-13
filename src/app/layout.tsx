import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";

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
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
