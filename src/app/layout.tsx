import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/app/contexts/LoadingContext";
import LoadingOverlay from "@/components/LoadingOverlay";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
export const metadata: Metadata = {
  title: "KEISUKE TSURUTA PORTFOLIO",
  description: "KEISUKE TSURUTA PORTFOLIO",
};
console.log(inter);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={inter.variable}>
      {" "}
      {/* ★ ここで Inter を強制適用 */}{" "}
      <body className="relative text-gray-800 font-sans antialiased">
        {" "}
        <div className="absolute inset-0 -z-10 animate-gradient"></div>{" "}
        <LoadingProvider>
          {" "}
          <LoadingOverlay />{" "}
          <div className="relative z-20 overflow-x-hidden">{children}</div>{" "}
          {/* <div className="relative z-20">{children}</div> */}{" "}
        </LoadingProvider>{" "}
      </body>{" "}
    </html>
  );
}
