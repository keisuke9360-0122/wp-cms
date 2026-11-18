import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Inter_Tight, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/app/contexts/LoadingContext";
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

// サロンオーナー向けトップで使うフォント
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
  preload: false,
});

const SITE_TITLE = "Hair & Web Studio K｜美容師がつくる、サロンのホームページ";
const SITE_DESCRIPTION =
  "福岡の美容師・Webデザイナー 鶴田啓介によるサロン向けホームページ制作。美容室・エステ・ネイルサロンのホームページ制作、LP制作、WordPressの修正を承ります。";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://keisuketsuruta.com"),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://keisuketsuruta.com",
    siteName: "Hair & Web Studio K",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        // TODO: サロン向けのOGP画像（1200×630）ができたら差し替える
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hair & Web Studio K",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${cormorant.variable} ${interTight.variable} ${notoSansJP.variable}`}>
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
          <div className="relative z-20 overflow-x-hidden">{children}</div>
        </LoadingProvider>
      </body>
    </html>
  );
}
