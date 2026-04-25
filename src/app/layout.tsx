import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/app/contexts/LoadingContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import Script from "next/script";

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
  metadataBase: new URL("https://keisuketsuruta.com"),
  openGraph: {
    title: "KEISUKE TSURUTA PORTFOLIO",
    description:
      "美容師として磨いた審美眼と、フロントエンドエンジニアとしての技術を掛け合わせてWebを制作しています。",
    url: "https://keisuketsuruta.com",
    siteName: "KEISUKE TSURUTA PORTFOLIO",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KEISUKE TSURUTA PORTFOLIO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KEISUKE TSURUTA PORTFOLIO",
    description:
      "美容師として磨いた審美眼と、フロントエンドエンジニアとしての技術を掛け合わせてWebを制作しています。",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DZK0D80V1L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DZK0D80V1L');
          `}
        </Script>
      </head>
      <body className="relative text-stone-800 font-sans antialiased">
        <LoadingProvider>
          <LoadingOverlay />
          <div className="relative z-20 overflow-x-hidden">{children}</div>
        </LoadingProvider>
      </body>
    </html>
  );
}
