import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/features/StoreProvider";
import { CartSlideover } from "@/components/common/CartSlideover";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aurelia Jewels | Haute Joaillerie & Fine Jewellery",
    template: "%s | Aurelia Jewels",
  },
  description:
    "Exquisite high jewellery handcrafted with ethically sourced diamonds, rare emeralds, rubies, and solid 18k gold. Discover the timeless splendor of Aurelia Jewels.",
  keywords: [
    "High Jewellery",
    "Haute Joaillerie",
    "Diamond Solitaire",
    "18k Gold",
    "Emerald Collier",
    "Aurelia Jewels",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory-100 text-charcoal-900 selection:bg-champagne-300 selection:text-charcoal-900">
        <StoreProvider>
          {children}
          <CartSlideover />
        </StoreProvider>
      </body>
    </html>
  );
}
