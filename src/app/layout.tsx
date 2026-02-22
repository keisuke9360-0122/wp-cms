import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/app/contexts/LoadingContext";
import LoadingOverlay from "@/components/LoadingOverlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KEISUKE TSURUTA PORTFOLIO",
  description:
    "美容師として磨いた審美眼と、フロントエンドエンジニアとしての技術を掛け合わせてWebを制作しています。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="relative text-stone-800 font-sans antialiased">
        <LoadingProvider>
          <LoadingOverlay />
          <div className="relative z-20 overflow-x-hidden">{children}</div>
        </LoadingProvider>
      </body>
    </html>
  );
}
